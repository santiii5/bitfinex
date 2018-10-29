import React from 'react'
import PropTypes from 'prop-types'
import SocketOptions from './SocketOptions'
import Container from '../containers/container'
import { numberWithCommas } from '../helpers/utils'
import { TableRow } from '../Style'
import styled from 'styled-components'
import { ComponentHeader, ComponentContent, color3 } from '../Style'

const BookLayout = styled.div`
`

const BookSelling = styled.div`
  div div:first-child {
    color: red;
  }
`

const BookBuying = styled.div`
  border-top: 1px dashed white;

  div div:first-child {
    color: ${color3};
  }
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
      startWebsocket,
      stopWebsocket,
      socketText,
      status,
    } = this.props
    let listBuying = []
    let listSelling = []
    const elemBuying = []
    const elemSelling = []
    const data = this.props.data || {}
    let component = 'No books data yet'

    if(data.length > 0) {
      data.slice(0, 50).forEach((trade, key) => {
        trade[2] > 0 ? listBuying.push(trade) : listSelling.push(trade)
      })

      // TODO: handle properly the array order
      listBuying.slice(0, 10).forEach((trade, key) => elemBuying.push(this.renderElement(trade, key)))
      listSelling.slice(0, 10).reverse().forEach((trade, key) => elemSelling.push(this.renderElement(trade, key)))

      component = (
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
      )
    }

    return (
      <BookLayout>
        <ComponentHeader>
          <h3>Book</h3>
          <SocketOptions
            startSocket={startWebsocket.bind(this)}
            stopSocket={stopWebsocket.bind(this)}
            socketText={socketText}
            status={status}
          />
        </ComponentHeader>
        <ComponentContent>
          {component}
        </ComponentContent>
      </BookLayout>
    )
  }
}
