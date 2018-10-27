import Immutable from 'immutable'

export const numberFormat = (number) => {
  return +(number + '').slice(0, 7)
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function mapState(state) {
  let mappedState = {}

  state.keySeq().forEach(k => {
    mappedState[k] = state.get(k)
  })

  for(let i = 0; i <= Object.keys(mappedState).length; i++) {
    let objectKey = Object.keys(mappedState)[i]

    if (objectKey === 'default') {
      mappedState[objectKey].keySeq().forEach(k => {
        mappedState[k] = mappedState[objectKey].get(k)
      })
    }

    if (Immutable.Iterable.isIterable(mappedState[objectKey])) {
      (mappedState[objectKey] = mappedState[objectKey].toJS())
    }
  }

  return mappedState
}
