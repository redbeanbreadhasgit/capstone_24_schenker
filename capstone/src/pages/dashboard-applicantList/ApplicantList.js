import React, { useState, useEffect, Component } from 'react';
import {Link as routerLink, Outlet } from 'react-router-dom';
import {Link as Link} from '@material-ui/core';
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
import Invoice from '../../routes/invoice';

import {getApplicantInfo, getJobInfo, getPredictionInfo, getApplicantsNum, getPredictionsNum} from "../jsonver3/jsonUtil";
import { tab } from '@testing-library/user-event/dist/tab';




let num=getApplicantsNum();
let predCount=getPredictionsNum();
// generate all jobs

function createTable(){
  let table=[];
  for (let i=1; i<=getApplicantsNum(); i++){
    table.push(getApplicantInfo(i));
  }
  return table;
}

// for (let i=0; i<predCount; i++){
//   if (getPredictionInfo(i).predictionID === )
// }

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

let rows = [];

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


 
const prevRowsInfo=rows;

export default function Orders() {
  const classes = useStyles();
  const [rowsInfo,setRowsInfo]=useState(rows);
  const prevRowsInfo=rows;
  // useEffect(() => {
  //   setRowsInfo(originRows)
  // });
  let table=createTable();
  return (
    <React.Fragment>
      <Title>All Applicants</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>            
            <TableCell>Name</TableCell>
            <TableCell>Applied Role</TableCell>
            <TableCell>Suitability</TableCell>
            <TableCell>Pending Status</TableCell>
            <TableCell>Date</TableCell>
            {/* <TableCell align="right">Selected or not</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((each) => (
            <TableRow >
              <TableCell>{each.applicantID}</TableCell>
              
              <TableCell><Link component={routerLink} to={`/applicantList:${each.applicantID}` } >{each.applicantName}</Link></TableCell>
              <TableCell>{getJobInfo(each.applicantAppliedJobID).jobTitle}</TableCell>
              <TableCell>{getPredictionInfo(each.applicantID,each.applicantAppliedJobID).predictionResult}</TableCell>
              <TableCell>{each.pendingStatus}</TableCell>
              <TableCell>{"null"}</TableCell>
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
      <h3>{(applicants.rows)[4][1]}</h3>
      <Button variant="contained" color="primary">
        
      </Button>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more updates
        </Link>
      </div>

      {/* <Outlet></Outlet> */}
    </React.Fragment>
  );
}






