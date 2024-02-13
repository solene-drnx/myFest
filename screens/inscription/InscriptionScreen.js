import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default class InscriptionScreen extends React.Component {
    state = {
        user: {
            name: "",
            email: "",
            password: "",
            avatar: null,
        },
        errorMessage: null,
    };

    componentDidMount() {
        this.getCameraPermission();
    }

    getCameraPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    handlePickAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    }

    handleInscription = () => {
        const { name, email, password } = this.state.user;

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                this.uploadAvatar(userCredentials.user);
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
            });
    };

    uploadAvatar = async (user) => {
        const { avatar, name } = this.state.user;
        if (avatar) {
            const response = await fetch(avatar);
            const blob = await response.blob();
            const storage = getStorage();
            const storageRef = ref(storage, `avatars/${user.uid}`);
            uploadBytes(storageRef, blob).then(snapshot => {
                getDownloadURL(snapshot.ref).then(downloadURL => {
                    updateProfile(user, {
                        displayName: name,
                        photoURL: downloadURL
                    }).then(() => {
                        console.log('Profile updated!');
                        this.props.setNavSelectionne("profil");
                    });
                });
            }).catch(error => {
                console.error("Error uploading avatar: ", error);
                this.setState({ errorMessage: error.message });
            });
        } else {
            updateProfile(user, {
                displayName: name,
            }).then(() => {
                console.log('Profile updated without avatar!');
                this.props.setNavSelectionne("profil");
            });
        }
    };
    render() {
        return (
            <View style={style.container}>
                <Text style={style.greeting}>{"Hello 👋\n Inscris toi pour commencer"}</Text>
                <TouchableOpacity style={style.avatarPlaceholder} onPress={this.handlePickAvatar}>
                    <Image source={{ uri: this.state.user.avatar }} style={style.avatar} />
                    <Ionicons
                        name="add"
                        size={40}
                        color="#FFF">

                    </Ionicons>
                </TouchableOpacity>

                <View style={style.errorMessage}>
                    {this.state.errorMessage && <Text style={style.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={style.form}>
                    <View>
                        <Text style={style.inputTitle}>Prénom</Text>
                        <TextInput
                            style={style.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        />

                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={style.inputTitle}>Adresse mail</Text>
                        <TextInput
                            style={style.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}>
                        </TextInput>
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={style.inputTitle}>Mot de passe</Text>
                        <TextInput
                            style={style.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        >
                        </TextInput>
                    </View>
                </View>

                <TouchableOpacity style={style.button} onPress={this.handleInscription}>
                    <Text style={{ color: "#FDF4EB", fontFamily: "Montserrat-Medium" }}>S'inscrire</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => this.props.setNavSelectionne("connexion")}>
                    <Text style={{ color: "#414959", fontSize: 13, fontFamily: "Montserrat-Medium" }}>Tu as déjà un compte ?<Text style={{ color: "#F57C33" }}> Connexion</Text></Text>
                </TouchableOpacity>
            </View>

        )
    }
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
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})