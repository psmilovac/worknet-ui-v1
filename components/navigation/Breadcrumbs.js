import Link from "next/link";
import styles from "./Breadcrumbs.module.css";


export default function Breadcrumbs({ router, query }) {
  // convert path to array of pages spliting by "/"
  const pages_array = router.pathname // pathname: /product/bg15/application/quote
    .split("/")
    .filter((word) => word.length > 1); // ['product', 'bg15', 'application', 'quote']

  // slice the array not to include anything after detecting [id]
  // eg:  ['product', 'bg15', 'application', 'quote', '[quote_id]']
  let pages = pages_array;
  for (let i = 0; i < pages_array.length; i++) {
    if (pages_array[i].includes("[")) {  
      pages = pages_array.slice(0, i); // ['product', 'bg15', 'application', 'quote']
      break;
    }
  }

  // build an array of objects containing page name and page path
  const path = {};
  const breadcrumbs = [{}];
  for (let i = 0; i < pages.length; i++) {
    if (i === 0) {
      path[i] = "/" + pages[i];
      if (pages[i] == "bg15") {
        pages[i] = "balance gear 15"; // ['product', 'balance gear 15', 'application', 'quote']
      }
      breadcrumbs[i].page = pages[i]; // insert first explicit, otherwise the empty member will show up
      breadcrumbs[i].path = path[i];
    } else {
      path[i] = path[i - 1] + "/" + pages[i];
      if (pages[i] == "bg15") {
        pages[i] = "balance gear 15"; // ['product', 'balance gear 15', 'application', 'quote']
      }
      breadcrumbs.push({ page: pages[i], path: path[i] });
    }

    // 0: {page: 'product',     path: 'product'}
    // 1: {page: 'bg15',        path: 'product/bg15'}
    // 2: {page: 'application', path: 'product/bg15/application'}
    // 3: {page: 'quote',       path: 'product/bg15/application/quote'}
  }

  const great = ">"; // special character

  return (
    <div className={styles.breadcrumb_container}>
      <span className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumb_item}>
          home
        </Link>
      </span>

      {breadcrumbs &&
        breadcrumbs.map(
          (
            breadcrumb // conditional return
          ) => (
            <span className={styles.breadcrumb} key={breadcrumb.path}>
              <span className={styles.breadcrumb_item}>{great}</span>
              <span className={styles.breadcrumb_item}>
                <Link href={breadcrumb.path}>{breadcrumb.page}</Link>
              </span>
            </span>
          )
        )}
    </div>
  );
}
