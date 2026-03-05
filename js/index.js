// ハンバーガーボタンとドロワー
$("#js-button-drawer").on("click", function() {
  $(this).toggleClass("is-checked");
  $("#js-drawer").slideToggle();
  $("body").toggleClass("is-fixed");
});
// jQueryを書いた後、CSSを追加します。
// 初期画面でドロワーが閉じている状態にする。
// bodyにis-fixedクラスを付与して、overflow:hidden;でスクロールを固定する。
// ボタンにis-checkedクラスを付与して、ボタンの見た目を変える。background:url(閉じるアイコン); center center no-repeat;とbackground-size: 100% auto;を指定します。
// もう一度押されたら、ドロワーがスライドアップして閉じます。

// スクロールでヘッダーの背景を変える
const header = document.querySelector('.header');
const drawerBtn = document.getElementById("js-button-drawer");
const drawerNav = document.getElementById("js-drawer");

// スクロールで不透明
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
});

// ハンバーガー開閉で不透明
drawerBtn.addEventListener("click", () => {
  drawerNav.classList.toggle("is-open");
  header.classList.toggle("is-open");
});

// ▼ドロワー内リンク（#aboutなど）をクリックしたら：SPだけ閉じる → スクロール
$("#js-drawer").on("click", 'a[href^="#"]', function (e) {
  const href = $(this).attr("href");     // "#about" など
  const $target = $(href);
  if (!$target.length) return;

  e.preventDefault();

  const isMobile = window.matchMedia("(max-width: 1023px)").matches; // ←ここが肝
  const headerH = $(".header").outerHeight() || 0;
  const top = $target.offset().top - headerH;

  // SP/タブレット（ドロワー運用）の時だけ閉じる
  if (isMobile) {
    $("#js-drawer").slideUp();
    $("#js-button-drawer").removeClass("is-checked");
    $("body").removeClass("is-fixed");

    // 見た目用クラスも解除（あなたの既存仕様に合わせる）
    document.querySelector(".header")?.classList.remove("is-open");
    document.getElementById("js-drawer")?.classList.remove("is-open");
  }

  // スクロール（PCでも動く）
  $("html, body").animate({ scrollTop: top }, 500);
});