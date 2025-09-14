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
  const lastSectionTop = lastSection.getBoundingClientRect().top;  // 最後のセクションの位置
  const lastSectionHeight = lastSection.offsetHeight;  // 最後のセクションの高さ

  // フッターが画面の下に近づくとガードロープを調整
  if (lastSectionTop + lastSectionHeight <= windowHeight && footerTop > ribbonHeight) {
    // 最後のセクションとフッターの間でガードロープが動くように
    ribbon.style.position = 'absolute'; // absolute に変更
    ribbon.style.bottom = `${windowHeight - footerTop + 20}px`; // フッター手前で調整
  } else {
    // 通常の位置で画面下に固定
    ribbon.style.position = 'fixed';  // position: fixed のままで
    ribbon.style.bottom = '20px';  // 画面の下部に固定
  }
}

// スクロールやリサイズの際に位置を更新
window.addEventListener('scroll', updateRibbonPosition);
window.addEventListener('resize', updateRibbonPosition);
window.addEventListener('load', updateRibbonPosition);



