import React, { useEffect, useState } from "react";
import { DeskHead } from "../Common/DeskHead";
import DeskSidebar from "../Common/DeskSidebar";
import { useForm } from "react-hook-form";
import {
  getAdminData,
  updateProfile,
} from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
// import DeskSidebar from "./DeskSidebar";
// import { DeskHead } from "./DeskHead";

function MyProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [adminData, setAdminData] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAdminValue();
  }, []);

  const getAdminValue = async () => {
    const { data } = await getAdminData();
    if (!data.error) {
      setAdminData(data?.results?.partner);
      let defaultValues = {};
      defaultValues.email = data?.results?.partner?.email;
      defaultValues.full_name = data?.results?.partner?.name;
      defaultValues.phoneNumber = data?.results?.partner?.phone_number;
      defaultValues.gender = data?.results?.partner?.gender;
      defaultValues.role = data?.results?.partner?.role;

      reset({ ...defaultValues });
      if (data?.results?.partner?.profile_image) {
        setImageFile(data?.results?.partner?.profile_image);
      }
    }
  };

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    // for (const item in data) {
    //   formData.append(item, data[item]);
    // }

    // if (selectedFile) {
    //   formData.append("profile_image", selectedFile, selectedFile.name);
    // }
    if (data.full_name) {
      formData.append("name", data.full_name);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.gender) {
      formData.append("gender", data.gender);
    }
    if (data.role) {
      formData.append("role", data.role);
    }
    setLoader(true);
    const response = await updateProfile(formData);
    setLoader(false);
    getAdminValue();
    if (!response.data.error) {
    }
  };

  const onFileSelection = (event) => {
    console.log(event);
    let file = event.target.files[0];
    if (file && file.size < 2880) {
      toast.error("Minimum File size should be 1MB.");
      return;
    } else if (file && file.size > 5242880) {
      toast.error("File size exceeded. Max size should be 5MB.");
      return;
    } else {
      // Update the state
      console.log(file);
      setImageFile(URL.createObjectURL(file));
      setSelectedFile(file);
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
              <div className="col-10 p-3">
                <h2 className="fw-bold">My Profile</h2>

                <form
                  className="row form-design my_profile"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-group col-5">
                    <label
                      htmlFor="full_name"
                      className="input-label font-semibold"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="full_name"
                      name="full_name"
                      {...register("full_name", {
                        required: true,
                      })}
                    />
                    {errors?.full_name && (
                      <p className="form-error mt-1">This field is required</p>
                    )}
                  </div>
                  <div className="form-group col-5">
                    <label
                      htmlFor="phoneNumber"
                      className="input-label font-semibold"
                    >
                      Phone Number
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="**********"
                      name="phoneNumber"
                      id="phoneNumber"
                      {...register("phoneNumber", {
                        maxLength: {
                          value: 10,
                          message: "maximium 10 Charcarters",
                        },
                        minLength: {
                          value: 10,
                          message: "minimium 10 Charcarters",
                        },
                      })}
                    />
                    {errors.phoneNumber && (
                      <small className="errorText mx-0 fw-bold text-danger">
                        {errors.phoneNumber?.message}
                      </small>
                    )}
                  </div>
                  <div className="form-group col-5">
                    <label
                      htmlFor="email"
                      className="input-label font-semibold"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      disabled
                      name="email"
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
                  </div>
                  {/* <div className="form-group col-5">
                    <label htmlFor="role" className="input-label font-semibold">
                      Role
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Role"
                      {...register("role", {
                        // required: "This field is required",
                        pattern: {
                          value: /^[a-zA-Z0-9,]+$/,
                          message:
                            "Invalid role format (only letters, numbers, and commas allowed)",
                        },
                      })}
                    />
                    {errors?.role && (
                      <p className="form-error mt-1">{errors.role.message}</p>
                    )}
                  </div> */}

                  <div className="form-group col-5">
                    <label
                      htmlFor="gender"
                      className="input-label font-semibold"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      //   placeholder="Gender"
                      {...register("gender", {
                        required: "This field is required",
                        pattern: {
                          value: /^(Male|Female|Others)$/i,
                          message:
                            "Invalid gender format (use Male, Female, or Others)",
                        },
                      })}
                      defaultValue={"M"}
                    />
                    {errors?.gender && (
                      <p className="form-error mt-1">{errors.gender.message}</p>
                    )}
                  </div>
                  <div className="form-group col-3">
                    <button type="submit" className="login-button w-100">
                      {loader ? <Spinner /> : "Update Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
