import addIcon from "../images/add.png";
import smallAddIcon from "../images/addSmall.png";

class domChangeObject{
    constructor(projects){
        this.mainBody = document.querySelector('body');
        this.sectionProjectList = document.querySelector('.sectionProject');
        this.sectionProjectHeader = document.querySelector('h1');
        this.sectionTodoList = document.querySelector('.sectionTodo');
        this.buttonEditProjectTitle = document.querySelector('.buttonEditProjectTitle');
        this.buttonDelete = document.querySelector('.buttonDelete');
        this.formAdd = document.querySelector('.divDialogAdd');
        this.formEdit = document.querySelector('.formDialogEdit');
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

        this.formAdd.addEventListener("submit",(e)=>{
            const dialog = document.querySelector('#dialogAdd');
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
            this.formAdd.reset();
            this.resetProjectList();
            this.resetTodoList();
            this.fillProject(projects);
            this.fillTodoList(projects, projectId);
            dialog.close();
        });
        this.formEdit.addEventListener("submit",(e)=>{
            const dialog = document.querySelector('#dialogEdit');
            e.preventDefault();
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
            console.log(project);
            this.fillTodoListIndividual(project,index,i);
        };
        this.fillTodoListAddButton(project,index);
    };
    fillProjectIndividual(projects,PROJECT_INDEX,TODO_INDEX){
        const project = projects.getProject()[PROJECT_INDEX];
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
            this.fillTodoList(projects,PROJECT_INDEX,TODO_INDEX);
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
        this.buttonEditProjectTitle.dataset.id = project.id;
        this.buttonDelete.dataset.id = project.id;
    };
    fillTodoListIndividual(projects,PROJECT_INDEX,TODO_INDEX){
        const project = projects.getProject()[PROJECT_INDEX].projectTodoList[TODO_INDEX];
        
        //const divId = document.createElement('p');
        const divTodo = document.createElement('div');
        const divTitle = document.createElement('div');
        const pTitle = document.createElement('p');
        const pDescription = document.createElement('p');
        const pDate = document.createElement('p');
        const pPriority = document.createElement('p');
        const pNotes = document.createElement('p');
        const pCheck = document.createElement('p');

        //divId.textContent = project.getId();
        pTitle.textContent = project.getTitle();
        pDescription.textContent = project.getDescription();
        pDate.textContent = project.getDueDate();
        pPriority.textContent = project.getPriority();
        pNotes.textContent = project.getNotes();
        pCheck.textContent = project.getCheck();
        divTodo.classList.add('divTodoList','bgColorDarkGrayHalfOpacity');

        //divTodo.appendChild(divId);
        divTitle.classList.add('divTodoTitle','bgColorDarkGray');
        pTitle.classList.add('pTitle','fontHeavy');
        pPriority.classList.add('pPriority');
        pCheck.classList.add('pCheck');
        pDate.classList.add('pDate');
        pDescription.classList.add('pDescription');
        pNotes.classList.add('pNotes');
        divTitle.appendChild(pTitle);
        divTodo.appendChild(divTitle);
        divTodo.appendChild(pDescription);
        divTodo.appendChild(pDate);
        divTitle.appendChild(pPriority);
        divTodo.appendChild(pNotes);
        divTitle.appendChild(pCheck);
        divTodo.dataset.projectId = projects.getProject()[PROJECT_INDEX].id;
        divTodo.dataset.todoId = project.getId();
        divTodo.addEventListener("click",(e)=>{
            this.openEdit(projects,PROJECT_INDEX,TODO_INDEX);
        });
        this.sectionTodoList.appendChild(divTodo);
    };
    fillTodoListAddButton(projects,PROJECT_INDEX){
        const project = projects.getProject()[PROJECT_INDEX];
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
        const dialog = document.querySelector('#dialogAdd');
        const dialogButtonClose = document.querySelector('.buttonDialogClose');
        dialog.showModal();
        dialogButtonClose.addEventListener("click",(e)=>{
            e.preventDefault();
            dialog.close();
        });
    };
    openEdit(projects,PROJECT_INDEX,TODO_INDEX){
        const dialog = document.querySelector('#dialogEdit');
        const dialogButtonClose = document.querySelector('.buttonDialogEditClose');
        dialog.showModal();
        this.fillEditModal(projects,PROJECT_INDEX,TODO_INDEX);
        dialogButtonClose.addEventListener('click',(e)=>{
            e.preventDefault();
            dialog.close();
        });
    };
    fillEditModal(projects,PROJECT_INDEX,TODO_INDEX){
        const project = projects.getProject()[PROJECT_INDEX].projectTodoList[TODO_INDEX];
        const submitButton = document.querySelector('.buttonEditSubmit');
        submitButton.dataset.id = projects.getProject()[PROJECT_INDEX].id;
        submitButton.dataset.todoId = project.getId();
        const pMainTodoTitle = document.querySelector('.pMainTodoTitle');
        const inputEditTitle = document.querySelector('.inputEditTitle');
        const inputEditProjectTitle = document.querySelector('.inputEditProjectTitle');
        const inputEditDescription = document.querySelector('.inputEditDescription');
        const inputEditDate = document.querySelector('.inputEditDate');
        const inputEditPriority = document.querySelector('.inputEditPriority');
        const inputEditNotes = document.querySelector('.inputEditNotes');
        
        pMainTodoTitle.textContent = project.getTitle();
        inputEditTitle.value = project.getTitle();
        
        inputEditDescription.value = project.getDescription();
        inputEditDate.value = project.getDueDate();
        inputEditPriority.value = project.getPriority();
        inputEditNotes.value = project.getNotes();
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