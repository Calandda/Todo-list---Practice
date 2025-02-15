import addIcon from "../images/add.png";
import smallAddIcon from "../images/addSmall.png";
import checkedIcon from "../images/checklist-unchecked.png";
import uncheckedIcon from "../images/checklist-checked.png";
import bookmark from "../images/bookmark.png";
import bookmarkHeart from "../images/bookmark-heart.png";

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
        this.formHeaderEdit = document.querySelector('#formEditHeader');
        this.fillProject(projects);
        this.changeHeader(projects.getProject()[0]);
        this.fillTodoList(projects,0);

        this.buttonDelete.addEventListener("click",(e)=>{
            projects.deleteProject(e.target.dataset.id);
            this.resetProjectList();
            this.resetTodoList();
            this.changeHeader(projects.getProject()[0]);
            this.fillProject(projects);
            this.fillTodoList(projects,projects.getProject()[0].id);
        });

        this.formAdd.addEventListener("submit",(e)=>{
            const dialog = document.querySelector('#dialogAdd');
            const projectId = document.querySelector('h1').dataset.id;
            const buttonSubmit = document.querySelector('.buttonSubmit');
            e.preventDefault();
            const formData = new FormData(this.formAdd,buttonSubmit);
            projects.createProjectList(
                formData.get('inputTitle'),
                '',
                formData.get('inputDescription'),
                formData.get('inputDate'),
                0,
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
            const buttonEditSubmit = document.querySelector('.buttonEditSubmit');
            const formData = new FormData(this.formEdit,buttonEditSubmit);
            const projectId = document.querySelector('h1').dataset.id;
            projects.changeProjectList(
                null,
                null,
                formData.get('inputEditTitle'),
                null,
                formData.get('inputEditDescription'),
                formData.get('inputEditDate'),
                0,
                formData.get('inputEditNotes'),
                null,
                this.formEdit.dataset.projectId,
                null,
                this.formEdit.dataset.todoId);
            this.formEdit.reset();
            this.resetProjectList();
            this.resetTodoList();
            this.fillProject(projects);
            this.fillTodoList(projects, projectId);
            e.preventDefault();
            dialog.close();
        });
        this.formHeaderEdit.addEventListener('submit',(e)=>{
            const buttonHeaderEditSubmit = document.querySelector('.buttonHeaderEditSubmit');
            const index = projects.getProjectIndex(this.sectionProjectHeader.dataset.id);
            const formData = new FormData(this.formHeaderEdit,buttonHeaderEditSubmit);
            projects.changeProjectName(this.sectionProjectHeader.dataset.id,formData.get('inputHeaderTitle'));
            projects.getProject();
            this.resetProjectList();
            this.resetTodoList();
            this.fillProject(projects);
            this.fillTodoList(projects, this.sectionProjectHeader.dataset.id);
            this.formHeaderEdit.style.display = 'none';
            this.sectionProjectHeader.style.display = 'block';
            this.changeHeader(projects.getProject()[index]);
            e.preventDefault();
        });
        // changeProjectList(title,projectName,newTitle,newProjectName,description,dueDate,priority,notes,check,projectId,newProjectId,todoId)
    };
    fillProject(projects){
        let tempArray = projects.getProject();
        const PROJECT_LENGTH = tempArray.length;
        let index;
        for(let i = 0;i< PROJECT_LENGTH;i++){
            //index = projects.getProjectIndex(projects.getProject()[i].id);
            this.fillProjectIndividual(projects,projects.getProject()[i].id,i);
        };
        this.fillProjectAddButton(projects);
    };

    fillTodoList(projects,projectId){
        let index = projects.getProjectIndex(projectId);
        console.log('fillTodoList: LENGTH:' + projects.getProject().length + ' projectId:' + projectId +  ' INDEX:' + index);
        const TODO_LENGTH = projects.getProject()[index].projectTodoList.length; // CURRENTLY NOT WORKING
        
        for(let i = 0;i < TODO_LENGTH;i++){
            this.fillTodoListIndividual(projects,index,i);
        };
        this.fillTodoListAddButton(projects,index);
    };
    fillProjectIndividual(projects,projectId, PROJECT_INDEX){
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
            this.fillTodoList(projects,projectId);
        });
        divProject.draggable = true;
        this.sectionProjectList.appendChild(divProject);
    };
    fillProjectAddButton(project){
        const divAddButton = document.createElement('div');
        const imgAddButton = document.createElement('img');
        divAddButton.classList.add('divInputCreate','divProjectList','fontMedium');
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
        inputCreate.classList.add('inputCreate', 'fontMedium', 'bgColorWhiteGray', 'removeBorder','inputBorder');
        divCreate.classList.add('divInputCreate','divProjectList');
        submitCreate.textContent = 'CREATE';
        submitCreate.classList.add('buttonProject');
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
        const formHeaderEdit = document.querySelector('#formEditHeader');
        const inputHeaderTitle = document.querySelector('.inputHeaderTitle');
        inputHeaderTitle.value = project.projectName;
        this.sectionProjectHeader.textContent = project.projectName;
        this.sectionProjectHeader.dataset.id = project.id;
        this.buttonEditProjectTitle.dataset.id = project.id;
        this.buttonDelete.dataset.id = project.id;
        this.buttonEditProjectTitle.addEventListener("click",(e)=>{
            this.sectionProjectHeader.style.display = 'none';
            formHeaderEdit.style.display = 'flex';
        });
    };
    fillTodoListIndividual(projects,PROJECT_INDEX,TODO_INDEX){
        const project = projects.getProject()[PROJECT_INDEX].projectTodoList[TODO_INDEX];
        
        //const divId = document.createElement('p');
        const divTodo = document.createElement('div');
        const sectionTodo = document.createElement('section');
        const divTitle = document.createElement('div');
        const pTitle = document.createElement('p');
        const pPriority = document.createElement('img');
        const pCheck = document.createElement('img');

        const divDate = document.createElement('div');
        const pDateTitle = document.createElement('p');
        const pDate = document.createElement('p');

        const divDescription = document.createElement('div');
        const pDescription = document.createElement('p');
        const pDescriptionTitle = document.createElement('p');

        const divNotes = document.createElement('div');
        const pNotes = document.createElement('p');
        const pNotesTitle = document.createElement('p');

        //divId.textContent = project.getId();
        pTitle.textContent = project.getTitle();
       
        if(parseInt(project.getPriority()) === 0){
            pPriority.src = bookmark;
        } else if(parseInt(project.getPriority()) === 1){
            pPriority.src = bookmarkHeart;
        };
        
        divTodo.dataset.projectId = projects.getProject()[PROJECT_INDEX].id;
        divTodo.dataset.todoId = project.getId();
        pCheck.dataset.projectId = projects.getProject()[PROJECT_INDEX].id;
        pCheck.dataset.todoId = project.getId();
        pPriority.dataset.id = projects.getProject()[PROJECT_INDEX].id;
        pPriority.dataset.todoId = project.getId();

        pDateTitle.textContent = "DATE";
        pDate.textContent = project.getDueDate();
        
        pDescriptionTitle.textContent = 'DESCRIPTION';
        pDescription.textContent = project.getDescription();

        pNotesTitle.textContent = 'NOTES'
        pNotes.textContent = project.getNotes();
        
        if(project.getCheck() === true){
            pCheck.src = checkedIcon;
        } else if(project.getCheck() === false){
            pCheck.src = uncheckedIcon;
        }
        divTodo.classList.add('divTodoList','bgColorGray');
        sectionTodo.classList.add('sectionDivTodo');

        //divTodo.appendChild(divId);
        divTitle.classList.add('divTodoTitle','bgColorDarkGray');
        pTitle.classList.add('pTitle','fontHeavy','overflowFalse');
        pPriority.classList.add('pPriority');
        pCheck.classList.add('pCheck');

        divDate.classList.add('divDate','borderBlack','bgColorGray');
        pDateTitle.classList.add('pDateTitle', 'bgColorGray','fontHeavy');
        pDate.classList.add('pDate');

        divDescription.classList.add('divDescription', 'borderBlack', 'bgColorGray');
        pDescription.classList.add('pDescription', 'fontSmall');
        pDescriptionTitle.classList.add('pDescriptionTitle', 'bgColorGray','fontHeavy');
        
        divNotes.classList.add('divNotes','borderBlack','bgColorGray');
        pNotes.classList.add('pNotes','fontSmall');
        pNotesTitle.classList.add('pNotesTitle', 'bgColorGray', 'fontHeavy');


        divTitle.appendChild(pTitle);
        divTitle.appendChild(pPriority);
        divTitle.appendChild(pCheck);
        divTodo.appendChild(divTitle);

        divDate.append(pDateTitle);
        divDate.append(pDate);

        divDescription.append(pDescriptionTitle);
        divDescription.append(pDescription);

        divNotes.append(pNotesTitle);
        divNotes.append(pNotes);
        

        sectionTodo.append(divDate);
        sectionTodo.append(divDescription);
        sectionTodo.append(divNotes);
        divTodo.appendChild(sectionTodo);
        this.sectionTodoList.appendChild(divTodo);

        divTodo.addEventListener("click",(e)=>{
            if(e.target.classList[0] != 'pCheck' && e.target.classList[0] != 'pPriority'){
                this.openEdit(projects,PROJECT_INDEX,TODO_INDEX);
            }
        });
        pCheck.addEventListener("click",(e)=>{
            projects.setBoolean(parseInt(pCheck.dataset.projectId),parseInt(pCheck.dataset.todoId),'check');
            this.resetProjectList();
            this.resetTodoList();
            this.fillProject(projects);
            this.fillTodoList(projects, parseInt(pCheck.dataset.projectId));
        });
        pPriority.addEventListener("click",(e)=>{
            projects.setBoolean(parseInt(pCheck.dataset.projectId), parseInt(pCheck.dataset.todoId), 'priority');
            this.resetProjectList();
            this.resetTodoList();
            this.fillProject(projects);
            this.fillTodoList(projects, parseInt(pCheck.dataset.projectId));
        });
    };
    fillTodoListAddButton(projects,PROJECT_INDEX){
        const project = projects.getProject()[PROJECT_INDEX];
        const divAdd = document.createElement('div');
        const imgAdd = document.createElement('img');
        divAdd.classList.add('divAdd','divTodoList','bgColorDarkGrayHalfOpacity');
        imgAdd.src = addIcon;
        imgAdd.classList.add('imgAdd');
        divAdd.appendChild(imgAdd);
        //divAdd.dataset.id = project.id;
        divAdd.addEventListener("click", (e)=>{
            this.openAdd(project);
        });
        this.sectionTodoList.appendChild(divAdd);
    };
   
    openAdd(projects){
        const dialog = document.querySelector('#dialogAdd');
        const dialogButtonClose = document.querySelector('.buttonDialogClose');
        const inputDate = document.querySelector('.inputDate');
        inputDate.valueAsDate = new Date();
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
        const modalEdit = document.querySelector('.formDialogEdit');
        modalEdit.dataset.projectId = projects.getProject()[PROJECT_INDEX].id;
        modalEdit.dataset.todoId = project.getId();
        const submitButton = document.querySelector('.buttonEditSubmit');
        submitButton.dataset.id = projects.getProject()[PROJECT_INDEX].id;
        submitButton.dataset.todoId = project.getId();
        const pMainTodoTitle = document.querySelector('.pMainTodoTitle');
        const inputEditTitle = document.querySelector('.inputEditTitle');
        const inputEditProjectTitle = document.querySelector('.inputEditProjectTitle');
        const inputEditDescription = document.querySelector('.inputEditDescription');
        const inputEditDate = document.querySelector('.inputEditDate');
        //const inputEditPriority = document.querySelector('.inputEditPriority');
        const inputEditNotes = document.querySelector('.inputEditNotes');
        
        pMainTodoTitle.textContent = project.getTitle();
        inputEditTitle.value = project.getTitle();
        
        inputEditDescription.value = project.getDescription();
        inputEditDate.value = project.getDueDate();
        //inputEditPriority.value = project.getPriority();
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
    openHeaderEdit(){
    }
}

export default domChangeObject;