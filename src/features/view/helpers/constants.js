export const NFC_HEADERS = {
    PREPARING: 'Creating link...',
    READY: 'Ready to write',
    WRITING: 'Writing...',
    SUCCESS: 'Completed!',
    ERROR: 'Error!'
}

export const NFC_LABELS = {
    READY: 'Hold your phone near the NFC label to record item data.',
    SUCCESS: 'Item information was written on the NFC label.',
    NOT_FORMATTED: 'NFC label is not formatted. Read more at',
    READ_ONLY: 'NFC label is locked to read-only mode.',
    NOT_ENOUGH_SPACE: 'There is not enough space on the NFC tag. Read more at',
    TURNED_OFF: 'NFC is turned off. Please enable NFC in settings.',
    NOT_SUPPORTED: 'NFC is not supported for this device.',
    LINK_TOO_LONG: 'Excessive information recorded on the NFC label.'
}

export const NFC_STATUS_CODES = {
    NOT_FORMATTED: 835,
    READ_ONLY: 836,
    NOT_ENOUGH_SPACE: 837,
    NFC_TURNED_OFF: 840,
    NFC_NOT_SUPPORTED: 841,
    LINK_TOO_LONG: 834,
    SUCCESS: 200,
}

export const NFC_BUTTON_LABELS = {
    READY: 'Cancel',
    SUCCESS: 'Close',
    ERROR: 'Close',
    UKNOWN_ERROR: 'Retry'
}