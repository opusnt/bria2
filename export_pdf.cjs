const puppeteer = require('puppeteer');

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // 16:9 scale (PPT scale)
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log("Navigating to http://localhost:3003...");
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle0' });
  
  // Give it an extra second for custom fonts or bg images to be fully painted
  await new Promise(r => setTimeout(r, 1500));
  
  for (let i = 0; i < 10; i++) {
    console.log(`Taking screenshot of slide ${i + 1}...`);
    // Wait for the slide enter animation to settle
    await new Promise(r => setTimeout(r, 1500));
    
    await page.screenshot({ path: `slide_${i}.png` });
    
    if (i < 9) {
      // Navigate to next slide
      await page.keyboard.press('ArrowRight');
    }
  }
  
  await browser.close();
  console.log("All screenshots captured.");
})();
