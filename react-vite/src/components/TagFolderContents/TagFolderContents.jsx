import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { getTagContentsByName } from "../../redux/tag";
import { useState, useEffect, useRef } from "react";
import "./TagFolderContents.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteCaptureModal from "../DeleteCaptureModal";

function TagFolderContents () {
const dispatch = useDispatch();
const {name} = useParams();
const [showConfirmBox, setShowConfirmBox] = useState(false);
const btnRef = useRef();

const toggleConfirmation = () => {
    setShowConfirmBox(!showConfirmBox);
};

useEffect(() => {
    if(!showConfirmBox) return;

    const closeConfirmBox = (e) => {
        if(btnRef.current && btnRef.current.contains(e.target) ) {
            setShowConfirmBox(false);
        }
    };

    document.addEventListener("click", closeConfirmBox);

    return () => document.removeEventListener("click", closeConfirmBox);
}, [showConfirmBox]);

const tagContents = useSelector(state => state.tag.tags);


useEffect(() => {
   dispatch(getTagContentsByName(name))

},[name,dispatch]);



const TagContentList = () => {
    if(tagContents) {
        return (

           tagContents.map((capture) => (
            <li key={capture.id}>
                <p>Public Id: <span>{capture.public_id}</span></p>
                <img id="capture-image" src={capture.secure_url}></img>
            <div id="delete-capture-btn" ref={btnRef}>
                <OpenModalMenuItem
                    modalComponent={<DeleteCaptureModal captureId={capture.id} name={name}/>}
                    itemText={"Delete Capture"}
                    onItemClick={toggleConfirmation}

                />
            </div>



            </li>
           ) )
        )
    }
}

    return (
        <div className="tfc-container">
            <h1>{name}</h1>
            <div className="captures-wrapper">
            <TagContentList/>
            </div>
        </div>
    )
}

export default TagFolderContents;
