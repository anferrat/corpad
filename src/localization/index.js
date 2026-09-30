import en from './catalogs/en'
import es from './catalogs/es'
import { setActiveLabelCatalog } from '../constants/labels'
import { LanguagePreferences } from './languages'
import { CalculatorTypes } from '../constants/global'
import enApp from './catalogs/en/app'
import esApp from './catalogs/es/app'
import enAddReading from './catalogs/en/addReading'
import esAddReading from './catalogs/es/addReading'
import enBottomSheet from './catalogs/en/bottomSheet'
import esBottomSheet from './catalogs/es/bottomSheet'
import enCalculator from './catalogs/en/calculator'
import esCalculator from './catalogs/es/calculator'
import enCreateSurvey from './catalogs/en/createSurvey'
import esCreateSurvey from './catalogs/es/createSurvey'
import enEdit from './catalogs/en/edit'
import esEdit from './catalogs/es/edit'
import enImport from './catalogs/en/import'
import esImport from './catalogs/es/import'
import enItemView from './catalogs/en/itemView'
import esItemView from './catalogs/es/itemView'
import enList from './catalogs/en/list'
import esList from './catalogs/es/list'
import enMap from './catalogs/en/map'
import esMap from './catalogs/es/map'
import enMultimeterOverlay from './catalogs/en/multimeterOverlay'
import esMultimeterOverlay from './catalogs/es/multimeterOverlay'
import enMultimeterSettings from './catalogs/en/multimeterSettings'
import esMultimeterSettings from './catalogs/es/multimeterSettings'
import enNavigation from './catalogs/en/navigation'
import esNavigation from './catalogs/es/navigation'
import enOverlays from './catalogs/en/overlays'
import esOverlays from './catalogs/es/overlays'
import enOnboardingScreen from './catalogs/en/onboardingScreen'
import esOnboardingScreen from './catalogs/es/onboardingScreen'
import enPotentialSelection from './catalogs/en/potentialSelection'
import esPotentialSelection from './catalogs/es/potentialSelection'
import enSettings from './catalogs/en/settings'
import esSettings from './catalogs/es/settings'
import enSpreadsheetViewer from './catalogs/en/spreadsheetViewer'
import esSpreadsheetViewer from './catalogs/es/spreadsheetViewer'
import enSurveyList from './catalogs/en/surveyList'
import esSurveyList from './catalogs/es/surveyList'
import enSurveySearch from './catalogs/en/surveySearch'
import esSurveySearch from './catalogs/es/surveySearch'
import enTopBar from './catalogs/en/topBar'
import esTopBar from './catalogs/es/topBar'
import enView from './catalogs/en/view'
import esView from './catalogs/es/view'
import enViewMapLayer from './catalogs/en/viewMapLayer'
import esViewMapLayer from './catalogs/es/viewMapLayer'
import enViewMapLayerMarker from './catalogs/en/viewMapLayerMarker'
import esViewMapLayerMarker from './catalogs/es/viewMapLayerMarker'

const catalogs = { en, es }
const featureCatalogs = {
    app: {en: enApp, es: esApp},
    addReading: {en: enAddReading, es: esAddReading},
    bottomSheet: {en: enBottomSheet, es: esBottomSheet},
    calculator: {en: enCalculator, es: esCalculator},
    createSurvey: {en: enCreateSurvey, es: esCreateSurvey},
    edit: {en: enEdit, es: esEdit},
    import: {en: enImport, es: esImport},
    itemView: {en: enItemView, es: esItemView},
    list: {en: enList, es: esList},
    map: {en: enMap, es: esMap},
    multimeterOverlay: {en: enMultimeterOverlay, es: esMultimeterOverlay},
    multimeterSettings: {en: enMultimeterSettings, es: esMultimeterSettings},
    navigation: {en: enNavigation, es: esNavigation},
    overlays: {en: enOverlays, es: esOverlays},
    onboardingScreen: {en: enOnboardingScreen, es: esOnboardingScreen},
    potentialSelection: {en: enPotentialSelection, es: esPotentialSelection},
    settings: {en: enSettings, es: esSettings},
    spreadsheetViewer: {en: enSpreadsheetViewer, es: esSpreadsheetViewer},
    surveyList: {en: enSurveyList, es: esSurveyList},
    surveySearch: {en: enSurveySearch, es: esSurveySearch},
    topBar: {en: enTopBar, es: esTopBar},
    view: {en: enView, es: esView},
    viewMapLayer: {en: enViewMapLayer, es: esViewMapLayer},
    viewMapLayerMarker: {en: enViewMapLayerMarker, es: esViewMapLayerMarker}
}
let activeLanguage = LanguagePreferences.ENGLISH
let activeCatalog = en

const getSystemLanguage = () => {
    try {
        const locale = Intl.DateTimeFormat().resolvedOptions().locale ?? ''
        const language = locale.split('-')[0].toLowerCase()
        return catalogs[language] ? language : LanguagePreferences.ENGLISH
    }
    catch (error) {
        return LanguagePreferences.ENGLISH
    }
}

const getCatalogLanguage = preference => {
    if (preference === LanguagePreferences.SYSTEM || !preference)
        return getSystemLanguage()
    return catalogs[preference] ? preference : LanguagePreferences.ENGLISH
}

