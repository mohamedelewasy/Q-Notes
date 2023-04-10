import { Link, createSearchParams, useSearchParams } from "react-router-dom";
import "../assets/css/pagination.css";
import { home } from "../types/routes";
interface Iprop {
  results: number;
  currentPage: number;
  limit: number;
}
export const Pagination = (props: Iprop) => {
  const lastPage = Math.ceil(props.results / props.limit);
  return (
    <div id="app" className="container pagination ">
      <ul className="page">
        {props.currentPage > 1 && (
          <Link
            to={{
              pathname: home,
              search: `${createSearchParams({
                page: `${props.currentPage - 1}`,
              })}`,
            }}
            className="no-link"
            reloadDocument
          >
            <li className="page__btn">
              <span className="material-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30 "
                  fill="currentColor"
                  className="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </span>
            </li>
          </Link>
        )}

        {props.currentPage > 1 && (
          <Link
            to={{
              pathname: home,
              search: `${createSearchParams({ page: "1" })}`,
            }}
            className="no-link"
            reloadDocument
          >
            <li className="page__numbers">1</li>
          </Link>
        )}
        {props.currentPage - 1 > 2 && <li className="page__dots">...</li>}
        {props.currentPage > 2 && (
          <Link
            to={{
              pathname: home,
              search: `${createSearchParams({
                page: `${props.currentPage - 1}`,
              })}`,
            }}
            className="no-link"
            reloadDocument
          >
            <li className="page__numbers">{props.currentPage - 1}</li>
          </Link>
        )}

        <li className="page__numbers active">{props.currentPage}</li>

        {props.currentPage < lastPage && (
          <Link
            to={{
              pathname: home,
              search: `${createSearchParams({
                page: `${props.currentPage + 1}`,
              })}`,
            }}
            className="no-link"
            reloadDocument
          >
            <li className="page__numbers">{props.currentPage + 1}</li>
          </Link>
        )}

        {props.currentPage + 1 < lastPage && (
          <li className="page__dots">...</li>
        )}
        {props.currentPage + 1 < lastPage && (
          <Link
            to={{
              pathname: home,
              search: `${createSearchParams({
                page: `${lastPage}`,
              })}`,
            }}
            className="no-link"
            reloadDocument
          >
            <li className="page__numbers">{lastPage}</li>
          </Link>
        )}

        {props.currentPage < lastPage && (
          <Link
            to={{
              pathname: home,
              search: `${createSearchParams({
                page: `${props.currentPage + 1}`,
              })}`,
            }}
            className="no-link"
            reloadDocument
          >
            <li className="page__btn">
              <span className="material-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30 "
                  fill="currentColor"
                  className="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </span>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};
