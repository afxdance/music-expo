import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus } from 'expo-av';

type ScrubberProps = {
  sound: Audio.Sound;
};

const Scrubber = (props: ScrubberProps) => {

  const [sliderValue, setSliderValue] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0); 

  // Update the song duration whenever there is a new sound. 
  useEffect(() => {
    const setDurationAsync = async() => {
      if (props.sound != null) {
        const status: AVPlaybackStatus = await props.sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis);
        } else {
          setDuration(0);
        }
      }
    }
    setDurationAsync()
      .catch(console.error);
  }, [props.sound]);

  useEffect(() => {
    console.log('Reload scrubber')
    
    // Run updateSlider() every 100 milleseconds. 
    const interval = setInterval(() => updateSlider(), 100);
    return () => {
      clearInterval(interval);
    };
  }, [duration, props.sound]);

  // Update the position of the slider by calling setSliderValue()
  const updateSlider = async() => {
    if (props.sound != null && duration > 0) {
      const status: AVPlaybackStatus = await props.sound.getStatusAsync();
      if (status.isLoaded) {
        setSliderValue(status.positionMillis / duration);
      } 
    } else {
      setSliderValue(0);
    }
  }

  // Set the song to start playing from the slider position. 
  const setSoundPosition = async(value: number) => {
    console.log('set position');
    if (props.sound instanceof Audio.Sound) {
      await props.sound.playFromPositionAsync(value * duration)
    }
  }

  return (
    <Slider
      style={{width: 300, height: 40}}
      minimumValue={0}
      maximumValue={1}
      value={sliderValue}
      onSlidingComplete={(value: number) => setSoundPosition(value)}
    />
  );
}

export default Scrubber;