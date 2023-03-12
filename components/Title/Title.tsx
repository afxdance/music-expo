import { useState, useEffect } from 'react';
import { Audio, AVPlaybackSourceObject, AVPlaybackStatus } from 'expo-av';
import { Button, View, Text } from 'react-native';

type TitleProps = {
 source: AVPlaybackSourceObject
};

const Title = (props: TitleProps) => {
  const [name, setName] = useState<string>('');

  const getFilename = (path: string) => {
    return path.split('\\').pop().split('/').pop();
  }

  useEffect(() => {
    if (props.source != null) {
      const uri: string = props.source.uri; 
      setName(getFilename(uri));
    } else {
        setName('');
    }
  }, [props.source]);

  return (
    <View>
        <Text>{name}</Text>
    </View>
  )
}

export default Title;