export const wireColorList = [
    {
        index: 0,
        title: 'Black',
        color: ['#1c1d20']
    },
    {
        index: 1,
        title: 'Green',
        color: ['#0a7340']
    },
    {
        index: 2,
        title: 'White',
        color: ['#dedede']
    },
    {
        index: 3,
        title: 'Yellow',
        color: ['#c2b942']
    },
    {
        index: 4,
        title: 'Red',
        color: ['#bd4131']
    },
    {
        index: 5,
        title: 'Pink',
        color: ['#af5ca4']
    },
    {
        index: 6,
        title: 'Light blue',
        color: ['#3390e3']
    },
    {
        index: 7,
        title: 'Dark blue',
        color: ['#1d507e']
    },
    {
        index: 8,
        title: 'White w/ red',
        color: ['#dedede', '#bd4131']
    },
    {
        index: 9,
        title: 'White w/ black',
        color: ['#dedede', '#1c1d20']
    },
    {
        index: 10,
        title: 'Black w/ red',
        color: ['#1c1d20', '#bd4131']
    },
    {
        index: 11,
        title: 'Green w/ yellow',
        color: ['#0a7340', '#c2b942']
    }
]

export const pipeDiameterList = ['NPS ½', 'NPS ¾', 'NPS 1', 'NPS 1½', 'NPS 1¼', 'NPS 2', 'NPS 2½', 'NPS 3', 'NPS 3½', 'NPS 4', 'NPS 5', 'NPS 6', 'NPS 7', 'NPS 8', 'NPS 9', 'NPS 10', 'NPS 12', 'NPS 14', 'NPS 16', 'NPS 18', 'NPS 20', 'NPS 22', 'NPS 24', 'NPS 26', 'NPS 28', 'NPS 30', 'NPS 32', 'NPS 34', 'NPS 36', 'NPS 40', 'NPS 42', 'NPS 44', 'NPS 46', 'NPS 48', 'NPS 52', 'NPS 56', 'NPS 60', 'NPS 64', 'NPS 68', 'NPS 72', 'NPS 76', 'NPS 80', 'NPS 88']
export const wireGaugesList = ["> AVG 0", "AVG 0", "AVG 1", "AVG 2", "AVG 3", "AVG 4", "AVG 5", "AVG 6", "AVG 7", "AVG 8", "AVG 9", "AVG 10", "AVG 11", "AVG 12", "AVG 13", "AVG 14", "AVG 15", "AVG 16", "AVG 17", "< AVG 17"]
export const currentUnits = ['\u00B5A', 'mA', "A"];
export const potentialUnits = ['-mV', 'mV', '-V', 'V'];
export const potentialUnitDescription = ['Neg. milivolts', 'Milivolts', 'Neg. volts', 'Volts'];
export const potentialsTitles = ['On', 'Off', 'Depol', 'Connected', 'Disconnected']
export const anodeMaterialList = ['Magnesium', 'Aluminum', 'Zinc', 'Other']
export const referenceCellTypes = ['Copper-sulfate', 'Zinc', 'Silver-chloride', 'Saturated calomel', 'Standard hydrogen']
export const referenceCellCodes = ['CSE', 'ZRE', 'SSC', 'SCE', 'SHE']
export const isolationAssemblyTypes = ['Isolation kit', 'Isolation joint', 'Other']
export const testPointTypes = ['Test station', 'Piping', 'Junction box', 'Field note']
export const testPointTypeCodes = ['TS', 'HD', 'JB', 'FN']
export const couponTypes = ['AC', 'DC']
export const pipeMaterials = ['Carbon steel', 'Alloy steel', 'Cast iron', 'Copper', 'Nickel', 'PVC', 'HDPE', 'Other']
export const pipeCoating = ['Coated', 'Bare']
export const pipeProducts = ['Gaseous hydrocarbons', 'Liquid hydrocarbons', 'Water', 'Other']
export const powerSourceList = ['AC power line', 'TEG', 'Wind turbine', 'Solar panels']
export const tapSettings = ['Coarse - Fine', 'VA %', 'Automatic']
export const tapOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const potentialFields = [{
    name: 'On',
    custom: 0,
    permType: 'PERM_ON'
},
{
    name: 'Off',
    custom: 0,
    permType: 'PERM_OFF'
},
{
    name: 'Native',
    custom: 0,
    permType: 'PERM_NATIVE'
},
{
    name: 'Connected',
    custom: 0,
    permType: 'PERM_CONNECTED'
},
{
    name: 'Disconnected',
    custom: 0,
    permType: 'PERM_DISCONNECTED'
}]

