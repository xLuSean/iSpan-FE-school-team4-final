import FullCalendarLayout from '@/components/fullcalendar/layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import dayjs from 'dayjs';

import React, { useRef, useEffect } from 'react';

export default function SeanCalendar({ list, updateStartEnd, setDate }) {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const calendarRef = useRef(null);
  let color;

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();

    const handleDatesSet = ({ view }) => {
      const startOfMonth = moment(view.currentStart)
        .startOf('month')
        .format('YYYY-MM-DD');

      // === find the start of current month -> start of the next month -> -1 day -> the last day of current month
      const endOfMonth = moment(view.currentStart)
        .startOf('month')
        .add(1, 'month')
        .subtract(1, 'day')
        .format('YYYY-MM-DD');
      updateStartEnd({ start: startOfMonth, end: endOfMonth });
    };

    calendarApi.on('datesSet', handleDatesSet);

    return () => {
      calendarApi.off('datesSet', handleDatesSet);
    };
  }, []);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <FullCalendarLayout>
        <FullCalendar
          ref={calendarRef}
          height={'720px'}
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
          ]}
          select={(e) => {
            setDate(e.startStr);
          }}
          //>>> for select event
          eventClick={(e) => {
            setDate(dayjs(e.event.start).format('YYYY-MM-DD'));
            document
              .querySelector('.calendarSelect')
              .scrollIntoView({ behavior: 'smooth' });
          }}
          //<<< for select event
          // >>> max event show
          dayMaxEventRows={true} // for all non-TimeGrid views
          views={{
            dayGridMonth: {
              dayMaxEventRows: 3,
            },
          }}
          // <<< max event show
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          initialView="dayGridMonth"
          nowIndicator={true}
          // editable={true}
          selectable={true}
          selectMirror={true}
          // initialEvents={[
          //   { title: 'event 1', start: new Date(), resourceId: 'a' },
          // ]}
          // events={[
          //   { title: 'Event 1', start: '2023-07-16', resourceId: 'a' },
          //   { title: 'Event 2', date: '2023-07-17', resourceId: 'b' },
          // ]}
          eventOrder="custom" // Use custom event order
          events={list?.map((ele) => {
            if (ele.date > today) {
              color = 'gray';
            } else if (ele.frontBackLow === 0) {
              color = 'blue';
            } else if (ele.frontBackLow === 1) {
              color = 'orange';
            } else if (ele.frontBackLow === 2) {
              color = 'green';
            } else {
              color = 'red';
            }
            return {
              id: ele.sid,
              title: ele.name,
              date: formatDate(ele.date),
              backgroundColor: color,
              // editable: true,
              extendedProps: {
                dataDump: 'you can store accessory here',
              },
            };
          })}
        />
      </FullCalendarLayout>
      {/* {console.log(list)} */}
    </div>
  );
}
