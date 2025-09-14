document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("modal");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("close");
  const ribbon = document.querySelector('.ribbon-bottom');
  const footer = document.querySelector('footer');
  const snsSection = document.querySelector('#SNS');

  if (!ribbon || !footer) return;

  // モバイルメニュー開閉
  if (hamburger && modal && closeBtn) {
    const closeModal = () => {
      modal.classList.remove("open");
      ribbon.style.display = 'block';
    };

    hamburger.addEventListener("click", () => {
      modal.classList.add("open");
      ribbon.style.display = 'none';
    });

    closeBtn.addEventListener("click", closeModal);

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", (e) => {
        closeModal();
        if (link.href.includes("note.com")) return;

        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const targetEl = document.getElementById(href.slice(1));
          if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // PCメニュー スムーズスクロール
  document.querySelectorAll(".pc-menu a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ガードロープ位置調整
  function updateRibbonPosition() {
    if (!ribbon || !footer) return;

    const windowHeight = window.innerHeight;
    const ribbonHeight = ribbon.offsetHeight;

    let bottomOffset = 50;

    if (snsSection) {
      const snsRect = snsSection.getBoundingClientRect();
      const snsBottomToWindowBottom = windowHeight - (snsRect.top + snsRect.height);

      if (snsBottomToWindowBottom < 50) {
        bottomOffset = snsBottomToWindowBottom + 20;
      }
    }

    const footerRect = footer.getBoundingClientRect();
    const footerOverlap = windowHeight - footerRect.top;

    if (footerOverlap > 0) {
      bottomOffset = footerOverlap + 20;
    }

    ribbon.style.position = 'fixed';
    ribbon.style.bottom = `${bottomOffset}px`;
  }

  // イベント登録
  window.addEventListener('scroll', updateRibbonPosition);
  window.addEventListener('resize', updateRibbonPosition);
  window.addEventListener('load', updateRibbonPosition);
  updateRibbonPosition();
});