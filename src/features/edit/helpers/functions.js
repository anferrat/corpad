export const getButtonTitle = (itemType) => {
    switch (itemType) {
        case 'TEST_POINT':
            return 'Add reading'
        case 'RECTIFIER':
            return 'Add circuit'
        default:
            return 'Add'
    }
}