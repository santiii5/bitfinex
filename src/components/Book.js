import React from 'react'
import PropTypes from 'prop-types'
import SocketOptions from './SocketOptions'
import Container from '../containers/container'
import { numberWithCommas } from '../helpers/utils'
import { TableRow } from '../Style'
import styled from 'styled-components'

const BookLayout = styled.div`
`

const BookSelling = styled.div`
  background-color: red;
`

const BookBuying = styled.div`
  background-color: green;
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

  renderElement(trade, key) {
    const price = parseFloat(trade[0]).toFixed(2)
    const orders = trade[1]
    const amount = parseFloat(trade[2]).toFixed(2)
    const component = (
      <TableRow key={key} positiveAmount={amount > 0}>
        <div>{numberWithCommas(price.toString())}</div>
        <div>{orders}</div>
        <div>{amount.toString()}</div>
      </TableRow>
    )

    return component
  }

  render() {
    const {
      data,
      startWebsocket,
      stopWebsocket,
      socketText,
      status,
    } = this.props
    let listBuying = []
    let listSelling = []
    const elemBuying = []
    const elemSelling = []

    if(Object.keys(data).length > 0) {
      data.slice(0, 50).forEach((trade, key) => {
        trade[2] > 0 ? listBuying.push(trade) : listSelling.push(trade)
      })

      // TODO: handle properly the array order
      listBuying.forEach((trade, key) => elemBuying.push(this.renderElement(trade, key)))
      listSelling.reverse().forEach((trade, key) => elemSelling.push(this.renderElement(trade, key)))
    }

    const component = data ? (
      <div>
        <TableRow header={true}>
          <div>Price</div>
          <div>Orders</div>
          <div>Amount</div>
        </TableRow>
        <BookSelling>
          {elemSelling}
        </BookSelling>
        <BookBuying>
          {elemBuying}
        </BookBuying>
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
