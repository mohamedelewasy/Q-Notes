import { Link } from "react-router-dom";
import "../assets/css/doc-card.css";
import { docDetail, docList } from "../types/routes";

interface Iprop {
  doc: {
    id: string;
    image: string;
    title: string;
    updatedAt: string;
    description: string;
    educationLevel: string;
    className: string;
    semester: string;
  };
}

export const DocCard = (props: Iprop) => {
  return (
    <article className="postcard light blue">
      <Link
        to={docDetail.replace(":id", props.doc.id)}
        className="postcard__img_link"
      >
        <img
          className="postcard__img"
          src="https://picsum.photos/1000/1000"
          alt="pdf thumbinal"
        />
      </Link>
      <div className="postcard__text t-dark">
        <h1 className="postcard__title blue">
          <Link to={docDetail.replace(":id", props.doc.id)}>
            {props.doc.title}
          </Link>
        </h1>
        <div className="postcard__subtitle small">
          <time>
            <i className="fas fa-calendar-alt mr-2"></i>
            {props.doc.updatedAt}
          </time>
        </div>
        <div className="postcard__bar"></div>
        <div className="postcard__preview-txt">{props.doc.description}</div>
        <ul className="postcard__tagbox">
          <li className="tag__item">
            <i className="fas fa-tag mr-2"></i>
            {props.doc.educationLevel} school
          </li>
          <li className="tag__item">
            <i className="fas fa-tag mr-2"></i>level {props.doc.className}
          </li>
          <li className="tag__item">
            <i className="fas fa-tag mr-2"></i>semester {props.doc.semester}
          </li>
        </ul>
      </div>
    </article>
  );
};
