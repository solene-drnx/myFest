import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container_section_card: {
        flex:1,
    },
    container: {
        backgroundColor: "#FDF4EB",
        flex: 1,
    },
    imageBackground:{
        borderRadius: 20,
        flex: 0.7,
        marginTop: -50,
        marginBottom: 50,
        resizeMode: 'cover', 
    },
    textCard:{
        color: "white",
        fontSize: 45,
        fontFamily: "Montserrat-Black",
        lineHeight: 45,
        paddingLeft: 10,
    }, 
    taglineCard:{
        color: "white",
        fontSize: 20,
        fontFamily: "Montserrat-Medium",
        lineHeight: 20,
        paddingLeft: 10,
        paddingBottom: 60,
    },
    card:{
        width: 335,
        height: 500,
        textAlign: "left",
        justifyContent: "flex-end",
    },
    iconBoutonCard: {
        width: 70,
        height: 70,
    },
    smileyBoutonCard :{
        fontSize: 50,
    },
    container_boutons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 20,
        alignItems: "baseline",
        alignItems: "flex-end",
        top: 510,
    },
    container_swiper : {
        marginBottom: 20,
    },
    messageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    messageText : {
        fontFamily: "Montserrat-Black",
        color: "#F57C33",
        fontSize: 30,
    }
});
