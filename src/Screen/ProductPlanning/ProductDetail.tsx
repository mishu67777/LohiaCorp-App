


import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '../../Components/Header';
import { useRoute } from '@react-navigation/native';
import MathView from 'react-native-math-view';
import { useCalculatorService } from '../../Components/CalculatorService';

const ProductDetail: React.FC = ({ navigation }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<number | null>(null);
  const route = useRoute();
  const {taplineOutput,
    unstretchedTapeWidth,
    elongation,
    tapeThickness,
    unstretchedTapeThickness,
    denierSetting,
    relaxation,
    gpd,
    screwRpm,
    usefulWidth,
    numberOfTapes,
    spacerSizer,
    gearRatio,
    dieSetting,
    picksperminute,
    loomoutput,
    loomproductionsqm,
    loomproductionm,
    numberoflooms,
    fabricgsm,
    dfl,
    laminatedfabric,
    unlaminatedfabric,
    denier,
    gsm,
    gpm,
    bagweight,
    fabricgsmcm,
    wraptapes,
    heddlebelt,
    mesh,
    sizeofring,
    stretchratio } = useCalculatorService();
  const dynamicFields = route?.params?.name?.MY_DATA || [];
  const formulaList = route?.params?.name?.formulalist || [];

  const handleInputChange = (modelPropName: string, value: string) => {
    setFormData(prev => ({ ...prev, [modelPropName]: value }));
  };

  const check = (updatedFormData) => {
    for (let key in updatedFormData) {
      if (!updatedFormData[key]) {
        return false; // If any field is empty, return false
      }
    }
    return true;
  };

  const checkResult = (cal) => {
    if (cal >= 0) {
      setResult(cal);
    } else {
      setResult(null);
      Alert.alert("Validation", "Please enter valid inputs");
    }
  };

const calculator = (grade: string, value: any) => {
  console.log("Calculator value:", grade, value);

  switch (grade) {
    case "formulaOne": {
      const data = taplineOutput(value);
      checkResult(data);
      console.log("Tapline data", data.toFixed(2));
      break;
    }
    case "formulaTwo": {
      if (Number(value.para4) !== 0.1 && Number(value.para4) !== 0.2) {
        return Alert.alert("Blade thickness should be 0.1mm or 0.2mm");
      }

      const data = unstretchedTapeWidth(value);
      checkResult(data);
      break;
    }
    case "formulaThree": {
      const data = elongation(value);
      checkResult(data);
      break;
    }
    case "formulaFour": {
      const data = tapeThickness(value);
      checkResult(data);
      break;
    }
    case "formulaFive": {
      const data = unstretchedTapeThickness(value);
      checkResult(data);
      break;
    }
    case "formulaSix": {
      const data = denierSetting(value);
      checkResult(data);
      break;
    }
    case "formulaSeven": {
      const data = relaxation(value);
      checkResult(data);
      break;
    }
    case "formulaEight": {
      const data = gpd(value);
      checkResult(data);
      break;
    }
    case "formulaNine": {
      const data = screwRpm(value);
      checkResult(data);
      break;
    }
    case "formulaTen": {
      const data = usefulWidth(value);
      checkResult(data);
      break;
    }
    case "formulaEleven": {
      if (Number(value.para2) >= 6 && Number(value.para2) <= 10) {
        const data = numberOfTapes(value).toFixed(0);
        checkResult(data);
      } else {
        Alert.alert("Edge trims should be around 6 to 10mm");
      }
      break;
    }
    case "formulaTwelve": {
      if (Number(value.para4) !== 0.1 && Number(value.para4) !== 0.2) {
        return Alert.alert("Blade thickness should be 0.1mm or 0.2mm");
      }

      const data = spacerSizer(value);
      checkResult(data);
      break;
    }
    case "formulaThirteen": {
      const data = gearRatio(value);
      checkResult(data);
      break;
    }
    case "formulaFourteen": {
      const data = dieSetting(value);
      checkResult(data);
      break;
    }
    case "formulafifteen": {
      const data = picksperminute(value);
      checkResult(data);
      break;
    }
    case "formulasixteen": {
      const data = loomoutput(value);
      checkResult(data);
      break;
    }
    case "formulaseventeen": {
      const data = loomproductionsqm(value);
      checkResult(data);
      break;
    }
    case "formulaeighteen": {
      const data = loomproductionm(value);
      checkResult(data);
      break;
    }
    case "formulanineteen": {
      const data = numberoflooms(value).toFixed(0);
      checkResult(data);
      break;
    }
    case "formulatwenty": {
      const data = fabricgsm(value);
      checkResult(data);
      break;
    }
    case "formulatwentyone": {
      const data = dfl(value);
      checkResult(data);
      break;
    }
    case "formulatwentytwo": {
      const data = laminatedfabric(value);
      checkResult(data);
      break;
    }
    case "formulatwentythree": {
      const data = unlaminatedfabric(value);
      checkResult(data);
      break;
    }
    case "formulatwentyfour": {
      const data = denier(value);
      checkResult(data);
      break;
    }
    case "formulatwentyfive": {
      const data = gsm(value);
      checkResult(data);
      break;
    }
    case "formulatwentysix": {
      const data = gpm(value);
      checkResult(data);
      break;
    }
    case "formulatwentyseven": {
      const data = bagweight(value);
      checkResult(data);
      break;
    }
    case "formulatwentyeight": {
      const data = fabricgsmcm(value).toFixed(0);
      checkResult(data);
      break;
    }
    case "formulatwentynine": {
      const data = wraptapes(value).toFixed(0);
      checkResult(data);
      break;
    }
    case "formulathirty": {
      const data = heddlebelt(value);
      checkResult(data);
      break;
    }
    case "formulathirtyone": {
      const data = mesh(value);
      checkResult(data);
      break;
    }
    case "formulathirtytwo": {
      const data = sizeofring(value);
      checkResult(data);
      break;
    }
    case "formulaThirtythree": {
      const data = stretchratio(value);
      checkResult(data);
      break;
    }
    default: {
      console.log("Invalid choice");
      Alert.alert("Error", "Invalid formula choice.");
      break;
    }
  }
};

  const calculateStretchRatio = () => {
    if (check(formData)) {
      // Perform the calculation only if all fields are filled
      calculator(route?.params?.name?.formulaFn, formData);
    } else {
      Alert.alert("Validation", "All fields are mandatory");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tape Line Operations" navigation={navigation} />

      <Text style={styles.title}>{route?.params?.name?.name} Formula</Text>
      <View style={styles.formulaBox}>
        {formulaList.map((item, index) => (
          <View key={index} style={styles.formulaContent}>
            <Text style={styles.formulaTitle}>{item.name} =</Text>
            <MathView
              math={item.formula}
              style={[styles.formula, { fontSize: parseInt(item.fontsize, 10) }]}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>

      <View style={styles.inputContainer}>
        {dynamicFields.map((field, index) => (
          <View key={index} style={styles.inputRow}>
            <Text style={styles.label}>{field.name}</Text>
            <TextInput
              style={styles.input}
              keyboardType={field.type === 'number' ? 'numeric' : 'default'}
              value={formData[field.modelPropName] || ''}
              onChangeText={(text) => handleInputChange(field.modelPropName, text)}
              placeholder={field.placeholder}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={calculateStretchRatio}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {result !== null && (
        <Text style={styles.resultText}>{route?.params?.name?.name} = {result.toFixed(2)} {route?.params?.name?.unit}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
    paddingLeft: 20,
  },
  formulaBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  formulaContent: {
    marginBottom: 20,
    width: '100%',
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'left',
  },
  formula: {
    textAlign: 'center',
    color: "#DDDDDD",
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 0.5,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetail;
