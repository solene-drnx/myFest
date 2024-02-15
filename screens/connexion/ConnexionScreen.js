import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default class ConnexionScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null,
    };

    handleConnexion = () => {
        const { email, password } = this.state;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                this.props.setNavSelectionne("profil"); 
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <View style={style.container}>
                <Text style={style.greeting}>{"Connecte-toi pour commencer 🪩🕺"}</Text>
                <View style={style.errorMessage}>
                    {this.state.errorMessage && <Text style={style.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={style.form}>
                    <View>
                        <Text style={style.inputTitle}>Adresse mail</Text>
                        <TextInput 
                            style={style.input} 
                            autoCapitalize="none" 
                            onChangeText={email => this.setState({email})} 
                            value={this.state.email}
                        /> 
                    </View>
                    <View style={{marginTop: 32}}>
                        <Text style={style.inputTitle}>Mot de passe</Text>
                        <TextInput 
                            style={style.input} 
                            secureTextEntry 
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>
                </View> 

                <TouchableOpacity style={style.button} onPress={this.handleConnexion}>
                    <Text style={{color: "#FDF4EB", fontFamily: "Montserrat-Medium"}}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => this.props.setNavSelectionne("inscription")}>
                    <Text style={{color: "#414959", fontSize: 13, fontFamily: "Montserrat-Medium"}}>Nouveau sur myFest ? <Text style={{color: "#F57C33"}}>Inscription</Text></Text>
                </TouchableOpacity>
            </View>
        );
    }
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
    }
});