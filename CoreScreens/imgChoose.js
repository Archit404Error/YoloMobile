import React, { useState, useEffect } from 'react';
import { Text, Image, View, Platform, TouchableOpacity, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

const windowHeight = Dimensions.get('window').height;

export default () => {
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
      /*
      uploadImage()
      .then(() => Alert.alert("success!"))
      .catch((error) => Alert.alert(error)) 
      */
    }
  };

  const uploadImage = async () => {
    const res = await fetch(image);
    const blob = await res.blob();

    var ref = firebase.storage().ref().child("images/test" + image);
    return ref.put(blob);
  }

  return (
    <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style = {{ backgroundColor: 'white', width: '100%', alignItems: 'center', padding: 10 }} onPress={pickImage}>
        <Text style = {{ color: '#2d6ff4' }}>Add Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: '100%', height: imgHt }} />}
    </View>
  );
}