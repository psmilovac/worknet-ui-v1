import React from "react";
import { useCSVDownloader } from "react-papaparse";
import useSWR from "swr";
import { api_root } from "@/global/global_vars";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DownloadBOM({ test_data, lineup1_id }) {
  const lineup1_nested_api_url = api_root + "/api/bg/lineup1-nested/";
  const { CSVDownloader, Type } = useCSVDownloader();
  const csv_data = test_data;

  const {
    data: lineup1_nested,
    error: error_lineup1_nested,
    isLoading: is_loading_lineup1_nested,
    // mutate: mutateLineup1,
  } = useSWR(lineup1_nested_api_url + lineup1_id, fetcher); //
  if (is_loading_lineup1_nested) return "Loading...";
  if (!lineup1_nested) return <p>No profile data</p>;
  if (error_lineup1_nested) return <div>Failed to load</div>;

  console.log(lineup1_id);

  return (
    <div>
      <div>
        <CSVDownloader
          // type={Type.Button}
          bom={true}
          filename={"unparsed_csv_string"}
          delimiter={","}
          data={lineup1_nested.unit1}
        >
          Download
        </CSVDownloader>
      </div>
    </div>
  );
}
