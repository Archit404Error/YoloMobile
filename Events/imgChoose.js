import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { handleImgRejection } from '../Helpers/permissionHelperFuncs';
import * as ImagePicker from 'expo-image-picker';
import Context from '../Context/context';

const windowHeight = Dimensions.get('window').height;

export default () => {
  const [image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/eventapp-73ba7.appspot.com/o/image_placeholder.jpg?alt=media&token=6d0dba9a-eae6-41cf-9c38-471521e0d2c2");
  const [imgHt, setImgHt] = useState(300);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }, []);


  const pickImage = async (context) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.25,
    });

    if (!result.cancelled) {
      setImgHt(windowHeight / 1.5);
      setImage(result.uri);
      context.createEventImage(result.uri);
    }
  };


  return (
    <Context.Consumer>
      {context =>
        <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', width: '100%', alignItems: 'center', padding: 10 }}
            onPress={async () => {
              if ((await Camera.requestCameraPermissionsAsync()).status !== "denied")
                pickImage(context)
              else
                handleImgRejection()
            }}
          >
            <Text style={{ color: '#2d6ff4' }}>Add Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: '100%', height: imgHt }} />}
        </View>
      }
    </Context.Consumer>
  );

}