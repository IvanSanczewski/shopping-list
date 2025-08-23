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

        <script>
            document.addEventListener('resetForm', function(event) {
                console.log('Reset event fired:', event.detail);
                const formId = event.detail.formId;
                const form = document.getElementById(formId);
                if (form) {
                    form.reset();
                    console.log('Form reset:', formId);
                } else {
                    console.log('Form not found:', formId);
                }
            });
        </script>
        </body>
    </html>
`

export default createHomepageTemplate;