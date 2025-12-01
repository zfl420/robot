const districtData = [
  {
    id: "xihu",
    name: "西湖区",
    category: "重点教育",
    focus: "学军系、公办强",
    desc: "学军教育集团覆盖面广，学科竞赛与科技类活动突出。",
    highlights: ["学军小学紫金港校区", "文二教育集团"],
    stats: { schools: 18, avgScore: 94 }
  },
  {
    id: "binjiang",
    name: "滨江区",
    category: "科技创新",
    focus: "互联网家庭聚集",
    desc: "依托高新区资源，科技与国际化课程资源丰富。",
    highlights: ["滨和实验小学", "杭师大附外"],
    stats: { schools: 12, avgScore: 91 }
  },
  {
    id: "gongshu",
    name: "拱墅区",
    category: "老牌强区",
    focus: "优质九年一贯",
    desc: "传统教育资源扎实，近年来大力度更新学校硬件。",
    highlights: ["求是教育集团", "上塘中学"] ,
    stats: { schools: 14, avgScore: 89 }
  },
  {
    id: "shangcheng",
    name: "上城区",
    category: "历史文脉",
    focus: "名校扎堆",
    desc: "老城区基础好，择校需求多样，国际与艺术特色并存。",
    highlights: ["杭州娃哈哈小学", "杭高教育集团"],
    stats: { schools: 16, avgScore: 92 }
  },
  {
    id: "qiantang",
    name: "钱塘区",
    category: "新兴区域",
    focus: "配套提速",
    desc: "大江东、下沙合并后规划统一，优质公办逐步落地。",
    highlights: ["下沙第二小学", "采荷教育集团"],
    stats: { schools: 10, avgScore: 86 }
  }
];

const schoolData = [
  {
    name: "学军小学紫金港校区",
    district: "西湖区",
    stage: "小学",
    type: "公办",
    tags: ["学军系", "科技特色"],
    score: 96,
    address: "西湖区紫金港路 700 号",
    features: "STEM+英语深度融合",
    hotline: "0571-8500 1234"
  },
  {
    name: "学军中学竞舟校区",
    district: "西湖区",
    stage: "初中",
    type: "公办",
    tags: ["学军系"],
    score: 95,
    address: "西湖区竞舟路 357 号",
    features: "数理竞赛与社团丰富",
    hotline: "0571-8500 5678"
  },
  {
    name: "滨和实验小学",
    district: "滨江区",
    stage: "小学",
    type: "公办",
    tags: ["科技特色"],
    score: 92,
    address: "滨江区滨和路 66 号",
    features: "编程社团覆盖一至六年级",
    hotline: "0571-8888 1200"
  },
  {
    name: "杭师大附外",
    district: "滨江区",
    stage: "九年一贯",
    type: "民办",
    tags: ["双语", "民办"],
    score: 90,
    address: "滨江区江汉路 30 号",
    features: "双语课程+海外交流",
    hotline: "0571-8722 9000"
  },
  {
    name: "求是教育集团文澜实验",
    district: "拱墅区",
    stage: "九年一贯",
    type: "公办",
    tags: ["公办", "特色课程"],
    score: 89,
    address: "拱墅区湖墅南路 288 号",
    features: "书院式课程体系",
    hotline: "0571-8521 7788"
  },
  {
    name: "杭州娃哈哈小学",
    district: "上城区",
    stage: "小学",
    type: "民办",
    tags: ["民办", "双语"],
    score: 91,
    address: "上城区美政路 38 号",
    features: "双语浸润+艺术社团",
    hotline: "0571-8706 5566"
  },
  {
    name: "杭高求是实验学校",
    district: "上城区",
    stage: "初中",
    type: "公办",
    tags: ["公办", "创新课程"],
    score: 93,
    address: "上城区凤山路 188 号",
    features: "项目式学习+人工智能课程",
    hotline: "0571-8707 1357"
  },
  {
    name: "采荷实验学校钱塘校区",
    district: "钱塘区",
    stage: "九年一贯",
    type: "公办",
    tags: ["公办", "集团化"],
    score: 87,
    address: "钱塘区金沙大道 88 号",
    features: "集团资源共享，社团覆盖 30+",
    hotline: "0571-8686 9008"
  }
];

