from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "To-Do List API"
    database_url: str = "sqlite+aiosqlite:///./todos.db"

    class Config:
        env_file = ".env"

settings = Settings()
