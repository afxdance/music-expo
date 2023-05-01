import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { styles } from './styles';

import { useState, useEffect } from 'react';
import { Audio, AVPlaybackSourceObject } from 'expo-av';

import Scrubber from './components/Scrubber/Scrubber';
import LoadSoundButton from './components/SoundLoader/LoadSound';
import PlayPauseButton from './components/PlayPause/PlayPauseButton';
import Title from './components/Title/Title';
import LoopButton from './components/Loop/LoopButton/LoopButton';
import LoopFunc from './components/Loop/LoopFunc/LoopFunc';

export default function App(): JSX.Element {

  // State for the song currently being played. Used by all child components of the app. 
  const [sound, setSound] = useState<Audio.Sound>();
  const [source, setSource] = useState<AVPlaybackSourceObject>();
  const [loop, setLoop] = useState<number[]>([-1,-1]);

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

  const unloadSound = async() => {
    console.log('Unload sound')
    if (sound != null) {
      await sound.unloadAsync().catch(console.error);
      setSound(null);
      setSource(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text>AFX Dance Music App</Text>
      <StatusBar style="auto" />
      <LoadSoundButton setSound={setSound} setSource={setSource} unloadSound={unloadSound}/>
      <PlayPauseButton sound={sound}/>
      <Button title="Unload" onPress={unloadSound}/>
      <Scrubber sound={sound} loop={loop}/>
      <Title source={source}/>
      <LoopButton sound={sound} setLoop={setLoop}/>
      <LoopFunc sound={sound} loop={loop}/>
      <Text>Current loop: {loop[0]/1000}-{loop[1]/1000}</Text>
    </View>
  );
}
