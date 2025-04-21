import Image from "next/image";

export default ({modeJour,fonctionClique})=>{
    return <Image onClick={fonctionClique} src={modeJour ? "/img/solar-power.png":"/img/nuit.png"} width={50} height={50} className="fixed bottom-5 right-7 cursor-pointer bg-gray-200 rounded-full !p-2"/>;
}