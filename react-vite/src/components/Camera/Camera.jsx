import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import './Camera.css'


const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: 'user'
};

const Camera = () => {
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);

    const captureImage = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }, [webcamRef]);

    const onUserMedia = (e) => {
        console.log(e)
    }




    return (
        <div className='webcam-page-container'>
            <div id='webcam-wrapper'>
                <Webcam
                    className='camera'
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/png"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    mirrored={true}
                />
            </div>
            <div className='web-capture-btns'>
                <button onClick={captureImage}>Capture</button>
                <button onClick={() => setUrl(null)}>Refresh</button>
            </div>
            <div className='display-captured-image'>
                {url && (
                    <div>
                        <img src={url} alt="Screenshot" />
                    </div>
                )}
            </div>
        </div>

    )


}

export default Camera;
