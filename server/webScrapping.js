import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path';
import { setTimeout } from 'timers/promises';
import * as cheerio from 'cheerio';
import { convert } from "./addressToLocation.js";
import fs from 'fs'; 

const chromeDriverPath = path.resolve("C:/Users/grzyb/szymon/programowanie/dane/chromedriver-win64/chromedriver.exe");

const response = []

const fetchEvents = async () => {
    const options = new chrome.Options();
    options.addArguments('disable-infobars');
    options.addArguments('--headless');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(new chrome.ServiceBuilder(chromeDriverPath))
        .build();

    try {
        const url = process.env.WEBSCRAPING_URL
        await driver.get(url);

        const wait = 5000;
        let iterator = 1;

        try {
            const cookieButton = await driver.wait(
                until.elementLocated(By.className("CybotCookiebotDialogBodyButton")),
                wait
            );
            await cookieButton.click();
            await setTimeout(1000);
        } catch (error) {
            console.log("Przycisk zgody na ciasteczka nie został znaleziony lub jest już zamknięty.");
        }

        try {
            const primaryButton = await driver.wait(
                until.elementLocated(By.css(".MuiDialogActions-root > button")),
                wait
            );
            await primaryButton.click();
            await setTimeout(1000);
        } catch (error) {
            console.log("Drugi przycisk nie został znaleziony lub jest już zamknięty.");
        }

        while (iterator > 0) {
            try {
                const loadMoreButton = await driver.wait(
                    until.elementLocated(By.xpath("//button[contains(text(), 'Załaduj więcej')]")),
                    wait
                );
                await loadMoreButton.click();
                iterator--;
                await setTimeout(1000);
            } catch (error) {
                console.log("Wszystkie posty załadowane lub przycisk niedostępny.");
                break;
            }
        }

        const pageSource = await driver.getPageSource();
        const $ = cheerio.load(pageSource);

        const titles = $("h2.MuiTypography-h6");
        const dates = $("h6.css-64ocun");
        const addresses = $("h6.css-x435qk");

        let dateIndex = 0;
        let addressIndex = 0;

        for (let index = 0; index < titles.length; index++) {
            const title = titles[index];
            const text = $(title).text().trim();

            if (!text.endsWith("...")) {
                const date = $(dates[dateIndex]).text().trim();
                const address = $(addresses[addressIndex]).text().trim();
                dateIndex += 2;
                addressIndex++;

                let location = { lat: "brak", lng: "brak" };

                try {
                    location = await convert(address);
                } catch (error) {
                    console.error(error);
                }

                response.push({
                    event_id: index + 1,
                    nazwa: text,
                    data: date,
                    rodzaj: "koncert",
                    author_id: "999",
                    author_email: "bot o.O",
                    opis: "wygenerowano automatycznie",
                    adres: address,
                    location: location
                });
            }
        }

        fs.writeFileSync('response.txt', JSON.stringify(response, null, 2), 'utf-8');
        console.log('Odpowiedź została zapisana do pliku response.txt');

    } finally {
        await driver.quit();
        console.log("wykonano");
    }
};

export { fetchEvents, response };
