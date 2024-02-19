import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function SearchBar({ onTermChange, onTermSubmit, term, onSelectItem }) {
  const [showList, setShowList] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const renderList = () => {
    if (showList) {
      return (
        <View style={styles.listContainer}>
          <TouchableOpacity onPress={() => handleSelectItem('Döner')} style={[styles.listItem, selectedItem === 'Döner' && styles.selectedItem]}>
          <Text style={selectedItem === 'Döner' ? styles.selectedItemText : styles.listItemText}>Döner</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectItem('Kebap')} style={[styles.listItem, selectedItem === 'Kebap' && styles.selectedItem]}>
          <Text style={selectedItem === 'Kebap' ? styles.selectedItemText : styles.listItemText}>Kebap</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectItem('Pide')} style={[styles.listItem, selectedItem === 'Pide' && styles.selectedItem]}>
          <Text style={selectedItem === 'Pide' ? styles.selectedItemText : styles.listItemText}>Pide</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectItem('Tatlı')} style={[styles.listItem, selectedItem === 'Tatlı' && styles.selectedItem]}>
          <Text style={selectedItem === 'Tatlı' ? styles.selectedItemText : styles.listItemText}>Tatlı</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.listItem } onPress={() => handleSelectItem('')}>
          <Text style={ [styles.listItemText, styles.bordered] }>Seçimi İptal Et  <AntDesign name="closecircleo" size={14} color="red" /></Text>
          </TouchableOpacity>
        </View>
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
          onFocus={() => setShowList(false)} // Arama çubuğuna tıklandığında liste gizlensin
          onEndEditing={onTermSubmit}
        />
        <TouchableOpacity onPress={() => setShowList(!showList)}>
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
    elevation: 5,
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
    backgroundColor: 'green',
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
