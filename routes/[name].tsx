import { asset, Head } from "$fresh/runtime.ts";
import PokeApi from "../islands/PokeApi.tsx";

export default function Greet(props: PageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href={asset("./css/style.css")} />
        <title>Pokedex</title>
        <script src="https://kit.fontawesome.com/e69206c75a.js" crossorigin="anonymous"></script>
      </Head>
      <div>
        <PokeApi pokemon={props.params.name}/>
      </div>
    </>
  );
}