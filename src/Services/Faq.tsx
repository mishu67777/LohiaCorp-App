import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Header from '../Components/Header'; 
import {getApi} from '../Service/Api';
import Config from '../Utils/Config';

const { width } = Dimensions.get('window');


const stripHtmlTags = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); 
};

const Faq: React.FC = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<Array<any>>([]);

  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); 
  };

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const res = await getApi(Config.Feq);
        setFaqData(res.faqs);   
      } catch (error) {
        console.error("check_ui check", error);
      }
    };
    fetchFaqData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    
      <Header navigation={navigation} />

      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>FAQs</Text>

        {faqData.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => toggleFAQ(index)}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={activeIndex === index ? 'chevron-down-outline' : 'chevron-forward-outline'}
                size={20}
                color="#333"
                style={styles.icon}
              />
            </View>
            {activeIndex === index && item.answer ? (
              
              <Text style={styles.answer}>{stripHtmlTags(item.answer)}</Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default Faq;
