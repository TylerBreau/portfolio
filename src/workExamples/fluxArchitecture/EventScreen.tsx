
import React from 'react';

import { EventStore } from './EventStore';
import { LoadEventsAction } from './LoadEventsAction';

interface IEventsScreenState {
    events: string[];
}

export class EventsScreen extends React.Component<{}, IEventsScreenState> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            events: EventStore.getInstance().getEvents()
        };

        this._onEventsStoreUpdate = this._onEventsStoreUpdate.bind(this);
    }

    public override componentDidMount(): void {
        EventStore.getInstance().register(this._onEventsStoreUpdate);    

        new LoadEventsAction().execute();
    }

    public override componentWillUnmount(): void {
        EventStore.getInstance().unregister(this._onEventsStoreUpdate);
    }

    protected _onEventsStoreUpdate(): void {
        this.setState({
            events: EventStore.getInstance().getEvents()
        });
    }

    public override render() {
        let eventsUI: React.ReactNode[] = [];

        for (let i = 0, events = this.state.events, length = events.length; i < length; ++i) {
            eventsUI.push(
                <React.Fragment>
                    <li>{events[i]}</li>
                </React.Fragment>
            );
        }
        return <ul>{eventsUI}</ul>;
    }
}
