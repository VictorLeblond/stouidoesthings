$(document).ready(function() {
	
	$("bodydiv").css("display", "none");

    $("bodydiv").fadeIn(2000);
    
	$("a.transition").click(function(event){
		event.preventDefault();
		linkLocation = this.href;
		$("bodydiv").fadeOut(1000, redirectPage);		
	});
		
	function redirectPage() {
		window.location = linkLocation;
	}
	
});
