import { View, Text, Image, Dimensions, Animated } from "react-native";
import React, { useCallback } from "react";
import LinearGradient from "react-native-linear-gradient";
import TinderChoice from "../TinderChoice/TinderChoice";

const { height, width } = Dimensions.get('window')

const TinderCard = ({ item, isFirst, swipe, ...rest }) => {
    const rotate = swipe.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ["-8deg", "0deg" , "8deg"],
    });
    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const tinderSelection = useCallback(() => {
        return(
            <>
                <Animated.View 
                    style={{
                        position: "absolute", 
                        top: 35, 
                        right: 20, 
                        opacity: nopeOpacity,
                        transform: [{rotate: "30deg"}]
                    }}>
                    <TinderChoice type={"nope"}/>
                </Animated.View>
                <Animated.View 
                    style={{
                        position: "absolute", 
                        top: 30, 
                        left: 20,
                        opacity: likeOpacity,
                        transform: [{rotate: "-30deg"}]
                    }}>
                    <TinderChoice type={"like"}/>
                </Animated.View>
            </>
        );
    }, []);

    return (
        <Animated.View
            style={[{
                width: width - 20,
                height: height - 300,
                alignSelf: "center",
                position: "absolute",
                top: 20,
                borderRadius: 20,
                zIndex: 2,
            }, isFirst && {transform: [...swipe.getTranslateTransform(), {rotate: rotate}]}]} {...rest}>
            <Image source={item.image} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
            <View style={{width:"100%", height:"100%", borderRadius: 20, position: "absolute"}}>
                <View style={{
                    width: '100%',
                    height: '100%',
                    textAlign: "left",
                    justifyContent: "flex-end",
                }}>
                    <Text style={{
                        color: "#FDF4EB",
                        fontSize: 45,
                        fontFamily: "Montserrat-Black",
                        lineHeight: 45,
                        paddingLeft: 10,
                    }}>{item.nom}</Text>
                    <Text style={{ 
                        color: "#FDF4EB",
                        fontSize: 20,
                        fontFamily: "Montserrat-Medium",
                        lineHeight: 20,
                        paddingLeft: 10,
                        paddingBottom: 10,
                    }}>{item.genre.join(' - ')}</Text>
                </View>
            </View>
            {isFirst && tinderSelection()}
        </Animated.View>
    );
}

export default TinderCard;