export default {
    paywall: {
        allSet: 'You are all set!',
        welcomeBack: 'Welcome back',
        upgrade: 'Upgrade to premium',
        thankYou: 'Thank you for subscribing! Your contribution directly fuels the development of new features and improvements to make this app even better.',
        offline: 'You have been offline for a while. To confirm your subscription status and gain access to premium features, simply press the button below while connected to the internet.',
        pending: 'We are currently obtaining your subscription status. It should take less than a minute.',
        subscriptionActive: 'Subscription is active.',
        nextRenewal: 'Next renewal: {{date}}',
        continue: 'Continue',
        verify: 'Verify',
        unavailable: 'Unavailable',
        purchase: '7 days free, {{price}}/month',
        alreadySubscribed: 'Already subscribed? Try to',
        restorePurchases: 'restore purchases.',
        terms: 'Terms & Conditions',
        features: {
            photos: 'Photos',
            photosDescription: 'Take and assign photos to sites. Share survey files with photos.',
            mapLayers: 'Map layers',
            mapLayersDescription: 'Import polylines, polygons and markers from geodata files.',
            multimeter: 'Multimeter',
            multimeterDescription: 'Connect multimeter over Bluetooth to capture voltage and current.',
            labels: 'QR code and NFC labels',
            labelsDescription: 'Create site labels that can be accessed offline by any Corpad app user.'
        }
    },
    onboarding: {
        editTestPoint: [
            'Each test point can have multiple readings (e.g., test leads, coupons, etc.).',
            'Each reading has its own properties, including potentials, current, wire color, etc.'
        ],
        map: [
            'Long press on the map to create a new test point or rectifier.',
            'Drag-and-drop markers to automatically update their coordinates.',
            'Search for displayed markers on the map by name.'
        ],
        editBond: [
            'Other readings in the test point will appear as options for side A and side B properties, depending on their type.'
        ],
        editReferenceCell: [
            'A stationary reference cell can be used when creating new potentials inside the test point.',
            'Deleting the stationary reference cell will remove all potentials associated with it.'
        ],
        potentialTypes: [
            'Change the potential unit to capture values in your preferred format.',
            'Six standard potential types are available by default. More can be added if needed.'
        ],
        tapToContinue: 'Tap to continue'
    },
    externalLink: {
        exactMatch: 'Exact match (uid)',
        closeProximity: 'Items in close proximity',
        searchByLocation: 'Search by location',
        similarName: 'Items with similar name',
        similarNameHint: 'Items in the opened survey that have a similar name to the one from the opened link.',
        noMatches: 'No matches found.',
        pipelinesInLink: 'Pipelines in the link',
        pipelinesInSurvey: 'Pipelines in the survey',
        matchPipelines: 'Match pipelines from the link to pipelines in the current survey.',
        done: 'Done',
        loading: 'Loading...',
        back: 'Back',
        tagId: 'TAG ID: {{tagId}}',
        createdBy: 'Created by: {{technician}}',
        searching: 'Searching...',
        creating: 'Creating...',
        createNew: 'Create new',
        unassigned: 'Unassigned',
        noSurveyHint: 'To save the data from this label, please open an existing survey or create a new one.',
        addToSurvey: 'Add to the survey',
        createItemDescription: 'Create new survey item with data from the label.',
        findInSurvey: 'Find in the survey',
        findItemDescription: 'Find item in the survey that matches data from the label.'
    },
    exportModal: {
        success: 'Success!',
        fileCreated: 'File {{fileName}} was created. Select an action below:',
        viewExportedFiles: 'View exported files',
        or: 'or',
        openIn: 'Open in...',
        viewFile: 'View file',
        share: 'Share'
    },
    toast: {
        capturing: 'Capturing',
        cycleDetectionMode: 'Cycle detection mode:',
        noTimeFix: ' (No time fix)',
        max: 'Max.'
    },
    session: {
        noInternet: 'Oops! No internet...',
        notSignedIn: 'You are not signed in',
        signInGoogleDrive: 'Sign in with Google Drive',
        cloudStorage: 'Cloud storage',
        cloudStorageDescription: 'Signing in with cloud storage allows you to store your survey files securely and to make them available on different devices.',
        logOut: 'Log out'
    }
}
