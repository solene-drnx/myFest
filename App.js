import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { style } from './App_style';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationMenu } from './components/NavigationMenu/NavigationMenu';
import montserratBlack from "./assets/fonts/montserrat_black.ttf";
import montserratMedium from "./assets/fonts/montserrat_medium.ttf";
import { useFonts } from 'expo-font';
import { CardScreen } from './screens/card/CardScreen';
import { PlanningScreen } from './screens/planning/PlanningScreen';
import { ARTISTS, FAV_GENRES_INIT, UTILISATEURS } from './constant';
import { ProfilScreen } from './screens/profil/ProfilScreen';
import LoadingScreen from './screens/loadingScreen/LoadingScreen';
import ConnexionScreen from './screens/connexion/ConnexionScreen';
import InscriptionScreen from './screens/inscription/InscriptionScreen';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";


export default function App() {
  const [isFontLoaded] = useFonts({
    "Montserrat-Black" : montserratBlack,
    "Montserrat-Medium" : montserratMedium,
  });
  const [navSelectionne, setNavSelectionne] = useState("loading"); // Commencez par l'écran de chargement
  const [currentUser, setCurrentUser] = useState(null); // État pour l'utilisateur actuel
  const [artists, setArtists] = useState(ARTISTS);
  const [indexCard, setIndexCard] = useState(0);
  const [genresFav, setGenreFav] = useState(FAV_GENRES_INIT);
  const [users, setUsers] = useState(UTILISATEURS);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Utilisateur connecté
        setCurrentUser(user);
        setNavSelectionne("profil"); // Naviguer vers le profil de l'utilisateur
        //recupererDonneesUtilisateur(user.uid); // Charger les données utilisateur
      } else {
        // Utilisateur non connecté
        setCurrentUser(null);
        setNavSelectionne("connexion"); // Naviguer vers l'écran de connexion
      }
    });
    return () => unsubscribe(); // Nettoyer l'abonnement
  }, []);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      const db = getDatabase();
      const userRef = ref(db, `usersData/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        setIndexCard(userData.indexCard || 0);
        setGenreFav(userData.genresFavoris || FAV_GENRES_INIT);

        const updatedArtists = ARTISTS.map(artist => {
          const score = userData.scores ? userData.scores[artist.nom] : artist.score;
          return { ...artist, score };
        });
        setArtists(updatedArtists);
      } else {
        // Si aucune donnée utilisateur n'existe, utiliser les valeurs par défaut
        setIndexCard(0);
        setGenreFav(FAV_GENRES_INIT);
        setArtists(ARTISTS);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserData(user.uid);
        setNavSelectionne("profil");
      } else {
        setCurrentUser(null);
        setNavSelectionne("connexion");
        // Réinitialiser les états à leurs valeurs par défaut si aucun utilisateur n'est connecté
        setIndexCard(0);
        setGenreFav(FAV_GENRES_INIT);
        setArtists(ARTISTS);
      }
    });

    return () => unsubscribe();
  }, []);
  

  const gestionDesScreens = () => {
    switch (navSelectionne) {
      case "card":
        return <CardScreen indexCard={indexCard} setIndexCard={setIndexCard} setArtists={setArtists} genresFav={genresFav} setGenreFav={setGenreFav} />;
      case "planning":
        return <PlanningScreen artists={artists} genresFav={genresFav} users={users} currentUser={currentUser} />
      case "inscription":
        return <InscriptionScreen setNavSelectionne={setNavSelectionne} />;
      case "connexion":
        return <ConnexionScreen setNavSelectionne={setNavSelectionne} />;
      case "loading":
        return <LoadingScreen />;
      default:
        return <ProfilScreen setNavSelectionne={setNavSelectionne} currentUser={currentUser} />;
    }
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={style.container}>
          {isFontLoaded ? gestionDesScreens() : null}
        </SafeAreaView>
      </SafeAreaProvider>
      {navSelectionne === "connexion" || navSelectionne === "inscription" ? null : <NavigationMenu onPress={setNavSelectionne} navSelectionne={navSelectionne} />}
    </>
  );
}
