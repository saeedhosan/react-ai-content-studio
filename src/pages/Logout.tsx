import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeAuthSession } from "../app/utils/storage";
import { errorToString } from "../app/utils/utils";

export default function Logout() {
    const navigate = useNavigate();
    axios
        .get("/logout")
        .then()
        .catch((err) => {
            toast.error(errorToString(err));
        })
        .finally(() => {
            removeAuthSession();
            navigate("/");
        });
    return <></>;
}
