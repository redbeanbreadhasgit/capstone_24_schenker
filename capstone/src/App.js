import logo from './logo.svg';
import './App.css';
import SignIn from './pages/sign-in/SignIn.js'
import DashBoard_applicantList from './pages/dashboard-applicantList/Dashboard-applicantList'
import DashBoard_homepage from './pages/dashboard-homepage/Dashboard-homepage'
import DashBoard_createJobMatching from './pages/dashboard-createJobMatching/Dashboard-createJobMatching'
import Signup from "./pages/sign-up/SignUp.js"
import Dashboard_jobList from "./pages/dashboard-jobList/Dashboard-jobList.js"
import DashBoard_applicantList_detailed from './pages/dashboard-applicantList-detailed/Dashboard-applicantList-detailed';
import { Link, Outlet } from 'react-router-dom';

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

// import React from 'react';
// //import ReactDOM from 'react-dom';
// import Button from '@material-ui/core/Button';
// // font
// //import 'fontsource-roboto';

// function App() {
//   return (
//     <p>
//       <p color="primary">
//       hi Capstone
//       </p>
//       <h1 color="primary">
//       hi Capstone
//       </h1>
//       <h2 color="primary">
//       hi Capstone
//       </h2>

//       <Button variant="contained" color="primary">
//       hi Capstone
//       </Button>
//     </p>
    
//   );
// }

// // ReactDOM.render(<App />, document.querySelector('#app'));
// export default App;

function App() {
  return (
    // <SignIn>
    // </SignIn>
    // <DashBoard_applicantList>
    // </DashBoard_applicantList>
    // <DashBoard_homepage>
    // </DashBoard_homepage> 
    // // <DashBoard_createJobMatching>
    // // </DashBoard_createJobMatching>
    // <Signup></Signup>
    // <Dashboard_jobList></Dashboard_jobList>
    <DashBoard_applicantList_detailed></DashBoard_applicantList_detailed>


    // test
    // <div>
    //   <h1>Bookkeeper</h1>
    //   <nav
    //     style={{
    //       borderBottom: "solid 1px",
    //       paddingBottom: "1rem",
    //     }}
    //   >
    //     <Link to="/invoices">Invoices</Link> |{" "}
    //     <Link to="/expenses">Expenses</Link> |{" "}
    //     <Link to="/">Home</Link>
    //     <Outlet />
    //   </nav>
    // </div>

  );
}

export default App;
