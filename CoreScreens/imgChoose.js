import React, { useState, useEffect } from 'react';
import { Text, Image, View, Platform, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const windowHeight = Dimensions.get('window').height;

export default ({ title, description, location, tags, other, navigation }) => {
  const [image, setImage] = useState("https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg");
  const [imgHt, setImgHt] = useState(300);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Need permission');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImgHt(windowHeight / 1.5);
      setImage(result.uri);
    }
  };

  return (
    <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style = {{ backgroundColor: 'white', width: '100%', alignItems: 'center', padding: 10 }} onPress={pickImage}>
        <Text style = {{ color: '#2d6ff4' }}>Add Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: '100%', height: imgHt }} />}
      <TouchableOpacity 
        style = {{ backgroundColor: 'white', width: '100%', alignItems: 'center', marginTop: 10, padding: 10 }} 
        onPress={() => { navigation.navigate("Preview Event", { title: title, desc: description, img: image, loc: location, tags: tags, other: other }) }}
      >
        <Text style = {{ color: '#2d6ff4' }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}