import { useEffect, useState } from 'react';

const AiMessage: React.FC<{ listening: boolean; AIMessage: string }> = ({
  listening,
  AIMessage,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (listening) {
      setIsVisible(false);
    }
  }, [listening]);
  return (
    <div
      className={`flex justify-center items-center flex-col font-chivo-mono-light
         transition-opacity ease-out duration-300 ${
           isVisible ? 'opacity-100' : 'opacity-0'
         }`}
    >
      <div className={` bg-red text-white py-2 px-4 `}>{AIMessage}</div>
      <div
        className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent 
             border-t-16 border-t-red border-solid transform"
      ></div>
    </div>
  );
};

export default AiMessage;
