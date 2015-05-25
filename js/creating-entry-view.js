(function(window, document, undefined) {
  var CreatingEntryView = {};

  /* Renders a view to allow the user to create an entry. Requires the $entry
   * element. */
  CreatingEntryView.render = function($entry) {
	  Util.renderEntry({
		  creating: true,
		  entries: null,
		  activeEntryDate: null
	  });
	  var $addButton = $('button.add');
	  var newEntry = {};
	  
	  /* Adds a click listener to the add button.
	  * If clicked, takes the value from the open text fields and uses EntryModel.add to submit a new entry. 
	  * Then renders this new entry with the Entry View.
	  */
	  $addButton.click(function(event) {
		  newEntry = {
			  address: $('input[name="address"]').val(),
			  name: $('input[name="name"]').val(),
			  description: $('textarea[name="description"]').val()
		  }
		  EntryModel.add(newEntry,function(error,entry) {
			  Util.error($entry,newEntry,error);
		  });
	  });
  };

  window.CreatingEntryView = CreatingEntryView;
})(this, this.document);
