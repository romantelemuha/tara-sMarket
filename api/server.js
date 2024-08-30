
const axios=require("axios");
require('dotenv').config();

const TOKEN=process.env.TOKEN;
const chatId=process.env.chatId;
const TG_BOT_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;



module.exports=async (request, response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Content-Type', 'application/json');

    if (request.method === "OPTIONS") {
        response.writeHead(204);
        response.end();
        return;
    }
    if (request.url === "/api/submit" && request.method === "POST") {
        let message = '';

        request.on("data", chunk => {
            message += chunk.toString(); 
        })


        request.on("end", async () => {
            const clientData=JSON.parse(message);

            const tgMessage=`**Нове замовлення**\n\n
                    **Ім'я**: ${clientData.name}\n
                    **Прізвище**: ${clientData.surname}\n
                    **Номер телефону**: ${clientData.phone}\n`;

            try{
                await axios.post(TG_BOT_URL, {
                    chat_id: chatId,
                    parse_mode: 'Markdown',
                    text: tgMessage
                })
                response.statusCode = 200;
                response.end();
            }catch(err){
                console.error(err);
                response.statusCode = 500;
                response.end();
            }
        })
    } else {
        response.statusCode = 404;
        response.end();
    }
}
