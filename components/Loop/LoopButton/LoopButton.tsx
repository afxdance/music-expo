import { useState, useEffect } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Button, View } from 'react-native';
import { LoopInterval } from '../../../types';

type LoopButtonProps = {
  setLoop: any;
  sound: Audio.Sound;
};

const LoopButton = (props: LoopButtonProps) => {

  const getTimestamp = async() => {
    const status: AVPlaybackStatus = await props.sound.getStatusAsync();
    if (status.isLoaded) {
      return status.positionMillis;
    } else {
      return -1;
    }
  }

  const setStart = () => {
    getTimestamp().then((start: number) => {
      props.setLoop((prevLoop: LoopInterval) => {
        const newLoop = [start, prevLoop[1]]
        return newLoop;
        }
      );
    }).catch(console.error);
  }

  const setEnd = () => {
    getTimestamp().then((end: number) => {
      props.setLoop((prevLoop: LoopInterval) => {
        const newLoop = [prevLoop[0], end]
        return newLoop;
        }
      );
    }).catch(console.error);
  }

  const clearLoop = () => {
    props.setLoop([-1,-1]);
  }

  return (
    <View>
      <Button title="Set loop start" onPress={setStart}/> 
      <Button title="Set loop end"   onPress={setEnd}/> 
      <Button title="Clear loop"     onPress={clearLoop}/>
    </View>
  );


}

export default LoopButton;