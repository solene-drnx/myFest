import { Animated, Text, View, PanResponder, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ARTISTS, LIEUX, GENRES } from '../../constant';
import TinderCard from "../../components/TinderCard/TinderCard";
import iconCroix from "../../assets/iconCroix.png";
import iconCoeur from "../../assets/iconCoeur.png";
import { Asset } from 'expo-asset';
import { getDatabase, ref, update, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";

export function CardScreen({ indexCard, setIndexCard, setArtists, genresFav, setGenreFav, festival}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIndexCard = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
    
            if (user && festival) {
                const db = getDatabase();
                const userId = user.uid;
                const indexCardRef = ref(db, `usersData/${userId}/${festival.db}/indexCard`);
    
                try {
                    const snapshot = await get(indexCardRef);
                    if (snapshot.exists()) {
                        setIndexCard(snapshot.val());
                    } else {
                        setIndexCard(0);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'indexCard :", error);
                    setIndexCard(0);
                }
            }
        };
        const filteredArtists = ARTISTS.filter(artist => artist.infoFestival.festival.nom === festival.nom);
        setData(filteredArtists);
        fetchIndexCard();
    }, [festival]); 
    

    useEffect(() => {
        const preloadImages = async () => {
            const imageSources = ARTISTS.filter(artist => artist.infoFestival.festival.nom === festival.nom)
                                        .map(artist => artist.image);
            const promises = imageSources.map(image => Asset.fromModule(image).downloadAsync());
            await Promise.all(promises);
            console.log('Images préchargées pour le festival actuel');
        };
    
        if (festival) {
            preloadImages();
        }
    }, [festival]); 
    

    const enregistrerDonneesUtilisateur = async (artistName, newScore) => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const scoresRef = ref(db, `usersData/${userId}/${festival.db}/scores`);
    
            try {
                const snapshot = await get(scoresRef);
                if (snapshot.exists()) {
                    const scores = snapshot.val();
                    const updatedScores = { ...scores, [artistName]: newScore };
                    await update(scoresRef, updatedScores);
                    console.log("Score de l'artiste mis à jour avec succès dans Realtime Database !");
                } else {
                    await update(scoresRef, { [artistName]: newScore });
                    console.log("Score de l'artiste ajouté avec succès dans Realtime Database !");
                }
            } catch (error) {
                console.error("Erreur lors de l'enregistrement des scores dans Realtime Database:", error);
            }
        }
    };

    const enregistrerGenreFav = async (genresFav) => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const genreFavRef = ref(db, `usersData/${userId}/${festival.db}/genresFavoris`);
    
            try {
                await set(genreFavRef, genresFav);
                console.log("Genres favoris enregistrés (ou écrasés) avec succès dans Realtime Database !");
            } catch (error) {
                console.error("Erreur lors de l'enregistrement des genres favoris dans Realtime Database:", error);
            }
        } else {
            console.log("Aucun utilisateur connecté pour enregistrer les genres favoris.");
        }
    };

    const enregistrerIndexCard = async (nouvelIndex) => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const indexCardRef = ref(db, `usersData/${userId}/${festival.db}/indexCard`);
    
            try {
                await set(indexCardRef, nouvelIndex);
                console.log("IndexCard enregistré avec succès dans Realtime Database !");
            } catch (error) {
                console.error("Erreur lors de l'enregistrement de l'indexCard dans Realtime Database:", error);
            }
        } else {
            console.log("Aucun utilisateur connecté pour enregistrer l'indexCard.");
        }
    };
    
    

    const ecrireTestDansDatabase = async () => {
        const db = getDatabase();
        const rootRef = ref(db, '/');
    
        try {
            await set(rootRef, { test: "test" });
            console.log("La valeur 'test' a été écrite avec succès à la racine de la base de données.");
        } catch (error) {
            console.error("Erreur lors de l'écriture à la racine de la base de données :", error);
        }
    };
    
    
    const preloadImages = async () => {
        const imageSources = ARTISTS.map(artist => artist.image);
        const promises = imageSources.map(image => Asset.fromModule(image).downloadAsync());
        await Promise.all(promises);
    };

    useEffect(() => {
        preloadImages().then(() => {
            console.log('Images préchargées');
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (indexCard === festival.taille) {
            setIndexCard(0); 
            enregistrerIndexCard(0); 
        }
    
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000);
    
        return () => clearTimeout(timer); 
    }, [indexCard, data]);


    const updateScore = (artistName, increment) => {
        setArtists(currentArtists =>
            currentArtists.map(artist => {
                if (artist.nom === artistName) {
                    return { ...artist, score: increment };
                }
                return artist;
            })
        );
        enregistrerDonneesUtilisateur(artistName, increment);
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
        enregistrerIndexCard(indexCard);
        swipe.setValue({ x: 0, y: 0 });
    }, [setData, setIndexCard, swipe, indexCard]);


    const ajoutGenre = (artistGenres, increment) => {
        setGenreFav(currentGenres => {
            const updatedGenres = { ...currentGenres };
            artistGenres.forEach(genre => {
                if (updatedGenres[genre]) {
                    updatedGenres[genre] += increment; 
                } else {
                    updatedGenres[genre] = increment;
                }
            });
            return updatedGenres;
        });
        enregistrerGenreFav(genresFav);
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
            ajoutGenre(data[indexCard].genre, 1); 
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
            ajoutGenre(data[indexCard].genre, 4);
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

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


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