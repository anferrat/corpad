import { ItemTypes, PipelineFilterItems } from "../../../../constants/global"

export class FilterQueryGenerator {
    constructor() {
    }

    _toInValues(array) {
        return array.length === 0 ? '()' : '("' + array.join('", "') + '")'
    }

    _statusFilter(statusFilter) {
        return `(status NOT IN ${this._toInValues(statusFilter)})`
    }

    _testPointTypeFilter(testPointTypeFilter) {
        return `(testPointType NOT IN ${this._toInValues(testPointTypeFilter)})`
    }

    _hideEmptyFilter(readingTypeFilter) {
        return `(EXISTS (SELECT 1 FROM cards WHERE((cards.testPointId = testPoints.id) AND cards.type NOT IN ${this._toInValues(readingTypeFilter)})))`
    }

    _pipelineFilter(pipelines) {
        let isNullFiltered = ~pipelines.indexOf(PipelineFilterItems.NOT_ASSIGNED)
        return `(EXISTS (SELECT 1 FROM cards WHERE cards.testPointId = testPoints.id AND (cards.pipelineId NOT IN ${this._toInValues(pipelines)}${!isNullFiltered ? 'OR cards.pipelineId IS NULL' : ''}))${!isNullFiltered ? 'OR NOT EXISTS (SELECT 1 FROM cards WHERE cards.testPointId = testPoints.id)' : ''})`
    }

    _rectifierMarkerFilter() {
        return `1=0`
    }


    testPoint(filters) {
        const whereClauses = []

        const { readingTypeFilter, hideEmptyTestPoints, pipelines, statusFilter, testPointTypeFilter } = filters

        if (hideEmptyTestPoints)
            whereClauses.push(this._hideEmptyFilter(readingTypeFilter))
        if (statusFilter.length > 0)
            whereClauses.push(this._statusFilter(statusFilter))
        if (testPointTypeFilter.length > 0)
            whereClauses.push(this._testPointTypeFilter(testPointTypeFilter))
        if (pipelines.length > 0)

            whereClauses.push(this._pipelineFilter(pipelines))


        return `${whereClauses.length > 0 ? ` WHERE ${whereClauses.join(' AND ')}` : ''}`
    }

    testPointMarker(filters) {
        const { statusFilter, markerTypeFilter } = filters
        const whereClauses = []

        if (statusFilter.length > 0)
            whereClauses.push(this._statusFilter(statusFilter))

        if (markerTypeFilter.length > 0)
            whereClauses.push(this._testPointTypeFilter(markerTypeFilter))

        return `${whereClauses.length > 0 ? ` AND ${whereClauses.join(' AND ')}` : ''}`
    }

    rectifierMarker(filters) {
        const { statusFilter, markerTypeFilter } = filters
        const whereClauses = []

        if (statusFilter.length > 0)
            whereClauses.push(this._statusFilter(statusFilter))

        const isRectifierFiltered = ~markerTypeFilter.indexOf(ItemTypes.RECTIFIER)
        if (isRectifierFiltered)
            whereClauses.push(this._rectifierMarkerFilter())

        return `${whereClauses.length > 0 ? ` AND ${whereClauses.join(' AND ')}` : ''}`
    }
}