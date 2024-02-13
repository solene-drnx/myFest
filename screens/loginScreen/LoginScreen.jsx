import React, { useEffect, useState } from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({setNavSelectionne}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setNavSelectionne("card");
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Reggistered with:", user.email);
            })
            .catch(error => alert(error.message));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("logged in with:", user.email);
            })
            .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView
            style={style.container}
            behavior="padding"
        >
            <View style= {style.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value = {email}
                    onChangeText={text => setEmail(text)}
                    style= {style.input}
                />
                <TextInput
                    placeholder="Password"
                    value = {password}
                    onChangeText={text => setPassword(text)}
                    style= {style.input}
                    secureTextEntry
                />
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={style.button}
                >
                    <Text style={style.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[style.button, style.buttonOutline]}    
                >
                    <Text style={style.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }, 
    inputContainer:{
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15, 
        borderRadius: 10,
        alignItems: "center",
    }, 
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    }
})