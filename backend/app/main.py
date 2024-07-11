from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.db.base import init_db


@asynccontextmanager
async def startup(app: FastAPI):  # noqa: ARG001
    init_db()
    yield


app = FastAPI(lifespan=startup)
