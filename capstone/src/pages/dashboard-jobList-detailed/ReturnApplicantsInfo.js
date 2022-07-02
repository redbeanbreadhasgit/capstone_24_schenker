import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionInfo, getAppliedApplicants} from "../json/jsonUtil";
import { Table, TableCell, TableHead, Typography, TableRow, TableBody } from "@material-ui/core";
import {Box} from '@material-ui/core';
import React from "react";
import Title from '../components/Title';
import { TabUnselected } from "@material-ui/icons";
import {Checkbox} from "@material-ui/core";

function createTable(applicantList){
    let table=[];
    for (let i in applicantList){
        table.push(getApplicantInfo(applicantList[i]));
    }
    return table;
}


//checkboxes

function Checkboxes() {
    const [checked, setChecked] = React.useState(true);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
        <div>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>)
}

export function ReturnApplicantsInfo(){
    let params=useParams();
    let jobID=params.jobID;
    let jobSelected=getJobInfo(parseInt(jobID.substring(1,)));
    let appliedApplicantsList=getAppliedApplicants(parseInt(jobID.substring(1,)));
    let table=createTable(appliedApplicantsList);
    let suitability=getPredictionInfo()


    return (
        <React.Fragment>
            <Title>All applicants applied to this job</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Applicant Name</TableCell>
                        <TableCell>% Suitability</TableCell>
                        <TableCell>Skills</TableCell>
                        <TableCell>Applicant Status</TableCell>
                        <TableCell>Change Applicant Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        table.map(each => (
                            <TableRow>
                                <TableCell>{each.applicantName}</TableCell>
                                <TableCell>{getPredictionInfo(each.applicantID,each.applicantJob).predictionResult}</TableCell>
                                <TableCell>{getPredictionInfo(each.applicantID,each.applicantJob).applicantSkills}</TableCell>
                                <TableCell>{getApplicantInfo(each.applicantID).applicantStatus}</TableCell>
                                <TableCell><Checkbox/></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                
            </Table>
            {/* <text>Test: {appliedApplicantsList}</text> */}
        </React.Fragment>
    )
}