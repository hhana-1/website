import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./ContactForm.css";

// Web3Forms access keys are meant to be public: they can only send
// messages to the inbox registered with the key.
const WEB3FORMS_ACCESS_KEY = "204acbaf-7ba3-4432-8798-c931a1d7c889";

// Shared hCaptcha site key Web3Forms provides for free plans (no hCaptcha account needed).
const HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const captchaRef = useRef(null);

  function resetCaptcha() {
    captchaRef.current?.resetCaptcha();
    setCaptchaToken("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!captchaToken) {
      setStatus("idle");
      setShowCaptchaError(true);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New message from your portfolio website");
    formData.append("from_name", "Portfolio contact form");
    // set (not append): the widget may already have added this field to the form
    formData.set("h-captcha-response", captchaToken);

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not send the message. Check your connection and try again.");
    } finally {
      // Captcha tokens work only once, so a new one is needed for the next send
      resetCaptcha();
    }
  }

  return (
    <section className="contact-form-section" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">Get in touch</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" autoComplete="name" required />
        </label>

        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>

        <label>
          Message
          <textarea name="message" rows="6" required />
        </label>

        {/* Spam trap: hidden from people, bots that tick it get rejected by Web3Forms */}
        <input
          type="checkbox"
          name="botcheck"
          className="contact-form-botcheck"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="contact-form-captcha">
          <HCaptcha
            ref={captchaRef}
            sitekey={HCAPTCHA_SITE_KEY}
            reCaptchaCompat={false}
            onVerify={(token) => {
              setCaptchaToken(token);
              setShowCaptchaError(false);
            }}
            onExpire={() => setCaptchaToken("")}
            onError={() => setCaptchaToken("")}
          />
        </div>

        {showCaptchaError && (
          <p className="contact-form-captcha-error" role="alert">
            Please confirm check you are a human being.
          </p>
        )}

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        <p className="contact-form-status" aria-live="polite">
          {status === "success" && "Thank you! Your message has been sent."}
          {status === "error" && errorMessage}
        </p>
      </form>
    </section>
  );
}

export default ContactForm;
