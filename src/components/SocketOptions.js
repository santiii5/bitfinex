import React from 'react'
import PropTypes from 'prop-types'
import { Button, SocketControl, SocketStatus } from '../Style'

export default class SocketOptions extends React.Component {
  static propTypes = {
    startSocket: PropTypes.func.isRequired,
    stopSocket: PropTypes.func.isRequired,
    startText: PropTypes.string,
    stopText: PropTypes.string,
	}

  static defaultProps = {
		startText: 'Start',
    stopText: 'Stop',
	}

  onSocket() {
    const {
      startSocket,
    } = this.props

    startSocket()
  }

  offSocket() {
    const {
      stopSocket,
    } = this.props

    stopSocket()
  }

  render() {
    const {
      startText,
      stopText,
    } = this.props

    return (
      <SocketControl>
        <Button className="btn--green" onClick={this.onSocket.bind(this)}>{startText}</Button>
        <Button className="btn--red" onClick={this.offSocket.bind(this)}>{stopText}</Button>
        <SocketStatus>Socket status</SocketStatus>
      </SocketControl>
    )
  }
}
