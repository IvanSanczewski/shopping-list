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
            </header>
            
            <main>
                <div id="shopping-lists-container">
                    <button class="btn-load"
                        hx-get="/cards"
                        hx-target="#shopping-lists-container"
                        >Load lists
                    </button>
                </div>
            </main>

            <footer>
                <h4>© Ivan Sanczewski, 2024</h4>
            </footer>
        </body>
    </html>
`

export default createHomepageTemplate;