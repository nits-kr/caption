import React, { useEffect, useState } from "react";
import { getContent } from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import { DeskHead } from "../../Common/DeskHead";

function Terms() {
  const [loader, setLoader] = useState(false);
  const [about, setAbout] = useState("");
  useEffect(() => {
    contentDetail();
  }, []);

  const contentDetail = async () => {
    setLoader(true);
    const { data } = await getContent({
      type: "T&C",
    });
    if (!data.error) {
      setAbout(data?.results?.content);
      setLoader(false);
    }
  };
  return (
    <>
      <div className="admin_main ">
        <div className="row">
          <div className="admin_main_inner col-12 bg-light p-0">
            <DeskHead />
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-center relative"
          style={{ backgroundColor: "#F5F4F6" }}
        >
          <h2
            className="text-white"
            style={{ zIndex: "1", marginBottom: "-20vh", marginTop: "15vh" }}
          >
            ATHLOPOLIS
          </h2>
          <img
            src="/resources/imgs/about.svg"
            alt="Duration icon"
            className=""
            style={{ width: "-webkit-fill-available" }}
          />
          <div
            className="admin_panel_data height_adjust"
            style={{ zIndex: "1", marginTop: "-15vh", width: "1202px" }}
          >
            <div
              className="row dashboard_part justify-content-center bg-white"
              style={{ borderRadius: "10px" }}
            >
              <div className="col-12 p-5">
                <h4 className="text-primary">Terms & Conditions</h4>
                <h6 className="my-2">{about?.[0]?.title_en || ""}</h6>
                <p className="d-flex flex-column align-items-start justify-content-center relative">
                  {about?.[0]?.content_en || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;
