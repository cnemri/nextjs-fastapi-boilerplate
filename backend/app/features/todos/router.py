from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from . import service, schemas

router = APIRouter()

@router.get("/api/todos/", response_model=List[schemas.TodoRead])
async def read_todos(db: AsyncSession = Depends(get_db)):
    return await service.get_all_todos(db)

@router.post("/api/todos/", response_model=schemas.TodoRead)
async def create_todo(todo: schemas.TodoCreate, db: AsyncSession = Depends(get_db)):
    return await service.create_todo(db=db, todo=todo)

@router.put("/api/todos/{item_id}", response_model=schemas.TodoRead)
async def update_todo(item_id: int, todo: schemas.TodoUpdate, db: AsyncSession = Depends(get_db)):
    db_todo = await service.update_todo(db=db, todo_id=item_id, todo=todo)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.delete("/api/todos/{item_id}", response_model=schemas.TodoRead)
async def delete_todo(item_id: int, db: AsyncSession = Depends(get_db)):
    db_todo = await service.delete_todo(db=db, todo_id=item_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.patch("/api/todos/{item_id}/toggle", response_model=schemas.TodoRead)
async def toggle_todo(item_id: int, db: AsyncSession = Depends(get_db)):
    db_todo = await service.toggle_todo_completion(db=db, todo_id=item_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo
