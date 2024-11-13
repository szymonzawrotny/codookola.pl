import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path';
import * as cheerio from 'cheerio';
import fs from 'fs'; 

const chromeDriverPath = path.resolve("C:/Users/grzyb/szymon/programowanie/dane/chromedriver-win64/chromedriver.exe");

const options = new chrome.Options();
options.addArguments('disable-infobars');
options.addArguments('--headless');

const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(new chrome.ServiceBuilder(chromeDriverPath))
    .build();

const data = [];

const tcConcerts = async ()=>{
    const url = "https://ticketclub.pl/koncerty/";

    try{
        await driver.get(url);

        const pageSource = await driver.getPageSource();
        const $ = cheerio.load(pageSource)

        const titles = $("h2.artist-info-title");
        const dates = $("div.artist-info-date");
        const places = $("div.artist-info-place");

        for(let i=0;i < titles.length;i++){
            const title = titles[i];
            const titleText = $(title).text().trim();

            const date = dates[i];
            const dateText = $(date).text().trim();

            const place = places[i];
            const placeText = $(place).text().trim();

            console.log(i+1,titleText,dateText,placeText);

            data.push({
                event_id: i,
                nazwa: titleText,
                data: dateText,
                adress: placeText,
            })

            fs.writeFileSync('../webscrapData/tc_concerts.txt', JSON.stringify(data, null, 2), 'utf-8');
        }


    } catch(error){
        console.log(error)
    } finally{
        await driver.quit();
        console.log("wykonano pierwszy")
    }
}

tcConcerts()

export {tcConcerts}