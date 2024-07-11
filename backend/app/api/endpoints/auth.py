from fastapi import APIRouter, HTTPException, status

from app.db.models import UserCreate, UserPublic
from app.utils.database import create_user, get_user_by_email, get_user_by_username
from app.utils.deps import SessionDep

router = APIRouter()


@router.post("/register", response_model=UserPublic)
async def register_user(*, session: SessionDep, user_in: UserCreate):
    # Check if user is already exists
    existing_user = get_user_by_email(
        session=session, email=user_in.email
    ) or get_user_by_username(session=session, username=user_in.username)

    # Respond with appropriate message
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered",
        )

    new_user = create_user(session=session, user_in=user_in)
    return new_user
