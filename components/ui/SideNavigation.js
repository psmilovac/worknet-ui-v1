import styles from "./UnitBG.module.css";


function SideNavigation(props) {
  const [selectedItem, setSelectedItem] = useState("Home");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    props.selectCategory(item); // send reference Scroll to the parent component
  };



  return (
    <div className={styles.nav_container}>
      {/* <div className="logo">your logo goes here</div> */}
      <ul>
        <li
          // className={selectedItem === "Oneline" ? "selected" : ""}
          onClick={() => handleItemClick("Oneline")}
        >
          Oneline Diagram
        </li>
        <li
          // className={selectedItem === "Compartments" ? "selected" : ""}
          onClick={() => handleItemClick("Compartments")}
        >
          Compartments
        </li>
        <li
          // className={selectedItem === "Controls" ? "selected" : ""}
          onClick={() => handleItemClick("Controls")}
        >
          Controls
        </li>
        <li
          // className={selectedItem === "Enclosures" ? "selected" : ""}
          onClick={() => handleItemClick("Enclosures")}
        >
          Enclosures
        </li>
        <li
          // className={selectedItem === "CT" ? "selected" : ""}
          onClick={() => handleItemClick("CT")}
        >
          Current Transformers
        </li>
        <li
          // className={selectedItem === "PT" ? "selected" : ""}
          onClick={() => handleItemClick("PT")}
        >
          Voltage Transformers
        </li>
        <li
          // className={selectedItem === "CPT" ? "selected" : ""}
          onClick={() => handleItemClick("CPT")}
        >
          Power Transformer
        </li>
        <li
          // className={selectedItem === "Other" ? "selected" : ""}
          onClick={() => handleItemClick("Other")}
        >
          Other Equipment 
        </li>

      </ul>
    </div>
  );
}

export default SideNavigation;

{/* <Link to={"/bg15/lineup/" + row.lineup_id}>{row.lineup_id}</Link> */}