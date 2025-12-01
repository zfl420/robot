const STORAGE_KEY = "hz-school-zones-v1";
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeZone = (zone) => {
  const layout = zone.layout || {};
  const colStart = clamp(Number(layout.colStart) || 1, 1, 4);
  const colEnd = clamp(Number(layout.colEnd) || colStart + 1, colStart + 1, 5);
  const rowStart = clamp(Number(layout.rowStart) || 1, 1, 4);
  const rowEnd = clamp(Number(layout.rowEnd) || rowStart + 1, rowStart + 1, 5);

  return {
    ...zone,
    layout: { colStart, colEnd, rowStart, rowEnd },
    communities: Array.isArray(zone.communities) ? zone.communities : [],
    schools: Array.isArray(zone.schools) ? zone.schools : []
  };
};

const defaultZones = [
  {
    id: "xihu-primary",
    stage: "小学",
    name: "西湖 · 紫金港学军圈",
    district: "西湖区",
    description: "覆盖紫金港与西溪板块，学军集团统筹，STEM 资源与竞赛氛围浓厚。",
    policy: "人户一致优先；落户满 2 年且学籍完整方可排位，集团校指标分配。",
    color: "#4c7dff",
    layout: { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 3 },
    communities: [
      { name: "黄龙世纪苑", alias: "学军房" },
      { name: "紫金港北苑", alias: "" },
      { name: "西溪北苑", alias: "" },
      { name: "融创河畔", alias: "" }
    ],
    schools: [
      { name: "学军小学紫金港校区", stage: "小学", note: "集团本部" },
      { name: "文二教育集团紫金港", stage: "小学", note: "科技社团" }
    ]
  },
  {
    id: "binjiang-primary",
    stage: "小学",
    name: "滨江 · 高新科创圈",
    district: "滨江区",
    description: "依托高新区家庭，双语与编程社团覆盖 1-6 年级，师资年轻。",
    policy: "自有住房年限排序；重点楼盘需完成线上信息核验后确认。",
    color: "#ff8b5d",
    layout: { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 3 },
    communities: [
      { name: "联庄", alias: "高新老盘" },
      { name: "滨江金茂悦", alias: "科技城" },
      { name: "滨和名家", alias: "滨和路" },
      { name: "闻涛苑", alias: "沿江" }
    ],
    schools: [
      { name: "滨和实验小学", stage: "小学", note: "科创社团" },
      { name: "杭师大附外小学部", stage: "小学", note: "双语课程" }
    ]
  },
  {
    id: "shangcheng-primary",
    stage: "小学",
    name: "上城 · 钱江新城名校圈",
    district: "上城区",
    description: "钱江新城与城站沿线，民办与公办名校扎堆，艺术资源丰富。",
    policy: "热门民办摇号为主，公办按房产证时间排序。",
    color: "#f25ba3",
    layout: { colStart: 2, colEnd: 4, rowStart: 3, rowEnd: 5 },
    communities: [
      { name: "御景蓝湾", alias: "庆春隧道" },
      { name: "复兴印象城", alias: "江景" },
      { name: "钱江府", alias: "城站" },
      { name: "望江公馆", alias: "老城区" }
    ],
    schools: [
      { name: "杭州娃哈哈小学", stage: "小学", note: "民办双语" },
      { name: "胜利实验学校小学部", stage: "小学", note: "集团化" }
    ]
  },
  {
    id: "gongshu-primary",
    stage: "小学",
    name: "拱墅 · 大运河九年一贯",
    district: "拱墅区",
    description: "大关、申花九年一贯资源集中，集团化办学，直升空间大。",
    policy: "九年一贯小学段按积分排队，严控跨片插班。",
    color: "#3cc8b3",
    layout: { colStart: 1, colEnd: 2, rowStart: 3, rowEnd: 5 },
    communities: [
      { name: "大关南苑", alias: "大运河" },
      { name: "申花板块", alias: "运河商务" },
      { name: "香积寺巷", alias: "城北" },
      { name: "运河宸院", alias: "申花新盘" }
    ],
    schools: [
      { name: "文澜实验小学部", stage: "小学", note: "九年一贯" },
      { name: "求是教育集团小学", stage: "小学", note: "集团化" }
    ]
  },
  {
    id: "qiantang-primary",
    stage: "小学",
    name: "钱塘 · 金沙湖沿江",
    district: "钱塘区",
    description: "金沙湖与江东新城新盘集中，指定划片，社区配套加速完善。",
    policy: "新盘执行登记顺序+房产年限并行，部分楼盘需抽签。",
    color: "#f6a21e",
    layout: { colStart: 3, colEnd: 5, rowStart: 3, rowEnd: 5 },
    communities: [
      { name: "金沙湖壹号", alias: "湖景" },
      { name: "东城金座", alias: "大学城" },
      { name: "金沙学府", alias: "沿江" },
      { name: "恒大水晶国际", alias: "东段" }
    ],
    schools: [
      { name: "采荷实验学校钱塘", stage: "小学", note: "集团派位" },
      { name: "下沙第二小学", stage: "小学", note: "直配" }
    ]
  },
  {
    id: "xihu-middle",
    stage: "初中",
    name: "西湖 · 学军中学圈",
    district: "西湖区",
    description: "学军中学本部+竞舟校区，名额分配比例高，竞赛资源突出。",
    policy: "人户一致优先，电脑摇号与配额并行。",
    color: "#2b50ff",
    layout: { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 3 },
    communities: [
      { name: "翠苑三区", alias: "翠苑" },
      { name: "学院路沿线", alias: "文教区" },
      { name: "文三路创意街区", alias: "高新" }
    ],
    schools: [
      { name: "学军中学本部", stage: "初中", note: "名额分配" },
      { name: "学军中学竞舟校区", stage: "初中", note: "竞赛强" }
    ]
  },
  {
    id: "binjiang-middle",
    stage: "初中",
    name: "滨江 · 浙师附中圈",
    district: "滨江区",
    description: "塍江与奥体沿线，重视科创课程与双语融合。",
    policy: "集团化名额分配 + 科创特长生统筹。",
    color: "#00b5d8",
    layout: { colStart: 2, colEnd: 4, rowStart: 1, rowEnd: 2 },
    communities: [
      { name: "江南名府", alias: "高新" },
      { name: "国信嘉园", alias: "奥体" },
      { name: "奥体万象城", alias: "亚运村" }
    ],
    schools: [
      { name: "杭师大附外初中部", stage: "初中", note: "双语" },
      { name: "滨文中学", stage: "初中", note: "科创课程" }
    ]
  },
  {
    id: "gongshu-middle",
    stage: "初中",
    name: "拱墅 · 文澜实验圈",
    district: "拱墅区",
    description: "文澜、启正等九年一贯初中部集中，直升率高。",
    policy: "九年一贯优先直升，外来家庭需积分。",
    color: "#25b38a",
    layout: { colStart: 1, colEnd: 3, rowStart: 3, rowEnd: 5 },
    communities: [
      { name: "申花壹号", alias: "申花" },
      { name: "金华新村", alias: "老拱墅" },
      { name: "湖墅天玺", alias: "武林" }
    ],
    schools: [
      { name: "文澜中学", stage: "初中", note: "九年一贯" },
      { name: "上塘中学", stage: "初中", note: "集团校" }
    ]
  },
  {
    id: "shangcheng-middle",
    stage: "初中",
    name: "上城 · 杭高衔接圈",
    district: "上城区",
    description: "杭高教育集团牵头，重视项目式学习与双语。",
    policy: "名额分配到校；民办摇号未中签自动回流公办。",
    color: "#ff6f91",
    layout: { colStart: 3, colEnd: 5, rowStart: 2, rowEnd: 4 },
    communities: [
      { name: "钱江御府", alias: "CBD" },
      { name: "绿城柳岸晓风", alias: "钱塘江" },
      { name: "庆春广场", alias: "庆春路" }
    ],
    schools: [
      { name: "杭高求是实验学校初中", stage: "初中", note: "集团校" },
      { name: "采荷中学教育集团", stage: "初中", note: "项目式" }
    ]
  },
  {
    id: "qiantang-middle",
    stage: "初中",
    name: "钱塘 · 采荷教育圈",
    district: "钱塘区",
    description: "产教城融合，采荷教育集团多校区统筹，科技社团多。",
    policy: "指标到校+统筹派位，锁定房满 3 年优先。",
    color: "#f79824",
    layout: { colStart: 3, colEnd: 5, rowStart: 3, rowEnd: 5 },
    communities: [
      { name: "金沙湖壹号", alias: "湖区" },
      { name: "下沙高教园", alias: "高校" },
      { name: "新加坡科技园", alias: "东部湾" }
    ],
    schools: [
      { name: "采荷教育集团东城校区", stage: "初中", note: "集团派位" },
      { name: "杭师大东城实验", stage: "初中", note: "产教融合" }
    ]
  }
];

