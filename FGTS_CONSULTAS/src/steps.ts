import puppeteer, { Browser } from "puppeteer";

export async function createBrowser() {
  const browser: Browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    defaultViewport: null,
    headless: false,
  });
  const [page] = await browser.pages();
  return { page, browser };
}
