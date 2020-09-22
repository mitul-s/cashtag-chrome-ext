console.log('hello from bg')

// async function getTickerData(ticker) {
//     // const apiKey = "R6YU3WNMLIBGTXH6";
//     // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${apiKey}`;
//     const apiKey = "btkdbof48v6r1ugb1igg";
//     const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`;

//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.responseType = "json";
//     xhr.send();
//     xhr.onload = function () {
//         if(xhr.status != 200) {
//             console.log(`Error ${xhr.status}: ${xhr.statusText}`)
//         } else {
//             // console.log(`Loaded: ${xhr.status} ${xhr.response}`);
//             console.log(xhr.response);
//             sendTicker(xhr.response);

//         }
//     }

//     xhr.onerror= function() {
//         console.log('error')
//     }
// }

async function getTickerData(ticker) {
    const apiKey = "btkdbof48v6r1ugb1igg";
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data, data.c);
        return data.c;
    } catch (e) {

    }
}

function sendTicker(res) {
    console.log(res.c);
    return res.c;
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete') {
        if(tab.url.includes("twitter.com")) {
            console.log("you're on twitter");
            chrome.tabs.executeScript(tabId, { file: "./script.js"})
        }
    }
})


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse ) => {
    if(request.message === "getTicker") {
        const price = await getTickerData(request.ticker);
        chrome.tabs.sendMessage(sender.tab.id, { message: "price", price: price });
    }
})







// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, async current_tab_info => {
//         if(current_tab_info.url.includes("twitter.com")) {
//             console.log("ok")
//             await chrome.tabs.executeScript(null, { file: "./script.js" });
//             // chrome.tabs.executeScript(null, { file: "./script.js" });
//             await chrome.tabs.sendMessage(tab.tabId, { message: "price", price: sendTicker })
//         }
//     })
// })