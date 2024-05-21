import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {  useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Update from "../update/Update";

const Datatable = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [clickUser,setClickUser] = useState();
  const handleUpdate = (d) =>{
    setClickUser(d);
    console.log("Current:",clickUser);
    setOpenUpdate(true);
  }
  var {data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get("/users/all").then((res) => {
        return res.data;
      }),
  });

  if (!data) {
    data = userRows;
  }
  const handleDelete = (id) => {
    if (currentUser.id !== id) {
      makeRequest.delete("/users/" + id);
      window.location.reload();
    }
  };
  console.log("User: ", data);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
            target="_blank"
              to={"/profile/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <button className="viewButton">View</button>
            </Link>
            <button className="updateButton" onClick={()=>handleUpdate(params.row)}>update</button>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/register" className="link">
          Add New
        </Link>
      </div>
      <div className="tables">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[9]}
          checkboxSelection
          hideFooterPagination
        />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={clickUser} />}
    </div>
  );
};

export default Datatable;
