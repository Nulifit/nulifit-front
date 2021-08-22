import React, { useState } from 'react'
import { StyleSheet, Alert, ScrollView} from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { number } from '@jest/types/node_modules/@types/yargs'


export default function MeasuressScreen({ navigation }) {
  const [date, setDate] = useState({ value: '', error: '' })
  const [waist, setWaist] = useState({ value: '', error: '' })
  const [belly, setBelly] = useState({ value: '', error: '' })
  const [hip, setHip] = useState({ value: '', error: '' })
  const [breastplate, setBreastplate] = useState({ value: '', error: '' })
  const [shoulder, setShoulder] = useState({ value: '', error: '' })
  const [rightArm, setRightArm] = useState({ value: '', error: '' })
  const [leftArm, setLeftArm] = useState({ value: '', error: '' })
  const [rightForearm, setRightForearm] = useState({ value: '', error: '' })
  const [leftForearm, setLeftForearm] = useState({ value: '', error: '' })
  const [rightLeg, setRightLeg] = useState({ value: '', error: '' })
  const [leftLeg, setLeftLeg] = useState({ value: '', error: '' })
  const [rightCalf, setRightCalf] = useState({ value: '', error: '' })
  const [leftCalf, setLeftCalf] = useState({ value: '', error: '' })

  const onSavePressed = () => {
    const dateError = dateValidator(date.value)
    const waistError = waistValidator(waist.value)
    const bellyError = bellyValidator(belly.value)
    const hipError = hipValidator(hip.value)
    const breastplateError = breastplateValidator(breastplate.value)
    const shoulderError = shoulderValidator(shoulder.value)
    const rightArmError = rightArmValidator(rightArm.value)
    const leftArmError = leftArmValidator(leftArm.value)
    const rightForearmError = rightForearmValidator(rightForearm.value)
    const leftForearmError = leftForearmValidator(leftForearm.value)
    const rightLegError = rightLegValidator(rightLeg.value)
    const leftLegError = legftLegValidator(leftLeg.value)
    const rightCalfError = rightCalfValidator(rightCalf.value)
    const leftCalfError = leftCalfValidator(leftCalf.value)

    if (dateError || waistError || bellyError || hipError || breastplateError || shoulderError || rightArmError || leftArmError || rightForearmError || leftForearmError || rightLegError || leftLegError || rightCalfError || leftCalf) {
      setDate({ ...date, error: dateError })
      setWaist({ ...waist, error: waistError })
      serBelly({ ...belly, error: bellyError })
      setHip({ ...hip, error: hipError })
      setBreastplate({ ...breastplate, error: breastplateError })
      setShoulder({ ...shoulder, error: shoulderError })
      setRightArm({ ...rightArm, error: rightArmError })
      setLeftArm({ ...leftArm, error: leftArmError })
      setRightForearm({ ...rightForearm, error: rightForearmError })
      setLeftForearm({ ...leftForearm, error: leftForearmError })
      setRightLeg({ ...rightLeg, error: rightLegError })
      setLeftLeg({ ...leftLeg, error: leftLegError })
      setRightCalf({ ...rightCalf, error: rightCalfError })
      setLeftCalf({ ...leftCalf, error: leftCalfError })
      return
    }
    api.post("users", {
      date: date.value,
      waist: waist.value,
      belly: belly.value,
      hip: hip.value,
      breastplace: breastplate.value,
      shoulder: shoulder.value,
      rightArm: rightArm.value,
      leftArm: leftArm.value,
      rightForearm: rightForearm.value,
      leftForearm: leftForearm.value,
      rightLeg: rightLeg.value,
      leftLeg: leftLeg.value,
      rightCalf: rightCalf.value,
      leftCalf: leftCalf.value
    })
      .then((response) => {
        console.log(response.data);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })
      .catch((err) => {
        Alert.alert(
          'Erro no cadastro 🥴',
          'Ocorreu um erro ao fazer cadastro, tente novamente.',
        );
        console.error("ops! ocorreu um erro" + err);
      });
  }


  return (
    <ScrollView>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Header>Medidas</Header>
        <TextInput
          label="Data"
          returnKeyType="next"
          value={date.value}
          onChangeText={(text) => setDate({ value: text, error: '' })}
          error={!!date.error}
          errorText={date.error}
        />

        <TextInput
          label="Cintura"
          returnKeyType="next"
          value={waist.value}
          onChangeText={(text) => setWaist({ value: text, error: '' })}
          error={!!waist.error}
          errorText={waist.error}
        />
        <TextInput
          label="Abdômen"
          returnKeyType="next"
          value={belly.value}
          onChangeText={(text) => setBelly({ value: text, error: '' })}
          error={!!belly.error}
          errorText={belly.error}
        />
        <TextInput
          label="Quadril"
          returnKeyType="next"
          value={hip.value}
          onChangeText={(text) => setHip({ value: text, error: '' })}
          error={!!hip.error}
          errorText={hip.error}
        />
        <TextInput
          label="Peitoral"
          returnKeyType="next"
          value={breastplate.value}
          onChangeText={(text) => setBreastplate({ value: text, error: '' })}
          error={!!breastplate.error}
          errorText={breastplate.error}
        />
        <TextInput
          label="Ombro"
          returnKeyType="next"
          value={shoulder.value}
          onChangeText={(text) => setShoulder({ value: text, error: '' })}
          error={!!shoulder.error}
          errorText={shoulder.error}
        />
        <TextInput
          label="Braço direito"
          returnKeyType="next"
          value={rightArm.value}
          onChangeText={(text) => setRigtArm({ value: text, error: '' })}
          error={!!rightArm.error}
          errorText={rightArm.error}
        />
        <TextInput
          label="Braço esquerdo"
          returnKeyType="next"
          value={leftArm.value}
          onChangeText={(text) => setLefttArm({ value: text, error: '' })}
          error={!!leftArm.error}
          errorText={leftArm.error}
        />
        <TextInput
          label="Antebraço direito"
          returnKeyType="next"
          value={rightForearm.value}
          onChangeText={(text) => setRightForearm({ value: text, error: '' })}
          error={!!rightForearm.error}
          errorText={rightForearm.error}
        />
        <TextInput
          label="Antebraço esquerdo"
          returnKeyType="next"
          value={leftForearm.value}
          onChangeText={(text) => setLeftForearm({ value: text, error: '' })}
          error={!!leftForearm.error}
          errorText={leftForearm.error}
        />
        <TextInput
          label="Perna direita"
          returnKeyType="next"
          value={rightLeg.value}
          onChangeText={(text) => setRightLeg({ value: text, error: '' })}
          error={!!rightLeg.error}
          errorText={rightLeg.error}
        />
        <TextInput
          label="Perna esquerda"
          returnKeyType="next"
          value={leftLeg.value}
          onChangeText={(text) => setLeftLeg({ value: text, error: '' })}
          error={!!leftLeg.error}
          errorText={leftLeg.error}
        />
        <TextInput
          label="Panturrilha direita"
          returnKeyType="next"
          value={rightCalf.value}
          onChangeText={(text) => setRightCalf({ value: text, error: '' })}
          error={!!rightCalf.error}
          errorText={rightCalf.error}
        />
        <TextInput
          label="Panturrilha esquerda"
          returnKeyType="next"
          value={leftCalf.value}
          onChangeText={(text) => setLeftCalf({ value: text, error: '' })}
          error={!!leftCalf.error}
          errorText={leftCalf.error}
        />

        <Button
          mode="contained"
          onPress={onSavePressed}
          style={{ marginTop: 24 }}
        >
          Salvar
        </Button>

      </Background>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
