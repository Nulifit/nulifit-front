import React from 'react'
import { View, Text, StyleSheet, Dimensions } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

const CardMenu = ({ item, index }) => {
  
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.grafico}> 0% </Text>
      <View style={styles.body}>
        <View style={styles.text}>
          <Text>Consumidas</Text>
          <Text style={styles.un}>0 {item.un}</Text>
        </View>
        <View style={styles.text}>
          <Text>Consumir</Text>
          <Text style={styles.value}>{item.value}</Text>
          <Text>{item.un}</Text>
        </View>
        <View style={styles.text}>
          <Text>Exercícios</Text>
          <Text style={styles.un2}>0 {item.un}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    alignItems: 'center',
    height: 250,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 20,
    paddingTop: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  header: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    alignItems: 'center',
    margin: 25
  },
  un:{
    color: 'green'
  },
  un2: {
    color: 'red'
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
  grafico:{
    marginTop: 20,
    backgroundColor: '#fffafa',
    borderWidth: 0.5,
    width: 250,
    borderRadius: 5
  }
})

export default CardMenu