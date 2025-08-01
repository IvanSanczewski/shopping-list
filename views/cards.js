import SHOPPINGLISTS_DATA from "../data/data.js";
import displayList from "./list.js";

const displayCards = () => /*html*/`
                   
    <ul class="cards-container">
        ${SHOPPINGLISTS_DATA.map(list => displayList(list)).join('')}
    </ul>
    
    <form class="new-week"> //TODO: implement data with Date object
        <input 
        type="text"
        name="week"
        placeholder="week"
        size="25"
        />
        <input 
        type="number"
        name="year"
        placeholder="year"
        size="2"
        />
        <button hx-post="/lists">Add List</button>
    </form>

` 
export default displayCards;