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
window.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  const ribbon = document.querySelector(".ribbon-bottom");
  const footerTop = footer.offsetTop;
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  if (scrollY + windowHeight >= footerTop) {
    ribbon.style.position = "absolute";
    ribbon.style.bottom = `${footer.offsetHeight}px`;  // フッター直前で停止
  } else {
    ribbon.style.position = "fixed";
    ribbon.style.bottom = "20px";  // 固定位置に戻す
  }
});

