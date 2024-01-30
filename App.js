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
          <View style={style.container_section_card}>
            <View style={style.container_swiper}>
              <Swiper
                cards={ARTISTS}
                renderCard={(artist) => (
                  <ImageBackground source={artist.image} imageStyle={style.imageBackground}>
                    <View style={style.card}>
                      <Text style={style.textCard}>{artist.nom}</Text>
                      <Text style={style.taglineCard}>{artist.genre.join(' - ')}</Text>
                    </View>
                  </ImageBackground>
                )}
                onSwiped={(cardIndex) => {console.log(cardIndex)}}
                onSwipedAll={() => {console.log('onSwipedAll')}}
                cardIndex={0}
                stackSize={3}
                overlayLabels={{

                }}
              />
            </View>
            <View style={style.container_boutons}>
              <TouchableOpacity>
                <Text style={style.smileyBoutonCard} >🤔</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={style.iconBoutonCard} source={iconCroix}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={style.iconBoutonCard} source={iconCoeur}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={style.smileyBoutonCard} >🤩</Text>
              </TouchableOpacity>
            </View>
          </View>
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
