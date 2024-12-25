import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useParams } from "react-router-dom";
import { getTagContentsByName } from "../../redux/tag";
import "./TagFolderContents.css";

function TagFolderContents () {
const dispatch = useDispatch();
const {name} = useParams();
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
            </li>
           ) )
        )
    }
}

    return (
        <div className="tfc-container">
            <h1>#{name}</h1>
            <div className="captures-wrapper">
            <TagContentList/>
            </div>
        </div>
    )
}

export default TagFolderContents;
