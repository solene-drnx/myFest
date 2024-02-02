import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { style } from "./PlanningScreen_style";
import { CardCalendar } from "../../components/CardCalendar/CardCalendar";
import { CardRepas } from "../../components/CardCalendar/CardRepas";
import { CardDodo } from "../../components/CardCalendar/CardDodo";

export function PlanningScreen({ artists }) {
    const [dateSelected, setDateSelected] = useState("jour1");
    let artistsSorted = artists;

    function triArtistParScore(artists) {
        const sortedArtists = artists.sort((a, b) => {
            const minutesA = (a.debut.heure >= 6 ? a.debut.heure : a.debut.heure + 24) * 60 + a.debut.minute;
            const minutesB = (b.debut.heure >= 6 ? b.debut.heure : b.debut.heure + 24) * 60 + b.debut.minute;

            return minutesA - minutesB;
        });

        return sortedArtists.reduce((acc, current) => {
            // Si current.score est égal à -1, on ne fait rien et on retourne acc pour passer à l'itération suivante
            if (current.score === -1) {
                return acc;
            }
        
            const last = acc[acc.length - 1];
            if (!last || last.debut.heure !== current.debut.heure || last.debut.minute !== current.debut.minute || last.score === current.score) {
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
        switch (dateSelected) {
            case "jour1":
                const sortedArtists = supprimeArtistScoreNegatif(triArtistParScore(artistsSorted));
                const artistCards = sortedArtists.map((artist, i) => (
                    <CardCalendar key={i} artist={artist} />
                ));

                return (
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <ScrollView>
                            <CardRepas />
                            {artistCards}
                            <CardDodo />
                        </ScrollView>
                    </View>
                );
            case "jour2":
                return <Text>Jour2</Text>;
            default:
                return <Text>Jour3</Text>;
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