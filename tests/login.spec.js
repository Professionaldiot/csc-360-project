const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

//Checks existance of login elements
describe('Elements for login present', function() {
  this.timeout(30000);
  let driver;

//Creates driver and sends it to login
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://10.101.128.56:3000/login");
  });

//Verify element exists before getting rid of driver for each test
  afterEach(async function() {
    await driver.quit();
  });

  it('Check for presence of password box', async function() {
    {
      const elements = await driver.findElements(By.id("login-password"));
      assert(elements.length);
    };
  });

  it('Check for presence of username box', async function() {
    {
      const elements = await driver.findElements(By.id("login-username"));
      assert(elements.length);
    };
  });

  it('Check presence of guest button', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiButton-outlined"));
      assert(elements.length);
    };
  });

  it('Check presence of label in password box', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormLabel-root"));
      assert(elements.length);
    };
  });

  it('Check presence of label in username box', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormLabel-root"));
      assert(elements.length);
    };
  });

  it('Check presence of login button', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiButton-contained"));
      assert(elements.length);
    };
  });

  it('Check presence of tip for password', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormHelperText-root"));
      assert(elements.length);
    };
  });

  it('Check presence of tip for username', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormHelperText-root"));
      assert(elements.length);
    };
  });

  it('Check presence of login title', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiTypography-root"));
      assert(elements.length);
    };
  });

  it('Check presence of login block', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiPaper-root"));
      assert(elements.length);
    };
  });
});




//Tests for correctness of text within login items
describe('Text of login items is correct', function() {
  this.timeout(30000);
  let driver;
  let words;

//Creates driver and sends it to login
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://10.101.128.56:3000/login");
  });

//Checks if text is as intended for each test before getting rid of driver
  afterEach(async function() {
    await driver.quit();
  });

  it('Check text of label for password', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormLabel-root")).getText();
    assert(words.toString() == "Password");
  });

  it('Check text of label for username', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormLabel-root")).getText();
    assert(words.toString() == "Username");
  });

  it('Check text of tip for password', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormHelperText-root")).getText();
    assert(words.toString() == "Please enter a password.");
  });

  it('Check text of tip for username', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormHelperText-root")).getText();
    assert(words.toString() == "Please enter a username.");
  });

  it('Check text of login title', async function() {
    words = await driver.findElement(By.css(".MuiTypography-root")).getText();
    assert(words.toString() == "Login");
  });

  it('Check text of guest button', async function() {
    words = await driver.findElement(By.css(".MuiButton-outlined")).getText();
    assert(words.toString() == "GUEST");
  });

  it('Check text of login button', async function() {
    words = await driver.findElement(By.css(".MuiButton-contained")).getText();
    assert(words.toString() == "SIGN IN");
  });
});




//Tests that all valid test users can login
describe('Valid usernames and passwords or guest button allow access to course page', function() {
  this.timeout(30000);
  let driver;

  //Inputs username and password for each test and checks if webpage changed
  async function testLogin(username, password) {
    await driver.findElement(By.id("login-username")).sendKeys(username);
    await driver.findElement(By.id("login-password")).sendKeys(password);
    await driver.findElement(By.css(".MuiButton-contained")).click();
    return window.location.href.toString();
  };

//Creates driver and sends it to login
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://10.101.128.56:3000/login");
  });
  
  afterEach(async function() {
    await driver.quit();
  });

  it('Test valid user 1', async function() {
    assert(testLogin("jsmith", "P@ss1234") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 2', async function() {
    assert(testLogin("mjones", "Secur3#5") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 3', async function() {
    assert(testLogin("alee", "abcD!234") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 4', async function() {
    assert(testLogin("bking", "Qwerty#6") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 5', async function() {
    assert(testLogin("cgarcia", "Pass#789") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 6', async function() {
    assert(testLogin("dmartinez", "SafeP@55") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 7', async function() {
    assert(testLogin("eflores", "987Xyz!") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 8', async function() {
    assert(testLogin("hthompson", "Login123") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 9', async function() {
    assert(testLogin("lroberts", "MyPass#9") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 10', async function() {
    assert(testLogin("mclark", "New@Pass") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 11', async function() {
    assert(testLogin("abrown", "Stud3nt#1") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 12', async function() {
    assert(testLogin("jwilson", "P@ssW0rd") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 13', async function() {
    assert(testLogin("kdavis", "Hel10#45") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 14', async function() {
    assert(testLogin("mwhite", "Secure#21") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 15', async function() {
    assert(testLogin("kmoore", "Acce$$89") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 16', async function() {
    assert(testLogin("jyoung", "EntrY@55") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 17', async function() {
    assert(testLogin("jhall", "Lock3r#2") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 18', async function() {
    assert(testLogin("tlopez", "Uniqu3#12") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 19', async function() {
    assert(testLogin("wwright", "SafeKey#3") == "http://10.101.128.56:3000/courses");
  });

  it('Test valid user 20', async function() {
    assert(testLogin("jgreen", "MyAcc3ss!") == "http://10.101.128.56:3000/courses");
  });

  it('Test guest button', async function() {
    await driver.findElement(By.css(".MuiButton-outlined")).click();
    assert(window.location.href == "http://10.101.128.56:3000/courses");
  });
});




//Tests that invalid users cannot login
describe('Invalid usernames and passwords do not allow log in', function() {
  this.timeout(30000);
  let driver;

  //Inputs username and password for each test and checks if webpage changed
  async function testLogin(username, password) {
    await driver.findElement(By.id("login-username")).sendKeys(username);
    await driver.findElement(By.id("login-password")).sendKeys(password);
    await driver.findElement(By.css(".MuiButton-contained")).click();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
    return window.location.href.toString();
  };

//Creates driver and sends it to login
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://10.101.128.56:3000/login");
  });
  
  afterEach(async function() {
    await driver.quit();
  });

  it('Test mismatched information 1', async function() {
    assert(testLogin("jgreen", "SafeKey#3") == "http://10.101.128.56:3000/login");
  });

  it('Test mismatched information 2', async function() {
    assert(testLogin("jsmith", "MyAcc3ss!") == "http://10.101.128.56:3000/login");
  });

  it('Test mismatched information 3', async function() {
    assert(testLogin("nobody", "notapa$$word") == "http://10.101.128.56:3000/login");
  });

  it('Test mismatched information 4', async function() {
    assert(testLogin("john45", "MyAcc3ss") == "http://10.101.128.56:3000/login");
  });

  it('Test empty string 1', async function() {
    assert(testLogin("", "") == "http://10.101.128.56:3000/login");
  });

  it('Test empty string 2', async function() {
    assert(testLogin("jsmith", "") == "http://10.101.128.56:3000/login");
  });

  it('Test empty string 3', async function() {
    assert(testLogin("", "MyAcc3ss!") == "http://10.101.128.56:3000/login");
  });

  it('Test long string 1', async function() {
    assert(testLogin("thisisareallylongstringforausernameithinkitsoverthirtttwocharactersaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "MyAcc3ss!") == "http://10.101.128.56:3000/login");
  });

  it('Test long string 2', async function() {
    assert(testLogin("jsmith",
      "thisisareallylongstringforapasswordithinkitsoverthirtttwocharacters") == "http://10.101.128.56:3000/login");
  });
});
