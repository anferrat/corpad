export const getData = (data, fields) => {

    return data.map((rowObject, index) => [index + 1, ...fields.map(field => rowObject[field] ?? '')])
}