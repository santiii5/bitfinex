import React from 'react'
import PropTypes from 'prop-types'
import SocketOptions from './SocketOptions'
import Container from '../containers/container'
import { numberWithCommas } from '../helpers/utils'
import { TableRow } from '../Style'
import styled from 'styled-components'

const BookLayout = styled.div`
`

export default class Book extends Container {
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
        const price = parseFloat(trade[0]).toFixed(2)
        const orders = trade[1]
        const amount = parseFloat(trade[2]).toFixed(2)
        console.log(trade);
        htmlElem.push(
          <TableRow key={key} positiveAmount={amount > 0}>
            <div>{numberWithCommas(price.toString())}</div>
            <div>{orders}</div>
            <div>{amount.toString()}</div>
          </TableRow>
        )
      })
    }

    const component = data ? (
      <div>
        <TableRow header={true}>
          <div>Price</div>
          <div>Orders</div>
          <div>Amount</div>
        </TableRow>
        {htmlElem}
      </div>
    ) : 'Loading book...'

    return (
      <BookLayout>
        <h3>Book</h3>
        {component}
        <SocketOptions
          startSocket={startWebsocket.bind(this)}
          stopSocket={stopWebsocket.bind(this)}
          socketText={socketText}
          status={status}
        />
      </BookLayout>
    )
  }
}
