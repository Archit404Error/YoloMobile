/**
 * Fetches a particular piece of data from a GET endpoint
 * @param endpoint the endpoint to be queried
 * @param dataKey the JSON key of data to access
 */
export const fetchServerData = async (endpoint) => {
    const res = await fetch(`http://yolo-backend.herokuapp.com/${endpoint}`)
    return await res.json()
}

/**
 * Returns json data for a particular user
 * @param id the user's id
 */
export const fetchUserData = async (id) => {
    return await fetchServerData(`user/${id}`)
}