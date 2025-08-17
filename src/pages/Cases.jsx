import cases from "../data/cases.json"

/*	
	key → internal React optimization (does not appear in the DOM)
	id → standard HTML identifier (appears in the DOM, used for JS/CSS)
*/

const pronounCategories = [
  { label: "Suffix", key: "suffix" },
  { label: "Pers Pron", key: "person_prn" },
  { label: "Dem Pron", key: "demons_prn" },
  { label: "Int Pron", key: "interr_prn" },
  { label: "Refl Pron", key: "reflex_prn" },
];

function Cases() {
  return (
    <div>
		<h1>This is the grammar page Yo</h1>
		{Object.entries(cases).map(([caseName, caseData]) => (
			<div key={caseName} id={caseName} className={"case-container"}>
				<div className={"case-header"}>
					<h2>{caseName}</h2>
					<div><strong>Type:</strong> {caseData.type}</div>
					<div><strong>Meaning:</strong> {caseData.meaning}</div>
					<div><strong>Suffix:</strong> {caseData.suffix}</div>
				</div>
				<div className={"case-body"}>
					{pronounCategories.map((category) => (
						<div key={category.key}  className={category.key+" case-data"}>
							<strong>{category.label}</strong>
							{caseData[category.key].map((pronoun, index) => (
								<span key={index}>{pronoun}</span>
							))}
						</div>
					))}
				</div>
			</div>
		))}
	</div>
  );
}

export default Cases;