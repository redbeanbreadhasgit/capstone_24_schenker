import allapplicants from "./all_applicants.json"
import alljobs from "./all_jobs.json"
import allpredictions from "./model_prediction.json"

let allApplicants=allapplicants.rows;
let allJobs=alljobs.rows;
let allPredictions=allpredictions.rows;

let allApplicantsNum=allApplicants.length;
let allJobsNum=allJobs.length;
let allPredictionsNum=allPredictions.length;

export function getApplicantInfo(applicantID){
    for (let i=0; i<allApplicantsNum; i++){
        let entry= allApplicants[i];
        if (applicantID===entry[0]){
            return ({applicantID:applicantID, applicantName:entry[1], 
                applicantFile:entry[2], applicantStatus:entry[3], 
                applicantJob:entry[4]});
            }
        
    }
    return "error";
}

export function getJobInfo(jobID){
    for (let i=0; i<allJobsNum; i++){
        let entry= allJobs[i];
        if (jobID===entry[0]){
            return ({jobID:entry[0], jobTitle:entry[1], 
                jobMatchingDate:entry[2], jobUpdateDate:entry[3], 
                recruiterID:entry[4], hiringManagerID:entry[5], jobDescription:entry[6], jobRequirements:entry[7]});
                
            }
    }
    return "error";
}

export function getPredictionInfo(applicantID, jobID){
    for (let i=0; i<allPredictionsNum; i++){
        let entry= allPredictions[i];
        if (applicantID===entry[2] && jobID===entry[3]){
            return ({predictinoID:entry[0], predictionResult:entry[1], 
                applicantID:entry[2], jobID:entry[3], 
                applicantEducation:entry[4], applicantExperience:entry[5], applicantSkills:entry[6]});
        }
    }
    return "error";
}