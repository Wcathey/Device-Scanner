import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getAllCaptures } from "../../redux/capture";
import { NavLink } from "react-router-dom";
import "./CapturesPage.css";

function CapturesPage() {
    const dispatch = useDispatch();
    const allCaptures = useSelector(state => state.capture.Captures);

    useEffect(() => {
        dispatch(getAllCaptures())
    }, [dispatch]);

    const CaptureFolderList = () => {

        if (allCaptures) {

            return (

                allCaptures.map((capture) => (
                    <li key={capture.id}>
                        <NavLink to={`/captures/${capture.id}`}>
                        <img id="capture-image" src={capture.secure_url}></img>
                        </NavLink>
                    </li>
                ))
            )
        }
    }



    return (

        <div className="captures-page-container">
                <h1>Captures Directory</h1>
                <NavLink to={'/captures/scan'}>
                    <p>Upload Image</p>
                </NavLink>
            <CaptureFolderList/>
        </div>

    )
}

export default CapturesPage;
