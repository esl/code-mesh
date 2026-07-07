$(document).ready(function() {		
	SLIDESHOW.init(5000);
});

//manual select of slide
$(document).bind("showSlide", function(event, item) {
      var current = $('ul.slideshow li.show') ?  $('ul.slideshow li.show') : $('#ul.slideshow li:first');
      var next = $("ul.slideshow li[data-item='" + item + "']");
      next.css({opacity: 0.0}).addClass('show').css('z-index','10000').animate({opacity: 1.0}, 1000);
      current.animate({opacity: 0.0}, 1000).css('z-index','9999').removeClass('show');
      $(".slideshow-paging > a").removeClass("active");
      $(".slideshow-paging > a[data-item='" + item + "']").addClass("active");
});

var SLIDESHOW = 
{

	init: function(speed) {
	       var itemCount = 1;

		$('ul.slideshow li').css({opacity: 0.0}).css('z-index','9999');
		$('.slideshow-paging').css('z-index','10001');
		$('ul.slideshow li:first').css({opacity: 1.0}).css('z-index','10000');
		var timer = setInterval('SLIDESHOW.next()',speed);
		
		//paging-builder
      		$("ul.slideshow li").each(function(item) {
			$(this).attr("data-item", itemCount);
			$(".slideshow-paging").append("<a href=\"#\" data-item=\"" + itemCount + "\"" + (itemCount == 1 ? "class=\"active\"" : "") + " onclick=\"$(this).trigger('showSlide', ['" + itemCount + "']); return false;\">" + itemCount + "</a>");
			itemCount++;
       	});

		//pause
		$('ul.slideshow, .slideshow-paging').hover(
			function () {	clearInterval(timer); },
			function () { timer = setInterval('SLIDESHOW.next()',speed); 
		});
	},

	next: function()
	{
		//take first if none specified (with show class)
		var current = ($('ul.slideshow li.show')?  $('ul.slideshow li.show') : $('#ul.slideshow li:first'));

		//get next, or first if at end
		var next = ((current.next().length) ? ((current.next().attr('id') == 'slideshow-caption')? $('ul.slideshow li:first') :current.next()) : $('ul.slideshow li:first'));
	       var itemNumber = $(next).attr("data-item");
		
		//start fade effect for next
		next.css({opacity: 0.0}).addClass('show').css('z-index','10000').animate({opacity: 1.0}, 1000);
	
		//hide current effect
		current.animate({opacity: 0.0}, 1000).css('z-index','9999').removeClass('show');
	       $(".slideshow-paging > a").removeClass("active");

		//step next
	       $(".slideshow-paging > a[data-item='" + itemNumber + "']").addClass("active");
	}
};
