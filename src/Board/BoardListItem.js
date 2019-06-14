import React from 'react';
import {Link} from "react-router-dom";

const BoardListItem = (props) => {
    let {post} = props;
    let created = new Date(post.created);
    let viewPost = `/board/view/${post.id}`;
    // console.log(post.id);

    return(
        <div className="board-list-item">

            <Link to={post.id.toString()}/>
            <div>
                <Link to={viewPost}>
                {post.title}
                </Link>
            </div>
            <div>
                {created.getMonth()+1}-{created.getDate()}
                &nbsp;
                {created.getHours()}:{created.getMinutes()}
            </div>
        </div>

    );
};

export default BoardListItem;