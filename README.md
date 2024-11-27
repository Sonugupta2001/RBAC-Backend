# Role-Based Access Control (RBAC) System

This is a simple Role-Based Access Control (RBAC) system built with Node.js, Sequelize, and MySQL. It allows the management of users, roles, and permissions and demonstrates the implementation of an authentication and authorization system using JWT tokens.

## Features

- **User Authentication:** Users can register and log in using JWT tokens.
- **Role Management:** Admins can create roles and assign them to users.
- **Permission Management:** Admins can create permissions and assign them to roles.
- **Role-Based Authorization:** Roles control access to resources.
- **Permission-Based Authorization:** Permissions control access to specific actions.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building APIs.
- **Sequelize ORM**: SQL-based ORM for interacting with MySQL.
- **MySQL**: Relational database for storing data.
- **JWT (JSON Web Tokens)**: For securing routes and handling authentication.
- **Bcrypt.js**: For password hashing and validation.

## Project Structure

- `controllers/`: Contains the logic for handling requests.
  - `authController.js`: Handles authentication (login, registration).
  - `userController.js`: Handles user-specific actions (profile management).
  - `adminController.js`: Manages roles and permissions (admin tasks).
  
- `middlewares/`: Contains middleware for authentication and authorization.
  - `authMiddleware.js`: Contains middleware for authenticating requests.
  - `roleMiddleware.js`: Contains middleware for role-based access control.

- `models/`: Contains the Sequelize models for users, roles, permissions, and the relationship tables.
  - `user.js`: Defines the user model.
  - `role.js`: Defines the role model.
  - `permission.js`: Defines the permission model.
  - `rolePermission.js`: Defines the relationship between roles and permissions.

- `config/`: Contains configuration files, including the database configuration.
  - `config.js`: Database connection settings.
  
- `routes/`: Contains the route definitions.
  - `authRoutes.js`: Routes for authentication.
  - `userRoutes.js`: Routes for user actions.
  - `adminRoutes.js`: Routes for admin actions.

- `app.js`: Main application entry point.

## Setup Instructions

### Prerequisites

- Node.js (v12.x or higher)
- MySQL server

### 1. Clone the Repository

```bash
git clone https://github.com/Sonugupta2001/RBAC-Backend.git
cd rbac
```

### 2. Install Dependencies
Run the following command to install the required npm dependencies:

```bash
npm install
```
### 3. Set Up Database
Create a MySQL database for the project -rbac_db.
Update the database configuration in config/config.js with your MySQL database credentials.

```javascript
module.exports = {
  development: {
    username: 'root',
    password: 'your_password',
    database: 'rbac_db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
```
### 5. Run Migrations
Use Sequelize CLI to run database migrations and set up the models in your database.

```bash
npx sequelize-cli db:migrate
```
### 5. Seed Database (Optional)
You can seed the database with some initial roles and permissions.

```bash
npx sequelize-cli db:seed:all
```
### 6. Set Up Environment Variables
Create a .env file in the root directory of your project and add the following variables:

```makefile
JWT_SECRET=your_jwt_secret_key
```
### 7. Run the Application
Start the application using Node.js.

```bash
npm start
```
The server will run at http://localhost:3000.

## API Endpoints
### Authentication Routes
```
POST /auth/register: Register a new user.
Request body: { "username": "user", "email": "email@example.com", "password": "password", "role": "user" }

POST /auth/login: Log in and receive a JWT token.
Request body: { "email": "email@example.com", "password": "password" }

Response: { "token": "JWT_TOKEN_HERE" }
```
### User Routes
```
GET /user/profile: Get the authenticated user's profile.
Protected by the authenticate middleware.
```
### Admin Routes
```
POST /admin/create-role: Create a new role.
Request body: { "name": "admin" }

POST /admin/assign-role: Assign a role to a user.
Request body: { "userId": 1, "roleId": 2 }

POST /admin/assign-permission: Assign a permission to a role.
Request body: { "roleId": 1, "permissionId": 2 }
```
### Authorization Middleware
```
authenticate: Protects routes and ensures that the user is logged in and the JWT is valid.
authorize: Ensures that the user has the required permissions to access a resource.
```

## Future Improvements
1. Dynamic management of roles and permissions via an admin dashboard.
2. Add logging for better traceability of actions.
3. Implement more granular permissions, such as CRUD operations on specific resources.


## License
This project is licensed under the MIT License - see the LICENSE file for details.
