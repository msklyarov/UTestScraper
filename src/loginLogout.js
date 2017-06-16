const ScrapeDecorator = require('./scrapeDecorator.js');
const config = require('./config.js');

const loginGreeting = 'Log in and get to work';

module.exports =
class LoginLogout {
  constructor() {
    this._scraper = new ScrapeDecorator({
      debugMode: config.browser.debugMode,
      browserWidth: config.browser.width,
      browserHeigth: config.browser.heigth,
      userAgent: config.browser.userAgent,
    });
  }

    /**
     * log in to account
     * @param login
     * @param password
     */
  login(login, password) {
    return this._scraper
      .openPage(config.site.loginUrl /*, 'button.btn-primary'*/ )
      //.type('input#login_username', 'testtest');

        //return this.scraper

    // goto(loginUrl).
    // if ($('h1.text-center').innerText !== loginGreeting) {
    //   this.logout();
    // }
    //
  }

    /**
     * Log out from account
     */
  logout() {
    // goto(logoutUrl).wait for
    // if ($('h1.text-center').innerText !== loginGreeting) {
  }
};
