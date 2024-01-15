import { useForm } from "react-hook-form";
import "./Form_Initial.css";
import FormService from "../../../Services/FormService";
import FormModel from "../../../Models/FormModel";
import loader from "../../../Assets/Double Ring-1s-200px.gif" ;
import img_loader from "../../../Assets/Double Ring-1s-200px.gif" ;
import { useState } from "react";
import ImageService from "../../../Services/ImageService";

function Form_Initial(): JSX.Element {
    const {handleSubmit, register} = useForm<FormModel>()
    const [answerFromAssistant, setAnswerFromAssistant] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [img_loading, setImg_Loading] = useState<boolean>(false)
    const [img_url, setImg_url] = useState<string>()

    async function generateImage(prompt:string):Promise <string>{
        setImg_Loading(true)
        const img_url = await ImageService.generateImage(prompt)
        setImg_Loading(false)
        setImg_url(img_url)
        console.log("image img_url", img_url)
        return img_url
    }

    async function send(data: FormModel): Promise<string>{
        setLoading(true)
        const response = await FormService.generateTextualAd(data.promptTogenerateTextualAd)
        generateImage(data.prompt_to_generate_image)
        setLoading(false)
        setAnswerFromAssistant(response)
        console.log("answerFromAssistant: ",response)
        return response
}
    return (
        <div className="Form_Initial">
            <form onSubmit={handleSubmit(send)}>
                <div className="formBorder">
                    <label>Write your advertisement contents</label><br></br>
                    <textarea placeholder="write your advertisement contents" {...register('promptTogenerateTextualAd')}>
                    </textarea>
                    <br></br>
                    <label>press in order to get textual advertisement from your AI</label>
                    <br></br>
                <textarea name="user_image_prompt" placeholder="write the image prompt here!"  {...register('prompt_to_generate_image')}></textarea>
                    <button>submit</button>
            <div className="answer">
            {loading? <><img src={loader}/><br></br><span className="loading">Generating ...</span> </>:  <>{answerFromAssistant}</> }
            </div>
                </div>
            </form>
                {img_url && <img src={img_url} alt="generated_image_alt" /> }
                {img_loading && <img src={img_loader} alt="img_loader"/> }
        </div>
    );
}

export default Form_Initial;
