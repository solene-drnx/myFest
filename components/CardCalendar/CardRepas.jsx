import { Text, View, Image } from "react-native";
import { style } from "./CardRepas_style";
import iconClockVert from "./../../assets/iconClockVert.png";
import repasImg from "./../../assets/repas.png";

export function CardRepas(){
    return (
        <View style={style.container_card_calendar}>
            <View>
                <Text style={style.text_nom_calendar}>pause repas</Text>
                <View style={style.container_infos}>
                    <Text style={style.text_infos}>pause stratégique</Text>
                </View>
                <View style={style.container_infos}>
                    <Image source={iconClockVert} style={style.icon_calendar}/>
                    <Text style={style.text_infos}>19h00</Text>
                </View>
            </View>
            <Image source={repasImg} style={style.image_calendar}/>
        </View>
    );
};