export const getData = (data, fields) => {
    return data.map((rowObject) => fields.map((field, index) => rowObject[field] ?? ''))
}