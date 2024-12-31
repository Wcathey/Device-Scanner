import './UpdateTagModal.css';
import { useState } from 'react';
function UpdateTagModal () {

    const [tagName, setTagName] = useState("")

    return (
        <div className="update-tag-container">
            <form>
                <label>
                    Enter a new tag name
                </label>
                <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                required
                >
                </input>
            </form>
        </div>
    )
}

export default UpdateTagModal
