import React, { useState, useEffect } from 'react';
import { Text, Image, View, Platform, TouchableOpacity, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import uuid from 'uuid';

const windowHeight = Dimensions.get('window').height;

export default () => {
  const [image, setImage] = useState("https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg");
  const [imgHt, setImgHt] = useState(300);

  useEffect(() => {
    (async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
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
      uploadImageAsync(result.uri);
    }
  };

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
  
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
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