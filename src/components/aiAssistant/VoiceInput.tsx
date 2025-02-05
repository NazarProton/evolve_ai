interface VoiceInputProps {
  listening: boolean;
  callActive: boolean;
  startListening: () => void;
  stopCall: () => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  listening,
  callActive,
  startListening,
  stopCall,
}) => {
  const handleClick = () => {
    if (callActive) {
      stopCall();
    } else {
      startListening();
    }
  };
  const displayText = callActive
    ? 'Hang Up'
    : listening
    ? 'Listening'
    : 'Press to Talk';

  return (
    <div className="relative flex w-full flex-col items-center font-chivo-mono-light uppercase">
      <p className="text-white mb-4 text-lg">{displayText}</p>
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center h-[48px] w-[48px] transition-opacity duration-300"
      >
        <div className="absolute inset-0"></div>
        <img
          src={
            callActive
              ? `${import.meta.env.BASE_URL}hangUp.svg`
              : listening
              ? `${import.meta.env.BASE_URL}microOff.svg`
              : `${import.meta.env.BASE_URL}microOn.svg`
          }
          alt={callActive ? 'Hang Up' : listening ? 'Microphone On' : 'Microphone Off'}
          className="w-12 h-12 opacity-25 transition-opacity duration-300 ease-out hover:opacity-100"
        />
      </button>
    </div>
  );
};

export default VoiceInput;
