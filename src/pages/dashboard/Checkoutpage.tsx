import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { toast } from "react-toastify";
import { PlanResponseType } from "../../api/ResponseType";
import usePlans from "../../api/usePlans";
import settings from "../../app/settings";
import { borderRound, formatPrice } from "../../app/utils/convert";
import { getAuthSession } from "../../app/utils/storage";
import { errorToString } from "../../app/utils/utils";
import Inputbox from "../../components/Inputbox";
import Loader from "../../components/loader/Loader";
import useTitle from "../../hooks/useTitle";

export default function Checkoutpage() {
    useTitle("Checkout");
    const { plan_id } = useParams();
    const plans = usePlans();
    const user = getAuthSession();

    //state
    const [plan, setPlan] = useState<PlanResponseType | null>(null);
    const [name, setName] = useState(user?.nickname);
    const [email, setEmail] = useState(user?.usermail);
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");

    useEffect(() => {
        if (plans) {
            const find = plans.find((f) => Number(f.id) === Number(plan_id));
            setPlan(find || null);
        }
    }, [plans, plan_id]);

    const amount = formatPrice(plan?.price || 0);

    function onStripeToken(token: Token) {
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
            .post("/checkout/stripe", charge_data)
            .then(({ data }) => {
                if (data?.success) {
                    toast.success(data?.message);
                }
            })
            .catch((err) => {
                toast.error(errorToString(err));
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
                                <i className="fa-solid fa-bag-shopping text-success mr-1" />
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
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Inputbox
                                        label="Your Email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Inputbox
                                        label="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value || "")}
                                    />
                                    <Inputbox
                                        label="Address 2"
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <h3 className="card-title fs-16 mt-3 mb-4">
                                        <i className="fa-solid fa-bag-shopping text-success mr-2" />
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
                                                            <th
                                                                style={{
                                                                    width: "50%",
                                                                }}
                                                            >
                                                                Name
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: "50%",
                                                                }}
                                                            >
                                                                value
                                                            </th>
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
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    <StripeCheckout
                                        alipay
                                        bitcoin
                                        name={settings.app_name}
                                        description={settings.app_title}
                                        image="https://images.ctfassets.net/fzn2n1nzq965/2EOOpI2mMZgHYBlbO44zWV/5a6c5d37402652c80567ec942c733a43/favicon.png?w=180&h=180"
                                        // ComponentClass="div"
                                        // panelLabel="Give Money"
                                        amount={amount}
                                        currency={settings.app_currency}
                                        stripeKey={import.meta.env.VITE_APP_STRIPE_KEY || "no_key"}
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
                                            className={`btn btn-primary w-100 fs-12 ${borderRound(
                                                "round-full"
                                            )}`}
                                        >
                                            Pay with Stripe
                                        </button>
                                    </StripeCheckout>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
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
