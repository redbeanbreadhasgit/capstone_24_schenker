import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionInfo} from "../json/jsonUtil";
import { Typography } from "@material-ui/core";
import {Box} from '@material-ui/core';

export function ReturnJobInfo(){
    let params=useParams();
    let jobID=params.jobID;
    let jobSelected=getJobInfo(parseInt(jobID.substring(1,)));
    
    return (
        <div>
            <Typography variant="h5" >Selected Job : jobID {jobID}</Typography>
            <Typography>

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
                    Job Requirments : 
                </Box>
                <Box fontWeight="fontWeightRegular" fontStyle="italic"> 
                    {jobSelected.jobRequirements}
                </Box> 

                {/* <Box fontWeight="fontWeightRegular" > 
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
                 */}
                
            </Typography>
        </div>
    );     
}

export function GetJobTitle(){
    let params=useParams();
    let jobID=params.jobID;
    let jobSelected=getJobInfo(parseInt(jobID.substring(1,)));

    return (jobSelected.jobTitle);
}