import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { style } from "./PlanningScreen_style";
import { CardCalendar } from "../../components/CardCalendar/CardCalendar";
import { CardRepas } from "../../components/CardCalendar/CardRepas";
import { CardDodo } from "../../components/CardCalendar/CardDodo";
import { FESTIVALS, ARTISTS } from "../../constant";
import { getDatabase, ref, get } from "firebase/database";

export function PlanningScreen({ artists, genresFav, users, currentUser, festival, room, idRoom, setArtists }) {
    const [dateSelected, setDateSelected] = useState("jour1");
    let artistsSorted = artists;

    useEffect(() => {
        const resetOrFetchMultyUser = async () => {
            if (currentUser) {
                console.log("fonction lancée 🥸");
                const db = getDatabase();
                const userRef = ref(db, `rooms/${idRoom}`);
                const snapshot = await get(userRef);
                console.log(snapshot);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const updatedArtists = ARTISTS.map(artist => {
                        const score = userData.artists ? userData.artists[artist.nom] : artist.score;
                        return { ...artist, score };
                    });
                    setArtists(updatedArtists);
                } else {
                    setArtists(ARTISTS.map(artist => ({ ...artist, score: artist.score })));
                }
            } else {
                setArtists(ARTISTS.map(artist => ({ ...artist, score: artist.score })));
            }
        };

        if (room===true) {
            resetOrFetchMultyUser();
            artistsSorted = artists;
        }
    }, [currentUser, idRoom, room])

    function choisirCarteSurGenres(cardA, cardB, genreFav) {
        const scoreA = cardA.genre.reduce((acc, genre) => acc + (genreFav[genre] || 0), 0) / cardA.genre.length;
        const scoreB = cardB.genre.reduce((acc, genre) => acc + (genreFav[genre] || 0), 0) / cardB.genre.length;
        console.log(cardA.nom + " score: " + scoreA);
        console.log(cardB.nom + " score: " + scoreB);
        if (scoreA === scoreB) {
            return [cardA, cardB];
        }
        return scoreA > scoreB ? [cardA] : [cardB];
    }

    function triArtistParScore(artists) {
        // Tri initial par heure de début pour s'assurer que les artistes soient dans l'ordre chronologique
        artists.sort((a, b) => {
            const minutesA = (a.debut.heure >= 6 ? a.debut.heure : a.debut.heure + 24) * 60 + a.debut.minute;
            const minutesB = (b.debut.heure >= 6 ? b.debut.heure : b.debut.heure + 24) * 60 + b.debut.minute;
            return minutesA - minutesB;
        });

        const result = [];
        for (let i = 0; i < artists.length; i++) {
            const current = artists[i];
            if (i > 0) {
                const previous = result[result.length - 1];
                if (previous.debut.heure === current.debut.heure && previous.debut.minute === current.debut.minute) {
                    if (previous.score === current.score) {
                        const bestMatch = choisirCarteSurGenres(previous, current, genresFav);
                        if (bestMatch.length === 2) {
                            result.pop();
                            result.push(...bestMatch);
                        } else {
                            result[result.length - 1] = bestMatch[0];
                        }
                    } else if (current.score > previous.score) {
                        result[result.length - 1] = current;
                    }
                } else {
                    result.push(current);
                }
            } else {
                result.push(current);
            }
        }
        return result;
    }



    function supprimeArtistScoreNegatif(artists) {
        return artists.filter(artist => artist.score >= 0);
    }
    


        const renderContentBasedOnDate = () => {
            const filteredArtistsJour = artistsSorted.filter(artist =>
                artist.infoFestival.festival.nom === festival.nom &&
                artist.infoFestival.jour === dateSelected
            );
            const sortedArtists = supprimeArtistScoreNegatif(triArtistParScore(filteredArtistsJour));
            let finDernierArtiste = { heure: null, minute: null };
            if (sortedArtists.length > 0) {
                const dernierArtiste = sortedArtists[sortedArtists.length - 1];
                finDernierArtiste = dernierArtiste.fin;
            }
            const artistCards = sortedArtists.map((artist, i) => (
                <CardCalendar key={i} artist={artist} users={users} currentUserProfileImage={currentUser?.photoURL} room={room} idRoom={idRoom} festival={festival}/>
            ));

            switch (dateSelected) {
                case "jour1":
                    return (
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <ScrollView>
                                {artistCards}
                                {finDernierArtiste.heure !== null ? (
                                    <CardDodo fin={finDernierArtiste} />
                                ) : (
                                    <Text>Aucune heure de fin disponible</Text>
                                )}
                            </ScrollView>
                        </View>
                    );
                case "jour2":
                    return (
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <ScrollView>
                                {artistCards}
                                {finDernierArtiste.heure !== null ? (
                                    <CardDodo fin={finDernierArtiste} />
                                ) : (
                                    <Text>Aucune heure de fin disponible</Text>
                                )}
                            </ScrollView>
                        </View>
                    );
                default:
                    return (
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <ScrollView>
                                {artistCards}
                                {finDernierArtiste.heure !== null ? (
                                    <CardDodo fin={finDernierArtiste} />
                                ) : (
                                    <Text>Aucune heure de fin disponible</Text>
                                )}
                            </ScrollView>
                        </View>
                    );
            }
        };
        return (
            <View style={{ flex: 1 }}>
                <View style={style.container_dates}>
                    <View style={style.container_festival}>
                        <Text style={style.text_festival}>{festival.nom}</Text>
                        <Text style={style.text_festival}>{festival.annee}</Text>
                    </View>
                    <View style={style.dates}>
                        <TouchableOpacity style={[style.container_jour, dateSelected === "jour1" ? { backgroundColor: "#F57C33" } : { color: "#FDF4EB" }]} onPress={() => setDateSelected("jour1")}>
                            <Text style={[style.text_jour_mois, dateSelected === "jour1" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour1.jour}</Text>
                            <Text style={[style.text_numero, dateSelected === "jour1" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour1.num}</Text>
                            <Text style={[style.text_jour_mois, dateSelected === "jour1" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour1.mois}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.container_jour, dateSelected === "jour2" ? { backgroundColor: "#F57C33" } : { color: "#FDF4EB" }]} onPress={() => setDateSelected("jour2")}>
                            <Text style={[style.text_jour_mois, dateSelected === "jour2" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour2.jour}</Text>
                            <Text style={[style.text_numero, dateSelected === "jour2" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour2.num}</Text>
                            <Text style={[style.text_jour_mois, dateSelected === "jour2" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour2.mois}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.container_jour, dateSelected === "jour3" ? { backgroundColor: "#F57C33" } : { color: "#FDF4EB" }]} onPress={() => setDateSelected("jour3")}>
                            <Text style={[style.text_jour_mois, dateSelected === "jour3" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour3.jour}</Text>
                            <Text style={[style.text_numero, dateSelected === "jour3" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour3.num}</Text>
                            <Text style={[style.text_jour_mois, dateSelected === "jour3" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>{festival.jour3.mois}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {renderContentBasedOnDate()}
            </View>
        );
    }