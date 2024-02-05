import { Animated, Text, View, PanResponder, TouchableOpacity, Image } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ARTISTS, LIEUX, GENRES } from '../../constant';
import TinderCard from "../../components/TinderCard/TinderCard";
import iconCroix from "../../assets/iconCroix.png";
import iconCoeur from "../../assets/iconCoeur.png";

export function CardScreen({ indexCard, setIndexCard, setArtists, setGenreFav }) {
    const [data, setData] = useState(ARTISTS);

    useEffect(() => {
        if (indexCard===61) {
            setData(ARTISTS);
            setIndexCard(0);
        }
    }, [indexCard]);
    
    const updateScore = (artistName, increment) => {
        setArtists(currentArtists =>
            currentArtists.map(artist => {
                return artist.nom === artistName ? { ...artist, score: increment } : artist;
            })
        );
    };

    const swipe = useRef(new Animated.ValueXY()).current;
    const panResponser = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
            swipe.setValue({ x: dx, y: dy });
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            let isActionActive = Math.abs(dx) > 200;

            const onSwipeComplete = () => {
                if (dx > 0) {
                    updateScore(data[indexCard].nom, 1);
                } else {
                    updateScore(data[indexCard].nom, -1);
                }
                removeCard();
            };

            if (isActionActive) {
                Animated.timing(swipe, {
                    toValue: { x: 500 * dx, y: dy },
                    useNativeDriver: true,
                    duration: 500,
                }).start(onSwipeComplete);
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
        setIndexCard(prevIndex => prevIndex + 1);
        swipe.setValue({ x: 0, y: 0 });
    }, [setData, setIndexCard, swipe, indexCard]); 
    

    const ajoutGenre = (artistGenres, increment) => {
        setGenreFav(currentGenres => {
            const updatedGenres = { ...currentGenres };
            artistGenres.forEach(genre => {
                if (updatedGenres[genre]) {
                    updatedGenres[genre] += increment; // Incrémente si le genre existe déjà
                } else {
                    updatedGenres[genre] = increment; // Initialise à 1 si le genre n'existe pas
                }
            });
            return updatedGenres;
        });
    };
    

    const swipeLeft = () => {
        Animated.timing(swipe, {
            toValue: { x: -500, y: 0 },
            useNativeDriver: true,
            duration: 500,
        }).start(() => {
            removeCard();
            updateScore(data[indexCard].nom, -1);
            ajoutGenre(data[indexCard].genre, -1);
        });
    };

    const swipeRight = () => {
        Animated.timing(swipe, {
            toValue: { x: 500, y: 0 },
            useNativeDriver: true,
            duration: 500,
        }).start(() => {
            removeCard();
            updateScore(data[indexCard].nom, 1);
            ajoutGenre(data[indexCard].genre, 1); // Assurez-vous que data[indexCard].genres est un tableau
        });
    };

    const swipeUp = () => {
        Animated.timing(swipe, {
            toValue: { x: 0, y: -500 },
            useNativeDriver: true,
            duration: 500,
        }).start(() => {
            removeCard();
            updateScore(data[indexCard].nom, 4);
            ajoutGenre(data[indexCard].genre, 4); // Assurez-vous que data[indexCard].genres est un tableau
        });
    };

    const swipeDown = () => {
        Animated.timing(swipe, {
            toValue: { x: 0, y: 500 },
            useNativeDriver: true,
            duration: 500,
        }).start(() => {
            removeCard();
            updateScore(data[indexCard].nom, 0);
            ajoutGenre(data[indexCard].genre, 0);
        });
    };


    return (
        <View style={{ flex: 1 }}>
            {data.slice(indexCard).map((item, index) => {
                let isFirst = index === 0;
                let dragHandlers = isFirst ? panResponser.panHandlers : {};
                return <TinderCard item={item} isFirst={isFirst} swipe={swipe} {...dragHandlers} />;
            }).reverse()}
            <View style={{ width: "100%", position: "absolute", bottom: 15, flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => { swipeDown(); }}>
                    <Text style={{ fontSize: 50 }} >🤔</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { swipeLeft(); }}>
                    <Image style={{ width: 70, height: 70 }} source={iconCroix} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { swipeRight(); }}>
                    <Image style={{ width: 70, height: 70 }} source={iconCoeur} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { swipeUp(); }}>
                    <Text style={{ fontSize: 50 }} >🤩</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}