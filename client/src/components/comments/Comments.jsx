import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment"

const Comments = ({postId}) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (newPost) => {
        return makeRequest.post("/comments", newPost);
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    })
  
    const handleClick = async (e) => {
      e.preventDefault();
      mutation.mutate({ desc, postId });
      setDesc("");
    }
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" onChange={(e) => setDesc(e.target.value)} value={desc} />
        <button onClick={handleClick}>Send</button>
      </div>
      {error? "Something went wrong" : isLoading?"Loading...": data && data.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
