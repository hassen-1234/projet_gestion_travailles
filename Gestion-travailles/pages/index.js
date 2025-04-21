import { useState,useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";


const ItemBarNav = ({texte,active,activesBareNav,setActivesBareNav,identifiant})=>{
  return <motion.button whileTap={{scaleY:1.5}} onClick={()=>{setActivesBareNav(activesBareNav.map((_,index)=>index === identifiant))}} className={`!p-2 cursor-pointer active:opacity-95 hover:opacity-85 flex-1 ${activesBareNav[identifiant] ? "selectItemBareNav" : ""}`}>
      {texte}
    </motion.button>
}

const PartieTout = ({taches,foncSuppr,setTaches})=>{
  if (taches.length == 0){
    return <span className="flex justify-center items-center h-full text-center text-2xl font-bold">Vide</span>
  }
  return <div id="pariteTout" className="text-center flex flex-col gap-3">
    {Object.entries(taches).map((item,index)=>{
        return <ItemTravaille setTaches={setTaches} taches={taches} key={index} identifiant={index} foncSuppr={()=>{foncSuppr(index);}}/>
    })}
  </div>
}
const PartieActive = ({taches,foncSuppr,setTaches})=>{
  if (taches.filter((valeur,_)=>valeur.complete == false).length == 0){
    return <span className="flex justify-center items-center h-full text-center text-2xl font-bold border-black">Vide</span>
  }
  return <div className="text-center flex flex-col gap-3">
    {Object.entries(taches).map((item,index)=>{
      if (item[1].texte){if (!item[1].complete){
        return <ItemTravaille setTaches={setTaches} taches={taches} key={index} identifiant={index} foncSuppr={()=>{foncSuppr(index);}}/>;
      }}
    })}
  </div>
}
const PartieComplete = ({taches,foncSuppr,setTaches})=>{
  if (taches.filter((valeur,_)=>valeur.complete == true).length == 0){
    return <span className="flex justify-center items-center h-full text-center text-2xl font-bold border-black">Vide</span>
  }
  return <div className="text-center flex flex-col gap-3">
    {Object.entries(taches).map((item,index)=>{
      if (item[1].texte){if (item[1].complete){
        return <ItemTravaille setTaches={setTaches} taches={taches} key={index} identifiant={index} foncSuppr={()=>{foncSuppr(index);}}/>;
      }}
    })}
  </div>
}
const PartieStatistique = ({taches})=>{
  return <motion.table initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className="h-full text-center text-lg">
    <thead>
      <tr className="bg-blue-400">
        <th className="border-2 border-black !p-8">État</th>
        <th className="border-2 border-black w-full">Nombre</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border-2 border-black">Tout</td>
        <td className="border-2 border-black">{taches.length}</td>
      </tr>
      <tr>
        <td className="border-2 border-black">Active</td>
        <td className="border-2 border-black">{taches.filter((valeur,_)=>valeur.complete == false).length}</td>
      </tr>
      <tr>
        <td className="border-2 border-black">Complète</td>
        <td className="border-2 border-black">{taches.filter((valeur,_)=>valeur.complete == true).length}</td>
      </tr>
    </tbody>
  </motion.table>
}


const ItemTravaille = ({taches,foncSuppr,identifiant,setTaches})=>{
  const [conditionItemTravaille,setConditionItemTravaille] = useState(true)
  return <AnimatePresence>
      {conditionItemTravaille && <motion.div key={identifiant} exit={{opacity:[70,40,20,0]}} initial={{scale:0.8}} animate={{scale:1,backgroundColor:taches[identifiant].complete ? "#7bf1a8":""}}  className={"flex gap-2 border-2 rounded-md !p-1 bg-blue-300"}>
      <textarea value={taches[identifiant].texte} rows={1} type="text" className="flex-1 border-2 rounded-tl-lg rounded-br-lg border-cyan-600 !p-2 resize-none font-semibold" readOnly></textarea>
      <input onChange={()=>{
        const nouveauxTaches = [...taches];
        nouveauxTaches[identifiant] = {
          ...nouveauxTaches[identifiant],
          complete:!nouveauxTaches[identifiant].complete
        }
        setTaches(nouveauxTaches);
      }} checked={taches[identifiant].complete} type="checkbox" className="self-center size-5 opacity-85"/>
      <img onClick={()=>{
        setConditionItemTravaille(!conditionItemTravaille);
        setTimeout(()=>{foncSuppr(identifiant);},2000)
        }} src="/img/delete.png" className="self-center size-7 cursor-pointer bg-blue-400 rounded-full !p-1 hover:opacity-80 active:opacity-45"/>
    </motion.div>}
  </AnimatePresence>
}

export default ()=>{
  ///////// Declarations ///////////
 
  const [taches,setTaches] = useState([]);
 
  // Tableau active navbar
  const [activesBareNav,setActivesBareNav] = useState([true,false,false,false]);
 
  //////////////////////////////////

  ///////// Fonctions //////////////
  const foncAjout = ()=>{
    if (document.getElementById("champTravaille").value.trim() === ""){
      return ;
    }
    setTaches([...taches,{texte:document.getElementById("champTravaille").value.trim(),complete:false}]);
    document.getElementById("champTravaille").value = "";
  }
  const foncSuppr = (nombre,conditionItemTravaille,setConditionItemTravaille)=>{
    setTaches(taches.filter((_,index)=>index != nombre));
  }
  //////////////////////////////////

  return <div className="h-[100vh] flex flex-col items-center gap-5 overflow-y-auto">
  <div className="flex gap-4 w-full rounded-lg !mt-5">
    <motion.textarea whileHover={{scale:0.9}} id="champTravaille" className="border-2 w-full !p-1.5 rounded-lg font-bold resize-none border-black"></motion.textarea>
      <button onClick={foncAjout} className="!me-3 bg-gradient-to-br from-cyan-300 to-emerald-500 text-cyan-800 font-bold !p-3 rounded-lg cursor-pointer active:opacity-50 hover:opacity-85">Ajout</button>
  </div>
  <div className="flex bg-blue-400 text-cyan-800 font-bold rounded-lg w-full overflow-x-auto overflow-y-hidden">
      {["Tout","Active","Complète","Statistique"].map((valeur,index)=>{
        return <ItemBarNav key={index} texte={valeur} activesBareNav={activesBareNav} identifiant={index} setActivesBareNav={setActivesBareNav}/>
      })}
  </div>
  <div id="affichageTravaille" className="border-2 flex-1 w-xl rounded-2xl !p-4 !mb-1.5">
    {activesBareNav[0] && <PartieTout foncSuppr={foncSuppr} taches={taches} setTaches={setTaches}/>}
    {activesBareNav[1] && <PartieActive foncSuppr={foncSuppr} taches={taches} setTaches={setTaches}/>}
    {activesBareNav[2] && <PartieComplete foncSuppr={foncSuppr} taches={taches} setTaches={setTaches}/>}
    {activesBareNav[3] && <PartieStatistique taches={taches}/>}
  </div>
  </div>
}