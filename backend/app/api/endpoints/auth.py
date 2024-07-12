from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.db.models import Token, UserCreate, UserPublic
from app.utils import security
from app.utils.config import settings
from app.utils.database import (
    authenticate,
    create_user,
    get_user_by_email,
    get_user_by_username,
)
from app.utils.deps import CurrentUser, SessionDep

router = APIRouter()


@router.post("/register", response_model=UserPublic)
def register_user(*, session: SessionDep, user_in: UserCreate):
    """
    Register a new user.

    Parameters:
    - session: Database session dependency.
    - user_in: User input data for registration.

    Returns:
    - The newly created user data as `UserPublic`.

    Raises:
    - HTTPException: If email or username is already registered.
    """
    # Check if user is already exists
    existing_user_by_email = get_user_by_email(session=session, email=user_in.email)
    # Respond with appropriate message
    if existing_user_by_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    existing_user_by_username = get_user_by_username(
        session=session, username=user_in.username
    )

    # Respond with appropriate message
    if existing_user_by_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )

    new_user = create_user(session=session, user_in=user_in)
    return new_user


@router.post("/login/access-token")
def login_access_token(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    Login user and return an access token.

    Parameters:
    - session: Database session dependency.
    - form_data: User input data for login.

    Returns:
    - Access token for the authenticated user.

    Raises:
    - HTTPException: If authentication fails.
    """
    user = authenticate(
        session=session,
        email_or_username=form_data.username,
        password=form_data.password,
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            user.id, expires_delta=access_token_expires
        )
    )


@router.get("/me", response_model=UserPublic)
def read_user_me(current_user: CurrentUser):
    return current_user
