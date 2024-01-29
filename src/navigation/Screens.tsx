import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../index';
import MyTabs from './MyTabs';

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'Action'} component={MyTabs} />
    </Stack.Navigator>
  );
};

export default Screens;
