import saveData from './data/saveData.js';

console.log(saveData.classTest());
saveData.createProjectList('Project Test','default Project','Project Description','2025','1','Notes',true);
saveData.createProject('Daily');
saveData.createProjectList('Project2 Test','Daily','Project2 Description','2025','1','Notes',true);
saveData.createProjectList('Project2 Test2','Daily', 'Project2 Description', '2025', '2','Notes 2', false);
saveData.changeProjectList('Project2 Test','Daily','Project2 Test', 'Daily','TEST DESCRIPTION','TEST DUEDATE','1','TEST NOTES', false);
console.log(saveData.checkProject());
//title,description,dueDate,priority,notes,check