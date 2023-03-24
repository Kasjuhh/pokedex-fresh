import { asset, Head } from "$fresh/runtime.ts";
import PokeApi from "../islands/PokeApi.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href={asset("./css/style.css")} />
        <title>Fresh App</title>
      </Head>
      <div>
        <PokeApi pokemon={'charmander'}/>
      </div>
    </>
  );
}