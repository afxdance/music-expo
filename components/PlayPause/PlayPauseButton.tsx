import { Audio, AVPlaybackStatus } from 'expo-av';
import { useState } from 'react';
import { Button } from 'react-native';


type PlayPauseButtonProps = {
 sound: Audio.Sound;
};

const PlayPauseButton = (props: PlayPauseButtonProps) => {
  const [play, setPlay] = useState<boolean>(false);
  const playSound = async() => {
    setPlay(true);
    console.log('playSound')
    await props.sound.playAsync().catch(console.error);
  }

  const pauseSound = async() => {
    setPlay(false);
    console.log('pauseSound');
    await props.sound.pauseAsync().catch(console.error);
  }

  const toggleSound = async() => {
    await props.sound.getStatusAsync().then((status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        if (status.isPlaying) {
          pauseSound();
        } else {
          playSound();
        }
      }
    }).catch(console.error);
  }

  return (
    <Button
      title={play == false ? 'Play' : 'Pause'}
      onPress={toggleSound}
    />
  )
}

export default PlayPauseButton;