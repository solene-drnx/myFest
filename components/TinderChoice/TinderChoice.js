import { View, Text } from "react-native";
import React from "react";

const TinderChoice = ({type}) => {
    return (
        <View>
            <Text 
                style={{
                    color: type==="like" ? "#49A35D" : "#F57C33",
                    fontSize: 40, 
                    fontFamily: "Montserrat-Black", 
                    borderWidth: 5, 
                    paddingHorizontal: 10, 
                    borderRadius: 10,
                    borderColor: type==="like" ? "#49A35D" : "#F57C33",
                }}>
                    {type}
            </Text>
        </View>
    );
};

export default TinderChoice;