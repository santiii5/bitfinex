import React from 'react'
import Container from '../containers/container'
import styled from 'styled-components'
import {numberFormat} from '../helpers/utils'

const TickerLayout = styled.div`

`
export default class Ticker extends Container {
  render() {
    const {
      data,
    } = this.props
    let lastPrice
    let percentChangeDay
    let dayVolume

    if (data) {
      lastPrice = data[6]
      percentChangeDay = data[5]
      dayVolume = data[7]
    }

    return data ? (
      <TickerLayout>
        <h3>Ticker</h3>
        <p>Last price: {lastPrice}</p>
        <p>% Change: {percentChangeDay}</p>
        <p>Day volume: {numberFormat(dayVolume)}</p>
      </TickerLayout>
    ) : 'Loading ticker'
  }
}
