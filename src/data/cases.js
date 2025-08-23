const casesInfo = {
  Nominative: `
    Dit is dus <b>écht</b> amazing stuf!!
  `,
  Accusative: `
    <ul>
      <li>Goed antwoord</li>
      <li>Slecht antwoord</li>
    </ul>
  `,
  Translative: `
    Je bent goed bezig, zou ik zo zeggen!
  `
};

const pronounCategories = [
  { label: "Pers Pron", key: "person_prn" },
  { label: "Dem Pron", key: "demons_prn" },
  { label: "Int Pron", key: "interr_prn" },
  { label: "Refl Pron", key: "reflex_prn" },
];

const pronounCategoriesFull = [
  { label: "Personal Pronouns", key: "person_prn" },
  { label: "Demonstrative Pronouns", key: "demons_prn" },
  { label: "Intterogative Pronouns", key: "interr_prn" },
  { label: "Reflexive Pronouns", key: "reflex_prn" },
];

export {casesInfo, pronounCategories, pronounCategoriesFull}; 