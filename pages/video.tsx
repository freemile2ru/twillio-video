import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import { createLocalTracks, connect } from 'twilio-video';

import { useTwilio } from '../context/twilio';
import { Room } from '../components/VideoChat/Room';
import { useMeeting } from '../context/meetings';
import { Preview } from '../components/VideoChat/Preview';
import { FullPageSpinner } from '../components/FullPageSpinner';

function VideoPage() {
  const [room, setRoom] = useState(null);
  const [join, setJoin] = useState(false);
  const [twilioToken, setTwilioToken] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [localTracks, setLocalTracks] = useState([]);

  const {
    state: { meeting: meetingId, loading },
  } = useMeeting();

  const { token, loading: tokenLoading, setToken } = useTwilio();

  useEffect(() => {
    createLocalTracks({
      audio: true,
      video: true,
    }).then((localTracks) => {
      setLocalTracks(localTracks);
    });
  }, []);

  useEffect(() => {
    if (token && token !== twilioToken) {
      setTwilioToken(token);
      setJoin(true);

      const joinRoom = async (token) => {
        try {
          const room = await connect(token, {
            audio: audioEnabled,
            video: videoEnabled,
          });

          setRoom(room);
        } catch (err) {}
      };

      joinRoom(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, twilioToken, audioEnabled, videoEnabled]);

  const handleJoin = () => {
    setToken(meetingId);
  };

  if (loading || tokenLoading) {
    return <FullPageSpinner />;
  }

  const returnToLobby = () => {
    setRoom(null);
  };

  return (
    <>
      <Head>
        <title>VideoPage</title>
      </Head>

      <Heading size="lg">I am video page</Heading>
      <div style={styles.app}>
        {!join || !room ? (
          <>
            {!localTracks.length ? (
              <div></div>
            ) : (
              <Preview
                participant={{
                  tracks: localTracks,
                  audioTracks: localTracks.filter((x) => x.kind === 'audio'),
                  videoTracks: localTracks.filter((x) => x.kind === 'video'),
                  identity: 'Me',
                }}
                setAudioEnabled={setAudioEnabled}
                setVideoEnabled={setVideoEnabled}
                handleJoin={handleJoin}
              />
            )}
          </>
        ) : (
          <Room room={room} returnToLobby={returnToLobby} />
        )}
      </div>
    </>
  );
}

const styles = {
  app: {
    padding: '.75vw',
    width: '100%',
  },
  lobby: {
    marginTop: '100px',
    textAlign: 'center',
    fontSize: '1.25em',
  },
};

export default VideoPage;
