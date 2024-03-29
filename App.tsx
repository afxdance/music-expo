import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { styles } from './styles';

import { useState, useEffect } from 'react';
import { Audio, AVPlaybackSourceObject } from 'expo-av';

import Scrubber from './components/Scrubber/Scrubber';
import LoadSoundButton from './components/SoundLoader/LoadSound';
import PlayPauseButton from './components/PlayPause/PlayPauseButton';
import SpeedChanger from './components/SpeedChanger/SpeedChanger';
import Title from './components/Title/Title';
import LoadSound from './components/SoundLoader/LoadSound'

export default function App(): JSX.Element {

  // State for the song currently being played. Used by all child components of the app. 
  const [sound, setSound] = useState<Audio.Sound>();
  const [source, setSource] = useState<AVPlaybackSourceObject>();


  // Runs once when app opens. Allow sound to play even if the phone is on silent.  
  useEffect(() => {
    const setAudioConfig = async() => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    }
    setAudioConfig()
      .catch(console.error);
  }, [])

  return (
    <View style={styles.container}>
      <Text>AFX Dance Music App</Text>
      <StatusBar style="auto" />
      <LoadSoundButton setSound={setSound} setSource={setSource} sound={sound}/>
      <PlayPauseButton sound={sound}/>
      <Scrubber sound={sound}/>
      <Title source={source}/>
      <SpeedChanger sound={sound}/>
    </View>
  );
}
