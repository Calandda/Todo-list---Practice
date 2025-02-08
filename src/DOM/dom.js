import addIcon from "../images/add.png";
import smallAddIcon from "../images/addSmall.png";

class domChangeObject{
    constructor(projects){
        this.mainBody = document.querySelector('body');
        this.sectionProjectList = document.querySelector('.sectionProject');
        this.sectionProjectHeader = document.querySelector('h1');
        this.sectionTodoList = document.querySelector('.sectionTodo');
        this.buttonDelete = document.querySelector('.buttonDelete');
        this.form = document.querySelector('.divDialogEdit');
        this.fillProject(projects);
        this.changeHeader(projects.getProject()[0]);
        this.fillTodoList(projects,0);
        this.buttonDelete.addEventListener("click",(e)=>{
            projects.deleteProject(e.target.dataset.id);
            this.resetProjectList();
            this.resetTodoList();
            this.changeHeader(projects.getProject()[0]);
            this.fillProject(projects);
            this.fillTodoList(projects,0);
        });
        this.form.addEventListener("submit",(e)=>{
            const dialog = document.querySelector('dialog');
            const projectId = document.querySelector('h1').dataset.id;
            const buttonSubmit = document.querySelector('.buttonSubmit');
            e.preventDefault();
            console.log(projectId);
            const formUpdate = document.querySelector('form');
            const formData = new FormData(formUpdate,buttonSubmit);
            console.log(formData);
            projects.createProjectList(
                formData.get('inputTitle'),
                '',
                formData.get('inputDescription'),
                formData.get('inputDate'),
                formData.get('inputPriority'),
                formData.get('inputNotes'),
                false,
                parseInt(projectId)
            );
            this.form.reset();
            this.resetProjectList();
            this.resetTodoList();
            this.fillProject(projects);
            this.fillTodoList(projects, projectId);
            dialog.close();
        });
    };
    fillProject(projects){
        let tempArray = projects.getProject();
        const PROJECT_LENGTH = tempArray.length;
        for(let i = 0;i< PROJECT_LENGTH;i++){
            this.fillProjectIndividual(projects,i);
        };
        this.fillProjectAddButton(projects);
    };

    fillTodoList(project,index){
        const TODO_LENGTH = project.getProject()[index].projectTodoList.length;
        for(let i = 0;i < TODO_LENGTH;i++){
            this.fillTodoListIndividual(project.getProject()[index].projectTodoList[i]);
        };
        this.fillTodoListAddButton(project);
    };
    fillProjectIndividual(projects,index){
        const project = projects.getProject()[index];
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
            this.fillTodoList(projects,index);
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
        this.sectionProjectHeader.dataset.id = project.id;
        this.buttonDelete.dataset.id = project.id;
    };
    fillTodoListIndividual(project){
        //const divId = document.createElement('p');
        const divTodo = document.createElement('div');
        const divTitle = document.createElement('p');
        const divDescription = document.createElement('p');
        const divDate = document.createElement('p');
        const divPriority = document.createElement('p');
        const divNotes = document.createElement('p');
        const divCheck = document.createElement('p');

        //divId.textContent = project.getId();
        divTitle.textContent = project.getTitle();
        divDescription.textContent = project.getDescription();
        divDate.textContent = project.getDueDate();
        divPriority.textContent = project.getPriority();
        divNotes.textContent = project.getNotes();
        divCheck.textContent = project.getCheck();
        divTodo.classList.add('divTodoList','bgColorDarkGrayHalfOpacity');

        //divTodo.appendChild(divId);
        divTodo.appendChild(divTitle);
        divTodo.appendChild(divDescription);
        divTodo.appendChild(divDate);
        divTodo.appendChild(divPriority);
        divTodo.appendChild(divNotes);
        divTodo.appendChild(divCheck);
        divTodo.addEventListener("click",(e)=>{
            console.log('test');
        });
        this.sectionTodoList.appendChild(divTodo);
    };
    fillTodoListAddButton(project){
        const divAdd = document.createElement('div');
        const imgAdd = document.createElement('img');
        divAdd.classList.add('divAdd','divTodoList','bgColorDarkGrayHalfOpacity');
        imgAdd.src = addIcon;
        imgAdd.classList.add('imgAdd');
        divAdd.appendChild(imgAdd);
        divAdd.dataset.id = project.id;
        divAdd.addEventListener("click", (e)=>{
            this.openAdd(project);
        });
        this.sectionTodoList.appendChild(divAdd);
    };
   
    openAdd(projects){
        const dialog = document.querySelector('dialog');
        const dialogButtonClose = document.querySelector('.buttonDialogClose');
        
        dialog.showModal();
        dialogButtonClose.addEventListener("click",(e)=>{
            e.preventDefault();
            dialog.close();
        });
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