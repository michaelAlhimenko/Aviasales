import Services from './services'

export const setSorting = (sortingType) => ({
  type: 'SET_SORTING',
  payload: sortingType,
})
export const setSearchId = (searchId) => ({
  type: 'SET_SEARCH_ID',
  payload: searchId,
})

export const toggleCheckbox = (checkboxId) => {
  return {
    type: 'TOGGLE_CHECKBOX',
    payload: checkboxId,
  }
}
export const setLoading = (number) => ({
  type: 'SET_LOADING',
  payload: number,
})
export const postTickets = (data) => {
  return {
    type: 'POST_TICKETS',
    payload: data.tickets,
  }
}
export const updateCouneterShowedOfTickets = (number) => {
  return {
    type: 'UPDATE_COUNTER_SHOWED_OF_TICKETS',
    payload: number,
  }
}
export const openSubside = (data) => ({
  type: 'OPEN_SUBSIDE',
  payload: data,
})
export const updateShowedOfTicets = (number) => (dispatch) => {
  dispatch(updateCouneterShowedOfTickets(number))
}
export const stopRequare = (data) => ({
  type: 'STOP_REQUARE',
  payload: data,
})
export const fetchFailure = (data) => ({
  type: 'FETCH_POSTS_FAILURE',
  payload: data,
})
export const fetchTickets = () => (dispatch, getState) => {
  const { searchId } = getState()
  Services()
    .getTickets(searchId)
    .then((result) => {
      dispatch(addTickets(result))
    })
    .catch((error) => {
      dispatch(fetchFailure(error))
    })
}
export const addTickets = (tickets) => (dispatch) => {
  if (tickets.stop === false && tickets.length !== 0) {
    dispatch(postTickets(tickets))
    dispatch(stopRequare(tickets.stop))
    dispatch(setLoading(4))
  }
  if (tickets.stop === true) {
    dispatch(stopRequare(tickets.stop))
  }
  if (tickets.stop === false || (tickets.status && tickets.status === 500)) {
    dispatch(fetchTickets())
  }
}
