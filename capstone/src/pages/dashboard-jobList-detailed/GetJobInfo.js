import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionInfo} from "../json/jsonUtil";
import { Typography } from "@material-ui/core";
import {Box} from '@material-ui/core';


export default function ReturnJobInfo(){
    let params=useParams();
    let jobID=params.jobID;
    let jobSelected=getJobInfo(parseInt(jobID.substring(1,)));
    
    return (
        <div>
            <Typography variant="h5" >Selected Job : jobID {jobID}</Typography>
            <Typography>
                <Box fontWeight="fontWeightRegular" > 
                    Selected Applicant Infomation :
                </Box>
                <Box fontWeight="fontWeightBold" > 
                    Job ID : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic" > 
                    {jobSelected.jobID}
                </Box>
                <Box fontWeight="fontWeightBold" > 
                Job Name : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic" > 
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
                
            </Typography>
            {/* <Typography>Applicant ID : {applicantSelected.applicantID} </Typography>
            <Typography>Applicant Name : {applicantSelected.applicantName} </Typography>
            <Typography>Applicant File : {applicantSelected.applicantFile} </Typography>
            <Typography>Applicant Status : {applicantSelected.applicantStatus} </Typography>
            <Typography>Applicant Applied Job ID: {applicantSelected.applicantJob} </Typography>
            <Typography>Job Title : {jobSelected.jobTitle} </Typography>
            <Typography>Job Matching date : {jobSelected.jobMatchingDate} </Typography>
            <Typography>Job Update Date : {jobSelected.jobUpdateDate} </Typography>
            <Typography>Job Recruiter ID : {jobSelected.recruiterID} </Typography>
            <Typography>Job Hiring Manager ID : {jobSelected.hiringManagerID} </Typography>
            <Typography>Job Description : {jobSelected.jobDescription} </Typography>
            <Typography>Job Requirments : {jobSelected.jobRequirements} </Typography> */}

    
        </div>
    );     
}