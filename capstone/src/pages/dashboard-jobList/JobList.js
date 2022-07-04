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
import jobs from "../json/all_jobs.json";
import { Button, RootRef } from '@material-ui/core';

import {getApplicantInfo, getJobInfo, getPredictionInfo, getJobsNum,getPredictionsNum} from "../jsonver3/jsonUtil";
import {Link as routerLink, Outlet } from 'react-router-dom';



let jobnum=getJobsNum();
let predCount=getPredictionsNum();

function createTable(){
  let table=[];
  for (let i=1; i<=jobnum; i++){
    table.push(getJobInfo(i))
  }
  return table;
}



function findSuitability(applicantId,jobId){
  let suitabilityList=[];
  for (var i=0; i<predCount;i++){
    let eachPredEntry=pred.rows[i];
    // console.log(eachPredEntry);s
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
];



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

const prevRowsInfo=rows;

export default function JobListTable() {
  const classes = useStyles();
  const [rowsInfo,setRowsInfo]=useState(rows);
  const prevRowsInfo=rows;
  // useEffect(() => {
  //   setRowsInfo(originRows)
  // });
  let table=createTable();
  return (
    <React.Fragment>
      <Title>All Jobs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Job Title</TableCell>
            <TableCell>Matching Date</TableCell>
            <TableCell>Update Date</TableCell>
            <TableCell>Hiring Manager</TableCell>
            <TableCell>Recruiter</TableCell>
            <TableCell>Job Description</TableCell>
            
            {/* <TableCell align="right">Selected or not</TableCell> */}

          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((each) => (
            <TableRow >
              {/* <TableCell>{row.id}</TableCell> */}
              <TableCell><Link component={routerLink} to={`/jobList:${each.jobID}`}>{each.jobTitle}</Link></TableCell>
              <TableCell>{each.jobMatchingDate}</TableCell>
              <TableCell>{each.jobUpdateDate}</TableCell>
              <TableCell>{"*each.hiringManager*"}</TableCell>
              <TableCell>{each.recruiterID}</TableCell>
              <TableCell>{each.jobDescription}</TableCell>
              {/* <TableCell align="right">{row.selected}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>        
      </Table>
      
      
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more updates
        </Link>
      </div> */}
      
    </React.Fragment>
  );
}






