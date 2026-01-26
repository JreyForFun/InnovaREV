const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const rootDir = __dirname;
  const portfolioTemplatesDir = path.join(rootDir, 'portfolio_templates');
  const restoTemplatesDir = path.join(rootDir, 'resto_templates');
  const outputDir = path.join(rootDir, 'assets', 'images', 'portfolio');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const processDirectory = async (baseDir, prefix) => {
    if (!fs.existsSync(baseDir)) return;
    const items = fs.readdirSync(baseDir);
    for (const item of items) {
      const itemPath = path.join(baseDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const htmlPath = path.join(itemPath, 'index.html');
        if (fs.existsSync(htmlPath)) {
          console.log(`Capturing ${item}...`);
          try {
            const fileUrl = `file://${htmlPath.replace(/\\/g, '/')}`;
            await page.goto(fileUrl, { waitUntil: 'networkidle0' });
            // Wait a bit for animations or fonts
            await new Promise(r => setTimeout(r, 1000));

            const screenshotPath = path.join(outputDir, `${item}.png`);
            await page.screenshot({ path: screenshotPath });
            console.log(`Saved to ${screenshotPath}`);
          } catch (e) {
            console.error(`Failed to capture ${item}:`, e);
          }
        }
      }
    }
  };

  await processDirectory(portfolioTemplatesDir);
  await processDirectory(restoTemplatesDir);

  await browser.close();
})();
