import React from 'react';

export class ComponentLogic<IState = never, IProps = never> {
    $node: React.Component;
    $classNames: Array<string>;

    constructor(node: React.Component) {
        this.$node = node;
        this.$classNames = ['Component'];

        if (!node.state) {
            node.state = {};
        }

        this._initState(node.state);
    }

    /**
     * Permanently adds a class name to this component's class name list.
     *
     * This is meant to be only meant to be used during construction. Dynamic runtime class names should be handled in the View classes.
     *
     * @param name
     */
    _addClassName(name: string) {
        this.$classNames.push(name);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _initState(state: Partial<IState>) {}

    getClassName(): string {
        return this.$classNames.join(' ');
    }

    getNode(): React.Component {
        return this.$node;
    }

    getState(): IState {
        return <IState> this.$node.state;
    }

    getProps(): IProps {
        return <IProps> this.$node.props;
    }

    setState(state: Partial<IState>) {
        this.$node.setState(state);
    }
}
