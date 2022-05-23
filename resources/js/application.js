function handleForm(e) {
  $("#submit-spinner").removeClass("hidden-imp");
  e.preventDefault();
  e.stopPropagation();

  const data = new URLSearchParams(new FormData(e.target));

  fetch($("#application-form").attr("action"), {
    method: "POST",
    body: data,
  }).then((raw_response) => {
    $("#submit-spinner").addClass("hidden-imp");
    if (raw_response.ok) {
      $("#step5-next-button")
        .removeClass("btn-primary")
        .addClass("btn-success");
      $("#submit-button-text").html(
        "<i class='fas fa-check'></i> Application Submitted Successfully"
      );
    } else if (raw_response.status == 500) {
      alert("Something went wrong.");
      $("#step5-next-button").removeClass("btn-primary").addClass("btn-danger");
    } else if (raw_response.status == 400) {
      raw_response.json().then((response) => {
        $("#step5-next-button")
          .removeClass("btn-primary")
          .addClass("btn-danger");
        console.log(response);
        $(`#${response.field}`).addClass("is-invalid").focus();
        $(`#${response.field}-error-message`).text(response.message);
      });
    }
  });
}

document
  .getElementById("application-form")
  .addEventListener("submit", handleForm);

const nextStep = (from, to) => {
  $(`#${to}-bar`).removeClass("bg-secondary").addClass("progress-bar-striped");
  $(`#${from}`).addClass("was-validated");
  if (to == "step5") $(`#${to}`).addClass("was-validated");
  $(`#${from}-next-button`).fadeOut(() => {
    $(`#${to}`).fadeIn();
  });
};

const checkIfUserExists = () => {
  $("#step-1-next-button-spinner").removeClass("hidden-imp");
  fetch("/application/check-if-user-exists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      cnic: document.getElementById("cnic").value,
    }),
  })
    .then((raw_response) => {
      $("#step-1-next-button-spinner").addClass("hidden-imp");
      if (raw_response.ok) {
        raw_response.json().then((response) => {
          if (response.exists) {
            if (response.type == "both_cnic_and_email") {
              $("#password-input-group").hide();
              $("#password").attr("required", false);
              $("#password2").attr("required", false);
              $("#email").attr("readonly", true);
              $("#cnic").attr("readonly", true);

              // resetting errors
              $(`#cnic`).removeClass("is-invalid");
              $(`#email`).removeClass("is-invalid");
              nextStep("step1", "step2");
            } else if (response.type == "email_only") {
              $(`#cnic`).addClass("is-invalid").focus();
              $(`#cnic-error-message`).text(
                "The email above already exists in the database. It means you have already applied before. But you entered a different CNIC number last time. Either enter the same CNIC number as last time, or enter a different email address."
              );
            } else if (response.type == "cnic_only") {
              $(`#email`).addClass("is-invalid").focus();
              $(`#email-error-message`).text(
                "The cnic below already exists in the database. It means you have already applied before. But you entered a different email address the last time. Please enter the same email address as before."
              );
            } else {
              // resetting errors
              $(`#cnic`).removeClass("is-invalid");
              $(`#email`).removeClass("is-invalid");
              nextStep("step1", "step2");
            }
          }
        });
      } else
        alert(
          "Something went wrong. Please check your internet connection and try again. Code 01."
        );
    })
    .catch((err) => {
      console.log(err);
      alert(
        "Something went wrong. Please check your internet connection and try again. Code 02."
      );
    });
};

$(document).ready(function () {
  // pagination
  $("#step1-next-button").click(checkIfUserExists);
  $("#step2-next-button").click(() => nextStep("step2", "step3"));
  $("#step3-next-button").click(() => nextStep("step3", "step4"));
  $("#step4-next-button").click(() => nextStep("step4", "step5"));

  // showing additional employment questions if the user selects "yes" on "are you employed"
  if (
    $('input:radio[name="is_employed"]').is(":checked") &&
    $('input:radio[name="is_employed"]').val() == "1"
  ) {
    $("#additional-employment-questions").fadeIn();
    $("#salary").prop("required", true);
    $("#part-time").prop("required", true);
    $("#will-leave-job-yes").prop("required", true);
  }

  $('input:radio[name="is_employed"]').change(function () {
    if ($(this).is(":checked") && $(this).val() == "1") {
      $("#additional-employment-questions").fadeIn();
      $("#salary").prop("required", true);
      $("#part-time").prop("required", true);
      $("#will-leave-job-yes").prop("required", true);
    } else {
      $("#additional-employment-questions").fadeOut();
      $("#salary").prop("required", false);
      $("#part-time").prop("required", false);
      $("#will-leave-job-yes").prop("required", false);
    }
  });

  // form validation
});
