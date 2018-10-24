import React from 'react'
import PropTypes from 'prop-types'
import SocketOptions from './SocketOptions'
import Container from '../containers/container'
import styled from 'styled-components'
import { TableRow } from '../Style'
import { numberFormat, numberWithCommas } from '../helpers/utils'

const TradesLayout = styled.div`
`

export default class Trades extends Container {
  static propTypes = {
		data: PropTypes.array,
    startWebsocket: PropTypes.func.isRequired,
    stopWebsocket: PropTypes.func.isRequired,
    socketText: PropTypes.string,
    status: PropTypes.bool,
	}

  static defaultProps = {
		data: null,
	}

  render() {
    const {
      data,
      startWebsocket,
      stopWebsocket,
      socketText,
      status,
    } = this.props
    const htmlElem = []

    if(data) {
      data.slice(0, 20).forEach((trade, key) => {
        const date = new Date(trade[1])
        const amount = trade[2]
        const price = trade[3]

        htmlElem.push(
          <TableRow key={key} positiveAmount={amount > 0}>
            <div>{date.toLocaleTimeString()}</div>
            <div className="amount">{numberFormat(amount)}</div>
            <div>{numberWithCommas(price.toFixed(2))}</div>
          </TableRow>
        )
      })
    }

    const component = data ? (
      <div>
        <TableRow header={true}>
          <div>Time</div>
          <div>Amount</div>
          <div>Price</div>
        </TableRow>
        {htmlElem}
      </div>
    ) : 'Loading trades...'

    return (
      <TradesLayout>
        <h3>Trades</h3>
        {component}
        <SocketOptions
          startSocket={startWebsocket.bind(this)}
          stopSocket={stopWebsocket.bind(this)}
          socketText={socketText}
          status={status}
        />
      </TradesLayout>
    )
  }
}
