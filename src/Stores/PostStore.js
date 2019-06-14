import {observable, action} from "mobx";
import TimeStore from "./TimeStore";
import axios from "axios";

class PostStore {

    getSomething = () => TimeStore.getTime();

    static __instance = null;

    static getInstance() {
        if (PostStore.__instance === null) {
            PostStore.__instance = new PostStore();
        }
        return PostStore.__instance;
    }

    constructor()
    {
        PostStore.__instance = this;
    }

    @observable current_time = null;

    @action getTime = async () => {
        this.current_time = await new Date().getTime();
    }

    @observable items = null;
    @action fetchItems = async () =>
    {
        try {
            let response = await axios({
                url : "http://localhost:8080/api/board",
                method : "get",
                header : {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout : 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                this.items = response.data;
            }
        }
        catch (e) {
            alert(e.toLocaleString());
        }
    }

    @observable viewItem = null;
    @action fetchItem = async (postid) =>
    {
        try {
            this.viewItem = null;
            let response = await axios({
                url : `http://localhost:8080/api/board/view/${postid}`,
                method : "get",
                header : {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout : 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                this.viewItem = response.data;
            }
        }
        catch (e) {
            alert(e.toLocaleString());
        }
    }


    @action addPost = async (post) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/addPost",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(post)
            });
            // console.log(response);
            if(response.status === 200)
            {
                return (response.status === 200);
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            return false;
        }
    }

    @action editPost = async (post) => {
        try
        {
            console.log(post);
            let response = await axios({
                url : "http://localhost:8080/api/modifyPost",
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(post)
            });
            console.log(response);
            if(response.status === 200)
            {
                return (response.status === 200);
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            return false;
        }
    }

    @action deletePost = async (id) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/deletePost/" + id,
                method: 'delete',
                timeout: 3000,
            });
            // console.log(response);
            if(response.status === 200)
            {
                return (response.status === 200);
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            return false;
        }
    }
}

export default PostStore.getInstance();