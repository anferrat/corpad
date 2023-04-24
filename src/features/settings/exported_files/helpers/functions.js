export const getFileSize = (bytes) => {
    if (bytes >= 0 && bytes < 1024)
        return {
            value: bytes,
            unit: 'B'
        }
    else if (bytes >= 1024 && bytes < 1048576)
        return {
            value: (bytes / 1024).toFixed(2),
            unit: 'KB',
        }
    else if (bytes >= 1048576 && bytes < 1073741824)
        return {
            value: (bytes / 1048576).toFixed(2),
            unit: 'MB'
        }
    else if (bytes >= 1073741824)
        return {
            value: (bytes / 1073741824).toFixed(2),
            unit: 'GB'
        }
    else return {
        value: '??',
        unit: 'B'
    }
}