import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';  

const SearchAddress = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const navigation = useNavigation(); 
  const route = useRoute();  
  const [state1, setState] = useState([]); // List of all states
  const [filteredState, setFilteredState] = useState([]); // Filtered states based on search

  useEffect(() => {
    if (route.params?.currentSelectedState) {
      setSelectedState(route.params.currentSelectedState);
    }
  }, [route.params?.currentSelectedState]);

  useEffect(() => {
    if (route.params?.country) {
      setState(route.params?.country);
      setFilteredState(route.params?.country); // Initialize filtered state with the full list
    }
  }, [route.params?.country]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredState(state1); // Reset to full list if search is cleared
    } else {
      const filtered = state1.filter(item => 
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredState(filtered); // Update the filtered list based on search
    }
  };

  const handleSelectState = (state) => {
    setSelectedState(state.name);
    navigation.navigate('ProfileEdit', { selectedState: state });
  };

  const renderStateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleSelectState(item)}
    >
      <View style={[
        styles.radioCircle, 
        { borderColor: selectedState === item.name ? '#007AFF' : '#888' }
      ]}>
        {selectedState === item.name && <View style={styles.selectedCircle} />}
      </View>
      <Text style={styles.stateName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select State</Text>
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

      <FlatList
        data={filteredState}
        keyExtractor={(item) => item.name} // Assuming 'name' is unique
        renderItem={renderStateItem}
        showsVerticalScrollIndicator={false}
      />
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
    paddingRight: 8, 
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

export default SearchAddress;
