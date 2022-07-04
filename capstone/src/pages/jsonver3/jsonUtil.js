import allapplicants from "./applicant.json"
import alljobs from "./matchedjob.json"
import allpredictions from "./modelprediction.json"
import allusers from "./user.json"
import allapplicanthistory from "./applicanthistory.json"


let allApplicants=allapplicants.rows;
let allJobs=alljobs.rows;
let allPredictions=allpredictions.rows;
let allUsers=allusers.rows;
let allApplicantHistory=allapplicanthistory.rows;


let allApplicantsNum=allApplicants.length;
let allJobsNum=allJobs.length;
let allPredictionsNum=allPredictions.length;
let allUsersNum=allUsers.length;
let allApplicantHistoryNum=allApplicantHistory.length;

export function getApplicantsNum(){
    return allApplicantsNum;
}

export function getJobsNum(){
    return allJobsNum;
}

export function getPredictionsNum(){
    return allPredictionsNum;
}

export function getUsersNum(){
    return allUsersNum;
}

export function getApplicantHistoryNum(){
    return allApplicantHistoryNum;
}

export function getApplicantInfo(applicantID){
    let applicantIDInt=parseInt(applicantID);
    for (let i=0; i<allApplicantsNum; i++){
        let entry= allApplicants[i];
        if (applicantIDInt==entry[0]){
            return ({applicantID:applicantID, applicantResume:entry[1], applicantName:entry[2], 
                    applicantAppliedJobID:entry[3], reprofile:entry[4],
                    reprofileID:entry[5], pendingStatus:entry[6]});
            }
        
    }
    return "error";
}

export function getJobInfo(jobID){
    let jobIDInt=parseInt(jobID);
    for (let i=0; i<allJobsNum; i++){
        let entry= allJobs[i];
        if (jobIDInt===entry[0]){
            return ({jobID:entry[0], jobTitle:entry[1], 
                jobMatchingDate:entry[2], jobUpdateDate:entry[3], 
                recruiterID:entry[4], jobDescription:entry[5], 
                jobKeywords:entry[6], jobStatus:entry[7]});                
            }
    }
    return "error";
}

export function getPredictionInfo(applicantID, jobID){
    let applicantIDInt=parseInt(applicantID);
    let jobIDInt=parseInt(jobID);
    for (let i=0; i<allPredictionsNum; i++){
        let entry= allPredictions[i];
        if (applicantIDInt===entry[2] && jobIDInt===entry[3]){
            return ({predictionID:entry[0], predictionResult:entry[1], 
                applicantID:entry[2], jobID:entry[3], 
                applicantSkills:entry[4]});
        }
    }
    return "error";
}

export function getAllPredictionInfo(applicantID){
    let applicantIDInt=parseInt(applicantID);
    let result=[];
    // let jobIDInt=parseInt(jobID);
    for (let i=0; i<allPredictionsNum; i++){
        let entry= allPredictions[i];
        if (applicantIDInt===entry[2] ){
            result.push({predictionID:entry[0], predictionResult:entry[1], 
                applicantID:entry[2], jobID:entry[3], 
                applicantSkills:entry[4]});
        }
    }
    if (result.length===0){
        return "error";
    }
    else{
        return result;
    }
}

export function getApplicantHistoryInfo(applicantID){
    let result=[];
    let applicantIDInt=parseInt(applicantID)
    
    for (let i=0; i<allApplicantHistoryNum; i++){
        let entry=allApplicantHistory[i];
        if (applicantIDInt===entry[2]){
            result.push({historyID:entry[0], pendingStatus:entry[1]
                , applicantID:entry[2], jobID:entry[3]
                , recruiterID:entry[4], statusChangeDate: entry[5], })
        }
    }
    if (result.length===0){
        return "none of history";
    }else{
        return result;
    }

}

export function getUserInfo(userID){
    let userIDInt=parseInt(userID);
    for (let i=0; i<allUsersNum; i++){
        let entry=allUsers[i]
        if (userIDInt===entry[0]){
            return ({userID: entry[0], userName: entry[1], firstName: entry[2], lastName: entry[3],
            password: entry[4], lastLogin: entry[5], isSuperUser: entry[6], email: entry[7],
            isStaff: entry[8], isActive: entry[9], dateJoined: entry[10]})
        }
    }
    return "error";
}

// this is only for applicant page - detailed
export function getAppliedApplicants(jobID){
    let result=[];
    let jobIDInt=parseInt(jobID);
    
    for (let i=1; i<=allApplicantsNum; i++){
        let appliedJobID=parseInt(getApplicantInfo(i).applicantJob);
        if (appliedJobID===jobIDInt){
            result.push(i);
        }
    }
    return result;
}

