import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title';

import pred from "../jsonver3/modelprediction.json";

import { Button, RootRef } from '@material-ui/core';

import {getApplicantInfo, getJobInfo, getPredictionInfo, getJobsNum,getPredictionsNum, getUserInfo} from "../jsonver3/jsonUtil";
import {Link as routerLink, Outlet } from 'react-router-dom';

import {EnhancedTableHead, getComparator, stableSort, } from "../components/enhancedTable";
import {tableStyle} from "../styles/tableStyle";

let jobnum=getJobsNum();
let predCount=getPredictionsNum();

{/* <TableCell>Job Title</TableCell>
<TableCell>Matching Date</TableCell>
<TableCell>Update Date</TableCell>
<TableCell>Hiring Manager</TableCell>
<TableCell>Recruiter</TableCell>
<TableCell>Job Description</TableCell>
<TableCell>Job Status</TableCell> */}

const tableHead = [
  {
    id: "jobTitle",
    label: "Job Title",
  },
  {
    id: "jobMatchingDate",
    label: "Matching Date",
  },
  {
    id: "jobUpdateDate",
    label: "Update Date",
  },
  {
    id: "recruiter",
    label: "Recruiter",
  },
  {
    id: "jobDescription",
    label: "Job Description",
  },
  {
    id: "jobStatus",
    label: "Job Status",
  },
];

function createTable(){
  let table=[];
  for (let i=1; i<=jobnum; i++){
    table.push(getJobInfo(i))
  }
  return table;
}

// generated processed data
function createEnhancedData(jobID, jobTitle, jobMatchingDate, jobUpdateDate, recruiter, jobDescription, jobStatus) {
  return {jobID, jobTitle, jobMatchingDate, jobUpdateDate, recruiter, jobDescription, jobStatus };
}

// generated table from processed data
function createEnhancedTableBody(){
  let table=createTable();
  let enhancedTableBody=[];
  table.map ((each) => enhancedTableBody.push(createEnhancedData(
    each.jobID,
    each.jobTitle, 
    each.jobMatchingDate,
    each.jobUpdateDate,
    getUserInfo(each.recruiterID).userFirstName + " " + getUserInfo(each.recruiterID).userLastName,
    each.jobDescription,
    each.jobStatus,
  )));
  return enhancedTableBody;
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



// rows.sort(sortSuitability);

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));




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
                        <Link component={routerLink} to={`/jobList:${each.jobID}`}>
                          {each.jobTitle}
                        </Link>
                      </TableCell>
                      <TableCell>{each.jobMatchingDate}</TableCell>
                      <TableCell>{each.jobUpdateDate}</TableCell>
                      <TableCell>{each.recruiter}</TableCell>
                      <TableCell>{each.jobDescription}</TableCell>
                      <TableCell>{each.jobStatus}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        
      
    </div>
  );
}

// export function JobListTable() {
//   const classes = useStyles();
//   const [rowsInfo,setRowsInfo]=useState(rows);
//   const prevRowsInfo=rows;
//   // useEffect(() => {
//   //   setRowsInfo(originRows)
//   // });
//   let table=createTable();
//   return (
//     <React.Fragment>
//       {/* <Title>All Jobs</Title> */}
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             {/* <TableCell>ID</TableCell> */}
//             <TableCell>Job Title</TableCell>
//             <TableCell>Matching Date</TableCell>
//             <TableCell>Update Date</TableCell>
//             <TableCell>Hiring Manager</TableCell>
//             <TableCell>Recruiter</TableCell>
//             <TableCell>Job Description</TableCell>
//             <TableCell>Job Status</TableCell>
//             {/* <TableCell align="right">Selected or not</TableCell> */}

//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {table.map((each) => (
//             <TableRow >
//               {/* <TableCell>{row.id}</TableCell> */}
//               <TableCell><Link component={routerLink} to={`/jobList:${each.jobID}`}>{each.jobTitle}</Link></TableCell>
//               <TableCell>{each.jobMatchingDate}</TableCell>
//               <TableCell>{each.jobUpdateDate}</TableCell>
//               <TableCell>{"*each.hiringManager*"}</TableCell>
//               <TableCell>{each.recruiterID}</TableCell>
//               <TableCell>{each.jobDescription}</TableCell>
//               <TableCell>{each.jobStatus}</TableCell>
//               {/* <TableCell align="right">{row.selected}</TableCell> */}
//             </TableRow>
//           ))}
//         </TableBody>        
//       </Table>
      
      
//       {/* <div className={classes.seeMore}>
//         <Link color="primary" href="#" onClick={preventDefault}>
//           See more updates
//         </Link>
//       </div> */}
      
//     </React.Fragment>
//   );
// }






