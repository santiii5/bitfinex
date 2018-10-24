import React from 'react'
import PropTypes from 'prop-types'
import SocketOptions from './SocketOptions'
import Container from '../containers/container'
import styled from 'styled-components'
import { numberFormat, numberWithCommas } from '../helpers/utils'

const TickerLayout = styled.div``

export default class Ticker extends Container {
  static propTypes = {
		data: PropTypes.array,
    pair: PropTypes.string.isRequired,
    availablePairs: PropTypes.array.isRequired,
    changePair: PropTypes.func.isRequired,
    startWebsocket: PropTypes.func.isRequired,
    stopWebsocket: PropTypes.func.isRequired,
	}

  static defaultProps = {
		data: null,
	}

  updatePair(newPair) {
    const {
      changePair,
    } = this.props

    changePair(this.refs.pairSelector.value)
  }

  renderPairSelector() {
    const {
      availablePairs,
      pair,
    } = this.props
    const selectorOptions = []

    availablePairs && availablePairs.forEach((avPair, key) => {
      let htmlElem = <option key={key} value={avPair}>{avPair}</option>
      pair === avPair ? selectorOptions.unshift(htmlElem) : selectorOptions.push(htmlElem)
    })

    const selector = (
      <select ref="pairSelector" onChange={this.updatePair.bind(this)}>
        {selectorOptions}
      </select>
    )

    return selector
  }

  render() {
    const {
      data,
      pair,
    } = this.props
    const pairSelector = this.renderPairSelector()
    let lastPrice
    let percentChangeDay
    let dayVolume

    if (data) {
      lastPrice = numberWithCommas(data[6].toFixed(2))
      percentChangeDay = data[5]
      dayVolume = data[7]
    }

    const colorStyle = percentChangeDay > 0 ? 'green' : 'red'

    const component = data ? (
      <div>
        <p>{pair}</p>
        <p>Last price: ${lastPrice}</p>
        <p>% Change 24h: <span style={{color: colorStyle, fontSize: '18px'}}>{percentChangeDay}</span></p>
        <p>24h volume: {numberFormat(dayVolume)}</p>
      </div>
    ) : 'Loading ticker'

    return (
      <TickerLayout>
        <h3>Ticker</h3>
        <div>{pairSelector}</div>
        {component}
      </TickerLayout>
    )
  }
}
