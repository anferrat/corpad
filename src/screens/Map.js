import React from 'react'
import Map from '../features/map/Map'

const MapScreen = ({ navigation }) => {
  const navigateToView = (id, dataType) => navigation.navigate('ViewItem', { itemId: id, dataTypeItem: dataType })
  const navigateToEdit = (id, dataType) => navigation.navigate('EditItem', { itemId: id, isNew: true, dataTypeItem: dataType })
  return (
      <Map
        navigateToView={navigateToView}
        navigateToEdit={navigateToEdit}
      />
  )
}
export default MapScreen