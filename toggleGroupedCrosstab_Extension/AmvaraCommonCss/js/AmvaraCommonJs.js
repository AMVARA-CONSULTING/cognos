/* 
	Declare functions inside amvaraScope to not polute global scope.
	Can be adressed from report using window.top.amvara.t or .tx

*/
var amvara = {

	/* 	
		==========
		function t 
		==========
		Toggle a crosstab column including nested one level crosstab 
		adjusting the colspan of parrent columns.
		
		HOWTO:
		Create Crosstab, e.g.
							Year
							Fact1 | Fact2 | Fact 3 | Fact 4 | Fact 5 | Fact 6
		Country | City |	
		
		Grouping is done via BOX added to the Cells to be grouped.

		We add DIV with classname .cls1 to Fact1+2 Column. As well to the Fact cells.
		We add DIV with classname .cls2 to Fact3+4 Column. As well to the Fact cells.
		We add DIV with classname .cls3 to Fact5+6 Column. As well to the Fact cells.
		
		In our report we can use 
			
				window.top.amvara.t('cls1') 
				
		to toggle fact1+2 column and so on.
		
		There is a second function for more flexibility.
		It uses a CSS Selector as input variable. This way we can
		select with "td[style='background-color: rgb(204, 204, 153)]"
		the coresponding backrgound-color of the column and do not have to 
		use the DIV with classname solution. The selector must exactly 
		match the cell with the ctx value.
		
		==========
		
		Had fun giving a few hours to the questions from Buddhi Gupta and Paul Mendelson.
		Stay healthy.
		
		Ralf
		
		2020-06-19 
		Barcelona
		
		
	*/
	t: function(myClass) {
		var sq = String.fromCharCode(39);
		var iframe = window.top.$("#rsIFrameManager_1").contents();

		ctxArray = iframe.find("div[class=" + sq + myClass+ sq + "]").parent();
		window.top.$.each(ctxArray, function(i, n) {
			var ctx = n.getAttribute("ctx");

			/* Toggle this ctx */
			var elm = iframe.find("td[ctx$=" + sq + ctx + sq + "]");
			elm.toggle();

			/* Check for parent colspans */
			parentCtxs = ctx.split(":");
			var parentCtx = parentCtxs.pop();
			var selector = "td[ctx=" + sq + parentCtx + sq + "]";
			var colspan = iframe.find(selector);

			/* remove or add colspan depending of toggle situation */
			var colspanAdder = ( elm.is(":visible") ) ? 1 : -1;
			var colspanNewvalue = colspan.attr("colspan")*1;
			colspanNewvalue = colspanNewvalue + colspanAdder;
			colspan.attr("colspan", colspanNewvalue  );
		});
	}
	
	tx: function(myCssSelector) {
		var sq = String.fromCharCode(39);
		var iframe = window.top.$("#rsIFrameManager_1").contents();

		ctxArray = iframe.find(myCssSelector);
		window.top.$.each(ctxArray, function(i, n) {
			var ctx = n.getAttribute("ctx");

			/* Toggle this ctx */
			var elm = iframe.find(myCssSelector);
			elm.toggle();

			/* Check for parent colspans */
			parentCtxs = ctx.split(":");
			var parentCtx = parentCtxs.pop();
			var selector = "td[ctx=" + sq + parentCtx + sq + "]";
			var colspan = iframe.find(selector);

			/* remove or add colspan depending of toggle situation */
			var colspanAdder = ( elm.is(":visible") ) ? 1 : -1;
			var colspanNewvalue = colspan.attr("colspan")*1;
			colspanNewvalue = colspanNewvalue + colspanAdder;
			colspan.attr("colspan", colspanNewvalue  );
		});
	}
};