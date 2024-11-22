import SHOPPINGLISTS_DATA from "../data/data.js";
import displayList from "./list.js";

const displayLists = () => /*html*/`
    <ul>
        ${SHOPPINGLISTS_DATA.map(list => displayList(list)).join('')}
    </ul>
    
` 

export default displayLists;