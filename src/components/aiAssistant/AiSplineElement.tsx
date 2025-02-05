import Spline from '@splinetool/react-spline';
import { useEffect, useState, useRef } from 'react';

const AiSplineElement = ({
  listening,
  startListening,
  circleSize,
}: {
  listening: boolean;
  startListening: () => void;
  circleSize: number;
}) => {
  const startEndScale = 0.6666;
  const onStartScale = 0.8333;
  const maxScale = 1;
  const minScale = 0.625;

  const [scale, setScale] = useState(startEndScale);
  const alreadyListeningRef = useRef(false);

  useEffect(() => {
    let newScale = startEndScale;
    const dividerToScale = 110;

    if (listening) {
      if (!alreadyListeningRef.current) {
        setScale(onStartScale);
        alreadyListeningRef.current = true;
      }
      const circleSizeScale = circleSize / dividerToScale;
      if (circleSizeScale > minScale && circleSizeScale < maxScale) {
        newScale = circleSize / dividerToScale;
      } else if (circleSize > maxScale) {
        newScale = maxScale;
      } else {
        newScale = minScale;
      }
      setScale(newScale);
    } else {
      newScale = startEndScale;
      setScale(minScale);
      alreadyListeningRef.current = false;
      const handler = setTimeout(() => setScale(startEndScale), 300);
      return () => clearTimeout(handler);
    }
  }, [circleSize, listening]);

  return (
    <div className="relative w-full min-[384px]:w-[384px] h-[384px] flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-[384px]">
        <Spline
          onClick={startListening}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
            transform: `scale(${scale})`,
            transition: 'transform 0.3s ease-out',
            cursor: 'pointer',
          }}
          scene="https://prod.spline.design/moDxSU2YolLqofps/scene.splinecode"
        />
      </div>
      <div
        className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ease-out rounded-full`}
      ></div>
    </div>
  );
};

export default AiSplineElement;
