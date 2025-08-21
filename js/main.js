$(function () {
  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  $(".toggle-btn").on("click", function () {
    $("header").toggleClass("open");
  });
  $("nav a").on("click", function () {
    $("header").toggleClass("open");
  });

  // fadeinスクロールアニメーション
  $(window).scroll(function () {
    $("section").not(".sub-content").each(function () {
      let scroll = $(window).scrollTop();
      let target = $(this).offset().top;
      let windowHeight = $(window).height();
      if (scroll > target - windowHeight + 100) {
        $(this).css({ opacity: 1, transform: "translateY(0)" });
      }
    });
  });

  function revealSubContent() {
    $(".sub-content").css({ opacity: 1, transform: "translateY(0)" });
  }
  $(document).ready(revealSubContent);
  $(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) revealSubContent();
  });

  /*=================================================
  ローディング
  ===================================================*/
  
  const loader = $(".loader");
  const img = $(".loader img");
  const txt = $(".loader .txt");

  function splitTextToSpans() {
    const textContent = txt.text();
    txt.text(""); // クリア
    textContent.split("").forEach((char, i) => {
      const span = $("<span>").text(char);
      if (char === " ") {
        span.addClass("space");
      } else {
        span.css("animation-delay", (i * 0.1) + "s");
      }
      txt.append(span);
    });
  }

  function startLoader() {
    txt.hide();
    img.hide();
    splitTextToSpans();

    img.fadeIn(400, function () {
      txt.fadeIn(400, function () {
        // 文字アニメーションが終わったらローダーをフェードアウト
        setTimeout(() => {
          loader.fadeOut(800, function () {
            $(".mainvisual").fadeIn(800); // ローディング終了後に mainvisual 表示
          });
        }, 2000); // 文字アニメーション表示時間
      });
    });
  }

  // 2回目以降はローディングをスキップ
  if (!sessionStorage.getItem("access")) {
    sessionStorage.setItem("access", "true");

    // 画像読み込みが完了したら開始
    img.on("load", function () {
      startLoader();
    });

    // 万が一 load イベントが発火しない場合の保険（キャッシュなど）
    if (img[0].complete) {
      startLoader();
    }
  } else {
    loader.remove();
    $(".mainvisual").show();
  }

  /*=================================================
  スライダー
  ===================================================*/
  $(".slick-img").slick({
    arrows: false,
    centerMode: true,
    centerPadding: "120px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 700,
        settings: { centerPadding: "50px", slidesToShow: 1 },
      },
    ],
  });
});
