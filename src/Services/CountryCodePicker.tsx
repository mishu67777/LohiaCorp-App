import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';  

const CountryCodePicker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const navigation = useNavigation(); 
  const route = useRoute();  
  const [state1, setState] = useState([]);

  useEffect(() => {
    setState(route.params?.onSelectCode1); 
  }, [route.params?.onSelectCode1]);

  const handleSelectState = (state) => {
    setSelectedState(state.country_code);
    navigation.navigate('ProfileEdit', { selectedState1: state });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setState(route.params?.onSelectCode1);
    } else {
      const filteredStates = route.params?.onSelectCode1.filter((item) =>
        item.country_code.toLowerCase().includes(text.toLowerCase())
      );
      setState(filteredStates);
    }
  };

  const renderStateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleSelectState(item)}
    >
      <View style={[
        styles.radioCircle, 
        { borderColor: selectedState === item.country_code ? '#007AFF' : '#888' }
      ]}>
        {selectedState === item.country_code && <View style={styles.selectedCircle} />}
      </View>
      <Text style={styles.stateName}>{item.country_code}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Country Code</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
            <Icon name="close" size={24} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {state1.length > 0 && (
        <FlatList
          data={state1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStateItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cancelText: {
    fontSize: 16,
    color: '#888',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingRight: 8, // Padding to prevent the search text from colliding with the cross button
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  clearButton: {
    paddingHorizontal: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  stateName: {
    fontSize: 16,
    color: '#333',
  },
});

export default CountryCodePicker;
