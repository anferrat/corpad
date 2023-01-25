import { testPointTypes, testPointTypeCodes, labels, calculatorTypes } from '../../../constants/constants'
import { fieldProperties } from '../../../constants/fieldProperties'
import { deleteItem } from '../handlers/deleteItem'
import { deleteSubitem } from '../handlers/deleteSubitem'
import { launchMenu } from '../handlers/launchMenu'
import { openExternalSurvey } from '../handlers/openExternalFile'
import { DEVELOPER_MODE_ON } from '../../../../App'
import { deleteImportSubitem } from '../../../store/actions/importData'
import { warningHandler } from '../../../helpers/error_handler'

export const subtitleHandler = (dataType, subType = undefined) => {
    switch (dataType) {
        case 'TEST_POINT':
            return testPointTypes[subType]
        case 'RECTIFIER':
            return 'Rectifier'
        case 'PIPELINE':
            return 'Pipeline'
        case 'CARD':
            return labels[subType]?.label ?? 'Error'
        case 'CIRCUIT':
            return 'Circuit'
    }
}

export const iconHandler = (dataType, subType = undefined) => {
    switch (dataType) {
        case 'TEST_POINT':
            return testPointTypeCodes[subType]
        case 'RECTIFIER':
            return 'RT'
        case 'PIPELINE':
            return 'PL'
        case 'CARD':
            return subType
        case 'CIRCUIT':
            return 'CT'
    }
}

export const getEditTitle = (state, dataType) => {
    const titleState = dataType === 'CARD' || dataType === 'CIRCUIT' ? state.subitem : state.item.edit
    return (titleState?.name === null || titleState?.name === '') ? titleState?.defaultName : titleState?.name ?? 'Error'
}

export const getEditSubtype = (state, dataType) => (dataType !== 'CARD' ? state.item.edit?.testPointType : state.subitem.type) ?? 'Error'

const getTitleBySettingType = (setting) => {
    switch (setting) {
        case 'defaultNames':
            return 'Default names'
        case 'potentials':
            return 'Potentials'
        case 'refCells':
            return 'Reference cells'
        case 'export':
            return 'Export to spreadsheet'
        case 'exportedFiles':
            return 'Exported files'
        case 'info':
            return 'Survey overview'
        case 'about':
            return 'About'
        case 'licenses':
            return 'Licenses'
        default:
            return 'Settings'
    }
}
/*
getHeader returns object with Header data for TopBar component. 

getHeader : {
    display: true|false - is header shown for the screen
    left: 'back'| null  (back button displayed if 'back')
    right: [               //generates icon buttons on right side.
        ...,
        {
            cloudButton?: true | false - renders CloudButton component if true, ignores other props
            icon: <iconName>,
            pack?: <packName>,
            onPress: ()=>{}
        },
    ],
    title: 'Title' | {
        title: 'Title',
        subtitle: 'Subtitle',
        icon?: <iconName>,
        pack?: <iconpack>,

        //special props to render components that refer global store, kinda ugly, but hopefully rest of the screens will have standard header titles

        surveyTitle?: true | false render Survey title component, ignores other props
        mainMenuTitle?: true | false renders mainMenuTitle component, ignores other props
        editTitle?: true | false renders Edit Title,
        viewTitle?: true | false renders ViewTitle
    }
}

*/

