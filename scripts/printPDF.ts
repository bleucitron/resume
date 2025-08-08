import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5173', {
	waitUntil: 'networkidle2',
});
// Saves the PDF to hn.pdf.
await page.pdf({
	path: 'RomainCrestey_resume.pdf',
});

await browser.close();
