import { Audio, AVPlaybackSourceObject } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from 'react-native';

type LoadSoundProps = {
 setSound: (sound: Audio.Sound) => void;
};

const LoadSoundButton = (props: LoadSoundProps) => {
  const loadSound = async() => {
    console.log('load')
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
    })
    props.setSound(sound);
  }

  return (
    <Button title="Load" onPress={loadSound}/>
  )
}

export default LoadSoundButton;
