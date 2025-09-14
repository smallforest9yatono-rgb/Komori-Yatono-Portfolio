document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("modal");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("close");
  const ribbon = document.querySelector('.ribbon-bottom');
  const footer = document.querySelector('footer');
  const doujinSection = document.querySelector('#doujin'); // 任意のセクション

  // ribbon や footer が存在しない場合は処理を終了
  if (!ribbon || !footer) return;

  // モバイルメニューの開閉
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
    const footerRect = footer.getBoundingClientRect();

    let bottomOffset = 20; // デフォルトの画面下からの距離

    // doujinSection が存在する場合のみ計算
    if (doujinSection) {
      const doujinRect = doujinSection.getBoundingClientRect();
      if (doujinRect.top <= windowHeight - ribbonHeight && doujinRect.bottom > 0) {
        bottomOffset = windowHeight - doujinRect.bottom + 20; // 余白20px
      }
    }

    // フッターに被る場合
    const footerOverlap = windowHeight - footerRect.top;
    if (footerOverlap > 0) {
      bottomOffset = footerOverlap + 20; // 余白20px
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