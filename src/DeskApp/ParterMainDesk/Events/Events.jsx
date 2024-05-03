import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import {
  createEvent,
  createEventCategory,
  getEventById,
  getEvents,
  getPastEvents,
  updateEvent,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { Button, Modal, Placeholder } from "rsuite";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { toast } from "react-toastify";
import { default as ReactSelect } from "react-select";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

function Event() {
  const [open, setOpen] = React.useState(false);

  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loadersss, setLoadersss] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const [selectedImage, setSelectedImage] = useState([]);
  const [imageSections, setImageSections] = useState([]);

  const [selectOptions, setSelectOptions] = useState([]);
  const [venuDetailss, setVenueDetailss] = useState("");
  const [details, setDetails] = useState("");
  const [itemId, setItemId] = useState("");

  const initialRenderData = events?.[0];

  console.log("itemId", itemId);
  console.log("initialRenderData", initialRenderData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleTimeChange = (value) => {
    setEndTime(value);
  };
  const handleTimeChangestart = (value) => {
    setStartTime(value);
  };

  const formattedEndTime = endTime ? endTime.format("h:mm A") : "None";
  const formattedStartTime = startTime ? startTime.format("h:mm A") : "None";

  console.log("formattedEndTime", formattedEndTime);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    statsDetail();
    pastEventDetail();
  }, []);

  const statsDetail = async () => {
    setLoader(true);
    const { data } = await getEvents();
    if (!data.error) {
      setEvents(data?.results?.events);
      setLoader(false);
    }
  };
  const pastEventDetail = async () => {
    setLoaderss(true);
    const { data } = await getPastEvents();
    if (!data.error) {
      setPastEvents(data?.results?.events);
      setLoaderss(false);
    }
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
    for (let i = 0; i < imageSections.length; i++) {
      alldata.append("images", imageSections[i]);
    }
    if (data.eventName) {
      alldata.append("name_en", data.eventName);
    }
    if (data.eventName) {
      alldata.append("name_gr", data.eventName);
    }
    if (data.description) {
      alldata.append("description_en", data.description);
    }
    if (data.description) {
      alldata.append("description_gr", data.description);
    }
    alldata.append("gender", "Male");
    if (data.phoneNumber) {
      alldata.append("phone_number", data.phoneNumber);
    }
    // if (formattedStartTime) {
    //   alldata.append("start_time", formattedStartTime);
    // }
    // if (formattedEndTime) {
    //   alldata.append("end_time", formattedEndTime);
    // }
    if (formattedStartTime !== "None") {
      alldata.append("start_time", formattedStartTime);
    } else {
      alldata.append("start_time", itemId?.start_time);
    }

    if (formattedEndTime !== "None") {
      alldata.append("end_time", formattedEndTime);
    } else {
      alldata.append("end_time", itemId?.end_time);
    }

    alldata.append("date", data?.date);
    alldata.append("country_code", "+91");
    alldata.append("start_location", data?.eventStartLocation);
    alldata.append("end_location", data?.eventEndLocation);
    if (data.priceType) {
      alldata.append("priceType", data.priceType);
    }
    if (data.eventType) {
      alldata.append("event_type", data.eventType);
    }
    alldata.append(
      "price",
      data.registrationPrice ? data.registrationPrice : 0
    );
    if (data.organizerName) {
      alldata.append("organizer_name", data.organizerName);
    }
    if (data.organizerContact) {
      alldata.append("organizer_contact", data.organizerContact);
    }
    if (itemId?._id) {
      alldata.append("eventId", itemId?._id);
    }

    setLoadersss(true);

    const { response } = itemId?._id
      ? await updateEvent(alldata)
      : await createEvent(alldata);

    if (!response?.error) {
      setOpen(false);
      setItemId("");
      statsDetail();
      pastEventDetail();
    }
    setLoadersss(false);
  };

  const eventDetailId = async (ite) => {
    setLoaders(true);
    const { data } = await getEventById({
      id: ite?._id,
    });
    if (!data.error) {
      setDetails(data?.results?.events);
      setLoaders(false);
      const eventData = data?.results?.events;
      reset({
        eventName: eventData?.name_en,
        setVenueDetailss: eventData?.images,
        description: eventData?.description_en,
        date: eventData?.date?.slice(0, 10),
        registrationPrice: eventData?.price,
        eventType: eventData?.event_type,
        organizerName: eventData?.organizer_name,
        organizerContact: eventData?.organizer_contact,
        eventStartLocation: eventData?.start_location,
        eventEndLocation: eventData?.end_location,
        setStartTime: eventData?.start_time,
        setEndTime: eventData?.end_time,
      });
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
              <div className="col-9 ">
                <section class="bookings-container">
                  <h2 class="bookings-title">Events</h2>
                  <div class="emergency-alert-container">
                    <p class="emergency-alert-text" onClick={handleOpen}>
                      {" "}
                      + Create New Event
                    </p>
                  </div>
                </section>

                <div className="col-12 comman_table_design px-0 ">
                  <div className="row px-0 justify-content-start ">
                    {loader ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <Spinner className="me-2" />
                        Loading...
                      </div>
                    ) : events?.length > 0 ? (
                      events?.map((ite, ind) => {
                        return (
                          <section
                            class="event_card col-5"
                            onClick={() => {
                              eventDetailId(ite);
                            }}
                            key={ind}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={
                                ite?.images?.[0] ||
                                "https://cdn.builder.io/api/v1/image/assets/TEMP/07fba762431cf1f98bc50116d47b34e49999c2367045bee8fd2cc77e40ce1cc2?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                              }
                              alt="PrImage"
                              class="event-image"
                            />
                            <div className="mt-3">
                              <h1 class="event-head">{ite?.name_en || ""}</h1>
                              <div class="location-container">
                                <img
                                  src="/resources/imgs/location.svg"
                                  alt="Location icon"
                                  class="gps-icon"
                                />
                                <p class="location-text">
                                  Achaias Street Tripoli, Greece
                                </p>
                              </div>

                              <div class="location-container">
                                <img
                                  src="/resources/imgs/clock.svg"
                                  alt="Location icon"
                                  class="gps-icon"
                                />
                                <p class="location-text">
                                  {moment(ite?.date).format("ddd, MMM D")} |
                                  {ite?.start_time}-{ite?.end_time}
                                </p>
                              </div>
                              <h1 className="fees_text">
                                Registration fees: € {ite?.price || 0}
                              </h1>
                            </div>
                          </section>
                        );
                      })
                    ) : (
                      <div className="d-flex align-items-center  text-danger">
                        <strong>No Events Found In This Venue...</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 comman_table_design px-0 ">
                  <h2 class="bookings-title2"> Past Events</h2>

                  <div className="row px-0 justify-content-start ">
                    {loaderss ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <Spinner className="me-2" />
                        Loading...
                      </div>
                    ) : pastEvents?.length > 0 ? (
                      pastEvents?.map((ite, ind) => {
                        return (
                          <section
                            class="event_card col-5"
                            onClick={() => {
                              eventDetailId(ite);
                            }}
                            style={{ cursor: "pointer" }}
                            key={ind}
                          >
                            <img
                              src={
                                ite?.images?.[0] ||
                                "https://cdn.builder.io/api/v1/image/assets/TEMP/07fba762431cf1f98bc50116d47b34e49999c2367045bee8fd2cc77e40ce1cc2?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                              }
                              alt="PrImage"
                              class="event-image"
                            />
                            <div className="mt-3">
                              <h1 class="event-head">{ite?.name_en || ""}</h1>
                              <div class="location-container">
                                <img
                                  src="/resources/imgs/location.svg"
                                  alt="Location icon"
                                  class="gps-icon"
                                />
                                <p class="location-text">
                                  Achaias Street Tripoli, Greece
                                </p>
                              </div>

                              <div class="location-container">
                                <img
                                  src="/resources/imgs/clock.svg"
                                  alt="Location icon"
                                  class="gps-icon"
                                />
                                <p class="location-text">
                                  {moment(ite?.date).format("ddd, MMM D")} |
                                  {ite?.start_time}-{ite?.end_time}
                                </p>
                              </div>
                              <h1 className="fees_text">
                                Registration fees: € {ite?.price || 0}
                              </h1>
                            </div>
                          </section>
                        );
                      })
                    ) : (
                      <div className="d-flex align-items-center  text-danger">
                        <strong>No Past Events Found In This Venue...</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-3 bg-white sideBar_book">
                <div className="card-side">
                  <h1 class="battledore-center-heading">
                    {loaders
                      ? "Loading..."
                      : details
                      ? details?.name_en || "..."
                      : initialRenderData?.name_en || "..."}
                  </h1>
                  <div class="location-container">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/621ed4c12b06dd6565b9ce8dc179424de973df1f5fa0a8cc7c85e151619e5b9b?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      alt="Location icon"
                      class="location-icon"
                    />
                    <p class="location-text">Achaias Street Tripoli, Greece</p>
                  </div>
                </div>

                <section class="date-time-container">
                  <div class="date-container mb-4">
                    <div class="date-label">
                      <h3 class="date-title">Date & Time</h3>
                    </div>
                  </div>

                  <div class="time-container">
                    <p class="time-label">Date</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? moment(details?.date).format("DD MMMM YYYY") || 0
                        : moment(initialRenderData?.date).format(
                            "DD MMMM YYYY"
                          ) || 0}
                    </time>
                  </div>

                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Start Time</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.start_time || "..."
                        : initialRenderData?.start_time || "..."}
                    </time>
                  </div>

                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">End Time</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.end_time || "..."
                        : initialRenderData?.end_time || "..."}
                    </time>
                  </div>
                </section>

                <section class="date-time-container">
                  <div class="date-container mb-4">
                    <div class="date-label">
                      <h3 class="date-title">More Info</h3>
                    </div>
                  </div>

                  <div class="time-container">
                    <p class="time-label">Name</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.name_en || "..."
                        : initialRenderData?.name_en || "..."}
                    </time>
                  </div>

                  <hr class="separator" />
                  <div class="time-container">
                    <p class="time-label">Organizer Name</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.organizer_name || "..."
                        : initialRenderData?.organizer_name || "..."}
                    </time>
                  </div>

                  <hr class="separator" />
                  <div class="time-container">
                    <p class="time-label">Organizer Contact</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.organizer_contact || "..."
                        : initialRenderData?.organizer_contact || "..."}
                    </time>
                  </div>

                  <hr class="separator" />

                  {/* <div class="time-container">
                    <p class="time-label">Sports</p>
                    <time class="time-value">{loaders
                        ? "Loading..."
                        : details
                        ? details?.end_time || "..."
                        : initialRenderData?.end_time || "..."}</time>
                  </div>

                  <hr class="separator" /> */}

                  <div class="time-container">
                    <p class="time-label">Price</p>
                    <time class="time-value">
                      Euro{" "}
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.price || "..."
                        : initialRenderData?.price || "..."}
                    </time>
                  </div>
                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Mode</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.price
                          ? "Paid"
                          : "Free" || "..."
                        : initialRenderData?.price
                        ? "Paid"
                        : "Free" || "..."}{" "}
                    </time>
                  </div>

                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Price</p>
                    <time class="time-value">
                      Euro{" "}
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.price || "..."
                        : initialRenderData?.price || "..."}
                    </time>
                  </div>
                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Review</p>
                    <time class="time-value">5 Star</time>
                  </div>
                </section>

                <div class="buttons_div">
                  <div
                    class="comman_btn2"
                    onClick={() => {
                      eventDetailId(details ? details : initialRenderData);
                      handleOpen();
                      setItemId(details ? details : initialRenderData);
                    }}
                  >
                    Edit
                  </div>
                  {/* <div class="comman_btn ">Update</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal size={"md"} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {itemId?._id ? "Update New Event" : "Create New Event"}{" "}
          </Modal.Title>
          <span className="custom-close" onClick={handleClose}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row form-design desk_modals p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group col-12">
              <label htmlFor="fullName" className="input-label font-semibold">
                Event Names
              </label>
              <input
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="eventName"
                id="eventName"
                placeholder="Enter event name..."
                className={classNames("form-control", {
                  "is-invalid": errors?.eventName,
                })}
                {...register("eventName", {
                  // required: "Enter Name*",
                  pattern: {
                    value: /^(?! )[A-Za-z ]+(?<! )$/,
                    message:
                      "Full Name must contain only letters, and should not start or end with white space",
                  },
                  minLength: {
                    value: 3,
                    message: "minimium 3 charcarters",
                  },
                  maxLength: {
                    value: 50,
                    message: "maximum 50 characters allowed",
                  },
                })}
              />
              {errors?.eventName && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.eventName?.message}
                </small>
              )}
            </div>

            <div className="my-0">
              <div>
                <p className="settings-txt my-3">Upload Logo</p>
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
                              <img
                                src="/resources/imgs/upload.svg"
                                alt="Location icon"
                                class="gpss-icon"
                              />
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
                Event Description
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
              <label htmlFor="date" className="input-label font-semibold">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-danger">{errors.date.message}</p>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="startTime" className="input-label font-semibold">
                Start Time
              </label>
              <TimePicker
                className="form-control"
                format="h:mm a"
                showSecond={false}
                inputReadOnly={true}
                onChange={handleTimeChangestart}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="endTime" className="input-label font-semibold">
                End Time
              </label>
              <TimePicker
                className="form-control"
                format="h:mm a"
                showSecond={false}
                inputReadOnly={true}
                onChange={handleTimeChange}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="priceType" className="input-label font-semibold">
                Price Type
              </label>
              <select className="form-control" {...register("priceType")}>
                <option value="">Select price type</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            {watch("priceType") === "Paid" && (
              <div className="form-group col-6">
                <label
                  htmlFor="registrationPrice"
                  className="input-label font-semibold"
                >
                  Registration Price
                </label>
                <input
                  type="text"
                  // defaultValue=""
                  // disabled={!read}
                  name="registrationPrice"
                  id="registrationPrice"
                  placeholder="Enter registration price..."
                  className={classNames("form-control", {
                    "is-invalid": errors?.registrationPrice,
                  })}
                  {...register("registrationPrice", {
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message:
                        "Invalid registration price. Please enter a valid number.",
                    },
                    minLength: {
                      value: 1,
                      message: "Minimum 1 character is required.",
                    },
                    maxLength: {
                      value: 15,
                      message: "Maximum 15 characters allowed.",
                    },
                  })}
                />
                {errors?.registrationPrice && (
                  <small className="errorText mx-0 fw-bold text-danger">
                    {errors?.registrationPrice?.message}
                  </small>
                )}
              </div>
            )}

            <div className="form-group col-6">
              <label htmlFor="eventType" className="input-label font-semibold">
                Event Type
              </label>
              <select
                className={`form-control ${
                  errors.eventType ? "is-invalid" : ""
                }`}
                {...register("eventType", {
                  required: "Event type is required",
                })}
              >
                <option value="">Select event type</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              {errors.eventType && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.eventType.message}
                </small>
              )}
            </div>

            <div className="form-group col-6">
              <label
                htmlFor="organizerName"
                className="input-label font-semibold"
              >
                Organizer Name
              </label>
              <input
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="organizerName"
                id="organizerName"
                placeholder="Enter organizer name..."
                className={classNames("form-control", {
                  "is-invalid": errors?.organizerName,
                })}
                {...register("organizerName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Organizer name must contain only letters and spaces.",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters are required.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters allowed.",
                  },
                })}
              />
              {errors?.organizerName && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.organizerName?.message}
                </small>
              )}
            </div>

            <div className="form-group col-6">
              <label
                htmlFor="organizerContact"
                className="input-label font-semibold"
              >
                Organizer Contact Number
              </label>
              <input
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="organizerContact"
                id="organizerContact"
                placeholder="Enter organizer contact number..."
                className={classNames("form-control", {
                  "is-invalid": errors?.organizerContact,
                })}
                {...register("organizerContact", {
                  pattern: {
                    value: /^\d{10}$/,
                    message:
                      "Invalid contact number. Please enter a 10-digit number.",
                  },
                  minLength: {
                    value: 10,
                    message: "Contact number must be 10 digits long.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Contact number must be 10 digits long.",
                  },
                })}
              />
              {errors?.organizerContact && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.organizerContact?.message}
                </small>
              )}
            </div>

            <div className="form-group col-6">
              <label
                htmlFor="eventStartLocation"
                className="input-label font-semibold"
              >
                Event Start Location
              </label>
              <input
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="eventStartLocation"
                id="eventStartLocation"
                placeholder="Enter event start location..."
                className={classNames("form-control", {
                  "is-invalid": errors?.eventStartLocation,
                })}
                {...register("eventStartLocation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Event start location must contain only letters and spaces.",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters are required.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters allowed.",
                  },
                })}
              />
              {errors?.eventStartLocation && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.eventStartLocation?.message}
                </small>
              )}
            </div>

            <div className="form-group col-6">
              <label
                htmlFor="eventEndLocation"
                className="input-label font-semibold"
              >
                Event End Location
              </label>
              <input
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="eventEndLocation"
                id="eventEndLocation"
                placeholder="Enter event end location..."
                className={classNames("form-control", {
                  "is-invalid": errors?.eventEndLocation,
                })}
                {...register("eventEndLocation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Event end location must contain only letters and spaces.",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters are required.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters allowed.",
                  },
                })}
              />
              {errors?.eventEndLocation && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.eventEndLocation?.message}
                </small>
              )}
            </div>

            <div className="form-group col-3">
              <button
                type={loadersss ? "button" : "submit"}
                className="login-button w-100"
                style={{ cursor: loadersss ? "not-allowed" : "pointer" }}
              >
                {loadersss ? <Spinner /> : <>{itemId ? "Update" : "Save"}</>}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Event;
