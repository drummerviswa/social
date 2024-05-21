export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={"/uploads/"+params.row.coverPic} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "city",
    headerName: "City",
    width: 180,
  },{
    field: "type",
    headerName: "Admin",
    renderCell: (params) => {
      return (
        <button style={{padding:"3px 4px",borderRadius:5,color:"black",border:"1px dotted rgba(0, 0, 0, 0.596)",cursor:"none"}}>
          {params.row.type===1?"Admin":"User"}
        </button>
      );
    },
  },,
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "drummerviswa",
    img: "1715516131259-wp5381231-artwork-minimal-batman-4k-wallpapers.jpg",
    city: "Alandur",
    email: "drummerviswa@gmail.com",
    website:"drummerviswa.github.io",
  },
];
