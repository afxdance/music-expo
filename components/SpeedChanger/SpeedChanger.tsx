import { Audio, AVPlaybackStatus } from 'expo-av';
import { useState } from 'react';
import { Button, View } from 'react-native';
import { styles } from './styles';

type SpeedChangerProps = {
    sound: Audio.Sound;
};

const SpeedChanger = (props: SpeedChangerProps) => {
    const setSpeed = async (rate: number) => {
        console.log('set speed');
        props.sound.setRateAsync(rate, true)
    }

    const setSpeedTo05 = () => {
        setSpeed(0.5);
    }

    const setSpeedTo1 = () => {
        setSpeed(1.0);
    }

    const setSpeedTo15 = () => {
        setSpeed(1.5);
    }

    return (
        <View style={styles.container}>
            <Button
                title={'0.5x'}
                onPress={setSpeedTo05}
            />
            <Button
                title={'1.0x'}
                onPress={setSpeedTo1}
            />
            <Button
                title={'1.5x'}
                onPress={setSpeedTo15}
            /> 
        </View>
    )

}

export default SpeedChanger;

