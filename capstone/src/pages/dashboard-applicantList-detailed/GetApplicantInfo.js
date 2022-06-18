import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionInfo} from "../json/jsonUtil";
import { Typography } from "@material-ui/core";
import {Box} from '@material-ui/core';


export default function ReturnApplicantInfo(){
    let params=useParams();
    let applicantID=params.applicantID;
    let applicantSelected=getApplicantInfo(parseInt(applicantID.substring(1,),10));
    let jobSelected=getJobInfo(parseInt(applicantSelected.applicantJob));
    let predictionSelected=getPredictionInfo(parseInt(applicantID.substring(1,),10),parseInt(applicantSelected.applicantJob));
    return (
        <div>
            <Typography variant="h5" >Selected Applicant : applicantID {applicantID}</Typography>
            <Typography>
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