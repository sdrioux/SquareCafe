$(document).ready(function(){
    $("#dialog-modal" ).dialog({
      position: { my: "botttom", at: "center", of :window },
      height: 250,
      modal: true,
      width: 400,
      resizable: false,
      buttons: {
        "Sign-Up!": function() {
          // allFields.removeClass( "ui-state-error" );
            var $form = $("#signup");
            // let's select and cache all the fields
            var $input = $form.find("input, button, textarea");
            // serialize the data in the form
            var serializedData = $form.serialize();

            // let's disable the inputs for the duration of the ajax request
            $input.prop("disabled", true);

            // fire off the request
            request2 = $.ajax({
                url: "/signup",
                type: "post",
                data: serializedData
                });

            $( this ).dialog( "close" );

        },
        "No Thanks": function() {
          $( this ).dialog( "close" );
        },
      }
    });


  $('form').
  //When the customer selects a form option: 
    on('change', 'select', function(event){
      totalcost = 0
      //If the selection has not previously been selected
      if ($(this).data('selected')==undefined){
        //the server should create a new, blank selection  
        $('#drinkdiv').append('<div><select name="drink[]">' + $('select').first().html()+'</select></div>');
      }
      $(this).data('selected',true);
      if ($(this).data('image')!=""){
        $('.panel').append('<img src="' + $(this.options[this.selectedIndex]).data('image') + '" width="72px" class="drinkpic"/>');
      }
      //Then it should add up every selection, subtracting one for the new, blank selection, and
      //display it to the page.
      $('#drinks').text($('select').length - 1);
      //It should add up the prices of each selected drink.
      $('select').each(function(){
          price = $(this.options[this.selectedIndex]).data('price');
          //Checks to see if each selection has a numeric data-type.
          if ($.isNumeric(price)){
            totalcost +=$(this.options[this.selectedIndex]).data('price');
            }
          // else if ($)
          // totalcost +=data[this];
        })

      $('#cost').text('$' + (totalcost/100).toFixed(2));
        
    })
    $("#drinkform").submit(function(event){
            // if (request) {
            //   request.abort();
            //   }
      // setup some local variables
      var $form = $(this);
      // let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");
      // serialize the data in the form
      var serializedData = $form.serialize();

      // let's disable the inputs for the duration of the ajax request
      $inputs.prop("disabled", true);

      // fire off the request to /form.php
      request = $.ajax({
          url: "/shop",
          type: "post",
          data: serializedData
      });

      // callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          // log a message to the console
          alert(response);
          // $.ajax({
          // type: "GET",
          // url:"/"
          // })
      });

      // callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          // log the error to the console
          console.error(
              "The following error occured: "+
              textStatus, errorThrown
          );
      });

      // callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // reenable the inputs
          $inputs.prop("disabled", false);
      });

      // prevent default posting of form
      event.preventDefault();
});

})