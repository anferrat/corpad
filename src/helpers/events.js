/*
small case events are for state updates, caps are for database updates

*/

//triggers save subitem inside edit subitem screen. Payload is edit data from subitem state
export const onSubitemSave = 'onSubitemSave'

//triggers item save effect inside edit item screen. payload is item data from edit item state
export const onItemSave = 'onItemSave'

//fires when subitem was updated inside database - payload is new subitem object
export const SUBITEM_UPDATED = 'SUBITEM_UPDATED'

//fires when item was updated inside database  - payload is new item object
export const ITEM_UPDATED = 'ITEM_UPDATED' 