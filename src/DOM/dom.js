class domChangeObject{
    constructor(projects){
        this.sectionProjectList = document.querySelector('.sectionProject');
        this.fillProject(projects);
        this.fillTodoList(projects[0]);
    };
    fillProject(projects){
        const PROJECT_LENGTH = projects.length;
        for(let i = 0;i< PROJECT_LENGTH;i++){
            this.fillProjectIndividual(projects[i]);
        };
    };
    fillTodoList(project){
        console.log(project);
    };
    fillProjectIndividual(project){
        const divProject = document.createElement('div');
        const pProjectTitle = document.createElement('p');
        const pTodoLength = document.createElement('p');
        console.log(project.projectName);
        pProjectTitle.textContent = project.projectName;
        divProject.classList.add('divProjectList');
        pTodoLength.classList.add('pTodoCount');
        pTodoLength.classList.add('bgColorDarkGray');
        pTodoLength.textContent = project.projectTodoList.length;
        divProject.appendChild(pProjectTitle);
        divProject.appendChild(pTodoLength);
        this.sectionProjectList.appendChild(divProject);
    };
}

export default domChangeObject;