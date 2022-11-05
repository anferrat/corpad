// converts string into data object
export const decodeTestPoint = (string) => {
    const initialTestPoint = {
        version: 1,
        type: 'ccd',
        data: {
            testPoint: fields[1].map(() => null),
            pipelines: [],
            cards: [],
            sides: []
        }
    }

    const readValues = (string, data = []) => {
        if (string === '')
            return data
        else {
            const pointer = string.search('>>')
            if (pointer !== -1)
                return readValues(string.slice(pointer + 2), data.concat([string.substr(0, pointer)]))
            else return readValues('', data.concat([string]))
        }
    }

    const createTableRow = (numberOfElements, dataArray, indexArray, id = 0) => {
        //creates an array with specified number of elements. inserts data inside the new array according to index array
        const resultArray = [id]
        for (i = 1; i < numberOfElements; i++) {
            const indexMatch = indexArray.indexOf(i)
            resultArray.push(indexMatch !== -1 ? dataArray[indexMatch] : null)
        }
        return resultArray
    }

    const getPipelineName = (data, index, defaultName) => {
        if (isNaN(index))
            return defaultName
        else if (data.data.pipelines[index])
            return data.data.pipelines[index][2]
        else return defaultName
    }

    const createSidesRows = (value, isSideA, length, initId) => {

        const readSide = (string, data = []) => {
            if (string === '')
                return data
            else {
                const pointer = string.search(',')
                if (pointer !== -1)
                    return readValues(string.slice(pointer + 1), data.concat([string.substr(0, pointer)]))
                else return readValues('', data.concat([string]))
            }
        }
        const side = readSide(value).filter(s => !isNaN(s) && s < length).map(s => parseInt(s))
        return side.map((s, index) => [initId + index, isSideA ? s : null, !isSideA ? s : null, length])
    }

    const readDataType = (string, testPointData = initialTestPoint) => {
        //reads string from the start and generates ccd formatted values as result. Outputs object
        if (string === '')
            return testPointData
        else {
            const pointer = string.search('[*]')
            if (pointer !== -1) {
                const data = readValues(string.substr(0, pointer))
                const defaultName = getName(0, data[0])
                switch (data[0]) {
                    case 'TP':
                        if (data.length === 9)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        testPoint: createTableRow(fields[1].length, data.slice(1), [1, 2, 3, 4, 5, 6, 7, 8])
                                    }
                                })
                    case 'PP':
                        if (data.length === 7)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        pipelines: testPointData.data.pipelines.concat(
                                            [createTableRow(fields[3].length, data.slice(1), [2, 3, 4, 5, 6, 9], testPointData.data.pipelines.length)]
                                        )
                                    }
                                })
                    case 'PL':
                        if (data.length === 4) {
                            const pipelineNamePL = getPipelineName(testPointData, data[1], defaultName)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), pipelineNamePL].concat(data), [1, 2, 4, 3, 11, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }

                                }
                            )
                        }
                    case 'AN':
                        if (data.length === 4)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName].concat(data), [1, 2, 4, 3, 5, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'RE':
                        if (data.length === 4)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName].concat(data), [1, 2, 4, 3, 19, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'OT':
                        if (data.length === 4)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen()].concat(data), [1, 2, 3, 4, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'RS':
                        if (data.length === 3) {
                            const pipelineNameRS = getPipelineName(testPointData, data[1], defaultName)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), pipelineNameRS].concat(data), [1, 2, 4, 3, 11, 20], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                        }
                    case 'FC':
                        if (data.length === 2)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen()].concat(data), [1, 2, 3, 4], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'SH':
                        if (data.length === 6) {
                            const sidesSH = createSidesRows(data[1], true, testPointData.data.cards.length, testPointData.data.sides.length)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName, data[0], data[3], data[4], data[5]], [1, 2, 4, 3, 22, 21, 24], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesSH).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesSH.length))
                                    }
                                }
                            )
                        }
                    case 'BD':
                        if (data.length === 3) {
                            const sidesBD = createSidesRows(data[1], true, testPointData.data.cards.length, testPointData.data.sides.length)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName, data[0]], [1, 2, 4, 3], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesBD).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesBD.length))
                                    }
                                }
                            )
                        }
                    case 'IK':
                        if (data.length === 5) {
                            const sidesIK = createSidesRows(data[1], true, testPointData.data.cards.length, testPointData.data.sides.length)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName, data[0], data[3], data[4]], [1, 2, 4, 3, 17, 18], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesIK).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesIK.length))
                                    }
                                }
                            )
                        }
                    case 'CN':
                        if (data.length === 6) {
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName].concat(data), [1, 2, 4, 3, 13, 15, 6, 7], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesIK).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesIK.length))
                                    }
                                }
                            )
                        }
                    default: return readDataType(string.slice(pointer + 1), testPointData)
                }
            }
            else return testPointData
        }
    }

    if (string.search('[**]') !== -1) {
        return {
            status: 200,
            result: readDataType(string)
        }
    }
    else return {
        status: 508
    }
}