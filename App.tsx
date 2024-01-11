import * as React from 'react';
import * as RN from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Screens from './src/navigation/Screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
