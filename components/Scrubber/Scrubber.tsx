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
      if (props.sound instanceof Audio.Sound) {
        const status: AVPlaybackStatus = await props.sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis);
        }
      }
    }
    setDurationAsync()
      .catch(console.error);
  }, [props.sound]);

  // Run updateSlider() every 100 milleseconds. 
  useEffect(() => {
    console.log('called');
    const interval = setInterval(() => updateSlider(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Run updateSlider() whenever there is a new song, or the duration of the song is updated.
  useEffect(() => {
    updateSlider();
  }, [props.sound, duration])

  // Update the position of the slider by calling setSliderValue()
  const updateSlider = async() => {
    if (props.sound !== undefined) {
      const status: AVPlaybackStatus = await props.sound.getStatusAsync();
      if (status.isLoaded && duration > 0) {
        console.log(status.positionMillis / duration);
        setSliderValue(status.positionMillis / duration);
      } 
    }
  }

  // Set the song to start playing from the slider position. 
  const setSoundPosition = async(value: number) => {
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