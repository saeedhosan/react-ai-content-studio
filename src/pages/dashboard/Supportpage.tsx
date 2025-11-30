import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { SuppoertsResponseType, SupportResponseType } from "../../api/ResponseType";
import useSupports from "../../api/useSupports";
import { borderRound } from "../../app/utils/convert";
import { dbTodate, dbTotime } from "../../app/utils/datetime";
import { getAuthSession } from "../../app/utils/storage";
import { dpath } from "../../app/utils/url";
import { errorToString } from "../../app/utils/utils";
import Textarea from "../../components/dashboard/Textarea";
import Loader from "../../components/loader/Loader";
import useTitle from "../../hooks/useTitle";

export default function Supportpage() {
    useTitle("Supports");
    const { supports, refetch: refetchSupports } = useSupports();
    const [comments, setComments] = useState<SuppoertsResponseType | null>(null);
    const [search, setSearch] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>([]);
    const user = getAuthSession();

    const showMessage = (row: SupportResponseType) => {
        Swal.fire({
            title: "Support details",
            html: `<div><b>Subject:</b> ${row?.comment_author_IP}</div>
             <style>a{color:#fe4e00}</style>
             <div class="mt-4">${row?.comment_content}</div>
            `,
        });
    };

    useEffect(() => {
        if (typeof supports === "object") {
            setData(supports);
            setComments(supports || []);
        }
    }, [supports]);

    //filter
    useMemo(() => {
        let fileterd = null;
        fileterd = comments?.filter((item) => {
            const name = item && item.comment_author_IP ? item.comment_author_IP : "";
            const finder = search && search?.toString().toLowerCase();
            return name.toString().toLowerCase().includes(finder);
        });
        setData(fileterd);
        return () => {
            fileterd = null;
        };
    }, [search, comments]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: any = [
        {
            sortable: true,
            name: <b className="text-uppercase">ticket id</b>,
            selector: (row: SupportResponseType) => <span>{row?.comment_author_url}</span>,
        },
        {
            name: <b className="text-uppercase">status</b>,
            selector: (row: SupportResponseType) => {
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
            selector: (row: SupportResponseType) => {
                return <span>{row?.comment_author_IP}</span>;
            },
        },
        {
            name: <b className="text-uppercase">Message</b>,
            selector: (row: SupportResponseType) => (
                <>
                    {/* <div
            style={{ width: "180px" }}
            dangerouslySetInnerHTML={{ __html: row?.comment_content }}
          ></div> */}
                    <br />
                    <div
                        className={`btn btn-primary py-1 mb-3 ${borderRound("round-full")}`}
                        onClick={() => showMessage(row)}
                    >
                        See message
                    </div>
                </>
            ),
        },
    ];

    //expnded row
    const ExpandedComponent = ({ data }: { data: SupportResponseType }) => {
        const replid = data?.children || [];
        const [message, setMessage] = useState("");
        const [loading, setLoading] = useState(false);

        const handlecommentSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const usermail = user?.usermail;
            const username = user?.username;
            const commentid = data?.comment_ID;
            if (!commentid) {
                toast.error("The support id is unable to found please try again later!");
                return false;
            }
            if (!message) {
                toast.error(`Please write something to reply!`);
                return false;
            }
            if (!username) {
                toast.error("The username is unable to locate please try again later!");
                return false;
            }
            setLoading(true);
            (async () => {
                try {
                    const _data = {
                        username,
                        email: usermail,
                        message: message,
                        comment_id: commentid,
                    };
                    const response = await axios.post(`/supports/reply`, _data);
                    const res = response.data;
                    if (res?.success) {
                        toast.success(res?.message);
                        refetchSupports();
                    } else {
                        toast.error(res?.message);
                    }
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    toast.error(errorToString(error));
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
                            {replid.map((item: SupportResponseType, k: number) => {
                                const author =
                                    item?.comment_author === user?.username ? (
                                        <b>me</b>
                                    ) : (
                                        <b className="text-capitalize">{item.comment_author}</b>
                                    );
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
                    <div className="d-flex position-relative">
                        <Textarea
                            label="Your message"
                            value={message}
                            rows={6}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={"Your reply"}
                            required={true}
                        />
                        <div className="m-6 align-self-end">
                            <div className="text-center">
                                <button
                                    disabled={loading}
                                    onClick={handlecommentSubmit}
                                    type="submit"
                                    className={`btn btn-primary w-100 fs-12 ${borderRound(
                                        "round-full"
                                    )}`}
                                >
                                    send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

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
                </table>
                <div className="d-flex position-relative">
                    <Textarea
                        label="Your message"
                        value={message}
                        rows={6}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={"Your reply"}
                        required={true}
                    />
                    <div className="m-6 align-self-end">
                        <div className="text-center">
                            <button
                                disabled={loading}
                                onClick={handlecommentSubmit}
                                type="submit"
                                className={`btn btn-primary w-100 fs-12 ${borderRound(
                                    "round-full"
                                )}`}
                            >
                                send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const rowPreDisabled = (row: SupportResponseType) => {
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
                                to={dpath("/supports/create")}
                                className={`btn btn-primary w-100 fs-12 ${borderRound(
                                    "round-full"
                                )}`}
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
                                // progressPending={loading}
                                // progressComponent={<h6>Loading...</h6>}
                                pagination
                                expandableRows
                                expandableRowDisabled={rowPreDisabled}
                                expandableRowsComponent={ExpandedComponent}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>

                    {/* END SET DATATABLE */}
                </div>
            </div>
        </div>
    );
}
