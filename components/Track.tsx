import React, { useRef } from 'react';
import { useEffect } from 'react';

/** Description of component */
export function Track({ track }) {
  const trackRef = useRef();
  useEffect(() => {
    if (track && trackRef.current) {
      const child = track.attach();
      trackRef?.current?.appendChild(child);
    }
  }, []);

  return <div ref={trackRef}></div>;
}
