import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Form_Initial from "../../HomeArea/Form_Initial/Form_Initial";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Form_Initial/>}/>
            </Routes>
            
			I am routing!
        </div>
    );
}

export default Routing;
