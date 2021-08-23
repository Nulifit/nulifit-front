import React, {useState} from 'react'
import { View, Switch, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker , {Event} from '@react-native-community/datetimepicker';
import { theme } from '../core/theme'
import { format, isBefore } from 'date-fns';
import Background from '../components/Background'
import TextInput from '../components/TextInput';
import { background } from 'jimp';
import { FONT_SANS_10_BLACK } from 'jimp';


export default function DatasheetsScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [peso, setPeso] = useState({ value: '', error: '' }) 
  const [altura, setAltura] = useState({ value: '', error: '' }) 

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

  return (
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
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
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
            onChangeText={(text) => setPeso({ value: text, error: '' })}
            value={peso.value}
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
        

      </View>

    </Background>
  )
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
  },
  date: {
    alignItems: 'center',
  },
  // input: {
  //   backgroundColor: theme.colors.surface,
  // },
  // description: {
  //   fontSize: 13,
  //   color: theme.colors.secondary,
  //   paddingTop: 8,
  // },
  // error: {
  //   fontSize: 13,
  //   color: theme.colors.error,
  //   paddingTop: 8,
  // },
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
  },
  snp: {
  }
})