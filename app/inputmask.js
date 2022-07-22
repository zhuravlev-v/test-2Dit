// const = ;

$(document).ready(function(){
  $('#phone').inputmask("99-9999999");  //static mask
  $('#phone').inputmask({"mask": "+7 (999) 999-99-99"}); //specifying options
  // $('#phone').inputmask("9-a{1,3}9{1,3}"); //mask with dynamic syntax
});