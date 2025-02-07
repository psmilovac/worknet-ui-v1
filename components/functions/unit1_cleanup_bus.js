import {
  clean_brk1,
  clean_brk2,
  clean_pt1,
  clean_pt2,
  clean_pt3,
  clean_pt4,
  clean_pt1_fuse,
  clean_pt2_fuse,
  clean_pt3_fuse,
  clean_pt4_fuse,
  clean_cpt1,
  clean_cpt2,
  clean_cpt3,
  clean_cpt1_fuse,
  clean_cpt2_fuse,
  clean_cpt3_fuse,
  clean_cable1, // this covers cable1 and cable2
  clean_cable3, // this covers cable 3 and cable4
} from "./unit1_cleanup_vars";

// after user change the bus, this function cleans all features that are not applicable
export default function Unit1CleanupBus(new_bus_pack, unit1) {
  let reqBody = {};
  reqBody["bus_id"] = new_bus_pack.pack_id; // inject mandatory bus_id

  // console.log("new_bus_pack", new_bus_pack);
  // console.log("unit1", unit1);

  // ~~~~~~~~~~~~~~~~~~~~~~~~ START - CLENUP CONNECTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //
  // ---------------- CLEAN CPT 1 based on CONNECTION  ----------------
  // clean up cpt based on the connection direction.
  // if new bus does not support same connection, it should clear the cpt and the fuse

  // this block could be placed after bus is cleaned up and after the compartments has been selected, before final post request that way we can save the already picked bottom compartment. Hi
  if (unit1.cpt1_id) {
    let cpt_connection = "pack_is_cpt1" + String(unit1.cpt1_connection);
    if (unit1.bus[cpt_connection] !== new_bus_pack[cpt_connection]) {
      reqBody = { ...reqBody, ...clean_cpt1, ...clean_cpt1_fuse };
    }
  }

  // ---------------- CLEAN CPT 2 based on CONNECTION  ----------------
  // clean up cpt based on the connection direction.
  // if new bus does not support same connection, it should clear the cpt and the fuse
  if (unit1.cpt2_id) {
    let cpt_connection = "pack_is_cpt2" + String(unit1.cpt2_connection);
    if (unit1.bus[cpt_connection] !== new_bus_pack[cpt_connection]) {
      reqBody = { ...reqBody, ...clean_cpt2, ...clean_cpt2_fuse };
    }
  }

  // ---------------- CLEAN PT 1 based on CONNECTION  ----------------
  // clean up pt based on the connection direction.
  // if new bus does not support same connection, it should clear the pt and the fuse
  if (unit1.pt1_id) {
    let pt_connection = "pack_is_pt1" + String(unit1.pt1_con);
    if (unit1.bus[pt_connection] !== new_bus_pack[pt_connection]) {
      reqBody = { ...reqBody, ...clean_pt1, ...clean_pt1_fuse };
    }
  }

  // ---------------- CLEAN PT 2 based on CONNECTION  ----------------
  // clean up pt based on the connection direction.
  // if new bus does not support same connection, it should clear the pt and the fuse
  if (unit1.pt2_id) {
    let pt_connection = "pack_is_pt2" + String(unit1.pt2_con);
    if (unit1.bus[pt_connection] !== new_bus_pack[pt_connection]) {
      reqBody = { ...reqBody, ...clean_pt2, ...clean_pt2_fuse };
    }
  }

  // ---------------- CLEAN PT 3 based on CONNECTION  ----------------
  // clean up pt based on the connection direction.
  // if new bus does not support same connection, it should clear the pt and the fuse
  if (unit1.pt3_id) {
    let pt_connection = "pack_is_pt3" + String(unit1.pt3_con);
    if (unit1.bus[pt_connection] !== new_bus_pack[pt_connection]) {
      reqBody = { ...reqBody, ...clean_pt3, ...clean_pt3_fuse };
    }
  }

  // ---------------- CLEAN PT 4 based on CONNECTION  ----------------
  // clean up pt based on the connection direction.
  // if new bus does not support same connection, it should clear the pt and the fuse
  if (unit1.pt4_id) {
    let pt_connection = "pack_is_pt4" + String(unit1.pt4_con);
    if (unit1.bus[pt_connection] !== new_bus_pack[pt_connection]) {
      reqBody = { ...reqBody, ...clean_pt4, ...clean_pt4_fuse };
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~ END - CLENUP CONNECTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  //   ---------------- BREAКER 1 ----------------
  // eg. new bus is not accepting brk, clear all related features
  if (!new_bus_pack.pack_is_brk1) {
    reqBody = { ...reqBody, ...clean_brk1 };
  }

  // // eg. new bus is accepting brk, clear all other features
  if (new_bus_pack.pack_is_brk1) {
    reqBody = {
      ...reqBody,
      ...clean_pt1,
      ...clean_pt2,
      ...clean_pt1_fuse,
      ...clean_pt2_fuse,
      ...clean_cpt1,
      ...clean_cpt3,
      ...clean_cpt1_fuse,
      ...clean_cpt3_fuse,
    };
  }

  //  ---------------- BREAКER 2 ----------------
  if (!new_bus_pack.pack_is_brk2) {
    reqBody = { ...reqBody, ...clean_brk2 };
  }

  if (new_bus_pack.pack_is_brk2) {
    reqBody = {
      ...reqBody,
      ...clean_pt3,
      ...clean_pt4,
      ...clean_pt3_fuse,
      ...clean_pt4_fuse,
      ...clean_cpt2,
      ...clean_cpt2_fuse,
    };
  }

  //    ---------------- PT 1, PT 2 ----------------
  // bus that cannot accept pt1 is the same for pt2
  if (!new_bus_pack.pack_is_pt1 || !new_bus_pack.pack_is_pt2) {
    reqBody = {
      ...reqBody,
      ...clean_pt1,
      ...clean_pt2,
      ...clean_pt1_fuse,
      ...clean_pt2_fuse,
    };
  }

  // bus that accepts the pts cannot accept a breaker at the same spot
  if (new_bus_pack.pack_is_pt1 || new_bus_pack.pack_is_pt2) {
    reqBody = { ...reqBody, ...clean_brk1 };
  }

  //   ---------------- PT 3 ----------------
  if (!new_bus_pack.pack_is_pt3) {
    reqBody = { ...reqBody, ...clean_pt3, ...clean_pt3_fuse };
  }

  if (new_bus_pack.pack_is_pt3) {
    reqBody = { ...reqBody, ...clean_brk2 };
  }

  //   ---------------- PT 4 ----------------
  // bus that cannot accept pt4 does not accept the pt3 too
  if (!new_bus_pack.pack_is_pt4) {
    reqBody = {
      ...reqBody,
      ...clean_pt3,
      ...clean_pt4,
      ...clean_pt3_fuse,
      ...clean_pt4_fuse,
    };
  }

  if (new_bus_pack.pack_is_pt4) {
    reqBody = { ...reqBody, ...clean_brk2 };
  }

  //   ---------------- CPT 1 ----------------
  if (!new_bus_pack.pack_is_cpt1) {
    reqBody = { ...reqBody, ...clean_cpt1, ...clean_cpt1_fuse };
  }

  if (new_bus_pack.pack_is_cpt1) {
    reqBody = { ...reqBody, ...clean_brk1 };
  }

  //   ---------------- CPT 2 ----------------
  if (!new_bus_pack.pack_is_cpt2) {
    reqBody = { ...reqBody, ...clean_cpt2, ...clean_cpt2_fuse };
  }

  if (new_bus_pack.pack_is_cpt2) {
    reqBody = { ...reqBody, ...clean_brk2 };
  }

  //   ---------------- CPT 3 ----------------
  if (!new_bus_pack.pack_is_cpt3) {
    reqBody = { ...reqBody, ...clean_cpt3, ...clean_cpt3_fuse };
  }

  if (new_bus_pack.pack_is_cpt3) {
    reqBody = { ...reqBody, ...clean_brk1 };
  }

  //if the new busbar has not cable 1 connection, delete SA and GCT
  if (!new_bus_pack.pack_is_cable1 && !new_bus_pack.pack_is_cable2) {
    reqBody = { ...reqBody, ...clean_cable1 };
  }

  if (!new_bus_pack.pack_is_cable3 && !new_bus_pack.pack_is_cable4) {
    reqBody = { ...reqBody, ...clean_cable3 };
  }

  // this needs work
  // if (!new_bus_pack.pack_is_cable2) {
  //   reqBody = { ...reqBody, ...clean_cable2};
  // }

  // Addressing Ground Stud Package:
  // ground stud and bus bar cap, if we have the cable connection
  if (new_bus_pack.pack_is_cable1 || new_bus_pack.pack_is_cable1) {
    reqBody = { ...reqBody, grstud1_id: Number(159) };
  } else {
    reqBody = { ...reqBody, grstud1_id: null };
  }

  if (new_bus_pack.pack_is_cable3 || new_bus_pack.pack_is_cable4) {
    reqBody = { ...reqBody, grstud2_id: Number(159) };
  } else {
    reqBody = { ...reqBody, grstud2_id: null };
  }

  // console.log("reqBody", reqBody);
  return reqBody;
}
