import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, View} from 'react-native';

function SearchInput({placeholder, setLocation}) {
  const [inputValue, setInputValue] = useState('');

  const onSubmitEditing = () => {
    if (!inputValue) return;

    setLocation(inputValue);
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        clearButtonMode="always"
        value={inputValue}
        onChangeText={newValue => setInputValue(newValue)}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  setLocation: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  placeholder: 'lox',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    height: 40,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: '#fff',
  },
});

export default SearchInput;
