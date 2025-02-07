import { useEffect, useContext } from "react";
import ProductLayout from "@/components/layouts/ProductLayout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { useRouter } from "next/router";
import { api_root, category } from "@/global/global_vars";
import useSWR from "swr";
import axios from "axios";
import ButtonMini from "@/components/ui/buttons/ButtonMini";
import ButtonMiniActive from "@/components/ui/buttons/ButtonMiniActive";
import ButtonMiniDelete from "@/components/ui/buttons/ButtonMiniDelete";
import { useState } from "react";
import styles from "@/styles/styles.module.css";
import Link from "next/link";
import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import ArrowRight from "@/components/ui/icons/ArrowRight";
import Trashcan from "@/components/ui/icons/Trashcan";
import Image from "next/image";
import ThreeDotsTypingSpinner from "@/components/ui/spinners/ThreeDotsTypingSpinner";

import {
  Lineup1Price,
  PackPrice,
  Unit1Price,
} from "@/components/functions/price";

import { Dollar } from "@/components/functions/conversions";
import { CloneUnit1 } from "@/components/functions/clone";
import Unit1CleanupVT from "@/components/functions/unit1_cleanup_vt";
import Unit1CleanupCPT from "@/components/functions/unit1_cleanup_cpt";

import Checkbox from "@/components/ui/Checkbox";
import { redirect } from "next/dist/server/api-utils";
import Clone from "@/components/ui/icons/Clone";

import Unit1BOMModal from "@/components/modals/Unit1BOMModal";
import BusModal from "@/components/modals/BusModal";
import CTModal from "@/components/modals/CTModal";
import CompsModal from "@/components/modals/CompsModal";
import VTModal from "@/components/modals/VTModal";
import CPTModal from "@/components/modals/CPTModal";
import CBModal from "@/components/modals/CBModal";
import ControlPackageModal from "@/components/modals/ControlPackageModal";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import ConfirmMessageModal from "@/components/modals/ConfirmMessageModal";
import ConfirmDeleteUnit1Modal from "@/components/modals/ConfirmDeleteUnit1Modal";
import GCTModal from "@/components/modals/GCTModal";
import SAModal from "@/components/modals/SAModal";

import ButtonSectionConfig from "@/components/ui/buttons/ButtonSectionConfig";
import Bg1BOM from "@/components/product/bg15/Bg1BOM";
import PrintLineup1 from "@/components/print-to-pdf/PrintLineup1";
import PrintLineup1BOM from "@/components/print-to-pdf/PrintLineup1BOM";
import PrintLineup1BOMItems from "@/components/print-to-pdf/PrintLineup1BOMItems";

import Lineup1TotalPrice from "@/components/product/bg15/Lineup1TotalPrice";
import PsSpinner from "@/components/ui/spinners/PsSpinner";
import ThreeDotsMiniTypingSpinner from "@/components/ui/spinners/ThreeDotsMiniTypingSpinner";
import ThreeDotsFlashingSpinner from "@/components/ui/spinners/ThreeDotsFlashingSpinner";
import ThreeDotsMiniFlashingSpinner from "@/components/ui/spinners/ThreeDotsMiniFlashingSpinner";
import TriangleMiniSideSpinner from "@/components/ui/spinners/TriangleMiniSideSpinner";
import ThreeDotsCarouselSpinner from "@/components/ui/spinners/ThreeDotsCarouselSpinner";
import CircleSpinner from "@/components/ui/spinners/CircleSpinner";

// import { Unit1SetComps } from "@/components/functions/unit1_set_comps";
import { Unit1PickComps } from "@/components/functions/unit1_pick_comps";
import { FindCompsInLineup1Nested } from "@/components/functions/pack_table_filters";
import Unit1CleanupBus from "@/components/functions/unit1_cleanup_bus";
import Unit1PickMetal1 from "@/components/functions/unit1_pick_metal1";
import { FlatBom2PriceFunction } from "@/components/functions/price";
import { FlatBom3PriceFunction } from "@/components/functions/price";

import AuthContext from "@/components/context/AuthContext";
import SettingsContext from "@/components/context/SettingsContext";
import { Lineup1BusErrorCheck } from "@/components/functions/lineup1_bus_error_check";

import DollarCircleIcon from "@/components/ui/icons/DollarCircleIcon";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import ButtonIconActive from "@/components/ui/buttons/ButtonIconActive";
import ButtonIconInactive from "@/components/ui/buttons/ButtonIconInactive";
import ElevationIcon from "@/components/ui/icons/ElevationIcon";
import NewSectionIcon from "@/components/ui/icons/NewSectionIcon";
import SingleLineIcon from "@/components/ui/icons/SingleLineIcon";
import Trashcan2Icon from "@/components/ui/icons/Trashcan2Icon";
import BomIcon from "@/components/ui/icons/BomIcon";
import CloseIcon from "@/components/ui/icons/CloseIcon";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import OtherOptionsModal from "@/components/modals/OtherOptionsModal";

import toast, { Toaster } from "react-hot-toast";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
// unit image size: 150px x 396px, ratio 2.64 (older options: 125 x 330, 145 x 383)

// api url
const base_api_url = api_root + "/api/bg/lineup1-nested/"; // full list, but slowest link
const lineup1_shallow_api_url = api_root + "/api/bg/lineup1/";
const lineup1_nested_api_url = api_root + "/api/bg/lineup1-nested/";
const delete_lineup1_api_url = api_root + "/api/bg/lineup1-delete/";
const lineup1_sort_api_url = api_root + "/api/bg/lineup1-sort";
const put_unit1_api = api_root + "/api/bg/unit1-put/";
const new_unit1_api_url = api_root + "/api/bg/unit1-new";
const delete_unit1_api_url = api_root + "/api/bg/unit1-delete/";
const delete_unit1_with_sort_api_url = api_root + "/api/bg/unit1-delete-sort/";
const get_pack_table_api = api_root + "/api/pack"; //shallow depth,
const get_pack_data_api = api_root + "/api/pack-category/";
const get_unit1_nested = api_root + "/api/bg/unit1-nested/";
const put_unit1_return_lineup1_api =
  api_root + "/api/put-unit1-return-lineup1/";
const cancel_lineup1_api = api_root + "/api/bg/lineup1_cancel/";
const save_lineup1_api = api_root + "/api/bg/lineup1_save/";

