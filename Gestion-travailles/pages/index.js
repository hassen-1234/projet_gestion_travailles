import { useState,useEffect } from "react";

let elementSelect = "";
const ItemBarNav = ({texte,active,foncClique})=>{
  useEffect(()=>{
  elementSelect = document.querySelector(".select");
},[])
  const [statutsActive,setActive] = useState(active)
  return <button onClick={(e)=>{setActive(true);foncClique(e)}} className={"!p-2 cursor-pointer active:opacity-95 hover:opacity-85 flex-1" + (active ? " select" : "")}>
    {texte}
  </button> 
}

const PartieTout = ()=>{
  return <div className="text-center">
    Vide
  </div>
}

const foncTout = (e)=>{
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
  document.getElementById("affichageTravaille");
}
const foncActive = (e)=>{
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
}
const foncComplete = (e)=>{
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
}
const foncStatistique = (e)=>{
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
}

const ItemTravaille = ({texte,active})=>{
  return <div className="flex gap-2 border-2 rounded-md !p-1 bg-blue-300">
    <textarea rows={1} type="text" className="flex-1 border-2 rounded-tl-lg rounded-br-lg border-cyan-600 !p-0.5 resize-none font-semibold" readOnly>l</textarea>
    <input type="checkbox" className="self-center size-5 opacity-85"/>
    <img src="/img/delete.png" className="self-center size-7 cursor-pointer bg-blue-400 rounded-full !p-1 hover:opacity-80 active:opacity-45"/>
  </div>
}

export default ()=>{
  return <div className="h-[100vh] bg-slate-600 flex flex-col items-center gap-5 overflow-y-auto">
  <div className="flex gap-4 w-full rounded-lg !mt-5">
    <textarea className="border-2 w-full !p-1.5 rounded-lg font-bold"></textarea>
      <button className="!me-3 bg-gradient-to-br from-cyan-300 to-emerald-500 text-cyan-800 font-bold !p-3 rounded-lg cursor-pointer active:opacity-50 hover:opacity-85">Ajout</button>
  </div>
  <div className="flex bg-blue-400 text-cyan-800 font-bold rounded-lg w-full overflow-x-auto">
      <ItemBarNav texte="Tout" foncClique={foncTout} active={true}/>
      <ItemBarNav texte="Active" foncClique={foncActive} active={false}/>
      <ItemBarNav texte="Complète" foncClique={foncComplete} active={false}/>
      <ItemBarNav texte="Statistique" foncClique={foncStatistique} active={false}/>
  </div>
  <div id="affichageTravaille" className="border-2 flex-1 w-xl rounded-2xl !p-4">
    <PartieTout/>
  </div>
  </div>
}