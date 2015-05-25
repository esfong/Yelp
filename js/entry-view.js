(function(window, document, undefined) {
  var EntryView = {};

  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */

  EntryView.render = function($entry, activeEntryData) {
	  
	  /* If no active entry and no entries exist, renders the Create View. 
	  * If no active entry but entries exist, renders the first entry in entries.
	  * Otherwise, renders the active entry into the Entry View.
	  */
	  
	  EntryModel.loadAll(function(error, entries) {
		  if (!activeEntryData) {
			  if (entries.length < 1) {
				  CreatingEntryView.render($entry);
			  } else {
				  EntryView.render($entry,entries[0]);
			  }
		  } else {
			  Util.renderEntry({
		  		viewing: true,
		  		entries: entries,
		  		activeEntryData: activeEntryData
			  });
		  }
		  /* Adds a click listener to the New Button and renders the Create View if clicked. */
		  var $newButton = $('button.new'); 
		  $newButton.click(function(event) {
			  CreatingEntryView.render($entry);
		  });
		  
		  /* Adds a click listener to the Edit Button and renders the Edit View if clicked. */
		  var $editButton = $('button.edit');
		  $editButton.click(function(event) {
			  EditingEntryView.render($entry, activeEntryData);
		  });
		  
		  /* Adds a click listener to the Delete Button and removes the active entry. */
		  var $deleteButton = $('button.delete');
		  $deleteButton.click(function(event) {
			  EntryModel.remove(activeEntryData.id,function(error) {
				  Util.error($entry,null,error);
			  });
		  });
		  
		  /* Adds a "change" listener to the Select Dropdown and updates the Entry View to the selected entry.
		  * Also updates the map based on the address.
		  */

		  $selectButton = $('select');
		  $selectButton.change(function(event) {
			  var selectedEntry = entries.filter(function(entry) {
			  	return (entry.id == $selectButton.val())
			  });
			  EntryView.render($entry,selectedEntry[0]);
		  });
		  
		  /* If a valid address is part of the active entry, then display the map with the location marker */
		  $map = $('div.map')[0];
		  GoogleMapView.render($map, activeEntryData);
	  });
  };
  window.EntryView = EntryView;
})(this, this.document);
