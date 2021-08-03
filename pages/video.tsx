import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import { createLocalTracks, connect } from 'twilio-video';

import { useTwilio } from '../context/twilio';
import { Room } from '../components/Room';
import { useMeeting } from '../context/meetings';
import { Preview } from '../components/Preview';
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

  const { token, setToken } = useTwilio();

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
      joinRoom(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, twilioToken]);

  const handleJoin = () => {
    setToken(meetingId);
  };

  if (loading) {
    return <FullPageSpinner />;
  }

  const joinRoom = async (token) => {
    try {
      const room = await connect(token, {
        audio: audioEnabled,
        video: videoEnabled,
      });

      setRoom(room);
    } catch (err) {
      console.log(err);
    }
  };

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
            <Preview
              participant={{
                tracks: localTracks,
                audioTracks: localTracks.map((x) => x.kind === 'audio'),
                videoTracks: localTracks.map((x) => x.kind === 'video'),
                identity: 'Me',
              }}
              audioEnabled={audioEnabled}
              videoEnabled={videoEnabled}
              setAudioEnabled={setAudioEnabled}
              setVideoEnabled={setVideoEnabled}
              handleJoin={handleJoin}
            />
          </>
        ) : (
          <Room
            audioEnabled={audioEnabled}
            videoEnabled={videoEnabled}
            setAudioEnabled={setAudioEnabled}
            setVideoEnabled={setVideoEnabled}
            room={room}
            returnToLobby={returnToLobby}
          />
        )}
      </div>
    </>
  );
}

const styles = {
  app: {
    padding: '.75vw',
    width: '100%',
    boxSizing: 'border-box',
  },
  lobby: {
    marginTop: '100px',
    textAlign: 'center',
    fontSize: '1.25em',
  },
};

export default VideoPage;
