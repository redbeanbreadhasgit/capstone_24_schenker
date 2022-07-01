import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionInfo, getAppliedApplicants} from "../json/jsonUtil";
import { Table, TableCell, TableHead, Typography, TableRow, TableBody } from "@material-ui/core";
import {Box} from '@material-ui/core';
import React from "react";
import Title from '../components/Title';



export function ReturnApplicantsInfo(){
    let params=useParams();
    let jobID=params.jobID;
    let jobSelected=getJobInfo(parseInt(jobID.substring(1,)));
    // let appliedApplicantsList=getAppliedApplicants(parseInt(jobID.substring(1,)));
    let appliedApplicantsList=[1,2,3];
    let test=getApplicantInfo(1);


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
                    <TableBody>
                        
                    </TableBody>
                </TableHead>
            </Table>
            <h3>{test}</h3>
        </React.Fragment>
    )
}