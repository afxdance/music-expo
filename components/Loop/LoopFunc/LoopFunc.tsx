import { useState, useEffect } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Button, View } from 'react-native';

type LoopFuncProps = {
  sound: Audio.Sound;
  loop: any;
};

const LoopFunc = (props: LoopFuncProps) => {

  const getTimestamp = async() => {
    const status: AVPlaybackStatus = await props.sound.getStatusAsync();
    if (status.isLoaded) {
      return status.positionMillis;
    } else {
      return -1;
    }
  }

  useEffect(() => {
    console.log('Reload scrubber')
    
    // Run updateSlider() every 100 milleseconds. 
    const interval = setInterval(() => processLoop(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [props.loop, props.sound]);

  const processLoop = async() => {
    if (props.loop[0] > 0 && props.loop[1] > 0 && props.loop[1] > props.loop[0]) {
      if (props.sound instanceof Audio.Sound) {
        const currPosition = await getTimestamp();
        if (currPosition != -1) {
          if (currPosition <= props.loop[0] || currPosition >= props.loop[1]) {
            await props.sound.setPositionAsync(props.loop[0]);
          }
        }
      }
    }
  }

  return null;
}

export default LoopFunc;