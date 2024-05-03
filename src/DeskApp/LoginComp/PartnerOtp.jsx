import React, { useEffect, useState } from "react";
import {
  forgotPassword,
  verifyOTP,
} from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import OtpTimer from "otp-timer";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function OtpInput() {
  return (
    <div className="otp-input-container">
      <div className="otp-input" />
      <div className="otp-input" />
      <div className="otp-input" />
      <div className="otp-input" />
    </div>
  );
}

const PartnerOtp = () => {
  const [loader, setLoader] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const otp6 = useWatch({ control, name: "otp6" });

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (otp6 && otp6.length > 0) {
      handleSubmit(onSubmit)();
    }
  }, [otp6, handleSubmit]);

  const onSubmit = async (data) => {
    let otp = Object.values(data);
    otp = otp.join("");

    console.log("otp", otp);

    const formData = {
      email: location.state.email,
      otp: otp,
    };

    setLoader(true);
    const response = await verifyOTP(formData);
    if (!response?.data?.error) {
      navigate("/app/partner/reset", {
        state: { email: location.state.email },
      });
      setLoader(false);
    }
  };
  const moveOnMax = (event, field, nextField) => {
    event = event || window.event;
    if (event.keyCode != 9) {
      if (field.value.length >= field.maxLength) {
        nextField.focus();
      }
    }
  };

  const resendOtp = async () => {
    const response = await forgotPassword({ email: location.state.email });
    if (!response.data.error) {
    }
  };

  const handleVerify = () => {
    if (!otp6 || otp6.length === 0) {
      toast.error("Please enter OTP");
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

        {/* <OtpInput /> */}
        <div className="col-12">
          <form className="row form-design">
            <div className="form-group col-12 otp_input d-flex">
              {/* <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxlength="1"
                placeholder="2"
                name="otp1"
                id="otp1"
                {...register("otp1", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp1"),
                    document.getElementById("otp2")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxlength="1"
                placeholder="4"
                name="otp2"
                id="otp2"
                {...register("otp2", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp2"),
                    document.getElementById("otp3")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxlength="1"
                placeholder="6"
                name="otp3"
                id="otp3"
                {...register("otp3", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp3"),
                    document.getElementById("otp4")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxlength="1"
                placeholder="8"
                name="otp4"
                id="otp4"
                {...register("otp4", { required: true })}
              /> */}
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxLength={1}
                placeholder="1"
                name="otp1"
                id="otp1"
                {...register("otp1", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp1"),
                    document.getElementById("otp2")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxLength={1}
                placeholder="2"
                name="otp2"
                id="otp2"
                {...register("otp2", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp2"),
                    document.getElementById("otp3")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxLength={1}
                placeholder="3"
                name="otp3"
                id="otp3"
                {...register("otp3", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp3"),
                    document.getElementById("otp4")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxLength={1}
                placeholder="4"
                name="otp4"
                id="otp4"
                {...register("otp4", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp4"),
                    document.getElementById("otp5")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxLength={1}
                placeholder="5"
                name="otp5"
                id="otp5"
                {...register("otp5", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp5"),
                    document.getElementById("otp6")
                  );
                }}
              />
              <input
                type="number"
                className="form-control me-3 px-1 text-center"
                maxLength={1}
                placeholder="6"
                name="otp6"
                id="otp6"
                {...register("otp6", { required: true })}
              />
            </div>
            <div className="form-group col-12 text-center mt-2">
              <OtpTimer
                seconds={30}
                minutes={0}
                style={{ marginTop: "-100px" }}
                resend={() => resendOtp()}
              />
            </div>
          </form>
        </div>
        <button className="verify-button" onClick={() => handleVerify()}>
          {loader ? <Spinner /> : "Verify"}{" "}
        </button>
      </section>
    </main>
  );
};

export default PartnerOtp;
