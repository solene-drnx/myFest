import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get('window')

export const style = StyleSheet.create({
    container_card_calendar:{
        flexDirection: "row",
        borderWidth: 5,
        width: 350,
        padding: 5,
        borderColor: "rgba(69, 61, 65, 0.6)",
        justifyContent: "space-between",
        borderRadius: 10,
        margin: 5,
    },
    image_calendar: {
        width: 150,
        height: 100,
        borderRadius: 8
    },
    text_nom_calendar: {
        fontFamily: "Montserrat-Black",
        color: "#453D41",
        fontSize: 24,
        width: 180,
        lineHeight: 23,
        marginVertical: 5,
    },
    container_infos: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon_calendar: {
        width: 20,
        height: 20,
        marginRight: 5,
    }, 
    text_infos: {
        fontFamily: "Montserrat-Medium",
        color: "#453D41",
        fontSize: 14,
    }, 
    image_user: {
        width: 17,
        height: 17,
        borderRadius: 100,
        marginLeft: 2,
        marginTop: 2,
    }
});