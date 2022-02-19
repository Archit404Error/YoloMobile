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