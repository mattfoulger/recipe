$(document).ready(function() {
  	console.log("Script included!");

  // add checkboxes to the ingredient list
	$('<input type="checkbox" class="liChk" />').prependTo('ul.ingredient-list li');

  // highlight the parent li when checkbox ticked
	$(document).on('click', 'input:checkbox.liChk', function() {
    	$(this).parent('li').toggleClass("highlight");
	});

  // tick the child checkbox when li is clicked
	$("ul.ingredient-list li").click(function() {
		$(this).toggleClass("highlight");
		var checkBox = $(this).children();
		checkBox.prop("checked", !checkBox.prop("checked"));
	});

  // Button to toggle images in the instructions list
  $("#btn-toggle-images").click(function() {
      $("div.recipe-box img").toggle();
    
      if ($("div.recipe-box img").is(":visible")) {
        $("#btn-toggle-images").html("Hide images");
      } else {
        $("#btn-toggle-images").html("Show images");
      }
    });

/*
  code to help the user track where they are in the instructions, adapted from:
  CSS-Tricks Example - MagicLine Demo
   by Chris Coyier
   http://css-tricks.com

  This snippet appends a special li to the instructions list, #highlighted-step, 
  which has a lower z-index than the rest of the items in the list. 
  This li can "slide" underneath the others and change its position and height 
  to match whichever instruction step li the user clicks on. 


  I changed the code so that the special li would move up and down along a 
  vertical list instead of horizontally along an in-line list. I also changed 
  the event handler to .click instead of .hover, and removed the code that c
  hanged the special li's background color.

  Known issues: 
    1) When window is resized, the height of the #highlighted-step li 
    does not change its height and position to stay aligned with the overlying li.
    This could presumably be fixed with a (window).resize event handler.
    2) The same issue occurrs when toggling images in the instruction list
    (with #btn-toggle-images). Code should be added to that button's javascript
*/

    var $el, topPos, newHeight;
        $instructionSteps = $(".instruction-steps");

    $instructionSteps.append("<li id='highlighted-step'></li>");
    
    var $highlightedStep = $("#highlighted-step");
    
    $highlightedStep
        .height($(".first-step").height())
        .width($(".first-step").width())
        .css("top", $(".first-step").position().top)
        .data("origTop", $(".first-step").position().top)
        .data("origHeight", $(".first-step").height());
                
    $(".instruction-steps li").click(function() {
        $el = $(this);
        topPos = $el.position().top;
        newHeight = $el.height();
        console.log(topPos);
        $highlightedStep.stop().animate({
            top: topPos,
            height: newHeight,
        })  
    });

});