import { DocCard } from "../components/docCard";
import { SearchBox } from "../components/searchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../context/api";
import { Doc, docEndpoints } from "@english/shared";
import { toast } from "react-toastify";
import { Pagination } from "../components/pagination";

export const Home = () => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [count, setCount] = useState(undefined);
  const currentPage = +(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    axios
      .request({
        url: API + docEndpoints.getDocList.url,
        method: docEndpoints.getDocList.method,
        params: {
          educationLevel: params.get("educationLevel"),
          page: params.get("page"),
          keyWord: params.get("keyWord"),
        },
      })
      .then((res) => {
        setDocs(res.data.articles);
        setCount(res.data.count);
      })
      .catch((err) =>
        toast("unstable internet connection or server error", {
          toastId: 2,
          autoClose: false,
          type: "error",
        })
      );
  }, []);
  return (
    <div className="container">
      <SearchBox />
      <div className="h1 text-center text-dark" id="pageHeaderTitle">
        Our Documentaions
      </div>
      <div className="row docs-count">{count} results</div>
      {count === undefined && <h1>loading</h1>}
      {count === 0 && <h1>No Documentaions found</h1>}
      {(count || 0) > 0 &&
        docs.map((el) => (
          <DocCard
            key={el.id}
            doc={{
              id: el.id,
              className: el.className,
              description: el.description,
              educationLevel: el.educationLevel,
              image: el.thumbnail,
              semester: el.semester,
              title: el.title,
              updatedAt: el.updatedAt.toString(),
            }}
          />
        ))}
      {(count || 0) > 0 && (
        <Pagination currentPage={currentPage} limit={10} results={count || 0} />
      )}
    </div>
  );
};
