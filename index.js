const { ipcRenderer } = require('electron');
const JsBarcode = require('jsbarcode')

ipcRenderer.on("set_default_image", (event) => {
    document.getElementById('image').src="default.png";
})

ipcRenderer.on("set_image_qr", (event,data) => {
    JsBarcode("#image", data, {format: "UPC"});
})
