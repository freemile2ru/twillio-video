import React, { useEffect, useState } from 'react';
import { FiMicOff, FiMic, FiVideo, FiVideoOff } from 'react-icons/fi';
import { Icon, Text } from '@chakra-ui/react';
import { createLocalAudioTrack, createLocalVideoTrack } from 'twilio-video';

import { StylesDictionary } from '../../types/css';

import { Track } from './Track';

/** Description of component */
export function Participant({
  participant,
  localParticipant = false,
  children = null,
  activeWindow = false,
  onDoubleClick = () => null,
  previewWindow = false,
  isActive = false,
  setAudioEnabled: setAudioEnabledCB = (state: boolean) => state,
  setVideoEnabled: setVideoEnabledCB = (state: boolean) => state,
  setLocalParticipant = null,
}) {
  const getNotNullTracks = (participant) => {
    const existingPublications = Array.from(participant.tracks.values());

    const existingTracks = existingPublications.map(
      (publication: any) => publication.track || publication
    );

    const nonNullTracks = existingTracks.filter((track) => track !== null);
    return nonNullTracks;
  };

  const [tracks, setTracks] = useState(getNotNullTracks(participant));
  const videoTrack = tracks.find((x) => x.kind === 'video');
  const audioTrack = tracks.find((x) => x.kind === 'audio');

  const [audioEnabled, setAudioEnabled] = useState(
    audioTrack && (audioTrack.isEnabled || audioTrack.isTrackEnabled)
  );

  const [videoEnabled, setVideoEnabled] = useState(
    videoTrack && (videoTrack.isEnabled || videoTrack.isTrackEnabled)
  );

  useEffect(() => {
    if (!localParticipant) {
      participant.on('trackSubscribed', (track) => addTrack(track));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('====>', getNotNullTracks(participant).length, activeWindow);

  useEffect(() => {
    if (localParticipant && getNotNullTracks(participant).length !== tracks.length) {
      console.log('======here');
      setTracks(getNotNullTracks(participant));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNotNullTracks(participant).length]);

  useEffect(() => {
    const audioTrackObj = audioTrack?.track || audioTrack;
    const videoTrackObj = videoTrack?.track || videoTrack;

    [
      ...((audioTrackObj && [audioTrackObj]) || []),
      ...((videoTrackObj && [videoTrackObj]) || []),
    ].forEach((track) => {
      setTrackListeners(track);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTrack = (track) => {
    setTracks((tracks) => [...tracks, track]);

    if (track.kind === 'audio') {
      setAudioEnabled(track.isEnabled);
    } else if (track.kind === 'video') {
      setVideoEnabled(track.isEnabled);
    }

    setTrackListeners(track);
  };

  const setTrackListeners = (track) => {
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

  const setAudioMuted = () => {
    if (audioEnabled) {
      participant.audioTracks.forEach((publication) => {
        publication.disable ? publication.disable() : publication.track.disable();
      });
    } else {
      if (!audioTrack) {
        createLocalAudioTrack().then(async (track) => {
          if (localParticipant) {
            participant.publishTrack(track, { priority: 'low' });
            setTracks(getNotNullTracks(participant));
            setLocalParticipant(participant);
          }
        });
      } else {
        participant.audioTracks.forEach((publication) => {
          publication.enable ? publication.enable() : publication.track.enable();
        });
      }
    }

    setAudioEnabled(!audioEnabled);
    setVideoEnabledCB && setAudioEnabledCB(!audioEnabled);
  };

  const setVideoMuted = () => {
    if (videoEnabled) {
      participant.videoTracks.forEach((publication) => {
        publication.disable ? publication.disable() : publication.track.disable();
      });
    } else {
      if (!videoTrack) {
        createLocalVideoTrack().then(async (track) => {
          if (localParticipant) {
            await participant.publishTrack(track, { priority: 'low' });
            setTracks(getNotNullTracks(participant));
            setLocalParticipant(participant);
          }
        });
      } else {
        participant.videoTracks.forEach((publication) => {
          publication.enable ? publication.enable() : publication.track.enable();
        });
      }
    }

    setVideoEnabled(!videoEnabled);
    setVideoEnabledCB && setVideoEnabledCB(!videoEnabled);
  };

  return (
    <div
      style={
        activeWindow || previewWindow
          ? {
              ...styles.activeWindowParticipant,
              ...(!videoEnabled && { height: previewWindow ? '30vh' : '60vh' }),
            }
          : { ...styles.participant, ...(isActive && { border: '5px solid yellow' }) }
      }
      onDoubleClick={onDoubleClick}
    >
      {tracks.map((track, index) => (
        <Track
          key={(!!track.isEnabled || !!track.isTrackEnabled).toString() + index}
          track={track}
        />
      ))}

      {!videoTrack && (
        <div style={{ backgroundColor: 'black', width: '100%', height: '100%' }}></div>
      )}

      {/* {!videoEnabled && ( */}
      <Text as="h2" style={styles.identity} fontSize="lg">
        {participant?.identity}
      </Text>
      {/* )} */}
      <div style={styles.icons}>
        <Icon
          {...(localParticipant && { onClick: setAudioMuted })}
          as={audioEnabled ? FiMic : FiMicOff}
          w={8}
          h={6}
          color={'white'}
        />

        <Icon
          {...(localParticipant && { onClick: setVideoMuted })}
          as={videoEnabled ? FiVideo : FiVideoOff}
          w={8}
          h={6}
          color={'white'}
        />

        {children}
      </div>
    </div>
  );
}

const styles: StylesDictionary = {
  participant: {
    position: 'relative',
    marginLeft: '.75vw',
    marginBottom: '.75vw',
    overflow: 'hidden',
    height: '100%',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '180px',
  },
  activeWindowParticipant: {
    position: 'relative',
    borderRadius: '8px',
    marginLeft: '.75vw',
    marginBottom: '.75vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '180px',
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
    backgroundColor: 'transparent',
  },
};
