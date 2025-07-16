# Backend: FastAPI To-Do List API

This directory contains the backend API for the full-stack to-do list application. It is built with FastAPI and follows modern Python development practices.

## Architecture

The backend is designed with a **domain-centric** architecture. This means that all the code related to a specific feature (in this case, `todos`) is grouped together in its own module. This approach promotes high cohesion and low coupling, making the codebase easier to understand, maintain, and scale.

Each feature module is further broken down into a clear separation of concerns:

-   **`router.py`**: Defines the API endpoints, handles HTTP requests and responses, and performs data validation.
-   **`service.py`**: Contains the core business logic for the feature.
-   **`schemas.py`**: Defines the Pydantic data models for request and response validation (data contracts).
-   **`model.py`**: Defines the SQLAlchemy ORM models that map to the database tables.

## Tech Stack

-   **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
-   **Package Management**: [uv](https://github.com/astral-sh/uv)
-   **ORM**: [SQLAlchemy 2.0+](https://www.sqlalchemy.org/) (with `asyncio`)
-   **Database Driver**: [aiosqlite](https://github.com/omnilib/aiosqlite)
-   **Data Validation**: [Pydantic](https://docs.pydantic.dev/)
-   **Testing**: [pytest](https://docs.pytest.org/) with `pytest-asyncio`
-   **Linting/Formatting**: [Ruff](https://github.com/astral-sh/ruff)

## Getting Started

### Prerequisites

-   Python 3.8+

### Setup and Installation

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    uv venv
    source .venv/bin/activate
    uv pip install -e ".[dev]"
    ```

3.  **Run the development server:**
    ```bash
    uvicorn app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`. You can access the interactive API documentation at `http://localhost:8000/docs`.

### Running Tests

To run the test suite, use the following command:

```bash
uv run pytest
