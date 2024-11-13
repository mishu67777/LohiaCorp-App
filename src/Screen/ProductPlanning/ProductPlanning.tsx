import React, { useRef, useState } from 'react';
import { View, Platform, SafeAreaView, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Header from '../../Components/Header'; // Adjust the path as needed
import { data } from '../../Components/data';

const { width, height } = Dimensions.get('window');

const getFirstEntry = (entriesArray: any[]) => {
  let firstEntry: any[] = [];
  if (entriesArray.length > 0 && entriesArray[1].entries && Array.isArray(entriesArray[1].entries.entries)) {
    firstEntry = entriesArray[1].entries.entries;
  }
  return firstEntry;
};

const getFirstEntry1 = (entriesArray: any[]) => {
  let firstEntry: any[] = [];
  if (entriesArray.length > 0 && entriesArray[0].entries && Array.isArray(entriesArray[0].entries.entries)) {
    firstEntry = entriesArray[0].entries.entries;
  }
  return firstEntry;
};

const ProductPlanning: React.FC = ({ navigation }) => {
  const entries = getFirstEntry(data["production planning"]);
  const entries1 = getFirstEntry1(data["production planning"]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Production Planning"} navigation={navigation}/>
      <View style={styles.contentContainer}>
        
        <TouchableOpacity style={styles.optionContainer} onPress={()=>navigation.navigate('LoomList',{entries:entries1,title:"Tape Line Operations"})}>
          <Image
            source={require('../../assets/extrusion.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <Text style={styles.optionText}>Tape Line Operations</Text>

        <TouchableOpacity style={styles.optionContainer} onPress={()=>navigation.navigate('LoomList',{entries:entries,title:"Loom Operations"})} >
          <Image source={require('../../assets/weaving.png')} style={styles.iconImage} />
        </TouchableOpacity>

        <Text style={styles.optionText}>Loom Operations</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: height * 0.35,
    borderRadius: 8,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  dotStyle: {
    width: 15,
    height: 5,
    borderRadius: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginTop: height * 0.02,
  },
  optionContainer: {
    height: width * 0.26,
    width: width * 0.26,
    borderRadius: width * 0.13,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
    shadowColor: Platform.OS=='android'?'#000':'#FFF',
    shadowRadius: Platform.OS=='android'?4:1,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: Platform.OS=='android'?0.8:0.1,
    borderColor: '#E0E0E0',
  },
  iconImage: {
    height: width * 0.15,
    width: width * 0.15,
    resizeMode: 'contain',
  },
  optionText: {
    paddingTop: height * 0.01,
    fontSize: width * 0.035,
    textAlign: 'center',
  },
});

export default ProductPlanning;
