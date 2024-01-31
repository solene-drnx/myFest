import { Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useState } from "react";
import { style } from './App_style';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationMenu } from './components/NavigationMenu/NavigationMenu';
import Swiper from 'react-native-deck-swiper';
import { ARTISTS, LIEUX, GENRES } from './constant';
import montserratBlack from "./assets/fonts/montserrat_black.ttf";
import montserratMedium from "./assets/fonts/montserrat_medium.ttf";
import { useFonts } from 'expo-font';
import iconCroix from "./assets/iconCroix.png";
import iconCoeur from "./assets/iconCoeur.png";
import { CardScreen } from './screens/card/CardScreen';

export default function App() {
  const [isFontLoaded] = useFonts({
    "Montserrat-Black" : montserratBlack,
    "Montserrat-Medium" : montserratMedium,
  });
  const [navSelectionne, setNavSelectionne] = useState("card");

  const gestionDesScreens = () => {
    switch (navSelectionne) {
      case "card":
        return (
          <CardScreen></CardScreen>
        );
      case "planning":
        return <Text>Ceci est l'écran de planning</Text>;
      default:
        return <Text>Ceci est l'écran de profil</Text>;
    }
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={style.container}>
          {isFontLoaded ? gestionDesScreens() : null} 
        </SafeAreaView>
      </SafeAreaProvider>
      <NavigationMenu onPress={setNavSelectionne} navSelectionne={navSelectionne}/>
    </>
  );
}
