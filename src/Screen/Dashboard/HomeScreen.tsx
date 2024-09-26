import React, { useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Modal, Pressable } from 'react-native';
import Header from '../../Components/Header'; // Adjust the path as needed
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getApi } from '../../Service/Api';
import Config from '../../Utils/Config';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const carouselRef = useRef(null);
  const modalCarouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: '',
      description: '',
      image: require('../../assets/01.jpg'), // Placeholder image
    },
  ]);
  const [productslides, setProductSlides] = useState([
    {
      id: 1,
      title: '',
      description: '',
      image: require('../../assets/01.jpg'), // Placeholder image
    },
  ])

  useFocusEffect(
    React.useCallback(() => {
    navigation.closeDrawer()
    }, [navigation])
  );

  useEffect(() => {
    const fetchSlidesData = async () => {
      try {
        const res = await getApi(Config.Banners);
        console.log("res res res",res)
        const slidesData = res?.data.map((item: any) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          image: { uri: item?.path },
        })) || [];
        
        setSlides(slidesData);
        setIsModalVisible(true);
      } catch (error) {
        console.error('Error fetching slides data:', error);
      }
    };

    fetchSlidesData();
  }, []);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const res = await getApi(Config.Product);
        console.log("product response",res.promo_product)
        const slidesData = res.promo_product.map((item: any) => ({
          id: item.id,
          title: item.name,
          description: item.product_description,
          image: { uri: item?.path },
        })) || [];
        
        setProductSlides(slidesData);
        // setFaqData(res.faqs);   
      } catch (error) {
        console.error("check_ui check", error);
      }
    };
    fetchFaqData();
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.slide} onPress={()=>navigation.navigate("Details",{data:item})}>
      <Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
    </TouchableOpacity>
  );

  const renderModalItem = ({ item }: any) => (
    <View style={styles.modalSlide}>
      <Image
        source={item.image} // Ensure this is a valid URI or local image
        style={styles.modalCarouselImage1}
        resizeMode="contain"
      />
       <Text style={styles.modalProductTitle}>{item?.title}</Text>
            <Text style={styles.modalDescription} numberOfLines={3}>
              {item?.description}
            </Text>
            <Pressable style={styles.modalButton} onPress={()=>navigation.navigate("Details",{data:item})}>
              <Text style={styles.modalButtonText}>VIEW DETAIL</Text>
            </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.topSection}>
        <Carousel
          ref={carouselRef}
          data={slides}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
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

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Select Calculation Type</Text>

        <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('ProductPlanning')}>
          <Image
            source={require('../../assets/LohiaCorp_ProductionPlanning.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <Text style={styles.optionText}>Production Planning</Text>

        <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.push("NewProject")}>
          <Image source={require('../../assets/LohiaCorp_NewProject.png')} style={styles.iconImage} />
        </TouchableOpacity>

        <Text style={styles.optionText}>New Project</Text>
      </View>


      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Our New Product</Text>
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
            </View>
            <Carousel
              ref={modalCarouselRef}
              data={productslides}
              renderItem={renderModalItem}
              sliderWidth={width * 0.9}
              itemWidth={width * 0.8}
              onSnapToItem={(index) => setModalActiveIndex(index)}
              loop={false}
              containerCustomStyle={styles.modalCarouselContainer}
            />
           
           
            <Pagination
              dotsLength={productslides.length}
              activeDotIndex={modalActiveIndex}
              containerStyle={styles.modalPaginationContainer} 
              dotStyle={styles.dotStyle}
              inactiveDotStyle={styles.inactiveDotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topSection: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center', // Center content in the slide
  },
  carouselImage: {
    width: width, // Ensure full width
    height: height * 0.35, // Adjust height as needed
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
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:"30%"
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    // textAlign: 'center',
    paddingLeft:'25%'
  },
  closeButton: {
    backgroundColor: '#FFEB3B',
    height:20,
    width:20,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  modalSlide:{
    justifyContent:'center',alignItems:'center'
  },
  modalCarouselContainer: {
    marginVertical: 10,
  },
  modalCarouselImage: {
    width: width * 0.8, // Adjust width as needed
    height: height * 0.25, // Adjust height as needed
  },
  modalCarouselImage1: {
    width: width * 0.8, // Adjust width as needed
    height: height * 0.20, // Adjust height as needed
  },
  modalPaginationContainer: {
    paddingVertical: 16, // Adjust top and bottom padding as needed
    marginVertical: 10,
  },
  modalProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center'
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 30,
    textAlign:'center',
    // width:200
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
