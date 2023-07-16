export const licenseSplitter = (licenses) => {
    let result = []
    const keys = Object.keys(licenses)
    const licenseArray = Object.values(licenses)
    for (i = 0; i < licenseArray.length; i++) {
        const sectionIndex = result.findIndex(({ title }) => title === licenseArray[i].licenses)
        if (~sectionIndex)
            result[sectionIndex].data.push({ ...licenseArray[i], name: keys[i] })
        else
            result.push({ title: licenseArray[i].licenses, data: [{ ...licenseArray[i], name: keys[i] }] })
    }
    return result
}