import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { useState, useEffect } from 'react';
import { Audio, AVPlaybackSourceObject, AVPlaybackStatus } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

import Slider from '@react-native-community/slider';

export default function App() {

  const [sound, setSound] = useState<Audio.Sound>();
  const [sliderValue, setSliderValue] = useState<number>(0);

  // Runs once when app opens. 
  useEffect(() => {
    const setAudioConfig = async() => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    }
    setAudioConfig()
      .catch(console.error);
  }, [])

  // Update the slider. 
  useEffect(() => {
    const interval = setInterval(() => updateSlider(), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);


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
    setSound(sound);
  }

  const playSound = async() => {
    console.log('play')
    console.log(sound)
    await sound.playAsync().catch(console.error);
  }

  const pauseSound = async() => {
    await sound.pauseAsync().catch(console.error);
  }

  const unloadSound = async() => {
    console.log(sound);
    await sound.unloadAsync().catch(console.error);
    console.log(sound);
  }

  const updateSlider = async() => {
    const status: AVPlaybackStatus = await sound.getStatusAsync();
    console.log(status)
    if (status.isLoaded) {
      setSliderValue(status.positionMillis / status.durationMillis);
    } 
  }

  return (
    <View style={styles.container}>
      <Text>AFX Dance Music App</Text>
      <StatusBar style="auto" />
      <Button title="Load" onPress={loadSound}/>
      <Button title="Play" onPress={playSound}/>
      <Button title="Pause" onPress={pauseSound}/>
      <Button title="Unload" onPress={unloadSound}/>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
