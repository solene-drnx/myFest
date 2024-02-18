import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from "react-native";
import { style } from "./CardCalendar_style";
import iconClock from "./../../assets/iconClock.png";
import iconLieu from "./../../assets/iconLieu.png";
import { getDatabase, ref, get } from "firebase/database";

export function CardCalendar({ artist, users, currentUserProfileImage, room, idRoom, festival }) {
    if (room === true) {
        const [userProfiles, setUserProfiles] = useState([]);

        useEffect(() => {
            if (room && idRoom && festival) {
                const fetchAndPreloadUserProfiles = async () => {
                    const db = getDatabase();
                    const roomUsersRef = ref(db, `rooms/${idRoom}/users`);
                    const snapshotRoomUsers = await get(roomUsersRef);

                    if (snapshotRoomUsers.exists()) {
                        const roomUsers = snapshotRoomUsers.val();
                        const userIds = Object.keys(roomUsers);
                        console.log(roomUsers); // Pour confirmer les données

                        const userProfilePromises = userIds.map(async (userId) => {
                            const scoreRef = ref(db, `usersData/${userId}/${festival.db}/scores/${artist.nom}`);
                            const snapshotScore = await get(scoreRef);

                            if (snapshotScore.exists()) {
                                const score = snapshotScore.val();
                                console.log(roomUsers[userId]); // Afficher l'URL de la photo directement
                                if (score === 1 || score === 4) {
                                    return roomUsers[userId]; // Retourner l'URL directement
                                }
                            }
                            return null;
                        });

                        const photoURLs = (await Promise.all(userProfilePromises)).filter(url => url !== null);

                        // Inutile de précharger les images pour les utiliser dans des composants Image de React Native
                        // Construisez l'état userProfiles avec les URLs récupérées
                        const profiles = photoURLs.map((url, index) => ({
                            userId: userIds[index],
                            photoURL: url,
                        }));

                        setUserProfiles(profiles);
                    }
                };

                fetchAndPreloadUserProfiles();
            }
        }, [idRoom, festival, artist.nom, room]);

        return (
            <View style={style.container_card_calendar}>
                <View>
                    <Text style={style.text_nom_calendar}>{artist.nom}</Text>
                    <View style={style.container_infos}>
                        <Image source={iconLieu} style={style.icon_calendar} />
                        <Text style={style.text_infos}>Score : {artist.score}</Text>
                    </View>
                    <View style={style.container_infos}>
                        <Image source={iconClock} style={style.icon_calendar} />
                        {artist.debut.minute === 0 ? <Text style={style.text_infos}>{artist.debut.heure}h</Text> : <Text style={style.text_infos}>{artist.debut.heure}h{artist.debut.minute}</Text>}
                        {artist.fin.minute === 0 ? <Text style={style.text_infos}> - {artist.fin.heure}h</Text> : <Text style={style.text_infos}> - {artist.fin.heure}h{artist.fin.minute}</Text>}
                    </View>
                    {room && userProfiles.length > 0 && (
                        <FlatList
                            horizontal
                            data={userProfiles}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item.photoURL }} style={{ width: 17, height: 17, borderRadius: 100, marginLeft: 2, marginTop: 2, }} />
                            )}
                            keyExtractor={item => item.userId}
                        />
                    )}
                </View>
                <Image source={artist.imageCalendar} style={style.image_calendar} />
            </View>
        );
    }
    else {
        return (
            <View style={style.container_card_calendar}>
                <View>
                    <Text style={style.text_nom_calendar}>{artist.nom}</Text>
                    <View style={style.container_infos}>
                        <Image source={iconLieu} style={style.icon_calendar} />
                        <Text style={style.text_infos}>Scène {artist.lieu}</Text>
                    </View>
                    <View style={style.container_infos}>
                        <Image source={iconClock} style={style.icon_calendar} />
                        {artist.debut.minute === 0 ? <Text style={style.text_infos}>{artist.debut.heure}h</Text> : <Text style={style.text_infos}>{artist.debut.heure}h{artist.debut.minute}</Text>}
                        {artist.fin.minute === 0 ? <Text style={style.text_infos}> - {artist.fin.heure}h</Text> : <Text style={style.text_infos}> - {artist.fin.heure}h{artist.fin.minute}</Text>}
                    </View>
                    {
                        artist.score === 1 || artist.score === 4 ? (
                            <View style={style.container_infos}>
                                <Image source={{ uri: currentUserProfileImage }} style={style.image_user} />
                            </View>
                        ) : null
                    }
                </View>
                <Image source={artist.imageCalendar} style={style.image_calendar} />
            </View>
        );
    }
};
