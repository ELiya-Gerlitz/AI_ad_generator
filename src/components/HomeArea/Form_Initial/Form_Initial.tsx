import { useForm } from "react-hook-form";
import "./Form_Initial.css";
import FormService from "../../../Services/FormService";
import FormModel from "../../../Models/FormModel";

function Form_Initial(): JSX.Element {
    const {handleSubmit, register} = useForm<FormModel>()

    async function send(data: FormModel): Promise<string>{
        const answerFromAssistant = await FormService.processMessageToChatGPT(data.promptTogenerateTextualAd)
        console.log("answerFromAssistant: ",answerFromAssistant)
        return answerFromAssistant
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

            </div>
                </div>
            </form>
        </div>
    );
}

export default Form_Initial;
