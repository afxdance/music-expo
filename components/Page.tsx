import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';

import React, { useState, useEffect } from 'react';
import { Audio, AVPlaybackSourceObject } from 'expo-av';
import PagerView from 'react-native-pager-view';
import { StyleSheet } from 'react-native';

import Scrubber from './Scrubber/Scrubber';
import LoadSoundButton from './SoundLoader/LoadSound';
import PlayPauseButton from './PlayPause/PlayPauseButton';
import SpeedChanger from './SpeedChanger/SpeedChanger';
import Title from './Title/Title';
import LoadSound from './SoundLoader/LoadSound'

export default function Page(): JSX.Element {

    // State for the song currently being played. Used by all child components of the app. 
    const [sound, setSound] = useState<Audio.Sound>();
    const [source, setSource] = useState<AVPlaybackSourceObject>();


    // Runs once when app opens. Allow sound to play even if the phone is on silent.  
    useEffect(() => {
        const setAudioConfig = async () => {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
            });
        }
        setAudioConfig()
            .catch(console.error);
    }, [])

    const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            },
        }
    );

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
