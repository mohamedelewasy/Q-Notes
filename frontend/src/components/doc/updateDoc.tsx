import { useContext, useRef, useState, MouseEvent, useEffect } from "react";
import { AuthContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { Doc } from "@english/shared";
import {
  deleteDocRequest,
  docDetailRequest,
  updateDocRequest,
} from "../../axios/doc";
import { toast } from "react-toastify";
import { docList } from "../../types/routes";

export const UpdateDoc = () => {
  const navigate = useNavigate();
  const params = useParams();
  const useAuth = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [className, setClassName] = useState("");
  const [semester, setSemester] = useState("");
  const [price, setPrice] = useState("");
  const pdf = useRef<HTMLInputElement>(null);
  const thumbnail = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    docDetailRequest(params.id || "")
      .then((res: Doc) => {
        setTitle(res.title);
        setDescription(res.description);
        setEducationLevel(res.educationLevel);
        setClassName(res.className);
        setSemester(res.semester);
        setPrice(`${res.price}`);
      })
      .catch((err) =>
        toast("can't reach this documentaion", {
          toastId: 3,
          autoClose: false,
          type: "error",
        })
      );
  }, []);

  const handleUpdateDocument = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("educationLevel", educationLevel);
    formData.append("className", className);
    formData.append("semester", semester);
    formData.append("description", description);
    formData.append("price", price);
    if ((pdf.current?.files as FileList)[0])
      formData.append("pdf", (pdf.current?.files as FileList)[0]);
    if ((thumbnail.current?.files as FileList)[0])
      formData.append("thumbnail", (thumbnail.current?.files as FileList)[0]);
    try {
      await updateDocRequest(
        params.id || "",
        formData,
        useAuth.user.token || ""
      );
      window.location.reload();
    } catch (error) {
      setErrors((error as Error).message);
    }
  };

  const handleDeleteDocument = (e: MouseEvent<HTMLButtonElement>) => {
    try {
      deleteDocRequest(params.id || "", useAuth.user.token || "");
      modal.current?.click();
      navigate(docList);
    } catch (error) {
      toast("can't reach this documentaion", {
        toastId: 3,
        autoClose: false,
        type: "error",
      });
    }
  };
  return (
    <>
      <div className="modal fade" id="staticBackdrop" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                edit this document
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={modal}
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="d-flex flex-column gap-1"
                encType="multipart/form-data"
              >
                {errors && (
                  <div
                    className="alert alert-danger error-message"
                    role="alert"
                  >
                    {errors}
                  </div>
                )}
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  name="educationLevel"
                  placeholder="education level"
                  className="form-control"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                />
                <input
                  type="text"
                  name="className"
                  placeholder="class name"
                  className="form-control"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
                <input
                  type="text"
                  name="semester"
                  placeholder="semester"
                  className="form-control"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                <div className="d-flex flex-row gap-1 justify-content-center">
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleUpdateDocument}
                  >
                    update document
                  </button>
                  <button
                    className="btn btn-danger mt-2 delete-doc-btn"
                    onClick={handleDeleteDocument}
                  >
                    delete document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
