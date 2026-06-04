const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

(async () => {
  try {
    const pdfDoc = await PDFDocument.create();
    
    for (let i = 0; i < 10; i++) {
      const imgBytes = fs.readFileSync(`slide_${i}.png`);
      const image = await pdfDoc.embedPng(imgBytes);
      const { width, height } = image;
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, { x: 0, y: 0, width, height });
    }
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('Propuesta_Politica_Publica_Bria.pdf', pdfBytes);
    console.log('PDF created successfully with pdf-lib');
  } catch(e) {
    console.error(e);
  }
})();
