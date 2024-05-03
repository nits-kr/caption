import React, { useEffect, useState, KeyboardEventHandler } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import Chart from "react-apexcharts";
import {
  getStaff,
  getVenue,
  updateVenue,
  venuDetails,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import FadeSpinnerss from "../../allspinners/FadeSpinnerss";
import FadeSpinners from "../../allspinners/FadeSpinners";
import FadeSpinner from "../../allspinners/FadeSpinner";
import { useForm } from "react-hook-form";
import { Button, Modal, Placeholder } from "rsuite";
import classNames from "classnames";
import { Spinner } from "react-bootstrap";
import { default as ReactSelect } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from "react-select/creatable";
import { isArray } from "@ant-design/plots/es/core/utils";
import { Link } from "react-router-dom";
import Star from "../ratings/Star";
import LocationPickerExample from "./LocationPickerExample";
import CustomMultiSelect from "./CustomMultiSelect";

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

function Venue() {
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [venue, setVenue] = useState([]);
  const [venuDetailss, setVenueDetailss] = useState("");
  const [open, setOpen] = React.useState(false);

  const [selectEditOptions1, setSelectEditOptions1] = useState([]);
  const [selectEditOptions2, setSelectEditOptions2] = useState([]);
  const [selectEditOptions3, setSelectEditOptions3] = useState([]);
  const [selectEditOptions4, setSelectEditOptions4] = useState([]);

  const [formData, setFormData] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [imageSections, setImageSections] = useState([]);

  const defaultAmenities = [
    { value: "Free wifi", label: "Free wifi" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Parking Available", label: "Parking Available" },
    { value: "Lighting", label: "Lighting" },
    { value: "Air Conditioning", label: "Air Conditioning" },
  ];
  const defaultFacilities = [
    { value: "Renting Equipment", label: "Renting Equipment" },
    { value: "Renting Shoes", label: "Renting Shoes" },
  ];

  const [valueAmenities, setValueAmenities] = useState(defaultAmenities);
  const [inputValueAmenities, setInputValueAmenities] = useState("");

  const [inputValueFacilities, setInputValueFacilities] = useState("");
  const [valueFacilities, setValueFacilities] = useState(defaultFacilities);

  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);
  console.log(longitude);
  console.log(latitude);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  console.log("venuDetailss", venuDetailss);
  useEffect(() => {
    venu();
  }, []);
  useEffect(() => {
    if (venue?.[0]?._id) {
      venuDetail(venue?.[0]?._id);
    }
  }, [venue?.[0]?._id]);

  const venu = async () => {
    setLoader(true);
    const { data } = await getVenue();
    if (!data.error) {
      setVenue(data?.results?.venues);
      setLoader(false);
    }
  };
  const venueId = localStorage?.getItem("venueId");

  const venuDetail = async (id) => {
    setLoaders(true);
    const { data } = await venuDetails((id = venueId));
    if (!data?.error) {
      setVenueDetailss(data?.results?.venue);
      const venueData = data?.results?.venue;
      setLoaders(false);

      reset({
        description: venueData.description_en,
        sport: venueData.sports?.[0]?.name_en,
        roofing: venueData.roofing,
        flooring: venueData.flooring,
        rprice: venueData.price,
        name_en: venueData.name_en,
        location: `${venueData?.location?.city_en}, ${
          venueData?.location?.country_en || ""
        }`,
      });

      let types = [];
      let typess = [];
      let typesss = [];
      let typessss = [];
      venueData?.trainers?.map((itm) => {
        types.push({
          value: itm?._id,
          label: (
            <div className="imageShow">
              <img
                loading="lazy"
                src={itm?.profile_image || "/resources/imgs/dum2.svg"}
                height="30px"
                width="30px"
                style={{
                  borderRadius: "50%",
                  overflow: "visible",
                  marginRight: "5px",
                }}
              />
              {`${itm?.name} `}
            </div>
          ),
        });
      });
      setSelectEditOptions1({
        optionSelected: types,
      });
      venueData?.amenities?.map((itm) => {
        typess.push({
          value: itm,
          label: itm,
        });
      });
      setSelectEditOptions2({
        optionSelected: typess,
      });
      venueData?.facilities?.map((itm) => {
        typesss.push({
          value: itm,
          label: itm,
        });
      });
      setSelectEditOptions3({
        optionSelected: typesss,
      });

      venueData?.manager?.map((itm) => {
        typessss.push({
          value: itm?._id,
          label: (
            <div className="imageShow">
              <img
                loading="lazy"
                src={itm?.profile_image || "/resources/imgs/dum2.svg"}
                height="30px"
                width="30px"
                style={{
                  borderRadius: "50%",
                  overflow: "visible",
                  marginRight: "5px",
                }}
              />
              {`${itm?.name} `}
            </div>
          ),
        });
      });
      setSelectEditOptions4({
        optionSelected: typessss,
      });
      let amenitiesOptions = [];
      let facilitiesOptions = [];

      venueData?.amenities?.map((itm) => {
        amenitiesOptions.push({ value: itm, label: itm });
      });
      // setValueAmenities(amenitiesOptions);

      venueData?.facilities?.map((itm) => {
        facilitiesOptions.push({ value: itm, label: itm });
      });
      // setValueFacilities(facilitiesOptions);
    }
  };

  useEffect(() => {
    staffDetail();
  }, []);

  const staffDetail = async () => {
    setLoader(true);
    try {
      const { data } = await getStaff({
        page: 1,
        pageSize: 10,
        active: false,
      });

      if (!data.error) {
        setLoader(false);

        const staffData = data?.results?.subAdmins || [];
        const staffOptions = staffData?.map((staff) => ({
          value: staff?._id,
          label: (
            <div className="imageShow">
              <img
                loading="lazy"
                src={staff?.profile_image || "/resources/imgs/dum2.svg"}
                height="30px"
                width="30px"
                style={{
                  borderRadius: "50%",
                  overflow: "visible",
                  marginRight: "5px",
                }}
              />
              {`${staff?.name} (${staff?.email})`}
            </div>
          ),
        }));

        setOptions(staffOptions);
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
      setLoader(false);
    }
  };

  const [options, setOptions] = useState([]);

  const handleChangeEdit1 = (selected) => {
    setSelectEditOptions1({
      optionSelected: selected,
    });
  };
  const handleChangeEdit2 = (selected) => {
    setSelectEditOptions2({
      optionSelected: selected,
    });
  };
  const handleChangeEdit3 = (selected) => {
    setSelectEditOptions3({
      optionSelected: selected,
    });
  };

  const handleChangeEdit4 = (selected) => {
    setSelectEditOptions4({
      optionSelected: selected,
    });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    let imgUrls = [];
    let imgSections = [];
    for (const file of files) {
      imgUrls.push(URL.createObjectURL(file));
      imgSections.push(file);
    }
    setSelectedImage([...selectedImage, ...imgUrls]);
    setImageSections([...imageSections, ...imgSections]);
  };

  const handleRemove = (e, imgIndex) => {
    e.preventDefault();
    const filteredImages = selectedImage.filter(
      (img, index) => index !== imgIndex
    );
    setSelectedImage(filteredImages);
  };

  const onSubmit = async (data) => {
    const alldata = new FormData();

    // if (formData.uploadImage) {
    //   alldata.append("image", formData.uploadImage);
    // }

    const locationData = {
      latitude: latitude,
      longitude: longitude,
      city_en: "Thessaloniki",
      city_gr: "Θεσσαλονίκη",
      country_en: "Greece",
      country_gr: "Ελλάδα",
    };

    alldata.append("location", JSON.stringify(locationData));

    for (let i = 0; i < imageSections.length; i++) {
      alldata.append("image", imageSections[i]);
    }

    alldata.append("venueId", venueId);

    if (data.name_en) {
      alldata.append("name_en", data.name_en);
    }

    if (data.name_en) {
      alldata.append("name_gr", data.name_en);
    }

    if (data.description) {
      alldata.append("description_en", data.description);
    }

    if (data.description_gr) {
      alldata.append("description_gr", data.description_gr);
    }

    if (data.flooring) {
      alldata.append("flooring", data.flooring);
    }

    if (data.roofing) {
      alldata.append("roofing", data.roofing);
    }

    if (data.rprice) {
      alldata.append("price", data.rprice);
    }

    const trainersSelected = (selectEditOptions1.optionSelected || []).map(
      (item) => item?.value
    );
    alldata.append("trainers", JSON.stringify(trainersSelected));

    const managerIdSelected = (selectEditOptions4.optionSelected || []).map(
      (item) => item?.value
    );
    alldata.append("managerId", JSON.stringify(managerIdSelected));

    const amenitiesSelected = (selectEditOptions2.optionSelected || []).map(
      (item) => item?.value
    );
    alldata.append("amenities", JSON.stringify(amenitiesSelected));
    const facilitiesSelected = (selectEditOptions3.optionSelected || []).map(
      (item) => item?.value
    );
    alldata.append("facilities", JSON.stringify(facilitiesSelected));

    setLoaderss(true);

    const { datas } = await updateVenue(alldata);
    if (!datas?.error) {
      setLoaderss(false);
      venuDetail();
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleKeyDownAmenities = (event) => {
    if (!inputValueAmenities) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValueAmenities((prev) => [
          ...prev,
          createOption(inputValueAmenities),
        ]);
        setInputValueAmenities("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleKeyDownFacilities = (event) => {
    if (!inputValueFacilities) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValueFacilities((prev) => [
          ...prev,
          createOption(inputValueFacilities),
        ]);
        setInputValueFacilities("");
        event.preventDefault();
        break;
      default:
        break;
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
            <div className="row dashboard_part justify-content-center ">
              <div className="col-12">
                {loaders ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <FadeSpinner />
                  </div>
                ) : (
                  <>
                    <div class="venue_container row">
                      {venuDetailss?.image?.map((ite, ind) => {
                        return (
                          <div className="col-6 p-0" key={ind}>
                            <img
                              loading="lazy"
                              src={ite || "/resources/imgs/dum2.svg"}
                              alt="Product"
                              class="venue-image1"
                            />
                          </div>
                        );
                      })}
                      {/* <div className="col-7">
                    <img
                      src="/resources/imgs/dum2.svg"
                      alt="Product"
                      class="venue-image1"
                    />
                  </div>
                  <div className="col-5">
                    <div className="row">
                      <div className="col-12">
                        <img
                          src="/resources/imgs/dum3.svg"
                          alt="Product"
                          class="venue-image2"
                        />
                      </div>
                      <div className="col-6">
                        <img
                          src="/resources/imgs/dum4.svg"
                          alt="Product"
                          class="venue-image3"
                        />
                      </div>
                      <div className="col-6">
                        <img
                          src="/resources/imgs/dum5.svg"
                          alt="Product"
                          class="venue-image3"
                        />
                      </div>
                    </div>
                  </div> */}
                      <div className="venue_bottom_nav">
                        <label className="active">Overview</label>
                        <label>Reviews</label>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-9 px-0">
                        <h1 className="mx-2">{venuDetailss?.name_en || ""} </h1>
                        <div class="review-rating">
                          <Star
                            rating={venuDetailss?.rating || 0}
                            totalRating={venuDetailss?.totalRating}
                          />
                          {/* <img
                            src="/resources/imgs/star.svg"
                            alt="Star icon"
                            class="star-icon"
                          />
                          <img
                            src="/resources/imgs/star.svg"
                            alt="Star icon"
                            class="star-icon"
                          />
                          <img
                            src="/resources/imgs/star.svg"
                            alt="Star icon"
                            class="star-icon"
                          />
                          <img
                            src="/resources/imgs/star.svg"
                            alt="Star icon"
                            class="star-icon"
                          />
                          <img
                            src="/resources/imgs/star.svg"
                            alt="Star icon"
                            class="star-icon"
                          /> */}
                          <span>
                            {venuDetailss?.rating || 0} (1200 Reviews)
                          </span>
                        </div>

                        <div className="location_address">
                          <img
                            src="/resources/imgs/location.svg"
                            alt="Star icon"
                            class="gps-icon"
                          />
                          <span>
                            {venuDetailss?.location?.city_en},{" "}
                            {venuDetailss?.location?.country_en || ""}
                          </span>
                        </div>
                      </div>
                      <div className="col-3 mt-3 ">
                        <article class="marketSide_card2">
                          <div className="d-flex justify-content-start">
                            <h3 class="">Manager</h3>
                          </div>
                          <div className="row">
                            <div className="col-12 mt-3">
                              {venuDetailss?.manager?.map((ite, ind) => {
                                return (
                                  <article class="manager-card mb-2" key={ind}>
                                    <img
                                      src={
                                        ite?.profile_image ||
                                        "/resources/imgs/dummy.svg"
                                      }
                                      alt="Trainer avatar"
                                      class="trainer-avatar rounded-circle"
                                    />
                                    <div class="d-flex justify-content-between  w-100 ">
                                      <h5 class="manager-name">
                                        {ite?.name || "..."}{" "}
                                      </h5>
                                      {/* <img
                                        src="/resources/imgs/arrowDown.svg"
                                        alt="Star icon"
                                        class=""
                                      /> */}
                                    </div>
                                  </article>
                                );
                              })}
                            </div>
                          </div>
                        </article>
                      </div>
                      <div className="col-9 venue_description">
                        <label>Description of sports venue</label>
                        <p>{venuDetailss?.description_en || ""}</p>

                        <div class="show-more-divider mt-4 mb-4"></div>

                        <div className=" py-2 pb-2">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <img
                                src="/resources/imgs/venueIcon.svg"
                                alt="Trainer avatar"
                                class="trainer-avatar"
                              />
                              <section class="sport-venue-container">
                                <h2 class="sport-venue-category">
                                  Sport Venue Category
                                </h2>
                                <small class="sport-venue-description">
                                  Lorem Ipsum
                                </small>
                              </section>
                            </div>
                            <div className="d-flex">
                              <div className="d-flex  padel_box mx-2">
                                <h4>Sports:</h4>
                                <span class="padel-tag">
                                  {venuDetailss?.sports?.[0]?.name_en || "..."}{" "}
                                </span>
                              </div>
                              <div className="d-flex  padel_box mx-2">
                                <h4>Roofing:</h4>
                                <span class="padel-tag">
                                  {" "}
                                  {venuDetailss?.roofing || ""}
                                </span>
                              </div>
                              <div className="d-flex  padel_box mx-2">
                                <h4>Flooring:</h4>
                                <span class="padel-tag">
                                  {venuDetailss?.flooring || ""}{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="show-more-divider mt-4 mb-4"></div>

                        <div>
                          <h2 class="sport-venue-category">Venue Amenities</h2>

                          {venuDetailss && (
                            <div className="row">
                              {venuDetailss.amenities &&
                              venuDetailss.amenities.length > 0 ? (
                                venuDetailss.amenities.map((amenity, index) => (
                                  <div className="col-4 px-0 mt-2" key={index}>
                                    <div class="lighting-container">
                                      {amenity === "Free wifi" && (
                                        <img
                                          src="/resources/imgs/wifi.svg"
                                          alt="WiFi icon"
                                          class="lighting-icon"
                                        />
                                      )}
                                      {amenity === "Swimming Pool" && (
                                        <img
                                          src="/resources/imgs/pool.svg"
                                          alt="Swimming pool icon"
                                          class="lighting-icon"
                                        />
                                      )}
                                      {amenity === "Lighting" && (
                                        <img
                                          src="/resources/imgs/light.svg"
                                          alt="Lighting icon"
                                          class="lighting-icon"
                                        />
                                      )}
                                      {amenity === "Parking Available" && (
                                        <img
                                          src="/resources/imgs/rent.svg"
                                          alt="Swimming pool icon"
                                          class="lighting-icon"
                                        />
                                      )}
                                      {amenity === "Air Conditioning" && (
                                        <img
                                          src="/resources/imgs/ac.svg"
                                          alt="Swimming pool icon"
                                          class="lighting-icon"
                                        />
                                      )}
                                      <div class="lighting-text">{amenity}</div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-danger">Not Available</div>
                              )}
                            </div>
                          )}
                        </div>

                        <div class="show-more-divider mt-4 mb-4"></div>

                        <div>
                          <h2 className="sport-venue-category">Facilities</h2>

                          <div className="row">
                            {venuDetailss &&
                            venuDetailss?.facilities?.length > 0 ? (
                              venuDetailss?.facilities?.map(
                                (facility, index) => (
                                  <div className="col-4 px-0 mt-2" key={index}>
                                    <div className="lighting-container">
                                      {facility === "Renting Shoes" && (
                                        <img
                                          src="/resources/imgs/rent.svg"
                                          alt="Renting Shoes icon"
                                          className="lighting-icon"
                                        />
                                      )}
                                      {facility === "Renting Equipment" && (
                                        <img
                                          src="/resources/imgs/bat.svg"
                                          alt="Renting Equipment icon"
                                          className="lighting-icon"
                                        />
                                      )}
                                      <div className="lighting-text">
                                        {facility}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <div className="text-danger">Not Available</div>
                            )}
                          </div>
                        </div>

                        <div class="show-more-divider mt-4 mb-4"></div>
                        <div>
                          <h2 class="sport-venue-category">Price</h2>

                          <p className="mt-0">
                            ${venuDetailss?.price || 0} | 1 hour
                          </p>
                        </div>
                      </div>

                      <div className="col-3 mt-3 ">
                        <article class="marketSide_card2">
                          <div className="d-flex justify-content-start">
                            <h3 class="">Trainers</h3>
                          </div>
                          <div className="row">
                            {venuDetailss?.trainers?.length > 0 ? (
                              venuDetailss?.trainers?.map((ite, ind) => {
                                return (
                                  <div className="col-12 mt-3" key={ind}>
                                    <article class="manager-card ">
                                      <img
                                        src={
                                          ite?.profile_image ||
                                          "/resources/imgs/dummy.svg"
                                        }
                                        alt="Trainer avatar"
                                        class="trainer-avatar rounded-circle"
                                      />
                                      <div class="d-flex justify-content-between  w-100 ">
                                        <h5 class="manager-name">
                                          {ite?.name || ""}{" "}
                                        </h5>
                                        {/* <img
                                          src="/resources/imgs/arrowDown.svg"
                                          alt="Star icon"
                                          class=""
                                        /> */}
                                      </div>
                                    </article>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-danger">Not Available</div>
                            )}
                          </div>
                        </article>
                      </div>
                      <div className="col-12">
                        <button
                          style={{ width: "20%" }}
                          className="login-button"
                          onClick={handleOpen}
                        >
                          Edit
                        </button>
                      </div>
                      {/* <div className="col-12">
                        <CustomMultiSelect />
                      </div> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size={"md"} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Sport Venue</Modal.Title>
          <span className="custom-close" onClick={handleClose}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row form-design desk_modals p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="my-0">
              <div>
                <p className="settings-txt mt-3">Upload Logo</p>
                <label htmlFor="logo" className="w-100">
                  <input
                    type="file"
                    defaultValue=""
                    id="logo"
                    name="logo"
                    className="d-none"
                    onChange={(e) => handleImageUpload(e, "uploadImage")}
                    accept=".jpeg, .png, .jpg"
                    multiple
                  />

                  <div className="dashed_border w-100 position-relative">
                    <div
                      className={`d-flex ${
                        selectedImage?.length > 0 ||
                        venuDetailss?.image?.length > 0
                          ? "flex-row"
                          : "flex-column"
                      } align-items-center justify-content-center`}
                    >
                      {selectedImage?.length > 0
                        ? selectedImage.map((item, index) => (
                            <div className="p-3" key={index}>
                              <img
                                className="w_100_h_100"
                                src={item}
                                height={50}
                              />
                              <span
                                className="btn btn-danger shadow btn-xs sharp px-2 py-1"
                                onClick={(e) => handleRemove(e, index)}
                                style={{
                                  marginTop: "-45px",
                                  marginLeft: "-10px",
                                  fontSize: "10px",
                                }}
                              >
                                X
                              </span>
                            </div>
                          ))
                        : venuDetailss?.image?.map((item, index) => (
                            <div className="p-3" key={index}>
                              <img
                                className="w_100_h_100"
                                src={item}
                                height={50}
                              />
                            </div>
                          ))}
                      {!selectedImage?.length &&
                        !venuDetailss?.image?.length && (
                          <>
                            <div
                              style={{ fontSize: "xx-large" }}
                              className="mt-2"
                            >
                              <FontAwesomeIcon icon={faUpload} />
                            </div>
                            <div>
                              <p className="py-1">Upload Photo Or Video</p>
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-group col-12">
              <label
                htmlFor="description"
                className="input-label font-semibold"
              >
                Description of sport venue
              </label>
              <textarea
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="description"
                id="description"
                placeholder="Enter description..."
                className={classNames("form-control", {
                  "is-invalid": errors?.description,
                })}
                {...register("description", {
                  required: "Description is required",

                  pattern: {
                    value: /^(?=.*[a-zA-Z]).{50,}$/s,
                    message:
                      "Please enter at least 50 characters with at least one letter.",
                  },
                })}
              />
              {errors?.description && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.description?.message}
                </small>
              )}
            </div>

            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Trainer
              </label>
              <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChangeEdit1}
                allowSelectAll={true}
                value={selectEditOptions1?.optionSelected}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Manager
              </label>
              <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChangeEdit4}
                allowSelectAll={true}
                value={selectEditOptions4?.optionSelected}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="name_en" className="input-label font-semibold">
                Venue Name
              </label>
              <input
                className={classNames("form-control mb-1", {
                  "is-invalid": errors.name_en,
                })}
                type="text"
                id="name_en"
                name="name_en"
                placeholder="Enter Venue Name..."
                {...register("name_en", {
                  required: "Name is required.",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message:
                      "Please enter a valid venue name without special characters.",
                  },
                })}
              />
              {errors.name_en && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.name_en?.message}
                </small>
              )}
            </div>
            <div className="form-group col-6">
              <label htmlFor="location" className="input-label font-semibold">
                Location
              </label>
              <input
                className={classNames("form-control mb-1", {
                  "is-invalid": errors.location,
                })}
                type="text"
                id="location"
                name="location"
                placeholder="Enter Venue Location..."
                {...register("location", {
                  required: "Location is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9\s,.-]*$/,
                    message:
                      "Please enter a valid location name without special characters or symbols.",
                  },
                })}
              />
              {errors.location && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.location?.message}
                </small>
              )}
            </div>
            {/* <div className="form-group col-6">
              <label htmlFor="sport" className="input-label font-semibold">
                Sport
              </label>
              <input
                className={classNames("form-control mb-1", {
                  "is-invalid": errors.sport,
                })}
                type="text"
                placeholder="Enter Your Sport"
                {...register("sport", {
                  required: "Sport is required.",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message:
                      "Please enter a valid sport name without special characters.",
                  },
                })}
              />
              {errors.sport && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.sport?.message}
                </small>
              )}
            </div> */}

            <div className="form-group col-6">
              <label htmlFor="roofing" className="input-label font-semibold">
                Roofing
              </label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.roofing,
                })}
                id="roofing"
                name="roofing"
                placeholder="Enter Roofing..."
                {...register("roofing", {
                  required: "Roofing is required.",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message:
                      "Please enter a valid roofing type without special characters.",
                  },
                })}
              />
              {errors.roofing && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.roofing?.message}
                </small>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="flooring" className="input-label font-semibold">
                Flooring
              </label>
              <input
                className={classNames("form-control mb-1", {
                  "is-invalid": errors.flooring,
                })}
                type="text"
                placeholder="Enter Flooring..."
                {...register("flooring", {
                  required: "Flooring is required.",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message:
                      "Please enter a valid flooring type without special characters.",
                  },
                })}
              />
              {errors.flooring && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.flooring?.message}
                </small>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="rprice" className="input-label font-semibold">
                Registration Price
              </label>
              <input
                type="text"
                // className="form-control"
                className={classNames("form-control  ", {
                  "is-invalid": errors.rprice,
                })}
                id="rprice"
                name="rprice"
                placeholder="Enter registration price..."
                {...register("rprice", {
                  required: "Registration Price is Required*",
                  pattern: {
                    value: /^[0-9]+$/,
                    message:
                      "Registration price must contain only digits between [0-9]",
                  },
                })}
              />
              {errors.rprice && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.rprice?.message}
                </small>
              )}
            </div>

            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Venue Amenities
              </label>
              {/* <CreatableSelect
                components={components}
                inputValue={inputValueAmenities}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => setValueAmenities(newValue)}
                onInputChange={(newValue) => setInputValueAmenities(newValue)}
                onKeyDown={handleKeyDownAmenities}
                placeholder="Type something and press enter..."
                value={valueAmenities}
              /> */}
              <ReactSelect
                options={defaultAmenities}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChangeEdit2}
                allowSelectAll={true}
                value={selectEditOptions2?.optionSelected}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Facilities
              </label>
              {/* <CreatableSelect
                components={components}
                inputValue={inputValueFacilities}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => setValueFacilities(newValue)}
                onInputChange={(newValue) => setInputValueFacilities(newValue)}
                onKeyDown={handleKeyDownFacilities}
                placeholder="Type something and press enter..."
                value={valueFacilities}
              /> */}
              <ReactSelect
                options={defaultFacilities}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChangeEdit3}
                allowSelectAll={true}
                value={selectEditOptions3?.optionSelected}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Facilities
              </label>
              <LocationPickerExample />
            </div>

            <div className="form-group col-3">
              <button
                type={loaderss ? "button" : "submit"}
                className="login-button w-100"
                style={{ cursor: loaderss ? "not-allowed" : "pointer" }}
              >
                {loaderss ? <Spinner /> : <>Save</>}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Venue;
