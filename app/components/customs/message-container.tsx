import { View, Text, StyleSheet } from "react-native";

export type MessageContainerProps = {
    message: string;
    type: 'success' | 'error';
}

// MessageContainer permet d'afficher un message selon un status
export default function MessageContainer({
    message,
    type,
}: MessageContainerProps) {
    return(
        <View style={[
            styles.messageContainer,
            type === 'success' ? styles.successContainer : undefined,
            type === 'error' ? styles.errorContainer : undefined,
        ]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        width: '100%',
        height: 50,
        padding: 12,
        justifyContent: 'center',
        borderRadius: 6,
    },
    successContainer: {
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
    },
    errorContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: 'white',
    }
})