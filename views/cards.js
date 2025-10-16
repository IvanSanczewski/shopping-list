import displayList from "./list.js";

const displayCards = (lists = []) => /*html*/`
    <ul class="cards-container">
        ${lists.map(list => displayList(list)).join('')}
    </ul>
`
export default displayCards;