import express from 'express';
import createHomepageTemplate from './views/index.js';
import displayLists from './views/cards.js';
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

app.get('/cards', (req, res) => {
    res.send(displayLists());
});

app.post('/cards', (req, res) => {
    const {item, quantity} = req.body;
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});