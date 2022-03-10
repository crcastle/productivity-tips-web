import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type {
  MetaFunction,
  LinksFunction
} from "remix";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
  return [{
    rel: "stylesheet",
    href: "https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
  }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav style={{marginLeft: 10}}>
          <h1>
            <Link to="/" style={{color: "var(--h1-color)"}}>
              Productivity Tips
            </Link>
          </h1>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
