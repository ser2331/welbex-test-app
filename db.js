module.exports = function(){
    const { faker } = require('@faker-js/faker');
    const _ = require("lodash");
    return {
        list: _.times(50, function (n) {
            return {
                id: n,
                date: faker.date.past(),
                name: faker.random.word(),
                quantity: faker.random.number({
                    'min': 10,
                    'max': 10000000
                }),
                distance: faker.random.number({
                    'min': 10,
                    'max': 100000000
                }),
        }
        }),
    }
}
