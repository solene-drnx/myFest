import { style } from "./NavigationMenu_style";
import { Text, TouchableOpacity, View, Image } from "react-native";
import iconCard from "./../../assets/iconCard.png";
import iconPlanning from "./../../assets/iconPlanning.png";
import iconProfil from "./../../assets/iconProfil.png";
import backgroundNavigation from "./../../assets/backgroundNavigation.png";

export function NavigationMenu({onPress, navSelectionne}){
    function styleNavSelectionne(nav){
        return { 
            opacity: nav === navSelectionne ? 1 : 0.5,
        };
    }

    return(
        <View style={style.containerNavigation}>
            <Image source={backgroundNavigation} style={style.image_background}/>
            <View style={style.container_boutons}>
                <TouchableOpacity onPress={()=> onPress("card")}>
                    <Image style={[style.icon, styleNavSelectionne("card")]} source={iconCard}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> onPress("planning")}>
                    <Image style={[style.icon, styleNavSelectionne("planning")]} source={iconPlanning}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> onPress("profil")}>
                    <Image style={[style.icon, styleNavSelectionne("profil")]} source={iconProfil}/>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}