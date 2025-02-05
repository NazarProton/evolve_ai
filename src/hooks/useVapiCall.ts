// src/hooks/useVapiCall.ts
import { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

export const useVapiCall = (assistantId: string) => {
  const [vapi] = useState(() => new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY));
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);

  useEffect(() => {
    const handleCallStart = () => {
      setCallStatus('active');
    };

    const handleCallEnd = () => {
      setCallStatus('idle');
    };

    const handleSpeechStart = () => {
      setAssistantSpeaking(true);
    };

    const handleSpeechEnd = () => {
      setAssistantSpeaking(false);
    };

    const handleError = (error: Error) => {
      console.error('Vapi error:', error);
      setCallStatus('idle');
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('error', handleError);

    // Cleanup when the hook unmounts
    return () => {
      vapi.stop();
    };
  }, [vapi]);

  const startCall = () => {
    if (callStatus === 'idle') {
      setCallStatus('connecting');
      vapi.start(assistantId, {}); // You can add extra options as needed
    }
  };

  const stopCall = () => {
    if (callStatus !== 'idle') {
      vapi.stop();
    }
  };

  return { callStatus, assistantSpeaking, startCall, stopCall };
};

export default useVapiCall;
