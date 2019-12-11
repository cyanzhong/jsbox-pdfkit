const fs = require("fs");
const PDFDocument = require("pdfkit");
const photo = require("photo");
const device = require("device");
const info = device.info();
const height = info.screen.height;

async function main() {
  const {results} = await photo.pick({
    multi: true
  });

  const doc = new PDFDocument({
    autoFirstPage: false
  });

  console.log("Processing...");
  doc.pipe(fs.createWriteStream("photos.pdf"));

  results.forEach(item => {
    const buffer = item.data;
    doc.addPage({
      margin: 0
    }).image(buffer, {
      height: height,
      align: "center",
      valign: "center"
    });
  });

  doc.end();
  console.log("Done.");
}

main();