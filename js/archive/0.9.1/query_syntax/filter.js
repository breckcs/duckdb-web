function GenerateAggregateOrderBy(options = {}) {
	return [
		Keyword("ORDER"),
		Keyword("BY"),
		GenerateOrderTerms()
	]
}

function GenerateAggregate(options = {}) {
	return Diagram([
		AutomaticStack([
			Expression("aggregate-name"),
			Keyword("("),
			Choice(0, [
				Sequence([
					Optional(Keyword("DISTINCT"), "skip"),
					OneOrMore(Sequence([
						Expression()
					]), Keyword(",")),
					Optional(Expandable("order-by", options, "order-by", GenerateAggregateOrderBy))
				]),
				new Skip()
			]),
			Keyword(")"),
			Optional(Sequence(GenerateFilterClause()))
			//Currently Filters are not supported in Window functions
			// ,
            // Optional(Sequence(GeneratePartialWindowFunction()))
		])
	])
}

function GeneratePartialWindowFunction(options = {}) {
	return [
        Keyword("OVER"),
        Choice(1,[
            Sequence(GenerateWindowSpec(options)),
            Expression("window-name")
        ])
    ]
}


function Initialize(options = {}) {
	document.getElementById("rrdiagram").classList.add("limit-width");
	document.getElementById("rrdiagram").innerHTML = GenerateAggregate(options).toString();

}

function Refresh(node_name, set_node) {
	options[node_name] = set_node;
	Initialize(options);
}

options = {}
Initialize()