const fontSizeTransformersRatio = "0.60rem";
// section and unit1 are interchangable names
export default function Page() {
  const router = useRouter();
  const { isAuthenticated, accessToken, user } = useContext(AuthContext) || {}; // error will show without || {}
  // console.log("accessToken from Lineup1", accessToken);
  console.log("logged user_id", user?.user_id);

  // AUTH
  useEffect(() => {
    loadUser();
    getPack(); // not need to load pack here!
    GetFlatBom3();
  }, [isAuthenticated]);

  const loadUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      if (!res.data) {
        // console.log("User is here", res.data.user);
        router.push("/");
      }
    } catch (error) {
      router.push("/");
      // console.log("Load user in Quotes page error:", error);
    }
  };

  // User Settings Context
  const {
    showSingleLineContext,
    showFrontViewContext,
    showPriceContext,
    setShowSingleLineContext,
    setShowFrontViewContext,
    setShowPriceContext,
  } = useContext(SettingsContext);

  const [pack_table, setPackTable] = useState("");
  const [packData, setPackData] = useState("");
  const [unit1New, setUnit1New] = useState("");
  const [unit1, setUnit1] = useState("");
  const [unit1Nested, setUnit1Nested] = useState("");
  const [lineup1State, setLineup1State] = useState("");
  const [lineup1Nested, setLineup1Nested] = useState("");
  // const [showComps, setShowComps] = useState(false); // replaced with Context
  // const [showBus, setShowBus] = useState(true); // replaced with Context
  // const [showPrice, setShowPrice] = useState(true); // replaced with Context
  const [loading, setLoading] = useState(false); // delete?
  const [showUnit1BOMModal, setShowUnit1BOMModal] = useState(false);
  const [showBusModal, setShowBusModal] = useState(false);
  const [showCTModal, setShowCTModal] = useState(false);
  const [showVTModal, setShowVTModal] = useState(false);
  const [showCompsModal, setShowCompsModal] = useState(false);
  const [showCPTModal, setShowCPTModal] = useState(false);
  const [showCBModal, setShowCBModal] = useState(false);
  const [showControlPackageModal, setShowControlPackageModal] = useState(false);
  const [showGCTModal, setShowGCTModal] = useState(false);
  const [showSAModal, setShowSAModal] = useState(false);
  const [showOtherOptionsModal, setShowOtherOptionsModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmDeleteUnit1Modal, setShowConfirmDeleteUnit1Modal] =
    useState(false);
  const [deleteUnit1ModalState, setDeleteUnit1ModalState] = useState(false);
  const [deleteUnit1ID, setDeleteUnit1ID] = useState(null);
  const [deleteUnit1Index, setDeleteUnit1Index] = useState(null);
  const [showConfirmMessageModal, setConfirmMessageModal] = useState(false);
  const [modalBusID, setModalBusID] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalUnit1ID, setModalUnit1ID] = useState(""); // store selected UnitID into state when accessing Modal
  const [modalCategoryID, setModalCategoryID] = useState("");
  const [modalCategory, setModalCategory] = useState("");
  const [sharedBusState, setSharedBusState] = useState(null); //when Bus or Compartment is selected in modal, trigger mutate
  const [sharedCTState, setSharedCTState] = useState(null); //when CT is selected in modal, trigger mutate
  const [sharedCompsState, setSharedCompsState] = useState(null);
  const [sharedVTState, setSharedVTState] = useState(null);
  const [sharedCPTState, setSharedCPTState] = useState(null);
  const [sharedCBState, setSharedCBState] = useState(null);
  const [sharedControlPackageState, setSharedControlPackageState] =
    useState(null);
  const [sharedGCTState, setSharedGCTState] = useState(null);
  const [sharedSAState, setSharedSAState] = useState(null);
  const [sharedOtherOptionsState, setSharedOtherOptionsState] = useState(null);
  const [unit1IDState, setUnit1IDState] = useState(-1); // negative ID means no unit is slected. used of renaming
  const [renameUnit1, setRenameUnit1] = useState("");
  const [deleteLineup1State, setDeleteModalState] = useState(false);

  const [flatBom, setFlatBom] = useState("");
  // Custom Breadcrumbs: type the names the way they are in the sidebar
  const title = "Lineup";
  const metal1_category_id = 150;
  const lineup1_id = router.query.lineup1_id; //catch the lineup1 id from the route

  // page url
  const quote_url = "/product/bg15/application/quotes/";
  const lineups_url = router.pathname.split("[")[0]; // get the url before '['
  const flat_pack_bom_w_qty_url = "/product/bg15/application/bom/" + lineup1_id;
  const flat_bom1_page = "/product/bg15/bom-item/" + lineup1_id;
  const build_bom_page = "/product/bg15/build-bom/" + lineup1_id;

  let bus_error_array = [null];

  // GET lineup1 Nested to calculate Price items
  // const GetLineup1Nested = async () => {
  //   // const url = lineup1_nested_api_url + lineup1_id; // old
  //   const flat_bom2_api = api_root + "/api/bg/lineup1-flat-bom2/" + lineup1_id; // new
  //   // const url = lineup1_nested_api_url + lineup1_id;
  //   const config = { "content-type": "application/json" };
  //   if (lineup1_id) {
  //     setLineup1Nested("");
  //     try {
  //       await axios
  //         .get(flat_bom2_api, config)
  //         .then((res) => setLineup1Nested(() => res.data));
  //         // .then((res) => setFlatBom2(() => res.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // const GetFlatBom3 = async () => {
  //   const flat_bom2_api = api_root + "/api/bg/lineup1-flat-bom2/" + lineup1_id; // new
  //   const config = { "content-type": "application/json" };
  //   if (lineup1_id) {
  //     setLineup1Nested("");
  //     try {
  //       await axios
  //         .get(flat_bom2_api, config)
  //         .then((res) => setLineup1Nested(() => res.data));
  //         // .then((res) => setFlatBom2(() => res.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // get pricing per each Unit, FlatBom3. later calculate the sum
  const GetFlatBom3 = async () => {
    const flat_bom3_api = api_root + "/api/bg/lineup1-flat-bom3/" + lineup1_id; // new
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    if (lineup1_id) {
      setFlatBom("");
      try {
        await axios
          .get(flat_bom3_api, config)
          .then((res) => setFlatBom(() => res.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // what is url here?  https://swr.vercel.app/docs/arguments

  const getPack = async () => {
    const url = get_pack_table_api;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios.get(url, config).then((res) => setPackTable(() => res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getPackData = async (category_id) => {
    const url = get_pack_data_api + category_id;
    // const url = api_root + "/api/pack-category/100";
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios.get(url, config).then((res) => setPackData(() => res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getUnit1Nested = async (unit1_id) => {
    // console.log(unit1_id)
    const url = get_unit1_nested + unit1_id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios
        .get(url, config)
        .then((res) => setUnit1Nested(() => res.data));
    } catch (error) {
      console.log(error);
    }
  };

  // GET packages (pack)
  // const {
  //   data: pack_table,
  //   error: error_pack_table,
  //   isLoading: isLoading_pack_table,
  //   mutate: mutatePackTable,
  // } = useSWR(get_pack_table_api, fetcher1); works
  // } = useSWR(get_pack_table_api, fetcher2(get_pack_table_api, accessToken));
  // } = useSWR(get_pack_table_api, fetcher);

  // console.log("pack_table", pack_table);

  // GET lineup1 - shallow pull
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: lineup1,
    error: error_lineup1,
    isLoading: is_loading_lineup1,
    mutate: mutateLineup1,
  } = useSWR(lineup1_shallow_api_url + lineup1_id, fetcher); //

  if (is_loading_lineup1) return <PsSpinner />; // fire spinner on startup
  if (!lineup1) return <p>No profile data</p>;
  if (error_lineup1) return <PsSpinner />;
  if (lineup1 && Lineup1BusErrorCheck(lineup1)) {
    bus_error_array = Lineup1BusErrorCheck(lineup1);
  }

  // PUT lineup1, update lineup1 when moving units left - right
  // const putLineup1 = (reqBody) => {
  //   fetch(lineup1_sort_api_url, {
  //     method: "PUT",
  //     body: JSON.stringify(reqBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(() => mutateLineup1())
  //     .then(() => setLoading(false));
  // };

  const putLineup1 = async (reqBody) => {
    const url = lineup1_sort_api_url;
    const data = reqBody;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios
        .put(url, data, config)
        .then(() => mutateLineup1())
        .then(() => setLoading(false));
      // .then(() => toast.success(toastMessage));
    } catch (error) {
      console.log(error);
    }
    if (showPriceContext) GetFlatBom3();
  };

  // CREATE, create new unit1
  // const newUnit1 = (reqBody) => {
  //   fetch(new_unit1_api_url, {
  //     method: "POST",
  //     body: JSON.stringify(reqBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(() => mutateLineup1())
  //     .then(() => setLoading(false))
  //     .then(() => GetLineup1Nested());
  // };

  // CREATE, create new unit1
  const newUnit1 = async (reqBody) => {
    const url = new_unit1_api_url;
    const data = reqBody;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios
        .post(url, data, config)
        .then(() => mutateLineup1())
        .then(() => setLoading(false)); // works faster if it is before mutate
    } catch (error) {
      console.log(error);
    }
    if (showPriceContext) GetFlatBom3();
  };

  // PUT unit1. Returns lineup1, and updates the Llineup1State
  const putUnit1Plain = async (reqBody, unit1_id) => {
    setLoading(true);
    console.log("reqBody:", reqBody);
    const url = put_unit1_api + unit1_id;
    const data = { ...reqBody, lineup1_id: lineup1.lineup1_id };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };

    try {
      await axios
        .put(url, data, config)
        .then(() => setLineup1State(data))
        .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
    if (showPriceContext) GetFlatBom3();
  };

  // PUT unit1, update a unit1. Returns message
  const putUnit1 = async (reqBody, unit1_id) => {
    setLoading(true);
    const url = put_unit1_api + unit1_id;
    const data = reqBody;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };

    try {
      await axios
        .put(url, data, config)
        .then(() => mutateLineup1())
        .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
    if (showPriceContext) GetFlatBom3();
  };

  // DELETE unit1
  // const deleteUnit1 = (unit1_id, index) => async () => {
  //   const reqBody = [];
  //   const new_unit1_list = lineup1.unit1;
  //   setLoading(true);
  //   // shuffling units to the left
  //   for (let i = 0; i <= lineup1.unit1.length - 2; i++) {
  //     if (i < index) {
  //       new_unit1_list[i] = lineup1.unit1[i];
  //       reqBody.push({
  //         unit1_id: lineup1.unit1[i].unit1_id,
  //         unit1_position: i + 1,
  //       });
  //     } else {
  //       reqBody.push({
  //         unit1_id: lineup1.unit1[i + 1].unit1_id,
  //         unit1_position: i + 1,
  //       });
  //     }
  //   }

  //   try {
  //     await fetch(delete_unit1_with_sort_api_url + unit1_id, {
  //       method: "PUT",
  //       body: JSON.stringify(reqBody),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then(() => mutateLineup1())
  //       .then(() => setLoading(false))
  //       .then(() => GetLineup1Nested());
  //   } catch (err) {
  //     alert("Failed to delete the item!");
  //   }
  // };

  const putDeleteUnit1 = async (reqBody, unit1_id) => {
    const url = delete_unit1_with_sort_api_url + unit1_id;
    const data = reqBody;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios.put(url, data, config).then(() => mutateLineup1());
      // .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
    if (showPriceContext) GetFlatBom3();
  };

  const deleteUnit1 = async (unit1_id, index) => {
    const reqBody = [];
    const new_unit1_list = lineup1.unit1;
    setLoading(true);
    // shuffling units to the left
    for (let i = 0; i <= lineup1.unit1.length - 2; i++) {
      if (i < index) {
        new_unit1_list[i] = lineup1.unit1[i];
        reqBody.push({
          unit1_id: lineup1.unit1[i].unit1_id,
          unit1_position: i + 1,
        });
      } else {
        reqBody.push({
          unit1_id: lineup1.unit1[i + 1].unit1_id,
          unit1_position: i + 1,
        });
      }
    }
    const myPromise = putDeleteUnit1(reqBody, unit1_id);
    toast.promise(myPromise, {
      loading: `The section deleted`,
      success: `The section deleted`,
      error: "Error when fetching",
    });

    // const url = delete_unit1_with_sort_api_url + unit1_id;
    // const data = reqBody;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     "content-type": "application/json",
    //   },
    // };
    // try {
    //   await axios
    //     .put(url, data, config)
    //     .then(() => mutateLineup1())
    //     .then(() => setLoading(false));
    //   // .then(() => GetLineup1Nested());
    // } catch (error) {
    //   console.log(error);
    // }
    // if (showPriceContext) GetFlatBom3();
  };

  // DELETE Lineup1
  // const deleteLineup1 = async () => {
  //   if (lineup1) {
  //     try {
  //       await fetch(delete_lineup1_api_url + lineup1_id, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       mutateLineup1();
  //       router.push(quote_url + lineup1.quote_id); // get back to the quote page
  //     } catch (err) {
  //       alert("Failed to delete the item!");
  //     }
  //   }
  // };

  const deleteLineup1 = async () => {
    const url = delete_lineup1_api_url + lineup1_id;
    const config = { "content-type": "application/json" };
    if (lineup1) {
      try {
        await axios.delete(url, config); // avoid mutation and
        router.push("/"); // get back to the quote page
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addSectionHandler = (e) => {
    e.preventDefault();
    if (lineup1.unit1.length < 11) {
      setLoading(true);
      const reqBody = {
        lineup1_id: lineup1.lineup1_id,
        // unit1_name: unit1New,  // old way when we gave unit1 name. Unit1 Name is not required anymore
        unit1_position: lineup1.unit1.length + 1,
      };

      const myPromise = newUnit1(reqBody);
      toast.promise(myPromise, {
        loading: `The new section added`,
        success: `The new section added`,
        error: "Error when fetching",
      });
      setUnit1New(""); // empty the input box on the Add Section
    } else {
      setConfirmMessageModal(true);
    }
  };

  const moveUnit1Left = (index) => async () => {
    const reqBody = [];
    const new_unit1_list = lineup1.unit1;

    if (index > 0) {
      // toast.loading("Loading...") // this stays alwasy on
      // setLoading(true);  // the old way
      const temp_unit1 = new_unit1_list[index - 1]; //copy the target
      new_unit1_list[index - 1] = new_unit1_list[index]; //load the target, now we have duplicates
      new_unit1_list[index] = temp_unit1; // overwrite one of the duplicates

      for (let i = index - 1; i <= index; i++) {
        reqBody.push({
          unit1_id: new_unit1_list[i].unit1_id,
          unit1_position: i + 1,
        });
      }
    }
    const myPromise = putLineup1(reqBody);
    toast.promise(myPromise, {
      loading: `The section moved to the left`,
      success: `The section moved to the left`,
      error: "Error when fetching",
    });
  };

  const moveUnit1Right = (index) => async () => {
    const reqBody = [];
    const new_unit1_list = lineup1.unit1;

    if (index < lineup1.unit1.length - 1) {
      setLoading(true);
      const temp_unit1 = new_unit1_list[index + 1]; //copy the target
      new_unit1_list[index + 1] = new_unit1_list[index]; //load the target, now we have duplicates
      new_unit1_list[index] = temp_unit1; // overwrite one of the duplicates

      for (let i = index; i <= index + 1; i++) {
        reqBody.push({
          unit1_id: new_unit1_list[i].unit1_id,
          unit1_position: i + 1,
        });
      }
    }
    const myPromise = putLineup1(reqBody);
    toast.promise(myPromise, {
      loading: `The section moved to the right`,
      success: `The section moved to the right`,
      error: "Error when fetching",
    });
  };

  const cloneUnit1 = (unit1) => async () => {
    if (lineup1.unit1.length < 11) {
      let cloneBody = CloneUnit1(unit1);
      setLoading(true);
      cloneBody.unit1_position = lineup1.unit1.length + 1; // add few more objects
      cloneBody.lineup1_id = lineup1.lineup1_id;
      cloneBody.unit1_name = unit1.unit1_name;

      const myPromise = newUnit1(cloneBody);
      toast.promise(myPromise, {
        loading: `The section copied`,
        success: `The section copied`,
        error: "Error when fetching",
      });
    } else {
      setConfirmMessageModal(true);
    }
  };

  const CancelLineup1 = async () => {
    if (lineup1_id) {
      const url = cancel_lineup1_api + lineup1_id;
      // const data = reqBody;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      };

      try {
        await axios.put(url, config).then(() => mutateLineup1());
        //     .then(() => setLoading(false));
      } catch (error) {
        console.log(error);
      }
      if (showPriceContext) GetFlatBom3();
    }
  };

  const SaveLineup1 = async () => {
    if (lineup1_id) {
      const url = save_lineup1_api + lineup1_id;
      // const data = reqBody;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      };

      try {
        await axios.put(url, config).then(() => mutateLineup1());
        //     .then(() => setLoading(false));
      } catch (error) {
        console.log(error);
      }
      if (showPriceContext) GetFlatBom3();
    }
  };

  const onOnelineClickHandler = () => {
    // setShowBus(!showBus);
    setShowSingleLineContext(!showSingleLineContext);
  };

  const onFrontViewClickHandler = () => {
    // setShowComps(!showComps); // replaced with context
    setShowFrontViewContext(!showFrontViewContext);
  };

  const deleteLineup1Handler = async () => {
    setShowConfirmDeleteModal(true);
  };

  const deleteUnit1Handler = (unit1_id, index) => async () => {
    setDeleteUnit1ID(unit1_id);
    setDeleteUnit1Index(index);
    setShowConfirmDeleteUnit1Modal(true);
  };

  const onUnit1BOMModalClickHandler = (unit1) => async () => {
    getUnit1Nested(unit1.unit1_id); // get the unit1 nested
    // setUnit1(unit1Nested);
    // setModalUnit1ID(unit1.unit1_id);
    setShowUnit1BOMModal(true);
  };

  const onBusModalClickHandler = (unit1) => async () => {
    getPackData(category.bus_bar_asm); // pull the bus bar assemblies
    setUnit1(unit1);
    setModalUnit1ID(unit1.unit1_id);
    setShowBusModal(true);
  };

  const onCompsModalClickHandler = (unit1) => async () => {
    setUnit1(unit1);
    setModalUnit1ID(unit1.unit1_id);
    setModalBusID(unit1.bus_id); // this will be target for filtering the pack table
    setShowCompsModal(true);
  };

  const onCTModalCickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowCTModal(true);
  };

  const onVTModalClickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowVTModal(true);
  };

  const onCPTModalClickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowCPTModal(true);
  };

  const onCBModalClickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowCBModal(true);
  };

  const onControlPackageModalClickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowControlPackageModal(true);
  };

  const onGCTModalClickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowGCTModal(true);
  };

  const onSAModalClickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowSAModal(true);
  };

  const onOtherOptionsModalClickHandler = (unit1) => async () => {
    setModalUnit1ID(unit1.unit1_id);
    setUnit1(unit1);
    setShowOtherOptionsModal(true);
  };

  const onPriceClickHandler = () => {
    GetFlatBom3();
    // setShowPrice(!showPrice); // replaced with Context
    setShowPriceContext(!showPriceContext);
  };

  const onBomClickHandler = () => {
    // router.push(flat_pack_bom_w_qty_url); //grouped bill of material
    router.push(flat_bom1_page); //itemized bill of material
  };

  const onBuildClickHandler = () => {
    // router.push(flat_pack_bom_w_qty_url); //grouped bill of material
    router.push(build_bom_page); //itemized bill of material
  };

  const onCancel = () => {
    const myPromise = CancelLineup1();
    toast.promise(myPromise, {
      loading: `Modification canceled`,
      success: `Modification canceled`,
      error: "Error when fetching",
    });
  };

  const onSave = () => {
    const myPromise = SaveLineup1();
    toast.promise(myPromise, {
      loading: `Modification saved`,
      success: `Modification saved`,
      error: "Error when fetching",
    });
  };

  // grab props from Bus and Compartments through state from the modal(child),
  if (sharedBusState) {
    // console.log(sharedBusState)
    // get the new bus pack
    const bus_pack = pack_table?.find(
      (bus) => bus.pack_id === sharedBusState.pack_id
    );
    // cleanup function to delete all unrelated features such as existing breakers, PTs and CPTs if they are not aplicable,
    // console.log("sharedBusState", sharedBusState)
    let reqBody = Unit1CleanupBus(bus_pack, unit1);
    // console.log("sharedBusState-reqBody", reqBody)

    const comps_pack_table = pack_table?.filter(
      (p) => p.category_id === category.compartment
    );
    let reqBody_final = Unit1PickComps(
      reqBody,
      unit1,
      bus_pack,
      comps_pack_table
    );
    // select the sheet metal package
    const metal1_table = pack_table?.filter(
      (metal1) => metal1.category_id === metal1_category_id
    );
    let reqBody_final2 = Unit1PickMetal1(reqBody_final, unit1, metal1_table);
    // console.log("reqBody_final2", reqBody_final2);
    putUnit1(reqBody_final2, sharedBusState.unit1_id);
    setSharedBusState(null);
  }

  if (sharedCompsState) {
    const reqBody = { [sharedCompsState.category]: sharedCompsState.pack_id };
    // console.log("reqBody:", reqBody);
    putUnit1(reqBody, sharedCompsState.unit1_id);
    setSharedCompsState(null);
  }

  // props from child component: CTModal
  if (sharedCTState) {
    // console.log(sharedCTState, modalUnit1ID);
    putUnit1(sharedCTState, modalUnit1ID);
    setSharedCTState(null);
  }

  if (sharedVTState) {
    // merge pt set with additional cleanup features.
    // for example, if pt1_id = true, null brk1_id, cpt1_id, etc.
    // console.log("sharedVTState:", sharedVTState);
    let reqBody = { ...sharedVTState, ...Unit1CleanupVT(sharedVTState) };
    // console.log("VT reqBody:", reqBody);
    const bus_pack = pack_table?.find((bus) => bus.pack_id === unit1.bus_id);
    const comps_pack_table = pack_table?.filter(
      (p) => p.category_id === category.compartment
    );
    let reqBody_final = Unit1PickComps(
      reqBody,
      unit1,
      bus_pack,
      comps_pack_table
    );
    // reqBody = Unit1SetComps(reqBody, unit1, bus_pack);

    // select the sheet metal package
    const metal1_table = pack_table?.filter(
      (metal1) => metal1.category_id === metal1_category_id
    );

    let reqBody_final2 = Unit1PickMetal1(reqBody_final, unit1, metal1_table);

    putUnit1(reqBody_final2, modalUnit1ID);
    setSharedVTState(null);
  }

  if (sharedCPTState) {
    // console.log(sharedCPTState, modalUnit1ID);
    let reqBody = { ...sharedCPTState, ...Unit1CleanupCPT(sharedCPTState) };
    const bus_pack = pack_table?.find((bus) => bus.pack_id === unit1.bus_id);
    const comps_pack_table = pack_table?.filter(
      (p) => p.category_id === category.compartment
    );
    let reqBody_final = Unit1PickComps(
      reqBody,
      unit1,
      bus_pack,
      comps_pack_table
    );
    // select the sheet metal package
    const metal1_table = pack_table?.filter(
      (metal1) => metal1.category_id === metal1_category_id
    );
    let reqBody_final2 = Unit1PickMetal1(reqBody_final, unit1, metal1_table);
    // reqBody = Unit1SetComps(reqBody, unit1, bus_pack);
    putUnit1(reqBody_final2, modalUnit1ID);
    setSharedCPTState(null);
  }

  if (sharedCBState) {
    // console.log("sharedCBState: ", sharedCBState);
    putUnit1(sharedCBState, modalUnit1ID);
    setSharedCBState(null);
  }

  if (sharedControlPackageState) {
    // console.log("sharedControlPackageState: ", sharedControlPackageState);
    putUnit1(sharedControlPackageState, modalUnit1ID);
    setSharedControlPackageState(null);
  }

  if (sharedGCTState) {
    // console.log("sharedControlPackageState: ", sharedControlPackageState);
    putUnit1(sharedGCTState, modalUnit1ID);
    setSharedGCTState(null);
  }

  if (sharedSAState) {
    // console.log("sharedSAState: ", sharedSAState);
    putUnit1(sharedSAState, modalUnit1ID);
    setSharedSAState(null);
  }

  if (sharedOtherOptionsState) {
    // console.log("sharedSAState: ", sharedSAState);
    // putUnit1(sharedOtherOptionsState, modalUnit1ID);
    setSharedSAState(null);
  }

  if (deleteLineup1State) {
    deleteLineup1();
    setDeleteModalState(false);
  }

  if (deleteUnit1ModalState) {
    setDeleteUnit1ModalState(false);
    if (deleteUnit1ID > 0) {
      deleteUnit1(deleteUnit1ID, deleteUnit1Index);
    }
  }

  const onSubmitUnit1NameHandler = (e, unit1_id) => {
    e.preventDefault();
    const reqBody = { unit1_name: renameUnit1 };
    putUnit1(reqBody, unit1_id);
    setRenameUnit1(""); // delete new name draft
    setUnit1IDState(-1); // no unit is selected (index = -1)
  };

  // console.log(
  //   "lineup1:",
  //   "/bg1_" + lineup1.unit1[2].ctrl1.pack_name + "_1.svg"
  // );
  // "/bg1_" + unit1.ctrl1?.pack_name + ".svg"

  // console.log("flatBom", flatBom);

  // console.log(lineup1);
  //
  //
  //
  // RETRUN
  //
  //
  //
  //
  //

  console.log(lineup1);

  return (
    <div id="main_container">
      {/* {loading && <PsSpinner />} */}
      {/* place for improvement, loading is loading pack_table, that can be stored localy */}
      {/* using toaster instead of a custom spinner */}
      {/* {loading && <TriangleMiniSideSpinner />} */}
      {/* {loading && <TriangleSpinner />} */}
      <Toaster />
      {/* ~~~~~~~~~~~~~~~~ Group MODAL  # ~~~~~~~~~~~~~~~   */}
      <div id="modal-root">
        {showUnit1BOMModal && unit1Nested && (
          <Unit1BOMModal
            onClose={() => {
              setShowUnit1BOMModal(false);
              setUnit1Nested("");
            }}
            unit1={unit1Nested}
            lineup1={lineup1}
            flatBom={flatBom}
            pack_table={pack_table}
          ></Unit1BOMModal>
        )}

        {showBusModal && packData && (
          <BusModal
            onClose={() => {
              setShowBusModal(false);
              setPackData("");
            }}
            unit1={unit1}
            pack_table={packData}
            unit1_id={modalUnit1ID}
            lineup1={lineup1}
            sharedBusState={sharedBusState}
            setSharedBusState={setSharedBusState}
            lineup1_enclosure={lineup1.lineup1_enclosure}
          ></BusModal>
        )}
        {showCompsModal && (
          <CompsModal
            onClose={() => setShowCompsModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            bus_id={modalBusID}
            lineup1_id={lineup1_id}
            setSharedCompsState={setSharedCompsState}
          ></CompsModal>
        )}
        {showCTModal && (
          <CTModal
            onClose={() => setShowCTModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            setSharedCTState={setSharedCTState}
          ></CTModal>
        )}
        {showVTModal && (
          <VTModal
            onClose={() => setShowVTModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            setSharedVTState={setSharedVTState}
          ></VTModal>
        )}
        {showCPTModal && (
          <CPTModal
            onClose={() => setShowCPTModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            lineup1={lineup1}
            setSharedCPTState={setSharedCPTState}
          ></CPTModal>
        )}
        {showCBModal && (
          <CBModal
            onClose={() => setShowCBModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            setSharedCBState={setSharedCBState}
          ></CBModal>
        )}
        {showControlPackageModal && (
          <ControlPackageModal
            onClose={() => setShowControlPackageModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            accessToken={accessToken}
            setSharedControlPackageState={setSharedControlPackageState}
          ></ControlPackageModal>
        )}
        {showGCTModal && (
          <GCTModal
            onClose={() => setShowGCTModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            setSharedGCTState={setSharedGCTState}
          ></GCTModal>
        )}
        {showSAModal && (
          <SAModal
            onClose={() => setShowSAModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            setSharedSAState={setSharedSAState}
          ></SAModal>
        )}
        {showOtherOptionsModal && (
          <OtherOptionsModal
            onClose={() => setShowOtherOptionsModal(false)}
            unit1={unit1}
            pack_table={pack_table}
            unit1_id={modalUnit1ID}
            lineup1_id={lineup1_id}
            setSharedOtherOptionsState={setSharedOtherOptionsState}
          ></OtherOptionsModal>
        )}

        {showConfirmDeleteUnit1Modal && (
          <ConfirmDeleteUnit1Modal
            onClose={() => setShowConfirmDeleteUnit1Modal(false)}
            name={deleteUnit1Index + 1}
            title={"Section"}
            setDeleteUnit1ModalState={setDeleteUnit1ModalState}
          ></ConfirmDeleteUnit1Modal>
        )}
        {showConfirmDeleteModal && (
          <ConfirmDeleteModal
            onClose={() => setShowConfirmDeleteModal(false)}
            name={lineup1.lineup1_name}
            title={"Lineup"}
            setDeleteModalState={setDeleteModalState}
          ></ConfirmDeleteModal>
        )}
        {showConfirmMessageModal && (
          <ConfirmMessageModal
            onClose={() => setConfirmMessageModal(false)}
            message={"You have reached a maximum number of sections."}
            title={"Message"}
            buttonText={"Close"}
          />
        )}
      </div>
      {/* ~~~~~~~~~~~~~~~~ Breadcrumbs, TITLE  ~~~~~~~~~~~~~~~   */}
      <section style={{ fontSize: "0.8rem", margin: "0.7rem 0 0 0" }}>
        {/* <Breadcrumbs router={router} /> */}
        <div
          style={{
            margin: "0rem 0 1rem 0",
            display: "flex",
            color: "var(--focus)",
          }}
        >
          <HomeIcon />
          <Link
            href={"/"}
            className={styles.links}
            style={{ fontSize: "0.8rem" }}
          >
            Home /
          </Link>
          <span style={{ margin: "0 0 0 5px ", color: "var(--foreground)" }}>
            Lineup
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link href={"/"}>
            <ButtonIconActive>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "0.8rem",
                  padding: "0 10px 0 3px",
                }}
              >
                <span style={{ padding: "1px 0 0 0" }}>
                  <ArrowLeft />
                </span>
                <div style={{ padding: "0 0 0px 0" }}>Home</div>
              </div>
            </ButtonIconActive>
          </Link>

          {lineup1.lineup1_updated_date != lineup1.lineup1_saved_date ? (
            <div>
              <ButtonIcon onClick={onCancel}>
                <div style={{ padding: "0 10px 0px 10px" }}>CANCEL</div>
              </ButtonIcon>
              <span style={{ margin: "0 0 0 6px" }} disabled>
                <ButtonIconActive onClick={onSave}>
                  <div style={{ padding: "0 10px 0px 10px" }}>SAVE</div>
                </ButtonIconActive>
              </span>
            </div>
          ) : (
            <div>
              <ButtonIconInactive>
                <div style={{ padding: "0 10px 0px 10px" }}>CANCEL</div>
              </ButtonIconInactive>
              <span style={{ margin: "0 0 0 6px" }} disabled>
                <ButtonIconInactive>
                  <div style={{ padding: "0 10px 0px 10px" }}>SAVE</div>
                </ButtonIconInactive>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ~~~~~~~~~~~~~~~~ LINEUP INFO  ~~~~~~~~~~~~~~~   */}
      <section
        id="lineup1_info"
        style={{ fontSize: "0.9rem", margin: "0.7rem 0 0 0" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>
              {lineup1?.lineup1_saved_date == lineup1?.lineup1_updated_date
                ? ""
                : "*"}
              {lineup1.lineup1_name}
              {lineup1?.lineup1_saved_date == lineup1?.lineup1_updated_date
                ? ""
                : " (unsaved)"}
            </h3>
            <span></span>
            <div className={styles.info_text}>
              NextGear MC15{" "}
              {/* Balance Gear {(lineup1.lineup1_voltage / 1000).toLocaleString()}kV{" "} */}
              {lineup1.lineup1_current.toLocaleString()}
              {"A, "}
              {lineup1.lineup1_enclosure == "INDOOR"}
              {lineup1.lineup1_enclosure == "NEMA1" && "INDOOR"}
              {lineup1.lineup1_enclosure == "NEMA3R" && "OUTDOOR Non-Walk-In"}
              {lineup1.lineup1_enclosure == "NEMA3RW" && "OUTDOOR, WALK-IN"}
            </div>
            <div className={styles.info_text}>
              BO: {lineup1.lineup1_bo}, Lineup ID: {lineup1.lineup1_id}
            </div>
            <div style={{ minHeight: "1.8rem" }}>
              <h2>
                {flatBom && showPriceContext && (
                  <span>{Dollar(FlatBom2PriceFunction(flatBom))}</span>
                )}
                {!flatBom && showPriceContext && <ThreeDotsFlashingSpinner />}
              </h2>
            </div>
            {/* ~~~~~~~~~~~~~~~~ MESSAGE   ~~~~~~~~~~~~~~~   */}
            Note: <br />
            Add $13,000/section for OUTDOOR Non-Walk-In.
            <br />
            Add $9,000/section for INDOOR.
          </div>

          <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
            {lineup1.lineup1_saved_date ? (
              <span>
                Last save on{" "}
                {new Date(lineup1.lineup1_saved_date).toLocaleString("en-US", {
                  hour12: true,
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            ) : (
              "Unsaved lineup"
            )}
          </div>
        </div>
      </section>

      {/* ~~~~~~~~~~~~~ ADD SECTION ~~~~~~~~~~~~~~~~~~~~~ */}
      {/* The old way of creating Unit1. The New way does not need Unit1 name */}
      {/* <section id="add_section">
        <form onSubmit={addSectionHandler} className={styles.input_text}>
          <input
            id="lineup1"
            type="text"
            placeholder="e.g. Tie, Main, Feeder"
            value={unit1New}
            onChange={(e) => setUnit1New(e.target.value)}
            required
            autoFocus
          ></input>
          <Button type="submit">Add Section</Button>
        </form>
      </section> */}

      {/* ~~~~~~~~~~~~~~ MAIN MENU BUTTONS ~~~~~~~~~~~~~~~~~~~~~ */}
      <section
        style={{
          // margin: "1rem 0rem 0rem 0",
          display: "flex",
          justifyContent: "space-between",
          // alignSelf: "flex-end"
          position: "relative",
          flexWrap: "wrap",
        }}
      >
        <div style={{ margin: "1rem 0rem 0rem 0" }}>
          <span title="New Section">
            <ButtonIcon onClick={addSectionHandler}>
              <NewSectionIcon />
            </ButtonIcon>
          </span>
          {!showSingleLineContext && (
            <span title="Single Line View">
              <ButtonIcon onClick={onOnelineClickHandler}>
                <SingleLineIcon />
              </ButtonIcon>
            </span>
          )}
          {showSingleLineContext && (
            <span title="Single Line View">
              <ButtonIconActive onClick={onOnelineClickHandler}>
                <SingleLineIcon />
              </ButtonIconActive>
            </span>
          )}

          {!showFrontViewContext && (
            <span title="Elevation View">
              <ButtonIcon onClick={onFrontViewClickHandler}>
                <ElevationIcon />
              </ButtonIcon>
            </span>
          )}
          {showFrontViewContext && (
            <span title="Elevation View">
              <ButtonIconActive onClick={onFrontViewClickHandler}>
                <ElevationIcon />
              </ButtonIconActive>
            </span>
          )}
          {!showPriceContext && (
            <span title="Check Pricing">
              <ButtonIcon onClick={onPriceClickHandler}>
                <DollarCircleIcon />
              </ButtonIcon>
            </span>
          )}
          {showPriceContext && (
            <span title="Check Pricing">
              <ButtonIconActive onClick={onPriceClickHandler}>
                <DollarCircleIcon />
              </ButtonIconActive>
            </span>
          )}
        </div>
        <div style={{ margin: "1rem 0rem 0rem 0" }}>
          {user?.user_id === 1 ? (
            <span title="Build">
              <ButtonIcon onClick={onBuildClickHandler}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "0.8rem",
                    padding: "0 10px 0 3px",
                  }}
                >
                  <span style={{ padding: "1px 0 0 0" }}>
                    <BomIcon title="build" />
                  </span>
                  <div style={{ padding: "3px 0 0 0" }}>Build</div>
                </div>
              </ButtonIcon>
            </span>
          ) : (
            ""
          )}
          <span title="Bill of Material">
            <ButtonIcon onClick={onBomClickHandler}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "0.8rem",
                  padding: "0 10px 0 3px",
                }}
              >
                <span style={{ padding: "1px 0 0 0" }}>
                  <BomIcon />
                </span>
                <div style={{ padding: "3px 0 0 0" }}>BOM</div>
              </div>
            </ButtonIcon>
          </span>

          {/* Print BOM */}
          {/* {lineup1Nested && showPriceContext && (
            <span title="Print Bill-of-Material">
              <PrintLineup1BOM
                lineup1={lineup1}
                showBus={showSingleLineContext}
                showComps={showComps}
                lineup1Nested={lineup1Nested}
              />
            </span>
          )} */}

          {/* Print PDF Drawing */}
          <span title="Print Drawings">
            <PrintLineup1
              lineup1={lineup1}
              showBus={showSingleLineContext}
              showComps={showFrontViewContext}
            />
          </span>

          <span title="Delete the Lineup" style={{}}>
            <ButtonIcon onClick={deleteLineup1Handler}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "0.8rem",
                  padding: "0 10px 0 3px",
                }}
              >
                <span style={{ padding: "1px 0 0 0" }}>
                  <Trashcan2Icon />
                </span>
                <div style={{ padding: "3px 0 0 0" }}>Delete</div>
              </div>
            </ButtonIcon>
          </span>

          {/* <label style={{ margin: "0 1rem 0 0", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={showPriceContext}
            onChange={() => setIsBOMChecked(showPriceContext)}
            style={{ margin: "0 0.5rem 0 0.5rem" }}
          />
          <span
            style={{ fontSize: "0.9rem", opacity: 0.7 }}
            title="Show Bill of Material"
          >
            Price
          </span>
        </label> */}
        </div>
      </section>

      {/* ----------- BUS BAR ERROR POP UP --------------   */}
      {/* This works but it jitter the screen. Removed for now.  */}
      
      {/* {bus_error_array.length > 0 && (
        <section
          style={{
            fontSize: "0.8rem",
            color: "red",
            fontWeight: "700",
            border: "1px solid red",
            padding: "0.7rem",
            margin: "0.2rem 0 0 0",
            display: "inline-block",
            backgroundColor: "white",
            // boxShadow:
            //   "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Bus bars connection error:
          <ul>
            {bus_error_array.map((section) => (
              <li
                key={section}
                style={{
                  fontWeight: "500",
                }}
              >
                {" "}
                &#x2022; The bus bars between sections {section} and{" "}
                {section + 1} are not connected.
              </li>
            ))}
          </ul>
        </section>
      )} */}

      {/* ~~~~~~~~~~~~~~~~~~~ CONFIGURATOR ~~~~~~~~~~~~~~~~~~~~~~ */}
      <section
        id="configurator"
        style={{
          display: "inline-block", //fix extra right-empty-space added to the lieup1 block
          position: "relative",
          width: "100%",
          margin: "0.2rem 0 0 0",
        }}
      >
        {lineup1.unit1 && ( // the main swtich, do not show anything unless unit1 is present
          <div className={styles.lineup1}>
            {lineup1.unit1
              .sort((a, b) => (a.unit1_position > b.unit1_position ? 1 : -1))
              .map((unit1, index) => (
                <div className={styles.unit1_column} key={unit1.unit1_id}>
                  {/* ~~~~~~~~~~~~~~~~ CONTROLS ~~~~~~~~~~~~~~~   */}
                  <div
                    className={styles.unit1_row}
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      margin: "0.3rem 0 0rem 0",
                      padding: "0.5rem 0 0 0",
                    }}
                  >
                    <span className={styles.ctrl_icons_sm} title="Move">
                      <ArrowLeft onClick={moveUnit1Left(index)} />
                    </span>
                    <span className={styles.ctrl_icons_sm} title="Move">
                      <ArrowRight onClick={moveUnit1Right(index)} />
                    </span>
                    <span className={styles.ctrl_icons_sm} title="Copy">
                      <Clone onClick={cloneUnit1(unit1)} />
                    </span>
                    <span className={styles.ctrl_icons_sm} title="Delete">
                      <CloseIcon
                        onClick={deleteUnit1Handler(unit1.unit1_id, index)}
                      />
                    </span>
                  </div>

                  {/* ~~~~~~~~~~~~~~~~ UNIT NAME ~~~~~~~~~~~~~~~   */}
                  {/* <section>
                    unit name is clicked (selected)
                    {unit1.unit1_id === unit1IDState && (
                      <section id="unit_name">
                        <form
                          onSubmit={(e) =>
                            onSubmitUnit1NameHandler(e, unit1.unit1_id)
                          }
                        >
                          <input
                            id="lineup1"
                            type="text"
                            value={renameUnit1}
                            onChange={(e) => setRenameUnit1(e.target.value)}
                            onBlur={(e) => (
                              setRenameUnit1(""), setUnit1IDState(-1)
                            )} // reset states
                            onKeyDown={(e) =>
                              e.key === "Escape" && e.target.blur()
                            }
                            required
                            autoFocus
                            className={styles.unit1_row_name}
                          ></input>
                        </form>
                      </section>
                    )}

                    unit name is out of focust (Canceled)
                    {unit1.unit1_id != unit1IDState && (
                      <div
                        className={styles.unit1_row_name}
                        style={{
                          fontWeight: "bold",
                          padding: "0rem 0 0rem 0",
                        }}
                        onClick={() => setUnit1IDState(unit1.unit1_id)}
                      >
                        {unit1.unit1_name}
                      </div>
                    )}
                  </section> */}

                  {/* ~~~~~~~~~~~~~~~~ SECTION (UNIT) NUMBER  ~~~~~~~~~~~~~~~   */}
                  {/* <div
                    className={styles.unit1_row}
                    title={"Section ID: " + unit1.unit1_id}
                    style={{
                      fontSize: "0.8rem",
                      opacity: 0.7,
                      // padding: "0rem 0 0.7rem 0 ",
                    }}
                  >
                    <span
                    onClick={onUnit1BOMModalClickHandler(unit1)}
                    style={{ cursor: "pointer" }}
                    >
                      Section {index + 1}
                    </span>
                  </div> */}

                  <div
                    className={styles.unit1_row}
                    title={"Section ID: " + unit1.unit1_id}
                    style={{
                      fontSize: "0.8rem",
                      opacity: 0.7,
                      padding: "0.7rem 0 0.7rem 0 ",
                    }}
                  >
                    <span
                      onClick={onUnit1BOMModalClickHandler(unit1)}
                      className={styles.links}
                      style={{
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        color: "var(--focus-dark)",
                      }}
                      // style={styles.links}
                    >
                      Section {index + 1}
                      {/* #{index + 1} - &nbsp; */}
                      {/* {unit1.bus !== null ? unit1.bus.pack_name : "--"}
                      {unit1.comps !== null ? unit1.comps.pack_name : "--"}
                      {unit1.metal1 !== null ? unit1.metal1.pack_name : "-"} */}
                    </span>
                  </div>

                  {/* ~~~~~~~~~~~~~~~~~~~~ DIAGRAMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                  <div
                    // className={styles.unit_row}  this is gone
                    style={{
                      width: "150px",
                      height: "396px",
                      position: "relative",
                      // border: "0.5px dashed var(--lightgray)",
                      // className={styles.card2} // turnded off BUG 128
                      // cursor: "pointer", // turnded off BUG 128
                    }}
                    // onClick={onUnit1BOMModalClickHandler(unit1)}
                  >
                    {unit1.bus && showSingleLineContext && (
                      <Image
                        src={unit1.bus.pack_image_url}
                        alt="Bus Bars"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      ></Image>
                    )}

                    {unit1.bus && showSingleLineContext && (
                      <Image
                        src={unit1.bus.pack_image_url}
                        alt="Bus Bars"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.comps && showFrontViewContext && (
                      <Image
                        src={unit1.comps.pack_image_url}
                        alt="Compartments"
                        width={150}
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.ct1 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct1.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "325px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct1?.pack_ratio}
                        </div>
                      </>
                    )}
                    {unit1.ct2 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct2.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "312px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct2?.pack_ratio}
                        </div>
                      </>
                    )}
                    {/* Relay Class */}
                    {unit1.ct3 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct3.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "312px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct3?.pack_ratio}
                        </div>
                      </>
                    )}
                    {/*  Relay Class  */}
                    {unit1.ct4 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct4.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "246px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct4?.pack_ratio}
                        </div>
                      </>
                    )}
                    {unit1.ct5 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct5.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "246px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct5?.pack_ratio}
                        </div>
                      </>
                    )}
                    {unit1.ct6 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct6.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "234px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct6?.pack_ratio}
                        </div>
                      </>
                    )}
                    {/*  Position: Top Breaker Bottom Branch, Lower, Meetering Class,  1  */}
                    {unit1.ct7 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct7.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "141px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct7?.pack_ratio}
                        </div>
                      </>
                    )}
                    {/*  Position: Top Breaker Bottom Branch, Upper, Meetering Class,  1  */}
                    {unit1.ct8 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct8.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "129px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct8?.pack_ratio}
                        </div>
                      </>
                    )}
                    {/*  Relay Class  */}
                    {unit1.ct9 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct9.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "129px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct9?.pack_ratio}
                        </div>
                      </>
                    )}
                    {/*  Relay Class  */}
                    {unit1.ct10 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct10.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "59px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct10?.pack_ratio}
                        </div>
                      </>
                    )}
                    {unit1.ct11 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct11.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "59px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct11?.pack_ratio}
                        </div>
                      </>
                    )}
                    {unit1.ct12 && showSingleLineContext && (
                      <>
                        <Image
                          src={api_root + "/images/onelines/bg15/ct12.svg"}
                          alt="Current Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "90px",
                            top: "46px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.ct12?.pack_ratio}
                        </div>
                      </>
                    )}
                    {unit1.pt1 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "351px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt1.pack_ratio}
                      </div>
                    )}
                    {unit1.pt1 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "361px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt1.pack_secondary_voltage
                          ? unit1.pt1.pack_secondary_voltage + "VAC"
                          : ""}
                      </div>
                    )}
                    {unit1.pt1 &&
                      unit1.pt1_con !== 4 &&
                      unit1.pt1_con !== 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_pt1" + unit1.pt1_con + ".svg"}
                          alt="Voltage Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                      )}

                    {unit1.pt1 &&
                      unit1.pt1_con === 4 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_pt14.svg"}
                          alt="Voltage Transformer"
                          width={304} // double witdth awith offest
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-76px" }}
                        />
                      )}
                    {unit1.pt1 &&
                      unit1.pt1_con === 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_pt15.svg"}
                          alt="Voltage Transformer"
                          width={304} // double witdth awith offest
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-78px" }}
                        />
                      )}
                    {unit1.pt2 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "282px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt2.pack_ratio}
                      </div>
                    )}
                    {unit1.pt2 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "292px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt2.pack_secondary_voltage
                          ? unit1.pt2.pack_secondary_voltage + "VAC"
                          : ""}
                      </div>
                    )}
                    {unit1.pt2 && unit1.pt2_con && showSingleLineContext && (
                      <Image
                        src={"/bg1_pt2" + unit1.pt2_con + ".svg"}
                        alt="Voltage Transformer"
                        width={150}
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.pt3 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "120px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt3.pack_ratio}
                      </div>
                    )}
                    {unit1.pt3 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "130px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt3.pack_secondary_voltage
                          ? unit1.pt3.pack_secondary_voltage + "VAC"
                          : ""}
                      </div>
                    )}
                    {unit1.pt3 && unit1.pt3_con && showSingleLineContext && (
                      <Image
                        src={"/bg1_pt3" + unit1.pt3_con + ".svg"}
                        alt="Voltage Transformer"
                        width={150}
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.pt4 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "57px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt4.pack_ratio}
                      </div>
                    )}
                    {unit1.pt4 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "67px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.pt4.pack_secondary_voltage
                          ? unit1.pt4.pack_secondary_voltage + "VAC"
                          : ""}
                      </div>
                    )}
                    {unit1.pt4 &&
                      unit1.pt4_con !== 4 &&
                      unit1.pt4_con !== 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_pt4" + unit1.pt4_con + ".svg"}
                          alt="Voltage Transformer"
                          width={150}
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                      )}
                    {unit1.pt4 &&
                      unit1.pt4_con === 4 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_pt44.svg"}
                          alt="Voltage Transformer"
                          width={304} // double witdth awith offest
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-76px" }}
                        />
                      )}

                    {unit1.pt4 &&
                      unit1.pt4_con === 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_pt45.svg"}
                          alt="Voltage Transformer"
                          width={304} // double witdth awith offest
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-78px" }}
                        />
                      )}
                    {unit1.ptfuse1 && showSingleLineContext && (
                      <Image
                        src={"/bg1_vt1_fuse.svg"}
                        alt="Voltage Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.ptfuse2 && showSingleLineContext && (
                      <Image
                        src={"/bg1_vt2_fuse.svg"}
                        alt="Voltage Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.ptfuse3 && showSingleLineContext && (
                      <Image
                        src={"/bg1_vt3_fuse.svg"}
                        alt="Voltage Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.ptfuse4 && showSingleLineContext && (
                      <Image
                        src={"/bg1_vt4_fuse.svg"}
                        alt="Voltage Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.cpt1 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "318px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.cpt1.pack_ratio}
                      </div>
                    )}
                    {unit1.cpt1 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "328px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.cpt1.pack_kva ? unit1.cpt1.pack_kva + "kVA" : ""}
                      </div>
                    )}
                    {unit1.cpt1 &&
                      unit1.cpt1_connection !== 4 &&
                      unit1.cpt1_connection !== 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_cpt1" + unit1.cpt1_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={150} // this should match with column width
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                      )}

                    {unit1.cpt1 &&
                      unit1.cpt1_connection === 4 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_cpt1" + unit1.cpt1_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={304} // this should match with column width
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-76px" }}
                        />
                      )}

                    {unit1.cpt1 &&
                      unit1.cpt1_connection === 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_cpt1" + unit1.cpt1_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={304} // this should match with column width
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-78px" }}
                        />
                      )}
                    {unit1.cpt2 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "84px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.cpt2.pack_kva ? unit1.cpt2.pack_kva + "kVA" : ""}
                      </div>
                    )}
                    {unit1.cpt2 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "80px",
                          top: "74px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.cpt2.pack_ratio}
                      </div>
                    )}
                    {unit1.cpt2 &&
                      unit1.cpt2_connection !== 4 &&
                      unit1.cpt2_connection !== 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_cpt2" + unit1.cpt2_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={150} // this should match with column width
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "0" }}
                        />
                      )}

                    {unit1.cpt2 &&
                      unit1.cpt2_connection === 4 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_cpt2" + unit1.cpt2_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={304} // this should match with column width
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-76px" }}
                        />
                      )}

                    {unit1.cpt2 &&
                      unit1.cpt2_connection === 5 &&
                      showSingleLineContext && (
                        <Image
                          src={"/bg1_cpt2" + unit1.cpt2_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={304} // this should match with column width
                          height={396}
                          priority
                          className={styles.unit1_row}
                          style={{ position: "absolute", right: "-78px" }}
                        />
                      )}
                    {unit1.cpt3 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "85px",
                          top: "328px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.cpt3.pack_kva ? unit1.cpt3.pack_kva + "kVA" : ""}
                      </div>
                    )}
                    {unit1.cpt3 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "85px",
                          top: "318px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.cpt3.pack_ratio}
                      </div>
                    )}

                    {unit1.cpt3 && showSingleLineContext && (
                      <Image
                        src={"/bg1_cpt31.svg"}
                        alt="Current Power Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.cptfuse1 && showSingleLineContext && (
                      <Image
                        src={"/bg1_cpt1_fuse.svg"}
                        alt="Current Power Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.cptfuse2 && showSingleLineContext && (
                      <Image
                        src={"/bg1_cpt2_fuse.svg"}
                        alt="Current Power Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.cptfuse3 && showSingleLineContext && (
                      <Image
                        src={"/bg1_cpt3_fuse.svg"}
                        alt="Current Power Transformer"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.brk1 && showSingleLineContext && (
                      <Image
                        src={"/bg1_cb1.svg"}
                        alt="Circuit Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.brk2 && showSingleLineContext && (
                      <Image
                        src={"/bg1_cb2.svg"}
                        alt="Circuit Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.brk1_designation && showSingleLineContext && (
                      <Image
                        src={"/bg1_" + unit1.brk1_designation + "_1.svg"}
                        alt="Circuit Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.brk2_designation && showSingleLineContext && (
                      <Image
                        src={"/bg1_" + unit1.brk2_designation + "_2.svg"}
                        alt="Circuit Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}

                    {unit1.ctrl1 && showSingleLineContext && (
                      <Image
                        src={"/bg1_ctrl_" + unit1.ctrl1?.pack_name + "_1.svg"}
                        alt="Controls Lower Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.ctrl2 && showSingleLineContext && (
                      <Image
                        src={"/bg1_ctrl_" + unit1.ctrl2?.pack_name + "_2.svg"}
                        alt="Controls Upper Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.ctrl1 && showFrontViewContext && (
                      <Image
                        src={
                          "/bg1_ctrl_instrument_" +
                          unit1.ctrl1?.pack_name +
                          "_1.svg"
                        }
                        alt="Controls Instuments Bottom Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.ctrl2 && showFrontViewContext && (
                      <Image
                        src={
                          "/bg1_ctrl_instrument_" +
                          unit1.ctrl2?.pack_name +
                          "_2.svg"
                        }
                        alt="Controls Instuments Upper Breaker"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.gct1 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "85px",
                          top: "380px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.gct1.pack_ratio}
                      </div>
                    )}
                    {unit1.gct1 && showSingleLineContext && (
                      <Image
                        src="/bg1_gct1.svg"
                        alt="Ground Current Transformer"
                        width={150}
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.gct2 && showSingleLineContext && (
                      <div
                        style={{
                          position: "absolute",
                          left: "82px",
                          top: "11px",
                          fontSize: fontSizeTransformersRatio,
                        }}
                      >
                        {unit1.gct2.pack_ratio}
                      </div>
                    )}
                    {unit1.gct2 && showSingleLineContext && (
                      <Image
                        src="/bg1_gct2.svg"
                        alt="Ground Current Transformer"
                        width={150}
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.sa1 && showSingleLineContext && (
                      <Image
                        src={"/bg1_sa1.svg"}
                        alt="Surge Arrester Upper Location"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                    {unit1.sa2 && showSingleLineContext && (
                      <Image
                        src={"/bg1_sa2.svg"}
                        alt="Surge Arreser Bottom Location"
                        width={150} // this should match with column width
                        height={396}
                        priority
                        className={styles.unit1_row}
                        style={{ position: "absolute", right: "0" }}
                      />
                    )}
                  </div>
                  {/* </Link> */}

                  {/* ~~~~~~~~~~~~~~~~ UNIT1 PRICE  ~~~~~~~~~~~~~~~   */}

                  <div
                    className={styles.unit1_row}
                    style={{
                      height: "2rem",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.8rem",
                      opacity: 0.7,
                      cursor: "pointer",
                      padding: "1rem 0 0.5rem 0 ",
                      margin: "0 ",
                    }}
                  >
                    {flatBom &&
                      showPriceContext &&
                      Dollar(FlatBom3PriceFunction(flatBom, unit1.unit1_id))}
                    {!flatBom && showPriceContext && (
                      <ThreeDotsMiniFlashingSpinner />
                    )}
                  </div>

                  {/* ~~~~~~~~~~~~~~~~ CONFIGURE # ~~~~~~~~~~~~~~~   */}

                  <div
                    // className={styles.unit1_row}
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.7,
                      padding: "0 0.2rem 2rem 0.2rem ",
                      textAlign: "left",
                      margin: "0 0 0 0",
                    }}
                  >
                    {pack_table && (
                      <ul>
                        <li
                          title="Configure Bus Bars"
                          className={styles.table_link}
                          onClick={onBusModalClickHandler(unit1)}
                          // onClick={() => setShowBusModal(true)}
                        >
                          <ButtonSectionConfig>Bus Bars</ButtonSectionConfig>
                        </li>
                        <li
                          // title="Configure Compartments"
                          className={styles.table_link}
                          onClick={onCBModalClickHandler(unit1)}
                        >
                          <ButtonSectionConfig>
                            Circuit Breakers
                          </ButtonSectionConfig>
                        </li>
                        <li
                          title="Configure Compartments"
                          className={styles.table_link}
                          onClick={onCompsModalClickHandler(unit1)}
                        >
                          <ButtonSectionConfig>
                            {!unit1.comps_id && (
                              <Image
                                src="/dot_warning.svg"
                                alt="circle"
                                width={7}
                                height={7}
                                style={{
                                  margin: "0 0 0.1rem 0",
                                  position: "relative",
                                  right: "5px",
                                }}
                              />
                            )}
                            Compartments
                          </ButtonSectionConfig>
                        </li>
                        <li
                          title="Configure Current Transformers (CTs)"
                          className={styles.table_link}
                          onClick={onCTModalCickHandler(unit1)}
                        >
                          <ButtonSectionConfig>CTs</ButtonSectionConfig>
                        </li>
                        <li
                          title="Configure Voltage Transformers (VTs)"
                          className={styles.table_link}
                          onClick={onVTModalClickHandler(unit1)}
                        >
                          <ButtonSectionConfig>VTs</ButtonSectionConfig>
                        </li>
                        <li
                          title="Configure Current Power Transformers (CPTs)"
                          className={styles.table_link}
                          onClick={onCPTModalClickHandler(unit1)}
                        >
                          <ButtonSectionConfig>CPTs</ButtonSectionConfig>
                        </li>
                        <li
                          title="Configure Controls"
                          className={styles.table_link}
                          onClick={onControlPackageModalClickHandler(
                            unit1,
                            category.control,
                            "Controls"
                          )}
                        >
                          <ButtonSectionConfig>Controls</ButtonSectionConfig>
                        </li>
                        <li
                          title="Ground CT"
                          className={styles.table_link}
                          onClick={onGCTModalClickHandler(
                            unit1,
                            category.gct,
                            "Ground CTs"
                          )}
                        >
                          <ButtonSectionConfig>Ground CTs</ButtonSectionConfig>
                        </li>
                        <li
                          title="Surge Arresters"
                          className={styles.table_link}
                          onClick={onSAModalClickHandler(
                            unit1,
                            category.gct,
                            "Surge Arresters"
                          )}
                        >
                          <ButtonSectionConfig>
                            Surge Arresters
                          </ButtonSectionConfig>
                        </li>
                        <li
                          title="Configure Enclosure"
                          className={styles.table_link}
                          // onClick={onOtherOptionsModalClickHandler(
                          //   unit1,
                          //   category.enclosure,
                          //   "Enclosure"
                          // )}
                        >
                          <ButtonSectionConfig>
                            Other Options
                          </ButtonSectionConfig>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* ~~~~~~~~~~~~~~ SHOW Price ~~~~~~~~~~~~~~~~~~~~~ */}

      {/* <div>
        <br />
        {lineup1Nested.unit1 && showPriceContext && (
          <div>
            <Bg1BOM lineup1Nested={lineup1Nested} />
          </div>
        )}
        {!lineup1Nested.unit1 && showPriceContext && (
          <div style={{ margin: "0 0 0 1rem" }}>
            <ThreeDotsFlashingSpinner />
          </div>
        )}
      </div> */}
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
