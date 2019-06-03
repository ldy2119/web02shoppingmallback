import {observable, action} from "mobx";
import TimeStore from "./TimeStore";

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
}

export default PostStore.getInstance();