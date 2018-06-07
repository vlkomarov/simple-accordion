(function() {
	'use strict';

	/* Accordion */	
	(function() {
		/* Handlebars Templates + Kendo DataSource simple implementation */
		var res = {
			items: [
				{
					title: 'Click to close <img src="./images/arrow-opened.png" alt="" />',
					body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
				}, 
				{
					title: 'Click to open <img src="./images/arrow-closed.png" alt="" />',
					body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
				},
				{
					title: 'Click to open <img src="./images/arrow-closed.png" alt="" />',
					body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
				},
				{
					title: 'Click to open <img src="./images/arrow-closed.png" alt="" />',
					body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
				}
			]
		};

		/* Helpers */
		Handlebars.registerHelper('accordion', function(items, options) {
			var content = '';
		  for (var i = 0, ln = items.length; i < ln; i++) {
		    content = content + options.fn(items[i]);
		  }
		  return content;
		});		

		/* Kendo DataSource + Handlebars */
		var accordion = document.getElementById('accordion');	
		var source   	= document.getElementById('accordion-template').innerHTML;
		var template 	= Handlebars.compile(source);			

		var dataSource = new kendo.data.DataSource({
      data: res.items,
      change: function(e) {
		    var view = this.view();
		    var d = {items: []};

		    for (var i = 0, ln = view.length; i < ln; i++) {
		    	d.items[i] = {
		    		title: view[i].title,
		    		body: view[i].body
		    	};
		    }

		    var accTpl = template(d);
		    accordion.innerHTML = accTpl;
		  }
    });

    var init = function() {
    	/* Accordion initialisation */
			console.log('Init!');	

			var accordionSections = accordion.children;
			var accordionContentDivs = accordion.querySelectorAll('div');

			var headingClosed = 'Click to open <img src="./images/arrow-closed.png" alt="" />';
			var headingOpened = 'Click to close <img src="./images/arrow-opened.png" alt"" />';	

			// Animate.css effects: https://daneden.github.io/animate.css/
			var animationEffect = 'jello';

			accordionContentDivs[0].classList = 'active animated ' + animationEffect;

			for (var i = 0, ln = accordionSections.length; i < ln; i++) {
				accordionSections[i].children[0].addEventListener('click', function(e) {
					var section	= e.target.parentNode;
					var content = section.children[1];
					var classes = content.className.split(' ');
					
					for (var i = 0, l = accordionContentDivs.length; i < l; i++) {
						accordionContentDivs[i].parentNode.children[0].innerHTML = headingClosed;
						accordionContentDivs[i].classList = '';
					}

					if (classes.indexOf('active') === -1) {
						e.target.innerHTML = headingOpened;
						content.classList = 'active animated ' + animationEffect;
					} else {
						e.target.innerHTML = headingClosed;
					}				
				}, false);
			}	
    };

    dataSource.read().then(init());    			
	})();

})();