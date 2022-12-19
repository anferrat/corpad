import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import IconButton from '../../../components/IconButton'
import { Text } from '@ui-kitten/components'
import { basic200, basic300, control, primary } from '../../../styles/colors'
import TopBarTitle from './TopBarTitle'
import SurveyTitle from './SurveyTitle'
import MainMenuTitle from './MainMenuTitle'
import ViewTitle from './ViewTitle'
import EditTitle from './EditTitle'
import CloudButton from './CloudButton'
import NavigationWidget from './NavigationWidget'

const TopBarBase = ({ left, right, title, isPrimary, navigation, noBorder }) => {
    const topBarStyle = isPrimary ? styles.primaryStyle : styles.defaultStyle
    const borderStyle = noBorder ? {} : styles.borderStyle
    return (
        <View style={{ ...styles.topBar, ...topBarStyle, ...borderStyle }} >
            <StatusBar
                barStyle={isPrimary ? 'light-content' : 'dark-content'}
                translucent={true}
                backgroundColor='transparent' />
            <View style={styles.leftRow}>
                <LeftSide
                    navigation={navigation}
                    left={left}
                    isPrimary={isPrimary} />
                <Title
                    isPrimary={isPrimary}
                    title={title} />
            </View>
            <View style={styles.rightRow}>
                <RightSide
                    right={right}
                    isPrimary={isPrimary} />
            </View>
        </View>
    )
}
const RightSide = ({ right, isPrimary }) => {
    if (right !== null && Array.isArray(right) && right?.length > 0)
        return right.map((icon, index) => {
            if (icon?.cloudButton)
                return <CloudButton
                    key={`Left_side_icon_${index}`} />
            else
                if (icon?.navigationWidget)
                    return <NavigationWidget
                        key={`Left_side_icon_${index}`} />
                else
                    return (
                        <IconButton
                            key={`Left_side_icon_${index}`}
                            iconName={icon.icon}
                            pack={icon?.pack}
                            onPress={icon.onPress}
                            color={isPrimary ? control : primary}
                        />)
        })
    else
        return null
}


const LeftSide = ({ left, isPrimary, navigation }) => {
    if (left === 'back')
        return <IconButton
            iconName={'arrow-back-outline'}
            onPress={navigation.goBack}
            color={isPrimary ? control : primary}
        />
    else if (left?.icon && left?.onPress) {
        return <IconButton
            iconName={left.icon}
            pack={left?.pack}
            onPress={left.onPress}
            color={isPrimary ? control : primary}
        />
    }
    else if (left?.component)
        return left.component
    else
        return null
}

const Title = ({ title, isPrimary }) => {
    if (typeof title === 'string' || title instanceof String)
        return <Text category='h5' ellipsizeMode='tail' numberOfLines={1} style={styles.title} status={isPrimary ? 'control' : 'primary'}>{title}</Text>
    else if (title?.title && title?.subtitle)
        return <TopBarTitle
            isPrimary={isPrimary}
            title={title.title}
            subtitle={title.subtitle}
            icon={title?.icon}
            pack={title?.pack}
        />
    else if (title?.surveyTitle)
        return <SurveyTitle />
    else if (title?.mainMenuTitle)
        return <MainMenuTitle />
    else if (title?.viewTitle && title?.dataType)
        return <ViewTitle
            dataType={title.dataType} />
    else if (title?.editTitle && title?.dataType)
        return <EditTitle
            dataType={title.dataType} />
    else return null
}

export default React.memo(TopBarBase)

const styles = StyleSheet.create({
    topBar: {
        height: StatusBar.currentHeight + 60,
        paddingTop: StatusBar.currentHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    primaryStyle: {
        backgroundColor: primary,
    },
    defaultStyle: {
        backgroundColor: control,
    },
    borderStyle: {
        borderBottomColor: basic300,
        borderBottomWidth: 1,
    },
    rightRow: {
        flexDirection: 'row',
    },
    leftRow: {
        flexDirection: 'row',
        flex: 1,
        flexGrow: 1,
        alignItems: 'center'
    },
    title: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 3
    }
})