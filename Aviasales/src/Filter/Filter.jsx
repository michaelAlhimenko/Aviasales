import { connect } from 'react-redux'

import style from '../Filter/Filter.module.scss'
import * as actions from '../actions'
const Filter = ({ sortingType, setSorting }) => {
  return (
    <form className={style.content__filter}>
      <label className={sortingType === 'cheapest' ? style['content__button--active'] : null} htmlFor="cheapest">
        Самый дешевый
      </label>
      <input type="radio" id="cheapest" onClick={() => setSorting('cheapest')}></input>
      <input type="radio" id="fastest" onClick={() => setSorting('fastest')}></input>
      <label className={sortingType === 'fastest' ? style['content__button--active'] : null} htmlFor="fastest">
        Самый быстрый
      </label>
      <input type="radio" id="optimal" onClick={() => setSorting('optimal')}></input>
      <label className={sortingType === 'optimal' ? style['content__button--active'] : null} htmlFor="optimal">
        Оптимальный
      </label>
    </form>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
export default connect(mapStateToProps, actions)(Filter)
