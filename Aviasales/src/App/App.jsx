import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { Progress, Alert } from 'antd'

import * as actions from '../actions'
import Services from '../services'

import style from './App.module.scss'
import logo from './Logo.png'

const App = ({
  setSorting,
  toggleCheckbox,
  sortingType,
  checkboxes,
  setSearchId,
  fetchTickets,
  counterShowedOfTickets,
  updateShowedOfTicets,
  dataVisible,
  loading,
  ticketsLoaded,
}) => {
  const [loaded, setLoaded] = useState(false)
  const { all, notTransfers, oneStop, twoStops, threeStops } = checkboxes

  useEffect(() => {
    const searchId = Services().getSearchId()
    searchId.then((data) => {
      const { searchId } = data
      setSearchId(searchId)
      fetchTickets()
    })
  }, [])

  useEffect(() => {
    if (ticketsLoaded) {
      setTimeout(() => setLoaded(true), 800)
    }
  }, [ticketsLoaded])

  const itemList = () => {
    if (dataVisible) {
      return dataVisible.slice(0, counterShowedOfTickets).map((element, i) => <Item key={i} data={element} />)
    }
  }
  return (
    <>
      <div className={style.App}>
        <Progress
          percent={ticketsLoaded ? 100 : loading}
          className={!loaded ? style.progress : style.disaplayNone}
          showInfo={false}
        />
        <img className={style.logo} src={logo}></img>
        <div className={style.app__frame}>
          <div className={style.sidebar}>
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
          <div className={style.content}>
            <div className={style.content__filter}>
              <button
                className={sortingType === 'cheapest' ? style['content__button--active'] : null}
                type="button"
                onClick={() => setSorting('cheapest')}
              >
                Самый дешевый
              </button>
              <button
                className={sortingType === 'fastest' ? style['content__button--active'] : null}
                type="button"
                onClick={() => setSorting('fastest')}
              >
                Самый быстрый
              </button>
              <button
                className={sortingType === 'optimal' ? style['content__button--active'] : null}
                type="button"
                onClick={() => setSorting('optimal')}
              >
                Оптимальный
              </button>
            </div>
            <div className={style.content__body}>
              <Alert
                className={
                  dataVisible && !all && !notTransfers && !oneStop && !twoStops && !threeStops
                    ? 'none'
                    : style.disaplayNone
                }
                type="info"
                message="Не найдено билетов"
                description="Рейсов, подходящих под заданные фильтры, не найдено"
              ></Alert>
              {itemList()}
            </div>
            <div className={dataVisible.length ? style.content__button : style.disaplayNone}>
              <button onClick={() => updateShowedOfTicets(counterShowedOfTickets + 5)} type="button">
                Показать еще 5 билетов!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Item = ({ data }) => {
  const { price, segments, carrier } = data
  const [to, from] = segments

  const formatTime = (data) => {
    const time = new Date(data)
    return format(time, 'hh:mm')
  }

  const calcArrivTime = (depTime, duration) => {
    const departureTime = new Date(depTime)

    const durationHours = Math.floor(duration / 60)
    const durationMinutes = duration % 60

    departureTime.setHours(departureTime.getHours() + durationHours)
    departureTime.setMinutes(departureTime.getMinutes() + durationMinutes)

    return departureTime
  }

  const calcDurationTime = (duration) => {
    const durationHours = Math.floor(duration / 60)
    const durationMinutes = duration % 60
    return `${durationHours}ч ${durationMinutes}м`
  }

  const calcSteps = (stops) => {
    const number = stops.length

    if (number === 0) {
      return 'Без пересадок'
    }
    if (number === 1) {
      return '1 пересадка'
    }
    if (number > 1) {
      return `${number} пересадки`
    }
  }

  const timeDepartureTo = formatTime(to.date)
  const timeArrivalTo = formatTime(calcArrivTime(to.date, to.duration))
  const durationTimeTo = calcDurationTime(to.duration)

  const timeDepartureFrom = formatTime(from.date)
  const timeArrivalFrom = formatTime(calcArrivTime(from.date, from.duration))
  const durationTimeFrom = calcDurationTime(from.duration)
  return (
    <div className={style.content__item}>
      <div className={style.content__header}>
        <span className={style.content__price}>{`${price} ₽`}</span>
        <img className={style.content__logo} src={`//pics.avs.io/99/36/${carrier}.png`} alt="Airline Logo" />
      </div>
      <div className={style.content__details}>
        <div className={style.content__wrapper}>
          <span className={style.content__title}>{`${to.origin} - ${to.destination}`}</span>
          <span className={style.content__description}>{`${timeDepartureTo} - ${timeArrivalTo}`}</span>
        </div>
        <div className={style.content__wrapper}>
          <span className={style.content__title}>в пути</span>
          <span className={style.content__description}>{durationTimeTo}</span>
        </div>
        <div className={style.content__wrapper}>
          <span className={style.content__title}>{calcSteps(to.stops)}</span>
          <span className={style.content__description}>{to.stops.join(' ')}</span>
        </div>
      </div>
      <div className={style.content__details}>
        <div className={style.content__wrapper}>
          <span className={style.content__title}>{`${from.origin} - ${from.destination}`}</span>
          <span className={style.content__description}>{`${timeDepartureFrom} - ${timeArrivalFrom}`}</span>
        </div>
        <div className={style.content__wrapper}>
          <span className={style.content__title}>в пути</span>
          <span className={style.content__description}>{durationTimeFrom}</span>
        </div>
        <div className={style.content__wrapper}>
          <span className={style.content__title}>{calcSteps(from.stops)}</span>
          <span className={style.content__description}>{from.stops.join(' ')}</span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state,
    sortingType: state.sortingType,
    updateCounterShowedOfTicets: state.updateCounterShowedOfTicets,
    ticketsLoaded: state.ticketsLoaded,
  }
}
export default connect(mapStateToProps, actions)(App)
