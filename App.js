/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Downshift from 'downshift/dist/downshift.esm';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const MyView = ({ innerRef, ...rest }) => <View ref={innerRef} {...rest} />;

const BasicAutocomplete = ({items, onChange}) => (
  <Downshift
    environment={{
      addEventListener: () => {},
      removeEventListener: () => {},
      document: {
        getElementById: () => {},
      },
    }}
    render={({
      getRootProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      selectedItem,
      highlightedIndex,
    }) =>(
      <MyView {...getRootProps({ refKey: 'innerRef' })}>
        <TextInput
          {...getInputProps({ placeholder: 'Favorite color ?' })}
        />
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
      </MyView>
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
