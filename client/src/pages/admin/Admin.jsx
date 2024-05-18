import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Datatable from "../../components/datatable/Datatable";
import "./admin.scss"

const Admin = () => {
  return (
    <div className="admin">
      <Datatable />
    </div>
  );
};

export default Admin;
