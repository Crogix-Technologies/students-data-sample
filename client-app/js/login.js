$(document).ready(function () {
  $(".register").click(function () {
    $(".newAccount").show();
    $(".dontHaveAccountText").hide();
    $(".forgetPassword").hide();
    $(".signinBtn").text("SignUp");
    $(".lead").text("Sign Up with");
    $(".alreadyHaveAccountText").show();
  });

  $(".signINText").click(function () {
    $(".newAccount").hide();
    $(".dontHaveAccountText").show();
    $(".forgetPassword").show();
    $(".signinBtn").text("SignIn");
    $(".lead").text("Sign in with");
    $(".alreadyHaveAccountText").hide();
  });
});
