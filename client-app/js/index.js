$(document).ready(function () {
  var idNum = 0;
  var TidNum = 0;
  var apiBaseUrl = "http://localhost:3000/api";
  var apiBaseUrlT = "http://localhost:3000/api";

  //----------------------------------------Students Section-----------------------

  // Students Data Btn in Category
  $(".studentDataBtn").click(function (event) {
    event.preventDefault();
    $(".teacherSection").hide();
    $(".studentsSection").show();
  });

  // Show input fields
  $(".addNewBtn").click(function (event) {
    event.preventDefault();
    $(".Add-new-Div").show();
    $(this).hide();
  });

  // Close input fields
  $(".closeBtn").click(function (event) {
    event.preventDefault();
    $(".Add-new-Div").hide();
    $(".addNewBtn").show();
  });

  $.ajax({
    url: `${apiBaseUrl}/students`,
    method: "GET",
    success: function (data, status) {
      if (status !== "success") {
        alert("Data Get Method Failed");
        return;
      }

      data.forEach((student) => {
        const row = `
          <tr data-id="${student.rollNumber}">
            <td>${student.rollNumber}</td>
            <td>${student.name}</td>
            <td>${student.fatherName}</td>
            <td>${student.email}</td>
            <td>${student.phoneNumber}</td>
            <td>
              <a href="#" class="btn btn-success editBtn">Edit</a>
              <a href="#" class="btn btn-danger deleteBtn">Delete</a>
            </td>
          </tr>
        `;
        $("#student-table-body").append(row);

        if (student.rollNumber > idNum) {
          idNum = student.rollNumber;
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });

  // Post data (Add Data)
  $(".addBtn").click(function (event) {
    event.preventDefault();
    $(".addNewBtn").show();

    let obj = {
      rollNumber: idNum + 1,
      name: $("#name").val(),
      fatherName: $("#fname").val(),
      email: $("#email").val(),
      phoneNumber: $("#number").val(),
    };

    console.log("Object to be sent:", obj);

    if (
      obj.name === "" ||
      obj.fatherName === "" ||
      obj.email === "" ||
      obj.phoneNumber === ""
    ) {
      alert("Fill the input Fields");
    } else {
      $.ajax({
        type: "POST",
        url: `${apiBaseUrl}/student`,
        data: JSON.stringify(obj),
        contentType: "application/json",
        success: function (response) {
          console.log("Response from server:", response);
          idNum += 1;

          const newRow = `
            <tr data-id="${obj.rollNumber}">
              <td>${obj.rollNumber}</td>
              <td>${obj.name}</td>
              <td>${obj.fatherName}</td>
              <td>${obj.email}</td>
              <td>${obj.phoneNumber}</td>
              <td>
                <a href="#" class="btn btn-success editBtn">Edit</a>
                <a href="#" class="btn btn-danger deleteBtn">Delete</a>
              </td>
            </tr>
          `;
          $("#student-table-body").append(newRow);
          $(".Add-new-Div").hide();
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
          alert("Error: " + xhr.responseText + " Status: " + status);
        },
      });
    }
  });
  // Update data (Edit Data)
  $("#student-table-body").on("click", ".editBtn", function (event) {
    event.preventDefault();
    $(".addNewBtn").hide();
    $(".Edit-Div").toggle();

    var row = $(this).closest("tr");
    var rollNumber = row.data("id");

    // Populate the form with current values
    $("#nameEdit").val(row.find("td:eq(1)").text());
    $("#fnameEdit").val(row.find("td:eq(2)").text());
    $("#emailEdit").val(row.find("td:eq(3)").text());
    $("#numberEdit").val(row.find("td:eq(4)").text());

    $(".saveBtn")
      .off("click")
      .on("click", function (event) {
        event.preventDefault();
        $(".addNewBtn").show();

        if (isNaN(rollNumber)) {
          alert("Invalid roll number.");
          return;
        }

        let updatedData = {
          rollNumber: rollNumber,
          name: $("#nameEdit").val(),
          fatherName: $("#fnameEdit").val(),
          email: $("#emailEdit").val(),
          phoneNumber: $("#numberEdit").val(),
        };

        $.ajax({
          type: "PUT",
          url: `${apiBaseUrl}/student`,
          data: JSON.stringify(updatedData),
          contentType: "application/json",
          success: function (response) {
            $(".Edit-Div").hide();

            // Update the table row with the new data
            row.find("td:eq(1)").text(updatedData.name);
            row.find("td:eq(2)").text(updatedData.fatherName);
            row.find("td:eq(3)").text(updatedData.email);
            row.find("td:eq(4)").text(updatedData.phoneNumber);
          },
          error: function (xhr, status, error) {
            alert(status + " " + error);
          },
        });
      });

    $(".cancelBtn").click(function () {
      $(".Edit-Div").hide();
      $(".addNewBtn").show();
    });
  });

  // Delete data
  $("#student-table-body").on("click", ".deleteBtn", function (event) {
    event.preventDefault();
    var row = $(this).closest("tr");
    var rollNumber = row.data("id");

    $.ajax({
      type: "DELETE",
      url: `${apiBaseUrl}/student/` + rollNumber,
      success: function (response) {
        alert("Data has been deleted");
        row.remove();
      },
      error: function (xhr, status, error) {
        alert(status + " " + error);
      },
    });
  });

  //----------------------------------------Teachers Section-----------------------

  // Teachers Data Btn in Category
  $(".teachersDataBtn").click(function (event) {
    event.preventDefault();
    $(".studentsSection").hide();
    $(".teacherSection").show();
  });

  // Show input fields
  $(".TaddNewBtn").click(function (event) {
    event.preventDefault();
    $(".teachers-Add-new-Div").show();
    $(this).hide();
  });

  // Close input fields
  $(".TcloseBtn").click(function (event) {
    event.preventDefault();
    $(".teachers-Add-new-Div").hide();
    $(".TaddNewBtn").show();
  });

  // Get Method
  $.get(`${apiBaseUrlT}/teachers`, function (data, status) {
    if (status !== "success") {
      alert("Data Get Method Failed");
      return;
    }

    data.forEach((teacher) => {
      const row = `
        <tr data-id="${teacher.id}">
          <td>${teacher.id}</td>
          <td>${teacher.name}</td>
          <td>${teacher.fatherName}</td>
          <td>${teacher.email}</td>
          <td>${teacher.phoneNumber}</td>
          <td>${teacher.subject}</td>


          <td>
            <a href="#" class="btn btn-success TeditBtn">Edit</a>
            <a href="#" class="btn btn-danger TdeleteBtn">Delete</a>
          </td>
        </tr>
      `;
      $("#teachers-table-body").append(row);

      if (teacher.id > TidNum) {
        TidNum = teacher.id;
      }
    });
  });

  // Post data (Add Data)
  $(".TaddBtn").click(function (event) {
    event.preventDefault();
    $(".TaddNewBtn").show();

    let Tobj = {
      id: TidNum + 1,
      name: $("#Tname").val(),
      fatherName: $("#Tfname").val(),
      email: $("#Temail").val(),
      phoneNumber: $("#Tnumber").val(),
      subject: $("#Tsubject").val(),
    };

    if (
      Tobj.name === "" ||
      Tobj.fatherName === "" ||
      Tobj.email === "" ||
      Tobj.phoneNumber === "" ||
      Tobj.subject === ""
    ) {
      alert("Fill the input Fields");
    } else {
      $.ajax({
        type: "POST",
        url: `${apiBaseUrlT}/teacher`,
        data: JSON.stringify(Tobj),
        contentType: "application/json",
        success: function (response) {
          TidNum += 1;

          const newRow = `
            <tr data-id="${Tobj.id}">
              <td>${Tobj.id}</td>
              <td>${Tobj.name}</td>
              <td>${Tobj.fatherName}</td>
              <td>${Tobj.email}</td>
              <td>${Tobj.phoneNumber}</td>
              <td>${Tobj.subject}</td>

              <td>
                <a href="#" class="btn btn-success TeditBtn">Edit</a>
                <a href="#" class="btn btn-danger TdeleteBtn">Delete</a>
              </td>
            </tr>
          `;
          $("#teachers-table-body").append(newRow);
          $(".teachers-Add-new-Div").hide();
        },
        error: function (xhr, status, error) {
          console.error(error);
          alert("Error: " + xhr.responseText + " Status: " + status);
        },
      });
    }
  });

  // Update data (Edit Data)
  $("#teachers-table-body").on("click", ".TeditBtn", function (event) {
    event.preventDefault();
    $(".TaddNewBtn").hide();
    $(".teachers-Edit-Div").toggle();

    var row = $(this).closest("tr");

    var id = row.data("id");
    $("#TnameEdit").val(row.find("td:eq(1)").text());
    $("#TfnameEdit").val(row.find("td:eq(2)").text());
    $("#TemailEdit").val(row.find("td:eq(3)").text());
    $("#TnumberEdit").val(row.find("td:eq(4)").text());
    $("#TsubjectEdit").val(row.find("td:eq(5)").text());

    $(".TsaveBtn")
      .off("click")
      .on("click", function (event) {
        event.preventDefault();
        $(".TaddNewBtn").show();

        let updatedData = {
          id: id,
          name: $("#TnameEdit").val(),
          fatherName: $("#TfnameEdit").val(),
          email: $("#TemailEdit").val(),
          phoneNumber: $("#TnumberEdit").val(),
          subject: $("#TsubjectEdit").val(),
        };

        $.ajax({
          type: "PUT",
          url: `${apiBaseUrlT}/teacher`,
          data: JSON.stringify(updatedData),
          contentType: "application/json",
          success: function (response) {
            $(".teachers-Edit-Div").hide();

            // Update the table row with the new data
            row.find("td:eq(1)").text(updatedData.name);
            row.find("td:eq(2)").text(updatedData.fatherName);
            row.find("td:eq(3)").text(updatedData.email);
            row.find("td:eq(4)").text(updatedData.phoneNumber);
            row.find("td:eq(5)").text(updatedData.subject);
          },
          error: function (xhr, status, error) {
            alert(status + " " + error);
          },
        });
      });

    $(".TcancelBtn").click(function () {
      $(".teachers-Edit-Div").hide();
      $(".TaddNewBtn").show();
    });
  });
  // Delete data
  $("#teachers-table-body").on("click", ".TdeleteBtn", function (event) {
    event.preventDefault();
    var row = $(this).closest("tr");
    var id = row.data("id");

    $.ajax({
      type: "DELETE",
      url: `${apiBaseUrlT}/teacher/` + id,
      success: function (response) {
        alert("Data has been deleted");
        row.remove();
      },
      error: function (xhr, status, error) {
        alert(status + " " + error);
      },
    });
  });

  //--------------------------------------------------Added Search Bar
  //Search Data
  $(".searchBtn").click(function () {
    let searchVal = $(".searchField").val();
    if (!searchVal) {
      alert("Enter Name in Search");
      return;
    }
    if ($(".studentsSection").css("display") == "block") {
      $("#searchTable").show();
      $(".tableClrBtn").show();

      $.ajax({
        url: `${apiBaseUrl}/students`,
        method: "GET",
        success: function (data, status) {
          if (status !== "success") {
            alert("Data Get Method Failed in Search Field");
            return;
          }

          // Filter students by name
          const reqStudentData = data.filter(
            (student) => student.name === searchVal
          );
          if (reqStudentData.length == 0) {
            alert("There is no Student named: " + searchVal);
            return;
          }
          reqStudentData.forEach((reqStudent) => {
            const row = `
                        <tr data-id="${reqStudent.rollNumber}">
                            <td>${reqStudent.rollNumber}</td>
                            <td>${reqStudent.name}</td>
                        </tr>
                    `;
            $("#searchTable").append(row);
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(textStatus, errorThrown);
        },
      });
    } else if ($(".teacherSection").css("display") == "block") {
      $("#searchTable").show();
      $(".tableClrBtn").show();
      $.ajax({
        url: `${apiBaseUrlT}/teachers`,
        method: "GET",
        success: function (data, status) {
          if (status !== "success") {
            alert("Data Get Method Failed in Search Field");
            return;
          }

          // Filter Teacher by name
          const reqTeacherData = data.filter(
            (teacher) => teacher.name === searchVal
          );
          if (reqTeacherData.length == 0) {
            alert("There is no Teacher named: " + searchVal);
            return;
          }
          reqTeacherData.forEach((reqTeacher) => {
            const row = `
                        <tr data-id="${reqTeacher.id}">
                            <td>${reqTeacher.id}</td>
                            <td>${reqTeacher.name}</td>
                        </tr>
                    `;
            $("#searchTable").append(row);
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(textStatus, errorThrown);
        },
      });
    }
  });
  // Clear search results
  $(".tableClrBtn").click(function () {
    $("#searchTable").empty();
    $(".tableClrBtn").hide();
  });
});
