import displayList from "./list.js";

const displayCards = (lists = []) => /*html*/`
                   
    <ul class="cards-container">
        ${lists
            .sort((a,z) => z.title.localeCompare(a.title))
            .map(list => displayList(list)).join('')
        }
    </ul>
    
    <form class="new-week">
        <input 
        type="text"
        name="shop"
        placeholder="add shop"
        size="25"
        />
        <input 
        type="checkbox"
        name="nextWeekList"
        value=true
        />
        <label for="nextWeekList">Shopping list for next week</label>
        <button class="add-list"
            hx-post="/cards"
            hx-target="#shopping-lists-container"
        >Add List
        </button>
    </form>

` 
export default displayCards;