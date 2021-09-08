import React, {useState} from 'react'
import { View, StyleSheet, Text, Alert, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../core/theme'
import { format} from 'date-fns';
import Background from '../components/Background'
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import api from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-picker/picker';

export default function DatasheetsScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [height, setHeight] = useState({ value: '', error: '' }) 
  const [altura, setAltura] = useState({ value: '', error: '' }) 
  const [idload, setIdload] = useState()
  const [selectedGoal, setSelectedGoal] = useState(1);
  const [selectedSexo, setSelectedSexo] = useState(1);


  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  async function getId(){
    const id = await AsyncStorage.getItem('@nulifit:user');
    setIdload(id);
  }

  getId();

  const onPressed = () => {
    api.post("datasheets",{
      height: height.value,
      weight: altura.value,
      birthDate: date,
      sex: selectedSexo,
      goal: selectedGoal,
      userId: idload,
    })
      .then((response) => {
        console.log(response)
        Alert.alert(
          `Bem vindo ` +  '!'
        );
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })
      .catch((err) => {
          Alert.alert(
            'Erro ao salvar 🥴',
            'Preencha todos os campos, tente novamente.',
          );
          console.error("ops! ocorreu um erro" + err);
      });
  }

  return (
    <Background >
        <View style={styles.date}>
          <Text style={styles.alertLabel}>
            Qual a sua data de nascimento?
          </Text> 
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChangeDate}
            />
          )}
          <TouchableOpacity 
              style={styles.dateTimePickerButton}
              onPress={showDatepicker}
          >
              <Text style={styles.dateTimePickerText}>
                {`Mudar  ${format(date, 'dd')}`+
                ` - ` + `${format(date, 'MM')}`+
                ` - ` + `${format(date, 'Y')}`}
              </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.alertLabel}>
              Qual o seu sexo?
          </Text>
          <Picker
            selectedValue={selectedSexo}
            onValueChange={(itemValue) =>
              setSelectedSexo(itemValue)
            }>
            <Picker.Item label="Masculino" value="1" />
            <Picker.Item label="Feminino" value="2" />
          </Picker>
        </View>
        <View>
          <Text style={styles.alertLabel}>
              Qual o seu peso?
          </Text>
          <TextInput
            style={styles.field}
            label="Peso"
            returnKeyType="next"
            onChangeText={(text) => setHeight({ value: text, error: '' })}
            value={height.value}
          />
        </View>
        <View>
          <Text style={styles.alertLabel}>
              Qual a sua altura?
          </Text>
          <TextInput
            style={styles.field}
            label="Altura"
            returnKeyType="next"
            onChangeText={(text) => setAltura({ value: text, error: '' })}
            value={altura.value}
          />
        </View>
        <View>
          <Text style={styles.alertLabel}>
             Qual seu objetivo?
          </Text>
          <Picker
            selectedValue={selectedGoal}
            onValueChange={(itemValue) =>
              setSelectedGoal(itemValue)
            }>
            <Picker.Item label="Manter peso" value="1" />
            <Picker.Item label="Ganhar Peso" value="2" />
            <Picker.Item label="Emagrecer" value="3" />
          </Picker>
        
        </View>
        <Button 
          mode="contained" 
          onPress={onPressed}>
          Confirmar
        </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  date: {
    alignItems: 'center',
  },
  alertLabel:{
    textAlign: 'center',
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 20,
  },
  dateTimePickerButton:{
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingBottom: 20,
  },
  dateTimePickerText:{
    textAlign: 'center',
    fontSize: 21,
  },
  field: {
    paddingBottom: 5,
    width: 200,
  }
})