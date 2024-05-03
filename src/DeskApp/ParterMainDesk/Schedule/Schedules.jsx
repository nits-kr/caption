import React, { useEffect, useRef, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import { Chart } from "react-google-charts";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Calender from "./Calender";
import {
  createMatch,
  createTournament,
  createTraining,
  getCourts,
  getCustomer,
  getSchedules,
  getStaff,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import { Spinner } from "react-bootstrap";
import { Button, Modal, Placeholder } from "rsuite";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { default as ReactSelect } from "react-select";
import { toast } from "react-toastify";
import { Slider, RangeSlider, Row, Col } from "rsuite";
import "rsuite/dist/rsuite.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

function Schedules() {
  const calendarRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [loadersss, setLoadersss] = useState(false);
  const [events, setEvents] = useState([]);
  const [Schedules, setSchedules] = useState("");

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedHand, setSelectedHand] = useState(null);
  const [ageRange, setAgeRange] = useState([25, 75]);
  const [playerLevel, setPlayerLevel] = useState([2, 3]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [court, setCourt] = useState([]);
  const venueId = localStorage?.getItem("venueId");
  const [selectedCourt, setSelectedCourt] = useState("");

  console.log("selectedCourt", selectedCourt);

  const handleTimeChange = (value) => {
    setEndTime(value);
  };
  const handleTimeChangestart = (value) => {
    setStartTime(value);
  };

  const formattedEndTime = endTime ? endTime.format("h:mm A") : "None";
  const formattedStartTime = startTime ? startTime.format("h:mm A") : "None";

  const handleAgeRangeChange = (value) => {
    setAgeRange(value);
  };

  const handlePlayerLevelChange = (value) => {
    setPlayerLevel(value);
  };

  const handleHandSelection = (hand) => {
    setSelectedHand(hand);
  };

  const handleNext = (selectedValue) => {
    if (!selectedValue) {
      toast.error("Please select an option");
      return;
    }
    setSelectedOption(selectedValue);
    if (selectedValue === "Book Friendly Match") {
      handleOpen2();
      handleClose();
    } else if (selectedValue === "Book Training") {
      handleOpen3();
      handleClose();
    } else if (selectedValue === "Book Tournament") {
      handleOpen4();
      handleClose();
    }
  };

  const [selectOptions, setSelectOptions] = useState([]);
  const [selectOptionstraining, setSelectOptionstraining] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    watch: watchs2,
  } = useForm();
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    watch: watchs3,
  } = useForm();

  useEffect(() => {
    statsDetail();
    staffDetail();
  }, []);

  const statsDetail = async () => {
    const { data } = await getSchedules();
    if (!data.error) {
      setSchedules(data?.results?.events);
    }
  };

  useEffect(() => {
    if (venueId) {
      handleCourts(venueId);
    }
  }, [venueId]);

  const handleCourts = async (id) => {
    let page = 1;
    let pageSize = 100;
    const datas = { id, page, pageSize };
    const res = await getCourts(datas);
    console.log("res", res);
    setCourt(res?.data?.results?.courts);
  };

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

        staffsetOptions(staffOptions);
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
      setLoader(false);
    }
  };

  const [staffoptions, staffsetOptions] = useState([]);

  const handleDateClick = (dateInfo) => {
    const title = prompt("Please enter a title for your event:");
    if (title) {
      const newEvent = {
        title: title,
        start: dateInfo.dateStr,
        allDay: true,
      };
      setEvents([...events, newEvent]);
    }
  };

  useEffect(() => {
    customerDetail();
  }, []);

  const customerDetail = async () => {
    try {
      const { data } = await getCustomer({
        page: 1,
        pageSize: 10,
        active: false,
      });

      if (!data.error) {
        const staffData = data?.results?.customers || [];
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
              {`${staff?.userName} (${staff?.email})`}
            </div>
          ),
        }));

        setOptions(staffOptions);
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
    }
  };

  const [options, setOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectOptions({
      optionSelected: selected,
    });
  };
  const handleChangetraining = (selected) => {
    setSelectOptionstraining({
      optionSelected: selected,
    });
  };

  const onSubmit = async (data) => {
    const optionsSelected = (selectOptions.optionSelected || []).map(
      (item) => item?.value
    );
    const allData = {
      players: optionsSelected,

      equipment: data?.equipment,
      level: playerLevel,
      date: data?.date,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      entry_price: data?.entry_price,
      type: "Friendly Match",
      dominant_hand: selectedHand,
      gender: data?.gender,
      age_range: ageRange,
      court: selectedCourt,
    };
    setLoader(true);
    const { datas } = await createMatch(allData);
    setLoader(false);
    if (!datas?.error) {
      // setLoaderss(false);
      // staffDetail();
      setOpen2(false);
      navigate("/app/partner/Booking");
    }
  };
  const onSubmit2 = async (data) => {
    const optionsSelected = (selectOptions.optionSelected || []).map(
      (item) => item?.value
    );
    const optionsSelectedtrainer = (
      selectOptionstraining.optionSelected || []
    ).map((item) => item?.value);
    const allData = {
      players: optionsSelected,
      trainer: optionsSelectedtrainer,

      equipment: data?.equipment,
      level: playerLevel,
      date: data?.date,
      // start_time: data?.startTime,
      // end_time: data?.endTime,
      court: selectedCourt,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      entry_price: 50,
      type: "Friendly Match",
      dominant_hand: selectedHand,
      gender: data?.gender,
      age_range: ageRange,
    };
    setLoaderss(true);
    const { datas } = await createTraining(allData);
    setLoaderss(false);
    if (!datas?.error) {
      // setLoaderss(false);
      // staffDetail();
      setOpen3(false);
      navigate("/app/partner/Booking");
    }
  };
  const onSubmit3 = async (data) => {
    const allData = {
      name_en: data?.tournament,
      name_gr: data?.tournament,

      equipment: data?.equipment,
      level: playerLevel,
      date: data?.date,
      // start_time: data?.startTime,
      // end_time: data?.endTime,
      court: selectedCourt,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      entry_price: data?.entry_price,
      dominant_hand: selectedHand,
      gender: data?.gender,
      type: data?.type,
      age_range: ageRange,
    };
    setLoadersss(true);
    const { datas } = await createTournament(allData);
    setLoadersss(false);
    console.log("datas", datas);
    if (!datas?.error) {
      // setLoaderss(false);
      // staffDetail();
      setOpen4(false);
      navigate("/app/partner/Booking");
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
              <div className="col-12 ">
                <div className="row bg-white px-4 py-4">
                  <div className="col-9">
                    <div class="calendar-header">
                      <div class="calendar-title">Calendar</div>
                      <div class="add-booking-button">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb614a51014fcf838754465a6c3fbfecd2bd4135bc1afff89d15c2afa4fe9d38?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Add Booking Icon"
                          class="add-booking-icon"
                        />
                        <div class="add-booking-text" onClick={handleOpen}>
                          Add Booking
                        </div>
                      </div>
                    </div>
                    <FullCalendar
                      ref={calendarRef}
                      plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        listPlugin,
                      ]}
                      events={events}
                      initialView="timeGridDay"
                      editable={true}
                      selectable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      select={handleDateClick}
                      eventClick={(info) => console.log(info.event)}
                      // eventsSet={(e) => setEvents(e)}
                      headerToolbar={{
                        left: "today",
                        center: "prev,title,next",
                        // center: "title",
                        right: "dayGridMonth,dayGridWeek,timeGridDay,listMonth",
                      }}
                      dayHeaderContent={(args) => {
                        return (
                          <div>
                            <span style={{ fontWeight: "bold" }}>
                              Court {args.dayNumberText}
                            </span>
                          </div>
                        );
                      }}
                      initialEvents={[
                        {
                          id: "1234",
                          title: "Team Building Workshop",
                          date: "2024-04-25",
                        },
                        {
                          id: "5678",
                          title: "Client Meeting (Morning)",
                          date: "2024-04-25",
                        },
                        {
                          id: "5674",
                          title: "Client Meeting (Afternoon)",
                          date: "2024-04-25",
                        },
                        {
                          id: "5278",
                          title: "Project Review Session",
                          date: "2024-04-25",
                        },
                        {
                          id: "9678",
                          title: "Project Planning Meeting",
                          date: "2024-04-25",
                        },
                        {
                          id: "5078",
                          title: "Marketing Strategy Discussion",
                          date: "2024-04-25",
                        },
                        {
                          id: "5278",
                          title: "Client Presentation",
                          date: "2024-04-25",
                        },
                        {
                          id: "5178",
                          title: "Team Standup Meeting",
                          date: "2024-04-25",
                        },
                        {
                          id: "91011",
                          title: "Team Lunch",
                          date: "2024-04-08",
                        },
                        {
                          id: "121314",
                          title: "Project Deadline",
                          date: "2024-04-09",
                        },
                        {
                          id: "151617",
                          title: "Product Launch Presentation",
                          date: "2024-04-09",
                        },
                      ]}
                    />
                  </div>
                  <div className="col-3">
                    <section class="booking-details">
                      <div class="player-list">
                        <div class="player-group">
                          <div class="player-info">
                            <h2 class="player-heading">Players</h2>
                            <div class="player-details">
                              <div class="player-initials">EP</div>
                              <div class="player-name">Eleanor Pena</div>
                            </div>
                          </div>
                          <div class="player-stats">
                            <div class="player-stats-labels">
                              <div class="player-stats-label">Side</div>
                              <div class="player-stats-label">Level</div>
                            </div>
                            <div class="player-stats-values">
                              <div class="player-stats-value">L􀟰</div>
                              <div class="player-stats-value">4.0</div>
                            </div>
                          </div>
                        </div>
                        <div class="player-item">
                          <div class="player-item-details">
                            <div class="player-item-initials">SF</div>
                            <div class="player-item-name">Sam Flores</div>
                          </div>
                          <div class="player-item-stats">
                            <div class="player-item-stats-value">R</div>
                            <div class="player-item-stats-value">4.0</div>
                          </div>
                        </div>
                        <div class="player-item-compact">
                          <div class="player-item-details">
                            <div class="player-item-initials">DL</div>
                            <div class="player-item-name">Devon Lane</div>
                          </div>
                          <div class="player-item-stats">
                            <div class="player-item-stats-value">L</div>
                            <div class="player-item-stats-value">5.0</div>
                          </div>
                        </div>
                        <div class="player-item-compact">
                          <div class="player-item-details">
                            <div class="player-item-initials">BC</div>
                            <div class="player-item-name">Bessie Cooper</div>
                            <div class="player-item-stats-value">R􀟰</div>
                          </div>
                          <div class="player-item-stats-value">5.0</div>
                        </div>
                      </div>

                      <div class="divider"></div>

                      <div class="level-info">
                        <div class="level-label">Level:</div>
                        <div class="level-badge">Advanced 4.5</div>
                      </div>

                      <div class="date-info">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/43467cceb42d5a217c5c993e436c77b9432f732347e5e6d1761af82d307b4261?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt=""
                          class="date-icon"
                        />
                        <div class="date-text">21 January 2024</div>
                      </div>

                      <div class="time-info">05:00 PM - 10:00 PM</div>

                      <div class="location-info">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a68f0070e586f23796e2f68bf38c8a7a1f7ec6f622eabb9f147c257fdd439b72?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt=""
                          class="location-icon"
                        />
                        <div class="location-text">Onsite</div>
                      </div>

                      <div class="venue-info">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3eca2d02915841e086ca0cf74659a4bfc0cc7833d979fd5e6c1f762fb8b813c3?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt=""
                          class="venue-icon"
                        />
                        <div class="venue-text">Willy Turt Center</div>
                      </div>

                      <div class="booking-id">
                        <div class="booking-id-label">Booking ID:</div>
                        <div class="booking-id-value">1283410</div>
                      </div>

                      <div class="equipment-info">
                        <div class="equipment-label">Equipment:</div>
                        <div class="equipment-item">2 Rackets</div>
                      </div>

                      <div class="equipment-item-centered">3 Balls</div>

                      <div class="check-in-button">Check in</div>

                      <div class="reservation-info">
                        Reservation made through
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e92edfa9a5bb50f9e772e0976e0ef04b0288aea0c8897d630801127b82b7735e?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                        alt=""
                        class="reservation-logo"
                      />
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size={"md"} open={open} onClose={handleClose} className="w-25">
        <Modal.Header>
          <Modal.Title>Add Booking</Modal.Title>
          <span className="custom-close" onClick={handleClose}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body style={{ overflow: "hidden" }}>
          <form className="row form-design desk_modals p-4">
            <div className="form-group col-12">
              <div className="dropdown">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{
                    border: "1px solid #DFDFDF",
                    display: "flex",
                    alignItems: "center",
                    height: "56px",
                    color: "#A39FA4",
                    justifyContent: "space-between",
                  }}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option selected>Choose Types</option>
                  <option value={"Book Friendly Match"}>
                    Book Friendly Match
                  </option>
                  <option value={"Book Training"}>Book Training</option>
                  <option value={"Book Tournament"}>Book Tournament</option>
                </select>
              </div>
            </div>

            <div className="form-group col-12">
              <button
                type="button"
                className="login-button w-100"
                style={{ cursor: "pointer" }}
                onClick={() => handleNext(selectedOption)}
              >
                Next
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal size={"md"} open={open2} onClose={handleClose2}>
        <Modal.Header>
          <Modal.Title>
            <strong>Book Friendly Match</strong>{" "}
          </Modal.Title>
          <span className="custom-close" onClick={handleClose2}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body style={{ overflowX: "hidden !important" }}>
          <form
            className="row form-design desk_modals p-4"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group col-10">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Name
              </label>
              <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChange}
                allowSelectAll={true}
                value={selectOptions?.optionSelected}
              />
            </div>
            <div className="form-group col-2">
              <label
                htmlFor=""
                className="input-label font-semibold mb-2"
              ></label>
              <img
                loading="lazy"
                src="/resources/imgs/logoicos.svg"
                alt="Company Logo"
                className="logo px-3 w-0"
                style={{
                  height: "56px",
                  marginTop: "14px",
                  width: "95px",
                }}
              />{" "}
            </div>

            <div className="form-group col-6">
              <label htmlFor="venueName" className="input-label font-semibold">
                Dominant Hand (Optional)
              </label>
              <div className="d-flex align-items-center justify-content-between col-6">
                <div
                  className={`Dominant ${
                    selectedHand === "Right" ? "menu-item active" : "menu-item"
                  }`}
                  style={{ top: "0px" }}
                  onClick={() => handleHandSelection("Right")}
                >
                  Right
                </div>
                <div
                  className={`Dominant ${
                    selectedHand === "Left" ? "menu-item active" : "menu-item"
                  }`}
                  style={{ top: "0px" }}
                  onClick={() => handleHandSelection("Left")}
                >
                  Left
                </div>
              </div>
            </div>

            <div className="form-group col-6">
              <label htmlFor="equipment" className="input-label font-semibold">
                Equipment (Optional)
              </label>
              <select className="form-control" {...register("equipment")}>
                <option value="">Select level</option>
                <option value="racket">racket</option>
                <option value="rent">rent</option>
                <option value="n/a">n/a</option>
              </select>
            </div>

            <div className="form-group col-6">
              <label htmlFor="side" className="input-label font-semibold">
                Side (Optional)
              </label>
              <select className="form-control" {...register("side")}>
                <option value="">Select Side</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="both">both</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label
                htmlFor="phoneNumber"
                className="input-label font-semibold"
              >
                Phone Number(Optional)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                {...register("phoneNumber", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-danger">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="form-group col-6">
              <label
                htmlFor="entry_price"
                className="input-label font-semibold"
              >
                Price
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter entry price..."
                {...register("entry_price", {
                  pattern: {
                    value: /^[0-9]+(?:\.[0-9]{1,2})?$/,
                    message: "Invalid price format",
                  },
                })}
              />
              {errors.entry_price && (
                <p className="text-danger">{errors.entry_price.message}</p>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="gender" className="input-label font-semibold">
                Gender (Optional)
              </label>
              <select className="form-control" {...register("gender")}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group col-6">
              <label htmlFor="court" className="input-label font-semibold">
                Courts
              </label>
              <select
                className="form-control"
                aria-label="Default select example"
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
              >
                <option selected>Choose Court</option>
                {court.map((court) => (
                  <option key={court?._id} value={court?._id}>
                    {court?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="form-group col-6">
              <div className="dropdown">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{
                    border: "1px solid #DFDFDF",
                    display: "flex",
                    alignItems: "center",
                    height: "56px",
                    color: "#A39FA4",
                    justifyContent: "space-between",
                  }}
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                >
                  <option selected>Choose Court</option>
                  {court.map((court) => (
                    <option key={court?._id} value={court?._id}>
                      {court?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

            <div className="form-group col-12">
              <label
                htmlFor="playerLevel"
                className="input-label font-semibold mb-4"
              >
                Level (Optional)
              </label>
              <RangeSlider
                min={1}
                step={0.5}
                max={7}
                defaultValue={[1, 2]}
                horizontal
                graduated
                onChange={handlePlayerLevelChange}
              />
            </div>

            <div className="form-group col-12">
              <label
                htmlFor="ageRange"
                className="input-label font-semibold mb-4"
              >
                Player Age (Optional)
              </label>
              <div>
                <RangeSlider value={ageRange} onChange={handleAgeRangeChange} />
              </div>
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

            {/* <div className="form-group col-6">
              <label htmlFor="startTime" className="input-label font-semibold">
                Start Time
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter start time"
                {...register("startTime")}
              />
            </div> */}
            <div className="form-group col-6">
              <label htmlFor="startTime" className="input-label font-semibold">
                Start Time
              </label>
              <TimePicker
                className="form-control"
                format="h:mm a"
                showSecond={false}
                inputReadOnly={true}
                onChange={handleTimeChangestart} // Call handleTimeChange when time changes
              />
            </div>
            {/* <div className="form-group col-6">
              <label htmlFor="endTime" className="input-label font-semibold">
                End Time
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter end time"
                {...register("endTime")}
              />
            </div> */}
            <div className="form-group col-6">
              <label htmlFor="endTime" className="input-label font-semibold">
                End Time
              </label>
              <TimePicker
                className="form-control"
                format="h:mm a" // 12-hour format with AM/PM
                showSecond={false} // Hide seconds
                inputReadOnly={true} // Make input field read-only
                onChange={handleTimeChange}
              />
            </div>
            <div className="form-group col-3">
              <button
                type={loader ? "button" : "submit"}
                className="login-button w-100"
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
                  "Book"
                )}
                {/* {loader ? <Spinner /> : "Book"} */}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal size={"md"} open={open3} onClose={handleClose3}>
        <Modal.Header>
          <Modal.Title>
            <strong>Book Traning</strong>{" "}
          </Modal.Title>
          <span className="custom-close" onClick={handleClose3}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body style={{ overflowX: "hidden !important" }}>
          <form
            className="row form-design desk_modals p-4"
            onSubmit={handleSubmit2(onSubmit2)}
          >
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Trainee
              </label>
              <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChange}
                allowSelectAll={true}
                value={selectOptions?.optionSelected}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Trainer
              </label>
              <ReactSelect
                options={staffoptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChangetraining}
                allowSelectAll={true}
                value={selectOptionstraining?.optionSelected}
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="venueName" className="input-label font-semibold">
                Dominant Hand (Optional)
              </label>
              <div className="d-flex align-items-center justify-content-between col-6">
                <div
                  className={`Dominant ${
                    selectedHand === "Right" ? "menu-item active" : "menu-item"
                  }`}
                  style={{ top: "0px" }}
                  onClick={() => handleHandSelection("Right")}
                >
                  Right
                </div>
                <div
                  className={`Dominant ${
                    selectedHand === "Left" ? "menu-item active" : "menu-item"
                  }`}
                  style={{ top: "0px" }}
                  onClick={() => handleHandSelection("Left")}
                >
                  Left
                </div>
              </div>
            </div>

            <div className="form-group col-6">
              <label htmlFor="equipments" className="input-label font-semibold">
                Equipment (Optional)
              </label>
              <select className="form-control" {...register2("equipment")}>
                <option value="">Select level</option>
                <option value="racket">racket</option>
                <option value="rent">rent</option>
                <option value="n/a">n/a</option>
              </select>
            </div>

            <div className="form-group col-6">
              <label
                htmlFor="phoneNumber"
                className="input-label font-semibold"
              >
                Phone Number(Optional)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                {...register2("phoneNumber", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
              {errors2.phoneNumber && (
                <p className="text-danger">{errors2.phoneNumber.message}</p>
              )}
            </div>
            <div className="form-group col-6">
              <label htmlFor="gender" className="input-label font-semibold">
                Gender (Optional)
              </label>
              <select className="form-control" {...register2("gender")}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label htmlFor="courts" className="input-label font-semibold">
                Courts
              </label>
              <select
                className="form-control"
                aria-label="Default select example"
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
              >
                <option selected>Choose Court</option>
                {court.map((court) => (
                  <option key={court?._id} value={court?._id}>
                    {court?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="form-group col-6">
              <label htmlFor="court" className="input-label font-semibold">
                Court
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter court..."
                {...register2("court", {
                  pattern: {
                    value: /^[A-Za-z0-9\s]+$/,
                    message:
                      "Invalid court format. Only letters, numbers, and spaces are allowed.",
                  },
                })}
              />
              {errors.court && (
                <p className="text-danger">{errors.court.message}</p>
              )}
            </div> */}

            <div className="form-group col-12">
              <label
                htmlFor="ageRange"
                className="input-label font-semibold mb-4"
              >
                Player Age (Optional)
              </label>
              <div>
                <RangeSlider value={ageRange} onChange={handleAgeRangeChange} />
              </div>
            </div>
            <div className="form-group col-12">
              <label
                htmlFor="playerLevel"
                className="input-label font-semibold mb-4"
              >
                Player Level Range (Optional)
              </label>
              <RangeSlider
                min={1}
                step={0.5}
                max={7}
                defaultValue={[1, 2]}
                horizontal
                graduated
                onChange={handlePlayerLevelChange}
              />
            </div>

            <div className="form-group col-12">
              <label htmlFor="date" className="input-label font-semibold">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                {...register2("date", { required: "Date is required" })}
              />
              {errors2.date && (
                <p className="text-danger">{errors2.date.message}</p>
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
            <div className="form-group col-3">
              <button
                type={loaderss ? "button" : "submit"}
                className="login-button w-100"
                style={{ cursor: loaderss ? "not-allowed" : "pointer" }}
              >
                {loaderss ? <Spinner /> : "Book"}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal size={"md"} open={open4} onClose={handleClose4}>
        <Modal.Header>
          <Modal.Title>
            <strong>Book Tournament</strong>{" "}
          </Modal.Title>
          <span className="custom-close" onClick={handleClose4}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row form-design desk_modals p-4"
            onSubmit={handleSubmit3(onSubmit3)}
          >
            <div className="form-group col-12">
              <label htmlFor="tournament" className="input-label font-semibold">
                Tournament
              </label>
              <select className="form-control" {...register3("tournament")}>
                <option value="">Select Tournament</option>
                <option value="Americano">Americano</option>
                <option value="Mexicano">Mexicano</option>
                <option value="Winner Courts">Winner Courts</option>
              </select>
            </div>

            <div className="form-group col-12">
              <label htmlFor="type" className="input-label font-semibold">
                Name
              </label>
              <input
                type="text"
                id="type"
                name="type"
                className="form-control"
                placeholder="Enter name..."
                {...register3("type", { required: "Name is required" })}
              />
              {errors.type && (
                <p className="text-danger">{errors.type.message}</p>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="venueName" className="input-label font-semibold">
                Dominant Hand (Optional)
              </label>
              <div className="d-flex align-items-center justify-content-between col-6">
                <div
                  className={`Dominant ${
                    selectedHand === "Right" ? "menu-item active" : "menu-item"
                  }`}
                  style={{ top: "0px" }}
                  onClick={() => handleHandSelection("Right")}
                >
                  Right
                </div>
                <div
                  className={`Dominant ${
                    selectedHand === "Left" ? "menu-item active" : "menu-item"
                  }`}
                  style={{ top: "0px" }}
                  onClick={() => handleHandSelection("Left")}
                >
                  Left
                </div>
              </div>
            </div>

            <div className="form-group col-6">
              <label
                htmlFor="equipmentss"
                className="input-label font-semibold"
              >
                Equipment (Optional)
              </label>
              <select className="form-control" {...register3("equipment")}>
                <option value="">Select level</option>
                <option value="racket">racket</option>
                <option value="rent">rent</option>
                <option value="n/a">n/a</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label htmlFor="sidess" className="input-label font-semibold">
                Side (Optional)
              </label>
              <select className="form-control" {...register3("side")}>
                <option value="">Select Side</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="both">both</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label
                htmlFor="phoneNumber"
                className="input-label font-semibold"
              >
                Phone Number(Optional)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                {...register3("phoneNumber", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
              {errors3.phoneNumber && (
                <p className="text-danger">{errors3.phoneNumber.message}</p>
              )}
            </div>
            <div className="form-group col-6">
              <label htmlFor="gender" className="input-label font-semibold">
                Gender (Optional)
              </label>
              <select className="form-control" {...register3("gender")}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label htmlFor="courtss" className="input-label font-semibold">
                Courts
              </label>
              <select
                className="form-control"
                aria-label="Default select example"
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
              >
                <option selected>Choose Court</option>
                {court.map((court) => (
                  <option key={court?._id} value={court?._id}>
                    {court?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="form-group col-6">
              <label htmlFor="court" className="input-label font-semibold">
                Court
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter court..."
                {...register3("court", {
                  pattern: {
                    value: /^[A-Za-z0-9\s]+$/,
                    message:
                      "Invalid court format. Only letters, numbers, and spaces are allowed.",
                  },
                })}
              />
              {errors.court && (
                <p className="text-danger">{errors.court.message}</p>
              )}
            </div> */}

            <div className="form-group col-6">
              <label
                htmlFor="entry_price"
                className="input-label font-semibold"
              >
                Price
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter entry price..."
                {...register3("entry_price", {
                  pattern: {
                    value: /^[0-9]+(?:\.[0-9]{1,2})?$/,
                    message: "Invalid price format",
                  },
                })}
              />
              {errors.entry_price && (
                <p className="text-danger">{errors.entry_price.message}</p>
              )}
            </div>
            <div className="form-group col-12">
              <label
                htmlFor="playerLevel"
                className="input-label font-semibold mb-4"
              >
                Level (Optional)
              </label>
              <RangeSlider
                min={1}
                step={0.5}
                max={7}
                defaultValue={[1, 2]}
                horizontal
                graduated
                onChange={handlePlayerLevelChange}
              />
            </div>

            <div className="form-group col-12">
              <label
                htmlFor="ageRange"
                className="input-label font-semibold mb-4"
              >
                Age Range (Optional)
              </label>
              <div>
                <RangeSlider value={ageRange} onChange={handleAgeRangeChange} />
              </div>
            </div>

            <div className="form-group col-12">
              <label htmlFor="date" className="input-label font-semibold">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                {...register3("date", { required: "Date is required" })}
              />
              {errors3.date && (
                <p className="text-danger">{errors3.date.message}</p>
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
                format="h:mm a" // 12-hour format with AM/PM
                showSecond={false} // Hide seconds
                inputReadOnly={true} // Make input field read-only
                onChange={handleTimeChange}
              />
            </div>

            <div className="form-group col-3">
              <button
                type={loadersss ? "button" : "submit"}
                className="login-button w-100"
                style={{ cursor: loadersss ? "not-allowed" : "pointer" }}
              >
                {loadersss ? <Spinner /> : "Book"}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Schedules;
