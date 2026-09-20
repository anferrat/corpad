import englishCalculator from '../en/calculator'

export default {
    ...englishCalculator,
    common: {
        calculate: 'Calcular',
        saved: 'Guardado',
        reset: 'Restablecer',
        on: 'Activado',
        off: 'Desactivado',
        noCalculationsDescription: 'Después de completar un cálculo, pulse el botón Guardar para encontrarlo aquí.'
    },
    categories: {
        current: 'Corriente',
        soil: 'Suelo',
        coating: 'Revestimiento',
        other: 'Otro'
    },
    types: {
        coating: 'Calidad del revestimiento',
        currentFourWire: 'Corriente en línea (4 cables)',
        currentTwoWire: 'Corriente en línea (2 cables)',
        referenceCell: 'Convertidor de referencia',
        shunt: 'Convertidor de derivación',
        wenner: 'Resistividad de capas'
    },
    titles: {
        coating: 'Conductancia',
        currentFourWire: 'Corriente en línea',
        currentTwoWire: 'Corriente en línea',
        referenceCell: 'Referencia',
        shunt: 'Derivación',
        wenner: 'Resistividad'
    },
    descriptions: {
        coating: 'Calcula la conductancia del revestimiento de una sección de tubería usando potenciales y corriente ACTIVADOS/DESACTIVADOS, y determina la calidad del revestimiento.',
        currentFourWire: 'Calcula la corriente en línea usando la caída de tensión entre dos puntos y la resistencia calculada de la tubería.',
        currentTwoWire: 'Calcula la corriente en línea usando el diámetro de la tubería y la caída de tensión entre dos puntos.',
        referenceCell: 'Convierte valores de tensión con referencia a distintos tipos de celdas.',
        shunt: 'Convierte la caída de tensión en una derivación a corriente usando el factor o la relación de derivación.',
        wenner: 'Calcula la resistividad de las capas del suelo usando el método Wenner y el análisis Barnes.'
    },
    inputs: {
        factor: 'Factor',
        currentRatio: 'Relación de corriente',
        voltageRatio: 'Relación de tensión',
        voltageDrop: 'Caída de tensión',
        pipeDiameter: 'Diámetro de tubería',
        selectDiameter: 'Seleccionar diámetro',
        pipeSchedule: 'Schedule de tubería',
        selectSchedule: 'Seleccionar schedule',
        segmentLength: 'Longitud del segmento',
        testCurrent: 'Corriente de prueba',
        baseReferenceType: 'Tipo de referencia base',
        targetReferenceType: 'Tipo de referencia objetivo',
        selectReferenceType: 'Seleccionar tipo de referencia',
        basePotentialReading: 'Lectura de potencial base',
        averageSoilResistivity: 'Resistividad media del suelo',
        current: 'Corriente',
        potentials: 'Potenciales',
        spacing: 'Espaciado',
        resistance: 'Resistencia'
    },
    coating: {
        testPointStart: 'Punto de prueba 1 - Inicio',
        testPointEnd: 'Punto de prueba 2 - Fin'
    },
    selectors: {
        ratio: 'Relación',
        factor: 'Factor',
        average: 'Promedio',
        layers: 'Capas'
    },
    results: {
        shuntTitle: 'Derivación ({{ratioVoltage}} mV - {{ratioCurrent}} A)',
        shuntFactor: 'Factor de derivación',
        shuntResistance: 'Resistencia de derivación',
        twoWireTitle: 'Corriente en línea de dos cables ({{distance}} {{unit}})',
        steelResistivity: 'Resistividad del acero',
        pipeWeight: 'Peso de la tubería',
        pipeSegmentResistance: 'Resistencia del segmento de tubería',
        fourWireTitle: 'Corriente en línea de cuatro cables (corriente de prueba de {{current}} A)',
        sectionResistance: 'Resistencia de la sección',
        calibrationFactor: 'Factor de calibración',
        coatingTitle: 'Resistencia del revestimiento ({{npsValue}}, {{spacing}} {{unit}})',
        pipeToEarthResistance: 'Resistencia entre tubería y tierra',
        specificResistance: 'Resistencia específica',
        conductance: 'Conductancia',
        specificConductance: 'Conductancia específica',
        normalizedConductance: 'Conductancia (suelo de 1000 ohm-cm)',
        potentialsConverter: 'Convertidor de potenciales',
        coefficient: 'Coeficiente',
        targetReference: 'Referencia objetivo',
        convertedPotential: 'Potencial convertido',
        layer: 'Capa',
        resultLabel: 'Capas: {{count}}, 0 - {{spacing}} {{unit}}',
        resultLabelDistance: '{{distance}} {{unit}},  {{current}} A',
        resultLabelResistance: '{{resistance}} ohm, {{current}} A',
        resultLabelShunt: '{{ratioVoltage}} mV - {{ratioCurrent}} A',
        resultLabelReference: '{{initialCode}} -> {{targetCode}}',
        resistivity: 'Resistividad'
    },
    referenceCells: {
        copperSulfate: 'Cobre/sulfato de cobre',
        saturatedCalomel: 'Calomelanos saturado',
        silverChloride: 'Plata/cloruro de plata',
        zinc: 'Zinc',
        standardHydrogen: 'Hidrógeno estándar'
    },
    info: {
        setup: 'Configuración:',
        procedure: 'Procedimiento:',
        hints: 'Consejos:',
        addLayer: 'Añadir capa ({{count}}/{{max}})',
        points: {
            coating: [
                'Asigne una sección de tubería para la prueba de calidad del revestimiento. Debe tener dos puntos de acceso, como estaciones de prueba, donde sea posible medir los potenciales de la tubería y la corriente que circula.',
                'Configure el programa de interrupción del rectificador de protección catódica existente o instale una fuente temporal con lecho de tierra.',
                'Mida la distancia entre los dos puntos de acceso (m o pies) y determine el diámetro de la tubería.',
                'En el primer punto de acceso (Inicio), mida los potenciales tubería-suelo ACTIVADO/DESACTIVADO y la corriente que circula en ambos estados.',
                'Mida la resistividad media del suelo desde la superficie hasta la profundidad de la tubería en el primer punto de acceso (Inicio).',
                'Repita los pasos 4 y 5 para el segundo punto de acceso (Fin), complete los campos y pulse “Calcular”.'
            ],
            currentFourWire: [
                'Mida la caída de tensión entre dos puntos de prueba y registre su magnitud.',
                'Instale una fuente externa y conecte los terminales negativo y positivo a la tubería, fuera de los puntos de prueba iniciales, como se indica en el diagrama.',
                'Registre la corriente de prueba aplicada y mida la caída de tensión entre los dos puntos iniciales. Mantenga los terminales del voltímetro en las mismas ubicaciones que en el paso 1.',
                'Complete los campos y pulse “Calcular”. La corriente resultante es la corriente residual que circulaba por la tubería antes de aplicar la corriente de prueba.',
                'Si la caída de tensión del paso 1 es positiva, la corriente residual va del terminal positivo al negativo del voltímetro; si es negativa, la dirección es la opuesta.'
            ],
            currentTwoWire: [
                'Mida la caída de tensión entre dos puntos de prueba de la tubería.',
                'Determine la longitud del segmento entre los dos puntos, y seleccione el diámetro y el schedule de la tubería.',
                'Complete los campos y pulse “Calcular”.',
                'Si la caída de tensión del paso 1 es positiva, la corriente va del terminal positivo al negativo del voltímetro; si es negativa, la dirección es la opuesta.'
            ],
            shunt: [
                'Determine la relación o el factor de derivación indicado en el cuerpo de la derivación o en las especificaciones del fabricante.',
                'Mida la caída de tensión en la derivación usando los terminales de medición.',
                'Complete los campos y pulse “Calcular”.',
                'Si la caída de tensión del paso 2 es positiva, la corriente va del terminal positivo al negativo del voltímetro; si es negativa, la dirección es la opuesta.'
            ],
            referenceCell: [
                'Mida el potencial usando un tipo de celda de referencia de la lista.',
                'Complete los campos. Seleccione como referencia base el tipo de celda utilizado y como referencia objetivo el tipo al que debe convertirse el potencial.',
                'Pulse “Calcular”.'
            ],
            wenner: [
                'Coloque cuatro electrodos alineados y equidistantes en el suelo.',
                'Conecte los electrodos a un medidor de resistividad del suelo según el diagrama o el manual del fabricante. Los dos electrodos exteriores inyectan corriente y los dos interiores miden la tensión.',
                'Mida la resistencia e introduzca los datos. Para medir la resistividad de distintas capas con el método Barnes, pulse “Añadir capa” y repita los pasos 1 y 2 con otra separación. Los valores no tienen que estar ordenados. Puede tener un máximo de cinco capas en un cálculo.',
                'Pulse “Calcular”.'
            ]
        },
        hintItems: {
            coating: [
                'Para más detalles, consulte NACE TM0102, Measurement of Protective Coating Electrical Conductance on Underground Pipelines.',
                'El método de atenuación no está implementado. Una diferencia significativa en la caída IR entre dos ubicaciones puede producir un resultado impreciso. Consulte NACE TM0102 para más información.',
                'Elija puntos de acceso alejados del lecho de tierra y de otras fuentes de interferencia.',
                'La resistividad del suelo puede calcularse con el método Wenner (calculadora de resistividad de capas).'
            ],
            currentFourWire: [
                'El factor de calibración puede usarse para cálculos posteriores en la misma ubicación. Debe recalcularse si cambia la temperatura de funcionamiento de la tubería.'
            ],
            currentTwoWire: [
                'La resistencia del segmento se calcula con la resistividad del acero al carbono (99 % Fe, 1 % C) de 14,3 μΩ-cm a 20 °C, pero puede variar de 10 a 70 μΩ-cm según distintas publicaciones.',
                'Este método es impreciso y solo sirve para estimar aproximadamente la corriente de la tubería. El error aumenta con diámetros y longitudes mayores y con temperaturas más altas.'
            ],
            referenceCell: [
                'Este convertidor no tiene en cuenta el efecto de la temperatura en las lecturas de potencial. Se supone que los potenciales se tomaron a 25 °C.'
            ],
            wenner: [
                'Para más detalles, consulte ASTM G57, Standard Test Method for Measurement of Soil Resistivity Using the Wenner Four-Electrode Method.'
            ]
        }
    }
}
