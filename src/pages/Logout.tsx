import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { extartError } from "../app/utils/convert";
import { removeAuthSession } from "../app/utils/storage";

export default function Logout() {
  const navigate = useNavigate();
  axios
    .get("/logout")
    .then()
    .catch((err) => {
      toast.error(extartError(err));
    })
    .finally(() => {
      removeAuthSession();
      navigate("/");
    });
  return <></>;
}
