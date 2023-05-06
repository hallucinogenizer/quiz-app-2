"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// this file requires data_lists.js
var ApplicationsList = function ApplicationsList(props) {
  var _useContext = useContext(MyContext),
      applications_object = _useContext.applications_object,
      modal_object = _useContext.modal_object,
      reload_object = _useContext.reload_object;

  var _reload_object = _slicedToArray(reload_object, 2),
      reload_applications = _reload_object[0],
      setReloadApplications = _reload_object[1];

  var _applications_object = _slicedToArray(applications_object, 2),
      applications = _applications_object[0],
      setApplications = _applications_object[1];

  var _modal_object = _slicedToArray(modal_object, 2),
      show_modal = _modal_object[0],
      setShowModal = _modal_object[1];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      show_filters = _useState2[0],
      setShowFilters = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      courses = _useState4[0],
      setCourses = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      filters = _useState6[0],
      setFilters = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      downloading_as_excel = _useState8[0],
      setDownloadingAsExcel = _useState8[1];

  var _useState9 = useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      filtered_applications = _useState10[0],
      setFilteredApplications = _useState10[1];

  var _useState11 = useState(0),
      _useState12 = _slicedToArray(_useState11, 2),
      num_rows = _useState12[0],
      setNumRows = _useState12[1];

  var application_id_to_array_index_map = props.application_id_to_array_index_map;
  console.log(applications);

  var _useState13 = useState([{
    title: "Age Group",
    name: ["age_group"]
  }, {
    title: "City of Residence",
    name: ["city"]
  }, {
    title: "Education Completed",
    name: ["education_completed"]
  }, {
    title: "Employment type",
    name: ["type_of_employment"]
  }, {
    title: "Course Preference",
    name: ["first_preference", "title"]
  }]),
      _useState14 = _slicedToArray(_useState13, 2),
      questions = _useState14[0],
      setQuestions = _useState14[1];

  useEffect(function () {
    fetch("/admin/application/courses/".concat(props.application_round_id)).then(function (raw_response) {
      if (raw_response.ok) {
        raw_response.json().then(function (response) {
          setCourses(response);
        }).catch(function (err) {
          alert("The server sent an invalid response. Something is wrong.");
          console.log(err);
        });
      } else {
        alert("Something went wrong while getting list of course preference filters. The rest of the page will work fine.");
      }
    }).catch(function (err) {
      console.log(err);
      alert("Could not load courses for filtering. Check your internet connection.");
    });
  }, []);
  useEffect(function () {
    setFilters([{
      title: "Age Group",
      name: "age_group",
      filter_type: "fixed_values",
      discrepancy_between_value_and_text: false,
      possible_values: age_groups.map(function (val) {
        return {
          value: val,
          checked: false
        };
      }),
      expand_possible_values: false
    }, {
      title: "City of Residence",
      name: "city",
      filter_type: "fixed_values",
      possible_values: cities.map(function (val) {
        return {
          value: val,
          checked: false
        };
      }),
      discrepancy_between_value_and_text: false,
      expand_possible_values: false
    }, {
      title: "Education Completed",
      name: "education_completed",
      filter_type: "fixed_values",
      discrepancy_between_value_and_text: false,
      possible_values: education_levels.map(function (val) {
        return {
          value: val,
          checked: false
        };
      }),
      expand_possible_values: false
    }, {
      title: "Employment type",
      name: "type_of_employment",
      filter_type: "fixed_values",
      discrepancy_between_value_and_text: false,
      possible_values: type_of_employment.map(function (val) {
        return {
          value: val,
          checked: false
        };
      })
    }, {
      title: "Course Interest",
      name: "firstPreferenceId",
      filter_type: "fixed_values",
      discrepancy_between_value_and_text: true,
      possible_values: courses.map(function (val) {
        return {
          value: val.id,
          text: val.title,
          checked: false
        };
      }),
      expand_possible_values: false
    }, {
      title: "Applicant automatically rejected and rejection email sent",
      name: "rejection_email_sent",
      filter_type: "fixed_values",
      discrepancy_between_value_and_text: true,
      possible_values: [{
        text: "Yes",
        value: 1,
        checked: false
      }, {
        text: "No",
        value: 0,
        checked: false
      }]
    }]);
  }, [courses]);
  useEffect(function () {
    setFilteredApplications(applications);
  }, [applications]);
  useEffect(function () {
    setFilteredApplications(applications.filter(function (application) {
      var show_this_application = true;

      var _loop = function _loop(i) {
        var filter = filters[i];

        if (filter.filter_type == "integer_value" && application[filter.name] < filter.value) {
          show_this_application = false;
          return "break";
        } else if (filter.filter_type == "fixed_values" && filter.possible_values.length > 0 && filter.possible_values.reduce(function (prev, cur) {
          if (prev) return prev;
          if (cur.checked) return true;else return false;
        }, false) && filter.possible_values.reduce(function (prev, cur) {
          if (prev) return prev;else if (cur.checked && cur.value == application[filter.name]) return true;else return false;
        }, false) == false) {
          show_this_application = false;
          return "break";
        }
      };

      for (var i = 0; i < filters.length; i++) {
        var _ret = _loop(i);

        if (_ret === "break") break;
      }

      return show_this_application;
    }));
  }, [filters]);
  useEffect(function () {
    setNumRows(filtered_applications.length);
  }, [filtered_applications]);

  var formatOutput = function formatOutput(output) {
    if (output === false) return "No";else if (output === true) return "Yes";else return output;
  };

  var getValue = function getValue(obj, properties_array) {
    // if properties_array = ["Student","address"], then this funtion returns obj.Student.address
    return properties_array.reduce(function (final_value, property) {
      return final_value == null ? null : final_value[property];
    }, obj);
  };

  var setAllCheckBoxes = function setAllCheckBoxes(filter_index, checked) {
    setFilters(function (cur) {
      var copy = cur.slice();
      copy[filter_index].possible_values = copy[filter_index].possible_values.map(function (possible_value_obj) {
        possible_value_obj.checked = checked;
        return possible_value_obj;
      });
      return copy;
    });
  };

  var deleteApplication = function deleteApplication(array_index) {
    var application_id = filtered_applications[array_index].id;
    fetch("/admin/application/delete/".concat(application_id)).then(function (res) {
      if (res.ok) {
        setReloadApplications(function (cur) {
          return !cur;
        });
      } else {
        alert("Application delete failed due to unknown reason.");
      }
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "overflow-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-base text-center mb-4"
  }, /*#__PURE__*/React.createElement("b", null, "List of Applications in this Round")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-y-4"
  }, /*#__PURE__*/React.createElement("a", {
    className: "text-iec-blue hover:text-iec-blue-hover underline hover:no-underline cursor-pointer",
    onClick: function onClick(e) {
      setShowFilters(function (cur) {
        return !cur;
      });
    }
  }, show_filters ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "far fa-eye-slash"
  }), " Hide Filters") : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "far fa-eye"
  }), " Show Filters")), show_filters ? filters.map(function (filter, index) {
    return filter.filter_type == "integer_value" ? /*#__PURE__*/React.createElement("div", {
      className: "w-full grid grid-cols-10 align-middle mb-2"
    }, /*#__PURE__*/React.createElement("label", {
      className: "col-span-2"
    }, filter.title, ":"), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: filter.min,
      max: filter.max,
      step: filter.increment,
      value: filter.value,
      "data-index": index,
      className: "col-span-7 align-middle",
      onChange: function onChange(e) {
        setFilters(function (cur) {
          var copy = cur.slice();
          copy[e.target.dataset.index]["value"] = e.target.value;
          return copy;
        });
      }
    }), /*#__PURE__*/React.createElement("label", {
      className: "pl-2 col-span-1"
    }, filter.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), " ", filter.unit)) : filter.filter_type == "fixed_values" && filter.discrepancy_between_value_and_text ? /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-4"
    }, /*#__PURE__*/React.createElement("label", {
      className: "col-span-1"
    }, filter.title), /*#__PURE__*/React.createElement("div", {
      className: "col-span-3"
    }, filter.expand_possible_values ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:underline cursor-pointer",
      "data-filter_index": index,
      onClick: function onClick(e) {
        setAllCheckBoxes(e.target.dataset.filter_index, true);
      }
    }, "Check All"), " ", /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:underline cursor-pointer",
      "data-filter_index": index,
      onClick: function onClick(e) {
        setAllCheckBoxes(e.target.dataset.filter_index, false);
      }
    }, "Uncheck All"), filter.possible_values.map(function (possible_value_obj, i2) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        name: filter.name,
        "data-filter_index": index,
        "data-possible_value_index": i2,
        checked: possible_value_obj.checked,
        value: possible_value_obj.value,
        onChange: function onChange(e) {
          setFilters(function (cur) {
            var copy = cur.slice();
            copy[e.target.dataset.filter_index].possible_values[e.target.dataset.possible_value_index]["checked"] = !copy[e.target.dataset.filter_index].possible_values[e.target.dataset.possible_value_index]["checked"];
            return copy;
          });
        }
      }), /*#__PURE__*/React.createElement("label", null, possible_value_obj.text));
    })) : /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:no-underline cursor-pointer",
      "data-filter_index": index,
      onClick: function onClick(e) {
        setFilters(function (cur) {
          var copy = _toConsumableArray(cur);

          copy[e.target.dataset.filter_index].expand_possible_values = true;
          return copy;
        });
      }
    }, "Click here to show all possible value filters"))) : filter.filter_type == "fixed_values" && !filter.discrepancy_between_value_and_text ? /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-4"
    }, /*#__PURE__*/React.createElement("label", {
      className: "col-span-1"
    }, filter.title), /*#__PURE__*/React.createElement("div", {
      className: "col-span-3"
    }, !filter.expand_possible_values ? /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:no-underline cursor-pointer",
      "data-filter_index": index,
      onClick: function onClick(e) {
        setFilters(function (cur) {
          var copy = _toConsumableArray(cur);

          copy[e.target.dataset.filter_index].expand_possible_values = true;
          return copy;
        });
      }
    }, "Click here to show all possible value filters") : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-x-2"
    }, /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:underline cursor-pointer",
      "data-filter_index": index,
      onClick: function onClick(e) {
        setAllCheckBoxes(e.target.dataset.filter_index, true);
      }
    }, "Check All"), /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:underline cursor-pointer",
      "data-filter_index": index,
      onClick: function onClick(e) {
        setAllCheckBoxes(e.target.dataset.filter_index, false);
      }
    }, "Uncheck All")), filter.possible_values.map(function (possible_value_obj, i2) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        name: filter.name,
        "data-filter_index": index,
        "data-possible_value_index": i2,
        checked: possible_value_obj.checked,
        value: possible_value_obj.value,
        onChange: function onChange(e) {
          setFilters(function (cur) {
            var copy = cur.slice();
            copy[e.target.dataset.filter_index].possible_values[e.target.dataset.possible_value_index]["checked"] = !copy[e.target.dataset.filter_index].possible_values[e.target.dataset.possible_value_index]["checked"];
            return copy;
          });
        }
      }), /*#__PURE__*/React.createElement("label", null, possible_value_obj.value));
    })))) : /*#__PURE__*/React.createElement("div", null);
  }) : /*#__PURE__*/React.createElement("p", null)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null), !downloading_as_excel ? /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    className: "text-white mb-2 float-right px-3 py-2 bg-iec-blue hover:bg-iec-blue-hover cursor-pointer",
    onClick: function onClick() {
      setDownloadingAsExcel(true);
      download_table_as_csv("main-table");
      setDownloadingAsExcel(false);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-download"
  }), " Download as Excel File") : /*#__PURE__*/React.createElement("i", null), applications.length > 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Total Number of Applications: ", applications.length), /*#__PURE__*/React.createElement("p", null, "Filtered Number of Applications: ", num_rows), /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-sm ".concat(downloading_as_excel ? " invisible" : ""),
    id: "main-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Application ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Phone"), /*#__PURE__*/React.createElement("th", null, "CNIC"), questions.map(function (question) {
    return /*#__PURE__*/React.createElement("th", {
      className: downloading_as_excel ? "" : "hidden"
    }, question.title);
  }), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, filtered_applications.map(function (application, index) {
    return /*#__PURE__*/React.createElement("tr", {
      key: application.id,
      className: application.rejection_email_sent ? "bg-red-300" : ""
    }, /*#__PURE__*/React.createElement("td", {
      className: "border px-4 py-2"
    }, application.id), /*#__PURE__*/React.createElement("td", {
      className: "border px-4 py-2"
    }, "".concat(application.Student.firstName, " ").concat(application.Student.lastName)), /*#__PURE__*/React.createElement("td", {
      className: "border px-4 py-2"
    }, application.Student.email), /*#__PURE__*/React.createElement("td", {
      className: "border px-4 py-2"
    }, application.phone), /*#__PURE__*/React.createElement("td", {
      className: "border px-4 py-2"
    }, application.Student.cnic), questions.map(function (question) {
      return /*#__PURE__*/React.createElement("td", {
        className: downloading_as_excel ? "" : "hidden"
      }, formatOutput(getValue(application, question.name)));
    }), /*#__PURE__*/React.createElement("td", {
      className: "border px-4 py-2"
    }, /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:no-underline cursor-pointer",
      "data-index": application_id_to_array_index_map[application.id],
      onClick: function onClick(e) {
        setShowModal(e.target.dataset.index);
      }
    }, "View Details"), " ", " | ", /*#__PURE__*/React.createElement("a", {
      className: "text-iec-blue hover:text-iec-blue-hover underline hover:no-underline cursor-pointer",
      "data-index": application_id_to_array_index_map[application.id],
      onClick: function onClick(e) {
        deleteApplication(e.target.dataset.index);
      }
    }, "Delete Application")));
  })))) : /*#__PURE__*/React.createElement("p", null, "No students to show."));
};