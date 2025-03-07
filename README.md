# IoT Application

This is an IoT Application that consists of a frontend built with React and Vite, and a backend built with Node.js and Express.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The IoT Application allows users to manage and monitor IoT devices. The frontend provides a user-friendly interface for interacting with the devices, while the backend handles data storage and API endpoints.

## Technologies

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN UI**:
- **GetJustd**:
- **Recharts**:

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A web application framework for Node.js.
- **MySQL**:
- **Prisma**:
- **Socket IO**:
- **JWT Token**: For handling JWT authentication.
- **Node Mailer**:
- **bcrypt**: For hashing passwords.

## Installation

### Frontend

1. Clone the repository:
   ```
   git clone https://github.com/KAVIRAJec/Iot-Application.git
   ```
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install the dependencies:
   ```
   npm install --legacy-peer-deps
   ```
4. Create a `.env` file in the directory and add your environment variables.

### Backend

1. Clone the repository:
   ```
   git clone https://github.com/KAVIRAJec/Iot-Application.git
   ```
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the directory and add your environment variables.

## Usage

### Frontend

To start the development server, run:
```
npm run dev
```
The application will run on `http://localhost:5173`.

### Backend

To start the server, run:
```
npm start
```
The server will run on `http://localhost:3000`.

To view the database(Prisma Studio):
```
npx prisma studio
```
The server will run on `http://localhost:5555`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
