import React from "react";
import { Dollar } from "@/components/functions/conversions";
import { Lineup1Price } from "@/components/functions/price";
import { Unit1Price } from "@/components/functions/price";
import { PackPrice } from "@/components/functions/price";
import Bg1BomCategory from "./Bg1BomCategory";
import Bg1BomCategoryGroup from "./Bg1BomCategoryGroup";

export default function Bg1BOM(lineup1Nested) {
  const lineup1 = lineup1Nested.lineup1Nested; // simplify

  return (
    <div>
      {lineup1.unit1 && (
        <ul>
          <div>
            <div style={{ padding: "1rem 0 0 0" }}>Cost of Material</div>
            <h2 style={{ margin: "0 0 0 0" }}>
              {Dollar(Lineup1Price(lineup1))}
            </h2>
          </div>
          {lineup1.unit1
            .sort((a, b) => (a.unit1_position > b.unit1_position ? 1 : -1))
            .map((unit1, index) => (
              <li key={unit1.unit1_id}>
                <br />
                <div
                  style={{
                    margin: "1rem 0 0 0",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  {"Section "}
                  {index + 1}{": "}
                  <span style={{ margin: "0 1rem 0 0", fontWeight: "600" }}>
                    {Dollar(Unit1Price(unit1))}
                  </span>
                  {/* {index + 1}. {unit1.unit1_name} {Dollar(Unit1Price(unit1))} */}
                </div>

                <Bg1BomCategory pack={unit1.bus} pack_name="Bus Bars " />
                <Bg1BomCategoryGroup
                  pack_group={[unit1.brk1, unit1.brk2]}
                  pack_name="Breaker "
                />
                <Bg1BomCategory pack={unit1.comps} pack_name="Compartment " />
                <Bg1BomCategoryGroup
                  pack_group={[
                    unit1.ct1,
                    unit1.ct2,
                    unit1.ct3,
                    unit1.ct4,
                    unit1.ct5,
                    unit1.ct6,
                    unit1.ct7,
                    unit1.ct8,
                    unit1.ct9,
                    unit1.ct10,
                    unit1.ct11,
                    unit1.ct12,
                  ]}
                  pack_name="CT "
                />
                <Bg1BomCategoryGroup
                  pack_group={[unit1.cpt1, unit1.cpt2, unit1.cpt3]}
                  pack_name="CPT "
                />
                <Bg1BomCategoryGroup
                  pack_group={[unit1.pt1, unit1.pt2, unit1.pt3, unit1.pt4]}
                  pack_name="PT "
                />
                <Bg1BomCategoryGroup
                  pack_group={[unit1.ctrl1, unit1.ctrl2]}
                  pack_name="Controls "
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
