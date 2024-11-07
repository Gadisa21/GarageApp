# Garage Web App - Backend

This repository contains the backend code for the Garage Web App, a comprehensive software solution designed to streamline and enhance the workflow of Abe's Garage. The application manages employee registration, customer management, and order tracking, with secure and private pages accessible only to authenticated employees.

## Table of Contents
- [Project Overview](#project-overview)
- [Functional Scope](#functional-scope)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)


---

## Project Overview

The Garage Web App backend is developed to handle the business logic and data management for Abe's Garage. It includes features for employee authentication, customer management, and order handling, supporting the seamless daily operations of the garage.

## Functional Scope

The backend supports the following functionalities:
- **Employee Registration and Authentication**: Secure registration and login for garage employees.
- **Customer Management**: CRUD operations to manage customer information.
- **Order Management**: CRUD operations to handle customer orders.
- **Private API Access**: APIs secured with authentication middleware, accessible only to authorized users.

## Technology Stack

The backend utilizes the following technologies:
- **Node.js** and **Express.js**: For server-side development.
- **MySQL**: For data storage and management.
- **Git** (hosted on **GitHub**): For version control and collaboration.

## Setup and Installation

To run the backend locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Gadisa21/GarageApp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd GarageApp
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Configure the MySQL database:
   - Update the database settings in the `.env` file (e.g., `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

5. Run database migrations (if applicable):
    ```bash
    npm run migrate
    ```
6. Start the server:
    ```bash
    npm start
    ```
   The server should now be running on `http://localhost:3000`.



