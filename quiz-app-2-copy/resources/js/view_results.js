// Quick and simple export target #table_id into a csv

function download_table_as_csv(table_id, separator = ",") {
  // Select rows from table_id
  var rows = document.querySelectorAll("table#" + table_id + " tr");
  // Construct csv
  var csv = [];

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].style.display != "none") {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");
      for (var j = 0; j < cols.length; j++) {
        // Clean innertext to remove multiple spaces and jumpline (break csv)
        var data = cols[j].innerText
          .replace(/(\r\n|\n|\r)/gm, "")
          .replace(/(\s\s)/gm, " ");
        // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
        data = data.replace(/"/g, '""');
        // Push escaped string
        row.push('"' + data + '"');
      }
      csv.push(row.join(separator));
    }
  }
  if (csv.length == 1) {
    //the 1 row is the header row
    alert("Sorry! No rows to export. Change the filters.");
  } else {
    var csv_string = csv.join("\n");
    // Download it
    var filename =
      "export_" + table_id + "_" + new Date().toLocaleDateString() + ".csv";
    var link = document.createElement("a");
    link.style.display = "none";
    link.setAttribute("target", "_blank");
    link.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
    );
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

let items = document.getElementsByClassName("endtime");

function filterRows(minimum_percentage, filter) {
  const int_value = parseInt(minimum_percentage);

  // show all rows and then hide the ones you need to hide based on the new overall filtering scheme
  $("#results_table tr").show();

  // the following filter decides which rows to hide and hides them
  $("#results_table tr")
    .filter(function () {
      let hide_row = false;

      if (!$(this).hasClass("header_row")) {
        if (filter != "all") {
          if (
            filter == "completed-only" &&
            !$(this).hasClass("completed_all_sections")
          )
            hide_row = true;
          if (
            filter == "not-completed-only" &&
            $(this).hasClass("completed_all_sections")
          )
            hide_row = true;
          if (filter == "all-started" && $(this).hasClass("unsolved"))
            hide_row = true;
          if (filter == "not-started-only" && !$(this).hasClass("unsolved"))
            hide_row = true;
        }
        if (parseInt($(this).find(".total_percentage").text()) < int_value)
          hide_row = true;
      }
      return hide_row;
    })
    .fadeOut();
}

$(document).ready(function () {
  // here I am handling the event listeners on the minimum percentage selector
  $("#minimum_percentage").val(0);

  $("#minimum_percentage").on("change", function () {
    const minimum_percentage = $(this).val();
    const filter = $("#filter-selector").val();

    filterRows(minimum_percentage, filter);
  });

  $("#filter-selector").on("change", function (e) {
    const filter = e.target.value;
    const minimum_percentage = $("#minimum_percentage").val();
    filterRows(minimum_percentage, filter);
  });
});