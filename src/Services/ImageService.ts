import appConfig from "../Utils/AppConfig";
const apiKey = process.env.REACT_APP_API_KEY;

async function generateImage(prompt: string):Promise<any>{
    const apiRequestBody = {
        "model": "dall-e-3",
        "prompt": prompt,
        };

    try{
        const response = await fetch( appConfig.dall_e_URL, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        })
        let json = await response.json()
        console.log(json)
        let answerFromAssistant = await json.data[0].url
        return answerFromAssistant
      }catch(err: any){
        console.log(err)
      }
}

export default {
    generateImage
}