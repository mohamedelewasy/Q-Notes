import { docEndpoints } from "@english/shared";
import { imgURL } from "../../types/routes";
import { Link, useParams } from "react-router-dom";
import { API } from "../../axios/client";
import { useQuery } from "react-query";
import { useEffect } from "react";

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
  const params = useParams();
  useQuery("getDoc", () => {
    console.log("hello world");
  });

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
              <Link
                to={
                  API +
                  docEndpoints.downloadDoc.url.replace(
                    ":id",
                    "46dec62e-a527-4127-83cb-29584f134877.pdf"
                  )
                }
              >
                <button type="button" className="btn btn-outline-primary">
                  Download now
                </button>
              </Link>
            </ul>
          </div>
          <div className="col-md-7 mt-4">
            <img
              className="detail-img"
              src={imgURL.replace(":imageId", prop.doc.thumbnail)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
