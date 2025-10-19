const displayWeekday = (listID, weekday) => /*html*/`
    <form class="edit-weekday">
        <input
            type="text"
            name="newWeekday"
            value="${weekday}"
            placeholder="${weekday}"
        >
        <button class="edit-weekday-btn"
            hx-put="/edit-weekday/${listID}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Edit weekday

        </button>
    </form> 
`

export default displayWeekday;