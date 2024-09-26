


import React, { useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Industrial Formulas',
    description: 'Well versed easy calculation to the wide range of formulas meant for tapeline and loom calculator. On simply inputting the parameters you can get the output as per the formula.',
    image: require('../../assets/01.jpg'),
  },
  {
    id: 2,
    title: 'New Project Calculation',
    description: 'Exposure to new project section allows you to select an application and its range and simply click on calculate which will display you the various parameters with capacity and quantity required along with other important details like total connection, power demand, manpower required and area required.',
    image: require('../../assets/02.jpg'),
  },
  {
    id: 3,
    title: 'Product Catalog',
    description: 'This will display the wide range of LohiaCorp products with detailed description which gives a complete information for the various activities that will be carried out by these machineries to get the various products related to tapeline and loom industry output.',
    image: require('../../assets/03.jpg'),
  },
];

const IntroSlider = ({navigation}) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/backImge.jpg')} // Replace with your background image path
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/LohiaCorplogooriginalcolour.png')}
          style={styles.logo}
        />
      </View>
      <View style={{flex:0.66,justifyContent:'center',alignItems:'center'}}>
      <View style={styles.cardContainer}>
        <Carousel
          ref={carouselRef}
          data={slides}
          renderItem={renderItem}
          sliderWidth={width * 0.9}
          itemWidth={width * 0.8}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop={false}
        />
        <Pagination
          dotsLength={slides.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      </View>
      <TouchableOpacity style={styles.skipButton} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.skipText}>Skip &gt;&gt;</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 0.24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height/25,
    width: '80%',
    resizeMode: 'contain',
  },
  cardContainer: {
    // flex: 0.66,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  slide: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
  },
  dotStyle: {
    width: 15,
    height: 5,
    borderRadius: 1,
    backgroundColor: '#000',
  },
  inactiveDotStyle: {
    backgroundColor: '#d3d3d3',
  },
  skipButton: {
    position: 'absolute',
    bottom: "4%",
    right: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
});

export default IntroSlider;



