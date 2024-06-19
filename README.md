# enfiTech-library

This application allows users to manage a list of books using React for the frontend, Node.js with Express for the backend, and MongoDB as the database.

## Features

- Add books with fields: name, description, publish date, and price.
- List books with options for search and pagination.
- Form validation on both frontend and backend.
- TypeScript is used both front end and backend for typesafety

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure MongoDB is running locally or accessible)

## Installation

### Backend (Node.js + Express)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-management-app.git
   cd enfiTech-library/server
   ```
2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a .env file in the server directory.
    Add the  variables:
    ```bash
    MONGO_URL
    CLIENT_URL
    ```

3. Start the backend server:
    ```bash
    <!-- for developemenet server  -->
    npm run dev
    <!-- for production server -->
    npm run build
    npm run start
    ```

### Frontend (React)

1. Navigate to `client` directory:
   ```bash
    cd ../client
   ```
2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a .env file in the client directory.
    Add the  variables:
    ```bash
    VITE_BASE_URL
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```
4. Open your browser and go to http://localhost:5173 to view the application.


## Usage

## User Registration

- **Real-time Client-Side Validation:** Inputs are validated in real-time to provide immediate feedback to users.
- **Validation Rules:**
  - **Username:** Must have at least 5 characters.
  - **Email:** Must be a valid email address, checked using regex.
  - **Password:** Must contain at least 8 characters with a combination of uppercase, lowercase, number, and special character.
- **User-Friendly Error Messages:** Validation errors are shown clearly to guide the user.

### Adding New Books

- Navigate to the homepage.
- Use the form provided to add new books after clicking the add book button. 
  - Enter the name, description, publish date, and price of the book.
  - All fields are required.
  - Description must be at least 10 characters long.
  - Publish date should be entered in YYYY-MM-DD format.
  - Price must be a positive number.

### Searching Books

- Use the search bar located at the top of the page to search for books.
- You can search by either the name or description of the book.
- The search is performed dynamically as you type.

### Pagination

- Navigate through the list of books using the pagination buttons at the bottom of the book list.
- Use the "Previous" and "Next" buttons to move between pages of book listings.

---

These features allow you to effectively manage and interact with the list of books in the application. If you encounter any issues or have suggestions for improvements, please feel free reach out for support.

## For any inquiries or feedback, feel free to reach out:

- **Email:** [ashwinkv.akv@gmail.com](mailto:ashwinkv.akv@gmail.com)
- **LinkedIn:** [Ashwin K V](https://www.linkedin.com/in/ashwin-kv/)
