import React from 'react'
import { View, Text, StyleSheet, Dimensions } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CardMenu = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    height: 250,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 20
    },
    value: {
        width: 50,
        height: 50,
        padding: 20,
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingLeft: 20,
        paddingRight: 20
    }
})

export default CardMenu