// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import EmployeeDashboard from './components/EmployeeDashboard';
// import ManagerDashboard from './components/ManagerDashboard';
// import FinanceDashboard from './components/FinanceDashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ForgotPasswordForm from './components/ForgotPasswordForm';
// import ResetPasswordForm from './components/ResetPasswordForm';

// function PrivateRoute({ children, role, allowedRoles }) {
//   return allowedRoles.includes(role) ? children : <Navigate to="/" />;
// }

// function App() {
//   const [role, setRole] = useState(localStorage.getItem('role') || '');

//   const handleLoginSuccess = (userRole) => {
//     setRole(userRole);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setRole('');
//   };

//   if (!role) {
//     return <LoginForm onLoginSuccess={handleLoginSuccess} />;
//   }

//   return (
//     <Router>
//       <div className="container mt-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h1>Welcome, {role}</h1>
//           <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
//         </div>

//         <Routes>
//           <Route 
//             path="/employee" 
//             element={
//               <PrivateRoute role={role} allowedRoles={['Employee']}>
//                 <EmployeeDashboard />
//               </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/manager" 
//             element={
//               <PrivateRoute role={role} allowedRoles={['Manager']}>
//                 <ManagerDashboard />
//               </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/finance" 
//             element={
//               <PrivateRoute role={role} allowedRoles={['Finance']}>
//                 <FinanceDashboard />
//               </PrivateRoute>
//             } 
//           />
//           {/* Redirect root or unknown routes to role-specific dashboard */}
//           <Route path="*" element={<Navigate to={`/${role.toLowerCase()}`} />} />
//         </Routes>
        
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import EmployeeDashboard from './components/EmployeeDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import FinanceDashboard from './components/FinanceDashboard';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute({ children, role, allowedRoles }) {
  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
}

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole('');
  };

  if (!role) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Welcome, {role}</h1>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <Routes>
          <Route
            path="/employee"
            element={
              <PrivateRoute role={role} allowedRoles={['Employee']}>
                <EmployeeDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <PrivateRoute role={role} allowedRoles={['Manager']}>
                <ManagerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/finance"
            element={
              <PrivateRoute role={role} allowedRoles={['Finance']}>
                <FinanceDashboard />
              </PrivateRoute>
            }
          />
          {/* Forgot and Reset password routes inside Routes */}
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password/:resetToken" element={<ResetPasswordForm />} />

          {/* Redirect root or unknown paths to role dashboard */}
          <Route path="*" element={<Navigate to={`/${role.toLowerCase()}`} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;