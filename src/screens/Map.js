import React from 'react'
import Map from '../features/map/Map'
import { OnboardingOverlayEditMap } from '../features/overlays/onboarding'

const MapScreen = ({ navigation }) => {
  const navigateToView = (id, itemType) => navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
  const navigateToEdit = (id, itemType) => navigation.navigate('EditItem', { itemId: id, isNew: true, itemType: itemType })
  return (
    <>
      <OnboardingOverlayEditMap
        visible={true} />
      <Map
        navigateToView={navigateToView}
        navigateToEdit={navigateToEdit}
      />
    </>
  )
}
export default MapScreen