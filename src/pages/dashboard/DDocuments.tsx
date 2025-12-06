import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import template_section from "../../api/content/template_section";
import endpoints from "../../api/endpoints";
import { DocumenteArrayResponseType, DocumentResponseType } from "../../api/ResponseType";
import useDocuments from "../../api/useDocuments";
import { dbTodate, dbTotime } from "../../app/utils/datetime";
import { temCategory } from "../../app/utils/str";
import { dpath } from "../../app/utils/url";
import { errorToString } from "../../app/utils/utils";
import Loader from "../../components/loader/Loader";
import useTitle from "../../hooks/useTitle";

export default function DDocuments() {
    useTitle("Documents");
    const documents = useDocuments();
    const [data, setData] = useState<DocumenteArrayResponseType>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (typeof documents === "object") {
            setData(documents);
        }
    }, [documents]);

    //filter
    useMemo(() => {
        if (typeof documents != "object") return false;
        let fileterd = null;
        fileterd = documents?.filter((item) => {
            const name = item && item.docs_name ? item.docs_name : "";
            const finder = search && search?.toString().toLowerCase();
            return name.toString().toLowerCase().includes(finder);
        });
        setData(fileterd || []);
        return () => {
            fileterd = null;
        };
    }, [search, documents]);

    //delete
    const onDelete = (e: React.FormEvent, id: number | string) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure want to delete?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire("Saved!", "", "success");
                axios
                    .post(endpoints.documents.delete, { id })
                    .then(({ data }) => {
                        if (data?.success) {
                            Swal.fire("deleted", "", "success");
                        } else {
                            toast.error(errorToString(data));
                        }
                    })
                    .catch((err) => toast.error(errorToString(err)));
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: any = [
        // {
        //   name: <b className="text-uppercase">id</b>,
        //   selector: (row) => row.id,
        //   sortable: true,
        // },
        {
            name: <b className="text-uppercase">document name</b>,
            sortable: true,
            selector: (row: DocumentResponseType) => {
                return (
                    <div className="d-flex">
                        <div className="mr-2">
                            <i className="fa-solid fa-message-text blog-icon" />
                        </div>
                        <div>
                            <Link to={dpath(`/archive/${row.id}`)} className="font-weight-bold">
                                {row?.docs_name}
                            </Link>
                            <br />
                            <span className="text-muted">{row?.blog_title}</span>
                            <div></div>
                        </div>
                    </div>
                );
            },
        },
        {
            sortable: true,
            name: <b className="text-uppercase">category</b>,
            selector: (row: DocumentResponseType) => (
                <span>{temCategory(row?.blog_name || "", template_section.templates)}</span>
            ),
        },
        {
            name: <b className="text-uppercase">created_at</b>,
            selector: (row: DocumentResponseType) => {
                return (
                    <>
                        <div className="font-weight-bold">{dbTodate(row?.created_at)}</div>
                        <div>{dbTotime(row?.created_at)}</div>
                    </>
                );
            },
        },
        {
            name: <b className="text-uppercase">words used</b>,
            selector: (row: DocumentResponseType) => <span> {row?.word_used}</span>,
        },
        {
            name: <b className="text-uppercase">action</b>,
            selector: (row: DocumentResponseType) => (
                <div>
                    <Link to={dpath(`/archive/${row.id}`)} className="mx-2 csr-p">
                        <i
                            className="fa-solid fa-file-lines icon-btn text-success"
                            title="View Document"
                        />
                    </Link>
                    <a
                        className="deleteResultButton mx-2 csr-p"
                        onClick={(e) => onDelete(e, row.id)}
                    >
                        <i
                            className="fa-solid fa-trash-xmark icon-btn text-danger"
                            title="Delete Document"
                        />
                    </a>
                </div>
            ),
        },
    ];

    //hangle selected
    // const handleRowSelected = useCallback((state) => {
    //   setSelectedData(state.selectedRows);
    // }, []);

    //  Internally, customStyles will deep merges your customStyles with the default styling.
    const customStyles = {
        rows: {
            style: {},
        },
        headCells: {
            style: {},
        },
        cells: {
            style: {},
        },
    };

    return (
        <div className="row">
            <div className="col-md-12 col-sm-12">
                <div className="card border-0 p-4">
                    {/* SET DATATABLE */}
                    <div className="dataTables_wrapper">
                        <div className="col-md-9 float-left">
                            <h3 className="card-title fs-16 mt-3 mb-4">
                                <i className="fa-solid fa-scroll-old mr-2 text-info" />
                                All Documents
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
                                customStyles={customStyles}
                                columns={columns}
                                data={data}
                                // progressPending={loading}
                                // progressComponent={<h6>Loading...</h6>}
                                pagination
                                // selectableRows
                                // onSelectedRowsChange={handleRowSelected}
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
