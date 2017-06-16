module.exports = {
    browser: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
      width: 1500,
      heigth: 1000,
      debugMode: true,
    },
    site: {
      loginUrl: 'https://www.upwork.com/ab/account-security/login',
      testsUrl: 'https://www.upwork.com/ab/tests/test/%d',
    },
    accounts: [
      {
        login: 'user',
        password: 'pass',
        testsByName: ['jQuery Test'],
      },
    ],
    defaultTestBehaviour: {
      clickItemIfNoAnswer: 'first', // 'last', 'random'
      waitBeforeSubmitInMS: 30 * 1000, // 30 sec
      moveMouseOnPage: false,
    },
    tests: [
      {
        id: 994,
        name: 'jQuery Test',
      },
    ],
  };

