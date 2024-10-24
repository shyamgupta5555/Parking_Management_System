
# Parking Management System

## Overview

The Parking Management System allows users to book, search, and manage parking slots for different vehicles (bicycle, motorcycle, car). It supports dynamic pricing based on time (daily, weekly, monthly), different pricing models per vehicle, and various admin functionalities for managing slots and bookings.

## Features

- Parking Slot Management
- Dynamic Pricing (Day/Week/Month)
- Slot Booking 
- Vehicle Search
- User Details
- send Notification over Mail

## API Endpoints

### 1. **User Registration**

#### POST `/api/register`
- **Description**: Registers new user.
- **Payload**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "vehicleNumber": "ABC1234",
    "vehicleType": "car"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully!",
    "user": {
      "id": "60ab1234c567890d12345678",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "vehicleNumber": "ABC1234"
    }
  }
  ```

### 2. **Parking Slot Management**

#### POST `/api/parking/create`
- **Description**: Admin creates a new parking slot.
- **Payload**:
  ```json
  {
    "slotId": "A1",
    "vehicleType": "car",
    "location": "Ground Floor"
  }
  ```

- **Response**:
  ```json
  {
    "success": true,
    "message": "Parking slot created successfully!"
  }
  ```

### 3. **Book Parking Slot**

#### POST `/api/booking`
- **Description**: Book a parking slot.
- **Payload**:
  ```json
  {
    "userId": "60ab1234c567890d12345678",
    "slotId": "60bc5678d901234567890def",
    "vehicleType": "car",
    "startTime": "2024-10-25T10:00:00.000Z",
    "endTime": "2024-11-01T10:00:00.000Z",
    "paymentStatus": true
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Booking successful!",
    "booking": {
      "id": "60bc5678d901234567890def",
      "totalPrice": 2100
    }
  }
  ```

### 4. ** cancelParkingSlot Booking**

#### put `/api/booking/:bookingId`
- **Description**: when user  a booking.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Booking cancelled and slot freed!"
  }
  ```

### 5. **Search by Vehicle Number**

#### GET `/api/booking/searchByVehicle`
- **Description**: Search for an active booking by vehicle number.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Booking found",
    "booking": {
      "slotId": "60bc5678d901234567890def",
      "startTime": "2024-10-25T10:00:00.000Z",
      "endTime": "2024-11-01T10:00:00.000Z",
      "vehicleNumber": "ABC1234"
    }
  }
  ```

  
### 6. **Run cron for Notification **

- **Description**:Push  Notification Over Mail 


## Dynamic Pricing Calculation

When booking a slot for a time period, the system calculates the price based on:
- **Months**
- **Weeks**
- **Days**

For example, if a booking is for 87 days:
- **2 months** @ ₹1050 = ₹2100
- **2 weeks** @ ₹300 = ₹600
- **13 days** @ ₹60 = ₹780
- **Total** = ₹3480

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up the MongoDB connection in `.env`:
   ```
   MONGO_URI=
   ```
4. Run the server: `npm start`.

## Error Responses

- **400 Bad Request**:
  ```json
  {
    "success": false,
    "message": "Slot not available"
  }
  ```

- **404 Not Found**:
  ```json
  {
    "success": false,
    "message": "User not found"
  }
  ```

- **500 Internal Server Error**:
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```
- **Use Packages**: 
``` {express joi bcrypt nodemailer moment node-cron mongoose nodemon }```
