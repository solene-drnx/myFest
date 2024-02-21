import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { getAuth, onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { getDatabase, ref, remove, get, child, update } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import ConnexionScreen from "../connexion/ConnexionScreen";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import { Room } from "../../components/Room/Room";

const auth = getAuth();

export function ProfilScreen({ setNavSelectionne, currentUser, setFestival, setRoom, setIdRoom }) {
    const [user, setUser] = useState(null);

    const deleteUserDataFromDatabase = (userId) => {
        const db = getDatabase();
        // Spécifier le chemin vers les données de l'utilisateur que vous souhaitez supprimer
        const userRef = ref(db, `usersData/${userId}`);
    
        remove(userRef)
            .then(() => {
                console.log("Données utilisateur supprimées avec succès");
                // Ici, vous pouvez également rediriger l'utilisateur ou afficher un message
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression des données utilisateur:", error);
            });
    };

    const deleteUserProfileImage = async (photoURL) => {
        const storage = getStorage();
        // Créer une référence à partir de l'URL de l'image
        const imageRef = storageRef(storage, photoURL);
    
        deleteObject(imageRef)
            .then(() => {
                console.log("Image de profil supprimée avec succès.");
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'image de profil:", error);
            });
    };

    const deleteUserFromRooms = (userId) => {
        const db = getDatabase();
        const roomsRef = ref(db, 'rooms');
    
        get(child(roomsRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                const rooms = snapshot.val();
                Object.keys(rooms).forEach((roomId) => {
                    const room = rooms[roomId];
                    if (room.users && room.users[userId]) {
                        const updates = {};
                        updates[`/rooms/${roomId}/users/${userId}`] = null;
    
                        update(ref(db), updates)
                            .then(() => {
                                console.log(`Utilisateur ${userId} supprimé de la room ${roomId}`);
                            })
                            .catch((error) => {
                                console.error("Erreur lors de la suppression de l'utilisateur de la room:", error);
                            });
                    }
                });
            } else {
                console.log("Aucune room trouvée dans la base de données.");
            }
        }).catch((error) => {
            console.error("Erreur lors de l'accès aux rooms:", error);
        });
    };

    const deleteUserAccount = () => {
        const user = auth.currentUser;
    
        if (user) {
            deleteUserFromRooms(user.uid);
            if (user && user.photoURL) {
                deleteUserProfileImage(user.photoURL);
            }
            deleteUserDataFromDatabase(user.uid);
    
            deleteUser(user).then(() => {
                console.log("Utilisateur supprimé");
            }).catch((error) => {
                console.error("Erreur lors de la suppression de l'utilisateur: ", error);
            });
        } else {
            console.log("Aucun utilisateur connecté");
        }
    };

    const alertSuppressionCompte = () =>
        Alert.alert('Supprimer votre compte', 'Êtes-vous sûr de vouloir supprimer votre compte', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { 
                text: 'Supprimer', 
                onPress: deleteUserAccount,
                style: 'destructive',
            },
        ]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
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
        <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {user.photoURL ? (
                    <Image
                        source={{ uri: user.photoURL }}
                        style={{ width: 150, height: 150, borderRadius: 100, marginBottom: 10 }}
                    />
                ) : (
                    <Text>No profile picture</Text>
                )}
                <Text style={{ fontFamily: "Montserrat-Black", fontSize: 24, color: "#F57C33", marginHorizontal: 40, marginBottom: 20 }}>Hello {user.displayName || user.email || "User"} 👋</Text>
                <View style={{ borderWidth: 5, borderColor: "rgba(245, 124, 51, 0.2)", borderRadius: 20, marginHorizontal: 20, padding: 10, paddingBottom: 10, paddingBottom: 20, zIndex: 2 }}>
                    <Text style={{ fontFamily: "Montserrat-Black", fontSize: 18, marginLeft: 20, color: "#F57C33" }}>Je festivale solo </Text>
                    <DropdownMenu setFestival={setFestival} setRoom={setRoom} />
                </View>
                <View style={{ borderWidth: 5, borderColor: "rgba(245, 124, 51, 0.2)", borderRadius: 20, marginHorizontal: 20, padding: 10, paddingBottom: 20, marginTop: 10 }}>
                    <Room userId={user.uid} setRoom={setRoom} setIdRoom={setIdRoom} setFestival={setFestival} user={user} />
                </View>
                {/*<Text style={{fontFamily: "Montserrat-Medium", marginTop: 20, marginHorizontal: 40}}>Pour démarrer, direction l'onglet 'Cards' situé en bas à gauche, et amusez-vous à swiper quelques cartes.</Text>
            <Text style={{fontFamily: "Montserrat-Medium", marginTop: 15, marginHorizontal: 40}}>Ensuite, faites un petit tour dans l'onglet du milieu pour découvrir le programme qu'on vous a concocté sur mesure.</Text> */}
                <TouchableOpacity onPress={signOutUser} style={{ backgroundColor: "#F57C33", paddingVertical: 15, paddingHorizontal: 25, borderRadius: 5, marginTop: 20 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#FDF4EB" }}>déconnection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 20, marginVertical: 10, opacity: 0.5}} onPress={alertSuppressionCompte}>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12}}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}