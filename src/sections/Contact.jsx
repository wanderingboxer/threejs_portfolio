import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import HudFrame from '../components/HudFrame.jsx';
import { profile } from '../constants/index.js';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Aditya',
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setLoading(false);
      showAlert({ type: 'success', text: 'Message sent. Stand by for response.' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setLoading(false);
      console.error(error);
      showAlert({ type: 'danger', text: 'Transmission failed. Try again or email directly.' });
    }
  };

  return (
    <section id="comms" className="section-wrap">
      {alert.show && <Alert {...alert} />}
      <div className="container-x c-space">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="hud-eyebrow text-neon-cyan/80">// SECTOR 05 — COMMS CHANNEL</div>
            <h2 className="display-text mt-3 text-4xl sm:text-6xl">
              <span className="text-hud-text">INITIATE</span>{' '}
              <span className="text-gradient-cyber">CONTACT</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-hud-dim">
            <span className="blink-dot" /> LINK ESTABLISHED
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 items-stretch">
          {/* Form */}
          <HudFrame
            className="col-span-12 lg:col-span-7 frame-cut p-6 sm:p-8 relative overflow-hidden"
            label="OUTGOING.MSG">
            <div className="absolute inset-0 bg-grid-dense opacity-20 pointer-events-none" />

            <div className="relative">
              <div className="font-mono text-[11px] text-hud-dim uppercase tracking-[0.25em] mb-4">
                <span className="text-neon-cyan">{'>'}</span> COMPOSE TRANSMISSION
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="CALLSIGN / NAME"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ex. John Doe"
                  />
                  <Field
                    label="RETURN FREQ / EMAIL"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ex. john@domain.com"
                  />
                </div>

                <div>
                  <div className="font-mono text-[10px] text-neon-cyan/80 uppercase tracking-[0.25em] mb-2">
                    PAYLOAD / MESSAGE
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="Share the brief, the timeline, the dream..."
                    className="field-input-cyber resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="neon-btn w-full justify-center !py-4 disabled:opacity-50">
                  {loading ? '> TRANSMITTING ...' : '> SEND TRANSMISSION'}
                  {!loading && <span>↗</span>}
                </button>
              </form>
            </div>
          </HudFrame>

          {/* Side info */}
          <div className="col-span-12 lg:col-span-5 space-y-5 flex flex-col">
            <HudFrame className="frame-cut p-6" label="DIRECT.LINKS" accent="magenta">
              <div className="space-y-4 font-mono text-sm">
                <Row label="EMAIL" value={profile.email} href={`mailto:${profile.email}`} />
                <Row label="PHONE" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
                <Row label="GITHUB" value="@wanderingboxer" href={profile.socials.github} />
                <Row label="LINKEDIN" value="aditya-saxena" href={profile.socials.linkedin} />
                <Row label="LEETCODE" value="AdityaSaxena4052" href={profile.socials.leetcode} />
              </div>
            </HudFrame>

            <HudFrame className="frame-cut p-6 flex-1" label="AVAILABILITY" accent="lime">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">STATUS</div>
                  <div className="mt-1 font-display text-lg text-neon-lime flex items-center gap-2">
                    <span className="blink-dot" /> ONLINE
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">SECTOR</div>
                  <div className="mt-1 font-display text-lg text-hud-text">BLR · IST</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">RESPONSE</div>
                  <div className="mt-1 font-display text-lg text-hud-text">&lt; 24 HRS</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">OPEN TO</div>
                  <div className="mt-1 font-display text-lg text-hud-text">FT · INTERN</div>
                </div>
              </div>
              <div className="hud-divider my-5" />
              <p className="text-sm text-hud-text/80">
                Building something cool? AI, ops automation, full-stack, internal tools — I want in.
                Drop a line and I'll get back fast.
              </p>
            </HudFrame>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, ...props }) => (
  <label className="block">
    <div className="font-mono text-[10px] text-neon-cyan/80 uppercase tracking-[0.25em] mb-2">
      {label}
    </div>
    <input required className="field-input-cyber" {...props} />
  </label>
);

const Row = ({ label, value, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between gap-4 px-3 py-2 border border-hud-line hover:border-neon-magenta/60 hover:text-neon-magenta transition-colors group">
    <span className="text-hud-dim text-[10px] uppercase tracking-[0.25em] group-hover:text-neon-magenta/80">
      [{label}]
    </span>
    <span className="text-hud-text group-hover:text-neon-magenta truncate">{value}</span>
  </a>
);

export default Contact;
