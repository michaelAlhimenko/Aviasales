const Services = () => {
  const urlBasic = 'https://aviasales-test-api.kata.academy'

  async function getSearchId() {
    const requare = await fetch(`${urlBasic}/search`, {
      method: 'GET',
    })
    if (!requare.ok) {
      throw new Error('Server is unavailable')
    }
    const res = await requare.json()
    return res
  }

  async function getTickets(searchId) {
    const requare = await fetch(`${urlBasic}/tickets?searchId=${searchId}`, {
      method: 'GET',
    })

    if (!requare.ok && requare.status !== 500) {
      throw new Error('Server is unavailable')
    }
    if (requare.status === 500) {
      return { status: 500 }
    }
    return await requare.json()
  }
  return { getSearchId, getTickets }
}
export default Services
