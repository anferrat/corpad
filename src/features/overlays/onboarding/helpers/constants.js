export const onboardingPoints = {
    editTestPoint: [
        'Each test point can have multiple test items (e.g., test leads, coupons etc.)',
        'Depending on type of test point you can add different items',
        'Keep it simple or create complex test point structures'
    ],
    map: [
        'Long press to create new test points',
        'Drag and drop to update coordinates'
    ],
    editBond: [
        'Some items may use another items within one test point as side property',
        'For example shunt reading may have pipeline test lead as side A and anode test lead as side B',
        'Add more readings to the test point to be able to select side properties'
    ],
    editReferenceCell: [
        'Stationary reference cell can be used when creating new potential readings within same test point',
        'Deleting stationary reference cell will delete potentials that use it',
    ],
    potentialTypes: [
        'Choose potential unit for when recording data',
        'There are five standard potential types that can be used to create potential readings',
        'It is possible to create custom potential types and use them within the survey',
    ]
}