from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import model, schemas

async def get_all_todos(db: AsyncSession):
    result = await db.execute(select(model.TodoItem))
    return result.scalars().all()

async def create_todo(db: AsyncSession, todo: schemas.TodoCreate):
    db_todo = model.TodoItem(**todo.model_dump())
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def update_todo(db: AsyncSession, todo_id: int, todo: schemas.TodoUpdate):
    db_todo = await db.get(model.TodoItem, todo_id)
    if not db_todo:
        return None
    update_data = todo.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def delete_todo(db: AsyncSession, todo_id: int):
    db_todo = await db.get(model.TodoItem, todo_id)
    if not db_todo:
        return None
    await db.delete(db_todo)
    await db.commit()
    return db_todo

async def toggle_todo_completion(db: AsyncSession, todo_id: int):
    db_todo = await db.get(model.TodoItem, todo_id)
    if not db_todo:
        return None
    db_todo.completed = not db_todo.completed
    await db.commit()
    await db.refresh(db_todo)
    return db_todo
