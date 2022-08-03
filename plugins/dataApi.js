export default function (ctx, inject) {
  const appId = 'MER3KOMRZN'
  const apiKey = 'a527eb08587abc0ec28f85bc2b7c3aab'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
  })

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/mastering_nuxt/${homeId}`,
          {
            headers,
          }
        )
      )
    } catch (e) {
      return getErrorResponse(e)
    }
  }

  async function unWrap(response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return { json, ok, status, statusText }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
