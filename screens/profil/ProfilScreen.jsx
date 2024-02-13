import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ConnexionScreen from "../connexion/ConnexionScreen";

const auth = getAuth(); // Assurez-vous que ceci est bien importé de votre configuration Firebase

export function ProfilScreen({ setNavSelectionne }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Utilisateur connecté, mettez à jour l'état de l'utilisateur avec les nouvelles données
                setUser({
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL, // Ajoutez l'URL de la photo de profil
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
        // Si aucun utilisateur n'est connecté, afficher le ConnexionScreen ou un bouton de connexion
        return <ConnexionScreen setNavSelectionne={setNavSelectionne} />;
    }

    // Affiche les informations de l'utilisateur, y compris la photo de profil, et un bouton de déconnexion
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {user.photoURL ? (
                <Image
                    source={{ uri: user.photoURL }}
                    style={{ width: 100, height: 100, borderRadius: 50 }} // Style pour rendre l'image ronde
                />
            ) : (
                <Text>No profile picture</Text> // Fallback si aucune photo de profil n'est disponible
            )}
            <Text>Hello, {user.displayName || user.email || "User"}!</Text>
            <Button title="Sign Out" onPress={signOutUser} />
        </View>
    );
}
