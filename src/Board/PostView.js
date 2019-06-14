import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

@inject("stores")
@observer
class PostView extends Component{

    state = {
        goToList : false
    }

    editPost = `/board/edit/${this.props.postid}`;


    componentDidMount() {
        this.props.stores.PostStore.fetchItem(this.props.postid);
    }

    deletePost = async () =>
    {
        if(window.confirm("삭제하시겠습니까?") === false)
            return;
        if(await this.props.stores.PostStore.deletePost(this.props.postid))
        {
            await this.props.stores.PostStore.fetchItems();
            this.setState({
                ...this.state,
                goToList:true
            });
        }
    }

    render() {
        let p = this.props.stores.PostStore;
        let u = this.props.stores.UserStore;
        if(!p.viewItem)
            return <div/>
        console.log(p.viewItem);

        if(this.state.goToList)
        {
            return <Redirect to="/board"/>
        }

        console.log(u.user);
        if(u.user && u.user.id == p.viewItem.userId)
        {
            return (
                <div>
                    <div>
                        제목 : {p.viewItem.title}
                    </div>
                    <div>
                        내용 : <div dangerouslySetInnerHTML={{__html:p.viewItem.content}}></div>
                    </div>
                    <div>
                        작성시간 : {new Date(p.viewItem.created).toLocaleString()}
                    </div>
                    <div>
                        <button><Link to="/board">목록</Link></button>
                        <button><Link to={this.editPost}>수정</Link></button>
                        <button onClick={this.deletePost}>삭제</button>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <div>
                        제목 : {p.viewItem.title}
                    </div>
                    <div>
                        내용 : <div dangerouslySetInnerHTML={{__html:p.viewItem.content}}></div>
                    </div>
                    <div>
                        작성시간 : {new Date(p.viewItem.created).toLocaleString()}
                    </div>
                    <div>
                        <button><Link to="/board">목록</Link></button>
                    </div>
                </div>
            );
        }
    }
};

export default PostView;