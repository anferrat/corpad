import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic, control } from '../../../../styles/colors'

const TopBarTitle = (props) => {
    const titleSize = props.large ? 'h4' : props.mid ? 'h5' : 'h6'
    const subtitleSize = props.large ? 'p1' : props.mid ? 'p2' : 'label'
    const iconStyle = props.large || props.mid ? styles.iconLarge : styles.iconSmall
    return (
        <View style={styles.mainView}>
            <Text category={titleSize} numberOfLines={1} ellipsizeMode='tail' status={props.control ? 'control' : 'basic'}>{props.title}</Text>
            <View style={styles.subtitleView}>
                <Text category={subtitleSize} appearance='hint' status={props.control ? 'control' : null}>
                    {props.subtitle}</Text>
                {props.iconName ?
                    <Icon
                        fill={props.control ? control : basic}
                        style={iconStyle}
                        pack={props.cp ? 'cp' : undefined}
                        name={props.iconName} /> : null}
            </View>
        </View>
    )
}

export default TopBarTitle

const styles = StyleSheet.create({
    mainView: {
        paddingRight: 24,
        flex: 1
    },
    subtitleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconLarge: {
        height: 18,
        width: 18,
        marginLeft: 5
    },
    iconSmall: {
        height: 16,
        width: 16,
        marginLeft: 5
    }
})