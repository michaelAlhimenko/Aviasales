import { format } from 'date-fns'
import { connect } from 'react-redux'

import * as actions from '../actions'

import style from './List.module.scss'

const List = ({ dataVisible, counterShowedOfTickets }) => {
  return (
    <ul>
      {dataVisible
        ? dataVisible.slice(0, counterShowedOfTickets).map((element, i) => <Item key={i} data={element} />)
        : ''}
    </ul>
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
    <li className={style.content__item}>
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
    </li>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
export default connect(mapStateToProps, actions)(List)
