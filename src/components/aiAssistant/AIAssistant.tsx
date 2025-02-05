import VoiceInput from './VoiceInput';
import AiSplineElement from './AiSplineElement';
import useVoiceInput from '../../hooks/useVoiceInput';
import useAudioProcessing from '../../hooks/useAudioProcessing';
import AiMessage from './AIMessage';
import FooterLinks from '../landing/FooterLinks';
import { useState, useEffect } from 'react';
import useVapiCall from '../../hooks/useVapiCall';

const assistantId = '9ac36489-6392-452f-8858-bb53ddd3ab37';

const AiAssistant = () => {
  const { callStatus, assistantSpeaking, startCall, stopCall } =
    useVapiCall(assistantId);
  const { listening, startListening } = useVoiceInput(
    assistantSpeaking,
    callStatus
  );
  const { circleSizeSpline } = useAudioProcessing(listening);

  useEffect(() => {
    if (listening && callStatus === 'idle') {
      startCall();
    }

    let stopTimeout: ReturnType<typeof setTimeout>;
    if (!listening && callStatus !== 'idle') {
      stopTimeout = setTimeout(() => {
        if (!listening) {
          stopCall();
        }
      }, 60000);
    }

    return () => {
      if (stopTimeout) clearTimeout(stopTimeout);
    };
  }, [listening, callStatus, startCall, stopCall]);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const [AIMessageText] = useState('Hello! My name is AISHA. Ready to talk?');

  return (
    <div className="bg-black text-white w-full px-6 flex flex-col items-center">
      <div
        className={`border w-full items-center justify-center border-white-25 flex flex-col max-w-[1280px] min-[1920px]:max-w-[66.6vw] ${
          isSafari ? 'h-fit' : 'min-h-[596px] h-[calc(100vh-112px-112px)]'
        }`}
      >
        <AiMessage listening={listening} AIMessage={AIMessageText} />
        <AiSplineElement
          listening={listening}
          startListening={startListening}
          circleSize={circleSizeSpline}
          assistantSpeaking={assistantSpeaking}
        />
        <VoiceInput
          listening={listening || callStatus === 'active'}
          startListening={startListening}
          callActive={callStatus === 'active'}
          stopCall={stopCall}
        />
      </div>
      <FooterLinks />
    </div>
  );
};

export default AiAssistant;
