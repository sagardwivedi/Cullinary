from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    username: str = Field(index=True, unique=True)


class UserCreate(UserBase):
    password: str


class UserPublic(UserBase):
    id: int


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    profile_picture: str | None = None
    bio: str | None = None

    recipes: list["Recipe"] = Relationship(back_populates="owner")
    comments: list["Comment"] = Relationship(back_populates="author")
    favorites: list["Favorite"] = Relationship(back_populates="user")
    likes: list["Like"] = Relationship(back_populates="user")


class RecipeBase(SQLModel):
    title: str
    description: str | None = None
    ingredients: str
    instructions: str
    cooking_time: int | None = None
    servings: int | None = None
    nutrition: str | None = None
    photo_url: str | None = None


class RecipeCreate(RecipeBase):
    pass


class RecipePublic(RecipeBase):
    id: int


class Recipe(RecipeBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    owner_id: int | None = Field(default=None, foreign_key="user.id")
    owner: User | None = Relationship(back_populates="recipes")

    comments: list["Comment"] = Relationship(back_populates="recipe")
    likes: list["Like"] = Relationship(back_populates="recipe")
    favorites: list["Favorite"] = Relationship(back_populates="recipe")


class CommentBase(SQLModel):
    content: str
    timestamp: str | None = Field(default=None)
    recipe_id: int | None = Field(default=None, foreign_key="recipe.id")
    author_id: int | None = Field(default=None, foreign_key="user.id")


class CommentCreate(CommentBase):
    pass


class CommentPublic(CommentBase):
    id: int


class Comment(CommentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    recipe: Recipe = Relationship(back_populates="comments")
    author: User = Relationship(back_populates="comments")


class Like(SQLModel, table=True):
    user_id: int | None = Field(default=None, foreign_key="user.id", primary_key=True)
    recipe_id: int | None = Field(
        default=None, foreign_key="recipe.id", primary_key=True
    )
    recipe: Recipe = Relationship(back_populates="likes")
    user: User = Relationship(back_populates="likes")


class FavoriteBase(SQLModel):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id", primary_key=True)


class FavoriteCreate(FavoriteBase):
    pass


class Favorite(FavoriteBase, table=True):
    recipe: Recipe = Relationship(back_populates="favorites")
    user: User = Relationship(back_populates="favorites")


class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(SQLModel):
    sub: int | None = None
