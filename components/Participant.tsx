import React, { useEffect, useState } from 'react';
import { FiMicOff, FiMic, FiVideo, FiVideoOff } from 'react-icons/fi';
import { Icon, Text } from '@chakra-ui/react';

import { Track } from './Track';

/** Description of component */
export function Participant({
  participant,
  localParticipant = false,
  children = null,
  active = false,
}) {
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
    <div style={active ? styles.activeParticipant : styles.participant} id={participant.identity}>
      {tracks.map((track, index) => (
        <Track key={index} track={track} />
      ))}

      {/* {!videoEnabled && ( */}
      <Text as="h2" style={styles.identity} fontSize="lg">
        {participant.identity}
      </Text>
      {/* )} */}
      <div style={styles.icons}>
        {audioTrack && (
          <Icon
            {...(localParticipant && { onClick: setAudioMuted })}
            as={audioEnabled ? FiMic : FiMicOff}
            w={8}
            h={6}
            color={'white'}
          />
        )}

        {videoTrack && (
          <Icon
            {...(localParticipant && { onClick: setVideoMuted })}
            as={videoEnabled ? FiVideo : FiVideoOff}
            w={8}
            h={6}
            color={'white'}
          />
        )}

        {children}
      </div>
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
    overflow: 'hidden',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
  activeParticipant: {
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: '8px',
    marginLeft: '.75vw',
    marginBottom: '.75vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  identity: {
    position: 'absolute',
    justifyContent: 'center',
    color: 'white',
    paddingLeft: '15px',
    boxSizing: 'border-box',
    zIndex: 10,
  },
  icons: {
    position: 'absolute',
    bottom: '10px',
  },
};
