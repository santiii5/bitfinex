import React from 'react'
import PropTypes from 'prop-types'
import logo from '../logo.png'
import styled, {css} from 'styled-components'
import {SocketOptions} from './'

const AppHeader = styled.div`
  background-color: white;
  color: black;
  position: relative;
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;

  img {
    max-width: 150px;
    padding: 5px;
  }
`
const PairSelector = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;

  &:hover {
    > div {
      display: block;
    }
  }
`

const PairOption = styled.div`
  cursor: pointer;
  font-size: 16px;
  padding: 15px 25px 15px 15px;
  position: relative;
  background-color: white;
  transition: 0.2s ease all;

  ${props => !props.selected && css`
    display: none;
    border-top: 1px solid #e0dfdf;

    &:hover {
      background-color: #f1fde4;
    }
  `}

  ${props => props.selected && css`
    cursor: default;
    border-left: 1px solid #e0dfdf;

    &:after {
      content: " ";
      position: absolute;
      right: 5px;
      top: 20px;

      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;

      border-top: 5px solid #e0dfdf;
    }
  `}
`

export default class Header extends React.Component {
  static propTypes = {
    pair: PropTypes.string,
    availablePairs: PropTypes.array,
    changePair: PropTypes.func.isRequired,
    startSocket: PropTypes.func,
    stopSocket: PropTypes.func,
    startText: PropTypes.string,
    stopText: PropTypes.string,
    status: PropTypes.bool,
	}

  static defaultProps = {
		pair: '',
    availablePairs: [],
    startSocket: null,
    stopSocket: null,
    startText: '',
    stopText: '',
    status: false,
	}

  updatePair(newPair) {
    const {
      changePair,
    } = this.props

    changePair(newPair)
  }

  renderPairSelector() {
    const {
      availablePairs,
      pair,
    } = this.props
    const selectorOptions = []

    availablePairs && availablePairs.forEach((avPair, key) => {
      const isSelected = pair === avPair
      const formattedPair = avPair.replace("USD", " / USD");
      let htmlElem = (
        <PairOption
          key={key}
          onClick={isSelected ? null : this.updatePair.bind(this, avPair)}
          selected={isSelected}>
            {formattedPair}
        </PairOption>
      )

      isSelected ? selectorOptions.unshift(htmlElem) : selectorOptions.push(htmlElem)
    })

    const selector = (
      <PairSelector ref="pairSelector">
        {selectorOptions}
      </PairSelector>
    )

    return selector
  }

  startWebSocket() {

  }

  stopWebSocket() {

  }

  render() {
    const {
      startSocket,
      stopSocket,
      startText,
      stopText,
      status,
    } = this.props
    const pairSelector = this.renderPairSelector()

    return (
      <AppHeader>
        <img src={logo} alt="logo" />
        <SocketOptions
          startSocket={startSocket.bind(this)}
          stopSocket={stopSocket.bind(this)}
          startText={startText}
          stopText={stopText}
          status={status}
          header={true}
        />
        {pairSelector}
      </AppHeader>
    )
  }
}
