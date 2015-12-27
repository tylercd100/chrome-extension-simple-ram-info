var canvas = document.createElement("canvas").getContext("2d");

var background_color;
var text_color;
var text_size;
var refresh_rate;

function toGB(value,floatSize){
  if(floatSize===undefined)
    floatSize = 0;
  var GBRaw = value / 1024 / 1024 / 1024;
  fsmod = Math.pow(10,floatSize);
  GBRaw = Math.round(GBRaw*fsmod)/fsmod;
  return GBRaw;
}

function options() { 
  chrome.storage.sync.get({
    background_color: "#428BCA",
    text_color: "#FFFFFF",
    text_size: 12,
    refresh_rate: 1000,
  }, function(items) {
    background_color = items.background_color;
    text_color = items.text_color;
    text_size = items.text_size;
    refresh_rate = items.refresh_rate;
  });
}
window.addEventListener("load", options);
chrome.storage.onChanged.addListener(options);

window.addEventListener("load", function iconinfo() {
  chrome.system.memory.getInfo(function(memory) {
    var short_value = toGB(memory.availableCapacity,1);
    var long_value = toGB(memory.availableCapacity,2);

    if(short_value>=10){
      short_value = Math.round(short_value).toString();
    } 

    var value = short_value.toString();

    canvas.font = (text_size || 12)+"px Verdana, Geneva, sans-serif";
    canvas.textAlign = 'center';
    canvas.clearRect(0, 0, 19, 19);
    canvas.fillStyle = background_color || '#428bca';
    canvas.fillRect(0, 0, 19, 19);
    canvas.fillStyle = text_color || '#FFFFFF';
    canvas.fillText(value, 9.5, 13.5);

    chrome.browserAction.setTitle({ title: "Available: " + long_value + " GB " + "Capacity: " + toGB(memory.capacity,2) + " GB" });
  });
  setTimeout(iconinfo, (refresh_rate || 1000));
  chrome.browserAction.setIcon({ imageData: canvas.getImageData(0, 0, 19, 19)});
});

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({ url: "options.html" });
    }else if(details.reason == "update"){
        chrome.tabs.create({ url: "options.html" });
    }
});