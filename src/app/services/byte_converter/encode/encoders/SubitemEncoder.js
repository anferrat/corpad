import { SubitemTypes } from "../../../../../constants/global";
import { Error, errors } from "../../../../utils/Error";
import { Encoder } from "./Encoder";

export class SubitemEncoder extends Encoder {
    constructor(codes, anodeEncoder,
        anodeBedEncoder,
        bondEncoder,
        circuitEncoder,
        couponEncoder,
        isolationEncoder,
        pipelineEncoder,
        referenceCellEncoder,
        riserEncoder,
        shuntEncoder,
        soilResistivityEncoder,
        structureEncoder,
        testLeadEncoder) {
        super()
        this.codes = codes
        this.anodeEncoder = anodeEncoder
        this.anodeBedEncoder = anodeBedEncoder
        this.bondEncoder = bondEncoder
        this.circuitEncoder = circuitEncoder
        this.couponEncoder = couponEncoder
        this.isolationEncoder = isolationEncoder
        this.pipelineEncoder = pipelineEncoder
        this.referenceCellEncoder = referenceCellEncoder
        this.riserEncoder = riserEncoder
        this.shuntEncoder = shuntEncoder
        this.soilResistivityEncoder = soilResistivityEncoder
        this.structureEncoder = structureEncoder
        this.testLeadEncoder = testLeadEncoder
        this.subitemOrder = Object.freeze(
            [SubitemTypes.PIPELINE,
            SubitemTypes.RISER,
            SubitemTypes.STRUCTURE,
            SubitemTypes.TEST_LEAD,
            SubitemTypes.ANODE,
            SubitemTypes.COUPON])
    }

    _encodeSubitemLength(length) {
        if (length > this.UINT8MAX - 1)
            throw new Error(errors.GENERAL, 'Unable to encode subitems', 'Number of subitems exeeds limit')
        return this._encodeUint8(length)
    }

    _sortSubitems(subitems) {
        return [...subitems].sort((a, b) => {
            const typeAIndex = this.subitemOrder.indexOf(a.type)
            const typeBIndex = this.subitemOrder.indexOf(b.type)
            if (typeAIndex !== -1 && typeBIndex !== -1)
                return typeAIndex - typeBIndex
            else if (typeAIndex !== -1)
                return -1
            else if (typeBIndex == -1)
                return 1
            else return 0
        })
    }

    _encodeSubitem(subitem, subitems, pipelines, referenceCells, potentialTypes) {
        switch (subitem.type) {
            case SubitemTypes.ANODE:
                return this.anodeEncoder.encode(subitem, referenceCells, potentialTypes)
            case SubitemTypes.ANODE_BED:
                return this.anodeBedEncoder.encode(subitem)
            case SubitemTypes.BOND:
                return this.bondEncoder.encode(subitem, subitems)
            case SubitemTypes.CIRCUIT:
                return this.circuitEncoder.encode(subitem)
            case SubitemTypes.COUPON:
                return this.couponEncoder.encode(subitem, subitems, referenceCells, potentialTypes)
            case SubitemTypes.ISOLATION:
                return this.isolationEncoder.encode(subitem, subitems)
            case SubitemTypes.PIPELINE:
                return this.pipelineEncoder.encode(subitem, pipelines, referenceCells, potentialTypes)
            case SubitemTypes.REFERENCE_CELL:
                return this.referenceCellEncoder.encode(subitem, referenceCells, potentialTypes)
            case SubitemTypes.RISER:
                return this.riserEncoder.encode(subitem, pipelines, referenceCells, potentialTypes)
            case SubitemTypes.SHUNT:
                return this.shuntEncoder.encode(subitem, subitems)
            case SubitemTypes.SOIL_RESISTIVITY:
                return this.soilResistivityEncoder.encode(subitem)
            case SubitemTypes.STRUCTURE:
                return this.structureEncoder.encode(subitem, referenceCells, potentialTypes)
            case SubitemTypes.TEST_LEAD:
                return this.testLeadEncoder.encode(subitem, referenceCells, potentialTypes)
            default:
                return this._getEmptyBuffer()
        }
    }



    _encodeSubitems(subitems, pipelines, referenceCells, potentialTypes) {
        return this._concat(
            subitems.map(subitem => this._concat([
                this._encodeUint8(this.codes.subitemTypes[subitem.type]),
                this._encodeSubitem(subitem, subitems, pipelines, referenceCells, potentialTypes)
            ])))
    }

    _encodePipelines(pipelines) {
        if (pipelines.length > this.UINT8MAX - 1)
            throw new Error(errors.GENERAL, 'Unable to encode pipelines', 'Number of pipelines exeeds the limit')
        return this._concat([
            this._encodeUint8(pipelines.length),
            pipelines.length === 0 ?
                this._getEmptyBuffer() :
                this._concat(pipelines.map(({ name }) => this._encodeString(name)))
        ])
    }

    _convertPipelines(pipelines, subitems) {
        const pipelineIdList = subitems.filter(s => s.pipelineId).map(s => s.pipelineId)
        return pipelines.filter(pipeline => ~pipelineIdList.indexOf(pipeline.id)).map(({ id, name }) => ({ id, name }))
    }

    _convertPotentialTypes(potentialTypes) {
        //Only default potential types supported
        return new Map(potentialTypes.filter(({ type }) => type)
            .map(({ type, id }) => [id, type]))
    }

    _convertReferenceCells(referenceCells, subitems) {
        return new Map([
            [1, new Map(referenceCells.map(rc => [rc.id, rc.rcType]))],
            [0, new Map(subitems.map((subitem, index) => [subitem.id, index]))]]) //must be full subitems map here, in order to find out the index of the ref cell
    }


    encode(subitems, pipelines, referenceCells, potentialTypes) {

        const sortedSubitems = this._sortSubitems(subitems)
        const convertedPipelines = this._convertPipelines(pipelines, sortedSubitems)
        const convertedPotentialTypes = this._convertPotentialTypes(potentialTypes)
        const convertedReferenceCells = this._convertReferenceCells(referenceCells, sortedSubitems)
        return this._concat([
            this._encodeSubitemLength(sortedSubitems.length),
            sortedSubitems.length === 0 ?
                this._getEmptyBuffer() :
                this._concat([
                    this._encodePipelines(convertedPipelines),
                    this._encodeSubitems(sortedSubitems, convertedPipelines, convertedReferenceCells, convertedPotentialTypes)
                ])
        ])
    }
}