import styled, {css} from 'styled-components'

export const color = '#061a44'
export const color2 = '#010e2c'
export const color3 = '#053c18'

export const lightBlueBackground = `background-color: ${color}`
export const backgroundColor2 = `background-color: ${color2}`
export const greenBackgroundColor = `background-color: ${color3}`

export const fontColorGreen = `color: #03A9F4`
export const fontColorWhite = `color: white`
export const subtleBoxShadow = `box-shadow: 0px 0px 5px 1px #121d5b`
export const greenBoxShadow = `box-shadow: 0px 0px 4px 2px #5fff17`
export const redBoxShadow = `box-shadow: 0px 0px 2px 2px #e41111`


export const fontSizeBig = 'font-size: 2em';
export const fontSize1 = 'font-size: 1.5em';
export const fontSize2 = 'font-size: 1em';
export const fontSize3 = 'font-size: .75em';

export const textAlignCenter = 'ftext-align: center';

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid grey;
  padding: 2px 5px;
  justify-items: right;

  .amount {
    color: red;
  }

  ${props => props.positiveAmount && css`
    .amount {
      color: green;
    }
  `}

  ${props => props.header && css`
    font-size: 18px;
    color: yellow;
    font-weight: bold;
  `}
`
