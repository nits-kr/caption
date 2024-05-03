import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import Chart from "react-apexcharts";
import {
  exportExcel,
  getEarning,
  getTransactionGraph,
  getTransactions,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import CountUp from "react-countup";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import moment from "moment";
import FadeSpinners from "../../allspinners/FadeSpinners";
import { DateRangePicker, Stack } from "rsuite";
import { BsCalendar2MonthFill } from "react-icons/bs";

function Billing() {
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [loading, setLoading] = useState(false);
  const [earning, setEarning] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedType1, setSelectedType1] = useState(1);
  const [transactionGraph, setTransactionGraph] = useState([]);

  const [selectedDateRange, setSelectedDateRange] = useState([]);

  useEffect(() => {
    const lastDayOfPreviousMonth = new Date();
    lastDayOfPreviousMonth.setDate(0);
    const firstDayOfCurrentMonth = new Date();
    firstDayOfCurrentMonth.setDate(1);

    setSelectedDateRange([lastDayOfPreviousMonth, firstDayOfCurrentMonth]);
  }, []);

  useEffect(() => {
    if (selectedDateRange?.length === 2) {
      earningDetail();
    }
  }, [selectedDateRange]);

  const earningDetail = async () => {
    setLoader(true);
    const [startDate, endDate] = selectedDateRange;
    const { data } = await getEarning({
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    });
    if (!data.error) {
      setEarning(data?.results);
      setLoader(false);
    }
  };

  useEffect(() => {
    trancList();
  }, [selectedType1]);

  const trancList = async () => {
    setLoaders(true);
    const { data } = await getTransactions({
      page: 1,
      pageSize: 10,
      type: selectedType1,
    });
    if (!data.error) {
      setTransaction(data?.results?.payments);
      setLoaders(false);
    }
  };

  console.log("transactionGraph", transactionGraph);

  useEffect(() => {
    fetchTransactionGraph();
  }, [selectedType]);

  const fetchTransactionGraph = async () => {
    setLoaderss(true);
    const { data } = await getTransactionGraph({
      type: selectedType,
    });
    if (!data.error) {
      const updatedData = data?.results?.payments;
      setTransactionGraph(updatedData);
      setLoaderss(false);
    }
  };

  const series = transactionGraph.map((payment) => ({
    name: payment.date,
    data: [payment.count],
  }));

  const options = {
    chart: {
      height: 444,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#ECE9F1", "#6265E8"],
    },

    yaxis: {
      min: 0,
      // max: 50,
      tickAmount: 5,
    },
    xaxis: {
      type: "month",

      categories:
        transactionGraph?.length > 0
          ? transactionGraph?.map((data) => data?.date) || []
          : transactionGraph?.map((data) => data?.date) || [],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (value) {
          return value;
        },
      },
      theme: "dark",
    },
  };

  // .custom-chart .apexcharts-tooltip {
  //   background-color: #your-desired-color;
  //   border-color: #your-desired-color;
  // }

  const handleDownload = async (e) => {
    setLoading(true);
    e.preventDefault();
    const downloadData = await exportExcel();
    if (
      downloadData &&
      downloadData?.data?.results &&
      downloadData?.data?.results?.file
    ) {
      try {
        const link = document.createElement("a");
        link.href = downloadData?.data?.results?.file;
        link.download = "file.xlsx";
        link.click();
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="admin_main ">
      <div className="row">
        <div className="col-2">
          <DeskSidebar />
        </div>

        <div className="admin_main_inner col-10 bg-light p-0">
          <DeskHead />

          <div className="billing_panel_data height_adjust">
            <section class="gradient-background">
              <header className="billings-container">
                <h1 className="billings-title">Billings</h1>
                <div
                  className="billings-date-container"
                  style={{ cursor: "pointer" }}
                >
                  <time className="billings-date">
                    <Stack
                      spacing={10}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <DateRangePicker
                        format="MMM yyyy"
                        caretAs={BsCalendar2MonthFill}
                        value={selectedDateRange}
                        onChange={setSelectedDateRange}
                        id="datePickerContainer"
                      />
                    </Stack>
                  </time>

                  <img
                    src="/resources/imgs/arrowDown.svg"
                    alt="Calendar icon"
                    width={30}
                    className="calendar-icon"
                    onClick={() =>
                      document.getElementById("datePickerContainer").click()
                    }
                  />
                </div>
              </header>

              <div class="total-earnings-container">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/639284c731d2b1633250bad3d07b76406b134d8d3e50844d5505132ebe3e7ce0?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                  alt="Total Earnings Icon"
                  class="total-earnings-icon"
                />
                <div class="total-earnings-info">
                  <div class="total-earnings-label">Total Earnings</div>
                  <div class="total-earnings-amount">
                    €{" "}
                    {loader ? (
                      <SpinnerIcon
                        pulse
                        style={{ fontSize: "0.8em", marginTop: "-6px" }}
                        className="text-danger"
                      />
                    ) : (
                      <CountUp
                        end={earning?.totalEarnings || 0}
                        duration={2.75}
                      />
                    )}{" "}
                  </div>
                </div>
              </div>
            </section>
            <div className="row dashboard_part_biling justify-content-center ">
              <div className="col-12  ">
                <div className="row ">
                  <div className="col-12"></div>

                  <div className="col-12 px-3">
                    <div className=" row ">
                      <div className="col-12 charts_area_market mt-3">
                        <div>
                          <div className="titles_charts">
                            <h1>Transactions</h1>
                            <div
                              class="calendar-badge"
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                class="calendar-year"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {selectedType === 1 && "Yearly"}
                                {selectedType === 2 && "Monthly"}
                                {selectedType === 3 && "Daily"}
                                <ul className="dropdown-menu">
                                  <li
                                    className="dropdown-item"
                                    onClick={() => setSelectedType(1)}
                                  >
                                    Yearly
                                  </li>
                                  <li
                                    className="dropdown-item"
                                    onClick={() => setSelectedType(2)}
                                  >
                                    Monthly
                                  </li>
                                  <li
                                    className="dropdown-item"
                                    onClick={() => setSelectedType(3)}
                                  >
                                    Daily
                                  </li>
                                </ul>
                              </div>
                              <img
                                src="/resources/imgs/arrowDown.svg"
                                alt="Calendar icon"
                                class="calendar-icon"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              />
                            </div>
                          </div>
                          <div id="chart">
                            {loaderss ? (
                              // <FadeSpinners />
                              <div className="d-flex align-items-center justify-content-center">
                                <FadeSpinners className="me-2" />
                              </div>
                            ) : (
                              <Chart
                                options={options}
                                series={series}
                                type="area"
                                height={350}
                              />
                            )}
                          </div>
                          <div id="html-dist"></div>
                        </div>
                      </div>
                      <div className="col-12 charts_area_market mt-3">
                        <div>
                          <div className="titles_charts">
                            <h1>Transactions History</h1>
                            <div className="d-flex ">
                              <div
                                class="calendar-badge mx-2"
                                style={{ cursor: "pointer" }}
                              >
                                <div
                                  class="calendar-year"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {selectedType1 === 1 && "Yearly"}
                                  {selectedType1 === 2 && "Monthly"}
                                  {selectedType1 === 3 && "Daily"}
                                  <ul className="dropdown-menu">
                                    <li
                                      className="dropdown-item"
                                      onClick={() => setSelectedType1(1)}
                                    >
                                      Yearly
                                    </li>
                                    <li
                                      className="dropdown-item"
                                      onClick={() => setSelectedType1(2)}
                                    >
                                      Monthly
                                    </li>
                                    <li
                                      className="dropdown-item"
                                      onClick={() => setSelectedType1(3)}
                                    >
                                      Daily
                                    </li>
                                  </ul>
                                </div>
                                <img
                                  src="/resources/imgs/arrowDown.svg"
                                  alt="Calendar icon"
                                  className="calendar-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                />
                              </div>
                              <div
                                class="circle-icon d-flex justify-content-center "
                                style={{
                                  cursor: loading ? "not-allowed" : "pointer",
                                }}
                              >
                                {loading ? (
                                  <SpinnerIcon
                                    pulse
                                    style={{
                                      fontSize: "1.5em",
                                    }}
                                    className="text-white"
                                  />
                                ) : (
                                  <img
                                    src="/resources/imgs/import.svg"
                                    alt="Marketing Management Icon"
                                    class=""
                                    onClick={handleDownload}
                                    style={{ cursor: "pointer" }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 comman_table_design px-0 ">
                            <div className="">
                              <div className="row table_head_bill">
                                <div className="col head-container ">
                                  <span class="duration-text">Payment By</span>
                                </div>
                                <div className="col head-container ">
                                  <span class="duration-text">Date</span>
                                </div>
                                <div className="col head-container ">
                                  <span class="duration-text">time</span>
                                </div>
                                <div className="col head-container ">
                                  <span class="duration-text">Commission</span>
                                </div>
                                <div className="col head-container ">
                                  <span class="duration-text">Amount</span>
                                </div>
                              </div>

                              {loaders ? (
                                // <FadeSpinners />
                                <div className="d-flex align-items-center justify-content-center">
                                  <FadeSpinners className="me-2" />
                                </div>
                              ) : (
                                transaction?.map((ite, ind) => {
                                  const createdAt = moment(
                                    ite.createdAt
                                  ).format("MMM DD YYYY");
                                  const createdAtTime = moment(
                                    ite.createdAt
                                  ).format("h:mmA");

                                  return (
                                    <div
                                      className="row table_head_bill_col mt-3"
                                      key={ind}
                                    >
                                      <div className="col head-container">
                                        <span className="duration-text">
                                          {ite?.user?.userName || ""}
                                        </span>
                                      </div>
                                      <div className="col head-container">
                                        <span className="duration-text">
                                          {createdAt}
                                        </span>
                                      </div>
                                      <div className="col head-container">
                                        <span className="duration-text">
                                          {createdAtTime}
                                        </span>
                                      </div>
                                      <div className="col head-container">
                                        <span className="duration-text">
                                          $ {ite.commission}
                                        </span>
                                      </div>
                                      <div className="col head-container">
                                        <span className="duration-text">
                                          $ {ite.amount}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
