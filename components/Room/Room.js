import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, Button, Platform, TextInput } from "react-native";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { FESTIVALS, ARTISTS } from '../../constant';
import DropDownPicker from 'react-native-dropdown-picker';

export function Room({ userId, setRoom, setIdRoom, setFestival }) {
    const [selectedFestival, setSelectedFestival] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModalPicker, setOpenModalPicker] = useState(false);
    const [items, setItems] = useState(Object.values(FESTIVALS).map(festival => ({ label: festival.nom, value: festival.db })));
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomItems, setRoomItems] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
    const [joinRoomCode, setJoinRoomCode] = useState('');

    useEffect(() => {
        if (selectedRoom) {
            setIdRoom(selectedRoom);
            setRoom(true);
            console.log(selectedRoom)
            const db = getDatabase();
            const festivalRef = ref(db, `rooms/${selectedRoom}/festival`);
            onValue(festivalRef, (snapshot) => {
                const festivalDb = snapshot.val();
                console.log(festivalDb);
                if (festivalDb === "solidays2023") {
                    setFestival(FESTIVALS.solidays);
                } else {
                    setFestival(FESTIVALS.weLoveGreen2023)
                }
            });
        }
    }, [selectedRoom, setIdRoom, setRoom, selectedFestival, setFestival]);

    useEffect(() => {
        const db = getDatabase();
        const roomsRef = ref(db, 'rooms');

        const unsubscribe = onValue(roomsRef, (snapshot) => {
            const rooms = snapshot.val();
            const userRooms = [];
            for (let roomId in rooms) {
                const room = rooms[roomId];
                if (room.users && room.users[userId]) {
                    userRooms.push({
                        label: `${room.name} - code: ${room.code}`,
                        value: roomId
                    });
                }
            }
            setRoomItems(userRooms);
            setRoom(true);
        });

        return () => unsubscribe(); // Nettoyage du listener
    }, [userId, setRoom]);

    const joinRoomWithCode = () => {
        if (!joinRoomCode.trim()) {
            alert('Veuillez entrer un code valide.');
            return;
        }
        const db = getDatabase();
        const roomsRef = ref(db, 'rooms');

        onValue(roomsRef, (snapshot) => {
            const rooms = snapshot.val();
            let roomExists = false;
            for (let roomId in rooms) {
                if (rooms[roomId].code === joinRoomCode) {
                    roomExists = true;
                    const userRoomRef = ref(db, `rooms/${roomId}/users/${userId}`);
                    set(userRoomRef, true)
                        .then(() => {
                            alert('🥳 Vous avez rejoint la room avec succès ! Sélectionnez-la pour commencer à swiper');
                            setIsJoinModalVisible(false);
                        })
                        .catch((error) => {
                            alert('Erreur lors de la tentative de rejoindre la room.');
                            console.error("Erreur :", error);
                        });
                    break; // Sortie de la boucle une fois la room trouvée
                }
            }
            if (!roomExists) {
                alert('Aucune Room trouvée avec ce code 🥸');
            }
        }, { onlyOnce: true });
    };

    function createRoom() {
        if (!selectedFestival || roomName.length === 0 || roomName.length > 20) {
            alert('Veuillez sélectionner un festival et entrer un nom de room valide (max 20 caractères).');
            return;
        }

        const festivalArtists = ARTISTS.filter(artist => artist.infoFestival.festival.db === selectedFestival)
            .reduce((acc, artist) => {
                acc[artist.nom] = 0;
                return acc;
            }, {});

        const db = getDatabase();
        const roomRef = push(ref(db, 'rooms'));
        const roomCode = generateRoomCode();

        set(roomRef, {
            name: roomName,
            code: roomCode,
            users: { [userId]: true },
            festival: selectedFestival,
            artists: festivalArtists,
        }).then(() => {
            alert(`La room ${roomName} a été créée avec succès. \nCode de la room : ${roomCode}`);
        }).catch((error) => {
            console.error("Erreur lors de la création de la room :", error);
            alert("Erreur lors de la création de la room. Veuillez réessayer.");
        });
    }

    function generateRoomCode() {
        return Math.random().toString(36).substring(2, 7).toUpperCase();
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={[styles.title, { zIndex: 1 }]}>Je festivale avec des ami•e•s</Text>
                <View style={{ zIndex: 20000 }}>
                    <DropDownPicker
                        open={open}
                        value={selectedRoom}
                        items={roomItems}
                        setOpen={setOpen}
                        setValue={setSelectedRoom}
                        setItems={setRoomItems}
                        placeholder="Sélectionnez une room"
                        style={styles.pickerStyle}
                        dropDownContainerStyle={{
                            ...styles.dropDownPickerStyle,
                            maxHeight: 90,
                        }}
                        labelStyle={styles.labelStyle}
                    />
                </View>

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Créer une room</Text>
                        <Text style={{ fontFamily: "Montserrat-Medium", color: "#F57C33" }}>Donner un nom à votre Room</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nom de la room (max 20 caractères)"
                            onChangeText={setRoomName}
                            value={roomName}
                            maxLength={20}
                        />
                        <Text style={{ fontFamily: "Montserrat-Medium", color: "#F57C33", marginBottom: 5 }}>Sélectionner un festival</Text>
                        <DropDownPicker
                            open={openModalPicker}
                            value={selectedFestival}
                            items={items}
                            setOpen={setOpenModalPicker}
                            setValue={(value) => {
                                setSelectedFestival(value);
                                // Trouvez les données complètes du festival sélectionné
                                const selectedFestivalData = FESTIVALS.find(f => f.db === value);
                                // Mettez à jour l'état du festival avec les données complètes
                                setFestival(selectedFestivalData);
                            }}
                            setItems={setItems}
                            style={styles.dropdownPicker}
                            placeholder="Sélectionnez un festival"
                            dropDownContainerStyle={styles.dropDownPickerStyle}
                            labelStyle={styles.labelStyle}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                createRoom();
                                setIsModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Créer une room</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{ marginTop: 10 }}>
                            <Text style={{ fontFamily: "Montserrat-Medium" }}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isJoinModalVisible}
                onRequestClose={() => setIsJoinModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Rejoindre une room</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Entrez le code de la room"
                            onChangeText={setJoinRoomCode}
                            value={joinRoomCode}
                        />
                        <TouchableOpacity onPress={joinRoomWithCode} style={styles.button}>
                            <Text style={styles.buttonText}>Rejoindre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsJoinModalVisible(false)} style={{ marginTop: 10 }}>
                            <Text style={{ fontFamily: "Montserrat-Medium" }}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {open ? (
                <View style={{ height: 50 }}>
                </View>
            ) : (
                <View style={{ flexDirection: "row", marginHorizontal: 5, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.buttonRoom}>
                        <Text style={styles.buttonRoomText}>Créer une room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRoom} onPress={() => setIsJoinModalVisible(true)}>
                        <Text style={styles.buttonRoomText}>Rejoindre une room</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    picker: {
        width: 200,
        height: 44,
        margin: 20
    },
    button: {
        backgroundColor: '#F57C33',
        padding: 10,
        textAlign: "center",
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 30,
    },
    buttonText: {
        color: '#FDF4EB',
        fontFamily: "Montserrat-Medium",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: "#FDF4EB",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 30,
        textAlign: "center",
        fontFamily: "Montserrat-Black",
        color: "#F57C33",
        fontSize: 22
    },
    dropdownPicker: {
        backgroundColor: "#FDF4EB",
        borderColor: "#F57C33",
        borderWidth: 2
    },
    pickerStyle: {
        borderWidth: 3,
        borderColor: "#F57C33",
        borderRadius: 5,
        backgroundColor: '#FDF4EB',
    },
    dropDownPickerStyle: {
        borderWidth: 3,
        borderColor: "#F57C33",
        backgroundColor: "#FDF4EB",
    },
    labelStyle: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: 'black',
    },
    buttonRoom: {
        backgroundColor: "#FDF4EB",
        flex: 1,
        verticalAlign: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: "#F57C33",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonRoomText: {
        fontFamily: "Montserrat-Medium",
        color: "#F57C33",
        fontSize: 10,
    },
    title: {
        fontFamily: "Montserrat-Black",
        fontSize: 18,
        color: "#F57C33",
        marginBottom: 10
    },
    textInput: {
        height: 40,
        borderColor: "#F57C33",
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
});
