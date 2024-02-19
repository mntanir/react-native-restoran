import { StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function ResultDetail({ result }) {
  return (
    <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
    >
        <View style={ styles.box }>
            <Image
                style={styles.image}
                source={result.image_url ? {uri:result.image_url} : null}
            />
            <View style={ styles.info }>
                <Text numberOfLines={1} style={styles.heading}>{result.name}</Text>
                <Text style={[styles.name, styles.star]}>{result.rating} <AntDesign name="star" size={15} color="green" /></Text>
                <Text style={[styles.name, styles.review]}>{result.review_count} Değerlendirme</Text>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    image: {
        width: 270,
        height: 120,
        marginBottom: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxHeight: 120,
        maxWidth: 270
    },
    name: {
        fontWeight: '500'
    },
    heading: {
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 5,
        marginLeft: 5,
        maxWidth: 200
    },
    box: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#0002',
        borderRadius: 10
    },
    star: {
        position: 'absolute',
        top: 0,
        right: 5
    },
    review: {
        marginLeft: 5,
        marginBottom: 5
    }
})