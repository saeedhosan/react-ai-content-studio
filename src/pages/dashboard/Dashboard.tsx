import { Link } from "react-router-dom";
import template_section from "../../api/content/template_section";
import useDashboard from "../../api/useDashboard";
import { borderRound } from "../../app/utils/convert";
import { avatar } from "../../app/utils/genarate";
import { getAuthSession } from "../../app/utils/storage";
import { dpath } from "../../app/utils/url";
import ChartsBox from "../../components/dashboard/ChartsBox";
import useTitle from "../../hooks/useTitle";

export default function Dashboard() {
  useTitle("Dashboard");
  const user = getAuthSession();
  const dashboard = useDashboard();

  //user alll words, images, documents and app templates are available
  const words_all = Number(dashboard?.active_plan?.words) || 0;
  const image_all = Number(dashboard?.active_plan?.image) || 0;
  const templates__all = template_section.templates.length;
  const documents__all = Number(dashboard?.created_docs) || 0;

  //user has left words and images
  const imageLeft = Number(dashboard?.subscription?.image) || 0;
  const wordsLeft = Number(dashboard?.subscription?.words) || 0;

  //user generated words, images, templates used
  const wordsGenerated = Number(dashboard?.words_used) || 0;
  const imageGenerated = Number(dashboard?.images_all) || 0;
  const templatesUseds = Number(dashboard?.template_used) || 0;

  //user metadata
  const nicename = user?.nickname || "";
  const user_imge = user?.user_img || "";

  //component return
  return (
    <div className="row">
      <ProfileTab
        images={image_all}
        imageLeft={imageLeft}
        nicename={nicename}
        gavater={user_imge}
        wordLeft={wordsLeft}
        words={words_all}
      />
      <TemplateTabs
        documents={documents__all}
        imageGenerated={imageGenerated}
        templateAll={templates__all}
        templateUsed={templatesUseds}
        wordGenerated={wordsGenerated}
      />
      <ChartsTab chartData={dashboard?.charts_data || []} />
    </div>
  );
}

type ProfileTabProps = {
  words: number;
  wordLeft: number;
  images: number;
  imageLeft: number;
  gavater: string | false | null;
  nicename: string | null;
};

function ProfileTab({
  gavater,
  words,
  wordLeft,
  images,
  imageLeft,
  nicename,
}: ProfileTabProps) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-2 col-md-12">
      <div className="card border-0 pb-6">
        <div className="card-body text-center">
          <div className="row no-gutters">
            <div className="col-md-12 col-sm-12">
              <div className="widget-user-image overflow-hidden mx-auto mt-3 mb-4">
                <img
                  alt="User Avatar"
                  className="rounded-circle"
                  src={gavater || avatar(nicename || "")}
                />
              </div>
              <h4 className="mb-2 mt-2 font-weight-800 fs-16 text-primary text-shadow">
                {nicename}
              </h4>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="d-flex w-100">
                <div className="flex w-100">
                  <h4 className="mb-3 mt-4 font-weight-800 text-primary text-shadow fs-16">
                    {wordLeft} / {words}
                  </h4>
                  <h6 className="fs-12 mb-4 text-shadow">Words Left</h6>
                </div>
                <div className="flex w-100">
                  <h4 className="mb-3 mt-4 font-weight-800 text-primary text-shadow fs-16">
                    {imageLeft} / {images}
                  </h4>
                  <h6 className="fs-12 mb-4 text-shadow">Images Left</h6>
                </div>
              </div>
              {/* <span className=" fs-10 btn btn-cancel-black w-100 mt-6">
                  <i className="fa-sharp fa-solid fa-gifts text-yellow mr-2" />
                  {dasboard?.subscription?.plan?.name}
                </span> */}
              <br />
              <Link
                to={dpath("/pricing")}
                className={
                  "btn btn-primary w-100 mt-2" + borderRound("round-full")
                }
              >
                <i className="fa-solid fa-hand-holding-box mr-2" />
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TemplateTabsProps = {
  templateAll: number;
  templateUsed: number;
  documents: number;
  wordGenerated: number;
  imageGenerated: number;
};

function TemplateTabs({
  templateAll,
  templateUsed,
  documents,
  wordGenerated,
  imageGenerated,
}: TemplateTabsProps) {
  return (
    <div className="col-xl-8 col-lg-8 col-md-12">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Documents Created{" "}
                      <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {documents}
                      <span className="text-muted fs-18">Documents</span>
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-folder-grid" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Words Generated <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {wordGenerated}{" "}
                      <span className="text-muted fs-18">words</span>
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-scroll-old" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Images Created <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {imageGenerated}{" "}
                      <span className="text-muted fs-18">images</span>
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-image-landscape" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Templates Used <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {templateUsed} / {templateAll}
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-cloud-word" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartsTab({ chartData = [] }: { chartData: any[] }) {
  return (
    <div className="col-lg-12 col-md-12 col-xm-12">
      <div className="card border-0">
        <div className="card-header border-0">
          <div className="mt-3">
            <h3 className="card-title mb-2">
              <i className="fa-solid fa-scroll-old mr-2 text-info" />
              Word Generation <span className="text-muted">(ALL)</span>
            </h3>
            <h6 className="text-muted">
              Monitor your daily word generation closely
            </h6>
          </div>
        </div>
        <div className="card-body pt-2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <ChartsBox data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
