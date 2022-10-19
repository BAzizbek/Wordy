const Handlebars = require('handlebars');

module.exports = Handlebars.registerHelper(
    'inc',
    (value) => parseInt(value) + 1
);

module.exports = Handlebars.registerHelper('parseDate', (date) => {
    const formatter = (n) => (n > 9 ? n : `0${n}`);

    const initialDate = new Date(date);
    const min = formatter(initialDate.getMinutes());
    const hour = formatter(initialDate.getHours());
    const day = formatter(initialDate.getDate());
    const month = initialDate.getMonth() + 1;
    const year = initialDate.getFullYear();

    return `${hour}:${min} ${day}.${month}.${year}`;
});

module.exports = Handlebars.registerHelper(
    'parseUser',
    (user) => user.username
);
