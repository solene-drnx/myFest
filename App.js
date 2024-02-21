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
import { ARTISTS, FAV_GENRES_INIT, FESTIVALS, UTILISATEURS } from './constant';
import { ProfilScreen } from './screens/profil/ProfilScreen';
import LoadingScreen from './screens/loadingScreen/LoadingScreen';
import ConnexionScreen from './screens/connexion/ConnexionScreen';
import InscriptionScreen from './screens/inscription/InscriptionScreen';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";


export default function App() {
  const [isFontLoaded] = useFonts({
    "Montserrat-Black": montserratBlack,
    "Montserrat-Medium": montserratMedium,
  });

  const [navSelectionne, setNavSelectionne] = useState("loading");
  const [currentUser, setCurrentUser] = useState(null);
  const [artists, setArtists] = useState(ARTISTS);
  const [indexCard, setIndexCard] = useState(0);
  const [genresFav, setGenreFav] = useState(FAV_GENRES_INIT);
  const [users, setUsers] = useState(UTILISATEURS);
  const [festival, setFestival] = useState(FESTIVALS.weLoveGreen2023);
  const [room, setRoom] = useState(false);
  const [idRoom, setIdRoom] = useState();

  // Changement d'utilisateur
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setNavSelectionne("profil");
      } else {
        setCurrentUser(null);
        setNavSelectionne("connexion");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setNavSelectionne("profil");
      } else {
        setCurrentUser(null);
        setNavSelectionne("connexion");
        setIndexCard(0);
        setGenreFav(FAV_GENRES_INIT);
        setArtists(ARTISTS);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const resetOrFetchUserData = async () => {
      if (currentUser) {
        const db = getDatabase();
        const userRef = ref(db, `usersData/${currentUser.uid}/${festival.db}`);
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
          setIndexCard(0);
          setGenreFav(FAV_GENRES_INIT);
          setArtists(ARTISTS.map(artist => ({ ...artist, score: artist.score })));
        }
      } else {
        setIndexCard(0);
        setGenreFav(FAV_GENRES_INIT);
        setArtists(ARTISTS.map(artist => ({ ...artist, score: artist.score })));
      }
    }; 

    const resetOrFetchIndex = async () => {
      if (currentUser) {
        const db = getDatabase();
        const userRef = ref(db, `usersData/${currentUser.uid}/${festival.db}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setIndexCard(userData.indexCard || 0);
        } else {
          setIndexCard(0);
        }
      } else {
        setIndexCard(0);
      }
    }; 

    const resetOrFetchMultyUser = async () => {
      if (currentUser) {
        const db = getDatabase();
        const userRef = ref(db, `rooms/${idRoom}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const updatedArtists = ARTISTS.map(artist => {
            const score = userData.artists ? userData.artists[artist.nom] : artist.score;
            return { ...artist, score };
          });
          setArtists(updatedArtists);
        } else {
          setArtists(ARTISTS.map(artist => ({ ...artist, score: artist.score })));
        }
      } else {
        setArtists(ARTISTS.map(artist => ({ ...artist, score: artist.score })));
      }
    }; 

    const updateGenresFavForRoom = async () => {
      if (currentUser) {
        const db = getDatabase();
        const roomRef = ref(db, `rooms/${idRoom}/users`);
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
          const usersInRoom = snapshot.val();
          const genresFavTotals = {};
          for (const userId of Object.keys(usersInRoom)) {
            const userGenresFavRef = ref(db, `usersData/${userId}/${festival.db}/genresFavoris`);
            const userGenresFavSnapshot = await get(userGenresFavRef);
            if (userGenresFavSnapshot.exists()) {
              const userGenresFav = userGenresFavSnapshot.val();
              for (const genre in userGenresFav) {
                if (genresFavTotals[genre]) {
                  genresFavTotals[genre] += userGenresFav[genre];
                } else {
                  genresFavTotals[genre] = userGenresFav[genre];
                }
              }
            }
          }
          const roomGenresFavRef = ref(db, `rooms/${idRoom}/genresFav`);
          await set(roomGenresFavRef, genresFavTotals);
        }
      }
    };
    

    if (room === false) {
      resetOrFetchUserData();
    } else {
      resetOrFetchIndex();
      resetOrFetchMultyUser();
      updateGenresFavForRoom();
    }
    
  }, [festival, currentUser, idRoom]);

  const gestionDesScreens = () => {
    // Si pas de festival sélectionné ou si pas de room sléctionnée 
    if ((!festival || !festival.nom) && room === false) {
      switch (navSelectionne) {
        case "profil":
          return <ProfilScreen setNavSelectionne={setNavSelectionne} currentUser={currentUser} setFestival={setFestival} setRoom={setRoom} setIdRoom={setIdRoom} />;
        case "inscription":
          return <InscriptionScreen setNavSelectionne={setNavSelectionne} />;
        case "connexion":
          return <ConnexionScreen setNavSelectionne={setNavSelectionne} />;
        case "loading":
          return <LoadingScreen />;
        case "card":
          return (
            <View style={style.messageContainer}>
              <Text style={style.messageText}>Veuillez sélectionner un festival ou une room dans votre profil pour commencer !</Text>
            </View>
          );
        default:
          return (
            <View style={style.messageContainer}>
              <Text style={style.messageText}>Veuillez sélectionner un festival ou une room dans votre profil pour commencer !</Text>
            </View>
          );
      }
    } else {
      switch (navSelectionne) {
        case "card":
          return <CardScreen indexCard={indexCard} setIndexCard={setIndexCard} setArtists={setArtists} genresFav={genresFav} setGenreFav={setGenreFav} festival={festival} room={room} idRoom={idRoom} artists={artists}/>;
        case "planning":
          return <PlanningScreen artists={artists} genresFav={genresFav} users={users} currentUser={currentUser} festival={festival} room={room} idRoom={idRoom} setArtists={setArtists}/>
        case "inscription":
          return <InscriptionScreen setNavSelectionne={setNavSelectionne} />;
        case "connexion":
          return <ConnexionScreen setNavSelectionne={setNavSelectionne} />;
        case "loading":
          return <LoadingScreen />;
        default:
          return <ProfilScreen setNavSelectionne={setNavSelectionne} currentUser={currentUser} setFestival={setFestival} setRoom={setRoom} setIdRoom={setIdRoom} />;
      }
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