import React from 'react'
import {Provider} from 'react-redux'
import {store} from './store/store'
import {AppRouter} from './routers/AppRouter'
import "./index.css";

export const AdapprogramApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
