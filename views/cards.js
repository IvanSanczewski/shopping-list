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
        <button class="add-list"
            hx-post="/cards"
            hx-target=".cards-container"
            hx-swap="beforeend"
        >Add List
        </button>
    </form>

` 
export default displayCards;