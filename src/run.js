const Promise = require('bluebird');
const LoginLogout = require('./loginLogout.js');

const scraper = new LoginLogout();

scraper
    .login('test', 'test')
    .then(() => {
    console.log('done');
    })
    // .catch((err) => {
    //     console.log(err);
    // })
    //.end();
