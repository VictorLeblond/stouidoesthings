$(document).ready(function() {
	
	$('#bodydiv').hide().fadeIn(500);
    
	$("a").click(function(event){
		event.preventDefault();
		$link = $(this).attr("href");
        $("#bodydiv").fadeOut(500,function(){
          window.location =  $link; }	);
	});
});
