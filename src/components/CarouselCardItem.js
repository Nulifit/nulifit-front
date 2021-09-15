import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.resumo}> Resumo </Text>
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.value}>Meta: {item.value} {item.un}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  resumo:{
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10
  },
  value: {
    width: ITEM_WIDTH,
    height: 300,
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
  },
})

export default CarouselCardItem