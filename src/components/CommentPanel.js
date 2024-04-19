import React from 'react';
import '../style/CommentPanel.css';
import CloseButton from "./CloseButton";

const CommentPanel = ({index}) => {
    const handleCommentPanelClose = () => {
        const commentPanel = document.getElementsByClassName('comment-panel')[index];
        const feedbackContainer = document.getElementsByClassName(`feedback-container`)[index];
        commentPanel.classList.remove('open');
        commentPanel.classList.add('close');
        feedbackContainer.classList.remove('comment-open');
    }
    return (
        <div className={'close comment-panel'} key={index}>
            <CloseButton onClick={handleCommentPanelClose}/>
            <h2>Comments</h2>
            <section className={'comment-list'}>
                <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div> <div className={'comment'}>
                    <img className={'avatar'} src={'https://cdn-icons-png.flaticon.com/512/194/194938.png'}/>
                    <p className={'comment-text'}>What an article ! I loved watching it !</p>
                </div>

            </section>
            <section className={'comment-input'}>
                <input type={'text'} placeholder={'Add a comment...'}/>
                <button title={'Post comment'}>Post</button>
            </section>
        </div>
    );
}
export default CommentPanel;