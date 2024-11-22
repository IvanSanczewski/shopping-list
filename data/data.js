const SHOPPINGLISTS_DATA = [
    {
        id: '45_24',
        title: 'Week 45',
        shop: 'Maxima',
        cart: [ 
            {item: 'potatoes', bought: false},
            {item: 'iogurt', bought: true},
            {item: 'kefyr', bought: true},
            {item: 'avocados', bought: true},
            {item: 'carrots', bought: false},
        ],
        total: 22.18,
        weekday: 'Monday',     
    },
    {
        id: '46_24',
        title: 'Week 46',
        shop: 'Hales Turgus',
        cart: [
            {item: 'carrots', bought: false},
            {item: 'beef', bought: false},
            {item: 'nuts', bought: false},
            {item: 'bananas', bought: false},
            {item: 'soup', bought: false},
        ],
        total: 33.18,
        weekday: 'Wednesday',     
    },
];

export default SHOPPINGLISTS_DATA;