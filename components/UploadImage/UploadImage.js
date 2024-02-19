import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase"; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from "expo-file-system";

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (image == null) {
            return;
        }
        const uri = image;
        setUploading(true);
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const storage = getStorage();
        const blob = await (await fetch(uri)).blob();
        const imageRef = storageRef(storage, `images/${filename}`); 

        uploadBytes(imageRef, blob)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
                console.log(`File available at: ${downloadURL}`);
                setUploading(false);
                Alert.alert('Image uploaded!');
                setImage(null);
            })
            .catch((error) => {
                console.error(error);
                setUploading(false);
                Alert.alert('Upload failed, please try again.');
            });
    };


    return (
        <View style={style.container}>
            <TouchableOpacity style={style.selectButton} onPress={pickImage}>
                <Ionicons
                    name="add"
                    size={40}
                    color="#FFF">

                </Ionicons>
            </TouchableOpacity>
            <View style={style.imageContainer}>
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginTop: -100 }} />}
                <TouchableOpacity style={style.uploadButton} onPress={uploadImage}>
                    <Text style={style.buttonText}>UploadImage</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UploadImage;

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    selectButton: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    imageContainer: {
        marginBottom: 50,
        alignItems: "center",
    }
});