import type { Locale } from "./config";

export type FaqItem = { q: string; a: string };

export type Dictionary = {
  nav: {
    home: string;
    work: string;
    projects: string;
    videos: string;
    about: string;
    contact: string;
    services: string;
    book: string;
  };
  projects: {
    title: string;
    intro: string;
    items: Record<string, { role: string; blurb: string }>;
  };
  // Category display labels keyed by slug (canonical slug stays in data.ts)
  categories: Record<string, string>;
  home: {
    tagline: string; // {name} interpolated
    viewWork: string;
  };
  about: {
    title: string;
    bio1: string; // {name}
    bio2: string;
    bio3: string;
    selectedWork: string;
    cta: string;
  };
  contact: {
    title: string;
    intro: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    sentNote: string; // {email}
  };
  videos: {
    title: string;
    description: string;
    watch: string;
    work: string;
    onInstagram: string;
  };
  services: {
    title: string;
    intro: string;
    cta: string;
    items: Record<string, string>; // description keyed by category slug
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  booking: {
    title: string;
    intro: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    service: string;
    serviceDefault: string;
    message: string;
    send: string;
    sentNote: string; // {email}
  };
  instagram: {
    title: string;
    cta: string;
  };
  search: {
    open: string;
    placeholder: string;
    empty: string; // {query}
    hint: string;
  };
  ui: {
    backToTop: string;
    toggleTheme: string;
    filterAll: string;
  };
  seo: {
    siteDescription: string;
    home: string;
    about: string;
    contact: string;
    videos: string;
    services: string;
    projects: string;
    booking: string;
    category: string; // {category}
  };
  notFound: {
    message: string;
    back: string;
  };
};

const en: Dictionary = {
  nav: {
    home: "HOME",
    work: "WORK",
    projects: "PROJECTS",
    videos: "VIDEOS",
    about: "ABOUT ME",
    contact: "CONTACT",
    services: "SERVICES",
    book: "BOOK",
  },
  projects: {
    title: "SELECTED PROJECTS",
    intro: "A few of the brands and artists I have created for.",
    items: {
      "rolling-loud": {
        role: "Concert & Events",
        blurb: "Live festival and stage photography that puts you in the middle of the crowd. Fast, instinctive shooting that keeps up with the energy of the show.",
      },
      "kanye-west": {
        role: "Content",
        blurb: "Apparel and content photography around the Honor Up release. Clean, product-focused frames built for social and campaign use.",
      },
      nike: {
        role: "Campaign",
        blurb: "Footwear and lifestyle imagery with a bold, graphic edge, styled and lit so a sneaker feels like a full campaign.",
      },
      "mercedes-benz": {
        role: "Creative Direction",
        blurb: "Concept-led creative direction with futuristic, story-driven visuals that give a brand moment its own world.",
      },
      "paco-rabanne": {
        role: "Creative",
        blurb: "Surreal product storytelling for the fragrance line, turning a single hero object into a striking, unexpected scene.",
      },
      mcm: {
        role: "Fashion",
        blurb: "Editorial fashion imagery built around the accessories, with styling and movement that let the pieces lead.",
      },
      swatch: {
        role: "Product",
        blurb: "Accessory and product photography with a clean, graphic feel. Detail-driven frames that make a watch the hero.",
      },
      "urban-outfitters": {
        role: "Lifestyle",
        blurb: "Street and lifestyle imagery with an easy, editorial mood, styled for a young, urban audience.",
      },
      logitech: {
        role: "Content",
        blurb: "Creator-focused content and product visuals, shot to feel natural in a studio setting.",
      },
    },
  },
  categories: {
    concerts: "CONCERTS",
    celebrities: "CELEBRITIES",
    creative: "CREATIVE",
    fashion: "FASHION",
    portrait: "PORTRAIT",
    weddings: "WEDDINGS",
    events: "EVENTS",
    "cover-shoot": "COVER SHOOT",
  },
  home: {
    tagline:
      "{name} is a photographer, videographer and creative director based in Basel, Switzerland.",
    viewWork: "View work",
  },
  about: {
    title: "ABOUT ME",
    bio1: "{name} is a photographer, videographer and creative director based in Basel, Switzerland.",
    bio2: "He finds most of his inspiration in fashion, architecture, design, art and live concerts.",
    bio3: "He uses his creative work to move and inspire audiences around the world.",
    selectedWork: "SELECTED WORK",
    cta: "GET IN TOUCH",
  },
  contact: {
    title: "CONTACT",
    intro:
      "Available for bookings, collaborations and commissions. Send a message and I will get back to you.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    send: "SEND",
    sentNote:
      "Your email app should have opened. If it did not, just write to {email}.",
  },
  videos: {
    title: "VIDEOS",
    description:
      "A selection of motion work across concerts, fashion films and creative direction. You will find the full set of reels on Instagram.",
    watch: "WATCH ON INSTAGRAM",
    work: "SELECTED FILMS",
    onInstagram: "ON INSTAGRAM",
  },
  services: {
    title: "WHAT I SHOOT",
    intro:
      "A range of photography and video work, always shaped around the story you want to tell.",
    cta: "Book a shoot",
    items: {
      concerts:
        "Live energy captured up close, from festival main stages to intimate club shows.",
      celebrities:
        "Red-carpet and event portraits at fashion week and film festivals, shot with speed and discretion.",
      creative:
        "Concept driven shoots and art direction for brands and artists who want something different.",
      fashion:
        "Editorial and campaign imagery that puts the styling, the mood and the movement first.",
      portrait:
        "Natural, characterful portraits for artists, founders and creatives.",
      weddings:
        "Honest, cinematic wedding coverage, from the first look to the last dance.",
      events:
        "Brand launches, galas and parties documented with an editorial eye.",
      "cover-shoot":
        "Cover and editorial features built to stand out on the page.",
    },
  },
  faq: {
    title: "FREQUENTLY ASKED",
    items: [
      {
        q: "Where are you based and do you travel?",
        a: "I am based in Basel, Switzerland, and I travel across Europe and worldwide for the right project.",
      },
      {
        q: "What does a shoot cost?",
        a: "Every project is different, so pricing depends on scope, usage and time. Send me a few details and I will put together a quote.",
      },
      {
        q: "How do we book a date?",
        a: "Use the booking form with your preferred date and a short brief. I will confirm availability and next steps by email.",
      },
      {
        q: "Do you shoot both photo and video?",
        a: "Yes. I work as a photographer, videographer and creative director, often on the same project.",
      },
      {
        q: "How long until I get the final images?",
        a: "Turnaround is usually one to three weeks depending on the size of the shoot. Rush delivery can be arranged.",
      },
    ],
  },
  booking: {
    title: "BOOK A SHOOT",
    intro:
      "Tell me about your project and preferred date. I will reply by email to confirm the details.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    date: "Preferred date",
    service: "Type of shoot",
    serviceDefault: "Select a type",
    message: "About the project",
    send: "REQUEST BOOKING",
    sentNote:
      "Your email app should have opened. If it did not, just write to {email}.",
  },
  instagram: {
    title: "FOLLOW ALONG",
    cta: "Follow on Instagram",
  },
  search: {
    open: "Search",
    placeholder: "Search galleries",
    empty: "Nothing found for “{query}”.",
    hint: "Search by category, for example fashion or concerts.",
  },
  ui: {
    backToTop: "Back to top",
    toggleTheme: "Toggle light or dark mode",
    filterAll: "All",
  },
  seo: {
    siteDescription:
      "Massiah Zavahir is a photographer, videographer and creative director in Basel, Switzerland, working across concerts, fashion, portraits, weddings and creative shoots.",
    home: "Photography and video by Massiah Zavahir, a creative director based in Basel, Switzerland. Concerts, fashion, portraits, weddings and creative work.",
    about:
      "Get to know Massiah Zavahir, a Basel based photographer, videographer and creative director, and the brands he has worked with.",
    contact:
      "Get in touch with Massiah Zavahir for photography and video bookings, collaborations and commissions in Basel and worldwide.",
    videos:
      "Motion and video work by Massiah Zavahir: concerts, fashion films and creative direction.",
    services:
      "Photography and video services by Massiah Zavahir in Basel: concerts, fashion, portraits, weddings, creative and cover shoots.",
    projects:
      "Selected projects by Massiah Zavahir for brands and artists including Rolling Loud, Kanye West, Nike, Mercedes-Benz, Paco Rabanne and MCM.",
    booking:
      "Book a photo or video shoot with Massiah Zavahir in Basel. Share your date and project and get a reply by email.",
    category:
      "{category} photography by Massiah Zavahir, based in Basel, Switzerland.",
  },
  notFound: { message: "This page could not be found.", back: "BACK HOME" },
};

// German with a Swiss accent (Swiss Standard German, no ß).
const de: Dictionary = {
  nav: {
    home: "HOME",
    work: "ARBEITEN",
    projects: "PROJEKTE",
    videos: "VIDEOS",
    about: "ÜBER MICH",
    contact: "KONTAKT",
    services: "LEISTUNGEN",
    book: "BUCHEN",
  },
  projects: {
    title: "AUSGEWÄHLTE PROJEKTE",
    intro: "Einige der Marken und Artists, für die ich gearbeitet habe.",
    items: {
      "rolling-loud": {
        role: "Konzert & Events",
        blurb: "Live-Fotografie von Festival und Bühne, mitten in der Crowd. Schnelles, instinktives Shooting, das mit der Energie der Show mithält.",
      },
      "kanye-west": {
        role: "Content",
        blurb: "Apparel- und Content-Fotografie rund um den Honor-Up-Release. Klare, produktfokussierte Bilder für Social und Kampagne.",
      },
      nike: {
        role: "Kampagne",
        blurb: "Footwear- und Lifestyle-Bilder mit klarer, grafischer Handschrift, gestylt und ausgeleuchtet wie eine ganze Kampagne.",
      },
      "mercedes-benz": {
        role: "Creative Direction",
        blurb: "Konzeptgeführte Creative Direction mit futuristischen, erzählerischen Visuals, die einem Markenmoment eine eigene Welt geben.",
      },
      "paco-rabanne": {
        role: "Creative",
        blurb: "Surreales Produkt-Storytelling für die Fragrance-Linie, das ein einzelnes Hero-Objekt in eine überraschende Szene verwandelt.",
      },
      mcm: {
        role: "Mode",
        blurb: "Editoriale Modebilder rund um die Accessoires, mit Styling und Bewegung, die die Stücke in den Vordergrund stellen.",
      },
      swatch: {
        role: "Produkt",
        blurb: "Accessoire- und Produktfotografie mit klarem, grafischem Look. Detailstarke Bilder, die eine Uhr zum Hero machen.",
      },
      "urban-outfitters": {
        role: "Lifestyle",
        blurb: "Street- und Lifestyle-Bilder mit lockerer, editorialer Stimmung, gestylt für ein junges, urbanes Publikum.",
      },
      logitech: {
        role: "Content",
        blurb: "Creator-fokussierter Content und Produkt-Visuals, aufgenommen mit natürlichem Studio-Feeling.",
      },
    },
  },
  categories: {
    concerts: "KONZERTE",
    celebrities: "CELEBRITIES",
    creative: "KREATIV",
    fashion: "MODE",
    portrait: "PORTRÄT",
    weddings: "HOCHZEITEN",
    events: "EVENTS",
    "cover-shoot": "COVER SHOOT",
  },
  home: {
    tagline:
      "{name} ist Fotograf, Videograf und Creative Director aus Basel, Schweiz.",
    viewWork: "Arbeiten ansehen",
  },
  about: {
    title: "ÜBER MICH",
    bio1: "{name} ist Fotograf, Videograf und Creative Director aus Basel, Schweiz.",
    bio2: "Seine Inspiration findet er vor allem in Mode, Architektur, Design, Kunst und Konzerten.",
    bio3: "Mit seiner kreativen Arbeit will er ein Publikum auf der ganzen Welt bewegen und inspirieren.",
    selectedWork: "AUSGEWÄHLTE ARBEITEN",
    cta: "KONTAKT AUFNEHMEN",
  },
  contact: {
    title: "KONTAKT",
    intro:
      "Verfügbar für Buchungen, Kollaborationen und Aufträge. Schreib mir und ich melde mich zurück.",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    message: "Nachricht",
    send: "SENDEN",
    sentNote:
      "Dein E-Mail-Programm sollte sich geöffnet haben. Falls nicht, schreib an {email}.",
  },
  videos: {
    title: "VIDEOS",
    description:
      "Eine Auswahl an Bewegtbild aus Konzerten, Modefilmen und Creative Direction. Die ganze Sammlung findest du auf Instagram.",
    watch: "AUF INSTAGRAM ANSEHEN",
    work: "AUSGEWÄHLTE FILME",
    onInstagram: "AUF INSTAGRAM",
  },
  services: {
    title: "WAS ICH FOTOGRAFIERE",
    intro:
      "Eine Bandbreite an Foto- und Videoarbeit, immer auf die Geschichte zugeschnitten, die du erzählen willst.",
    cta: "Shooting buchen",
    items: {
      concerts:
        "Live-Energie aus nächster Nähe, von der Festivalbühne bis zur kleinen Clubshow.",
      celebrities:
        "Red-Carpet- und Event-Porträts an Fashion Weeks und Filmfestivals, schnell und diskret fotografiert.",
      creative:
        "Konzeptstarke Shootings und Art Direction für Marken und Artists, die etwas Eigenes wollen.",
      fashion:
        "Editorial- und Kampagnenbilder, bei denen Styling, Stimmung und Bewegung im Vordergrund stehen.",
      portrait:
        "Natürliche, charaktervolle Porträts für Artists, Gründer und Kreative.",
      weddings:
        "Ehrliche, cinematische Hochzeitsbegleitung, vom ersten Blick bis zum letzten Tanz.",
      events:
        "Marken-Launches, Galas und Partys mit editorialem Auge festgehalten.",
      "cover-shoot":
        "Cover- und Editorial-Strecken, die auf der Seite auffallen.",
    },
  },
  faq: {
    title: "HÄUFIGE FRAGEN",
    items: [
      {
        q: "Wo bist du und reist du?",
        a: "Ich bin in Basel, Schweiz, und reise für das richtige Projekt durch Europa und weltweit.",
      },
      {
        q: "Was kostet ein Shooting?",
        a: "Jedes Projekt ist anders, der Preis hängt von Umfang, Nutzung und Zeit ab. Schick mir ein paar Details und ich erstelle dir eine Offerte.",
      },
      {
        q: "Wie buchen wir einen Termin?",
        a: "Nutze das Buchungsformular mit deinem Wunschtermin und einem kurzen Brief. Ich bestätige Verfügbarkeit und nächste Schritte per E-Mail.",
      },
      {
        q: "Machst du Foto und Video?",
        a: "Ja. Ich arbeite als Fotograf, Videograf und Creative Director, oft im selben Projekt.",
      },
      {
        q: "Wie lange dauert es bis zu den fertigen Bildern?",
        a: "Die Bearbeitung dauert je nach Grösse meist ein bis drei Wochen. Express-Lieferung ist möglich.",
      },
    ],
  },
  booking: {
    title: "SHOOTING BUCHEN",
    intro:
      "Erzähl mir von deinem Projekt und deinem Wunschtermin. Ich melde mich per E-Mail, um die Details zu bestätigen.",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    date: "Wunschtermin",
    service: "Art des Shootings",
    serviceDefault: "Art auswählen",
    message: "Zum Projekt",
    send: "ANFRAGE SENDEN",
    sentNote:
      "Dein E-Mail-Programm sollte sich geöffnet haben. Falls nicht, schreib an {email}.",
  },
  instagram: {
    title: "FOLGE MIR",
    cta: "Auf Instagram folgen",
  },
  search: {
    open: "Suchen",
    placeholder: "Galerien durchsuchen",
    empty: "Nichts gefunden für “{query}”.",
    hint: "Suche nach Kategorie, zum Beispiel Mode oder Konzerte.",
  },
  ui: {
    backToTop: "Nach oben",
    toggleTheme: "Hell oder dunkel umschalten",
    filterAll: "Alle",
  },
  seo: {
    siteDescription:
      "Massiah Zavahir ist Fotograf, Videograf und Creative Director in Basel, Schweiz, mit Arbeiten aus Konzerten, Mode, Porträt, Hochzeiten und kreativen Shootings.",
    home: "Fotografie und Video von Massiah Zavahir, Creative Director aus Basel, Schweiz. Konzerte, Mode, Porträts, Hochzeiten und kreative Arbeiten.",
    about:
      "Lern Massiah Zavahir kennen, Fotograf, Videograf und Creative Director aus Basel, sowie die Marken, mit denen er gearbeitet hat.",
    contact:
      "Nimm Kontakt mit Massiah Zavahir auf für Foto- und Videobuchungen, Kollaborationen und Aufträge in Basel und weltweit.",
    videos:
      "Bewegtbild und Videoarbeiten von Massiah Zavahir: Konzerte, Modefilme und Creative Direction.",
    services:
      "Foto- und Videoleistungen von Massiah Zavahir in Basel: Konzerte, Mode, Porträts, Hochzeiten, kreative und Cover-Shootings.",
    projects:
      "Ausgewählte Projekte von Massiah Zavahir für Marken und Artists wie Rolling Loud, Kanye West, Nike, Mercedes-Benz, Paco Rabanne und MCM.",
    booking:
      "Buche ein Foto- oder Videoshooting mit Massiah Zavahir in Basel. Teile deinen Termin und dein Projekt und erhalte eine Antwort per E-Mail.",
    category: "{category} Fotografie von Massiah Zavahir aus Basel, Schweiz.",
  },
  notFound: {
    message: "Diese Seite konnte nicht gefunden werden.",
    back: "ZURÜCK ZUR STARTSEITE",
  },
};

const fr: Dictionary = {
  nav: {
    home: "ACCUEIL",
    work: "TRAVAUX",
    projects: "PROJETS",
    videos: "VIDÉOS",
    about: "À PROPOS",
    contact: "CONTACT",
    services: "SERVICES",
    book: "RÉSERVER",
  },
  projects: {
    title: "PROJETS SÉLECTIONNÉS",
    intro: "Quelques-unes des marques et artistes pour qui j'ai créé.",
    items: {
      "rolling-loud": {
        role: "Concert & Événements",
        blurb: "Photographie live de festival et de scène, au cœur du public. Une prise de vue rapide et instinctive, au rythme du show.",
      },
      "kanye-west": {
        role: "Contenu",
        blurb: "Photographie vêtements et contenu autour de la sortie Honor Up. Des images nettes, centrées produit, pensées pour le social et la campagne.",
      },
      nike: {
        role: "Campagne",
        blurb: "Images footwear et lifestyle à l'esthétique graphique affirmée, stylées et éclairées pour qu'une sneaker devienne une vraie campagne.",
      },
      "mercedes-benz": {
        role: "Direction créative",
        blurb: "Direction créative conceptuelle et visuels futuristes et narratifs qui donnent tout un univers à un moment de marque.",
      },
      "paco-rabanne": {
        role: "Créatif",
        blurb: "Storytelling produit surréaliste pour la ligne de parfum, transformant un seul objet héros en scène inattendue.",
      },
      mcm: {
        role: "Mode",
        blurb: "Images de mode éditoriales construites autour des accessoires, avec un stylisme et un mouvement qui mettent les pièces en avant.",
      },
      swatch: {
        role: "Produit",
        blurb: "Photographie d'accessoires et de produits au rendu net et graphique. Des images axées détail qui font de la montre la star.",
      },
      "urban-outfitters": {
        role: "Lifestyle",
        blurb: "Images street et lifestyle à l'ambiance éditoriale décontractée, stylées pour un public jeune et urbain.",
      },
      logitech: {
        role: "Contenu",
        blurb: "Contenu et visuels produit orientés créateurs, pensés pour un rendu naturel en studio.",
      },
    },
  },
  categories: {
    concerts: "CONCERTS",
    celebrities: "CÉLÉBRITÉS",
    creative: "CRÉATIF",
    fashion: "MODE",
    portrait: "PORTRAIT",
    weddings: "MARIAGES",
    events: "ÉVÉNEMENTS",
    "cover-shoot": "COVER SHOOT",
  },
  home: {
    tagline:
      "{name} est photographe, vidéaste et directeur créatif basé à Bâle, en Suisse.",
    viewWork: "Voir les travaux",
  },
  about: {
    title: "À PROPOS",
    bio1: "{name} est photographe, vidéaste et directeur créatif basé à Bâle, en Suisse.",
    bio2: "Il puise son inspiration dans la mode, l'architecture, le design, l'art et les concerts.",
    bio3: "Il met sa créativité au service d'un public du monde entier, pour le toucher et l'inspirer.",
    selectedWork: "TRAVAUX SÉLECTIONNÉS",
    cta: "ME CONTACTER",
  },
  contact: {
    title: "CONTACT",
    intro:
      "Disponible pour des réservations, collaborations et commandes. Écrivez-moi et je vous répondrai.",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    message: "Message",
    send: "ENVOYER",
    sentNote:
      "Votre messagerie devrait s'être ouverte. Sinon, écrivez à {email}.",
  },
  videos: {
    title: "VIDÉOS",
    description:
      "Une sélection de travaux en mouvement autour des concerts, des films de mode et de la direction créative. La collection complète des reels est sur Instagram.",
    watch: "REGARDER SUR INSTAGRAM",
    work: "FILMS SÉLECTIONNÉS",
    onInstagram: "SUR INSTAGRAM",
  },
  services: {
    title: "CE QUE JE PHOTOGRAPHIE",
    intro:
      "Une palette de travaux photo et vidéo, toujours pensés autour de l'histoire que vous voulez raconter.",
    cta: "Réserver une séance",
    items: {
      concerts:
        "L'énergie live capturée au plus près, des grandes scènes de festival aux petits clubs.",
      celebrities:
        "Portraits red carpet et événements aux fashion weeks et festivals de cinéma, réalisés avec rapidité et discrétion.",
      creative:
        "Des séances conceptuelles et de la direction artistique pour les marques et artistes qui veulent sortir du lot.",
      fashion:
        "Des images éditoriales et de campagne qui mettent le stylisme, l'ambiance et le mouvement au premier plan.",
      portrait:
        "Des portraits naturels et pleins de caractère pour artistes, fondateurs et créatifs.",
      weddings:
        "Une couverture de mariage sincère et cinématographique, du premier regard à la dernière danse.",
      events:
        "Lancements de marque, galas et soirées documentés avec un œil éditorial.",
      "cover-shoot":
        "Des couvertures et sujets éditoriaux pensés pour marquer.",
    },
  },
  faq: {
    title: "QUESTIONS FRÉQUENTES",
    items: [
      {
        q: "Où êtes-vous basé et voyagez-vous ?",
        a: "Je suis basé à Bâle, en Suisse, et je me déplace en Europe et dans le monde pour le bon projet.",
      },
      {
        q: "Combien coûte une séance ?",
        a: "Chaque projet est différent, le tarif dépend de l'ampleur, de l'usage et du temps. Envoyez-moi quelques détails et je vous prépare un devis.",
      },
      {
        q: "Comment réserver une date ?",
        a: "Utilisez le formulaire de réservation avec votre date souhaitée et un bref descriptif. Je confirme la disponibilité et les étapes par e-mail.",
      },
      {
        q: "Faites-vous photo et vidéo ?",
        a: "Oui. Je travaille comme photographe, vidéaste et directeur créatif, souvent sur le même projet.",
      },
      {
        q: "Quel délai pour les images finales ?",
        a: "Le rendu prend généralement une à trois semaines selon la taille de la séance. Une livraison express est possible.",
      },
    ],
  },
  booking: {
    title: "RÉSERVER UNE SÉANCE",
    intro:
      "Parlez-moi de votre projet et de votre date souhaitée. Je vous répondrai par e-mail pour confirmer les détails.",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    date: "Date souhaitée",
    service: "Type de séance",
    serviceDefault: "Choisir un type",
    message: "À propos du projet",
    send: "DEMANDER UNE RÉSERVATION",
    sentNote:
      "Votre messagerie devrait s'être ouverte. Sinon, écrivez à {email}.",
  },
  instagram: {
    title: "SUIVEZ-MOI",
    cta: "Suivre sur Instagram",
  },
  search: {
    open: "Rechercher",
    placeholder: "Rechercher dans les galeries",
    empty: "Aucun résultat pour “{query}”.",
    hint: "Recherchez par catégorie, par exemple mode ou concerts.",
  },
  ui: {
    backToTop: "Haut de page",
    toggleTheme: "Basculer clair ou sombre",
    filterAll: "Tout",
  },
  seo: {
    siteDescription:
      "Massiah Zavahir est photographe, vidéaste et directeur créatif à Bâle, en Suisse, avec des travaux de concerts, mode, portrait, mariages et shootings créatifs.",
    home: "Photographie et vidéo par Massiah Zavahir, directeur créatif basé à Bâle, en Suisse. Concerts, mode, portraits, mariages et créations.",
    about:
      "Découvrez Massiah Zavahir, photographe, vidéaste et directeur créatif basé à Bâle, et les marques avec lesquelles il a travaillé.",
    contact:
      "Contactez Massiah Zavahir pour des réservations photo et vidéo, des collaborations et des commandes à Bâle et dans le monde entier.",
    videos:
      "Travaux vidéo de Massiah Zavahir : concerts, films de mode et direction créative.",
    services:
      "Services photo et vidéo de Massiah Zavahir à Bâle : concerts, mode, portraits, mariages, créations et couvertures.",
    projects:
      "Projets sélectionnés de Massiah Zavahir pour des marques et artistes comme Rolling Loud, Kanye West, Nike, Mercedes-Benz, Paco Rabanne et MCM.",
    booking:
      "Réservez une séance photo ou vidéo avec Massiah Zavahir à Bâle. Indiquez votre date et votre projet et recevez une réponse par e-mail.",
    category:
      "Photographie {category} par Massiah Zavahir, basé à Bâle, en Suisse.",
  },
  notFound: { message: "Cette page est introuvable.", back: "RETOUR À L'ACCUEIL" },
};

const it: Dictionary = {
  nav: {
    home: "HOME",
    work: "LAVORI",
    projects: "PROGETTI",
    videos: "VIDEO",
    about: "CHI SONO",
    contact: "CONTATTO",
    services: "SERVIZI",
    book: "PRENOTA",
  },
  projects: {
    title: "PROGETTI SELEZIONATI",
    intro: "Alcuni dei brand e degli artisti per cui ho creato.",
    items: {
      "rolling-loud": {
        role: "Concerti & Eventi",
        blurb: "Fotografia live di festival e palco, in mezzo al pubblico. Uno shooting rapido e istintivo, al ritmo dello show.",
      },
      "kanye-west": {
        role: "Contenuti",
        blurb: "Fotografia di abbigliamento e contenuti attorno all'uscita di Honor Up. Immagini pulite e centrate sul prodotto, pensate per social e campagna.",
      },
      nike: {
        role: "Campagna",
        blurb: "Immagini footwear e lifestyle con un'estetica grafica decisa, stilizzate e illuminate perché una sneaker diventi una vera campagna.",
      },
      "mercedes-benz": {
        role: "Direzione creativa",
        blurb: "Direzione creativa concettuale e visual futuristici e narrativi che danno a un momento di brand un mondo tutto suo.",
      },
      "paco-rabanne": {
        role: "Creativo",
        blurb: "Storytelling di prodotto surreale per la linea di fragranze, trasformando un singolo oggetto hero in una scena inaspettata.",
      },
      mcm: {
        role: "Moda",
        blurb: "Immagini di moda editoriali costruite attorno agli accessori, con styling e movimento che mettono in primo piano i pezzi.",
      },
      swatch: {
        role: "Prodotto",
        blurb: "Fotografia di accessori e prodotti dal look pulito e grafico. Immagini attente al dettaglio che rendono l'orologio protagonista.",
      },
      "urban-outfitters": {
        role: "Lifestyle",
        blurb: "Immagini street e lifestyle dal mood editoriale e rilassato, stilizzate per un pubblico giovane e urbano.",
      },
      logitech: {
        role: "Contenuti",
        blurb: "Contenuti e visual di prodotto orientati ai creator, girati con un feeling naturale da studio.",
      },
    },
  },
  categories: {
    concerts: "CONCERTI",
    celebrities: "CELEBRITÀ",
    creative: "CREATIVO",
    fashion: "MODA",
    portrait: "RITRATTO",
    weddings: "MATRIMONI",
    events: "EVENTI",
    "cover-shoot": "COVER SHOOT",
  },
  home: {
    tagline:
      "{name} è fotografo, videomaker e direttore creativo con base a Basilea, in Svizzera.",
    viewWork: "Guarda i lavori",
  },
  about: {
    title: "CHI SONO",
    bio1: "{name} è fotografo, videomaker e direttore creativo con base a Basilea, in Svizzera.",
    bio2: "Trova gran parte della sua ispirazione nella moda, nell'architettura, nel design, nell'arte e nei concerti.",
    bio3: "Usa la sua creatività per emozionare e ispirare il pubblico in tutto il mondo.",
    selectedWork: "LAVORI SELEZIONATI",
    cta: "CONTATTAMI",
  },
  contact: {
    title: "CONTATTO",
    intro:
      "Disponibile per prenotazioni, collaborazioni e progetti. Scrivimi e ti risponderò.",
    name: "Nome",
    email: "Email",
    phone: "Telefono",
    message: "Messaggio",
    send: "INVIA",
    sentNote:
      "Il tuo programma di posta dovrebbe essersi aperto. In caso contrario, scrivi a {email}.",
  },
  videos: {
    title: "VIDEO",
    description:
      "Una selezione di lavori in movimento tra concerti, fashion film e direzione creativa. La raccolta completa dei reel è su Instagram.",
    watch: "GUARDA SU INSTAGRAM",
    work: "FILM SELEZIONATI",
    onInstagram: "SU INSTAGRAM",
  },
  services: {
    title: "COSA FOTOGRAFO",
    intro:
      "Una gamma di lavori foto e video, sempre costruiti attorno alla storia che vuoi raccontare.",
    cta: "Prenota uno shooting",
    items: {
      concerts:
        "L'energia live catturata da vicino, dai grandi palchi dei festival ai piccoli club.",
      celebrities:
        "Ritratti red carpet ed eventi a fashion week e festival del cinema, realizzati con rapidità e discrezione.",
      creative:
        "Shooting concettuali e direzione artistica per brand e artisti che vogliono qualcosa di diverso.",
      fashion:
        "Immagini editoriali e di campagna che mettono al centro lo styling, l'atmosfera e il movimento.",
      portrait:
        "Ritratti naturali e pieni di carattere per artisti, founder e creativi.",
      weddings:
        "Un racconto di matrimonio sincero e cinematografico, dal primo sguardo all'ultimo ballo.",
      events:
        "Lanci di brand, gala e feste documentati con occhio editoriale.",
      "cover-shoot":
        "Cover e servizi editoriali pensati per farsi notare.",
    },
  },
  faq: {
    title: "DOMANDE FREQUENTI",
    items: [
      {
        q: "Dove hai base e viaggi?",
        a: "Ho base a Basilea, in Svizzera, e viaggio in Europa e nel mondo per il progetto giusto.",
      },
      {
        q: "Quanto costa uno shooting?",
        a: "Ogni progetto è diverso, il prezzo dipende da portata, utilizzo e tempo. Scrivimi qualche dettaglio e ti preparo un preventivo.",
      },
      {
        q: "Come si prenota una data?",
        a: "Usa il modulo di prenotazione con la data che preferisci e un breve brief. Confermo disponibilità e passi successivi via email.",
      },
      {
        q: "Fai sia foto che video?",
        a: "Sì. Lavoro come fotografo, videomaker e direttore creativo, spesso nello stesso progetto.",
      },
      {
        q: "Quanto tempo per le immagini finali?",
        a: "La consegna richiede di solito da una a tre settimane in base alla dimensione dello shooting. È possibile la consegna express.",
      },
    ],
  },
  booking: {
    title: "PRENOTA UNO SHOOTING",
    intro:
      "Raccontami del tuo progetto e della data che preferisci. Ti risponderò via email per confermare i dettagli.",
    name: "Nome",
    email: "Email",
    phone: "Telefono",
    date: "Data preferita",
    service: "Tipo di shooting",
    serviceDefault: "Seleziona un tipo",
    message: "Sul progetto",
    send: "RICHIEDI PRENOTAZIONE",
    sentNote:
      "Il tuo programma di posta dovrebbe essersi aperto. In caso contrario, scrivi a {email}.",
  },
  instagram: {
    title: "SEGUIMI",
    cta: "Segui su Instagram",
  },
  search: {
    open: "Cerca",
    placeholder: "Cerca nelle gallerie",
    empty: "Nessun risultato per “{query}”.",
    hint: "Cerca per categoria, ad esempio moda o concerti.",
  },
  ui: {
    backToTop: "Torna su",
    toggleTheme: "Cambia chiaro o scuro",
    filterAll: "Tutti",
  },
  seo: {
    siteDescription:
      "Massiah Zavahir è fotografo, videomaker e direttore creativo a Basilea, Svizzera, con lavori tra concerti, moda, ritratto, matrimoni e shooting creativi.",
    home: "Fotografia e video di Massiah Zavahir, direttore creativo con base a Basilea, Svizzera. Concerti, moda, ritratti, matrimoni e lavori creativi.",
    about:
      "Scopri Massiah Zavahir, fotografo, videomaker e direttore creativo con base a Basilea, e i marchi con cui ha collaborato.",
    contact:
      "Contatta Massiah Zavahir per prenotazioni foto e video, collaborazioni e progetti a Basilea e in tutto il mondo.",
    videos:
      "Lavori video di Massiah Zavahir: concerti, fashion film e direzione creativa.",
    services:
      "Servizi foto e video di Massiah Zavahir a Basilea: concerti, moda, ritratti, matrimoni, lavori creativi e cover.",
    projects:
      "Progetti selezionati di Massiah Zavahir per brand e artisti come Rolling Loud, Kanye West, Nike, Mercedes-Benz, Paco Rabanne e MCM.",
    booking:
      "Prenota uno shooting foto o video con Massiah Zavahir a Basilea. Indica la data e il progetto e ricevi una risposta via email.",
    category:
      "Fotografia {category} di Massiah Zavahir, con base a Basilea, Svizzera.",
  },
  notFound: { message: "Questa pagina non è stata trovata.", back: "TORNA ALLA HOME" },
};

const dictionaries: Record<Locale, Dictionary> = { en, de, fr, it };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

/** Simple {token} interpolation. */
export function fmt(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
