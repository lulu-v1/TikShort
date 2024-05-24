import React, { useState, useEffect } from 'react';
import '../style/CommentPanel.css';
import CloseButton from "./CloseButton";

const CommentPanel = ({ index, user }) => {
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);

    const handleCommentPanelClose = () => {
        const commentPanel = document.getElementsByClassName('comment-panel')[index];
        const feedbackContainer = document.getElementsByClassName(`feedback-container`)[index];
        commentPanel.classList.remove('open');
        commentPanel.classList.add('close');
        feedbackContainer.classList.remove('comment-open');
    }

    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value);
    };

    const handlePostComment = () => {
        // Send a POST request to the backend to post the comment
        fetch('http://localhost:3001/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoId: index, // Assuming video ID is the same as the index
                userId: user.user_id,
                comment: commentInput,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to post comment');
                }
                // Clear the comment input after successful submission
                setCommentInput('');
            })
            .catch(error => {
                console.error('Error posting comment:', error);
                // Handle error (e.g., show error message to the user)
            });
    };

    useEffect(() => {
        // Fetch comments for the video from the backend
        fetch(`http://localhost:3001/api/comments/${index}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                return response.json();
            })
            .then(data => {
                setComments(data.comments);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                // Handle error (e.g., show error message to the user)
            });
    }, [index,handlePostComment]);

    return (
        <div className={'close comment-panel'} key={index}>
            <CloseButton onClick={handleCommentPanelClose}/>
            <h2>Comments</h2>
            <section className={'comment-list'}>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>Posted by {comment.username}</p>
                        <p>{comment.comment}</p>
                    </div>
                )).reverse()}
            </section>
            <section className={'comment-input'}>
                <input
                    type={'text'}
                    placeholder={'Add a comment...'}
                    value={commentInput}
                    onChange={handleCommentInputChange}
                />
                <button title={'Post comment'} onClick={handlePostComment}>Post</button>
            </section>
        </div>
    );
};

export default CommentPanel;
