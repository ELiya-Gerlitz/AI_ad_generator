import appConfig from "../Utils/AppConfig";
const apiKey = process.env.REACT_APP_API_KEY;

async function generateTextualAd(promptTogenerateTextualAd:any) :Promise<any>{
    // const apiMessages = chatMessages.map((messageObject) => {
    //   const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
    //   return { role, content: messageObject.message };
    // });
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        // { role: "system", content: "I'm a Student using ChatGPT for learning" },
        { role: 'system', content: 'please write a 40 words long advertisement for' },
        // { role: "user", content: chatMessages }, //das muss ich nachher "aufwecken"
        { role: 'user', content: promptTogenerateTextualAd },
        // ...apiMessages,
        // ...chatMessages,
      ],
    };
    // console.log(apiRequestBody)

  try{
    const response = await fetch( appConfig.gpt_3_5_turboEndpointURL, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
    let json = await response.json()
    let answerFromAssistant = await json['choices'][0]['message']['content']
    return answerFromAssistant
  }catch(err: any){
    console.log(err)
  }
  
  }


export default {
    generateTextualAd
}