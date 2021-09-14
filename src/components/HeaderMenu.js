import React, {useState} from 'react'
import { View, Text, StyleSheet, Image } from "react-native"
import { theme } from '../core/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userImg from '../../assets/Akeu.png';

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export default function HeaderMenu() {
  const [nameload, setNameload] = useState()

  async function getName(){
    const name = await AsyncStorage.getItem('@nulifit:name');
    setNameload(name);
  }

  getName();

  return (
      <View  style={styles.header}>
        <View>
          <Text style={styles.title}>
            Bem vindo!
          </Text>
          <Text style={styles.subtitle}>
            {nameload}
          </Text>
        </View>
        <Image source={userImg} style={styles.image}/>
      </View> 
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  title: {
    fontSize: 32,
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.primary,
    fontSize: 32,
    lineHeight: 40
  },
  image:{
    width: 70,
    height: 70,
    borderRadius: 40
  },
})