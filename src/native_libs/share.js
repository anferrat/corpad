import Share from 'react-native-share'

export const shareWith = (fileUrl, mimeType) => Share.open({
    message: 'Share file',
    url: 'file://' + fileUrl,
    type: mimeType,
    useInternalStorage: true,
    failOnCancel: false,
    showAppsToView: true,
    saveToFiles: true
})

export const shareLink = (link, title) => Share.open({
    title: title,
    url: link,
    failOnCancel: false,
    showAppsToView: true,
})