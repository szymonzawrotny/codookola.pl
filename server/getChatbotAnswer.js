import OpenAI from 'openai';
import "dotenv/config";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const eventInfo = `
Nazwa: Zawody wędkarskie Katowice
Adres: Róg Ulicy Szeptyckiego i Gen. Kazimierza Pułaskiego, Katowice, 40-276
Data: 24 lipca 2025
Godzina rozpoczęcia: 18:30
Kategoria: Sport
Opis: Zawody wyciągania ryby z wody. Zapraszamy!
Organizator: szymonzawrotny@gmail.com
`;

let getResponse = async (mess)=>{
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        messages: [
            { role: 'system', content: `Jesteś chatbotem odpowiadającym na pytania o wydarzenia. Oto szczegóły wydarzenia:\n${eventInfo}` },
            { role: 'user', content: mess }
        ]
    });

    return chatCompletion.choices[0].message.content;
}


export {getResponse}