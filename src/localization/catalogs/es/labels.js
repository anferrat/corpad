import { sections as englishSections } from '../en/labels'

export const sections = Object.fromEntries(Object.entries(englishSections).map(([section, labels]) => [section, Object.fromEntries(Object.entries(labels).map(([name, values]) => [name, { ...values }]))]))

Object.assign(sections.survey.ItemTypeLabels, {
    TEST_POINT: 'Punto de prueba',
    RECTIFIER: 'Rectificador',
    PIPELINE: 'Línea'
})

Object.assign(sections.survey.ItemTypeLabelsPlural, {
    TEST_POINT: 'Puntos de prueba',
    RECTIFIER: 'Rectificadores',
    PIPELINE: 'Líneas'
})

Object.assign(sections.items.WireColorLabels, {
    0: 'Negro',
    1: 'Verde',
    2: 'Blanco',
    3: 'Amarillo',
    4: 'Rojo',
    5: 'Rosa',
    6: 'Azul claro',
    7: 'Azul oscuro',
    8: 'Blanco con rojo',
    9: 'Blanco con negro',
    10: 'Negro con rojo',
    11: 'Verde con amarillo'
})

Object.assign(sections.survey.TestPointTypeLabels, {
    0: 'Estación de prueba',
    1: 'Línea',
    2: 'Caja de conexiones',
    3: 'Nota de campo',
    4: 'Medición'
})

Object.assign(sections.common.SortingOptionLabels, {
    0: 'Nombre: A - Z',
    1: 'Nombre: Z - A',
    2: 'Fecha de modificación: Más reciente primero',
    3: 'Fecha de modificación: Más antiguo primero',
    4: 'Ubicación: Más cercana primero'
})

Object.assign(sections.survey.TestPointReadingOptionLabels, {
    0: 'Potenciales: ON/OFF',
    1: 'Potenciales: OFF/Natural',
    2: 'Corriente: Derivaciones y conexiones',
    3: 'Densidad de corriente: Cupones',
    4: 'Corriente de cortocircuito: Aislamiento'
})

Object.assign(sections.survey.RectifierReadingOptionLabels, {
    0: 'Corriente y voltaje',
    1: 'Objetivo de corriente'
})

Object.assign(sections.survey.SubitemTypeLabels, {
    AN: 'Cable de prueba de ánodo',
    BD: 'Conexión',
    CT: 'Circuito de rectificador',
    CN: 'Cupón',
    IK: 'Conjunto de aislamiento',
    PL: 'Cable de prueba de tubería',
    RE: 'Cable de referencia estacionario',
    RS: 'Elevador de tubería',
    SH: 'Derivación',
    FC: 'Estructura extranjera',
    OT: 'Cable de prueba',
    AB: 'Lecho de ánodos',
    SR: 'Prueba de resistividad del suelo'
})

Object.assign(sections.survey.PermanentPotentialTypeLabels, {
    PERM_ON: 'Encendido',
    PERM_OFF: 'Apagado',
    AC: 'CA',
    PERM_NATIVE: 'Natural',
    PERM_CONNECTED: 'Conectado',
    PERM_DISCONNECTED: 'Desconectado'
})

Object.assign(sections.items.IsolationTypeLabels, {
    0: 'Kit de aislamiento',
    1: 'Junta de aislamiento',
    2: 'Otro'
})

Object.assign(sections.items.IsolationShortedLabels, {
    0: 'No cortocircuitado',
    1: 'Cortocircuitado'
})

Object.assign(sections.common.StatusLabels, {
    0: 'Aprobado',
    1: 'Alerta',
    2: 'Problema',
    3: 'Sin revisar'
})

