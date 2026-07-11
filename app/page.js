"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ChatWidget from "./ChatWidget";

/* ────────────────────────────────────────────────────────────
   Reveal : anime un bloc au scroll (remplace la classe .reveal)
──────────────────────────────────────────────────────────── */
function Reveal({ children, delay, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────────
   LangBar : barre de progression de langue animée au scroll
──────────────────────────────────────────────────────────── */
function LangBar({ label, level, width }) {
  const ref = useRef(null);
  const [fillWidth, setFillWidth] = useState("0%");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFillWidth(width);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [width]);

  return (
    <div className="lang-item" ref={ref}>
      <div className="lang-head">
        <span>{label}</span>
        <span style={{ color: "var(--accent)" }}>{level}</span>
      </div>
      <div className="lang-bar">
        <div className="lang-fill" style={{ width: fillWidth }} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SkillPill : pastille de compétence avec apparition en cascade
──────────────────────────────────────────────────────────── */
function SkillPill({ label, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="skill-pill"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity .45s ease ${index * 0.04}s, transform .45s ease ${
          index * 0.04
        }s, border-color .3s, box-shadow .3s, color .3s`,
      }}
    >
      {label}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Données du contenu (facile à modifier)
──────────────────────────────────────────────────────────── */
const SKILLS = {
  "🖥️ Frontend": ["HTML / CSS", "JavaScript", "ReactJS", "NextJS", "Figma (UI/UX)"],
  "⚙️ Backend & API": [
    "NestJS",
    "NodeJS",
    "FastAPI",
    "CodeIgniter",
    "Spring Boot",
    "Laravel",
    "PHP",
    "Java",
    "C#",
  ],
  "📱 Mobile": ["React Native", "Flutter / Dart"],
  "🗄️ Bases de données & Outils": [
    "MySQL",
    "PostgreSQL",
    "JSON-Server",
    "Git / GitHub",
    "Bureautique",
  ],
};

const PROJECTS = [
  {
    icon: "🛒",
    type: "Projet d'étude — M1 · 2025",
    title: "Plateforme e-commerce de vente de chaussures",
    desc: "Conception et développement d'une boutique en ligne complète avec catalogue produits, gestion des commandes et interface utilisateur moderne.",
    tags: ["ReactJS", "NestJS", "NodeJS", "PostgreSQL"],
  },
  {
    icon: "🎵",
    type: "Projet d'étude — L3 · 2024",
    title: "Application mobile lecteur de musique",
    desc: "Développement d'une application mobile de lecture audio avec gestion de bibliothèque musicale, playlists et interface fluide.",
    tags: ["React Native", "Flutter/Dart", "Mobile"],
  },
  {
    icon: "🏥",
    type: "Stage · CHU Tambohobe — 2024",
    title: "Système de gestion des patients (Frontend)",
    desc: "Intégration de l'interface graphique d'un système hospitalier de gestion des patients. Design sur Figma et développement frontend.",
    tags: ["Figma", "NextJS", "JSON-Server", "UI/UX"],
  },
  {
    icon: "🏫",
    type: "Stage · CISCO Ambalavao — 2022",
    title: "Gestion des enseignants non fonctionnaires",
    desc: "Application web complète pour la gestion administrative des enseignants non fonctionnaires, développée en PHP et MySQL.",
    tags: ["PHP", "MySQL", "Full-Stack"],
  },
  {
    icon: "🚗",
    type: "Projet d'étude — L2 · 2022",
    title: "Gestion de parc automobile",
    desc: "Application de gestion de véhicules permettant le suivi du parc auto, l'enregistrement des entrées/sorties et la génération de rapports.",
    tags: ["Java", "MySQL"],
  },
  {
    icon: "💰",
    type: "Projets d'étude — L2 · 2022",
    title: "Gestion frais de scolarité & Gestion des cours",
    desc: "Deux applications : gestion des paiements de scolarité et organisation des cours pour établissements scolaires.",
    tags: ["JavaScript", "C#", "MySQL"],
  },
];

const EXPERIENCE = [
  {
    icon: "⚙️",
    period: "Août 2025 — Décembre 2025",
    title:
      "Intégration d'un service FastAPI pour l'interopérabilité entre TopoManager et E-trait FG",
    org: "Ministère de Décentralisation et de l'Aménagement du Territoire",
    tags: ["FastAPI", "CodeIgniter 3", "PostgreSQL", "Backend"],
  },
  {
    icon: "🏥",
    period: "Juin 2024 — Septembre 2024 · Stage L3",
    title:
      "Intégration de l'interface graphique d'un système de gestion des patients (Frontend)",
    org: "CHU Tambohobe Fianarantsoa",
    tags: ["Figma", "NextJS", "JSON-Server", "UI/UX"],
  },
  {
    icon: "🏫",
    period: "Juin 2022 — Juillet 2022 · Stage L2",
    title:
      "Conception et réalisation d'une application de gestion des enseignants non fonctionnaires",
    org: "CISCO Ambalavao",
    tags: ["PHP", "MySQL", "Full-Stack"],
  },
];

const EDUCATION = [
  { year: "2025 — 2026", degree: "Master 2 en Modélisation et Ingénierie Informatique", school: "EMIT Fianarantsoa" },
  { year: "2024 — 2025", degree: "Master 1 en Modélisation et Ingénierie Informatique", school: "EMIT Fianarantsoa" },
  { year: "2023 — 2024", degree: "Licence 3 — Développement d'Applications Internet et Intranet", school: "EMIT Fianarantsoa" },
  { year: "2022 — 2023", degree: "Licence 2 — Développement d'Applications Internet et Intranet", school: "EMIT Fianarantsoa" },
  { year: "2021 — 2022", degree: "Licence 1 — Développement d'Applications Internet et Intranet", school: "EMIT Fianarantsoa" },
  { year: "2021", degree: "Baccalauréat — Série D", school: "Lycée Joël Sylvain Ambalavao" },
];

const INTERESTS = [
  "📚 Lecture",
  "✈️ Voyage",
  "🏀 Basket-ball",
  "⚽ Football",
  "🎬 Films",
  "🎮 Jeux vidéos",
];

/* ────────────────────────────────────────────────────────────
   Page
──────────────────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // ← état du menu mobile
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  // Formulaire de contact
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [shaking, setShaking] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  // Barre de progression + navbar au scroll
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Ferme le menu automatiquement si on repasse en vue desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Curseur personnalisé (desktop uniquement, ignoré au clavier/tactile)
  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let frame;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
      }
      rx += (mx - rx - 18) * 0.18;
      ry += (my - ry - 18) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const hoverables = document.querySelectorAll(
      "a, button, .skill-pill, .edu-card, .interest-item, .project-card, input, textarea, select"
    );
    const onEnter = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = "50px";
      ringRef.current.style.height = "50px";
      ringRef.current.style.opacity = ".85";
    };
    const onLeave = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = "36px";
      ringRef.current.style.height = "36px";
      ringRef.current.style.opacity = ".5";
    };
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const triggerShake = (field) => {
    setShaking((s) => ({ ...s, [field]: true }));
    setTimeout(() => setShaking((s) => ({ ...s, [field]: false })), 500);
  };

  const sendForm = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.lastName.trim()) newErrors.lastName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = true;
    if (!form.subject) newErrors.subject = true;
    if (!form.message.trim()) newErrors.message = true;

    setErrors(newErrors);
    Object.keys(newErrors).forEach(triggerShake);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setSendError(false);

    const subjectLabels = {
      stage: "Proposition de stage",
      projet: "Collaboration / Projet web",
      mobile: "Projet mobile",
      freelance: "Mission freelance",
      autre: "Autre demande",
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          from_email: form.email,
          subject: subjectLabels[form.subject] || form.subject,
          message: form.message,
          to_email: "fidisonjeanericaime@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSubmitting(false);
        setSent(true);
      })
      .catch((err) => {
        console.error("Erreur EmailJS:", err);
        setSubmitting(false);
        setSendError(true);
      });
  };

  const fieldClass = (field) =>
    `${errors[field] ? "field-error" : ""} ${shaking[field] ? "shake" : ""}`.trim();

  // Ferme le menu mobile quand on clique sur un lien de la navbar
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div id="progress-bar" style={{ width: `${progress}%` }} />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav className={`${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`.trim()}>
        <div className="nav-logo">
          F<span>.</span>Jean Eric
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`.trim()}>
          <li><a href="#about" onClick={closeMenu}>À propos</a></li>
          <li><a href="#skills" onClick={closeMenu}>Compétences</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projets</a></li>
          <li><a href="#experience" onClick={closeMenu}>Expérience</a></li>
          <li><a href="#education" onClick={closeMenu}>Formation</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        {/* Bouton hamburger (3 barres) — visible uniquement en mobile via CSS */}
        <button
          type="button"
          className={`nav-burger ${menuOpen ? "active" : ""}`.trim()}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay qui ferme le menu si on clique en dehors */}
      {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}

      {/* HERO */}
      <section id="hero">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="tag">🎓 Master 2 — EMIT Fianarantsoa</div>
            <h1>
              Fidison
              <br />
              Jean Eric <em>Aimé</em>
            </h1>
            <p className="subtitle">
              Développeur Full-Stack passionné par le web, le mobile et les
              systèmes informatiques. J&apos;aime apprendre, relever de
              nouveaux défis et contribuer activement aux projets qui me sont
              confiés.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">Voir mes projets</a>
              <a href="#contact" className="btn-outline">Me contacter</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-inner">
              <div className="avatar-wrap">
                {photoError ? (
                  <div className="avatar-placeholder">FJ</div>
                ) : (
                  <img
                    src="/images/photo.jpg"
                    alt="Photo de profil"
                    className="avatar"
                    onError={() => setPhotoError(true)}
                  />
                )}
              </div>
              <div className="card-info">
                <h3>Fidison Jean Eric Aimé</h3>
                <p>Développeur Full-Stack</p>
                <div className="card-stats">
                  <div className="stat"><div className="stat-num">7+</div><div className="stat-label">Projets</div></div>
                  <div className="stat"><div className="stat-num">12+</div><div className="stat-label">Technologies</div></div>
                  <div className="stat"><div className="stat-num">5+</div><div className="stat-label">Ans formation</div></div>
                  <div className="stat"><div className="stat-num">2</div><div className="stat-label">Langues</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-label"><span>À propos de moi</span></div>
        <h2 className="section-title">Qui suis-<em>je</em> ?</h2>
        <Reveal className="about-grid">
          <div>
            <div className="profile-box">
              <h4>Profil &amp; Objectif</h4>
              <p>
                Actuellement en Master 2 en Modélisation et Ingénierie
                Informatique à l&apos;EMIT, je suis à la recherche d&apos;un
                stage, d&apos;une alternance ou d&apos;une opportunité
                d&apos;emploi afin de développer mes compétences en
                conception et en programmation. Passionné par le
                développement web, mobile et les systèmes informatiques,
                j&apos;aime apprendre, relever de nouveaux défis et
                contribuer activement aux projets qui me sont confiés.
              </p>
            </div>
            <div className="contact-list">
              <div className="contact-item"><div className="contact-icon">📞</div><span>+261 34 729 32 99</span></div>
              <div className="contact-item"><div className="contact-icon">✉️</div><a href="mailto:fidisonjeanericaime@gmail.com">fidisonjeanericaime@gmail.com</a></div>
              <div className="contact-item"><div className="contact-icon">📘</div><span>Fidison Jean Eric Aimé (Facebook)</span></div>
              <div className="contact-item"><div className="contact-icon">📍</div><span>Andrainjato, Fianarantsoa — Madagascar</span></div>
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", color: "var(--white)", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
              Langues
            </h3>
            <div className="lang-block">
              <LangBar label="Français" level="Courant" width="85%" />
              <LangBar label="Anglais" level="Intermédiaire" width="50%" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label"><span>Compétences techniques</span></div>
        <h2 className="section-title">Mes <em>Technologies</em></h2>
        <Reveal className="skills-categories">
          {Object.entries(SKILLS).map(([category, list]) => (
            <div className="skill-category" key={category}>
              <h3>{category}</h3>
              <div className="skills-row">
                {list.map((label, i) => (
                  <SkillPill key={label} label={label} index={i} />
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label"><span>Projets réalisés</span></div>
        <h2 className="section-title">Mes <em>Projets</em></h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} className="project-card" delay={`${i * 0.1}s`}>
              <div className="project-icon">{p.icon}</div>
              <div className="project-type">{p.type}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="project-tag" key={t}>{t}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label"><span>Expériences professionnelles</span></div>
        <h2 className="section-title">Mon <em>Parcours</em></h2>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.title} className="tl-item" delay={`${i * 0.15}s`}>
              <div className="tl-dot">{e.icon}</div>
              <div className="tl-content">
                <div className="tl-period">{e.period}</div>
                <div className="tl-title">{e.title}</div>
                <div className="tl-org">{e.org}</div>
                <div className="tl-tags">
                  {e.tags.map((t) => (
                    <span className="tl-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-label"><span>Formation académique</span></div>
        <h2 className="section-title">Mes <em>Diplômes</em></h2>
        <div className="edu-grid">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.degree} className="edu-card" delay={`${i * 0.1}s`}>
              <div className="edu-year">{ed.year}</div>
              <div className="edu-degree">{ed.degree}</div>
              <div className="edu-school">{ed.school}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTERESTS */}
      <section id="interests">
        <div className="section-label"><span>Centres d&apos;intérêt</span></div>
        <h2 className="section-title">Ce que <em>j&apos;aime</em></h2>
        <Reveal className="interests-row">
          {INTERESTS.map((it) => (
            <div className="interest-item" key={it}>{it}</div>
          ))}
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-label"><span>Prenons contact</span></div>
        <h2 className="section-title">Travaillons <em>ensemble</em></h2>
        <div className="contact-wrapper">
          <Reveal className="contact-info">
            <h3>Envoyez-moi<br />un message</h3>
            <p>
              Que ce soit pour un projet de développement, un stage ou une
              collaboration, n&apos;hésitez pas à me contacter. Je suis
              ouvert à toute opportunité !
            </p>
            <div className="contact-info-list">
              <div className="ci-item">
                <div className="ci-icon">📞</div>
                <div className="ci-text"><span className="ci-label">Téléphone</span><span className="ci-value">+261 34 729 32 99</span></div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">✉️</div>
                <div className="ci-text"><span className="ci-label">Email</span><span className="ci-value"><a href="mailto:fidisonjeanericaime@gmail.com">fidisonjeanericaime@gmail.com</a></span></div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">📍</div>
                <div className="ci-text"><span className="ci-label">Localisation</span><span className="ci-value">Andrainjato, Fianarantsoa, Madagascar</span></div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">📘</div>
                <div className="ci-text"><span className="ci-label">Facebook</span><span className="ci-value">Fidison Jean Eric Aimé</span></div>
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-form-box" delay=".15s">
            {!sent ? (
              <form onSubmit={sendForm}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Prénom *</label>
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      className={fieldClass("firstName")}
                      value={form.firstName}
                      onChange={handleChange("firstName")}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom *</label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className={fieldClass("lastName")}
                      value={form.lastName}
                      onChange={handleChange("lastName")}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Adresse email *</label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className={fieldClass("email")}
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                </div>
                <div className="form-group">
                  <label>Objet *</label>
                  <select
                    className={fieldClass("subject")}
                    value={form.subject}
                    onChange={handleChange("subject")}
                  >
                    <option value="">— Choisissez un sujet —</option>
                    <option value="stage">Proposition de stage</option>
                    <option value="projet">Collaboration / Projet web</option>
                    <option value="mobile">Projet mobile</option>
                    <option value="freelance">Mission freelance</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    placeholder="Décrivez votre projet ou votre demande..."
                    className={fieldClass("message")}
                    value={form.message}
                    onChange={handleChange("message")}
                  />
                </div>
                <button className="form-submit" type="submit" disabled={submitting}>
                  {submitting ? "⏳  Envoi en cours..." : "✉️  Envoyer le message"}
                </button>
                {sendError && (
                  <p style={{ color: "#e8534c", fontSize: ".85rem", marginTop: ".8rem", textAlign: "center" }}>
                    Une erreur est survenue lors de l&apos;envoi. Réessaie, ou écris-moi directement à{" "}
                    <a href="mailto:fidisonjeanericaime@gmail.com" style={{ color: "var(--accent)" }}>
                      fidisonjeanericaime@gmail.com
                    </a>.
                  </p>
                )}
              </form>
            ) : (
              <div className="form-success visible">
                <div className="check">✅</div>
                <h4>Message envoyé !</h4>
                <p>
                  Merci pour votre message. Je vous répondrai dans les plus
                  brefs délais à l&apos;adresse
                  <br />
                  <a href="mailto:fidisonjeanericaime@gmail.com">fidisonjeanericaime@gmail.com</a>
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <footer>
        <p>© 2026 <span>Fidison Jean Eric Aimé</span> — Portfolio personnel. Conçu avec ❤️ à Fianarantsoa, Madagascar</p>
      </footer>

      <ChatWidget />
    </>
  );
}