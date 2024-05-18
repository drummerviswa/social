import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  const { risLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      }),
  });


  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["relationship"]);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      {data === undefined ? (
        <div className="container">
          <h1 style={{ color: "white" }}>No Profile found</h1>
        </div>
      ) : isLoading ? (
        "Loading"
      ) : (
        <>
          <div className="images">
            <img src={"/uploads/" + data.profilePic} alt="" className="cover" />
            <img
              src={"/uploads/" + data.coverPic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span style={{ textAlign: "center", fontSize: 25 }}>
                  {data && data.name}
                </span>
                <div className="info">
                  <div className="item" style={{padding:10}}>
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item" style={{padding:10}}>
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                  <div className="item" style={{padding:10}}>
                    <EmailOutlinedIcon />
                    <span>{data.email}</span>
                  </div>
                </div>
                {risLoading ? (
                  "Loading....."
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData &&
                    relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <MoreVertIcon />
              </div>
            </div>
            <Posts />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
