import * as React from 'react';
import {Image} from 'react-native'

import { COLORS } from '../vocabs';

function LogoTitle() {
  return (
    <Image
      style={{
        backgroundColor: COLORS.primary,
        resizeMode: 'contain',
        height: 35,
      }}
      source={require('../assets/rithm-school.png')}
    />
  );
}

export default LogoTitle;