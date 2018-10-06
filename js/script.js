// Global variables

// This variable will store the total cost of the chosen activities
let totalCost = 0;
// This one will target a paragraph hardcoded into .activities section to display total cost to the user
const $totalP = $('.total');
// This event handler will hide total paragraph in case total is equal to zero, i.e. no activity is checked
$totalP.bind('DOMSubtreeModified', function() {
  if (totalCost === 0) {
    $(this).hide();
  } else {
    $(this).show();
  }
})


// Sets focus on the first input element
$('#name').attr('autofocus', true);


// Hides #other-title from the view, so that it appears only when JS is disabled
$('#other-title').toggle();


// Whenever a user picks a different T-Shirt design the following logic will happen
$('#design').on('change', function() {
  // we get id of the selected option : 'js puns' or 'heart js'
  let selectedDesign = $(this).val();
  // we also target each color option available
  const $colors = $('#color option');
  // if 'js puns':
  if (selectedDesign === 'js puns') {
    // in case user switched between options before, 'tomato' selected attribute gets removed
    $colors.eq(3).removeAttr('selected');
    // to allow 'cornflowerblue' take this attribute
    $colors.eq(0).attr('selected', 'true');
  // if 'heart js':
  } else if (selectedDesign === 'heart js') {
    // the reversed operation to the one of the 'if' branch
    $colors.eq(0).removeAttr('selected');
    $colors.eq(3).attr('selected', 'true');
    // but here we also transform the selectedDesign value (that we obtained from options value)
    // into a part of the common hearts options text
    // I liked the algorithm below and it was the only way to keep it this consice, and working:)
    selectedDesign = 'js shirt';
  }
  // now we iterate over each color option
  $colors.each(function() {
    // and if its text value includes the name of selected design,
    if ($(this).text().toLowerCase().includes(selectedDesign)) {
      // it remains on display
      $(this).show();
    // if not,
    } else {
      // its display value is programmatically set to 'none'
      $(this).hide();
    }
  });
});


// I was fighting so much with adding and removing attributes before discovered is(':disabled'),
// that I started implementing objects. When I got the thing, I decided to leave parts of it as is.
// This object points at a conflicting meeting by its index in $checkboxes I will declare later
const conflicts = {
  'js-frameworks': 3,
  'js-libs': 4,
  'express': 1,
  'node': 2
}

// We select all the checkboxes inside .activities
const $checkboxes = $('.activities input');
// If change in a checkbox state occurs...
$checkboxes.on('change', function() {
  // Getting handle of the name, we will use it in the object later, and for cost calculations as well
  const name = $(this).attr('name');
  // Standard cost
  let cost = 100;
  // But general conference is more expensive
  if (name === 'all') {
    cost = 200;
  }
  // The name of the variable might be confusing, but it made sense to me
  // As it will hold an index to en-able or dis-able a conflicting event
  let abler = undefined;
  // And if a event is conflicting with another, the 'abler' will get its index value
  if (name in conflicts) {
    abler = conflicts[name];
  }

  // If it did not remain undefined, then we will either disable or enable conflicting event,
  // depending on the state of the event we are aimed at visiting
  if ($(this).is(':checked')) {
    if (abler !== undefined) {
      $checkboxes.eq(abler).attr('disabled', true);
    }
    totalCost += cost;
    $totalP.text(`Total: ${totalCost}`);
  } else {
    if (abler !== undefined) {
      $checkboxes.eq(abler).removeAttr('disabled');
    }
    totalCost -= cost;
    $totalP.text(`Total: ${totalCost}`);
  }
  console.log(totalCost);
});
