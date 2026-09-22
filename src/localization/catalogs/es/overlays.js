import englishOverlays from '../en/overlays'

export default {
    ...englishOverlays,
    paywall: {
        ...englishOverlays.paywall,
        allSet: 'Todo listo',
        welcomeBack: 'Bienvenido de nuevo',
        upgrade: 'Actualizar a premium',
        thankYou: '¡Gracias por suscribirse! Su contribución impulsa directamente el desarrollo de nuevas funciones y mejoras para hacer esta aplicación aún mejor.',
        offline: 'Ha estado sin conexión durante un tiempo. Para confirmar el estado de su suscripción y obtener acceso a las funciones premium, pulse el botón de abajo mientras esté conectado a Internet.',
        pending: 'Estamos obteniendo el estado de su suscripción. Tardará menos de un minuto.',
        subscriptionActive: 'La suscripción está activa.',
        nextRenewal: 'Próxima renovación: {{date}}',
        continue: 'Continuar',
        verify: 'Verificar',
        unavailable: 'No disponible',
        purchase: '7 días gratis, {{price}}/mes',
        alreadySubscribed: '¿Ya está suscrito? Intente',
        restorePurchases: 'restaurar las compras.',
        terms: 'Términos y condiciones',
        features: {
            ...englishOverlays.paywall.features,
            photos: 'Fotos',
            photosDescription: 'Tome y asigne fotos a los sitios. Comparta archivos de estudio con fotos.',
            mapLayers: 'Capas del mapa',
            mapLayersDescription: 'Importe polilíneas, polígonos y marcadores desde archivos geográficos.',
            multimeter: 'Multímetro',
            multimeterDescription: 'Conecte el multímetro por Bluetooth para capturar tensión y corriente.',
            labels: 'Etiquetas QR y NFC',
            labelsDescription: 'Cree etiquetas de sitios accesibles sin conexión para cualquier usuario de la aplicación Corpad.'
        }
    },
    onboarding: {
        ...englishOverlays.onboarding,
        welcomeTitle: 'Bienvenido a Corpad',
        welcomeSubtitle: 'Bienvenido a la nueva era de la recopilación de datos de protección catódica',
        dataCaptureTitle: 'Captura de datos',
        dataCaptureSubtitle: 'Tome fotos, asigne coordenadas GPS y trace datos en el mapa con nuestra interfaz fácil de usar',
        calculatorTitle: 'Calculadora de corrosión',
        calculatorSubtitle: 'Calcule rápidamente valores de protección catódica para analizar datos con precisión',
        multimeterTitle: 'Conectar multímetro',
        multimeterSubtitle: 'Conecte fácilmente un multímetro Bluetooth para capturar datos en tiempo real en campo',
        dataHandlingTitle: 'Gestión eficiente de datos',
        dataHandlingSubtitle: 'Importe y exporte datos fácilmente con archivos CSV y KML y haga copias de seguridad de los estudios en la nube',
        updatedTitle: 'Actualizado a la versión {{version}}',
        updatedSubtitle: 'Se instaló una nueva versión de la aplicación. Hemos mejorado su experiencia de captura de datos de protección catódica.',
        freeTitle: 'Gratis para todos',
        freeSubtitle: 'Disfrute gratis de todas las funciones premium. Esto incluye asignar imágenes al punto de prueba, añadir datos .kml o .gpx externos al mapa, crear etiquetas NFC y QR y conectar un multímetro Bluetooth para recopilar lecturas.',
        improvementsTitle: 'Mejoras de la calculadora',
        improvementsSubtitle: 'Ahora puede asignar latitud y longitud a los cálculos de corrosión y sus marcadores se mostrarán en el mapa.',
        dontMissTitle: 'No se lo pierda',
        dontMissSubtitle: 'Nos comprometemos a ofrecer mejoras y actualizaciones continuas. Consulte docs.corpad.ca para obtener más información sobre las nuevas funciones.',
        editTestPoint: [
            'Cada punto de prueba puede tener varias lecturas (por ejemplo, cables de prueba, cupones, etc.).',
            'Cada lectura tiene sus propias propiedades, incluidos potenciales, corriente, color del cable, etc.'
        ],
        map: [
            'Mantenga pulsado el mapa para crear un nuevo punto de prueba o rectificador.',
            'Arrastre y suelte los marcadores para actualizar automáticamente sus coordenadas.',
            'Busque por nombre los marcadores mostrados en el mapa.'
        ],
        editBond: [
            'Las demás lecturas del punto de prueba aparecerán como opciones para las propiedades del lado A y del lado B, según su tipo.'
        ],
        editReferenceCell: [
            'Puede utilizar una celda de referencia estacionaria al crear nuevos potenciales dentro del punto de prueba.',
            'Al eliminar la celda de referencia estacionaria, se eliminarán todos los potenciales asociados a ella.'
        ],
        potentialTypes: [
            'Cambie la unidad de potencial para capturar valores en su formato preferido.',
            'Hay seis tipos de potencial estándar disponibles de forma predeterminada. Puede añadir más si es necesario.'
        ],
        tapToContinue: 'Toque para continuar'
    },
    externalLink: {
        ...englishOverlays.externalLink,
        exactMatch: 'Coincidencia exacta (uid)',
        closeProximity: 'Elementos cercanos',
        searchByLocation: 'Buscar por ubicación',
        similarName: 'Elementos con nombre similar',
        similarNameHint: 'Elementos del estudio abierto que tienen un nombre similar al del enlace abierto.',
        noMatches: 'No se encontraron coincidencias.',
        pipelinesInLink: 'Líneas del enlace',
        pipelinesInSurvey: 'Líneas del estudio',
        matchPipelines: 'Relacione las líneas del enlace con las líneas del estudio actual.',
        done: 'Listo',
        loading: 'Cargando...',
        back: 'Atrás',
        tagId: 'ID DE ETIQUETA: {{tagId}}',
        createdBy: 'Creado por: {{technician}}',
        searching: 'Buscando...',
        creating: 'Creando...',
        createNew: 'Crear nuevo',
        unassigned: 'Sin asignar',
        noSurveyHint: 'Para guardar los datos de esta etiqueta, abra un estudio existente o cree uno nuevo.',
        addToSurvey: 'Añadir al estudio',
        createItemDescription: 'Crear un elemento de estudio nuevo con los datos de la etiqueta.',
        findInSurvey: 'Buscar en el estudio',
        findItemDescription: 'Buscar en el estudio el elemento que coincida con los datos de la etiqueta.'
    },
    exportModal: {
        ...englishOverlays.exportModal,
        success: '¡Éxito!',
        fileCreated: 'Se creó el archivo {{fileName}}. Seleccione una acción:',
        viewExportedFiles: 'Ver archivos exportados',
        or: 'o',
        openIn: 'Abrir en...',
        viewFile: 'Ver archivo',
        share: 'Compartir'
    },
    toast: {
        ...englishOverlays.toast,
        capturing: 'Capturando',
        cycleDetectionMode: 'Modo de detección de ciclos:',
        noTimeFix: ' (Sin ajuste de hora)',
        max: 'Máx.'
    },
    session: {
        ...englishOverlays.session,
        noInternet: '¡Vaya! No hay conexión a Internet...',
        notSignedIn: 'No ha iniciado sesión',
        signInGoogleDrive: 'Iniciar sesión con Google Drive',
        cloudStorage: 'Almacenamiento en la nube',
        cloudStorageDescription: 'Iniciar sesión en el almacenamiento en la nube le permite guardar sus archivos de estudios de forma segura y tenerlos disponibles en diferentes dispositivos.',
        logOut: 'Cerrar sesión'
    }
}
