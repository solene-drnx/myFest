import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Dialog from 'react-native-dialog';

export default function ConnexionScreen({ setNavSelectionne }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleConnexion = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setNavSelectionne("profil");
            })
            .catch(error => setErrorMessage(error.message));
    };

    const handlePasswordReset = async () => {
        if (email === '') {
            Alert.alert("Erreur", "Veuillez d'abord saisir votre adresse e-mail.");
            setDialogVisible(false);
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Succès", "Vérifiez votre boîte mail pour le lien de réinitialisation.");
        } catch (error) {
            Alert.alert("Erreur", "Impossible d'envoyer l'email de réinitialisation.");
        }
        setDialogVisible(false);
    };

    return (
        <View style={style.container}>
            <Text style={style.greeting}>{"Connecte-toi pour commencer 🪩🕺"}</Text>
            <View style={style.errorMessage}>
                {errorMessage && <Text style={style.error}>{errorMessage}</Text>}
            </View>

            <View style={style.form}>
                <View>
                    <Text style={style.inputTitle}>Adresse mail</Text>
                    <TextInput
                        style={style.input}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>
                <View style={{ marginTop: 32 }}>
                    <Text style={style.inputTitle}>Mot de passe</Text>
                    <TextInput
                        style={style.input}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>
            </View>

            <TouchableOpacity onPress={() => setDialogVisible(true)}>
                <Text style={style.texte_mdp}>Mot de passe oublié</Text>
            </TouchableOpacity>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Réinitialiser le mot de passe</Dialog.Title>
                <Dialog.Description>
                    Entrez votre adresse e-mail pour réinitialiser votre mot de passe.
                </Dialog.Description>
                <Dialog.Input onChangeText={setEmail} value={email} />
                <Dialog.Button label="Annuler" onPress={() => setDialogVisible(false)} />
                <Dialog.Button label="Envoyer" onPress={handlePasswordReset} />
            </Dialog.Container>

            <TouchableOpacity style={style.button} onPress={handleConnexion}>
                <Text style={{ color: "#FDF4EB", fontFamily: "Montserrat-Medium" }}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => setNavSelectionne("inscription")}>
                <Text style={{ color: "#414959", fontSize: 13, fontFamily: "Montserrat-Medium" }}>
                    Nouveau sur myFest ? <Text style={{ color: "#F57C33" }}>Inscription</Text>
                </Text>
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
        fontSize: 22,
        marginHorizontal: 20,
        fontFamily: "Montserrat-Black",
        textAlign: "center",
        color: "#F57C33"
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
    texte_mdp: {
        color: "#F57C33", 
        fontFamily: "Montserrat-Medium", 
        textAlign: "center",
        marginBottom: 20,
    }
});
