(function(window, document, undefined) {
  var Util = {};

  /* Renders object into #entry
   */

  Util.renderEntry = function(object) {
      var entryTemplate = document.getElementById('entry-template');
      var renderEntryTemplate = Handlebars.compile(entryTemplate.innerHTML);
  	  entry.innerHTML = renderEntryTemplate(object);
  }
  
  /* Calls EntryView.render on a single entry or displays error (and does nothing) if there is an error
   */
  
  Util.error = function($entry,entry,error) {
	  if (error) {
		  var errorDiv = document.querySelector('div.error');
		  errorDiv.innerHTML = error;
	  } else {
		  EntryView.render($entry,entry);
	  }
  }


  window.Util = Util;
})(this, this.document);
