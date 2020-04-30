// Import libraries
import React from 'react';
import {Text, View} from 'react-native';

// Create component
const Header = props => {
  const {textStyle, viewStyle} = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
  },
};

// Make component available
export {Header};
