 import useSWR from "swr";
 const [lvLine, setLvLine] = useState();
 
 

 export async function GetLvLineAPI(lvline_id){

    
      return lvLine

 }


 // FETCH by useSWR (it lacks Bearer token)
  // Get LvLine using useSWR
    // console.log(lvline)

  // // Get LvLine using useSWR
//   const {
//     data: lvitem_table,
//     error: error_lvitem_table,
//     isLoading: is_loading_lvitem_table,
//     mutate: mutateLvItemTable,
//   } = useSWR(api_root + "/api/lv/item", fetcher); //

//   if (is_loading_lvitem_table) return <PsSpinner />; // fire spinner on startup
//   if (!lvitem_table) return <p>No item table profile data</p>;
//   if (error_lvitem_table) return <PsSpinner />;
//   console.log(lvitem_table)