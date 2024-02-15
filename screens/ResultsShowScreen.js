import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import yelp from '../api/yelp';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ResultsShowScreen({route}) {

    const [result, setResult] = useState(null);

    const id = route.params.id;

    const getResult = async(id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    }

    useEffect(() => {
      getResult(id);
    }, []);
    if( !result ) {
        return null;
    }
    
    return (
        <View>
          <Text style={styles.title}>{result.name}</Text>
          <Text style={styles.phone}>Telefon: {result.phone}</Text>
          <View style={styles.iconContainer}>
            {result.is_closed ? (
              <>
                <Text style={styles.iconText}>Kapalı</Text>
                <FontAwesome5 name="door-closed" size={25} color="black" />
              </>
            ) : (
              <>
                <Text style={styles.iconText}>Açık</Text>                
                <FontAwesome5 name="door-open" size={25} color="black" />
              </>
            )}
          </View>
          <FlatList
                data={ result.photos }
                renderItem={({ item }) => {
                    return <Image
                        style={ styles.img }
                        source={{ uri: item }}
                        />
                }}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    img: {
        height: 180,
        margin: 10,
        borderRadius: 15,
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        marginVertical: 5
    },
    phone: {
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 5
    },
    iconContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        padding: 5
    }
})