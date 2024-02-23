import { ParamEncoder } from "./encoders/ParamEncoder"
import { Encoder } from "./encoders/Encoder"
import { ItemEncoder } from "./encoders/ItemEncoder"
import { TestPointEncoder } from "./encoders/items/TestPointEncoder"
import { RectifierEncoder } from "./encoders/items/RectifierEncoder"
import { Codes } from "../constants/Codes"
import { SubitemEncoder } from "./encoders/SubitemEncoder"
import { AnodeEncoder } from "./encoders/subitems/AnodeEncoder"
import { PotentialEncoder } from "./encoders/subitems/subproperties/PotentialEncoder"
import { WireParamEncoder } from "./encoders/subitems/subproperties/WireParamEncoder"
import { AnodeBedEncoder } from "./encoders/subitems/AnodeBedEncoder"
import { AnodeBedAnodeEncoder } from "./encoders/subitems/subproperties/AnodeBedAnodeEncoder"
import { BondEncoder } from "./encoders/subitems/BondEncoder"
import { SideEncoder } from "./encoders/subitems/subproperties/SideEncoder"
import { CircuitEncoder } from "./encoders/subitems/CircuitEncoder"
import { CouponEncoder } from "./encoders/subitems/CouponEncoder"
import { IsolationEncoder } from "./encoders/subitems/IsolationEncoder"
import { PipelineEncoder } from "./encoders/subitems/PipelineEncoder"
import { ReferenceCellEncoder } from "./encoders/subitems/ReferenceCellEncoder"
import { RiserEncoder } from "./encoders/subitems/RiserEncoder"
import { ShuntEncoder } from "./encoders/subitems/ShuntEncoder"
import { SoilResistivityEncoder } from "./encoders/subitems/SoilResistivityEncoder"
import { SoilResistivityLayerEncoder } from "./encoders/subitems/subproperties/SoilResistivityLayerEncoder"
import { StructureEncoder } from "./encoders/subitems/StructureEncoder"
import { TestLeadEncoder } from "./encoders/subitems/TestLeadEncoder"

export class LinkEncoder extends Encoder {
    //Encodes item into a byte array returns as base64 string
    constructor() {
        super()
        this.codes = new Codes()
        this.potentialEncoder = new PotentialEncoder(this.codes)
        this.wireParamEncoder = new WireParamEncoder(this.codes)
        this.sideEncoder = new SideEncoder()

        this.paramEncoder = new ParamEncoder()

        this.itemEncoder = new ItemEncoder(
            new TestPointEncoder(this.codes),
            new RectifierEncoder(this.codes),
            this.codes
        )

        this.subitemEncoder = new SubitemEncoder(
            this.codes,
            new AnodeEncoder(this.codes, this.potentialEncoder, this.wireParamEncoder),
            new AnodeBedEncoder(this.codes, new AnodeBedAnodeEncoder(this.wireParamEncoder)),
            new BondEncoder(this.sideEncoder),
            new CircuitEncoder(),
            new CouponEncoder(this.codes, this.potentialEncoder, this.wireParamEncoder),
            new IsolationEncoder(this.codes, this.sideEncoder),
            new PipelineEncoder(this.potentialEncoder, this.wireParamEncoder),
            new ReferenceCellEncoder(this.codes, this.potentialEncoder, this.wireParamEncoder),
            new RiserEncoder(this.codes, this.potentialEncoder),
            new ShuntEncoder(this.sideEncoder),
            new SoilResistivityEncoder(new SoilResistivityLayerEncoder()),
            new StructureEncoder(this.potentialEncoder),
            new TestLeadEncoder(this.potentialEncoder, this.wireParamEncoder)
        )
    }

    encode(item, pipelines = [], referenceCells = [], potentialTypes = []) {
        const buffer = this._concat([
            this.paramEncoder.encode(),
            this.itemEncoder.encode(item),
            this.subitemEncoder.encode(item.subitems, pipelines, referenceCells, potentialTypes)])
        const message = buffer.toString('base64')
        return 'com.corpad://l/' + encodeURIComponent(message)
    }

}