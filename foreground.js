console.log('hello foreground');
// document.addEventListener('mouseclick', function(e) {
//     console.log(e.target);
// })s

document.addEventListener("mousemove", function (e) {
    const id = e.target;
    const cst = id.href.includes("cashtag_click");

  if (cst) {
    const ticker = id.innerHTML.substr(1);
    console.log("ticker found" + ticker);
    chrome.runtime.sendMessage({ message: "getTicker", ticker: ticker });
  } else {
    console.log("false");
  }
});


