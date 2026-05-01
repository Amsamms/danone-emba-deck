// Slide-specific animations and interactions.
// Reveal.js fires 'slidechanged' — we route to the right initializer based on the slide's data-slide id.

document.addEventListener("DOMContentLoaded", () => {
  // Initialize reveal
  const deck = new Reveal({
    hash: true,
    slideNumber: "c/t",
    transition: "slide",
    backgroundTransition: "fade",
    width: 1600,
    height: 900,
    margin: 0.04,
    controls: true,
    progress: true,
    overview: true,
    center: false,
    plugins: [ RevealNotes ],
  });
  // Expose for init functions that need to re-trigger layout after async content loads.
  window.__deck = deck;

  deck.initialize().then(() => {
    initParticles();
    onSlideChange();              // first slide
    deck.on("slidechanged", onSlideChange);
    // Also re-init on fragmentshown for sub-animations
    deck.on("fragmentshown", () => onSlideChange(true));

    // Recompute Reveal vertical-centering whenever fonts finish loading or
    // window/viewport metrics change. Without this, a slide whose content
    // height changes after the initial layout (e.g. JS-injected refs, async
    // SVG, font swap) ends up pinned with empty space above/below it.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => deck.layout());
    }
    window.addEventListener("load", () => deck.layout());
  });

  function onSlideChange() {
    const slide = document.querySelector(".reveal .slides section.present");
    if (!slide) return;
    const id = slide.dataset.slide;
    if (!id) return;

    // Universal entrance animation: stagger in direct children of the slide
    gsap.set(slide.children, { clearProps: "all" });
    gsap.fromTo(slide.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.04, ease: "power2.out", delay: 0.1 }
    );

    // Update progress bar
    const deck = window.__deck;
    if (deck) {
      const pbar = document.querySelector("#progress-bar span");
      if (pbar) {
        const idx = deck.getIndices();
        const total = deck.getTotalSlides();
        pbar.style.width = ((idx.h + 1) / total * 100) + "%";
      }
    }

    const fn = window["init_" + id];
    if (typeof fn === "function") {
      try { fn(slide); } catch (e) { console.error("Slide init error:", id, e); }
    }
    // Slide-init functions populate DOM (often async). Recompute Reveal's
    // per-slide top offset across a few frames so vertical centering tracks
    // the real content height instead of the stale initial measurement.
    [50, 200, 600, 1500].forEach(t => setTimeout(() => {
      try { window.__deck && window.__deck.layout(); } catch (_) {}
    }, t));

    // Observe the active slide for any size change (image decode, late font
    // swap, animation completion) and re-center on the fly.
    if (window.__sectionObserver) window.__sectionObserver.disconnect();
    if ("ResizeObserver" in window) {
      window.__sectionObserver = new ResizeObserver(() => {
        try { window.__deck && window.__deck.layout(); } catch (_) {}
      });
      window.__sectionObserver.observe(slide);
    }
  }
});

// =============== Particles backdrop ===============
function initParticles() {
  if (!window.tsParticles) return;
  tsParticles.load({
    id: "tsparticles",
    options: {
      fullScreen: { enable: false, zIndex: 0 },
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        number: { value: 100, density: { enable: true, area: 800 } },
        color: { value: ["#00bfff", "#003da5", "#ffffff", "#2ecc71"] },
        opacity: { value: { min: 0.06, max: 0.5 } },
        size: { value: { min: 1, max: 4 } },
        move: {
          enable: true, speed: 0.5, direction: "none",
          outModes: "out", random: true, bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 }
        },
        links: {
          enable: true, distance: 140, color: "#00bfff",
          opacity: 0.15, width: 1, triangles: { enable: true, opacity: 0.04 }
        },
        twinkle: { particles: { enable: true, frequency: 0.05, opacity: 0.6 } },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
      detectRetina: true,
    },
  });
}

