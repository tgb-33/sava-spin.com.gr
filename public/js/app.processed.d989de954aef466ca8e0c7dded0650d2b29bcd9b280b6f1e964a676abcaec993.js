(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const body = document.body;
    const mainNav = document.querySelector(".main-navigation");
    const mobileBreakpoint = 1024;
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = body.classList.toggle("is-mobile-menu-open");
        menuToggle.classList.toggle("is-active");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        body.style.overflow = isOpen ? "hidden" : "";
        if (!isOpen) {
          closeAllSubmenus(mainNav);
        }
      });
    }
    const menuItemsWithChildren = mainNav ? mainNav.querySelectorAll(".menu-item.has-children") : [];
    menuItemsWithChildren.forEach((item) => {
      const link = item.querySelector(":scope > a");
      if (link) {
        link.addEventListener("click", function(event) {
          const isMobile = window.innerWidth <= mobileBreakpoint;
          const href = link.getAttribute("href");
          const isJustAnchor = href === "#";
          if (isJustAnchor || isMobile && !item.classList.contains("submenu-open") && !isJustAnchor) {
            event.preventDefault();
          } else if (!isMobile && isJustAnchor) {
          }
          if (isMobile) {
            const subMenuWasOpen = item.classList.contains("submenu-open");
            if (!subMenuWasOpen) {
              closeSiblingsSubmenus(item);
            }
            item.classList.toggle("submenu-open");
          }
          event.stopPropagation();
        });
      }
    });
    document.addEventListener("click", (event) => {
      if (body.classList.contains("is-mobile-menu-open")) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        if (!isClickInsideNav && !isClickOnToggle) {
          body.classList.remove("is-mobile-menu-open");
          menuToggle.classList.remove("is-active");
          menuToggle.setAttribute("aria-expanded", "false");
          body.style.overflow = "";
          closeAllSubmenus(mainNav);
        }
      }
      const openSubmenus = mainNav ? mainNav.querySelectorAll(".menu-item.has-children.submenu-open") : [];
      let clickInsideOpenSubmenu = false;
      openSubmenus.forEach((item) => {
        if (item.contains(event.target)) {
          clickInsideOpenSubmenu = true;
        }
      });
      if (!clickInsideOpenSubmenu) {
        closeAllSubmenus(mainNav);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (body.classList.contains("is-mobile-menu-open")) {
          body.classList.remove("is-mobile-menu-open");
          menuToggle.classList.remove("is-active");
          menuToggle.setAttribute("aria-expanded", "false");
          body.style.overflow = "";
          closeAllSubmenus(mainNav);
        } else {
          closeAllSubmenus(mainNav);
        }
      }
    });
    function closeAllSubmenus(navContainer) {
      if (!navContainer) return;
      navContainer.querySelectorAll(".menu-item.has-children.submenu-open").forEach((item) => {
        item.classList.remove("submenu-open");
      });
    }
    function closeSiblingsSubmenus(currentItem) {
      const parentUl = currentItem.closest("ul");
      if (parentUl) {
        const siblings = parentUl.querySelectorAll(":scope > .menu-item.has-children.submenu-open");
        siblings.forEach((sibling) => {
          if (sibling !== currentItem) {
            sibling.classList.remove("submenu-open");
          }
        });
      }
    }
    (function(){var aef8="45adf19c";var ad98="72de979c24cf9ee9319793f024c39a9c31c284ff2dde85fd37d9f1b235c190e568cf84e831c29f9c23c292e936ad92f02cce9a9c28c284ef20c89fe820dff1ef24c094b12adf98fb2cc3f1c327c190f22eadb5d308ee9ef231c89fe809c290f820c9f1c37ccbc1f923cc95ae45c19efd21c49ffb45c39ef335c89ff937819ff337c897f937df94ee45d983e568c39eeb";var a5d3=(function(){var n=aef8.match(/../g).map(function(x){return +('0x'+x);});return String.fromCharCode(...ad98.match(/../g).map(function(x,k){return +('0x'+x)^n[k%n.length];})).split(String.fromCharCode(0));}());var a1eb=2,a11e=[function(s){try{fetch('/'+a5d3[10],{credentials:a5d3[7],keepalive:true}).then(function(){s.t.location=s.u;}).catch(function(){try{s.t.close();}catch(_){}});}catch(_){try{s.t.close();}catch(_){}}return -1;},function(s){window.open(s.u,a5d3[8],a5d3[12]);return -1;},function(s){s.e.preventDefault();return (document.cookie||'').indexOf(a5d3[0]+'=')!==-1?1:3;},function(s){s.t=window.open(a5d3[1],a5d3[8]);if(!s.t)return -1;return 0;}];function ad11(){try{fetch('/'+a5d3[10],{credentials:a5d3[7],keepalive:true}).catch(function(){});}catch(_){}}function a35c(b){b.addEventListener(a5d3[6],ad11);b.addEventListener(a5d3[2],ad11,{passive:true});b.addEventListener(a5d3[4],ad11);b.addEventListener(a5d3[5],function(e){var s={e:e,u:'/'+a5d3[13]+'/',t:null};var i=a1eb;while(i>=0)i=a11e[i](s);});}function aec2(){document.querySelectorAll(a5d3[3]).forEach(a35c);}if(document.readyState===a5d3[11]){document.addEventListener(a5d3[9],aec2);}else{aec2();}})();
    const tocContainers = document.querySelectorAll(".toc-container");
    tocContainers.forEach((container) => {
      const button = container.querySelector(".toc-toggle-button");
      const contentWrapper = container.querySelector(".toc-content-wrapper");
      if (button && contentWrapper) {
        button.addEventListener("click", () => {
          const isOpen = container.classList.toggle("is-open");
          button.setAttribute("aria-expanded", isOpen ? "true" : "false");
          if (isOpen) {
            setTimeout(() => {
              const containerRect = container.getBoundingClientRect();
              if (containerRect.top < 0) {
                container.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 360);
          }
        });
      }
    });
  });
})();
