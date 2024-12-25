import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { getAllTags } from "../../redux/tag";
import { FaRegFolder } from "react-icons/fa";
import './TagFoldersPage.css';

function TagFoldersPage () {
    const dispatch = useDispatch();
    const allTags = useSelector(state => state.tag.Tags);

    useEffect(() => {
        dispatch(getAllTags())
    }, [dispatch]);

    const TagFolderList = () => {
        if (allTags) {

            return (
                allTags.map((tag) =>(
                    <li key={tag.id}>
                        <NavLink to={`/tags/${tag.name}`}>
                        <div className="tag-folder-wrapper">
                        <FaRegFolder id="folder-icon"/>
                            <p>#{tag.name}</p>
                        </div>
                        </NavLink>
                    </li>
                ))
            )
        }
    }

    return (
        <div className="tfp-container">
            <div>
            <h1>Captures Directory</h1>
            </div>

            <div className="tag-folder-component">
                <TagFolderList/>
            </div>

        </div>
    )
}

export default TagFoldersPage;
