import React from 'react'
import Container from '../containers/container'
import styled, {css} from 'styled-components'

const BookLayout = styled.div`
`

export default class Book extends Container {
  render() {
    const {
      data,
    } = this.props
    // console.log('book', data);
    return (
      <BookLayout>
        <h3>Book</h3>
      </BookLayout>
    )
  }
}
