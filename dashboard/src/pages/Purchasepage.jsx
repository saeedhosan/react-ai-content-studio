import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { dbTodate, dbTotime, extartError } from "../app/helper";
import usePurchaseLog from "../app/hooks/usePurchaseLog";
import useSubscription from "../app/hooks/useSubscription";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import Loaders from "../components/loader/Loaders";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Purchasepage() {
  useTitle("Purchase History");
  const { purchase, loading, refetch } = usePurchaseLog();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { subscription, refetch: subRefresh } = useSubscription();

  useEffect(() => {
    setData(purchase);
  }, [purchase]);

  //filter
  useMemo(() => {
    let fileterd = null;
    fileterd = purchase?.filter((item, i) => {
      const name = item && item.plan_name ? item.plan_name : "";
      const finder = search && search?.toString().toLowerCase();
      return name.toString().toLowerCase().includes(finder);
    });
    setData(fileterd);
    return () => {
      fileterd = null;
    };
  }, [search, purchase]);

  const columns = [
    {
      name: <b className="text-uppercase">order id</b>,
      selector: (row) => <span>{row?.uid}</span>,
    },

    {
      name: <b className="text-uppercase">status</b>,
      selector: (row) => <span>{row?.status}</span>,
    },

    {
      name: <b className="text-uppercase">words</b>,
      selector: (row) => <span>{row?.words}</span>,
    },
    {
      name: <b className="text-uppercase">images</b>,
      selector: (row) => <span>{row?.image}</span>,
    },
    {
      name: <b className="text-uppercase">payment by</b>,
      selector: (row) => row?.payment_method,
    },
    {
      name: <b className="text-uppercase">plan name</b>,
      selector: (row) => <span>{row?.plan_name}</span>,
    },

    {
      name: <b className="text-uppercase">purchase date</b>,
      selector: (row) => (
        <>
          <div className="font-weight-bold">{dbTodate(row?.created_at)}</div>
          <div>{dbTotime(row?.created_at)}</div>
        </>
      ),
    },
  ];

  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customStyles = {};

  //exportPurchase
  const exportPurchase = () => {
    let printContents = "";
    if (document.querySelector(".rdt_Table")) {
      printContents = document.querySelector(".rdt_Table")?.innerHTML;
    }
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const cancelSubscription = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure want to cancel?",
      showCancelButton: true,
      confirmButtonText: "cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Saved!", "", "success");
        axios
          .get(settings.app_rest_url + "/subscription/cancel", {
            id: subscription?.id,
          })
          .then(({ data }) => {
            if (data?.success) {
              refetch();
              subRefresh();
              toast.success(data?.message);
            } else {
              toast.error(extartError(data));
            }
          })
          .catch((error) => {
            toast.error(extartError(error));
          });
      }
    });
  };
  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div className="card border-0 p-4">
          {/* SET DATATABLE */}

          <div className="dataTables_wrapper">
            <div className="w-100">
              <div className="col-md-9 float-left mb-6">
                <h3 className="card-title fs-16 mt-3">
                  <i className="fa-solid fa-scroll-old mr-2 text-info" />
                  All Purchase History
                </h3>
              </div>
              <div className="col-md-3 float-left mb-6">
                <div className="text-center  p-0">
                  <button
                    onClick={() => exportPurchase()}
                    className="btn btn-normal w-100 fs-14 py-1"
                  >
                    print
                  </button>
                </div>
              </div>
            </div>

            <div className="w-100">
              <div className="col-md-3 float-left mb-6">
                <div className="text-center  p-0">
                  <button
                    disabled={!subscription}
                    onClick={cancelSubscription}
                    className="btn btn-normal w-100 fs-14 py-1"
                  >
                    cancel subscription
                  </button>
                </div>
              </div>
              <div className="col-md-6 float-left"></div>
              <div className="col-md-3 float-left mb-6">
                <div
                  className="dataTables_filter"
                  style={{ position: "relative" }}
                >
                  <i
                    className="fa fa-search search-icon"
                    style={{ right: "0", top: "0" }}
                  />
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    className=""
                    style={{ padding: "3px" }}
                    placeholder="search..."
                  />
                </div>
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
