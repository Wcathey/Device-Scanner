import { useSelector, useDispatch } from "react-redux"
import { NavLink, useParams } from "react-router-dom";
import { getTagContentsByName } from "../../redux/tag";
import { useState, useEffect, useRef } from "react";
import "./TagFolderContents.css";
import UpdateTagModal from "../UpdateTagModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

function TagFolderContents () {
const dispatch = useDispatch();
const {name} = useParams();
const [showEditBox, setShowEditBox] = useState(false);
const btnRef = useRef();

const toggleEdit = (e) => {
    e.stopPropagation();
    setShowEditBox(!showEditBox);
};

useEffect(() => {
    if(!showEditBox) return;

    const closeEditBox = (e) => {
        if(btnRef.current && btnRef.current.contains(e.target) ) {
            setShowEditBox(false);
        }
    };

    document.addEventListener("click", closeEditBox);

    return () => document.removeEventListener("click", closeEditBox);
}, [showEditBox]);

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
            <div id="transfer-btn" ref={btnRef}>
            <OpenModalMenuItem
                itemText={"Edit Capture"}
                onItemClick={toggleEdit}
                modalComponent={<UpdateTagModal/>}



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
