import { sections as englishSections } from '../en/labels'

export const sections = Object.fromEntries(Object.entries(englishSections).map(([section, labels]) => [section, Object.fromEntries(Object.entries(labels).map(([name, values]) => [name, { ...values }]))]))

Object.assign(sections.survey.ItemTypeLabels, {
    TEST_POINT: 'Punto de prueba',
    RECTIFIER: 'Rectificador',
    PIPELINE: 'Tubería'
})

Object.assign(sections.survey.ItemTypeLabelsPlural, {
    TEST_POINT: 'Puntos de prueba',
    RECTIFIER: 'Rectificadores',
    PIPELINE: 'Tuberías'
})

Object.assign(sections.common.StatusLabels, {
    0: 'Aprobado',
    1: 'Alerta',
    2: 'Problema',
    3: 'Sin comprobar'
})

Object.assign(sections.measurements.LengthUnitDescriptionLabels, {
    0: 'Metro',
    1: 'Centímetro',
    2: 'Pie'
})

Object.assign(sections.measurements.ResistivityUnitDescriptionLabels, {
    0: 'Ohmio-centímetro',
    1: 'Ohmio-pie',
    2: 'Ohmio-metro'
})

export const labels = Object.assign({}, ...Object.values(sections))
