import datetime
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.core.db import Base

class TodoItem(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    priority = Column(String, default="Medium")
    due_date = Column(DateTime, nullable=True)
    completed = Column(Boolean, default=False)
