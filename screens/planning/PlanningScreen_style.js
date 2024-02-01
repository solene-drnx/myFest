import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container_dates: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    container_festival: {
        flexDirection:"column", 
        paddingLeft: 20
    }, 
    text_festival : {
        fontFamily: "Montserrat-Black", 
        color: "#F57C33",
        fontSize: 28,
    }, 
    dates: {
        flexDirection:"row", 
        paddingRight: 20
    },
    text_jour_mois: {
        fontFamily: "Montserrat-Medium", 
        textAlign: "center",
        fontSize: 18,
        lineHeight: 18,
    },
    text_numero : {
        fontFamily: "Montserrat-Black", 
        textAlign: "center",
        fontSize: 28,
        paddingHorizontal: 5,
        lineHeight: 28,
    },
    container_jour: {
        flexDirection:"column",
        borderRadius: 5,
        paddingHorizontal: 2.5,
        paddingTop: 2.5,
        paddingBottom: 1.5
    }
});