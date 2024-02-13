import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";

class UserPermissions {
    getCameraRollPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await MediaLibrary.requestPermissionsAsync();

            if (status !== "granted") {
                alert("We need permission to use your camera roll");
            }
        }
    };
}

export default new UserPermissions();
