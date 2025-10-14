const createHomepageTemplate = () => /*html*/`
    <html>
        <head>
            <title>SHOPPING LIST</title>
            
            <script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>
            
            
            <link rel="stylesheet" href="/styles.css">
        </head>
        
        <body>
            <header>
                <!-- <div class="logo">logo</div> -->
                <h1>SHOPPING LIST</h1>
                <div class="theme-switch-wrapper">
                    <span class="theme-icon sun" title="Light mode">&#9728;</span>
                    <label class="theme-switch">
                        <input type="checkbox" id="theme-toggle-slider">
                        <span class="slider"></span>
                    </label>
                    <span class="theme-icon moon" title="Dark mode">&#9790;</span>
                </div>
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
            <h4>© Ivan Sanczewski, 2025</h4>
        </footer>

        <script>
            // Theme switch logic
            const themeToggle = document.getElementById('theme-toggle-slider');
            // On load, set theme from localStorage
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-mode');
                if (themeToggle) themeToggle.checked = true;
            }
            if (themeToggle) {
                themeToggle.addEventListener('change', function() {
                    if (this.checked) {
                        document.body.classList.add('dark-mode');
                        localStorage.setItem('theme', 'dark');
                    } else {
                        document.body.classList.remove('dark-mode');
                        localStorage.setItem('theme', 'light');
                    }
                });
            }
          
        </script>
        </body>
    </html>
`

export default createHomepageTemplate;