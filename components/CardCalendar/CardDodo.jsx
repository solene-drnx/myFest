import { Text, View, Image } from "react-native";
import { style } from "./CardDodo_style";
import iconClockBleu from "./../../assets/iconClockBleu.png";
import dodoImg from "./../../assets/dodo.png";

export function CardDodo({ fin }) { 
    return (
        <View style={style.container_card_calendar}>
            <View>
                <Text style={style.text_nom_calendar}>fin de journée</Text>
                <View style={style.container_infos}>
                    <Text style={style.text_infos}>au dodo annick</Text>
                </View>
                <View style={style.container_infos}>
                    <Image source={iconClockBleu} style={style.icon_calendar}/>
                    <Text style={style.text_infos}>{fin?.heure ?? '00'}h{fin?.minute ?? '00'}</Text>
                </View>
            </View>
            <Image source={dodoImg} style={style.image_calendar}/>
        </View>
    );
};
