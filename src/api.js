const baseURL = process.env.REACT_APP_BASEURL
const apiKey = process.env.REACT_APP_APIKEY


// basic fetch call to get Rover photos, with some defaults
const getRoverPhotos = async (sol = 2000, page = 1) => {
  const photosURL = new URL(`${baseURL}/photos`)
  const params = {
    sol,
    page,
    api_key: apiKey,
  }

  photosURL.search = new URLSearchParams(params)
  
  try {
    const response = await fetch(photosURL)
    const result = await response.json()
    return result
  } catch (err) {
    console.error(err)
  }
}

export default {
  getRoverPhotos,
}
