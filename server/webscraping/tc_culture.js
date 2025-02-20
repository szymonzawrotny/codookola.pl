import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import path from "path";
import * as cheerio from "cheerio";
import fs from "fs";
import { convert } from "../addressToLocation.js";
import "dotenv/config"; 

const chromeDriverPath = path.resolve(
  "C:/Users/grzyb/szymon/programowanie/dane/chromedriver-win64/chromedriver.exe"
);

const options = new chrome.Options();
options.addArguments("disable-infobars");
options.addArguments("--headless"); 

const data = []; 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const driver = await new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .setChromeService(new chrome.ServiceBuilder(chromeDriverPath))
  .build();

const tcCulture = async () => {
  const url = "https://ticketclub.pl/kultura/";

  try {
    await driver.get(url);
    const pageSource = await driver.getPageSource();
    const $ = cheerio.load(pageSource);

    const titles = $("h2.artist-info-title");
    const dates = $("div.artist-info-date");
    const places = $("div.artist-info-place");

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const titleText = $(title).text().trim();

        const date = dates[i];
        const dateText = $(date).text().trim();

        const place = places[i];
        const placeText = $(place).text().trim();

        let location = { lat: "brak", lng: "brak" };
        const address = `Polska, ${placeText}`; 

        try {
            console.log(`Konwersja adresu: ${address}`);
            location = await convert(address); 
            await delay(500); 
        } catch (error) {
            console.error(`Błąd podczas konwersji adresu "${address}":`, error);
        }

        data.push({
            event_id: i,
            nazwa: titleText,
            data: dateText,
            adress: placeText,
            location,
        });

        fs.writeFileSync(
            "./webscrapData/tc_culture.txt",
            JSON.stringify(data, null, 2),
            "utf-8"
        );
    }
    } catch (error) {
        console.error("Błąd podczas przetwarzania strony:", error);
    } finally {
        await driver.quit();
        console.log("Proces zbierania danych zakończony.");
    }
};

export { tcCulture };
