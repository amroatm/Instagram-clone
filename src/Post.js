import React ,{useState , useEffect} from 'react'
import "./Post.css"
import { Avatar } from '@material-ui/core';
import { db } from './firebase'
import firebase from 'firebase'


function Post({postid , user ,  username , caption ,imageUrl}) {
    const [comments , setComments] = useState([])
    const [comment , setComment] = useState('')


    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postid).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
            
    }

    // tHis a listiner for comment to the specephic post id
    useEffect(() => {
        let unsubscribe;
        if (postid) {
            unsubscribe = db
                .collection("posts")
                .doc(postid)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }

        return () => {
            unsubscribe();
        };
    }, [postid]);

    return (
        <div className="post">
            <div className="post__header">
            <Avatar 
             className="post__avatar"
            alt={username} 
            
            src="/static/images/avatar/1.jpg" 
            />

            <h3>{username}</h3>
            </div>
            
            <img className="post__image" src={imageUrl} alt="" />

            <h4 className="post__text"><strong>{username} </strong>{caption}</h4>

            <div className="post__comments">
                {
                    comments.map((comment) =>(
                        <p>
                            <b>{comment.username}</b>{comment.text}
                        </p>
                    ))
                }
            </div>

            {user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add Comment ..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        />
                    <button
                                className="post__button"
                                disabled={!comment}
                                type="submit"
                                onClick={postComment}
                            >
                                post
                    </button>
                 </form>
            )}

           

            
        </div>
    )
}

export default Post
