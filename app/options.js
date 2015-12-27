document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  chrome.storage.sync.set({
    background_color: document.querySelector("#background_color").value,
    text_color: document.querySelector("#text_color").value,
    // text_size: document.querySelector("#text_size").value,
    refresh_rate: document.querySelector("#refresh_rate").value,
  }, function() {
    document.querySelector("input[type='submit']").value = "Saved sucessfully";
    setTimeout(function() { document.querySelector("input[type='submit']").value = "Save" }, 2000);
  });
});

function options() { 
  chrome.storage.sync.get({
    background_color: "#428BCA",
    text_color: "#FFFFFF",
    text_size: 12,
    refresh_rate: 1000,
  }, function(items) {
    document.querySelector("#background_color").value = items.background_color;
    document.querySelector("#text_color").value = items.text_color;
    // document.querySelector("#text_size").value = items.text_size;
    document.querySelector("#refresh_rate").value = items.refresh_rate;

    initSpectrum();
  });
}

function initSpectrum() {
  $(".spectrum-color-picker").spectrum({
      preferredFormat: "hex",
      showInput: true,
  });
}

window.addEventListener("load", options);
