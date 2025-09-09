# Business Expense Reimbursement Portal

A full-stack application for submitting and managing business expense claims, built with React, Express, MongoDB, and Bootstrap.

---

## Getting Started

Follow these steps to set up and run the project after cloning:

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd business_expense
```

---

### 2. Install Backend Dependencies

```sh
npm install
```

---

### 3. Install Frontend Dependencies

```sh
cd client
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file in the project root with the following content (edit as needed):

```
MONGO_URI=mongodb://localhost:27017/expenseportal
JWT_SECRET=your_jwt_secret
```

If using email features (like password reset), add:

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASSWORD=yourpassword
```

---

### 5. Seed Initial Users (Optional)

Back in the root directory:

```sh
node registerUser.js
```

---

### 6. Start the Backend Server

```sh
node server.js
```

The backend will run on [http://localhost:5000](http://localhost:5000).

---

### 7. Start the Frontend React App

In a new terminal:

```sh
cd client
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

---

### 8. Access the App

Open [http://localhost:3000](http://localhost:3000) in your browser and log in with one of the seeded users.

---

## Summary

1. Clone the repo  
2. Install dependencies (backend & frontend)  
3. Set up `.env`  
4. Seed users (optional)  
5. Start backend  
6. Start frontend  
7. Open in browser
