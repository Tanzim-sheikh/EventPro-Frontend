# 🎫 EvenZap - Event Booking Platform

A comprehensive MERN stack event booking and management platform with role-based access control, payment integration, and email notifications.

## 🌟 Features

- **Event Discovery** — Browse and filter events by category, date, location
- **Role-based Access** — Admin, Organizer, and User roles with unique permissions
- **Booking System** — Easy event booking with ticket selection
- **Payment Integration** — Secure payments via Razorpay
- **Email Notifications** — Automated confirmations and updates
- **Admin Dashboard** — Complete event and user management
- **Organizer Portal** — Create and manage events

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Redux Toolkit (for state management)
- Axios (HTTP client)

**Backend:**
- Node.js & Express.js
- MongoDB
- JWT Authentication
- Cloudinary (image uploads)
- NodeMailer (email service)
- Razorpay (payments)

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Razorpay Account
- Cloudinary Account

### Clone & Setup
```bash
git clone https://github.com/Tanzim-sheikh/Event-Management.git
cd Event-Management

# Backend
cd backend
npm install
# Create .env with MongoDB URI, JWT secret, Razorpay keys, Cloudinary credentials
npm start

# Frontend
cd ../frontend
npm install
npm start
```

## 👥 User Roles

### Admin
- Manage all users and organizers
- View all events and bookings
- Generate reports
- System management

### Organizer
- Create and edit events
- Manage event details and tickets
- View bookings for own events
- Track revenue

### User
- Browse and filter events
- Book tickets
- View booking history
- Receive email confirmations

## 💳 Payment Integration

- Razorpay test mode enabled
- Secure payment processing
- Automated receipt generation
- Payment status tracking

## 📧 Email Notifications

Users receive emails for:
- Booking confirmations
- Payment receipts
- Event reminders
- Cancellation confirmations

## 📸 Screenshots
[Add your screenshots]

## 🤝 Contributing
Feel free to contribute! Submit issues and pull requests.

## 📝 License
MIT License

## 👤 Author
**Tanzim Sheikh** — [GitHub](https://github.com/Tanzim-sheikh) | [LinkedIn](https://www.linkedin.com/in/tanzim-sheikh-a42159328)
