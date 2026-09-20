import { initializeLocalization, translate, translateOverlay } from './index'
import { ItemTypeLabels } from '../constants/labels'
import { ItemTypes } from '../constants/global'
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
        expect(translate('dialogs.attention')).toBe('Atención')
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
