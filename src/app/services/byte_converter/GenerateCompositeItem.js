import { ItemStatuses, ItemTypes } from "../../../constants/global";
import { Pipeline } from "../../entities/survey/items/Pipeline";
import { Rectifier } from "../../entities/survey/items/Rectifier";
import { TestPoint } from "../../entities/survey/items/TestPoint";
import { AnodeBedAnode } from "../../entities/survey/subitems/AnodeBedAnode";
import { Potential } from "../../entities/survey/subitems/Potential";
import { SoilResistivityLayer } from "../../entities/survey/subitems/SoilResistivityLayer";
import { Error, errors } from "../../utils/Error";
import { guid } from "../../utils/guid";
import { DefaultPotentialTypes } from "./constants/DefaultPotentialTypes";
import { DefaultReferenceCells } from "./constants/DefaultReferenceCells";

/*

Creates item with subitems, potentials, pipelines, potentialTypes, and reference cells from decoded data

*/


export class GenerateCompositeItem {
    constructor(defaultNameRepo, subitemFactory) {
        this.defaultNameRepo = defaultNameRepo
        this.defaultPotentialTypes = new DefaultPotentialTypes()
        this.defaultReferenceCells = new DefaultReferenceCells()
        this.subitemFactory = subitemFactory
        this.DEFAULT_ID = 0
    }

    _generateItem(data) {
        const { itemType, name, uid, latitude, longitude, location, comment, timestamp, testPointType, maxVoltage, maxCurrent, serialNumber, model, powerSource, tapSetting, tapValue, tapCoarse, tapFine, acVoltage, acCurrent } = data
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return new TestPoint(this.DEFAULT_ID, uid, name, ItemStatuses.UNKNOWN, timestamp, timestamp, comment, location, latitude, longitude, testPointType)
            case ItemTypes.RECTIFIER:
                return new Rectifier(this.DEFAULT_ID, uid, name, ItemStatuses.UNKNOWN, timestamp, timestamp, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
            default:
                throw new Error(errors.GENERAL, 'Unable to genertate item', 'ItemType is not supported')
        }
    }

    _generateAnodeBedAnodes(anodes, subitemId) {
        if (anodes)
            return anodes
                .map(({ wireColor, wireGauge, current }) =>
                    new AnodeBedAnode(null, guid(), subitemId, current, wireColor, wireGauge))
        else return anodes
    }
    _generateSoilResistivityLayers(layers, subitemId) {
        if (layers)
            return layers
                .map(({ resistanceToZero, spacing }) =>
                    new SoilResistivityLayer(null, guid(), subitemId, spacing, resistanceToZero, null, null, null))
        else return layers
    }

    _generatePotentials(potentials, subitemId) {
        if (potentials)
            return potentials.map(({ isPortableReference, referenceCellId, rcType, permanentPotentialType, value }) =>
                new Potential(
                    null,
                    guid(),
                    subitemId,
                    value,
                    this.defaultPotentialTypes.typeMap.get(permanentPotentialType),
                    isPortableReference ? this.defaultReferenceCells.cellMap.get(rcType) : referenceCellId,
                    isPortableReference))
        else
            return potentials
    }

    _getDefaultNameIndex(subitems, subitemType, subitemIndex) {
        return (subitems.filter((_, index) => index <= subitemIndex).filter(subitem => subitem.subitemType === subitemType)).length
    }

    async _generateName(name, subitemType, subitemId, subitems) {
        if (name && name !== null)
            return name
        else {
            const defaultName = await this.defaultNameRepo.getByType(subitemType)
            const index = this._getDefaultNameIndex(subitems, subitemType, subitemId)
            return `${defaultName} ${index}`
        }
    }

    async _generateSubitem(subitemData, subitemId, subitems) {
        const { name, potentials, subitemType, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, area, isolationType, shorted, pipelineId, rcType, nps, factor, description, comment, enclosureType, bedType, materialType, anodes, layers } = subitemData
        const generatedName = await this._generateName(name, subitemType, subitemId, subitems)
        const generatedLayers = this._generateSoilResistivityLayers(layers, subitemId)
        const generatedAnodes = this._generateAnodeBedAnodes(anodes, subitemId)
        const generatedPotentials = this._generatePotentials(potentials, subitemId)
        const subitem = this.subitemFactory.execute(subitemId, guid(), generatedName, subitemType, this.DEFAULT_ID, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, undefined, area, isolationType, shorted, pipelineId, rcType, nps, factor, true, description, null, null, undefined, undefined, comment, enclosureType, bedType, materialType, generatedAnodes, generatedLayers)
        subitem.calculate()
        if (generatedPotentials)
            subitem.setPotentials(generatedPotentials)
        return subitem
    }

    async _generateSubitems(subitems) {
        return await Promise.all(subitems.map((subitemData, index) => this._generateSubitem(subitemData, index, subitems)))
    }

    _generatePipelines(pipelines, timestamp) {
        return pipelines.map((name, index) => new Pipeline(index, guid(), name, timestamp, timestamp, null, null, null, true, null, null, 0))
    }


    async execute(decodedData) {
        const item = this._generateItem(decodedData)
        const { subitems, pipelines, timestamp } = decodedData
        const generatedSubitems = await this._generateSubitems(subitems)
        const generatedPipelines = this._generatePipelines(pipelines, timestamp)
        item.setSubitems(generatedSubitems)
        return {
            item,
            pipelines: generatedPipelines,
            referenceCells: this.defaultReferenceCells.cells,
            potentialTypes: this.defaultPotentialTypes.types
        }
    }
}