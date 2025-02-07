// filter busbars based on the type of bus selection
export function filter_bus_funcation(bus_table, busFilter) {
  // console.log("busFilter", busFilter);
  // console.log("bus_table", bus_table);
  let result = bus_table;

  if (busFilter === "brk1") {
    result = bus_table.filter(
      (pck) =>
        pck.pack_is_brk1 === true &&
        (pck.pack_is_brk2 === false || pck.pack_is_brk2 === null) // need null or false, because the db allows null
    );
  } else if (busFilter === "brk2") {
    result = bus_table.filter(
      (pck) =>
        pck.pack_is_brk2 === true &&
        (pck.pack_is_brk1 === false || pck.pack_is_brk1 === null)
    );
  } else if (busFilter === "brk_double") {
    result = bus_table.filter(
      (pck) => pck.pack_is_brk1 === true && pck.pack_is_brk2 === true
    );
  } else if (busFilter === "tie1") {
    result = bus_table.filter(
      (pck) =>
        pck.pack_is_brk1 === true &&
        (pck.pack_is_bus1 === true || pck.pack_is_bus4 === true)
      // (pck.pack_is_brk2 === false || pck.pack_is_brk2 === null) // we do not have these sections
    );
  } else if (busFilter === "tie2") {
    result = bus_table.filter(
      (pck) =>
        pck.pack_is_brk2 === true &&
        (pck.pack_is_bus3 === true || pck.pack_is_bus6 === true)
      // (pck.pack_is_brk2 === false || pck.pack_is_brk2 === null)
    );
  } else if (busFilter === "cpt15kva") {
    result = bus_table.filter(
      (pck) => pck.pack_is_cpt1 === true || pck.pack_is_cpt2 === true
      // (pck.pack_is_brk2 === false || pck.pack_is_brk2 === null)
    );
  } else if (busFilter === "cpt75kva") {
    result = bus_table.filter(
      (pck) => pck.pack_is_cpt3 === true
      // (pck.pack_is_brk2 === false || pck.pack_is_brk2 === null)
    );
  } else if (busFilter === "pt_lower") {
    result = bus_table.filter(
      (pck) => pck.pack_is_pt1 === true || pck.pack_is_pt2 === true
    );
  } else if (busFilter === "pt_upper") {
    result = bus_table.filter(
      (pck) => pck.pack_is_pt3 === true || pck.pack_is_pt4 === true
    );
  }

  return result;
}

