import "../assets/css/float-btn.css";
import { CreateDoc } from "./doc/createDoc";
import { UpdateDoc } from "./doc/updateDoc";
interface Iprops {
  create: boolean;
  update: boolean;
}

export const FloatBtn = (props: Iprops) => {
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
            {props.create && (
              <i
                className="bi bi-clipboard-plus"
                style={{ fontSize: "32px" }}
              ></i>
            )}
            {props.update && (
              <i
                className="bi bi-pencil-square"
                style={{ fontSize: "32px" }}
              ></i>
            )}
          </p>
        </div>
      </div>
      {props.create && <CreateDoc />}
      {props.update && <UpdateDoc />}
    </>
  );
};
