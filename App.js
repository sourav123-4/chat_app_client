import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store'
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App