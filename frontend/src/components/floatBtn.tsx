import { MouseEvent, useRef, useContext, useState } from "react";
import "../assets/css/float-btn.css";
import { createDocRequest } from "../axios/doc";
import { AuthContext } from "../context/userContext";
import { Doc } from "@english/shared";
import { useNavigate } from "react-router-dom";
import { docDetail } from "../types/routes";

export const FloatBtn = () => {
  const navigate = useNavigate();
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const educationLevel = useRef<HTMLInputElement>(null);
  const className = useRef<HTMLInputElement>(null);
  const semester = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const pdf = useRef<HTMLInputElement>(null);
  const thumbnail = useRef<HTMLInputElement>(null);
  const useAuth = useContext(AuthContext);

  const handleCreateDocument = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title.current?.value || "");
    formData.append("educationLevel", educationLevel.current?.value || "");
    formData.append("className", className.current?.value || "");
    formData.append("semester", semester.current?.value || "");
    formData.append("description", description.current?.value || "");
    formData.append("price", price.current?.value || "");
    formData.append("pdf", (pdf.current?.files as FileList)[0]);
    formData.append("thumbnail", (thumbnail.current?.files as FileList)[0]);
    try {
      const res = await createDocRequest(formData, useAuth.user.token || "");
      navigate(docDetail.replace(":id", res.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="float-btn"
        id="container-floating"
        style={{ background: "rgb(0,0,0,0)" }}
      >
        <div id="floating-button">
          <p
            className="plus"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            +
          </p>
        </div>
      </div>
      <div className="modal fade" id="staticBackdrop" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                create a new document
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="d-flex flex-column gap-1"
                encType="multipart/form-data"
                onSubmit={handleCreateDocument}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  className="form-control"
                  ref={title}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="description"
                  className="form-control"
                  ref={description}
                />
                <input
                  type="text"
                  name="educationLevel"
                  placeholder="education level"
                  className="form-control"
                  ref={educationLevel}
                />
                <input
                  type="text"
                  name="className"
                  placeholder="class name"
                  className="form-control"
                  ref={className}
                />
                <input
                  type="text"
                  name="semester"
                  placeholder="semester"
                  className="form-control"
                  ref={semester}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  className="form-control"
                  ref={price}
                />

                <hr />
                <label htmlFor="pdf">upload pdf</label>
                <input
                  type="file"
                  name="pdf"
                  id="pdf"
                  placeholder="upload pdf"
                  className="form-control"
                  ref={pdf}
                />
                <label htmlFor="thumbnail">upload thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  placeholder="upload thumbnail"
                  className="form-control"
                  ref={thumbnail}
                />
                <button type="submit" className="btn btn-primary mt-2">
                  create document
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
