import { useLoaderData, Link } from "remix";
import { checkStatus } from "~/utils/errorHandling";
import stylesUrl from "~/styles/tip.css";

import type { LoaderFunction, LinksFunction } from "remix";
import type { Tip } from "~/strapi";
type LoaderData = Tip;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`${process.env.STRAPI_URL_BASE}/api/tips`
    + `?populate=*&filters[Slug]=${params.tipId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json"
    }
  })
  checkStatus(res);
  const data = await res.json();

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.log('Error', data.error)
    throw new Response("Error getting data from Strapi", { status: 500 })
  }

  // Did Strapi return an empty list?
  if (!data.data || data.data.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return data.data[0];
};

export default function TipRoute() {
  const tip = useLoaderData<LoaderData>();
  tip.attributes.Screenshots.data = tip.attributes.Screenshots.data ?? [];
  const screenshots = tip.attributes.Screenshots.data.map((s) => {
    return {
      hash: s.attributes.hash,
      thumbnailUrl: s.attributes.formats.thumbnail.url }
  });

  return (
    <div>
      <Link to="/tips" style={{ textDecoration: 'none' }}>← back to list</Link>
      <hgroup>
        <h2>{tip.attributes.Name}</h2>
        <h3>by {tip.attributes.Author.data.attributes.username}</h3>
      </hgroup>

      <p>
       {tip.attributes.Description}
      </p>
      <div className="grid">
        {screenshots.map((screenshot) => (
          <div key={screenshot.hash}>
            <img src={screenshot.thumbnailUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}