const tagButtons = document.querySelectorAll("#tagFilter button");
const districtSelect = document.querySelector("#districtFilter");
const stageCheckboxes = document.querySelectorAll(".stage-filter input");
const schoolList = document.querySelector("#schoolList");
const searchInput = document.querySelector("#searchInput");
const districtGrid = document.querySelector("#districtGrid");
const statDistricts = document.querySelector("#statDistricts");
const statSchools = document.querySelector("#statSchools");
const resetButton = document.querySelector("#resetFilters");
const quickMatchButton = document.querySelector("#quickMatch");
const mapStageButtons = document.querySelectorAll("#mapStageToggle button");
const mapCanvas = document.querySelector("#mapCanvas");
const mapDetails = document.querySelector("#mapDetails");

const activeTags = new Set();

const mapZones = [
  {
    id: "primary-xihu",
    name: "西湖 · 文教圈",
    stage: "小学",
    coverage: "学军小学、文二教育集团",
    focus: "积分排序 + 人户一致优先",
    grid: { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 2 }
  },
  {
    id: "primary-binj",
    name: "滨江 · 高新走廊",
    stage: "小学",
    coverage: "滨和实验、浦沿小学集团",
    focus: "科技社团 + 高知家庭集中",
    grid: { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 2 }
  },
  {
    id: "primary-gongshu",
    name: "拱墅 · 大运河",
    stage: "小学",
    coverage: "文澜实验、求是教育集团",
    focus: "九年一贯小学部占比高",
    grid: { colStart: 1, colEnd: 3, rowStart: 2, rowEnd: 3 }
  },
  {
    id: "primary-shangcheng",
    name: "上城 · 钱江新城",
    stage: "小学",
    coverage: "娃哈哈小学、胜利教育集团",
    focus: "民办 & 公办名校扎堆",
    grid: { colStart: 3, colEnd: 5, rowStart: 2, rowEnd: 3 }
  },
  {
    id: "primary-qiantang",
    name: "钱塘 · 沿江融合",
    stage: "小学",
    coverage: "采荷实验钱塘、下沙二小",
    focus: "新盘集中 + 指定划片",
    grid: { colStart: 5, colEnd: 7, rowStart: 2, rowEnd: 3 }
  },
  {
    id: "middle-xihu",
    name: "西湖 · 学军中学圈",
    stage: "初中",
    coverage: "学军中学本部、竞舟校区",
    focus: "名额分配 + 竞赛资源",
    grid: { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 2 }
  },
  {
    id: "middle-binj",
    name: "滨江 · 浙师附中圈",
    stage: "初中",
    coverage: "杭师大附外、滨文中学",
    focus: "科创课程 + 双语融合",
    grid: { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 2 }
  },
  {
    id: "middle-gongshu",
    name: "拱墅 · 文澜实验",
    stage: "初中",
    coverage: "文澜中学、上塘中学",
    focus: "集团化直升 + 转学严控",
    grid: { colStart: 1, colEnd: 3, rowStart: 2, rowEnd: 3 }
  },
  {
    id: "middle-shangcheng",
    name: "上城 · 杭高衔接",
    stage: "初中",
    coverage: "杭高求是实验、采荷中学",
    focus: "名校初高中贯通",
    grid: { colStart: 3, colEnd: 5, rowStart: 2, rowEnd: 3 }
  },
  {
    id: "middle-qiantang",
    name: "钱塘 · 采荷教育",
    stage: "初中",
    coverage: "采荷教育集团、杭师大东城",
    focus: "产教城融合 + 统筹派位",
    grid: { colStart: 5, colEnd: 7, rowStart: 2, rowEnd: 3 }
  }
];

function init() {
  renderDistrictOptions();
  renderDistrictCards();
  renderSchoolCards(schoolData);
  const defaultStage = mapStageButtons.length ? mapStageButtons[0].dataset.stage : "小学";
  renderMapZones(defaultStage);
  updateStats();
  bindEvents();
}

function renderDistrictOptions() {
  districtData.forEach((district) => {
    const option = document.createElement("option");
    option.value = district.name;
    option.textContent = district.name;
    districtSelect.appendChild(option);
  });
}

function renderDistrictCards() {
  districtGrid.innerHTML = "";
  districtData.forEach((district) => {
    const card = document.createElement("article");
    card.className = "district-card";
    card.innerHTML = `
      <span class="section-tag">${district.category}</span>
      <h3>${district.name}</h3>
      <p>${district.desc}</p>
      <ul>
        <li>• 关注点：${district.focus}</li>
        <li>• 核心学校：${district.highlights.join("、")}</li>
        <li>• 重点学校数量：${district.stats.schools} 所</li>
      </ul>
    `;
    districtGrid.appendChild(card);
  });
}

