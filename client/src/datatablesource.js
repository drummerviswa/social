export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={"/uploads/"+params.row.profilePic} alt="avatar" />
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
    width: 500,
  }
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
