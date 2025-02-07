import styles from "@/styles/styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dollar } from "@/components/functions/conversions";
import { QuotePrice } from "@/components/functions/price";

export default function QuoteTable(props) {
  const data = props.quote;
  // console.log(data);
  const router = useRouter();
  const url = router.pathname;

  return (
    <div>
      <table style={{ width: "50rem" }}  className={styles.content_table}>
        <thead>
          <tr>
            <th style={{ width: "6em" }}>Quote</th>
            <th style={{ width: "7rem" }}>Created by</th>
            <th >Customer</th>
            <th style={{ width: "7rem" }}>Amount</th>
            <th style={{ width: "6rem" }}>Opened</th>
            <th style={{ width: "6rem" }}>Closed</th>
          </tr>
        </thead>
        <tbody>
          {/* // "data &&" for empty data do not continue forward */}

          {data &&
            data.map((row, index) => (
              <tr key={row.quote_id}>
                <td>
                  <Link
                    href={url + "/" + row.quote_id}
                    className={styles.inside_table_button}
                  >
                    {row.quote_id}
                  </Link>
                </td>
                <td>
                  <Link href="#">{row.quote_user}</Link>
                </td>
                <td>
                  <Link href="#">{row.quote_customer}</Link>
                </td>
                <td>
                  <Link href={url + "/" + row.quote_id}>{Dollar(QuotePrice(row))}</Link>
                </td>
                <td>
                  <Link href="#">
                    {new Date(row.quote_opened_date).toLocaleDateString()}
                  </Link>
                </td>
                <td>
                  <Link href="#">{row.quote_closed}</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
