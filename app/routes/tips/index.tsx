import { useLoaderData, Link } from "remix";
import { checkStatus } from "~/utils/errorHandling";

import type { LoaderFunction } from "remix";
import type { Tip } from "~/strapi";
type LoaderData = Array<Tip>;

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${process.env.STRAPI_URL_BASE}/api/tips?populate=*`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json"
    }
  });
  checkStatus(res);
  const data = await res.json();

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.log('Error', data.error)
    throw new Response("Error getting data from Strapi", { status: 500 })
  }

  return data.data;
}

export default function Tips() {
  const tips = useLoaderData<LoaderData>();

  return (
    <ul>
      {tips.map((tip) => (
        <li key={tip.attributes.Slug}>
          <Link to={tip.attributes.Slug}>{tip.attributes.Name}</Link>
        </li>
      ))}
    </ul>
  );
}