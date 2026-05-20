const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const modal = document.querySelector("[data-offer-modal]");
const openOfferButtons = document.querySelectorAll("[data-open-offer]");
const closeOffer = document.querySelector("[data-close-offer]");
const faqItems = document.querySelectorAll(".faq-list details");
const buttons = document.querySelectorAll(".btn, .header-cta, .menu-toggle, .footer-link");

const openOfferModal = () => {
  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
    document.documentElement.classList.add("modal-open");
  }
};

const closeOfferModal = () => {
  if (modal instanceof HTMLDialogElement) {
    modal.close();
  }
};

const closeMenu = () => {
  if (!menuToggle || !nav) return;
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

openOfferButtons.forEach((button) => {
  button.addEventListener("click", openOfferModal);
});

closeOffer?.addEventListener("click", closeOfferModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal && modal instanceof HTMLDialogElement) {
    closeOfferModal();
  }
});

modal?.addEventListener("close", () => {
  document.documentElement.classList.remove("modal-open");
});

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

buttons.forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.className = "ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.querySelector(".ripple")?.remove();
    button.append(ripple);
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const linkedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sectionLinks.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      sectionLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visibleEntry.target.id}`);
      });
    },
    { threshold: [0.22, 0.42, 0.62], rootMargin: "-18% 0px -58% 0px" },
  );

  linkedSections.forEach((section) => navObserver.observe(section));
}
