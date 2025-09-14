document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("modal");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("close");
  const ribbon = document.querySelector('.ribbon-bottom');  // ガードロープの要素

  // ribbonが存在しない場合のエラーを防ぐ
  if (!ribbon) return;

  if (hamburger && modal && closeBtn) {
    hamburger.addEventListener("click", () => {
      modal.classList.add("open");
      ribbon.style.display = 'none'; // モーダルが開いた時にガードロープを非表示
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      ribbon.style.display = 'block'; // モーダルが閉じた時にガードロープを再表示
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", (e) => {
        modal.classList.remove("open");
        ribbon.style.display = 'block'; // モーダルが閉じた時にガードロープを再表示
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
});

// ガードロープ（リボン）がフッター手前で止まる処理
const ribbon = document.querySelector('.ribbon-bottom');
const footer = document.querySelector('footer');
const doujinSection = document.querySelector('#doujin');  // Doujinセクションの要素

function updateRibbonPosition() {
  const footerTop = footer.getBoundingClientRect().top;  // フッターの位置
  const ribbonHeight = ribbon.offsetHeight;  // ガードロープの高さ
  const windowHeight = window.innerHeight;
  const doujinTop = doujinSection.getBoundingClientRect().top; // Doujinセクションの位置
  const doujinHeight = doujinSection.offsetHeight; // Doujinセクションの高さ

  // SNSセクションの下部とフッターの間でガードロープを動かす
  if (goodsTop + goodsHeight <= windowHeight && footerTop > ribbonHeight) {

  //セクション内で止まるように位置を調整
    ribbon.style.position = 'fixed';  // absolute に変更
    ribbon.style.bottom = `${windowHeight - (goodsTop + goodsHeight) + 20}px`;  // Doujinセクションの下に固定
  } 
  
  else {
    // 通常の位置で画面下に固定
    ribbon.style.position = 'fixed';  // position: fixed のままで
    ribbon.style.bottom = '50px';  // 画面下部から50pxの位置に固定
  }

  /* // Doujinセクション内でガードロープが動く
  if (doujinTop <= windowHeight - ribbonHeight && doujinTop + doujinHeight > 0) {
    // Doujinセクション内で止まるように位置を調整
    ribbon.style.position = 'fixed';  // absolute に変更
    ribbon.style.bottom = `${windowHeight - (doujinTop + doujinHeight) + 20}px`;  // Doujinセクションの下に固定
  } else if (footerTop < windowHeight + ribbonHeight) {
    // フッター直前で止まる
    ribbon.style.position = 'fixed';
    ribbon.style.bottom = `${windowHeight - footerTop + 20}px`;
  } else {
    // 通常の位置で画面下に固定
    ribbon.style.position = 'fixed';  // position: fixed のままで
    ribbon.style.bottom = '20px';  // 画面下部に固定
  } */
}

// スクロールやリサイズの際に位置を更新
window.addEventListener('scroll', updateRibbonPosition);
window.addEventListener('resize', updateRibbonPosition);
window.addEventListener('load', updateRibbonPosition);




