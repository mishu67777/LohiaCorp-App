import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import HomeScreen from '../Screen/Dashboard/HomeScreen';
import DetailScreen from '../Screen/Dashboard/DetailScreen';
import ProductList from '../Screen/ProductPlanning/ProductList';
import ProductPlanning from '../Screen/ProductPlanning/ProductPlanning';
import ProductDetail from '../Screen/ProductPlanning/ProductDetail';
import NewProject from '../Screen/ProductPlanning/NewProject';
import Benefits from '../Services/Benifits';
import Faq from '../Services/Faq';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LoomList from '../Screen/ProductPlanning/LoomList';
import { getApi } from '../Service/Api';
import Config from '../Utils/Config';

const Drawer = createDrawerNavigator();

export function DrawerNavigation(props: any) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ drawerIcon: ({ color }) => <Icon name="home" size={20} color={color} /> }}
      />
      <Drawer.Screen
        name="Details"
        component={DetailScreen}
        options={{ drawerIcon: ({ color }) => <Icon name="info-circle" size={20} color={color} /> }}
      />
       <Drawer.Screen
        name="LoomList"
        component={LoomList}
        options={{ drawerIcon: ({ color }) => <Icon name="info-circle" size={20} color={color} /> }}
      />
      <Drawer.Screen
        name="ProductPlanning"
        component={ProductPlanning}
        options={{ drawerIcon: ({ color }) => <Icon name="calendar" size={20} color={color} /> }}
      />
      <Drawer.Screen
        name="ProductList"
        component={ProductList}
        options={{ drawerIcon: ({ color }) => <MaterialIcons name="list" size={20} color={color} /> }}
      />
      <Drawer.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ drawerIcon: ({ color }) => <Icon name="file-text" size={20} color={color} /> }}
      />
      <Drawer.Screen
        name="NewProject"
        component={NewProject}
        options={{ drawerIcon: ({ color }) => <MaterialIcons name="add-box" size={20} color={color} /> }}
      />
      <Drawer.Screen
        name="Benefits"
        component={Benefits}
        options={{ drawerIcon: ({ color }) => <MaterialIcons name="add-box" size={20} color={color} /> }}
      />
      <Drawer.Screen
        name="Faq"
        component={Faq}
        options={{ drawerIcon: ({ color }) => <MaterialIcons name="add-box" size={20} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [profileData, setProfileData] = useState<{ name: string; image: string; userDetails: object | null }>({
    name: 'User',
    image: 'https://via.placeholder.com/80',
    userDetails: null,
  });
  const navigation = useNavigation();

  

  useFocusEffect(
    React.useCallback(() => {
    const fetchUserData = async () => {
      try {
        const userDetailsString = await getApi(Config.Profile);
        console.log("res of data will be",userDetailsString)
        // const userDetailsString = await AsyncStorage.getItem('userdetails');
        if (userDetailsString) {
          // const userDetails = JSON.parse(userDetailsString);
          // alert(JSON.stringify(userDetails))
          // console.log("profile data will be",userDetails)
          setProfileData({
            name: userDetailsString.user.name || 'User',
            image: userDetailsString.user.details__image || 'https://via.placeholder.com/80',
            userDetailsString, // Store the entire user details object
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [navigation])
);

  const handleLogout = async () => {
    try {
     
      await AsyncStorage.removeItem('mean-token');
      console.log('Token removed successfully');

      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  const handleEdit = () => {
   
    console.log('Edit button clicked');
    navigation.navigate('ProfileEdit',{profileData:profileData})
  };
  
  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profileData?.image || 'https://via.placeholder.com/80' }}
          style={styles.profileImage}
        />
        <View style={{flexDirection:'row'}}>
        

       
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        
          <Image source={require('../../src/assets/edit.png')} style={{height:30,width:30,resizeMode:'contain'}}/>
        </TouchableOpacity>
        <Text style={styles.profileName}>{profileData?.name || 'User'}</Text>
        </View>
      </View>

     
      <DrawerItem
        label="Home"
        icon={({ color }) => <Icon name="home" size={20} color={color} />}
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="About Lohia Corp"
        icon={({ color }) => <Icon name="info-circle" size={20} color={color} />}
        onPress={() => Linking.openURL('https://www.lohiagroup.com/about-lohia-corp')}
      />
      <DrawerItem
        label="Benefits"
        icon={({ color }) => <Icon name="star" size={20} color={color} />}
        onPress={() => props.navigation.navigate('Benefits')}
      />
      <DrawerItem
        label="FAQs"
        icon={({ color }) => <Icon name="question-circle" size={20} color={color} />}
        onPress={() => props.navigation.navigate('Faq')}
      />
      <DrawerItem
        label="Product Catalogue"
        icon={({ color }) => <Icon name="book" size={20} color={color} />}
        onPress={() => Linking.openURL('http://www.lohiagroup.com/product')}
      />
      <DrawerItem
        label="Log Out"
        icon={({ color }) => <MaterialIcons name="logout" size={20} color={color} />}
        onPress={() => handleLogout()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default DrawerNavigation;
