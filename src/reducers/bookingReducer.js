import { fetchAPI } from "../api";

/**
 * Reducer function to update available booking times based on chosen date.
 * @param {Array<string>} state - Current list of available times
 * @param {Object} action - Action with type and date payload
 * @returns {Array<string>} New list of available times
 */
export function updateTimes(state, action) {
  if (action?.type === "UPDATE_TIMES" && action.date) {
    const parsedDate = new Date(`${action.date}T12:00:00`);
    if (!isNaN(parsedDate.getTime())) {
      return fetchAPI(parsedDate);
    }
  }

  return state;
}

/**
 * Initializes available booking times for today's date.
 * @returns {Array<string>} Initial available times
 */
export function initializeTimes() {
  return fetchAPI(new Date());
}

