import saveData from './data/localStorage.js';
import domChangeObject from './DOM/dom.js';
import './style.css';

console.log(saveData.classTest());

const domChange = new domChangeObject(saveData);