// =============== Helper: counter animation ===============
function countTo(el, value, suffix = "", duration = 1.6, decimals = 0) {
  const obj = { v: 0 };
  gsap.to(obj, {
    v: value, duration, ease: "power2.out",
    onUpdate: () => {
      el.textContent = obj.v.toFixed(decimals) + suffix;
    }
  });
}

// =============== SLIDE: title ===============
window.init_title = (slide) => {
  gsap.fromTo(slide.querySelector(".title-mark"),
    { opacity: 0, y: 50, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" });
  gsap.from(slide.querySelectorAll(".title-tagline, .title-subtitle"),
    { opacity: 0, y: 20, duration: 0.9, delay: 0.6, stagger: 0.2 });
  gsap.from(slide.querySelectorAll(".title-team .pill"),
    { opacity: 0, y: 20, duration: 0.7, delay: 1.1, stagger: 0.15, ease: "back.out(1.7)" });
};

// =============== SLIDE: roadmap ===============
window.init_roadmap = (slide) => {
  gsap.from(slide.querySelectorAll(".roadmap .glass"),
    { opacity: 0, y: 30, duration: 0.6, stagger: 0.08 });
};

// =============== SLIDE: founding ===============
window.init_founding = (slide) => {
  gsap.from(slide.querySelectorAll(".founding-step"),
    { opacity: 0, x: -40, duration: 0.7, stagger: 0.2, ease: "power2.out" });
};

// =============== SLIDE: groupstats ===============
window.init_groupstats = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const grid = slide.querySelector(".stat-grid");
  grid.innerHTML = "";
  D.groupStats.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "glass";
    card.innerHTML = `
      <div class="bignum" data-target="${s.value}" data-suffix="${s.suffix}">0</div>
      <div class="bignum-label">${s.label}</div>
      <div style="margin-top:0.4em"><span class="cite-badge">${s.cite}</span></div>
    `;
    grid.appendChild(card);
  });
  gsap.from(grid.children, { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: "power2.out",
    onComplete: () => {
      grid.querySelectorAll(".bignum").forEach(el => {
        const target = parseFloat(el.dataset.target);
        const decimals = (target % 1 !== 0) ? 1 : 0;
        countTo(el, target, el.dataset.suffix, 1.4, decimals);
      });
    }
  });
};

// =============== SLIDE: segments donut ===============
window.init_segments = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const stage = slide.querySelector("#segments-donut");
  const w = 360, h = 360, r = 160;
  const svg = d3.select(stage).append("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("width", "100%").attr("height", "100%");
  const g = svg.append("g").attr("transform", `translate(${w/2},${h/2})`);
  const pie = d3.pie().value(d => d.value).sort(null);
  const arc = d3.arc().innerRadius(r*0.55).outerRadius(r);
  const data = D.segments;
  const total = data.reduce((a,b) => a + b.value, 0);

  const arcs = g.selectAll("path").data(pie(data)).enter().append("path")
    .attr("fill", d => d.data.color)
    .attr("stroke", "#0a1429").attr("stroke-width", 3);

  arcs.transition().duration(1100).attrTween("d", function(d) {
    const i = d3.interpolate({startAngle: 0, endAngle: 0}, d);
    return t => arc(i(t));
  });

  // Center label
  g.append("text").attr("text-anchor", "middle").attr("dy", "-0.2em")
    .attr("fill", "#00bfff").attr("font-size", 32).attr("font-weight", 800)
    .text("€27.4B");
  g.append("text").attr("text-anchor", "middle").attr("dy", "1.4em")
    .attr("fill", "#8b95a8").attr("font-size", 13).attr("letter-spacing", 2)
    .text("FY-2024 REVENUE");

  // Legend
  const legend = slide.querySelector(".segments-legend");
  legend.innerHTML = data.map(d => `
    <div style="display:flex;align-items:center;gap:0.6em;margin:0.6em 0;">
      <div style="width:18px;height:18px;border-radius:4px;background:${d.color};"></div>
      <div>
        <div style="font-weight:600;color:white;font-size:0.7em">${d.name}</div>
        <div style="color:#8b95a8;font-size:0.55em">€${d.value.toFixed(2)}B · ${(d.value/total*100).toFixed(0)}% <span class="cite-badge">${d.cite}</span></div>
      </div>
    </div>
  `).join("");
};

