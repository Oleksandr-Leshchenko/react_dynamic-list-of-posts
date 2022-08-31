import { Comment } from '../store/slices/commentSlice/commentsSlice';
import { BASE_URL, request } from './api';

const COMMENTS_URL = `${BASE_URL}/comments`;

export const getPostComments = async (postId: number | undefined) =>
  request(`${COMMENTS_URL}?postId=${postId}`);

export const sendComment = async (comment: Comment) => {
  return fetch(COMMENTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};

export const deleteComment = (commentId: number) => {
  return fetch(`${COMMENTS_URL}/${commentId}`, { method: 'DELETE' });
};

export const getUniqueCommentId = async () => {
  const allComments = await request(COMMENTS_URL);

  return allComments.reduce((a: number, b: Comment) => a + b.id, 0);
};
