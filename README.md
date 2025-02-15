# Garage Web App

This repository contains the code for the Garage Web App, a comprehensive software solution designed to streamline and enhance the workflow of Abe's Garage. The application manages employee registration, customer management, and order tracking, with secure and private pages accessible only to authenticated employees.

## Table of Contents
- [Project Overview](#project-overview)
- [Functional Scope](#functional-scope)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Navigation Structure](#navigation-structure)

## Project Overview
The Garage Web App is developed to handle the business logic and data management for Abe's Garage. It includes features for employee authentication, customer management, and order handling, supporting the seamless daily operations of the garage.

## Functional Scope
The app supports the following functionalities:

- **Employee Registration and Authentication:** Secure registration and login for garage employees.
- **Customer Management:** CRUD operations to manage customer information.
- **Order Management:** CRUD operations to handle customer orders.
- **Private API Access:** APIs secured with authentication middleware, accessible only to authorized users.

## Technology Stack

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Next.js:** A React framework for server-side rendering and static site generation.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Redux Toolkit:** A state management library for managing global state.
- **RTK Query:** A data fetching and caching tool built on top of Redux Toolkit.
- **NextAuth.js:** An authentication library for Next.js applications.

### Backend
- **Node.js:** A JavaScript runtime for building server-side applications.
- **Express.js:** A web application framework for Node.js.
- **MySQL:** A relational database management system.
- **JWT (JSON Web Tokens):** A standard for securely transmitting information between parties as a JSON object.
- **Git (hosted on GitHub):** For version control and collaboration.

## Setup and Installation

To run the app locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/garage-web-app.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd garage-web-app
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Configure the MySQL database:**
   - Update the database settings in the `.env` file (e.g., `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
5. **Run the application:**
   ```sh
   npm run dev
   ```
6. The server should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

### Customer Search
- Navigate to the "Create a new order" page.
- Use the search input to find customers by first name, last name, or email.
- Select a customer from the search results to view their details and associated vehicles.

### Vehicle Selection
- After selecting a customer, choose a vehicle from the list of associated vehicles.
- The vehicle details will be displayed, and you can proceed to select services.

### Service Selection
- Use the `ServiceSelection` component to select services for the order.
- The selected services will be displayed and can be managed as needed.

## File Structure

### Frontend
- **Components:** Reusable UI components.
- **Pages:** Next.js pages.
- **Styles:** Tailwind CSS configuration.

### Backend
- **Controllers:** Handle HTTP requests and responses.
- **Services:** Business logic and database interactions.
- **Routes:** Define API endpoints.

## API Endpoints

### Customers
- `GET /api/customer/search` - Search customers by keyword.
- `GET /api/customer/:id` - Get customer details by ID.
- `POST /api/customer` - Create a new customer.
- `PUT /api/customer` - Update customer information.

### Vehicles
- `GET /api/vehicle/customer/:customer_id` - Get vehicles by customer ID.

### Services
- `GET /api/services` - Get all services.
- `POST /api/service` - Create a new service.

## Navigation Structure

### Public Pages
- Home page (`/`)
- About us page (`/about`)
- Services page (`/services`)
- Contact us page (`/contact`)
- Admin page (visible only if logged in, links to the dashboard `/dashboard`)
- Login (`/login`)
- Order details (`/order/{orderHash}`) - Not included in the menu

### Admin Pages (Login Required)
- Admin dashboard (`/admin`)
- Employees (`/admin/employees`)
- Add employee (`/admin/add-employee`)
- Edit employee (`/admin/employee/edit/:id`)
- Customers (`/admin/customers`)
- Add customer (`/admin/add-customer`)
- Edit customer (`/admin/customer/edit/:id`)
- Customer details (`/admin/customer/{customerId}`)
- Add vehicle (`/admin/customer/{customerId}`) - Conditionally displayed on the customer details page
- Orders (`/admin/orders`)
- Add order (`/admin/order`)
- Edit order (`/admin/order/{orderHash}/edit`)
- Services (`/admin/services`)
- Add service (`/admin/add-service`)

By following these steps, you can set up and run the Garage Web App application, manage customers, vehicles, and services, and navigate through the various pages and features provided by the application.