// =============== SLIDE: timeline (Renew Danone) ===============
window.init_timeline = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const tl = slide.querySelector(".timeline");
  tl.innerHTML = D.renewTimeline.map(e => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-year">${e.year}</div>
      <div class="tl-title">${e.title}</div>
      <div class="tl-desc">${e.desc}</div>
      <div style="margin-top:0.3em"><span class="cite-badge">${e.cite}</span></div>
    </div>
  `).join("");
  gsap.from(tl.children, { opacity: 0, y: 20, duration: 0.5, stagger: 0.12 });
};

// =============== SLIDE: bcorp ===============
window.init_bcorp = (slide) => {
  gsap.from(slide.querySelector(".bcorp-mark"),
    { scale: 0, opacity: 0, duration: 1.2, ease: "back.out(1.7)" });
  gsap.from(slide.querySelectorAll(".bcorp-fact"),
    { opacity: 0, y: 30, duration: 0.7, stagger: 0.15, delay: 0.5 });
};

// =============== SLIDE: vision ===============
window.init_vision = (slide) => {
  gsap.from(slide.querySelectorAll(".vision-row"),
    { opacity: 0, x: -40, duration: 0.7, stagger: 0.18 });
};

// =============== SLIDE: divider ===============
window.init_divider = (slide) => {
  gsap.fromTo(slide.querySelector("h1"),
    { opacity: 0, scale: 0.85, letterSpacing: "0.4em" },
    { opacity: 1, scale: 1, letterSpacing: "-0.02em", duration: 1.2, ease: "expo.out" });
  gsap.from(slide.querySelector(".eyebrow"),
    { opacity: 0, y: -10, duration: 0.7 });
};

// =============== SLIDE: egypt-overview ===============
window.init_egyptOverview = (slide) => {
  gsap.from(slide.querySelectorAll(".eo-card"),
    { opacity: 0, y: 30, duration: 0.6, stagger: 0.12 });
  gsap.from(slide.querySelectorAll(".brand-pill"),
    { opacity: 0, scale: 0, duration: 0.4, stagger: 0.05, delay: 0.5, ease: "back.out(1.7)" });
};

// =============== SLIDE: market-context ===============
window.init_market = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const els = slide.querySelectorAll(".market-num");
  els.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const dec = parseInt(el.dataset.decimals || "0");
    countTo(el, target, el.dataset.suffix || "", 1.6, dec);
  });
};

// =============== SLIDE: egypt-map ===============
window.init_egyptMap = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const stage = slide.querySelector(".egypt-stage");
  const svg = d3.select("#egypt-svg");
  const tooltip = d3.select(slide).select(".egypt-tooltip");
  const w = stage.clientWidth, h = stage.clientHeight;
  svg.attr("viewBox", `0 0 ${w} ${h}`);

  const data = D.egyptGeoJSON;
  const projection = d3.geoMercator().fitSize([w, h], data);
  const path = d3.geoPath().projection(projection);

  svg.append("path").datum(data.features[0])
    .attr("d", path)
    .attr("fill", "rgba(0,189,255,0.08)")
    .attr("stroke", "#00bfff").attr("stroke-width", 1.5)
    .attr("stroke-dasharray", "1500")
    .attr("stroke-dashoffset", "1500")
    .transition().duration(1800).ease(d3.easeCubic)
    .attr("stroke-dashoffset", 0);

  // Markers
  const g = svg.append("g");
  D.egyptCities.forEach((c, i) => {
    const [x, y] = projection([c.lng, c.lat]);
    const grp = g.append("g").attr("transform", `translate(${x},${y})`).style("opacity", 0);

    grp.append("circle").attr("r", c.primary ? 0 : 0)
      .attr("class", "egypt-marker")
      .transition().delay(1500 + i*180).duration(500)
      .attr("r", c.primary ? 11 : 7);

    grp.append("text").attr("class", "egypt-label")
      .attr("x", c.dx ?? 14).attr("y", c.dy ?? 5)
      .attr("text-anchor", c.anchor || "start")
      .text(c.name)
      .style("opacity", 0)
      .transition().delay(1700 + i*180).duration(500)
      .style("opacity", 1);

    grp.transition().delay(1500 + i*180).style("opacity", 1);

    grp.on("mouseenter", () => {
      tooltip.style("opacity", 1)
        .style("left", (x + 20) + "px").style("top", (y + 30) + "px")
        .html(`<b>${c.name}</b><br>${c.desc}<br><span class="cite-badge">${c.cite}</span>`);
    }).on("mouseleave", () => tooltip.style("opacity", 0));
  });
};

// =============== SLIDE: egp ===============
window.init_egp = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const stage = slide.querySelector("#egp-chart");
  const w = stage.clientWidth, h = stage.clientHeight;
  const margin = { top: 30, right: 60, bottom: 50, left: 60 };
  const innerW = w - margin.left - margin.right;
  const innerH = h - margin.top - margin.bottom;

  const svg = d3.select(stage).append("svg")
    .attr("viewBox", `0 0 ${w} ${h}`).attr("width", "100%").attr("height", "100%");
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const data = D.egpTimeline.map(d => ({ d: new Date(d.d), v: d.v }));
  const x = d3.scaleTime().domain(d3.extent(data, d => d.d)).range([0, innerW]);
  const y = d3.scaleLinear().domain([10, 55]).range([innerH, 0]);

  // Axes
  g.append("g").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%Y")))
    .selectAll("text").attr("fill", "#8b95a8").style("font-size", "13px");
  g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat(d => "EGP " + d))
    .selectAll("text").attr("fill", "#8b95a8").style("font-size", "13px");
  g.selectAll(".domain").attr("stroke", "#444");
  g.selectAll(".tick line").attr("stroke", "#333");

  // Gridlines
  g.append("g").attr("class", "grid")
    .call(d3.axisLeft(y).ticks(6).tickSize(-innerW).tickFormat(""))
    .selectAll("line").attr("stroke", "rgba(255,255,255,0.06)");

  // The crash zone
  g.append("rect")
    .attr("x", x(new Date("2024-03-05"))).attr("y", 0)
    .attr("width", x(new Date("2024-04-05")) - x(new Date("2024-03-05")))
    .attr("height", innerH)
    .attr("fill", "rgba(231,76,60,0.18)")
    .attr("stroke", "rgba(231,76,60,0.5)")
    .attr("stroke-dasharray", "4,4");

  g.append("text")
    .attr("x", x(new Date("2024-03-06"))).attr("y", 30)
    .attr("fill", "#e74c3c").attr("font-weight", 700).attr("font-size", 14)
    .text("Mar 6, 2024 — 3rd flotation");

  // The line
  const line = d3.line().x(d => x(d.d)).y(d => y(d.v)).curve(d3.curveMonotoneX);
  const pathEl = g.append("path").datum(data)
    .attr("fill", "none").attr("stroke", "#00bfff").attr("stroke-width", 3.5)
    .attr("d", line);
  const totalLen = pathEl.node().getTotalLength();
  pathEl.attr("stroke-dasharray", totalLen)
    .attr("stroke-dashoffset", totalLen)
    .transition().duration(2200).ease(d3.easeCubicInOut)
    .attr("stroke-dashoffset", 0);

  // Dots
  g.selectAll("circle").data(data).enter().append("circle")
    .attr("cx", d => x(d.d)).attr("cy", d => y(d.v))
    .attr("r", 0).attr("fill", "#00bfff")
    .transition().delay((d, i) => 200 + i*150).duration(400).attr("r", 5);

  // Animated counters in overlay
  const fxEls = slide.querySelectorAll(".egp-stat .v");
  fxEls.forEach(el => {
    const t = parseFloat(el.dataset.target);
    const dec = parseInt(el.dataset.decimals || "0");
    countTo(el, t, el.dataset.suffix || "", 2, dec);
  });
};

// =============== SLIDE: comp (competitor bars) ===============
window.init_comp = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const stage = slide.querySelector(".comp-bars");
  stage.innerHTML = D.competitors.map(c => `
    <div class="comp-bar-row">
      <div style="font-size:0.65em;font-weight:600;color:white">${c.name}</div>
      <div class="comp-bar-track"><div class="comp-bar-fill ${c.color}" data-w="${c.share}"></div></div>
      <div style="font-size:0.55em;color:#8b95a8">${c.label} <span class="cite-badge">${c.cite}</span></div>
    </div>
  `).join("");
  setTimeout(() => {
    stage.querySelectorAll(".comp-bar-fill").forEach((el, i) => {
      setTimeout(() => { el.style.width = el.dataset.w + "%"; }, 120 * i);
    });
  }, 200);
};

// =============== SLIDE: swot ===============
window.init_swot = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const map = { s: "Strengths · Internal", w: "Weaknesses · Internal", o: "Opportunities · External", t: "Threats · External" };
  ["s","w","o","t"].forEach(k => {
    const cell = slide.querySelector(".swot-cell." + k);
    cell.querySelector("h3").innerHTML = map[k];
    const ul = cell.querySelector("ul");
    ul.innerHTML = D.swot[k].map(item =>
      `<li>${item.t} <span class="cite">${item.c}</span></li>`).join("");
    cell.addEventListener("click", () => {
      cell.classList.toggle("expanded");
      gsap.fromTo(cell, { scale: 1 }, { scale: 1.02, yoyo: true, repeat: 1, duration: 0.25 });
    });
  });
  gsap.from(slide.querySelectorAll(".swot-cell"),
    { opacity: 0, scale: 0.85, duration: 0.6, stagger: 0.08, ease: "back.out(1.4)" });
};

// =============== SLIDE: outsidein (marketing concept) ===============
window.init_outsidein = (slide) => {
  gsap.from(slide.querySelectorAll(".io-box"),
    { opacity: 0, x: -40, duration: 0.7, stagger: 0.3 });
  gsap.fromTo(slide.querySelector(".io-arrow"),
    { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.5,
      ease: "power2.out", repeat: -1, yoyo: true });
};

// =============== SLIDE: pyramid (segmentation) ===============
window.init_pyramid = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const wrap = slide.querySelector(".pyramid");
  wrap.innerHTML = D.pyramid.map(r => `<div class="pyr-row" style="width:${r.w}">${r.label}</div>`).join("");
  gsap.from(wrap.children, { opacity: 0, y: -20, duration: 0.5, stagger: 0.15, ease: "power2.out" });
};

// =============== SLIDE: targeting ===============
window.init_targeting = (slide) => {
  gsap.from(slide.querySelectorAll(".tg-card"),
    { opacity: 0, y: 30, scale: 0.95, duration: 0.6, stagger: 0.12, ease: "back.out(1.4)" });
};

// =============== SLIDE: positioning (flip cards) ===============
window.init_positioning = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const grid = slide.querySelector(".flip-grid");
  grid.innerHTML = D.positioning.map(p => `
    <div class="flip-card">
      <div class="flip-inner">
        <div class="flip-front">
          <div class="brand">${p.brand}</div>
          <div class="hint">${p.tag} · click to flip</div>
        </div>
        <div class="flip-back">
          <div class="pos-label">Positioning</div>
          <div>${p.pos}</div>
        </div>
      </div>
    </div>
  `).join("");
  grid.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });
  gsap.from(grid.children, { opacity: 0, y: 30, scale: 0.92, duration: 0.5, stagger: 0.08 });
};

// =============== SLIDE: objectives ===============
window.init_objectives = (slide) => {
  gsap.from(slide.querySelectorAll(".obj-card"),
    { opacity: 0, x: -30, duration: 0.5, stagger: 0.1 });
};

// =============== SLIDE: 4P wheel ===============
window.init_wheel = (slide) => {
  gsap.from(slide.querySelector(".wheel-center"),
    { scale: 0, rotate: -180, opacity: 0, duration: 0.9, ease: "back.out(1.7)" });
  gsap.from(slide.querySelectorAll(".wheel-p"),
    { scale: 0, opacity: 0, duration: 0.7, stagger: 0.15, delay: 0.4, ease: "back.out(1.6)" });
};

// =============== SLIDE: place (concentric) ===============
window.init_place = (slide) => {
  gsap.from(slide.querySelectorAll(".concentric .ring"),
    { scale: 0, opacity: 0, duration: 0.7, stagger: 0.2, ease: "back.out(1.5)" });
  gsap.from(slide.querySelectorAll(".concentric .ring-label"),
    { opacity: 0, x: 30, duration: 0.5, stagger: 0.15, delay: 0.6 });
};

// =============== SLIDE: problem-N ===============
function initProblem(slide, n) {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const p = D.problems[n - 1];
  slide.querySelector(".problem-num").textContent = "Problem 0" + p.n + " / 05";
  slide.querySelector(".problem-title").textContent = p.title;
  const diag = slide.querySelector(".problem-card.diag .body");
  diag.innerHTML = `<p>${p.diag}</p><p style="margin-top:0.6em"><span class="cite-badge">${p.diagCite}</span></p>`;
  const sol = slide.querySelector(".problem-card.sol .body");
  sol.innerHTML = `<ul>${p.sol.map(s => `<li>${s}</li>`).join("")}</ul>
                   <p style="margin-top:0.6em"><span class="cite-badge">${p.solCite}</span></p>`;
  gsap.from(slide.querySelectorAll(".problem-card"),
    { opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: "power2.out" });
}
window.init_problem1 = (s) => initProblem(s, 1);
window.init_problem2 = (s) => initProblem(s, 2);
window.init_problem3 = (s) => initProblem(s, 3);
window.init_problem4 = (s) => initProblem(s, 4);
window.init_problem5 = (s) => initProblem(s, 5);

// =============== SLIDE: conclusion ===============
window.init_conclusion = (slide) => {
  const tagline = slide.querySelector(".conclusion-tagline");
  if (tagline && !tagline.dataset.split) {
    const text = tagline.textContent;
    tagline.dataset.split = 1;
    tagline.innerHTML = text.split("").map(ch =>
      ch === " " ? " " : `<span style="display:inline-block;opacity:0">${ch}</span>`).join("");
    gsap.to(tagline.querySelectorAll("span"),
      { opacity: 1, duration: 0.04, stagger: 0.04, ease: "none" });
  }
  gsap.from(slide.querySelectorAll(".concl-row"),
    { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, delay: 1.2 });
};

// =============== SLIDE: refs ===============
window.init_refs = (slide) => {
  if (slide.dataset.inited) return; slide.dataset.inited = 1;
  const wrap = slide.querySelector(".refs");
  wrap.innerHTML = D.refs.map(r =>
    `<p><span class="n">[${r.n}]</span> ${r.title}. <i>${r.publisher}</i>. <span style="color:#5a7080">${r.url}</span></p>`
  ).join("");
};

// =============== SLIDE: thanks ===============
window.init_thanks = (slide) => {
  gsap.fromTo(slide.querySelector(".thx-mark"),
    { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" });
  gsap.from(slide.querySelectorAll(".thx-row"),
    { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, delay: 0.4 });
};
