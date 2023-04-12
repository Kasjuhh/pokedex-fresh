import { asset, Head } from "$fresh/runtime.ts";
import PokeApi from "../islands/PokeApi.tsx";
import { useEffect } from "https://esm.sh/preact@10.11.0/hooks";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href={asset("./css/style.css")} />
        <link rel="manifest" href={asset("./pwa/manifest.json")} />
        <title>Pokedex</title>
        <script src="https://kit.fontawesome.com/e69206c75a.js" crossorigin="anonymous"></script>
      </Head>
      <div>
        <PokeApi pokemon={'charmander'}/>
      </div>
    </>
  );
}

// function getDarkOrLightModeStyle() {
//   return window.matchMedia('(prefers-color-scheme: dark)').matches ? asset("./css/style.css") : asset("./css/dark.css");
// }