import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title';
import applicants from '../json/all_applicants.json';
import pred from "../json/model_prediction.json";
import { Button, RootRef } from '@material-ui/core';



let num=applicants.rows.length;
let predCount=pred.rows.length;
// generate all jobs
let jobList=["Field Support Engineer","System Analyst","GPIS Executive","GPIS 2"];

// generate all predictions
let predList=[];
for (var i in pred.rows){
  predList.push(pred.rows[i][1])
}

// Generate Order Data
function createData(id, date, name, role, suitability, status, selected) {
  return { id, date, name, role, suitability, status,  selected };
}

function findSuitability(applicantId,jobId){
  let suitabilityList=[];
  for (var i=0; i<predCount;i++){
    let eachPredEntry=pred.rows[i];
    // console.log(eachPredEntry);
    if (eachPredEntry[2] === applicantId ){
      suitabilityList.push(eachPredEntry);
    }
    let length=suitabilityList.length;
    // console.log(predCount);
    for (var j=0;j<length;j++){
      if (suitabilityList[j][3]=== jobId){
        return suitabilityList[j][1]
      }      
    }
    // return "error";
  }
}

// findSuitability(1,1);

let rows = [
  // createData(0, '16 Mar, 2022', 'Elvis Presley', '45%', 'Java Engineer', 'rejected', 312.44),
  // createData(1, '16 Mar, 2022', 'Paul McCartney', '78%', 'C Engineer', 'completed', 866.99),
  // createData(2, '16 Mar, 2022', 'Tom Scholz', '19%', 'Data Analyst', 'rejected', 100.81),
  // createData(3, '16 Mar, 2022', 'Michael Jackson', '99%', 'Java Engineer', 'pending', 654.39),
  // createData(4, '15 Mar, 2022', 'Bruce Springsteen', '120%', 'Accountant', 'pending', 212.79),
];

// create rows
for (let i=0; i<num; i++){
  let eachApplicant=applicants.rows[i];
  let applicantId=eachApplicant[0];
  let jobId=eachApplicant[4];
  rows.push(createData(applicantId, "?" ,eachApplicant[1],jobList[jobId-1],findSuitability(applicantId,jobId),eachApplicant[3],0,0));
  
}

// sort by suitability , id
function sortSuitability(x,y){
  if (x.suitability < y.suitability) {return 1;}
  if (x.suitability > y.suitability) {return -1;}
  return 0;
}

function sortId(x,y){
  if (x.id < y.id) {return 1;}
  if (x.id > y.id) {return -1;}
  return 0;
}

function sortBySuitabilty(){
  rows.sort(sortSuitability);  
}

function sortById(){
  rows.sort(sortId);  
}

// rows.sort(sortSuitability);

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

// export default class extends React.Component{
//   render(){
//     const classes = useStyles();
//   return (
//     <React.Fragment>
//       <Title>Applications</Title>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Applied Role</TableCell>
//             <TableCell>Suitability</TableCell>
//             <TableCell>Pending Status</TableCell>
            
//             {/* <TableCell align="right">Selected or not</TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.id}</TableCell>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.role}</TableCell>
//               <TableCell>{row.suitability}</TableCell>
//               <TableCell>{row.status}</TableCell>
//               {/* <TableCell align="right">{row.selected}</TableCell> */}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Button variant="contained" color="primary" onClick={()=>{rows=rows.sort(sortSuitability)}}>sort 1</Button>
//       <Button variant="contained" color="primary">sort 2</Button>
//       <h3>{pred.rows[2]}</h3>
//       <div className={classes.seeMore}>
//         <Link color="primary" href="#" onClick={preventDefault}>
//           See more updates
//         </Link>
//       </div>
//     </React.Fragment>
//   );
//   }
// }
 
const prevRowsInfo=rows;

export default function Orders() {
  const classes = useStyles();
  const [rowsInfo,setRowsInfo]=useState(rows);
  const prevRowsInfo=rows;
  // useEffect(() => {
  //   setRowsInfo(originRows)
  // });
  return (
    <React.Fragment>
      <Title>Applications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Applied Role</TableCell>
            <TableCell>Suitability</TableCell>
            <TableCell>Pending Status</TableCell>
            
            {/* <TableCell align="right">Selected or not</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.suitability}</TableCell>
              <TableCell>{row.status}</TableCell>
              {/* <TableCell align="right">{row.selected}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>        
      </Table>
      <Button variant="contained" color="primary" onClick={()=>{
        setRowsInfo(rows.sort(sortSuitability))
        // setRowsInfo(prevRowsInfo => {
        //   console.log('read rowsInfo state in setRowsIngo function', prevRowsInfo);
        //   return prevRowsInfo;
        // });
        }
      }>sort by suitability %</Button>
      <Button variant="contained" color="primary" onClick={()=>{
        setRowsInfo(rows.sort(sortId))
        // setRowsInfo(prevRowsInfo => {
        //   console.log('read rowsInfo state in setRowsIngo function', prevRowsInfo);
        //   return prevRowsInfo;
        // });
        }
      }>sort by applicantId </Button>
      <h3>{pred.rows[2]}</h3>
      <Button variant="contained" color="primary">
        
      </Button>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more updates
        </Link>
      </div>
    </React.Fragment>
  );
}






