import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useDashboard from "../../api/useDashboard";
import { UserResponseType } from "../../api/ResponseType";
import { borderRound } from "../../app/utils/convert";
import { avatar } from "../../app/utils/genarate";
import { getAuthSession, setAuthSession } from "../../app/utils/storage";
import useTitle from "../../hooks/useTitle";
import Inputbox from "../../components/Inputbox";

type ProfileForm = {
  nickname: string;
  username: string;
  usermail: string;
  user_img: string;
};

export default function Profile() {
  useTitle("Profile");
  const dashboard = useDashboard();
  const [user, setUser] = useState<UserResponseType | null>(getAuthSession());
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    nickname: user?.nickname || "",
    username: user?.username || "",
    usermail: user?.usermail || "",
    user_img: user?.user_img ? String(user.user_img) : "",
  });

  useEffect(() => {
    setForm({
      nickname: user?.nickname || "",
      username: user?.username || "",
      usermail: user?.usermail || "",
      user_img: user?.user_img ? String(user.user_img) : "",
    });
  }, [user?.user__id, user?.user_jwt, user?.nickname, user?.username, user?.usermail, user?.user_img]);

  const previewAvatar = useMemo(
    () => form.user_img?.trim() || avatar(form.nickname || user?.username || "user"),
    [form.user_img, form.nickname, user?.username]
  );

  const handleChange =
    (key: keyof ProfileForm) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to sign in to update your profile.");
      return;
    }
    if (!form.nickname.trim()) {
      toast.error("Display name is required.");
      return;
    }
    if (!form.usermail.trim()) {
      toast.error("Email is required.");
      return;
    }
    setSaving(true);
    const updated: UserResponseType = {
      ...user,
      nickname: form.nickname.trim(),
      username: form.username.trim() || user.username,
      usermail: form.usermail.trim(),
      user_img: form.user_img.trim() || null,
    };
    setAuthSession(updated);
    setUser(updated);
    toast.success("Profile updated.");
    setSaving(false);
  };

  const handleReset = () => {
    setForm({
      nickname: user?.nickname || "",
      username: user?.username || "",
      usermail: user?.usermail || "",
      user_img: user?.user_img ? String(user.user_img) : "",
    });
  };

  const activePlan = dashboard?.active_plan;
  const subscription = dashboard?.subscription;

  return (
    <div className="row">
      <div className="col-xl-4 col-lg-4 col-md-12">
        <div className="card border-0 pb-5">
          <div className="card-body text-center">
            <div className="widget-user-image overflow-hidden mx-auto mt-3 mb-4">
              <img alt="User Avatar" className="rounded-circle" src={previewAvatar} />
            </div>
            <h4 className="mb-1 font-weight-800 fs-16 text-primary text-shadow">
              {form.nickname || "Your name"}
            </h4>
            <p className="text-muted fs-12 mb-1">{form.username || "username"}</p>
            <p className="text-muted fs-12">{form.usermail || "email not set"}</p>

            <div className="mt-4">
              <span className={`badge badge-primary px-4 py-2 ${borderRound("round-full")}`}>
                {activePlan?.name || "No active plan"}
              </span>
            </div>

            <div className="row mt-5">
              <div className="col-6 text-center">
                <p className="fs-12 mb-1 text-muted">Words left</p>
                <h5 className="mb-0 font-weight-800">
                  {subscription?.words ?? 0} / {activePlan?.words ?? 0}
                </h5>
              </div>
              <div className="col-6 text-center">
                <p className="fs-12 mb-1 text-muted">Images left</p>
                <h5 className="mb-0 font-weight-800">
                  {subscription?.image ?? 0} / {activePlan?.image ?? 0}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 col-lg-8 col-md-12">
        <form onSubmit={handleSave}>
          <div className="card border-0">
            <div className="card-header border-0">
              <h3 className="card-title mb-0">
                <i className="fa-solid fa-id-badge mr-2 text-info" />
                Account Details
              </h3>
              <p className="text-muted mb-0 fs-12">
                Update the basics of your profile. Changes are stored in your current session.
              </p>
            </div>
            <div className="card-body pt-2">
              <div className="row">
                <div className="col-md-6">
                  <Inputbox
                    label="Display name"
                    name="nickname"
                    required
                    value={form.nickname}
                    onChange={handleChange("nickname")}
                  />
                </div>
                <div className="col-md-6">
                  <Inputbox
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange("username")}
                  />
                </div>
                <div className="col-md-6">
                  <Inputbox
                    label="Email"
                    name="usermail"
                    type="email"
                    required
                    value={form.usermail}
                    onChange={handleChange("usermail")}
                  />
                </div>
                <div className="col-md-6">
                  <Inputbox
                    label="Avatar URL"
                    name="user_img"
                    value={form.user_img}
                    onChange={handleChange("user_img")}
                    placeholder="https://"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`btn btn-cancel-black mr-2 ${borderRound("round-full")}`}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`btn btn-primary ${borderRound("round-full")}`}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
