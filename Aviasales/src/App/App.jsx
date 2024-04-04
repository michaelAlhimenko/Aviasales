import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Progress, Alert } from 'antd'

import Sorting from '../Sorting/Sorting'
import Filter from '../Filter/Filter'
import List from '../List/List'
import * as actions from '../actions'
import Services from '../services'

import style from './App.module.scss'
import logo from './Logo.png'

const App = ({
  checkboxes,
  setSearchId,
  fetchTickets,
  counterShowedOfTickets,
  updateShowedOfTicets,
  dataVisible,
  loading,
  ticketsLoaded,
  openSubside,
  subside,
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
  console.log(subside)
  return (
    <>
      <div className={style.App}>
        <Progress
          percent={ticketsLoaded ? 100 : loading}
          className={!loaded ? style.progress : style.disaplayNone}
          showInfo={false}
        />
        <button onClick={() => openSubside(!subside)} className={style.button__filter}></button>
        <img className={style.logo} src={logo}></img>
        <div className={style.app__frame}>
          <Sorting />
          <div className={style.body}>
            <Filter />
            <div className={style.body__content}>
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
              <List />
            </div>
            <div className={dataVisible.length ? style.body__button : style.disaplayNone}>
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

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
export default connect(mapStateToProps, actions)(App)
