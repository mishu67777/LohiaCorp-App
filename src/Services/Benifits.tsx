import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';
import Header from '../Components/Header'; 
import { aboutUsAndBenefits } from '../Service/Api';
import Config from '../Utils/Config';
import RenderHtml from 'react-native-render-html';

const { width } = Dimensions.get('window');

const Benefits: React.FC = ({ navigation }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const data = "benefits";
        const res = await aboutUsAndBenefits(Config.Content, data);
        setHtmlContent(res?.content?.description || ''); // Ensure there's a default value if content is empty
      } catch (error) {
        console.error("Error fetching benefits:", error);
      }
    };

    fetchBenefits();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Benefits</Text>

        <RenderHtml
          contentWidth={width}
          source={{ html: htmlContent }}
          baseStyle={styles.htmlContent}
          tagsStyles={tagsStyles}
        />
      </ScrollView>
    </View>
  );
};

const tagsStyles = {
  p: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginVertical: 10,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  a: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Maintain aspect ratio
  },
  ul: {
    marginVertical: 10,
  },
  li: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginVertical: 5,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  htmlContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default Benefits;
