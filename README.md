# 🚍 SAFEBUS — Online Bus Ticket Booking System

SAFEBUS is a full-stack **Online Bus Ticket Booking System** built using **Django REST Framework** and **React**. The project focuses on solving real-world bus reservation challenges such as **concurrent seat booking**, **segment-wise seat availability**, **JWT authentication**, **email notifications**, and **cumulative fare calculation**, while providing a responsive and user-friendly experience.

🔗 **Live Demo:** *Coming Soon*

---

# ✨ Features

## 👤 For Travelers

- Secure User Registration & Login
- JWT Authentication with Access & Refresh Tokens
- Forgot Password using Email OTP
- Strong Password Validation
- Username, Phone Number & Input Validations
- Password Visibility Toggle
- Search Buses by Source, Destination & Travel Date
- Live Autocomplete for Stop Names
- Date Picker Prevents Past Date Selection
- View Bus Details without Login
- Interactive Seat Selection
- Lower & Upper Deck Seat Layout
- Seater & Sleeper Seat Support
- Real-Time Seat Locking (7 Minutes)
- Segment-wise Seat Booking
- Dummy Payment Integration
- Instant Ticket Booking
- Automatic Booking Confirmation Email
- Digital Ticket Generation
- Booking History (My Bookings)
- Fully Responsive UI

---

## 🚌 For Administrators

- Bus Management (Create, Update, Delete)
- Route Management
- Route Stop Management
- Trip Scheduling
- Fare Configuration
- Seat Layout Management
- View All Bookings
- Manage Available Trips
- Staff-only CRUD Operations
- Secure API Access using Custom Permissions

---

# 🏗️ Architecture Highlights

### 🔒 Concurrency-safe Seat Booking

- Uses **Database Transactions**
- Implements **select_for_update()** row-level locking
- Prevents multiple users from booking the same seat simultaneously

---

### 🎫 Segment-wise Seat Allocation

The same seat can be booked by different passengers if their travel segments do not overlap.

Example:

- Passenger A → Hyderabad → Bangalore
- Passenger B → Bangalore → Chennai

Both passengers can travel using the same seat.

---

### 💰 Cumulative Fare Calculation

Instead of storing fares for every possible source-destination combination, each stop stores a cumulative fare.

Fare Calculation:

```
Fare = Destination Fare - Boarding Fare
```

This reduces redundancy and simplifies fare management.

---

### 🔐 Security

- JWT Authentication
- Access & Refresh Tokens
- Protected APIs
- Custom Staff Permission Class
- Password Encryption
- Role-Based Authorization

---

### 📧 Email Notifications

- Password Reset OTP
- Booking Confirmation Email
- Digital Ticket Sent via Email
- Email failures never affect successful bookings

---

# 🛠️ Tech Stack

## Backend

- Python
- Django 5
- Django REST Framework
- Simple JWT
- MySQL
- Django Filter
- django-cors-headers

---

## Frontend

- React
- Vite
- React Router
- Axios
- CSS

---

## Authentication

- JWT Authentication
- Access Token
- Refresh Token

---

## Email Service

- Gmail SMTP
- OTP Verification
- Booking Confirmation Emails

---

# 📁 Project Structure

```text
SAFEBUS/
│
├── accounts/             # User Authentication & OTP
├── bookings/             # Booking Logic & Seat Locking
├── buses/                # Bus & Seat Management
├── routes/               # Routes & Stops
├── trips/                # Trip Scheduling
├── common/               # Shared Permissions
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│
├── manage.py
├── requirements.txt
└── README.md
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/MUDEM-NAGARAJU/SAFEBUS.git

cd SAFEBUS
```

---

## Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Create `.env`

```env
SECRET_KEY=your-secret-key

DEBUG=True

DB_NAME=safebus_db

DB_USER=root

DB_PASSWORD=yourpassword

DB_HOST=localhost

DB_PORT=3306

EMAIL_HOST_USER=youremail@gmail.com

EMAIL_HOST_PASSWORD=your-app-password
```

---

### Run Migrations

```bash
python manage.py migrate
```

---

### Create Admin

```bash
python manage.py createsuperuser
```

---

### Start Backend

```bash
python manage.py runserver
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📡 API Modules

- Authentication
- User Management
- Bus Management
- Route Management
- Trip Management
- Booking Management
- Seat Management

---

# 🎯 Key Functionalities

- User Authentication
- Bus Search
- Route Search
- Seat Selection
- Seat Locking
- Segment-wise Booking
- Fare Calculation
- Booking Confirmation
- Email Notifications
- Ticket Generation
- Booking History
- Admin Management

---

# 🔮 Future Enhancements

- Razorpay / Stripe Payment Gateway
- QR Code Based E-Tickets
- Live Bus Tracking
- SMS Notifications
- Refund Management
- Bus Reviews & Ratings
- Coupons & Offers
- Multi-language Support
- Docker Deployment
- CI/CD with GitHub Actions
- Cloud Deployment (AWS / Azure)

---

# 👨‍💻 Author

**Mudem Nagaraju**

Backend Developer

- Python
- Django
- Django REST Framework
- React
- MySQL
- REST APIs

GitHub: **https://github.com/MUDEM-NAGARAJU**

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.

---

# 📄 License

This project is developed for learning, portfolio, and educational purposes.
