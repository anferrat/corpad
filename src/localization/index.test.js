import { initializeLocalization, translate, translateBottomSheet, translateList, translateOverlay } from './index'
import { CalculatorTypeLabels, DefaultNames, ExportFormatTypeLabeles, ExportItemPropertyLabels, IsolationShortedLabels, IsolationTypeLabels, ItemTypeLabels, MapLayerFeatureLabels, MeasurementTypeLabels, PermanentPotentialTypeLabels, PotentialUnitDescriptionLabels, RectifierReadingOptionLabels, SortingOptionLabels, SubitemTypeLabels, TestPointReadingOptionLabels, TestPointTypeLabels, WireColorLabels } from '../constants/labels'
import { CalculatorTypes, ExportFormatTypes, ExportItemProperties, IsolationShorted, IsolationTypes, ItemTypes, MapLayerFeatures, MultimeterMeasurementTypes, PermanentPotentialTypes, PotentialUnits, RectifierReadingOptions, SortingOptions, SubitemTypes, TestPointReadingOptions, TestPointTypes, WireColors } from '../constants/global'
import { fieldProperties } from '../constants/fieldProperties'
import { getFormattedDate } from '../helpers/functions'
import en from './catalogs/en'
import es from './catalogs/es'
import enOverlays from './catalogs/en/overlays'
import esOverlays from './catalogs/es/overlays'

describe('localization', () => {
    afterEach(() => {
        initializeLocalization('en')
    })

    it('uses the selected catalog through existing label maps', () => {
        initializeLocalization('es')

        expect(ItemTypeLabels[ItemTypes.TEST_POINT]).toBe('Punto de prueba')
        expect(TestPointTypeLabels[TestPointTypes.TEST_STATION]).toBe('Estación de prueba')
        expect(TestPointTypeLabels[TestPointTypes.JUNCTION_BOX]).toBe('Caja de conexiones')
        expect(SortingOptionLabels[SortingOptions.NEW_TO_OLD]).toBe('Fecha de modificación: Más reciente primero')
        expect(TestPointReadingOptionLabels[TestPointReadingOptions.CURRENT_DENSITY]).toBe('Densidad de corriente: Cupones')
        expect(RectifierReadingOptionLabels[RectifierReadingOptions.TARGET]).toBe('Objetivo de corriente')
        expect(IsolationTypeLabels[IsolationTypes.ISOLATION_KIT]).toBe('Kit de aislamiento')
        expect(IsolationTypeLabels[IsolationTypes.ISOLATION_JOINT]).toBe('Junta de aislamiento')
        expect(IsolationShortedLabels[IsolationShorted.SHORTED]).toBe('Cortocircuitado')
        expect(translate('dialogs.attention')).toBe('Atención')
    })

    it('localizes constant labels while keeping logic-sensitive labels in English', () => {
        initializeLocalization('es')

        expect(WireColorLabels[WireColors.BLACK_RED]).toBe('Negro con rojo')
        expect(SubitemTypeLabels[SubitemTypes.ANODE]).toBe('Cable de prueba de ánodo')
        expect(PermanentPotentialTypeLabels[PermanentPotentialTypes.CONNECTED]).toBe('Conectado')
        expect(PotentialUnitDescriptionLabels[PotentialUnits.MILIVOLTS]).toBe('Milivoltios')
        expect(CalculatorTypeLabels[CalculatorTypes.SHUNT]).toBe('Convertidor de derivación')
        expect(MeasurementTypeLabels[MultimeterMeasurementTypes.CURRENT]).toBe('Amperios CC')
        expect(MapLayerFeatureLabels[MapLayerFeatures.POLYGON]).toBe('Polígono')
        expect(ExportFormatTypeLabeles[ExportFormatTypes.CSV]).toBe('Archivo separado por comas (.csv)')
        expect(fieldProperties.tapFine.label).toBe('Ajuste fino')
        expect(fieldProperties.tapCoarse.label).toBe('Ajuste grueso')
        expect(fieldProperties.maxVoltage.label).toBe('Voltios CC')
        expect(fieldProperties.maxCurrent.label).toBe('Amperios CC')

        expect(DefaultNames[ItemTypes.PIPELINE]).toBe('Pipeline')
        expect(ExportItemPropertyLabels[ExportItemProperties.NAME]).toBe('Name')
    })

    it('localizes list dates and reading labels', () => {
        initializeLocalization('es')

        expect(translate('survey.today')).toBe('Hoy')
        expect(translate('dates.months.jan')).toBe('Ene')
        expect(getFormattedDate(Date.now())).toMatch(/^Hoy, \d{2}:\d{2}$/)
        expect(getFormattedDate(new Date(2000, 0, 15, 12, 0).getTime())).toContain('Ene')
        expect(translateList('shorted')).toBe('Cortocircuitado')
        expect(translateBottomSheet('readings')).toBe('Lecturas')
    })

    it('falls back to English for an unsupported language', () => {
        initializeLocalization('fr')

        expect(ItemTypeLabels[ItemTypes.TEST_POINT]).toBe('Test point')
        expect(translate('language.spanish')).toBe('Spanish')
    })

    it('keeps label maps complete across catalogs', () => {
        expect(Object.keys(es.labels).sort()).toEqual(Object.keys(en.labels).sort())
        Object.keys(en.labels).forEach(name => {
            expect(Object.keys(es.labels[name]).sort()).toEqual(Object.keys(en.labels[name]).sort())
        })
    })

    it('provides localized field metadata and centralized error messages', () => {
        initializeLocalization('es')

        expect(translate('fields.name.label')).toBe('Nombre')
        expect(translate('errors.messages.505')).toBe(es.messages.errors.messages[505])
        expect(translate('warnings.messages.missingImages', {count: 2})).toContain('2')
    })

    it('returns localized feature arrays', () => {
        initializeLocalization('es')
        expect(translateOverlay('onboarding.editBond')).toEqual(esOverlays.onboarding.editBond)

        initializeLocalization('en')
        expect(translateOverlay('onboarding.editBond')).toEqual(enOverlays.onboarding.editBond)
    })
})
