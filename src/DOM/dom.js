import addIcon from "../images/add.png";
import smallAddIcon from "../images/addSmall.png";

class domChangeObject{
    constructor(projects){
        this.sectionProjectList = document.querySelector('.sectionProject');
        this.sectionProjectHeader = document.querySelector('h1');
        this.sectionTodoList = document.querySelector('.sectionTodo');
        this.buttonDelete = document.querySelector('.buttonDelete');
        this.fillProject(projects);
        this.changeHeader(projects.getProject()[0]);
        this.fillTodoList(projects.getProject()[0]);
        this.buttonDelete.addEventListener("click",(e)=>{
            projects.deleteProject(e.target.dataset.id);
            this.resetProjectList()
            this.resetTodoList();
            this.changeHeader(projects.getProject()[0]);
            this.fillProject(projects);
            this.fillTodoList(projects.getProject()[0]);
        });
    };
    fillProject(projects){
        let tempArray = projects.getProject();
        const PROJECT_LENGTH = tempArray.length;
        
        console.log(tempArray);
        for(let i = 0;i< PROJECT_LENGTH;i++){
            this.fillProjectIndividual(tempArray[i]);
        };
        this.fillProjectAddButton(projects);
    };

    fillTodoList(project){
        const TODO_LENGTH = project.projectTodoList.length;
        for(let i = 0;i < TODO_LENGTH;i++){
            this.fillTodoListIndividual(project.projectTodoList[i]);
        };
        this.fillTodoListAddButton();
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
    fillProjectAddButton(project){
        const divAddButton = document.createElement('div');
        const imgAddButton = document.createElement('img');
        divAddButton.classList.add('divInputCreate','divProjectList');
        imgAddButton.src = smallAddIcon;
        imgAddButton.classList.add('divAddSmall');
        divAddButton.appendChild(imgAddButton);
        divAddButton.addEventListener("click",(e)=>{
            this.projectAddButton_removeDiv();
            this.inputProjectIndividual_createDiv(project);
        });
        this.sectionProjectList.appendChild(divAddButton);
    };
    projectAddButton_removeDiv(){
        this.sectionProjectList.removeChild(this.sectionProjectList.lastChild);
    };
    inputProjectIndividual_createDiv(project){
        console.log(project);
        const divCreate = document.createElement('div');
        const inputCreate = document.createElement('input');
        const submitCreate = document.createElement('button');
        inputCreate.classList.add('inputCreate');
        divCreate.classList.add('divInputCreate','divProjectList');
        submitCreate.textContent = 'CREATE';
        divCreate.appendChild(inputCreate);
        submitCreate.addEventListener("click",(e)=>{
            project.createProject(inputCreate.value); 
            this.resetProjectList();
            this.fillProject(project);
        });
        divCreate.appendChild(submitCreate);
        this.sectionProjectList.appendChild(divCreate);
        
    };
    changeHeader(project){
        this.sectionProjectHeader.textContent = project.projectName;
        this.buttonDelete.dataset.id = project.id;
    };
    fillTodoListIndividual(project){
        const divId = document.createElement('p');
        const divTodo = document.createElement('div');
        const divTitle = document.createElement('p');
        const divDescription = document.createElement('p');
        const divDate = document.createElement('p');
        const divPriority = document.createElement('p');
        const divNotes = document.createElement('p');
        const divCheck = document.createElement('p');

        divId.textContent = project.getId();
        divTitle.textContent = project.getTitle();
        divDescription.textContent = project.getDescription();
        divDate.textContent = project.getDueDate();
        divPriority.textContent = project.getPriority();
        divNotes.textContent = project.getNotes();
        divCheck.textContent = project.getCheck();
        divTodo.classList.add('divTodoList','bgColorDarkGrayHalfOpacity');

        divTodo.appendChild(divId);
        divTodo.appendChild(divTitle);
        divTodo.appendChild(divDescription);
        divTodo.appendChild(divDate);
        divTodo.appendChild(divPriority);
        divTodo.appendChild(divNotes);
        divTodo.appendChild(divCheck);
        this.sectionTodoList.appendChild(divTodo);
    };
    fillTodoListAddButton(){
        const divAdd = document.createElement('div');
        const imgAdd = document.createElement('img');
        divAdd.classList.add('divAdd','divTodoList','bgColorDarkGrayHalfOpacity');
        imgAdd.src = addIcon;
        divAdd.appendChild(imgAdd);
        this.sectionTodoList.appendChild(divAdd);
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