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
  const footerTop = footer.getBoundingClientRect().top;
  const ribbonHeight = ribbon.offsetHeight;  // ribbonの高さ
  const windowHeight = window.innerHeight;

  // フッター手前で止める
  if (footerTop < windowHeight + ribbonHeight) {
    ribbon.style.position = 'absolute';
    ribbon.style.bottom = `${windowHeight - footerTop + 20}px`;
  } else {
    ribbon.style.position = 'fixed';
    ribbon.style.bottom = '20px';  // 固定
  }
}

window.addEventListener('scroll', updateRibbonPosition);
window.addEventListener('resize', updateRibbonPosition);
window.addEventListener('load', updateRibbonPosition);

