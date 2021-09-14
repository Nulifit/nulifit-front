import React from 'react'
import { View, StyleSheet} from "react-native"
import HeaderMenu from '../components/HeaderMenu'
import Button from '../components/Button'
import Carousel from 'react-native-snap-carousel';
import CardMenu, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/CardMenu'

import { theme } from '../core/theme'

import data from '../services/dataTemp';

export default function Dashboard({ navigation }) {
  const isCarousel = React.useRef(null);

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