import { style } from "./cardScreen_style";
import { Animated, Text, View, PanResponder, TouchableOpacity, Image } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ARTISTS, LIEUX, GENRES } from '../../constant';
import TinderCard from "../../components/TinderCard/TinderCard";
import iconCroix from "../../assets/iconCroix.png";
import iconCoeur from "../../assets/iconCoeur.png";

export function CardScreen() {
    const [data, setData] = useState(ARTISTS);

    useEffect(() => {
        if (!data.length) {
            setData(ARTISTS);
        }
    }, [data]);

    const swipe = useRef(new Animated.ValueXY()).current;
    const panResponser = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
            console.log("dx:" + dx + " dy:" + dy);
            swipe.setValue({ x: dx, y: dy });
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            console.log("released:" + " dx:" + dx + " dy:" + dy);
            let direction = Math.sign(dx);
            let isActionActive = Math.abs(dx) > 200;
            if (isActionActive) {
                Animated.timing(swipe, {
                    toValue: { x: 500 * dx, y: dy },
                    useNativeDriver: true,
                    duration: 500,
                }).start(removeCard);
            } else {
                Animated.spring(swipe, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    duration: 300,
                    friction: 5,
                }).start();
            }
        }
    });

    const removeCard = useCallback(() => {
        setData(prepState => prepState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);

    const handelSelection = useCallback((direction) => {
        Animated.timing(swipe, {
            toValue: { x: direction * 500, y: 0 },
            useNativeDriver: true,
            duration: 500,
        }).start(removeCard);
    }, [removeCard]);

    return (
        <View style={{ flex: 1 }}>
            {data.map((item, index) => {
                let isFirst = index === 0;
                let dragHandlers = isFirst ? panResponser.panHandlers : {};
                return <TinderCard item={item} isFirst={isFirst} swipe={swipe} {...dragHandlers} />;
            }).reverse()}
            <View style={{ width: "100%", position: "absolute", bottom: 15, flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity>
                    <Text style={{fontSize: 50}} >🤔</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handelSelection(-1);}}>
                    <Image style={{width: 70, height: 70}} source={iconCroix} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handelSelection(1);}}>
                    <Image style={{width: 70, height: 70}} source={iconCoeur} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 50}} >🤩</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}