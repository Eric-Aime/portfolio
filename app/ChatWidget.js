"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────
   Base de connaissances : mots-clés → réponse.
   Pour ajouter/modifier une réponse, édite ce tableau.
──────────────────────────────────────────────────────────── */
const FAQ = [
  {
    keywords: ["bonjour", "salut", "hello", "coucou", "bonsoir"],
    answer:
      "Bonjour 👋 Je suis l'assistant du portfolio de Fidison. Tu peux me poser des questions sur ses compétences, ses projets, ses expériences ou comment le contacter !",
  },
  {
    keywords: ["compétence", "competence", "technologie", "stack", "maîtrise", "maitrise", "sait faire", "langage"],
    answer:
      "Fidison maîtrise le Frontend (HTML/CSS, JavaScript, ReactJS, NextJS, Figma), le Backend (NestJS, NodeJS, FastAPI, Laravel, Spring Boot, PHP, Java, C#), le Mobile (React Native, Flutter/Dart) et les bases de données (MySQL, PostgreSQL, Git/GitHub).",
  },
  {
    keywords: ["stage", "chu", "tambohobe", "hôpital", "hopital", "patient"],
    answer:
      "Fidison a fait un stage au CHU Tambohobe Fianarantsoa (juin-septembre 2024) où il a intégré l'interface graphique d'un système de gestion des patients, avec Figma, NextJS et JSON-Server.",
  },
  {
    keywords: ["cisco", "ambalavao", "enseignant"],
    answer:
      "En 2022, Fidison a réalisé un stage à la CISCO Ambalavao : une application de gestion des enseignants non fonctionnaires, développée en PHP et MySQL.",
  },
  {
    keywords: ["ministère", "ministere", "topomanager", "fastapi", "e-trait", "decentralisation", "décentralisation"],
    answer:
      "D'août à décembre 2025, Fidison a travaillé sur l'intégration d'un service FastAPI pour l'interopérabilité entre TopoManager et E-trait FG, au Ministère de la Décentralisation et de l'Aménagement du Territoire (FastAPI, CodeIgniter 3, PostgreSQL).",
  },
  {
    keywords: ["projet", "e-commerce", "ecommerce", "chaussure", "boutique"],
    answer:
      "Parmi ses projets : une plateforme e-commerce de vente de chaussures (ReactJS, NestJS, NodeJS, PostgreSQL), une appli mobile de lecteur de musique (React Native, Flutter/Dart), et une gestion de parc automobile (Java, MySQL). Tu peux voir tous les projets dans la section « Projets » du site.",
  },
  {
    keywords: ["mobile", "react native", "flutter", "musique", "application"],
    answer:
      "Fidison a développé une application mobile de lecteur de musique en L3 (2024), avec gestion de bibliothèque et playlists, en React Native et Flutter/Dart.",
  },
  {
    keywords: ["formation", "étude", "etude", "diplome", "diplôme", "emit", "master", "licence", "bac", "baccalauréat"],
    answer:
      "Fidison est actuellement en Master 2 en Modélisation et Ingénierie Informatique à l'EMIT Fianarantsoa (2025-2026), après une Licence en Développement d'Applications Internet et Intranet (2021-2024) et un Bac Série D en 2021.",
  },
  {
    keywords: ["dispo", "disponib", "alternance", "emploi", "travail", "job", "recrut", "embauche"],
    answer:
      "Oui ! Fidison recherche actuellement un stage, une alternance ou une opportunité d'emploi en développement web ou mobile. N'hésite pas à le contacter via le formulaire de la section Contact.",
  },
  {
    keywords: ["contact", "email", "mail", "téléphone", "telephone", "joindre", "numéro", "numero"],
    answer:
      "Tu peux contacter Fidison par email à fidisonjeanericaime@gmail.com, par téléphone au +261 34 729 32 99, ou directement via le formulaire dans la section Contact du site.",
  },
  {
    keywords: ["localisation", "où", "ou est", "habite", "madagascar", "fianarantsoa", "ville"],
    answer:
      "Fidison est basé à Andrainjato, Fianarantsoa, à Madagascar.",
  },
  {
    keywords: ["langue", "français", "anglais", "parle"],
    answer:
      "Fidison parle couramment français, et a un niveau intermédiaire en anglais.",
  },
  {
    keywords: ["intérêt", "interet", "hobby", "loisir", "aime", "passion"],
    answer:
      "En dehors du code, Fidison aime la lecture, les voyages, le basket-ball, le football, les films et les jeux vidéos.",
  },
  {
    keywords: ["merci", "super", "cool", "top", "parfait"],
    answer: "Avec plaisir ! N'hésite pas si tu as d'autres questions 😊",
  },
];

const DEFAULT_ANSWER =
  "Je n'ai pas de réponse toute prête à ce sujet 🙂 Essaie une question sur ses compétences, ses projets, ses expériences ou comment le contacter — ou écris-lui directement via le formulaire de contact.";

const SUGGESTIONS = [
  "Quelles sont tes compétences ?",
  "Parle-moi de ton stage au CHU",
  "Es-tu disponible pour une alternance ?",
];

function findAnswer(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const entry of FAQ) {
    const score = entry.keywords.reduce(
      (acc, kw) => (q.includes(kw) ? acc + 1 : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best ? best.answer : DEFAULT_ANSWER;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bonjour 👋 Je suis l'assistant du portfolio de Fidison Jean Eric Aimé. Pose-moi une question sur son parcours, ses compétences ou ses projets !",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const send = (text) => {
    const content = (text ?? input).trim();
    if (!content || typing) return;

    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const answer = findAnswer(content);
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
      setTyping(false);
    }, 500 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        className={`chat-fab ${open ? "hidden" : ""}`.trim()}
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le chat"
      >
        💬
      </button>

      <div className={`chat-window ${open ? "open" : ""}`.trim()}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">FJ</div>
            <div>
              <div className="chat-title">Assistant du portfolio</div>
              <div className="chat-subtitle">Répond à propos de Fidison</div>
            </div>
          </div>
          <button
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label="Fermer le chat"
          >
            ✕
          </button>
        </div>

        <div className="chat-body" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role}`}>
              {m.content}
            </div>
          ))}
          {typing && (
            <div className="chat-bubble assistant typing">
              <span /><span /><span />
            </div>
          )}

          {messages.length === 1 && !typing && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="chat-input-row">
          <textarea
            placeholder="Écris ton message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="chat-send"
            onClick={() => send()}
            disabled={typing || !input.trim()}
            aria-label="Envoyer"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}