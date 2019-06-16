import React, {Component} from 'react';
import BoardListItem from "./BoardListItem";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

@inject("stores")
@observer
class BoardList extends Component{

    u = this.props.stores.ProfileStore;
    render(){
        if(this.u.user)
        {
            return(
                <div>
                    {this.props.items.map(item => <BoardListItem key={item.id} post={item}/>)}
                    <div>
                        <Link to="/board/add">새글쓰기</Link>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    {this.props.items.map(item => <BoardListItem key={item.id} post={item}/>)}
                </div>
            );
        }
    }
};

export default BoardList;