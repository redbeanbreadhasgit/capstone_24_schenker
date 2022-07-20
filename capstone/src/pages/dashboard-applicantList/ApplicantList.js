import React, { useState, useEffect, Component } from 'react';
import {Link as routerLink, Outlet } from 'react-router-dom';
import {Link as Link, TableSortLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title';
import applicants from '../jsonver3/applicant.json';
import pred from "../jsonver3/modelprediction.json";
import { Button, RootRef } from '@material-ui/core';
import Invoice from '../../routes/invoice';

import {getApplicantInfo, getJobInfo, getPredictionInfo, getApplicantsNum, getPredictionsNum} from "../jsonver3/jsonUtil";
import { tab } from '@testing-library/user-event/dist/tab';

import {EnhancedTableHead, getComparator, stableSort, } from "../components/enhancedTable";

import {tableStyle} from "../styles/tableStyle";

let predCount=getPredictionsNum();

const tableHead=[
  {
    id: "applicantName",
    label: "Name",
    numeric: false,
  },
  {
    id: "applicantAppliedRole",
    label: "Applied Role",
    numeric: false,
  },
  {
    id: "suitability",
    label: "Suitability",
    numeric: true,
  },
  {
    id: "applicantStatus",
    label: "Applicant Status",
    numeric: false,
  },
  {
    id: "date",
    label: "Date",
    numeric: false,
  },
];

// read raw data from databsse
function createTable(){
  let table=[];
  for (let i=1; i<=getApplicantsNum(); i++){
    table.push(getApplicantInfo(i));
  }
  return table;
}

// generated processed data
function createEnhancedData(applicantID, applicantName, applicantAppliedRole, suitability, applicantStatus, date) {
  return { applicantID, applicantName, applicantAppliedRole, suitability, applicantStatus, date };
}

// generated table from processed data
function createEnhancedTableBody(){
  let table=createTable();
  let enhancedTableBody=[];
  table.map ((each) => enhancedTableBody.push(createEnhancedData(
    each.applicantID, 
    each.applicantName,
    getJobInfo(each.applicantAppliedJobID).jobTitle,
    getPredictionInfo(each.applicantID,each.applicantAppliedJobID).predictionResult,
    each.pendingStatus,
    "null",
  )));
  return enhancedTableBody;
}


// generate all predictions
let predList=[];
for (var i in pred.rows){
  predList.push(pred.rows[i][1])
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

// function result (i){
//     return getPredictionInfo(i.applicantID,i.applicantAppliedJobID).predictionResult;
// };

// // sort by suitability , id
// function sortSuitability(x,y){
//   if (result(x) < result(y)) {return 1;}
//   if (result(x) > result(y)) {return -1;}
//   return 0;
// }



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

//table head





// function UpdatedTableBody(props){
//   const {tableInfo}= props;
//   return (
//     <TableBody>
//       {tableInfo.map((each) => (
//             <TableRow >
//               {/* <TableCell>{each.applicantID}</TableCell> */}              
//               <TableCell><Link component={routerLink} to={`/applicantList:${each.applicantID}` } >{each.applicantName}</Link></TableCell>
//               <TableCell>{each.applicantAppliedJobID}</TableCell>
//               <TableCell>{getPredictionInfo(each.applicantID,each.applicantAppliedJobID).predictionResult}</TableCell>
//               <TableCell>{each.pendingStatus}</TableCell>
//               <TableCell>{"null"}</TableCell>
//               {/* <TableCell align="right">{row.selected}</TableCell> */}
//             </TableRow>
//           ))}
//     </TableBody>
//   )
// }

// export default function Orders() {

//   const [table,setTable]=React.useState(createTable());

//   const sortHandler= (property) => (event) => {
//     setTable(table.sort(sortSuitability));
//   }

//   const classes = useStyles();
  
//   return (
//     <React.Fragment>
//       {/* <Title>All Applicants</Title> */}
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             {/* <TableCell>ID</TableCell> */}
//             {
//               tableHead.map((eachCell) => (
//                 <TableCell
//                   key={eachCell.id}
//                   align={eachCell.numeric? "right" : "left"}
//                   >
//                     <TableSortLabel
//                       // active={orderBy === eachCell.id}
//                       // direction={orderBy === eachCell.id ? order : 'asc'}
//                       // onClick={createSortHandler(eachCell.id)}
//                       onClick={()=>{
//                         setTable(() => [...table.sort(sortSuitability)])
//                         }
//                       }
//                     >
//                     {eachCell.label}
//                     </TableSortLabel>
//                 </TableCell>
//               ))
//             }

//             {/* <TableCell>Name</TableCell>
//             <TableCell>Applied Role</TableCell>
//             <TableCell>Suitability</TableCell>
//             <TableCell>Applicant Status</TableCell>
//             <TableCell>Date</TableCell> */}
        
//           </TableRow>
//         </TableHead>
//         <UpdatedTableBody tableInfo={table}>
          
//         </UpdatedTableBody>        
//       </Table>


//       <Button variant="contained" color="primary" onClick={()=>{
//         setTable(() => [...table.sort(sortSuitability)])
//         }
//       }>sort by suitability %</Button>
      
//       <h3>{result(table[1])}</h3>

//       <Button variant="contained" color="primary">
        
//       </Button>
//       <div className={classes.seeMore}>
//         <Link color="primary" href="#" onClick={preventDefault}>
//           See more updates
//         </Link>
//       </div>

//       {/* <Outlet></Outlet> */}
//     </React.Fragment>
//   );
// }

export default function EnhancedTable() {
  const classes = tableStyle();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("applicantName");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    // switch between the 2 orders
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  

  return (
    <div className={classes.root}>
      
        
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              tableHeadCells={tableHead}
            />
            <TableBody>
              {stableSort(createEnhancedTableBody(), getComparator(order, orderBy))
              
                .map((each, index) => {

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow >
                      {/* <TableCell>{each.applicantID}</TableCell> */}              
                      <TableCell>
                        <Link component={routerLink} to={`/applicantList:${each.applicantID}` }>
                          {each.applicantName}
                          </Link>
                      </TableCell>
                      <TableCell>{each.applicantAppliedRole}</TableCell>
                      <TableCell align='right'>{each.suitability}</TableCell>
                      <TableCell>{each.applicantStatus}</TableCell>
                      <TableCell>{each.date}</TableCell>
                      {/* <TableCell align="right">{row.selected}</TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        
      
    </div>
  );
}






