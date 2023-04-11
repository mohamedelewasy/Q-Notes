import "../assets/css/float-btn.css";
export const FloatBtn = () => {
  return (
    <div
      className="float-btn"
      id="container-floating"
      style={{ background: "rgb(0,0,0,0)" }}
    >
      <div id="floating-button">
        <p className="plus">+</p>
      </div>
    </div>
  );
};
