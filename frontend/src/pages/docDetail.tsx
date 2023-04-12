import { Doc } from "@english/shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DocCardDetail } from "../components/doc/docCardDetail";
import { IsAdmin } from "../components/isAdmin";
import { FloatBtn } from "../components/floatBtn";
import { docDetailRequest } from "../axios/doc";

export const DocDetail = () => {
  const params = useParams();
  const [doc, setDoc] = useState<Doc | undefined>(undefined);
  useEffect(() => {
    const docId = params.id;
    docDetailRequest(docId || "")
      .then((res) => {
        setDoc(res);
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
      <IsAdmin>
        <FloatBtn create={false} update={true} />
      </IsAdmin>
    </>
  );
};
