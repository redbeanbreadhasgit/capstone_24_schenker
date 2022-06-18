import { useParams } from "react-router-dom";
import {getApplicantInfo, getJobInfo, getPredictionsInfo} from "../json/jsonUtil";
import { Typography } from "@material-ui/core";

export default function ReturnApplicantInfo(){
    let params=useParams();
    let applicantID=params.applicantID;
    let applicantSelected=getApplicantInfo(parseInt(applicantID.substring(1,),10));
    return (
        <div>
            <Typography>Selected Applicant : applicantID {applicantID}</Typography>
            <Typography>Selected Applicant Infomation : </Typography>
            <Typography>Applicant ID : {applicantSelected.applicantID} </Typography>
            <Typography>Applicant Name : {applicantSelected.applicantName} </Typography>
            <Typography>Applicant File : {applicantSelected.applicantFile} </Typography>
            <Typography>Applicant Status : {applicantSelected.applicantStatus} </Typography>
            <Typography>Applicant Applied Job ID: {applicantSelected.applicantJob} </Typography>
            <Typography>{applicantSelected[1]} </Typography>

    
        </div>
    );     
}