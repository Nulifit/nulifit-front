import React, {useState} from 'react'
import { View, StyleSheet, Alert} from "react-native"
import HeaderMenu from '../components/HeaderMenu'
import Button from '../components/Button'
import Carousel from 'react-native-snap-carousel';
import CardMenu, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/CardMenu'

import { theme } from '../core/theme'

import api from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage'
import data from '../services/dataTemp';

export default function Dashboard({ navigation }) {
  const isCarousel = React.useRef(null);
  const [idload, setIdload] = useState();
  const [dataApi, setDataApi] = useState();

  async function getId(){
    const id = await AsyncStorage.getItem('@nulifit:user');
    setIdload(id);
  }

  getId();

  const onPressed = () => {
    api.get("macronutrients",{
      userId: idload,
    })
    .then((response) => {
      console.log(Object.values(response.data));
      setDataApi(Object.values(response.data));
    })
    .catch((err) => {
        Alert.alert(
          'Erro ao buscar dados 🥴',
          'Saia e tente novamente',
        );
        console.error("ops! ocorreu um erro inesperado" + err);
    });
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderMenu/>
      </View>
      <View style={styles.carouselHeder}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CardMenu}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </View>
      <Button
        onPress={onPressed}
      >
        Gere 
      </Button>  
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate(
            'MacronutrienteScreen'
          )
        }
      >
        Rélatorio
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: theme.colors.surface,
    flex: 1,
  },
  header: {
    paddingHorizontal: 30
  },
  carouselHeder: {
  }
});  