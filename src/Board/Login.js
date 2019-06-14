import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

@inject("stores")
@observer
class Login extends Component{


    state = {
        account : "",
        password : ""
    }

    u = this.props.stores.UserStore;

    updateAccount = (event) => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };
    updatePassword = (event) => {

        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    Login = async () =>
    {
        if(this.state.account && this.state.password)
        {
            await this.u.Login(this.state);
            if(!this.u.user)
            {
                alert("로그인 실패");
            }
            this.setState({
                ...this.state,
                account : "",
                password : ""
            });
        }
    }

    Logout = async () =>
    {
        await this.u.Logout();
    }

    render()
    {
        if(this.u.user)
        {
            return(
                <div>
                    <div>
                        {this.u.user.account}님 환영합니다.
                        <button onClick={this.Logout}>로그아웃</button>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <input value={this.state.account} onChange={this.updateAccount}/>
                    <input value={this.state.password} onChange={this.updatePassword}/>
                    <button onClick={this.Login}>로그인</button>
                </div>
            );
        }
    }
};

export default Login;