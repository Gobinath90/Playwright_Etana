export const testDir = 'tests'
export const timeout = 60000
export const retries = 0
export const workers = 1
export const fullyParallel = true;

export const reporter = [
  ['html'],
  ['junit', { outputFile: 'results.xml' }],
  ['allure-playwright'],
  ['monocart-reporter', {
    name: "Etana Digital Test Report",
    outputFile: './monocart-report/index.html'
  },
],
];

function getBaseUrl() {
  const environment = process.env.ENV;
  if (environment == undefined || environment == null) return 'https://etanadigital.net/';
  else if (environment == 'prod') return 'https://etanadigital.net/';
  else if (environment == 'local') return 'http://localhost';
  else return 'https://etanadigital.net/';
}

export const use = {
  baseURL: getBaseUrl(),
};

export const globalSetup = require.resolve('./global-setup.js');

export const projects = [
  {
    name: 'chrome',
    use: {
      browserName: `chromium`,
      channel: `chrome`,
      headless: true,
      screenshot: `only-on-failure`,
      video: `retain-on-failure`,
      trace: `retain-on-failure`,
      actionTimeout: 60000,
      viewport: null,
      deviceScaleFactor: undefined,
      launchOptions: { args: ['--start-maximized'] }
    }
  },

  // {
  //   name: 'firefox',
  //   use: {
  //     browserName: `firefox`,
  //     viewport: { width: 1720, height: 850 },
  //     ignoreHTTPSErrors: true,
  //     headless: true,
  //     screenshot: `only-on-failure`,
  //     video: `retain-on-failure`,
  //     trace: `retain-on-failure`,
  //     launchOptions: {
  //       slowMo: 200
  //     }
  //   }
  // },

  // {
  //   name: 'webkit',
  //   use: {
  //     browserName: `webkit`,
  //     headless: false,
  //     viewport: { width: 1720, height: 850 },
  //     ignoreHTTPSErrors: true,
  //     screenshot: `only-on-failure`,
  //     video: `retain-on-failure`,
  //     trace: `retain-on-failure`
  //   }
  // },

  // {
  //   name: `Edge`,
  //   use: {
  //     browserName: `chromium`,
  //     channel: `msedge`,
  //     headless: false,
  //     viewport: { width: 1720, height: 850 },
  //     ignoreHTTPSErrors: true,
  //     screenshot: `only-on-failure`,
  //     video: `retain-on-failure`,
  //     trace: `retain-on-failure`,
  //     launchOptions: {
  //       slowMo: 100
  //     }
  //   }
  // }
]
