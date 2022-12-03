import react from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'


const DefaultBadge = () => (
    <View style={styles.badge}>
        <Text category='label' status='control'>Default name</Text>
    </View>
)

export default DefaultBadge

const styles = StyleSheet.create({
    badge: {
        borderRadius: 10,
        backgroundColor: primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        elevation: 5
    },
})