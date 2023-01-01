"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useState = React.useState;
var useEffect = React.useEffect;

var StudentInterviewPanel = function StudentInterviewPanel(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      matchings = _useState2[0],
      setMatchings = _useState2[1];

  useEffect(function () {
    fetch("/student/matching/calendly_invite").then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log("data.length", data.length);

      if (data.length > 0) {
        setMatchings(data);
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-green-300 to-blue-300 min-h-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center content-center align-middle"
  }, /*#__PURE__*/React.createElement("section", {
    className: "p-2 w-full md:w-7/8 mx-auto mr-0 md:mt-16",
    id: "main-section"
  }, /*#__PURE__*/React.createElement("div", {
    id: "assessments-box",
    className: "bg-white w-7/8 rounded-lg m-auto"
  }, /*#__PURE__*/React.createElement("div", {
    id: "assessments-title-box",
    className: "bg-iec-blue text-white font-light px-4 py-3 rounded-t-lg"
  }, "My Interview Invites"), /*#__PURE__*/React.createElement("div", {
    id: "assessments-box-content",
    className: "px-10 py-8 overflow-x-auto"
  }, matchings == null ? /*#__PURE__*/React.createElement("p", null, "Sorry, you have not received an invitation for the interview yet.") : /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left mytable"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-200"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Student Email"), /*#__PURE__*/React.createElement("th", null, "Invited at"), /*#__PURE__*/React.createElement("th", null, "Interviewer Email"), /*#__PURE__*/React.createElement("th", null, "Interviewer Calendly Link"))), /*#__PURE__*/React.createElement("tbody", null, matchings.map(function (matching) {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, matching.student_email), /*#__PURE__*/React.createElement("td", null, new Date(matching.createdAt).toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, matching.interviewer_email), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
      href: matching.calendly_link
    }, matching.calendly_link)));
  }))))))));
};

ReactDOM.render( /*#__PURE__*/React.createElement(StudentInterviewPanel, null), document.getElementById("app"));