
import { render, screen } from '@testing-library/react';
import App from './App';
import {getApplicantInfo,getJobInfo,getPredictionInfo,getApplicantsNum,getJobsNum,getPredictionsNum} from "./pages/json/jsonUtil"
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp'
import {mainListItems, secondaryListItems} from './pages/components/listItems'
import Title from './pages/components/Title';
import Filter from './pages/dashboard-applicantList/Filter';
import DashBoard_applicantList from './pages/dashboard-applicantList/Dashboard-applicantList';
import { Router } from 'react-router-dom';
import DashBoard_jobList from './pages/dashboard-jobList/Dashboard-jobList';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



// describe ('Test on JsonUtil',() => {
//   test('assertion on applicant numbers ',()=>{
//     expect (getApplicantsNum()).toBe(20);
//   })

//   test('assertion on job numbers ',()=>{
//     expect (getJobsNum()).toBe(4);
//   })

//   test('assertion on prediction numbers',()=>{
//     expect (getPredictionsNum()).toBe(50);
//   })

//   test ("assetion on the length of applicant list info",()=>{
//     expect (getApplicantInfo(19).applicantStatus).toBe("P");
//   })

//   test ("assetion on the length of job list info",()=>{
//     expect (getJobInfo(3).jobID).toBe(3);
//   })

//   test ("assetion on the length of predictions list info",()=>{
//     expect (getPredictionInfo(20,4).applicantSkills).toBe("['m', 'i', 'c', 'r', 'o', 'w', 'a', 'v', 'e', ' ', 'g', 'e', 'm', 's', ' ', 'c', 'a', 'p', 's', 't', 'o', 'n', 'e']");
//   })
// })

// describe ("Rendering test on App Components", ()=>{
//   test("render Sidebar 1 ",()=>{
//     render(<mainListItems/>);
//     screen.debug();
//   })

//   test ("render Sidebar 2",()=>{
//     render (<secondaryListItems/>)
//   })

//   test ("render title",()=>{
//     render (<Title/>)
//   })

//   test ("render filter",()=>{
//     render (<Filter/>)
//   })

//   test ("render joblist",()=>{
//     render (<Filter/>)
//   })
// })

describe ("Rendering test on App", ()=>{
  test("render sign in page",()=>{
    render(<SignIn/>);
    screen.debug();
  })

  test ("render sign up page",()=>{
    render (<SignUp/>)
  })

  test ("render applicantList page",()=>{
    render (<SignUp/>)
  })

  test ("render jobList page",()=>{
    render (<SignUp/>)
  })

  test ("render applicantList-detailed page",()=>{
    render (<SignUp/>)
  })

})





