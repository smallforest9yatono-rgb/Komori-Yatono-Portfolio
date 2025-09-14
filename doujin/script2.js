document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("modal");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("close");
  const ribbon = document.querySelector('.ribbon-bottom');
  const footer = document.querySelector('footer');
  const doujinSection = document.querySelector('#doujin');  // 任意

  // ribbonやfooterが存在しない場合は処理しない
  if (!ribbon || !footer) return;

  if (hamburger && modal && closeBtn) {
    hamburger.addEventListener("click", () => {
      modal.classList.add("open");
      ribbon.style.display = 'none';
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      ribbon.style.display = 'block';
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", (e) => {
        modal.classList.remove("open");
        ribbon.style.display = 'block';
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

  // ガードロープ位置調整関数
  function updateRibbonPosition() {
    const footerTop = footer.getBoundingClientRect().top;
    const ribbonHeight = ribbon.offsetHeight;
    const windowHeight = window.innerHeight;

    if (doujinSection) {
      const doujinTop = doujinSection.getBoundingClientRect().top;
      const doujinHeight = doujinSection.offsetHeight;

      if (doujinTop <= windowHeight - ribbonHeight && doujinTop + doujinHeight > 0) {
        ribbon.style.position = 'fixed';
        ribbon.style.bottom = `${windowHeight - (doujinTop + doujinHeight) + 20}px`;
        return;
      }
    }

    if (footerTop < windowHeight + ribbonHeight) {
      ribbon.style.position = 'fixed';
      ribbon.style.bottom = `${windowHeight - footerTop + 20}px`;
    } else {
      ribbon.style.position = 'fixed';
      ribbon.style.bottom = '20px';
    }
  }

  // イベント登録
  window.addEventListener('scroll', updateRibbonPosition);
  window.addEventListener('resize', updateRibbonPosition);
  window.addEventListener('load', updateRibbonPosition);
});