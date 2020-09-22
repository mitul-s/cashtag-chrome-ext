console.log("hello foreground");

document.addEventListener("mousemove", (e) => getTicker(e), false);

let ticker;

function getTicker(e) {
  
  if(e.altKey) {
    const id = e.target;
    if (id.href && id.href.includes("cashtag_click")) {
      if(ticker === id.innerHTML.substr(1)){
        console.log('nope')
      } else {
        ticker = id.innerHTML.substr(1);
        console.log(ticker);
        chrome.runtime.sendMessage({ message: "getTicker", ticker: ticker });
      }
    } else {
      console.log("false");
    }
  }
}


function addHoverCard(ticker, price) {
  document.addEventListener("mouseover", e => {
    const id = e.target;
    if(id.href && id.href.includes("cashtag_click") && id.href.includes(ticker)) {
      displayCard(id, ticker, price);    
    }
  }, false)
}

function displayCard(id, ticker, price) {
  let hoverCard = document.createElement('div');
  hoverCard.classList.add('hover-card-m');
  hoverCard.innerHTML = `${ticker} – ${price}`
  document.querySelector('body').append(hoverCard)
  // if(id.children.length > 0) {
  //   console.log('nope')
  // } else {
  //   id.classList.add("hover-card-m");
  //   id.append(hoverCard);
  // }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("starting from fg");
  if(request.message === "price") {
    console.log("foreground " + request.price)
    addHoverCard(ticker, request.price);
  } else {
    console.log('fail from fg')
  }
})