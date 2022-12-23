import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { style } from './style';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Props = {
  name: string;
  onRemove: () => void;
  onDone: () => void;
};

export function Task({ name, onRemove, onDone }: Props) {
  const [isChecked] = useState(false);
  
  return (
    <View style={style.containerTask}>
      <BouncyCheckbox
        style={style.checkbox}
        text={name}
        textStyle={style.textTask}
        onPress={onDone}
        fillColor='#4EA8DE'
      />
      <TouchableOpacity onPress={onRemove}>
        <Image source={require('../../assets/trash.png')} />
      </TouchableOpacity>
    </View>
  );
}