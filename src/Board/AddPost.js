import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@inject("stores")
@observer
class addPost extends Component {

    state = {
        title : "",
        content : "",
        id : -1,
        goToList : false
    }

   async componentDidMount() {
        if(this.props.id != null)
        {
            this.setState({
                ...this.state,
                id:this.props.id
            });
            await this.props.stores.PostStore.fetchItem(this.props.id);
            let post = this.props.stores.PostStore.viewItem;
            if(post)
            {
                this.setState({
                    ...this.state,
                    title : post.title,
                    content : post.content
                });
            }
        }
        if(this.props.stores.ProfileStore.user)
        {
            this.setState({
                ...this.state,
                userId : this.props.stores.ProfileStore.user.id
            });
        }
    }

    updateTitle = (event) => {
        this.setState({
            ...this.state,
            title : event.target.value
        });
    };
    updateContent = (event, editor) => {

        this.setState({
            ...this.state,
            content : editor.getData()
        });
    };

    addNewPost = async () => {
        if(this.state.id == -1)
        {
            if(window.confirm("추가하시겠습니까?") === false)
                return;

            if(await this.props.stores.PostStore.addPost(this.state))
            {
                await this.props.stores.PostStore.fetchItems();
                this.setState({
                    ...this.state,
                    goToList:true
                });
            }
        }
        else
        {
            if(window.confirm("수정하시겠습니까?") === false)
                return;

            if(await this.props.stores.PostStore.editPost(this.state))
            {
                await this.props.stores.PostStore.fetchItems();
                this.setState({
                    ...this.state,
                    goToList:true
                });
            }
        }
    }

    cancelNewPost = async () => {
        this.setState({
            ...this.state,
            goToList:true
        });
    }

    render()
    {
        if(this.state.goToList)
            return <Redirect to="/board"/>

        if(!this.props.stores.ProfileStore.user)
            return <Redirect to="/board"/>

        return(
            <div>
                <div>
                    제목 <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    내용
                    <div>
                        <CKEditor
                            editor={ClassicEditor}
                            data={this.state.content}
                            onChange={this.updateContent}/>
                    </div>
                </div>
                <div>
                    <button onClick={this.addNewPost}>확인</button>
                    <button onClick={this.cancelNewPost}>취소</button>
                </div>
            </div>
        );
    }


};

export default addPost;