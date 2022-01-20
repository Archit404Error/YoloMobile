import { showMessage, hideMessage } from "react-native-flash-message";
import * as Calendar from 'expo-calendar';

export const scheduleEvent = async (start, end, title) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        let calendar;
        calendars.forEach(calData => {
            // Change this to user's preferred calendar in future
            if (calData.title == "Home")
                calendar = calData.id;
        })
        await Calendar.createEventAsync(calendar,
            {
                startDate: start,
                endDate: end,
                title: title
            }
        );
        showMessage({
            message: `${title} has been added to your calendar`,
            type: 'success'
        });
    }
}