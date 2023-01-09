import React, { useContext } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import SideSelector from './SideSelector'
import { ImportData } from '..'
import { useSelector, useDispatch } from 'react-redux'
import { setImportSubitemSetting } from '../../../../store/actions/importData'
import { getSideIcon } from '../helpers/functions'
import Hint from '../../../../components/Hint'
import { basic } from '../../../../styles/colors'


const Sides = ({ sideTypes }) => {
    const { subitemIndex } = useContext(ImportData)
    const dispatch = useDispatch()
    const fromAtoB = useSelector(state => state.importData.subitems[subitemIndex]?.fromAtoB) //true, false, null  (null means no arrow displayed for IK)
    const onChangeDirection = () => {
        dispatch(setImportSubitemSetting('fromAtoB', subitemIndex, !fromAtoB))
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.row}>
                <SideSelector isSideA={true} sideTypes={sideTypes} />
                <Icon {...getSideIcon(fromAtoB)} style={styles.icon} fill={basic} />
                <SideSelector isSideA={false} sideTypes={sideTypes} />
            </View>
            {fromAtoB !== null ?
                <View style={styles.hintView}>
                    <Hint>
                        Current travels from side {fromAtoB ? 'A to side B.' : 'B to side A.'}
                    </Hint>
                    <Pressable onPress={onChangeDirection}>
                        <Text status='primary' style={styles.link} category='label'>Change</Text>
                    </Pressable>
                </View> : fromAtoB}
        </View>
    )
}

export default Sides


const styles = StyleSheet.create({
    mainView: {
    },
    link: {
        marginLeft: 6,
        textDecorationLine: 'underline'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    hintView: {
        flexDirection: 'row',
        paddingVertical: 12
    },
    icon: {
        marginTop: 20,
        marginHorizontal: 12,
        width: 20,
        height: 20
    }
})