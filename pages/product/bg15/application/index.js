import ProductSubLayout from "@/components/layouts/ProductSubLayout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import {useRouter} from "next/router";

export default function Page(props) {
  // Custom Breadcrumbs: type the names the way they are in the sidebar
  const title = ["Build Your Application", "Sections"];
  const router = useRouter();
  
  return (
    <div>
      <Breadcrumbs router={router} />
      <h1>{title[0]}</h1>
    </div>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <>
      <ProductSubLayout>{page}</ProductSubLayout>
    </>
  );
};
