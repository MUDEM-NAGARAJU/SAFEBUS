# 🚌 SAFEBUS

A modern **Bus Ticket Booking & Management System** built using **Django REST Framework**. SAFEBUS provides a secure backend API for passengers, bus operators, and administrators to manage routes, buses, bookings, payments, and trip operations efficiently.

---

## 📌 Project Overview

SAFEBUS is a backend-focused application designed to simplify online bus ticket booking and transportation management.

The system allows users to:

- Search buses between locations
- Book bus tickets
- Manage bookings
- View trip details
- Secure authentication
- Bus & route management
- Admin dashboard support
- RESTful APIs for frontend integration

---

## 🚀 Features

### 👤 User Features

- User Registration
- Secure Login
- JWT Authentication
- Profile Management
- Search Buses by Source & Destination
- View Bus Details
- View Available Seats
- Seat Selection During Booking
- Book Bus Tickets
- Cancel Bookings
- View Booking History
- View Upcoming Trips

---

### 🚌 Bus Management

- Add, Update & Delete Buses
- Bus Types
- Total Seat Management
- Bus Availability
- Amenities Management

---

### 🛣 Route Management

- Create Routes
- Update Routes
- Delete Routes
- Source & Destination Management
- Intermediate Stops

---

### 📅 Trip Management

- Schedule Trips
- Departure & Arrival Time
- Seat Availability Tracking
- Trip Status Management

---

### 🎫 Booking Management

- Real-Time Seat Booking
- Interactive Seat Selection
- Booking Confirmation
- Booking History
- Ticket Cancellation

---

### 📧 Notifications

- Automatic Booking Confirmation Email
- Ticket Details Sent via Email
- Booking Status Notifications

---

### 🔒 Security

- JWT Authentication
- Protected REST APIs
- Role-Based Authorization
- Password Encryption
- Token Verification

---

### ⚙ Developer Features

- RESTful APIs
- Django REST Framework
- MySQL Database
- API Testing with Postman
- Clean Project Structure

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| Python | Programming Language |
| Django | Web Framework |
| Django REST Framework | REST APIs |
| MySQL | Database |
| JWT | Authentication |
| Postman | API Testing |
| Git | Version Control |
| GitHub | Source Code |

---

## 📂 Project Structure

```
SAFEBUS/
│
├── accounts/
├── bookings/
├── buses/
├── routes/
├── trips/
├── payments/
├── users/
├── config/
├── media/
├── requirements.txt
├── manage.py
└── README.md
```

> Folder names may vary slightly depending on your implementation.

---

## ⚙ Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Move to Project

```bash
cd SAFEBUS
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Database

Update your MySQL credentials inside:

```
settings.py
```

### Run Migrations

```bash
python manage.py makemigrations

python manage.py migrate
```

### Create Superuser

```bash
python manage.py createsuperuser
```

### Run Server

```bash
python manage.py runserver
```

---

## 📡 API Modules

- Authentication
- Users
- Buses
- Routes
- Trips
- Bookings
- Payments
- Admin

---

## 🔑 Authentication

This project uses **JWT Authentication**.

Example Authorization Header

```
Authorization: Bearer <your_access_token>
```

---

## 🧪 API Testing

You can test all APIs using:

- Postman
- Thunder Client
- Insomnia

---

## 📈 Future Improvements

- Online Payment Gateway
- QR Code Ticket
- SMS Notifications
- Live Bus Tracking
- Bus Ratings & Reviews
- Refund Management
- Coupons & Offers
- Docker Deployment
- CI/CD Pipeline

---

## 👨‍💻 Author

**Nagaraju Mudem**

Backend Developer

- Python
- Django
- Django REST Framework
- MySQL
- REST APIs

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

---

## 📜 License

This project is created for learning, portfolio, and educational purposes.
