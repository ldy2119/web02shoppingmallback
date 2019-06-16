import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";

@inject("stores")
@observer
class EditProfile extends Component {

    state = {
        id:"",
        account:"",
        username : "",
        password : "",
        email : "",
        goToProfile : null
    }

    async componentDidMount() {
        if(this.props.stores.ProfileStore.user)
        {
            this.setState({
                ...this.state,
                id:this.props.stores.ProfileStore.user.id,
                account:this.props.stores.ProfileStore.user.account
            })
        }
    }

    updateUserName = (event) => {
        this.setState({
            ...this.state,
            username : event.target.value
        });
    };
    updatePassword = (event) => {

        this.setState({
            ...this.state,
            password : event.target.value
        });
    };
    updateEmail = (event) => {

        this.setState({
            ...this.state,
            email : event.target.value
        });
    };

    EditProfile = async () => {
        if(window.confirm("수정하시겠습니까?") === false)
            return;

        if(await this.props.stores.ProfileStore.EditProfile(this.state) > 0)
        {
            await this.props.stores.ProfileStore.Logout();
            window.confirm("성공하였습니다. 다시 로그인해 주십시오.");
            this.setState({
                goToProfile:true
            });
        }
    }

    cancelEditProfile = async () => {
        this.setState({
            ...this.state,
            goToProfile:true
        });
    }

    render()
    {
        if(this.state.goToProfile)
            return <Redirect to="/user"/>

        if(!this.props.stores.ProfileStore.user)
            return <Redirect to="/user"/>

        return(
            <div>
                유저 이름 : <input value={this.state.username} onChange={this.updateUserName} /><br/>
                비밀번호 : <input value={this.state.password} onChange={this.updatePassword} /><br/>
                이메일 : <input value={this.state.email} onChange={this.updateEmail} /><br/>
                <button onClick={this.EditProfile}>수정</button><button onClick={this.cancelEditProfile}>취소</button>
            </div>
        );
    }


};

export default EditProfile;