import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { styles } from './styles';

import React, { useState, useEffect } from 'react';
import { Audio, AVPlaybackSourceObject } from 'expo-av';
import PagerView from 'react-native-pager-view';
import { StyleSheet } from 'react-native';

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

  const unloadSound = async() => {
    console.log('Unload sound')
    if (sound != null) {
      await sound.unloadAsync().catch(console.error);
      setSound(null);
      setSource(null);
    }
  }

  const page_styles = StyleSheet.create({
    viewPager: {
      flex: 1,
    },
    page: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    // <View style={styles.container}>
    //   <Text>AFX Dance Music App</Text>
    //   <StatusBar style="auto" />
    //   <LoadSoundButton setSound={setSound} setSource={setSource} sound={sound}/>
    //   <PlayPauseButton sound={sound}/>
    //   <Scrubber sound={sound}/>
    //   <Title source={source}/>
    //   <SpeedChanger sound={sound}/>
    // </View>

    <View style={{ flex: 1 }}>
      <PagerView style={page_styles.viewPager} initialPage={0}>
        <View style={page_styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={page_styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={page_styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
}
