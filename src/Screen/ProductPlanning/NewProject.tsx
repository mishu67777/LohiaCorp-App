
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../../Components/Header';
import { getApi, newprojectCalculation } from '../../Service/Api';
import Config from '../../Utils/Config';
import Toast from 'react-native-toast-message'; // Import Toast

const NewProject = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedRange, setSelectedRange] = useState('');
  const [isApplicationModalVisible, setApplicationModalVisible] = useState(false);
  const [isRangeModalVisible, setRangeModalVisible] = useState(false);
  const [isRangeEnabled, setRangeEnabled] = useState(false);
  const [Data, setData] = useState([]);
  const [Data1, setData1] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const res = await getApi(Config.Applications);
        setApplications(res.applications);
      } catch (error) {
        console.error('API error:', error);
      }
    };
    fetchApplicationData();
  }, []);

  const handleApplicationPress = () => {
    setApplicationModalVisible(true);
  };

  const handleRangePress = () => {
    if (isRangeEnabled) {
      setRangeModalVisible(true);
    }
  };

  const handleCalculate = async () => {
    // Validate whether both application and range are selected
    if (!selectedApplication) {
      Toast.show({
        type: 'error',
        text1: 'Please choose an application',
        position: 'bottom',
      });
      return;
    }

    if (!selectedRange) {
      Toast.show({
        type: 'error',
        text1: 'Please choose sacks per day (range)',
        position: 'bottom',
      });
      return;
    }


    const res = await newprojectCalculation(
      Config.Description,
      selectedApplication?.id,
      selectedRange?.id,
    );
    console.log('res of api', res);
    setData(res?.range_descriptions);
    setData1(res?.last_four_rows);
    setShowResults(true);
  };

  const handleApplicationSelect = application => {
    setSelectedApplication(application);
    setRangeEnabled(true); 
    setApplicationModalVisible(false); 
  };

  const handleRangeSelect = range => {
    setSelectedRange(range); 
    setRangeModalVisible(false); 
  };

  const handleCloseApplicationModal = () => {
    setApplicationModalVisible(false);
  };

  const handleCloseRangeModal = () => {
    setRangeModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Header title="New Project" navigation={navigation} />
        <View style={styles.content}>
          {/* Choose Application Section */}
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={handleApplicationPress}>
              <Text style={styles.pickerText}>
                {selectedApplication?.name || 'Choose Application'}
              </Text>
            </TouchableOpacity>
            <Image
              source={require('../../assets/LohiaCorp_Dropdown.png')}
              style={styles.dropdownIcon}
              resizeMode="contain"
            />
          </View>

          {/* Select Range Section */}
          <View style={[styles.inputGroup, !isRangeEnabled && styles.disabled]}>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={handleRangePress}
              disabled={!isRangeEnabled}>
              <Text style={styles.pickerText}>
                {selectedRange?.range || 'Select sacks per day'}
              </Text>
            </TouchableOpacity>
            <Image
              source={require('../../assets/LohiaCorp_Dropdown.png')}
              style={styles.dropdownIcon}
              resizeMode="contain"
            />
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.button} onPress={handleCalculate}>
              <Text style={styles.buttonText}>CALCULATE</Text>
            </TouchableOpacity>
          </View>

         
          <Modal
            visible={isApplicationModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleCloseApplicationModal}>
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPressOut={handleCloseApplicationModal}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    marginTop: 40,
                  }}></View>
                <Pressable style={styles.modalContent1}>
                  {applications.map((application, index) => (
                    <Pressable
                      key={index}
                      style={styles.radioButtonContainer}
                      onPress={() => handleApplicationSelect(application)}>
                      <View style={styles.radioCircle}>
                        {selectedApplication?.name === application.name && (
                          <View style={styles.selectedCircle} />
                        )}
                      </View>
                      <Text style={styles.radioText}>{application.name}</Text>
                    </Pressable>
                  ))}
                </Pressable>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    marginTop: 2,
                  }}></View>
                <View style={styles.modalButtons}>
                  <Pressable onPress={handleCloseApplicationModal}>
                    <Text style={styles.modalButtonText}>CANCEL</Text>
                  </Pressable>
                  <Pressable onPress={handleCloseApplicationModal}>
                    <Text style={styles.modalButtonText}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

     
          {selectedApplication && (
            <Modal
              visible={isRangeModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={handleCloseRangeModal}>
              <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPressOut={handleCloseRangeModal}>
                <View style={styles.modalContent}>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      backgroundColor: '#e0e0e0',
                      marginTop: 40,
                    }}></View>
                  <Pressable style={styles.modalContent1}>
                    {selectedApplication.ranges.map((range, index) => (
                      <Pressable
                        key={index}
                        style={styles.radioButtonContainer}
                        onPress={() => handleRangeSelect(range)}>
                        <View style={styles.radioCircle}>
                          {selectedRange?.range === range.range && (
                            <View style={styles.selectedCircle} />
                          )}
                        </View>
                        <Text style={styles.radioText}>{range.range}</Text>
                      </Pressable>
                    ))}
                  </Pressable>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      backgroundColor: '#e0e0e0',
                      marginTop: 2,
                    }}></View>
                  <View style={styles.modalButtons}>
                    <Pressable onPress={handleCloseRangeModal}>
                      <Text style={styles.modalButtonText}>CANCEL</Text>
                    </Pressable>
                    <Pressable onPress={handleCloseRangeModal}>
                      <Text style={styles.modalButtonText}>OK</Text>
                    </Pressable>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>

       
        <Toast />
      {showResults && (
            <>
      <View style={{flex: 1, padding: 16}}>
        <Text style={styles.header}>Calculator:</Text>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerColumn, styles.description]}>
            Description
          </Text>
          <Text style={[styles.headerColumn, styles.capacity]}>Capacity</Text>
          <Text style={[styles.headerColumn, styles.quantity]}>Qty</Text>
        </View>

        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  alignSelf: 'center',
                }}></View>
              <Text style={[styles.column, styles.description]}>
                {item.description}
              </Text>
              <Text style={[styles.column, styles.capacity]}>
                {item.capacity}
              </Text>
              <Text style={[styles.column, styles.quantity]}>
                {item.quantity}
              </Text>
            </View>
          )}
        />
      </View>
     
      <View style={{height: 10, width: '100%', backgroundColor: 'white'}}></View>

      <View style={{flex: 1, padding: 16}}>
      <Text style={styles.header1}>Other Requirements (Approx):</Text>
      <FlatList
        data={Data1}
        renderItem={({ item }) => (
          <View style={styles.itemContainer1}>
            <View style={{flex:0.8}}><Text style={styles.itemLabel1}>{item?.description}</Text></View>
            <View style={{flex:0.7}}><Text style={styles.itemValue1}>:{item?.value}</Text></View>
           
            
          </View>
        )}
        keyExtractor={item => item.key}
      />
    </View>
    </>
          )}

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerContainer: {
    padding: 10,
  },
  pickerText: {
    color: '#6b6b6b',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 14,
    width: '40%',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '60%',
    backgroundColor: '#fff',
  },
  modalContent1: {
    borderRadius: 8,
    padding: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    paddingRight: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  column: {
    fontSize: 13,
    textAlign: 'center',
  },
  headerColumn: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    flex: 2.3,
    // backgroundColor:'red',
    paddingHorizontal: 25,
  },
  capacity: {
    flex: 2.5,
  },
  quantity: {
    flex: 0.7,
    // backgroundColor:'red'
  },
  header1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer1: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemLabel1: {
    fontSize: 14,
    // width:"80%"
  },
  itemValue1: {
    fontSize: 14,
    // fontWeight: 'bold',
  },
});

export default NewProject;

