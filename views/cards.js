import displayList from "./list.js";

const displayCards = (lists = []) => /*html*/`
    <ul class="cards-container">
        ${lists
            .map(list => displayList(list)).join('')
        }
    </ul>
`

export const displayNewWeekForm = () => /*html*/`
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
            hx-target=".cards-container"
            hx-swap="innerHTML"
        >Add List
        </button>
    </form>
` 

export const displayNewCard = (list) => displayList(list);
export default displayCards;