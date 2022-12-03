import React from 'react'
import Map from '../features/map/Map'
import OnboardingOverlay from '../features/overlays/onboarding/OnboardingOverlay'

const MapScreen = ({ navigation }) => {
  const navigateToView = (id, dataType) => navigation.navigate('ViewItem', { itemId: id, dataTypeItem: dataType })
  const navigateToEdit = (id, dataType) => navigation.navigate('EditItem', { itemId: id, isNew: true, dataTypeItem: dataType })
  return (
    <>
      <Map
        navigateToView={navigateToView}
        navigateToEdit={navigateToEdit}
      />
      <OnboardingOverlay onboarding='map' icon='onboarding-navigate' pack='cp' />
    </>
  )
}
export default MapScreen