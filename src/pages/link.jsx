import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const LinkPage = () => {
  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title || "QRCode";
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const link = url?.custom_url ? url?.custom_url : url?.short_url;

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />
      )}

      <div className="flex flex-col gap-8 lg:flex-row justify-between">
        {/* Left Section - Link Details */}
        <div className="flex flex-col gap-6 lg:w-2/5 bg-white/5 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <h1 className="text-5xl font-extrabold text-blue-400 hover:underline cursor-pointer">
            {url?.title}
          </h1>

          <a
            href={`https://shortzyy.in/${link}`}
            target="_blank"
            rel="noreferrer"
            className="text-2xl text-blue-500 font-semibold hover:underline"
          >
            https://shortzyy.in/{link}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-gray-300 hover:text-white"
          >
            <LinkIcon className="p-1" /> {url?.original_url}
          </a>

          <span className="text-sm font-light text-gray-400">
            Created on: {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="hover:bg-blue-600/20"
              onClick={() =>
                navigator.clipboard.writeText(`https://shortzyy.in/${link}`)
              }
            >
              <Copy />
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-green-600/20"
              onClick={downloadImage}
            >
              <Download />
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-red-600/20"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>

          <div className="flex justify-center">
            <img
              src={url?.qr}
              className="w-48 h-48 sm:w-60 sm:h-60 object-contain rounded-xl ring ring-blue-500 p-1 bg-white"
              alt="QR code"
            />
          </div>
        </div>

        {/* Right Section - Stats */}
        <Card className="lg:w-3/5 shadow-md hover:shadow-xl transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-blue-400">
              Statistics
            </CardTitle>
          </CardHeader>

          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center bg-white/10">
                  <CardHeader>
                    <CardTitle>Total Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.length}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <CardTitle className="text-lg mb-2">Location Data</CardTitle>
                <Location stats={stats} />
              </div>

              <div>
                <CardTitle className="text-lg mb-2">Device Info</CardTitle>
                <DeviceStats stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-center text-gray-400 py-8">
              {loadingStats === false
                ? "No Statistics Available"
                : "Fetching Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
