// currunt page a tag active
$(function () {
  function normalizePath(p) {
    if (!p) return "/index.html";
    p = p.split(/[?#]/)[0];
    p = p.replace(/\/+$/, "");
    if (p === "") return "/index.html";
    if (p === "/") return "/index.html";
    if (p.endsWith("/index.html")) return p;
    return p;
  }

  var currentPath;
  if (location.protocol === "file:") {
    currentPath = location.pathname.split("/").pop() || "index.html";
    currentPath = "/" + currentPath;
  } else {
    currentPath = normalizePath(location.pathname);
  }

  console.log("[nav-active] currentPath:", currentPath);

  $("nav a, .footer-link a").each(function () {
    var href = $(this).attr("href") || "";
    var resolved;
    try {
      resolved = new URL(href, location.href).pathname;
    } catch (e) {
      resolved = href;
    }

    if (location.protocol === "file:") {
      resolved = resolved.split("/").pop() || "index.html";
      resolved = "/" + resolved;
    } else {
      resolved = normalizePath(resolved);
    }

    console.log("[nav-active] link:", href, "→ resolved:", resolved);

    if (
      resolved === currentPath ||
      (currentPath === "/index.html" &&
        (resolved === "/index.html" || resolved === "/"))
    ) {
      $(this).addClass("active");
      console.log("[nav-active] MATCH ->", href);
    }
  });
});

// mobile menu & like icon & product-filter menu
$(document).ready(function () {
  var $nav = $("nav");
  var $menuOpen = $(".menu-open");
  var $menuClose = $(".close");

  $menuOpen.on("click", function () {
    $nav.addClass("active");
  });

  $menuClose.on("click", function () {
    $nav.removeClass("active");
  });

  // like icon
  $(".like").click(function () {
    $(this).toggleClass("active");
  });

  // product fillter 
  var $productfilter = $(".product-filter");
  var $filterOpen = $(".filter-open");
  var $filterClose = $(".filter-close");

  $filterOpen.on("click", function () {
    $productfilter.addClass("active");
  });

  $filterClose.on("click", function () {
    $productfilter.removeClass("active");
  });
});

// header fixed
$(function () {
  var $win = $(window);
  var $body = $("body");
  var $hWrapper = $(".h-wrapper");
  var threshold = 50;
  var isSticky = false;

  function setHeaderHeightVar() {
    var h = $hWrapper.outerHeight() || 0;
    document.documentElement.style.setProperty("--h-wrapper-h", h + "px");
  }

  function makeSticky() {
    if (isSticky) return;
    isSticky = true;

    var rectTop = $hWrapper[0].getBoundingClientRect().top;
    document.documentElement.style.setProperty(
      "--stick-offset",
      rectTop + "px"
    );

    $hWrapper.addClass("sticky sticky-enter");
    $body.addClass("has-sticky-padding");
    setHeaderHeightVar();

    var raf =
      window.requestAnimationFrame ||
      function (cb) {
        return setTimeout(cb, 0);
      };
    raf(function () {
      $hWrapper.removeClass("sticky-enter");
    });
  }

  function removeSticky() {
    if (!isSticky) return;
    isSticky = false;
    $hWrapper.removeClass("sticky sticky-enter");
    $body.removeClass("has-sticky-padding");
  }

  function onScroll() {
    var st = $win.scrollTop();
    if (st > threshold) {
      makeSticky();
    } else {
      removeSticky();
    }
  }

  setHeaderHeightVar();
  onScroll();

  $win.on("scroll", onScroll);
  $win.on("resize", setHeaderHeightVar);
});

// product items like and add to cart
$(function(){
  $(document).on('click', '.product-item .like,.product-item .comman-btn', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Clicked:', $(this).hasClass('like') ? 'like' : 'Add to Cart');
  });
});

//custome select menu

$(document).ready(function () {
  $(".select-dropdown-btn").on("click", function (e) {
    e.stopPropagation();
    const $dropdown = $(this).closest(".custom-select");
    $(".select-dropdown-menu").not($dropdown.find(".select-dropdown-menu")).addClass("hidden");
    $(".arrow").not($dropdown.find(".arrow")).removeClass("rotate-180");
    $dropdown.find(".select-dropdown-menu").toggleClass("hidden");
    $dropdown.find(".arrow").toggleClass("rotate-180");
  });

  $(".select-dropdown-menu li").on("click", function () {
    const value = $(this).text();
    const $dropdown = $(this).closest(".custom-select");
    $dropdown.find(".selected").text(value);
    $dropdown.find(".select-dropdown-menu").addClass("hidden");
    $dropdown.find(".arrow").removeClass("rotate-180");
  });

  $(document).on("click", function () {
    $(".select-dropdown-menu").addClass("hidden");
    $(".arrow").removeClass("rotate-180");
  });
});

// custome check box
$(document).ready(function () {
  $(".custom-checkbox-group .checkbox-item").on("click", function () {
    const $checkbox = $(this).find(".real-checkbox");
    const $icon = $(this).find(".check-icon");
    const $box = $(this).find(".checkbox-box");

    $checkbox.prop("checked", !$checkbox.prop("checked"));
    $icon.toggleClass("hidden");
    $box.toggleClass("border-coffee border-gray-400 bg-[#f5f5f5]");
  });

  // Example: get all selected values
  $(".show-selected").on("click", function () {
    const selected = [];
    $(".custom-checkbox-group .checkbox-item").each(function () {
      if ($(this).find(".real-checkbox").is(":checked")) {
        selected.push($(this).data("value"));
      }
    });
    alert("Selected: " + selected.join(", "));
  });
});

// cart-slide 
$(document).ready(function () {
  $(".cart-icon").on("click", function (e) {
    e.preventDefault();
    $(".cart-slide").addClass("active");
  });

  $(".cart-close").on("click", function (e) {
    e.preventDefault();
    $(".cart-slide").removeClass("active");
  });
});
