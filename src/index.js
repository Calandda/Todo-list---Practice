import saveData from './data/saveData.js';
import './style.css';

console.log(saveData.classTest());
saveData.createProjectList('Project Test','default Project','Project Description','2025','1','Notes',true);
saveData.createProject('Daily');
saveData.createProjectList('Project2 Test','Daily','Project2 Description','2025','1','Notes',true);
saveData.createProjectList('Project2 Test2','Daily', 'Project2 Description', '2025', '2','Notes 2', false);
//console.log(saveData.getProjectList('Daily'));
saveData.changeProjectList('Project2 Test','Daily','Project2 NEW', 'Daily','TEST DESCRIPTION','TEST DUEDATE','1','TEST NOTES', false);
//console.log(saveData.checkProject());
console.log(saveData.getProject());
//console.log(saveData.deleteProject('default Project'));
console.log(saveData.getProject());
console.log(saveData.getProjectList('Daily'));
console.log(saveData.deleteProjectList('Project2 Test2','Daily'));
console.log(saveData.getProjectList('Daily'));
//title,description,dueDate,priority,notes,check