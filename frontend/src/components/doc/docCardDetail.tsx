interface Iprop {
  doc: {
    id: string;
    thumbnail: string;
    title: string;
    updatedAt: Date;
    description: string;
    educationLevel: string;
    className: string;
    semester: string;
    price: number;
  };
}
export const DocCardDetail = (prop: Iprop) => {
  return (
    <div className="container py-4 my-4 mx-auto d-flex flex-column">
      <div className="header">
        <div className="row r1">
          <div className="col-md-9 abc">
            <h1>{prop.doc.title}</h1>
          </div>
          <div className="col-md-3 text-right pqr">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
        </div>
      </div>
      <div className="container-body mt-4">
        <div className="row r3">
          <div className="col-md-5 p-0 klo">
            <ul>
              <li>{prop.doc.educationLevel} school</li>
              <li>for className number {prop.doc.className}</li>
              <li>semester {prop.doc.className}</li>
              <p>{prop.doc.description}</p>
              <button type="button" className="btn btn-outline-primary">
                BUY NOW FOR {prop.doc.price}
              </button>
            </ul>
          </div>
          <div className="col-md-7 mt-4">
            <img className="detail-img" src="https://picsum.photos/1000/1000" />
          </div>
        </div>
      </div>
    </div>
  );
};
