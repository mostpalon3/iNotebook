import React from "react";

const NotePage = (props) => {
  const { refNote, noteInfo } = props;
  const formattedDate = refNote
    ? new Date(noteInfo.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const formattedTime = noteInfo
    ? new Date(noteInfo.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div>
      <button
        type="button"
        ref={refNote}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        this ones refClicked
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header" style={{padding:"13px"}}>
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {noteInfo.title}
                <div className="form-text" style={{ color: "gray" }}>
                  <small style={{ fontSize: "0.8em" }}>
                    {formattedTime} {formattedDate}
                  </small>
                </div>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{noteInfo.description}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
