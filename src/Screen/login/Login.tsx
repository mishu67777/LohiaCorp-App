import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { googleLogin, getApi } from '../../Service/Api';
import Config from '../../Utils/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { appleAuth } from '@invertase/react-native-apple-authentication'; // Apple sign-in library

const { height, width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [showLogo, setShowLogo] = useState(true);

  GoogleSignin.configure({
    webClientId: '731972045707-i7rv2qessjcoda81giijeq2rjn57lsec.apps.googleusercontent.com', // Replace with your Web Client ID from Google Cloud Console
    offlineAccess: true,
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowLogo(scrollPosition < 50);
  };

  const viewProfile = async () => {
    const res = await getApi(Config.Profile);
    AsyncStorage.setItem('userdetails', JSON.stringify(res['user']));
    navigation.navigate('Home');
  };

  const onLoginSuccess = async (accessToken, loginType) => {
    try {
      const res = await googleLogin({ id_token: accessToken, is_login_type: loginType });
      console.log('>>>>>onLoginSuccess: ', res);
      AsyncStorage.setItem('mean-token', res['access_token']);
      AsyncStorage.setItem('isloggedin', 'true');
      viewProfile();
      Toast.show({
        type: 'success',
        text1: 'Signed in successfully',
        position: 'bottom',
      });
    } catch (error) {
      console.log('error in login', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log('>>>>>loginresponse: ', response);
      console.log('>>>>>response?.data?.idToken: ', response?.data?.idToken);
      onLoginSuccess(response?.data?.idToken, '0'); // Google login type '0'
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available or outdated');
      } else {
        console.error(error);
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        onLoginSuccess(appleAuthResponse.identityToken, '1'); 
      }
    } catch (error) {
      console.error('Apple Sign-In Error: ', error);
    }
  };

  const onLogin = async () => {
    //navigation.navigate('Home');
    //return false;
    if (Platform.OS === 'android') {
      await handleGoogleSignIn();
    } else {
      
      await handleAppleSignIn();
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/backImge.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ flex: 1 }}>
          {showLogo && (
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/LohiaCorplogooriginalcolour.png')}
                style={styles.logo}
              />
            </View>
          )}
          <View style={styles.cardWrapper}>
            <View style={styles.cardContainer}>
              <Text style={styles.loginText}>User Login</Text>

             
              <TouchableOpacity
                style={styles.googleButton}
                onPress={onLogin}
              >
                <Text style={styles.googleButtonText}>
                  {Platform.OS === 'android' ? 'GOOGLE LOGIN+' : 'Sign in with Apple'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Toast />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 0.24,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height / 25,
    width: '80%',
    resizeMode: 'contain',
  },
  cardWrapper: {
    flex: 0.23,
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: '5%',
  },
  loginText: {
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleButton: {
     marginTop: '10%',
    height: '30%',
    width: '60%',
    borderRadius: 30,
    backgroundColor: '#3D3D3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;