import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';

import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Invoice from "./routes/invoice"
import Dashboard_homepage from './pages/dashboard-homepage/Dashboard-homepage'
import DashBoard_createJobMatching from './pages/dashboard-createJobMatching/Dashboard-createJobMatching'
import DashBoard_applicantList from './pages/dashboard-applicantList/Dashboard-applicantList'
import Dashboard_jobList from './pages/dashboard-jobList/Dashboard-jobList'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <BrowserRouter>
    {/* test */}
    {/* <Routes>
    <Route path="/" element={<App />} >
      <Route path="/invoices" element={<Invoices />}>
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        }
        />
        <Route path=":invoiceId" element={<Invoice />} />
      </Route> 
      <Route path="expenses" element={<Expenses />} />
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
      />
    </Route>
    </Routes> */}

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="homepage" element={<Dashboard_homepage />} />
      <Route path="createJobMatching" element={<DashBoard_createJobMatching/>} />
      <Route path="applicantList" element={<DashBoard_applicantList/>}/>
      <Route path="jobList" element={<Dashboard_jobList/>}/>
      <Route path="signIn" element={<SignIn/>}/>
      <Route path="signUp" element={<SignUp/>}/>      
    </Routes>

    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
