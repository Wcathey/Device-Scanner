import { useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import './Camera.css'
import { uploadCaptureMetaData } from '../../redux/capture';


const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: 'user'
};

const Camera = () => {


    const [url, setUrl] = useState(null);
    const [tagName, setTagName] = useState("");
    const [errors, setErrors] = useState({});
    const [cameraVisibility, setCameraVisibility] = useState("cam-visible");
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);


    const dispatch = useDispatch();
    const webcamRef = useRef(null);

    const captureImage = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
        setCameraVisibility("cam-hidden")
    }, [webcamRef]);

    const onUserMedia = (e) => {
        console.log(e)
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if ((sessionUser)) {
            setErrors({});

         dispatch(uploadCaptureMetaData(url, tagName, sessionUser.id)).then((uploadData) => {
                navigate(`/tags/${tagName}`)
                return uploadData
            })
        }
    }



    return (
        <div className='webcam-page-container'>
            <div id={cameraVisibility}>
                <Webcam
                    className='camera'
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/png"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    mirrored={true}
                    imageSmoothing={true}
                    screenshotQuality={1}
                />
                <div className='web-capture-btns'>
                    <button onClick={captureImage}>Capture</button>
                </div>
            </div>

            <div className='display-captured-image'>
                {url && (
                    <div id="image-capture">
                        <form onSubmit={handleUpload}>
                            <img src={url} alt="Screenshot" />

                            <div className='tag-details-container'>
                                <p>Add a tag to upload image</p>
                                <label>
                                    Tag
                                </label>
                                <input
                                    type="text"
                                    placeholder="#Tag"
                                    value={tagName}
                                    onChange={(e) => setTagName(e.target.value)}
                                    required
                                />
                                {errors.tagName && <p>{errors.tagName}</p>}
                            </div>
                            <div className='image-capture-btns'>
                                <button type="submit">Save Capture</button>
                                <button onClick={() => {
                                    setUrl(null)
                                    setCameraVisibility("cam-visible")
                                }
                                }>Refresh</button>
                            </div>
                        </form>


                    </div>
                )}
            </div>
        </div>

    )


}

export default Camera;
