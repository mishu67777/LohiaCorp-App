import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../Components/Header'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { useFocusEffect } from '@react-navigation/native';
import { data } from '../../Components/data'; 

interface ProductListProps {
  navigation: any;
}


const getFirstEntry = (entriesArray: any[]) => {
  let firstEntry: any[] = [];
  if (entriesArray.length > 0 && entriesArray[1].entries && Array.isArray(entriesArray[1].entries.entries)) {
    firstEntry = entriesArray[1].entries.entries;
  }
  return firstEntry;
};

const LoomList: React.FC<ProductListProps> = ({ navigation,route }) => {
  // Get only the first object's entries
  // const entries = getFirstEntry(data["production planning"]);
  const entries = route?.params?.entries;
  // Alert(route?.params?.entries)
  useFocusEffect(
    React.useCallback(() => {
    navigation.closeDrawer()
    }, [navigation])
  );


  const renderItem = ({ item }: { item: { name: string } }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => navigation.navigate('ProductDetail', { name: item })}>
      <Text style={styles.optionText}>{item.name}</Text>
      <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color="#333"
                style={styles.arrow}
              />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={route?.params?.title} navigation={navigation} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Production & Process Calculator</Text>
        <FlatList
          data={entries} // Use the first entry's array
          renderItem={renderItem}
          keyExtractor={(item) => item.name} // Assuming 'name' is unique
          contentContainerStyle={[styles.listContainer, { flexGrow: 1 }]} // Allow FlatList to grow
          showsVerticalScrollIndicator={true} // Enable scroll
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1, 
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
});

export default LoomList;


