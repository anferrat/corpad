import { array, object, string, tuple, lazy, number } from "yup";
import { Validation } from "../../utils/Validation";

export class GeoJsonValidation extends Validation {
    constructor() {
        super()
        this.pointCoordinate = lazy(v => {
            if (v && v.length === 2)
                return tuple([this.longitude, this.latitude]).required()
            else return tuple([this.longitude, this.latitude, number()]).required()
        })

        this.pointGeometry = object({
            type: string().matches(/Point/, 'Wrong name').required(),
            coordinates: this.pointCoordinate
        })

        this.lineStringGeometry = object({
            type: string().matches(/LineString/).required(),
            coordinates: array().of(this.pointCoordinate).required()
        })

        this.polygonGeometry = object({
            type: string().matches(/Polygon/).required(),
            coordinates: array().of(array().of(this.pointCoordinate)).max(2).min(1).required()
        })

        this.multiPointGeometry = object({
            type: string().matches(/MultiPoint/).required(),
            coordinates: array().of(this.pointCoordinate).required()
        })

        this.multiLineStringGeometry = object({
            type: string().matches(/MultiLineString/).required(),
            coordinates: array().of(array().of(this.pointCoordinate)).required()
        })

        this.multiPolygonGeometry = object({
            type: string().matches(/MultiPolygon/, 'Wrong name').required(),
            coordinates: array().of(array().of(array().of(this.pointCoordinate)).max(2).min(1)).required()
        })

        this.geometryCollectionGeometry = object({
            type: string().matches(/GeometryCollection/, 'Wrong name').required(),
            geometries: array().of(lazy(v => {
                if (!v || !v.type)
                    return this.pointGeometry
                else
                    switch (v.type) {
                        case 'Point':
                            return this.pointGeometry
                        case 'LineString':
                            return this.lineStringGeometry
                        case 'Polygon':
                            return this.polygonGeometry
                        case 'MultiPoint':
                            return this.multiPointGeometry
                        case 'MultiLineString':
                            return this.multiLineStringGeometry
                        case 'MultiPolygon':
                            return this.multiPolygonGeometry
                        default:
                            return this.pointGeometry
                    }
            })).required()
        })

        this.feature = object({
            type: string().matches(/Feature/).required(),
            properties: object(),
            geometry: lazy(v => {
                if (!v || !v.type)
                    return this.pointGeometry.required()
                else
                    switch (v.type) {
                        case 'Point':
                            return this.pointGeometry.required()
                        case 'LineString':
                            return this.lineStringGeometry.required()
                        case 'Polygon':
                            return this.polygonGeometry.required()
                        case 'MultiPoint':
                            return this.multiPointGeometry.required()
                        case 'MultiLineString':
                            return this.multiLineStringGeometry.required()
                        case 'MultiPolygon':
                            return this.multiPolygonGeometry.required()
                        case 'GeometryCollection':
                            return this.geometryCollectionGeometry.required()
                        default:
                            return this.pointGeometry.required()
                    }
            })
        })

        this.featureCollection = object({
            type: string().matches(/FeatureCollection/).required(),
            features: array().compact((v) => {
                return !this.feature.isValidSync(v)
            }
            )
        })
    }

    execute(data) {
        try {
            return this.featureCollection.cast(data)
        }
        catch (er) {
            console.log(er)
            return {
                type: 'FeatureCollection',
                features: []
            }
        }
    }
}