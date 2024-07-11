from sqlmodel import SQLModel, create_engine

from app.models import *  # noqa: F403

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def init_db() -> None:
    SQLModel.metadata.create_all(engine)
