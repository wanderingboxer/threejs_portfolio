import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
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
      showAlert({ type: 'success', text: 'Message sent. I\'ll reply soon ✨' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setLoading(false);
      console.error(error);
      showAlert({ type: 'danger', text: 'Send failed. Email me directly?' });
    }
  };

  return (
    <section id="comms" className="section-wrap relative">
      {alert.show && <Alert {...alert} />}
      <div className="aurora" />
      <div className="container-x c-space relative">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="hud-eyebrow text-neon-cyan/80">// LEVEL 05 — JOIN PARTY</div>
            <h2 className="display-text mt-3 text-4xl sm:text-6xl">
              <span className="text-hud-text">LET'S</span>{' '}
              <span className="text-holo">PLAY</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-hud-dim">
            <span className="dot-lime" /> LINK ESTABLISHED
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 items-stretch">
          {/* ===== Form ===== */}
          <div className="col-span-12 lg:col-span-7 relative card-base card-holo card-magenta rounded-3xl p-6 sm:p-9 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-neon-magenta/25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-neon-cyan/20 blur-3xl pointer-events-none" />

            <div className="relative">
              <span className="chip-magenta">DM ME · QUEST INVITE</span>
              <h3 className="font-display text-3xl sm:text-4xl text-hud-text mt-3">
                Got a build in mind?
              </h3>
              <p className="font-sans text-hud-text/75 mt-2 max-w-md">
                Brief, timeline, or just say hi. I read everything and reply fast.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="YOUR NAME"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ex. John Doe"
                  />
                  <Field
                    label="EMAIL"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                  />
                </div>

                <div>
                  <div className="font-display text-[10px] text-holo uppercase tracking-[0.3em] mb-2">
                    MESSAGE
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="Share the brief, the timeline, the dream..."
                    className="field-cyber resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center !py-4 disabled:opacity-50">
                  {loading ? 'SENDING ...' : 'SEND IT'}
                  {!loading && <span>↗</span>}
                </button>
              </form>
            </div>
          </div>

          {/* ===== Side info ===== */}
          <div className="col-span-12 lg:col-span-5 space-y-5 flex flex-col">
            <div className="relative card-base card-holo card-cyan rounded-3xl p-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-neon-cyan/25 blur-3xl pointer-events-none" />
              <div className="relative">
                <span className="chip-cyan">CHANNELS</span>
                <div className="font-display text-xl text-hud-text mt-3 mb-4">
                  Where to find me
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <Row label="EMAIL" value={profile.email} href={`mailto:${profile.email}`} />
                  <Row
                    label="PHONE"
                    value={profile.phone}
                    href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  />
                  <Row label="GITHUB" value="@wanderingboxer" href={profile.socials.github} />
                  <Row label="LINKEDIN" value="aditya-saxena" href={profile.socials.linkedin} />
                  <Row label="LEETCODE" value="AdityaSaxena4052" href={profile.socials.leetcode} />
                </div>
              </div>
            </div>

            <div className="relative card-base card-holo card-lime rounded-3xl p-6 flex-1 overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-neon-lime/25 blur-3xl pointer-events-none" />
              <div className="relative">
                <span className="chip-lime">AVAILABILITY</span>
                <div className="font-display text-xl text-hud-text mt-3">Open to play</div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <Mini label="STATUS" value="ONLINE" accent="lime" />
                  <Mini label="SECTOR" value="BLR · IST" />
                  <Mini label="REPLY" value="< 24 HRS" />
                  <Mini label="OPEN TO" value="FT · INTERN" />
                </div>
                <div className="hud-divider my-5" />
                <p className="text-sm text-hud-text/80">
                  Building something cool? AI, ops automation, full-stack, internal tools — I want
                  in. Drop a line and I'll respond fast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, ...props }) => (
  <label className="block">
    <div className="font-display text-[10px] text-holo uppercase tracking-[0.3em] mb-2">{label}</div>
    <input required className="field-cyber" {...props} />
  </label>
);

const Row = ({ label, value, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between gap-4 px-3.5 py-2.5 rounded-xl border border-hud-line hover:border-neon-magenta/60 hover:bg-neon-magenta/[0.04] transition-all group">
    <span className="text-hud-dim text-[10px] uppercase tracking-[0.25em] group-hover:text-neon-magenta">
      {label}
    </span>
    <span className="text-hud-text group-hover:text-neon-magenta truncate">{value}</span>
  </a>
);

const Mini = ({ label, value, accent }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">{label}</div>
    <div
      className={`mt-1 font-display text-lg ${accent === 'lime' ? 'text-neon-lime flex items-center gap-2' : 'text-hud-text'}`}>
      {accent === 'lime' && <span className="dot-lime" />}
      {value}
    </div>
  </div>
);

export default Contact;
