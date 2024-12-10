# Testing Playwright with TypeScript on LambdaTest or Local Machine

## Setup
* Clone the repository: 
```bash
   git clone https://github.com/Gobinath90/playwright-boilerplate.git
```
* Navigate to the project directory:
```bash
cd playwright-boilerplate
```
* Install project dependencies:
```bash
npm install
```
* Install Playwright browsers: Playwright requires browser binaries to run. You can install them with the following command:
```bash
npx playwright install
```
If you only want to install Chromium, use:

```bash
npx playwright install chromium
```

## Running your tests
* To run all tests, use, run 
```bash
npm run test
```

## Running Your Allure Report

* Run the tests with the Allure reporter:
```bash
playwright test --reporter=allure-playwright
```
* Generate the Allure report:
```bash
allure generate allure-results --clean -o allure-report
```
* Open the Allure report:
```bash
allure open allure-report
```

