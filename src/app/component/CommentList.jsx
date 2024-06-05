import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div>
      {video.comments.length > 0 && (
        <div>
          <h4>Comments:</h4>
          {video.comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.comment}</p>
              <p>By: {comment.userId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
