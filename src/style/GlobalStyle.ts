import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    droidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 30 : 25,
        // paddingBottom: Platform.OS === 'android' ? 15 : 0
    },
});