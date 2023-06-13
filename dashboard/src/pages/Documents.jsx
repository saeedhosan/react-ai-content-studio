import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { dbTodate, dbTotime, extartError, temCategory } from "../app/helper";
import useDocuments from "../app/hooks/useDocuments";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import Loaders from "../components/loader/Loaders";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Documents() {
  useTitle("Documents");
  const { documents, loading, refetch } = useDocuments();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    if (documents && typeof documents === "object") setData(documents);
  }, [documents]);

  //filter
  useMemo(() => {
    let fileterd = null;
    fileterd = documents?.filter((item, i) => {
      const name = item && item.blog_title ? item.blog_title : "";
      const finder = search && search?.toString().toLowerCase();
      return name.toString().toLowerCase().includes(finder);
    });
    setData(fileterd);
    return () => {
      fileterd = null;
    };
  }, [search, documents]);

  //delete
  const onDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Saved!", "", "success");
        axios
          .post(settings.app_rest_url + "/documents/delete", { id })
          .then(({ data }) => {
            if (data?.success) {
              Swal.fire("deleted", "", "success");
              refetch();
            } else {
              toast.error(extartError(data));
            }
          })
          .catch((err) => toast.error(extartError(err)));
      }
    });
  };

  const columns = [
    // {
    //   name: <b className="text-uppercase">id</b>,
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: <b className="text-uppercase">document name</b>,
      sortable: true,
      selector: (row) => {
        return (
          <div className="d-flex">
            <div className="mr-2">
              <i className="fa-solid fa-message-text blog-icon" />
            </div>
            <div>
              <Link to={`/archive/${row.id}`} className="font-weight-bold">
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
      selector: (row) => <span>{temCategory(row?.blog_name)}</span>,
    },
    {
      name: <b className="text-uppercase">created_at</b>,
      selector: (row) => {
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
      selector: (row) => <span> {row?.word_used}</span>,
    },
    {
      name: <b className="text-uppercase">action</b>,
      selector: (row) => (
        <div>
          <Link to={`/archive/${row.id}`} className="mx-2 csr-p">
            <i
              className="fa-solid fa-file-lines table-action-buttons edit-action-button"
              title="View Document"
            />
          </Link>
          <a
            className="deleteResultButton mx-2 csr-p"
            onClick={(e) => onDelete(e, row.id)}
          >
            <i
              className="fa-solid fa-trash-xmark table-action-buttons delete-action-button"
              title="Delete Document"
            />
          </a>
        </div>
      ),
    },
  ];

  //hangle selected
  const handleRowSelected = useCallback((state) => {
    setSelectedData(state.selectedRows);
  }, []);

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
                progressPending={loading}
                progressComponent={<h6>Loading...</h6>}
                pagination
                // selectableRows
                // onSelectedRowsChange={handleRowSelected}
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
