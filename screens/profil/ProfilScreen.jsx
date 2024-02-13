import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ConnexionScreen from "../connexion/ConnexionScreen";
import UploadImage from "../../components/UploadImage/UploadImage";

const auth = getAuth(); // Assurez-vous que ceci est bien importé de votre configuration Firebase

export function ProfilScreen({ setNavSelectionne }) {
    /* const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Utilisateur connecté
                setUser({
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                });
            } else {
                // Utilisateur non connecté
                setUser(null);
            }
        });

        // Nettoyage de l'abonnement à onAuthStateChanged lors du démontage du composant
        return () => unsubscribe();
    }, []);

    const signOutUser = () => {
        signOut(auth).catch((error) => console.log(error));
    };

    if (!user) {
        // Si aucun utilisateur n'est connecté, on pourrait rediriger vers le ConnexionScreen
        // ou simplement afficher un bouton de connexion.
        return <ConnexionScreen setNavSelectionne={setNavSelectionne} />;
    }

    // Affiche les informations de l'utilisateur et un bouton de déconnexion si un utilisateur est connecté
    return (
        <View>
            <Text>Hello, {user.email || "User"}!</Text>
            <Button title="Sign Out" onPress={signOutUser} />
        </View>
    );
    */
    return(
        <UploadImage/>
    );
}
