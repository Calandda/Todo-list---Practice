import {saveDataObject} from './saveData.js';

let saveData;
let saveDataTemp = new saveDataObject();
let projectObjectTemp = new saveDataObject();

if(!localStorage.getItem('saveData')){
    saveData = new saveDataObject();
    saveData.createProjectList('Project Test','default Project','Project Description','2025','1','Notes',true,0);
    saveData.createProject('Daily');
    saveData.createProjectList('Project2 Test','Daily','Project2 Description','01-01-1900','1','Notes',true,2);
    saveData.createProjectList('Project2 Test2','Daily', 'Project2 Description', '2025', '0','Notes 2', false,2);
    saveData.createProjectList('Project2 Test3', 'Daily', 'Project3 Description', '2025', '0', 'Notes 3', false,2);
    //console.log(saveData.getProjectList('Daily'));
    saveData.changeProjectList(null,null,'AAAAAAAAAAAAAAAAAAA', 'Daily','TEST DESCRIPTION','01-01-2000','1','TEST NOTES', false,2,0,0);
    saveData.changeProjectName(0,'TEST ONE');
    saveData.setBoolean(0,0,'priority');
    saveData.setBoolean(0,0,'check');
    localStorage.setItem('saveData',JSON.stringify(saveData));
} else {
    setData();
}

function setData(){
    saveData = JSON.parse(localStorage.getItem('saveData'));
    console.log(saveData);
    reassignObject();
}

function reassignObject(){
    Object.setPrototypeOf(saveData,saveDataTemp);
    saveData.reassign();
}


export default saveData;