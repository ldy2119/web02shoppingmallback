import {observable, action} from "mobx";
import axios from "axios";

class UserStore {

    static __instance = null;

    static getInstance() {
        if (UserStore.__instance === null) {
            UserStore.__instance = new UserStore();
        }
        return UserStore.__instance;
    }

    constructor()
    {
        UserStore.__instance = this;
    }

    @observable user = null;
    @action Login = async (u) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/login",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(u)
            });
            console.log(response);
            if(response.status === 200)
            {
                this.user = response.data;
                console.log(this.user);
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            this.user = null;
        }
    }
    @action Logout = async () => {
        this.user = null;
    }
}

export default UserStore.getInstance();