import React from "react"
import Items from "../components/Items"; 

const verbs = {
  "Present tense": {
    charts: [
      {
        prelude: `
          <p class="red">Basisvorm</p>
          <p class="gray-italic">látni, kérni, törni</p>
          <br>
          <p><b>Infinitief</b> -ni</p>
        `,
        indefinite: {
          "1s": ["-ok -ek -ök"],
          "2s": ["-sz"],
          "3s": ["x"],        
          "1p": ["-unk -ünk"],
          "2p": ["-tok -tek -tök"],
          "3p": ["nak -nek"],
          "1s/2": ["-lak lek"]
        },
        definite: {
          "1s": ["-om -em -öm"],
          "2s": ["-od -ed -öd"],
          "3s": ["ja -i"],   
          "1p": ["-juk -jük"],
          "2p": ["-játok -itek"],
          "3p": ["-ják -ik"]
        },
      },
      {
        prelude: `
          <p class="red">Stam eindigt op sis-klank: <b>-s -sz -z</b></p>
          <p class="gray-italic">olvasni, nézni, főzni</p>
          <br>
          <p><b>Infinitief</b> -sni -szni -zni</p>
        `,
        indefinite: {
          "1s": ["-ok -ek -ök"],
          "2s": ['<span class="green-bold">-ol -el -öl</span>'],
          "3s": ["x"],        
          "1p": ["-unk -ünk"],
          "2p": ["-tok -tek -tök"],
          "3p": ["nak -nek"],
          "1s/2": ["-lak -lek"]
        },
        definite: {
          "1s": ["-om -em -öm"],
          "2s": ["-od -ed -öd"],
          "3s": ['<span class="green-bold">-[X]a</span> -i'],   
          "1p": ['<span class="green-bold">-[X]uk -[X]ük</span>'],
          "2p": ['<span class="green-bold">-[X]átok</span> -itek'],
          "3p": ['<span class="green-bold">-[X]ák</span> -ik']
        },
      },
    ],
    info: `<p>meaning: subject</p>`
  }
};


function Verbs() {
  return (
    <Items 
      source="Verbs"
      items={verbs} 
      
    />
  );
}


export default Verbs;