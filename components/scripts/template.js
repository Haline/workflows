$(function() {
	var Mustache = require('mustache');

	$.getJSON('js/data.json', function() {
		var template = $('#speakerstpl').html();
		var html = Mustache.to_html(template, date);

		$('#speakers').html(html);
	})
})