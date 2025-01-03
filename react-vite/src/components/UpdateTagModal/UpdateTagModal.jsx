import { useDispatch } from 'react-redux';
import './UpdateTagModal.css';
import { useState } from 'react';
function UpdateTagModal() {
    const dispatch = useDispatch;
    
    const [tagName, setTagName] = useState("")
    const [errors, setErrors] = useState({})
    const [submitOption, setSubmitOption] = useState("")

    const handleSubmit = (e) => {
        if(submitOption === "name-change") {
        e.preventDefault();
        setErrors({});

    }

    }

    return (
        <div className="update-tag-container">
            <form onSubmit={handleSubmit}>
                <h1>Edit Capture</h1>
                <p>What would you like to edit?</p>
                <h2>Change Tag Name</h2>
                <p>By entering a new tag name this capture will be transfered to another folder</p>

                <label>
                    New Tag Name
                </label>
                <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    required
                >
                </input>
                <button type="submit" onClick={setSubmitOption("name-change")}>Save</button>
            </form>
        </div>
    )
}

export default UpdateTagModal
