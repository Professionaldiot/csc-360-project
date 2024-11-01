import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Google Search Test', function() {
    let driver;
    // Increase timeout for tests
    this.timeout(30000);
    before(async function() {
        // Set up Chrome driver in headless mode
        DesiredCapabilities capability = DesiredCapabilities.internetExplorer();
        driver = new RemoteWebDriver(new URL("http://127.0.0.1:8080/wd/hub"), capability);

        const chrome = require('selenium-webdriver/chrome');
        const options = new chrome.Options();
        options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });
    after(async function() {
        await driver.quit();
    });
    it('should open Google and search for Selenium WebDriver', async function() {
        await driver.get('https://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);
        await driver.wait(until.titleContains('Selenium WebDriver'), 1000);
        const title = await driver.getTitle();
        assert.strictEqual(title.includes('Selenium WebDriver'), true);
    });
});
