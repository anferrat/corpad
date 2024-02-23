import { SubitemTypes } from "../../../../../constants/global";
import { Decoder } from "./Decoder";
import { DecoderResult } from "./DecoderResult";

export class SubitemDecoder extends Decoder {
    constructor(codes,
        anodeBedDecoder,
        anodeDecoder,
        bondDecoder,
        circuitDecoder,
        couponDecoder,
        isolationDecoder,
        pipelineDecoder,
        referenceCellDecoder,
        riserDecoder,
        shuntDecoder,
        soilResistivityDecoder,
        structureDecoder,
        testLeadDecoder) {
        super()
        this.codes = codes
        this.anodeBedDecoder = anodeBedDecoder
        this.anodeDecoder = anodeDecoder
        this.bondDecoder = bondDecoder
        this.circuitDecoder = circuitDecoder
        this.couponDecoder = couponDecoder
        this.isolationDecoder = isolationDecoder
        this.pipelineDecoder = pipelineDecoder
        this.referenceCellDecoder = referenceCellDecoder
        this.riserDecoder = riserDecoder
        this.shuntDecoder = shuntDecoder
        this.soilResistivityDecoder = soilResistivityDecoder
        this.structureDecoder = structureDecoder
        this.testLeadDecoder = testLeadDecoder
    }

    _decodePipelines(buf, initialOffset) {
        const numberOfPipelines = this._decodeUint8(buf, initialOffset)
        let pipelines = []
        let offset = numberOfPipelines.offset
        for (let i = 0; i < numberOfPipelines.value; i++) {
            const pipeline = this._decodeString(buf, offset)
            pipelines.push(pipeline.value)
            offset = pipeline.offset
        }
        return new DecoderResult(pipelines, offset)
    }

    _decodeSubitemData(buf, offset, subitemType) {
        switch (subitemType) {
            case SubitemTypes.ANODE:
                return this.anodeDecoder.decode(buf, offset)
            case SubitemTypes.ANODE_BED:
                return this.anodeBedDecoder.decode(buf, offset)
            case SubitemTypes.BOND:
                return this.bondDecoder.decode(buf, offset)
            case SubitemTypes.CIRCUIT:
                return this.circuitDecoder.decode(buf, offset)
            case SubitemTypes.COUPON:
                return this.couponDecoder.decode(buf, offset)
            case SubitemTypes.ISOLATION:
                return this.isolationDecoder.decode(buf, offset)
            case SubitemTypes.PIPELINE:
                return this.pipelineDecoder.decode(buf, offset)
            case SubitemTypes.REFERENCE_CELL:
                return this.referenceCellDecoder.decode(buf, offset)
            case SubitemTypes.RISER:
                return this.riserDecoder.decode(buf, offset)
            case SubitemTypes.SHUNT:
                return this.shuntDecoder.decode(buf, offset)
            case SubitemTypes.SOIL_RESISTIVITY:
                return this.soilResistivityDecoder.decode(buf, offset)
            case SubitemTypes.STRUCTURE:
                return this.structureDecoder.decode(buf, offset)
            case SubitemTypes.TEST_LEAD:
                return this.testLeadDecoder.decode(buf, offset)
        }
    }

    _decodeSubitem(buf, initialOffset) {
        const { value, offset } = this._decodeUint8(buf, initialOffset)
        const subitemType = this.codes.subitemTypes[value]
        const subitemData = this._decodeSubitemData(buf, offset, subitemType)
        return new DecoderResult({
            ...subitemData.value,
            subitemType,
        }, subitemData.offset)
    }

    _decodeSubitems(buf, initialOffset, numberOfSubitems) {
        const subitems = []
        let offset = initialOffset
        for (let i = 0; i < numberOfSubitems; i++) {
            const subitem = this._decodeSubitem(buf, offset)
            subitems.push(subitem.value)
            offset = subitem.offset
        }
        return new DecoderResult(subitems, offset)
    }



    decode(buf, offset) {
        const numberOfSubitems = this._decodeUint8(buf, offset)
        if (numberOfSubitems.value === 0)
            return new DecoderResult({
                pipelines: [],
                subitems: [],
            }, numberOfSubitems.offset)
        else {
            const pipelines = this._decodePipelines(buf, numberOfSubitems.offset)
            const subitems = this._decodeSubitems(buf, pipelines.offset, numberOfSubitems.value)
            return new DecoderResult({
                pipelines: pipelines.value,
                subitems: subitems.value,
            }, subitems.offset)
        }
    }
}