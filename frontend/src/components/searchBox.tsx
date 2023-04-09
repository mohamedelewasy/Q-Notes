import { useState } from "react";
import "../assets/css/search-box.css";
import { Link, createSearchParams } from "react-router-dom";
import { home } from "../types/routes";
export const SearchBox = () => {
  const [keyWord, setKeyWord] = useState(
    new URLSearchParams(window.location.search).get("keyWord")
  );
  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="search">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control doc-search"
              placeholder="Search in our documentations."
              value={keyWord || ""}
              onChange={(e) => setKeyWord(e.target.value)}
            />
            <Link
              to={{
                pathname: home,
                search: `${keyWord && createSearchParams({ keyWord })}`,
              }}
              reloadDocument
            >
              <button className="btn btn-primary doc-search-btn">Search</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
