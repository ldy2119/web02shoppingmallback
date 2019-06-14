import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import BoardList from "./BoardList"
import AddPost from "./AddPost"

import "./Board.scss";
import PostView from "./PostView";

@inject("stores")
@observer
class Board extends Component {

    componentDidMount() {
        this.props.stores.PostStore.fetchItems();
    }

    render() {
        if(this.props.match && this.props.match.params.command === "view" && this.props.match.params.postid)
            return <PostView postid={this.props.match.params.postid}/>
        else if(this.props.location && this.props.location.pathname === "/board/add")
            return <AddPost/>
        else if(this.props.match && this.props.match.params.command && this.props.match.params.command === "edit" && this.props.match.params.postid)
        {
            return <AddPost id={this.props.match.params.postid}/>
        }

        let p = this.props.stores.PostStore;

        return(
            <div>
                {p.items && <BoardList items={p.items} />}
            </div>
        );
    }

}

export default Board;