class projectObject{
    constructor(title,projectName,description,dueDate,priority,notes,check,currentId){
        this.currentId = currentId;
        this.title = title;
        this.projectName = projectName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = 0;
        this.notes = notes;
        this.check = false;
    }
    getTitle(){
        return(this.title);
    };
    getProjectName(){
        return(this.projectName);
    };
    getDescription(){
        return(this.description);
    };
    getDueDate(){
        return(this.dueDate);
    };
    getPriority(){
        return(this.priority);
    };
    getNotes(){
        return(this.notes);
    };
    getCheck(){
        return(this.check);
    };
    getId(){
        return(this.currentId);
    };
    setTitle(temp){
        this.title = temp;
    };
    setProjectName(temp){
        this.projectName = temp;
    };
    setDescription(temp){
        this.description = temp;
    };
    setDueDate(temp){
        this.dueDate = temp;
    };
    setPriority(temp){
        console.log(this.priority);
        if(this.priority === 1){
            this.priority = 0;
        } else if(this.priority === 0){
            this.priority = 1;
        };
        console.log(this.priority);
    };
    setNotes(temp){
        this.notes = temp;
    };
    setCheck(temp){
        if(this.check === true){
            this.check = false;
        } else if(this.check === false){
            this.check = true;
        }
    };
}
class saveDataObject{
    projects = [];
    projectList = [];
    currentId = 0;

