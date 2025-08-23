import React from "react";
import Items from "../components/Items"; 


const pronounCategories = [
  { label: "Pers Pron", labelFull: "Personal Pronouns", key: "personal" },
  { label: "Dem Pron", labelFull: "Demonstrative Pronouns", key: "demonstrative" },
  { label: "Int Pron", labelFull: "Interrogative Pronouns", key: "interrogative" },
  { label: "Refl Pron", labelFull: "Reflexive Pronouns", key: "reflexive" },
];

const cases = {
  "Nominative": {
    type: "syntactic",
    suffix: "",
    charts: [
      {
        prelude: "Dit is <b>test 1</b>",
        personal: ["én", "te", "ő", "Ön", "mi", "ti", "ők", "Önök"],
        demonstrative: ["ez", "az", "ezek", "azok"],
        interrogative: ["ki", "mi", "melyik", "milyen", "mennyi", "hol", "honnan", "hová", "mikor", "miért", "hogyan"],
        reflexive: ["magam", "magad", "maga", "magunk", "magatok", "maguk"]
      },
      {
        prelude: "Dit is <u>test 2</u>",
        personal: ["én", "te", "ő", "Ön", "mi", "ti", "ők", "Önök"],
        demonstrative: ["ez", "az", "ezek", "azok"],
        interrogative: ["ki", "mi", "melyik", "milyen", "mennyi", "hol", "honnan", "hová", "mikor", "miért", "hogyan"],
        reflexive: ["magam", "magad", "maga", "magunk", "magatok", "maguk"]
      }
    ],
    info: `<p>meaning: subject</p>`
  },
  "Accusative": {
    type: "syntactic",
    suffix: "-t",
    charts: [
      {
        prelude: "",
        personal: ["engem", "téged", "őt", "Önt", "minket", "titeket", "őket", "Önöket"],
        demonstrative: ["ezt", "azt", "ezeket", "azokat"],
        interrogative: ["kit", "mit", "melyiket", "milyent", "mennyi(t)", "hol(t)?", "honnant", "hovát", "mikor(t)?", "miért(t)?", "hogyan(t)?"],
        reflexive: ["magamat", "magadat", "magát", "magunkat", "magatokat", "magukat"]
      }
    ],
    info: `<p>meaning: direct object</p>`
  },
  "Dative": {
    type: "syntactic",
    suffix: "-nak -nek",
    charts: [
      {
        prelude: "",
        personal: ["nekem", "neked", "neki", "Önnek", "nekünk", "nektek", "nekik", "Önöknek"],
        demonstrative: ["ennek", "annak", "ezeknek", "azoknak"],
        interrogative: ["kinek", "minek", "melyiknek", "milyennek", "mennyi(nak)?", "holnak?", "honnannak?", "hovának?", "mikor(nak)?", "miért(nak)?", "hogyan(nak)?"],
        reflexive: ["magamnak", "magadnak", "magának", "magunknak", "magatoknak", "maguknak"]
      }
    ],
    info: `<p>meaning: indirect object</p>`
  },
  "Illative": {
    type: "positional",
    suffix: "-ba -be",
    charts: [
      {
        prelude: "",
        personal: ["belém", "beléd", "belé", "Önbe", "belénk", "belétek", "beléjük", "Önökbe"],
        demonstrative: ["ebbe", "abba", "ezekbe", "azokbe"],
        interrogative: ["kibe", "mibe", "melyikbe", "milyenbe", "mennyi(be)?", "holba?", "honnanba?", "hovába?", "mikorba?", "miértbe?", "hogyanba?"],
        reflexive: ["magamba", "magadba", "magába", "magunkba", "magatokba", "magukba"]
      }
    ],
    info: `<p>meaning: into (hollow space)</p>`
  },
  "Inessive": {
    type: "positional",
    suffix: "-ban -ben",
    charts: [
      {
        prelude: "",
        personal: ["bennem", "benned", "benne", "Önben", "bennünk", "bennetek", "bennük", "Önökben"],
        demonstrative: ["ebben", "abban", "ezekben", "azokban"],
        interrogative: ["kiben", "miben", "melyikben", "milyenben", "mennyi(ben)?", "holban?", "honnanban?", "hovában?", "mikorban?", "miértben?", "hogyanban?"],
        reflexive: ["magamban", "magadban", "magában", "magunkban", "magatokban", "magukban"]
      }
    ],
    info: `<p>meaning: in (hollow space)</p>`
  },
  "Elative": {
    type: "positional",
    suffix: "-ból -ből",
    charts: [
      {
        prelude: "",
        personal: ["belőlem", "belőled", "belőle", "Önből", "belőlünk", "belőletek", "belőlük", "Önökből"],
        demonstrative: ["ebből", "abból", "ezekből", "azokból"],
        interrogative: ["kiből", "miből", "melyikből", "milyenből", "mennyi(ből)?", "holból?", "honnanból?", "hovából?", "mikorból?", "miértből?", "hogyanból?"],
        reflexive: ["magamból", "magadból", "magából", "magunkból", "magatokból", "maguktól"]
      }
    ],
    info: `<p>meaning: out of (hollow space)</p>`
  },
  "Allative": {
    type: "positional",
    suffix: "-hoz -hez -höz",
    charts: [
      {
        prelude: "",
        personal: ["hozzám", "hozzád", "hozzá", "Önhöz", "hozzánk", "hozzátok", "hozzájuk", "Önökhöz"],
        demonstrative: ["ehhez", "ahhoz", "ezekhez", "azokhoz"],
        interrogative: ["kihez", "mihez", "melyikhez", "milyenhez", "mennyihez?", "holhoz?", "honnanhoz?", "hovához?", "mikorhoz?", "miérthez?", "hogyanhoz?"],
        reflexive: ["magamhoz", "magadhez", "magához", "magunkhoz", "magatokhoz", "magukhoz"]
      }
    ],
    info: `<p>meaning: to (solid object)</p>`
  },
  "Adessive": {
    type: "positional",
    suffix: "-nál -nél",
    charts: [
      {
        prelude: "",
        personal: ["nálam", "nálad", "nál", "Önnél", "nálunk", "nálatok", "náluk", "Önöknél"],
        demonstrative: ["ennél", "annál", "ezeknél", "azoknál"],
        interrogative: ["kinél", "minél", "melyiknél", "milyen(nél)?", "mennyi(nél)?", "holnál?", "honnannál?", "hovánál?", "mikor(nél)?", "miért(nél)?", "hogyan(nél)?"],
        reflexive: ["magamnál", "magadnál", "magnál", "magunknál", "magatoknál", "maguknál"]
      }
    ],
    info: `<p>meaning: by, at (solid object)</p>`
  },
  "Ablative": {
    type: "positional",
    suffix: "-tól -től",
    charts: [
      {
        prelude: "",
        personal: ["tőlem", "tőled", "tőle", "Öntől", "tőlünk", "tőletek", "tőlük", "Önöktől"],
        demonstrative: ["ettől", "attól", "ezektől", "azoktól"],
        interrogative: ["kitől", "mitől", "melyiktől", "milyentől", "mennyi(től)?", "holtől?", "honnantól?", "hovától?", "mikor(től)?", "miért(től)?", "hogyan(től)?"],
        reflexive: ["magamtól", "magadtól", "magától", "magunktól", "magatoktól", "maguktól"]
      }
    ],
    info: `<p>meaning: away from (solid object)</p>`
  },
  "Sublative": {
    type: "positional",
    suffix: "-ra -re",
    charts: [
      {
        prelude: "",
        personal: ["rám", "rád", "rá", "Önre", "ránk", "rátok", "rájuk", "Önökre"],
        demonstrative: ["erre", "arra", "ezekre", "azokre"],
        interrogative: ["kire", "mire", "melyikre", "milyenre", "mennyi(re)?", "holra?", "honnanra?", "hovára?", "mikorra?", "miért(re)?", "hogyanra?"],
        reflexive: ["magamra", "magadra", "magára", "magunkra", "magatokra", "magukra"]
      }
    ],
    info: `<p>meaning: onto (surface)</p>`
  },
  "Superessive": {
    type: "positional",
    suffix: "-on -en -ön -n",
    charts: [
      {
        prelude: "",
        personal: ["rajtam", "rajtad", "rajta", "Önön", "rajtunk", "rajtatok", "rajtuk", "Önökön"],
        demonstrative: ["erre", "arra", "ezekre", "azokra"],
        interrogative: ["kire", "mire", "melyikre", "milyenre", "mennyi(re)?", "holra?", "honnanra?", "hovára?", "mikorra?", "miért(re)?", "hogyanra?"],
        reflexive: ["magamra", "magadra", "magára", "magunkra", "magatokra", "magukra"]
      }
    ],
    info: `<p>meaning: on (surface)</p>`
  },
  "Delative": {
    type: "positional, modal",
    suffix: "-ról -ről",
    charts: [
      {
        prelude: "",
        personal: ["rólam", "rólad", "róla", "Önről", "rólunk", "rólatok", "róluk", "Önökről"],
        demonstrative: ["erről", "arról", "ezekről", "azokról"],
        interrogative: ["kiről", "miről", "melyikről", "milyenről", "mennyi(ről)?", "holról?", "honnanról?", "hováról?", "mikor(ről)?", "miért(ről)?", "hogyanról?"],
        reflexive: ["magamről", "magadről", "magáról", "magunkről", "magatokról", "magukról"]
      }
    ],
    info: `<p>meaning: off (surface); about, concerning</p>`
  },
  "Locative": {
    type: "positional",
    suffix: "-ott -ett -ött -t",
  
    info: `<p>meaning: in (only for some Hungarian town/city names)</p>`
  },
  "Instrumental": {
    type: "modal",
    suffix: "-val -vel",
    charts: [
      {
        prelude: "",
        personal: ["velem", "veled", "vele", "Önnel", "velünk", "veletek", "velük", "Önökkel"],
        demonstrative: ["ezzel", "evvel", "azzal", "avval", "ezekkel", "azokkal"],
        interrogative: ["kivel", "mivel", "melyikkel", "milyennel", "mennyi(vel)?", "holval?", "honnanval?", "hovával?", "mikorval?", "miért(vel)?", "hogyanval?"],
        reflexive: ["magammal", "magaddal", "magával", "magunkkal", "magatokkal", "magukkal"]
      }
    ],
    info: `<p>meaning: with</p>`
  },
  "Translative": {
    type: "modal",
    suffix: "-vá -vé",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: [],
        reflexive: []
      }
    ],
    info: `<p>meaning: turn into, result of change</p>`
  },
  "Causal-final": {
    type: "modal",
    suffix: "-ért",
    charts: [
      {
        prelude: "",
        personal: ["értem", "érted", "érte", "Önért", "értünk", "értetek", "értük", "Önökért"],
        demonstrative: ["ezért", "azért", "ezekért", "azokért"],
        interrogative: ["kiért", "miért", "melyikért", "milyenért", "mennyiért?", "holért?", "honnanért?", "hováért?", "mikorért?", "miértért?", "hogyanért?"],
        reflexive: ["magamért", "magadért", "magaért", "magunkért", "magatokért", "magukért"]
      }
    ],
    info: `<p>meaning: for, for the purpose of</p>`
  },
  "Temporal": {
    type: "temporal",
    suffix: "-kor",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: ["mikor", "hánykor"],
        reflexive: []
      }
    ],
    info: `<p>meaning: at (time)</p>`
  },
  "Terminative": {
    type: "temporal, positional",
    suffix: "-ig",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: ["meddig", "mikorig", "hányig"],
        reflexive: []
      }
    ],
    info: `<p>meaning: as far as, up to (for time and place)</p>`
  },
  "Distributive-temporal": {
    type: "temporal",
    suffix: "-nként",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: ["naponként", "óránként", "hétenként", "hónaponta"],
        reflexive: []
      }
    ],
    info: `<p>meaning: every xxx (only for time-related words)</p>`
  },
  "Distributive": {
    type: "modal",
    suffix: "-nként -ként",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: [],
        reflexive: []
      }
    ],
    info: `<p>meaning: per, by</p>`
  },
  "Essive-modal": {
    type: "modal",
    suffix: "-ként",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: [],
        reflexive: []
      }
    ],
    info: `<p>meaning: by way of</p>`
  },
  "Essive-formal": {
    type: "modal",
    suffix: "-ul -ül",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: [],
        reflexive: []
      }
    ],
    info: `<p>meaning: as, in the capacity of</p>`
  },
  "Multiplicative": {
    type: "modal",
    suffix: "-szor -szer -ször",
    charts: [
      {
        prelude: "",
        personal: [],
        demonstrative: [],
        interrogative: ["hányszor"],
        reflexive: []
      }
    ],
    info: `<p>meaning: repetition of an action</p>`
  }
};


function Cases() {
  return (
    <Items 
      source="Cases"
      items={cases} 
      chartCategories={pronounCategories} 
    />
  );
}


export default Cases;


