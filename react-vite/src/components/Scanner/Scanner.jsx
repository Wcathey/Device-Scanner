import { useEffect, useRef, useState } from 'react';
import './Scanner.css';

function Scanner({ image }) {
    const containerRef = useRef(null);
    const openCvURL = 'https://docs.opencv.org/4.7.0/opencv.js';

    const [loadedOpenCV, setLoadedOpenCV] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [imageVisibility, setImageVisibility] = useState("show-container")
    useEffect(() => {
        // eslint-disable-next-line no-undef
        const scanner = new jscanify();
        loadOpenCv(() => {
            if (selectedImage) {
                containerRef.current.innerHTML = '';
                const newImg = document.createElement('img');
                newImg.src = selectedImage



                newImg.onload = function () {
                    const resultCanvas = scanner.extractPaper(newImg, 386, 500);
                    resultCanvas.className = "canvas-image"
                    containerRef.current.append(resultCanvas);

                    const highlightedCanvas = scanner.highlightPaper(newImg);
                    highlightedCanvas.className = "canvas-image"
                    containerRef.current.append(highlightedCanvas);
                };
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage, imageVisibility]);

    const loadOpenCv = (onComplete) => {
        const isScriptPresent = !!document.getElementById('open-cv');
        if (isScriptPresent || loadedOpenCV) {
            setLoadedOpenCV(true);
            onComplete();
        } else {
            const script = document.createElement('script');
            script.id = 'open-cv';
            script.src = openCvURL;

            script.onload = function () {
                setTimeout(function () {
                    onComplete();
                }, 1000);
                setLoadedOpenCV(true);
            };
            document.body.appendChild(script);
        }
    };

    return (
        <>
            <div className="scanner-container">
                <div className={imageVisibility}>
                    {!loadedOpenCV && (
                        <div>
                            <h2>Loading OpenCV...</h2>
                        </div>
                    )}

                    <img
                        className={selectedImage ? 'selected' : ''}
                        src={image}

                    />
                    <button id="scan-btn" onClick={() => {
                        setSelectedImage(image)
                        setImageVisibility("hide-container")

                    }}>
                        Scan
                    </button>
                </div>

            </div>
            <div ref={containerRef} id="result-container"></div>
        </>
    );
}

export default Scanner;
