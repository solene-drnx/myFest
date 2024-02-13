import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FESTIVALS } from '../../constant';

const DropdownMenu = ({ setFestival }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null); 
    const [items, setItems] = useState([
        { label: 'Solidays 2023', value: FESTIVALS.solidays },
        { label: 'WeLoveGreen 2023', value: FESTIVALS.weLoveGreen2023 },
        // Ajoutez d'autres options ici
    ]);

    useEffect(() => {
        setFestival(value);
    }, [value, setFestival]);

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.pickerStyle}
                dropDownContainerStyle={styles.dropDownPickerStyle} 
                labelStyle={styles.labelStyle} 
                arrowSize={20} 
                arrowColor="#F57C33"
                placeholder="Sélectionnez un festival" 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
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
});

export default DropdownMenu;
