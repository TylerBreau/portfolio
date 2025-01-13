
import React from 'react';
import '@Styles/screens/FluxArchitecture';
import {FluxArchitectureScreenLogic} from '@Logic/screens/FluxArchitectureScreenLogic';
import {Footer} from '@Views/components/Footer';
import {Header} from '@Views/components/Header';
import FluxArchitectureCode from '../../res/FluxArchitectureCode.txt';

export class FluxArchitectureScreen extends React.Component<{}, {}> {
    private $logic: FluxArchitectureScreenLogic;

    constructor(props: {}) {
        super(props);
        this.$logic = new FluxArchitectureScreenLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            <Header items={[]} />
            <div className='body'>
                <p>
                    The Flux Architecture is a design pattern that uses a dispatcher, stores, and actions to handle state management within a website.<br /><br />
                    The view calls on actions.<br />
                    The actions does something and then dispatches, potentially with data.<br />
                    The Dispatcher notifies the stores.<br />
                    The stores check the dispatch event to see if it's something they care about. If they do care about it, they update their state accordingly and triggers an update event.<br />
                    The view listens to store on update, and re-renders with the new store data.<br /><br />
                    As a concrete example, imagine you have a page that lists events. The events are stored on a server's database and are loaded on page load.<br />
                    This series of operations would occur:
                </p>
                <ol>
                    <li>Page init, setup store onUpdate listeners.</li>
                    <li>Page load, call LoadEventsAction.</li>
                    <li>LoadEventsAction requests and receives an events array from server.</li>
                    <li>LoadEventsAction creates an ActionData containing an action identifier and the events array. The action data is dispatched.</li>
                    <li>The dispatcher forwards the dispatched ActionData to the stores.</li>
                    <li>The stores check the action identifier to see if it's data the store cares about. If the store does not care about the data, it will ignore the data.</li>
                    <li>The EventsStore uses the ActionData to update its internal state with the events array.</li>
                    <li>The EventsStore emits an onUpdate event.</li>
                    <li>The page's onUpdate listeners receives the event. The page rerenders with the events array.</li>
                </ol>
                <pre><code>{FluxArchitectureCode}</code></pre>
            </div>
            <Footer />
        </div>;
    }
}
