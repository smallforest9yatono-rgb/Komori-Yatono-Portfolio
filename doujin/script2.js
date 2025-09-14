// モーダル開閉
const modal = document.getElementById("modal");
const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("close");

if(hamburger && modal && closeBtn){
  hamburger.addEventListener("click", () => modal.classList.add("open"));
  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", (e) => {
      modal.classList.remove("open");
      if(link.href.includes("note.com")) return;

      const href = link.getAttribute("href");
      if(href.startsWith("#")){
        e.preventDefault();
        const targetEl = document.getElementById(href.slice(1));
        if(targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
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
    if(targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
  });
});

// ガードロープ（リボン）がフッター手前で止まる処理
const ribbon = document.querySelector('.ribbon-bottom');
const footer = document.querySelector('footer');

function updateRibbonPosition() {
  const footerTop = footer.getBoundingClientRect().top;  // フッターの位置
  const ribbonHeight = ribbon.offsetHeight;  // ガードロープの高さ
  const windowHeight = window.innerHeight;

  // ガードロープがフッターの前に来たら位置を調整
  if (footerTop < windowHeight + ribbonHeight) {
    // フッター手前で止まるように
    ribbon.style.position = 'absolute';
    ribbon.style.bottom = `${windowHeight - footerTop + 20}px`;
  } else {
    // 通常の固定位置
    ribbon.style.position = 'fixed';
    ribbon.style.bottom = '20px';  // 常に画面下部に固定
  }
}

// スクロールやリサイズ時に位置を調整
window.addEventListener('scroll', updateRibbonPosition);
window.addEventListener('resize', updateRibbonPosition);
window.addEventListener('load', updateRibbonPosition);