    constructor(){
        this.createProject('Default Project');
        //this.createProject('Default Project(2)');
    }
    classTest(){
        console.log('saveData confirmed');
    }
    createProject(projectName){
        let tempObject = {};
        tempObject.projectName = projectName;
        tempObject.todoId = 0;
        tempObject.id = this.currentId++;
        
        
        tempObject.projectTodoList = [];
        this.projects.push(tempObject);
    };
    createProjectList(title,projectName,description,dueDate,priority,notes,check,projectId){
        const PROJECT_LENGTH = this.projects.length;
        //const tempObject = projectObject(title,projectName,description,dueDate,priority,notes,check);
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].id === projectId){
                const tempObject = new projectObject(title,projectName,description,dueDate,priority,notes,check,this.projects[i].todoId);
                this.projects[i].projectTodoList.push(tempObject);
                this.projects[i].todoId++;
            };
        }
    };
    checkProject(){
        console.log(this.projects);
    };
    changeProjectList(title,projectName,newTitle,newProjectName,description,dueDate,priority,notes,check,projectId,newProjectId,todoId){
        const PROJECT_LENGTH = this.projects.length;
        let TODO_LENGTH = 0;
        let currentProject = {};
        projectId = parseInt(projectId);
        todoId = parseInt(todoId);
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].id === projectId){
                TODO_LENGTH = this.projects[i].projectTodoList.length;
                currentProject = this.projects[i].projectTodoList;
                for(let j = 0;j < TODO_LENGTH;j++){
                    if(currentProject[j].getId() === todoId){
                        currentProject[j].setTitle(newTitle);
                        //currentProject[j].setProjectName(newProjectName);
                        currentProject[j].setDescription(description);
                        currentProject[j].setDueDate(dueDate);
                        //currentProject[j].setPriority(priority);
                        currentProject[j].setNotes(notes);
                        //currentProject[j].setCheck(check);
                    };
                };
            };
        };
    };
    changeProjectName(projectId,newProjectName){
        const PROJECT_LENGTH = this.projects.length;
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].id === parseInt(projectId)){
                this.projects[i].projectName = newProjectName;
            }
        }
    }
    getProject(){
        const PROJECT_LENGTH = this.projects.length;
        let tempArray = [];
        for(let i = 0;i < PROJECT_LENGTH;i++){
            tempArray.push(this.projects[i]);
        };
        return(tempArray);
    }
    getProjectList(projectName){
        const PROJECT_LENGTH = this.projects.length;
        let TODO_LENGTH = 0;
        let  tempArray = [];
        let currentProject = {};
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].projectName === projectName){
                TODO_LENGTH = this.projects[i].projectTodoList.length;
                currentProject = this.projects[i].projectTodoList;
                for(let j = 0;j < TODO_LENGTH; j++ ){
                    tempArray.push(currentProject[j].getTitle());
                };
            }
        };
        return(tempArray);
    }
    getProjectIndex(projectId){
        const PROJECT_LENGTH = this.projects.length;
        for(let i = 0; i < PROJECT_LENGTH;i++){
            console.log('getProjectIndex: projectId:'+projectId + '  currentId:' + this.projects[i].id + ' LENGTH:' + PROJECT_LENGTH);
            if(this.projects[i].id === parseInt(projectId)){
                //console.log('getProjectIndex: projectId:'+projectId + '  currentId:' + this.projects[i].id + ' LENGTH:' + PROJECT_LENGTH);
                return(i);
            };
        };
    };
    getTodoIndex(projectId,todoId){
        const PROJECT_LENGTH = this.projects.length;
        let TODO_LENGTH;
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].id === parseInt(projectId)){
                TODO_LENGTH = this.projects[i].projectTodoList.length;
                for(let j = 0;j < TODO_LENGTH;j++){
                    //console.log(todoId);
                    //console.log(this.projects[i].projectTodoList[j].getId() == parseInt(todoId));
                    if(this.projects[i].projectTodoList[j].getId() === parseInt(todoId)){
                        //console.log('TODO_INDEX:'+j);
                        return(j);
                    };
                };
            };
        };
    };
    deleteProject(id){
        console.log('deleted project: projectId:' + id);
        if(this.projects.length === 1){
            this.createProject('Default Project');
        }
        this.projects = this.projects.filter(this.filterRemoveProject,id);
    };
    deleteProjectList(projectId,todoId){
        const PROJECT_LENGTH = this.projects.length;
        let currentProject;
        let TODO_LENGTH;
        console.log('deleteProjectList: ' + projectId + ' ' + todoId + '');
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].id === parseInt(projectId)){
                TODO_LENGTH = this.projects[i].projectTodoList.length;
                currentProject = this.projects[i].projectTodoList;
                for(let j = 0; j < TODO_LENGTH;j++){
                    //console.log(currentProject[j].getId() === todoId);
                    if(currentProject[j].getId() == todoId){
                        currentProject.splice(j,1);
                        return 0;
                    };
                };
            };
        };
    };
    setBoolean(projectId,todoId, setOperation){
        const PROJECT_LENGTH = this.projects.length;
        let  currentProject;
        let TODO_LENGTH;
        for(let i = 0; i < PROJECT_LENGTH;i++){
            TODO_LENGTH = this.projects[i].projectTodoList.length;
            currentProject = this.projects[i].projectTodoList;
            if(this.projects[i].id === projectId){
                for(let j = 0;j < TODO_LENGTH;j++){
                    if(currentProject[j].getId() === todoId){
                        if(setOperation === 'priority'){
                            currentProject[j].setPriority();
                        } else if(setOperation === 'check'){
                            currentProject[j].setCheck();
                        };
                    };
                };
            };
        };
    };
    reassignObject(){
        const PROJECT_LENGTH = this.projects.length;
        const todoListObject = new projectObject();
        let currentProject;
        let TODO_LENGTH;
        for(let i = 0; i < PROJECT_LENGTH; i++){
            TODO_LENGTH = this.projects[i].projectTodoList.length;
            currentProject = this.projects[i].projectTodoList;
            for(let j = 0; j < TODO_LENGTH;j++){
                Object.setPrototypeOf(currentProject[j],todoListObject);
            }
        };
    }
    filterRemoveProject(project){
        return(project.id != this);
    };
    filterChooseProject(project){
        return(project.projectName == this);
    };
};

//const saveData = new saveDataObject();

export {saveDataObject};