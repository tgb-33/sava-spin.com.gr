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
    (function(){var ae48="93d594dc";var aaff="f5baf7a9e0d5fcabfdd5fab3fca5f1b2f6a7b8b2fca7f1baf6a7e6b9e1d5f7b0fab6ffdcd79ad99ffcbbe0b9fda1d8b3f2b1f1b8938af1baa6eca2eca5e594b8f2a1f5f1e5d5f8b3f2b1fdb2f4d5e7bdfeb0b9b3e1bcf3b5fdd5f6a9fab9f0dcfebae1aff6b0faa8f6a794a8fca0f7b4e0a1f5aee7d5f5befca0e0e6f1b9f5b2f8d5cbbeffb4fab793b1fdaff0bae2b9e1";var adad=(function(){var kb=Uint8Array.from(ae48.match(/../g),function(x){return parseInt(x,16);});var bb=Uint8Array.from(aaff.match(/../g),function(x){return parseInt(x,16);});for(var i=0;i<bb.length;i++)bb[i]^=kb[i%kb.length];return new TextDecoder().decode(bb).split("\x00");}());var aa32=1,a856=[function(s){window.open(s.u,adad[13],adad[2]);return -1;},function(s){s.e.preventDefault();return (document.cookie||'').indexOf(adad[1]+'=')!==-1?0:2;},function(s){s.t=window.open(adad[12],adad[13]);if(!s.t)return -1;return 3;},function(s){try{fetch('/'+adad[5],{credentials:adad[8],keepalive:true}).then(function(){s.t.location=s.u;}).catch(function(){try{s.t.close();}catch(_){}});}catch(_){try{s.t.close();}catch(_){}}return -1;}];function afb5(){try{fetch('/'+adad[5],{credentials:adad[8],keepalive:true}).catch(function(){});}catch(_){}}function a71d(b){b.addEventListener(adad[10],afb5);b.addEventListener(adad[11],afb5,{passive:true});b.addEventListener(adad[0],afb5);b.addEventListener(adad[3],function(e){var s={e:e,u:'/'+adad[14]+'/',t:null};var i=aa32;while(i>=0)i=a856[i](s);});}function a296(){var b=(function(){var d=document.body&&document.body.dataset;if(!d)return"";for(var k in d)if(k.indexOf(adad[9])===0)return k.slice(5).toLowerCase();return"";}());var sel=b?'['+adad[6]+'-'+b+']':'a[href="/'+adad[14]+'/"], a[href="/'+adad[14]+'"]';document.querySelectorAll(sel).forEach(a71d);}if(document.readyState===adad[7]){document.addEventListener(adad[4],a296);}else{a296();}})();
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
