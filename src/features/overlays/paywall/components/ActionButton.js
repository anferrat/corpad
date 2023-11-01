import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SubscriptionStatuses } from '../../../../constants/global'
import { Button } from '@ui-kitten/components'
import RestoreView from './RestoreView'
import { activity } from '../../../../components/Icons'


const ActionButton = ({ status, onPurchase, onRestore, onClose, onVerify, isUnavailable, price, processing }) => {
  switch (status) {
    case SubscriptionStatuses.GRANTED:
    case SubscriptionStatuses.UNKNOWN_GRANTED:
      return <Button
        style={styles.button}
        onPress={onClose}>
        Continue
      </Button>
    case SubscriptionStatuses.UNKNOWN_NOT_GRANTED:
      return <Button
        disabled={processing}
        accessoryLeft={processing ? activity : null}
        style={styles.button}
        onPress={onVerify}>
        Verify
      </Button>
    case SubscriptionStatuses.NOT_GRANTED:
      return <>
        <Button
          accessoryLeft={processing ? activity : null}
          disabled={isUnavailable || processing}
          style={styles.button}
          onPress={onPurchase}>
          {isUnavailable ? 'Unavailable' : `7-day trial, ${price}/month`}
        </Button>
        <RestoreView
          disabled={processing}
          onRestore={onRestore} />
      </>
    case SubscriptionStatuses.PENDING:
      return <Button
        disabled={true}
        style={styles.button}
        accessoryLeft={activity}
      />
    default:
      return null
  }
}

export default ActionButton

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 12
  },
})