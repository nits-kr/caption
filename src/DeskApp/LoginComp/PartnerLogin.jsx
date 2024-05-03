import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  PartnersLogin,
  getVenue,
} from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const PartnerLogin = () => {
  const [type, setType] = useState("password");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const rememberMelocal = localStorage?.getItem("rememberMe");

  const [rememberMe, setRememberMe] = useState(
    rememberMelocal === "true" ? true : false
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (info) => {
    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }

    localStorage.setItem("rememberedEmail", info.email);

    const alldata = {
      email: info?.email,
      password: info?.password,
      deviceId: sessionId,
      language: "English",
      deviceOS: "web",
    };

    setLoader(true);

    const data = await PartnersLogin(alldata);

    console.log("data", data?.data?.results?.partner?.type);
    setLoader(false);

    if (data?.data?.message === "Logged in successfully") {
      if (data?.data?.results?.partner?.type === "Admin") {
        navigate("/app/partner/Dashboard");
      } else {
        if (data?.data?.results?.partner?.modules?.[0] === "Courts") {
          navigate("/app/partner/Courts");
        } else if (data?.data?.results?.partner?.modules?.[0] === "dashboard") {
          navigate("/app/partner/Dashboard");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Schedule") {
          navigate("/app/partner/Schedule");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Booking") {
          navigate("/app/partner/Booking");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Courts") {
          navigate("/app/partner/Courts");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Customers") {
          navigate("/app/partner/Customers");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Events") {
          navigate("/app/partner/Events");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Marketing") {
          navigate("/app/partner/Marketing");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Sales") {
          navigate("/app/partner/Sales");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Billings") {
          navigate("/app/partner/Billings");
        } else if (data?.data?.results?.partner?.modules?.[0] === "Staff") {
          navigate("/app/partner/Staff");
        } else if (
          data?.data?.results?.partner?.modules?.[0] === "Venue Profile"
        ) {
          navigate("/app/partner/VenueProfile");
        } else {
          navigate("*");
        }
      }
      venu();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    // if (!data.error) {
    //   // navigate("/app/partner/Dashboard");

    //   venu();
    //   // setTimeout(() => {
    //   //   window.location.reload();
    //   // }, 1000);
    // }
  };

  const typeChange = () => {
    if (type === "password") setType("text");
    else {
      setType("password");
    }
  };

  const getPasswordValue = (value) => {
    console.log(value);
    setPassword(value);
  };

  useEffect(() => {
    const rememberPreference = localStorage.getItem("rememberedEmail");
    const rememberMe = localStorage?.getItem("rememberMe");
    if (rememberPreference) {
      reset({
        email: localStorage.getItem("rememberedEmail"),
      });
    }
    if (rememberMe === true) {
      setRememberMe(true);
    }
  }, []);

  const handleRememberMe = () => {
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);
    localStorage.setItem("rememberMe", JSON.stringify(newRememberMe));
  };

  const [venue, setVenue] = useState([]);

  // useEffect(() => {
  //   venu();
  // }, []);

  const venu = async () => {
    setLoader(true);
    const { data } = await getVenue();
    if (!data.error) {
      setVenue(data?.results?.venues);
      localStorage.setItem("venueId", data?.results?.venues?.[0]?._id);
      setLoader(false);
    }
  };

  return (
    <Suspense>
      <main className="login-page">
        <div className="login-container">
          <section className="login-section">
            <div className="login-form">
              <img
                src="/resources/imgs/logo.svg"
                alt="Login logo"
                className="login-logo "
              />
              <h2 className="login-title">Log in</h2>

              <form
                className="row form-design"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group col-12">
                  <label htmlFor="email" className="input-label font-semibold">
                    Email Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User@gmail.com"
                    name="email"
                    id="email"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email address",
                      },
                    })}
                  />

                  {errors?.email && (
                    <p className="form-error mt-1">*{errors.email.message}</p>
                  )}
                </div>
                <div className="form-group col-12 position-relative">
                  <label
                    htmlFor="password"
                    className="input-label font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type={type}
                    className="form-control"
                    placeholder="**********"
                    name="password"
                    id="password"
                    {...register("password", {
                      required: true,
                      onChange: (e) => {
                        getPasswordValue(e.target.value);
                      },
                    })}
                  />

                  {password ? (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d5751eee25fb1d439c21f9bd76c5334dd34662cc7f6c0bc917367167500fa93?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      alt="Show password"
                      className={`fa eyepassword2 fa-eye${
                        type === "password" ? "" : "-slash"
                      }`}
                      onClick={() => typeChange()}
                    />
                  ) : (
                    ""
                  )}

                  {errors?.password && (
                    <p className="form-error mt-1">This field is required</p>
                  )}
                </div>

                <div className="form-group col-12">
                  <div className="remember-forgot">
                    <label className="remember-me">
                      <div className="">
                        <label htmlFor="slider" class="switchLogin">
                          <input
                            id="slider"
                            type="checkbox"
                            checked={rememberMe === true}
                            onChange={handleRememberMe}
                          />
                          <span class="sliderUser round"></span>
                        </label>
                      </div>
                      <span className="remember-label">Remember Me</span>
                    </label>
                    <Link
                      to="/app/partner/forget"
                      className="forgot-password-login"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="form-group col-12">
                  <button
                    type={loader ? "button" : "submit"}
                    className="login-button w-100"
                    style={{ cursor: loader ? "not-allowed" : "pointer" }}
                  >
                    {loader ? <Spinner /> : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </section>
          <section className="image-section d-flex justify-content-center ">
            <img
              src="/resources/imgs/loginImg.png"
              alt="Login illustration"
              className="login-image self-center"
            />
          </section>
        </div>
      </main>
    </Suspense>
  );
};

export default PartnerLogin;
