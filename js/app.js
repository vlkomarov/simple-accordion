(function() {
	'use strict';

	/* Accordion */	
	(function() {

		/* Handlebars Templates */
		/* Assuming data will come as some API JSON response for example */
		var data = {
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

		Handlebars.registerHelper('accordion', function(items, options) {
			var content = '';
		  for (var i = 0, ln = items.length; i < ln; i++) {
		    content = content + options.fn(items[i]);
		  }
		  return content;
		});

		var source   = document.getElementById('accordion-template').innerHTML;
		var template = Handlebars.compile(source);
		var accTpl		= template(data);

		var accordion = document.getElementById('accordion');

		accordion.innerHTML = accTpl;

		/* Accordion initialisation */
		console.log('Init!');	

		var accordionSections = accordion.children;
		var accordionContentDivs = accordion.querySelectorAll('div');

		var headingClosed = 'Click to open <img src="./images/arrow-closed.png" alt="" />';
		var headingOpened = 'Click to close <img src="./images/arrow-opened.png" alt"" />';	

		// Animate.css effects: https://daneden.github.io/animate.css/
		var animationEffect = 'jello';

		accordionContentDivs[0].classList = 'active animated ' + animationEffect;

		for (var i = 0, l = accordionSections.length; i < l; i++) {
			accordionSections[i].children[0].addEventListener('click', function(e) {
				var section	= e.target.parentNode;
				var content = section.children[1];
				var classes = content.className.split(' ');

				removeAllActiveClasses(accordionContentDivs);

				if (classes.indexOf('active') === -1) {
					e.target.innerHTML = headingOpened;
					content.classList = 'active animated ' + animationEffect;
				} else {
					e.target.innerHTML = headingClosed;
				}				
			}, false);
		}

		/* Helpers */
		function removeAllActiveClasses(collection) {
			for (var i = 0, l = collection.length; i < l; i++) {
				collection[i].parentNode.children[0].innerHTML = headingClosed;
				collection[i].classList = '';
			}
		}		
	})();

})();