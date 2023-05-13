"use strict";

const EmailForm = props => {
  const users = props.users;
  const default_values = props.default_values;
  const sending_link = props.sending_link;
  const [email_subject, setEmailSubject] = useState(default_values.email_subject);
  const onFinish = props.hasOwnProperty("onFinish") ? props.onFinish : () => {};
  let applications = null;
  if (props.hasOwnProperty("applications")) applications = props.applications;
  const [email_heading, setEmailHeading] = useState(default_values.email_heading);
  const [email_body, setEmailBody] = useState(default_values.email_body);
  const [email_button_pre_text, setEmailButtonPreText] = useState(default_values.email_button_pre_text);
  const [email_button_label, setEmailButtonLabel] = useState(default_values.email_button_label);
  const [email_button_url, setEmailButtonUrl] = useState(default_values.email_button_url);
  const [loading, setLoading] = useState(false);

  const sendEmails = () => {
    setLoading(true);
    fetch(sending_link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        users: applications == null ? users : applications,
        applications: applications != null,
        email_content: {
          subject: email_subject,
          heading: email_heading,
          body: email_body,
          button_pre_text: email_button_pre_text,
          button_label: email_button_label,
          button_url: email_button_url
        }
      })
    }).then(response => {
      if (response.ok) {
        alert("Emails sent successfully.");
      } else {
        alert("There was an error while sending emails. Error code 01.");
      }
    }).catch(err => {
      console.log(err);
      alert("There was a problem while sending the request to the server. Please check your internet connection. Error code 02.");
    }).finally(() => {
      setLoading(false);
      onFinish();
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg mt-4 mb-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-mail-bulk"
  }), " Compose Email"), /*#__PURE__*/React.createElement("form", {
    action: "/mail/preview",
    method: "POST",
    target: "_blank",
    className: "flex flex-col gap-y-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Recipients: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "recepients",
    maxLength: "100",
    name: "recepients",
    className: "border bg-gray-200 w-full py-3 px-4 mt-1 hover:shadow-sm",
    value: applications == null ? users.length > 0 ? "".concat(users[0].email, ", and ").concat(users.length - 1, " others") : "No recipients" : applications.length > 0 ? "".concat(applications[0].Student.email, ", and ").concat(applications.length - 1, " others") : "No recipients"
  }), /*#__PURE__*/React.createElement("label", null, "Subject: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "subject",
    maxLength: "100",
    name: "subject",
    placeholder: "e.g. Invite",
    className: "border w-full py-3 px-4 mt-1 hover:shadow-sm",
    value: email_subject,
    onChange: e => {
      setEmailSubject(e.target.value);
    },
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Heading: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "heading",
    maxLength: "100",
    name: "heading",
    placeholder: "This will be the heading inside the body of the email.",
    className: "border w-full py-3 px-4 mt-1 hover:shadow-sm",
    value: email_heading,
    onChange: e => {
      setEmailHeading(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Body: "), /*#__PURE__*/React.createElement("textarea", {
    maxLength: "5000",
    id: "body",
    name: "body",
    placeholder: "This will be the the body of the email. Limit: 5000 characters.",
    className: "border w-full h-48 py-3 px-4 mt-1 hover:shadow-sm",
    value: email_body,
    onChange: e => {
      setEmailBody(e.target.value);
    },
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Button Pre-text: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    maxLength: "100",
    id: "button_announcer",
    name: "button_announcer",
    placeholder: "This text comes before a button and invites the user to click the button. You can leave it empty if you want.",
    className: "border w-full py-3 px-4 mt-1 hover:shadow-sm",
    value: email_button_pre_text,
    onChange: e => {
      setEmailButtonPreText(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Button Label: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    maxLength: "50",
    id: "button_text",
    name: "button_text",
    placeholder: "What does the button say? Limit: 50 characters",
    className: "border w-full py-3 px-4 mt-1 hover:shadow-sm",
    value: email_button_label,
    onChange: e => {
      setEmailButtonLabel(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Button URL: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "button_url",
    id: "button_url",
    placeholder: "Where does the button take the user?",
    className: "bg-gray-100 border w-full py-3 px-4 mt-1 hover:shadow-sm",
    value: email_button_url,
    readOnly: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-3 px-6 bg-gray-700 text-white mt-4 cursor-pointer hover:bg-gray-600"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-eye"
  }), " Preview Mail"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "w-full py-3 px-6 bg-iec-blue text-white mt-4 cursor-pointer hover:bg-iec-blue-hover",
    id: "email-button",
    onClick: sendEmails
  }, loading ? /*#__PURE__*/React.createElement("i", {
    className: "fas fa-spinner animate-spin self-center"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "far fa-paper-plane"
  }), " ", "Send Email(s)"))));
};