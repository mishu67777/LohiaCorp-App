


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screen/Dashboard/HomeScreen';
import DetailScreen from '../Screen/Dashboard/DetailScreen';
import SplashScreen from 'react-native-splash-screen';
import IntroSlider from '../Screen/login/IntroSlider';
import Login from '../Screen/login/Login';
import ProductPlanning from '../Screen/ProductPlanning/ProductPlanning';
import ProductList from '../Screen/ProductPlanning/ProductList';
import ProductDetail from '../Screen/ProductPlanning/ProductDetail';
import SearchAddress from '../Services/SearchAddress';
import DrawerNavigator from './DrawerNavigator';
import NewProject from '../Screen/ProductPlanning/NewProject';
import Benefits from '../Services/Benifits';
import Faq from '../Services/Faq';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoomList from '../Screen/ProductPlanning/LoomList';
import ProfileEdit from '../Screen/login/ProfileEdit';
import CountryCodePicker from '../Services/CountryCodePicker';

export type RootStackParamsList = {
  Home: undefined;
  Details: { name: string };
  Login: undefined;
  IntroSlider: undefined;
  ProductPlanning: undefined;
  ProductList: undefined;
  LoomList:undefined;
  ProductDetail: undefined;
  SearchAddress: undefined;
  NewProject: undefined;
  Benefits: undefined;
  Faq: undefined;
  ProfileEdit:undefined;
  CountryCodePicker:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

function RootNavigation() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        
        const token = await AsyncStorage.getItem('mean-token');
        console.log('navigator token data will be', token);

       
        setInitialRoute(token ? 'Home' : 'IntroSlider');

       
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      } catch (error) {
        console.error('Error fetching token:', error);
        setInitialRoute('IntroSlider'); 
      }
    };

    checkToken();
  }, []);


  if (!initialRoute) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="IntroSlider" component={IntroSlider} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ProductPlanning" component={ProductPlanning} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="LoomList" component={LoomList} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="SearchAddress" component={SearchAddress} />
        <Stack.Screen name="NewProject" component={NewProject} />
        <Stack.Screen name="Benefits" component={Benefits} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="CountryCodePicker" component={CountryCodePicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;

