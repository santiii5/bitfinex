import React from 'react'
import PropTypes from 'prop-types'
import Container from '../containers/container'
import { TableRow } from '../Style'
import styled from 'styled-components'

const BookLayout = styled.div`
`

export default class Book extends Container {
  static propTypes = {
		data: PropTypes.array,
	}

  static defaultProps = {
		data: null,
	}

  render() {
    const {
      data,
    } = this.props
    const htmlElem = []

    if(data) {
      data.slice(0, 20).forEach((trade, key) => {
        const price = trade[0]
        const orders = trade[3]
        const amount = trade[4]

        htmlElem.push(
          <TableRow key={key} positiveAmount={amount > 0}>
            <div>{price}</div>
            <div>{orders}</div>
            <div>{amount}</div>
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
      </BookLayout>
    )
  }
}
