export default function BomGrouping(flat_bom, group) {
  // extract group items from flat_bom
  // create a new object and sum the total price for the new object
  // insert new object back in the flat_bom

  const new_group_stack = flat_bom?.filter((x) => x.category_name === group);
  const initial_value = 0;
  const total_price = new_group_stack.reduce(
    (accumulator, current_value) => accumulator + current_value.price_total,
    initial_value
  );

  const new_group_obj = {
    category_name: group,
    item_description: "Various " + group,
    item_id: "various-" + group,
    price_item: Math.round(total_price * 100) / 100,
    price_total: Math.round(total_price * 100) / 100,
    qty: 1,
  };

  const new_flat_bom = flat_bom?.filter((x) => x.category_name !== group);
  new_flat_bom.push(new_group_obj);
  return new_flat_bom;
}
