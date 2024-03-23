const initialState = {
  sortingType: 'cheapest',
  checkboxes: {
    all: true,
    notTransfers: true,
    oneStop: true,
    twoStops: true,
    threeStops: true,
  },
  dataVisible: [],
  data: null,
  searchId: null,
  ticketsLoaded: false,
  counterShowedOfTickets: 5,
  loading: 0,
}

const filterTickets = (tickets, checkboxes) => {
  return tickets.filter((ticket) => {
    const stopsCount = Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length)
    if (checkboxes.all) {
      return ticket
    }

    if (stopsCount === 0) {
      if (checkboxes.notTransfers) {
        return ticket
      }
    } else if (stopsCount === 3) {
      if (checkboxes.threeStops) {
        return ticket
      }
    } else if (stopsCount === 2) {
      if (checkboxes.twoStops) {
        return ticket
      }
    } else if (stopsCount === 1) {
      if (checkboxes.oneStop) {
        return ticket
      }
    }
  })
}

const sortTickets = (tickets, sortingType) => {
  if (sortingType === null) {
    return tickets
  }
  return tickets.sort((a, b) => {
    if (sortingType === 'cheapest') {
      return a.price - b.price
    } else if (sortingType === 'fastest') {
      const durationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0)
      const durationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0)
      return durationA - durationB
    }
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORTING':
      // eslint-disable-next-line no-case-declarations
      let sortiedData = sortTickets(state.dataVisible, action.payload)
      return {
        ...state,
        dataVisible: sortiedData,
        counterShowedOfTickets: 5,
        sortingType: action.payload,
      }
    case 'SET_LOADING':
      return { ...state, loading: state.loading + action.payload }
    case 'TOGGLE_CHECKBOX':
      if (action.payload === 'all') {
        const newCheckboxesState = Object.keys(state.checkboxes).reduce(
          (acc, key) => ({ ...acc, [key]: !state.checkboxes.all }),
          {}
        )
        const filtredData = filterTickets(state.data, newCheckboxesState)
        let sortedTickets = sortTickets(filtredData, state.sortingType)
        return {
          ...state,
          checkboxes: newCheckboxesState,
          dataVisible: sortedTickets,
          counterShowedOfTickets: 5,
        }
      } else {
        const checkboxState = !state.checkboxes[action.payload]
        const сopyCheckboxes = state.checkboxes
        delete сopyCheckboxes.all
        const newCheckboxesState = Object.assign(сopyCheckboxes, { [action.payload]: checkboxState })
        const allCheckboxesChecked = Object.values(newCheckboxesState).every((val) => val)
        const newCheckboxesStateJoined = {
          checkboxes: {
            ...newCheckboxesState,
            all: allCheckboxesChecked,
          },
        }
        const filtredData = filterTickets(state.data, { ...newCheckboxesStateJoined.checkboxes })
        let sortedTickets = sortTickets(filtredData, state.sortingType)
        return {
          ...state,
          ...newCheckboxesStateJoined,
          dataVisible: sortedTickets,
          counterShowedOfTickets: 5,
        }
      }
    case 'STOP_REQUARE':
      return { ...state, ticketsLoaded: action.payload }
    case 'SET_SEARCH_ID':
      return { ...state, searchId: action.payload }
    case 'UPDATE_COUNTER_SHOWED_OF_TICKETS':
      return { ...state, counterShowedOfTickets: action.payload }
    case 'POST_TICKETS':
      if (action.payload) {
        let newState = []
        if (state.data) {
          newState = [...state.data, ...action.payload]
        } else {
          newState = [...action.payload]
        }

        const filtredData = filterTickets(newState, state.checkboxes)
        let sortedTickets = sortTickets(filtredData, state.sortingType)
        return { ...state, data: newState, dataVisible: sortedTickets }
      }
    // eslint-disable-next-line no-fallthrough
    default:
      return state
  }
}

export default reducer
