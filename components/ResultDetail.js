import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import React from 'react'

export default function ResultDetail({ result }) {
  return (
    <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
    >
        <Text style={styles.heading}>{result.name}</Text>
        <Image
            style={styles.image}
            source={result.image_url ? {uri:result.image_url} : null}
        />
        <Text style={styles.name}>{result.rating} Yıldızlı Restoran, {result.review_count} Değerlendirme</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    image: {
        width: 250,
        height: 120,
        borderRadius: 10,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold'
    },
    heading: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginBottom: 5
    }
})