const getValue = (object, path) => path.split('.').reduce((value, key) => value?.[key], object)

const interpolate = (value, params = {}) => value.replace(/{{\s*(\w+)\s*}}/g, (_, key) => params[key] ?? '')

const translateValue = (value, params, fallback) => {
    if (Array.isArray(value))
        return value.map(item => typeof item === 'string' ? interpolate(item, params) : item)
    return typeof value === 'string' ? interpolate(value, params) : fallback
}

const actionKeys = {
    OK: 'actions.ok',
    Ok: 'actions.ok',
    Cancel: 'actions.cancel',
    Delete: 'actions.delete',
    'Delete all': 'actions.deleteAll',
    Leave: 'actions.leave',
    Exit: 'actions.exit',
    Undo: 'actions.undo',
    Unpair: 'actions.unpair',
    Proceed: 'actions.proceed',
    Continue: 'actions.continue',
    Remove: 'actions.remove',
    'Leave as is': 'actions.leaveAsIs',
    'Save copy to the device': 'actions.saveCopyToDevice',
    'Try later': 'actions.tryLater'
}

const calculatorTypeKeys = Object.freeze({
    [CalculatorTypes.COATING]: 'coating',
    [CalculatorTypes.CURRENT_FOUR_WIRE]: 'currentFourWire',
    [CalculatorTypes.CURRENT_TWO_WIRE]: 'currentTwoWire',
    [CalculatorTypes.REFERENCE_CELL]: 'referenceCell',
    [CalculatorTypes.SHUNT]: 'shunt',
    [CalculatorTypes.WENNER]: 'wenner'
})

export const initializeLocalization = (preference = LanguagePreferences.SYSTEM) => {
    activeLanguage = getCatalogLanguage(preference)
    activeCatalog = catalogs[activeLanguage]
    setActiveLabelCatalog(activeCatalog.labels)
    return activeLanguage
}

export const getActiveLanguage = () => activeLanguage

export const translateFeature = (feature, key, params = {}, fallback = key) => {
    const featureCatalog = featureCatalogs[feature]
    const value = getValue(featureCatalog?.[activeLanguage], key) ?? getValue(featureCatalog?.en, key) ?? fallback
    return translateValue(value, params, fallback)
}

export const translateApp = (key, params = {}) => translateFeature('app', key, params)
export const translateAddReading = (key, params = {}) => translateFeature('addReading', key, params)
export const translateBottomSheet = (key, params = {}) => translateFeature('bottomSheet', key, params)
export const calculatorTypeKey = calculatorType => calculatorTypeKeys[calculatorType] ?? calculatorType
export const translateCalculator = (key, params = {}) => translateFeature('calculator', key, params, translate(`calculator.${key}`, params))
export const translateCreateSurvey = (key, params = {}) => translateFeature('createSurvey', key, params)
export const translateEdit = (key, params = {}) => translateFeature('edit', key, params)
export const translateImport = (key, params = {}) => translateFeature('import', key, params)
export const translateItemView = (key, params = {}) => translateFeature('itemView', key, params)
export const translateList = (key, params = {}) => translateFeature('list', key, params)
export const translateMap = (key, params = {}) => translateFeature('map', key, params)
export const translateMultimeterOverlay = (key, params = {}) => translateFeature('multimeterOverlay', key, params)
export const translateMultimeterSettings = (key, params = {}) => translateFeature('multimeterSettings', key, params)
export const translateNavigation = (key, params = {}) => translateFeature('navigation', key, params)
export const translateOverlay = (key, params = {}) => translateFeature('overlays', key, params)
export const translateOnboardingScreen = (key, params = {}) => translateFeature('onboardingScreen', key, params)
export const translatePotentialSelection = (key, params = {}) => translateFeature('potentialSelection', key, params)
export const translateSettings = (key, params = {}) => translateFeature('settings', key, params)
export const translateSpreadsheetViewer = (key, params = {}) => translateFeature('spreadsheetViewer', key, params)
export const translateSurveyList = (key, params = {}) => translateFeature('surveyList', key, params)
export const translateSurveySearch = (key, params = {}) => translateFeature('surveySearch', key, params)
export const translateTopBar = (key, params = {}) => translateFeature('topBar', key, params)
export const translateView = (key, params = {}) => translateFeature('view', key, params)
export const translateMapLayer = (key, params = {}) => translateFeature('viewMapLayer', key, params)
export const translateMapLayerMarker = (key, params = {}) => translateFeature('viewMapLayerMarker', key, params)

export const translate = (key, params = {}, fallback = key) => {
    const value = getValue(activeCatalog.messages, key) ?? getValue(en.messages, key) ?? fallback
    return typeof value === 'string' ? interpolate(value, params) : fallback
}

export const translateReference = (reference, fallback = '') => {
    if (reference && typeof reference === 'object' && reference.key)
        return translate(reference.key, reference.params, reference.fallback ?? fallback)
    return reference ?? fallback
}

export const translateAction = (action, fallback = '') => {
    if (action && typeof action === 'object')
        return translateReference(action, fallback)
    return actionKeys[action] ? translate(actionKeys[action], {}, fallback || action) : action ?? fallback
}

initializeLocalization()
