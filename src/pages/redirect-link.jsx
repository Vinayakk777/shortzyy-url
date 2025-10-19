import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data?.original_url) {
      // Record click in background
      fetch("/api/store-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url_id: data.id,
          originalUrl: data.original_url,
        }),
      }).catch(console.error);

      // Redirect to the original URL
      window.location.href = data.original_url;
    }
  }, [loading, data]);

  if (loading) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
