import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ConnexionScreen from "../connexion/ConnexionScreen";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";

const auth = getAuth();

export function ProfilScreen({ setNavSelectionne, currentUser, setFestival }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const signOutUser = () => {
        signOut(auth).catch((error) => console.log(error));
    };

    if (!user) {
        return <ConnexionScreen setNavSelectionne={setNavSelectionne} />;
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
            {user.photoURL ? (
                <Image
                    source={{ uri: user.photoURL }}
                    style={{ width: 150, height: 150, borderRadius: 100, marginBottom: 20}} 
                />
            ) : (
                <Text>No profile picture</Text> 
            )}
            <Text style={{fontFamily: "Montserrat-Black", fontSize: 24, color: "#F57C33", marginHorizontal: 40}}>Hello {user.displayName || user.email || "User"} 👋</Text>
            <DropdownMenu setFestival={setFestival}/>
            <Text style={{fontFamily: "Montserrat-Medium", marginTop: 40, marginHorizontal: 40}}>Bienvenue sur MyFest, l'application pour vos festivals !</Text>
            <Text style={{fontFamily: "Montserrat-Medium", marginTop: 20, marginHorizontal: 40}}>Pour démarrer, direction l'onglet 'Cards' situé en bas à gauche, et amusez-vous à swiper quelques cartes.</Text>
            <Text style={{fontFamily: "Montserrat-Medium", marginTop: 20, marginHorizontal: 40}}>Ensuite, faites un petit tour dans l'onglet du milieu pour découvrir le programme qu'on vous a concocté sur mesure.</Text>
            <TouchableOpacity onPress={signOutUser} style={{backgroundColor: "#F57C33", paddingVertical: 15, paddingHorizontal: 25, borderRadius: 5, marginTop: 40}}>
                <Text style={{fontFamily: "Montserrat-Medium", color: "#FDF4EB"}}>déconnection</Text>
            </TouchableOpacity>
        </View>
    );
}
