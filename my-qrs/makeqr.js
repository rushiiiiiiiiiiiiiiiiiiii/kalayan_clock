import QRCode from "qrcode";
import fs from "fs";

// 👇 Change this to the URL or text you want
const data = "http://www.pacecon.net/kalayan/";

// 👇 Name of the QR image file to create
const output = "myqr.png";

// Generate the QR code image
QRCode.toFile(
  output,
  data,
  {
    width: 300,
    color: {
      dark: "#00030cff",   // QR color
      light: "#e6f0ff"   // background color
    }
  },
  err => {
    if (err) throw err;
    console.log("✅ QR saved as", output);
  }
);
