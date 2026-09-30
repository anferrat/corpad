import englishOnboardingScreen from '../en/onboardingScreen'

export default {
    ...englishOnboardingScreen,
    main: {
        ...englishOnboardingScreen.main,
        screen1: {
            title: 'Bienvenido a Corpad',
            subtitle: 'Bienvenido a la nueva era de la recopilación de datos de protección catódica'
        },
        screen2: {
            title: 'Captura de datos',
            subtitle: 'Tome fotos, asigne coordenadas GPS y trace datos en el mapa con nuestra interfaz fácil de usar'
        },
        screen3: {
            title: 'Calculadora de corrosión',
            subtitle: 'Calcule rápidamente valores de protección catódica para analizar datos con precisión'
        },
        screen4: {
            title: 'Conectar multímetro',
            subtitle: 'Conecte fácilmente un multímetro Bluetooth para capturar datos en tiempo real en campo'
        },
        screen5: {
            title: 'Gestión eficiente de datos',
            subtitle: 'Importe y exporte datos fácilmente con archivos CSV y KML y haga copias de seguridad de los estudios en la nube'
        }
    },
    lastVersion: {
        ...englishOnboardingScreen.lastVersion,
        screen1: {
            title: 'Actualizado a la versión {{version}}',
            subtitle: 'Se instaló una nueva versión de la aplicación. Hemos mejorado su experiencia de captura de datos de protección catódica.'
        },
        screen2: {
            title: 'Compatibilidad con un nuevo idioma',
            subtitle: 'Se ha añadido compatibilidad con el español para las etiquetas de la aplicación.'
        },
        screen3: {
            title: 'Mejoras de la calculadora',
            subtitle: 'Ahora puede asignar latitud y longitud a los cálculos de corrosión y sus marcadores se mostrarán en el mapa.'
        },
        screen4: {
            title: 'No se lo pierda',
            subtitle: 'Nos comprometemos a ofrecer mejoras y actualizaciones continuas. Consulte docs.corpad.ca para obtener más información sobre las nuevas funciones.'
        }
    }
}
