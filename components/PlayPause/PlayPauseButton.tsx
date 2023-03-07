import { Audio, AVPlaybackStatus } from 'expo-av';
import { Button } from 'react-native';

type PlayPauseButtonProps = {
 sound: Audio.Sound;
};

const PlayPauseButton = (props: PlayPauseButtonProps) => {
  const playSound = async() => {
    console.log('play')
    await props.sound.playAsync().catch(console.error);
  }

  const pauseSound = async() => {
    console.log('pause');
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
    <Button title="PlayPause" onPress={toggleSound}/>
  )
}

export default PlayPauseButton;