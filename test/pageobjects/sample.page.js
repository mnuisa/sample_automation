const { $ } = require('@wdio/globals')
const SELECT_ITEM = {
    STUFFED_FROG: "stuffedFrog",
    FLUFFY_BUNNY: "fluffyBunny",
    VALENTINE_BEAR: "valentineBear"
  };

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SamplePage {

    get navContact() {
        return browser.$("a[href='#/contact']");
    }

    get navShop() {
        return browser.$("a[href='#/shop']");
    }

    get navCart() {
        return browser.$("a[href='#/cart']");
    }
    
    get contactSubmitBtn() {
        return browser.$("a.btn-contact");
    }

    get headerError() {
        return browser.$("div.alert.alert-error");
    }

    get forenameError() {
        return browser.$("#forename-err");
    }

    get forenameField() {
        return browser.$("#forename");
    }

    get emailError() {
        return browser.$("#email-err");
    }

    get emailField() {
        return browser.$("#email");
    }

    get messageError() {
        return browser.$("#message-err");
    }

    get messageField() {
        return browser.$("#message");
    }

    get messageAlertSuccess() {
        return browser.$("div.alert-success");
    }

    get buyStuffedFrog() {
        return browser.$("#product-2 a[ng-click='add(item)']");
    }

    get buyFluffyBunny() {
        return browser.$("#product-4 a[ng-click='add(item)']");
    }

    get buyValentineBear() {
        return browser.$("#product-7 a[ng-click='add(item)']");
    }

    get quantityStuffedFrog() {
        return browser.$("input[name='quantity']");
    }

    get quantityFluffyBunny() {
        return browser.$$("input[name='quantity']")[1];
    }

    get quantityValentineBear() {
        return browser.$$("input[name='quantity']")[2];
    }

    get subtotalStuffedFrog() {
        return browser.$("tbody tr:nth-child(1) td:nth-child(4)");
    }

    get subtotalFluffyBunny() {
        return browser.$("tbody tr:nth-child(2) td:nth-child(4)");
    }

    get subtotalValentineBear() {
        return browser.$("tbody tr:nth-child(3) td:nth-child(4)");
    }

    get priceStuffedFrog() {
        return browser.$("tbody tr:nth-child(1) td:nth-child(2)");
    }

    get priceFluffyBunny() {
        return browser.$("tbody tr:nth-child(2) td:nth-child(2)");
    }

    get priceValentineBear() {
        return browser.$("tbody tr:nth-child(3) td:nth-child(2)");
    }

    get cartPriceTotal() {
        return browser.$("strong.total");
    }

    //Method to open the application URL
    async openAppUrl() {
        let appUrl = 'http://jupiter.cloud.planittesting.com';
        await browser.url(appUrl);
        await browser.pause(500);
        await this.waitUntilPageLoaded();
    }

    async clickContact() {
        await browser.pause(500);
        await this.navContact.waitForDisplayed({
            timeoutMsg: "Failed to wait for Contact to display"
        });
        await this.navContact.click();
        await browser.pause(300);
    }

    async clickShop() {
        await browser.pause(500);
        await this.navShop.waitForDisplayed({
            timeoutMsg: "Failed to wait for Shop to display"
        });
        await this.navShop.click();
        await browser.pause(300);
    }

    async clickCart() {
        await browser.pause(500);
        await this.navCart.waitForDisplayed({
            timeoutMsg: "Failed to wait for Cart to display"
        });
        await this.navCart.click();
        await browser.pause(300);
    }

    async addToCart(item) {
        let selectedItem;
        switch (item) {
          case  SELECT_ITEM.STUFFED_FROG: 
            selectedItem = await this.buyStuffedFrog;
            break;
          case SELECT_ITEM.FLUFFY_BUNNY:
            selectedItem = await this.buyFluffyBunny;
            break;
          case SELECT_ITEM.VALENTINE_BEAR:
            selectedItem = await this.buyValentineBear
            break;
          default:
            return error("Item doesn't exist");
        }
        await browser.pause(500);
        await selectedItem.waitForDisplayed({
          timeout: 30000,
          timeoutMsg: `Failed to wait for the Item after waiting 30 seconds`
        });
        await selectedItem.click();
        return selectedItem;
      }

    // async addTo() {
    //     await browser.pause(500);
    //     await this.navContact.waitForDisplayed({
    //         timeoutMsg: "Failed to wait for Contact to display"
    //     });
    //     await this.navContact.click();
    //     await browser.pause(300);
    // }

    async clickContactSubmit() {
        await browser.pause(500);
        await this.contactSubmitBtn.waitForDisplayed({
            timeoutMsg: "Failed to wait for Submit Button to display"
        });
        await this.contactSubmitBtn.click();
        await browser.pause(300);
    }

    async populateContactFields(inputForename = 'TestName', inputEmail = 'test@jupiter.com', inputMsg = 'TestMsg') {
        await browser.pause(500);
        await this.forenameField.waitForDisplayed();
        await this.forenameField.click()
        await browser.pause(500);
        await this.forenameField.setValue(inputForename);
        await browser.pause(500);
        await this.emailField.waitForDisplayed();
        await this.emailField.click();
        await browser.pause(500);
        await this.emailField.setValue(inputEmail);
        await browser.pause(500);
        await this.messageField.waitForDisplayed();
        await this.messageField.click();
        await browser.pause(500);
        await this.messageField.setValue(inputMsg);
    }

    async waitUntilPageLoaded(){
        await browser.waitUntil(() => {
        //Check if the page is fully loaded
        return browser.execute(() => {
        //This code will be executed in the browser's context
        return document.readyState === 'complete';
        });
        }, {
          timeout: 15000,
          timeoutMsg: 'Page did not fully load within the specified time'
        });
    }


}

module.exports = {
    SELECT_ITEM,
    SamplePage: new SamplePage()
};





