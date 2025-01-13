import React from 'react';
import {
    useState,
    useEffect
} from 'react';

import { EventStore } from './EventStore';
import { LoadEventsAction } from './LoadEventsAction';

export function EventsScreen() {
    let [events, setEvents] = useState(EventStore.getInstance().getEvents());

    useEffect(() => {
        const onEventsStoreUpdate = () => {
            setEvents(EventStore.getInstance().getEvents());
        };
        EventStore.getInstance().register(onEventsStoreUpdate);    
        new LoadEventsAction().execute();

        return () => {
            EventStore.getInstance().unregister(onEventsStoreUpdate);
        };
    }, [setEvents]);

    let eventsUI: React.ReactNode[] = [];

    for (let i = 0, length = events.length; i < length; ++i) {
        eventsUI.push(<li>{events[i]}</li>);
    }
    return <ul>{eventsUI}</ul>;
}