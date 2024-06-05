import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const LikeButton = ({ isLiked, onLike, onUnlike, totalLike }) => {
  return (
    <button
      className="border-2 px-8 py-2 rounded-3xl ml-5 mt-3 flex items-center gap-4"
      onClick={isLiked ? onUnlike : onLike}
    >
      {isLiked ? <AiFillLike size={30} /> : <AiOutlineLike size={30} />}
      <p className="text-lg">{totalLike}</p>
    </button>
  );
};

export default LikeButton;
