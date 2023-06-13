import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAuth } from "../app/context/AuthContext";
import { dbTodate, dbTotime, extartError } from "../app/helper";
import useComments from "../app/hooks/useComments";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import Loaders from "../components/loader/Loaders";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Supportpage() {
  useTitle("Support");
  const { comments, loading, refetch } = useComments();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [username, setUsername] = useState();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.data) {
      setUsername(user?.data?.display_name);
    }
  }, [user]);

  const showMessage = (row) => {
    Swal.fire({
      title: "Support details",
      html: `<div><b>Subject:</b> ${row?.comment_author_IP}</div>
             <style>a{color:#fe4e00}</style>
             <div class="mt-4">${row?.comment_content}</div>
            `,
    });
  };

  useEffect(() => {
    setData(comments);
  }, [comments]);

  //filter
  useMemo(() => {
    let fileterd = null;
    fileterd = comments?.filter((item, i) => {
      const name = item && item.comment_author_IP ? item.comment_author_IP : "";
      const finder = search && search?.toString().toLowerCase();
      return name.toString().toLowerCase().includes(finder);
    });
    setData(fileterd);
    return () => {
      fileterd = null;
    };
  }, [search, comments]);

  const columns = [
    {
      sortable: true,
      name: <b className="text-uppercase">ticket id</b>,
      selector: (row) => <span>{row?.comment_author_url}</span>,
    },
    {
      name: <b className="text-uppercase">status</b>,
      selector: (row) => {
        if (row?.comment_approved === "1") {
          return <span className="text-success">Approved</span>;
        } else if (row?.comment_approved === "spam") {
          return <span className="text-danger">rejected</span>;
        } else if (row?.comment_approved === "trash") {
          return <span className="text-danger">trash</span>;
        } else {
          return <span className="text-warning">panding</span>;
        }
      },
    },
    {
      name: <b className="text-uppercase">subject</b>,
      selector: (row) => {
        return <span>{row?.comment_author_IP}</span>;
      },
    },
    {
      name: <b className="text-uppercase">Message</b>,
      selector: (row) => (
        <>
          {/* <div
            style={{ width: "180px" }}
            dangerouslySetInnerHTML={{ __html: row?.comment_content }}
          ></div> */}
          <br />
          <div
            className="btn btn-normal py-1 mb-3"
            onClick={() => showMessage(row)}
          >
            See message
          </div>
        </>
      ),
    },
  ];

  //expnded row
  const ExpandedComponent = ({ data }) => {
    const replid = data?.children || [];
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handlecommentSubmit = (e) => {
      e.preventDefault();
      const useremail = user?.data?.user_email;
      const commentid = data?.comment_ID;
      if (!commentid) {
        toast.error("support id not found");
        return false;
      }
      if (!message) {
        toast.error("message not found");
        return false;
      }
      if (!username) {
        toast.error("username  not found");
        return false;
      }
      setLoading(true);
      (async () => {
        try {
          const _data = {
            username: username,
            email: useremail,
            message: message,
            comment_id: commentid,
          };
          const response = await axios.post(
            settings.app_rest_url + "/support/reply",
            _data
          );
          const res = response.data;
          if (res?.success) {
            toast.success(res?.message);
            setLoading(false);
            refetch();
          } else {
            toast.error(res?.message);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          toast.error(extartError(error));
        }
      })();
    };

    if (typeof replid === "object") {
      return (
        <div className="ml-6">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ width: "20%" }}>
                  Replid by
                </th>
                <th scope="col" style={{ width: "70%" }}>
                  Message
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {replid.map((item, k) => {
                const author =
                  item?.comment_author === username
                    ? "me"
                    : item.comment_author;
                const message = item?.comment_content || "";
                const datetime = item?.comment_date;
                return (
                  <tr key={k}>
                    <td>{author}</td>
                    <td>{message}</td>
                    <td>
                      <div className="font-weight-bold">
                        {dbTodate(datetime)}
                      </div>
                      <div>{dbTotime(datetime)}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="form-group input-box d-flex mx-8">
            <textarea
              value={message}
              type="text"
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control br-0 w-75"
              placeholder={"Your reply"}
              required={true}
            />
            <div className="w-25 ml-4 pt-2 pb-2">
              <div className="text-center">
                <button
                  disabled={loading}
                  onClick={handlecommentSubmit}
                  type="submit"
                  className="btn btn-normal w-100 fs-14"
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const rowPreDisabled = (row) => {
    if (row?.children?.length > 0) {
      return false;
    }
    return true;
  };

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div className="card border-0 p-4">
          {/* SET DATATABLE */}
          <div className="col-12">
            <div className="text-center float-right col-md-3  pr-0 mb-4">
              <Link
                to={"/support/create"}
                className="btn btn-normal w-100 fs-14"
              >
                Create Support Request
              </Link>
            </div>
          </div>
          <div className="dataTables_wrapper">
            <div className="col-md-9 float-left">
              <h3 className="card-title fs-16 mt-3 mb-4">
                <i className="fa-solid fa-scroll-old mr-2 text-info" />
                All Support Requests
              </h3>
            </div>
            <div className="col-md-3 float-left pr-6">
              <div className="dataTables_filter">
                <i className="fa fa-search search-icon" />
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  className="form-control"
                  placeholder="search..."
                />
              </div>
            </div>
            {data ? (
              <DataTable
                columns={columns}
                data={data}
                progressPending={loading}
                progressComponent={<h6>Loading...</h6>}
                pagination
                expandableRows
                expandableRowDisabled={rowPreDisabled}
                expandableRowsComponent={ExpandedComponent}
              />
            ) : (
              <Loaders />
            )}
          </div>

          {/* END SET DATATABLE */}
        </div>
      </div>
    </div>
  );
}
