import { Audio, AVPlaybackSourceObject } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { View } from 'react-native';
import {styles} from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type LoadSoundProps = {
 setSound: (sound: Audio.Sound) => void;
 setSource: (source: AVPlaybackSourceObject) => void;
 sound: Audio.Sound;
};

const LoadSoundButton = (props: LoadSoundProps) => {
  const unloadSound = async() => {
    console.log('Unload sound')
    if (props.sound != null) {
      await props.sound.unloadAsync().catch(console.error);
      props.setSound(null);
      props.setSource(null);
    }
  }
  const [load, setLoad] = useState<boolean>(false);
  const loadSound = async() => {
    console.log('loadSound');
    const result: DocumentPicker.DocumentResult = await DocumentPicker.getDocumentAsync(
      {
        copyToCacheDirectory: true,
        type: 'audio/*'
      });
    if (result.type === 'cancel') {
      console.log('Failed to set sound.'); 
      return;
    }
    const playbackObject: AVPlaybackSourceObject = {
      uri: result.uri
    }
    const { sound } = await Audio.Sound.createAsync(playbackObject);
    sound.setStatusAsync({
      isLooping: true
    });
    await unloadSound()
    props.setSource(playbackObject);
    props.setSound(sound);
  }
  const toggleSound = async() => {
    {
      if (props.sound == null) {
        setLoad(true);
          loadSound();
        } else {
          setLoad(false);
          unloadSound();
        }
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesome.Button name={load ? "minus-circle" : "plus-circle"} size = {40} color="black" backgroundColor="white" onPress={toggleSound}></FontAwesome.Button>
    </View>
  )
}

export default LoadSoundButton;
