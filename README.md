[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/e-commerce-ones-and-zeroes-fn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/e-commerce-ones-and-zeroes-fn?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/e-commerce-ones-and-zeroes-fn/badge.svg?branch=ch-Set-up-tests-on-the-client)](https://coveralls.io/github/atlp-rwanda/e-commerce-ones-and-zeroes-fn?branch=ch-Set-up-tests-on-the-client)

# e-commerce-ones-and-zeroes-fn

## Description

This repository contains the frontend code for an **Ones and Zeros E-commerce** platform built with React, Webpack, and Babel. The project aims to provide a seamless and responsive user experience for shopping online. It includes features such as product listings, shopping cart functionality, a user-friendly interface and other many features.

The frontend communicates with a backend service to fetch product data, handle user authentication, and process orders. This setup is designed to be easily extensible and ch-Set-up-tests-on-the-clienttainable, following best practices in modern web development.

## Setup

### Dependencies

Node.js (>= 14.x)
npm (>= 6.x)

## Getting Started

### 1. Clone the repository:

```
git clone https://github.com/atlp-rwanda/e-commerce-ones-and-zeroes-fn.git

cd e-commerce-ones-and-zeroes-fn

```

### 2. Install dependencies:

```
npm install

```

### 3. Create a .env file:

```
cp .env.example .env

```

## Run The Service

### 1. Start the development server:

```
npm start

```

## Microservices

This frontend application interacts with the following microservices:

**Product Service:** Handles product data.
**User Service:** Manages user authentication and registration.
**Order Service:** Processes orders and manages the shopping cart.

# Testing with Jest
This project uses Jest for unit and integration testing of React components with TypeScript.

### To run all tests once:

### `npm test`

### To run tests in watch mode:

### `npm run test:watch`

### To generate a coverage report:

### `npm run test:coverage`

## Deployment
