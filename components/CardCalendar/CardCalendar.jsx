import { Text, View, Image } from "react-native";
import { style } from "./CardCalendar_style";
import iconClock from "./../../assets/iconClock.png";
import iconLieu from "./../../assets/iconLieu.png";

export function CardCalendar({artist}){
    return (
        <View style={style.container_card_calendar}>
            <View>
                <Text style={style.text_nom_calendar}>{artist.nom}</Text>
                <View style={style.container_infos}>
                    <Image source={iconLieu} style={style.icon_calendar}/>
                    <Text style={style.text_infos}>scène {artist.lieu}</Text>
                </View>
                <View style={style.container_infos}>
                    <Image source={iconClock} style={style.icon_calendar}/>
                    {artist.debut.minute === 0 ? <Text style={style.text_infos}>{artist.debut.heure}h</Text> : <Text style={style.text_infos}>{artist.debut.heure}h{artist.debut.minute}</Text>}
                </View>
            </View>
            <Image source={artist.imageCalendar} style={style.image_calendar}/>
        </View>
    );
};