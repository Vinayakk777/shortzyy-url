import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreateLink } from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";
import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import { UrlState } from "@/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 px-4 py-8 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl shadow-lg border border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold">{urls?.length || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 backdrop-blur-xl shadow-lg border border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold">{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-4xl font-extrabold text-white">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <Filter className="absolute top-2 right-2 text-gray-400" />
      </div>

      {error && <Error message={error?.message} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
