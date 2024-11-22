import express from 'express';
import createHomepageTemplate from './views/index.js';
import displayLists from './views/lists.js';
// import displayList from './views/list.js';

// import exp from 'constants';
// import { urlencoded } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(createHomepageTemplate());
});

app.get('/lists', (req, res) => {
    res.send(displayLists());
});

// app.get('list', (req, res) => {
//     res.send(displayList());
// })

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});