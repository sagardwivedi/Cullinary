from sqlmodel import Session, select

from app.db.models import User, UserCreate
from app.utils.security import hash_password, verify_password


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    return session.exec(statement).first()


def get_user_by_username(*, session: Session, username: str) -> User | None:
    statement = select(User).where(User.username == username)
    return session.exec(statement).first()


def create_user(*, session: Session, user_in: UserCreate) -> User:
    db_obj = User.model_validate(
        user_in, update={"hashed_password": hash_password(user_in.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def authenticate(
    *, session: Session, email_or_username: str, password: str
) -> User | None:
    db_user = get_user_by_email(
        session=session, email=email_or_username
    ) or get_user_by_username(session=session, username=email_or_username)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user
