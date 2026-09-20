import { fieldProperties } from '../../../constants/fieldProperties'
import { deleteItem } from '../handlers/deleteItem'
import { deleteSubitem } from '../handlers/deleteSubitem'
import { openExternalSurvey } from '../handlers/openExternalFile'
import { deleteImportSubitem } from '../../../store/actions/importData'
import { warningHandler } from '../../../helpers/error_handler'
import { ItemTypes } from '../../../constants/global'
import { CalculatorTypeTitleLabels, ItemTypeLabels, SubitemTypeLabels } from '../../../constants/labels'
import { CalculatorTypeIconPacks, CalculatorTypeIcons } from '../../../constants/icons'
import { translate } from '../../../localization'
import { deleteMapLayer } from '../handlers/deleteMapLayer'
import { translateTopBar } from '../../../localization'


export const getEditTitle = (globalState, type) => {
    const state = ~Object.values(ItemTypes).indexOf(type) ? globalState.item.edit : globalState.subitem
    return (state?.name === null || state?.name === '') ? state?.defaultName : state?.name ?? translateTopBar('loading')
}

export const getEditSubtype = (state, type) => ~Object.values(ItemTypes).indexOf(type) ? state.item.edit?.testPointType : state.subitem.type

const getTitleBySettingType = (setting) => {
    switch (setting) {
        case 'defaultNames':
            return translate('settings.defaultNames')
        case 'potentials':
            return translate('settings.potentials')
        case 'refCells':
            return translate('settings.referenceCells')
        case 'export':
            return translateTopBar('exportToSpreadsheet')
        case 'exportedFiles':
            return translate('settings.exportedFiles')
        case 'info':
            return translate('settings.surveyOverview')
        case 'about':
            return translate('settings.about')
        case 'localization':
            return translate('settings.language')
        case 'licenses':
            return translateTopBar('licenses')
        case 'multimeter':
            return translate('settings.digitalMultimeter')
        case 'externalLinks':
            return translate('settings.externalLinks')
        case 'photos':
            return translate('settings.images')
        default:
            return translate('common.settings')
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

export const getHeader = (screen, params, navigation, dispatch, openMenu) => {
    if (dispatch && openMenu && navigation && screen)
        switch (screen) {
            case "ExportItem":
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: translate('navigation.exportSurvey'),
                        subtitle: translate('navigation.itemProperties'),
                        icon: 'download-outline',
                        pack: null
                    }
                }
            case "ExportPotentials":
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: translate('navigation.exportSurvey'),
                        subtitle: translate('settings.potentials'),
                        icon: 'download-outline',
                        pack: null
                    }
                }
            case "ExportSubitems":
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: translate('navigation.exportSurvey'),
                        subtitle: translate('navigation.moreProperties'),
                        icon: 'download-outline',
                        pack: null
                    }
                }
            case "ExportOverview":
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: translate('navigation.exportSurvey'),
                        subtitle: translate('navigation.overview'),
                        icon: 'download-outline',
                        pack: null
                    }
                }
            case "ViewMapLayer":
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: translate('navigation.map'),
                        subtitle: translate('navigation.mapSettings'),
                        icon: 'globe-2',
                        pack: null
                    }
                }
            case "ViewMarkerInfo":
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: translate('navigation.markerProperties')
                }
            case "EditMapLayer":
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                        title: translate('navigation.map'),
                        subtitle: translate('navigation.createLayer'),
                        icon: 'globe-2',
                        pack: null
                    },
                    right: [
                        {
                            icon: 'trash',
                            onPress: () => deleteMapLayer(dispatch, navigation, params)
                        }]
                }
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
                        itemType: params.itemType
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
                            onPress: openMenu
                        },
                    ]
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
                        title: ItemTypeLabels[params.itemType] ?? '',
                        subtitle: translate('navigation.importSpreadsheet'),
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
                        title: SubitemTypeLabels[params.subitemType] ?? '',
                        subtitle: translate('navigation.importSettings'),
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
                    title: translate('navigation.importSpreadsheet'),
                    right: null,
                }
            case 'ImportParameters':
                return {
                    display: true,
                    isPrimary: true,
                    left: 'back',
                    title: {
                         title: `${translate('navigation.property')}: "${params.property === 'potential' ? translate('settings.potentials') : fieldProperties[params.property]?.label ?? null}"`,
                         subtitle: translate('navigation.importSpreadsheet'),
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
                        itemType: params.itemType
                    },
                    right: [{
                        icon: 'trash',
                        onPress: () => deleteItem(params.itemId, params.itemType, navigation)
                    }]
                }
            case 'EditSubitem':
                return {
                    display: true,
                    isPrimary: false,
                    left: 'back',
                    title: {
                        editSubitemTitle: true,
                        subitemType: params.subitemType
                    },
                    right: [{
                        icon: 'trash',
                        onPress: () => deleteSubitem(params.itemId, params.subitemId, params.subitemType, navigation)
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
                    title: translate('common.settings'),
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
                            onPress: () => navigation.navigate('CreateSurvey', { withImport: false })
                        }
                    ]
                }
            case 'CreateSurvey':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: translate('navigation.createSurvey'),
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
                    title: translate('navigation.licenses'),
                    right: null
                }
            case 'CycleSettings':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: translate('navigation.multimeterSettings'),
                    right: null
                }
            case 'Spreadsheet':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: {
                        title: params?.title ?? translateTopBar('error'),
                        subtitle: translate('navigation.spreadsheetPreview')
                    },
                    right: null
                }
            case 'Calculator':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: {
                        title: CalculatorTypeTitleLabels[params?.calculatorType] ?? translateTopBar('error'),
                        subtitle: translate('settings.calculator'),
                        icon: CalculatorTypeIcons[params?.calculatorType],
                        pack: CalculatorTypeIconPacks[params?.calculatorType],
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
                        title: CalculatorTypeTitleLabels[params?.calculatorType] ?? translateTopBar('error'),
                        subtitle: translate('navigation.procedureDescription'),
                        icon: CalculatorTypeIcons[params?.calculatorType],
                        pack: CalculatorTypeIconPacks[params?.calculatorType],
                    },
                    right: null
                }
            case 'CalculatorList':
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: translate('settings.calculator'),
                    right: null
                }
            case 'Home':
                return {
                    display: false,
                }
            case "ExternalLink":
                return {
                    display: true,
                    isPrimary: true,
                    title: {
                         title: translate('navigation.itemDiscovered'),
                         subtitle: translate('navigation.label'),
                        icon: 'pricetags',
                        pack: null,
                    },
                    left: null,
                    right: null
                }
            case "FindItemInSurvey":
                return {
                    display: true,
                    isPrimary: true,
                    title: translate('navigation.findInSurvey'),
                    left: 'back',
                    right: null
                }
            case "PipelineMatching":
                return {
                    display: true,
                    isPrimary: true,
                    title: translate('navigation.matchPipelines'),
                    left: 'back',
                    right: null
                }
            default:
                return {
                    display: true,
                    left: 'back',
                    isPrimary: true,
                    title: screen,
                    right: null
                }
            case 'Multimeter':
                return {
                    display: false,
                }
        }
    else return {
        display: 'false'
    }
}
