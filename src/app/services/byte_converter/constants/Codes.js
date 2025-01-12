import { TestPointTypes, CoarseFineOptions, PowerSources, TapOptions, SubitemTypes, ReferenceCellTypes, PermanentPotentialTypes, AnodeMaterials, WireColors, WireGauges, PipeDiameters, CouponTypes, IsolationTypes, AnodeBedEnclosureTypes, AnodeBedTypes, AnodeBedMaterialTypes, ItemTypes, ExternalLinkTypes } from "../../../../constants/global"

export class Codes {
    constructor() {
        this.linkTypes = Object.freeze({
            [ExternalLinkTypes.NFC]: 1,
            [ExternalLinkTypes.QR_CODE]: 2
        })

        this.itemTypes = Object.freeze({
            [ItemTypes.TEST_POINT]: 1,
            [ItemTypes.RECTIFIER]: 2
        })

        this.testPointTypes = Object.freeze({
            [TestPointTypes.TEST_STATION]: 1,
            [TestPointTypes.HEADER]: 2,
            [TestPointTypes.JUNCTION_BOX]: 3,
            [TestPointTypes.FIELD_NOTE]: 4,
            [TestPointTypes.MEASURMENT]: 5
        })

        this.coarseFineOptions = Object.freeze({
            [CoarseFineOptions.A]: 1,
            [CoarseFineOptions.B]: 2,
            [CoarseFineOptions.C]: 3,
            [CoarseFineOptions.D]: 4,
            [CoarseFineOptions.E]: 5,
            [CoarseFineOptions.F]: 6,
            [CoarseFineOptions.H]: 7,
            [CoarseFineOptions.K]: 8,
            [CoarseFineOptions.D0]: 9,
            [CoarseFineOptions.D1]: 10,
            [CoarseFineOptions.D2]: 11,
            [CoarseFineOptions.D3]: 12,
            [CoarseFineOptions.D4]: 13,
            [CoarseFineOptions.D5]: 14,
            [CoarseFineOptions.D6]: 15,
            [CoarseFineOptions.D7]: 16,
            [CoarseFineOptions.D8]: 17,
            [CoarseFineOptions.D9]: 18,
            [CoarseFineOptions.G]: 19, //don't ask
            [CoarseFineOptions.J]: 20,
        })

        this.powerSources = Object.freeze({
            [PowerSources.AC_POWER]: 1,
            [PowerSources.TEG]: 2,
            [PowerSources.SOLAR]: 3,
            [PowerSources.WIND]: 4
        })

        this.tapSettings = Object.freeze({
            [TapOptions.AUTO]: 1,
            [TapOptions.COARSE_FINE]: 2,
            [TapOptions.RESISTOR]: 3
        })
        this.subitemTypes = Object.freeze({
            [SubitemTypes.ANODE]: 1,
            [SubitemTypes.ANODE_BED]: 2,
            [SubitemTypes.BOND]: 3,
            [SubitemTypes.CIRCUIT]: 4,
            [SubitemTypes.COUPON]: 5,
            [SubitemTypes.ISOLATION]: 6,
            [SubitemTypes.PIPELINE]: 7,
            [SubitemTypes.REFERENCE_CELL]: 8,
            [SubitemTypes.RISER]: 9,
            [SubitemTypes.SHUNT]: 10,
            [SubitemTypes.SOIL_RESISTIVITY]: 11,
            [SubitemTypes.STRUCTURE]: 12,
            [SubitemTypes.TEST_LEAD]: 13
        })
        this.referenceCellTypes = Object.freeze({
            [ReferenceCellTypes.COPPER_SULFATE]: 1,
            [ReferenceCellTypes.NORMAL_HYDROGEN]: 5,
            [ReferenceCellTypes.SATURATED_CALOMEL]: 4,
            [ReferenceCellTypes.SILVER_CHLORIDE]: 3,
            [ReferenceCellTypes.ZINC]: 2
        })
        this.potentialTypes = Object.freeze({
            [PermanentPotentialTypes.ON]: 1,
            [PermanentPotentialTypes.OFF]: 2,
            [PermanentPotentialTypes.DEPOL]: 3,
            [PermanentPotentialTypes.CONNECTED]: 4,
            [PermanentPotentialTypes.DISCONNECTED]: 5,
            [PermanentPotentialTypes.AC]: 6
        })
        this.anodeMaterials = Object.freeze({
            [AnodeMaterials.MAGNEZIUM]: 1,
            [AnodeMaterials.ALUMINUM]: 2,
            [AnodeMaterials.ZINC]: 3,
            [AnodeMaterials.OTHER]: 4
        })
        this.wireColors = Object.freeze({
            [WireColors.BLACK]: 1,
            [WireColors.BLACK_RED]: 11,
            [WireColors.DARK_BLUE]: 8,
            [WireColors.GREEEN_YELLOW]: 12,
            [WireColors.GREEN]: 2,
            [WireColors.LIGHT_BLUE]: 7,
            [WireColors.PINK]: 6,
            [WireColors.RED]: 5,
            [WireColors.WHITE]: 3,
            [WireColors.WHITE_BLACK]: 10,
            [WireColors.WHITE_RED]: 9,
            [WireColors.YELLOW]: 4
        })
        this.wireGauges = Object.freeze({
            [WireGauges.AVG0_PLUS]: 1,
            [WireGauges.AVG0]: 2,
            [WireGauges.AVG1]: 3,
            [WireGauges.AVG2]: 4,
            [WireGauges.AVG3]: 5,
            [WireGauges.AVG4]: 6,
            [WireGauges.AVG5]: 7,
            [WireGauges.AVG6]: 8,
            [WireGauges.AVG7]: 9,
            [WireGauges.AVG8]: 10,
            [WireGauges.AVG9]: 11,
            [WireGauges.AVG10]: 12,
            [WireGauges.AVG11]: 13,
            [WireGauges.AVG12]: 14,
            [WireGauges.AVG13]: 15,
            [WireGauges.AVG14]: 16,
            [WireGauges.AVG15]: 17,
            [WireGauges.AVG16]: 18,
            [WireGauges.AVG17]: 19,
            [WireGauges.AVG17_MINUS]: 20
        })
        this.pipeSizes = Object.freeze({
            [PipeDiameters.NPS0_5]: 1,
            [PipeDiameters.NPS3_4]: 2,
            [PipeDiameters.NPS1]: 3,
            [PipeDiameters.NPS5_4]: 4,
            [PipeDiameters.NPS3_2]: 5,
            [PipeDiameters.NPS2]: 6,
            [PipeDiameters.NPS5_2]: 7,
            [PipeDiameters.NPS3]: 8,
            [PipeDiameters.NPS7_2]: 9,
            [PipeDiameters.NPS4]: 10,
            [PipeDiameters.NPS5]: 11,
            [PipeDiameters.NPS6]: 12,
            [PipeDiameters.NPS7]: 13,
            [PipeDiameters.NPS8]: 14,
            [PipeDiameters.NPS9]: 15,
            [PipeDiameters.NPS10]: 16,
            [PipeDiameters.NPS12]: 17,
            [PipeDiameters.NPS14]: 18,
            [PipeDiameters.NPS16]: 19,
            [PipeDiameters.NPS18]: 20,
            [PipeDiameters.NPS20]: 21,
            [PipeDiameters.NPS22]: 22,
            [PipeDiameters.NPS24]: 23,
            [PipeDiameters.NPS26]: 24,
            [PipeDiameters.NPS28]: 25,
            [PipeDiameters.NPS30]: 26,
            [PipeDiameters.NPS32]: 27,
            [PipeDiameters.NPS34]: 28,
            [PipeDiameters.NPS36]: 29,
            [PipeDiameters.NPS40]: 30,
            [PipeDiameters.NPS42]: 31,
            [PipeDiameters.NPS44]: 32,
            [PipeDiameters.NPS46]: 33,
            [PipeDiameters.NPS48]: 34,
            [PipeDiameters.NPS52]: 35,
            [PipeDiameters.NPS56]: 36,
            [PipeDiameters.NPS60]: 37,
            [PipeDiameters.NPS64]: 38,
            [PipeDiameters.NPS68]: 39,
            [PipeDiameters.NPS72]: 40,
            [PipeDiameters.NPS76]: 41,
            [PipeDiameters.NPS80]: 42,
            [PipeDiameters.NPS88]: 43
        })
        this.couponTypes = Object.freeze({
            [CouponTypes.AC]: 1,
            [CouponTypes.DC]: 2
        })

        this.isolationTypes = Object.freeze({
            [IsolationTypes.ISOLATION_KIT]: 1,
            [IsolationTypes.ISOLATION_JOINT]: 2,
            [IsolationTypes.OTHER]: 3
        })

        this.enclosureTypes = Object.freeze({
            [AnodeBedEnclosureTypes.JUNCTION_BOX]: 1,
            [AnodeBedEnclosureTypes.UNDEGROUND_BOX]: 2,
            [AnodeBedEnclosureTypes.BURIED]: 3
        })

        this.anodeBedTypes = Object.freeze({
            [AnodeBedTypes.SHALLOW_VERTICAL]: 1,
            [AnodeBedTypes.SHALLOW_HORIZONTAL]: 2,
            [AnodeBedTypes.DEEP_VERTICAL]: 3
        })

        this.anodeBedMaterialTypes = Object.freeze({
            [AnodeBedMaterialTypes.GRAPHITE]: 1,
            [AnodeBedMaterialTypes.MIXED_METAL_OXIDE]: 2,
            [AnodeBedMaterialTypes.PLATINUM]: 3,
            [AnodeBedMaterialTypes.CONDUCTIVE_POLYMER]: 4,
            [AnodeBedMaterialTypes.SCRAP_METAL]: 5,
            [AnodeBedMaterialTypes.MAGNETITE]: 6,
            [AnodeBedMaterialTypes.ALUMINUM]: 7
        })
    }


