//list of tables and fields of tables in JSON survey file and JSON CCD 

export const tables = ['survey', 'testPoints', 'rectifiers', 'pipelines', 'potentialTypes', 'referenceCells', 'cards', 'potentials', 'circuits', 'sides']
export const fields = [
    ['uid', 'name', 'technician'],
    [`id`, 'uid', 'name', 'location', 'latitude', 'longitude', 'comment', 'testPointType', 'status', 'timeCreated', 'timeModified'],
    ['id', 'uid', 'name', 'location', 'latitude', 'longitude', 'comment', 'status', 'timeCreated', 'timeModified', 'model', 'serialNumber', 'powerSource', 'acVoltage', 'acCurrent', 'tapSetting', 'tapValue', 'tapCoarse', 'tapFine', 'maxVoltage', 'maxCurrent'],
    ['id', 'uid', 'name', 'nps', 'material', 'coating', 'licenseNumber', 'timeCreated', 'timeModified', 'product', 'comment'],
    ['id', 'uid', 'name', 'custom', 'permType'],
    ['id', 'uid', 'rcType', 'name', 'mainReference'],
    ['id', 'testPointId', 'uid', 'type', 'name', 'anodeMaterial', 'wireColor', 'wireGauge', 'fromAtoB', 'current', 'currentUnit', 'pipelineId', 'pipelineCardId', 'couponType', 'density', 'area', 'description', 'isolationType', 'shorted', 'rcType', 'nps', 'ratioCurrent', 'ratioVoltage', 'factorSelected', 'factor', 'voltageDrop'],
    ['id', 'cardId', 'uid', 'value', 'type', 'unit', 'portableReferenceId', 'permanentReferenceId'],
    ['id', 'uid', 'name', 'rectifierId', 'ratioCurrent', 'ratioVoltage', 'voltageDrop', 'current', 'voltage', 'targetMin', 'targetMax'],
    ['id', 'sideAId', 'sideBId', 'parentCardId'],
]
export const currentJSONVersion = 1