const clone = (value) => JSON.parse(JSON.stringify(value));

const hasStorage = (() => {
  try {
    return typeof window !== "undefined" && window.localStorage;
  } catch (error) {
    return false;
  }
})();

const loadZones = () => {
  if (hasStorage) {
    const cached = window.localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return Array.isArray(parsed) ? parsed.map(normalizeZone) : clone(defaultZones).map(normalizeZone);
      } catch (error) {
        console.warn("缓存数据解析失败，使用默认数据", error);
      }
    }
  }
  return clone(defaultZones).map(normalizeZone);
};

const persistZones = (data) => {
  if (!hasStorage) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

document.addEventListener("DOMContentLoaded", () => {
  let zones = loadZones();
  let currentStage = "小学";
  let selectedZoneId = null;

  const stageTabs = document.querySelectorAll("#stageTabs button");
  const mapGrid = document.querySelector("#mapGrid");
  const districtFilter = document.querySelector("#districtFilter");
  const keywordInput = document.querySelector("#keywordInput");
  const zoneCount = document.querySelector("#zoneCount");

  const infoStage = document.querySelector("#infoStage");
  const infoTitle = document.querySelector("#infoTitle");
  const infoSubtitle = document.querySelector("#infoSubtitle");
  const infoDistrict = document.querySelector("#infoDistrict");
  const infoPolicy = document.querySelector("#infoPolicy");
  const communityCount = document.querySelector("#communityCount");
  const schoolCount = document.querySelector("#schoolCount");
  const communityList = document.querySelector("#communityList");
  const schoolList = document.querySelector("#schoolList");

  const adminSection = document.querySelector("#adminSection");
  const collapseAdminBtn = document.querySelector("#collapseAdmin");
  const scrollAdminBtn = document.querySelector("#scrollAdmin");
  const zoneForm = document.querySelector("#zoneForm");
  const resetFormBtn = document.querySelector("#resetForm");
  const zoneTableBody = document.querySelector("#zoneTable tbody");

  const zoneIdInput = document.querySelector("#zoneId");
  const zoneNameInput = document.querySelector("#zoneNameInput");
  const zoneDistrictInput = document.querySelector("#zoneDistrictInput");
  const zoneStageInput = document.querySelector("#zoneStageInput");
  const zoneColorInput = document.querySelector("#zoneColorInput");
  const zonePolicyInput = document.querySelector("#zonePolicyInput");
  const zoneDescInput = document.querySelector("#zoneDescInput");
  const zoneColStartInput = document.querySelector("#zoneColStartInput");
  const zoneColSpanInput = document.querySelector("#zoneColSpanInput");
  const zoneRowStartInput = document.querySelector("#zoneRowStartInput");
  const zoneRowSpanInput = document.querySelector("#zoneRowSpanInput");
  const zoneCommunitiesInput = document.querySelector("#zoneCommunitiesInput");
  const zoneSchoolsInput = document.querySelector("#zoneSchoolsInput");

  const debouncedFilter = debounce(() => renderMap(), 200);

  init();

  function init() {
    populateDistrictOptions();
    renderMap();
    renderDetails();
    renderTable();
    bindEvents();
  }

  function bindEvents() {
    stageTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        stageTabs.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        currentStage = tab.dataset.stage;
        selectedZoneId = null;
        renderMap();
        renderDetails();
      });
    });

    districtFilter?.addEventListener("change", renderMap);
    keywordInput?.addEventListener("input", debouncedFilter);

    scrollAdminBtn?.addEventListener("click", () => {
      adminSection?.scrollIntoView({ behavior: "smooth" });
    });

    collapseAdminBtn?.addEventListener("click", () => {
      adminSection?.classList.toggle("collapsed");
      const expanded = collapseAdminBtn.getAttribute("aria-expanded") === "true";
      collapseAdminBtn.setAttribute("aria-expanded", String(!expanded));
      collapseAdminBtn.textContent = expanded ? "展开后台" : "收起后台";
    });

    zoneForm?.addEventListener("submit", handleFormSubmit);
    resetFormBtn?.addEventListener("click", () => {
      zoneForm?.reset();
      zoneIdInput.value = "";
    });

    zoneTableBody?.addEventListener("click", (event) => {
      const actionBtn = event.target.closest("button[data-action]");
      if (!actionBtn) return;
      const { action, id } = actionBtn.dataset;
      if (action === "edit") {
        fillForm(id);
      } else if (action === "delete") {
        deleteZone(id);
      }
    });
  }

  function getFilteredZones() {
    const districtValue = districtFilter?.value || "all";
    const keyword = keywordInput?.value.trim().toLowerCase() || "";

    return zones.filter((zone) => {
      if (zone.stage !== currentStage) return false;
      const matchDistrict = districtValue === "all" || zone.district === districtValue;
      const matchKeyword = keyword
        ? [
            zone.name,
            zone.district,
            zone.description,
            zone.communities.map((c) => c.name).join(" "),
            zone.schools.map((s) => s.name).join(" ")
          ]
            .join(" ")
            .toLowerCase()
            .includes(keyword)
        : true;
      return matchDistrict && matchKeyword;
    });
  }

  function renderMap() {
    if (!mapGrid) return;
    const filtered = getFilteredZones();
    zoneCount.textContent = filtered.length;
    mapGrid.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "暂无符合条件的学区，请调整筛选条件。";
      mapGrid.appendChild(empty);
      renderDetails();
      return;
    }

    filtered.forEach((zone) => {
      const zoneBtn = document.createElement("button");
      zoneBtn.type = "button";
      zoneBtn.className = "map-zone";
      zoneBtn.dataset.id = zone.id;
      zoneBtn.dataset.stage = zone.stage;
      zoneBtn.style.setProperty("--zone-color", zone.color);
      zoneBtn.style.gridColumn = `${zone.layout.colStart} / ${zone.layout.colEnd}`;
      zoneBtn.style.gridRow = `${zone.layout.rowStart} / ${zone.layout.rowEnd}`;
      zoneBtn.innerHTML = `
        <div>
          <strong>${zone.name}</strong>
          <span>${zone.district}</span>
        </div>
        <div class="zone-communities">
          ${zone.communities
            .slice(0, 3)
            .map((community) => `<span>${community.name}</span>`)
            .join("")}
        </div>
      `;
      if (zone.id === selectedZoneId) {
        zoneBtn.classList.add("active");
      }
      zoneBtn.addEventListener("click", () => toggleSelection(zone.id));
      mapGrid.appendChild(zoneBtn);
    });

    if (selectedZoneId) {
      const stillVisible = filtered.some((zone) => zone.id === selectedZoneId);
      if (!stillVisible) {
        selectedZoneId = null;
        renderDetails();
      }
    }
  }

  function toggleSelection(zoneId) {
    if (selectedZoneId === zoneId) {
      selectedZoneId = null;
      renderDetails();
    } else {
      selectedZoneId = zoneId;
      const zone = zones.find((item) => item.id === zoneId);
      renderDetails(zone);
    }
    renderMap();
  }

  function renderDetails(zone = null) {
    if (!infoTitle) return;
    const baseStage = zone?.stage || currentStage;
    infoStage.textContent = baseStage;

    if (!zone) {
      infoTitle.textContent = "请选择一个色块";
      infoSubtitle.textContent = "地图中颜色越深代表优先级越高，点击即可查看详细信息。";
      infoDistrict.textContent = "-";
      infoPolicy.textContent = "-";
      communityCount.textContent = "0 个";
      schoolCount.textContent = "0 所";
      communityList.innerHTML = "";
      schoolList.innerHTML = "";
      return;
    }

    infoTitle.textContent = zone.name;
    infoSubtitle.textContent = zone.description;
    infoDistrict.textContent = zone.district;
    infoPolicy.textContent = zone.policy;
    communityCount.textContent = `${zone.communities.length} 个`;
    schoolCount.textContent = `${zone.schools.length} 所`;

    communityList.innerHTML = zone.communities
      .map((community) => {
        const alias = community.alias ? `<small>${community.alias}</small>` : "";
        return `<li><span>${community.name}</span>${alias}</li>`;
      })
      .join("");

    schoolList.innerHTML = zone.schools
      .map((school) => {
        const note = school.note ? `<small>${school.note}</small>` : "";
        return `<li><strong>${school.name}</strong><span>${school.stage}</span>${note}</li>`;
      })
      .join("");
  }

  function populateDistrictOptions() {
    if (!districtFilter) return;
    const previous = districtFilter.value;
    const districts = Array.from(new Set(zones.map((zone) => zone.district)));
    districtFilter.innerHTML = '<option value="all">全部区域</option>';
    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtFilter.appendChild(option);
    });
    if (districts.includes(previous)) {
      districtFilter.value = previous;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const layout = buildLayout();

    let zoneData = {
      id: zoneIdInput.value || `zone-${Date.now()}`,
      name: zoneNameInput.value.trim(),
      district: zoneDistrictInput.value.trim(),
      stage: zoneStageInput.value,
      color: zoneColorInput.value.trim() || "#3058ff",
      policy: zonePolicyInput.value.trim(),
      description: zoneDescInput.value.trim(),
      layout,
      communities: parseCommunities(zoneCommunitiesInput.value),
      schools: parseSchools(zoneSchoolsInput.value)
    };

    zoneData = normalizeZone(zoneData);
    zoneData.schools = zoneData.schools.map((school) => ({
      ...school,
      stage: school.stage || zoneData.stage
    }));

    if (!zoneData.communities.length) {
      zoneData.communities.push({ name: "待补充", alias: "" });
    }

    if (!zoneData.schools.length) {
      zoneData.schools.push({ name: "待补充", stage: zoneData.stage, note: "" });
    }

    const existingIndex = zones.findIndex((zone) => zone.id === zoneData.id);
    if (existingIndex >= 0) {
      zones[existingIndex] = zoneData;
    } else {
      zones.push(zoneData);
    }

    persistZones(zones);
    populateDistrictOptions();
    renderMap();
    renderTable();
    if (selectedZoneId === zoneData.id) {
      renderDetails(zoneData);
    }
    zoneForm?.reset();
    zoneIdInput.value = "";
  }

  function buildLayout() {
    const colStart = Number(zoneColStartInput.value) || 1;
    const colSpan = Math.max(1, Number(zoneColSpanInput.value) || 1);
    const rowStart = Number(zoneRowStartInput.value) || 1;
    const rowSpan = Math.max(1, Number(zoneRowSpanInput.value) || 1);

    const colEnd = Math.min(5, colStart + colSpan);
    const rowEnd = Math.min(5, rowStart + rowSpan);

    return { colStart, colEnd, rowStart, rowEnd };
  }

  function parseCommunities(value) {
    return value
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, alias = ""] = line.split("|").map((item) => item.trim());
        return { name, alias };
      });
  }

  function parseSchools(value) {
    return value
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, stage = "", note = ""] = line.split("|").map((item) => item.trim());
        return { name, stage: stage || "小学", note };
      });
  }

  function renderTable() {
    if (!zoneTableBody) return;
    zoneTableBody.innerHTML = "";
    const sorted = [...zones].sort((a, b) => {
      if (a.stage === b.stage) {
        return a.district.localeCompare(b.district, "zh-Hans-CN");
      }
      return a.stage.localeCompare(b.stage, "zh-Hans-CN");
    });

    sorted.forEach((zone) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><span class="table-color" style="background:${zone.color}"></span>${zone.name}</td>
        <td>${zone.stage}</td>
        <td>${zone.district}</td>
        <td>${zone.communities.length}</td>
        <td>${zone.schools.length}</td>
        <td>
          <button class="table-btn edit" data-action="edit" data-id="${zone.id}">编辑</button>
          <button class="table-btn danger" data-action="delete" data-id="${zone.id}">删除</button>
        </td>
      `;
      zoneTableBody.appendChild(row);
    });
  }

  function fillForm(id) {
    const zone = zones.find((item) => item.id === id);
    if (!zone) return;
    zoneIdInput.value = zone.id;
    zoneNameInput.value = zone.name;
    zoneDistrictInput.value = zone.district;
    zoneStageInput.value = zone.stage;
    zoneColorInput.value = zone.color;
    zonePolicyInput.value = zone.policy;
    zoneDescInput.value = zone.description;
    zoneColStartInput.value = zone.layout.colStart;
    zoneColSpanInput.value = Math.max(1, zone.layout.colEnd - zone.layout.colStart);
    zoneRowStartInput.value = zone.layout.rowStart;
    zoneRowSpanInput.value = Math.max(1, zone.layout.rowEnd - zone.layout.rowStart);
    zoneCommunitiesInput.value = zone.communities
      .map((community) => (community.alias ? `${community.name}|${community.alias}` : community.name))
      .join("\n");
    zoneSchoolsInput.value = zone.schools
      .map((school) => {
        const parts = [school.name, school.stage, school.note].filter(Boolean);
        return parts.join("|");
      })
      .join("\n");
    zoneForm.scrollIntoView({ behavior: "smooth" });
  }

  function deleteZone(id) {
    const zone = zones.find((item) => item.id === id);
    if (!zone) return;
    const confirmed = window.confirm(`确定删除“${zone.name}”数据吗？`);
    if (!confirmed) return;
    zones = zones.filter((item) => item.id !== id);
    if (selectedZoneId === id) {
      selectedZoneId = null;
      renderDetails();
    }
    persistZones(zones);
    populateDistrictOptions();
    renderMap();
    renderTable();
  }
});

function debounce(fn, wait = 200) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(null, args), wait);
  };
}
