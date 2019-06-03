import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./App.scss";

@inject("stores")
@observer
class Home extends Component {
    render() {
        let t = this.props.stores.TimeStore;
        let p = this.props.stores.PostStore;
        return (
            <div className="Home">
                <div>{p.current_time && p.current_time}</div>
                <div><button onClick={p.getTime}>getTime from POST</button></div>
                <div>{t.current_time && t.current_time.toString()}</div>
                <div>{t.ms}</div>
                <div><button onClick={t.getTime}>getTime</button></div>
                <ul>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                </ul>
            </div>
        );
    }
}

export default Home;