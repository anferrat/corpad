import englishList from '../en/list'

export default {
    ...englishList,
    sort: 'Ordenar',
    filter: 'Filtrar',
    noItems: 'No hay elementos',
    filteredHint: 'Todos los resultados están filtrados. Borre los filtros para verlos.',
    addItemHint: 'Para añadir un elemento nuevo, pulse Añadir y seleccione un tipo.',
    images: 'Imágenes: {{count}}',
    itemNotFound: 'Elemento no encontrado',
    automatic: 'Automático',
    shorted: 'Cortocircuitado',
    reading: {
        ...englishList.reading,
        on: 'ON',
        off: 'OFF',
        native: 'DEPOL',
        current: 'Corriente',
        currentDensity: 'Densidad de corriente',
        shortingCurrent: 'Corriente de cortocircuito',
        amps: 'Amperios',
        volts: 'Voltios',
        min: 'Mín.',
        max: 'Máx.'
    }
}
