import React from "react";
import DeskSidebar from "../Common/DeskSidebar";
import { DeskHead } from "../Common/DeskHead";
import { useTranslation } from "react-i18next";
import { Tabs, Placeholder } from "rsuite";

function ChangeLanguage() {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
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
              <div className="col-5 p-3">
                <h4>{t("changeLanguageTitle")}</h4>
                <p className="mt-5">{t("currentLanguage")}</p>
                <div className="container mt-2">
                  <div
                    className="row table_rows my-2"
                    style={{ border: "1px solid #E9EAEC", height: "20px" }}
                  >
                    <div
                      className="row"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "-20px",
                      }}
                    >
                      <div className="col-sm-1">
                        <img
                          src="/resources/imgs/eng.svg"
                          alt="Duration icon"
                          className="duration-icon"
                          style={{ height: "31.38px", width: "31.38px" }}
                          onClick={() => handleChangeLanguage("en")}
                        />
                      </div>
                      <div className="col-sm-10 d-flex flex-column align-items-start justify-content-center">
                        <h4>{t("English(USA)")}</h4>
                      </div>
                      <div className="col-sm-1 d-flex align-items-center justify-content-center">
                        <div className="row-container form-control bg-white">
                          <div className="form-check">
                            <input
                              className="form-check-input mt-0"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked={i18n.language === "en"}
                              style={{ height: "28.97px", width: "28.97px" }}
                              onClick={() => handleChangeLanguage("en")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3">{t("allLanguages")}</p>
                <div className="container mt-2">
                  <div
                    className="row table_rows my-2"
                    style={{ border: "1px solid #E9EAEC", height: "20px" }}
                  >
                    <div
                      className="row"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "-20px",
                      }}
                    >
                      <div className="col-sm-1">
                        <img
                          src="/resources/imgs/greek.svg"
                          alt="Duration icon"
                          className="duration-icon"
                          style={{ height: "31.38px", width: "31.38px" }}
                          onClick={() => handleChangeLanguage("gr")}
                        />
                      </div>
                      <div className="col-sm-10 d-flex flex-column align-items-start justify-content-center">
                        <h4>{t("Greek")}</h4>
                      </div>
                      <div className="col-sm-1 d-flex align-items-center justify-content-center">
                        <div className="row-container form-control bg-white">
                          <div className="form-check">
                            <input
                              className="form-check-input mt-0"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked={i18n.language === "gr"}
                              style={{ height: "28.97px", width: "28.97px" }}
                              onClick={() => handleChangeLanguage("gr")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
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

export default ChangeLanguage;
