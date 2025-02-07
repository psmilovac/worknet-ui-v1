import React from "react";
import { Dollar } from "@/components/functions/conversions";
import { PackPrice } from "@/components/functions/price";

export default function Bg1BomCategory({ pack, pack_name }) {
  return (
    <div>
      {pack && (
        <ul>
          <h4 style={{ margin: "0.5rem 0 0 1rem", fontWeight:"600" }}>
            {pack_name} {"   "}
            {Dollar(PackPrice(pack))}
          </h4>

          {pack.item_pack.map((item_pack, index) => (
            <li style={{ margin: "0 0 0 2rem" }} key={item_pack.item.item_id}>
              {index + 1}. {item_pack.item.item_id}
              {"  "}
              {item_pack.item.item_description.slice(0, 20) + "..."} {",  "}
              Qty: {item_pack.item_pack_quantity} {"  "}
              Each: {Dollar(item_pack.item.item_price)} Cost:{" "}
              {Dollar(item_pack.item_pack_quantity * item_pack.item.item_price)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
