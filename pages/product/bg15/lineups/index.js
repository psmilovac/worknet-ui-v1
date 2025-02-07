import ProductLayout from "@/components/layouts/ProductLayout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import LineupTable from "@/components/product/bg15/LineupTable";
import useSWR from "swr";
import { useRouter } from "next/router";
import AuthContext from "@/components/context/AuthContext";
import { useContext } from "react";
import { api_root } from "@/global/global_vars";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const api_url = api_root + "/api/bg/lineup1";

export default function Page(props) {
  const { isAuthenticated, accessToken, user } = useContext(AuthContext) || {}; // error will show without || {}
  // console.log("accessToken from Lineup1", accessToken);
  // console.log("user_id from Lineup/index", user?.user_id);

  const router = useRouter();

  const { data, error, isLoading } = useSWR(api_url, fetcher);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  if (error) return <div>Loading profile data</div>;

  const title = "Lineups";

  return (
    <div>
      {/* <Breadcrumbs router={router}/> */}

      <h1>{title}</h1>
      {/* <LineupTable lineup1={data} /> */}
    </div>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <>
      <ProductLayout>{page}</ProductLayout>
    </>
  );
};
