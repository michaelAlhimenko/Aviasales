import { connect } from 'react-redux'

import * as actions from '../actions'

import style from './Sorting.module.scss'

const Sorting = ({ toggleCheckbox, checkboxes, subside, openSubside }) => {
  const { all, notTransfers, oneStop, twoStops, threeStops } = checkboxes
  return (
    <div className={`${subside ? style['sidebar--active'] : ''} ${style.sidebar}`}>
      <button onClick={() => openSubside(!subside)} className={style.button__close}></button>
      <span>Количество пересадок</span>
      <form className={style.sidebar__filters}>
        <div className={style.sidebar__wrapper}>
          <label htmlFor="all">
            <input
              onChange={() => toggleCheckbox('all')}
              checked={all ? true : ''}
              type="checkbox"
              id="all"
              name="filter"
              value="all"
            />
            <span></span>
            Все
          </label>
        </div>
        <div className={style.sidebar__wrapper}>
          <label htmlFor="notTransfers">
            <input
              onChange={() => toggleCheckbox('notTransfers')}
              checked={notTransfers ? true : ''}
              type="checkbox"
              id="notTransfers"
              name="filter"
              value="non-stop"
            />
            <span></span>
            Без пересадок
          </label>
        </div>
        <div className={style.sidebar__wrapper}>
          <label htmlFor="oneStop">
            <input
              onChange={() => toggleCheckbox('oneStop')}
              checked={oneStop ? true : ''}
              type="checkbox"
              id="oneStop"
              name="filter"
              value="1-stop"
            />
            <span></span>1 пересадка
          </label>
        </div>
        <div className={style.sidebar__wrapper}>
          <label htmlFor="twoStops">
            <input
              onChange={() => toggleCheckbox('twoStops')}
              checked={twoStops ? true : ''}
              type="checkbox"
              id="twoStops"
              name="filter"
              value="2-stops"
            />
            <span></span>2 пересадки
          </label>
        </div>
        <div className={style.sidebar__wrapper}>
          <label htmlFor="threeStops">
            <input
              onChange={() => toggleCheckbox('threeStops')}
              checked={threeStops ? true : ''}
              type="checkbox"
              id="threeStops"
              name="filter"
              value="3-stops"
            />
            <span></span>3 пересадки
          </label>
        </div>
      </form>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
export default connect(mapStateToProps, actions)(Sorting)
