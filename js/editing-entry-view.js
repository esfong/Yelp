(function(window, document, undefined) {
  var EditingEntryView = {};

  /* Renders a view to allow the user to edit an entry. Requires the $entry
   * element and an object representing the active entry. */
  EditingEntryView.render = function($entry, activeEntryData) {
	  Util.renderEntry({
		  editing: true,
		  entries: null,
		  activeEntryData: activeEntryData
	  });

	  var $updateButton = $('button.update');
	  var editedEntry = {};
	  
	  /* Adds a click listener to the udpate button. 
	  * If clicked, submits the new values within the textboxes via EntryModel.update.
	  * If successful, renders the updated entry with Entry View. Otherwise displays the error.
	  */
	  
	  $updateButton.click(function(event) {
		  editedEntry = {
			  address: $('input[name="address"]').val(),
			  name: $('input[name="name"]').val(),
			  description: $('textarea[name="description"]').val(),
			  id: activeEntryData.id
		  }
		  EntryModel.update(editedEntry,function(error) {
			  Util.error($entry,editedEntry,error);
		  });
	  });
  };

  window.EditingEntryView = EditingEntryView;
})(this, this.document);
