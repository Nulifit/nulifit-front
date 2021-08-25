import React, {useState, useEffect} from 'react'
import { View, Switch, StyleSheet, Text, Alert, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker , {Event} from '@react-native-community/datetimepicker';
import { theme } from '../core/theme'
import { format, isBefore } from 'date-fns';
import Background from '../components/Background'
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import api from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function DatasheetsScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(1);
  const [height, setHeight] = useState({ value: '', error: '' }) 
  const [altura, setAltura] = useState({ value: '', error: '' }) 
  const [sex, setSex] = useState()
  const [idload, setIdload] = useState()

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
    console.log(isEnabled)
    if(isEnabled == true){
      setIsEnabled(2)
    }else{
      setIsEnabled(1)
    }

    console.log('Aqui oi:' + idload, 
    height.value, 
    altura.value,
    date,
    sex,)

    api.post("datasheets",{
      height: height.value,
      weight: altura.value,
      birthDate: date,
      sex: isEnabled,
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Background>
          <View style={styles.form}>
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
              <Text style={styles.sexo}>
                🧔
                <Switch
                  style={styles.snp}
                  trackColor={{ false: "#007bff", true: "#fc4cee" }}
                  thumbColor={isEnabled ? "#f4f3f3" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                👩
              </Text>
            </View>
            <View>
              <Text style={styles.alertLabel}>
                  Qual o seu peso?
              </Text>
              <TextInput
                style={styles.button}
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
                style={styles.button}
                label="Altura"
                returnKeyType="next"
                onChangeText={(text) => setAltura({ value: text, error: '' })}
                value={altura.value}
              />
            </View>
            <Button mode="contained" onPress={onPressed}>
              Confirmar
            </Button>
          </View>
        </Background>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
  },
  date: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  alertLabel:{
    textAlign: 'center',
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  dateTimePickerButton:{
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingBottom: 40,
  },
  dateTimePickerText:{
    textAlign: 'center',
    fontSize: 21,
  },
  button: {
    paddingBottom: 40,
    width: 200,
  },
  sexo: {
    paddingBottom: 40,
    alignSelf: 'center',
  }
})