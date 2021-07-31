import React, { useRef } from 'react';
import { Icon, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiMicOff, FiMic, FiVideo, FiVideoOff } from 'react-icons/fi';

/** Description of component */
export function Track({ track }) {
  const trackRef = useRef();
  useEffect(() => {
    if (track && trackRef.current) {
      const child = track.attach();
      trackRef?.current?.classList.add(track.kind);
      trackRef?.current?.appendChild(child);
    }
  }, []);

  return <div className="track" ref={trackRef}></div>;
}
