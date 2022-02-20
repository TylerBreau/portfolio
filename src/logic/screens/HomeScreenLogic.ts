
import React from 'react';
import {ScreenLogic} from '@Logic/screens/ScreenLogic';
import {IHomeScreenState} from '@Interfaces/screens/IHomeScreen';

export class HomeScreenLogic extends ScreenLogic<IHomeScreenState> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('HomeScreen');
    }

    _initState(state: Partial<IHomeScreenState>) {
        state.index = 0;
    }
}
