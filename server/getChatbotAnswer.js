import OpenAI from 'openai';
import "dotenv/config";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

let getResponse = async (mess)=>{
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: mess }],
        model: 'gpt-3.5-turbo-16k',
    });

    return chatCompletion.choices[0].message.content;
}


export {getResponse}