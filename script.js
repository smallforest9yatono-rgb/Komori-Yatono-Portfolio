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
const snsSection = document.querySelector('#SNS');  // SNSセクションの要素



function updateRibbonPosition() {
  if (!ribbon || !footer || !snsSection) return;

  const footerRect = footer.getBoundingClientRect();
  const snsRect = snsSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const ribbonHeight = ribbon.offsetHeight;

  // SNSセクションの下にいる場合の位置
  const snsBottomToWindowBottom = windowHeight - (snsRect.top + snsRect.height);

  // フッターが画面に入ってる高さ
  const footerOverlap = windowHeight - footerRect.top;

  // ribbon を固定位置に設定
  ribbon.style.position = 'fixed';

  // SNSセクションの下に移動
  let bottomOffset = 50; // デフォルトの画面下からの距離

  if (snsBottomToWindowBottom < 50) {
    bottomOffset = snsBottomToWindowBottom + 20; // 余白 20px
  }

  // フッターに被る場合は優先して上げる
  if (footerOverlap > 0) {
    bottomOffset = footerOverlap + 20; // 余白 20px
  }

  ribbon.style.bottom = `${bottomOffset}px`;
}

// スクロールやリサイズ、ロード時に呼び出し
window.addEventListener('scroll', updateRibbonPosition);
window.addEventListener('resize', updateRibbonPosition);
window.addEventListener('load', updateRibbonPosition);



