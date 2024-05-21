import { useContext, useState } from "react";
import "./rightBar.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link, useHref, useLocation } from "react-router-dom";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get("/users/all").then((res) => {
        return res.data;
      }),
  });
  const [userId, setuserId] = useState(currentUser.id);
  const { risLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
    },
  });

  const handleFollow = (e) => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  console.log("Relationship Data: ", relationshipData);
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {error ? (
            "Something went wrong!"
          ) : isLoading ? (
            "loading"
          ) : data === undefined ? (
            <h1>Data not found</h1>
          ) : (
            data.map(
              (u) =>
                u.id != currentUser.id && (
                  <div key={u.id} className="user">
                    <div className="userInfo">
                      <img src={"/uploads/" + u.coverPic} alt="" />
                      <div className="online" />
                      <span
                        onClick={() =>
                          window.location.assign(
                            window.location.origin + `/profile/${u.id}`
                          )
                        }
                      >
                        {u.name}
                      </span>
                    </div>
                    <div className="buttons">
                      <button
                        onClick={() => {
                          handleFollow(u.id);
                          setuserId(u.id);
                        }}
                      >
                        Follow
                      </button>
                    </div>
            </div>
                )
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
