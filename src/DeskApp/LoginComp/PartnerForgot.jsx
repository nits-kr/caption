import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import { Spinner } from "react-bootstrap";
const PartnerForgot = () => {
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    setLoader(true);

    const response = await forgotPassword(data);
    console.log("response", response.data.error);
    if (!response.data.error) {
      setLoader(false);

      navigate("/app/partner/otp", { state: { email: data.email } });
    }
  };
  return (
    <main className="forgot-password">
      <section className="forgot-password-container">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7ddf14ff6662a4c96abeb28bd6851eb349935d3c7d4e0e2012a9f82ea3e46c0?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
          className="forgot-password-image"
          alt="Forgot password illustration"
        />
        <h1 className="forgot-password-title">Forgot Password?</h1>
        <form
          className="forgot-password-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="input-label">
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
            <p className="form-error mt-1">{errors.email.message}</p>
          )}
          <button
            type={loader ? "button" : "submit"}
            className="send-code-button"
            style={{ cursor: loader ? "not-allowed" : "pointer" }}
          >
            {loader ? <Spinner /> : "Send Code"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default PartnerForgot;
