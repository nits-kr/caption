import React, { useState } from "react";
import { updatePassword } from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import { Form, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PartnerReset = () => {
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error("Password & Confirm Password should be same");
      return;
    }
    console.log(data);

    const formData = {
      email: location.state.email,
      password: data.password,
    };

    const response = await updatePassword(formData);
    if (!response?.data?.error) {
      navigate("*");
    }
  };

  const typeChange = () => {
    if (type === "password") setType("text");
    else {
      setType("password");
    }
  };
  const typeChange2 = () => {
    if (type2 === "password") setType2("text");
    else {
      setType2("password");
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
        <h1 className="forgot-password-title">Create New Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="password1" className="input-label font-semibold">
              New Password
            </label>
            <input
              type={type}
              className="form-control"
              placeholder="**********"
              name="password"
              id="password"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters",
                },
              })}
            />
            <i
              className={`fa eyepassword2 fa-eye${
                type === "password" ? "" : "-slash"
              }`}
              onClick={() => typeChange()}
            ></i>
            {errors?.password && (
              <span className="form-error mt-1">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <label htmlFor="password2" className="input-label font-semibold">
            Confirm Password
          </label>
          <input
            type={type2}
            className="form-control"
            placeholder="**********"
            name="confirmpassword"
            id="confirmpassword"
            {...register("confirmpassword", {
              required: "This field is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters",
              },
            })}
          />
          <i
            className={`fa eyepassword2 fa-eye${
              type2 === "password" ? "" : "-slash"
            }`}
            onClick={() => typeChange2()}
          ></i>

          {errors?.confirmpassword && (
            <p className="form-error mt-1">
              {errors?.confirmpassword?.message}
            </p>
          )}

          <button type="submit" className="verify-button w-100">
            Update
          </button>
        </form>
      </section>
    </main>
  );
};

export default PartnerReset;