export const labels = {
    PL: {
        subtitle: 'Undeground pipeline test lead',
        label: 'Pipeline test lead',
        exportLabel: 'PIPELINE',
    },
    AN: {
        subtitle: 'Galvanic anode test lead',
        label: 'Anode test lead',
        exportLabel: 'ANODE',
    },
    RE: {
        subtitle: 'Stationary reference electrode test lead',
        label: 'Stationary reference lead',
        exportLabel: 'REF_CELL',
    },
    CN: {
        subtitle: 'Corrosion coupon test lead',
        label: 'Coupon test lead',
        exportLabel: 'COUPON',
    },
    SH: {
        subtitle: 'Electrical shunt',
        label: 'Shunt',
        exportLabel: 'SHUNT',
    },
    BD: {
        subtitle: 'Electrical bond',
        label: 'Bond',
        exportLabel: 'BOND',
    },
    RS: {
        subtitle: 'Pipeline riser',
        label: 'Pipline riser',
        exportLabel: 'RISER',
    },
    FC: {
        subtitle: 'Unprotected structure',
        label: 'Foreign structure',
        exportLabel: 'STRUCTURE',
    },
    IK: {
        subtitle: 'Isolation assambley',
        label: 'Isolation assambley',
        exportLabel: 'ISOLATION',
    },
    OT: {
        subtitle: 'Other test lead',
        label: 'Other test lead',
        exportLabel: 'TEST_LEAD',
    },
    CT: {
        subtitle: 'Rectifier circuit',
        label: 'Rectifier circuit',
        exportLabel: 'CIRCUIT',
    },
    HD: {
        subtitle: 'Piping',
        label: 'Piping',
        exportLabel: 'PIPING',
    },
    FN: {
        subtitle: 'Field note',
        label: 'Field note',
        exportLabel: 'NOTE',
    },
    TS: {
        subtitle: 'Test station',
        label: 'Test station',
        exportLabel: 'TEST_STATION',
    },
    JB: {
        subtitle: 'Junction box',
        label: 'Junction box',
        exportLabel: 'JUNCTION_BOX',
    },
    RECTIFIER: {
        subtitle: 'Rectifier',
        label: 'Rectifier',
        exportLabel: 'RECTIFIER',
    },
    PIPELINE: {
        subtitle: 'Pipeline',
        label: 'Pipeline',
        exportLabel: 'PIPELINE',
    },
    TEST_POINT: {
        subtitle: 'Test point',
        label: 'Test point',
        exportLabel: 'TEST_POINT',
    },
}

export const items = ['TEST_POINT', 'PIPELINE', 'RECTIFIER']

export const sortingOptions = ['Name: A - Z', 'Name: Z - A', 'Date modified: Newest first', 'Date modified: Oldest first', 'Location: Nearest first']

//index referes to testPointTypes array
export const testPointReadingOptions = [
    ['PL', 'AN', 'RE', 'CN', 'SH', 'BD', 'OT'],
    ['RS', 'FC', 'IK', 'CN', 'BD', 'SH'],
    ['PL', 'AN', 'RE', 'CN', 'SH', 'BD', 'OT'],
    [],
]
export const testPointReadings = ['PL', 'AN', 'RE', 'CN', 'SH', 'BD', 'OT', 'RS', 'FC', 'IK']
export const testPointReadingsWithPotentials = ['PL', 'RS', 'FC', 'OT', 'AN', 'CN', 'RE']
export const statusInfo = [
    { icon: 'checkmark-circle-outline', status: 'success', title: 'Pass' },
    { icon: 'alert-triangle-outline', status: 'warning', title: 'Attention' },
    { icon: 'alert-circle-outline', status: 'danger', title: 'Issue' },
    { icon: 'question-mark-circle-outline', status: 'basic', title: 'Unknown' }]

export const defaultNames = [
    {
        property: 'TEST_POINT',
        name: 'TP'
    },
    {
        property: 'PIPELINE',
        name: 'Pipeline'
    },
    {
        property: 'RECTIFIER',
        name: 'RT'
    },
    {
        property: 'PL',
        name: 'PipeLead'
    },
    {
        property: 'AN',
        name: 'AnodeLead'
    },
    {
        property: 'RE',
        name: 'RefCell'
    },
    {
        property: 'CN',
        name: 'Coupon'
    },
    {
        property: 'RS',
        name: 'Riser'
    },
    {
        property: 'SH',
        name: 'Shunt'
    },
    {
        property: 'FC',
        name: 'Structure'
    },
    {
        property: 'IK',
        name: 'Isolation'
    },
    {
        property: 'OT',
        name: 'TestLead'
    },
    {
        property: 'BD',
        name: 'Bond'
    },
    {
        property: 'CT',
        name: 'Circuit'
    },
]

