const { ipcRenderer } = require('electron');
const JsBarcode = require('jsbarcode')

ipcRenderer.on("set_default_image", (event) => {
    document.getElementById('image').src="default.jpeg";
})

ipcRenderer.on("set_image_qr", (event,data) => {
    JsBarcode("#image", data);
})
