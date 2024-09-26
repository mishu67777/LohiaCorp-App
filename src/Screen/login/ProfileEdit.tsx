import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Config from '../../Utils/Config';
import { updateProfileapi, getApi } from '../../Service/Api';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const ProfileEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(route?.params?.profileData?.userDetailsString?.user?.details__image)
 
  const [profile, setProfile] = useState({
    name: route?.params?.profileData?.userDetailsString?.user?.name || '',
    mobile: route?.params?.profileData?.userDetailsString?.user?.mobile_no || '',
    email: route?.params?.profileData?.userDetailsString?.user?.email || '',
    company: route?.params?.profileData?.userDetailsString?.user?.details__company || '',
    businessNature: route?.params?.profileData?.details__nature_of_business || '',
    businessName: route?.params?.profileData?.userDetailsString?.user?.details__business_name || '',
    state: route?.params?.profileData?.userDetailsString?.user?.state__name || '',
    city: route?.params?.profileData?.userDetailsString?.user?.details__city || '',
    address: route?.params?.profileData?.userDetailsString?.user?.details__location || '',
    state1: '',
  });

  const [country, setCountry] = useState([]);
  const [countryCode, setCountryCode] = useState([]);
  const [countryCode1, setCountryCode1] = useState('+91');

  const companies = ['Raffia', 'Other'];
console.log("api data will be",route?.params?.profileData)
  useEffect(() => {
    if (route.params?.selectedState) {
      
      setProfile(prevProfile => ({
        ...prevProfile,
        state: route.params.selectedState?.name,
        state1: route.params.selectedState?.id,
        
      }));
     
    }
  }, [route.params?.selectedState]);


  useEffect(() => {
    if (route.params?.selectedState1) {
      
      setCountryCode1(route.params?.selectedState1?.country_code)
     
    }
  }, [route.params?.selectedState1]);

  const handleInputChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };

  useEffect(() => {
    const fetchCountryCode = async () => {
      setLoading(true);
      try {
        const res = await getApi(Config.Country_codes);
        console.log("data will be   1233",res)
          setCountry(res.states);
          setCountryCode(res.country_codes)
       
      } catch (error) {
        console.error('Error fetching country data:', error);
        // Alert.alert('Error', 'An error occurred while fetching country codes');
      }
      setLoading(false);
    };

    fetchCountryCode();
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const toggleEditMode1 = async () => {

    let obj = {
      name: profile.name,
      mobile: profile.mobile,
      email: profile.email,
      company: profile.company,
      businessNature: profile.businessNature,
      businessName: countryCode1 !== "+91" ? businessName : profile.businessName,
      state: profile.state1,
      city: profile.city,
      address: profile.address,
      image:profileImage?{
        uri: profileImage,
        type: 'image/jpeg', 
        name: 'profileImage.jpg', 
      }:null
    };
   
    setLoading(true);
    try {
      const res = await updateProfileapi(Config.Update, obj);
      
        if(res?.is_success){
          Toast.show({
            type: 'success',
            text1: 'Profile updated successfully',
            position: 'bottom',
          });
          navigation.goBack();
        }else{
          Toast.show({
            type: 'error',
            text1: 'something went wrong',
            position: 'bottom',
          });
        }
     
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred while updating the profile',
        position: 'bottom',
      });
    }
    setLoading(false);
  };
  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        
      } else {
        const selectedImage = response.assets[0];
        setProfileImage(selectedImage.uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
      <View style={styles.profileCard}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileCardTitle}>My Profile</Text>
        </View>
        <View style={styles.profileContent}>
        <TouchableOpacity onPress={handleSelectImage}>
            <Image
              style={styles.profileImage}
              source={{
                uri: profileImage || 'https://via.placeholder.com/100',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.editPhotoText}>Tap to change photo</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Enter Name</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={profile.name}
            editable={isEditing}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>

        <Text style={styles.label}>Enter Mobile Number</Text>
        
        <View style={styles.inputContainer}>
        <MaterialIcons name="phone" size={20} color="#aaa" style={styles.icon} />
  <TouchableOpacity
    style={styles.codePicker}
    onPress={() => navigation.navigate('CountryCodePicker', {
      countryCode: country,
      onSelectCode1: countryCode
    })}
  >
    <Text>{countryCode1?countryCode1:+91}</Text>
  </TouchableOpacity>
  
  <TextInput
    style={styles.input}
    placeholder="Enter Mobile Number"
    value={profile.mobile}
    editable={isEditing}
    onChangeText={(value) => handleInputChange('mobile', value)}
  />
        </View>

        <Text style={styles.label}>Enter Email</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            editable={false}
            value={profile.email}
          />
        </View>

        <Text style={styles.label}>Enter Nature of Business</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="business" size={20} color="#aaa" style={styles.icon} />
          <Picker
            selectedValue={profile.company}
            style={styles.picker}
            enabled={isEditing}
            onValueChange={(itemValue) => handleInputChange('company', itemValue)}
          >
            <Picker.Item label="Enter nature of Business" value="" />
            {companies.map((company, index) => (
              <Picker.Item key={index} label={company} value={company} />
            ))}
          </Picker>
        </View>

       {countryCode1=="+91" && profile.state ?<Text style={styles.label}>Select State</Text>:<Text style={styles.label}>Enter Business Name</Text>}
       {countryCode1=="+91"?<TouchableOpacity
          style={styles.inputContainer}
          onPress={() => {
            if (isEditing) {
              navigation.navigate('SearchAddress', { currentSelectedState: profile.state, country: country });
            }
          }}
          disabled={!isEditing}
        >
          <MaterialIcons name="location-on" size={20} color="#aaa" style={styles.icon} />
          <Text style={styles.stateText}>
            {profile.state || 'Select State'}
          </Text>
        </TouchableOpacity>: <View style={styles.inputContainer}>
          <MaterialIcons name="location-city" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Business Name"
            value={profile.businessName}
            editable={isEditing}
            onChangeText={(value) => setbusinessName('bussiness', value)}
          />
        </View>}

        <Text style={styles.label}>Enter City Name</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-city" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter City Name"
            value={profile.city}
            editable={isEditing}
            onChangeText={(value) => handleInputChange('city', value)}
          />
        </View>

        <Text style={styles.label}>Enter Address</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="place" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            value={profile.address}
            editable={isEditing}
            onChangeText={(value) => handleInputChange('address', value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={isEditing ? toggleEditMode1 : toggleEditMode}>
          <Text style={styles.buttonText}>
            {isEditing ? 'UPDATE PROFILE' : 'EDIT PROFILE'}
          </Text>
        </TouchableOpacity>
        <Toast />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  profileCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: '30%',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 5,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stateText: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default ProfileEdit;
