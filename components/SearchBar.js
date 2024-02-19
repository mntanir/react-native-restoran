import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function SearchBar({ onTermChange, onTermSubmit, term, onSelectItem }) {

  const [heightAnim] = useState(new Animated.Value(0)); // Yeni bir Animated.Value tanımladık

  const [showList, setShowList] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleList = () => {
      const toValue = showList ? 0 : 270;
      setShowList(!showList);
      Animated.timing(
        heightAnim,
        {
          toValue,
          duration: 250,
          useNativeDriver: false,
        }
      ).start(() => {
        heightAnim.setValue(toValue);
      });
  };
  
  const renderList = () => {
    if (showList) {
      return (
        <Animated.View style={[styles.listContainer, { height: heightAnim }]}>
          <TouchableOpacity onPress={() => handleSelectItem('Döner')} style={[styles.listItem, selectedItem === 'Döner' && styles.selectedItem]}>
          <Text style={selectedItem === 'Döner' ? styles.selectedItemText : styles.listItemText}>Döner</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectItem('Kebap')} style={[styles.listItem, selectedItem === 'Kebap' && styles.selectedItem]}>
          <Text style={selectedItem === 'Kebap' ? styles.selectedItemText : styles.listItemText}>Kebap</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectItem('Çorba')} style={[styles.listItem, selectedItem === 'Çorba' && styles.selectedItem]}>
          <Text style={selectedItem === 'Çorba' ? styles.selectedItemText : styles.listItemText}>Çorba</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectItem('Tatlı')} style={[styles.listItem, selectedItem === 'Tatlı' && styles.selectedItem]}>
          <Text style={selectedItem === 'Tatlı' ? styles.selectedItemText : styles.listItemText}>Tatlı</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.listItem } onPress={() => handleSelectItem('')}>
          <Text style={ [styles.listItemText, styles.bordered] }>Seçimi İptal Et  <AntDesign name="closecircleo" size={14} color="red" /></Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }
    return null;
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    onSelectItem(item);
    setShowList(false);
  };

  return (
    <View>
      <View style={styles.backgroundStyle}>
        <AntDesign
          style={styles.iconStyle}
          name="search1"
          size={30}
          color="black"
        />
        <TextInput
          style={styles.inputStyle}
          placeholder='Ara'
          autoCorrect={false}
          autoCapitalize='none'
          value={term}
          onChangeText={onTermChange}
          onFocus={() => setShowList(false)}
          onEndEditing={onTermSubmit}
        />
        <TouchableOpacity onPress={handleToggleList}>
          <AntDesign
            style={styles.iconStyle}
            name={showList ? "upcircle" : "filter"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {renderList()}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    margin: 10,
    height: 50,
    alignItems: 'center',
    borderRadius: 20
  },
  iconStyle: {
    marginHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  },
  listContainer: {
    backgroundColor: 'white',
    margin: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  listItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    margin: 10,
    borderRadius: 10,
  },
  selectedItemText: {
    color: 'white',
    fontWeight: 'bold'
  },
  listItemText: {
    color: 'black',
  },
  selectedItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#7fd394',
  },
  bordered: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