function renderSchoolCards(data) {
  schoolList.innerHTML = "";
  if (!data.length) {
    schoolList.innerHTML = "<p>暂无符合筛选条件的学校，尝试调整筛选条件。</p>";
    return;
  }

  data.forEach((school) => {
    const card = document.createElement("article");
    card.className = "school-card";
    card.innerHTML = `
      <header>
        <div>
          <h3>${school.name}</h3>
          <span>${school.district} · ${school.stage}</span>
        </div>
        <strong>${school.score}</strong>
      </header>
      <div class="badges">
        ${[school.type, ...school.tags]
          .map((tag) => `<span>${tag}</span>`) 
          .join("")}
      </div>
      <p>${school.features}</p>
      <footer>
        <span>${school.address}</span>
        <a href="tel:${school.hotline}">咨询</a>
      </footer>
    `;
    schoolList.appendChild(card);
  });
}

function updateStats() {
  statDistricts.textContent = districtData.length;
  statSchools.textContent = schoolData.length;
}

function bindEvents() {
  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag;
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
        button.classList.remove("active");
      } else {
        activeTags.add(tag);
        button.classList.add("active");
      }
      applyFilters();
    });
  });

  stageCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilters);
  });

  districtSelect.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", debounce(applyFilters, 200));
  resetButton.addEventListener("click", resetFilters);
  quickMatchButton.addEventListener("click", simulateMatch);

  if (mapStageButtons.length) {
    mapStageButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        mapStageButtons.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");
        renderMapZones(button.dataset.stage);
      });
      if (index === 0) {
        button.setAttribute("aria-selected", "true");
      }
    });
  }
}

function applyFilters() {
  const keyword = searchInput.value.trim();
  const selectedDistrict = districtSelect.value;
  const selectedStages = Array.from(stageCheckboxes)
    .filter((box) => box.checked)
    .map((box) => box.value);

  const filtered = schoolData.filter((school) => {
    const matchKeyword = keyword
      ? [school.name, school.district, school.features, school.tags.join(" ")]
          .join(" ")
          .includes(keyword)
      : true;

    const matchDistrict = selectedDistrict === "all" || school.district === selectedDistrict;
    const matchStage = selectedStages.includes(school.stage);
    const matchTags = activeTags.size
      ? Array.from(activeTags).every((tag) => 
          [school.type, ...school.tags].some((item) => item.includes(tag))
        )
      : true;

    return matchKeyword && matchDistrict && matchStage && matchTags;
  });

  renderSchoolCards(filtered);
}

function resetFilters() {
  activeTags.clear();
  tagButtons.forEach((button) => button.classList.remove("active"));
  districtSelect.value = "all";
  stageCheckboxes.forEach((checkbox) => (checkbox.checked = true));
  searchInput.value = "";
  renderSchoolCards(schoolData);
}

function simulateMatch() {
  const suggestions = schoolData
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((school) => `${school.name}（${school.district}·${school.stage}）`)
    .join("\n");

  alert(`根据基础数据为你推荐：\n${suggestions}\n可继续使用筛选进一步匹配。`);
}

function debounce(fn, wait = 200) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

window.addEventListener("DOMContentLoaded", init);

function renderMapZones(stage = "小学") {
  if (!mapCanvas || !mapDetails) return;
  const stageZones = mapZones.filter((zone) => zone.stage === stage);
  mapCanvas.innerHTML = "";
  mapDetails.innerHTML = "";

  stageZones.forEach((zone) => {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "map-cell";
    cell.dataset.stage = zone.stage;
    cell.dataset.zone = zone.id;
    cell.style.gridColumn = `${zone.grid.colStart} / ${zone.grid.colEnd}`;
    cell.style.gridRow = `${zone.grid.rowStart} / ${zone.grid.rowEnd}`;
    cell.innerHTML = `<span>${zone.name}</span>`;
    cell.addEventListener("click", () => highlightMapZone(zone.id));
    mapCanvas.appendChild(cell);

    const detail = document.createElement("article");
    detail.className = "map-detail-card";
    detail.dataset.zone = zone.id;
    detail.innerHTML = `
      <strong>${zone.name}</strong>
      <span>覆盖：${zone.coverage}</span>
      <span>关注：${zone.focus}</span>
    `;
    detail.addEventListener("click", () => highlightMapZone(zone.id));
    mapDetails.appendChild(detail);
  });

  if (stageZones.length) {
    highlightMapZone(stageZones[0].id);
  }
}

function highlightMapZone(zoneId) {
  if (!mapCanvas || !mapDetails) return;
  mapCanvas.querySelectorAll(".map-cell").forEach((cell) => {
    cell.classList.toggle("active", cell.dataset.zone === zoneId);
  });
  mapDetails.querySelectorAll(".map-detail-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.zone === zoneId);
  });
}
