# 💰 Statex - Smart Expense Tracker

A modern full-stack Expense Management System built with **React.js**, **Spring Boot**, and **MySQL**. Statex helps users securely manage daily expenses, analyze spending habits, and visualize financial data through an interactive dashboard.

---

## ✨ Features

- 🔐 JWT Authentication (Login & Register)
- 👤 User Profile Management
- 💸 Add, Edit & Delete Expenses
- 🔍 Search, Filter & Sort Expenses
- 📊 Interactive Dashboard
- 📈 Monthly Expense Analytics
- 🥧 Category-wise Expense Distribution
- 📋 Recent Transactions
- 🔒 Change Password
- 📱 Responsive Modern UI
- 🌙 Dark Theme

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Recharts
- Lucide React
- Framer Motion
- React Hot Toast

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- REST API

### Database
- MySQL

---

## 📂 Project Structure

```
Statex
│
├── statex-frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
└── expense/
    ├── controller/
    ├── service/
    ├── repository/
    ├── entity/
    ├── dto/
    └── config/
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/statex-expense-tracker.git
```

---

### Backend

```bash
cd expense
```

Configure MySQL in `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expensedb
spring.datasource.username=root
spring.datasource.password=yourpassword
```

Run

```bash
mvn spring-boot:run
```

---

### Frontend

```bash
cd statex-frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Application:

```
http://localhost:5173
```

---

## 📊 Key Functionalities

### Authentication
- User Registration
- User Login
- JWT Authorization
- Secure Logout

### Expense Management
- Add Expense
- Update Expense
- Delete Expense
- Search Expenses
- Filter by Category
- Sort by Date & Amount

### Dashboard
- Total Expenses
- Highest Expense
- Average Expense
- Total Transactions
- Monthly Expense Chart
- Category Distribution
- Recent Transactions

### Analytics
- Monthly Expense Trend
- Top Spending Categories
- Spending Distribution
- Category Progress Bars

### Settings
- Update Profile
- Change Password
- Account Statistics

---

## 🔒 Security

- JWT Authentication
- Password Encryption (BCrypt)
- User-specific Expense Access
- Protected REST APIs

---

## 📈 Future Enhancements

- 📄 Export Expenses to PDF & Excel
- 📷 Receipt Upload
- 📧 Forgot Password via Email OTP
- 💰 Monthly Budget Management
- 🚨 Budget Alerts
- 🌐 Light/Dark Theme Toggle
- 🤖 AI-based Spending Analysis

---

## 👨‍💻 Developer

**Dhivyan Sree D**

LinkedIn: www.linkedin.com/in/dhivyan-sree-d-4121692a3

GitHub: https://github.com/dhivyan-git

---
