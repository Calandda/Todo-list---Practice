class projectObject{
    constructor(title,projectName,description,dueDate,priority,notes,check){
        this.title = title;
        this.projectName = projectName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.check = check;
    }
}
class saveDataObject{
    projects = [];

    constructor(){
        this.createProject('default Project');
    }
    classTest(){
        console.log('saveData confirmed');
    }
    createProject(projectName){
        let tempObject = {};
        tempObject.projectName = projectName;
        tempObject.projectTodoList = [];
        this.projects.push(tempObject);
    };
    createProjectList(title,projectName,description,dueDate,priority,notes,check){
        const tempObject = new projectObject(title,projectName,description,dueDate,priority,notes,check); 
        for(let i = 0; i < this.projects.length;i++){
            if(this.projects[i].projectName === projectName){
                this.projects[i].projectTodoList.push(tempObject);
            };
        }
    };
    checkProject(){
        console.log(this.projects);
    };
};

const saveData = new saveDataObject();

export default saveData;