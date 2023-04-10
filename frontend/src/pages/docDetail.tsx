import { docEndpoints } from "@english/shared";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DocCardDetail } from "../components/docCardDetail";
import { API } from "../context/api";

export const DocDetail = () => {
  const params = useParams();
  const [doc, setDoc] = useState(undefined);
  useEffect(() => {
    const docId = params.id;
    axios
      .request({
        url: API + docEndpoints.getDoc.url.replace(":id", docId || ""),
        method: docEndpoints.getDoc.method,
      })
      .then((res) => {
        setDoc(res.data);
      })
      .catch((err) =>
        toast("can't reach this documentaion", {
          toastId: 3,
          autoClose: false,
          type: "error",
        })
      );
  }, []);
  return (
    <>
      {doc === undefined && <h1>Loading...</h1>}
      {doc !== undefined && <DocCardDetail doc={doc} />}
    </>
  );
};
