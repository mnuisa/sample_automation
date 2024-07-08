const { expect } = require('@wdio/globals')
// const SamplePage = require('../pageobjects/sample.page')
const { SELECT_ITEM, SamplePage } = require('../pageobjects/sample.page')


describe('Planit Assessment Test',async()=> {
    it('Test Case 1', async () => {
        await SamplePage.openAppUrl();
        //From the home page go to contact page
        await SamplePage.clickContact();
        //Click submit button
        await SamplePage.clickContactSubmit();
        //Verify error messages
        await browser.pause(500);
        await SamplePage.headerError.waitForDisplayed();
        await expect(await SamplePage.headerError).toBeDisplayed();
        await expect(await SamplePage.headerError).toHaveTextContaining('complete the form correctly');
        await browser.pause(500);
        await SamplePage.forenameError.waitForDisplayed();
        await expect(await SamplePage.forenameError).toBeDisplayed();
        await expect(await SamplePage.forenameError).toHaveTextContaining('Forename is required');
        await browser.pause(500);
        await SamplePage.emailError.waitForDisplayed();
        await expect(await SamplePage.emailError).toBeDisplayed();
        await expect(await SamplePage.emailError).toHaveTextContaining('Email is required');
        await browser.pause(500);
        await SamplePage.messageError.waitForDisplayed();
        await expect(await SamplePage.messageError).toBeDisplayed();
        await expect(await SamplePage.messageError).toHaveTextContaining('Message is required');
        //Populate mandatory fields
        await SamplePage.populateContactFields();
        //Validate errors are gone
        await browser.pause(500);
        await SamplePage.headerError.waitForDisplayed({ reverse: true,});
        await expect(await SamplePage.headerError).not.toBeDisplayed();
        await browser.pause(500);
        await SamplePage.forenameError.waitForDisplayed({ reverse: true,});
        await expect(await SamplePage.forenameError).not.toBeDisplayed();
        await browser.pause(500);
        await SamplePage.emailError.waitForDisplayed({ reverse: true,});
        await expect(await SamplePage.emailError).not.toBeDisplayed();
        await browser.pause(500);
        await SamplePage.messageError.waitForDisplayed({ reverse: true,});
        await expect(await SamplePage.messageError).not.toBeDisplayed();
    });

    it('Test Case 2', async () => {
        await SamplePage.openAppUrl();
        //From the home page go to contact page
        await SamplePage.clickContact();
        //Populate mandatory fields
        await SamplePage.populateContactFields();
        //Click submit button
        await SamplePage.clickContactSubmit();
        //Validate successful submission message
        let messageSuccess = await SamplePage.messageAlertSuccess;
        await browser.waitUntil(async () => await (await ((await messageSuccess.getText()).includes("we appreciate your feedback")), {
            timeout: 30000,
            timeoutMsg: "Successful Submission Message not shown",
        }));
        await expect(await messageSuccess).toHaveTextContaining("we appreciate your feedback");
    });

    it.only('Test Case 3', async () => {
        await SamplePage.openAppUrl();
        await SamplePage.clickShop();
        //Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
        await SamplePage.addToCart(SELECT_ITEM.STUFFED_FROG);
        await browser.pause(500);
        await SamplePage.addToCart(SELECT_ITEM.FLUFFY_BUNNY);
        await browser.pause(500);
        await SamplePage.addToCart(SELECT_ITEM.VALENTINE_BEAR);
        await browser.pause(500);
        //Go to the cart page
        await SamplePage.clickCart();
        await browser.pause(500);
        await SamplePage.quantityStuffedFrog.waitForDisplayed();
        await browser.pause(500);
        await SamplePage.quantityStuffedFrog.setValue('2');
        await browser.pause(500);
        await SamplePage.quantityFluffyBunny.waitForDisplayed();
        await browser.pause(500);
        await SamplePage.quantityFluffyBunny.setValue('5')
        await browser.pause(500);
        await SamplePage.quantityValentineBear.waitForDisplayed();
        await browser.pause(500);
        await SamplePage.quantityValentineBear.setValue('3')
        //Verify the subtotal for each product is correct
        let subtotalStuffedFrog = await SamplePage.subtotalStuffedFrog;
        await browser.pause(500);
        await subtotalStuffedFrog.waitForDisplayed();
        await expect(await subtotalStuffedFrog.getText()).toContain("$21.98");
        let subtotalFluffyBunny = await SamplePage.subtotalFluffyBunny;
        await browser.pause(500);
        await subtotalFluffyBunny.waitForDisplayed();
        await expect(await subtotalFluffyBunny.getText()).toContain("$49.95");
        let subtotalValentineBear = await SamplePage.subtotalValentineBear;
        await browser.pause(500);
        await subtotalValentineBear.waitForDisplayed();
        await expect(await subtotalValentineBear.getText()).toContain("$44.97");
        //Verify the price for each product
        let priceStuffedFrog = await SamplePage.priceStuffedFrog;
        await browser.pause(500);
        await priceStuffedFrog.waitForDisplayed();
        await expect(await priceStuffedFrog.getText()).toContain("$10.99");
        let priceFluffyBunny = await SamplePage.priceFluffyBunny;
        await browser.pause(500);
        await priceFluffyBunny.waitForDisplayed();
        await expect(await priceFluffyBunny.getText()).toContain("$9.99");
        let priceValentineBear = await SamplePage.priceValentineBear;
        await browser.pause(500);
        await priceValentineBear.waitForDisplayed();
        await expect(await priceValentineBear.getText()).toContain("$14.99");
        //Verify that total = sum(sub totals)
        const subTotalTxtStuffedFrog = await subtotalStuffedFrog.getText();
        const subTotalTxtFluffyBunny = await subtotalFluffyBunny.getText();
        const subTotalTxtValentineBear = await subtotalValentineBear.getText(); 
        const subtotal1 = parseFloat(subTotalTxtStuffedFrog.replace('$', ''));
        const subtotal2 = parseFloat(subTotalTxtFluffyBunny.replace('$', ''));
        const subtotal3 = parseFloat(subTotalTxtValentineBear.replace('$', ''));
        const total = subtotal1 + subtotal2 + subtotal3;
        const cartPrice = await SamplePage.cartPriceTotal.getText();
        const cartPriceTotal = parseFloat(cartPrice.replace('Total: ', ''));
        expect(await total).toEqual(await cartPriceTotal);
    });
})

