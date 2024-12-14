import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getAllCaptures } from "../../redux/capture";
import { NavLink } from "react-router-dom";
import "./CapturesPage.css";

function CapturesPage() {
    const dispatch = useDispach();
    const allCaptures = useSelector(state => state.capture);

    useEffect(() => {
        dispatch(getAllCaptures())
    }, [dispatch]);

    const CaptureFolderList = () => {
        if(allCaptures) {
            return (
                allCaptures.map(capture)
            )
        }
    }



    return (
        <div>
            <h1>Captures</h1>
        </div>
    )
}

export default CapturesPage;
