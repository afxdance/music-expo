import { Audio, AVPlaybackStatus } from 'expo-av';
import { useState } from 'react';
import { Button, View } from 'react-native';
import {styles} from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';


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
    // <View style={styles.container}>
    //   <FontAwesome.Button name="play" size = {50} color="black" backgroundColor="white" onPress={toggleSound}></FontAwesome.Button>
    // </View>
    <View style={styles.container}>
      <FontAwesome.Button name={play ? "pause" : "play"} color="black" size = {50} backgroundColor="white" onPress={toggleSound}></FontAwesome.Button>
    </View>
    
  )
}


export default PlayPauseButton;