import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import { getAllCaptures } from '../../redux/capture';
import './Scanner.css'




function Scanner ()  {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const openCvURL = 'https://docs.opencv.org/4.7.0/opencv.js';

  const [loadedOpenCV, setLoadedOpenCV] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const images = useSelector(state => state.capture.Captures);

  useEffect(() => {
     dispatch(getAllCaptures())
    // eslint-disable-next-line no-undef
    const scanner = new jscanify();
    loadOpenCv(() => {
      if (selectedImage) {
        containerRef.current.innerHTML = '';
        const newImg = document.createElement('img');
        newImg.src = selectedImage.src;

        newImg.onload = function () {
          const resultCanvas = scanner.extractPaper(newImg, 386, 500);
          containerRef.current.append(resultCanvas);

          const highlightedCanvas = scanner.highlightPaper(newImg);
          containerRef.current.append(highlightedCanvas);
        };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

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
  if(images) {
  return (
    <>
      <div className="scanner-container">
        <div>
          {!loadedOpenCV && (
            <div>
              <h2>Loading OpenCV...</h2>
            </div>
          )}
          {images.map((image) => (
            <img
              key={image.id}
              className={selectedImage && selectedImage.src === image.secure_url ? 'selected' : ''}
              src={image.secure_url}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div ref={containerRef} id="result-container"></div>
      </div>
    </>
  );
}
};

export default Scanner;
