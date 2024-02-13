import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from "expo-file-system";


function InscriptionScreen({ setNavSelectionne }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        // no permissions request is necessary for launching the image library
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

    const handleInscription = () => {
        const { name, email, password } = user;
    
        // Vérifiez si une image a été sélectionnée.
        if (image != null) {
            uploadImageAsync(image)
                .then(downloadURL => {
                    // L'image a été uploadée et vous avez l'URL, vous pouvez maintenant créer l'utilisateur.
                    createUser(email, password, name, downloadURL);
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage("Erreur lors de l'upload de l'image.");
                });
        } else {
            // Aucune image n'a été sélectionnée, continuez avec la création de l'utilisateur sans image.
            createUser(email, password, name);
        }
    };
    
    const uploadImageAsync = async (uri) => {
        setUploading(true);
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const blob = await (await fetch(uri)).blob();
        const storage = getStorage();
        const imageRef = storageRef(storage, `images/${filename}`);
    
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        setUploading(false);
        return downloadURL;
    };
    
    const createUser = (email, password, name, photoURL = null) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                updateProfile(user, {
                    displayName: name,
                    ...(photoURL && { photoURL }) // Ajoute l'URL de la photo de profil si disponible.
                }).then(() => {
                    console.log('Profile updated!');
                    setNavSelectionne("profil");
                }).catch(error => {
                    console.error(error);
                    setErrorMessage(error.message);
                });
            })
            .catch(error => {
                console.error(error);
                setErrorMessage(error.message);
            });
    };

    return (
        <View style={style.container}>
            <Text style={style.greeting}>{"Hello 👋\n Inscris toi pour commencer"}</Text>

            <View style={style.errorMessage}>
                {errorMessage && <Text style={style.error}>{errorMessage}</Text>}
            </View>

            <View style={style.container_imagePicker}>
            <TouchableOpacity style={style.selectButton} onPress={pickImage}>
                <Ionicons
                    name="add"
                    size={40}
                    color="#FFF">

                </Ionicons>
            </TouchableOpacity>
            <View style={style.imageContainer}>
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginTop: -100 }} />}
            </View>
        </View>

            <View style={style.form}>
                <View>
                    <Text style={style.inputTitle}>Prénom</Text>
                    <TextInput
                        style={style.input}
                        autoCapitalize="none"
                        onChangeText={name => setUser({ ...user, name })}
                        value={user.name}
                    />
                </View>
                <View style={{ marginTop: 32 }}>
                    <Text style={style.inputTitle}>Adresse mail</Text>
                    <TextInput
                        style={style.input}
                        autoCapitalize="none"
                        onChangeText={email => setUser({ ...user, email })}
                        value={user.email}
                    />
                </View>
                <View style={{ marginTop: 32 }}>
                    <Text style={style.inputTitle}>Mot de passe</Text>
                    <TextInput
                        style={style.input}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={password => setUser({ ...user, password })}
                        value={user.password}
                    />
                </View>
            </View>

            <TouchableOpacity style={style.button} onPress={handleInscription}>
                <Text style={{ color: "#FDF4EB", fontFamily: "Montserrat-Medium" }}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => setNavSelectionne("connexion")}>
                <Text style={{ color: "#414959", fontSize: 13, fontFamily: "Montserrat-Medium" }}>Tu as déjà un compte ?<Text style={{ color: "#F57C33" }}> Connexion</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontFamily: "Montserrat-Black",
        textAlign: "center",
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
    },
    error: {
        color: "#E94464",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase",
        fontFamily: "Montserrat-medium",
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#F57C33",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    container_imagePicker: {
        marginTop: -40,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    selectButton: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    imageContainer: {
        alignItems: "center",
    }
});

export default InscriptionScreen;