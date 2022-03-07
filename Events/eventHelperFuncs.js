import { showMessage } from "react-native-flash-message"

/**
 * Communicates a particular user action to the server, where it is recorded
 * @param {String} action must be 'accepted', 'viewed', or 'rejected' (add Enum when switch to TS)
 */
export function eventInteraction(action, userId, eventId) {
    fetch("http://yolo-backend.herokuapp.com/eventRSVP", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            event: eventId,
            action: action
        })
    })
}

/**
 * Performs all actions that must occur when an event is rejected
 */
export function rejectionFlow(userId, eventId, title) {
    eventInteraction("rejected", userId, eventId)
    showMessage({
        message: `${title} was rejected`,
        type: 'danger'
    });
}

/**
 * Performs all actions that must occur when an event is accepted
 */
export function acceptedFlow(userId, eventId, title) {
    eventInteraction("accepted", userId, eventId)
    showMessage({
        message: `${title} was accepted`,
        type: 'success'
    });
}