import SHOPPINGLISTS_DATA from "../data/data.js";
import displayList from "./list.js";

const displayCards = () => /*html*/`
                   
    <ul class="cards-container">
        ${SHOPPINGLISTS_DATA.map(list => displayList(list)).join('')}
    </ul>
    
    <form class="new-week">
        <input 
        type="text"
        name="shop"
        placeholder="shop"
        size="25"
        />
        //TODO: Add checkbox 'This week's list'
        <button class="add-list"
            hx-post="/cards"
            hx-target="#shopping-lists-container"
        >Add List
        </button>
    </form>

` 
export default displayCards;