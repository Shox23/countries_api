export const SET_LOADING = '@@details/SET_LOADING'
export const SET_ERROR = '@@details/SET_ERROR'
export const SET_COUNTRY = '@@details/SET_COUNTRY'
export const CLEAR_DETAILS = '@@details/CLEAR_DETAILS'
export const SET_NEIGHBORS = '@@details/SET_NEIGHBORS'

const setLoading = () => ({
  type: SET_LOADING
})

const setError = (error) => ({
  type: SET_ERROR,
  payload: error
})

const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country
})

export const clearDetails = () => ({
  type: CLEAR_DETAILS
})

export const setNeighbors = (countries) => ({
  type: SET_NEIGHBORS,
  payload: countries,
})

export const loadCountryByName = (name) => (dispatch, _, {client, api}) => {
  dispatch(setLoading())

  client.get(api.searchByCountry(name))
    .then(({data})=> dispatch(setCountry(data[0])))
    .catch((error)=> dispatch(setError(error.message)))
}

export const loadNeighbors = (borders) => (dispatch, _, {client, api}) => {
  client.get(api.filterByCode(borders))
    .then(({data}) => dispatch(setNeighbors(data.map(i=>i.name))))
    .catch(console.error)
}
