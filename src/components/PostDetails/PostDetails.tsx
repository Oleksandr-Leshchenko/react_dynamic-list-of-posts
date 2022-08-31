import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Comment } from '../../store/slices/commentSlice/commentsSlice';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.postSlice);
  const { comments } = useAppSelector(state => state.commentsSlice);
  const { setComments } = useActions();
  const [showHide, setShowHide] = useState('show');

  console.log(comments, 'point 1');

  const getSetComments = async () => {
    const postComments = await getPostComments(selectedPost?.id);

    setComments(postComments);
  };

  useEffect(() => {
    getSetComments();
  }, []);

  const handleClick = () => {
    if (showHide === 'show') {
      setShowHide('hide');
    } else {
      setShowHide('show');
    }
  };

  const handleDelete = (commentId: number) => {
    deleteComment(commentId)
      .then(() => getSetComments())
    // getSetComments();
    console.log(comments, 'point 2');
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleClick}
        >
          {showHide}
          {' '}
          {comments.length !== 0 && comments.length}
          {' '}
          {comments.length === 1 ? 'comment' : 'comments'}
        </button>

          <ul className="PostDetails__list">
            {showHide === 'hide' && comments.map((comment: Comment) => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDelete(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
