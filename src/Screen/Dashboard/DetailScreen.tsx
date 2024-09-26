import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../Components/Header';
const {height,width} = Dimensions.get('window')

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
 
  const { description, image, title } = route?.params?.data;

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentContainer}>
        
        <Image source={{ uri: image.uri }} style={styles.image} />
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex:0.4,
    // backgroundColor:'red',
    // alignItems: 'center',
    padding: 10,
    // backgroundColor:'red'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign:'center',
    paddingTop:20
    // marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    // marginTop: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.20,  
    resizeMode: 'contain',  
  },
});
