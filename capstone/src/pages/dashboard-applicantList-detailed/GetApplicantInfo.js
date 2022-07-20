import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionInfo, getAllPredictionInfo} from "../jsonver3/jsonUtil";
import { Tab, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import {Box} from '@material-ui/core';
import Title from "../components/Title";
import {Select} from "@material-ui/core";

import {EnhancedTableHead, getComparator, stableSort, } from "../components/enhancedTable";
import {tableStyle} from "../styles/tableStyle";

import { useState } from "react";

export function ReturnApplicantInfo(){
    let params=useParams();
    let applicantID=parseInt(params.applicantID.substring(1,),10);
    let applicantSelected=getApplicantInfo(applicantID);
    let jobSelected=getJobInfo(parseInt(applicantSelected.applicantAppliedJobID));
    let predictionSelected=getPredictionInfo(applicantID,parseInt(applicantSelected.applicantJob));
    let AllPredictionInfoTable=getAllPredictionInfo(applicantID);
    
    
    
    return (
        <div>
            {/* <Typography variant="h5" >Selected Applicant : applicantID {applicantID}</Typography> */}
            {/* <Typography>
                <Box fontWeight="fontWeightRegular" > 
                    Selected Applicant Infomation :
                </Box>
                <Box fontWeight="fontWeightBold" > 
                    Applicant ID : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic" > 
                    {applicantSelected.applicantID}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Applicant Name : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic" > 
                {applicantSelected.applicantName}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Applicant File : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {applicantSelected.applicantFile} 
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Applicant Status : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {applicantSelected.applicantStatus}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Applicant Applied Job ID: 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {applicantSelected.applicantJob}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Title : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {jobSelected.jobTitle}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Matching date : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {jobSelected.jobMatchingDate}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Update Date : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {jobSelected.jobUpdateDate}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Recruiter ID : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {jobSelected.recruiterID}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Hiring Manager ID : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {jobSelected.hiringManagerID}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Description :  
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {jobSelected.jobDescription}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Requirments : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {jobSelected.jobRequirements}
                </Box> 
                <Box fontWeight="fontWeightBold" > 
                Prediction ID : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {predictionSelected.predictionID}
                </Box>  
                <Box fontWeight="fontWeightBold" > 
                Prediction Result (%) : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {predictionSelected.predictionResult*100} %
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Applicant Education Level : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {predictionSelected.applicantEducation}
                </Box>          
                <Box fontWeight="fontWeightBold" > 
                Applicant Experience : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {predictionSelected.applicantExperience}
                </Box>  
                <Box fontWeight="fontWeightBold" > 
                Prediction Skills : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                {predictionSelected.applicantSkills}
                </Box>
            </Typography> */}
        
            <Typography>
                <Box fontWeight={"fontWeightBold"}>
                    Applicant Applied Job: {jobSelected.jobTitle}
                </Box>
                <Box fontWeight={"fontWeightBold"}>
                    Current Reprofiled Job: {}
                </Box>
                <Box fontWeight={"fontWeightBold"}>
                    Applicant Status:  {applicantSelected.pendingStatus}
                </Box>
                
            </Typography>
            
        </div>
    );     
}

export function ReturnApplicantInfoTable(){
    let params=useParams();
    let applicantID=parseInt(params.applicantID.substring(1,),10);
    let applicantSelected=getApplicantInfo(applicantID);
    let jobSelected=getJobInfo(parseInt(applicantSelected.applicantJob));
    let predictionSelected=getPredictionInfo(applicantID,parseInt(applicantSelected.applicantJob));
    let AllPredictionInfoTable=getAllPredictionInfo(applicantID);


    
    return(
        <div>
            <Title>
                Job Matching Results:
            </Title>
            <TableHead>
                <TableCell>Job Name</TableCell>
                <TableCell>% Suitability</TableCell>
                <TableCell>Rank in Job</TableCell>
                <TableCell>Applicant Job Skills</TableCell>
            </TableHead>
            <TableBody>
                {
                    AllPredictionInfoTable.map(each =>(
                        <TableRow>
                            <TableCell>{getJobInfo(each.jobID).jobTitle}</TableCell>
                            <TableCell>{each.predictionResult}</TableCell>
                            <TableCell>{each.Rank}</TableCell>
                            <TableCell>{each.applicantSkills}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </div>
    )
}

export function ReturnApplicantName(){
    let params=useParams();
    let applicantID=params.applicantID;
    let applicantSelected=getApplicantInfo(parseInt(applicantID.substring(1,),10));
    return applicantSelected.applicantName;
}

export function Reprofile(){


    return (
        <div>
            <Title>Update Applicant Status</Title>
            <TableHead>
                <TableCell>Recruiter Decision</TableCell>
                <TableCell>Or</TableCell>
                <TableCell>If profiling, select job:</TableCell>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell><Select></Select></TableCell>
                    <TableCell></TableCell>
                    <TableCell><Select></Select></TableCell>
                </TableRow>
            </TableBody>
        </div>

    )
}

export function ReturnApplicantHistory(){

    // const classes = tableStyle();
    // const [order, setOrder] = useState("asc");
    // const [orderBy, setOrderBy] = useState("jobTitle");

    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === "asc";
    //     // switch between the 2 orders
    //     setOrder(isAsc ? "desc" : "asc");
    //     setOrderBy(property);
    // }

    // // read raw data from databsse
    // function createTable(){
    //     let table=[];
    //     for (let i=1; i<=getApplicantsNum(); i++){
    //     table.push(getApplicantInfo(i));
    //     }
    //     return table;
    // }
    
    // // generated processed data
    // function createEnhancedData(applicantID, applicantName, applicantAppliedRole, suitability, applicantStatus, date) {
    //     return { applicantID, applicantName, applicantAppliedRole, suitability, applicantStatus, date };
    // }
    
    // // generated table from processed data
    // function createEnhancedTableBody(){
    //     let table=createTable();
    //     let enhancedTableBody=[];
    //     table.map ((each) => enhancedTableBody.push(createEnhancedData(
    //     each.applicantID, 
    //     each.applicantName,
    //     getJobInfo(each.applicantAppliedJobID).jobTitle,
    //     getPredictionInfo(each.applicantID,each.applicantAppliedJobID).predictionResult,
    //     each.pendingStatus,
    //     "null",
    //     )));
    //     return enhancedTableBody;
    // }

    let params=useParams();
    let applicantID=parseInt(params.applicantID.substring(1,),10);
    let applicantSelected=getApplicantInfo(applicantID);

    const tableHead=[
        {
            id:"jobTitle",
            label:"Job Title",
        },
        {
            id:"status",
            label:"Job Status",
        },
        {
            id:"applicantAppliedDate",
            label:"Date",
        },
        {
            id:"recruiter",
            label:"Recruiter",
        },
    ]

    return (
        <div>
            <Title>
                Applicant History
            </Title>
            {/* <Table
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
                                   
                        <TableCell>
                            <Link component={routerLink} to={`/applicantList:${each.applicantID}` }>
                            {each.applicantName}
                            </Link>
                        </TableCell>
                        <TableCell>{each.applicantAppliedRole}</TableCell>
                        <TableCell align='right'>{each.suitability}</TableCell>
                        <TableCell>{each.applicantStatus}</TableCell>
                        <TableCell>{each.date}</TableCell>
                       
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table> */}
        </div>
    )
}