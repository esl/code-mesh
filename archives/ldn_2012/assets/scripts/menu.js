var fallBackMenu;
$(function() {

	var timer;

	//make entire menu-item clickable
	$("#topmenu li").click(function(){
  		window.location=$(this).find("a").attr("href"); return false;
	});

	$("#topmenu li ul li").click(function(){
		fallBackMenu = null;
  		window.location=$(this).find("a").attr("href"); return false;
	});
	
    
    	var lochref = location.href.replace(/\?.*$/, "");
	//for each decendent li in topmenu
	$('#topmenu > li').each(function() {
		var li = $(this);
		if(li.children('a').attr('href') == lochref) {
		    li.addClass('chosen');
		    li.find('ul').addClass('show');
		}
		var childLi = li.find("li")
		$.each(childLi, function(i, child) {
			var childA = $(this).find('a');
			if (childA.attr('href') == lochref) {
				$(this).parents('li:first').addClass('chosen');
				$(this).addClass('hover');
				fallBackMenu = $(this).parents('ul:first');
				fallBackMenu.addClass('show');
			}
		});
	    });

	//mouseenter: decendent li in topmenu
	$('#topmenu > li').mouseenter(function() {
		clearTimeout(timer);
		var elem = $(this);
		timer = setTimeout(function() {  
			$('#topmenu > li').removeClass('hover');
			$('#topmenu li ul').removeClass('show');
			$(elem).find('ul').addClass('show');
			$(elem).addClass('hover');
		}, 400);
	});

	//mouseleave: decendent li in topmenu
	$('#topmenu > li, #topmenu > li:last').mouseleave(function() {
		clearTimeout(timer);
		timer = setTimeout(function() { 
			$('#topmenu > li').removeClass('hover');
			$('#topmenu li ul').removeClass('show');
			if (fallBackMenu)
				fallBackMenu.addClass('show');
		}, 400);
	});

	//mouseleave: last decendent li in topmenu
	$("#topmenu > li:last").mouseleave(function() {
		$('#topmenu > li').removeClass('hover');
		$('#topmenu li ul').removeClass('show');
		if (fallBackMenu) {
		    fallBackMenu.addClass('show');
		}
	});
	
	//mouseenter: submenu decendent li in topmenu
	$('#topmenu li ul li').mouseenter(function() {
		$(this).addClass('hover');
	});

	//mouseleave: submenu decendent li in topmenu
	$('#topmenu li ul li').mouseleave(function() {
		if ($(this).find('a').attr('href') != lochref) {
			$(this).removeClass('hover');
			$(this).removeClass('show');
		}
	});

	//mouseleave: submenu decendent ul in topmenu
	$('#topmenu li ul').mouseleave(function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$(this).removeClass('show');
			fallBackMenu.addClass('show');
		}, 400);
	});


	//$('#topmenu li ul li:last').unbind('mouseenter').unbind('mouseleave');
}); 
