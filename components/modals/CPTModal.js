import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import styles from './CPTModal.module.css';
import Image from 'next/image';
import Button from '../ui/buttons/Button';
import ButtonCancel from '../ui/buttons/ButtonCancel';
import Link from 'next/link';
import { api_root } from '@/global/global_vars';

const CPTModal = ({ onClose, children, pack_table, unit1, setSharedCPTState, lineup1 }) => {
  const title = 'Current Power Transformers';
  const cpt_witdraw_asm_cat = 230; // withdrawable CPT assemblies
  const cpt_fix_asm_cat = 230; // fix mount CPT assemblies
  const cpt_fuse = 240;
  const cpt_fix = 233;

  // console.log("lineup1_voltage", lineup1)

  // control of show/hide html block of CPT locations
  // if busbar layout (bus.pack) has true values for pack_is_cpt1..., show
  let showCpt1 = false;
  let showCpt2 = false;
  let showCpt3 = false;
  if (unit1 && unit1.bus) {
    // console.log(unit1.bus)
    // prevent void props
    showCpt1 = unit1.bus?.pack_is_cpt1; // show Lower CPT selection
    showCpt2 = unit1.bus?.pack_is_cpt2; // show Lower-Mid CPT selection
    showCpt3 = unit1.bus?.pack_is_cpt3; // show Upper-Mid CPT selection
  }
  // console.log("showCpt1", showCpt1, "showCpt2", showCpt2, "showCpt3", showCpt3);

  const cpt_draw = pack_table
    .filter(
      (p) => p.category_id === cpt_witdraw_asm_cat && p.pack_voltage === lineup1.lineup1_voltage
    )
    .sort((a, b) => (a.pack_id > b.pack_id ? 1 : -1));

  const cpt_fix_list = pack_table.filter((p) => p.category_id === cpt_fix);

  // console.log("cpt_fix_list", cpt_fix_list);

  // read Compatment ID in case we need to change it
  const [comps_id, setCompsID] = useState(unit1?.comps_id > 0 ? unit1?.comps_id : ''); // just send from the parent the records for the unit: cpt1_id, cpt2_id ...
  // console.log("comps_id", comps_id)

  const [cpt1, setCpt1] = useState(unit1?.cpt1_id > 0 ? unit1?.cpt1_id : ''); // just send from the parent the records for the unit: cpt1_id, cpt2_id ...
  const [cpt2, setCpt2] = useState(unit1?.cpt2_id > 0 ? unit1?.cpt2_id : '');
  const [cpt3, setCpt3] = useState(unit1?.cpt3_id > 0 ? unit1?.cpt3_id : '');

  const [cpt1Fuse, setCpt1Fuse] = useState(unit1?.cpt1_fuse_id > 0 ? unit1?.cpt1_fuse_id : '');
  const [cpt2Fuse, setCpt2Fuse] = useState(unit1?.cpt2_fuse_id > 0 ? unit1?.cpt2_fuse_id : '');
  const [cpt3Fuse, setCpt3Fuse] = useState(unit1?.cpt3_fuse_id > 0 ? unit1?.cpt3_fuse_id : '');

  const [showMore, setShowMore] = useState(false);

  const [cpt1Description, setCpt1Description] = useState(
    cpt1 > 0 ? pack_table?.find((p) => p.pack_id === cpt1)?.pack_description : 'None'
  );

  const [cpt2Description, setCpt2Description] = useState(
    cpt2 > 0 ? pack_table?.find((p) => p.pack_id === cpt2)?.pack_description : 'None'
  );

  const [cpt3Description, setCpt3Description] = useState(
    cpt3 > 0 ? pack_table?.find((p) => p.pack_id === cpt3)?.pack_description : 'None'
  );

  // disable the dropdown menu for fuse if CPT is not selected
  const [isCpt1FuseDisabled, setIsCpt1FuseDisabled] = useState(cpt1 > 0 ? false : true);
  const [isCpt2FuseDisabled, setIsCpt2FuseDisabled] = useState(cpt2 > 0 ? false : true);
  const [isCpt3FuseDisabled, setIsCpt3FuseDisabled] = useState(cpt3 > 0 ? false : true);

  // get the CPT connection
  const [cpt1Connection, setCpt1Connection] = useState(
    unit1.cpt1_connection > 0 ? unit1.cpt1_connection : null
  );
  const [cpt2Connection, setCpt2Connection] = useState(
    unit1.cpt2_connection > 0 ? unit1.cpt2_connection : null
  );
  const [cpt3Connection, setCpt3Connection] = useState(
    unit1.cpt3_connection > 0 ? unit1.cpt3_connection : null
  );

  //~~~~~~~~~~~~~~~~~~~ MODAL ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // create ref for the styled container component
  const modalContainerRef = React.useRef();

  // check if the user has clicked inside or outside the modal
  // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
  const backdropHandler = useCallback((e) => {
    if (!modalContainerRef?.current?.contains(e.target)) {
      onClose();
    }
  }, []);

  useEffect(() => {
    // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
    setTimeout(() => {
      window.addEventListener('click', backdropHandler);
    });
  }, []);

  useEffect(() => {
    // remove the event listener when the modal is closed
    return () => window.removeEventListener('click', backdropHandler);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  // on Cancel Button
  const onCPTModalCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  //~~~~~~~~~~~~~~~~~~~ MODAL END ~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Breaker 1, Lower Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const Cpt1ClearHandler = (value) => {
    if (value) {
      setCpt3('');
      setCpt3Fuse('');
      setCpt3Description('None');
      setIsCpt3FuseDisabled(true);
    }
  };

  const Cpt3ClearHandler = (value) => {
    if (value) {
      setCpt1('');
      setCpt1Fuse('');
      setCpt1Description('None');
      setIsCpt1FuseDisabled(true);
    }
  };

  const onCpt1Selection = (cpt1_id) => {
    if (cpt1_id > 0) {
      setCpt1Description(pack_table?.find((p) => p.pack_id === cpt1_id)?.pack_description);
      setIsCpt1FuseDisabled(false);
    } else {
      setCpt1Description('None');
      setCpt1Fuse('');
      setCpt1Connection('');
      setIsCpt1FuseDisabled(true);
    }
  };

  const onCpt2Selection = (cpt2_id) => {
    if (cpt2_id > 0) {
      setCpt2Description(pack_table?.find((p) => p.pack_id === cpt2_id)?.pack_description);
      setIsCpt2FuseDisabled(false);
    } else {
      setCpt2Description('None');
      setCpt2Fuse('');
      setCpt2Connection('');
      setIsCpt2FuseDisabled(true);
    }
  };

  // CPT connection will affect the Compartment. We'll need to select if we are going to use upper or lower stab CPT compartment
  const onCpt2Connection = (cpt2_connection) => {
    if (cpt2_connection > 0) {
      setCpt2Connection(cpt2_connection);
    }
  };

  const onCpt3Selection = (cpt3_id) => {
    if (cpt3_id > 0) {
      setCpt3Description(pack_table?.find((p) => p.pack_id === cpt3_id)?.pack_description);
      setIsCpt3FuseDisabled(false);
    } else {
      setCpt3Description('None');
      setCpt3Fuse('');
      setCpt3Connection('');
      setIsCpt3FuseDisabled(true);
    }
  };

  const onCTModalFormSubmit = (e) => {
    e.preventDefault();
    // const current_comps = pack_table.filter(
    //   (pack) => pack.pack_id == comps_id
    // );
    // const current_comps_name =  current_comps[0].pack_name[0]
    // console.log("current_comps_name", comps_id )

    // switch the CPT stab locations from top to bottom by swaping the compartment
    // if (cpt2Connection > 2) {
    //   const current_comps = pack_table.filter(
    //     (pack) => pack.pack_id == comps_id
    //   );
    //   // console.log("current_comps", current_comps)
    // }

    // if (cpt1Connection > 2) {
    //   const new_comps = pack_table.filter(
    //     (pack) => (pack.pack_name[0] === current_comps_name) && (pack.category_id === 110) && (pack.pack_variation === 2)
    //   );
    //   setCompsID(new_comps[0].pack_id)
    //   console.log("new cpt_con > 2", new_comps[0].pack_id )
    // }
    // else{
    //   const new_comps = pack_table.filter(
    //     (pack) => (pack.pack_name[0] === current_comps_name) && (pack.category_id === 110) && (pack.pack_variation === 1)
    //   );
    //   setCompsID(new_comps[0].pack_id)
    //   console.log("new cpt_con <= 2", new_comps[0].pack_id )
    // }

    setSharedCPTState({
      cpt1_id: Number(cpt1) > 0 && Number(cpt1Connection) > 0 ? Number(cpt1) : null,
      cpt2_id: Number(cpt2) > 0 && Number(cpt2Connection) > 0 ? Number(cpt2) : null,
      cpt3_id: Number(cpt3) > 0 ? Number(cpt3) : null,
      cpt1_connection:
        Number(cpt1) > 0 && Number(cpt1Connection) > 0 ? Number(cpt1Connection) : null,
      cpt2_connection:
        Number(cpt2) > 0 && Number(cpt2Connection) > 0 ? Number(cpt2Connection) : null,
      cpt3_connection: Number(cpt3) > 0 ? Number(cpt3Connection) : null,
      cpt1_fuse_id: Number(cpt1Fuse) > 0 ? Number(cpt1Fuse) : null,
      cpt2_fuse_id: Number(cpt2Fuse) > 0 ? Number(cpt2Fuse) : null,
      cpt3_fuse_id: Number(cpt3Fuse) > 0 ? Number(cpt3Fuse) : null,
      comps_id: Number(comps_id) > 0 ? Number(comps_id) : null,
    });

    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalContainerRef}>
        {/* ---------HEADER--------- */}
        <div
          href="#"
          onClick={handleCloseClick}
          style={{ fontSize: '1.5rem', textAlign: 'right', cursor: 'pointer' }}
        >
          x
        </div>
        <div style={{ fontSize: '0.85rem', opacity: '0.8' }}>Section {unit1.unit1_position}</div>
        {/* ---------TITLE--------- */}
        <div>{title && <h1>{title}</h1>}</div>

        {/* ---------CONTENT--------- */}
        <div className={styles.content}>
          <div>
            {/* -------- TEXT --------- */}
            <p style={{ opacity: '0.7', margin: '0 0 1rem 0' }}>
              A Current Power Transformer (CPTs) is indoor, self-cooled, single-phase, dry-type
              control power transformer designed to provide control power in medium voltage
              switchgear.
              <br />
            </p>
            <br />
            {/* <p style={{ opacity: "1", margin: "0 0 1rem 0" }}></p> */}
            <ul style={{ color: 'var(--focus)' }}>
              <li>
                <Link
                  href="https://library.e.abb.com/public/7917afec7045495d80b4f42578a7425a/1VAP600001-DB_CPTIK5.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image src="/circle.svg" alt="circle" width={15} height={15} />
                  5kVA, Drawout CPT with Fuses
                </Link>
              </li>
              <li>
                <Link
                  href="https://library.e.abb.com/public/62bdb9f598234fae9e80ac94175e19eb/1VAP600002-DB_CPTIK15.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image src="/circle.svg" alt="circle" width={15} height={15} />
                  10kVA - 15kVA, Drawout CPT with Fuses
                </Link>
              </li>
              <li>
                <Link
                  href="http://www.afp-transformers.com/epoxycast-coil-transformers.html"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image src="/circle.svg" alt="circle" width={15} height={15} />
                  25kV -75kV, Fix-mount CPT with Drawable Fuse Truck
                </Link>
              </li>
            </ul>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 0 1rem 0',
              }}
            >
              <br />
              <Link
                href="https://library.e.abb.com/public/7917afec7045495d80b4f42578a7425a/1VAP600001-DB_CPTIK5.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  src={'/png/CPT.png'}
                  alt="CT Metering Class"
                  width={200} // this should match with column width
                  height={200}
                />
              </Link>
              {/* <Link
                href="https://library.e.abb.com/public/62bdb9f598234fae9e80ac94175e19eb/1VAP600002-DB_CPTIK15.pdf"
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "var(--focus)" }}
              >
                5kVA and 10kVA-15kVA CPT
              </Link> */}
              Current Power Transformer
            </div>

            {showMore && (
              <p style={{ opacity: '0.7', margin: '0 0 1rem 0' }}>
                <ul>
                  <li>All secondary outputs 120/240 V</li>
                  <li>Primary inputs 2400 V to 14400 V with multiple taps</li>
                </ul>
              </p>
            )}
            <button className={styles.more} onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'Show more'}
            </button>
            {/* ---------MAIN FORM--------- */}
            <form onSubmit={onCTModalFormSubmit} style={{ margin: '2rem 0 10rem 0' }}>
              {/* --------- Title --------- */}
              <section>
                {(showCpt1 || showCpt2 || showCpt3) && <h3>CPT Options</h3>}
                {!showCpt1 && !showCpt2 && !showCpt3 && (
                  <div>The CPTs do not apply to this configuration</div>
                )}
              </section>

              {/* --------- Upper Position --------- */}
              {showCpt2 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: '1rem 0 0rem 0' }}>
                    5kVA - 15kVA Drawout CPT with Fuses <br />
                    Upper Compartment
                  </h4>
                  <div className={styles.info_text}>
                    CPT is installed on a drawout truck together with the fuses.
                    <br />
                    Example:
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Image
                      src={'/bg1_cpt_location2.svg'}
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: '1rem auto',
                        boxShadow:
                          '0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)',
                        background: 'white',
                      }}
                    />
                    {/* <Image
                      src={
                        api_root + "/images/onelines/bg15/bg1_comp_k.svg"
                      }
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: "1rem auto",
                        boxShadow:
                          "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                        background: "white",
                      }}
                    /> */}
                  </div>

                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: '0.9',
                      margin: '0 0 1rem 0',
                      fontSize: '0.8',
                    }}
                  >
                    {cpt2Description}
                  </div>

                  <div className={styles.info_text}>Current Power Transformer:</div>
                  <select
                    style={{ margin: '0.5rem 0 1rem 0' }}
                    className={styles.form_select}
                    value={cpt2}
                    onChange={(e) => {
                      setCpt2(Number(e.target.value));
                      onCpt2Selection(Number(e.target.value));
                    }}
                  >
                    <option value={''}>{'None'}</option>
                    {cpt_draw.map((pack) => (
                      <option key={pack.pack_id} value={pack.pack_id}>
                        {pack.pack_description.length > 60
                          ? pack.pack_description.slice(0, 60) + '...'
                          : pack.pack_description}
                      </option>
                    ))}
                  </select>

                  <div className={styles.info_text}>Connection:</div>
                  <select
                    style={{ margin: '0.5rem 0 1rem 0' }}
                    className={styles.form_select}
                    value={cpt2Connection}
                    onChange={(e) => {
                      // setCpt2Connection(Number(e.target.value));
                      onCpt2Connection(Number(e.target.value));
                    }}
                  >
                    <option value="">None</option>
                    {unit1.bus?.pack_is_cpt21 && <option value="1">Riser</option>}
                    {unit1.bus?.pack_is_cpt22 && <option value="2">Line</option>}
                    {unit1.bus?.pack_is_cpt23 && <option value="3">Bottom Compartment</option>}
                    {unit1.bus?.pack_is_cpt24 && <option value="4">Left Section</option>}
                    {unit1.bus?.pack_is_cpt25 && <option value="5">Right Section</option>}
                    {unit1.bus?.pack_is_cpt26 && <option value="6">Riser</option>}
                    {unit1.bus?.pack_is_cpt27 && <option value="7">Riser</option>}
                    {unit1.bus?.pack_is_cpt28 && <option value="8">Bottom Compartment</option>}
                  </select>

                  <div className={styles.info_text}>Fuse:</div>
                  <select
                    style={{ margin: '0.5rem 0 2rem 0' }}
                    className={styles.form_select}
                    value={cpt2Fuse}
                    disabled={isCpt2FuseDisabled}
                    onChange={(e) => {
                      setCpt2Fuse(Number(e.target.value));
                    }}
                  >
                    <option value={''}>{'None'}</option>
                    {pack_table
                      .filter((p) => p.category_id === cpt_fuse)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + '...'
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <br />
                </div>
              )}
              <br />

              {/* --------- Lower Position  #1 --------- */}
              {showCpt1 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: '1rem 0 0rem 0' }}>
                    5kVA - 15kVA Drawout CPT with Fuses <br />
                    Lower Compartment
                  </h4>
                  <div className={styles.info_text}>
                    CPT is installed on a drawout truck together with the fuses.
                    <br />
                    Example:
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Image
                      src={'/bg1_cpt_location1.svg'}
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: '1rem auto',
                        boxShadow:
                          '0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)',
                        background: 'white',
                      }}
                    />
                    {/* <Image
                      src={
                        api_root + "/images/onelines/bg15/bg1_comp_m.svg"
                      }
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: "1rem auto",
                        boxShadow:
                          "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                        background: "white",
                      }}
                    /> */}
                  </div>
                  <br />
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: '0.9',
                      margin: '0 0 1rem 0',
                      fontSize: '0.8',
                    }}
                  >
                    {cpt1Description}
                  </div>
                  <div className={styles.info_text}>Current Power Transformer:</div>

                  <select
                    style={{ margin: '0.5rem 0 1rem 0' }}
                    className={styles.form_select}
                    value={cpt1}
                    onChange={(e) => {
                      setCpt1(Number(e.target.value));
                      Cpt1ClearHandler(Number(e.target.value));
                      onCpt1Selection(Number(e.target.value));
                    }}
                  >
                    <option value={''}>{'None'}</option>
                    {cpt_draw.map((pack) => (
                      <option key={pack.pack_id} value={pack.pack_id}>
                        {pack.pack_description.length > 60
                          ? pack.pack_description.slice(0, 60) + '...'
                          : pack.pack_description}
                      </option>
                    ))}
                  </select>
                  <div className={styles.info_text}>Connection:</div>
                  <select
                    style={{ margin: '0.5rem 0 1rem 0' }}
                    className={styles.form_select}
                    value={cpt1Connection}
                    onChange={(e) => {
                      setCpt1Connection(Number(e.target.value));
                    }}
                  >
                    <option value="">None</option>
                    {unit1.bus?.pack_is_cpt11 && <option value="1">Riser</option>}
                    {unit1.bus?.pack_is_cpt12 && <option value="2">Line</option>}
                    {unit1.bus?.pack_is_cpt13 && <option value="3">Upper Compartment</option>}
                    {unit1.bus?.pack_is_cpt14 && <option value="4">Left Section</option>}
                    {unit1.bus?.pack_is_cpt15 && <option value="5">Right Section</option>}
                    {unit1.bus?.pack_is_cpt16 && <option value="6">Riser</option>}
                    {unit1.bus?.pack_is_cpt17 && <option value="7">Riser</option>}
                    {unit1.bus?.pack_is_cpt18 && <option value="8">Upper Compartment</option>}
                  </select>
                  <div className={styles.info_text}>Fuse:</div>
                  <select
                    style={{ margin: '0.5rem 0 2rem 0' }}
                    className={styles.form_select}
                    value={cpt1Fuse}
                    disabled={isCpt1FuseDisabled}
                    onChange={(e) => {
                      setCpt1Fuse(Number(e.target.value));
                    }}
                  >
                    <option value={''}>{'None'}</option>
                    {pack_table
                      .filter((p) => p.category_id === cpt_fuse)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + '...'
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <br />
                </div>
              )}

              <br />

              {/* --------- Lower Position #3 (75kVA) --------- */}
              {showCpt3 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: '1rem 0 0rem 0' }}>
                    25kVA - 75kVA Fix-Mount CPT with Fuse Truck <br />
                    Lower Compartment - only
                  </h4>
                  <div className={styles.info_text}>
                    A CPT is installed as a fix-mount in the rear part of a switchgear and fuses are
                    installed on a drawout truck.
                    <br />
                    Example:
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Image
                      src={'/bg1_cpt_location3.svg'}
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: '1rem auto',
                        boxShadow:
                          '0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)',
                        background: 'white',
                      }}
                    />
                    {/* <Image
                      src={
                        api_root + "/images/onelines/bg15/bg1_comp_p.svg"
                      }
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: "1rem auto",
                        boxShadow:
                          "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                        background: "white",
                      }}
                    /> */}
                  </div>
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: '0.9',
                      margin: '0 0 1rem 0',
                      fontSize: '0.8',
                    }}
                  >
                    {cpt3Description}
                  </div>

                  <div className={styles.info_text}>Current Power Transformer:</div>
                  <select
                    style={{ margin: '0.5rem 0 1rem 0' }}
                    className={styles.form_select}
                    value={cpt3}
                    onChange={(e) => {
                      setCpt3(Number(e.target.value));
                      Cpt3ClearHandler(Number(e.target.value));
                      onCpt3Selection(Number(e.target.value));
                    }}
                  >
                    <option value={''}>{'None'}</option>
                    {cpt_fix_list?.map((pack) => (
                      <option key={pack.pack_id} value={pack.pack_id}>
                        {pack.pack_description.length > 60
                          ? pack.pack_description.slice(0, 60) + '...'
                          : pack.pack_description}
                      </option>
                    ))}
                  </select>
                  <div className={styles.info_text}>Fuse:</div>
                  {/* No slection options  */}
                  <select
                    style={{ margin: '0.5rem 0 2rem 0' }}
                    className={styles.form_select}
                    value={cpt3Fuse}
                    disabled={isCpt3FuseDisabled}
                    onChange={(e) => {
                      setCpt3Fuse(Number(e.target.value));
                    }}
                  >
                    <option value={''}>{'None'}</option>
                    {pack_table
                      .filter((p) => p.category_id === cpt_fuse)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + '...'
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <br />
                </div>
              )}

              {/* --------- SAVE/CANCEL Buttons --------- */}
              <section>
                {(showCpt1 || showCpt2 || showCpt3) && (
                  <span style={{ margin: '0 1rem 0 0' }}>
                    <Button type="button" onClick={onCTModalFormSubmit}>
                      Save
                    </Button>
                  </span>
                )}
                <ButtonCancel type="button" onClick={onCPTModalCancel}>
                  Cancel
                </ButtonCancel>
              </section>
            </form>

            {/* <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "start",
                gap: "2rem",
              }}
            >
              {!!pack_table &&
                pack_table
                  .filter(
                    (pack_table_filtered) =>
                      pack_table_filtered.category_id === category_id
                  )
                  .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
                  .map((pack) => (
                    <li
                      key={pack.pack_id}
                      className={styles.card1}
                      style={{ width: "125px" }}
                    >
                      <Image
                        src={pack.pack_image_url}
                        alt="Busbar Image"
                        width={125}
                        height={330}
                        priority
                        onClick={selectCategoryHandler(
                          category_name,
                          pack.pack_id
                        )}
                      />
                      <div
                        style={{
                          fontSize: "0.9rem",
                          // width: "100%",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                          padding: "1rem",
                        }}
                        onClick={selectCategoryHandler(
                          category_name,
                          pack.pack_id
                        )}
                      >
                        {pack.pack_name}
                      </div>
                      
                      <div
                        style={{
                          fontSize: "0.9rem",
                          margin: "0.5rem 0 0.5rem 0",
                        }}
                      >
                        id:{pack.pack_id}
                      </div>
                    </li>
                  ))}
            </ul> */}
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default CPTModal;
