from typing import Annotated

from backend.app.db.base import get_session
from fastapi import Depends
from sqlmodel import Session

SessionDep = Annotated[Session, Depends(get_session)]
