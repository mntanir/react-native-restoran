import React, { useState, useEffect } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import yelp from '../api/yelp';

export default function ResultsShowScreen({ route }) {
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const id = route.params.id;

  const getResult = async(id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);
  if( !result ) {
      return null;
  }

  const handleImagePress = (item) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  if (!result) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={ styles.top }>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.phone}>Telefon: {result.phone}</Text>
      <View style={styles.iconContainer}>
        {result.is_closed ? (
          <>
          <View style={ styles.ifopen }>
            <Text style={[styles.iconText, {color:'red'}]}>Kapalı</Text>
            <FontAwesome5 name="door-closed" size={25} color="black" />
          </View>
          </>
        ) : (
          <>
            <View style={ styles.ifopen }>
            <Text style={[styles.iconText, {color:'green'}]}>Açık</Text>
            <FontAwesome5 name="door-open" size={25} color="green" />
            </View>
          </>
        )}
      </View>
      </View>
      <Text style={styles.imgtext}>Görseller</Text>
      <FlatList
        horizontal
        data={result.photos}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image style={styles.img} source={{ uri: item }} />
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
          <Image style={styles.modalImage} source={{ uri: selectedImage }} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 350,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 5,
    backgroundColor: '#0001',
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontWeight: 'bold'
  },
  phone: {
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 15
  },
  iconContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '5px',
  },
  iconText: {
    padding: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  imgtext: {
    marginVertical: 15,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 5
  },
  top: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  ifopen: {
    margin: 10,
    flexDirection: 'row'
  }
});
