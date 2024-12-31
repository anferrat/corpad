import { Pipeline } from "../../src/app/entities/survey/items/Pipeline"
import { ReferenceCell } from "../../src/app/entities/survey/other/ReferenceCell"
import { PotentialType } from "../../src/app/entities/survey/other/PotentialType"
import { Potential } from "../../src/app/entities/survey/subitems/Potential"
import { TestPoint } from "../../src/app/entities/survey/items/TestPoint"
import { PipelineLead } from "../../src/app/entities/survey/subitems/PipelineLead"
import { Anode } from "../../src/app/entities/survey/subitems/Anode"
import { Bond } from "../../src/app/entities/survey/subitems/Bond"
import { Coupon } from "../../src/app/entities/survey/subitems/Coupon"
import { Rectifier } from "../../src/app/entities/survey/items/Rectifier"
import { Circuit } from "../../src/app/entities/survey/subitems/Circuit"
import { AnodeBed } from "../../src/app/entities/survey/subitems/AnodeBed"
import { AnodeBedAnode } from "../../src/app/entities/survey/subitems/AnodeBedAnode"


const pipelines = [
    new Pipeline(1, 'sdsdsds', 'Hui ego znaet', Date.now(), Date.now(), 'Nothis really', 3, null, true, null, null, 0),
    new Pipeline(2, 'lowkey', 'Niche blyat', Date.now(), Date.now(), null, null, null, true, null, null, 0)
]

const referenceCells = [
    new ReferenceCell(1, 'sadsad', ReferenceCellTypes.COPPER_SULFATE, 'RC1', true)
]

const potentialTypes = [
    new PotentialType(1, 'asasasa', 'ON', PermanentPotentialTypes.ON, false),
    new PotentialType(2, 'skdskdsd', 'OFF', PermanentPotentialTypes.OFF, false),
    new PotentialType(3, 'aassa', 'Depol', PermanentPotentialTypes.DEPOL, false),
    new PotentialType(4, 'sdsdsds', 'Disc', PermanentPotentialTypes.DISCONNECTED, false),
    new PotentialType(5, 'sdasa', 'Connec', PermanentPotentialTypes.CONNECTED, false)
]

const pipelineLead = new PipelineLead(2, 3, 'sdsdsdsd', 'My Pipe', null, 5, 3)
pipelineLead.setPotentials([
    new Potential(1, 'asasas', 2, -0.890, 1, 1, true, null),
    new Potential(2, 'dasds', 2, -0.540, 2, 1, true, null),
])

const testPoint =
    new TestPoint(3, '0bfd7953-e4ff-c758-1729-d91c0c40fcc9', 'CPTS-25', 0, Date.now(), Date.now(), 'In front of the house', '1332 Fern Dr', 51.111936, -114.175154, 0)
const subitems = [
    new Anode(1, 3, '787hdhujk-2ud-4hy-kski', 'my Anode', 2, 1, 0),
    pipelineLead,
    new Bond(3, 3, 'dsdsdsdsdsdsd', 'Bond 1', true, 0.12, [1], [2], null),
    new Coupon(4, 3, 'dsdsdss', 'Coupon 2', 5, 3, 2, 0, 23, null, 100, null),
    //new Riser(5, 3, 'sdsdsds', 'Riser 2', 2, 4),
    //new Shunt(6, 3, 'sdsdsdsd', 'Shunt 1', 0.322, 50, 20, true, 3, 15, true, [1], [2], 10),
    //new Structure(7, 3, 'assasa', 'Jerr2', 'Nothing here'),
    //new TestLead(8, 3, 'dksldks', 'Test lead 1', 4, 3),
    //new Isolation(9, 3, 'asasasa', 'IK1', true, 0, true, -0.4, [5], [7]),
    /*new SoilResistivity(10, 3, 'asasa', 'SR1', 0, 0, 'cidid', [
      new SoilResistivityLayer(1, 'asasa', 10, 2, 5, null, null, null),
      new SoilResistivityLayer(2, 'asasa', 10, 4, 6, null, null, null),
      new SoilResistivityLayer(3, 'asasa', 10, 1, 9, null, null, null)
    ]),
    */
    //new StatReferenceCell(11, 3, 'sdsdsdsdsds', 'RefCell', 0, 3, 4)
]
testPoint.setSubitems(subitems)
const rectifier = new Rectifier(1, '787hdhujk-2ud-4hy-kski', 'hooks', 0, Date.now(), Date.now(), 'Very cool rectifier', 'Cant believe it', 51.111936, -114.175154, 'My basic', 'non34urbusiness', 0, null, null, 2, 43, 2, 4, null, 34)
rectifier.setSubitems([
    new Circuit(1, 1, 'dasas', 'JKdjdj', null, null, 1, 2, 1.5, 2, null),
    new AnodeBed(1, 1, '2323', 'Bed', 0, 0, 0, [
        new AnodeBedAnode(1, 'asa', 1, 2.2, 3, 4),
        new AnodeBedAnode(2, 'a32a', 1, 2.1, null, null),
        new AnodeBedAnode(3, 'a21sa', 1, 2.7, null, null)])
])