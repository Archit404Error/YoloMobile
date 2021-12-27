import { showMessage, hideMessage } from "react-native-flash-message";
import * as Calendar from 'expo-calendar';

export const scheduleEvent = async (calendar, start, end, title) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
    }
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