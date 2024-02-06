import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { style } from "./PlanningScreen_style";
import { CardCalendar } from "../../components/CardCalendar/CardCalendar";
import { CardRepas } from "../../components/CardCalendar/CardRepas";
import { CardDodo } from "../../components/CardCalendar/CardDodo";

export function PlanningScreen({ artists, genresFav }) {
    const [dateSelected, setDateSelected] = useState("jour1");
    let artistsSorted = artists;

    function choisirCarteSurGenres(cardA, cardB, genreFav) {
        const scoreA = cardA.genre.reduce((acc, genre) => acc + (genreFav[genre] || 0), 0);
        const scoreB = cardB.genre.reduce((acc, genre) => acc + (genreFav[genre] || 0), 0);
        console.log(cardA.nom + scoreA);
        console.log(cardB.nom + scoreB);
        return scoreA >= scoreB ? cardA : cardB;
    }

    function triArtistParScore(artists) {
        const sortedArtists = artists.sort((a, b) => {
            const minutesA = (a.debut.heure >= 6 ? a.debut.heure : a.debut.heure + 24) * 60 + a.debut.minute;
            const minutesB = (b.debut.heure >= 6 ? b.debut.heure : b.debut.heure + 24) * 60 + b.debut.minute;

            return minutesA - minutesB;
        });

        return sortedArtists.reduce((acc, current, index, array) => {
            // Si current.score est égal à -1, on ne fait rien et on retourne acc pour passer à l'itération suivante
            if (current.score === -1) {
                return acc;
            }

            const last = acc[acc.length - 1];
            // Vérifier si on doit comparer les genres entre deux artistes
            if (last && last.debut.heure === current.debut.heure && last.debut.minute === current.debut.minute && last.score === 0 && current.score === 0) {
                // Utiliser une fonction pour choisir l'artiste avec le plus de genres en commun avec genreFav
                const bestMatch = choisirCarteSurGenres(last, current, genresFav);
                acc[acc.length - 1] = bestMatch; // Remplacer le dernier élément par le meilleur match
            } else if (!last || last.debut.heure !== current.debut.heure || last.debut.minute !== current.debut.minute || last.score === current.score) {
                acc.push(current);
            } else if (last.score < current.score) {
                acc[acc.length - 1] = current;
            }
            return acc;
        }, []);
    }

    function supprimeArtistScoreNegatif(artists) {
        return artists.filter(artist => artist.score >= 0);
    }


    const renderContentBasedOnDate = () => {
        const filteredArtistsJour = artistsSorted.filter(artist => artist.infoFestival.jour === dateSelected);
        const sortedArtists = supprimeArtistScoreNegatif(triArtistParScore(filteredArtistsJour));
        // Déclarez finDernierArtiste ici, avec une valeur initiale null ou une structure par défaut
        let finDernierArtiste = { heure: null, minute: null };

        // Assurez-vous qu'il y a au moins un artiste dans la liste
        if (sortedArtists.length > 0) {
            const dernierArtiste = sortedArtists[sortedArtists.length - 1];
            finDernierArtiste = dernierArtiste.fin; // Supposons que fin est toujours présent
        }

        const artistCards = sortedArtists.map((artist, i) => (
            <CardCalendar key={i} artist={artist} />
        ));

        switch (dateSelected) {
            case "jour1":
                return (
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <ScrollView>
                            {artistCards}
                            {/* Vérifiez si finDernierArtiste a des valeurs valides avant de l'utiliser */}
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
                    <Text style={style.text_festival}>solidays</Text>
                    <Text style={style.text_festival}>2023</Text>
                </View>
                <View style={style.dates}>
                    <TouchableOpacity style={[style.container_jour, dateSelected === "jour1" ? { backgroundColor: "#F57C33" } : { color: "#FDF4EB" }]} onPress={() => setDateSelected("jour1")}>
                        <Text style={[style.text_jour_mois, dateSelected === "jour1" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>ven</Text>
                        <Text style={[style.text_numero, dateSelected === "jour1" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>23</Text>
                        <Text style={[style.text_jour_mois, dateSelected === "jour1" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>juin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.container_jour, dateSelected === "jour2" ? { backgroundColor: "#F57C33" } : { color: "#FDF4EB" }]} onPress={() => setDateSelected("jour2")}>
                        <Text style={[style.text_jour_mois, dateSelected === "jour2" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>sam</Text>
                        <Text style={[style.text_numero, dateSelected === "jour2" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>24</Text>
                        <Text style={[style.text_jour_mois, dateSelected === "jour2" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>juin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.container_jour, dateSelected === "jour3" ? { backgroundColor: "#F57C33" } : { color: "#FDF4EB" }]} onPress={() => setDateSelected("jour3")}>
                        <Text style={[style.text_jour_mois, dateSelected === "jour3" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>dim</Text>
                        <Text style={[style.text_numero, dateSelected === "jour3" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>25</Text>
                        <Text style={[style.text_jour_mois, dateSelected === "jour3" ? { color: "#FDF4EB" } : { color: "#F57C33" }]}>juin</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {renderContentBasedOnDate()}
        </View>
    );
}