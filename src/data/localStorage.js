import {saveDataObject} from './saveData.js';

let saveData;
let saveDataTemp = new saveDataObject();

if(!localStorage.getItem('saveData')){
    saveData = new saveDataObject();
    localStorage.setItem('saveData',JSON.stringify(saveData));
} else {
    setData();
}

function setData(){
    saveData = JSON.parse(localStorage.getItem('saveData'));
    console.log(saveData);
    reassignObject();
}

function reassignObject(){
    Object.setPrototypeOf(saveData,saveDataTemp);
    saveData.reassignObject();
}


export default saveData;