import saveData from './data/saveData.js';
import domChangeObject from './DOM/dom.js';
import './style.css';

console.log(saveData.classTest());
saveData.createProjectList('Project Test','default Project','Project Description','2025','1','Notes',true,0);
saveData.createProject('Daily');
saveData.createProjectList('Project2 Test','Daily','Project2 Description','2025','1','Notes',true,2);
saveData.createProjectList('Project2 Test2','Daily', 'Project2 Description', '2025', '2','Notes 2', false,2);
saveData.createProjectList('Project2 Test3', 'Daily', 'Project3 Description', '2025', '3', 'Notes 3', false,2);
//console.log(saveData.getProjectList('Daily'));
saveData.changeProjectList(null,null,'AAAAAAAAAAAAAAAAAAA', 'Daily','TEST DESCRIPTION','TEST DUEDATE','1','TEST NOTES', false,2,0,0);
//console.log(saveData.checkProject());
//console.log(saveData.getProject());
//console.log(saveData.deleteProject(1));
//console.log(saveData.getProject());
//console.log(saveData.getProjectList('Daily'));
//console.log(saveData.deleteProjectList(2, 1));
//console.log(saveData.getProjectList('Daily'));
//title,description,dueDate,priority,notes,check

const domChange = new domChangeObject(saveData);