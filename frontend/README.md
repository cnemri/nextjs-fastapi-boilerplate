# Frontend: Next.js To-Do List Application

This directory contains the frontend application for the full-stack to-do list project. It is built with Next.js using the App Router and follows modern React development practices.

## Architecture

The frontend is designed with a component-driven architecture, with a clear separation between UI primitives, feature-specific components, and layout components.

-   **`/components/ui`**: Contains generic, reusable UI components provided by `shadcn/ui`.
-   **`/components/features`**: Contains components that are specific to a particular feature of the application (e.g., `todos`).
-   **`/components/layout`**: Contains major layout components like the main navigation and footer.
-   **`/services`**: Handles all communication with the backend API.
-   **`/lib`**: Contains utility functions, hooks, and the central Axios instance.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Package Management**: [pnpm](https://pnpm.io/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Data Fetching**: [SWR](https://swr.vercel.app/)
-   **API Client**: [Axios](https://axios-http.com/)
-   **Schema Validation**: [Zod](https://zod.dev/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/)
-   **Testing**: [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting Started

### Prerequisites

-   Node.js and `pnpm`

### Setup and Installation

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

### Running Tests

To run the test suite, use the following command:

```bash
pnpm test
