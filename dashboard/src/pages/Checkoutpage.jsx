import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { extartError, formatPrice, getSession } from "../app/helper";
import usePlansByid from "../app/hooks/userPlansByid";
import useSubscription from "../app/hooks/useSubscription";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import Inputbox from "../components/Inputbox";
import Loaders from "../components/loader/Loaders";

export default function Checkoutpage() {
  useTitle("Checkout");
  const { plan_id } = useParams();
  const { plan } = usePlansByid(plan_id);
  const user = getSession("user");
  const { refetch } = useSubscription();
  //state
  const [name, setName] = useState(user?.data?.display_name);
  const [email, setEmail] = useState(user?.data?.user_email);
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();

  const amount = formatPrice(plan?.price);

  function onStripeToken(token) {
    if (!token?.id) {
      alert("stripe error");
      toast.error("stripe faild to complate");
    }
    const charge_data = {
      amount: amount,
      source: token.id,
      payment_data: token,
      plan_id: plan_id,
    };
    axios
      .post(settings.app_rest_url + "/checkout/stripe", charge_data)
      .then(({ data }) => {
        if (data?.success) {
          refetch();
          toast.success(data?.message);
        }
      })
      .catch((err) => {
        const __err = extartError(err);
        toast.error(__err.toString());
      });
  }

  function onStripeClose() {
    // sctipe closed event
  }

  function onStripeOpen() {
    // stripe open event
  }

  return (
    <div className="row">
      <div className="col-md-8 col-sm-12">
        {plan ? (
          <div className="card border-0" id="template-input">
            <div className="card-body p-5 pb-0">
              <div className="d-flex justify-content-center">
                <i className="fa-solid fa-bag-shopping text-danger mr-1" />
                <h6 className="mt-1 ml-3 fs-16 number-font text-center">
                  Checkout
                </h6>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <Inputbox
                    label="Your name"
                    value={name}
                    required={true}
                    disable={true}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Inputbox
                    label="Your Email"
                    value={email}
                    required={true}
                    disable={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Inputbox
                    label="Address"
                    value={address}
                    place={"Your address"}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Inputbox
                    label="Address 2"
                    value={address2}
                    place={"Your address"}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <h3 className="card-title fs-16 mt-3 mb-4">
                    <i className="fa-solid fa-bag-shopping text-danger mr-2" />
                    Plan Details
                  </h3>
                  {/* SET DATATABLE */}
                  <div
                    id="resultsTable_wrapper"
                    className="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-12">
                        <table id="resultsTable" className="table ">
                          <thead>
                            <tr role="row">
                              <th width="50%">Name</th>
                              <th width="50%">value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Package Name</td>
                              <td>
                                <span className="font-weight-bold">
                                  {plan?.name}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Package price</td>
                              <td>
                                <span className="font-weight-bold">
                                  {plan?.price}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Package words</td>
                              <td>
                                <span className="font-weight-bold">
                                  {plan?.words}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Package images</td>
                              <td>
                                <span className="font-weight-bold">
                                  {plan?.image}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* END SET DATATABLE */}
                  <StripeCheckout
                    name={settings.app_name}
                    description={settings.app_title}
                    image="https://images.ctfassets.net/fzn2n1nzq965/2EOOpI2mMZgHYBlbO44zWV/5a6c5d37402652c80567ec942c733a43/favicon.png?w=180&h=180"
                    // ComponentClass="div"
                    // panelLabel="Give Money"
                    amount={amount}
                    currency={settings.app_currency}
                    stripeKey={settings.app_stripe_key}
                    email={email}
                    // shippingAddress
                    // billingAddress={false}
                    allowRememberMe
                    opened={onStripeOpen}
                    token={onStripeToken}
                    closed={onStripeClose}
                    // reconfigureOnUpdate={false}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary w-100 fs-14"
                    >
                      Pay with Stripe
                    </button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loaders />
        )}
      </div>
    </div>
  );
}

export function PlanStatus({ name = "name", value = "value" }) {
  return (
    <div className="text-left mb-4 br-0">
      <span className="text-muted">{name}: </span>
      <span>{value}</span>
    </div>
  );
}
