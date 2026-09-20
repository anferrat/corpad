import englishCreateSurvey from '../en/createSurvey'

export default {
    ...englishCreateSurvey,
    surveyName: 'Nombre del estudio',
    newSurvey: 'Nuevo estudio',
    deviceBased: 'En el dispositivo',
    deviceBasedDescription: 'El estudio se guarda en la carpeta de la aplicación del dispositivo. No requiere Internet.',
    cloudBased: 'En la nube',
    cloudBasedDescription: 'El estudio se guarda en el dispositivo y se sincroniza con la nube. Requiere Internet y una cuenta de Google.',
    signInRequired: '(Se requiere iniciar sesión)',
    moreOptions: 'Más opciones ...',
    lessOptions: 'Menos opciones ...',
    chooseTemplate: 'Elegir plantilla',
    blank: 'En blanco',
    blankDescription: 'Crear un estudio vacío con elementos predeterminados',
    existingSurvey: 'Basado en un estudio existente',
    existingSurveyDescription: 'Crear una copia de un estudio existente sin lecturas',
    selectSurvey: 'Seleccionar estudio',
    noLocalSurveys: 'No se encontraron estudios locales',
    loadingSurveyList: 'Cargando lista de estudios...',
    baseSurvey: 'Estudio base',
    includeImages: 'Incluir imágenes del estudio existente',
    create: 'Crear',
    next: 'Siguiente',
    creatingSurvey: 'Creando estudio',
    nameLabel: 'Nombre: {{name}}'
}
