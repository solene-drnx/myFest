import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ConnexionScreen from "../connexion/ConnexionScreen";

const auth = getAuth();

export function ProfilScreen({ setNavSelectionne }) {
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
                    style={{ width: 150, height: 150, borderRadius: 100, marginBottom: 40}} 
                />
            ) : (
                <Text>No profile picture</Text> 
            )}
            <Text style={{fontFamily: "Montserrat-Black", fontSize: 24}}>Hello {user.displayName || user.email || "User"} 👋</Text>
            <Text style={{fontFamily: "Montserrat-Medium", marginTop: 20,}}>Bienvenue sur MyFest, l'application pour vos festivals !</Text>
            <Button title="Sign Out" onPress={signOutUser} />
        </View>
    );
}
