
import '@Styles/workExamples/FluxArchitectureWorkExample.less';

import {IFluxArchitectureProps} from '@Interfaces/workExamples/IFluxArchitecture';

import {WorkExampleLogic} from '@Logic/WorkExampleLogic';

import {TabView} from '@Views/components/TabView';

import IActionCode from '@WorkExamples/fluxArchitecture/IAction.txt';
import ActionCode from '@WorkExamples/fluxArchitecture/Action.txt';
import IActionDataCode from '@WorkExamples/fluxArchitecture/IActionData.txt';
import ActionDataCode from '@WorkExamples/fluxArchitecture/ActionData.txt';
import IDispatcherCode from '@WorkExamples/fluxArchitecture/IDispatcher.txt';
import DispatcherCode from '@WorkExamples/fluxArchitecture/Dispatcher.txt';
import IStoreCode from '@WorkExamples/fluxArchitecture/IStore.txt';
import StoreCode from '@WorkExamples/fluxArchitecture/Store.txt';
import EventScreenCode from '@WorkExamples/fluxArchitecture/EventScreen.txt';
import EventStoreCode from '@WorkExamples/fluxArchitecture/EventStore.txt';
import LoadEventsActionCode from '@WorkExamples/fluxArchitecture/LoadEventsAction.txt';

export function FluxArchitectureWorkExample(props: IFluxArchitectureProps) {
    return <div className={WorkExampleLogic.getClassName(['FluxArchitectureWorkExample'], props.className)}>
        <p>
            The Flux Architecture is a design pattern that uses a dispatcher, stores, and actions to handle state management.<br /><br />
            The view calls on actions.<br />
            The actions does something and then dispatches, potentially with data.<br />
            The Dispatcher notifies the stores.<br />
            The stores check the dispatch event to see if it&apos;s something they care about. If they do care about it, they update their state accordingly and trigger an update event.<br />
            The view listens to the store on update event and re-renders with the new store data.<br /><br />
            As a concrete example, imagine you have a page that lists events. The events are stored on a server&apos;s database and are loaded on page load.<br />
            This series of operations would occur:
        </p>
        <ol>
            <li>Page init, setup store onUpdate listeners.</li>
            <li>Page load, call LoadEventsAction.</li>
            <li>LoadEventsAction requests and receives an events array from server.</li>
            <li>LoadEventsAction creates an ActionData containing an action identifier and the events array. The action data is dispatched.</li>
            <li>The dispatcher forwards the dispatched ActionData to the stores.</li>
            <li>The stores check the action identifier to see if it&apos;s data the store cares about. If the store does not care about the data, it will ignore the data.</li>
            <li>The EventsStore uses the ActionData to update its internal state with the events array.</li>
            <li>The EventsStore emits an onUpdate event.</li>
            <li>The page&apos;s onUpdate listeners receives the event and rerenders with the events array.</li>
        </ol>
        <TabView
            items={[
                {
                    title: 'Store',
                    index: 0,
                    render: () => {
                        return <div className="code">
                            <hr />
                            <p>
                                The Store class is a base class from which concrete stores extend from.<br /><br />
                                
                                It registers itself with the Dispatcher so that it can be notified when an Action completes.<br />
                                All action completes run through the _update function. Concrete stores implement _update to update store data for actions they respond to.<br />
                                After a store updates its data, it should return true from _update so that the base class Store will emit an update event.<br /><br />

                                The UI will listen for the Store&apos;s update events so that it can respond to changes in the Store&apos;s data.
                            </p>
                            <hr />
                            <label>IStore</label>
                            <hr />
                            <pre><code>{IStoreCode}</code></pre>
                            <hr />
                            <label>Store</label>
                            <hr />
                            <pre><code>{StoreCode}</code></pre>
                        </div>;
                    }
                },
                {
                    title: 'Dispatcher',
                    index: 1,
                    render: () => {
                        return <div className="code">
                            <hr />
                            <p>
                                The Dispatcher class is a Singleton. It handles communication between Stores and Actions. <br />
                                Stores register themselves with the Dispatcher via the register API.<br />
                                When an Action completes, it will call on the Dispatcher&apos;s dispatch API and the Dispatcher will notify all stores registered with it.
                            </p>
                            <hr />
                            <label>IDispatcher</label>
                            <hr />
                            <pre><code>{IDispatcherCode}</code></pre>
                            <hr />
                            <label>Dispatcher</label>
                            <hr />
                            <pre><code>{DispatcherCode}</code></pre>
                        </div>;
                    }
                },
                {
                    title: 'Action',
                    index: 2,
                    render: () => {
                        return <div className="code">
                            <hr />
                            <p>
                                The Action class is a base class from which concrete actions extend from.<br /><br />

                                Concrete actions do their work inside the _execute API.<br />
                                UI will execute actions, causing _execute to be ran. After the _execute returns successfully, the base Action class will dispatch the result of _execute.<br />
                                Before the data is sent to the Dispatcher, it is wrapped in an ActionData model. This just assigns an identifier to the data so that stores can determine where the data is coming from.<br /><br />

                                The checkType API is a typescript predicate. It allows the stores to narrow the type of action data so that everything is fulled typed. An example of this will be shown in EventStore code snippet. 
                            </p>
                            <hr />
                            <label>IAction</label>
                            <hr />
                            <pre><code>{IActionCode}</code></pre>
                            <hr />
                            <label>Action</label>
                            <hr />
                            <pre><code>{ActionCode}</code></pre>
                        </div>;
                    }
                },
                {
                    title: 'ActionData',
                    index: 3,
                    render: () => {
                        return <div className="code">
                            <hr />
                            <label>IActionData</label>
                            <hr />
                            <pre><code>{IActionDataCode}</code></pre>
                            <hr />
                            <label>ActionData</label>
                            <hr />
                            <pre><code>{ActionDataCode}</code></pre>
                        </div>;
                    }
                },
                {
                    title: 'EventScreen',
                    index: 4,
                    render: () => {
                        return <div className="code">
                            <hr />
                            <p>
                                This is the example EventScreen.<br /><br />

                                It uses the concrete classes, EventStore and LoadEventsAction, to get the data it wants to display.
                            </p>
                            <hr />
                            <label>EventScreen</label>
                            <hr />
                            <pre><code>{EventScreenCode}</code></pre>
                        </div>;
                    }
                },
                {
                    title: 'LoadEventsAction',
                    index: 5,
                    render: () => {
                        return <div className="code">
                            <hr />
                            <p>
                                This is the example LoadEvents Action.<br /><br />
                                
                                Normally you&apos;d have some kind of asynchronous API, either loading from a SQLite Database or making some kind network request.<br />
                                I just used dummy data for this example.
                            </p>
                            <hr />
                            <label>LoadEventsAction</label>
                            <hr />
                            <pre><code>{LoadEventsActionCode}</code></pre>
                        </div>;
                    }
                },
                {
                    title: 'EventStore',
                    index: 6,
                    render: () => {
                        return <div className="code">
                            <hr />
                            <p>
                                This is the example EventStore.<br /><br />

                                It has internal variables to hold onto data. The data can be accessed via getter APIs, in this example, getEvents.<br />
                                The _update API uses the LoadEventsAction&apos;s checkType API to narrow the type of data according to LoadEventsAction&apos;s TResponse typing.
                            </p>
                            <hr />
                            <label>EventStore</label>
                            <hr />
                            <pre><code>{EventStoreCode}</code></pre>
                        </div>;
                    }
                }
            ]}
        />
    </div>;
}
