function projectObject(title,projectName,description,dueDate,priority,notes,check,currentId){
    currentId = currentId;
    title = title;
    projectName = projectName;
    description = description;
    dueDate = dueDate;
    priority = 0;
    notes = notes;
    check = true;

    function getTitle(){
        return(title);
    };
    function getProjectName(){
        return(projectName);
    };
    function getDescription(){
        return(description);
    };
    function getDueDate(){
        return(dueDate);
    };
    function getPriority(){
        return(priority);
    };
    function getNotes(){
        return(notes);
    };
    function getCheck(){
        return(check);
    };
    function getId(){
        return(currentId);
    };
    function setTitle(temp){
        title = temp;
    };
    function setProjectName(temp){
        projectName = temp;
    };
    function setDescription(temp){
        description = temp;
    };
    function setDueDate(temp){
        dueDate = temp;
    };
    function setPriority(temp){
        console.log(priority);
        if(priority === 1){
            priority = 0;
        } else if(priority === 0){
            priority = 1;
        };
        console.log(priority);
    };
    function setNotes(temp){
        notes = temp;
    };
    function setCheck(temp){
        if(check === true){
            check = false;
        } else if(check === false){
            check = true;
        }
    };
    return{
    getTitle,
    getProjectName,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    getCheck,
    getId,
    setTitle,
    setProjectName,
    setDescription,
    setDueDate,
    setPriority,
    setNotes,
    setCheck,
    };
}
class saveDataObject{
    projects = [];
    projectList = [];
    currentId = 0;

    constructor(){
        this.createProject('default Project');
        this.createProject('default Project Second');
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
                const tempObject = projectObject(title,projectName,description,dueDate,priority,notes,check,this.projects[i].todoId);
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
    deleteProject(id){
        console.log('deleted project: projectId:' + id);
        this.projects = this.projects.filter(this.filterRemoveProject,id);
    };
    deleteProjectList(projectId,todoId){
        const PROJECT_LENGTH = this.projects.length;
        let currentProject;
        let TODO_LENGTH;
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].id === projectId){
                TODO_LENGTH = this.projects[i].projectTodoList.length;
                currentProject = this.projects[i].projectTodoList;
                //console.log(this.projects[i]);
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
    setCheck(projectId,todoId){
    };
    filterRemoveProject(project){
        return(project.id != this);
    };
    filterChooseProject(project){
        return(project.projectName == this);
    };
};

const saveData = new saveDataObject();

export default saveData;