Object.assign(sections.items.CouponTypeLabels, {
    0: 'CA',
    1: 'CC'
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

Object.assign(sections.measurements.PotentialUnitDescriptionLabels, {
    0: 'Milivoltios negativos',
    1: 'Milivoltios',
    2: 'Voltios negativos',
    3: 'Voltios'
})

Object.assign(sections.items.AnodeMaterialLabels, {
    0: 'Magnesio',
    1: 'Aluminio',
    2: 'Zinc',
    3: 'Otro'
})

Object.assign(sections.items.ReferenceCellTypeLabels, {
    0: 'Sulfato de cobre',
    1: 'Zinc',
    2: 'Cloruro de plata',
    3: 'Calomelanos saturado',
    4: 'Hidrógeno normal'
})

Object.assign(sections.items.PipelineMaterialLabels, {
    0: 'Acero al carbono',
    1: 'Acero aleado',
    2: 'Hierro fundido',
    3: 'Cobre',
    4: 'Níquel',
    5: 'PVC',
    6: 'HDPE',
    7: 'Otro'
})

Object.assign(sections.items.PipelineCoatingLabels, {
    0: 'Sin revestimiento',
    1: 'Revestido'
})

Object.assign(sections.items.PipelineProductLabels, {
    0: 'Gas natural',
    1: 'Hidrocarburos líquidos',
    2: 'Agua',
    3: 'Otro'
})

Object.assign(sections.items.PowerSourceLabels, {
    0: 'Red de CA',
    1: 'TEG',
    2: 'Turbina eólica',
    3: 'Panel solar'
})

Object.assign(sections.items.TapOptionLabels, {
    0: 'Grueso-fino',
    1: 'VA %',
    2: 'Automático'
})

Object.assign(sections.calculator.CalculatorTypeLabels, {
    coating: 'Calidad del revestimiento',
    current4Wire: 'Corriente en línea (4 cables)',
    current2Wire: 'Corriente en línea (2 cables)',
    refCell: 'Convertidor de referencia',
    shunt: 'Convertidor de derivación',
    wenner: 'Resistividad de capas'
})

Object.assign(sections.calculator.CalculatorTypeTitleLabels, {
    coating: 'Conductancia',
    current4Wire: 'Corriente en línea',
    current2Wire: 'Corriente en línea',
    refCell: 'Referencia',
    shunt: 'Derivación',
    wenner: 'Resistividad'
})

Object.assign(sections.calculator.CalculatorTypeDescriptionLabels, {
    coating: 'Calcula la conductancia del revestimiento de una sección de tubería usando potenciales de encendido y apagado y corriente, y determina la calidad del revestimiento.',
    current4Wire: 'Calcula la corriente en línea usando la caída de tensión entre dos puntos y la resistencia calculada de la tubería.',
    current2Wire: 'Calcula la corriente en línea usando el diámetro de la tubería y la caída de tensión entre dos puntos.',
    refCell: 'Convierte valores de tensión con referencia a distintos tipos de celdas.',
    shunt: 'Convierte la caída de tensión en una derivación a corriente usando el factor o la relación de derivación.',
    wenner: 'Calcula la resistividad de las capas del suelo usando el método Wenner y el análisis Barnes.'
})

Object.assign(sections.calculator.CalculatorTypeFileNameLabels, {
    coating: 'Conductancia_revestimiento',
    current4Wire: 'Corriente_en_linea_cuatro_cables',
    current2Wire: 'Corriente_en_linea_dos_cables',
    refCell: 'Conversion_celda_referencia',
    shunt: 'Corriente_derivacion',
    wenner: 'Prueba_Wenner'
})

Object.assign(sections.multimeter.MeasurementTypeLabels, {
    POTENTIALS: 'Voltios CC',
    VOLTAGE: 'Voltios CC',
    CURRENT: 'Amperios CC',
    COUPON_CURRENT: 'Miliamperios CC',
    VOLTAGE_DROP: 'Milivoltios CC',
    COUPON_CURRENT_AC: 'Miliamperios CA',
    POTENTIALS_AC: 'Voltios CA'
})

Object.assign(sections.multimeter.MultimeterCycleLabels, {
    0: 'Apagado',
    1: 'Encendido'
})

Object.assign(sections.multimeter.MultimeterSyncModeLabels, {
    0: 'Sin ciclo',
    1: 'Alto/bajo',
    2: 'Sincronización temporal',
    3: 'Cambio'
})

Object.assign(sections.map.ImageSourceLabels, {
    CAMERA: 'Cámara',
    LIBRARY: 'Biblioteca',
    STORAGE: 'Almacenamiento'
})

Object.assign(sections.map.MapLayerFeatureLabels, {
    Point: 'Punto',
    LineString: 'Línea',
    Polygon: 'Polígono'
})

Object.assign(sections.map.StrokeColorLabels, {
    0: 'Amarillo',
    1: 'Rojo',
    2: 'Verde',
    3: 'Azul',
    4: 'Morado',
    5: 'Naranja'
})

Object.assign(sections.importExport.ExportFormatTypeLabeles, {
    csv: 'Archivo separado por comas (.csv)',
    kml: 'Archivo de lenguaje de marcado Keyhole (.kml)'
})

Object.assign(sections.items.AnodeBedEnclosureTypeLabels, {
    0: 'Caja de conexiones',
    1: 'Caja subterránea',
    2: 'Enterrado'
})

Object.assign(sections.items.AnodeBedMateriaTypelLabels, {
    0: 'Grafito',
    1: 'Óxido metálico mixto',
    2: 'Platino',
    3: 'Polímero conductor',
    4: 'Chatarra metálica',
    5: 'Magnetita',
    6: 'Aluminio'
})

Object.assign(sections.items.AnodeBedTypeLabesl, {
    0: 'Vertical superficial',
    1: 'Horizontal superficial',
    2: 'Vertical profundo'
})

Object.assign(sections.common.SubscriptionStatusLabels, {
    0: 'No activa',
    1: 'Activa',
    2: 'Activa',
    3: 'Necesita atención',
    4: 'Pendiente'
})

Object.assign(sections.common.FileMimeTypeLabels, {
    'application/octet-stream': 'Binario',
    'image/*': 'Imagen',
    'text/*': 'Texto'
})

Object.assign(sections.common.ExternalLinkTypeLabels, {
    NFC: 'Etiqueta NFC',
    QR_CODE: 'Código QR'
})

Object.assign(sections.survey.PipelineFilterItemLabels, {
    NOT_ASSIGNED: 'Elementos no asignados y ajenos a tuberías'
})

Object.assign(sections.multimeter.MeasurementPropertyTypeLabels, {
    POTENTIAL: 'Potenciales (CC)',
    POTENTIAL_AC: 'Potenciales (CA)',
    VOLTAGE: 'Tensión (CC)',
    COUPON_CURRENT: 'Corriente del cupón (CC)',
    COUPON_CURRENT_AC: 'Corriente del cupón (CA)',
    VOLTAGE_DROP: 'Caída de tensión (CC)'
})

Object.assign(sections.multimeter.TimeSyncSourceLabels, {
    GPS: 'GPS',
    NTP: 'NTP',
    MIXED: 'Mixto'
})

Object.assign(sections.multimeter.MultimeterModeLabels, {
    DC_VOLTS: 'Tensión CC',
    AC_VOLTS: 'Tensión CA',
    AC_AMPS: 'Corriente CA',
    DC_AMPS: 'Corriente CC',
    IDLE: 'Inactivo',
    DVM_DC_VOLTS: 'Tensión CC',
    DVM_AC_VOLTS: 'Tensión CA',
    DVM_IDLE: 'Inactivo'
})

Object.assign(sections.multimeter.MultimeterRangeLabels, {
    AUTO: 'Automático'
})

export const labels = Object.assign({}, ...Object.values(sections))
