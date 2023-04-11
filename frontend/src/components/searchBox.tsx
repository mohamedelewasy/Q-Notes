import { useEffect, useState } from "react";
import "../assets/css/search-box.css";
import { Link, createSearchParams, useLocation } from "react-router-dom";
import { docList } from "../types/routes";
export const SearchBox = () => {
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    setKeyWord(new URLSearchParams(location.search).get("keyWord") || "");
  }, [location.search]);
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
                pathname: docList,
                search: `${createSearchParams({
                  keyWord: keyWord || "",
                  educationLevel: params.get("educationLevel") || "",
                  page: params.get("page") || "1",
                })}`,
              }}
            >
              <button className="btn btn-primary doc-search-btn">Search</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
