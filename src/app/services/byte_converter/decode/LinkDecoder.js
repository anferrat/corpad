import { Buffer } from "buffer";
import { Error, errors } from "../../../utils/Error";
import { Codes } from "../constants/Codes";
import { ParamDecoder } from "./decoders/ParamDecoder";
import { ItemDecoder } from "./decoders/ItemDecoder";
import { TestPointDecoder } from "./decoders/items/TestPointDecoder";
import { RectifierDecoder } from "./decoders/items/RectifierDecoder";
import { WireParamDecoder } from "./decoders/subitems/subproperties/WireParamDecoder";
import { PotentialDecoder } from "./decoders/subitems/subproperties/PotentialDecoder";
import { SideDecoder } from "./decoders/subitems/subproperties/SideDecoder";
import { SubitemDecoder } from "./decoders/SubitemDecoder";
import { AnodeBedDecoder } from "./decoders/subitems/AnodeBedDecoder";
import { AnodeBedAnodeDecoder } from "./decoders/subitems/subproperties/AnodeBedAnodeDecoder";
import { AnodeDecoder } from "./decoders/subitems/AnodeDecoder";
import { BondDecoder } from "./decoders/subitems/BondDecoder";
import { CircuitDecoder } from "./decoders/subitems/CircuitDecoder";
import { CouponDecoder } from "./decoders/subitems/CouponDecoder";
import { IsolationDecoder } from "./decoders/subitems/IsolationDecoder";
import { PipelineDecoder } from "./decoders/subitems/PipelineDecoder";
import { ReferenceCellDecoder } from "./decoders/subitems/ReferenceCellDecoder";
import { RiserDecoder } from "./decoders/subitems/RiserDecoder";
import { ShuntDecoder } from "./decoders/subitems/ShuntDecoder";
import { SoilResistivityDecoder } from "./decoders/subitems/SoilResistivityDecoder";
import { SoilResistivityLayerDecoder } from "./decoders/subitems/subproperties/SoilResistivityLayerDecoder";
import { StructureDecoder } from "./decoders/subitems/StructureDecoder";
import { TestLeadDecoder } from "./decoders/subitems/TestLeadDecoder";

export class LinkDecoder {
    //decodes byte data into an object
    constructor() {
        this.codes = new Codes()
        this.codes.reverseCodes()
        this.wireParamDecoder = new WireParamDecoder(this.codes)
        this.potentialDecoder = new PotentialDecoder(this.codes)
        this.sideDecoder = new SideDecoder()

        this.paramDecoder = new ParamDecoder(this.codes)
        this.itemDecoder = new ItemDecoder(
            new TestPointDecoder(this.codes),
            new RectifierDecoder(this.codes),
            this.codes
        )
        this.subitemDecoder = new SubitemDecoder(
            this.codes,
            new AnodeBedDecoder(this.codes, new AnodeBedAnodeDecoder(this.wireParamDecoder)),
            new AnodeDecoder(this.codes, this.potentialDecoder, this.wireParamDecoder),
            new BondDecoder(this.sideDecoder),
            new CircuitDecoder(),
            new CouponDecoder(this.codes, this.potentialDecoder, this.wireParamDecoder),
            new IsolationDecoder(this.codes, this.sideDecoder),
            new PipelineDecoder(this.wireParamDecoder, this.potentialDecoder),
            new ReferenceCellDecoder(this.codes, this.wireParamDecoder, this.potentialDecoder),
            new RiserDecoder(this.codes, this.potentialDecoder),
            new ShuntDecoder(this.sideDecoder),
            new SoilResistivityDecoder(this.codes, new SoilResistivityLayerDecoder()),
            new StructureDecoder(this.potentialDecoder),
            new TestLeadDecoder(this.potentialDecoder, this.wireParamDecoder)
        )
    }

    _extractData(link) {
        const isValid = link.startsWith('com.corpad://l/')
        if (isValid)
            return Buffer.from(decodeURIComponent(link.substring(15)), 'base64')
        else throw new Error(errors.GENERAL, 'Unable to extract data', 'Link is not valid')
    }

    decode(link) {
        const buf = this._extractData(link)
        const params = this.paramDecoder.decode(buf)
        const itemData = this.itemDecoder.decode(buf, params.offset)
        const subitemData = this.subitemDecoder.decode(buf, itemData.offset)
        return ({
            ...params.value,
            ...itemData.value,
            ...subitemData.value
        })
    }
}