/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import Counter from './app/feature/counter/Counter';
import {store} from './app/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <View>
          <Text>+==================+</Text>
          <Counter />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
