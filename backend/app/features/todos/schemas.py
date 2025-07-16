import datetime
from pydantic import BaseModel
from typing import Optional

class TodoBase(BaseModel):
    title: str
    priority: Optional[str] = "Medium"
    due_date: Optional[datetime.datetime] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    completed: Optional[bool] = None

class TodoRead(TodoBase):
    id: int
    completed: bool

    class Config:
        from_attributes = True
