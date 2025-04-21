import { useState } from "react";
import "@/styles/globals.css";
import BoutonMode from "@/components/bouton_mode";

export default function App({ Component, pageProps }) {
  const [modeJour,setModeJour] = useState(true);
  
  return <div className="transition-colors duration-750" data-theme= {modeJour ? "light":"dark"}>
      <Component {...pageProps} />
      <BoutonMode modeJour={modeJour} fonctionClique={()=>{setModeJour(!modeJour)}}/>
    </div>
    ;
}
