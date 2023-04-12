import { DocCard } from "../components/docCard";
import { SearchBox } from "../components/searchBox";
import { useEffect, useState } from "react";
import { Doc } from "@english/shared";
import { toast } from "react-toastify";
import { Pagination } from "../components/pagination";
import { FloatBtn } from "../components/floatBtn";
import { docListRequest } from "../axios/doc";
import { useLocation } from "react-router-dom";
import { IsAdmin } from "../components/isAdmin";

export const DocList = () => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    docListRequest(
      params.get("educationLevel") || "",
      +(params.get("page") || 1),
      params.get("keyWord") || ""
    )
      .then((res) => {
        setDocs(res.articles);
        setCount(res.count);
      })
      .catch((err) =>
        toast((err as Error).message, {
          toastId: 2,
          autoClose: false,
          type: "error",
        })
      );
  }, [location.search]);

  return (
    <div className="container">
      <SearchBox />
      <div className="h1 text-center text-dark" id="pageHeaderTitle">
        Our Documentaions
      </div>
      <div className="row docs-count">{count} results</div>
      {count === 0 && <h1>Loading ...</h1>}
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
        <Pagination
          currentPage={+(new URLSearchParams(location.search).get("page") || 1)}
          limit={10}
          results={count || 0}
        />
      )}
      <IsAdmin>
        <FloatBtn />
      </IsAdmin>
    </div>
  );
};
