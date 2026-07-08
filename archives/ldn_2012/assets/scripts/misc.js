$(function() {
	//#header clickable
	//$("#header").click(function() { document.location.href = '/'; });

	$.fn.alternatingColors = function alternatingColors() {
	    this.each(function() {
		    $(this).find('tr:odd').addClass('odd');
	    });
	    return this;
	}

	$('table#speaker-name-table').alternatingColors();


	// signup form:
	$('input#signup').keydown(function(event) {
		if(event.which == 13) {
		    var input = this;
		    var regexp = new RegExp("^[a-z0-9._%-]+@[a-z0-9.-]+\\.[a-z]{2,4}$", "mi");
		    var email = regexp.exec(input.value);
		    if (email != null) {
    		    $.post('/aarhus-2010/newsletter/addRemove.m', {cmd : 'Sign up', email : $(this).val()}, function(data) {
    			    $(input).replaceWith('<span class="signupconfirmation">' + $(input).val() + ' has been signed up for the newsletter</span>');
    		    });
    		}
		}

	});
	
	$('input#signup').focus(function()
	{
		if ($(this).val() == 'Sign up for newsletter') $(this).val('');
	});

	$('input#signup').blur(function()
	{
		if ($(this).val() == '') $(this).val('Sign up for newsletter');
	});

});

/* MYSCHEDULE */

var MYSCHEDULE = 
{
	initialize: function()
	{
		var elems = this.getSelection();
		for (var i = 0; i < elems.length; i++)
		{
			var i_selected = $("div[id=eventid-" + elems[i] + "]");
			i_selected.addClass("myschedselected");
		}
	},

	addSelection: function(id)
	{
		var elems = this.getSelection();
		elems.push(id);
		this.updateSelection(elems);
	},

	removeSelection: function(id)
	{
		var elems = this.getSelection();
		if (elems != null && elems.length > 0)
		{
			for(var i=0; i<elems.length;i++ )
				if(elems[i]==id)
					elems.splice(i,1); 
			this.updateSelection(elems);
		}
	},

	getSelection: function()
	{
		var cookie = this.readCookie();
		var elems = (cookie != null ? cookie.split('|') : new Array());
		return elems;
	},

	updateSelection: function(elems)
	{
		var string_elems = elems.join('|');
		this.createCookie(string_elems);
	},

	createCookie: function(value)
	{
		var name = this.cookieName();
		var date = new Date();
		date.setTime(date.getTime()+(120*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		document.cookie = name+"="+value+expires+"; path=/";
	},

	readCookie: function()
	{
		var name = this.cookieName();
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	cookieName: function() { return "JAOO_MYSCHEDULE"; }
};

$().ready(function()
{
  MYSCHEDULE.initialize();

  $("table.schedule tr.slots td").mouseenter(function() {
    if (isValidMyScheduleDay())
      $(this).children(":first").addClass("myschedhover");
  });

  $("table.schedule tr.slots td").mouseleave(function() {
    if (isValidMyScheduleDay()) {
      $(this).children(":first").removeClass("myschedhover");
    }
  });

  $("table.schedule tr.slots td").click(function() {
    if (isValidMyScheduleDay()) {
      var elem = $(this).children(":first");
      elem.toggleClass("myschedselected");
      elem.toggleClass("myschedhover");
      var id = elem.attr("id").replace('eventid-','');
      if (elem.hasClass("myschedselected")) 
      {
        MYSCHEDULE.addSelection(id);
      } else {
        MYSCHEDULE.removeSelection(id);
      }
    }
  });
});