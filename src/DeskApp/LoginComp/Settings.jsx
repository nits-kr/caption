import React, { useEffect, useState } from "react";
import { DeskHead } from "../Common/DeskHead";
import DeskSidebar from "../Common/DeskSidebar";
import { Tabs, Placeholder } from "rsuite";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import {
  changeNotificationSetting,
  changePassword,
  getAdminData,
} from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState({
    sports_venue: false,
    promotion: false,
    community: false,
    email: false,
  });
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    getAdminValue();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const getAdminValue = async () => {
    const { data } = await getAdminData();
    if (!data.error) {
      if (data?.results?.partner) {
        setDetails(data?.results?.partner);
      }
    }
  };

  const onSubmit = async (data) => {
    setLoader(true);
    if (data.password !== data.confirmpassword) {
      toast.error("Password & Confirm Password should be same");
      return;
    }

    const formData = {
      oldPassword: data?.oldPassword,
      password: data?.newPassword,
    };

    const response = await changePassword(formData);
    setLoader(false);
    if (!response?.data?.error) {
      navigate("*");
    }
  };

  const handleNotification = async (type, value) => {
    const updatedNotifications = {
      sports_venue_notification:
        type === "sports_venue" ? value : details.sports_venue_notification,
      promotion_notification:
        type === "promotion" ? value : details.promotion_notification,
      community_notification:
        type === "community" ? value : details.community_notification,
      email_notification: type === "email" ? value : details.email_notification,
    };

    setLoaders((prevLoaders) => ({ ...prevLoaders, [type]: true }));
    const res = await changeNotificationSetting(updatedNotifications);
    console.log("res", res);
    setLoaders((prevLoaders) => ({ ...prevLoaders, [type]: false }));
    if (res?.data?.message === "Notification settings updated") {
      getAdminValue();
    }
  };

  return (
    <div className="admin_main ">
      <div className="row">
        <div className="col-2">
          <DeskSidebar />
        </div>

        <div className="admin_main_inner col-10 bg-light p-0">
          <DeskHead />

          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-start bg-white">
              <div className="col-12 p-3">
                <Tabs defaultActiveKey="1">
                  <Tabs.Tab eventKey="1" title="Settings" className="fw-bold">
                    <form
                      className="profile-form"
                      action=""
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-4 m-b30">
                            <label className="form-label">
                              Old Password<span className="text-danger">*</span>{" "}
                            </label>
                            <input
                              className={classNames("form-control mb-1", {
                                "is-invalid": errors.oldPassword,
                              })}
                              type="password"
                              defaultValue=""
                              placeholder="Enter Your Old Password"
                              {...register("oldPassword", {
                                required: "Password is required*",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password must be at least 8 characters long",
                                },
                                maxLength: {
                                  value: 20,
                                  message:
                                    "Password must be maximum 20 characters long",
                                },
                                pattern: {
                                  value:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]+$/,
                                  message:
                                    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                                },
                              })}
                            />
                            {errors?.oldPassword && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors?.oldPassword?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-sm-4 m-b30">
                            <label className="form-label">
                              New Password<span className="text-danger">*</span>
                            </label>
                            <input
                              className={classNames("form-control mb-1", {
                                "is-invalid": errors.newPassword,
                              })}
                              type="password"
                              defaultValue=""
                              placeholder="Enter Your New Password"
                              {...register("newPassword", {
                                required: "New Password is required*",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password must be at least 8 characters long",
                                },
                                maxLength: {
                                  value: 20,
                                  message:
                                    "Password must be maximum 20 characters long",
                                },
                                pattern: {
                                  value:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]+$/,
                                  message:
                                    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                                },
                              })}
                            />
                            {errors?.newPassword && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors?.newPassword?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-sm-4 m-b30">
                            <label className="form-label">
                              Confirm New Password
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors.confirmPassword,
                              })}
                              type="password"
                              defaultValue=""
                              placeholder="Confirm New Password"
                              {...register("confirmPassword", {
                                required: "Please confirm your password*",
                                validate: (value) =>
                                  value === watch("newPassword", "") ||
                                  "Passwords do not match",
                              })}
                            />
                            {errors.confirmPassword && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.confirmPassword.message}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          className="btn btn-primary mt-2"
                          type={loader ? "button" : "submit"}
                          style={{ cursor: loader ? "not-allowed" : "pointer" }}
                        >
                          {loader ? (
                            <div className="icon-example-list">
                              Wait{" "}
                              <SpinnerIcon
                                pulse
                                style={{ fontSize: "1.5em" }}
                                className="ms-1"
                              />
                            </div>
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </form>
                  </Tabs.Tab>
                  <Tabs.Tab eventKey="2" title="Notification Settings">
                    <form>
                      <div className="container mt-5">
                        <div
                          className="row table_rows my-2"
                          style={{ border: "1px solid #E9EAEC" }}
                        >
                          <div className="row">
                            <div className="col-sm-1">
                              <img
                                src="/resources/imgs/world.svg"
                                alt="Duration icon"
                                className="duration-icon"
                                style={{ height: "70px", width: "70px" }}
                              />
                            </div>
                            <div className="col-sm-10 d-flex flex-column align-items-start">
                              <h4>News Sports Venue</h4>
                              <p>Receive notification for news</p>
                            </div>
                            <div className="col-sm-1 d-flex align-items-center justify-content-center">
                              {loaders.sports_venue ? (
                                <SpinnerIcon
                                  pulse
                                  style={{ fontSize: "1.5em" }}
                                  className="text-danger"
                                />
                              ) : (
                                <div className="row-container form-control bg-white">
                                  <label
                                    htmlFor="sportsNotification"
                                    className="switchUser"
                                  >
                                    <input
                                      className="d-none"
                                      checked={
                                        details?.sports_venue_notification
                                      }
                                      type="checkbox"
                                      name="sportsNotification"
                                      id="sportsNotification"
                                      onChange={(e) =>
                                        handleNotification(
                                          "sports_venue",
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <span className="sliderUser round"></span>
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="row table_rows my-3"
                          style={{ border: "1px solid #E9EAEC" }}
                        >
                          <div className="row">
                            <div className="col-sm-1">
                              <img
                                src="/resources/imgs/promotion.svg"
                                alt="Duration icon"
                                className="duration-icon"
                                style={{ height: "70px", width: "70px" }}
                              />
                            </div>
                            <div className="col-sm-10 d-flex flex-column align-items-start">
                              <h4>Promotion</h4>
                              <p>Receive notification for promotion</p>
                            </div>
                            <div className="col-sm-1 d-flex align-items-center justify-content-center">
                              {loaders.promotion ? (
                                <SpinnerIcon
                                  pulse
                                  style={{ fontSize: "1.5em" }}
                                  className="text-danger"
                                />
                              ) : (
                                <div className="row-container form-control bg-white">
                                  <label
                                    htmlFor="promotionNotification"
                                    className="switchUser"
                                  >
                                    <input
                                      className="d-none"
                                      checked={details?.promotion_notification}
                                      type="checkbox"
                                      name="promotionNotification"
                                      id="promotionNotification"
                                      onChange={(e) =>
                                        handleNotification(
                                          "promotion",
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <span className="sliderUser round"></span>
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="row table_rows my-3"
                          style={{ border: "1px solid #E9EAEC" }}
                        >
                          <div className="row">
                            <div className="col-sm-1">
                              <img
                                src="/resources/imgs/community.svg"
                                alt="Duration icon"
                                className="duration-icon"
                                style={{ height: "70px", width: "70px" }}
                              />
                            </div>
                            <div className="col-sm-10 d-flex flex-column align-items-start">
                              <h4>Community</h4>
                              <p>Receive notification for community</p>
                            </div>
                            <div className="col-sm-1 d-flex align-items-center justify-content-center">
                              {loaders.community ? (
                                <SpinnerIcon
                                  pulse
                                  style={{ fontSize: "1.5em" }}
                                  className="text-danger"
                                />
                              ) : (
                                <div className="row-container form-control bg-white">
                                  <label
                                    htmlFor="communityNotification"
                                    className="switchUser"
                                  >
                                    <input
                                      className="d-none"
                                      checked={details?.community_notification}
                                      type="checkbox"
                                      name="communityNotification"
                                      id="communityNotification"
                                      onChange={(e) =>
                                        handleNotification(
                                          "community",
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <span className="sliderUser round"></span>
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="row table_rows my-3"
                          style={{ border: "1px solid #E9EAEC" }}
                        >
                          <div className="row">
                            <div className="col-sm-1">
                              <img
                                src="/resources/imgs/image.svg"
                                alt="Duration icon"
                                className="duration-icon"
                                style={{ height: "70px", width: "70px" }}
                              />
                            </div>
                            <div className="col-sm-10 d-flex flex-column align-items-start">
                              <h4>Email</h4>
                              <p>Get notified from Email</p>
                            </div>
                            <div className="col-sm-1 d-flex align-items-center justify-content-center">
                              {loaders.email ? (
                                <SpinnerIcon
                                  pulse
                                  style={{ fontSize: "1.5em" }}
                                  className="text-danger"
                                />
                              ) : (
                                <div className="row-container form-control bg-white">
                                  <label
                                    htmlFor="emailNotification"
                                    className="switchUser"
                                  >
                                    <input
                                      className="d-none"
                                      checked={details?.email_notification}
                                      type="checkbox"
                                      name="emailNotification"
                                      id="emailNotification"
                                      onChange={(e) =>
                                        handleNotification(
                                          "email",
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <span className="sliderUser round"></span>
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Tabs.Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
