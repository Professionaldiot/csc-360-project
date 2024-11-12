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
  })

//Verify element exists before getting rid of driver for each test
  afterEach(async function() {
    await driver.quit();
  })

  it('Check for presence of password box', async function() {
    {
      const elements = await driver.findElements(By.id("login-password"));
      assert(elements.length);
    }
  })

  it('Check for presence of username box', async function() {
    {
      const elements = await driver.findElements(By.id("login-username"));
      assert(elements.length);
    }
  })

  it('Check presence of guest button', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiButton-outlined"));
      assert(elements.length);
    }
  })

  it('Check presence of label in password box', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormLabel-root"));
      assert(elements.length);
    }
  })

  it('Check presence of label in username box', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormLabel-root"));
      assert(elements.length);
    }
  })

  it('Check presence of login button', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiButton-contained"));
      assert(elements.length);
    }
  })

  it('Check presence of tip for password', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormHelperText-root"));
      assert(elements.length);
    }
  })

  it('Check presence of tip for username', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormHelperText-root"));
      assert(elements.length);
    }
  })

  it('Check presence of login title', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiTypography-root"));
      assert(elements.length);
    }
  })

  it('Check presence of login block', async function() {
    {
      const elements = await driver.findElements(By.css(".MuiPaper-root"));
      assert(elements.length);
    }
  })
})




//Tests for correctness of text within login items
describe('Text of login items is correct', function() {
  this.timeout(30000);
  let driver;
  let words;

//Creates driver and sends it to login
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://10.101.128.56:3000/login");
  })

//Checks if text is as intended for each test before getting rid of driver
  afterEach(async function() {
    await driver.quit();
  })

  it('Check text of label for password', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormLabel-root")).getText();
    assert(words.toString() == "Password");
  })

  it('Check text of label for username', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormLabel-root")).getText();
    assert(words.toString() == "Username");
  })

  it('Check text of tip for password', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(3) > .MuiFormHelperText-root")).getText();
    assert(words.toString() == "Please enter a password.");
  })

  it('Check text of tip for username', async function() {
    words = await driver.findElement(By.css(".MuiFormControl-root:nth-child(1) > .MuiFormHelperText-root")).getText();
    assert(words.toString() == "Please enter a username.");
  })

  it('Check text of login title', async function() {
    words = await driver.findElement(By.css(".MuiTypography-root")).getText();
    assert(words.toString() == "Login");
  })

  it('Check text of guest button', async function() {
    words = await driver.findElement(By.css(".MuiButton-outlined")).getText();
    assert(words.toString() == "GUEST");
  })

  it('Check text of login button', async function() {
    words = await driver.findElement(By.css(".MuiButton-contained")).getText();
    assert(words.toString() == "SIGN IN");
  })
})




//Tests that all valid test users can login
describe('Valid usernames and passwords or guest button allow access to course page', function() {
  this.timeout(30000);
  let driver;

  //Inputs username and password for each test and checks if webpage changed
  async function testLogin(username, password) {
    let url;
    await driver.findElement(By.id("login-username")).sendKeys(username);
    await driver.findElement(By.id("login-password")).sendKeys(password);
    await driver.findElement(By.css(".MuiButton-contained")).click();
    return;
  };

//Creates driver and sends it to login
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://10.101.128.56:3000//");
  })
  
  afterEach(async function() {
    await driver.quit();
  })

  it('Test valid user 1', async function() {
    testLogin("jsmith", "P@ss1234");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 2', async function() {
    testLogin("mjones", "Secur3#5");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 3', async function() {
    testLogin("alee", "abcD!234");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 4', async function() {
    testLogin("bking", "Qwerty#6");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 5', async function() {
    testLogin("cgarcia", "Pass#789");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 6', async function() {
    testLogin("dmartinez", "SafeP@55");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 7', async function() {
    testLogin("eflores", "987Xyz!");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 8', async function() {
    testLogin("hthompson", "Login123");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 9', async function() {
    testLogin("lroberts", "MyPass#9");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 10', async function() {
    testLogin("mclark", "New@Pass");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 11', async function() {
    testLogin("abrown", "Stud3nt#1");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 12', async function() {
    testLogin("jwilson", "P@ssW0rd");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 13', async function() {
    testLogin("kdavis", "Hel10#45");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 14', async function() {
    testLogin("mwhite", "Secure#21");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 15', async function() {
    testLogin("kmoore", "Acce$$89");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 16', async function() {
    testLogin("jyoung", "EntrY@55");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 17', async function() {
    testLogin("jhall", "Lock3r#2");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 18', async function() {
    testLogin("tlopez", "Uniqu3#12");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 19', async function() {
    testLogin("wwright", "SafeKey#3");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 20', async function() {
    testLogin("jgreen", "MyAcc3ss!");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 21', async function() {
    testLogin("rhernandez", "Stud#1001");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 22', async function() {
    testLogin("tlewis", "P@ss2024");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 23', async function() {
    testLogin("dwalker", "EntrY!333");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 24', async function() {
    testLogin("jharris", "P@ssword!");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 25', async function() {
    testLogin("slee", "Acc3ss#09");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 26', async function() {
    testLogin("mjohnson", "P@ssword123");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 27', async function() {
    testLogin("kthompson", "Secure#456");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 28', async function() {
    testLogin("dgarcia", "StrongPass789");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 29', async function() {
    testLogin("asmith", "passAlice29");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 30', async function() {
    testLogin("bjohnson", "passBob30");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 31', async function() {
    testLogin("cwilliams", "passCarol31");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 32', async function() {
    testLogin("dbrown", "passDavid32");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });

  it('Test valid user 33', async function() {
    testLogin("edavis", "passEve33");
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });
  
  it('Test guest button', async function() {
    await driver.findElement(By.css(".MuiButton-outlined")).click();
    await driver.wait(until.urlIs('http://10.101.128.56:3000/courses'), 2000);
  });
});




//Tests that invalid users cannot login
describe('Invalid usernames and passwords do not allow log in', function() {
  this.timeout(30000);
  let driver;
  let url;

  //Inputs username and password for each test and checks if webpage changed
  async function testLogin(username, password) {
    let url;
    await driver.findElement(By.id("login-username")).sendKeys(username);
    await driver.findElement(By.id("login-password")).sendKeys(password);
    await driver.findElement(By.css(".MuiButton-contained")).click();
    return;
  };

//Creates driver and sends it to login
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://10.101.128.56:3000//");
  })
  
  afterEach(async function() {
    await driver.quit();
  })

  it('Test mismatched information 1', async function() {
    testLogin("jgreen", "SafeKey#3");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test mismatched information 2', async function() {
    testLogin("jsmith", "MyAcc3ss!");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test mismatched information 3', async function() {
    testLogin("nobody", "notapa$$word");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test mismatched information 4', async function() {
    testLogin("john45", "MyAcc3ss");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test empty string 1', async function() {
    testLogin("", "");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test empty string 2', async function() {
    testLogin("jsmith", "");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test empty string 3', async function() {
    testLogin("", "MyAcc3ss!");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test long string 1', async function() {
    testLogin("thisisareallylongstringforausernameithinkitsoverthirtttwocharactersaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "MyAcc3ss!");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });

  it('Test long string 2', async function() {
    testLogin("jsmith",
      "thisisareallylongstringforapasswordithinkitsoverthirtttwocharacters");
    await driver.sleep(2000);
    url = await driver.executeScript("return window.location.href");
    assert(url == "http://10.101.128.56:3000/login");
  });
});