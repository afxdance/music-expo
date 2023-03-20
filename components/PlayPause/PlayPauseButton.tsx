import { Audio, AVPlaybackStatus } from 'expo-av';
import { Button, ImageBackground } from 'react-native';

type PlayPauseButtonProps = {
 sound: Audio.Sound;
};

const image = {uri: './image.jpeg'}

const PlayPauseButton = (props: PlayPauseButtonProps) => {
  const playSound = async() => {
    console.log('playSound')
    await props.sound.playAsync().catch(console.error);
  }

  const pauseSound = async() => {
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
    <ImageBackground source={image}>
     <Button title="PlayPause" onPress={toggleSound}/>
    </ImageBackground>
  )
}

export default PlayPauseButton;