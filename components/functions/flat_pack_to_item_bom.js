// input is pack object
// output is flat item bom 

export default function FlatPackToItemBomFunction(packNested) {
  const pack = packNested;
  const pack_obj = pack.item_pack;

  //  step 1 make the bom flat
  const flat_arr = flattenPackToItemObj(pack_obj);
  //   console.log("flat_arr", flat_arr);

  // //  step 2, make unique array
  // const unique_arr = uniqueIds(flat_arr);
  // //   console.log("unique_arr", unique_arr);

  // // step 3, compare flat bom and unique array and create quantities
  // const bom_qty = bomQty(unique_arr, flat_arr);

  return flat_arr;
}

export function flattenPackToItemObj(obj) {
  let flatItems = [];
  // get the pack and product array of objects
  for (var k in obj) {
    let item = obj[k];
    let i = 0;
    for (var key in item) {
      if (item[key] != null) {
        const type = typeof item[key];
        if (type === "object") {
          flatItems.push({
            category_id: item[key].category_id,
            category_name: item[key].category.category_name,
            category_description: item[key].category.category_description,
            item_id: item[key].item_id,
            qty: item.item_pack_quantity, // not nested, use only item not item[key]
            item_description: item[key].item_description,

          });
        }
      }
    }
  }
  return flatItems;
}
