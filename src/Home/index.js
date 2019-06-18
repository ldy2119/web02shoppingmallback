import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./App.scss";

import Profile from "../Profile/index";

@inject("stores")
@observer
class Home extends Component {

    componentDidMount() {
        // this.props.stores.PostStore.fetchItems();
    }

    render() {
        return (
            <div className="Home">
                <div>
                    <Profile/>
                </div>
            </div>
        );
    }
}

export default Home;