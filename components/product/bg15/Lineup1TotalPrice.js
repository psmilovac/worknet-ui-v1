import { Lineup1Price } from "@/components/functions/price";
import { Dollar } from "@/components/functions/conversions";
import { api_root } from "@/global/global_vars";
import useSWR from "swr";
import ThreeDotsTypingSpinner from "@/components/ui/spinners/ThreeDotsTypingSpinner";

export default function Lineup1TotalPrice({ lineup1_id }) {
  // console.log("lineup1_id", lineup1_id);
  const lineup1_nested_api_url = api_root + "/api/bg/lineup1-nested/";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // if (lineup1_id ){
  //   return <div><ThreeDotsTypingSpinner /></div>
  // }

  const {
    data: lineup1_nested,
    error: error_lineup1_nested,
    isLoading: is_loading_lineup1_nested,
    // mutate: mutateLineup1,
  } = useSWR(lineup1_nested_api_url + lineup1_id,  fetcher); //

  if (is_loading_lineup1_nested) return <ThreeDotsTypingSpinner />;
  if (!lineup1_nested) return <p>No profile data</p>;
  if (error_lineup1_nested) return <div>Failed to load</div>;

  return <div>{Dollar(Lineup1Price(lineup1_nested))}</div>;
  // return <div>Test</div>;
}
