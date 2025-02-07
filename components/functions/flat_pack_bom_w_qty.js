// input is lineup1
// output is flat bom of packages with quantities
import { PackPrice } from "./price";

export default function FlatPackBomWQtyFunction(lineup1Nested) {
  const lineup1 = lineup1Nested;
  const unit1_row = lineup1.unit1;

  //  step 1 make the bom flat
  const flat_arr = flattenUnit1toPackObj2(unit1_row);
  //   console.log("flat_arr", flat_arr);

  //  step 2, make unique array
  const unique_arr = uniqueIds(flat_arr);
  //   console.log("unique_arr", unique_arr);

  // step 3, compare flat bom and unique array and create quantities
  const bom_qty = bomQty(unique_arr, flat_arr);

  return bom_qty;
}

export function flattenUnit1toPackObj2(obj) {
  let flatPack2 = [];
  // get the lineup1 and product array of objects
  for (var k in obj) {
    let unit1 = obj[k];
    let i = 0;
    for (var key in unit1) {
      if (unit1[key] != null) {
        const type = typeof unit1[key];
        if (type === "object") {
          flatPack2.push({
            category_id: unit1[key].category_id,
            category_name: unit1[key].category.category_name,
            category_description: unit1[key].category.category_description,
            pack: key,
            pack_id: unit1[key].pack_id,
            pack_name: unit1[key].pack_name,
            pack_description: unit1[key].pack_description,
            unit1_id: unit1.unit1_id,
            qty: 0,           
            price: PackPrice(unit1[key])
          });
        }
      }
    }
  }
  return flatPack2;
}

export function uniqueIds(array) {
  const unique_key = "pack_id";
  const arrayUniqueByKey = [
    ...new Map(array.map((item) => [item[unique_key], item])).values(),
  ];
  return arrayUniqueByKey;
}

export function bomQty(qty_arr, flat_arr) {
  for (var i in qty_arr) {
    let pack_id = qty_arr[i].pack_id;
    for (var j in flat_arr) {
      if (flat_arr[j].pack_id === pack_id) {
        qty_arr[i].qty += 1;
      }
    }
  }
  return qty_arr;
}
