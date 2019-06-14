import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./App.scss";
import Board from "../Board";

@inject("stores")
@observer
class Home extends Component {

    componentDidMount() {
        // this.props.stores.PostStore.fetchItems();
    }

    render() {
        let t = this.props.stores.TimeStore;
        let p = this.props.stores.PostStore;
        p.fetchItems();
        return (
            <div className="Home">
                <div>
                    <Board/>
                </div>
            </div>
        );
    }
}

export default Home;