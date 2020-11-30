import React, { useState } from "react";
import { Field, reduxForm,reset } from "redux-form";
import { connect,useDispatch } from "react-redux";
import normalizePhone from "../../helpers/normalizePhoneNumber";
import normalizeSalary from "../../helpers/normalizeSalary";


const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const renderField = ({
  label,
  type,
  input,
  meta: { touched, error },
  disabled,
}) => (
  <div className="input-row">
    <label>{label}</label>
    <input {...input} type={type} disabled={disabled} />
    {touched && error && (
      <span className="error error-validate"> {label + " " + error}</span>
    )}
  </div>
);

let UserForm = (props) => {
  const [user, setUser] = useState("");
  const [done, setDone] = useState(false);

  const { handleSubmit } = props;

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    console.log(values);
    setUser(values.firstName);
    setDone(true);

    dispatch(reset("user"));
    // alert(values.firstName + " you have successfully registered !");
  };

  if (done) {
    return (
      <div>
        <h1> Account Created successfully For : {user} </h1>
        <button onClick={() => setDone(false)}>create new</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1>Please Register To Continue...</h1>

      <div>
        <Field
          name="firstName"
          label="User Name"
          component={renderField}
          validate={[required]}
          type="text"
        />
      </div>

      <div>
        <Field
          name="password"
          label="Password"
          component={renderField}
          validate={[required]}
          type="password"
        />
      </div>

      <div>
        <Field
          name="email"
          validate={[required, email]}
          label="Email"
          component={renderField}
          type="email"
        />
      </div>

      <div>
        <Field
          name="phone"
          component={renderField}
          type="text"
          label="Phone Number"
          normalize={normalizePhone}
        />
      </div>

      <div>
        <Field
          name="gender"
          validate={[required]}
          label="Gender"
          component={renderField}
          type="text"
        />
      </div>

      <div>
        <Field
          name="address"
          validate={[required]}
          label="Address"
          component={renderField}
          type="text"
          disabled={true}
        />
      </div>

      <div>
        <Field
          name="salary"
          validate={[required]}
          label="Salary"
          component={renderField}
          type="text"
          normalize={normalizeSalary}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = (state, props) => ({
  initialValues: props.initialValues, // retrieve name from redux store
});

UserForm = connect(mapStateToProps)(
  reduxForm({
    form: "user", // a unique identifier for this form
    enableReinitialize: true,
  })(UserForm)
);

// UserForm = reduxForm({
//   // a unique name for the form
//   form: "user",
// })(UserForm);

export default UserForm;
