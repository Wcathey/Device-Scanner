import { deleteCaptureById } from "../../redux/capture";
import { getTagContentsByName } from "../../redux/tag";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";



function DeleteCaptureModal ({captureId, name}) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        if(deleted) {
            dispatch(getTagContentsByName(name))
            closeModal()
        }
    }, [dispatch, deleted, closeModal, name])

    const handleDeletion = async (e) => {
        e.preventDefault();

        const deleteCapture = await dispatch(deleteCaptureById(captureId))
        if(deleteCapture) {
            setDeleted(true)
        }

    }


    return (
    <div className="delete-cap-container">
        <form onSubmit={handleDeletion}>
        <h1>Delete Capture</h1>
        <h2>Are you sure?</h2>
        <p>All data will be permanatly deleted and can not be undone</p>

        <button type="submit">Confrim Delete</button>
        <button>Cancel</button>
        </form>
    </div>
    )
}

export default DeleteCaptureModal
