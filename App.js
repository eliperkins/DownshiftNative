/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Downshift from 'downshift/dist';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const BasicAutocomplete = ({items, onChange}) => (
  <Downshift
    render={({
      getButtonProps,
      getRootProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      selectedItem,
      highlightedIndex,
    }) =>(
      <View {...getRootProps(undefined, { suppressRefError: true })}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            {...getInputProps({ placeholder: 'Favorite color ?' })}
          />
          <Button {...getButtonProps()} title={isOpen ? 'Close' : 'Open' } />
        </View>
        {isOpen ? (
          <View style={{ borderWidth: 1, borderColor: '#ccc' }}>
            {items
              .filter(
                i =>
                  !inputValue ||
                  i.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .map((item, index) => {
                const props = getItemProps({ item, index });
                return (
                  <TouchableOpacity
                    {...props}
                    key={item}
                  >
                    <View
                      style={{ backgroundColor: highlightedIndex === index ? 'gray' : 'white' }}
                    >
                      <Text style={{ fontWeight: selectedItem === item ? 'bold' : 'normal' }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        ) : null}
      </View>
    )}
  />
);

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <BasicAutocomplete
          items={['apple', 'orange', 'carrot']}
          onChange={selectedItem => console.log(selectedItem)}
          onSelect={selectedItem => console.log(selectedItem)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
