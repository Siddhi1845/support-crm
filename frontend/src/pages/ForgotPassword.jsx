function ForgotPassword() {
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo-circle">
          🔑
        </div>

        <h1>Forgot Password</h1>

        <p>
          Enter your email address and
          we'll send reset instructions.
        </p>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
          />
        </div>

        <button className="login-btn">
          Send Reset Link
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;