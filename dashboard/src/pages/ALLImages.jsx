import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { dbTodate, dbTotime, extartError } from "../app/helper";
import useImages from "../app/hooks/useImages";
import useSubscription from "../app/hooks/useSubscription";
import useTitle from "../app/hooks/useTitle";
import { customSelect } from "../app/select/customStyle";
import { settings } from "../app/settings";
import Inputbox from "../components/Inputbox";
import Loaders from "../components/loader/Loaders";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function ALLImages() {
  useTitle("AI Image");
  return (
    <div className="row">
      <ImageGenerator />
      <Showimges />
    </div>
  );
}
//image generator
function ImageGenerator() {
  const { refetch } = useImages();
  const { subscription } = useSubscription();
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState({
    value: "256x256",
    label: "256x256 Small Image",
  });
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);

  useEffect(() => {
    if (subscription?.image < 1) {
      setLoading(true);
    }
  }, [subscription]);

  const clearInput = () => {
    setPrompt("");
    setTitle("");
    setLoading(false);
    setProcess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setProcess(true);
    axios
      .post(settings.app_rest_url + "/images/create", {
        prompt,
        size: size.value,
        title,
      })
      .then(({ data }) => {
        if (data?.success) {
          toast.success(data?.message);
          clearInput();
          refetch();
        } else {
          toast.error(extartError(data));
          setLoading(false);
          setProcess(false);
        }
      })
      .then((err) => {
        const _err = extartError(err);
        toast.error(_err);
        setLoading(false);
        setProcess(false);
      });
    return false;
  };

  return (
    <div className="col-lg-4 col-md-12 col-sm-12">
      <div className="card border-0" id="template-input">
        <div className="card-body p-5 pb-0">
          <div className="row">
            <div className="template-view">
              <div className="template-icon mb-2 d-flex">
                <div>
                  <i className="fa-solid fa-image green-icon" />
                </div>
                <div>
                  <h6 className="mt-1 ml-3 fs-16 number-font">
                    AI Image Generator
                  </h6>
                </div>
              </div>
              <div className="template-info">
                <p className="fs-12 text-muted mb-4">
                  Turn any of your text into sophisticated image
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div className="text-left mb-4 br-0" id="balance-status">
                  <span className="fs-11 text-muted pl-3">
                    <i className="fa-sharp fa-solid fa-bolt-lightning mr-2" />
                    Your Balance is{" "}
                    <span className="font-weight-semibold" id="balance-number">
                      {subscription ? subscription.image : 0}
                    </span>{" "}
                    Images
                  </span>
                </div>
              </div>
              <div className="col-sm-12">
                <Inputbox
                  value={prompt}
                  name={"name"}
                  onChange={(e) => setPrompt(e.target.value)}
                  label="Image name"
                  required={true}
                />
              </div>
              <div className="col-sm-12">
                <Inputbox
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Image Description"
                />
              </div>
              <div className="col-ms-12 mb-4">
                <div id="form-group">
                  <h6 className="fs-11 mb-4 font-weight-semibold">
                    Image Resolution{" "}
                    <i
                      className="ml-1 text-dark fs-12 fa-solid fa-circle-info"
                      data-tippy-content="The image resolutoin of the generated images"
                    />
                  </h6>
                  <Select
                    placeholder="Set image resolution"
                    components={{ IndicatorSeparator: null }}
                    styles={customSelect()}
                    value={size}
                    onChange={(e) => setSize(e)}
                    options={[
                      { value: "256x256", label: "256x256 Small Image" },
                      { value: "512x512", label: "512x512 Medium Image" },
                      {
                        value: "1024x1024",
                        label: "1024x1024 Large Image",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="col-ms-12 mb-4">
                <div id="form-group">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-normal w-100 fs-14"
                  >
                    {process ? "Generateing.." : "Generate Image"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Showimges() {
  const { images, refetch, loading } = useImages();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (images && typeof images === "object") setData(images);
  }, [images]);

  //filter
  useMemo(() => {
    let fileterd = null;
    fileterd = images?.name?.filter((item, i) => {
      const name = item && item.name ? item.name : "";
      const finder = search && search?.toString().toLowerCase();
      return name.toString().toLowerCase().includes(finder);
    });
    setData(fileterd);
    return () => {
      fileterd = null;
    };
  }, [search, images]);

  //delete image
  const ondelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            const _url = settings.app_rest_url + "/images/delete?id=" + id;
            const resp = await axios.post(_url);
            const data = resp.data;
            if (data?.success) {
              toast.success(data.message);
              refetch();
            } else {
              toast.error(extartError(data));
            }
          } catch (error) {
            toast.error(extartError(error));
          }
        })();
      }
    });

    return false;
  };

  //make columen

  const columns = [
    {
      name: <b className="text-uppercase">Image</b>,
      sortable: true,
      selector: (image) => {
        return (
          <div className="d-flex">
            <div className="widget-user-image-sm overflow-hidden mr-4">
              <img alt={image.name} src={image.url} />
            </div>
            <div>
              <a className="file-name font-weight-bold">{image.name}</a>
              <br />
              <span className="text-muted">{image.title}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: <b className="text-uppercase">Resolution</b>,
      sortable: true,
      selector: (image) => <span>{image.size}</span>,
    },
    {
      name: <b className="text-uppercase">created_at</b>,
      selector: (row) => {
        return (
          <>
            <span className="font-weight-bold">
              {/* <Moment format="d-m-YY" date={row?.created_at} /> */}
              {dbTodate(row?.created_at)}
            </span>
            <br />
            <span>{dbTotime(row?.created_at)}</span>
          </>
        );
      },
    },
    {
      name: <b className="text-uppercase">action</b>,
      selector: (image) => (
        <div>
          <a download={image.url} href={image.url}>
            <i
              className="fa-solid fa-cloud-arrow-down table-action-buttons edit-action-button"
              title="Download Image"
            />
          </a>
          <span className="csr-p mx-2" onClick={(e) => ondelete(e, image.id)}>
            <i
              className="fa-solid fa-trash-xmark table-action-buttons delete-action-button"
              title="Delete Image"
            />
          </span>
        </div>
      ),
    },
  ];
  return (
    <div className="col-lg-8 col-md-12 col-sm-12">
      <div className="card border-0">
        {!images ? (
          <Loaders />
        ) : (
          <div className="card-body border-0 p-4">
            {/* SET DATATABLE */}
            <div className="dataTables_wrapper">
              <div className="col-md-9 float-left">
                <h3 className="card-title fs-16 mt-3 mb-4">
                  <i className="fa-solid fa-image-landscape mr-4 text-danger fs-14" />
                  Generated Images
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
                  // selectableRows
                  // onSelectedRowsChange={handleRowSelected}
                />
              ) : (
                <Loaders />
              )}
            </div>

            {/* END SET DATATABLE */}
          </div>
        )}
      </div>
    </div>
  );
}
