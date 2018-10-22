import React from 'react'
import Container from '../containers/container'
import styled, {css} from 'styled-components'

const BookLayout = styled.div`
`
const BookLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid grey;
  padding: 2px 5px;
  justify-items: right;

  ${props => props.header && css`
    font-size: 18px;
    color: yellow;
    font-weight: bold;
  `}
`
export default class Book extends Container {
  render() {
    const {
      data,
    } = this.props
    console.log('book', data);
    const htmlElem = []

    if(data) {
      data.slice(0, 20).forEach((trade, key) => {
        const price = trade[0]
        const orders = trade[3]
        const amount = trade[4]

        htmlElem.push(
          <BookLine key={key} positiveAmount={amount > 0}>
            <div>{price}</div>
            <div>{orders}</div>
            <div>{amount}</div>
          </BookLine>
        )

      })
    }

    return (
      <BookLayout>
        <h3>Book</h3>
        <BookLine header={true}>
          <div>Price</div>
          <div>Orders</div>
          <div>Amount</div>
        </BookLine>
        {htmlElem}
      </BookLayout>
    )
  }
}
