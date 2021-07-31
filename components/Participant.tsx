import React, { useEffect, useState } from 'react';
import { FiMicOff, FiMic, FiVideo, FiVideoOff } from 'react-icons/fi';
import { Icon, Text } from '@chakra-ui/react';

import { Track } from './Track';

/** Description of component */
export function Participant({ participant, localParticipant = false }) {
  const existingPublications = Array.from(participant.tracks.values());
  const existingTracks = existingPublications.map((publication: any) => publication.track);
  const nonNullTracks = existingTracks.filter((track) => track !== null);
  const [tracks, setTracks] = useState(nonNullTracks);

  const [audioEnabled, setAudioEnabled] = useState(
    nonNullTracks.find((x) => x.kind === 'audio')?.isEnabled || false
  );

  const [videoEnabled, setVideoEnabled] = useState(
    nonNullTracks.find((x) => x.kind === 'video')?.isEnabled || false
  );

  useEffect(() => {
    if (!localParticipant) {
      participant.on('trackSubscribed', (track) => addTrack(track));
    }
  }, []);

  const addTrack = (track) => {
    setTracks((tracks) => [...tracks, track]);

    if (track.kind === 'audio') {
      setAudioEnabled(track.isEnabled);
    } else if (track.kind === 'video') {
      setVideoEnabled(track.isEnabled);
    }

    track.on('disabled', () => {
      if (track.kind === 'audio') {
        setAudioEnabled(false);
      } else if (track.kind === 'video') {
        setVideoEnabled(false);
      }
    });

    track.on('enabled', () => {
      if (track.kind === 'audio') {
        setAudioEnabled(true);
      } else if (track.kind === 'video') {
        setVideoEnabled(true);
      }
    });
  };

  const videoTrack = tracks.find((x) => x.kind === 'video');
  const audioTrack = tracks.find((x) => x.kind === 'audio');

  const setAudioMuted = () => {
    if (audioEnabled) {
      participant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });
    } else {
      participant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });
    }

    setAudioEnabled(!audioEnabled);
  };

  const setVideoMuted = () => {
    //loca
    if (videoEnabled) {
      participant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
    } else {
      participant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
    }

    setVideoEnabled(!videoEnabled);
  };

  return (
    <div style={styles.participant} id={participant.identity}>
      <div style={styles.identity}>{participant.identity}</div>
      {tracks.map((track, index) => (
        <Track key={index} track={track} />
      ))}

      {!videoEnabled && (
        <Text
          as="h2"
          fontSize="lg"
          // style={{
          //   position: 'absolute',
          //   width: '100%',
          //   height: '100%',
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}
        >
          {participant.identity}
        </Text>
      )}

      {audioTrack && (
        <Icon
          {...(localParticipant && { onClick: setAudioMuted })}
          as={audioEnabled ? FiMic : FiMicOff}
          w={8}
          h={6}
        />
      )}

      {videoTrack && (
        <Icon
          {...(localParticipant && { onClick: setVideoMuted })}
          as={videoEnabled ? FiVideo : FiVideoOff}
          w={8}
          h={6}
        />
      )}
    </div>
  );
}

const styles = {
  participant: {
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: '8px',
    marginLeft: '.75vw',
    marginBottom: '.75vw',
    width: '23.5vw',
    overflow: 'hidden',
    height: '50vh',
    // '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
    display: 'flex',
    justifyContent: 'center',
  },
  identity: {
    position: 'absolute',
    left: '0px',
    bottom: '15px',
    color: 'white',
    paddingLeft: '15px',
    boxSizing: 'border-box',
    zIndex: 10,
  },
};
