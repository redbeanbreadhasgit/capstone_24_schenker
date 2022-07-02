import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionInfo, getAllPredictionInfo} from "../json/jsonUtil";
import { Tab, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import {Box} from '@material-ui/core';
import Title from "../components/Title";
import {Select} from "@material-ui/core";


export function ReturnApplicantInfo(){
    let params=useParams();
    let applicantID=params.applicantID;
    let applicantSelected=getApplicantInfo(parseInt(applicantID.substring(1,),10));
    let jobSelected=getJobInfo(parseInt(applicantSelected.applicantJob));
    let predictionSelected=getPredictionInfo(parseInt(applicantID.substring(1,),10),parseInt(applicantSelected.applicantJob));
    
    
    
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
                    Applicant Status:  {applicantSelected.applicantStatus}
                </Box>
                
            </Typography>
            
        </div>
    );     
}

export function ReturnApplicantInfoTable(){
    let params=useParams();
    let applicantID=params.applicantID;
    let applicantSelected=getApplicantInfo(parseInt(applicantID.substring(1,),10));
    let jobSelected=getJobInfo(parseInt(applicantSelected.applicantJob));
    let predictionSelected=getPredictionInfo(parseInt(applicantID.substring(1,),10),parseInt(applicantSelected.applicantJob));
    
    let AllPredictionInfoTable=getAllPredictionInfo(applicantID.substring(1,),10);

    return(
        <div>
            <Title>
                Job Matching Results:
            </Title>
            <TableHead>
                <TableCell>Job Name</TableCell>
                <TableCell>% Suitability</TableCell>
                <TableCell>Rank in Job</TableCell>
                <TableCell>Applciant Job Skilles</TableCell>
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
            <Title>Reprofile</Title>
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