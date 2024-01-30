import { StyleSheet, Dimensions } from "react-native";

const largeurScreen = Dimensions.get('window').width;

export const style = StyleSheet.create({
    containerNavigation:{
        backgroundColor: "#FDF4EB"
    },
    image_background:{
        width: largeurScreen,
        height: 150,
        marginBottom: -100,
    },
    icon:{
        width: 50,
        height: 50,
    },
    container_boutons:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingBottom: 30,
        backgroundColor: "#F57C33",
    }
});