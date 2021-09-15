import React, {useState} from "react";
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'

import BackButton from '../components/BackButton'
import Background from '../components/Background'
import {Picker} from '@react-native-picker/picker';
import TitlePage from "../components/TitlePage";
import {theme} from "../core/theme"
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Carousel from 'react-native-snap-carousel';
import data from '../services/dataTemp';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/CarouselCardItem'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function MacronutrienteScreen({ navigation}) {
    const [selectedTime, setSelectedTime] = useState(1);
    const isCarousel = React.useRef(null);
    const [idload, setIdload] = useState()

    async function getId(){
        const id = await AsyncStorage.getItem('@nulifit:user');
        setIdload(id);
      }
    
      getId();
    
      const onPressed = () => {
        api.get("macronutrientes",{
          userId: idload,
        })
        .then((response) => {
          console.log(response)
          // return response;
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
        <Background>
                <BackButton goBack={navigation.goBack} />
                <TitlePage>Rélatorio</TitlePage>
                <View style={styles.bar}>
                    <View style={styles.time}>
                        <Picker 
                            style={styles.itemTime}
                            mode={'dropdown'}
                            selectedValue={selectedTime}
                            onValueChange={(itemValue) =>
                            setSelectedTime(itemValue)}>
                            <Picker.Item label="Por Dia" value="1" />
                            <Picker.Item label="Período" value="2" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.carouselHeder}>
                    <Carousel 
                        layout="stack"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={data}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        useScrollView={true}
                    />
                </View>      
        </Background>
    )
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        right: 3,
    },
    time : {
        width: 135,
        height:30,
        color: theme.colors.primary,
        fontWeight: 'bold',
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        paddingLeft: 15,
    },
    itemTime: {
        color: '#fff',
        flex: 1,
    },
    day : {
        backgroundColor: '#E5E4E2'
    },
    carouselHeder: {
        marginTop: 170,
    },
    carousel:{
        paddingVertical: 100
    }
});
