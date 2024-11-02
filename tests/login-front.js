import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui;
import org.openqa.selenium.Keys;
import org.openqa.selenium.By;
import assert from 'node:assert';
//May need to add import for Builder of some sort...?

//This creates a test with the name Google Search Test that will be recognized by mocha reports.
describe('Username interaction', function() {
    let driver; //Initializing driver in scope of function.
    this.timeout(30000); //Leaves time for tests to occur. May need to change later.

    //This sets up a web driver to run on localhost on internet explorer before the test.
    before(async function() {
        DesiredCapabilities capability = DesiredCapabilities.internetExplorer();
        driver = new RemoteWebDriver(new URL("http://127.0.0.1:8080/wd/hub"), capability); //The url is for the local host. This may change depending on the localhost actually used.
    });

    //This gets rid of the driver after the test.
    after(async function() {
        await driver.quit();
    });

    //This tests if the username can be cleared, keys can be entered into it, and that the keys are actually stored
    it('should clear username field and send keys to username field', async function() {
        let usernameBox = await driver.findElement(By.id('filled-required'));
        await usernameBox.clear();
        await usernameBox.sendKeys('aA1!@#$%^&*()_-+=`~,.<>?/[]{}');
        const username = await usernameBox.getAttribute('value');
        assert.strictEqual(username, 'aA1!@#$%^&*()_-+=`~,.<>?/[]{}');
    });
    
});
