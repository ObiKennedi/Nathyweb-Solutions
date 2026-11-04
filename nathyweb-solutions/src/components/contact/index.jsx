import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Loader2, Mail, MessageCircle } from 'lucide-react';
import { CONTACT } from '../../../siteConfig';
import './index.scss';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || CONTACT.web3formsKey || '8f2e62cd-b4c0-4bee-a9ff-d2724638fee4';

const SERVICES = ['Website', 'Web app', 'Mobile app', 'UI/UX design', 'E-commerce', 'Not sure yet'];
const BUDGETS = ['Under ₦500k', '₦500k – ₦2m', '₦2m – ₦5m', '₦5m+', 'Let’s discuss'];

const initial = { name: '', email: '', phone: '', company: '', services: [], budget: '', message: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please tell us your name.';
  if (!v.email.trim()) e.email = 'We need an email to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email doesn’t look right.';
  if (v.message.trim().length < 10) e.message = 'A few words about your project, please.';
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const toggleService = (s) =>
    setValues((v) => ({
      ...v,
      services: v.services.includes(s) ? v.services.filter((x) => x !== s) : [...v.services, s],
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    try {
      setStatus('sending');
      setErrorMessage('');

      const payload = {
        access_key: ACCESS_KEY,
        subject: `New Project Inquiry from ${values.name} — NathWeb Solutions`,
        from_name: 'NathWeb Solutions Contact Form',
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || 'Not provided',
        company: values.company.trim() || 'Not provided',
        services: values.services.length > 0 ? values.services.join(', ') : 'None selected',
        budget: values.budget || 'Not specified',
        message: values.message.trim(),
      };

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('sent');
        setValues(initial);
      } else {
        throw new Error(data.message || `Submission failed with status ${res.status}`);
      }
    } catch (err) {
      console.error('Web3Forms Error:', err);
      setErrorMessage(err?.message || 'Something went wrong sending your message.');
      setStatus('error');
    }
  };

  const fieldProps = (key) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
  });

  const FieldError = ({ k }) =>
    errors[k] ? (
      <p className="contact__error" id={`contact-${k}-error`}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <div className="contact__info">
          <p className="contact__eyebrow">
            <span className="contact__eyebrow-dot" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="contact__title">
            Let&apos;s build <em>something great</em> together.
          </h2>
          <p className="contact__lead">
            Tell us about your project. We&apos;ll come back with ideas, a timeline and a clear quote, with no
            obligation.
          </p>

          <ul className="contact__channels">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="contact__channel">
                <span className="contact__channel-icon">
                  <Mail strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="contact__channel-label">Email us</span>
                  <span className="contact__channel-value">{CONTACT.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="contact__channel"
              >
                <span className="contact__channel-icon">
                  <MessageCircle strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="contact__channel-label">Chat on WhatsApp</span>
                  <span className="contact__channel-value">{CONTACT.whatsappLabel}</span>
                </span>
              </a>
            </li>
          </ul>

          <p className="contact__note">
            <Clock strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.replyTime}
          </p>
        </div>

        <div className="contact__card">
          {status === 'sent' ? (
            <div className="contact__done" role="status">
              <CheckCircle2 strokeWidth={1.75} aria-hidden="true" />
              <h3>Thanks, your message is in.</h3>
              <p>{CONTACT.replyTime} Keep an eye on your inbox.</p>
              <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              {/* Anti-spam honeypot for Web3Forms */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="contact-name">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input type="text" autoComplete="name" placeholder="Your full name" required {...fieldProps('name')} />
                  <FieldError k="name" />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input type="email" autoComplete="email" placeholder="you@company.com" required {...fieldProps('email')} />
                  <FieldError k="email" />
                </div>
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="contact-phone">
                    Phone <small>(optional)</small>
                  </label>
                  <input type="tel" autoComplete="tel" placeholder="+234…" {...fieldProps('phone')} />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-company">
                    Company <small>(optional)</small>
                  </label>
                  <input type="text" autoComplete="organization" placeholder="Business name" {...fieldProps('company')} />
                </div>
              </div>

              <fieldset className="contact__field contact__fieldset">
                <legend>What do you need?</legend>
                <div className="contact__chips">
                  {SERVICES.map((s) => {
                    const on = values.services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`contact__chip${on ? ' contact__chip--on' : ''}`}
                        aria-pressed={on}
                        onClick={() => toggleService(s)}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="contact__field">
                <label htmlFor="contact-budget">
                  Budget <small>(optional)</small>
                </label>
                <select {...fieldProps('budget')}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">
                  Project details <span aria-hidden="true">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="What are you building, who is it for, and when do you need it?"
                  required
                  {...fieldProps('message')}
                />
                <FieldError k="message" />
              </div>

              <button type="submit" className="btn btn--primary btn--lg contact__submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    Sending <Loader2 className="btn__icon contact__spin" strokeWidth={2} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send message <ArrowRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
                  </>
                )}
              </button>

              <div aria-live="polite">
                {status === 'error' && (
                  <p className="contact__alert contact__alert--error">
                    {errorMessage || 'Something went wrong sending your message.'} Please try again, or email us at{' '}
                    <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
