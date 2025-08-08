const SHOPPINGLISTS_DATA = [
    {
        id: '45_24',
        title: 'Week 45',
        shop: 'Maxima',
        cart: [ 
            {item: 'potatoes', bought: false, units: 6},
            {item: 'iogurt', bought: true, units: 4},
            {item: 'kefyr', bought: true, units: 2},
            {item: 'avocados', bought: true, units: 2},
            {item: 'carrots', bought: false, units: 3},
        ],
        total: null,
        weekday: 'Monday',     
    },
    {
        id: '46_24',
        title: 'Week 26',
        shop: 'Hales Turgus',
        cart: [
            {item: 'carrots', bought: false, units: 3},
            {item: 'beef', bought: false, units: null},
            {item: 'nuts', bought: false, units: null},
            {item: 'bananas', bought: false, units: 2},
            {item: 'soup', bought: false, units: 1},
        ],
        total: null,
        weekday: 'Wednesday',     
    }
];

export default SHOPPINGLISTS_DATA;