    reverse(obj) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            //Needed number check because JS converts number keys to string
            acc[value] = isNaN(Number(key)) ? key : Number(key)
            return acc
        }, {})
    }

    reverseCodes() {
        this.itemTypes = this.reverse(this.itemTypes)
        this.testPointTypes = this.reverse(this.testPointTypes)
        this.coarseFineOptions = this.reverse(this.coarseFineOptions)
        this.powerSources = this.reverse(this.powerSources)
        this.tapSettings = this.reverse(this.tapSettings)
        this.subitemTypes = this.reverse(this.subitemTypes)
        this.referenceCellTypes = this.reverse(this.referenceCellTypes)
        this.potentialTypes = this.reverse(this.potentialTypes)
        this.anodeMaterials = this.reverse(this.anodeMaterials)
        this.wireColors = this.reverse(this.wireColors)
        this.wireGauges = this.reverse(this.wireGauges)
        this.pipeSizes = this.reverse(this.pipeSizes)
        this.couponTypes = this.reverse(this.couponTypes)
        this.isolationTypes = this.reverse(this.isolationTypes)
        this.enclosureTypes = this.reverse(this.enclosureTypes)
        this.anodeBedTypes = this.reverse(this.anodeBedTypes)
        this.anodeBedMaterialTypes = this.reverse(this.anodeBedMaterialTypes)
        this.linkTypes = this.reverse(this.linkTypes)
    }

}