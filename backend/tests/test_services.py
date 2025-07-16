import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.core.db import Base, get_db
from app.features.todos import service, schemas
from app.main import app

DATABASE_URL = "sqlite+aiosqlite:///./test.db"

engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

async def override_get_db():
    async with TestingSessionLocal() as session:
        yield session

app.dependency_overrides[get_db] = override_get_db

@pytest_asyncio.fixture(scope="function", autouse=True)
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.mark.asyncio
async def test_create_and_get_todo():
    async for session in override_get_db():
        todo_in = schemas.TodoCreate(title="Test Todo", priority="High")
        created_todo = await service.create_todo(session, todo_in)
        assert created_todo.title == "Test Todo"
        assert created_todo.priority == "High"

        all_todos = await service.get_all_todos(session)
        assert len(all_todos) == 1
        assert all_todos[0].title == "Test Todo"

@pytest.mark.asyncio
async def test_update_todo():
    async for session in override_get_db():
        todo_in = schemas.TodoCreate(title="Test Todo")
        created_todo = await service.create_todo(session, todo_in)

        todo_update = schemas.TodoUpdate(title="Updated Todo", completed=True)
        updated_todo = await service.update_todo(session, created_todo.id, todo_update)
        assert updated_todo.title == "Updated Todo"
        assert updated_todo.completed is True

@pytest.mark.asyncio
async def test_delete_todo():
    async for session in override_get_db():
        todo_in = schemas.TodoCreate(title="Test Todo")
        created_todo = await service.create_todo(session, todo_in)

        await service.delete_todo(session, created_todo.id)
        all_todos = await service.get_all_todos(session)
        assert len(all_todos) == 0

@pytest.mark.asyncio
async def test_toggle_todo():
    async for session in override_get_db():
        todo_in = schemas.TodoCreate(title="Test Todo")
        created_todo = await service.create_todo(session, todo_in)
        assert created_todo.completed is False

        toggled_todo = await service.toggle_todo_completion(session, created_todo.id)
        assert toggled_todo.completed is True

        toggled_again_todo = await service.toggle_todo_completion(session, created_todo.id)
        assert toggled_again_todo.completed is False
