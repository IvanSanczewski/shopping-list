const createHomepageTemplate = () => /*html*/`
    <html>
        <head>
            <title>SHOPPING LIST</title>
            <script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>

            <link rel="stylesheet" href="/styles.css">
        </head>

        <body>
            <header>
                <h1>SHOPPING LISTS</h1>
                <div class="header">
                    <button class="btn"
                        hx-get="/lists"
                        hx-target="#shopping-lists"
                        >Load lists
                    </button>
                </div>
            </header>

            <main>
                <div id="shopping-lists" class="shopping-lists" >
                    <ul class="lists">
                        <li class="shopping-list-card">
                            <h3>list {shoppingList.name}</h3>
                            <p>price EUR</p>
                            <span>expand false/true</span>
                            <span>completed false/true</span>
                            <p>---------</p>
                            <ul>
                                <li class="sl-item">
                                    <p>potatos</p>
                                    <span>units</span>
                                    <span>delete item</span>
                                    <span>bought ture/fals</span>
                                </li>
                                <li class="sl-item">
                                    <p>kefyr</p>
                                    <span>units</span>
                                    <span>delete item</span>
                                    <span>bought ture/fals</span>
                                </li>
                                <li class="sl-item">
                                    <p>walnuts</p>
                                    <span>units</span>
                                    <span>delete item</span>
                                    <span>bought ture/fals</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </main>

            <footer>
                <h4>© Ivan Sanczewski, 2024</h4>
            </footer>
        </body>
    </html>
`

export default createHomepageTemplate;