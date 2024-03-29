import { showMessage } from "react-native-flash-message";
import * as Analytics from 'expo-firebase-analytics';

/**
 * Communicates a particular user action to the server, where it is recorded
 * @param {String} action must be 'accepted', 'viewed', or 'rejected' (add Enum when switch to TS)
 */
export function eventInteraction(action, userId, eventId) {
    Analytics.logEvent(`event_${action}`, { event: eventId, user: userId });
    fetch("http://yolo-backend.herokuapp.com/eventRSVP", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: userId,
            event: eventId,
            action: action,
        }),
    });
}

/**
 * Handles global state updates of pending and accepted events and updates cache
 */
function rsvpFlow(eventData, ctx, accepted) {
    // Keep all pending events except current one
    if (accepted) {
        ctx.modifyState(["pendingEvents"], [ctx.pendingEvents.filter(e => e !== eventData._id)])
        ctx.modifyState(["acceptedEvents"], [[...ctx.acceptedEvents, eventData]])
    }
    else {
        ctx.modifyState(["pendingEvents"], [ctx.pendingEvents.filter(e => e !== eventData)])
        ctx.modifyState(["rejectedEvents"], [[...ctx.rejectedEvents, eventData]])
    }
    ctx.storeCreds()
}

/**
 * Performs all actions that must occur when an event is rejected
 * Namely: sends data to server and shows message to user
 */
export function rejectionFlow(userId, eventId, title, ctx) {
    rsvpFlow(eventId, ctx, false)
    eventInteraction("rejected", userId, eventId);
    showMessage({
        message: `${title} was rejected`,
        type: "danger",
    });
}

/**
 * Performs all actions that must occur when an event is accepted
 * Namely: sends socket update to chat screen, updates and caches user's 
 * accepted and pending events, sends data to server, and shows message to user
 */
export function acceptedFlow(userId, eventData, title, ctx) {
    ctx.socket.emit("eventsUpdated");
    rsvpFlow(eventData, ctx, true)
    eventInteraction("accepted", userId, eventData._id);
    showMessage({
        message: `${title} was accepted`,
        type: "success",
    });
}

function undoFlow(eventId, ctx, undoingAccept) {
    ctx.modifyState(["pendingEvents"], [[...ctx.pendingEvents, eventId]])
    if (undoingAccept)
        ctx.modifyState(["acceptedEvents"], [ctx.acceptedEvents.filter(e => e._id !== eventId)])
    else
        ctx.modifyState(["rejectedEvents"], [ctx.rejectedEvents.filter(e => e !== eventId)])
    ctx.storeCreds()
}

export function undoRejectionFlow(userId, eventId, title, ctx) {
    fetch("http://yolo-backend.herokuapp.com/undoRejectEvent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: userId,
            event: eventId,
        }),
    })

    undoFlow(eventId, ctx, false)

    showMessage({
        message: `${title} is no longer rejected`,
        type: "success",
    });
}

export function undoAcceptedFlow(userId, eventId, title, ctx) {
    fetch("http://yolo-backend.herokuapp.com/undoAcceptEvent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: userId,
            event: eventId,
        }),
    })
        .then(res => res.json())
        .then(json => {
            if (json.status === "success") {
                undoFlow(eventId, ctx, true)
                ctx.socket.emit("leaveRoom", json.data.chatId)

                showMessage({
                    message: `${title} is no longer accepted`,
                    type: "success",
                });
            } else {
                showMessage({
                    message: `Operation could not be completed. Please try again later.`,
                    type: "danger",
                });
            }
        })
}