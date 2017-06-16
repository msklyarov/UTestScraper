const Nightmare = require('nightmare');

module.exports =
    class ScrapeDecorator {
      constructor(options) {
        this.debugMode = options.debugMode;
        this.browserWidth = options.browserWidth;
        this.browserHeigth = options.browserHeigth;
        this.userAgent = options.userAgent;
        this.iterationNum = 0;

        this._browser = options.browserInstance || this._createNewBrowser(options);
        this._browser.on('console', (type, ...params) => {
          console[type]('>', params);
        });
      }

      _createNewBrowser(options) {
        return new Nightmare({ show: options.debugMode })
                .useragent(this.userAgent)
                .viewport(options.browserWidth, options.browserHeight);
      }

      wait(criteria) {
        if (typeof (criteria) === 'number') {
          this._browser = this._browser.wait(criteria);
        } else if (typeof (criteria) === 'function') {
          this._browser = this._browser.wait.apply(this._browser, arguments);
        } else if (typeof (criteria) === 'string') {
          this._browser = this._browser.wait((sel) => {
            console.log('wait for ', sel);
            return $(sel).length !== 0;
          }, criteria);
        } else {
          throw new Error(`Unknown criteria type: ${typeof (criteria)}`);
        }

        return this;
      }

      openPage(url, doneCriteria) {
        console.log('goto', url);
        console.log('wait', doneCriteria);
        this._browser = this._browser
            .goto(url)
            .inject('js', 'jquery-3.2.1.js')
            .wait(5000)
            // .run();

        if (doneCriteria == null) {
          return this;
        }

        return this.wait(doneCriteria);
      }

      type(selector, str) {
        console.log('type: ', str, ' to:', selector);
        this._browser.type(selector, str);
        //return this;
      }

      evaluate(func) {
        console.log('evaluate', arguments);
        const funcArgsCount = func.length;

        if (arguments.length - 1 < funcArgsCount) {
          throw new Error(`Function expects ${funcArgsCount} arguments, but ${arguments.length} were passed`);
        }

        const remainingArgs = Array.prototype.slice.call(arguments, 1);

        const funcArgs = remainingArgs.splice(0, funcArgsCount);
        console.log('evaluate function with args:', funcArgs);
        this._browser = this._browser.evaluate.apply(this._browser, [func].concat(funcArgs));

        if (remainingArgs.length) {
          console.log('need to wait');
          console.log(remainingArgs);
          return this.wait.apply(this, remainingArgs);
        }

        return this;
      }

      click(selector, doneCriteria, ...doneParams) {
        console.log('click', selector);
        return this.evaluate((selector) => {
          console.log('clicking', selector);
          $(selector).click();
        }, selector, doneCriteria, ...doneParams);
      }

      clickOnItem(selector, index, doneCriteria) {
        return this.evaluate((selector, index) => {
          const sel = $(selector);
          if (sel.length > 0 && index < sel.length) {
            sel[index].click();
          } else {
            throw new Error('SelectorException');
          }
        }, selector, index, doneCriteria);
      }

      end() {
        console.log('end');
        this._browser = this._browser.end();
        return this;
      }

      then(func) {
        console.log('then');
        return this._browser.then(func);
      }
    };
