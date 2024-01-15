import { useForm } from "react-hook-form";
import "./Form_Initial.css";
import FormService from "../../../Services/FormService";
import FormModel from "../../../Models/FormModel";
import loader from "../../../Assets/Double Ring-1s-200px.gif" ;
import { useState } from "react";

function Form_Initial(): JSX.Element {
    const {handleSubmit, register} = useForm<FormModel>()
    const [answerFromAssistant, setAnswerFromAssistant] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function send(data: FormModel): Promise<string>{
        setLoading(true)
        const response = await FormService.processMessageToChatGPT(data.promptTogenerateTextualAd)
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
                    <button>submit</button>
            <div className="answer">
            {loading? <><img src={loader}/><br></br><span className="loading">Generating ...</span> </>:  <>{answerFromAssistant}</> }
            </div>
                </div>
            </form>
        </div>
    );
}

export default Form_Initial;
