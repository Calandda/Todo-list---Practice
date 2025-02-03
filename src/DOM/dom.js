class domChangeObject{
    constructor(projects){
        this.sectionProjectList = document.querySelector('.sectionProject');
        this.sectionProjectHeader = document.querySelector('h1');
        this.sectionTodoList = document.querySelector('.sectionTodo');
        this.buttonCreate = document.querySelector('.buttonCreate');
        this.fillProject(projects.getProject());
        this.changeHeader(projects.getProject()[0]);
        this.fillTodoList(projects.getProject()[0]);
        this.buttonCreate.addEventListener("click",(event) => {
            this.inputProjectIndividual_createDiv();
        });
    };
    fillProject(projects){
        const PROJECT_LENGTH = projects.length;
        for(let i = 0;i< PROJECT_LENGTH;i++){
            this.fillProjectIndividual(projects[i]);
        };
    };
    fillTodoList(project){
        const TODO_LENGTH = project.projectTodoList.length;
        for(let i = 0;i < TODO_LENGTH;i++){
            this.fillTodoListIndividual(project.projectTodoList[i]);
        };
    };
    fillProjectIndividual(project){
        const divProject = document.createElement('div');
        const pProjectTitle = document.createElement('p');
        const pTodoLength = document.createElement('p');
        pProjectTitle.textContent = project.projectName;
        divProject.classList.add('divProjectList');
        pTodoLength.classList.add('pTodoCount');
        pTodoLength.classList.add('bgColorDarkGrayHalfOpacity');
        pTodoLength.textContent = project.projectTodoList.length;
        divProject.appendChild(pProjectTitle);
        divProject.appendChild(pTodoLength);
        pProjectTitle.dataset.projectName = project.projectName;
        pTodoLength.dataset.projectName = project.projectName;
        divProject.dataset.projectName = project.projectName;
        divProject.addEventListener("click", (e)=>{
            this.resetTodoList();
            this.changeHeader(project);
            this.fillTodoList(project);
        });
        this.sectionProjectList.appendChild(divProject);
    };
    inputProjectIndividual_createDiv(){
        const divCreate = document.createElement('div');
        const inputCreate = document.createElement('input');
        const submitCreate = document.createElement('button');
        inputCreate.classList.add('inputCreate');
        divCreate.classList.add('divInputCreate','divProjectList');
        submitCreate.textContent = 'CREATE';

        divCreate.appendChild(inputCreate);
        submitCreate.addEventListener("click",(e)=>{
            this.inputProjectIndividual_deleteDiv();
        });
        divCreate.appendChild(submitCreate);
        this.sectionProjectList.appendChild(divCreate);
        
    };
    inputProjectIndividual_deleteDiv(){
        this.sectionProjectList.removeChild(this.sectionProjectList.lastChild);
    };
    changeHeader(project){
        this.sectionProjectHeader.textContent = project.projectName;
    };
    fillTodoListIndividual(project){
        const divTodo = document.createElement('div');
        const divTitle = document.createElement('p');
        const divDescription = document.createElement('p');
        const divDate = document.createElement('p');
        const divPriority = document.createElement('p');
        const divNotes = document.createElement('p');
        const divCheck = document.createElement('p');

        divTitle.textContent = project.getTitle();
        divDescription.textContent = project.getDescription();
        divDate.textContent = project.getDueDate();
        divPriority.textContent = project.getPriority();
        divNotes.textContent = project.getNotes();
        divCheck.textContent = project.getCheck();
        divTodo.classList.add('divTodoList','bgColorDarkGrayHalfOpacity');

        divTodo.appendChild(divTitle);
        divTodo.appendChild(divDescription);
        divTodo.appendChild(divDate);
        divTodo.appendChild(divPriority);
        divTodo.appendChild(divNotes);
        divTodo.appendChild(divCheck);
        this.sectionTodoList.appendChild(divTodo);
    };
    resetProjectList(){
        while(this.sectionProjectList.firstChild){
            this.sectionProjectList.removeChild(this.sectionProjectList.firstChild);
        };
    };
    resetTodoList(){
        while(this.sectionTodoList.firstChild){
            this.sectionTodoList.removeChild(this.sectionTodoList.firstChild);
        };
    };
}

export default domChangeObject;