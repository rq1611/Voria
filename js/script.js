// =====================================
// NAVBAR: transparan di atas, berwarna saat scroll
// =====================================
const navbar = document.querySelector(".navbar");

function updateNavbar() {
  if (!navbar) return;

  // Background muncul hanya ketika posisi scroll lebih dari 30px.
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Periksa posisi halaman ketika scroll dan ketika pertama kali dibuka/refresh.
window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const templateSelect = document.getElementById("templateChoice");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
    }
  });
}

document.querySelectorAll(".template-btn").forEach(button => {
  button.addEventListener("click", () => {
    const template = button.dataset.template;

    if (!templateSelect) return;
    templateSelect.value = template;
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });

    setTimeout(() => {
      document.getElementById("name").focus();
    }, 650);
  });
});

if (contactForm && formStatus && templateSelect) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const template = templateSelect.value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Mohon lengkapi data yang wajib diisi.";
      return;
    }

    const text = [
      `Halo Voria, saya ${name}.`,
      `Email: ${email}`,
      template ? `Paket: ${template}` : "Paket: Belum dipilih",
      `Kebutuhan: ${message}`
    ].join("\n");

    const whatsappNumber = "6281234567890";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    formStatus.textContent = "Mengalihkan ke WhatsApp...";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
}
