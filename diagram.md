<!--
   ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
   │     app.js           │    │    data/data.js      │    │   public/styles.css  │
   │   (Server/Routes)    │    │   (Static Data)      │    │     (Styling)        │
   │   ██████████████     │    │   ░░░░░░░░░░░░░░░░   │    │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
   │                      │    │                      │    │                      │
   │ • Express server     │◄───┤ • Shopping lists     │    │ • Card styling       │
   │ • Routes (/, /cards) │    │ • Items with status  │    │ • Item states        │
   │ • HTMX endpoints     │    │ • Static array       │    │ • Responsive design  │
   │ • Port 3000          │    │                      │    │                      │
   └──────────────────────┘    └──────────────────────┘    └──────────────────────┘
              │                          ▲                           ▲
              │ imports                  │ imports                   │ linked
              ▼                          │                           │
   ┌──────────────────────┐              │                           │
   │   views/index.js     │              │                           │
   │   (Homepage HTML)    │              │                           │
   │   ████████████████   │              │                           │
   │                      │              │                           │
   │ • Main HTML template │              │                           │
   │ • HTMX script load   │──────────────┘                           │
   │ • "Load lists" btn   │                                          │
   │ • Container div      │──────────────────────────────────────────┘
   └──────────────────────┘
              ▲
              │ imports
              │
   ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
   │   views/cards.js     │    │   views/list.js      │    │   views/cart.js      │
   │  (Lists Container)   │    │  (Single List)       │    │  (Cart Items)        │
   │  ████████████████    │    │  ████████████████    │    │  ████████████████    │
   │                      │    │                      │    │                      │
   │ • Maps all lists     │───►│ • Single list card   │───►│ • Individual items   │
   │ • Creates UL wrapper │    │ • Title + total      │    │ • Toggle bought state│
   │                      │    │ • Maps cart items    │    │ • HTMX click handler │
   │                      │    │ • Add item form      │    │ • Color coding       │
   └──────────────────────┘    └──────────────────────┘    └──────────────────────┘
                                       HTMX FLOW DIAGRAM
   ┌─────────────────────────────────────────────────────────────────────────────────────┐
   │                              USER INTERACTIONS                                      │
   └─────────────────────────────────────────────────────────────────────────────────────┘
       Browser                    Express Server                   Data Layer
   ┌─────────────┐              ┌─────────────────┐              ┌──────────────┐
   │             │              │                 │              │              │
   │  1. Visit   │─────────────►│  GET /          │              │              │
   │     /       │              │  returns        │              │              │
   │             │◄─────────────│  index.js       │              │              │
   │             │              │                 │              │              │
   │             │              └─────────────────┘              │              │
   │  2. Click   │                                               │              │
   │  "Load      │              ┌─────────────────┐              │              │
   │   lists"    │─────────────►│  GET /cards     │─────────────►│ data.js      │
   │             │   hx-get     │  returns        │ import       │ array        │
   │             │◄─────────────│  cards.js()     │◄─────────────│              │
   │             │   HTML       │                 │              │              │
   │             │              └─────────────────┘              │              │
   │  3. Click   │                                               │              │
   │   item to   │              ┌─────────────────┐              │              │
   │   toggle    │─────────────►│ POST /toggle-   │─────────────►│ Modify       │
   │             │   hx-post    │      item       │ find & update│ bought       │
   │             │◄─────────────│ returns updated │◄─────────────│ status       │
   │             │   HTML       │ cart.js()       │              │              │
   └─────────────┘              └─────────────────┘              └──────────────┘
                                   FILE RESPONSIBILITIES
   ┌─────────────────────────────────────────────────────────────────────────────────────┐
   │ app.js         │ ► Main server file                                                 │
   │                │ ► Routes: /, /cards, /toggle-item                                  │
   │                │ ► Handles HTMX requests                                            │
   │                │ ► Imports all view functions                                       │
   ├────────────────┼────────────────────────────────────────────────────────────────────┤
   │ data/data.js   │ ► Static shopping lists array                                      │
   │                │ ► Contains: id, title, shop, cart[], total, weekday                │
   │                │ ► Items have: item, bought, units                                  │
   ├────────────────┼────────────────────────────────────────────────────────────────────┤
   │ views/index.js │ ► Homepage HTML template                                           │
   │                │ ► Loads HTMX library                                               │
   │                │ ► "Load lists" button with hx-get="/cards"                         │
   ├────────────────┼────────────────────────────────────────────────────────────────────┤
   │ views/cards.js │ ► Container for all shopping lists                                 │
   │                │ ► Maps through data array                                          │
   │                │ ► Calls list.js for each item                                      │
   ├────────────────┼────────────────────────────────────────────────────────────────────┤
   │ views/list.js  │ ► Single shopping list card                                        │
   │                │ ► Shows title, total, shop, weekday                                │
   │                │ ► Maps through cart items                                          │
   │                │ ► Calls cart.js for each item                                      │
   ├────────────────┼────────────────────────────────────────────────────────────────────┤
   │ views/cart.js  │ ► Individual cart item                                             │
   │                │ ► Toggle functionality with HTMX                                   │
   │                │ ► hx-post="/toggle-item" with listID & cartIndex                   │
   │                │ ► Visual states: .in-cart (green) / .out-cart (red)                │
   └─────────────────────────────────────────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════════════════════════════════ -->

<!-- ***********  H T M X   L E A R N I N G   P O I N T S  *********** -->

1.  hx-get="/cards" - Fetches content and replaces target element
2.  hx-target="#shopping-lists" - Where to put the response
3.  hx-post="/toggle-item" - Sends POST request with form data
4.  hx-vals='{"listID": "...", "cartIndex": ...}' - Extra data to send
5.  hx-target="this" - Replace the clicked element itself
6.  hx-swap="outerHTML" - How to replace content
    Key Concept: Server returns HTML fragments, not JSON!

// In app.js - Update your route to match what cart.js is calling

    app.get('/edit-units/:listID/:cartIndex/:currentUnits?', (req, res) => {
    const { listID, cartIndex, currentUnits } = req.params;

        console.log('listID:', listID);
        console.log('cartIndex:', cartIndex);
        console.log('currentUnits:', currentUnits || 'no units'); // Could be undefined

        // Return a form for editing
        res.send(/*html*/`
            <form hx-put="/update-units/${listID}/${cartIndex}"
                  hx-target="this"
                  hx-swap="outerHTML">
                <input type="number"
                       name="newUnits"
                       value="${currentUnits || ''}"
                       placeholder="Enter quantity">
                <button type="submit">Save</button>
            </form>
        `);

    });

// Handle the actual update
app.put('/update-units/:listID/:cartIndex', (req, res) => {
const { listID, cartIndex } = req.params;
const { newUnits } = req.body; // This works with PUT/POST

    // Find and update the data
    const list = SHOPPINGLISTS_DATA.find(list => list.id === listID);
    list.cart[cartIndex].units = newUnits;

    // Return updated cart item
    res.send(displayCart(list.cart[cartIndex], listID, cartIndex));

});