// filter compartments based on the selected busbar
export function bus_filter_comps(pack_table, category_id, bus_id) {
  if (bus_id != null) {
    // console.log("bus_id", bus_id);
    // get the busbar (oneline) recrod first
    const target = pack_table.filter((p) => p.pack_id === bus_id); // target values
    // console.log(bus[0].pack_is_brk1);
    const bus = target[0];
    // console.log("bus.pack_id", bus.pack_id);

    // reduce pack_table to only desirable category
    // pack_table_small = pack_table.filter((p) => p.category_id === category_id);

    // console.log("pack_table", pack_table)
    // console.log("bus_id", bus_id);

    const filter_category = [
      // "pack_is_brk1",
      // "pack_is_brk2",
      // "pack_is_bus1",
      // "pack_is_bus2",
      // "pack_is_bus3",
      // "pack_is_bus4",
      // "pack_is_bus5",
      // "pack_is_bus6",
      // "pack_is_cable1",
      // "pack_is_cable2",
      // "pack_is_cable3",
      // "pack_is_cable4",
      // "pack_is_cpt1",
      // "pack_is_cpt2",
      // "pack_is_cpt3",
      // "pack_is_lv1",
      // "pack_is_lv2",
      // "pack_is_lv3",
      // "pack_is_lv4",
      // "pack_is_pt1",
      // "pack_is_pt2",
      // "pack_is_pt3",
      // "pack_is_pt4",
    ];

    // for (let i in filter_category) {
    //   if (filter_category[i]){
    //   console.log(filter_category[i]);
    //   }
    // }

    // WORKS
    // let x = 0;
    // for (let i in filter_category) {
    //   if (bus[0][filter_category[i]] == true) {
    //     console.log(filter_category[i]);
    //     x++;
    //   }
    // }
    // console.log("x", x);

    // WORKS
    // let z = 0;
    // for (let p in pack_table) {
    //   for (let i in filter_category) {
    //     if (pack_table[p][filter_category[i]] == true) {
    //       console.log(filter_category[i]);
    //       z++;
    //     }
    //   }
    //   console.log("pack_id:", pack_table[p].pack_id, ": ", z);
    //   z = 0;
    // }

    // WORKS but Logic is wrong
    // let pack_temp = [];
    // let pack_result = [];
    // let t = 0;
    // let b = 0;
    // for (let p in pack_table) {
    //   b = 0;
    //   t = 0;
    //   for (let i in filter_category) {
    //     if (pack_table[p][filter_category[i]] === true) {
    //       t = t + 1;
    //       if (bus[0][filter_category[i]] === true) {
    //         b = b + 1;
    //       }
    //     }
    //   }

    //   if (t !== 0 && t === b) {
    //     console.log("pack_id", pack_table[p], ", t:", t, ", b:", b);
    //     pack_result.push(pack_table[p]);
    //     t = 0;
    //     b = 0;
    //   }
    // }

    // Works but logic is not accurate. It is missing multpile records for specific bus
    // Example: Bus M1 pairs with F, G and H compartments, but filtering will drop F and H
    // const pack_result = pack_table.filter(
    //   (p) =>
    //     p.pack_is_brk1 == bus.pack_is_brk1 &&
    //     p.pack_is_brk2 == bus.pack_is_brk2 &&
    //     p.pack_is_cpt3 == bus.pack_is_cpt3
    // );

    let result = [];
    // COMPARTMENTS (improvement: check pack_is_brk1 and pack_is_brk2 == true)
    if (
      bus.pack_id === 1 || // A1
      bus.pack_id === 2 || // A2
      bus.pack_id === 3 || // A3
      bus.pack_id === 4 || // B1
      bus.pack_id === 5 || // B2
      bus.pack_id === 6 || // B3
      bus.pack_id === 7 || // C1
      bus.pack_id === 8 || // C2
      bus.pack_id === 9 || // C3
      bus.pack_id === 10 || // D1
      bus.pack_id === 11 || // D2
      bus.pack_id === 12 || // E1
      bus.pack_id === 13 || // E2
      bus.pack_id === 14 || // F1
      bus.pack_id === 15 || // F2
      bus.pack_id === 16 || // G1
      bus.pack_id === 17 // G2
    ) {
      result = pack_table.filter((p) => p.pack_id === 46); // A
    } else if (
      // single breaker in the bottom
      bus.pack_id === 18 || // H1
      bus.pack_id === 19 || // H2
      bus.pack_id === 20 || // H3
      bus.pack_id === 21 || // J1
      bus.pack_id === 22 || // J2
      bus.pack_id === 23 || // J3
      bus.pack_id === 24 || // K1
      bus.pack_id === 25 || // K2
      bus.pack_id === 123 || // K3
      bus.pack_id === 26 || // L1
      bus.pack_id === 27 || // L2
      bus.pack_id === 120 || // L3
      bus.pack_id === 116 || // I1
      bus.pack_id === 117 // I2
    ) {
      result = pack_table.filter(
        (p) =>
          p.pack_id === 47 || // B
          p.pack_id === 48 || // C
          p.pack_id === 49 || // D
          p.pack_id === 93 // E
      );
    } else if (
      bus.pack_id === 28 || // M1
      bus.pack_id === 29 || // M2
      bus.pack_id === 30 || // M3
      bus.pack_id === 118 || // O1
      bus.pack_id === 119 // O2
    ) {
      result = pack_table.filter(
        (p) =>
          p.pack_id === 94 || // F
          p.pack_id === 95 || // G
          p.pack_id === 96 // H
      );
    } else if (
      bus.pack_id === 31 || // N1
      bus.pack_id === 32 || // N2
      bus.pack_id === 33 || // N3
      bus.pack_id === 34 || // P1
      bus.pack_id === 35 || // P2
      bus.pack_id === 121 || // P3
      bus.pack_id === 36 || // Q1
      bus.pack_id === 37 || // Q2
      bus.pack_id === 122 // Q3
    ) {
      result = pack_table.filter(
        (p) =>
          p.pack_id === 94 || // F
          p.pack_id === 96 // H
      );
    } else if (
      bus.pack_id === 38 || // R1
      bus.pack_id === 39 || // R2
      bus.pack_id === 45 || // U1
      bus.pack_id === 108 || // U2
      bus.pack_id === 109 || // U3
      bus.pack_id === 110 // V1
    ) {
      result = pack_table.filter(
        (p) =>
          p.pack_id === 97 || // J
          p.pack_id === 98 || // K
          p.pack_id === 99 || // L
          p.pack_id === 100 || // M
          p.pack_id === 101 || // N
          p.pack_id === 102 || // P
          p.pack_id === 103 || // Q
          p.pack_id === 104 || // R
          p.pack_id === 105 || // S
          p.pack_id === 106 || // T
          p.pack_id === 107 // U
      );
    } else if (
      bus.pack_id === 40 || // S1
      bus.pack_id === 41 || // S2
      bus.pack_id === 42 || // T1
      bus.pack_id === 43 // T2
    ) {
      result = pack_table.filter(
        (p) =>
          p.pack_id === 97 || // J
          p.pack_id === 98 || // K
          p.pack_id === 99 || // L
          p.pack_id === 100 || // M
          p.pack_id === 104 || // R
          p.pack_id === 105 || // S
          p.pack_id === 106 || // T
          p.pack_id === 107 // U
      );
    }

    return result;
  } else {
    return null;
  }
}

// let pack_result = [];
//     for (let p in pack_table) {
//       let t = 0;
//       let b = 0;
//       for (let i in filter_category) {
//         if (pack_table[p][filter_category[i]] == true) {
//           t = t + 1;
//           if (pack_table[p][filter_category[i]] == bus[0][filter_category[i]]) {
//             b = b + 1;
//           }
//         }
//       }
//       if ((t !== 0) && (t === b)) {
//         pack_result.push(pack_table[p]);
//       }
//     }

// const filter_category = [
//   pack_is_brk1,
//   pack_is_brk2,
//   pack_is_bus1,
//   pack_is_bus2,
//   pack_is_bus3,
//   pack_is_bus4,
//   pack_is_bus5,
//   pack_is_bus6,
//   pack_is_cable1,
//   pack_is_cable2,
//   pack_is_cable3,
//   pack_is_cable4,
//   pack_is_cpt1,
//   pack_is_cpt2,
//   pack_is_cpt3,
//   pack_is_lv1,
//   pack_is_lv2,
//   pack_is_lv3,
//   pack_is_lv4,
//   pack_is_pt1,
//   pack_is_pt2,
//   pack_is_pt3,
//   pack_is_pt4,
// ];

export function FindCompsInLineup1Nested(lineup1Nested) {
  let comps = {};
  if (lineup1Nested.unit1) {
    const unit1s = lineup1Nested?.unit1?.map((unit1) => unit1);
    for (let unit1 of unit1s) {
      // comps[unit1] = unit1.comps.item_pack;
      // console.log(unit1?.comps?.item_pack);  
    }
    // console.log(comps);
  }
}
