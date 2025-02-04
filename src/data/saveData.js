function projectObject(title,projectName,description,dueDate,priority,notes,check){
    title = title;
    projectName = projectName;
    description = description;
    dueDate = dueDate;
    priority = priority;
    notes = notes;
    check = check;

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
        priority = temp;
    };
    function setNotes(temp){
        notes = temp;
    };
    function setCheck(temp){
        if(check === true && temp == false){
            check = false;
        } else if(check === false && temp == true){
            check = true;
        }
    };
    function setId(temp){
        id = temp;
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
    setCheck
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
        tempObject.id = this.currentId++;
        
        tempObject.projectTodoList = [];
        this.projects.push(tempObject);
    };
    createProjectList(title,projectName,description,dueDate,priority,notes,check){
        const PROJECT_LENGTH = this.projects.length;
        const tempObject = projectObject(title,projectName,description,dueDate,priority,notes,check); 
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].projectName === projectName){
                this.projects[i].projectTodoList.push(tempObject);
            };
        }
    };
    checkProject(){
        console.log(this.projects);
    };
    changeProjectList(title,projectName,newTitle,newProjectName,description,dueDate,priority,notes,check){
        const PROJECT_LENGTH = this.projects.length;
        let TODO_LENGTH = 0;
        let currentProject = {};
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].projectName === projectName){
                TODO_LENGTH = this.projects[i].projectTodoList.length;
                currentProject = this.projects[i].projectTodoList;
                for(let j = 0;j < TODO_LENGTH;j++){
                    if(currentProject[j].getTitle() === title){
                        currentProject[j].setTitle(newTitle);
                        currentProject[j].setProjectName(newProjectName);
                        currentProject[j].setDescription(description);
                        currentProject[j].setDueDate(dueDate);
                        currentProject[j].setPriority(priority);
                        currentProject[j].setNotes(notes);
                        currentProject[j].setCheck(check);
                    };
                };
            };
        };
    };
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
    deleteProject(id){
        this.projects = this.projects.filter(this.filterRemoveProject,id);
    };
    deleteProjectList(title,projectName){
        let tempArray = [title,projectName];
        const PROJECT_LENGTH = this.projects.length;
        let currentProject;
        let TODO_LENGTH;
        for(let i = 0; i < PROJECT_LENGTH;i++){
            if(this.projects[i].projectName === projectName){
                TODO_LENGTH = this.projects[i].projectTodoList.length;
                currentProject = this.projects[i].projectTodoList;
                for(let j = 0; j < TODO_LENGTH;j++){
                    if(currentProject[j].getTitle() === title){
                        currentProject.splice(j,1);
                    }
                };
            };
        };
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