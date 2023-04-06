/*


*/


export const onSubitemSave = 'onSubitemSave' //returns state data when attempting to save subitem in edit screen
export const onItemSave = 'onItemSave' //returns state data when attepting to save item in Edit screen


export const SUBITEM_UPDATED = 'SUBITEM_UPDATED' //returns subitem (with valid object and defaultName)
export const SUBITEM_DELETED = 'SUBITEM_DELETED' //returns subitemId, subitemType, itemId, and timeModified

export const ITEM_UPDATED = 'ITEM_UPDATED' //returns item (with valid object and defaultName)
export const ITEM_DELETED = 'ITEM_DELETED' //returns itemType and itemId

export const POTENTIAL_UPDATED = 'POTENTIAL_UPDATED' // fired after update of single potential. returns potential object and timeModified
export const POTENTIALS_UPDATED = 'POTENTIALS_UPDATED' //fired after updated of list of potentials for subitem. returns potentaials array and subitemId

export const activateMapMarker = 'selectOnMap' //returns itemId and itemType of marker that needs to become active on Map. 

export const GLOBAL_ITEM_UPDATED = 'GLOBAL_ITEM_UPDATED' //returns itemId and itemType
export const GLOBAL_ITEM_DELETED = 'GLOBAL_ITEM_DELETED' ////returns itemId and itemType
