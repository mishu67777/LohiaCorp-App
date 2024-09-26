import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const Header: React.FC = ({title,navigation}) => {
  const route = useRoute();
 
  return (
    <View style={styles.container}>
    
      <View style={styles.iconContainer}>
        <Icon name="menu" size={30} color="#900" onPress={()=>navigation.openDrawer()}/>
      </View>

      
      <View style={styles.logoContainer}>
      {title?<Text style={{fontSize:20,fontWeight:'700'}}>{title}</Text>:<Image
          source={require('../assets/LohiaCorplogooriginalcolour.png')} 
          style={styles.logo}
          resizeMode="contain"
        />}
      </View>

   
      <View style={styles.textContainer}>
        {title?<TouchableOpacity onPress={()=>navigation.goBack()}><Image source={require('../assets/LohiaCorp_BackIcon.png')} style={{marginRight:15}}/></TouchableOpacity>:null}
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
    shadowColor: '#000',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: height / 12, 
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: height / 14,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerText: {
    color: '#900',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
