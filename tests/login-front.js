import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

//This creates a test with the name Google Search Test that will be recognized by mocha reports.
describe('Google Search Test', function() {
    let driver; //Initializing driver in scope of function.
    this.timeout(30000); //Leaves time for tests to occur. May need to change later.

    //This sets up a web driver to run on localhost on internet explorer before the test.
    before(async function() {
        DesiredCapabilities capability = DesiredCapabilities.internetExplorer();
        driver = new RemoteWebDriver(new URL("http://127.0.0.1:8080/wd/hub"), capability);
    });

    //This gets rid of the driver after the test.
    after(async function() {
        await driver.quit();
    });

    //This is the test. Right now it is doing unimport things.
    it('should open Google and search for Selenium WebDriver', async function() {
        await driver.get('https://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);
        await driver.wait(until.titleContains('Selenium WebDriver'), 1000);
        const title = await driver.getTitle();
        assert.strictEqual(title.includes('Selenium WebDriver'), true);
    });
    
});