export const getHeader = (screen, params, navigation, dispatch, bottomSheet) => {
    if (dispatch && bottomSheet.current && navigation && screen)
        switch (screen) {
            case 'Onboarding':
                return {
                    display: false
                }
            case 'ViewItem':
                return {
                    display: true,
                    left: 'back',
                    title: {
                        viewTitle: true,
                        dataType: params.dataTypeItem
                    },
                    right: [
                        { navigationWidget: true }
                    ],
                    isPrimary: false
                }
            case 'DevScreen':
                return {
                    display: false
                }
            case 'TestPoints':
            case 'Rectifiers':
            case 'Pipelines':
                return {
                    noBorder: true,
                    display: true,
                    isPrimary: false,
                    left: null,
                    title: {
                        surveyTitle: true
                    },
                    right: [

                        {
                            cloudButton: true
                        },
                        {
                            icon: 'search',
                            onPress: () => navigation.navigate('Search')
                        },
                        {
                            icon: 'more-vertical-outline',
                            onPress: () => launchMenu(bottomSheet, dispatch)
                        },
                    ].concat(DEVELOPER_MODE_ON ? {
                        icon: 'eye',
                        onPress: () => navigation.navigate('DevScreen')
                    } : []
                    )
                }
            case 'Map':
                return {
                    display: false
                }
            case 'ImportItem':
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: labels[params.itemType]?.label ?? '',
                        subtitle: 'Import from .csv',
                        icon: false,
                        pack: null,
                    },
                    right: null
                }
            case 'ImportSubitem':
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: labels[params.subitemType]?.label ?? '',
                        subtitle: 'Import settings',
                        icon: false,
                        pack: null,
                    },
                    right: [
                        {
                            icon: 'trash',
                            onPress: async () => {
                                const confirm = await warningHandler(59, 'Delete', 'Cancel')
                                if (confirm) {
                                    navigation.goBack()
                                    dispatch(deleteImportSubitem(params.subitemIndex))
                                }
                            }
                        }
                    ]
                }
            case 'ImportFile':
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: 'Import from .csv',
                    right: null,
                }
            case 'ImportParameters':
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: `Property: "${params.property === 'potential' ? 'Potentials' : fieldProperties[params.property]?.label ?? null}"`,
                        subtitle: 'Import from .csv',
                        icon: false,
                        pack: null,
                    },
                    right: null,
                }
            case 'EditItem':
                return {
                    display: true,
                    isPrimary: false,
                    left: 'back',
                    title: {
                        editTitle: true,
                        dataType: params.dataTypeItem
                    },
                    right: [{
                        icon: 'trash',
                        onPress: () => deleteItem(dispatch, params.dataTypeItem, params.itemId, navigation)
                    }]
                }
            case 'EditSubitem':
                return {
                    display: true,
                    isPrimary: false,
                    left: 'back',
                    title: {
                        editTitle: true,
                        dataType: params.dataTypeSubitem
                    },
                    right: [{
                        icon: 'trash',
                        onPress: () => deleteSubitem(dispatch, params.dataTypeSubitem, params.itemId, params.dataTypeItem, params.subitemId, navigation)
                    }]
                }
            case 'Search':
                return {
                    display: false
                }
            case 'Settings':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: 'Settings',
                    right: null
                }
            case 'CloudSurveyList':
            case 'Authorization':
            case 'NoInternetScreen':
            case 'DeviceSurveyList':
                return {
                    display: true,
                    left: null,
                    isPrimary: true,
                    title: {
                        mainMenuTitle: true
                    },
                    right: [
                        {
                            icon: 'folder',
                            onPress: () => openExternalSurvey(dispatch)
                        },
                        {
                            icon: 'plus',
                            onPress: () => navigation.navigate('CreateSurvey')
                        }
                    ]
                }
            case 'CreateSurvey':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: 'Create survey',
                    right: null
                }
            case 'SettingDetails':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: getTitleBySettingType(params.setting),
                    right: null
                }
            case 'Licences':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: 'Licences',
                    right: null
                }
            case 'Spreadsheet':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: {
                        title: params?.title ?? 'Error',
                        subtitle: '.csv file preview'
                    },
                    right: null
                }
            case 'Calculator':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: {
                        title: calculatorTypes[params?.calculatorType]?.title ?? 'Error',
                        subtitle: 'Corrosion calculator',
                        icon: calculatorTypes[params?.calculatorType]?.icon,
                        pack: calculatorTypes[params?.calculatorType]?.pack,
                    },
                    right: [{
                        icon: 'question-mark-circle-outline',
                        onPress: () => navigation.navigate('CalculatorDescription', { calculatorType: params?.calculatorType }),
                    }]
                }
            case 'CalculatorDescription':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: {
                        title: calculatorTypes[params?.calculatorType]?.title ?? 'Error',
                        subtitle: 'Procedure description',
                        icon: calculatorTypes[params?.calculatorType]?.icon,
                        pack: calculatorTypes[params?.calculatorType]?.pack,
                    },
                    right: null
                }
            case 'CalculatorList':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: 'Corrosion calculator',
                    right: null
                }
            case 'Home':
                return {
                    display: false,
                }
            default:
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: screen,
                    right: null
                }
        }
    else return {
        display: 'false'
    }
}