export class Onboarding {
    constructor(versionOnboarding, editTestPoint, editReferenceCell, map, potentialTypes, editBond, main) {
        this.main = main
        this.editTestPoint = editTestPoint
        this.editReferenceCell = editReferenceCell
        this.map = map
        this.potentialTypes = potentialTypes
        this.editBond = editBond
        this.versionOnboarding = versionOnboarding
    }

    parse(string) {
        const { versionOnboarding, editTestPoint, editReferenceCell, map, potentialTypes, editBond, main } = JSON.parse(string)
        this.main = main
        this.editTestPoint = editTestPoint
        this.editReferenceCell = editReferenceCell
        this.map = map
        this.potentialTypes = potentialTypes
        this.editBond = editBond
        this.versionOnboarding = versionOnboarding
    }

    getString() {
        return JSON.stringify(this)
    }

    updateVersion(version) {
        this.versionOnboarding = version
    }

}

export const OnboardingScreens = Object.freeze({
    REFERENCE_CELL_EDIT: 'editReferenceCell',
    MAP: 'map',
    POTENTIAL_TYPES: 'potentialTypes',
    SIDES_EDIT: 'editBond',
    TEST_POINT_EDIT: 'editTestPoint',
    MAIN: 'main',
})
