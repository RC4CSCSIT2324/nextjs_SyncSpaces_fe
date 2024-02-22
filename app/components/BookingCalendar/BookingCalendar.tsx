"use client"

import './BookingCalendar.css'
import { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // interaction plugin allows selecting
import { DateSelectArg, FormatterInput, EventInput, EventClickArg, CustomButtonInput, EventContentArg, DayHeaderContentArg } from '@fullcalendar/core'

interface BookingCalendarProps {
    initialEvents: EventInput[]
}

const DUMMY_DATA: EventInput[] = [
    {
        title: "Basketball",
        start: new Date("2023-12-26T07:00:00"),
        end: new Date("2023-12-26T09:00:00")
    }, {
        title: "Basketball",
        start: new Date("2023-12-28T10:00:00"),
        end: new Date("2023-12-28T12:00:00")
    }, {
        title: "Floorball",
        start: new Date("2024-01-02T17:00:00"),
        end: new Date("2024-01-02T19:00:00")
    }, {
        title: "Table Tennis",
        start: new Date("2024-01-03T17:30:00"),
        end: new Date("2024-01-03T19:30:00")
    }
]

const EVENT_TIME_FORMAT: FormatterInput = {
    hour: 'numeric',
    minute: 'numeric',
    omitZeroMinute: true,
    meridiem: 'short'
}

const SLOT_LABEL_FORMAT: FormatterInput = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
}

const bookingConfirmationString = (selectedDate: DateSelectArg): string => {
    const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
        hour12: true,
        hour: "numeric",
        minute: "2-digit"
    }
    const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        weekday: "short"
    }
    const startDate: Date = selectedDate.start
    const endDate: Date = selectedDate.end
    // slightly different format if the booking falls on two different days
    const fallsOnDifferentDates: boolean = startDate.toDateString() !== endDate.toDateString()
    const startTimeString = startDate.toLocaleTimeString('en-US', TIME_FORMAT_OPTIONS)
    const startDateString = startDate.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS)
    const endTimeString = endDate.toLocaleTimeString('en-US', TIME_FORMAT_OPTIONS)
    const endDateString = endDate.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS)
    const selectedDateTimeString = fallsOnDifferentDates
        ? `${startDateString}, ${startTimeString} to ${endDateString}, ${endTimeString}`
        : `${startDateString}, ${startTimeString} to ${endTimeString}`
    const bookingConfirmationString = `Booking selected: ${selectedDateTimeString}. To confirm, please enter a name for your booking:`
    return bookingConfirmationString
}

const BookingCalendar = (props: BookingCalendarProps) => {

    const [events, setEvents] = useState<EventInput[]>(DUMMY_DATA/* props.initialEvents */)
    const [selectedDate, setSelectedDate] = useState<DateSelectArg>()
    const calendarRef = useRef(null)

    // Called when a date range is selected
    const handleDateSelect = (info: DateSelectArg) => {
        setSelectedDate(info)
    }

    // Called when a selection is cancelled
    const handleDateUnselect = () => {
        setSelectedDate(undefined)
    }

    // This calls unselect() programmatically
    const calendarApiUnselect = () => {
        if (calendarRef != null && calendarRef.current != null) {
            // Typecasting to any overrides a warning but this will work as long as the calendar is mounted.
            // See https://fullcalendar.io/docs/react for usage of Calendar API in react
            const calendarApi = (calendarRef.current as any).getApi();
            calendarApi.unselect();
        }
    };

    // Called when an event is clicked
    const handleEventClick = (info: EventClickArg) => {
        console.log(info);
    };

    // Called when the "Book" button is pressed
    const handleBook = () => {
        if (selectedDate != undefined) {
            const eventName = window.prompt(bookingConfirmationString(selectedDate))
            if (eventName === null) {
                // user cancelled
            } else if (eventName.trim() === "") {
                // user entered nothing
                window.alert("Please enter a name for your booking!")
            } else {
                // user entered a name, create the event
                const newEvent: EventInput = {
                    title: eventName,
                    start: selectedDate.start,
                    end: selectedDate.end
                }
                setEvents([...events, newEvent])
                setSelectedDate(undefined)
                calendarApiUnselect()
            }
        } else {
            window.alert("Please select a date!")
        }
    }

    // Returns class names for each event box
    const getEventClassNames = (eventContent: EventContentArg) => {
        if (eventContent.isMirror) {
            return "bg-gray-400 border-gray-400"
        }
        return "bg-gray-600 border-gray-600"
    }

    const getDayHeaderContent = (dayHeaderContent: DayHeaderContentArg) => {
        const text: string = dayHeaderContent.text;
        // capitalise text
        const capitalisedText = text.toUpperCase()
        return capitalisedText
    }

    // Custom button for calendar toolbar
    const bookButton: CustomButtonInput = {
        text: "Book",
        click: handleBook,
    }

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin]}
                height={"60vh"}
                aspectRatio={2}
                initialView='timeGridWeek'
                customButtons={{ bookButton }}
                headerToolbar={{
                    start: 'prev,next',
                    center: 'title',
                    end: 'today bookButton'
                }}
                allDaySlot={false} // hide all day event display
                dayHeaderContent={getDayHeaderContent}
                slotLabelFormat={SLOT_LABEL_FORMAT}
                slotLabelClassNames={"text-sm"}
                dayHeaderFormat={{ weekday: 'short' }} // show daily headers as 'Mon, Tue, ...'
                firstDay={1} // week starts on Monday (1)
                nowIndicator={true}
                events={events}
                eventClassNames={getEventClassNames}
                eventTimeFormat={EVENT_TIME_FORMAT}
                selectable={true}
                selectOverlap={false}
                selectMirror={true}
                select={handleDateSelect}
                unselect={handleDateUnselect}
                unselectCancel={".fc-bookButton-button"} // make sure book button doesn't clear the selection
                eventClick={handleEventClick}
            />
        </div>
    )
}

export default BookingCalendar
