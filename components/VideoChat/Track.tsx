import React, { useRef } from 'react';
import { useEffect } from 'react';

/** Description of component */
export function Track({ track }) {
  const trackRef = useRef();
  useEffect(() => {
    if (track && trackRef.current && track?.attach) {
      const child = track.attach();
      trackRef?.current?.appendChild(child);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={trackRef}></div>;
}
