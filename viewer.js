(function () {
  const data = window.GACHA_PET_VIEWER_DATA;
  const CHARACTER_META_OVERRIDES = window.GACHA_VIEWER_CHARACTER_META
    && typeof window.GACHA_VIEWER_CHARACTER_META === "object"
    ? window.GACHA_VIEWER_CHARACTER_META
    : {};
  const spineManifest = Object.assign(
    {},
    window.GACHA_PET_SPINE_MANIFEST_INDEX || {},
  );
  const pageParams = new URLSearchParams(window.location.search);

  const elements = {
    appShell: document.getElementById("appShell"),
    petRail: document.getElementById("petRail"),
    stage: document.getElementById("stagePanel"),
    railPrimaryActions: document.getElementById("railPrimaryActions"),
    collectionTabs: document.getElementById("collectionTabs"),
    petSubfilters: document.getElementById("petSubfilters"),
    petList: document.getElementById("petList"),
    railTitle: document.getElementById("railTitle"),
    railCopy: document.getElementById("railCopy"),
    heroPanel: document.getElementById("heroPanel"),
    heroBackdrop: document.getElementById("heroBackdrop"),
    orderBadge: document.getElementById("orderBadge"),
    statusBadge: document.getElementById("statusBadge"),
    petTitle: document.getElementById("petTitle"),
    petName: document.getElementById("petName"),
    petMetaLabel: document.getElementById("petMetaLabel"),
    petDesc: document.getElementById("petDesc"),
    scheduleSummary: document.getElementById("scheduleSummary"),
    scheduleBlockTitle: document.getElementById("scheduleBlockTitle"),
    scheduleBlockSubtext: document.getElementById("scheduleBlockSubtext"),
    scheduleList: document.getElementById("scheduleList"),
    scheduleAdjustButton: document.getElementById("scheduleAdjustButton"),
    railPastToggle: document.getElementById("railPastToggle"),
    scheduleAdjustModal: document.getElementById("scheduleAdjustModal"),
    scheduleAdjustBackdrop: document.getElementById("scheduleAdjustBackdrop"),
    scheduleAdjustDialog: document.getElementById("scheduleAdjustDialog"),
    scheduleAdjustClose: document.getElementById("scheduleAdjustClose"),
    scheduleAdjustCancel: document.getElementById("scheduleAdjustCancel"),
    scheduleAdjustReset: document.getElementById("scheduleAdjustReset"),
    scheduleAdjustConfirm: document.getElementById("scheduleAdjustConfirm"),
    scheduleAdjustCurrentLabel: document.getElementById("scheduleAdjustCurrentLabel"),
    scheduleAdjustSelect: document.getElementById("scheduleAdjustSelect"),
    scheduleAdjustSelectedSummary: document.getElementById("scheduleAdjustSelectedSummary"),
    scheduleAdjustDays: document.getElementById("scheduleAdjustDays"),
    scheduleAdjustHours: document.getElementById("scheduleAdjustHours"),
    scheduleAdjustMinutes: document.getElementById("scheduleAdjustMinutes"),
    scheduleAdjustManualDate: document.getElementById("scheduleAdjustManualDate"),
    scheduleAdjustPreview: document.getElementById("scheduleAdjustPreview"),
    scheduleAdjustPreviewCopy: document.getElementById("scheduleAdjustPreviewCopy"),
    equipmentSetDesktopSlot: document.getElementById("equipmentSetDesktopSlot"),
    equipmentSetBlock: document.getElementById("equipmentSetBlock"),
    equipmentSetTitle: document.getElementById("equipmentSetTitle"),
    equipmentSetNote: document.getElementById("equipmentSetNote"),
    equipmentSetList: document.getElementById("equipmentSetList"),
    mobileEquipmentSetHost: document.getElementById("mobileEquipmentSetHost"),
    focusTopRow: document.getElementById("focusTopRow"),
    spotlightTitleText: document.getElementById("spotlightTitleText"),
    spotlightPetBannerName: document.getElementById("spotlightPetBannerName"),
    spotlightStageStrip: document.querySelector(".spotlight-stage-strip"),
    spotlightStageTile: document.getElementById("spotlightStageTile"),
    spotlightStageLabel: document.getElementById("spotlightStageLabel"),
    spotlightStageSkill: document.getElementById("spotlightStageSkill"),
    spotlightStageOption: document.getElementById("spotlightStageOption"),
    spotlightInfoList: document.getElementById("spotlightInfoList"),
    selectedSkillSummary: document.getElementById("selectedSkillSummary"),
    portraitImage: document.getElementById("portraitImage"),
    gachaIcon: document.getElementById("gachaIcon"),
    portraitElementBadge: document.getElementById("portraitElementBadge"),
    portraitElementIcon: document.getElementById("portraitElementIcon"),
    portraitPetTitle: document.getElementById("portraitPetTitle"),
    portraitPetName: document.getElementById("portraitPetName"),
    portraitOwnedEffect: document.getElementById("ownedEffectCard"),
    portraitOwnedEffectTitle: document.getElementById("ownedEffectTitle"),
    portraitOwnedEffectNote: document.getElementById("ownedEffectNote"),
    portraitOwnedEffectList: document.getElementById("ownedEffectList"),
    spotlightMedia: document.getElementById("spotlightMedia"),
    sceneBackgroundImage: document.getElementById("sceneBackgroundImage"),
    sceneFarLeft: document.getElementById("sceneFarLeft"),
    sceneFarRight: document.getElementById("sceneFarRight"),
    sceneCloudBack: document.getElementById("sceneCloudBack"),
    sceneBeamLeft: document.getElementById("sceneBeamLeft"),
    sceneBeamRight: document.getElementById("sceneBeamRight"),
    sceneStageAura: document.getElementById("sceneStageAura"),
    sceneStageBack: document.getElementById("sceneStageBack"),
    sceneStageZone: document.getElementById("sceneStageZone"),
    sceneStageFront: document.getElementById("sceneStageFront"),
    sceneEmbers: document.getElementById("sceneEmbers"),
    bannerImage: document.getElementById("bannerImage"),
    spinePreview: document.getElementById("spinePreview"),
    focusSkillBadge: document.getElementById("focusSkillBadge"),
    focusSkillType: document.getElementById("focusSkillType"),
    focusSkillName: document.getElementById("focusSkillName"),
    focusVariantLevel: document.getElementById("focusVariantLevel"),
    focusSkillRange: document.getElementById("focusSkillRange"),
    focusCooldown: document.getElementById("focusCooldown"),
    focusSkillDesc: document.getElementById("focusSkillDesc"),
    skillDock: document.getElementById("skillDock"),
    variantPreviewList: document.getElementById("variantPreviewList"),
    prevPet: document.getElementById("prevPet"),
    nextPet: document.getElementById("nextPet"),
    mobileOpenDetail: document.getElementById("mobileOpenDetail"),
    mobileShowRail: document.getElementById("mobileShowRail"),
    mobilePrevPet: document.getElementById("mobilePrevPet"),
    mobileNextPet: document.getElementById("mobileNextPet"),
    mobileDetailToolbar: document.getElementById("mobileDetailToolbar"),
    mobileSkillAccordion: document.getElementById("mobileSkillAccordion"),
    mobileLoadingIndicator: document.getElementById("mobileLoadingIndicator"),
    skillFocusCard: document.querySelector(".skill-focus-card"),
    detailRail: document.querySelector(".detail-rail"),
  };

  const state = {
    activeCategoryKey: "",
    activePetSubgroupKey: "gacha",
    selectedIndexByCategory: {},
    selectedSkillKeyByPet: {},
    selectedVariantBySkillKey: {},
    selectedWeaponEquipmentSetKeyByEntityId: {},
    scheduleCalibration: null,
    showPastRailItems: false,
    mobileView: "detail",
    mobileVariantScrollBySkillKey: {},
    mobileViewportScrollByView: { rail: 0, detail: 0 },
    rouletteCalculator: {
      kind: "weapon",
      currentPulls: 0,
      ownedTickets: 0,
      carriedTickets: 0,
      missionCompletedDays: 0,
      todayMissionTickets: 0,
      missedMissionTickets: 0,
      missionDays: 14,
      waitMissionDays: 0,
      includeBlueGemSupply: true,
      considerNextCycle: true,
      purchasedOptions: {},
      availableOptions: {},
    },
  };

  const spineState = {
    app: null,
    preview: null,
    resizeObserver: null,
    currentCharacterId: "",
    mode: "idle",
    assetKind: "",
    loadToken: 0,
    layoutRaf: 0,
  };

  let sceneLayoutRaf = 0;
  let mobileViewportScrollRaf = 0;
  let railSelectionScrollRaf = 0;
  let mobileViewSwitchRaf = 0;
  let mobileLoadingHideTimer = 0;
  let mobileLoadingVisibleSince = 0;
  let mobileScheduleTooltipHoldTimer = 0;
  let mobileScheduleTooltipHideTimer = 0;
  let mobileScheduleTooltipSuppressClickUntil = 0;
  const mobileViewportQuery = window.matchMedia("(max-width: 900px)");
  const KOREA_TIME_ZONE = "Asia/Seoul";
  const DAY_MS = 24 * 60 * 60 * 1000;
  const KR1_RESET_HOUR = 9;
  const KR1_SERVER_OPEN_DATE_TIME_KEY = "2026-03-03 09:00:00";
  const SCHEDULE_CALIBRATION_STORAGE_KEY = "gachaViewer.scheduleCalibration.v1";
  const SCHEDULE_CALIBRATION_PROMPT_STORAGE_KEY = "gachaViewer.scheduleCalibrationPromptSeen.v2";
  const MOBILE_HISTORY_STATE_KEY = "__gachaViewerMobileState";
  const koreaDateFormatter = typeof Intl !== "undefined" && typeof Intl.DateTimeFormat === "function"
    ? new Intl.DateTimeFormat("en-US", {
      timeZone: KOREA_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    : null;
  const koreaDateTimeFormatter = typeof Intl !== "undefined" && typeof Intl.DateTimeFormat === "function"
    ? new Intl.DateTimeFormat("en-US", {
      timeZone: KOREA_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      hourCycle: "h23",
    })
    : null;
  let wasMobileLayout = false;
  let lastScheduleStatusTickKey = "";
  let scheduleCalibrationOptionsCache = null;
  let spineRuntimePromise = null;
  const spineManifestLoadPromises = new Map();
  const spineResourceTextPromises = new Map();
  const spineResourceBinaryPromises = new Map();
  const activeMobileLoadingTasks = new Set();
  const activePressTargetByPointerId = new Map();
  const MOBILE_PRESSABLE_SELECTOR = [
    ".collection-tab",
    ".rail-calculator-action",
    ".pet-subfilter",
    ".pet-item",
    ".mobile-menu-toggle",
    ".mobile-inline-arrow",
    ".equipment-set-entry",
    ".mobile-skill-button",
    ".mobile-variant-chip",
    ".skill-button",
    ".variant-preview-entry",
    ".roulette-calculator-button",
    ".roulette-calculator-kind",
    ".roulette-calculator-preset",
    ".roulette-calculator-back",
  ].join(", ");
  const PLACEHOLDER_PET_ICON = "assets/pets/ss-pet-placeholder.svg";
  const PLACEHOLDER_PET_BANNER = "assets/banners/ss-pet-placeholder-banner.svg";
  const EXTRA_PET_DETAIL_META_LABEL = "기본 정보만 우선 수록";
  const ROULETTE_CALCULATOR_CATEGORY_KEY = "rouletteCalculator";
  const ROULETTE_CALCULATOR_CATEGORY = Object.freeze({
    key: ROULETTE_CALCULATOR_CATEGORY_KEY,
    label: "계산기",
    railTitle: "룰렛 계산기",
    railCopy: "무기와 탈것 티켓 누적, 미션, 핫딜 기준으로 500회 최저가를 계산합니다.",
  });
  const ROULETTE_CALCULATOR_ENABLED = false;
  const ROULETTE_TARGET_PULLS = 500;
  const ROULETTE_MISSION_TICKETS_PER_DAY = 10;
  const ROULETTE_MAX_MISSION_DAYS = 14;
  const ROULETTE_BLUE_GEM_SUPPLY_TICKETS = 10;
  const ROULETTE_KIND_META = Object.freeze({
    weapon: Object.freeze({ key: "weapon", label: "무기", ticketLabel: "무기 룰렛 티켓", genericLabel: "무기 룰렛 패키지" }),
    ride: Object.freeze({ key: "ride", label: "탈것", ticketLabel: "탑승펫 룰렛 티켓", genericLabel: "탑승펫 룰렛 패키지" }),
  });
  const ROULETTE_OPENING_SPECIALS = Object.freeze([
    Object.freeze({ key: "special1", label: "오픈 기념 특가 I", tickets: 15, cost: 3000, order: 10 }),
    Object.freeze({ key: "special2", label: "오픈 기념 특가 II", tickets: 25, cost: 6000, order: 20 }),
    Object.freeze({ key: "special3", label: "오픈 기념 특가 III", tickets: 50, cost: 12000, order: 30 }),
  ]);
  const ROULETTE_HOTDEALS = Object.freeze([
    Object.freeze({ key: "hot100", label: "100회 기념 핫딜", threshold: 100, tickets: 50, cost: 15000, order: 100 }),
    Object.freeze({ key: "hot200", label: "200회 기념 핫딜", threshold: 200, tickets: 90, cost: 39000, order: 200 }),
  ]);
  const ROULETTE_NEXT_HOTDEAL = Object.freeze({
    key: "hot500",
    label: "500회 기념 핫딜",
    threshold: 500,
    tickets: 250,
    cost: 119000,
  });
  const ROULETTE_GENERIC_PACKAGES = Object.freeze([
    Object.freeze({ key: "package1", roman: "I", tickets: 4, cost: 1500, maxCount: 1, order: 300 }),
    Object.freeze({ key: "package2", roman: "II", tickets: 8, cost: 4400, maxCount: 1, order: 310 }),
    Object.freeze({ key: "package3", roman: "III", tickets: 20, cost: 9900, maxCount: 1, order: 320 }),
    Object.freeze({ key: "package4", roman: "IV", tickets: 42, cost: 25000, maxCount: 1, order: 330 }),
    Object.freeze({ key: "package5", roman: "V", tickets: 65, cost: 45000, maxCount: 2, order: 340 }),
    Object.freeze({ key: "package6", roman: "VI", tickets: 130, cost: 99000, maxCount: 4, order: 350 }),
  ]);
  const ROULETTE_AVAILABLE_OPTION_KEYS = Object.freeze([
    "special1",
    "special2",
    "special3",
    "hot100",
    "hot200",
    "genericPackages",
    "hot500",
  ]);
  const ROULETTE_PURCHASED_OPTION_KEYS = Object.freeze([
    "special1",
    "special2",
    "special3",
    "hot100",
    "hot200",
    "hot500",
    "package1",
    "package2",
    "package3",
    "package4",
    "package5",
    "package6",
  ]);

  function isMobileLayout() {
    return Boolean(mobileViewportQuery && mobileViewportQuery.matches);
  }

  function scrollContainerToTop(element) {
    if (!element || typeof element.scrollTo !== "function") return;
    element.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  function updateMobileLoadingVisibility() {
    const active = isMobileLayout() && activeMobileLoadingTasks.size > 0;
    if (document.body) {
      document.body.classList.toggle("is-mobile-loading", active);
    }
    if (elements.mobileLoadingIndicator) {
      elements.mobileLoadingIndicator.hidden = !active;
    }
    if (active && !mobileLoadingVisibleSince) {
      mobileLoadingVisibleSince = (window.performance && typeof window.performance.now === "function")
        ? window.performance.now()
        : Date.now();
    }
    if (!active) {
      mobileLoadingVisibleSince = 0;
    }
  }

  function setMobileLoading(taskKey, active) {
    if (!taskKey) return;

    if (active) {
      if (mobileLoadingHideTimer) {
        window.clearTimeout(mobileLoadingHideTimer);
        mobileLoadingHideTimer = 0;
      }
      activeMobileLoadingTasks.add(taskKey);
      updateMobileLoadingVisibility();
      return;
    }

    activeMobileLoadingTasks.delete(taskKey);
    if (activeMobileLoadingTasks.size > 0) {
      updateMobileLoadingVisibility();
      return;
    }

    const now = (window.performance && typeof window.performance.now === "function")
      ? window.performance.now()
      : Date.now();
    const elapsed = mobileLoadingVisibleSince ? (now - mobileLoadingVisibleSince) : 0;
    const remaining = Math.max(0, 180 - elapsed);
    if (mobileLoadingHideTimer) {
      window.clearTimeout(mobileLoadingHideTimer);
    }
    mobileLoadingHideTimer = window.setTimeout(() => {
      mobileLoadingHideTimer = 0;
      updateMobileLoadingVisibility();
    }, remaining);
  }

  function finishMobileLoadingSoon(taskKey) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setMobileLoading(taskKey, false);
      });
    });
  }

  function clearMobileScheduleTooltipTimers() {
    if (mobileScheduleTooltipHoldTimer) {
      window.clearTimeout(mobileScheduleTooltipHoldTimer);
      mobileScheduleTooltipHoldTimer = 0;
    }
    if (mobileScheduleTooltipHideTimer) {
      window.clearTimeout(mobileScheduleTooltipHideTimer);
      mobileScheduleTooltipHideTimer = 0;
    }
  }

  function hideMobileScheduleAdjustTooltip() {
    if (elements.scheduleAdjustButton) {
      elements.scheduleAdjustButton.classList.remove("is-mobile-tooltip-visible");
    }
  }

  function showMobileScheduleAdjustTooltip() {
    if (!isMobileLayout() || !elements.scheduleAdjustButton) return;
    elements.scheduleAdjustButton.classList.add("is-mobile-tooltip-visible");
    if (mobileScheduleTooltipHideTimer) {
      window.clearTimeout(mobileScheduleTooltipHideTimer);
    }
    mobileScheduleTooltipHideTimer = window.setTimeout(() => {
      mobileScheduleTooltipHideTimer = 0;
      hideMobileScheduleAdjustTooltip();
    }, 2200);
  }

  function clearMobilePressState(pointerId) {
    const target = activePressTargetByPointerId.get(pointerId);
    if (!target) return;
    target.classList.remove("is-pressed");
    activePressTargetByPointerId.delete(pointerId);
  }

  function clearAllMobilePressStates() {
    activePressTargetByPointerId.forEach((target) => {
      if (target && target.classList) {
        target.classList.remove("is-pressed");
      }
    });
    activePressTargetByPointerId.clear();
  }

  function setMobileViewSwitching(active) {
    if (!document.body) return;
    document.body.classList.toggle("is-mobile-view-switching", Boolean(active) && isMobileLayout());
  }

  function finishMobileViewSwitch(targetScrollTop = 0) {
    if (!isMobileLayout()) {
      setMobileViewSwitching(false);
      return;
    }

    if (mobileViewSwitchRaf) {
      window.cancelAnimationFrame(mobileViewSwitchRaf);
      mobileViewSwitchRaf = 0;
    }

    setMobileViewSwitching(true);
    let framesRemaining = 2;
    const step = () => {
      if (state.mobileView === "detail") {
        setViewportScrollTop(targetScrollTop);
        scrollContainerToTop(elements.stage);
      }
      framesRemaining -= 1;
      if (framesRemaining > 0) {
        mobileViewSwitchRaf = window.requestAnimationFrame(step);
        return;
      }
      mobileViewSwitchRaf = 0;
      setMobileViewSwitching(false);
    };
    mobileViewSwitchRaf = window.requestAnimationFrame(step);
  }

  function padNumber(value) {
    return String(value).padStart(2, "0");
  }

  function extractFormatterParts(date, formatter) {
    if (!formatter || typeof formatter.formatToParts !== "function") {
      return null;
    }
    const parts = formatter.formatToParts(date);
    const getValue = (type, fallback) => parts.find((part) => part.type === type)?.value || fallback;
    return {
      year: getValue("year", String(date.getFullYear())),
      month: getValue("month", padNumber(date.getMonth() + 1)),
      day: getValue("day", padNumber(date.getDate())),
      hour: getValue("hour", padNumber(date.getHours())),
      minute: getValue("minute", padNumber(date.getMinutes())),
      second: getValue("second", padNumber(date.getSeconds())),
    };
  }

  function getTimeZoneDateKey(date = new Date()) {
    const parts = extractFormatterParts(date, koreaDateFormatter);
    if (!parts) {
      return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
    }
    return `${parts.year}-${parts.month}-${parts.day}`;
  }

  function getTimeZoneDateTimeKey(date = new Date()) {
    const parts = extractFormatterParts(date, koreaDateTimeFormatter);
    if (!parts) {
      return `${getTimeZoneDateKey(date)} ${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
    }
    return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
  }

  function normalizeScheduleDateKey(value) {
    const raw = String(value || "").trim().replace(/\./g, "-");
    const match = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
  }

  function normalizeDateTimeKey(value) {
    const raw = String(value || "").trim().replace("T", " ");
    const match = raw.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
    return match ? `${match[1]}-${match[2]}-${match[3]} ${match[4]}:${match[5]}:${match[6] || "00"}` : "";
  }

  function splitDateTimeKeyParts(dateTimeKey) {
    const normalized = normalizeDateTimeKey(dateTimeKey);
    if (!normalized) return null;
    const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
    if (!match) return null;
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
      hour: Number(match[4]),
      minute: Number(match[5]),
      second: Number(match[6]),
    };
  }

  function dateTimeKeyToTimestamp(dateTimeKey) {
    const parts = splitDateTimeKeyParts(dateTimeKey);
    if (!parts) return Number.NaN;
    return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  }

  function timestampToDateTimeKey(timestamp) {
    if (!Number.isFinite(timestamp)) return "";
    const date = new Date(timestamp);
    return `${date.getUTCFullYear()}-${padNumber(date.getUTCMonth() + 1)}-${padNumber(date.getUTCDate())} ${padNumber(date.getUTCHours())}:${padNumber(date.getUTCMinutes())}:${padNumber(date.getUTCSeconds())}`;
  }

  function dateTimeKeyToDateKey(dateTimeKey) {
    const normalized = normalizeDateTimeKey(dateTimeKey);
    return normalized ? normalized.slice(0, 10) : "";
  }

  function addDaysToDateKey(dateKey, dayOffset) {
    const match = String(dateKey || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return "";
    const shifted = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + dayOffset));
    return `${shifted.getUTCFullYear()}-${padNumber(shifted.getUTCMonth() + 1)}-${padNumber(shifted.getUTCDate())}`;
  }

  function addDaysToDateTimeKey(dateTimeKey, dayOffset) {
    const timestamp = dateTimeKeyToTimestamp(dateTimeKey);
    if (!Number.isFinite(timestamp)) return "";
    return timestampToDateTimeKey(timestamp + (Number(dayOffset || 0) * DAY_MS));
  }

  function dateKeyToDateTimeKey(dateKey, sourceDateTimeKey = KR1_SERVER_OPEN_DATE_TIME_KEY) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    const normalizedSourceDateTimeKey = normalizeDateTimeKey(sourceDateTimeKey) || KR1_SERVER_OPEN_DATE_TIME_KEY;
    if (!normalizedDateKey) return "";
    return `${normalizedDateKey} ${normalizedSourceDateTimeKey.slice(11)}`;
  }

  function addSecondsToDateTimeKey(dateTimeKey, secondOffset) {
    const timestamp = dateTimeKeyToTimestamp(dateTimeKey);
    if (!Number.isFinite(timestamp)) return "";
    return timestampToDateTimeKey(timestamp + (Number(secondOffset || 0) * 1000));
  }

  function addHoursToDateTimeKey(dateTimeKey, hourOffset) {
    return addSecondsToDateTimeKey(dateTimeKey, Number(hourOffset || 0) * 60 * 60);
  }

  function tableTimeToDisplayDateTimeKey(dateTimeKey) {
    return addHoursToDateTimeKey(dateTimeKey, 9);
  }

  function displayTimeToTableDateTimeKey(dateTimeKey) {
    return addHoursToDateTimeKey(dateTimeKey, -9);
  }

  function tableDateStartDateTimeKey(dateKey) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    return normalizedDateKey ? `${normalizedDateKey} 00:00:00` : "";
  }

  function tableDateEndDateTimeKey(dateKey) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    return normalizedDateKey ? `${normalizedDateKey} 23:59:59` : "";
  }

  function maxDateTimeKey(left, right) {
    if (!left) return right || "";
    if (!right) return left || "";
    return left >= right ? left : right;
  }

  function dateKeyDayOfWeek(dateKey) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    if (!normalizedDateKey) return Number.NaN;
    const [year, month, day] = normalizedDateKey.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  }

  function resolveOpenDayWeekDateKey(dateKey, targetDayOfWeek, timeSettingType) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    if (!normalizedDateKey) return "";
    const currentDayOfWeek = dateKeyDayOfWeek(normalizedDateKey);
    if (!Number.isFinite(currentDayOfWeek)) return "";
    const type = Number(timeSettingType);
    const isSundayType = type === 14 || type === 19;
    const dayOffset = currentDayOfWeek === 0 && !isSundayType
      ? targetDayOfWeek
      : targetDayOfWeek - currentDayOfWeek + 7;
    return addDaysToDateKey(normalizedDateKey, dayOffset);
  }

  function resolveOpenDayWeekDateTimeKey(dateTimeKey, targetDayOfWeek, timeSettingType) {
    const normalizedDateTimeKey = normalizeDateTimeKey(dateTimeKey);
    if (!normalizedDateTimeKey) return "";
    const resolvedDateKey = resolveOpenDayWeekDateKey(
      dateTimeKeyToDateKey(normalizedDateTimeKey),
      targetDayOfWeek,
      timeSettingType,
    );
    return resolvedDateKey ? `${resolvedDateKey} ${normalizedDateTimeKey.slice(11)}` : "";
  }

  function normalizeScheduleRule(scheduleRule) {
    if (!scheduleRule || typeof scheduleRule !== "object") return null;
    const parsedTimeType = Number.parseInt(scheduleRule.timeType, 10);
    if (!Number.isFinite(parsedTimeType)) return null;

    const normalizedRule = { timeType: parsedTimeType };
    const parsedOpenDay = Number.parseInt(scheduleRule.openDay, 10);
    const parsedPeriod = Number.parseInt(scheduleRule.period, 10);
    const normalizedStartDateTime = normalizeDateTimeKey(scheduleRule.start);
    const normalizedEndDateTime = normalizeDateTimeKey(scheduleRule.end);
    const normalizedStart = normalizeScheduleDateKey(scheduleRule.start);
    const normalizedEnd = normalizeScheduleDateKey(scheduleRule.end);

    if (Number.isFinite(parsedOpenDay)) {
      normalizedRule.openDay = parsedOpenDay;
    }
    if (Number.isFinite(parsedPeriod)) {
      normalizedRule.period = Math.max(1, parsedPeriod);
    }
    if (normalizedStartDateTime) {
      normalizedRule.startDateTime = normalizedStartDateTime;
    }
    if (normalizedEndDateTime) {
      normalizedRule.endDateTime = normalizedEndDateTime;
    }
    if (normalizedStart) {
      normalizedRule.start = normalizedStart;
    }
    if (normalizedEnd) {
      normalizedRule.end = normalizedEnd;
    }
    if (scheduleRule.syncAnchor && typeof scheduleRule.syncAnchor === "object") {
      const normalizedSyncAnchor = normalizeScheduleRule(scheduleRule.syncAnchor);
      if (normalizedSyncAnchor) {
        normalizedRule.syncAnchor = normalizedSyncAnchor;
      }
    }
    return normalizedRule;
  }

  function resolveDynamicRuleStartDateKey(scheduleRule, serverOpenDateKey) {
    if (!scheduleRule || !serverOpenDateKey) return "";
    const timeType = Number(scheduleRule.timeType);
    if (
      timeType !== 2 && !isOpenDayPeriodTimeSetting(timeType)
      || !Number.isFinite(scheduleRule.openDay)
    ) {
      return "";
    }
    const thresholdDateKey = addDaysToDateKey(serverOpenDateKey, scheduleRule.openDay);
    if (timeType === 2) {
      return thresholdDateKey;
    }
    if (isOpenDayPeriodTimeSetting(timeType)) {
      const weekday = timeSettingWeekday(timeType);
      return Number.isFinite(weekday)
        ? resolveOpenDayWeekDateKey(thresholdDateKey, weekday, timeType)
        : "";
    }
    return "";
  }

  function timeSettingWeekday(timeSettingType) {
    switch (Number(timeSettingType)) {
      case 4:
      case 5:
        return 2; // Tuesday
      case 8:
      case 9:
        return 6; // Saturday
      case 10:
      case 17:
        return 4; // Thursday
      case 11:
      case 15:
        return 1; // Monday
      case 12:
      case 16:
        return 3; // Wednesday
      case 13:
      case 18:
        return 5; // Friday
      case 14:
      case 19:
        return 0; // Sunday
      default:
        return Number.NaN;
    }
  }

  function isOpenDayPeriodTimeSetting(timeSettingType) {
    return [4, 8, 10, 11, 12, 13, 14].includes(Number(timeSettingType));
  }

  function isOpenDayStartEndTimeSetting(timeSettingType) {
    return [5, 9, 15, 16, 17, 18, 19].includes(Number(timeSettingType));
  }

  function tableTimeInfoStartDateTimeKey(schedule, scheduleRule) {
    const explicitStart = normalizeDateTimeKey(scheduleRule?.startDateTime || scheduleRule?.start || schedule?.start || "");
    if (explicitStart) return explicitStart;
    return tableDateStartDateTimeKey(scheduleRule?.start || schedule?.start || "");
  }

  function tableTimeInfoEndDateTimeKey(schedule, scheduleRule) {
    const explicitEnd = normalizeDateTimeKey(scheduleRule?.endDateTime || scheduleRule?.end || schedule?.end || "");
    if (explicitEnd) return explicitEnd;
    return tableDateEndDateTimeKey(scheduleRule?.end || schedule?.end || "");
  }

  function resolveTableTimeInfoWindow(schedule, serverOpenDateTimeKey = getActiveServerOpenDateTimeKey()) {
    const scheduleRule = normalizeScheduleRule(schedule?.scheduleRule);
    const normalizedServerOpenDisplayKey = normalizeDateTimeKey(serverOpenDateTimeKey)
      || KR1_SERVER_OPEN_DATE_TIME_KEY;
    const serverOpenTableKey = displayTimeToTableDateTimeKey(normalizedServerOpenDisplayKey);
    const tableStartKey = tableTimeInfoStartDateTimeKey(schedule, scheduleRule);
    const tableEndKey = tableTimeInfoEndDateTimeKey(schedule, scheduleRule);
    const tableEndExclusiveKey = tableEndKey ? addSecondsToDateTimeKey(tableEndKey, 1) : "";
    const type = Number(scheduleRule?.timeType);

    let resolvedStartTableKey = "";
    let resolvedEndExclusiveTableKey = "";
    let visible = true;

    if (scheduleRule && Number.isFinite(type)) {
      if (type === 1) {
        resolvedStartTableKey = tableStartKey;
        resolvedEndExclusiveTableKey = tableEndExclusiveKey;
      } else if (type === 2) {
        const periodDays = Math.max(1, Number(scheduleRule.period) || 1);
        resolvedStartTableKey = Number.isFinite(scheduleRule.openDay)
          ? addDaysToDateTimeKey(serverOpenTableKey, scheduleRule.openDay)
          : "";
        resolvedEndExclusiveTableKey = resolvedStartTableKey
          ? addDaysToDateTimeKey(resolvedStartTableKey, periodDays)
          : "";
      } else if (type === 6) {
        const openTableKey = Number.isFinite(scheduleRule.openDay)
          ? addDaysToDateTimeKey(serverOpenTableKey, scheduleRule.openDay)
          : "";
        resolvedStartTableKey = maxDateTimeKey(tableStartKey, openTableKey);
        resolvedEndExclusiveTableKey = tableEndExclusiveKey;
      } else if (isOpenDayPeriodTimeSetting(type)) {
        const weekday = timeSettingWeekday(type);
        const periodDays = Math.max(1, Number(scheduleRule.period) || 1);
        const thresholdTableKey = Number.isFinite(scheduleRule.openDay)
          ? addDaysToDateTimeKey(serverOpenTableKey, scheduleRule.openDay)
          : "";
        resolvedStartTableKey = Number.isFinite(weekday)
          ? resolveOpenDayWeekDateTimeKey(thresholdTableKey, weekday, type)
          : "";
        resolvedEndExclusiveTableKey = resolvedStartTableKey
          ? addDaysToDateTimeKey(resolvedStartTableKey, periodDays)
          : "";
      } else if (isOpenDayStartEndTimeSetting(type)) {
        const weekday = timeSettingWeekday(type);
        const thresholdTableKey = Number.isFinite(scheduleRule.openDay)
          ? addDaysToDateTimeKey(serverOpenTableKey, scheduleRule.openDay)
          : "";
        const openTableKey = Number.isFinite(weekday)
          ? resolveOpenDayWeekDateTimeKey(thresholdTableKey, weekday, type)
          : "";
        if (openTableKey && tableEndKey && tableEndKey < openTableKey) {
          visible = false;
        } else {
          resolvedStartTableKey = maxDateTimeKey(tableStartKey, openTableKey);
          resolvedEndExclusiveTableKey = tableEndExclusiveKey;
        }
      } else {
        resolvedStartTableKey = tableStartKey;
        resolvedEndExclusiveTableKey = tableEndExclusiveKey;
      }
    } else {
      resolvedStartTableKey = tableStartKey;
      resolvedEndExclusiveTableKey = tableEndExclusiveKey;
    }

    const resolvedStartDateTimeKey = resolvedStartTableKey
      ? tableTimeToDisplayDateTimeKey(resolvedStartTableKey)
      : "";
    const resolvedEndExclusiveDateTimeKey = resolvedEndExclusiveTableKey
      ? tableTimeToDisplayDateTimeKey(resolvedEndExclusiveTableKey)
      : "";

    return {
      scheduleRule,
      resolvedStartDateTimeKey,
      resolvedEndExclusiveDateTimeKey,
      resolvedStartDateKey: dateTimeKeyToDateKey(resolvedStartDateTimeKey),
      resolvedEndExclusiveDateKey: dateTimeKeyToDateKey(resolvedEndExclusiveDateTimeKey),
      visible,
    };
  }

  function dateKeyDayOffset(baseDateKey, targetDateKey) {
    const normalizedBase = normalizeScheduleDateKey(baseDateKey);
    const normalizedTarget = normalizeScheduleDateKey(targetDateKey);
    if (!normalizedBase || !normalizedTarget) return Number.NaN;
    const baseParts = normalizedBase.split("-").map(Number);
    const targetParts = normalizedTarget.split("-").map(Number);
    const baseTimestamp = Date.UTC(baseParts[0], baseParts[1] - 1, baseParts[2]);
    const targetTimestamp = Date.UTC(targetParts[0], targetParts[1] - 1, targetParts[2]);
    return Math.round((targetTimestamp - baseTimestamp) / DAY_MS);
  }

  function getBaselineServerOpenDateKey() {
    return dateTimeKeyToDateKey(KR1_SERVER_OPEN_DATE_TIME_KEY);
  }

  function scheduleOffsetInfo(schedule) {
    const startKey = normalizeScheduleDateKey(schedule?.start);
    const endKey = normalizeScheduleDateKey(schedule?.end);
    const endExclusiveKey = endKey ? addDaysToDateKey(endKey, 1) : "";
    const baselineOpenDateKey = getBaselineServerOpenDateKey();
    return {
      startKey,
      endKey,
      endExclusiveKey,
      startOffsetDays: startKey ? dateKeyDayOffset(baselineOpenDateKey, startKey) : Number.NaN,
      endExclusiveOffsetDays: endExclusiveKey ? dateKeyDayOffset(baselineOpenDateKey, endExclusiveKey) : Number.NaN,
    };
  }

  function defaultScheduleCalibration() {
    return {
      mode: "kr1",
      serverOpenDateTimeKey: KR1_SERVER_OPEN_DATE_TIME_KEY,
      optionId: "",
    };
  }

  function pageParamServerOpenDateTimeKey() {
    const rawValue = pageParams.get("serverOpen")
      || pageParams.get("server_open")
      || pageParams.get("openDate")
      || "";
    const normalizedDateTimeKey = normalizeDateTimeKey(rawValue);
    if (normalizedDateTimeKey) {
      return normalizedDateTimeKey;
    }
    const normalizedDateKey = normalizeScheduleDateKey(rawValue);
    return normalizedDateKey
      ? dateKeyToDateTimeKey(normalizedDateKey, KR1_SERVER_OPEN_DATE_TIME_KEY)
      : "";
  }

  function loadScheduleCalibration() {
    const fallback = defaultScheduleCalibration();
    const pageParamKey = pageParamServerOpenDateTimeKey();
    if (pageParamKey) {
      return {
        mode: "custom",
        serverOpenDateTimeKey: pageParamKey,
        optionId: "",
      };
    }
    try {
      const raw = window.localStorage.getItem(SCHEDULE_CALIBRATION_STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      const serverOpenDateTimeKey = normalizeDateTimeKey(parsed?.serverOpenDateTimeKey);
      if (parsed?.mode === "custom" && serverOpenDateTimeKey) {
        return {
          mode: "custom",
          serverOpenDateTimeKey,
          optionId: String(parsed.optionId || ""),
        };
      }
    } catch (error) {}
    return fallback;
  }

  function persistScheduleCalibration(calibration) {
    state.scheduleCalibration = calibration?.mode === "custom"
      ? {
        mode: "custom",
        serverOpenDateTimeKey: normalizeDateTimeKey(calibration.serverOpenDateTimeKey) || KR1_SERVER_OPEN_DATE_TIME_KEY,
        optionId: String(calibration.optionId || ""),
      }
      : defaultScheduleCalibration();

    try {
      if (state.scheduleCalibration.mode === "custom") {
        window.localStorage.setItem(SCHEDULE_CALIBRATION_STORAGE_KEY, JSON.stringify(state.scheduleCalibration));
      } else {
        window.localStorage.removeItem(SCHEDULE_CALIBRATION_STORAGE_KEY);
      }
    } catch (error) {}
  }

  function markScheduleCalibrationPromptSeen() {
    try {
      window.localStorage.setItem(SCHEDULE_CALIBRATION_PROMPT_STORAGE_KEY, "1");
    } catch (error) {}
  }

  function shouldAutoOpenScheduleCalibration() {
    if (pageParams.get("calibrate") !== "1") return false;
    if (isMobileLayout()) return false;
    if (state.scheduleCalibration && state.scheduleCalibration.mode === "custom") return false;
    try {
      return window.localStorage.getItem(SCHEDULE_CALIBRATION_PROMPT_STORAGE_KEY) !== "1";
    } catch (error) {
      return true;
    }
  }

  function getActiveServerOpenDateTimeKey() {
    const customKey = normalizeDateTimeKey(state.scheduleCalibration?.serverOpenDateTimeKey);
    if (state.scheduleCalibration?.mode === "custom" && customKey) {
      return customKey;
    }
    return KR1_SERVER_OPEN_DATE_TIME_KEY;
  }

  function formatDisplayDateTimeKey(dateTimeKey) {
    const normalized = normalizeDateTimeKey(dateTimeKey);
    if (!normalized) return "";
    return `${normalized.slice(0, 10).replace(/-/g, ".")} ${normalized.slice(11, 16)}`;
  }

  function formatCompactDisplayDateTimeKey(dateTimeKey) {
    const normalized = normalizeDateTimeKey(dateTimeKey);
    if (!normalized) return "";
    return `${normalized.slice(5, 10).replace(/-/g, ".")} ${normalized.slice(11, 16)}`;
  }

  function currentScheduleReferenceParts() {
    if (state.scheduleCalibration?.mode === "custom") {
      return {
        label: "계산된 서버 오픈일 :",
        dateTime: formatDisplayDateTimeKey(getActiveServerOpenDateTimeKey()),
      };
    }
    return {
      label: "KR 1 서버 오픈일 :",
      dateTime: formatDisplayDateTimeKey(KR1_SERVER_OPEN_DATE_TIME_KEY),
    };
  }

  function currentScheduleReferenceLabel() {
    const reference = currentScheduleReferenceParts();
    return `${reference.label} ${reference.dateTime}`.trim();
  }

  function currentScheduleAdjustmentParts() {
    return {
      label: "현재 서버 오픈일 :",
      dateTime: formatDisplayDateTimeKey(getActiveServerOpenDateTimeKey()),
    };
  }

  function resolveScheduleWindow(schedule, serverOpenDateTimeKey = getActiveServerOpenDateTimeKey()) {
    const fallbackStatus = schedule?.status === "current" || schedule?.status === "upcoming"
      ? schedule.status
      : "past";
    const offsetInfo = scheduleOffsetInfo(schedule);
    const normalizedServerOpenKey = normalizeDateTimeKey(serverOpenDateTimeKey) || KR1_SERVER_OPEN_DATE_TIME_KEY;
    const resolvedTimeInfo = resolveTableTimeInfoWindow(schedule, normalizedServerOpenKey);
    const resolvedStartDateTimeKey = resolvedTimeInfo.resolvedStartDateTimeKey;
    const resolvedEndExclusiveDateTimeKey = resolvedTimeInfo.resolvedEndExclusiveDateTimeKey;
    const resolvedStartDateKey = resolvedTimeInfo.resolvedStartDateKey;
    const resolvedEndExclusiveDateKey = resolvedTimeInfo.resolvedEndExclusiveDateKey;
    const resolvedEndDateKey = resolvedEndExclusiveDateKey ? addDaysToDateKey(resolvedEndExclusiveDateKey, -1) : "";
    const baselineOpenDateKey = getBaselineServerOpenDateKey();
    const resolvedStartOffsetDays = resolvedStartDateKey
      ? dateKeyDayOffset(baselineOpenDateKey, resolvedStartDateKey)
      : offsetInfo.startOffsetDays;
    const resolvedEndExclusiveOffsetDays = resolvedEndExclusiveDateKey
      ? dateKeyDayOffset(baselineOpenDateKey, resolvedEndExclusiveDateKey)
      : offsetInfo.endExclusiveOffsetDays;

    return {
      ...offsetInfo,
      scheduleRule: resolvedTimeInfo.scheduleRule,
      fallbackStatus,
      resolvedStartDateTimeKey,
      resolvedEndExclusiveDateTimeKey,
      resolvedStartDateKey,
      resolvedEndDateKey,
      startOffsetDays: resolvedStartOffsetDays,
      endExclusiveOffsetDays: resolvedEndExclusiveOffsetDays,
      visible: !resolvedTimeInfo.visible
        ? false
        : resolvedEndExclusiveDateTimeKey
        ? resolvedEndExclusiveDateTimeKey > normalizedServerOpenKey
        : (resolvedStartDateTimeKey ? resolvedStartDateTimeKey >= normalizedServerOpenKey : true),
    };
  }

  function resolveScheduleStatus(scheduleWindow, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    if (scheduleWindow?.cancelled) {
      return "cancelled";
    }
    const fallbackStatus = scheduleWindow?.fallbackStatus || "past";
    const startDateTimeKey = scheduleWindow?.resolvedStartDateTimeKey || "";
    const endExclusiveDateTimeKey = scheduleWindow?.resolvedEndExclusiveDateTimeKey || "";

    if (!startDateTimeKey && !endExclusiveDateTimeKey) {
      return fallbackStatus;
    }
    if (startDateTimeKey && currentDateTimeKey < startDateTimeKey) {
      return "upcoming";
    }
    if (endExclusiveDateTimeKey && currentDateTimeKey >= endExclusiveDateTimeKey) {
      return "past";
    }
    return "current";
  }

  function resolveScheduleToneMeta(scheduleWindow, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    const resolvedStatus = scheduleWindow?.resolvedStatus || resolveScheduleStatus(scheduleWindow, currentDateTimeKey);
    if (resolvedStatus === "cancelled") {
      return {
        tone: "cancelled",
        listLabel: "취소",
        scheduleLabel: String(scheduleWindow?.cancelledLabel || "03.19 패치로 취소"),
      };
    }
    if (resolvedStatus === "current") {
      return {
        tone: "current",
        listLabel: "진행 중",
        scheduleLabel: "진행 중",
      };
    }

    if (resolvedStatus === "past") {
      return {
        tone: "past",
        listLabel: "종료",
        scheduleLabel: "종료",
      };
    }

    const startDateTimeKey = scheduleWindow?.resolvedStartDateTimeKey || "";
    const currentTimestamp = dateTimeKeyToTimestamp(currentDateTimeKey);
    const startTimestamp = dateTimeKeyToTimestamp(startDateTimeKey);
    const currentDateKey = dateTimeKeyToDateKey(currentDateTimeKey);
    const startDateKey = dateTimeKeyToDateKey(startDateTimeKey);
    const tomorrowDateKey = currentDateKey ? addDaysToDateKey(currentDateKey, 1) : "";
    if (Number.isFinite(currentTimestamp) && Number.isFinite(startTimestamp)) {
      const diffMs = Math.max(0, startTimestamp - currentTimestamp);
      if (startDateKey && currentDateKey && startDateKey === currentDateKey) {
        return {
          tone: "today",
          listLabel: "오늘 오픈",
          scheduleLabel: "오늘 오픈",
        };
      }
      if (startDateKey && tomorrowDateKey && startDateKey === tomorrowDateKey) {
        return {
          tone: "soon",
          listLabel: "내일 오픈",
          scheduleLabel: "내일 오픈",
        };
      }
      if (diffMs <= DAY_MS * 3) {
        return {
          tone: "imminent",
          listLabel: "오픈 임박",
          scheduleLabel: "오픈 임박",
        };
      }
    }

    return {
      tone: "upcoming",
      listLabel: "다음 일정",
      scheduleLabel: "예정",
    };
  }

  function getResolvedSchedules(pet, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    const schedules = Array.isArray(pet?.schedules) ? pet.schedules : [];
    const activeServerOpenDateTimeKey = getActiveServerOpenDateTimeKey();
    return schedules
      .map((item) => ({
        ...item,
        ...resolveScheduleWindow(item, activeServerOpenDateTimeKey),
      }))
      .filter((item) => item.visible)
      .map((item) => ({
        ...item,
        resolvedStatus: resolveScheduleStatus(item, currentDateTimeKey),
      }))
      .sort((left, right) => {
        const leftStart = left.resolvedStartDateTimeKey || "";
        const rightStart = right.resolvedStartDateTimeKey || "";
        if (leftStart !== rightStart) return leftStart.localeCompare(rightStart);
        const leftEnd = left.resolvedEndExclusiveDateTimeKey || "";
        const rightEnd = right.resolvedEndExclusiveDateTimeKey || "";
        return leftEnd.localeCompare(rightEnd);
      });
  }

  function scheduleCategoryLabel(category) {
    return String(category?.label || category?.key || "항목");
  }

  function scheduleCategoryPriority(categoryKey) {
    switch (String(categoryKey || "")) {
      case "pet":
        return 0;
      case "weapon":
        return 1;
      case "ride":
        return 2;
      default:
        return 99;
    }
  }

  function scheduleCalibrationGroupMeta(category, item) {
    const isEventItem = String(item?.listMetaLabel || "").trim() === "이벤트"
      || String(item?.detailMetaLabel || "").includes("누적소비")
      || String(item?.scheduleTitleOverride || "").includes("누적소비");

    if (isEventItem) {
      return {
        key: "event",
        label: "누적소비 이벤트",
        order: 3,
      };
    }

    return {
      key: String(category?.key || "other"),
      label: scheduleCategoryLabel(category),
      order: scheduleCategoryPriority(category?.key),
    };
  }

  function buildScheduleCalibrationOptions() {
    const options = [];
    getCategories().forEach((category) => {
      getItems(category).forEach((item, itemIndex) => {
        const schedules = Array.isArray(item?.schedules) ? item.schedules : [];
        schedules.forEach((schedule, scheduleIndex) => {
          const scheduleWindow = resolveScheduleWindow(schedule, KR1_SERVER_OPEN_DATE_TIME_KEY);
          const scheduleRule = normalizeScheduleRule(schedule?.scheduleRule);
          if (schedule?.cancelled) {
            return;
          }
          if (!scheduleWindow.resolvedStartDateTimeKey || !scheduleWindow.resolvedEndExclusiveDateTimeKey) {
            return;
          }
          const itemOrder = displayOrderValue(category, item) || (itemIndex + 1);
          const groupMeta = scheduleCalibrationGroupMeta(category, item);
          const optionName = String(item?.name || "");
          options.push({
            id: `${category.key}:${getEntityId(item)}:${scheduleIndex}`,
            categoryKey: category.key,
            categoryLabel: scheduleCategoryLabel(category),
            groupKey: groupMeta.key,
            groupLabel: groupMeta.label,
            groupOrder: groupMeta.order,
            itemId: getEntityId(item),
            itemName: String(item?.name || ""),
            scheduleIndex,
            startOffsetDays: scheduleWindow.startOffsetDays,
            endExclusiveOffsetDays: scheduleWindow.endExclusiveOffsetDays,
            ruleTimeType: scheduleRule?.timeType || 0,
            ruleOpenDay: Number.isFinite(scheduleRule?.openDay) ? scheduleRule.openDay : Number.NaN,
            autoInferenceSupported: !scheduleRule || scheduleRule.timeType === 2,
            resolvedStartDateKey: scheduleWindow.resolvedStartDateKey || "",
            resolvedEndDateKey: scheduleWindow.resolvedEndDateKey || "",
            summary: formatScheduleDisplayRange(
              schedule.start,
              schedule.end,
              scheduleWindow.resolvedStartDateTimeKey,
              scheduleWindow.resolvedEndExclusiveDateTimeKey,
            ),
            label: `${scheduleIndex + 1}차 · ${optionName}`,
            sortOrder: itemOrder,
            cycleOrder: scheduleIndex,
            durationDays: Math.max(1, Number(scheduleWindow.endExclusiveOffsetDays) - Number(scheduleWindow.startOffsetDays)),
          });
        });
      });
    });

    return options.sort((left, right) => {
      if (left.groupOrder !== right.groupOrder) {
        return left.groupOrder - right.groupOrder;
      }
      if (left.cycleOrder !== right.cycleOrder) {
        return left.cycleOrder - right.cycleOrder;
      }
      if (left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
      }
      return left.scheduleIndex - right.scheduleIndex;
    });
  }

  function getScheduleCalibrationOptions() {
    if (!scheduleCalibrationOptionsCache) {
      scheduleCalibrationOptionsCache = buildScheduleCalibrationOptions();
    }
    return scheduleCalibrationOptionsCache;
  }

  function findScheduleCalibrationOptionById(optionId) {
    return getScheduleCalibrationOptions().find((option) => option.id === optionId) || null;
  }

  function getSelectedScheduleCalibrationOption() {
    return findScheduleCalibrationOptionById(String(elements.scheduleAdjustSelect?.value || ""));
  }

  function preferredScheduleCalibrationOptionId() {
    const currentPet = getCurrentItem();
    const activeCategory = getActiveCategory();
    if (!currentPet) {
      return getScheduleCalibrationOptions()[0]?.id || "";
    }

    const currentEntityId = getEntityId(currentPet);
    const currentSchedules = getResolvedSchedules(currentPet);
    const preferredSchedule = currentSchedules.find((item) => item.resolvedStatus === "current")
      || currentSchedules.find((item) => item.resolvedStatus === "upcoming")
      || currentSchedules[0]
      || null;
    const rawSchedules = Array.isArray(currentPet?.schedules) ? currentPet.schedules : [];
    const preferredScheduleIndex = preferredSchedule
      ? rawSchedules.findIndex((item) => item.start === preferredSchedule.start && item.end === preferredSchedule.end)
      : 0;
    const preferredOptionId = `${activeCategory.key}:${currentEntityId}:${preferredScheduleIndex}`;
    return findScheduleCalibrationOptionById(preferredOptionId)?.id
      || getScheduleCalibrationOptions().find((option) => option.itemId === currentEntityId)?.id
      || getScheduleCalibrationOptions()[0]?.id
      || "";
  }

  function sanitizeScheduleAdjustmentValue(rawValue, max) {
    const digits = String(rawValue || "").replace(/\D+/g, "");
    if (!digits) return "0";
    return String(clamp(Number.parseInt(digits, 10) || 0, 0, max));
  }

  function scheduleAdjustmentMaxDurationMinutes(option) {
    const durationDays = Math.max(1, Number(option?.durationDays) || 7);
    return durationDays * 24 * 60;
  }

  function scheduleAdjustmentMaxDayValue(option) {
    return Math.max(1, Number(option?.durationDays) || 7);
  }

  function scheduleAdjustmentMaxLabel(option) {
    const maxMinutes = scheduleAdjustmentMaxDurationMinutes(option);
    const days = Math.floor(maxMinutes / (24 * 60));
    const hours = Math.floor((maxMinutes % (24 * 60)) / 60);
    const minutes = maxMinutes % 60;
    const parts = [];
    if (days > 0) parts.push(`${days}일`);
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes}분`);
    return parts.join(" ");
  }

  function writeScheduleAdjustmentDraft(draft) {
    if (elements.scheduleAdjustDays) elements.scheduleAdjustDays.value = String(draft.days);
    if (elements.scheduleAdjustHours) elements.scheduleAdjustHours.value = String(draft.hours);
    if (elements.scheduleAdjustMinutes) elements.scheduleAdjustMinutes.value = String(draft.minutes);
  }

  function normalizeScheduleAdjustmentInputs() {
    const option = getSelectedScheduleCalibrationOption();
    const maxDayValue = scheduleAdjustmentMaxDayValue(option);
    const dayValue = sanitizeScheduleAdjustmentValue(elements.scheduleAdjustDays?.value || "0", maxDayValue);
    const hourValue = sanitizeScheduleAdjustmentValue(elements.scheduleAdjustHours?.value || "0", 23);
    const minuteValue = sanitizeScheduleAdjustmentValue(elements.scheduleAdjustMinutes?.value || "0", 59);

    let totalMinutes = (Number.parseInt(dayValue, 10) || 0) * 24 * 60;
    totalMinutes += (Number.parseInt(hourValue, 10) || 0) * 60;
    totalMinutes += Number.parseInt(minuteValue, 10) || 0;

    const maxMinutes = scheduleAdjustmentMaxDurationMinutes(option);
    totalMinutes = clamp(totalMinutes, 0, maxMinutes);

    const normalizedDraft = {
      days: Math.floor(totalMinutes / (24 * 60)),
      hours: Math.floor((totalMinutes % (24 * 60)) / 60),
      minutes: totalMinutes % 60,
    };
    writeScheduleAdjustmentDraft(normalizedDraft);
    return normalizedDraft;
  }

  function readScheduleCalibrationDraft() {
    const option = getSelectedScheduleCalibrationOption();
    const maxDayValue = scheduleAdjustmentMaxDayValue(option);
    return {
      optionId: String(elements.scheduleAdjustSelect?.value || ""),
      days: clamp(Number.parseInt(elements.scheduleAdjustDays?.value || "0", 10) || 0, 0, maxDayValue),
      hours: clamp(Number.parseInt(elements.scheduleAdjustHours?.value || "0", 10) || 0, 0, 23),
      minutes: clamp(Number.parseInt(elements.scheduleAdjustMinutes?.value || "0", 10) || 0, 0, 59),
    };
  }

  function getManualScheduleAdjustmentDateTimeKey() {
    const normalizedDateKey = normalizeScheduleDateKey(elements.scheduleAdjustManualDate?.value || "");
    return normalizedDateKey
      ? dateKeyToDateTimeKey(normalizedDateKey, KR1_SERVER_OPEN_DATE_TIME_KEY)
      : "";
  }

  function draftDurationMinutes(draft) {
    return (draft.days * 24 * 60) + (draft.hours * 60) + draft.minutes;
  }

  function durationLabelFromDraft(draft) {
    const parts = [];
    if (draft.days > 0) parts.push(`${draft.days}일`);
    if (draft.hours > 0) parts.push(`${draft.hours}시간`);
    if (draft.minutes > 0 || parts.length === 0) parts.push(`${draft.minutes}분`);
    return parts.join(" ");
  }

  function inferEndExclusiveDateTimeKeyFromDuration(durationMinutes, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      return "";
    }
    const currentTimestamp = dateTimeKeyToTimestamp(currentDateTimeKey);
    if (!Number.isFinite(currentTimestamp)) {
      return "";
    }
    const approximateCloseTimestamp = currentTimestamp + (durationMinutes * 60 * 1000);
    let inferredEndExclusiveDateTimeKey = `${timestampToDateTimeKey(approximateCloseTimestamp).slice(0, 10)} ${padNumber(KR1_RESET_HOUR)}:00:00`;
    if (dateTimeKeyToTimestamp(inferredEndExclusiveDateTimeKey) < approximateCloseTimestamp) {
      inferredEndExclusiveDateTimeKey = addDaysToDateTimeKey(inferredEndExclusiveDateTimeKey, 1);
    }
    return inferredEndExclusiveDateTimeKey;
  }

  function inferSyncCohortRange(option, resolvedStartDateKeyOverride = "") {
    const ruleTimeType = Number(option?.ruleTimeType);
    const openDay = Number(option?.ruleOpenDay);
    const resolvedStartDateKey = normalizeScheduleDateKey(resolvedStartDateKeyOverride || option?.resolvedStartDateKey || "");
    const weekday = timeSettingWeekday(ruleTimeType);
    if (!isOpenDayPeriodTimeSetting(ruleTimeType) || !Number.isFinite(openDay) || !Number.isFinite(weekday) || !resolvedStartDateKey) {
      return null;
    }

    const matchedServerOpenDateKeys = [];
    for (let offset = -13; offset <= 0; offset += 1) {
      const thresholdDateKey = addDaysToDateKey(resolvedStartDateKey, offset);
      const candidateStartDateKey = resolveOpenDayWeekDateKey(thresholdDateKey, weekday, ruleTimeType);
      if (candidateStartDateKey !== resolvedStartDateKey) continue;
      const serverOpenDateKey = addDaysToDateKey(thresholdDateKey, -openDay);
      if (serverOpenDateKey) {
        matchedServerOpenDateKeys.push(serverOpenDateKey);
      }
    }
    if (!matchedServerOpenDateKeys.length) {
      return null;
    }
    matchedServerOpenDateKeys.sort();
    const serverOpenStartDateKey = matchedServerOpenDateKeys[0];
    const serverOpenEndDateKey = matchedServerOpenDateKeys[matchedServerOpenDateKeys.length - 1];

    return {
      startDateKey: serverOpenStartDateKey,
      endDateKey: serverOpenEndDateKey,
      applyDateKey: serverOpenEndDateKey,
    };
  }

  function inferExactScheduleCalibrationResult(draft, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    const option = findScheduleCalibrationOptionById(draft.optionId);
    if (!option || !Number.isFinite(option.endExclusiveOffsetDays) || option.autoInferenceSupported === false) {
      return null;
    }
    const durationMinutes = draftDurationMinutes(draft);
    if (durationMinutes <= 0) {
      return null;
    }

    const inferredEndExclusiveDateTimeKey = inferEndExclusiveDateTimeKeyFromDuration(durationMinutes, currentDateTimeKey);
    if (!inferredEndExclusiveDateTimeKey) {
      return null;
    }

    const inferredServerOpenTimestamp = dateTimeKeyToTimestamp(inferredEndExclusiveDateTimeKey) - (option.endExclusiveOffsetDays * DAY_MS);
    const serverOpenDateTimeKey = normalizeDateTimeKey(timestampToDateTimeKey(inferredServerOpenTimestamp));
    if (!serverOpenDateTimeKey) {
      return null;
    }

    return {
      mode: "exact",
      option,
      durationMinutes,
      inferredEndExclusiveDateTimeKey,
      serverOpenDateTimeKey,
      currentDateTimeKey,
    };
  }

  function inferSyncScheduleCalibrationResult(draft, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    const option = findScheduleCalibrationOptionById(draft.optionId);
    const ruleTimeType = Number(option?.ruleTimeType);
    const durationDays = Number(option?.durationDays);
    if (!isOpenDayPeriodTimeSetting(ruleTimeType) || !Number.isFinite(durationDays) || durationDays <= 0) {
      return null;
    }

    const durationMinutes = draftDurationMinutes(draft);
    if (durationMinutes <= 0) {
      return null;
    }

    const inferredEndExclusiveDateTimeKey = inferEndExclusiveDateTimeKeyFromDuration(durationMinutes, currentDateTimeKey);
    if (!inferredEndExclusiveDateTimeKey) {
      return null;
    }

    const inferredResolvedStartDateTimeKey = addDaysToDateTimeKey(inferredEndExclusiveDateTimeKey, -durationDays);
    const inferredResolvedStartDateKey = dateTimeKeyToDateKey(inferredResolvedStartDateTimeKey);
    const syncCohortRange = inferSyncCohortRange(option, inferredResolvedStartDateKey);
    if (!inferredResolvedStartDateKey || !syncCohortRange?.startDateKey) {
      return null;
    }

    return {
      mode: "sync-first-open",
      option,
      durationMinutes,
      inferredEndExclusiveDateTimeKey,
      inferredResolvedStartDateKey,
      syncCohortRange,
      serverOpenDateTimeKey: dateKeyToDateTimeKey(syncCohortRange.applyDateKey, KR1_SERVER_OPEN_DATE_TIME_KEY),
      currentDateTimeKey,
    };
  }

  function inferScheduleCalibrationResult(draft, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    return inferExactScheduleCalibrationResult(draft, currentDateTimeKey)
      || inferSyncScheduleCalibrationResult(draft, currentDateTimeKey);
  }

  function updateScheduleAdjustSelectionSummary() {
    if (!elements.scheduleAdjustSelectedSummary) return;
    const option = findScheduleCalibrationOptionById(String(elements.scheduleAdjustSelect?.value || ""));
    if (!option) {
      elements.scheduleAdjustSelectedSummary.textContent = "진행중 이벤트를 선택해 주세요.";
      return;
    }
    const syncCohortRange = inferSyncCohortRange(option);
    const inferenceCopy = option.autoInferenceSupported
      ? "오픈 초기 일정은 남은 시간 기준 자동 계산이 가능합니다."
      : (syncCohortRange
        ? `동기화 일정이라 정확한 서버 오픈일은 범위로 계산됩니다. 적용 가능 범위는 ${formatDisplayDateKey(syncCohortRange.startDateKey)} - ${formatDisplayDateKey(syncCohortRange.endDateKey)}입니다.`
        : "동기화 일정은 남은 시간 기준으로 서버 오픈일 범위를 계산할 수 있습니다.");
    elements.scheduleAdjustSelectedSummary.innerHTML = `
      <strong>진행중 이벤트</strong>
      <span>${escapeHtml(option.label)}</span>
      <small>${escapeHtml(option.summary)}</small>
      <small>최대 입력 ${escapeHtml(scheduleAdjustmentMaxLabel(option))}</small>
      <small>${escapeHtml(inferenceCopy)}</small>
    `;
  }

  function updateScheduleAdjustmentPreview() {
    normalizeScheduleAdjustmentInputs();
    updateScheduleAdjustSelectionSummary();
    if (!elements.scheduleAdjustPreviewCopy) return;

    const manualDateTimeKey = getManualScheduleAdjustmentDateTimeKey();
    if (manualDateTimeKey) {
      elements.scheduleAdjustPreviewCopy.innerHTML = `
        <strong>직접 적용 서버 오픈:</strong> ${escapeHtml(formatDisplayDateTimeKey(manualDateTimeKey))}<br>
        <strong>적용 방식:</strong> 직접 입력<br>
        <strong>기준 시각:</strong> ${escapeHtml(`${formatDisplayDateTimeKey(manualDateTimeKey).slice(0, 10)} 09:00`)}
      `;
      if (elements.scheduleAdjustConfirm) {
        elements.scheduleAdjustConfirm.disabled = false;
      }
      return;
    }

    const result = inferScheduleCalibrationResult(readScheduleCalibrationDraft());
    if (!result) {
      const option = findScheduleCalibrationOptionById(String(elements.scheduleAdjustSelect?.value || ""));
      const syncCohortRange = inferSyncCohortRange(option);
      if (option && option.autoInferenceSupported === false && syncCohortRange) {
        elements.scheduleAdjustPreviewCopy.innerHTML = `
          <strong>계산 가능 서버 오픈 범위:</strong> ${escapeHtml(`${formatDisplayDateKey(syncCohortRange.startDateKey)} - ${formatDisplayDateKey(syncCohortRange.endDateKey)}`)}<br>
          <strong>적용 예정 기준일:</strong> ${escapeHtml(formatDisplayDateKey(syncCohortRange.applyDateKey))}<br>
          <strong>안내:</strong> 남은 시간을 입력하면 이 범위 안에서 일정이 맞는 기준일을 적용합니다.
        `;
      } else {
        elements.scheduleAdjustPreviewCopy.textContent = option && option.autoInferenceSupported === false
          ? "선택한 일정은 동기화 규칙입니다. 남은 시간을 입력하면 서버 오픈일 범위를 계산합니다."
          : "진행중 이벤트를 고르고 남은 시간을 입력하면 서버 오픈일을 계산합니다.";
      }
      if (elements.scheduleAdjustConfirm) {
        elements.scheduleAdjustConfirm.disabled = true;
      }
      return;
    }

    if (result.mode === "sync-first-open") {
      elements.scheduleAdjustPreviewCopy.innerHTML = `
        <strong>적용 서버 오픈 기준:</strong> ${escapeHtml(formatDisplayDateTimeKey(result.serverOpenDateTimeKey))}<br>
        <strong>계산 가능 서버 오픈 범위:</strong> ${escapeHtml(`${formatDisplayDateKey(result.syncCohortRange.startDateKey)} - ${formatDisplayDateKey(result.syncCohortRange.endDateKey)}`)}<br>
        <strong>진행중 이벤트:</strong> ${escapeHtml(result.option.label)}<br>
        <strong>입력 남은 시간:</strong> ${escapeHtml(durationLabelFromDraft(readScheduleCalibrationDraft()))}<br>
        <strong>기준 종료 시각:</strong> ${escapeHtml(formatDisplayDateTimeKey(result.inferredEndExclusiveDateTimeKey))}
      `;
      if (elements.scheduleAdjustConfirm) {
        elements.scheduleAdjustConfirm.disabled = false;
      }
      return;
    }

    elements.scheduleAdjustPreviewCopy.innerHTML = `
      <strong>계산된 서버 오픈:</strong> ${escapeHtml(formatDisplayDateTimeKey(result.serverOpenDateTimeKey))}<br>
      <strong>진행중 이벤트:</strong> ${escapeHtml(result.option.label)}<br>
      <strong>입력 남은 시간:</strong> ${escapeHtml(durationLabelFromDraft(readScheduleCalibrationDraft()))}<br>
      <strong>기준 종료 시각:</strong> ${escapeHtml(formatDisplayDateTimeKey(result.inferredEndExclusiveDateTimeKey))}
    `;
    if (elements.scheduleAdjustConfirm) {
      elements.scheduleAdjustConfirm.disabled = false;
    }
  }

  function populateScheduleAdjustmentOptions(preferredOptionId = "") {
    if (!elements.scheduleAdjustSelect) return;
    const options = getScheduleCalibrationOptions();
    const selectedOptionId = findScheduleCalibrationOptionById(state.scheduleCalibration?.optionId || "")?.id
      || findScheduleCalibrationOptionById(preferredOptionId)?.id
      || preferredScheduleCalibrationOptionId();
    const groupedOptions = options.reduce((accumulator, option) => {
      const key = String(option.groupKey || "other");
      if (!accumulator[key]) {
        accumulator[key] = {
          label: option.groupLabel || option.categoryLabel || "기타",
          order: Number(option.groupOrder ?? 99),
          options: [],
        };
      }
      accumulator[key].options.push(option);
      return accumulator;
    }, {});

    const orderedGroups = Object.values(groupedOptions)
      .sort((left, right) => left.order - right.order);

    elements.scheduleAdjustSelect.innerHTML = orderedGroups.map((group) => `
      <optgroup label="${escapeHtml(group.label)}">
        ${group.options.map((option) => {
          const selected = option.id === selectedOptionId ? " selected" : "";
          return `<option value="${escapeHtml(option.id)}"${selected}>${escapeHtml(option.label)}</option>`;
        }).join("")}
      </optgroup>
    `).join("");
  }

  function syncScheduleAdjustmentCurrentLabel() {
    if (elements.scheduleAdjustCurrentLabel) {
      const reference = currentScheduleAdjustmentParts();
      elements.scheduleAdjustCurrentLabel.innerHTML = `
        <span class="schedule-reference-label">${escapeHtml(reference.label)}</span>
        <span class="schedule-reference-date">${escapeHtml(reference.dateTime)}</span>
      `;
    }
  }

  function openScheduleAdjustmentDialog(options = {}) {
    if (!elements.scheduleAdjustModal) return;
    clearMobileScheduleTooltipTimers();
    hideMobileScheduleAdjustTooltip();
    const preferredOptionId = options.preferredOptionId || preferredScheduleCalibrationOptionId();
    populateScheduleAdjustmentOptions(preferredOptionId);
    syncScheduleAdjustmentCurrentLabel();
    if (elements.scheduleAdjustDays) elements.scheduleAdjustDays.value = "0";
    if (elements.scheduleAdjustHours) elements.scheduleAdjustHours.value = "0";
    if (elements.scheduleAdjustMinutes) elements.scheduleAdjustMinutes.value = "0";
    if (elements.scheduleAdjustManualDate) {
      elements.scheduleAdjustManualDate.value = state.scheduleCalibration?.mode === "custom"
        ? (dateTimeKeyToDateKey(state.scheduleCalibration.serverOpenDateTimeKey) || "")
        : "";
    }
    updateScheduleAdjustmentPreview();
    elements.scheduleAdjustModal.hidden = false;
    document.body.classList.add("is-schedule-adjust-open");
    if (elements.scheduleAdjustSelect) {
      window.setTimeout(() => elements.scheduleAdjustSelect.focus(), 0);
    }
  }

  function closeScheduleAdjustmentDialog(markSeen = false) {
    if (!elements.scheduleAdjustModal) return;
    elements.scheduleAdjustModal.hidden = true;
    document.body.classList.remove("is-schedule-adjust-open");
    if (markSeen) {
      markScheduleCalibrationPromptSeen();
    }
  }

  function applyScheduleAdjustment() {
    const manualDateTimeKey = getManualScheduleAdjustmentDateTimeKey();
    if (manualDateTimeKey) {
      persistScheduleCalibration({
        mode: "custom",
        serverOpenDateTimeKey: manualDateTimeKey,
        optionId: String(elements.scheduleAdjustSelect?.value || ""),
      });
      markScheduleCalibrationPromptSeen();
      closeScheduleAdjustmentDialog(false);
      refreshScheduleStatuses(true);
      return;
    }

    const result = inferScheduleCalibrationResult(readScheduleCalibrationDraft());
    if (!result) return;

    persistScheduleCalibration({
      mode: "custom",
      serverOpenDateTimeKey: result.serverOpenDateTimeKey,
      optionId: result.option.id,
    });
    markScheduleCalibrationPromptSeen();
    closeScheduleAdjustmentDialog(false);
    refreshScheduleStatuses(true);
  }

  function resetScheduleAdjustment() {
    persistScheduleCalibration(defaultScheduleCalibration());
    markScheduleCalibrationPromptSeen();
    closeScheduleAdjustmentDialog(false);
    refreshScheduleStatuses(true);
  }

  function currentViewportScrollTop() {
    return window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop
      || 0;
  }

  function setViewportScrollTop(value) {
    const next = Math.max(0, Number(value) || 0);
    window.scrollTo({ top: next, left: 0, behavior: "auto" });
    if (document.documentElement) {
      document.documentElement.scrollTop = next;
    }
    if (document.body) {
      document.body.scrollTop = next;
    }
  }

  function scheduleViewportScrollTop(value) {
    if (mobileViewportScrollRaf) {
      window.cancelAnimationFrame(mobileViewportScrollRaf);
      mobileViewportScrollRaf = 0;
    }
    mobileViewportScrollRaf = window.requestAnimationFrame(() => {
      setViewportScrollTop(value);
      mobileViewportScrollRaf = window.requestAnimationFrame(() => {
        setViewportScrollTop(value);
        mobileViewportScrollRaf = 0;
      });
    });
  }

  function scheduleViewportScrollToElement(element, offset = 0) {
    if (!element || !isMobileLayout()) return;
    const targetOffset = Math.max(0, Number(offset) || 0);
    const scrollTarget = currentViewportScrollTop() + element.getBoundingClientRect().top - targetOffset;
    scheduleViewportScrollTop(scrollTarget);
  }

  function syncSelectedRailItemIntoView() {
    if (!elements.petList) return;
    const activeItem = elements.petList.querySelector(".pet-item.active");
    if (activeItem && typeof activeItem.scrollIntoView === "function") {
      activeItem.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  function cancelPendingRailSelectionScroll() {
    if (!railSelectionScrollRaf) return;
    window.cancelAnimationFrame(railSelectionScrollRaf);
    railSelectionScrollRaf = 0;
  }

  function applyMobileLayoutState() {
    const mobile = isMobileLayout();
    document.documentElement.classList.remove("mobile-layout-preboot");
    if (document.body) {
      document.body.classList.toggle("mobile-layout", mobile);
      document.body.dataset.mobileView = mobile ? state.mobileView : "desktop";
    }
    updateMobileLoadingVisibility();

    if (elements.petRail) {
      elements.petRail.setAttribute("aria-hidden", mobile && state.mobileView !== "rail" ? "true" : "false");
    }
    if (elements.stage) {
      elements.stage.setAttribute("aria-hidden", mobile && state.mobileView !== "detail" ? "true" : "false");
    }

    if (elements.mobileOpenDetail) {
      elements.mobileOpenDetail.hidden = !mobile;
    }
    if (elements.mobileDetailToolbar) {
      elements.mobileDetailToolbar.hidden = !mobile;
    }
    if (elements.mobileSkillAccordion) {
      elements.mobileSkillAccordion.hidden = !mobile;
    }
  }

  function isMobileViewerHistoryState(historyState) {
    return Boolean(historyState && historyState[MOBILE_HISTORY_STATE_KEY]);
  }

  function findItemLocationByEntityId(entityId) {
    const normalizedEntityId = String(entityId || "");
    if (!normalizedEntityId) return null;
    const categories = getCategories();
    for (const category of categories) {
      const items = getItems(category);
      const index = items.findIndex((item) => getEntityId(item) === normalizedEntityId);
      if (index >= 0) {
        return { categoryKey: category.key, index };
      }
    }
    return null;
  }

  function buildMobileViewerHistoryState() {
    const category = getActiveCategory();
    const currentItem = getCurrentItem(category);
    return {
      [MOBILE_HISTORY_STATE_KEY]: true,
      categoryKey: category?.key || state.activeCategoryKey || "",
      itemId: currentItem ? getEntityId(currentItem) : "",
      petSubgroupKey: state.activePetSubgroupKey || "gacha",
      mobileView: state.mobileView === "rail" ? "rail" : "detail",
    };
  }

  function applyMobileViewerHistoryState(historyState) {
    if (!isMobileViewerHistoryState(historyState)) return false;

    const categories = getNavigationCategories();
    const nextCategory = categories.find((category) => category.key === String(historyState.categoryKey || "")) || categories[0];
    if (!nextCategory) return false;

    state.activeCategoryKey = nextCategory.key;

    if (isRouletteCalculatorCategory(nextCategory)) {
      state.mobileView = historyState.mobileView === "rail" ? "rail" : "detail";
      return true;
    }

    const requestedItem = findItemLocationByEntityId(historyState.itemId);
    if (requestedItem && requestedItem.categoryKey === nextCategory.key) {
      state.selectedIndexByCategory[nextCategory.key] = requestedItem.index;
    }

    if (nextCategory.key === "pet") {
      const currentPet = getCurrentItem(nextCategory);
      if (currentPet) {
        state.activePetSubgroupKey = getPetSubgroupKeyForItem(currentPet);
      } else {
        const subgroupKey = String(historyState.petSubgroupKey || "");
        if (subgroupKey === "content" || subgroupKey === "gacha") {
          state.activePetSubgroupKey = subgroupKey;
        } else {
          state.activePetSubgroupKey = "gacha";
        }
      }
    }

    state.mobileView = historyState.mobileView === "rail" ? "rail" : "detail";
    return true;
  }

  function syncMobileViewerHistory(mode = "replace") {
    if (!isMobileLayout() || !window.history || typeof window.history.replaceState !== "function") {
      return;
    }

    const nextState = buildMobileViewerHistoryState();
    const currentState = window.history.state;
    const sameState = isMobileViewerHistoryState(currentState)
      && currentState.categoryKey === nextState.categoryKey
      && currentState.itemId === nextState.itemId
      && currentState.petSubgroupKey === nextState.petSubgroupKey
      && currentState.mobileView === nextState.mobileView;

    if (mode !== "push" && sameState) {
      return;
    }

    try {
      if (mode === "push" && typeof window.history.pushState === "function") {
        window.history.pushState(nextState, "", window.location.href);
      } else {
        window.history.replaceState(nextState, "", window.location.href);
      }
    } catch (error) {}
  }

  function setMobileView(nextView, options = {}) {
    if (!isMobileLayout()) {
      state.mobileView = "detail";
      applyMobileLayoutState();
      return;
    }

    const previousView = state.mobileView;
    const previousScrollTop = currentViewportScrollTop();
    const targetView = nextView === "rail" ? "rail" : "detail";

    state.mobileViewportScrollByView[previousView] = previousScrollTop;
    if (previousView === "detail" && targetView === "rail") {
      state.mobileViewportScrollByView.detail = 0;
      if (elements.stage) {
        elements.stage.scrollTop = 0;
      }
      scrollContainerToTop(elements.stage);
    }
    state.mobileView = targetView;

    if (targetView === "detail" && options.resetStageScroll !== false) {
      state.mobileViewportScrollByView.detail = 0;
      setMobileViewSwitching(true);
      setViewportScrollTop(0);
      scrollContainerToTop(elements.stage);
    }

    applyMobileLayoutState();

    if (options.historyMode !== "skip") {
      const historyMode = options.historyMode
        || (previousView !== targetView && targetView === "detail" ? "push" : "replace");
      syncMobileViewerHistory(historyMode);
    }

    if (state.mobileView === "detail") {
      cancelPendingRailSelectionScroll();
      if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
      if (options.resetStageScroll !== false) {
        setViewportScrollTop(0);
        scheduleViewportScrollTop(0);
        finishMobileViewSwitch(0);
      } else {
        setViewportScrollTop(state.mobileViewportScrollByView.detail || 0);
        scheduleViewportScrollTop(state.mobileViewportScrollByView.detail || 0);
        finishMobileViewSwitch(state.mobileViewportScrollByView.detail || 0);
      }
      return;
    }

    setMobileViewSwitching(false);

    if (options.resetRailScroll) {
      scrollContainerToTop(elements.petRail);
      setViewportScrollTop(0);
      scheduleViewportScrollTop(0);
    } else {
      setViewportScrollTop(state.mobileViewportScrollByView.rail || 0);
      scheduleViewportScrollTop(state.mobileViewportScrollByView.rail || 0);
    }
    syncSelectedRailItemIntoView();
  }

  function syncMobileLayout(forceReset = false) {
    const mobile = isMobileLayout();
    if (mobile) {
      if (!wasMobileLayout || forceReset || (state.mobileView !== "rail" && state.mobileView !== "detail")) {
        state.mobileView = isRouletteCalculatorCategory(state.activeCategoryKey) ? "detail" : "rail";
      }
    } else {
      state.mobileView = "detail";
    }
    wasMobileLayout = mobile;
    applyMobileLayoutState();
  }

  const HERO_INFO_SCENE_CONFIG = {
    water: { typeId: 2, backCloud: "10", midCloud: "07", frontCloud: "01", farLeft: "08", farRight: "09", beamLeft: "", beamRight: "", particles: "water" },
    wind: { typeId: 4, backCloud: "12", midCloud: "07", frontCloud: "01", farLeft: "08", farRight: "09", beamLeft: "11", beamRight: "10", particles: "wind" },
    fire: { typeId: 3, backCloud: "12", midCloud: "07", frontCloud: "01", farLeft: "08", farRight: "09", beamLeft: "11", beamRight: "10", particles: "fire" },
    leaf: { typeId: 1, backCloud: "07", midCloud: "05", frontCloud: "01", farLeft: "", farRight: "", beamLeft: "", beamRight: "", particles: "leaf" },
  };
  const SPECIAL_HERO_SCENE_SPINE_MANIFEST_OVERRIDES = Object.freeze({
    "1103401": Object.freeze({
      assetKind: "pickup",
      assetName: "verga_pickup",
      chunkSrc: "spine_manifest_pickup_entries/1103401.js",
      hideStaticBanner: false,
    }),
  });

  const HERO_ANIMATION_PHASE_OVERRIDES = {};
  const HERO_ANIMATION_NAME_OVERRIDES = {
    "1103401": "Idle",
    "1112601": "Idle",
  };
  const HERO_BONE_ROTATION_CORRECTIONS = {};
  const RIDE_SKIN_NAME_OVERRIDES = {};
  // Dump sources:
  // - rides: ride_level_data.csv linked states + ride_grade.csv GradeStatusSummary
  // - weapons: weapon_level_data.csv linked states + weapon_grade.csv GradeStatusSummary
  const WEAPON_OWNED_EFFECT_STATE_META = Object.freeze({
    "1101": Object.freeze({ badge: "HP", label: "\uCCB4\uB825(%)" }),
    "1102": Object.freeze({ badge: "ATK", label: "\uACF5\uACA9\uB825(%)" }),
    "1103": Object.freeze({ badge: "DEF", label: "\uBC29\uC5B4\uB825(%)" }),
    "1106": Object.freeze({ badge: "HIT", label: "\uBA85\uC911(%)" }),
    "1107": Object.freeze({ badge: "EVA", label: "\uD68C\uD53C(%)" }),
    "1109": Object.freeze({ badge: "CRT", label: "\uCE58\uBA85\uD0C0 \uD655\uB960(%)" }),
    "1120": Object.freeze({ badge: "SCR", label: "\uC288\uD37C \uCE58\uBA85\uD0C0 \uD655\uB960(%)", percentMultiplier: 0.01 }),
    "1122": Object.freeze({ badge: "SCD", label: "\uC288\uD37C \uCE58\uBA85\uD0C0 \uD53C\uD574(%)", percentMultiplier: 0.01 }),
  });
  const RIDE_OWNED_EFFECT_STATE_META = Object.freeze({
    "1101": Object.freeze({ badge: "HP", label: "\uCCB4\uB825(%)" }),
    "1103": Object.freeze({ badge: "DEF", label: "\uBC29\uC5B4\uB825(%)" }),
    "1107": Object.freeze({ badge: "EVA", label: "\uD68C\uD53C(%)" }),
    "1151": Object.freeze({ badge: "SIL", label: "\uCE68\uBB35 \uC800\uD56D(%)", percentMultiplier: 0.01 }),
    "1153": Object.freeze({ badge: "AIR", label: "\uB744\uC6B0\uAE30 \uC800\uD56D(%)", percentMultiplier: 0.01 }),
    "1155": Object.freeze({ badge: "GRP", label: "\uC81C\uC555 \uC800\uD56D(%)", percentMultiplier: 0.01 }),
    "1167": Object.freeze({ badge: "PUS", label: "\uBC00\uC5B4\uB0B4\uAE30 \uC800\uD56D(%)", percentMultiplier: 0.01 }),
    "1168": Object.freeze({ badge: "KND", label: "\uB118\uC5B4\uD2B8\uB9AC\uAE30 \uC800\uD56D(%)", percentMultiplier: 0.01 }),
    "1169": Object.freeze({ badge: "PUL", label: "\uB2F9\uAE30\uAE30 \uC800\uD56D(%)", percentMultiplier: 0.01 }),
  });
  const WEAPON_OWNED_EFFECT_ROWS_BY_ID = Object.freeze({
    "220000007": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1106", value: 1 }),
    ]),
    "220000008": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1106", value: 1 }),
    ]),
    "220000009": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1106", value: 1 }),
    ]),
    "220000010": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1106", value: 1 }),
    ]),
    "220000011": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1106", value: 1 }),
    ]),
    "220000012": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1106", value: 1 }),
    ]),
    "220000037": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1120", value: 1 }),
    ]),
    "220000038": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1122", value: 1 }),
    ]),
    "220000039": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1122", value: 1 }),
    ]),
    "220000040": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1120", value: 1 }),
    ]),
    "220000041": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1122", value: 1 }),
    ]),
    "220000042": Object.freeze([
      Object.freeze({ linkedId: "1102", value: 1 }),
      Object.freeze({ linkedId: "1120", value: 1 }),
    ]),
  });
  const WEAPON_OWNED_EFFECT_WEIGHTS_BY_TIER = Object.freeze({
    "4": Object.freeze({
      "0": Object.freeze({ "1101": 0.2, "1102": 0.1, "1103": 0.2, "1106": 0.1, "1107": 0.1, "1109": 0, "1120": 0, "1122": 0 }),
      "1": Object.freeze({ "1101": 0.3, "1102": 0.15, "1103": 0.3, "1106": 0.15, "1107": 0.15, "1109": 0.025, "1120": 25, "1122": 500 }),
      "2": Object.freeze({ "1101": 0.4, "1102": 0.2, "1103": 0.4, "1106": 0.2, "1107": 0.2, "1109": 0.05, "1120": 50, "1122": 1000 }),
      "3": Object.freeze({ "1101": 0.5, "1102": 0.25, "1103": 0.5, "1106": 0.25, "1107": 0.25, "1109": 0.075, "1120": 75, "1122": 1500 }),
      "4": Object.freeze({ "1101": 0.6, "1102": 0.3, "1103": 0.6, "1106": 0.3, "1107": 0.3, "1109": 0.1, "1120": 100, "1122": 2000 }),
      "5": Object.freeze({ "1101": 0.8, "1102": 0.4, "1103": 0.8, "1106": 0.4, "1107": 0.4, "1109": 0.125, "1120": 125, "1122": 2500 }),
      "6": Object.freeze({ "1101": 0.9, "1102": 0.45, "1103": 0.9, "1106": 0.45, "1107": 0.45, "1109": 0.15, "1120": 150, "1122": 3000 }),
      "7": Object.freeze({ "1101": 1, "1102": 0.5, "1103": 1, "1106": 0.5, "1107": 0.5, "1109": 0.175, "1120": 175, "1122": 3500 }),
      "8": Object.freeze({ "1101": 1.1, "1102": 0.55, "1103": 1.1, "1106": 0.55, "1107": 0.55, "1109": 0.2, "1120": 200, "1122": 4000 }),
      "9": Object.freeze({ "1101": 1.2, "1102": 0.6, "1103": 1.2, "1106": 0.6, "1107": 0.6, "1109": 0.225, "1120": 225, "1122": 4500 }),
      "10": Object.freeze({ "1101": 1.4, "1102": 0.7, "1103": 1.4, "1106": 0.7, "1107": 0.7, "1109": 0.25, "1120": 250, "1122": 5000 }),
    }),
    "5": Object.freeze({
      "0": Object.freeze({ "1101": 1.2, "1102": 0.6, "1103": 1.2, "1106": 0.6, "1107": 0.6, "1109": 0.08, "1120": 80, "1122": 1600 }),
      "1": Object.freeze({ "1101": 2, "1102": 1, "1103": 2, "1106": 1, "1107": 1, "1109": 0.085, "1120": 85, "1122": 1700 }),
      "2": Object.freeze({ "1101": 2.6, "1102": 1.3, "1103": 2.6, "1106": 1.3, "1107": 1.3, "1109": 0.09, "1120": 90, "1122": 1800 }),
      "3": Object.freeze({ "1101": 3.2, "1102": 1.6, "1103": 3.2, "1106": 1.6, "1107": 1.6, "1109": 0.095, "1120": 95, "1122": 1900 }),
      "4": Object.freeze({ "1101": 3.6, "1102": 1.8, "1103": 3.6, "1106": 1.8, "1107": 1.8, "1109": 0.1, "1120": 100, "1122": 2000 }),
      "5": Object.freeze({ "1101": 4.6, "1102": 2.3, "1103": 4.6, "1106": 2.3, "1107": 2.3, "1109": 0.105, "1120": 105, "1122": 2100 }),
      "6": Object.freeze({ "1101": 5.4, "1102": 2.7, "1103": 5.4, "1106": 2.7, "1107": 2.7, "1109": 0.11, "1120": 110, "1122": 2200 }),
      "7": Object.freeze({ "1101": 6, "1102": 3, "1103": 6, "1106": 3, "1107": 3, "1109": 0.115, "1120": 115, "1122": 2300 }),
      "8": Object.freeze({ "1101": 6.6, "1102": 3.3, "1103": 6.6, "1106": 3.3, "1107": 3.3, "1109": 0.12, "1120": 120, "1122": 2400 }),
      "9": Object.freeze({ "1101": 7, "1102": 3.5, "1103": 7, "1106": 3.5, "1107": 3.5, "1109": 0.125, "1120": 125, "1122": 2500 }),
      "10": Object.freeze({ "1101": 8, "1102": 4, "1103": 8, "1106": 4, "1107": 4, "1109": 0.13, "1120": 130, "1122": 2600 }),
    }),
  });
  const RIDE_OWNED_EFFECT_ROWS_BY_ID = Object.freeze({
    "200000005": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1 }),
      Object.freeze({ linkedId: "1107", value: 1 }),
    ]),
    "200000009": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1 }),
      Object.freeze({ linkedId: "1107", value: 1 }),
    ]),
    "200000010": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1 }),
      Object.freeze({ linkedId: "1107", value: 1 }),
    ]),
    "200000012": Object.freeze([
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1107", value: 1 }),
    ]),
    "200000013": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1 }),
      Object.freeze({ linkedId: "1107", value: 1 }),
    ]),
    "200000014": Object.freeze([
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1107", value: 1 }),
    ]),
    "200000023": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1.25 }),
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1168", value: 1 }),
    ]),
    "200000024": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1.25 }),
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1169", value: 1 }),
    ]),
    "200000025": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1.25 }),
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1153", value: 1 }),
    ]),
    "200000026": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1.25 }),
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1151", value: 1 }),
    ]),
    "200000027": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1.25 }),
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1155", value: 1 }),
    ]),
    "200000028": Object.freeze([
      Object.freeze({ linkedId: "1101", value: 1.25 }),
      Object.freeze({ linkedId: "1103", value: 1 }),
      Object.freeze({ linkedId: "1167", value: 1 }),
    ]),
  });
  const RIDE_OWNED_EFFECT_WEIGHTS_BY_TIER = Object.freeze({
    "5": Object.freeze({
      "0": Object.freeze({ "1101": 1.2, "1102": 0.6, "1103": 1.2, "1106": 0.6, "1107": 0.6, "1109": 0.08, "1151": 500, "1153": 1000, "1155": 1000, "1167": 1000, "1168": 1000, "1169": 1000 }),
      "1": Object.freeze({ "1101": 2, "1102": 1, "1103": 2, "1106": 1, "1107": 1, "1109": 0.085, "1151": 550, "1153": 1100, "1155": 1100, "1167": 1100, "1168": 1100, "1169": 1100 }),
      "2": Object.freeze({ "1101": 2.6, "1102": 1.3, "1103": 2.6, "1106": 1.3, "1107": 1.3, "1109": 0.09, "1151": 600, "1153": 1200, "1155": 1200, "1167": 1200, "1168": 1200, "1169": 1200 }),
      "3": Object.freeze({ "1101": 3.2, "1102": 1.6, "1103": 3.2, "1106": 1.6, "1107": 1.6, "1109": 0.095, "1151": 650, "1153": 1300, "1155": 1300, "1167": 1300, "1168": 1300, "1169": 1300 }),
      "4": Object.freeze({ "1101": 3.6, "1102": 1.8, "1103": 3.6, "1106": 1.8, "1107": 1.8, "1109": 0.1, "1151": 700, "1153": 1400, "1155": 1400, "1167": 1400, "1168": 1400, "1169": 1400 }),
      "5": Object.freeze({ "1101": 4.6, "1102": 2.3, "1103": 4.6, "1106": 2.3, "1107": 2.3, "1109": 0.105, "1151": 750, "1153": 1500, "1155": 1500, "1167": 1500, "1168": 1500, "1169": 1500 }),
      "6": Object.freeze({ "1101": 5.4, "1102": 2.7, "1103": 5.4, "1106": 2.7, "1107": 2.7, "1109": 0.11, "1151": 800, "1153": 1600, "1155": 1600, "1167": 1600, "1168": 1600, "1169": 1600 }),
      "7": Object.freeze({ "1101": 6, "1102": 3, "1103": 6, "1106": 3, "1107": 3, "1109": 0.115, "1151": 850, "1153": 1700, "1155": 1700, "1167": 1700, "1168": 1700, "1169": 1700 }),
      "8": Object.freeze({ "1101": 6.6, "1102": 3.3, "1103": 6.6, "1106": 3.3, "1107": 3.3, "1109": 0.12, "1151": 900, "1153": 1800, "1155": 1800, "1167": 1800, "1168": 1800, "1169": 1800 }),
      "9": Object.freeze({ "1101": 7, "1102": 3.5, "1103": 7, "1106": 3.5, "1107": 3.5, "1109": 0.125, "1151": 950, "1153": 1900, "1155": 1900, "1167": 1900, "1168": 1900, "1169": 1900 }),
      "10": Object.freeze({ "1101": 8, "1102": 4, "1103": 8, "1106": 4, "1107": 4, "1109": 0.13, "1151": 1000, "1153": 2000, "1155": 2000, "1167": 2000, "1168": 2000, "1169": 2000 }),
    }),
  });
  const HERO_SCENE_LAYOUT_OVERRIDES = {
    "1103401": {
      scaleMultiplier: 0.84,
      stageFloorOffsetRatio: 0.045,
      stageAnchorOffsetRatio: 0,
    },
  };
  Object.assign(spineManifest, SPECIAL_HERO_SCENE_SPINE_MANIFEST_OVERRIDES);
  const WEAPON_SKIN_NAME_BY_ID = Object.freeze({
    "220000007": "Weapon/W10007",
    "220000008": "Weapon/W10008",
    "220000009": "Weapon/W10009",
    "220000010": "Weapon/W10010",
    "220000011": "Weapon/W10011",
    "220000012": "Weapon/W10012",
    "220000037": "Weapon/W10073",
    "220000038": "Weapon/W10080",
    "220000039": "Weapon/W10069",
    "220000040": "Weapon/W10070",
    "220000041": "Weapon/W10083",
    "220000042": "Weapon/W10078",
  });
  const DEFAULT_WEAPON_EQUIPMENT_SET_KEY_BY_ID = Object.freeze({
    "220000007": "woodland-warrior",
    "220000008": "quiet-lotus",
    "220000009": "woodland-warrior",
    "220000010": "quiet-lotus",
    "220000011": "woodland-warrior",
    "220000012": "quiet-lotus",
    "220000037": "woodland-warrior",
    "220000038": "quiet-lotus",
    "220000039": "woodland-warrior",
    "220000040": "quiet-lotus",
    "220000041": "woodland-warrior",
    "220000042": "quiet-lotus",
  });
  const WEAPON_EQUIPMENT_SETS = Object.freeze([
    Object.freeze({
      key: "woodland-warrior",
      name: "고목의 전사",
      skins: Object.freeze(["Helmet/E11001", "Gloves/E12001", "Armor/E13001", "Boots/E15001"]),
    }),
    Object.freeze({
      key: "quiet-lotus",
      name: "고요한 연꽃",
      skins: Object.freeze(["Helmet/E11002", "Gloves/E12002", "Armor/E13002", "Boots/E15002"]),
    }),
    Object.freeze({
      key: "butterfly-phantom",
      name: "나비의 환영",
      skins: Object.freeze(["Helmet/E11016", "Gloves/E12016", "Armor/E13016", "Boots/E15016"]),
    }),
    Object.freeze({
      key: "abyss-of-ice",
      name: "얼음의 심연",
      skins: Object.freeze(["Helmet/E11019", "Gloves/E12019", "Armor/E13019", "Boots/E15019"]),
    }),
    Object.freeze({
      key: "lava-heart",
      name: "용암심장",
      skins: Object.freeze(["Helmet/E10101", "Gloves/E20101", "Armor/E30001", "Boots/E50101"]),
    }),
  ]);
  const DEFAULT_WEAPON_SPINE_LAYOUT_OPTIONS = {
    "220000007": Object.freeze({ scaleMultiplier: 0.8, offsetXRatio: 0.16, offsetYRatio: 0.01 }),
    "220000008": Object.freeze({ scaleMultiplier: 0.82, offsetXRatio: 0.15, offsetYRatio: 0.015 }),
    "220000009": Object.freeze({ scaleMultiplier: 0.82, offsetXRatio: 0.145, offsetYRatio: 0.015 }),
    "220000010": Object.freeze({ scaleMultiplier: 0.8, offsetXRatio: 0.17, offsetYRatio: 0.015 }),
    "220000011": Object.freeze({ scaleMultiplier: 0.82, offsetXRatio: 0.15, offsetYRatio: 0.015 }),
    "220000012": Object.freeze({ scaleMultiplier: 0.84, offsetXRatio: 0.14, offsetYRatio: 0.02 }),
    "220000037": Object.freeze({ scaleMultiplier: 0.8, offsetXRatio: 0.16, offsetYRatio: 0.01 }),
    "220000038": Object.freeze({ scaleMultiplier: 0.82, offsetXRatio: 0.15, offsetYRatio: 0.015 }),
    "220000039": Object.freeze({ scaleMultiplier: 0.82, offsetXRatio: 0.145, offsetYRatio: 0.015 }),
    "220000040": Object.freeze({ scaleMultiplier: 0.8, offsetXRatio: 0.17, offsetYRatio: 0.015 }),
    "220000041": Object.freeze({ scaleMultiplier: 0.82, offsetXRatio: 0.15, offsetYRatio: 0.015 }),
    "220000042": Object.freeze({ scaleMultiplier: 0.84, offsetXRatio: 0.14, offsetYRatio: 0.02 }),
  };
  const DEFAULT_RIDE_SPINE_LAYOUT_OPTIONS = {
    "200000009": Object.freeze({ offsetYRatio: 0 }),
  };
  const STABLE_RIDE_LAYOUT_IDS = Object.freeze({
    "200000009": true,
  });
  const WEAPON_DISPLAY_SEQUENCE = Object.freeze([
    "220000007", // Woody
    "220000010", // Lucy
    "220000009", // Pobi
    "220000011", // Uba
    "220000012", // Sara
    "220000008", // Ann
    "220000037", // Woody
    "220000039", // Pobi
    "220000040", // Lucy
    "220000041", // Uba
    "220000042", // Sara
    "220000038", // Ann
  ]);
  const WEAPON_DISPLAY_ORDER_BY_ID = Object.freeze(
    WEAPON_DISPLAY_SEQUENCE.reduce((accumulator, id, index) => {
      accumulator[id] = index + 1;
      return accumulator;
    }, {})
  );
  const WEAPON_BACKGROUND_ASSET_BY_ID = Object.freeze({
    "220000007": "assets/backgrounds/weapons/weapons_bg_fire.webp",
    "220000008": "assets/backgrounds/weapons/weapons_bg_leaf.webp",
    "220000009": "assets/backgrounds/weapons/weapons_bg_wind.webp",
    "220000010": "assets/backgrounds/weapons/weapons_bg_water.webp",
    "220000011": "assets/backgrounds/weapons/weapons_bg_leaf.webp",
    "220000012": "assets/backgrounds/weapons/weapons_bg_fire.webp",
    "220000037": "assets/backgrounds/weapons/weapons_bg_fire.webp",
    "220000038": "assets/backgrounds/weapons/weapons_bg_fire.webp",
    "220000039": "assets/backgrounds/weapons/weapons_bg_water.webp",
    "220000040": "assets/backgrounds/weapons/weapons_bg_water.webp",
    "220000041": "assets/backgrounds/weapons/weapons_bg_leaf.webp",
    "220000042": "assets/backgrounds/weapons/weapons_bg_wind.webp",
  });

  const SCENE_EMBER_LAYOUT = [
    { x: 10, size: 6, delay: -1.4, duration: 9.2, drift: 22, travel: 170, opacity: 0.54 },
    { x: 18, size: 10, delay: -4.1, duration: 11.8, drift: 30, travel: 225, opacity: 0.64 },
    { x: 27, size: 8, delay: -2.2, duration: 10.4, drift: 16, travel: 210, opacity: 0.46 },
    { x: 34, size: 12, delay: -5.7, duration: 12.2, drift: 26, travel: 248, opacity: 0.58 },
    { x: 45, size: 6, delay: -3.4, duration: 8.8, drift: 18, travel: 188, opacity: 0.4 },
    { x: 56, size: 9, delay: -6.2, duration: 10.6, drift: 24, travel: 226, opacity: 0.5 },
    { x: 64, size: 7, delay: -1.9, duration: 9.6, drift: 18, travel: 198, opacity: 0.44 },
    { x: 72, size: 11, delay: -4.7, duration: 11.2, drift: 30, travel: 240, opacity: 0.6 },
    { x: 82, size: 7, delay: -0.8, duration: 8.6, drift: 14, travel: 180, opacity: 0.42 },
    { x: 88, size: 9, delay: -5.4, duration: 10.8, drift: 20, travel: 214, opacity: 0.5 },
  ];

  const assetVersion = encodeURIComponent(String(window.GACHA_VIEWER_ASSET_VERSION || "20260415-taihon-online-fix-19"));
  const ELEMENT_ICON_BY_KEY = {
    leaf: "assets/ui/HeroType04.png",
    earth: "assets/ui/HeroType04.png",
    fire: "assets/ui/HeroType02.png",
    water: "assets/ui/HeroType01.png",
    wind: "assets/ui/HeroType03.png",
  };
  const ATTACK_TYPE_LABEL_BY_KEY = {
    melee: "\uadfc\uac70\ub9ac\ud615",
    defence: "\ubc29\uc5b4\ud615",
    ranged: "\uc6d0\uac70\ub9ac\ud615",
    support: "\uc9c0\uc6d0\ud615",
  };
  const ATTACK_TYPE_ICON_BY_KEY = {
    melee: "assets/ui/Type_Short.png",
    defence: "assets/ui/Type_Defence.png",
    ranged: "assets/ui/Type_Long.png",
    support: "assets/ui/Type_Skill.png",
  };
  const ATTACK_TYPE_BG_ASSET = "assets/ui/TypeClassBg.png";
  const ATTACK_SPEED_ICON_BY_LABEL = {
    "\uB9E4\uC6B0\uB290\uB9BC": "assets/ui/SpeedType01.png",
    "\uB290\uB9BC": "assets/ui/SpeedType02.png",
    "\uBCF4\uD1B5": "assets/ui/SpeedType03.png",
    "\uBE60\uB984": "assets/ui/SpeedType04.png",
    "\uB9E4\uC6B0\uBE60\uB984": "assets/ui/SpeedType05.png",
  };
  const ATTACK_SPEED_LABEL_BY_TYPE = {
    1: "\uB9E4\uC6B0\uB290\uB9BC",
    2: "\uB290\uB9BC",
    3: "\uBCF4\uD1B5",
    4: "\uBE60\uB984",
    5: "\uB9E4\uC6B0\uBE60\uB984",
  };
  const SKILL_TEXT_PLACEHOLDER_OVERRIDES = new Map([
    ["1107901:\uC21C\uD48D \uAC00\uB974\uAE30:2", "\uC6D0\uAC70\uB9AC\uD615"],
    ["1103901:\uBC29\uC6B8\uAC10\uC625:2", "\uADFC\uAC70\uB9AC\uD615"],
    ["1112601:\uC758\uAE30 \uC18C\uCE68:2", "\uBC29\uC5B4\uD615"],
    ["1204301:\uC751\uC6D0\uD558\uAE30:2", "\uBC29\uC5B4\uD615"],
    ["1204301:\uC751\uC6D0\uB2E8\uC7A5:2", "\uBC29\uC5B4\uD615"],
    ["1300501:\uBD88\uAF43\uB180\uC774:2", "\uADFC\uAC70\uB9AC\uD615"],
    ["1300501:\uD68C\uBCF5\uC758 \uBD88\uAE38:2", "\uADFC\uAC70\uB9AC\uD615"],
  ]);
  const CUMULATIVE_EVENT_REWARD_SCHEDULE_KEYS = new Map([
    ["1107701", new Set([
      "2026-03-03..2026-03-09",
      "2026-03-19..2026-03-25",
      "2026-04-02..2026-04-08",
      "2026-04-30..2026-05-06",
      "2026-06-06..2026-06-12",
      "2026-07-04..2026-07-10",
      "2026-07-18..2026-07-24",
      "2026-08-15..2026-08-21",
      "2026-08-29..2026-09-04",
      "2026-09-26..2026-10-02",
      "2026-10-10..2026-10-16",
      "2026-11-07..2026-11-13",
      "2026-11-21..2026-11-27",
      "2026-12-19..2026-12-25",
      "2027-01-02..2027-01-08",
    ])],
    ["1112601", new Set([
      "2026-04-16..2026-04-22",
      "2026-05-14..2026-05-20",
      "2026-06-20..2026-06-26",
      "2026-08-01..2026-08-07",
      "2026-09-12..2026-09-18",
      "2026-10-24..2026-10-30",
      "2026-12-05..2026-12-11",
      "2027-01-16..2027-01-22",
    ])],
  ]);
  const EXTRA_PET_ENRICHMENTS = new Map(
    (Array.isArray(window.GACHA_VIEWER_EXTRA_PETS) ? window.GACHA_VIEWER_EXTRA_PETS : [])
      .map((entry) => [String(entry?.characterId || entry?.viewerId || ""), entry])
      .filter(([key]) => Boolean(key))
  );

  function isExtraPetPlaceholderAsset(path) {
    const normalized = String(path || "").trim();
    if (!normalized) return true;
    return normalized === PLACEHOLDER_PET_ICON || normalized === PLACEHOLDER_PET_BANNER;
  }

  function characterMetaOverride(value) {
    const characterId = typeof value === "object" && value
      ? String(value.characterId || value.viewerId || value.id || "")
      : String(value || "");
    if (!characterId) return null;
    const meta = CHARACTER_META_OVERRIDES[characterId];
    return meta && typeof meta === "object" ? meta : null;
  }

  function normalizeEntityElementKey(entity) {
    if (!entity || typeof entity !== "object") return entity;
    if (String(entity.elementKey || "").trim() === "earth") {
      entity.elementKey = "leaf";
      if (!String(entity.elementLabel || "").trim()) {
        entity.elementLabel = "땅";
      }
    }
    return entity;
  }

  function applyCharacterMetaOverride(entity) {
    if (!entity || typeof entity !== "object") return entity;
    normalizeEntityElementKey(entity);
    const meta = characterMetaOverride(entity);
    if (!meta) return entity;
    const attackSpeedType = Number(meta.attackSpeedType);
    if (Number.isFinite(attackSpeedType) && attackSpeedType > 0) {
      entity.attackSpeedType = attackSpeedType;
      entity.attackSpeedLabel = ATTACK_SPEED_LABEL_BY_TYPE[attackSpeedType] || entity.attackSpeedLabel || "";
    }
    return entity;
  }

  function extraPetAssetPath(characterId, kind) {
    const id = String(characterId || "").trim();
    if (!id) return "";
    if (kind === "stage") return `assets/pets/stage/${id}-stage.png`;
    if (kind === "heroicon") return `assets/pets/${id}-heroicon.png`;
    if (kind === "portrait") return `assets/pets/${id}-portrait.png`;
    if (kind === "banner") return `assets/banners/${id}-banner.png`;
    return "";
  }

  if (!data || !Array.isArray(data.categories) || data.categories.length === 0) {
    document.body.innerHTML = "<p style='padding:24px;color:#fff'>데이터를 불러올 수 없습니다.</p>";
    return;
  }

  function replaceLucySeaSpearCopy(text) {
    const raw = String(text || "");
    if (!raw || !raw.includes("대해의 창") || !raw.includes("추가 공격")) {
      return raw;
    }
    return raw.replace(/추가 공격(?=\()/g, "추가 피해");
  }

  function replaceLucySeaSpearUpgradeCopy(text) {
    const raw = String(text || "");
    if (!raw || !raw.includes("추가 공격")) {
      return raw;
    }
    return raw.replace(/추가 공격/g, "추가 피해");
  }

  function normalizeRuntimeSkillCopy(text) {
    const raw = String(text || "");
    if (!raw) return raw;
    return raw
      .replace(/최대\s*스킬\s*쿨타임/g, "기본 스킬 쿨타임")
      .replace(/최대\s*쿨타임/g, "기본 스킬 쿨타임")
      .replace(/현재\s*쿨타임/g, "현재 스킬 쿨타임")
      .replace(/(현재|기본) 스킬 쿨타임의/g, "$1 스킬 쿨타임")
      .replace(/(현재|기본) 스킬 쿨타임 감소\s+\(/g, "$1 스킬 쿨타임 감소(");
  }

  function patchEntitySkillTexts(entity) {
    if (!entity || !Array.isArray(entity.skills)) return;
    entity.skills.forEach((skill) => {
      if (!skill || !Array.isArray(skill.variants)) return;
      const seaSpearFamily = String(skill.name || "").includes("대해의 창")
        || skill.variants.some((variant) => {
          const rawDesc = String(variant?.rawDesc || "");
          const formattedDesc = String(variant?.formattedDesc || "");
          return rawDesc.includes("대해의 창") || formattedDesc.includes("대해의 창");
        });
      skill.variants.forEach((variant) => {
        if (!variant) return;
        variant.rawDesc = normalizeRuntimeSkillCopy(replaceLucySeaSpearCopy(variant.rawDesc));
        variant.formattedDesc = normalizeRuntimeSkillCopy(replaceLucySeaSpearCopy(variant.formattedDesc));
        variant.upgradeDescTemplate = normalizeRuntimeSkillCopy(variant.upgradeDescTemplate);
        variant.upgradeDescFormatted = normalizeRuntimeSkillCopy(variant.upgradeDescFormatted);
        if (seaSpearFamily) {
          variant.upgradeDescFormatted = replaceLucySeaSpearUpgradeCopy(variant.upgradeDescFormatted);
        }
      });
    });
  }

  const SECOND_GEN_WEAPON_STAGE_GRADE_BY_SUFFIX = new Map([
    ["1144", 0],
    ["1145", 1],
    ["1147", 3],
    ["1149", 5],
    ["1151", 7],
    ["1154", 10],
  ]);

  function normalizedVariantStageMeta(variant) {
    const entityId = String(variant?.entityContext?.characterId || "");
    const entityKind = String(variant?.entityContext?.entityKind || "");
    const skillId = String(variant?.skillId || "");
    const suffix = skillId.slice(-4);
    if ((entityKind === "weapon" || entityId.startsWith("220"))
      && SECOND_GEN_WEAPON_STAGE_GRADE_BY_SUFFIX.has(suffix)) {
      const grade = SECOND_GEN_WEAPON_STAGE_GRADE_BY_SUFFIX.get(suffix);
      return {
        frameTier: 5,
        groupTier: 0,
        groupGrade: grade,
        stageLabel: `${grade}성`,
      };
    }
    return {
      frameTier: Number(variant?.frameTier || 0),
      groupTier: Number(variant?.groupTier || 0),
      groupGrade: Number(variant?.groupGrade || 0),
      stageLabel: String(variant?.stageLabel || "").trim(),
    };
  }

  function patchSecondGenWeaponStageVariants(entity) {
    const entityId = String(entity?.characterId || entity?.viewerId || "");
    if ((entity?.kind !== "weapon" && !entityId.startsWith("220"))) {
      return;
    }
    if (!Array.isArray(entity?.skills)) return;

    entity.skills.forEach((skill) => {
      if (!skill || !Array.isArray(skill.variants)) return;
      skill.variants.forEach((variant) => {
        const skillId = String(variant?.skillId || "");
        const suffix = skillId.slice(-4);
        if (!SECOND_GEN_WEAPON_STAGE_GRADE_BY_SUFFIX.has(suffix)) {
          return;
        }

        const normalizedGrade = SECOND_GEN_WEAPON_STAGE_GRADE_BY_SUFFIX.get(suffix);
        variant.frameTier = 5;
        variant.groupTier = 0;
        variant.groupGrade = normalizedGrade;
        variant.stageLabel = `${normalizedGrade}성`;
      });
    });
  }

  function eventRewardScheduleKey(schedule) {
    const rule = schedule?.scheduleRule || {};
    const start = normalizeScheduleDateKey(rule.start || schedule?.start);
    const end = normalizeScheduleDateKey(rule.end || schedule?.end);
    return start && end ? `${start}..${end}` : "";
  }

  function buildCumulativeEventRewardSchedule(scheduleKey, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    const [rawStart = "", rawEnd = ""] = String(scheduleKey || "").split("..");
    const start = normalizeScheduleDateKey(rawStart);
    const end = normalizeScheduleDateKey(rawEnd);
    if (!start || !end) return null;

    const startDateTimeKey = dateKeyToDateTimeKey(start, KR1_RESET_HOUR);
    const endExclusiveDateTimeKey = dateKeyToDateTimeKey(addDaysToDateKey(end, 1), KR1_RESET_HOUR);
    let status = "past";
    if (startDateTimeKey && currentDateTimeKey < startDateTimeKey) {
      status = "upcoming";
    } else if (endExclusiveDateTimeKey && currentDateTimeKey < endExclusiveDateTimeKey) {
      status = "current";
    }

    return { start, end, status };
  }

  function patchCumulativeEventRewardSchedules(entity) {
    if (!entity) return;
    const entityId = String(entity.characterId || entity.viewerId || entity.id || "");
    const allowedScheduleKeys = CUMULATIVE_EVENT_REWARD_SCHEDULE_KEYS.get(entityId);
    if (!allowedScheduleKeys) return;

    const currentDateTimeKey = getTimeZoneDateTimeKey();
    const scheduleByKey = new Map();
    const sourceSchedules = Array.isArray(entity.schedules) ? entity.schedules : [];

    sourceSchedules.forEach((schedule) => {
      const scheduleKey = eventRewardScheduleKey(schedule);
      if (!allowedScheduleKeys.has(scheduleKey) || scheduleByKey.has(scheduleKey)) {
        return;
      }
      scheduleByKey.set(scheduleKey, schedule);
    });

    allowedScheduleKeys.forEach((scheduleKey) => {
      if (scheduleByKey.has(scheduleKey)) return;
      const generatedSchedule = buildCumulativeEventRewardSchedule(scheduleKey, currentDateTimeKey);
      if (generatedSchedule) {
        scheduleByKey.set(scheduleKey, generatedSchedule);
      }
    });

    entity.schedules = [...scheduleByKey.entries()]
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([, schedule]) => schedule);
  }

  function applyEventRewardSchedulePatches() {
    getCategories().forEach((category) => {
      getItems(category).forEach((item) => {
        patchCumulativeEventRewardSchedules(item);
      });
    });
  }

  function attachEntitySkillContext(entity) {
    if (!entity || !Array.isArray(entity.skills)) return;
    const baseContext = {
      characterId: String(entity.characterId || entity.viewerId || entity.id || ""),
      entityName: String(entity.name || entity.title || ""),
      entityKind: String(entity.kind || ""),
      elementKey: String(entity.elementKey || ""),
      attackTypeKey: String(entity.attackTypeKey || ""),
    };

    entity.skills.forEach((skill) => {
      if (!skill || !Array.isArray(skill.variants)) return;
      const skillName = String(skill.name || "");
      const slotIndex = Number(skill.slotIndex);
      skill.variants.forEach((variant) => {
        if (!variant || typeof variant !== "object") return;
        variant.entityContext = {
          ...baseContext,
          skillName,
          slotIndex: Number.isFinite(slotIndex) ? slotIndex : -1,
        };
      });
    });
  }

  function applyRuntimeSkillTextPatches() {
    (Array.isArray(data.categories) ? data.categories : []).forEach((category) => {
      (category.items || []).forEach((item) => {
        applyCharacterMetaOverride(item);
        patchEntitySkillTexts(item);
        patchSecondGenWeaponStageVariants(item);
        attachEntitySkillContext(item);
      });
    });
    (Array.isArray(window.GACHA_VIEWER_EXTRA_PETS) ? window.GACHA_VIEWER_EXTRA_PETS : []).forEach((item) => {
      applyCharacterMetaOverride(item);
      patchEntitySkillTexts(item);
      patchSecondGenWeaponStageVariants(item);
      attachEntitySkillContext(item);
    });
  }

  applyRuntimeSkillTextPatches();

  function buildExtraPetPlaceholder(config) {
    const enrichment = EXTRA_PET_ENRICHMENTS.get(String(config.characterId || "")) || {};
    const runtimeMeta = characterMetaOverride(config.characterId) || {};
    const resolvedAttackSpeedType = Number(config.attackSpeedType || runtimeMeta.attackSpeedType) || 0;
    const resolvedSchedules = Array.isArray(config.schedules) && config.schedules.length
      ? config.schedules
      : (Array.isArray(enrichment.schedules) ? enrichment.schedules : []);
    const resolvedScheduleTitleOverride = String(
      config.scheduleTitleOverride
      || enrichment.scheduleTitleOverride
      || "획득 정보"
    ).trim();
    const resolvedListMetaLabel = String(
      config.listMetaLabel
      || enrichment.listMetaLabel
      || ""
    ).trim();
    const detailMetaLabel = String(
      config.detailMetaLabel
      || enrichment.detailMetaLabel
      || config.description
      || ""
    ).trim();
    const resolvedPetSubgroupKey = String(
      config.petSubgroupKey
      || enrichment.petSubgroupKey
      || enrichment.subgroupKey
      || ""
    ).trim();
    const derivedStageImage = extraPetAssetPath(config.characterId, "stage");
    const derivedHeroIconImage = extraPetAssetPath(config.characterId, "heroicon");
    const derivedPortraitImage = extraPetAssetPath(config.characterId, "portrait");
    const derivedBannerImage = extraPetAssetPath(config.characterId, "banner");
    const resolvedStageImage = isExtraPetPlaceholderAsset(enrichment.stageImage)
      ? derivedStageImage
      : enrichment.stageImage;
    const resolvedHeroIconImage = isExtraPetPlaceholderAsset(enrichment.heroIconImage)
      ? derivedHeroIconImage
      : enrichment.heroIconImage;
    const resolvedGachaIconImage = config.gachaIconImage
      || (isExtraPetPlaceholderAsset(enrichment.gachaIconImage)
        ? (resolvedHeroIconImage || derivedHeroIconImage)
        : enrichment.gachaIconImage);
    const resolvedPortraitImage = isExtraPetPlaceholderAsset(enrichment.portraitImage)
      ? derivedPortraitImage
      : enrichment.portraitImage;
    const resolvedBannerImage = isExtraPetPlaceholderAsset(enrichment.bannerImage)
      ? derivedBannerImage
      : enrichment.bannerImage;
    const resolvedBackdropImage = isExtraPetPlaceholderAsset(enrichment.backdropImage)
      ? (resolvedBannerImage || derivedBannerImage)
      : enrichment.backdropImage;
    return {
      ...enrichment,
      kind: "pet",
      viewerId: config.characterId,
      characterId: config.characterId,
      name: config.name,
      title: config.title,
      description: config.description,
      petSubgroupKey: resolvedPetSubgroupKey,
      elementKey: config.elementKey || "",
      elementLabel: config.elementLabel || "",
      attackTypeKey: config.attackTypeKey || "",
      attackSpeedType: resolvedAttackSpeedType,
      attackSpeedLabel: config.attackSpeedLabel || ATTACK_SPEED_LABEL_BY_TYPE[resolvedAttackSpeedType] || "",
      order: config.order,
      skills: Array.isArray(enrichment.skills) ? enrichment.skills : [],
      schedules: resolvedSchedules,
      scheduleTitleOverride: resolvedScheduleTitleOverride,
      statusLabel: config.statusLabel,
      statusSummary: config.statusSummary,
      statusTone: config.statusTone || "upcoming",
      acquisitionEntries: Array.isArray(config.acquisitionEntries)
        ? config.acquisitionEntries
        : [],
      hideStaticArtwork: enrichment.hideStaticArtwork === true,
      listMetaLabel: resolvedListMetaLabel,
      detailMetaLabel,
      stageImage: resolvedStageImage || PLACEHOLDER_PET_ICON,
      heroIconImage: resolvedHeroIconImage || PLACEHOLDER_PET_ICON,
      gachaIconImage: resolvedGachaIconImage || resolvedHeroIconImage || PLACEHOLDER_PET_ICON,
      portraitImage: resolvedPortraitImage || resolvedBannerImage || PLACEHOLDER_PET_ICON,
      bannerImage: resolvedBannerImage || resolvedPortraitImage || PLACEHOLDER_PET_BANNER,
      backdropImage: resolvedBackdropImage || resolvedBannerImage || resolvedPortraitImage || PLACEHOLDER_PET_BANNER,
    };
  }

  const EXTRA_PET_PLACEHOLDERS = [
    buildExtraPetPlaceholder({
      order: 14,
      characterId: "1102801",
      name: "고대군주 쟈쟈코",
      title: "고대의 군주",
      description: "천공의 탑 연계 SS 펫",
      elementKey: "wind",
      attackTypeKey: "support",
      statusLabel: "상점형",
      statusSummary: "천공의 탑 영웅의 증표 상점",
      acquisitionEntries: [
        {
          title: "천공의 탑 영웅의 증표 상점",
          summary: "상시 상품",
          tone: "content",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 15,
      characterId: "1107901",
      name: "도라비스",
      title: "바람을 타는 전사",
      description: "상점·이벤트 연계 SS 펫",
      elementKey: "wind",
      attackTypeKey: "support",
      statusLabel: "특수 획득",
      statusSummary: "부족 상점 / 영웅의 증표 상점 / 룰렛 티켓 특가",
      acquisitionEntries: [
        {
          title: "부족 상점",
          summary: "상시 상품",
          tone: "content",
        },
        {
          title: "천공의 탑 영웅의 증표 상점",
          summary: "기간·상시 상품",
          tone: "content",
        },
        {
          title: "도라비스 룰렛 티켓 특가",
          summary: "특가 패키지 I·II·III",
          tone: "event",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 16,
      characterId: "1100501",
      name: "성기사 바우트",
      title: "금강불괴",
      description: "고급 진주 상점 SS 펫",
      elementKey: "fire",
      attackTypeKey: "defence",
      statusLabel: "상점형",
      statusSummary: "원시왕 고급 진주 상점",
      acquisitionEntries: [
        {
          title: "원시왕 고급 진주 상점",
          summary: "상시 상품 2종",
          tone: "content",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 17,
      characterId: "1101401",
      name: "성기사 포베이",
      title: "성스러운 기사단",
      description: "고급 진주 상점 SS 펫",
      elementKey: "wind",
      attackTypeKey: "melee",
      statusLabel: "상점형",
      statusSummary: "원시왕 고급 진주 상점",
      acquisitionEntries: [
        {
          title: "원시왕 고급 진주 상점",
          summary: "상시 상품 2종",
          tone: "content",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 18,
      characterId: "1104001",
      name: "베이보",
      title: "하늘 위 딜러",
      description: "부화장/패키지형 SS 펫",
      elementKey: "wind",
      attackTypeKey: "ranged",
      statusLabel: "부화장형",
      statusSummary: "부화장 선택 부화 / 전용 패키지",
      acquisitionEntries: [
        {
          title: "부화장",
          summary: "무지개 알 선택 부화",
          tone: "content",
        },
        {
          title: "베이보 획득 기념 패키지",
          summary: "★1 즉시 승급",
          tone: "package",
        },
        {
          title: "베이보 승급 지원 패키지 I·II·III",
          summary: "★4·7·10 승급 지원",
          tone: "package",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 19,
      characterId: "1110701",
      name: "카우거",
      title: "폭풍을 부르는 늑대",
      description: "부화장/축제형 SS 펫",
      elementKey: "wind",
      attackTypeKey: "melee",
      statusLabel: "축제형",
      statusSummary: "부화장 선택 부화 / 앵콜! 축제 1일차 / 전용 패키지",
      acquisitionEntries: [
        {
          title: "부화장",
          summary: "무지개 알 선택 부화",
          tone: "content",
        },
        {
          title: "앵콜! 축제 1일차",
          summary: "획득 50% 도전 I·II·III",
          tone: "event",
        },
        {
          title: "카우거 획득 기념 패키지",
          summary: "★1 즉시 승급",
          tone: "package",
        },
        {
          title: "카우거 승급 지원 패키지 I·II·III",
          summary: "★4·7·10 승급 지원",
          tone: "package",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 20,
      characterId: "1110901",
      name: "크비커",
      title: "늪지대의 사냥꾼",
      description: "부화장/축제형 SS 펫",
      elementKey: "water",
      attackTypeKey: "ranged",
      statusLabel: "축제형",
      statusSummary: "부화장 선택 부화 / 앵콜! 축제 4일차 / 전용 패키지",
      acquisitionEntries: [
        {
          title: "부화장",
          summary: "무지개 알 선택 부화",
          tone: "content",
        },
        {
          title: "앵콜! 축제 4일차",
          summary: "획득 50% 도전 I·II·III",
          tone: "event",
        },
        {
          title: "크비커 획득 기념 패키지",
          summary: "★1 즉시 승급",
          tone: "package",
        },
        {
          title: "크비커 승급 지원 패키지 I·II",
          summary: "★4·7 승급 지원",
          tone: "package",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 21,
      characterId: "1107001",
      name: "킹꼬미",
      title: "하늘의 붉은 불꽃",
      description: "부화장/축제형 SS 펫",
      elementKey: "fire",
      attackTypeKey: "ranged",
      statusLabel: "축제형",
      statusSummary: "부화장 선택 부화 / 앵콜! 축제 2일차 / 전용 패키지",
      acquisitionEntries: [
        {
          title: "부화장",
          summary: "무지개 알 선택 부화",
          tone: "content",
        },
        {
          title: "앵콜! 축제 2일차",
          summary: "획득 50% 도전 I·II·III",
          tone: "event",
        },
        {
          title: "킹꼬미 획득 기념 패키지",
          summary: "★1 즉시 승급",
          tone: "package",
        },
        {
          title: "킹꼬미 승급 지원 패키지 I·II",
          summary: "★4·7 승급 지원",
          tone: "package",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 22,
      characterId: "1103901",
      name: "파아란",
      title: "순수한 물의 요정",
      description: "부화장/축제형 SS 펫",
      elementKey: "water",
      attackTypeKey: "support",
      statusLabel: "축제형",
      statusSummary: "부화장 선택 부화 / 앵콜! 축제 3일차 / 전용 패키지",
      acquisitionEntries: [
        {
          title: "부화장",
          summary: "무지개 알 선택 부화",
          tone: "content",
        },
        {
          title: "앵콜! 축제 3일차",
          summary: "획득 50% 도전 I·II·III",
          tone: "event",
        },
        {
          title: "파아란 획득 기념 패키지",
          summary: "★1 즉시 승급",
          tone: "package",
        },
        {
          title: "파아란 승급 지원 패키지 I·II",
          summary: "★4·7 승급 지원",
          tone: "package",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 23,
      characterId: "1103801",
      name: "플라티",
      title: "아기 수장룡",
      description: "픽업 연계 특수 SS 펫",
      elementKey: "water",
      attackTypeKey: "ranged",
      statusLabel: "패키지형",
      statusSummary: "플라티우스 픽업 / 전용 패키지",
      acquisitionEntries: [
        {
          title: "픽업 상점",
          summary: "획득 50% 도전",
          tone: "event",
        },
        {
          title: "플라티 획득 기념 패키지",
          summary: "★1 즉시 승급",
          tone: "package",
        },
        {
          title: "플라티 승급 지원 패키지 I·II",
          summary: "★4·7 승급 지원",
          tone: "package",
        },
      ],
    }),
    buildExtraPetPlaceholder({
      order: 27,
      characterId: "1112601",
      petSubgroupKey: "gacha",
      name: "타이혼",
      title: "초월의 사도",
      description: "네메시스의 그림자",
      listMetaLabel: "이벤트",
      detailMetaLabel: "누적소비 이벤트 보상",
      scheduleTitleOverride: "누적소비 이벤트 일정",
      gachaIconImage: "assets/pets/1112601-gachaicon.png?v=20260416-main-widget-02",
      schedules: [
        {
          start: "2026-04-16",
          end: "2026-04-22",
          status: "current",
          scheduleRule: {
            timeType: 10,
            openDay: 34,
            period: 7,
          },
        },
        {
          start: "2026-05-14",
          end: "2026-05-20",
          status: "upcoming",
          scheduleRule: {
            timeType: 10,
            openDay: 62,
            period: 7,
          },
        },
        {
          start: "2026-06-20",
          end: "2026-06-26",
          status: "upcoming",
          scheduleRule: {
            timeType: 5,
            start: "2026-06-20",
            end: "2026-06-26",
            openDay: 83,
          },
        },
        {
          start: "2026-08-01",
          end: "2026-08-07",
          status: "upcoming",
          scheduleRule: {
            timeType: 5,
            start: "2026-08-01",
            end: "2026-08-07",
            openDay: 83,
          },
        },
        {
          start: "2026-09-12",
          end: "2026-09-18",
          status: "upcoming",
          scheduleRule: {
            timeType: 5,
            start: "2026-09-12",
            end: "2026-09-18",
            openDay: 83,
          },
        },
        {
          start: "2026-10-24",
          end: "2026-10-30",
          status: "upcoming",
          scheduleRule: {
            timeType: 5,
            start: "2026-10-24",
            end: "2026-10-30",
            openDay: 83,
          },
        },
        {
          start: "2026-12-05",
          end: "2026-12-11",
          status: "upcoming",
          scheduleRule: {
            timeType: 5,
            start: "2026-12-05",
            end: "2026-12-11",
            openDay: 83,
          },
        },
        {
          start: "2027-01-16",
          end: "2027-01-22",
          status: "upcoming",
          scheduleRule: {
            timeType: 5,
            start: "2027-01-16",
            end: "2027-01-22",
            openDay: 83,
          },
        },
      ],
      elementKey: "wind",
      attackTypeKey: "support",
      attackSpeedType: 4,
      statusLabel: "이벤트",
      statusSummary: "누적소비 이벤트 보상",
      statusTone: "current",
      acquisitionEntries: [
        {
          title: "누적소비 이벤트 보상",
          summary: "2010 / 2011 이벤트 보상 확인",
          tone: "event",
        },
        {
          title: "컬렉션",
          summary: "초월의 사도 등록 확인",
          tone: "content",
        },
      ],
    }),
  ];

  const PET_SUBGROUPS = [
    { key: "gacha", label: "가챠·이벤트" },
    { key: "content", label: "콘텐츠·상점" },
  ];

  const CONTENT_SHOP_PET_IDS = new Set([
    "1102801",
    "1107901",
    "1100501",
    "1101401",
    "1104001",
    "1110701",
    "1110901",
    "1107001",
    "1103901",
    "1103801",
  ]);
  const GENERAL_SUMMON_OPEN_DAY_BY_ID = Object.freeze({
    "1108501": 27, // 모가로스
    "1100101": 34, // 얀기로
    "1112301": 41, // 아모로스
    "1300201": 48, // 팔케온
    "1105501": 55, // 디어룬
    "1103401": 62, // 베르가
    "1109901": 69, // 카미르
    "1108801": 76, // 리나펠타
    "1107101": 83, // 바라쿠스
    "1105201": 90, // 골드로비
    "1104701": 97, // 프라키토스
    "1103601": 104, // 플라티우스
    "1112501": 111, // 킹고르
    "1100201": 118, // 극호
    "1112401": 125, // 킹우리
  });
  const PET_DISPLAY_ORDER_BY_ID = Object.freeze({
    "1112601": 1, // 타이혼
    "1107701": 2, // 블루문
    "1108501": 3, // 모가로스
    "1100101": 4, // 얀기로
    "1112301": 5, // 아모로스
    "1300201": 6, // 팔케온
    "1105501": 7, // 디어룬
    "1103401": 8, // 베르가
    "1109901": 9, // 카미르
    "1108801": 10, // 리나펠타
    "1107101": 11, // 바라쿠스
    "1105201": 12, // 골드로비
    "1104701": 13, // 프라키토스
    "1103601": 14, // 플라티우스
    "1112501": 15, // 킹고르
    "1100201": 16, // 극호
    "1112401": 17, // 킹우리
  });

  function injectExtraPetPlaceholders() {
    const petCategory = data.categories.find((category) => category && category.key === "pet");
    if (!petCategory || !Array.isArray(petCategory.items)) return;

    const existingIds = new Set(
      petCategory.items.map((item) => String(item?.viewerId || item?.characterId || item?.id || item?.name || ""))
    );

    EXTRA_PET_PLACEHOLDERS.forEach((entry) => {
      const entryId = String(entry.characterId || entry.viewerId || entry.name || "");
      if (!entryId || existingIds.has(entryId)) return;
      petCategory.items.push(entry);
      existingIds.add(entryId);
    });
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getCategories() {
    return Array.isArray(data.categories) ? data.categories : [];
  }

  function isRouletteCalculatorCategory(categoryOrKey) {
    const key = typeof categoryOrKey === "string" ? categoryOrKey : categoryOrKey?.key;
    return ROULETTE_CALCULATOR_ENABLED && key === ROULETTE_CALCULATOR_CATEGORY_KEY;
  }

  function getNavigationCategories() {
    return ROULETTE_CALCULATOR_ENABLED
      ? [...getCategories(), ROULETTE_CALCULATOR_CATEGORY]
      : getCategories();
  }

  function getActiveCategory() {
    if (isRouletteCalculatorCategory(state.activeCategoryKey)) {
      return ROULETTE_CALCULATOR_CATEGORY;
    }
    const categories = getCategories();
    return categories.find((category) => category.key === state.activeCategoryKey) || categories[0];
  }

  function getItems(category = getActiveCategory()) {
    const items = Array.isArray(category?.items) ? category.items : [];
    const currentDateTimeKey = getTimeZoneDateTimeKey();
    return [...items].sort((left, right) => {
      const leftScheduleRank = itemScheduleSortInfo(left, currentDateTimeKey);
      const rightScheduleRank = itemScheduleSortInfo(right, currentDateTimeKey);
      if (leftScheduleRank.group !== rightScheduleRank.group) {
        return leftScheduleRank.group - rightScheduleRank.group;
      }
      if (leftScheduleRank.dateTimeKey !== rightScheduleRank.dateTimeKey) {
        return leftScheduleRank.dateTimeKey.localeCompare(rightScheduleRank.dateTimeKey);
      }
      const leftRank = fallbackDisplayOrderValue(category, left) || Number.MAX_SAFE_INTEGER;
      const rightRank = fallbackDisplayOrderValue(category, right) || Number.MAX_SAFE_INTEGER;
      if (leftRank !== rightRank) return leftRank - rightRank;
      return String(left?.name || "").localeCompare(String(right?.name || ""), "ko");
    });
  }

  function isCumulativeEventRailItem(item) {
    return String(item?.listMetaLabel || "").trim() === "이벤트"
      || String(item?.detailMetaLabel || "").includes("누적소비")
      || String(item?.scheduleTitleOverride || "").includes("누적소비");
  }

  function itemScheduleSortInfo(item, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    if (isCumulativeEventRailItem(item)) {
      return {
        group: -1,
        dateTimeKey: "",
      };
    }

    if (item?.railSortBottom === true) {
      return {
        group: 9,
        dateTimeKey: "9999-12-31 23:59:59",
      };
    }

    const schedules = getResolvedSchedules(item, currentDateTimeKey);
    const current = schedules.find((schedule) => schedule.resolvedStatus === "current");
    if (current) {
      return {
        group: 0,
        dateTimeKey: current.resolvedStartDateTimeKey || "",
      };
    }

    const upcoming = schedules.find((schedule) => schedule.resolvedStatus === "upcoming");
    if (upcoming) {
      return {
        group: 1,
        dateTimeKey: upcoming.resolvedStartDateTimeKey || "",
      };
    }

    const pastSchedules = schedules.filter((schedule) => schedule.resolvedStatus === "past");
    const past = pastSchedules[pastSchedules.length - 1];
    if (past) {
      return {
        group: 2,
        dateTimeKey: past.resolvedStartDateTimeKey || "",
      };
    }

    return {
      group: 3,
      dateTimeKey: "",
    };
  }

  function fallbackDisplayOrderValue(category, pet) {
    if (category?.key === "weapon") {
      return WEAPON_DISPLAY_ORDER_BY_ID[getEntityId(pet)] || pet.order || 0;
    }
    if (category?.key === "pet") {
      return PET_DISPLAY_ORDER_BY_ID[getEntityId(pet)] || pet.order || 0;
    }
    return pet.order || 0;
  }

  function displayOrderValue(category, pet) {
    const entityId = getEntityId(pet);
    const sortedItems = getItems(category);
    const sortedIndex = sortedItems.findIndex((item) => getEntityId(item) === entityId);
    return sortedIndex >= 0 ? sortedIndex + 1 : fallbackDisplayOrderValue(category, pet);
  }

  function getEntityId(pet) {
    return String(pet?.viewerId || pet?.characterId || pet?.weaponId || pet?.id || pet?.name || "");
  }

  function getGeneralSummonOpenDateTimeKey(pet, serverOpenDateTimeKey = getActiveServerOpenDateTimeKey()) {
    const openDay = GENERAL_SUMMON_OPEN_DAY_BY_ID[getEntityId(pet)];
    if (!Number.isFinite(openDay)) return "";

    const normalizedServerOpenKey = normalizeDateTimeKey(serverOpenDateTimeKey) || KR1_SERVER_OPEN_DATE_TIME_KEY;
    const serverOpenDateKey = dateTimeKeyToDateKey(normalizedServerOpenKey);
    if (!serverOpenDateKey) return "";

    const resolvedOpenDateKey = resolveDynamicRuleStartDateKey(
      { timeType: 4, openDay, period: 7 },
      serverOpenDateKey,
    );
    return resolvedOpenDateKey
      ? dateKeyToDateTimeKey(resolvedOpenDateKey, normalizedServerOpenKey)
      : "";
  }

  function isGeneralSummonAlwaysOpen(pet, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    const generalOpenDateTimeKey = getGeneralSummonOpenDateTimeKey(pet);
    const currentTimestamp = dateTimeKeyToTimestamp(currentDateTimeKey);
    const generalOpenTimestamp = dateTimeKeyToTimestamp(generalOpenDateTimeKey);
    return Number.isFinite(currentTimestamp)
      && Number.isFinite(generalOpenTimestamp)
      && currentTimestamp >= generalOpenTimestamp;
  }

  function resolveGeneralSummonStatusMeta(pet, currentDateTimeKey = getTimeZoneDateTimeKey()) {
    const startDateTimeKey = getGeneralSummonOpenDateTimeKey(pet);
    if (!startDateTimeKey) return null;
    const sourceLabel = "일반 펫뽑기";

    const currentTimestamp = dateTimeKeyToTimestamp(currentDateTimeKey);
    const startTimestamp = dateTimeKeyToTimestamp(startDateTimeKey);
    const currentDateKey = dateTimeKeyToDateKey(currentDateTimeKey);
    const startDateKey = dateTimeKeyToDateKey(startDateTimeKey);
    const tomorrowDateKey = currentDateKey ? addDaysToDateKey(currentDateKey, 1) : "";
    const compactSummary = startDateTimeKey
      ? `${formatCompactDisplayDateTimeKey(startDateTimeKey)} 시작`
      : "";

    if (Number.isFinite(currentTimestamp) && Number.isFinite(startTimestamp)) {
      const diffMs = Math.max(0, startTimestamp - currentTimestamp);
      if (currentTimestamp >= startTimestamp) {
        return {
          tone: "current",
          label: "상시 오픈중",
          summary: compactSummary,
          startDateTimeKey,
          sourceLabel,
        };
      }
      if (startDateKey && currentDateKey && startDateKey === currentDateKey) {
        return {
          tone: "today",
          label: "상시 오늘 오픈",
          summary: compactSummary,
          startDateTimeKey,
          sourceLabel,
        };
      }
      if (startDateKey && tomorrowDateKey && startDateKey === tomorrowDateKey) {
        return {
          tone: "soon",
          label: "상시 내일 오픈",
          summary: compactSummary,
          startDateTimeKey,
          sourceLabel,
        };
      }
      if (diffMs <= DAY_MS * 3) {
        return {
          tone: "imminent",
          label: "상시 오픈 임박",
          summary: compactSummary,
          startDateTimeKey,
          sourceLabel,
        };
      }
    }

    return {
      tone: "upcoming",
      label: "상시 오픈 예정",
      summary: compactSummary,
      startDateTimeKey,
      sourceLabel,
    };
  }

  function getPetSubgroupKeyForItem(pet) {
    const explicitSubgroupKey = String(
      pet?.petSubgroupKey
      || pet?.subgroupKey
      || ""
    ).trim();
    if (explicitSubgroupKey === "content" || explicitSubgroupKey === "gacha") {
      return explicitSubgroupKey;
    }
    return CONTENT_SHOP_PET_IDS.has(getEntityId(pet)) ? "content" : "gacha";
  }

  function getDisplayItems(category = getActiveCategory(), petSubgroupKey = state.activePetSubgroupKey) {
    const items = getItems(category);
    const filterEndedItems = (list) => state.showPastRailItems
      ? list
      : list.filter((item) => !isEndedRailItem(item));
    if (category?.key !== "pet") {
      return filterEndedItems(items);
    }
    const filteredItems = items.filter((item) => getPetSubgroupKeyForItem(item) === petSubgroupKey);
    const groupedItems = filteredItems.length ? filteredItems : items;
    return filterEndedItems(groupedItems);
  }

  function getRailFilterBaseItems(category = getActiveCategory()) {
    const items = getItems(category);
    if (category?.key !== "pet") {
      return items;
    }
    const filteredItems = items.filter((item) => getPetSubgroupKeyForItem(item) === state.activePetSubgroupKey);
    return filteredItems.length ? filteredItems : items;
  }

  function isEndedRailItem(item) {
    const hasSchedule = Array.isArray(item?.schedules) && item.schedules.length > 0;
    return hasSchedule && getPetStatus(item).tone === "past";
  }

  function syncPetSubgroupSelection(category = getActiveCategory()) {
    if (category?.key !== "pet") {
      return;
    }
    const allItems = getItems(category);
    const displayItems = getDisplayItems(category);
    if (!allItems.length || !displayItems.length) {
      return;
    }
    const currentItem = getCurrentItem(category);
    if (currentItem && getPetSubgroupKeyForItem(currentItem) === state.activePetSubgroupKey) {
      return;
    }
    const preferredIndex = clamp(findPreferredIndex(displayItems), 0, displayItems.length - 1);
    const nextItem = displayItems[preferredIndex] || displayItems[0];
    const nextIndex = allItems.findIndex((item) => getEntityId(item) === getEntityId(nextItem));
    if (nextIndex >= 0) {
      state.selectedIndexByCategory[category.key] = nextIndex;
    }
  }

  function syncRailVisibleSelection(category = getActiveCategory()) {
    const allItems = getItems(category);
    const displayItems = getDisplayItems(category);
    if (!allItems.length || !displayItems.length) {
      return;
    }
    const currentItem = getCurrentItem(category);
    if (currentItem && displayItems.some((item) => getEntityId(item) === getEntityId(currentItem))) {
      return;
    }
    const preferredIndex = clamp(findPreferredIndex(displayItems), 0, displayItems.length - 1);
    const nextItem = displayItems[preferredIndex] || displayItems[0];
    const nextIndex = allItems.findIndex((item) => getEntityId(item) === getEntityId(nextItem));
    if (nextIndex >= 0) {
      state.selectedIndexByCategory[category.key] = nextIndex;
    }
  }

  function getCurrentIndex(category = getActiveCategory()) {
    const items = getItems(category);
    if (!items.length) return 0;
    return clamp(state.selectedIndexByCategory[category.key] || 0, 0, items.length - 1);
  }

  function getCurrentItem(category = getActiveCategory()) {
    const items = getItems(category);
    return items[getCurrentIndex(category)] || null;
  }

  function escapeHtml(text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatInteger(value) {
    const numeric = Number(value);
    const safeValue = Number.isFinite(numeric) ? Math.round(numeric) : 0;
    return safeValue.toLocaleString("ko-KR");
  }

  function formatWon(value) {
    return `${formatInteger(value)}원`;
  }

  function normalizeIntegerInput(value, fallback = 0, min = 0, max = 9999) {
    const numeric = Number.parseInt(String(value ?? "").replace(/[^\d-]/g, ""), 10);
    const safeValue = Number.isFinite(numeric) ? numeric : fallback;
    return clamp(safeValue, min, max);
  }

  function defaultRouletteAvailableOptions() {
    return ROULETTE_AVAILABLE_OPTION_KEYS.reduce((result, key) => {
      result[key] = true;
      return result;
    }, {});
  }

  function defaultRoulettePurchasedOptions() {
    return ROULETTE_PURCHASED_OPTION_KEYS.reduce((result, key) => {
      result[key] = 0;
      return result;
    }, {});
  }

  function rouletteOptionMaxCount(key) {
    const packageOption = ROULETTE_GENERIC_PACKAGES.find((option) => option.key === key);
    if (packageOption) return Math.max(1, packageOption.maxCount || 1);
    if (ROULETTE_OPENING_SPECIALS.some((option) => option.key === key)) return 1;
    if (ROULETTE_HOTDEALS.some((option) => option.key === key)) return 1;
    if (ROULETTE_NEXT_HOTDEAL.key === key) return 1;
    return 1;
  }

  function normalizeRoulettePurchasedOptions(purchasedOptions, legacyAvailableOptions) {
    const normalized = defaultRoulettePurchasedOptions();
    ROULETTE_PURCHASED_OPTION_KEYS.forEach((key) => {
      const maxCount = rouletteOptionMaxCount(key);
      normalized[key] = normalizeIntegerInput(purchasedOptions?.[key], 0, 0, maxCount);
      if (legacyAvailableOptions && legacyAvailableOptions[key] === false) {
        normalized[key] = maxCount;
      }
      if (legacyAvailableOptions && key.startsWith("package") && legacyAvailableOptions.genericPackages === false) {
        normalized[key] = maxCount;
      }
    });
    return normalized;
  }

  function roulettePurchasedCount(calculator, key) {
    return normalizeIntegerInput(
      calculator?.purchasedOptions?.[key],
      0,
      0,
      rouletteOptionMaxCount(key),
    );
  }

  function roulettePurchasedSummary(calculator) {
    const entries = [
      ...ROULETTE_OPENING_SPECIALS,
      ...ROULETTE_HOTDEALS,
      ROULETTE_NEXT_HOTDEAL,
      ...ROULETTE_GENERIC_PACKAGES,
    ];
    return entries.reduce((summary, option) => {
      const count = roulettePurchasedCount(calculator, option.key);
      if (count <= 0) return summary;
      summary.count += count;
      summary.tickets += (option.tickets || 0) * count;
      summary.cost += (option.cost || 0) * count;
      return summary;
    }, { count: 0, tickets: 0, cost: 0 });
  }

  function roulettePurchasedCurrentTickets(calculator) {
    const currentRouletteOptions = [
      ...ROULETTE_OPENING_SPECIALS,
      ...ROULETTE_HOTDEALS,
      ...ROULETTE_GENERIC_PACKAGES,
    ];
    return currentRouletteOptions.reduce((sum, option) => (
      sum + (roulettePurchasedCount(calculator, option.key) * (option.tickets || 0))
    ), 0);
  }

  function roulettePurchasedSummaryLabel(calculator) {
    const summary = roulettePurchasedSummary(calculator);
    if (summary.count <= 0) {
      return "이미 구매 0개";
    }
    return `이미 구매 ${formatInteger(summary.count)}개 · ${formatInteger(summary.tickets)}장 상품 추가비용 제외`;
  }

  function dateKeyDiffDays(startDateKey, endDateKey) {
    const start = normalizeScheduleDateKey(startDateKey);
    const end = normalizeScheduleDateKey(endDateKey);
    if (!start || !end) return Number.NaN;
    const startTimestamp = dateTimeKeyToTimestamp(`${start} 00:00:00`);
    const endTimestamp = dateTimeKeyToTimestamp(`${end} 00:00:00`);
    if (!Number.isFinite(startTimestamp) || !Number.isFinite(endTimestamp)) {
      return Number.NaN;
    }
    return Math.round((endTimestamp - startTimestamp) / DAY_MS);
  }

  function rouletteMissionEventInfo(kind) {
    const categoryKey = kind === "ride" ? "ride" : "weapon";
    const category = getCategories().find((item) => item && item.key === categoryKey);
    const nowKey = getTimeZoneDateTimeKey();
    const nowTimestamp = dateTimeKeyToTimestamp(nowKey);
    if (!category || !Number.isFinite(nowTimestamp)) {
      return {
        active: false,
        label: "일정 미확인",
        eventDay: 1,
        totalDays: ROULETTE_MAX_MISSION_DAYS,
        remainingFutureDays: ROULETTE_MAX_MISSION_DAYS,
      };
    }

    const currentEntry = getItems(category)
      .map((item) => ({
        item,
        schedule: getResolvedSchedules(item, nowKey).find((schedule) => schedule.resolvedStatus === "current") || null,
      }))
      .find((entry) => entry.schedule);

    if (!currentEntry) {
      return {
        active: false,
        label: "진행 중 일정 없음",
        eventDay: 1,
        totalDays: ROULETTE_MAX_MISSION_DAYS,
        remainingFutureDays: ROULETTE_MAX_MISSION_DAYS,
      };
    }

    const startKey = currentEntry.schedule.resolvedStartDateTimeKey || "";
    const endExclusiveKey = currentEntry.schedule.resolvedEndExclusiveDateTimeKey || "";
    const startTimestamp = dateTimeKeyToTimestamp(startKey);
    const endTimestamp = dateTimeKeyToTimestamp(endExclusiveKey);
    const totalDaysByTimestamp = Number.isFinite(startTimestamp) && Number.isFinite(endTimestamp)
      ? Math.max(1, Math.round((endTimestamp - startTimestamp) / DAY_MS))
      : ROULETTE_MAX_MISSION_DAYS;
    const totalDays = clamp(totalDaysByTimestamp, 1, ROULETTE_MAX_MISSION_DAYS);
    const elapsedDays = Number.isFinite(startTimestamp)
      ? clamp(Math.floor((nowTimestamp - startTimestamp) / DAY_MS), 0, totalDays - 1)
      : 0;
    const eventDay = clamp(elapsedDays + 1, 1, totalDays);
    const remainingFutureDays = Math.max(0, totalDays - eventDay);

    return {
      active: true,
      label: `${currentEntry.item?.name || rouletteKindMeta(categoryKey).label} ${eventDay}일차`,
      itemName: currentEntry.item?.name || "",
      eventDay,
      totalDays,
      remainingFutureDays,
      startDateTimeKey: startKey,
      endExclusiveDateTimeKey: endExclusiveKey,
    };
  }

  function normalizeRouletteCalculatorState() {
    const calculator = state.rouletteCalculator || {};
    const availableOptions = Object.assign(
      defaultRouletteAvailableOptions(),
      calculator.availableOptions || {},
    );

    ROULETTE_AVAILABLE_OPTION_KEYS.forEach((key) => {
      availableOptions[key] = availableOptions[key] !== false;
    });
    const purchasedOptions = normalizeRoulettePurchasedOptions(calculator.purchasedOptions, availableOptions);

    const kind = calculator.kind === "ride" ? "ride" : "weapon";
    const eventInfo = rouletteMissionEventInfo(kind);
    const missionCompletedDays = normalizeIntegerInput(calculator.missionCompletedDays, 0, 0, ROULETTE_MAX_MISSION_DAYS);
    const todayMissionTickets = 0;
    const missedMissionTickets = normalizeIntegerInput(
      calculator.missedMissionTickets,
      0,
      0,
      ROULETTE_MAX_MISSION_DAYS * ROULETTE_MISSION_TICKETS_PER_DAY,
    );
    const missionDays = Math.max(0, ROULETTE_MAX_MISSION_DAYS - missionCompletedDays);
    const waitMissionDays = normalizeIntegerInput(calculator.waitMissionDays, 0, 0, missionDays);

    state.rouletteCalculator = {
      kind,
      currentPulls: normalizeIntegerInput(calculator.currentPulls, 0, 0, ROULETTE_TARGET_PULLS),
      ownedTickets: normalizeIntegerInput(calculator.ownedTickets, 0, 0, 9999),
      carriedTickets: normalizeIntegerInput(calculator.carriedTickets, 0, 0, 9999),
      missionCompletedDays,
      todayMissionTickets,
      missedMissionTickets,
      missionDays,
      waitMissionDays,
      eventInfo,
      includeBlueGemSupply: calculator.includeBlueGemSupply !== false,
      considerNextCycle: calculator.considerNextCycle !== false,
      purchasedOptions,
      availableOptions,
    };
    return state.rouletteCalculator;
  }

  function rouletteKindMeta(kind) {
    return ROULETTE_KIND_META[kind === "ride" ? "ride" : "weapon"];
  }

  function roulettePackageLabel(option, kind) {
    const meta = rouletteKindMeta(kind);
    return `${meta.genericLabel} ${option.roman}`;
  }

  function rouletteCurrentTickets(calculator) {
    return normalizeIntegerInput(calculator.ownedTickets, 0, 0, 9999)
      + normalizeIntegerInput(calculator.carriedTickets, 0, 0, 9999);
  }

  function rouletteMissionTicketsForWait(calculator, waitMissionDays = calculator.waitMissionDays) {
    const missionDays = normalizeIntegerInput(calculator.missionDays, 0, 0, ROULETTE_MAX_MISSION_DAYS);
    const completedDays = normalizeIntegerInput(calculator.missionCompletedDays, 0, 0, ROULETTE_MAX_MISSION_DAYS);
    const clampedWaitDays = clamp(
      normalizeIntegerInput(waitMissionDays, 0, 0, missionDays),
      0,
      missionDays,
    );
    const plannedMissionTickets = (completedDays * ROULETTE_MISSION_TICKETS_PER_DAY)
      + normalizeIntegerInput(
      calculator.todayMissionTickets,
      0,
      0,
      ROULETTE_MISSION_TICKETS_PER_DAY,
    )
      + (clampedWaitDays * ROULETTE_MISSION_TICKETS_PER_DAY);
    const missedMissionTickets = normalizeIntegerInput(
      calculator.missedMissionTickets,
      0,
      0,
      ROULETTE_MAX_MISSION_DAYS * ROULETTE_MISSION_TICKETS_PER_DAY,
    );
    return Math.max(0, plannedMissionTickets - missedMissionTickets);
  }

  function rouletteBaseTickets(calculator) {
    return rouletteCurrentTickets(calculator)
      + rouletteMissionTicketsForWait(calculator)
      + roulettePurchasedCurrentTickets(calculator)
      + (calculator.includeBlueGemSupply ? ROULETTE_BLUE_GEM_SUPPLY_TICKETS : 0);
  }

  function rouletteStartOptions(calculator) {
    const options = [];
    ROULETTE_OPENING_SPECIALS.forEach((option) => {
      if (roulettePurchasedCount(calculator, option.key) > 0) return;
      options.push({
        key: option.key,
        label: option.label,
        tickets: option.tickets,
        cost: option.cost,
        order: option.order,
        type: "purchase",
      });
    });

    ROULETTE_GENERIC_PACKAGES.forEach((option) => {
      const maxCount = Math.max(1, option.maxCount || 1);
      const remainingCount = Math.max(0, maxCount - roulettePurchasedCount(calculator, option.key));
      for (let index = 1; index <= remainingCount; index += 1) {
        options.push({
          key: `${option.key}-${index}`,
          label: roulettePackageLabel(option, calculator.kind),
          tickets: option.tickets,
          cost: option.cost,
          order: option.order + index / 10,
          type: "purchase",
        });
      }
    });

    return options;
  }

  function selectedOptionsFromMask(options, mask) {
    const selected = [];
    for (let index = 0; index < options.length; index += 1) {
      if (mask & (1 << index)) {
        selected.push(options[index]);
      }
    }
    return selected;
  }

  function rouletteAvailableHotdeals(calculator) {
    return ROULETTE_HOTDEALS.filter((hotdeal) => roulettePurchasedCount(calculator, hotdeal.key) <= 0);
  }

  function simulateRoulettePlan(calculator, startOptions, hotdealOptions) {
    const targetPulls = ROULETTE_TARGET_PULLS;
    let pulls = calculator.currentPulls;
    let tickets = rouletteBaseTickets(calculator);
    let cost = 0;
    const steps = [];

    startOptions
      .slice()
      .sort((left, right) => (left.order || 0) - (right.order || 0))
      .forEach((option) => {
        tickets += option.tickets;
        cost += option.cost;
        steps.push({
          type: "purchase",
          label: option.label,
          tickets: option.tickets,
          cost: option.cost,
        });
      });

    const pullTo = (threshold) => {
      const safeThreshold = clamp(threshold, pulls, targetPulls);
      const needed = safeThreshold - pulls;
      if (needed <= 0) return true;
      if (tickets < needed) return false;
      tickets -= needed;
      pulls += needed;
      steps.push({
        type: "pull",
        label: `${safeThreshold}회까지 진행`,
        tickets: -needed,
        cost: 0,
      });
      return true;
    };

    hotdealOptions
      .slice()
      .sort((left, right) => left.threshold - right.threshold)
      .forEach((hotdeal) => {
        if (pulls > targetPulls) return;
        if (!pullTo(hotdeal.threshold)) {
          pulls = Number.NaN;
          return;
        }
        tickets += hotdeal.tickets;
        cost += hotdeal.cost;
        steps.push({
          type: "purchase",
          label: hotdeal.label,
          tickets: hotdeal.tickets,
          cost: hotdeal.cost,
        });
      });

    if (!Number.isFinite(pulls)) {
      return null;
    }

    if (!pullTo(targetPulls)) {
      return null;
    }

    return {
      cost,
      leftoverTickets: tickets,
      steps,
      totalTickets: rouletteBaseTickets(calculator)
        + startOptions.reduce((sum, option) => sum + option.tickets, 0)
        + hotdealOptions.reduce((sum, option) => sum + option.tickets, 0),
    };
  }

  function compareRoulettePlans(left, right) {
    if (!right) return -1;
    if (!left) return 1;
    if (left.cost !== right.cost) return left.cost - right.cost;
    if (left.leftoverTickets !== right.leftoverTickets) return left.leftoverTickets - right.leftoverTickets;
    return left.steps.length - right.steps.length;
  }

  function calculateRouletteBestPlan(inputCalculator) {
    const calculator = normalizeRouletteCalculatorSnapshot(inputCalculator);
    const startOptions = rouletteStartOptions(calculator);
    const hotdeals = rouletteAvailableHotdeals(calculator);
    const startMaskLimit = 1 << startOptions.length;
    const hotMaskLimit = 1 << hotdeals.length;
    let bestPlan = null;

    for (let startMask = 0; startMask < startMaskLimit; startMask += 1) {
      const selectedStartOptions = selectedOptionsFromMask(startOptions, startMask);
      for (let hotMask = 0; hotMask < hotMaskLimit; hotMask += 1) {
        const selectedHotdeals = selectedOptionsFromMask(hotdeals, hotMask);
        const plan = simulateRoulettePlan(calculator, selectedStartOptions, selectedHotdeals);
        if (plan && compareRoulettePlans(plan, bestPlan) < 0) {
          bestPlan = plan;
        }
      }
    }

    return bestPlan;
  }

  function normalizeRouletteCalculatorSnapshot(inputCalculator) {
    const current = inputCalculator || {};
    const availableOptions = Object.assign(defaultRouletteAvailableOptions(), current.availableOptions || {});
    ROULETTE_AVAILABLE_OPTION_KEYS.forEach((key) => {
      availableOptions[key] = availableOptions[key] !== false;
    });
    const purchasedOptions = normalizeRoulettePurchasedOptions(current.purchasedOptions, availableOptions);
    const missionCompletedDays = normalizeIntegerInput(current.missionCompletedDays, 0, 0, ROULETTE_MAX_MISSION_DAYS);
    const missionDays = Number.isFinite(Number(current.missionDays))
      ? normalizeIntegerInput(current.missionDays, ROULETTE_MAX_MISSION_DAYS, 0, ROULETTE_MAX_MISSION_DAYS)
      : Math.max(0, ROULETTE_MAX_MISSION_DAYS - missionCompletedDays);
    const waitMissionDays = normalizeIntegerInput(current.waitMissionDays, 0, 0, missionDays);
    const todayMissionTickets = normalizeIntegerInput(current.todayMissionTickets, 0, 0, ROULETTE_MISSION_TICKETS_PER_DAY);
    const missedMissionTickets = normalizeIntegerInput(
      current.missedMissionTickets,
      0,
      0,
      ROULETTE_MAX_MISSION_DAYS * ROULETTE_MISSION_TICKETS_PER_DAY,
    );

    return {
      kind: current.kind === "ride" ? "ride" : "weapon",
      currentPulls: normalizeIntegerInput(current.currentPulls, 0, 0, ROULETTE_TARGET_PULLS),
      ownedTickets: normalizeIntegerInput(current.ownedTickets, 0, 0, 9999),
      carriedTickets: normalizeIntegerInput(current.carriedTickets, 0, 0, 9999),
      missionCompletedDays,
      todayMissionTickets,
      missedMissionTickets,
      missionDays,
      waitMissionDays,
      includeBlueGemSupply: current.includeBlueGemSupply !== false,
      considerNextCycle: current.considerNextCycle !== false,
      purchasedOptions,
      availableOptions,
    };
  }

  function rouletteStepMeta(step) {
    if (step.type === "pull") {
      return {
        amount: `${formatInteger(Math.abs(step.tickets))}장 사용`,
        cost: "진행",
      };
    }
    return {
      amount: `+${formatInteger(step.tickets)}장`,
      cost: formatWon(step.cost),
    };
  }

  function roulettePlanStepsHtml(plan) {
    if (!plan || !plan.steps.length) {
      return `
        <div class="roulette-calculator-empty">
          <strong>추가 현금 구매 없음</strong>
          <span>보유 티켓과 미션 티켓만으로 500회까지 도달합니다.</span>
        </div>
      `;
    }
    return `
      <ol class="roulette-calculator-steps">
        ${plan.steps.map((step, index) => {
          const meta = rouletteStepMeta(step);
          return `
            <li class="roulette-calculator-step" data-step-type="${escapeHtml(step.type)}">
              <span class="roulette-calculator-step-index">${index + 1}</span>
              <span class="roulette-calculator-step-copy">
                <strong>${escapeHtml(step.label)}</strong>
                <small>${escapeHtml(meta.amount)}</small>
              </span>
              <span class="roulette-calculator-step-cost">${escapeHtml(meta.cost)}</span>
            </li>
          `;
        }).join("")}
      </ol>
    `;
  }

  function rouletteComparisonPlan(calculator) {
    if (rouletteCurrentTickets(calculator) <= 0) {
      return null;
    }
    return calculateRouletteBestPlan({
      ...calculator,
      ownedTickets: 0,
      carriedTickets: 0,
    });
  }

  function rouletteNextCycleSummary(calculator, currentPlan) {
    if (!calculator.considerNextCycle || !currentPlan) {
      return null;
    }
    const hot500Purchased = roulettePurchasedCount(calculator, ROULETTE_NEXT_HOTDEAL.key) > 0;
    const hotdealCost = hot500Purchased ? 0 : ROULETTE_NEXT_HOTDEAL.cost;
    const nextCarriedTickets = currentPlan.leftoverTickets + ROULETTE_NEXT_HOTDEAL.tickets;
    const nextCalculator = normalizeRouletteCalculatorSnapshot({
      ...calculator,
      currentPulls: 0,
      ownedTickets: nextCarriedTickets,
      carriedTickets: 0,
      todayMissionTickets: 0,
      missedMissionTickets: 0,
      missionDays: ROULETTE_MAX_MISSION_DAYS,
      waitMissionDays: ROULETTE_MAX_MISSION_DAYS,
      includeBlueGemSupply: calculator.includeBlueGemSupply,
      considerNextCycle: false,
      purchasedOptions: {
        ...defaultRoulettePurchasedOptions(),
        [ROULETTE_NEXT_HOTDEAL.key]: 1,
      },
      availableOptions: {
        ...calculator.availableOptions,
        hot500: false,
      },
    });
    const nextPlan = calculateRouletteBestPlan(nextCalculator);
    return {
      nextCarriedTickets,
      nextPlan,
      hotdealCost,
      hotdealTickets: ROULETTE_NEXT_HOTDEAL.tickets,
      hotdealPurchased: hot500Purchased,
      combinedCost: currentPlan.cost + hotdealCost + (nextPlan ? nextPlan.cost : 0),
    };
  }

  function rouletteMissionDayPlans(calculator) {
    const maxDays = normalizeIntegerInput(calculator.missionDays, ROULETTE_MAX_MISSION_DAYS, 0, ROULETTE_MAX_MISSION_DAYS);
    const rows = [];
    let bestRow = null;

    for (let day = 0; day <= maxDays; day += 1) {
      const dayCalculator = normalizeRouletteCalculatorSnapshot({
        ...calculator,
        waitMissionDays: day,
        considerNextCycle: false,
      });
      const plan = calculateRouletteBestPlan(dayCalculator);
      const row = {
        day,
        label: day === 0 ? "오늘" : `+${day}일`,
        missionTickets: rouletteMissionTicketsForWait(calculator, day),
        plan,
      };
      rows.push(row);
      if (plan && (!bestRow || plan.cost < bestRow.plan.cost || (plan.cost === bestRow.plan.cost && day < bestRow.day))) {
        bestRow = row;
      }
    }

    return { rows, bestRow };
  }

  function rouletteMissionDayPlansHtml(calculator) {
    const { rows, bestRow } = rouletteMissionDayPlans(calculator);
    if (!rows.length) return "";
    return `
      <section class="roulette-calculator-block">
        <div class="roulette-calculator-block-head">
          <div>
            <p class="section-label">일자별 최저가</p>
            <h3>남은 미션 티켓 반영</h3>
          </div>
          ${bestRow?.plan ? `<strong>${escapeHtml(bestRow.label)} ${escapeHtml(formatWon(bestRow.plan.cost))}</strong>` : ""}
        </div>
        <div class="roulette-calculator-day-grid">
          ${rows.map((row) => {
            const isBest = bestRow && row.day === bestRow.day;
            const plan = row.plan;
            return `
              <div class="roulette-calculator-day${isBest ? " is-selected is-best" : ""}">
                <span class="roulette-calculator-day-label">${escapeHtml(row.label)}</span>
                <strong>${plan ? escapeHtml(formatWon(plan.cost)) : "불가"}</strong>
                <small>미션 +${escapeHtml(formatInteger(row.missionTickets))}장${plan ? ` · 남음 ${escapeHtml(formatInteger(plan.leftoverTickets))}장` : ""}</small>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function rouletteRecommendedPlanInfo(calculator) {
    const { bestRow } = rouletteMissionDayPlans(calculator);
    const waitDays = bestRow ? bestRow.day : 0;
    const recommendedCalculator = normalizeRouletteCalculatorSnapshot({
      ...calculator,
      waitMissionDays: waitDays,
    });
    return {
      waitDays,
      waitLabel: waitDays === 0 ? "오늘" : `+${waitDays}일`,
      calculator: recommendedCalculator,
      plan: bestRow?.plan || calculateRouletteBestPlan(recommendedCalculator),
    };
  }

  function rouletteCalculatorResultHtml(calculator) {
    const recommended = rouletteRecommendedPlanInfo(calculator);
    const recommendedCalculator = recommended.calculator;
    const plan = recommended.plan;
    const comparisonPlan = rouletteComparisonPlan(recommendedCalculator);
    const nextSummary = rouletteNextCycleSummary(recommendedCalculator, plan);
    const baseTickets = rouletteBaseTickets(recommendedCalculator);
    const remainingPulls = Math.max(0, ROULETTE_TARGET_PULLS - recommendedCalculator.currentPulls);
    const missingBeforePurchase = Math.max(0, remainingPulls - baseTickets);
    const compareDiff = comparisonPlan && plan ? comparisonPlan.cost - plan.cost : 0;
    const missionTickets = rouletteMissionTicketsForWait(recommendedCalculator);

    if (!plan) {
      return `
        <div class="roulette-calculator-result-grid">
          <section class="roulette-calculator-result-card is-wide">
            <p class="section-label">계산 불가</p>
            <h3>아직 구매하지 않은 상품만으로 500회까지 도달할 수 없습니다.</h3>
            <p class="roulette-calculator-muted">현재 보유 티켓이나 이미 구매한 상품 체크를 다시 확인하세요.</p>
          </section>
        </div>
      `;
    }

    return `
      <div class="roulette-calculator-result-grid">
        <section class="roulette-calculator-result-card">
          <p class="section-label">추천 추가 현금</p>
          <h3>${escapeHtml(formatWon(plan.cost))}</h3>
          <span>${escapeHtml(recommended.waitLabel)} 기준 · ${escapeHtml(formatInteger(plan.leftoverTickets))}장 남음</span>
        </section>
        <section class="roulette-calculator-result-card">
          <p class="section-label">자동 추천 시점</p>
          <h3>${escapeHtml(recommended.waitLabel)}</h3>
          <span>미션 ${escapeHtml(formatInteger(missionTickets))}장 반영 · 부족분 ${escapeHtml(formatInteger(missingBeforePurchase))}장</span>
        </section>
        <section class="roulette-calculator-result-card">
          <p class="section-label">보유 티켓 차이</p>
          <h3>${comparisonPlan ? escapeHtml(formatWon(Math.max(0, compareDiff))) : "-"}</h3>
          <span>${comparisonPlan ? `보유 0장 기준 ${escapeHtml(formatWon(comparisonPlan.cost))}` : "보유 티켓 입력 시 비교"}</span>
        </section>
      </div>
      <section class="roulette-calculator-block">
        <div class="roulette-calculator-block-head">
          <div>
            <p class="section-label">자동 추천 구매 순서</p>
            <h3>이번 룰렛 500회</h3>
          </div>
          <strong>${escapeHtml(formatWon(plan.cost))}</strong>
        </div>
        ${roulettePlanStepsHtml(plan)}
      </section>
      ${rouletteMissionDayPlansHtml(calculator)}
      ${nextSummary ? `
        <section class="roulette-calculator-block">
          <div class="roulette-calculator-block-head">
            <div>
              <p class="section-label">다음 같은 종류까지 고려</p>
              <h3>${escapeHtml(ROULETTE_NEXT_HOTDEAL.label)} ${nextSummary.hotdealPurchased ? "이미 구매 반영" : "누적용"}</h3>
            </div>
            <strong>${nextSummary.hotdealCost > 0 ? "+" : ""}${escapeHtml(formatWon(nextSummary.hotdealCost))}</strong>
          </div>
          <div class="roulette-calculator-next-grid">
            <span><strong>다음 시작 보유</strong>${escapeHtml(formatInteger(nextSummary.nextCarriedTickets))}장</span>
            <span><strong>다음 500회 추가</strong>${nextSummary.nextPlan ? escapeHtml(formatWon(nextSummary.nextPlan.cost)) : "-"}</span>
            <span><strong>2회차 합산</strong>${escapeHtml(formatWon(nextSummary.combinedCost))}</span>
          </div>
        </section>
      ` : ""}
    `;
  }

  function ensureRouletteCalculatorPanel() {
    if (elements.calculatorPanel) {
      return elements.calculatorPanel;
    }
    const panel = document.createElement("section");
    panel.className = "roulette-calculator-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "룰렛 최저가 계산기");
    if (elements.stage) {
      elements.stage.appendChild(panel);
    }
    elements.calculatorPanel = panel;
    return panel;
  }

  function setRouletteCalculatorField(field, value) {
    const calculator = normalizeRouletteCalculatorState();
    if (field === "kind") {
      calculator.kind = value === "ride" ? "ride" : "weapon";
    } else if (field === "currentPulls") {
      calculator.currentPulls = normalizeIntegerInput(value, calculator.currentPulls, 0, ROULETTE_TARGET_PULLS);
    } else if (field === "ownedTickets") {
      calculator.ownedTickets = normalizeIntegerInput(value, calculator.ownedTickets, 0, 9999);
    } else if (field === "carriedTickets") {
      calculator.carriedTickets = normalizeIntegerInput(value, calculator.carriedTickets, 0, 9999);
    } else if (field === "missionCompletedDays") {
      calculator.missionCompletedDays = normalizeIntegerInput(value, calculator.missionCompletedDays, 0, ROULETTE_MAX_MISSION_DAYS);
      calculator.missionDays = Math.max(0, ROULETTE_MAX_MISSION_DAYS - calculator.missionCompletedDays);
      calculator.waitMissionDays = 0;
    } else if (field === "todayMissionTickets") {
      calculator.todayMissionTickets = normalizeIntegerInput(value, calculator.todayMissionTickets, 0, ROULETTE_MISSION_TICKETS_PER_DAY);
    } else if (field === "missedMissionTickets") {
      calculator.missedMissionTickets = normalizeIntegerInput(
        value,
        calculator.missedMissionTickets,
        0,
        ROULETTE_MAX_MISSION_DAYS * ROULETTE_MISSION_TICKETS_PER_DAY,
      );
    } else if (field === "missionDays") {
      calculator.missionDays = normalizeIntegerInput(value, calculator.missionDays, 0, ROULETTE_MAX_MISSION_DAYS);
      calculator.waitMissionDays = clamp(calculator.waitMissionDays, 0, calculator.missionDays);
    } else if (field === "waitMissionDays") {
      calculator.waitMissionDays = normalizeIntegerInput(value, calculator.waitMissionDays, 0, calculator.missionDays);
    } else if (field === "includeBlueGemSupply") {
      calculator.includeBlueGemSupply = Boolean(value);
    } else if (field === "considerNextCycle") {
      calculator.considerNextCycle = Boolean(value);
    }
  }

  function updateRouletteCalculatorResult() {
    const panel = ensureRouletteCalculatorPanel();
    const calculator = normalizeRouletteCalculatorState();
    const result = panel.querySelector("[data-roulette-result]");
    const summary = panel.querySelector("[data-roulette-summary]");
    const railSummary = elements.petList ? elements.petList.querySelector("[data-roulette-rail-summary]") : null;
    const recommended = rouletteRecommendedPlanInfo(calculator);
    const plan = recommended.plan;
    const baseTickets = rouletteBaseTickets(recommended.calculator);
    const resultHtml = rouletteCalculatorResultHtml(calculator);
    const purchasedLabel = roulettePurchasedSummaryLabel(calculator);
    const summaryText = plan
      ? `${recommended.waitLabel} ${formatWon(plan.cost)} · ${formatInteger(plan.leftoverTickets)}장 남음`
      : "계산 불가";

    if (result) {
      result.innerHTML = resultHtml;
    }
    if (summary) {
      summary.innerHTML = `
        <span><strong>${escapeHtml(rouletteKindMeta(calculator.kind).label)}</strong></span>
        <span>기본 확보 ${escapeHtml(formatInteger(baseTickets))}장</span>
        <span>${escapeHtml(purchasedLabel)}</span>
        <span>${escapeHtml(summaryText)}</span>
      `;
    }
    if (railSummary) {
      railSummary.textContent = summaryText;
    }
  }

  function roulettePurchasedOptionControlHtml(key, label, calculator) {
    const maxCount = rouletteOptionMaxCount(key);
    const purchasedCount = roulettePurchasedCount(calculator, key);
    if (maxCount <= 1) {
      return `
        <label class="roulette-calculator-check">
          <input type="checkbox" data-roulette-purchased-option="${escapeHtml(key)}" ${purchasedCount > 0 ? "checked" : ""}>
          <span>${escapeHtml(label)}</span>
        </label>
      `;
    }
    return `
      <label class="roulette-calculator-purchased-count">
        <span>${escapeHtml(label)}</span>
        <input type="number" min="0" max="${escapeHtml(maxCount)}" inputmode="numeric" data-roulette-purchased-option="${escapeHtml(key)}" value="${escapeHtml(purchasedCount)}">
      </label>
    `;
  }

  function roulettePurchasedOptionsHtml(calculator) {
    const purchasedOptions = [
      ...ROULETTE_OPENING_SPECIALS.map((option) => ({
        key: option.key,
        label: option.label,
      })),
      ...ROULETTE_HOTDEALS.map((option) => ({
        key: option.key,
        label: option.label,
      })),
      {
        key: ROULETTE_NEXT_HOTDEAL.key,
        label: ROULETTE_NEXT_HOTDEAL.label,
      },
      ...ROULETTE_GENERIC_PACKAGES.map((option) => ({
        key: option.key,
        label: roulettePackageLabel(option, calculator.kind),
      })),
    ];
    return purchasedOptions
      .map((option) => roulettePurchasedOptionControlHtml(option.key, option.label, calculator))
      .join("");
  }

  function renderRouletteCalculatorRail(calculator) {
    renderRailHeader(ROULETTE_CALCULATOR_CATEGORY);
    if (elements.petSubfilters) {
      elements.petSubfilters.hidden = true;
      elements.petSubfilters.innerHTML = "";
    }
    if (elements.railPastToggle) {
      elements.railPastToggle.hidden = true;
    }
    if (!elements.petList) return;
    elements.petList.innerHTML = `
      <div class="roulette-calculator-rail-card">
        <strong>${escapeHtml(rouletteKindMeta(calculator.kind).label)} 500회 기준</strong>
        <span data-roulette-rail-summary>계산 중</span>
      </div>
      <button class="roulette-calculator-preset" type="button" data-roulette-preset="fresh">
        0장 시작 기준
      </button>
      <button class="roulette-calculator-preset" type="button" data-roulette-preset="carry250">
        250장 예시 기준
      </button>
    `;
    elements.petList.querySelectorAll("[data-roulette-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        applyRoulettePreset(button.dataset.roulettePreset || "");
      });
    });
  }

  function applyRoulettePreset(preset) {
    const calculator = normalizeRouletteCalculatorState();
    if (preset === "carry250") {
      calculator.currentPulls = 0;
      calculator.ownedTickets = 250;
      calculator.carriedTickets = 0;
      calculator.missionCompletedDays = 0;
      calculator.todayMissionTickets = 0;
      calculator.missedMissionTickets = 0;
      calculator.missionDays = ROULETTE_MAX_MISSION_DAYS;
      calculator.waitMissionDays = 0;
      calculator.includeBlueGemSupply = true;
      calculator.considerNextCycle = true;
      calculator.purchasedOptions = defaultRoulettePurchasedOptions();
    } else if (preset === "fresh") {
      calculator.currentPulls = 0;
      calculator.ownedTickets = 0;
      calculator.carriedTickets = 0;
      calculator.missionCompletedDays = 0;
      calculator.todayMissionTickets = 0;
      calculator.missedMissionTickets = 0;
      calculator.missionDays = ROULETTE_MAX_MISSION_DAYS;
      calculator.waitMissionDays = 0;
      calculator.includeBlueGemSupply = true;
      calculator.considerNextCycle = false;
      calculator.purchasedOptions = defaultRoulettePurchasedOptions();
    }
    renderRouletteCalculator();
  }

  function renderRouletteCalculator() {
    const calculator = normalizeRouletteCalculatorState();
    const panel = ensureRouletteCalculatorPanel();
    const meta = rouletteKindMeta(calculator.kind);

    if (elements.heroPanel) {
      elements.heroPanel.hidden = true;
    }
    if (elements.stage) {
      elements.stage.classList.add("has-roulette-calculator");
    }
    panel.hidden = false;
    renderRouletteCalculatorRail(calculator);

    panel.innerHTML = `
      <button class="mobile-menu-toggle mobile-menu-toggle-detail roulette-calculator-back" type="button" data-roulette-action="show-rail" aria-label="목록 열기">
        <span class="mobile-menu-toggle-bars" aria-hidden="true"></span>
      </button>
      <div class="roulette-calculator-shell">
        <section class="roulette-calculator-block roulette-calculator-controls">
          <div class="roulette-calculator-title">
            <p class="eyebrow">Roulette Optimizer</p>
            <h2>룰렛 최저가 계산기</h2>
          </div>
          <div class="roulette-calculator-kind-row" role="group" aria-label="룰렛 종류">
            ${Object.values(ROULETTE_KIND_META).map((kindMeta) => `
              <button class="roulette-calculator-kind${calculator.kind === kindMeta.key ? " is-active" : ""}" type="button" data-roulette-kind="${escapeHtml(kindMeta.key)}">
                ${escapeHtml(kindMeta.label)}
              </button>
            `).join("")}
          </div>
          <div class="roulette-calculator-input-grid">
            <label>
              <span>현재 진행 횟수</span>
              <input type="number" min="0" max="500" inputmode="numeric" data-roulette-field="currentPulls" value="${escapeHtml(calculator.currentPulls)}">
            </label>
            <label>
              <span>현재 보유 티켓</span>
              <input type="number" min="0" inputmode="numeric" data-roulette-field="ownedTickets" value="${escapeHtml(calculator.ownedTickets)}">
            </label>
            <label>
              <span>미션 완료 일차</span>
              <input type="number" min="0" max="${ROULETTE_MAX_MISSION_DAYS}" inputmode="numeric" data-roulette-field="missionCompletedDays" value="${escapeHtml(calculator.missionCompletedDays)}">
            </label>
            <label>
              <span>놓친 미션 티켓</span>
              <input type="number" min="0" max="${ROULETTE_MAX_MISSION_DAYS * ROULETTE_MISSION_TICKETS_PER_DAY}" inputmode="numeric" data-roulette-field="missedMissionTickets" value="${escapeHtml(calculator.missedMissionTickets)}">
            </label>
          </div>
          <p class="roulette-calculator-auto-note">
            미션 완료 ${escapeHtml(formatInteger(calculator.missionCompletedDays))}일차는 이미 확보한 티켓으로 반영합니다. 남은 ${escapeHtml(formatInteger(calculator.missionDays))}일도 10장씩 비교하고, 놓친 미션 티켓 ${escapeHtml(formatInteger(calculator.missedMissionTickets))}장은 전체 미션 확보분에서 차감합니다.
          </p>
          <details class="roulette-calculator-advanced">
            <summary>상세 옵션</summary>
            <div class="roulette-calculator-check-grid">
              <label class="roulette-calculator-check">
                <input type="checkbox" data-roulette-field="includeBlueGemSupply" ${calculator.includeBlueGemSupply ? "checked" : ""}>
                <span>2500 블루젬 보급 10장 포함</span>
              </label>
              <label class="roulette-calculator-check">
                <input type="checkbox" data-roulette-field="considerNextCycle" ${calculator.considerNextCycle ? "checked" : ""}>
                <span>다음 같은 종류까지 계산</span>
              </label>
            </div>
            <div class="roulette-calculator-option-group">
              <p class="section-label">이미 구매한 상품</p>
              <div class="roulette-calculator-auto-note">
                체크하거나 수량을 넣은 상품은 이미 구매 완료로 처리합니다. 해당 티켓은 확보분에 포함하고, 가격은 추가 현금에 더하지 않으며, 같은 상품은 다시 추천하지 않습니다.
              </div>
              <div class="roulette-calculator-purchased-grid">
                ${roulettePurchasedOptionsHtml(calculator)}
              </div>
            </div>
          </details>
          <div class="roulette-calculator-preset-row">
            <button class="roulette-calculator-preset" type="button" data-roulette-preset="fresh">0장 시작</button>
            <button class="roulette-calculator-preset" type="button" data-roulette-preset="carry250">250장 예시</button>
          </div>
        </section>
        <section class="roulette-calculator-output">
          <div class="roulette-calculator-summary" data-roulette-summary>
            <span><strong>${escapeHtml(meta.label)}</strong></span>
          </div>
          <div data-roulette-result></div>
        </section>
      </div>
    `;

    panel.querySelectorAll("[data-roulette-kind]").forEach((button) => {
      button.addEventListener("click", () => {
        setRouletteCalculatorField("kind", button.dataset.rouletteKind || "weapon");
        renderRouletteCalculator();
      });
    });

    panel.querySelectorAll("[data-roulette-field]").forEach((field) => {
      const fieldName = field.dataset.rouletteField || "";
      const updateField = () => {
        if (field.type === "checkbox") {
          setRouletteCalculatorField(fieldName, field.checked);
        } else {
          setRouletteCalculatorField(fieldName, field.value);
        }
        updateRouletteCalculatorResult();
      };
      field.addEventListener("input", updateField);
      field.addEventListener("change", updateField);
    });

    panel.querySelectorAll("[data-roulette-purchased-option]").forEach((field) => {
      const updatePurchasedOption = () => {
        const key = field.dataset.roulettePurchasedOption || "";
        const calculatorState = normalizeRouletteCalculatorState();
        if (key) {
          const maxCount = rouletteOptionMaxCount(key);
          calculatorState.purchasedOptions[key] = field.type === "checkbox"
            ? (field.checked ? 1 : 0)
            : normalizeIntegerInput(field.value, calculatorState.purchasedOptions[key], 0, maxCount);
        }
        updateRouletteCalculatorResult();
      };
      field.addEventListener("input", updatePurchasedOption);
      field.addEventListener("change", updatePurchasedOption);
    });

    panel.querySelectorAll("[data-roulette-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        applyRoulettePreset(button.dataset.roulettePreset || "");
      });
    });

    const backButton = panel.querySelector("[data-roulette-action='show-rail']");
    if (backButton) {
      backButton.addEventListener("click", () => setMobileView("rail", { resetRailScroll: false }));
    }

    updateRouletteCalculatorResult();
  }

  function hideRouletteCalculator() {
    if (elements.calculatorPanel) {
      elements.calculatorPanel.hidden = true;
      elements.calculatorPanel.innerHTML = "";
    }
    if (elements.stage) {
      elements.stage.classList.remove("has-roulette-calculator");
    }
    if (elements.heroPanel) {
      elements.heroPanel.hidden = false;
    }
  }

  function assetUrl(path) {
    if (!path) return "";
    const resolvedPath = resolveOptimizedAssetPath(path);
    const separator = resolvedPath.includes("?") ? "&" : "?";
    return `${resolvedPath}${separator}v=${assetVersion}`;
  }

  function resolveOptimizedAssetPath(path) {
    const normalizedPath = String(path || "").replace(/\\/g, "/");
    if (!normalizedPath) return "";
    const match = normalizedPath.match(/^([^?#]+)([?#].*)?$/);
    const pathname = match ? match[1] : normalizedPath;
    const suffix = match && match[2] ? match[2] : "";
    if (/^(?:assets|spine_assets|spine_assets_pickup)\//i.test(pathname) && /\.png$/i.test(pathname)) {
      return `${pathname.replace(/\.png$/i, ".webp")}${suffix}`;
    }
    return normalizedPath;
  }

  function heroInfoSceneDefinition(elementKey) {
    const config = HERO_INFO_SCENE_CONFIG[elementKey];
    if (!config) return null;

    const basePath = `assets/backgrounds/hero_info_full/HeroInfo_Background_Type_${config.typeId}_4`;
    return {
      key: `${elementKey}-${config.typeId}`,
      background: `${basePath}.webp`,
      stageBack: `${basePath}_B.webp`,
      farLeft: config.farLeft ? `${basePath}_${config.farLeft}.webp` : "",
      farRight: config.farRight ? `${basePath}_${config.farRight}.webp` : "",
      backCloud: `${basePath}_${config.backCloud}.webp`,
      beamLeft: config.beamLeft ? `${basePath}_${config.beamLeft}.webp` : "",
      beamRight: config.beamRight ? `${basePath}_${config.beamRight}.webp` : "",
      midCloud: `${basePath}_${config.midCloud}.webp`,
      frontCloud: `${basePath}_${config.frontCloud}.webp`,
      particles: config.particles || "",
    };
  }

  function rideBannerBackgroundAsset(pet) {
    if (!pet || pet.kind !== "ride") return "";
    const config = HERO_INFO_SCENE_CONFIG[pet.elementKey || ""];
    if (!config) return "";
    return `assets/backgrounds/hero_info_full/HeroInfo_Background_Type_${config.typeId}_4.webp`;
  }

  function weaponBannerBackgroundAsset(pet) {
    if (!pet || pet.kind !== "weapon") return "";
    const entityId = getEntityId(pet);
    return WEAPON_BACKGROUND_ASSET_BY_ID[entityId] || "";
  }

  function ensureSceneEmbers() {
    if (!elements.sceneEmbers || elements.sceneEmbers.childElementCount) return;
    SCENE_EMBER_LAYOUT.forEach((item) => {
      const ember = document.createElement("span");
      ember.className = "scene-ember";
      ember.style.setProperty("--x", `${item.x}%`);
      ember.style.setProperty("--size", `${item.size}px`);
      ember.style.setProperty("--delay", `${item.delay}s`);
      ember.style.setProperty("--duration", `${item.duration}s`);
      ember.style.setProperty("--drift", `${item.drift}px`);
      ember.style.setProperty("--travel", `${item.travel}px`);
      ember.style.setProperty("--opacity", String(item.opacity));
      elements.sceneEmbers.appendChild(ember);
    });
  }

  function applySceneLayers(sceneDefinition, pet) {
    setImage(
      elements.sceneFarLeft,
      sceneDefinition ? sceneDefinition.farLeft : "",
      sceneDefinition ? `${pet.name} 배경 좌측` : ""
    );
    setImage(
      elements.sceneFarRight,
      sceneDefinition ? sceneDefinition.farRight : "",
      sceneDefinition ? `${pet.name} 배경 우측` : ""
    );
    setImage(
      elements.sceneCloudBack,
      sceneDefinition ? sceneDefinition.backCloud : "",
      sceneDefinition ? `${pet.name} 후면 구름` : ""
    );
    setImage(
      elements.sceneBeamLeft,
      sceneDefinition ? sceneDefinition.beamLeft : "",
      sceneDefinition ? `${pet.name} 좌측 광선` : ""
    );
    setImage(
      elements.sceneBeamRight,
      sceneDefinition ? sceneDefinition.beamRight : "",
      sceneDefinition ? `${pet.name} 우측 광선` : ""
    );
    setImage(
      elements.sceneStageZone,
      sceneDefinition ? sceneDefinition.midCloud : "",
      sceneDefinition ? `${pet.name} 중간 구름` : ""
    );
    setImage(
      elements.sceneStageFront,
      sceneDefinition ? sceneDefinition.frontCloud : "",
      sceneDefinition ? `${pet.name} 전면 안개` : ""
    );
  }

  function selectedSkillIconPath(path, explicitPath = "") {
    if (explicitPath) return explicitPath;
    if (!path) return "";
    return path;
  }

  function getSpineApi() {
    return window.PIXI && window.PIXI.spine ? window.PIXI.spine : null;
  }

  function loadRuntimeScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-runtime-src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Script load failed: ${src}`)), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.dataset.runtimeSrc = src;
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", () => {
        reject(new Error(`Script load failed: ${src}`));
      }, { once: true });
      (document.head || document.body || document.documentElement).appendChild(script);
    });
  }

  function getManifestEntry(entityId) {
    const entryId = String(entityId || "");
    return entryId ? (spineManifest[entryId] || null) : null;
  }

  function getGlobalManifestEntry(entityId) {
    const entryId = String(entityId || "");
    if (!entryId) return null;

    const manifestSources = [
      window.GACHA_PET_SPINE_MANIFEST,
      window.GACHA_PET_SPINE_MANIFEST_EMBEDDED,
      window.GACHA_PET_PICKUP_SPINE_MANIFEST_EMBEDDED,
      window.GACHA_PET_WEAPON_SPINE_MANIFEST,
      window.GACHA_PET_WEAPON_SPINE_MANIFEST_EMBEDDED,
    ];

    for (const source of manifestSources) {
      if (source && source[entryId]) {
        return source[entryId];
      }
    }

    return null;
  }

  function getLoadedManifestEntry(entityId) {
    const entryId = String(entityId || "");
    if (!entryId) return null;

    const baseEntry = getManifestEntry(entryId);
    if (hasEmbeddedManifestPayload(baseEntry)) {
      return baseEntry;
    }

    const globalEntry = getGlobalManifestEntry(entryId);
    if (globalEntry) {
      const mergedGlobalEntry = Object.assign({}, baseEntry || {}, globalEntry);
      spineManifest[entryId] = mergedGlobalEntry;
      return mergedGlobalEntry;
    }

    const cacheSources = [];
    if (baseEntry && baseEntry.assetKind === "pickup") {
      cacheSources.push(window.GACHA_PET_PICKUP_SPINE_ENTRY_CACHE);
    }
    cacheSources.push(window.GACHA_PET_SPINE_ENTRY_CACHE, window.GACHA_PET_PICKUP_SPINE_ENTRY_CACHE);

    for (const cache of cacheSources) {
      if (!cache) continue;
      const cachedEntry = cache[entryId];
      if (!cachedEntry) continue;

      const mergedEntry = Object.assign({}, baseEntry || {}, cachedEntry);
      spineManifest[entryId] = mergedEntry;
      return mergedEntry;
    }

    return baseEntry;
  }

  function hasEmbeddedManifestSkeletonPayload(manifestEntry) {
    if (!manifestEntry) return false;
    if (manifestEntry.skeletonBase64 || manifestEntry.skeletonBytes instanceof Uint8Array) {
      return true;
    }
    const skeletonPath = String(manifestEntry.skeletonFile || "");
    if (/\.json(?:$|\?)/i.test(skeletonPath)) {
      return Boolean(manifestEntry.skeletonJsonText || manifestEntry.skeletonJsonData);
    }
    return false;
  }

  function hasEmbeddedManifestPayload(manifestEntry) {
    if (!manifestEntry) return false;
    return Boolean(
      manifestEntry.atlasText
        && hasEmbeddedManifestSkeletonPayload(manifestEntry)
        && (manifestEntry.textureDataUri || manifestEntry.textureDataUris)
    );
  }

  function hasManifestSpinePayload(manifestEntry) {
    if (!manifestEntry) return false;
    const hasAtlas = Boolean(manifestEntry.atlasText || manifestEntry.atlasFile);
    const hasSkeleton = Boolean(
      manifestEntry.skeletonBase64
        || manifestEntry.skeletonFile
        || manifestEntry.skeletonBytes
    );
    return hasAtlas && hasSkeleton;
  }

  function fetchSpineTextAsset(assetPath) {
    const normalizedPath = String(assetPath || "").replace(/\\/g, "/");
    if (!normalizedPath) {
      return Promise.resolve("");
    }
    if (window.location && window.location.protocol === "file:") {
      return Promise.reject(new Error("Spine file protocol fetch unsupported"));
    }

    const promiseKey = `text:${normalizedPath}`;
    const pendingLoad = spineResourceTextPromises.get(promiseKey);
    if (pendingLoad) {
      return pendingLoad;
    }

    const loadPromise = window.fetch(assetUrl(normalizedPath), { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Spine text fetch failed: ${normalizedPath}`);
        }
        return response.text();
      })
      .finally(() => {
        spineResourceTextPromises.delete(promiseKey);
      });

    spineResourceTextPromises.set(promiseKey, loadPromise);
    return loadPromise;
  }

  function fetchSpineBinaryAsset(assetPath) {
    const normalizedPath = String(assetPath || "").replace(/\\/g, "/");
    if (!normalizedPath) {
      return Promise.resolve(null);
    }
    if (window.location && window.location.protocol === "file:") {
      return Promise.reject(new Error("Spine file protocol fetch unsupported"));
    }

    const promiseKey = `binary:${normalizedPath}`;
    const pendingLoad = spineResourceBinaryPromises.get(promiseKey);
    if (pendingLoad) {
      return pendingLoad;
    }

    const loadPromise = window.fetch(assetUrl(normalizedPath), { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Spine binary fetch failed: ${normalizedPath}`);
        }
        return response.arrayBuffer();
      })
      .then((buffer) => new Uint8Array(buffer))
      .finally(() => {
        spineResourceBinaryPromises.delete(promiseKey);
      });

    spineResourceBinaryPromises.set(promiseKey, loadPromise);
    return loadPromise;
  }

  function getManifestAtlasText(manifestEntry) {
    if (!manifestEntry) return Promise.resolve("");
    if (manifestEntry.atlasText) {
      return Promise.resolve(manifestEntry.atlasText);
    }
    if (!manifestEntry.atlasFile) {
      return Promise.resolve("");
    }
    if (manifestEntry.atlasTextPromise) {
      return manifestEntry.atlasTextPromise;
    }

    manifestEntry.atlasTextPromise = fetchSpineTextAsset(manifestEntry.atlasFile)
      .then((text) => {
        manifestEntry.atlasText = text || "";
        return manifestEntry.atlasText;
      })
      .finally(() => {
        manifestEntry.atlasTextPromise = null;
      });
    return manifestEntry.atlasTextPromise;
  }

  function getManifestSkeletonBytes(manifestEntry) {
    if (!manifestEntry) return Promise.resolve(null);
    if (manifestEntry.skeletonBytes instanceof Uint8Array) {
      return Promise.resolve(manifestEntry.skeletonBytes);
    }
    if (manifestEntry.skeletonBase64) {
      manifestEntry.skeletonBytes = decodeBase64ToBytes(manifestEntry.skeletonBase64);
      return Promise.resolve(manifestEntry.skeletonBytes);
    }
    if (!manifestEntry.skeletonFile) {
      return Promise.resolve(null);
    }
    if (manifestEntry.skeletonBytesPromise) {
      return manifestEntry.skeletonBytesPromise;
    }

    manifestEntry.skeletonBytesPromise = fetchSpineBinaryAsset(manifestEntry.skeletonFile)
      .then((bytes) => {
        manifestEntry.skeletonBytes = bytes;
        return bytes;
      })
      .finally(() => {
        manifestEntry.skeletonBytesPromise = null;
      });
    return manifestEntry.skeletonBytesPromise;
  }

  function getManifestSkeletonData(manifestEntry, attachmentLoader) {
    if (!manifestEntry || !attachmentLoader) {
      return Promise.resolve(null);
    }

    const spineApi = getSpineApi();
    if (!spineApi) {
      return Promise.resolve(null);
    }

    const skeletonPath = String(manifestEntry.skeletonFile || "");
    if (/\.json(?:$|\?)/i.test(skeletonPath)) {
      if (manifestEntry.skeletonJsonData) {
        return Promise.resolve(manifestEntry.skeletonJsonData);
      }
      if (manifestEntry.skeletonJsonText) {
        const json = new spineApi.SkeletonJson(attachmentLoader);
        manifestEntry.skeletonJsonData = json.readSkeletonData(JSON.parse(manifestEntry.skeletonJsonText || "{}"));
        return Promise.resolve(manifestEntry.skeletonJsonData);
      }
      if (manifestEntry.skeletonJsonDataPromise) {
        return manifestEntry.skeletonJsonDataPromise;
      }

      manifestEntry.skeletonJsonDataPromise = fetchSpineTextAsset(skeletonPath)
        .then((text) => {
          const json = new spineApi.SkeletonJson(attachmentLoader);
          manifestEntry.skeletonJsonData = json.readSkeletonData(JSON.parse(text || "{}"));
          return manifestEntry.skeletonJsonData;
        })
        .finally(() => {
          manifestEntry.skeletonJsonDataPromise = null;
        });
      return manifestEntry.skeletonJsonDataPromise;
    }

    const binary = new spineApi.SkeletonBinary(attachmentLoader);
    return getManifestSkeletonBytes(manifestEntry).then((skeletonBytes) => {
      if (!(skeletonBytes instanceof Uint8Array) || !skeletonBytes.length) {
        throw new Error(`Spine skeleton data unavailable: ${manifestEntry.assetName || "unknown skeleton"}`);
      }
      return binary.readSkeletonData(skeletonBytes);
    });
  }

  function ensureManifestEntryLoaded(entityId) {
    const entryId = String(entityId || "");
    if (!entryId) {
      return Promise.resolve(null);
    }

    const loadedEntry = getLoadedManifestEntry(entryId);
    if (hasManifestSpinePayload(loadedEntry)) {
      return Promise.resolve(loadedEntry);
    }

    const manifestMeta = getManifestEntry(entryId);
    if (!manifestMeta || !manifestMeta.chunkSrc) {
      return Promise.resolve(loadedEntry || manifestMeta || null);
    }

    const pendingLoad = spineManifestLoadPromises.get(entryId);
    if (pendingLoad) {
      return pendingLoad;
    }

    const loadPromise = loadRuntimeScript(assetUrl(manifestMeta.chunkSrc))
      .then(() => {
        const nextEntry = getLoadedManifestEntry(entryId);
        if (!hasManifestSpinePayload(nextEntry)) {
          throw new Error(`Spine manifest chunk missing data: ${entryId}`);
        }
        return nextEntry;
      })
      .then((nextEntry) => {
        if (!hasManifestSpinePayload(nextEntry)) {
          throw new Error(`Spine manifest data unavailable: ${entryId}`);
        }
        return nextEntry;
      })
      .finally(() => {
        spineManifestLoadPromises.delete(entryId);
      });

    spineManifestLoadPromises.set(entryId, loadPromise);
    return loadPromise;
  }

  function ensureSpineRuntimeLoaded() {
    if (window.PIXI && getSpineApi()) {
      return Promise.resolve(true);
    }
    if (spineRuntimePromise) {
      return spineRuntimePromise;
    }
    spineRuntimePromise = loadRuntimeScript("vendor/pixi.min.js")
      .then(() => loadRuntimeScript("vendor/pixi-spine-3.8.js"))
      .then(() => true)
      .catch((error) => {
        spineRuntimePromise = null;
        throw error;
      });
    return spineRuntimePromise;
  }

  function decodeBase64ToBytes(base64) {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  function chooseAnimationName(spineData, assetKind = "") {
    const animations = Array.isArray(spineData && spineData.animations)
      ? spineData.animations.map((item) => item && item.name).filter(Boolean)
      : [];

    if (!animations.length) return "";

    const priority = assetKind === "hero"
      ? [
          /^idle$/i,
          /idle[_ -]?big/i,
          /idle/i,
          /active[_ -]?a/i,
          /appear[_ -]?big/i,
          /appear/i,
          /wait/i,
          /stand/i,
          /move/i,
          /loop/i,
          /pickup/i,
          /^ani[_-]?1$/i,
          /^ani1$/i,
        ]
      : [
          /^idle$/i,
          /idle[_ -]?big/i,
          /idle/i,
          /active[_ -]?a/i,
          /appear[_ -]?big/i,
          /appear/i,
          /wait/i,
          /stand/i,
          /move/i,
          /loop/i,
          /pickup/i,
          /^ani[_-]?1$/i,
          /^ani1$/i,
        ];
    for (const pattern of priority) {
      const match = animations.find((name) => pattern.test(name));
      if (match) return match;
    }
    return animations[0];
  }

  function resolveAnimationName(spineData, assetKind, characterId) {
    const animations = Array.isArray(spineData && spineData.animations)
      ? spineData.animations.map((item) => item && item.name).filter(Boolean)
      : [];
    if (!animations.length) return "";

    const overrideAnimationName = HERO_ANIMATION_NAME_OVERRIDES[String(characterId)];
    if (overrideAnimationName && animations.includes(overrideAnimationName)) {
      return overrideAnimationName;
    }

    return chooseAnimationName(spineData, assetKind);
  }

  function normalizeAtlasPageName(pageName) {
    return String(pageName || "").replace(/\\/g, "/").replace(/^.*\//, "");
  }

  function resolveManifestTextureSource(manifestEntry, pageName, options = {}) {
    const normalizedPageName = normalizeAtlasPageName(pageName);
    const preferWebp = options.preferWebp !== false;
    const textureDataUris = manifestEntry && manifestEntry.textureDataUris;
    const textureFiles = manifestEntry && manifestEntry.textureFiles;
    const textureWebpFiles = manifestEntry && manifestEntry.textureWebpFiles;
    const fallbackTextureIndex = Array.isArray(textureFiles)
      ? textureFiles.findIndex((filePath) => normalizeAtlasPageName(filePath) === normalizedPageName)
      : -1;

    const deriveWebpTexturePath = () => {
      if (fallbackTextureIndex >= 0 && Array.isArray(textureFiles)) {
        const matchedTextureFile = textureFiles[fallbackTextureIndex];
        if (matchedTextureFile) {
          return resolveOptimizedAssetPath(matchedTextureFile);
        }
      }
      if (manifestEntry && manifestEntry.textureFile) {
        const basePath = manifestEntry.textureFile.replace(/\\/g, "/");
        const baseDir = basePath.replace(/[^/]+$/, "");
        const resolvedPagePath = !pageName || normalizeAtlasPageName(basePath) === normalizedPageName
          ? basePath
          : `${baseDir}${normalizedPageName}`;
        return resolveOptimizedAssetPath(resolvedPagePath);
      }
      return "";
    };

    const lookupValue = (valueSet) => {
      if (!valueSet) return "";
      if (typeof valueSet === "string") {
        return valueSet;
      }
      if (Array.isArray(valueSet)) {
        if (Array.isArray(textureFiles) && textureFiles.length === valueSet.length) {
          if (fallbackTextureIndex >= 0) {
            return valueSet[fallbackTextureIndex] || "";
          }
        }
        if (valueSet.length === 1) return valueSet[0] || "";
        const matched = valueSet.find((value) => String(value || "").includes(normalizedPageName));
        return matched || valueSet[0] || "";
      }
      if (typeof valueSet === "object") {
        const direct = valueSet[pageName] || valueSet[normalizedPageName];
        if (direct) return direct;
        const matchedKey = Object.keys(valueSet).find((key) => normalizeAtlasPageName(key) === normalizedPageName);
        return matchedKey ? valueSet[matchedKey] : "";
      }
      return "";
    };

    const webpPath = preferWebp
      ? textureWebpFiles
        ? lookupValue(textureWebpFiles)
        : manifestEntry.textureWebpFile || ""
      : "";
    if (webpPath || (preferWebp && deriveWebpTexturePath())) {
      return assetUrl(webpPath || deriveWebpTexturePath());
    }

    const filePath = lookupValue(textureFiles);
    if (filePath) {
      return assetUrl(filePath);
    }

    if (manifestEntry.textureFile) {
      const basePath = manifestEntry.textureFile.replace(/\\/g, "/");
      if (!pageName || normalizeAtlasPageName(basePath) === normalizedPageName) {
        return assetUrl(basePath);
      }
      const baseDir = basePath.replace(/[^/]+$/, "");
      return assetUrl(`${baseDir}${normalizedPageName}`);
    }

    const embedded = lookupValue(textureDataUris) || manifestEntry.textureDataUri || "";
    return embedded || "";
  }

  function shouldHideStaticBanner(manifestEntry) {
    return Boolean(manifestEntry && (manifestEntry.hideStaticBanner || manifestEntry.assetKind === "weapon"));
  }

  function chooseSkinName(spineData, assetKind, characterId) {
    const skins = Array.isArray(spineData && spineData.skins)
      ? spineData.skins.map((item) => item && item.name).filter(Boolean)
      : [];

    if (!skins.length) return "";
    if (assetKind === "ride") {
      const rideSkinOverride = RIDE_SKIN_NAME_OVERRIDES[String(characterId)];
      if (rideSkinOverride && skins.includes(rideSkinOverride)) {
        return rideSkinOverride;
      }

      const normalizedSkins = skins.map((name) => ({ name, lower: name.toLowerCase() }));
      const exactB = normalizedSkins.find((skin) => skin.lower === "b");
      if (exactB) {
        return exactB.name;
      }

      const gearedVariant = normalizedSkins.find((skin) => /armor|gear|equip|ribbon/.test(skin.lower));
      if (gearedVariant) {
        return gearedVariant.name;
      }

      const rideVariants = normalizedSkins.filter((skin) => skin.lower !== "default");
      if (rideVariants.length) {
        return rideVariants[rideVariants.length - 1].name;
      }
    }

    const nonDefault = skins.find((name) => name.toLowerCase() !== "default");
    return nonDefault || skins[0];
  }

  function getAvailableWeaponEquipmentSets(spineData) {
    if (!spineData || typeof spineData.findSkin !== "function") {
      return [];
    }
    return WEAPON_EQUIPMENT_SETS.filter((set) => set.skins.every((skinName) => spineData.findSkin(skinName)));
  }

  function getSelectedWeaponEquipmentSet(entityId, spineData) {
    const availableSets = getAvailableWeaponEquipmentSets(spineData);
    if (!availableSets.length) {
      return null;
    }

    const savedKey = state.selectedWeaponEquipmentSetKeyByEntityId[entityId];
    const savedSet = availableSets.find((set) => set.key === savedKey);
    if (savedSet) {
      return savedSet;
    }

    const preferredKey = DEFAULT_WEAPON_EQUIPMENT_SET_KEY_BY_ID[entityId];
    const preferredSet = availableSets.find((set) => set.key === preferredKey) || availableSets[0];
    state.selectedWeaponEquipmentSetKeyByEntityId[entityId] = preferredSet.key;
    return preferredSet;
  }

  function createWeaponCompositeSkin(spineApi, skeletonData, entityId) {
    if (!spineApi || !skeletonData || typeof skeletonData.findSkin !== "function") {
      return null;
    }

    const combinedSkin = new spineApi.Skin(`weapon-preview-${entityId}`);
    const addSkinByName = (skinName) => {
      const skin = skinName ? skeletonData.findSkin(skinName) : null;
      if (skin && typeof combinedSkin.addSkin === "function") {
        combinedSkin.addSkin(skin);
      }
    };

    addSkinByName("default");
    addSkinByName("Default");
    addSkinByName("A");

    const selectedSet = getSelectedWeaponEquipmentSet(entityId, skeletonData);
    if (selectedSet) {
      selectedSet.skins.forEach(addSkinByName);
    }

    addSkinByName(WEAPON_SKIN_NAME_BY_ID[entityId] || "");

    return combinedSkin;
  }

  function findAnimationDuration(spineData, animationName) {
    if (!spineData || !animationName) return 0;
    if (typeof spineData.findAnimation === "function") {
      const animation = spineData.findAnimation(animationName);
      if (animation && Number.isFinite(animation.duration)) {
        return animation.duration;
      }
    }
    const animation = Array.isArray(spineData.animations)
      ? spineData.animations.find((item) => item && item.name === animationName)
      : null;
    return animation && Number.isFinite(animation.duration) ? animation.duration : 0;
  }

  function getAnimationPhaseOffset(characterId, animationName) {
    const entry = HERO_ANIMATION_PHASE_OVERRIDES[String(characterId)];
    if (!entry) return 0;
    const ratio = entry[animationName];
    return Number.isFinite(ratio) ? ratio : 0;
  }

  function getHeroSceneLayoutOverride(characterId) {
    return HERO_SCENE_LAYOUT_OVERRIDES[String(characterId)] || null;
  }

  function getHeroBoneRotationCorrections(characterId) {
    return HERO_BONE_ROTATION_CORRECTIONS[String(characterId)] || [];
  }

  function applyHeroBoneRotationCorrections(preview, characterId) {
    const corrections = getHeroBoneRotationCorrections(characterId);
    if (!preview || !preview.skeleton || !Array.isArray(corrections) || !corrections.length) {
      return;
    }

    corrections.forEach((correction) => {
      if (!correction || !correction.boneName || !Number.isFinite(correction.rotationOffset)) {
        return;
      }
      const bone = Array.isArray(preview.skeleton.bones)
        ? preview.skeleton.bones.find((item) => item && item.data && item.data.name === correction.boneName)
        : null;
      if (bone) {
        if (Number.isFinite(bone.__viewerBoneRotationCorrectionApplied)) {
          bone.rotation -= bone.__viewerBoneRotationCorrectionApplied;
        }
        bone.rotation += correction.rotationOffset;
        bone.__viewerBoneRotationCorrectionApplied = correction.rotationOffset;
      }
    });
  }

  function clearHeroBoneRotationCorrections(preview, characterId) {
    const corrections = getHeroBoneRotationCorrections(characterId);
    if (!preview || !preview.skeleton || !Array.isArray(corrections) || !corrections.length) {
      return;
    }

    corrections.forEach((correction) => {
      if (!correction || !correction.boneName) {
        return;
      }
      const bone = Array.isArray(preview.skeleton.bones)
        ? preview.skeleton.bones.find((item) => item && item.data && item.data.name === correction.boneName)
        : null;
      if (bone && Number.isFinite(bone.__viewerBoneRotationCorrectionApplied)) {
        bone.rotation -= bone.__viewerBoneRotationCorrectionApplied;
        bone.__viewerBoneRotationCorrectionApplied = 0;
      }
    });
  }

  function clearSpineResizeObserver() {
    if (!spineState.resizeObserver) return;
    spineState.resizeObserver.disconnect();
    spineState.resizeObserver = null;
  }

  function layoutSceneAura() {
    if (!elements.sceneStageAura || !elements.sceneStageBack || !elements.spotlightMedia) return;
    if (elements.sceneStageBack.hidden || !elements.sceneStageBack.getAttribute("src")) {
      elements.sceneStageAura.style.removeProperty("left");
      elements.sceneStageAura.style.removeProperty("top");
      elements.sceneStageAura.style.removeProperty("width");
      elements.sceneStageAura.style.removeProperty("height");
      return;
    }

    const hostRect = elements.spotlightMedia.getBoundingClientRect();
    const stageRect = elements.sceneStageBack.getBoundingClientRect();
    if (!hostRect.width || !hostRect.height || !stageRect.width || !stageRect.height) return;

    const centerX = (stageRect.left - hostRect.left) + (stageRect.width * 0.5);
    const centerY = (stageRect.top - hostRect.top) + (stageRect.height * 0.405);
    const ringWidth = stageRect.width * 0.58;
    const ringHeight = ringWidth / 3.95;

    elements.sceneStageAura.style.left = `${centerX}px`;
    elements.sceneStageAura.style.top = `${centerY}px`;
    elements.sceneStageAura.style.width = `${ringWidth}px`;
    elements.sceneStageAura.style.height = `${ringHeight}px`;
  }

  function requestSceneLayout() {
    if (sceneLayoutRaf) {
      window.cancelAnimationFrame(sceneLayoutRaf);
    }
    sceneLayoutRaf = window.requestAnimationFrame(() => {
      sceneLayoutRaf = 0;
      layoutSceneAura();
    });
  }

  function measureViewportSize(element) {
    if (!element || typeof element.getBoundingClientRect !== "function") {
      return { width: 0, height: 0 };
    }
    const rect = element.getBoundingClientRect();
    return {
      width: Math.max(0, Math.floor(rect.width || element.clientWidth || element.offsetWidth || 0)),
      height: Math.max(0, Math.floor(rect.height || element.clientHeight || element.offsetHeight || 0)),
    };
  }

  function getSpinePreviewViewportSize() {
    const candidates = [
      elements.spinePreview,
      elements.spinePreview && elements.spinePreview.parentElement,
      elements.spotlightMedia,
    ].filter(Boolean);

    for (const candidate of candidates) {
      const size = measureViewportSize(candidate);
      if (size.width > 2 && size.height > 2) {
        return size;
      }
    }

    const fallbackSize = measureViewportSize(elements.spinePreview);
    return {
      width: Math.max(2, fallbackSize.width),
      height: Math.max(2, fallbackSize.height),
    };
  }

  function destroySpinePreview() {
    if (spineState.layoutRaf) {
      window.cancelAnimationFrame(spineState.layoutRaf);
      spineState.layoutRaf = 0;
    }
    if (sceneLayoutRaf) {
      window.cancelAnimationFrame(sceneLayoutRaf);
      sceneLayoutRaf = 0;
    }

    clearSpineResizeObserver();

    if (spineState.app) {
      try {
        spineState.app.destroy(true, { children: true, texture: false, baseTexture: false });
      } catch (error) {
        console.warn("Failed to destroy spine preview.", error);
      }
    }

    spineState.app = null;
    spineState.preview = null;
    spineState.assetKind = "";

    if (elements.spinePreview) {
      elements.spinePreview.replaceChildren();
      elements.spinePreview.hidden = true;
    }
    if (elements.spotlightMedia) {
      elements.spotlightMedia.classList.remove("has-live-spine");
      elements.spotlightMedia.classList.remove("has-pet-scene");
    }
  }

  function layoutSpinePreview() {
    if (!spineState.app || !spineState.preview || !elements.spinePreview || elements.spinePreview.hidden) {
      return;
    }

    const isHeroScene = spineState.assetKind === "hero" || spineState.assetKind === "pickup";
    const isWeaponVisual = spineState.assetKind === "weapon";
    const isRideVisual = spineState.assetKind === "ride";
    const liveLayoutOptions = isRideVisual
      ? DEFAULT_RIDE_SPINE_LAYOUT_OPTIONS[spineState.currentCharacterId] || {}
      : {};
    const sceneLayoutOverride = isHeroScene
      ? getHeroSceneLayoutOverride(spineState.currentCharacterId)
      : null;
    const viewportSize = getSpinePreviewViewportSize();
    const width = Math.max(2, viewportSize.width);
    const height = Math.max(2, viewportSize.height);
    spineState.app.renderer.resize(width, height);

    const bounds = spineState.preview.getLocalBounds();
    if (!bounds || !Number.isFinite(bounds.width) || !Number.isFinite(bounds.height) || bounds.width <= 0 || bounds.height <= 0) {
      return;
    }

    const paddingX = width * (isHeroScene ? 0.1 : (isWeaponVisual ? 0.05 : isRideVisual ? 0.05 : 0.06));
    const paddingTop = height * (isHeroScene ? 0.06 : (isWeaponVisual ? 0.035 : 0.06));
    const paddingBottom = height * (isHeroScene ? (width < 720 ? 0.18 : 0.2) : 0.04);
    const adjustedPaddingBottom = height * (isHeroScene
      ? (width < 720 ? 0.18 : 0.2)
      : (isRideVisual ? 0.02 : isWeaponVisual ? 0.045 : 0.04));
    const anchorX = width < 720
      ? (isHeroScene ? 0.54 : isWeaponVisual ? 0.66 : isRideVisual ? 0.6 : 0.58)
      : (isHeroScene ? 0.56 : isWeaponVisual ? 0.72 : isRideVisual ? 0.68 : 0.67);
    const nonHeroScaleMultiplier = isWeaponVisual
      ? (width < 720 ? 0.87 : 0.92)
      : isRideVisual
        ? (width < 720 ? 0.92 : 1.02)
        : (width < 720 ? 0.88 : 0.94);
    const widthScaleBase = (width - paddingX * 2) / bounds.width;
    const heightScaleBase = (height - paddingTop - adjustedPaddingBottom) / bounds.height;
    const scaleBase = isWeaponVisual
      ? Math.min(widthScaleBase * (width < 720 ? 1.13 : 1.22), heightScaleBase)
      : Math.min(widthScaleBase, heightScaleBase);
    const liveVisualScaleMultiplier = isWeaponVisual
      ? 1.12
      : isRideVisual
        ? 0.896
        : 1;
    const scale = scaleBase * (isHeroScene ? (width < 720 ? 0.9 : 0.96) : nonHeroScaleMultiplier)
      * (sceneLayoutOverride && Number.isFinite(sceneLayoutOverride.scaleMultiplier)
        ? sceneLayoutOverride.scaleMultiplier
        : 1)
      * liveVisualScaleMultiplier
      * (liveLayoutOptions && Number.isFinite(liveLayoutOptions.scaleMultiplier)
        ? liveLayoutOptions.scaleMultiplier
        : 1);
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;

    spineState.preview.scale.set(safeScale);
    if (isHeroScene && elements.sceneStageBack && !elements.sceneStageBack.hidden && elements.sceneStageBack.getAttribute("src")) {
      const hostRect = elements.spinePreview.getBoundingClientRect();
      const stageRect = elements.sceneStageBack.getBoundingClientRect();
      if (hostRect.width && hostRect.height && stageRect.width && stageRect.height) {
        const stageAnchorX = (stageRect.left - hostRect.left) + (stageRect.width * (width < 720 ? 0.505 : 0.5));
        const stageFloorY = (stageRect.top - hostRect.top) + (stageRect.height * (width < 720 ? 0.56 : 0.555));
        const stageAnchorOffset = stageRect.width * (sceneLayoutOverride && Number.isFinite(sceneLayoutOverride.stageAnchorOffsetRatio)
          ? sceneLayoutOverride.stageAnchorOffsetRatio
          : 0);
        const stageFloorOffset = stageRect.height * (sceneLayoutOverride && Number.isFinite(sceneLayoutOverride.stageFloorOffsetRatio)
          ? sceneLayoutOverride.stageFloorOffsetRatio
          : 0);
        spineState.preview.x = (stageAnchorX + stageAnchorOffset) - ((bounds.x + (bounds.width * 0.5)) * safeScale);
        spineState.preview.y = (stageFloorY + stageFloorOffset) - ((bounds.y + bounds.height) * safeScale);
        requestSceneLayout();
        return;
      }
    }

    const boundsFocusXRatio = isWeaponVisual
      ? (width < 720 ? 0.6 : 0.64)
      : 0.5;

    spineState.preview.x = (width * anchorX) - ((bounds.x + (bounds.width * boundsFocusXRatio)) * safeScale)
      + (liveLayoutOptions && Number.isFinite(liveLayoutOptions.offsetXRatio) ? width * liveLayoutOptions.offsetXRatio : 0)
      + (liveLayoutOptions && Number.isFinite(liveLayoutOptions.offsetX) ? liveLayoutOptions.offsetX : 0);
    spineState.preview.y = (height - adjustedPaddingBottom) - ((bounds.y + bounds.height) * safeScale)
      + (liveLayoutOptions && Number.isFinite(liveLayoutOptions.offsetYRatio) ? height * liveLayoutOptions.offsetYRatio : 0)
      + (liveLayoutOptions && Number.isFinite(liveLayoutOptions.offsetY) ? liveLayoutOptions.offsetY : 0);
    requestSceneLayout();
  }

  function requestSpineLayout() {
    if (!spineState.app) return;
    if (spineState.layoutRaf) {
      window.cancelAnimationFrame(spineState.layoutRaf);
    }
    spineState.layoutRaf = window.requestAnimationFrame(() => {
      spineState.layoutRaf = 0;
      layoutSpinePreview();
    });
  }

  function loadTextureAtlas(manifestEntry) {
    const spineApi = getSpineApi();
    const textureUrl = resolveManifestTextureSource(manifestEntry, normalizeAtlasPageName(manifestEntry.textureFile || "")) || "";

    return getManifestAtlasText(manifestEntry).then((atlasText) => new Promise((resolve, reject) => {
      let settled = false;
      const timeoutId = window.setTimeout(() => {
        finishReject(new Error(`Texture atlas load timed out: ${manifestEntry.assetName || textureUrl || "unknown texture"}`));
      }, 5000);

      const finishResolve = (atlas) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        resolve(atlas);
      };

      const finishReject = (error) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        reject(error);
      };

      new spineApi.TextureAtlas(
        atlasText,
        (pageName, callback) => {
          const resolvedTextureUrl = resolveManifestTextureSource(manifestEntry, pageName) || textureUrl;
          const fallbackTextureUrl = resolveManifestTextureSource(manifestEntry, pageName, { preferWebp: false }) || textureUrl;

          const loadBaseTexture = (sourceUrl, allowFallback) => {
            const baseTexture = window.PIXI.BaseTexture.from(sourceUrl);
            if (baseTexture.valid) {
              callback(baseTexture);
              return;
            }

            const cleanup = () => {
              baseTexture.off("loaded", onLoaded);
              baseTexture.off("error", onError);
            };

            const onLoaded = () => {
              cleanup();
              callback(baseTexture);
            };

            const onError = (error) => {
              cleanup();
              if (allowFallback && fallbackTextureUrl && fallbackTextureUrl !== sourceUrl) {
                loadBaseTexture(fallbackTextureUrl, false);
                return;
              }
              callback(null);
              finishReject(error instanceof Error ? error : new Error(`Texture load failed: ${sourceUrl}`));
            };

            baseTexture.once("loaded", onLoaded);
            baseTexture.once("error", onError);
          };

          loadBaseTexture(resolvedTextureUrl, true);
        },
        (atlas) => {
          if (!atlas) {
            finishReject(new Error(`Atlas parse failed: ${manifestEntry.assetName || textureUrl || "unknown atlas"}`));
            return;
          }
          finishResolve(atlas);
        },
      );
    }));
  }

  async function mountSpinePreview(characterId, manifestEntry, token) {
    const spineApi = getSpineApi();
    if (!spineApi || !window.PIXI || !elements.spinePreview || token !== spineState.loadToken) {
      return false;
    }

    const atlas = await loadTextureAtlas(manifestEntry);
    if (token !== spineState.loadToken || spineState.currentCharacterId !== characterId) {
      return false;
    }

    const previewViewportSize = getSpinePreviewViewportSize();
    const previewWidth = Math.max(480, previewViewportSize.width || 0);
    const previewHeight = Math.max(240, previewViewportSize.height || 0);
    const resolution = Math.min(window.devicePixelRatio || 1, 2);
    const app = new window.PIXI.Application({
      width: previewWidth,
      height: previewHeight,
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      resolution,
    });

    const attachmentLoader = new spineApi.AtlasAttachmentLoader(atlas);
    const skeletonData = await getManifestSkeletonData(manifestEntry, attachmentLoader);
    if (!skeletonData) {
      throw new Error(`Spine skeleton data unavailable: ${manifestEntry.assetName || characterId}`);
    }
    const preview = new spineApi.Spine(skeletonData);
    const useStableRideInitialLayout = manifestEntry.assetKind === "ride" && STABLE_RIDE_LAYOUT_IDS[characterId];
    const useManualHeroBoneCorrectionTick = manifestEntry.assetKind === "hero"
      && getHeroBoneRotationCorrections(characterId).length > 0;
    const animationName = resolveAnimationName(
      skeletonData,
      manifestEntry.assetKind || "",
      characterId,
    );
    const skinName = chooseSkinName(
      skeletonData,
      manifestEntry.assetKind || "",
      characterId,
    );
    const selectedWeaponSet = manifestEntry.assetKind === "weapon"
      ? getSelectedWeaponEquipmentSet(characterId, skeletonData)
      : null;

    preview.autoUpdate = !(useStableRideInitialLayout || useManualHeroBoneCorrectionTick);
    if (manifestEntry.assetKind === "weapon" && preview.skeleton && typeof preview.skeleton.setSkin === "function") {
      const compositeSkin = createWeaponCompositeSkin(spineApi, skeletonData, characterId);
      if (compositeSkin) {
        preview.skeleton.setSkin(compositeSkin);
      } else if (skinName && typeof preview.skeleton.setSkinByName === "function") {
        preview.skeleton.setSkinByName(skinName);
      }
    } else if (skinName && preview.skeleton && typeof preview.skeleton.setSkinByName === "function") {
      preview.skeleton.setSkinByName(skinName);
    }
    if (preview.skeleton && typeof preview.skeleton.setSlotsToSetupPose === "function") {
      preview.skeleton.setSlotsToSetupPose();
    }
    preview.skeleton.setToSetupPose();
    if (preview.state && typeof preview.state.setEmptyAnimations === "function") {
      preview.state.setEmptyAnimations(0);
    }
    if (animationName) {
      preview.state.setAnimation(0, animationName, true);
      const phaseRatio = getAnimationPhaseOffset(characterId, animationName);
      const animationDuration = findAnimationDuration(skeletonData, animationName);
      const trackEntry = preview.state && Array.isArray(preview.state.tracks)
        ? preview.state.tracks[0]
        : null;
      if (trackEntry && animationDuration > 0 && phaseRatio > 0) {
        trackEntry.trackTime = animationDuration * phaseRatio;
      } else if (trackEntry && useStableRideInitialLayout) {
        trackEntry.trackTime = 0;
      }
    }
    if (typeof preview.update === "function") {
      preview.update(0.016);
    }
    if (useManualHeroBoneCorrectionTick) {
      applyHeroBoneRotationCorrections(preview, characterId);
    }
    if (preview.skeleton && typeof preview.skeleton.updateWorldTransform === "function") {
      preview.skeleton.updateWorldTransform();
    }

    app.stage.addChild(preview);

    if (token !== spineState.loadToken || spineState.currentCharacterId !== characterId) {
      app.destroy(true, { children: true, texture: false, baseTexture: false });
      return false;
    }

    app.view.className = "spine-preview-canvas";
    elements.spinePreview.replaceChildren(app.view);
    elements.spinePreview.hidden = false;
    elements.bannerImage.hidden = shouldHideStaticBanner(manifestEntry) || !Boolean(elements.bannerImage.getAttribute("src"));
    if (elements.spotlightMedia) {
      elements.spotlightMedia.classList.add("has-live-spine");
      elements.spotlightMedia.classList.toggle("has-pet-scene", manifestEntry.assetKind === "hero" || manifestEntry.assetKind === "pickup");
    }

    spineState.app = app;
    spineState.preview = preview;
    spineState.mode = "live";
    spineState.assetKind = manifestEntry.assetKind || "";

    if (useManualHeroBoneCorrectionTick) {
      app.ticker.add(() => {
        if (!spineState.preview || spineState.currentCharacterId !== characterId) return;
        clearHeroBoneRotationCorrections(preview, characterId);
        if (typeof preview.update === "function") {
          preview.update(app.ticker.deltaMS / 1000);
        }
        applyHeroBoneRotationCorrections(preview, characterId);
        if (preview.skeleton && typeof preview.skeleton.updateWorldTransform === "function") {
          preview.skeleton.updateWorldTransform();
        }
      });
    }

    requestSpineLayout();
    if (!(manifestEntry.assetKind === "ride" && STABLE_RIDE_LAYOUT_IDS[characterId])) {
      window.setTimeout(requestSpineLayout, 60);
      window.setTimeout(requestSpineLayout, 220);
    }
    if (useStableRideInitialLayout) {
      window.requestAnimationFrame(() => {
        if (!spineState.preview || spineState.currentCharacterId !== characterId) return;
        spineState.preview.autoUpdate = true;
      });
    }

    if (window.ResizeObserver) {
      clearSpineResizeObserver();
      spineState.resizeObserver = new window.ResizeObserver(() => {
        requestSpineLayout();
      });
      spineState.resizeObserver.observe(elements.spinePreview);
      if (elements.spotlightMedia && elements.spotlightMedia !== elements.spinePreview) {
        spineState.resizeObserver.observe(elements.spotlightMedia);
      }
    }

    return true;
  }

  function richTextToHtml(text) {
    return escapeHtml(text)
      .replace(/&lt;color=#([0-9A-Fa-f]{6,8})&gt;/g, (_, hex) => `<span class="accent" style="color:#${hex.slice(0, 6)}">`)
      .replace(/&lt;#([0-9A-Fa-f]{6,8})&gt;/g, (_, hex) => `<span class="accent" style="color:#${hex.slice(0, 6)}">`)
      .replace(/&lt;\/color&gt;/g, "</span>")
      .replace(/\n/g, "<br>");
  }

  function normalizeSkillFactor(raw) {
    return Number(raw || 0) / 100;
  }

  function getSkillDescValuePlaceholderIndex(index) {
    return index < 5 ? 3 + index : 18 + (index - 5);
  }

  function formatSkillNumber(value) {
    if (!Number.isFinite(value)) return "";
    if (Math.abs(value - Math.round(value)) < 0.0001) {
      return String(Math.round(value));
    }
    return value.toFixed(3).replace(/0+$/g, "").replace(/\.$/g, "");
  }

  function hasBrokenGeneratedText(value) {
    return /\?/.test(String(value || ""));
  }

  function countSkillDescPlaceholders(value) {
    const matches = String(value || "").match(/\{\d+\}/g);
    return matches ? matches.length : 0;
  }

  function parseDescValues(descValues) {
    return String(descValues || "")
      .split("|")
      .map((value) => Number.parseFloat(value))
      .filter((value) => Number.isFinite(value));
  }

  function replaceSkillDescNumericPlaceholders(template, variant) {
    if (!template) return "";

    const values = new Map();
    parseDescValues(variant.descValues).forEach((value, index) => {
      values.set(getSkillDescValuePlaceholderIndex(index), value);
    });

    if (!values.has(0) && Number(variant.factorAttk || 0) !== 0) {
      values.set(0, normalizeSkillFactor(variant.factorAttk));
    }
    if (!values.has(8) && Number(variant.factorHp || 0) !== 0) {
      values.set(8, normalizeSkillFactor(variant.factorHp));
    }
    if (!values.has(16) && Number(variant.factorDef || 0) !== 0) {
      values.set(16, normalizeSkillFactor(variant.factorDef));
    }

    return template.replace(/\{(\d+)\}/g, (match, rawIndex) => {
      const index = Number.parseInt(rawIndex, 10);
      return values.has(index) ? formatSkillNumber(values.get(index)) : match;
    });
  }

  function replaceKnownSkillDescTextPlaceholders(text, variant) {
    let resolved = String(text || "");
    if (!resolved || !/\{\d+\}/.test(resolved)) {
      return resolved;
    }
    const entityContext = variant?.entityContext || null;

    const context = [
      resolved,
      String(variant?.formattedDesc || ""),
      String(variant?.upgradeDescFormatted || ""),
    ].join("\n");

    if (/\{2\}/.test(resolved) && entityContext) {
      const overrideKey = `${entityContext.characterId}:${entityContext.skillName}:2`;
      const overrideValue = SKILL_TEXT_PLACEHOLDER_OVERRIDES.get(overrideKey);
      if (overrideValue) {
        resolved = resolved.replace(/\{2\}/g, overrideValue);
      }
    }

    if (
      /\{2\}/.test(resolved)
      && (
        /피격 대상이[\s\S]*\{2\}[\s\S]*이 아닌 경우/.test(context)
        || /방어형이 아닌 대상/.test(context)
        || /방어형을 제외한 대상/.test(context)
      )
    ) {
      resolved = resolved.replace(/\{2\}/g, "방어형");
    }
    if (
      /\{2\}/.test(resolved)
      && /탑승 조련사에게[\s\S]*\{2\}[\s\S]*적에 대한/.test(context)
    ) {
      resolved = resolved.replace(/\{2\}/g, "지정된");
    }

    return resolved;
  }

  function preferredSkillDescription(primary, fallback) {
    const primaryText = String(primary || "").trim();
    const fallbackText = String(fallback || "").trim();
    if (!primaryText) return fallbackText;
    if (!fallbackText) return primaryText;

    const primaryPlaceholderCount = countSkillDescPlaceholders(primaryText);
    const fallbackPlaceholderCount = countSkillDescPlaceholders(fallbackText);
    if (fallbackPlaceholderCount < primaryPlaceholderCount) {
      return fallbackText;
    }

    const primaryBroken = hasBrokenGeneratedText(primaryText);
    const fallbackBroken = hasBrokenGeneratedText(fallbackText);
    if (primaryBroken !== fallbackBroken) {
      return fallbackBroken ? primaryText : fallbackText;
    }

    return primaryText;
  }

  function buildSkillDescription(variant) {
    const rawTemplate = String(variant?.rawDesc || "").trim();
    const formattedTemplate = String(variant?.formattedDesc || "").trim();
    const preferredTemplate = formattedTemplate && !hasBrokenGeneratedText(formattedTemplate)
      ? formattedTemplate
      : rawTemplate;
    if (!preferredTemplate) return "";

    const primaryDescription = replaceKnownSkillDescTextPlaceholders(
      replaceSkillDescNumericPlaceholders(preferredTemplate, variant),
      variant,
    );
    const fallbackDescription = preferredTemplate !== formattedTemplate && formattedTemplate
      ? replaceKnownSkillDescTextPlaceholders(
        replaceSkillDescNumericPlaceholders(formattedTemplate, variant),
        variant,
      )
      : "";

    return preferredSkillDescription(primaryDescription, fallbackDescription);
  }

  const SKILL_EFFECT_FOOTNOTE_DEFS = [
    { term: "최대 체력 비례형 피해 면역", note: "최대 체력 비례형 피해에 면역" },
    { term: "고정 피해 면역", note: "고정 피해에 면역" },
    { term: "지속 피해 면역", note: "출혈, 화상, 맹독, 동결 면역" },
    { term: "제어 효과 면역", note: "경직, 무력화, 기절, 수면, 속박, 침묵, 유혹, 띄우기, 제압, 밀어내기, 넘어트리기, 당기기, 넘기기 면역" },
    { term: "군중제어 면역", note: "경직, 무력화, 기절, 수면, 속박, 침묵, 유혹, 띄우기 면역" },
    { term: "이동제어 면역", note: "밀어내기, 넘어트리기, 당기기, 넘기기 면역" },
    { term: "제압효과 면역", note: "물기, 잡기 면역" },
    { term: "회복 불가 면역", note: "회복 불가 면역" },
    { term: "고급 동결 면역", note: "고급 동결 면역" },
    { term: "고급 출혈 면역", note: "고급 출혈 면역" },
    { term: "고급 화상 면역", note: "고급 화상 면역" },
    { term: "고급 맹독 면역", note: "고급 맹독 면역" },
    { term: "동결 면역", note: "동결 면역" },
    { term: "출혈 면역", note: "출혈 면역" },
    { term: "화상 면역", note: "화상 면역" },
    { term: "맹독 면역", note: "맹독 면역" },
    { term: "경직 면역", note: "경직 면역" },
    { term: "무력화 면역", note: "무력화 면역" },
    { term: "기절 면역", note: "기절 면역" },
    { term: "수면 면역", note: "수면 면역" },
    { term: "속박 면역", note: "속박 면역" },
    { term: "침묵 면역", note: "침묵 면역" },
    { term: "유혹 면역", note: "유혹 면역" },
    { term: "축축함 면역", note: "축축함 면역" },
    { term: "도발 면역", note: "도발 면역" },
    { term: "당기기 면역", note: "당기기 면역" },
    { term: "밀어내기 면역", note: "밀어내기 면역" },
    { term: "넘어트리기 면역", note: "넘어트리기 면역" },
    { term: "띄우기 면역", note: "띄우기 면역" },
    { term: "제압 면역", note: "물기, 잡기 면역" },
    { term: "물기 면역", note: "물기 면역" },
    { term: "잡기 면역", note: "잡기 면역" },
    { term: "넘기기 면역", note: "넘기기 면역" },
    { term: "현재 스킬 쿨타임 초기화", note: "현재 스킬 쿨타임을 초기화" },
    { term: "최대 쿨타임 감소", note: "기본 스킬 쿨타임 감소" },
    { term: "기본 스킬 쿨타임 감소", note: "기본 스킬의 최대 쿨타임 감소" },
    { term: "현재 스킬 쿨타임 감소", note: "현재 적용 중인 스킬 쿨타임 감소" },
    { term: "최대 체력 비례형 피해", note: "대상의 최대 체력 비례 피해" },
    { term: "피해 차단(방어형)", note: "방어형이 주는 피해 차단" },
    { term: "피해 차단(근거리형)", note: "근거리형이 주는 피해 차단" },
    { term: "피해 차단(원거리형)", note: "원거리형이 주는 피해 차단" },
    { term: "피해 차단(지원형)", note: "지원형이 주는 피해 차단" },
    { term: "땅 정령 보호막", note: "받는 피해를 정해진 횟수만큼 무효화하고, 공격한 대상에게 50% 확률로 2초 기절을 부여합니다." },
    { term: "축축함 Lv.1", note: "회피, 이동 속도, 공격 속도를 감소. 그리고 기분이 나쁩니다." },
    { term: "축축함 Lv.2", note: "회피, 이동 속도, 공격 속도를 감소. 그리고 기분이 나쁩니다." },
    { term: "오한", note: "이동 속도, 공격 속도 감소" },
    { term: "왕발자국", note: "공격 속도, 이동 속도, 명중 감소" },
    { term: "암살 표식", note: "구루마루의 표창 투척 피해 증가 조건" },
    { term: "찢어진 상처", note: "테라탄의 치명적인 발톱 피해 증가 조건" },
    { term: "치명적인 상처", note: "테라탄의 숨통 끊기 피해 증가 조건" },
    { term: "저주받은 상처", note: "테라탄의 날 선 발톱 피해 증가 조건" },
    { term: "거대화", note: "대상 거대화 및 최종 공격력, 방어력, 체력 증가" },
    { term: "폭주", note: "대상 거대화 및 최종 공격력, 공격 속도 증가" },
    { term: "순발력", note: "회피, 공격 속도, 이동 속도 증가" },
    { term: "공격력 증가", note: "공격력을 증가" },
    { term: "방어력 증가", note: "방어력을 증가" },
    { term: "명중 증가", note: "명중을 증가" },
    { term: "회피 증가", note: "회피를 증가" },
    { term: "공격 속도 증가", note: "공격 속도를 증가" },
    { term: "이동 속도 증가", note: "이동 속도를 증가" },
    { term: "슈퍼 치명타 확률 증가", note: "슈퍼 치명타 확률을 증가" },
    { term: "슈퍼 치명타 피해 증가", note: "슈퍼 치명타 피해를 증가" },
    { term: "치명타 확률 증가", note: "치명타 확률을 증가" },
    { term: "치명타 피해 증가", note: "치명타 피해를 증가" },
    { term: "치명타 저항 증가", note: "치명타 저항을 증가" },
    { term: "자연 체력회복 증가", note: "자연 체력회복을 증가" },
    { term: "체력 최대값 증가", note: "체력 최대값을 증가" },
    { term: "피해량 증가", note: "스킬로 주는 피해량을 증가" },
    { term: "받는 지속 피해 증가", note: "받는 지속 피해를 증가" },
    { term: "받는 피해 감소", note: "받는 피해를 감소" },
    { term: "받는 범위 피해 감소", note: "받는 범위 피해를 감소" },
    { term: "공격력 감소", note: "공격력을 감소" },
    { term: "방어력 감소", note: "방어력을 감소" },
    { term: "명중 감소", note: "명중을 감소" },
    { term: "할퀴기", note: "받는 지속 피해, 받는 치명타 피해 증가" },
    { term: "격노", note: "받는 범위 피해 8% 감소, 최종 피해량 10% 증가. 최대 10회 중첩" },
    { term: "단단한 껍질", note: "치명타 저항 증가, 받는 추가 및 지속 피해 감소" },
    { term: "도려내기", note: "해제 불가 상처를 남겨 1초마다 공격력 비례 피해" },
    { term: "그을림", note: "성급/스킬에 따라 1초마다 공격력의 10~30% 피해" },
    { term: "혹한의 칼날", note: "공격 속도, 이동 속도 30% 감소, 0.75초 후부터 1초마다 공격력의 4% 피해" },
    { term: "부패한 대지", note: "1초마다 공격력의 20% 피해" },
    { term: "뜨거운 기운", note: "1초마다 최대 체력의 3% 피해" },
    { term: "화상(태양의 검)", note: "1초마다 공격력의 50% 피해" },
    { term: "불새의 저주", note: "1초마다 공격력의 50% 피해, (무기) 공격력, 명중 감소" },
    { term: "맹독(근원의 손톱)", note: "1초마다 공격력의 70% 피해" },
    { term: "모래 폭풍", note: "최종 명중 50% 감소, 0.75초 후부터 1초마다 공격력의 300% 피해" },
    { term: "심해의 수압", note: "현재 스킬 쿨타임 2초 증가, 0.75초 후부터 1초마다 공격력의 400% 피해" },
    { term: "천상의 심판", note: "회복 불가, 이로운 효과 3개 무작위 제거, 0.75초 후부터 1초마다 공격력의 200% 피해" },
    { term: "천상의 가호", note: "시전자 체력의 50%만큼 피해 흡수" },
    { term: "추가 피해", note: "추가 피해를 줍니다." },
    { term: "체력 소모", note: "내 최대 체력의 일부를 소모" },
    { term: "체력 회복", note: "체력을 회복" },
    { term: "즉시 회복", note: "스킬 적용 시 즉시 체력 회복" },
    { term: "회복 불가", note: "회복 불가" },
    { term: "침묵", note: "스킬 불가" },
    { term: "수면", note: "공격 불가, 이동 불가, 스킬 불가. 피해를 받으면 수면이 해제됩니다." },
    { term: "속박", note: "이동 불가" },
    { term: "유혹", note: "적을 유혹하여 일정 시간 동안 아군으로 만드는 효과" },
    { term: "축축함", note: "회피, 이동 속도, 공격 속도를 감소. 그리고 기분이 나쁩니다." },
    { term: "경직", note: "짧은 시간 동안 공격 불가, 이동 불가, 스킬 불가" },
    { term: "무력화", note: "공격 불가, 이동 불가, 스킬 불가" },
    { term: "기절", note: "공격 불가, 이동 불가, 스킬 불가" },
    { term: "띄우기", note: "적을 공중으로 띄워올리는 효과" },
    { term: "도발", note: "지속시간 동안 도발을 사용한 대상을 우선 공격" },
    { term: "의지", note: "현재 체력이 0이 되면, 지속시간 동안 전투불능 상태 면역" },
    { term: "은신", note: "버프 지속시간 동안 공격의 대상이 되지 않음. 주변에 아군이 없으면 은신 해제" },
    { term: "흡혈", note: "입힌 피해량의 일부만큼 체력 회복" },
    { term: "반사", note: "피해를 입을 때마다 공격한 대상에게 받은 피해 일부를 되돌려 줌" },
    { term: "보호막", note: "받는 피해를 정해진 횟수만큼 무효화" },
    { term: "방어막", note: "시전자 체력 또는 공격력 비례로 피해를 흡수" },
    { term: "네메시스 가호", note: "제어 저항 증가" },
    { term: "수호", note: "시전자가 해당 효과를 받은 대상의 피해를 대신 받음" },
    { term: "부활", note: "사망 상태가 되면 일정 시간 후 최대 체력 비율로 부활" },
    { term: "고급 동결", note: "일정 간격마다 최대 체력 비례 지속 피해" },
    { term: "고급 출혈", note: "일정 간격마다 최대 체력 비례 지속 피해" },
    { term: "고급 화상", note: "일정 간격마다 최대 체력 비례 지속 피해" },
    { term: "고급 맹독", note: "일정 간격마다 최대 체력 비례 지속 피해" },
    { term: "동결", note: "일정 간격마다 공격력 비례 지속 피해" },
    { term: "출혈", note: "일정 간격마다 공격력 비례 지속 피해" },
    { term: "화상", note: "일정 간격마다 공격력 비례 지속 피해" },
    { term: "맹독", note: "일정 간격마다 공격력 비례 지속 피해" },
  ];

  function isRedundantSkillFootnote(entry) {
    const normalize = (value) => String(value || "").replace(/\s+/g, "").trim();
    return normalize(entry.term) === normalize(entry.note);
  }

  function resolveSkillFootnoteNote(entry, source, index) {
    const sourceFromTerm = String(source || "").slice(index);
    const matchedPercent = sourceFromTerm.match(/^[^(]*\((\d+)%\)/)
      || sourceFromTerm.match(/^[^\d%]*(\d+)%/);
    const percentValue = matchedPercent ? matchedPercent[1] : "";
    const statChangeNotes = {
      "공격력 증가": ["공격력", "증가"],
      "방어력 증가": ["방어력", "증가"],
      "명중 증가": ["명중", "증가"],
      "회피 증가": ["회피", "증가"],
      "공격 속도 증가": ["공격 속도", "증가"],
      "이동 속도 증가": ["이동 속도", "증가"],
      "슈퍼 치명타 확률 증가": ["슈퍼 치명타 확률", "증가"],
      "슈퍼 치명타 피해 증가": ["슈퍼 치명타 피해", "증가"],
      "치명타 확률 증가": ["치명타 확률", "증가"],
      "치명타 피해 증가": ["치명타 피해", "증가"],
      "치명타 저항 증가": ["치명타 저항", "증가"],
      "자연 체력회복 증가": ["자연 체력회복", "증가"],
      "체력 최대값 증가": ["체력 최대값", "증가"],
      "피해량 증가": ["스킬로 주는 피해량", "증가"],
      "받는 지속 피해 증가": ["받는 지속 피해", "증가"],
      "받는 피해 감소": ["받는 피해", "감소"],
      "받는 범위 피해 감소": ["받는 범위 피해", "감소"],
      "공격력 감소": ["공격력", "감소"],
      "방어력 감소": ["방어력", "감소"],
      "명중 감소": ["명중", "감소"],
    };
    const statChangeNote = statChangeNotes[entry.term];
    if (statChangeNote) {
      return percentValue
        ? `${statChangeNote[0]} ${percentValue}% ${statChangeNote[1]}`
        : `${statChangeNote[0]} ${statChangeNote[1]}`;
    }
    if (entry.term === "오한") {
      if (matchedPercent) {
        return `이동 속도, 공격 속도 ${matchedPercent[1]}% 감소`;
      }
      return "이동 속도, 공격 속도 감소";
    }
    if (entry.term === "왕발자국") {
      if (matchedPercent) {
        return `공격 속도, 이동 속도, 명중 ${matchedPercent[1]}% 감소`;
      }
      return "공격 속도, 이동 속도, 명중 감소";
    }
    if (entry.term === "거대화") {
      if (matchedPercent) {
        return `대상 거대화 및 최종 공격력, 방어력, 체력 ${matchedPercent[1]}% 증가`;
      }
      return "대상 거대화 및 최종 공격력, 방어력, 체력 증가";
    }
    if (entry.term === "폭주") {
      if (matchedPercent) {
        return `대상 거대화 및 최종 공격력, 공격 속도 ${matchedPercent[1]}% 증가`;
      }
      return "대상 거대화 및 최종 공격력, 공격 속도 증가";
    }
    if (entry.term === "순발력") {
      if (matchedPercent) {
        return `회피, 공격 속도, 이동 속도 ${matchedPercent[1]}% 증가`;
      }
      return "회피, 공격 속도, 이동 속도 증가";
    }
    if (entry.term === "할퀴기") {
      if (matchedPercent) {
        return `받는 지속 피해, 받는 치명타 피해 ${matchedPercent[1]}% 증가`;
      }
      return "받는 지속 피해, 받는 치명타 피해 증가";
    }
    if (entry.term === "단단한 껍질") {
      if (matchedPercent) {
        return `치명타 저항 ${matchedPercent[1]}% 증가, 받는 추가 및 지속 피해 ${matchedPercent[1]}% 감소`;
      }
      return "치명타 저항 증가, 받는 추가 및 지속 피해 감소";
    }
    if (entry.term === "도려내기") {
      if (matchedPercent) {
        return `해제 불가 상처를 남겨 1초마다 공격력의 ${matchedPercent[1]}% 피해`;
      }
      return "해제 불가 상처를 남겨 1초마다 공격력 비례 피해";
    }
    if (entry.term === "혹한의 칼날") {
      if (matchedPercent) {
        return `공격 속도, 이동 속도 ${matchedPercent[1]}% 감소, 0.75초 후부터 1초마다 공격력의 4% 피해`;
      }
      return entry.note;
    }
    if (entry.term === "불새의 저주") {
      if (matchedPercent) {
        return `1초마다 공격력의 50% 피해, (무기) 공격력, 명중 ${matchedPercent[1]}% 감소`;
      }
      return "1초마다 공격력의 50% 피해, (무기) 공격력, 명중 감소";
    }
    if (entry.term === "체력 소모") {
      if (matchedPercent) {
        return `내 최대 체력의 ${matchedPercent[1]}%를 소모`;
      }
      return "내 최대 체력의 일부를 소모";
    }
    if (entry.term === "네메시스 가호") {
      if (matchedPercent) {
        return `제어 저항 ${matchedPercent[1]}% 증가. 제어 효과를 저항할 때마다 저항 수치가 20%씩 감소`;
      }
      return "제어 저항 증가. 제어 효과를 저항할 때마다 저항 수치가 감소";
    }
    return entry.note;
  }

  function extractSkillEffectFootnotes(desc) {
    const source = String(desc || "");
    if (!source) return [];

    const matches = [];
    SKILL_EFFECT_FOOTNOTE_DEFS.forEach((entry) => {
      if (isRedundantSkillFootnote(entry)) return;
      if (entry.term === "체력 회복") {
        const healPattern = /체력\s*(\d+)%\s*회복/g;
        let healMatch = null;
        while ((healMatch = healPattern.exec(source)) !== null) {
          matches.push({
            ...entry,
            note: `체력 ${healMatch[1]}% 회복`,
            index: healMatch.index,
            end: healMatch.index + healMatch[0].length,
          });
        }
        return;
      }
      let fromIndex = 0;
      while (fromIndex < source.length) {
        const index = source.indexOf(entry.term, fromIndex);
        if (index < 0) break;
        matches.push({
          ...entry,
          note: resolveSkillFootnoteNote(entry, source, index),
          index,
          end: index + entry.term.length,
        });
        fromIndex = index + entry.term.length;
      }
    });

    matches.sort((left, right) => {
        if (left.index !== right.index) return left.index - right.index;
        return right.term.length - left.term.length;
      });

    const deduped = [];
    const seenTerms = new Set();
    const coveredRanges = [];
    matches.forEach((entry) => {
      if (seenTerms.has(entry.term)) return;
      const overlaps = coveredRanges.some(
        (range) => entry.index < range.end && entry.end > range.start
      );
      if (overlaps) return;
      seenTerms.add(entry.term);
      coveredRanges.push({ start: entry.index, end: entry.end });
      deduped.push(entry);
    });
    return deduped;
  }

  function skillDescriptionHtml(variant) {
    const desc = String(buildSkillDescription(variant) || "").trim();
    if (!desc) return "";

    const footnotes = extractSkillEffectFootnotes(desc);
    const descHtml = richTextToHtml(desc);
    if (!footnotes.length) {
      return descHtml;
    }

    const footnoteHtml = footnotes
      .map((entry) => `
        <li class="skill-footnote">
          <strong class="skill-footnote-term">${escapeHtml(entry.term)}</strong>
          <span class="skill-footnote-note">${escapeHtml(entry.note)}</span>
        </li>
      `)
      .join("");

    return `
      ${descHtml}
      <div class="skill-footnotes" aria-label="효과 참고">
        <p class="skill-footnotes-label">효과 참고</p>
        <ul class="skill-footnotes-list">${footnoteHtml}</ul>
      </div>
    `;
  }

  function normalizedSkillKind(skill) {
    const raw = String(skill?.slotLabel || "").trim();
    const firstSkillType = String(skill?.variants?.[0]?.skillType || "");
    if (/오오라\s*스킬|오라\s*스킬/i.test(raw)) {
      return "aura";
    }
    if (skill?.slotType === "Basic" || skill?.tone === "basic" || Number(skill?.slotIndex) === 0) {
      return "basic";
    }
    if (skill?.tone === "passive" || firstSkillType === "4" || firstSkillType === "5" || Number(skill?.slotIndex) >= 3) {
      return "passive";
    }
    return "active";
  }

  function resolvedSkillSlotLabel(skill) {
    switch (normalizedSkillKind(skill)) {
      case "basic":
        return "일반 공격";
      case "passive":
        return "패시브 스킬";
      case "aura":
        return "오오라 스킬";
      default:
        return "액티브 스킬";
    }
  }

  function resolvedStageLabel(variant) {
    const normalizedMeta = normalizedVariantStageMeta(variant);
    const raw = String(normalizedMeta.stageLabel || "").trim();
    if (raw && !hasBrokenGeneratedText(raw)) {
      return raw;
    }
    const tier = Number(normalizedMeta.frameTier || normalizedMeta.groupTier || 0);
    const grade = Number(normalizedMeta.groupGrade || 0);
    const prefix = tier >= 5 ? "SSS" : "SS";
    return `${prefix} ${Number.isFinite(grade) ? grade : 0}성`;
  }

  function resolvedUpgradeDescription(variant) {
    const raw = String(variant?.upgradeDescFormatted || "").trim();
    if (!raw) {
      return "";
    }
    if (!hasBrokenGeneratedText(raw)) {
      return raw;
    }
    const desc = String(buildSkillDescription(variant) || variant?.formattedDesc || "").trim();
    if (!desc) {
      return raw;
    }
    return `${resolvedStageLabel(variant)} : ${desc}`;
  }

  function getUpgradeOnlyText(variant) {
    const rawUpgrade = resolvedUpgradeDescription(variant);
    if (!rawUpgrade) return "기본 단계";
    const splitIndex = rawUpgrade.indexOf(":");
    return splitIndex >= 0 ? rawUpgrade.slice(splitIndex + 1).trim() : rawUpgrade;
  }

  function normalizeUpgradePreviewText(text) {
    return String(text || "").replace(/\s+\/\s+/g, "\n");
  }

  function spotlightStageOptionHtml(pet, variant) {
    const raw = String(getUpgradeOnlyText(variant) || "").trim();
    if (!raw || raw === "기본 단계") return "";
    const normalized = normalizeUpgradePreviewText(raw);
    return richTextToHtml(normalized);
  }

  function upgradePreviewHtml(variant) {
    const raw = String(getUpgradeOnlyText(variant) || "").trim();
    if (!raw) return "";
    return richTextToHtml(normalizeUpgradePreviewText(raw));
  }

  function getSkillKey(pet, skill) {
    return `${getEntityId(pet)}:${skill.slotType}:${skill.slotIndex}`;
  }

  function formatDateRange(start, end) {
    return `${String(start || "").replace(/-/g, ".")} - ${String(end || "").replace(/-/g, ".")}`;
  }

  function formatDisplayDateKey(dateKey) {
    return String(dateKey || "").replace(/-/g, ".");
  }

  function scheduleDisplayStartTimeLabel() {
    return `${padNumber(KR1_RESET_HOUR)}:00`;
  }

  function scheduleDisplayEndTimeLabel() {
    const endHour = (KR1_RESET_HOUR + 23) % 24;
    return `${padNumber(endHour)}:59`;
  }

  function formatScheduleDisplayRange(start, end, startDateTimeKey = "", endExclusiveDateTimeKey = "") {
    const explicitStartDateTimeKey = normalizeDateTimeKey(start);
    const explicitEndDateTimeKey = normalizeDateTimeKey(end);
    if (explicitStartDateTimeKey || explicitEndDateTimeKey) {
      const exactStartKey = normalizeDateTimeKey(startDateTimeKey) || explicitStartDateTimeKey;
      const exactEndInclusiveKey = normalizeDateTimeKey(endExclusiveDateTimeKey)
        ? addSecondsToDateTimeKey(endExclusiveDateTimeKey, -1)
        : explicitEndDateTimeKey;
      if (exactStartKey && exactEndInclusiveKey) {
        return `${formatDisplayDateTimeKey(exactStartKey)} - ${formatDisplayDateTimeKey(exactEndInclusiveKey)}`;
      }
      if (exactStartKey) {
        return `${formatDisplayDateTimeKey(exactStartKey)} - 상시`;
      }
    }

    const resolvedStartDateKey = dateTimeKeyToDateKey(startDateTimeKey);
    const resolvedEndExclusiveDateKey = dateTimeKeyToDateKey(endExclusiveDateTimeKey);
    const startKey = resolvedStartDateKey || normalizeScheduleDateKey(start);
    const rawEndKey = normalizeScheduleDateKey(end);
    const endKey = resolvedEndExclusiveDateKey || addDaysToDateKey(normalizeScheduleDateKey(end), 1);
    const farFutureKey = resolvedEndExclusiveDateKey || rawEndKey;
    const farFutureYear = Number.parseInt(String(farFutureKey || "").slice(0, 4), 10);
    if (startKey && Number.isFinite(farFutureYear) && farFutureYear >= 2999) {
      return `${formatDisplayDateKey(startKey)} ${scheduleDisplayStartTimeLabel()} - 상시`;
    }
    if (!startKey || !endKey) {
      return formatDateRange(start, end);
    }
    return `${formatDisplayDateKey(startKey)} ${scheduleDisplayStartTimeLabel()} - ${formatDisplayDateKey(endKey)} ${scheduleDisplayEndTimeLabel()}`;
  }

  function cooldownLabel(value) {
    const number = Number.parseFloat(value || "0");
    if (!Number.isFinite(number) || number === 0) return "쿨타임 0초";
    return `쿨타임 ${number % 1 === 0 ? number.toFixed(0) : number.toFixed(1)}초`;
  }

  function baseRangeValue(pet) {
    if (pet.attackTypeKey === "ranged" || pet.attackTypeKey === "support") return 50;
    return 20;
  }

  function stripSkillTags(value) {
    return String(value || "").replace(/<[^>]*>/g, "");
  }

  function inferSkillRangeValue(pet, skill, variant) {
    const rangeType = Number.parseInt(String(variant.skillRangeType ?? ""), 10);
    const explicitRange = Number.parseInt(String(variant.skillRangeRadius ?? ""), 10);
    if (rangeType === 1) {
      const explicitWidth = Number.parseInt(String(variant.skillRangeWidth ?? ""), 10);
      if (Number.isFinite(explicitWidth) && explicitWidth > 0) return Math.round(explicitWidth / 2);

      const plainDesc = stripSkillTags(variant.formattedDesc || variant.rawDesc || "");
      const widthMeterMatch = plainDesc.match(/폭\s*(\d+(?:\.\d+)?)m/);
      if (widthMeterMatch) {
        return Math.round(Number.parseFloat(widthMeterMatch[1]) * 10);
      }
    }
    if (Number.isFinite(explicitRange)) return explicitRange;

    const skillName = String(skill.name || "");
    if (skillName.includes("전문가")) return 0;

    const formattedDesc = String(variant.formattedDesc || variant.rawDesc || "");
    const metricMatches = [...formattedDesc.matchAll(/(\d+(?:\.\d+)?)m/g)]
      .map((match) => Number.parseFloat(match[1]))
      .filter((value) => Number.isFinite(value));

    if (metricMatches.length) {
      return Math.round(Math.max(...metricMatches) * 10);
    }

    const skillType = Number.parseInt(String(variant.skillType || "0"), 10) || 0;
    if (skill.slotType === "Basic") return baseRangeValue(pet);
    if (skillType === 6) return 0;
    if (skillType === 4) return baseRangeValue(pet);

    const hasFactor = [variant.factorAttk, variant.factorDef, variant.factorHp].some((raw) => Number(raw || 0) !== 0);
    return hasFactor ? baseRangeValue(pet) : 0;
  }

  function skillRangeLabel(pet, skill, variant) {
    return `사거리 ${inferSkillRangeValue(pet, skill, variant)}`;
  }

  function setImage(img, value, alt) {
    if (!img) return;
    if (value) {
      img.src = assetUrl(value);
      img.alt = alt;
      img.hidden = false;
      if (img === elements.sceneStageBack) {
        window.setTimeout(requestSceneLayout, 0);
      }
      return;
    }
    img.removeAttribute("src");
    img.alt = "";
    img.hidden = true;
  }

  function getPetStatus(pet) {
    const currentDateTimeKey = getTimeZoneDateTimeKey();
    const schedules = getResolvedSchedules(pet, currentDateTimeKey);
    const current = schedules.find((item) => item.resolvedStatus === "current");
    if (current) {
      const statusMeta = resolveScheduleToneMeta(current, currentDateTimeKey);
      return {
        tone: statusMeta.tone,
        label: statusMeta.listLabel,
        summary: formatScheduleDisplayRange(
          current.start,
          current.end,
          current.resolvedStartDateTimeKey,
          current.resolvedEndExclusiveDateTimeKey,
        ),
      };
    }

    const upcoming = schedules.find((item) => item.resolvedStatus === "upcoming");
    if (upcoming) {
      const statusMeta = resolveScheduleToneMeta(upcoming, currentDateTimeKey);
      return {
        tone: statusMeta.tone,
        label: statusMeta.listLabel,
        summary: formatScheduleDisplayRange(
          upcoming.start,
          upcoming.end,
          upcoming.resolvedStartDateTimeKey,
          upcoming.resolvedEndExclusiveDateTimeKey,
        ),
      };
    }

    const last = schedules[schedules.length - 1];
    if (last) {
      return {
        tone: "past",
        label: "종료",
        summary: formatScheduleDisplayRange(
          last.start,
          last.end,
          last.resolvedStartDateTimeKey,
          last.resolvedEndExclusiveDateTimeKey,
        ),
      };
    }

    if (pet.statusLabel || pet.statusSummary) {
      return {
        tone: pet.statusTone || "past",
        label: pet.statusLabel || "정보",
        summary: pet.statusSummary || pet.statusLabel || "정보 없음",
      };
    }

    return { tone: "past", label: "일정 없음", summary: "등록된 일정 없음" };
  }

  function scheduleBlockTitleForPet(pet) {
    return pet?.scheduleTitleOverride || "오픈 일정";
  }

  function findPreferredIndex(items) {
    if (!items.length) return 0;
    const currentDateTimeKey = getTimeZoneDateTimeKey();
    const indexedItems = items.map((item, index) => ({ item, index }));
    const skillItems = indexedItems.filter(({ item }) => hasDisplayableSkills(item));
    const preferredItems = skillItems.length ? skillItems : indexedItems;
    const currentEntry = preferredItems.find(({ item }) => getResolvedSchedules(item, currentDateTimeKey).some((schedule) => schedule.resolvedStatus === "current"));
    if (currentEntry) return currentEntry.index;
    const upcomingEntry = preferredItems.find(({ item }) => getResolvedSchedules(item, currentDateTimeKey).some((schedule) => schedule.resolvedStatus === "upcoming"));
    if (upcomingEntry) return upcomingEntry.index;
    return preferredItems[0]?.index || 0;
  }

  function hasDisplayableSkills(item) {
    return Array.isArray(item?.skills)
      && item.skills.some((skill) => Array.isArray(skill?.variants) && skill.variants.length > 0);
  }

  function findInitialSelection() {
    const requestedView = String(pageParams.get("view") || pageParams.get("category") || "").trim();
    if (
      ROULETTE_CALCULATOR_ENABLED
      && (requestedView === ROULETTE_CALCULATOR_CATEGORY_KEY || requestedView.toLowerCase() === "calculator")
    ) {
      return { categoryKey: ROULETTE_CALCULATOR_CATEGORY_KEY, index: 0 };
    }

    const requestedId = pageParams.get("pet") || pageParams.get("item") || pageParams.get("id");
    const categories = getCategories();

    if (requestedId) {
      for (const category of categories) {
        const items = getItems(category);
        const index = items.findIndex((item) => {
          const entityId = getEntityId(item);
          return entityId === requestedId || String(item.characterId || "") === requestedId || String(item.name || "") === requestedId;
        });
        if (index >= 0) {
          return { categoryKey: category.key, index };
        }
      }
    }

    const defaultCategoryKey = data.defaultCategoryKey || categories[0]?.key || "pet";
    const defaultCategory = categories.find((category) => category.key === defaultCategoryKey) || categories[0];
    return {
      categoryKey: defaultCategory.key,
      index: findPreferredIndex(getItems(defaultCategory)),
    };
  }

  function ensurePetState(pet) {
    if (!Array.isArray(pet?.skills) || pet.skills.length === 0) {
      return;
    }
    const entityId = getEntityId(pet);
    if (!state.selectedSkillKeyByPet[entityId]) {
      const defaultSkill = pet.skills.find((skill) => skill.slotType === "Active" && skill.slotIndex === 1) || pet.skills[0];
      state.selectedSkillKeyByPet[entityId] = defaultSkill ? getSkillKey(pet, defaultSkill) : "";
    }

    pet.skills.forEach((skill) => {
      const key = getSkillKey(pet, skill);
      if (typeof state.selectedVariantBySkillKey[key] !== "number") {
        state.selectedVariantBySkillKey[key] = clamp(skill.initialVariantIndex || 0, 0, skill.variants.length - 1);
      }
    });
  }

  function getSelectedSkill(pet) {
    if (!Array.isArray(pet?.skills) || pet.skills.length === 0) {
      return null;
    }
    ensurePetState(pet);
    const entityId = getEntityId(pet);
    const selectedKey = state.selectedSkillKeyByPet[entityId];
    return pet.skills.find((skill) => getSkillKey(pet, skill) === selectedKey) || pet.skills[0];
  }

  function getSelectedVariant(pet, skill) {
    if (!skill || !Array.isArray(skill.variants) || skill.variants.length === 0) {
      return { index: 0, data: null };
    }
    const key = getSkillKey(pet, skill);
    const index = clamp(state.selectedVariantBySkillKey[key] || 0, 0, skill.variants.length - 1);
    return { index, data: skill.variants[index] };
  }


  function formatOwnedEffectPercent(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return "-";
    }
    const rounded = Math.round((numeric + Number.EPSILON) * 1000) / 1000;
    const text = Number.isInteger(rounded)
      ? rounded.toFixed(0)
      : rounded.toFixed(3).replace(/0+$/g, "").replace(/\.$/g, "");
    return `${text}%`;
  }

  function formatOwnedEffectValue(value, meta) {
    const multiplier = Number(meta && meta.percentMultiplier);
    return formatOwnedEffectPercent(value * (Number.isFinite(multiplier) ? multiplier : 100));
  }

  function selectedWeaponOwnedEffectVariant(pet) {
    const selectedSkill = getSelectedSkill(pet);
    return selectedSkill ? getSelectedVariant(pet, selectedSkill).data : null;
  }

  function weaponOwnedEffectStats(pet) {
    const variant = selectedWeaponOwnedEffectVariant(pet);
    const meta = normalizedVariantStageMeta(variant);
    const tier = Number((meta && (meta.frameTier || meta.groupTier)) || 0);
    const grade = Number((meta && meta.groupGrade) || 0);
    const rows = WEAPON_OWNED_EFFECT_ROWS_BY_ID[getEntityId(pet)] || [];
    const weights = (WEAPON_OWNED_EFFECT_WEIGHTS_BY_TIER[String(tier)] || {})[String(grade)] || null;
    if (!weights) {
      return [];
    }
    return rows.map((entry) => {
      const meta = WEAPON_OWNED_EFFECT_STATE_META[String(entry.linkedId)] || {};
      const weight = Number(weights[String(entry.linkedId)]);
      const value = Number(entry.value || 0);
      if (!Number.isFinite(weight) || !Number.isFinite(value)) {
        return null;
      }
      return {
        badge: meta.badge || String(entry.linkedId || ""),
        label: meta.label || String(entry.linkedId || ""),
        value: formatOwnedEffectValue(value * weight, meta),
      };
    }).filter(Boolean);
  }

  function selectedRideOwnedEffectVariant(pet) {
    const selectedSkill = getSelectedSkill(pet);
    return selectedSkill ? getSelectedVariant(pet, selectedSkill).data : null;
  }

  function rideOwnedEffectStats(pet) {
    const variant = selectedRideOwnedEffectVariant(pet);
    const meta = normalizedVariantStageMeta(variant);
    const tier = Number((meta && (meta.frameTier || meta.groupTier)) || 0);
    const grade = Number((meta && meta.groupGrade) || 0);
    const rows = RIDE_OWNED_EFFECT_ROWS_BY_ID[getEntityId(pet)] || [];
    const weights = (RIDE_OWNED_EFFECT_WEIGHTS_BY_TIER[String(tier)] || {})[String(grade)] || null;
    if (!weights) {
      return [];
    }
    return rows.map((entry) => {
      const meta = RIDE_OWNED_EFFECT_STATE_META[String(entry.linkedId)] || {};
      const weight = Number(weights[String(entry.linkedId)]);
      const value = Number(entry.value || 0);
      if (!Number.isFinite(weight) || !Number.isFinite(value)) {
        return null;
      }
      return {
        badge: meta.badge || String(entry.linkedId || ""),
        label: meta.label || String(entry.linkedId || ""),
        value: formatOwnedEffectValue(value * weight, meta),
      };
    }).filter(Boolean);
  }

  function ownedEffectConfig(pet) {
    if (pet.kind === "ride") {
      return {
        title: "\uBCF4\uC720 \uD6A8\uACFC",
        note: "\uD604\uC7AC \uC120\uD0DD \uC131\uAE09 \uAE30\uC900",
        sourceKey: "ride",
      };
    }
    if (pet.kind === "weapon") {
      return {
        title: "\uBCF4\uC720 \uD6A8\uACFC",
        note: "\uD604\uC7AC \uC120\uD0DD \uC131\uAE09 \uAE30\uC900",
        sourceKey: "weapon",
      };
    }
    return null;
  }

  function ownedEffectStats(pet) {
    const config = ownedEffectConfig(pet);
    if (!config) {
      return [];
    }
    if (config.sourceKey === "weapon") {
      return weaponOwnedEffectStats(pet);
    }
    return rideOwnedEffectStats(pet);
  }

  function stageLevelLabel(variant) {
    const level = Number(variant.skillLevel || 0);
    return level > 0 ? `Lv.${level}` : "Lv.-";
  }

  function elementLabel(key) {
    switch (key) {
      case "fire":
        return "불";
      case "water":
        return "물";
      case "wind":
        return "바람";
      case "leaf":
        return "땅";
      default:
        return "";
    }
  }

  function attackSpeedLabel(pet) {
    if (pet.attackSpeedLabel) {
      return pet.attackSpeedLabel;
    }
    if (pet.attackSpeedType && ATTACK_SPEED_LABEL_BY_TYPE[pet.attackSpeedType]) {
      return ATTACK_SPEED_LABEL_BY_TYPE[pet.attackSpeedType];
    }
    return "";
  }

  function elementIconAsset(pet) {
    return pet.elementIcon || ELEMENT_ICON_BY_KEY[pet.elementKey] || "";
  }

  function attackTypeLabel(pet) {
    return pet.attackTypeLabel || ATTACK_TYPE_LABEL_BY_KEY[pet.attackTypeKey] || "";
  }

  function attackTypeIconAsset(pet) {
    return pet.attackTypeIcon || ATTACK_TYPE_ICON_BY_KEY[pet.attackTypeKey] || "";
  }

  function attackSpeedIconAsset(pet) {
    return ATTACK_SPEED_ICON_BY_LABEL[displayAttackSpeedLabel(pet)] || "";
  }

  function displayElementLabel(value) {
    const key = typeof value === "string"
      ? value
      : String(value?.elementKey || "");
    const fallbackLabel = typeof value === "object" && value
      ? String(value.elementLabel || "").trim()
      : "";
    switch (key) {
      case "fire":
        return "\uBD88";
      case "water":
        return "\uBB3C";
      case "wind":
        return "\uBC14\uB78C";
      case "earth":
      case "leaf":
        return "\uB545";
      default:
        return fallbackLabel;
    }
  }

  function displayAttackSpeedLabel(pet) {
    if (pet.attackSpeedLabel) {
      return pet.attackSpeedLabel;
    }
    if (pet.attackSpeedType && ATTACK_SPEED_LABEL_BY_TYPE[pet.attackSpeedType]) {
      return ATTACK_SPEED_LABEL_BY_TYPE[pet.attackSpeedType];
    }
    return "";
  }

  function stageDisplayLabel(variant) {
    return `${resolvedStageLabel(variant)} / ${stageLevelLabel(variant)}`;
  }

  function stageBackgroundAsset(pet) {
    if (pet.kind === "weapon" || pet.kind === "ride") {
      return "assets/ui/stage_card_bg_weapon_ride.png";
    }
    return "";
  }

  function stageFrameAsset(pet, variant) {
    const meta = normalizedVariantStageMeta(variant);
    if (Number(meta.frameTier || meta.groupTier || 0) >= 5) {
      return "assets/ui/stage_frame_sss.png";
    }
    return "assets/ui/stage_frame_ss.png";
  }

  function spotlightGradeBadgeAsset(variant) {
    const meta = normalizedVariantStageMeta(variant);
    return Number(meta.frameTier || meta.groupTier || 0) >= 5
      ? "assets/ui/JGrade_5.png"
      : "assets/ui/JGrade_4.png";
  }

  function rideIconAsset(pet) {
    const useBannerIcon = pet.characterId === "200000009" || pet.characterId === "200000012";
    if (useBannerIcon) {
      return pet.bannerImage || pet.backdropImage || pet.portraitImage || pet.heroIconImage || pet.gachaIconImage || "";
    }
    return pet.backdropImage || pet.bannerImage || pet.portraitImage || pet.heroIconImage || pet.gachaIconImage || "";
  }

  function railIconAsset(pet) {
    if (pet.kind === "ride") {
      return rideIconAsset(pet);
    }
    if (pet.kind === "weapon") {
      return pet.heroIconImage || pet.gachaIconImage || pet.bannerImage || pet.portraitImage || "";
    }
    return pet.gachaIconImage || pet.heroIconImage || pet.portraitImage || "";
  }

  function listThumbAsset(pet) {
    if (pet.kind === "ride") {
      return rideIconAsset(pet);
    }
    if (pet.kind === "weapon") {
      return pet.bannerImage || pet.heroIconImage || pet.gachaIconImage || pet.portraitImage || "";
    }
    return pet.gachaIconImage || pet.heroIconImage || pet.portraitImage || "";
  }

  function renderSpotlightGradeBadge(variant) {
    return `
      <span class="spotlight-grade-badge">
        <img class="spotlight-grade-badge-image" src="${escapeHtml(assetUrl(spotlightGradeBadgeAsset(variant)))}" alt="">
        <span class="spotlight-grade-stars">
          ${stageStarsMarkup(variant)}
        </span>
      </span>
    `;
  }

  function rideDisplayImage(pet) {
    return pet.bannerImage || pet.portraitImage || pet.backdropImage || pet.heroIconImage || "";
  }

  function petStageThumbAsset(pet) {
    if (pet.stageImage) return pet.stageImage;
    const id = pet.viewerId || pet.characterId || "";
    return id ? `assets/pets/stage/${id}-stage.png` : "";
  }

  function stagePortraitAsset(pet) {
    if (pet.hideStaticArtwork) {
      return { src: "", kind: "none" };
    }
    if (pet.kind === "ride") {
      const iconImage = rideIconAsset(pet);
      if (iconImage) return { src: iconImage, kind: "ride" };
      if (pet.portraitImage) return { src: pet.portraitImage, kind: "ride" };
      if (pet.heroIconImage) return { src: pet.heroIconImage, kind: "heroicon" };
      if (pet.gachaIconImage) return { src: pet.gachaIconImage, kind: "gachaicon" };
    }
    if (pet.kind === "weapon") {
      if (pet.bannerImage) return { src: pet.bannerImage, kind: "weapon" };
      if (pet.heroIconImage) return { src: pet.heroIconImage, kind: "weapon" };
      if (pet.portraitImage) return { src: pet.portraitImage, kind: "weapon" };
      if (pet.backdropImage) return { src: pet.backdropImage, kind: "weapon" };
    }
    if (pet.kind === "pet") {
      const stageThumb = petStageThumbAsset(pet);
      if (stageThumb) return { src: stageThumb, kind: "petstage" };
      if (pet.portraitImage) return { src: pet.portraitImage, kind: "portrait" };
    }
    if (pet.kind === "pet" && pet.gachaIconImage) return { src: pet.gachaIconImage, kind: "gachaicon" };
    if (pet.heroIconImage) return { src: pet.heroIconImage, kind: "heroicon" };
    if (pet.gachaIconImage) return { src: pet.gachaIconImage, kind: "gachaicon" };
    if (pet.portraitImage) return { src: pet.portraitImage, kind: "portrait" };
    return { src: "", kind: "none" };
  }

  function cardPortraitAsset(pet) {
    if (pet.kind === "ride") {
      return rideDisplayImage(pet);
    }
    if (pet.hideStaticArtwork) {
      return "";
    }
    return pet.portraitImage || pet.bannerImage || pet.heroIconImage || "";
  }

  function stageStarsMarkup(variant) {
    const meta = normalizedVariantStageMeta(variant);
    const grade = Number(meta.groupGrade || 0);
    const stars = [];

    if (grade <= 0) {
      for (let index = 0; index < 5; index += 1) {
        stars.push("assets/ui/stage_star_empty.png");
      }
    } else if (grade <= 5) {
      for (let index = 0; index < grade; index += 1) {
        stars.push("assets/ui/stage_star_gold.png");
      }
      for (let index = grade; index < 5; index += 1) {
        stars.push("assets/ui/stage_star_empty.png");
      }
    } else {
      const redCount = Math.min(grade - 5, 5);
      const goldCount = Math.max(0, 5 - redCount);
      for (let index = 0; index < redCount; index += 1) {
        stars.push("assets/ui/stage_star_red.png");
      }
      for (let index = 0; index < goldCount; index += 1) {
        stars.push("assets/ui/stage_star_gold.png");
      }
    }

    return stars
      .map((src, index) => `<img class="tier-tile-star" src="${escapeHtml(assetUrl(src))}" alt="" data-star-index="${index + 1}">`)
      .join("");
  }

  function renderTierTile(pet, variant) {
    const portrait = stagePortraitAsset(pet);
    const bgAsset = stageBackgroundAsset(pet);
    const showMetaIcons = pet.kind === "pet";
    const elementIcon = elementIconAsset(pet);
    const attackTypeIcon = attackTypeIconAsset(pet);
    const attackTypeBg = attackTypeIcon ? ATTACK_TYPE_BG_ASSET : "";
    const bgMarkup = bgAsset
      ? `<img class="tier-tile-bg" src="${escapeHtml(assetUrl(bgAsset))}" alt="">`
      : "";
    const portraitMarkup = portrait.src
      ? `<img class="tier-tile-portrait is-${portrait.kind}" src="${escapeHtml(assetUrl(portrait.src))}" alt="${escapeHtml(pet.name)}">`
      : "";
    const elementMarkup = showMetaIcons && elementIcon
      ? `<span class="tier-tile-element"><img src="${escapeHtml(assetUrl(elementIcon))}" alt=""></span>`
      : "";
    const attackMarkup = showMetaIcons && attackTypeIcon
      ? `
        <span class="tier-tile-attack">
          ${attackTypeBg ? `<img class="tier-tile-attack-bg" src="${escapeHtml(assetUrl(attackTypeBg))}" alt="">` : ""}
          <img class="tier-tile-attack-icon" src="${escapeHtml(assetUrl(attackTypeIcon))}" alt="">
        </span>
      `
      : "";
    const metaStackMarkup = elementMarkup || attackMarkup
      ? `
        <span class="tier-tile-meta-stack">
          ${elementMarkup}
          ${attackMarkup}
        </span>
      `
      : "";

    return `
      <span class="tier-tile" data-kind="${escapeHtml(pet.kind || "pet")}">
        <span class="tier-tile-visual">
          ${bgMarkup}
          <img class="tier-tile-frame" src="${escapeHtml(assetUrl(stageFrameAsset(pet, variant)))}" alt="">
          ${portraitMarkup}
          ${metaStackMarkup}
          <span class="tier-tile-stars">${stageStarsMarkup(variant)}</span>
        </span>
      </span>
    `;
  }

  function spotlightInfoItemMarkup({ icon = "", bg = "", label = "", textGlyph = "", largeIcon = false, iconVariant = "" }) {
    const iconMarkup = icon || bg
      ? `
        <span class="spotlight-info-icon${bg ? " has-bg" : ""}${largeIcon ? " is-large" : ""}${iconVariant ? ` is-${iconVariant}` : ""}">
          ${bg ? `<img class="spotlight-info-icon-bg" src="${escapeHtml(assetUrl(bg))}" alt="">` : ""}
          ${icon ? `<img class="spotlight-info-icon-fg" src="${escapeHtml(assetUrl(icon))}" alt="">` : ""}
        </span>
      `
      : `
        <span class="spotlight-info-icon text-only">
          <span class="spotlight-info-glyph">${escapeHtml(textGlyph)}</span>
        </span>
      `;

    return `
      <span class="spotlight-info-item">
        ${iconMarkup}
        <span class="spotlight-info-label">${escapeHtml(label)}</span>
      </span>
    `;
  }

  function renderSpotlightSummaryDisplay(pet, selectedSkill, variant) {
    const hasSkillSelection = Boolean(selectedSkill && variant);
    if (elements.spotlightTitleText) {
      elements.spotlightTitleText.textContent = pet.title || "";
    }
    if (elements.spotlightPetBannerName) {
      elements.spotlightPetBannerName.textContent = pet.name;
    }
    if (elements.spotlightStageStrip) {
      elements.spotlightStageStrip.hidden = !hasSkillSelection;
    }
    if (elements.spotlightStageTile) {
      elements.spotlightStageTile.innerHTML = hasSkillSelection
        ? (pet.kind === "pet"
          ? renderSpotlightGradeBadge(variant)
          : renderTierTile(pet, variant))
        : "";
    }
    if (elements.spotlightStageLabel) {
      elements.spotlightStageLabel.textContent = hasSkillSelection ? stageDisplayLabel(variant) : "";
    }
    if (elements.spotlightStageSkill) {
      elements.spotlightStageSkill.textContent = hasSkillSelection ? (selectedSkill.name || "-") : "";
    }
    if (elements.spotlightStageOption) {
      const optionHtml = hasSkillSelection ? spotlightStageOptionHtml(pet, variant) : "";
      elements.spotlightStageOption.innerHTML = optionHtml;
      elements.spotlightStageOption.hidden = !optionHtml;
    }
    if (elements.spotlightInfoList) {
      const rows = [];
      const resolvedElementLabel = displayElementLabel(pet);
      const elementIcon = elementIconAsset(pet);
      const typeLabel = attackTypeLabel(pet);
      const typeIcon = attackTypeIconAsset(pet);
      if (resolvedElementLabel) {
        rows.push(spotlightInfoItemMarkup(
          elementIcon
            ? { icon: elementIcon, label: resolvedElementLabel, largeIcon: true, iconVariant: "element" }
            : { label: resolvedElementLabel, textGlyph: resolvedElementLabel.slice(0, 1) }
        ));
      }
      if (typeLabel) {
        rows.push(spotlightInfoItemMarkup({ icon: typeIcon, bg: typeIcon ? ATTACK_TYPE_BG_ASSET : "", label: typeLabel, iconVariant: "attack" }));
      }
      const speedLabel = displayAttackSpeedLabel(pet);
      if (speedLabel) {
        rows.push(spotlightInfoItemMarkup({ icon: attackSpeedIconAsset(pet), label: speedLabel, largeIcon: true, iconVariant: "speed" }));
      }
      elements.spotlightInfoList.innerHTML = rows.join("");
    }
  }

  function stageMetaMarkup(variant) {
    return `<span>${escapeHtml(resolvedStageLabel(variant))}</span>`;
  }

  function skillToneLabel(skill) {
    switch (normalizedSkillKind(skill)) {
      case "basic":
        return "기본";
      case "passive":
        return "패시브";
      case "aura":
        return "오오라";
      default:
        return "액티브";
    }
  }

  function buildSkillBadgeInner(skill, variant, includeLevel, isSelected) {
    const iconSrc = isSelected ? selectedSkillIconPath(variant.iconImage, variant.selectedIconImage) : variant.iconImage;
    if (variant.iconImage) {
      const fallbackIconSrc = assetUrl(variant.iconImage);
      const resolvedIconSrc = assetUrl(iconSrc || variant.iconImage);
      return `
        <img class="skill-badge-image" src="${escapeHtml(resolvedIconSrc)}" alt="${escapeHtml(skill.name)}" data-fallback-src="${escapeHtml(fallbackIconSrc)}" onerror="if(this.dataset.fallbackSrc&&this.src!==this.dataset.fallbackSrc){this.src=this.dataset.fallbackSrc;return;}this.removeAttribute('onerror');">
        ${includeLevel ? `<span class="skill-badge-level">${escapeHtml(stageLevelLabel(variant))}</span>` : ""}
      `;
    }
    return `<span class="skill-badge-label">${escapeHtml(skillToneLabel(skill))}${includeLevel ? `<br>${escapeHtml(stageLevelLabel(variant))}` : ""}</span>`;
  }

  function createSkillBadge(skill, variant, isSelected, includeLevel) {
    const badge = document.createElement("div");
    const hasImage = Boolean(variant.iconImage);
    badge.className = `skill-badge ${normalizedSkillKind(skill)}${hasImage ? " has-image" : ""}`;
    badge.innerHTML = buildSkillBadgeInner(skill, variant, includeLevel, isSelected);
    return badge;
  }

  function renderOwnedEffectCard(pet) {
    if (!elements.portraitOwnedEffect || !elements.portraitOwnedEffectTitle || !elements.portraitOwnedEffectList) {
      return;
    }

    const config = ownedEffectConfig(pet);
    const stats = config ? ownedEffectStats(pet) : [];
    const usePortraitOwnedEffect = Boolean(
      config
      && stats.length
      && (pet.kind === "ride" || pet.kind === "weapon")
    );
    if (!usePortraitOwnedEffect) {
      elements.portraitOwnedEffect.hidden = true;
      elements.portraitOwnedEffectList.innerHTML = "";
      if (elements.portraitOwnedEffectTitle) {
        elements.portraitOwnedEffectTitle.textContent = "";
      }
      if (elements.portraitOwnedEffectNote) {
        elements.portraitOwnedEffectNote.textContent = "";
        elements.portraitOwnedEffectNote.hidden = true;
      }
      return;
    }

    elements.portraitOwnedEffect.hidden = false;
    elements.portraitOwnedEffect.dataset.kind = pet.kind || "";
    elements.portraitOwnedEffectTitle.textContent = config.title;
    if (elements.portraitOwnedEffectNote) {
      elements.portraitOwnedEffectNote.textContent = config.note || "";
      elements.portraitOwnedEffectNote.hidden = !Boolean(config.note);
    }
    elements.portraitOwnedEffectList.innerHTML = "";

    stats.forEach((entry) => {
      const row = document.createElement("div");
      row.className = "portrait-owned-effect-entry";
      row.innerHTML = `
        <strong class="portrait-owned-effect-label">${escapeHtml(entry.label || "-")}</strong>
        <span class="portrait-owned-effect-value">${escapeHtml(entry.value || "-")}</span>
      `;
      elements.portraitOwnedEffectList.appendChild(row);
    });
  }

  function renderCollectionTabs() {
    if (!elements.collectionTabs) return;
    const activeCategory = getActiveCategory();
    const calculatorActive = isRouletteCalculatorCategory(activeCategory);
    if (elements.railPrimaryActions) {
      elements.railPrimaryActions.innerHTML = "";
      if (ROULETTE_CALCULATOR_ENABLED) {
        const calculatorButton = document.createElement("button");
        calculatorButton.type = "button";
        calculatorButton.className = `rail-calculator-action${calculatorActive ? " active" : ""}`;
        calculatorButton.textContent = ROULETTE_CALCULATOR_CATEGORY.label;
        calculatorButton.addEventListener("click", () => {
          if (isMobileLayout()) {
            setMobileLoading("view-transition", true);
          }
          state.activeCategoryKey = ROULETTE_CALCULATOR_CATEGORY_KEY;
          if (isMobileLayout()) {
            state.mobileView = "detail";
          }
          render();
          if (isMobileLayout()) {
            finishMobileLoadingSoon("view-transition");
          }
        });
        elements.railPrimaryActions.appendChild(calculatorButton);
      }
    }
    elements.collectionTabs.innerHTML = "";

    getCategories().forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `collection-tab${category.key === activeCategory.key ? " active" : ""}`;
      button.textContent = category.label || category.key;
      button.addEventListener("click", () => {
        if (isMobileLayout()) {
          setMobileLoading("view-transition", true);
        }
        state.activeCategoryKey = category.key;
        if (typeof state.selectedIndexByCategory[category.key] !== "number") {
          state.selectedIndexByCategory[category.key] = findPreferredIndex(getItems(category));
        }
        if (isMobileLayout()) {
          state.mobileView = "rail";
        }
        render();
        if (isMobileLayout()) {
          finishMobileLoadingSoon("view-transition");
        }
      });
      elements.collectionTabs.appendChild(button);
    });
  }

  function renderRailHeader(category) {
    if (elements.railTitle) {
      elements.railTitle.textContent = category.railTitle || category.label || "가챠 뷰어";
    }
    if (elements.railCopy) {
      elements.railCopy.textContent = category.railCopy || "";
    }
  }

  function petSubgroupLabelHtml(label) {
    const parts = String(label || "")
      .split("·")
      .map((part) => part.trim())
      .filter(Boolean);
    if (!parts.length) {
      return "";
    }
    if (parts.length === 1) {
      return `<span class="pet-subfilter-label"><span>${escapeHtml(parts[0])}</span></span>`;
    }
    return `
      <span class="pet-subfilter-label is-split">
        <span>${escapeHtml(parts[0])}</span>
        <span>${escapeHtml(parts.slice(1).join("·"))}</span>
      </span>
    `;
  }

  function renderPetSubfilters(category) {
    if (!elements.petSubfilters) {
      return;
    }
    if (category?.key !== "pet") {
      elements.petSubfilters.hidden = true;
      elements.petSubfilters.innerHTML = "";
      return;
    }
    elements.petSubfilters.hidden = false;
    elements.petSubfilters.innerHTML = "";
    PET_SUBGROUPS.forEach((subgroup) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `pet-subfilter${state.activePetSubgroupKey === subgroup.key ? " active" : ""}`;
      button.innerHTML = petSubgroupLabelHtml(subgroup.label);
      button.setAttribute("aria-pressed", state.activePetSubgroupKey === subgroup.key ? "true" : "false");
      button.addEventListener("click", () => {
        if (state.activePetSubgroupKey === subgroup.key) {
          return;
        }
        if (isMobileLayout()) {
          setMobileLoading("view-transition", true);
        }
        state.activePetSubgroupKey = subgroup.key;
        syncPetSubgroupSelection(category);
        render();
        if (isMobileLayout()) {
          finishMobileLoadingSoon("view-transition");
        }
      });
      elements.petSubfilters.appendChild(button);
    });
  }

  function renderRailPastToggle(category) {
    if (!elements.railPastToggle) {
      return;
    }
    const endedCount = getRailFilterBaseItems(category).filter((item) => isEndedRailItem(item)).length;
    elements.railPastToggle.hidden = endedCount === 0;
    elements.railPastToggle.textContent = state.showPastRailItems
      ? `종료 항목 숨기기 (${endedCount})`
      : `종료 항목 보기 (${endedCount})`;
    elements.railPastToggle.setAttribute("aria-pressed", state.showPastRailItems ? "true" : "false");
  }

  function renderPetList() {
    const category = getActiveCategory();
    const allItems = getItems(category);
    const items = getDisplayItems(category);
    const currentIndex = getCurrentIndex(category);
    renderRailHeader(category);
    renderPetSubfilters(category);
    renderRailPastToggle(category);
    elements.petList.innerHTML = "";

    if (!items.length) {
      elements.petList.innerHTML = `<div class="pet-list-empty">${state.showPastRailItems ? "표시할 항목이 없습니다." : "종료 항목이 숨겨져 있습니다."}</div>`;
      return;
    }

      items.forEach((pet) => {
        const actualIndex = allItems.findIndex((item) => getEntityId(item) === getEntityId(pet));
        const status = getPetStatus(pet);
        const generalSummonStatus = resolveGeneralSummonStatusMeta(pet);
        const thumb = listThumbAsset(pet);
        const thumbMarkup = thumb
          ? `
            <span class="pet-item-thumb" data-kind="${escapeHtml(pet.kind || "pet")}">
              <img class="pet-item-thumb-image" data-kind="${escapeHtml(pet.kind || "pet")}" src="${escapeHtml(assetUrl(thumb))}" alt="${escapeHtml(pet.name)}" loading="lazy" decoding="async">
          </span>
        `
        : '<div class="pet-item-fallback"></div>';
      const button = document.createElement("button");
      button.type = "button";
      button.className = `pet-item${actualIndex === currentIndex ? " active" : ""}`;
      button.dataset.kind = pet.kind || "pet";
      button.dataset.status = status.tone || "past";
      button.addEventListener("click", () => {
        if (isMobileLayout()) {
          setMobileLoading("view-transition", true);
        }
        state.selectedIndexByCategory[category.key] = actualIndex >= 0 ? actualIndex : 0;
        if (isMobileLayout()) {
          render();
          setMobileView("detail");
        } else {
          render();
        }
        if (isMobileLayout()) {
          finishMobileLoadingSoon("view-transition");
        }
      });

        button.innerHTML = `
          ${thumbMarkup}
          <span class="pet-item-title">
            <strong>${escapeHtml(pet.name)}</strong>
            <span>${escapeHtml(pet.title || pet.description || "")}</span>
            ${pet.listMetaLabel ? `<small class="pet-item-meta-badge">${escapeHtml(pet.listMetaLabel)}</small>` : ""}
          </span>
          <span class="pet-item-order ${escapeHtml(status.tone || "past")}">
            <span class="pet-item-order-primary">${escapeHtml(status.label)}</span>
            ${generalSummonStatus ? `<small class="pet-item-order-secondary general-summon ${escapeHtml(generalSummonStatus.tone || "upcoming")}">${escapeHtml(generalSummonStatus.label)}</small>` : ""}
          </span>
        `;

      elements.petList.appendChild(button);
    });
  }

  function renderScheduleList(pet) {
    elements.scheduleList.innerHTML = "";
    const schedules = getResolvedSchedules(pet);
    const acquisitionEntries = Array.isArray(pet?.acquisitionEntries)
      ? pet.acquisitionEntries.filter((entry) => entry && (entry.title || entry.summary))
      : [];
    const currentDateTimeKey = getTimeZoneDateTimeKey();
    const generalSummonStatus = resolveGeneralSummonStatusMeta(pet, currentDateTimeKey);

    if (!schedules.length) {
      if (acquisitionEntries.length) {
        acquisitionEntries.slice(0, 6).forEach((entry) => {
          const block = document.createElement("div");
          const toneClass = String(entry.tone || "").trim();
          block.className = `schedule-item acquisition-item${toneClass ? ` acquisition-${toneClass}` : ""}`;
          block.innerHTML = `<strong>${escapeHtml(String(entry.title || "").trim())}</strong><span>${escapeHtml(String(entry.summary || "").trim())}</span>`;
          elements.scheduleList.appendChild(block);
        });
      } else {
        const summary = pet.statusSummary || "등록된 일정이 없습니다.";
        elements.scheduleList.innerHTML = `<div class='schedule-item'><span>${escapeHtml(summary)}</span></div>`;
      }

      if (generalSummonStatus) {
        const block = document.createElement("div");
        block.className = `schedule-item general-summon-item ${generalSummonStatus.tone}`;
        block.innerHTML = `<strong>상시 오픈 일정</strong><span>${escapeHtml(generalSummonStatus.sourceLabel || "일반 펫뽑기")} · ${escapeHtml(generalSummonStatus.summary)}</span>`;
        elements.scheduleList.appendChild(block);
      }
      return;
    }

    const currentSchedules = schedules.filter((item) => item.resolvedStatus === "current");
    const upcomingSchedules = schedules.filter((item) => item.resolvedStatus === "upcoming");
    const pastSchedules = schedules
      .filter((item) => item.resolvedStatus === "past")
      .slice()
      .reverse();
    const activeSchedules = [...currentSchedules, ...upcomingSchedules];
    const visibleSchedules = activeSchedules.length
      ? activeSchedules.slice(0, 6)
      : pastSchedules.slice(0, 6);
    const hiddenPastSchedules = activeSchedules.length
      ? pastSchedules
      : pastSchedules.slice(6);

    visibleSchedules.forEach((item) => {
      const statusMeta = resolveScheduleToneMeta(item, currentDateTimeKey);
      const block = document.createElement("div");
      block.className = `schedule-item ${statusMeta.tone}`;
      block.innerHTML = `<strong>${escapeHtml(formatScheduleDisplayRange(item.start, item.end, item.resolvedStartDateTimeKey, item.resolvedEndExclusiveDateTimeKey))}</strong><span>${escapeHtml(statusMeta.scheduleLabel)}</span>`;
      elements.scheduleList.appendChild(block);
    });

    if (hiddenPastSchedules.length) {
      const history = document.createElement("details");
      history.className = "schedule-history";
      history.innerHTML = `
        <summary>
          <span>종료 일정 보기</span>
          <small>${escapeHtml(String(hiddenPastSchedules.length))}개</small>
        </summary>
        <div class="schedule-history-list"></div>
      `;
      const historyList = history.querySelector(".schedule-history-list");
      hiddenPastSchedules.forEach((item) => {
        const statusMeta = resolveScheduleToneMeta(item, currentDateTimeKey);
        const block = document.createElement("div");
        block.className = `schedule-item ${statusMeta.tone}`;
        block.innerHTML = `<strong>${escapeHtml(formatScheduleDisplayRange(item.start, item.end, item.resolvedStartDateTimeKey, item.resolvedEndExclusiveDateTimeKey))}</strong><span>${escapeHtml(statusMeta.scheduleLabel)}</span>`;
        historyList.appendChild(block);
      });
      elements.scheduleList.appendChild(history);
    }

    if (generalSummonStatus) {
      const block = document.createElement("div");
      block.className = `schedule-item general-summon-item ${generalSummonStatus.tone}`;
      block.innerHTML = `<strong>상시 오픈 일정</strong><span>${escapeHtml(generalSummonStatus.sourceLabel || "일반 펫뽑기")} · ${escapeHtml(generalSummonStatus.summary)}</span>`;
      elements.scheduleList.appendChild(block);
    }
  }

  function renderHero(pet) {
    const category = getActiveCategory();
    const status = getPetStatus(pet);
    const hideStaticArtwork = pet.hideStaticArtwork === true;
    const backdropImage = hideStaticArtwork
      ? ""
      : pet.kind === "ride"
      ? rideDisplayImage(pet)
      : (pet.backdropImage || pet.portraitImage || pet.bannerImage || "");
    const railIconImage = railIconAsset(pet);
    const elementIcon = elementIconAsset(pet);

    if (elements.heroPanel) {
      elements.heroPanel.dataset.kind = pet.kind || "pet";
      elements.heroPanel.dataset.element = pet.elementKey || "";
      elements.heroPanel.dataset.attackType = pet.attackTypeKey || "";
    }

    if (elements.scheduleBlockTitle) {
      elements.scheduleBlockTitle.textContent = scheduleBlockTitleForPet(pet);
    }
    const hasScheduleEntries = Array.isArray(pet?.schedules) && pet.schedules.length > 0;
    if (elements.scheduleBlockSubtext) {
      const reference = currentScheduleReferenceParts();
      elements.scheduleBlockSubtext.innerHTML = `
        <span class="schedule-reference-label">${escapeHtml(reference.label)}</span>
        <span class="schedule-reference-date">${escapeHtml(reference.dateTime)}</span>
      `;
      elements.scheduleBlockSubtext.title = currentScheduleReferenceLabel();
      elements.scheduleBlockSubtext.hidden = !hasScheduleEntries;
    }
    if (elements.scheduleAdjustButton) {
      elements.scheduleAdjustButton.hidden = !hasScheduleEntries;
      if (!hasScheduleEntries) {
        elements.scheduleAdjustButton.classList.remove("is-mobile-tooltip-visible");
      }
    }

    elements.orderBadge.textContent = `NO.${String(displayOrderValue(category, pet)).padStart(2, "0")}`;
    elements.statusBadge.textContent = status.label;
    elements.statusBadge.className = `status-badge ${status.tone}`;
    elements.petTitle.textContent = pet.title || (category.label || "");
    elements.petName.textContent = pet.name || "";
    if (elements.petMetaLabel) {
      const metaLabel = String(pet.detailMetaLabel || "").trim();
      elements.petMetaLabel.textContent = metaLabel;
      elements.petMetaLabel.hidden = !metaLabel;
    }
    if (elements.petDesc) {
      const isPetDescriptionVisible = (pet.kind || "pet") === "pet" && Boolean(String(pet.description || "").trim());
      elements.petDesc.textContent = isPetDescriptionVisible ? pet.description : "";
      elements.petDesc.hidden = !isPetDescriptionVisible;
    }
    if (elements.scheduleSummary) {
      elements.scheduleSummary.textContent = status.summary || "";
    }

    elements.heroBackdrop.style.backgroundImage = backdropImage
      ? `url("${assetUrl(backdropImage)}")`
      : "none";

    setImage(elements.portraitImage, cardPortraitAsset(pet), pet.name);
    if (elements.portraitImage) {
      elements.portraitImage.dataset.kind = pet.kind || "pet";
    }
    setImage(elements.gachaIcon, railIconImage, `${pet.name} 아이콘`);
    if (elements.gachaIcon) {
      elements.gachaIcon.dataset.kind = pet.kind || "pet";
    }
    setImage(elements.portraitElementIcon, elementIcon, `${pet.name} 속성`);
    if (elements.portraitElementBadge) {
      elements.portraitElementBadge.hidden = !Boolean(elementIcon);
    }
    if (elements.portraitPetTitle) {
      elements.portraitPetTitle.textContent = pet.title || "";
    }
    if (elements.portraitPetName) {
      elements.portraitPetName.textContent = pet.name || "";
    }

    renderSpotlightMedia(pet);
    renderOwnedEffectCard(pet);
    renderScheduleList(pet);
  }

  function renderFocusSkill(pet) {
    const selectedSkill = getSelectedSkill(pet);
    if (!selectedSkill) return;
    const { data: variant } = getSelectedVariant(pet, selectedSkill);
    if (!variant) return;
    const hasImage = Boolean(variant.iconImage);

    elements.focusSkillBadge.className = `skill-badge large ${normalizedSkillKind(selectedSkill)}${hasImage ? " has-image" : ""}`;
    elements.focusSkillBadge.innerHTML = buildSkillBadgeInner(selectedSkill, variant, false, false);
    elements.focusSkillType.textContent = resolvedSkillSlotLabel(selectedSkill);
    elements.focusSkillName.textContent = selectedSkill.name;
    elements.focusVariantLevel.className = "meta-pill tier-meta";
    elements.focusVariantLevel.innerHTML = stageMetaMarkup(variant);
    elements.focusSkillRange.textContent = skillRangeLabel(pet, selectedSkill, variant);
    elements.focusCooldown.textContent = cooldownLabel(variant.coolTime);
    elements.focusSkillDesc.innerHTML = skillDescriptionHtml(variant);
    renderSpotlightSummaryDisplay(pet, selectedSkill, variant);
    elements.selectedSkillSummary.innerHTML = `
      <span class="summary-name">${escapeHtml(selectedSkill.name)}</span>
      <span class="highlight">${escapeHtml(stageDisplayLabel(variant))}</span>
    `;
  }

  function renderSkillDock(pet) {
    if (!elements.skillDock) return;
    const selectedSkill = getSelectedSkill(pet);
    if (!selectedSkill) {
      elements.skillDock.innerHTML = "";
      return;
    }
    const selectedSkillKey = getSkillKey(pet, selectedSkill);
    elements.skillDock.innerHTML = "";

    pet.skills.forEach((skill) => {
      const { data: variant } = getSelectedVariant(pet, skill);
      const key = getSkillKey(pet, skill);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `skill-button${key === selectedSkillKey ? " active" : ""}`;
      button.addEventListener("click", () => {
        state.selectedSkillKeyByPet[getEntityId(pet)] = key;
        renderSkillPanels(pet);
        renderOwnedEffectCard(pet);
      });

      const badge = createSkillBadge(skill, variant, false, false);
      const copy = document.createElement("div");
      copy.className = "skill-button-copy";
      copy.innerHTML = `
          <span class="skill-slot">${escapeHtml(resolvedSkillSlotLabel(skill))}</span>
        <strong class="skill-name">${escapeHtml(skill.name)}</strong>
        <span class="skill-meta">
          <span>${escapeHtml(stageDisplayLabel(variant))}</span>
          <span>${escapeHtml(cooldownLabel(variant.coolTime))}</span>
        </span>
      `;

      button.appendChild(badge);
      button.appendChild(copy);
      elements.skillDock.appendChild(button);
    });
  }

  function scrollHorizontalRailToChild(container, child, padding = 12) {
    if (!container || !child) return;
    const containerWidth = container.clientWidth || 0;
    if (!containerWidth) return;

    const targetPadding = Math.max(0, Number(padding) || 0);
    const childStart = child.offsetLeft;
    const childEnd = childStart + child.offsetWidth;
    const viewStart = container.scrollLeft || 0;
    const viewEnd = viewStart + containerWidth;

    let nextScrollLeft = viewStart;
    if (childStart < (viewStart + targetPadding)) {
      nextScrollLeft = childStart - targetPadding;
    } else if (childEnd > (viewEnd - targetPadding)) {
      nextScrollLeft = childEnd - containerWidth + targetPadding;
    }

    const clampedScrollLeft = Math.max(0, nextScrollLeft);
    if (typeof container.scrollTo === "function") {
      container.scrollTo({ left: clampedScrollLeft, top: 0, behavior: "auto" });
    }
    container.scrollLeft = clampedScrollLeft;
  }

  function updateMobileVariantRailAffordance(shell) {
    if (!shell) return;
    const rail = shell.querySelector(".mobile-variant-rail");
    if (!rail) return;

    const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const hasOverflow = maxScrollLeft > 6;
    const currentScrollLeft = rail.scrollLeft || 0;
    const hasLeftOverflow = hasOverflow && currentScrollLeft > 6;
    const hasRightOverflow = hasOverflow && currentScrollLeft < (maxScrollLeft - 6);

    shell.classList.toggle("is-overflowing", hasOverflow);
    shell.classList.toggle("has-left-overflow", hasLeftOverflow);
    shell.classList.toggle("has-right-overflow", hasRightOverflow);
  }

  function syncMobileVariantRailAffordances() {
    if (!elements.mobileSkillAccordion) return;
    elements.mobileSkillAccordion.querySelectorAll(".mobile-variant-rail-shell").forEach((shell) => {
      updateMobileVariantRailAffordance(shell);
    });
  }

  function restoreMobileVariantRailScroll() {
    if (!elements.mobileSkillAccordion) return;
    elements.mobileSkillAccordion.querySelectorAll(".mobile-variant-rail").forEach((rail) => {
      const skillKey = rail.dataset.skillKey || "";
      const railShell = rail.closest(".mobile-variant-rail-shell");
      if (!skillKey) return;
      if (typeof state.mobileVariantScrollBySkillKey[skillKey] === "number") {
        rail.scrollLeft = state.mobileVariantScrollBySkillKey[skillKey];
        updateMobileVariantRailAffordance(railShell);
        return;
      }
      const activeChip = rail.querySelector(".mobile-variant-chip.is-active");
      if (activeChip) {
        scrollHorizontalRailToChild(rail, activeChip, 12);
      }
      updateMobileVariantRailAffordance(railShell);
    });
  }

  function renderMobileSkillAccordion(pet) {
    if (!elements.mobileSkillAccordion) {
      return;
    }
    if (!isMobileLayout()) {
      elements.mobileSkillAccordion.hidden = true;
      elements.mobileSkillAccordion.innerHTML = "";
      return;
    }

    elements.mobileSkillAccordion.hidden = false;
    elements.mobileSkillAccordion.innerHTML = "";

    const selectedSkill = getSelectedSkill(pet);
    const selectedSkillKey = getSkillKey(pet, selectedSkill);

    pet.skills.forEach((skill) => {
      const key = getSkillKey(pet, skill);
      const { index: selectedVariantIndex, data: variant } = getSelectedVariant(pet, skill);
      const isActive = key === selectedSkillKey;
      const skillCard = document.createElement("section");
      skillCard.className = `mobile-skill-item${isActive ? " is-active" : ""}`;

      const summaryButton = document.createElement("button");
      summaryButton.type = "button";
      summaryButton.className = "mobile-skill-button";
      summaryButton.setAttribute("aria-expanded", isActive ? "true" : "false");
      summaryButton.addEventListener("click", () => {
        if (state.selectedSkillKeyByPet[getEntityId(pet)] === key) return;
        state.selectedSkillKeyByPet[getEntityId(pet)] = key;
        renderSkillPanels(pet);
        renderOwnedEffectCard(pet);
      });

      const badge = createSkillBadge(skill, variant, isActive, false);
      const summaryCopy = document.createElement("div");
      summaryCopy.className = "mobile-skill-button-copy";
      summaryCopy.innerHTML = `
        <p class="mobile-skill-slot">${escapeHtml(resolvedSkillSlotLabel(skill))}</p>
        <strong class="mobile-skill-name">${escapeHtml(skill.name)}</strong>
        <span class="mobile-skill-meta">
          <span>${escapeHtml(stageDisplayLabel(variant))}</span>
          <span>${escapeHtml(skillRangeLabel(pet, skill, variant))}</span>
          <span>${escapeHtml(cooldownLabel(variant.coolTime))}</span>
        </span>
      `;
      summaryButton.appendChild(badge);
      summaryButton.appendChild(summaryCopy);
      skillCard.appendChild(summaryButton);

      if (isActive) {
        const panel = document.createElement("div");
        panel.className = "mobile-skill-panel";

        const variantRailShell = document.createElement("div");
        variantRailShell.className = "mobile-variant-rail-shell";

        const variantRailCuePrev = document.createElement("span");
        variantRailCuePrev.className = "mobile-variant-rail-cue prev";
        variantRailCuePrev.setAttribute("aria-hidden", "true");
        variantRailShell.appendChild(variantRailCuePrev);

        const variantRail = document.createElement("div");
        variantRail.className = "mobile-variant-rail";
        variantRail.dataset.skillKey = key;
        variantRail.addEventListener("scroll", () => {
          state.mobileVariantScrollBySkillKey[key] = variantRail.scrollLeft;
          updateMobileVariantRailAffordance(variantRailShell);
        }, { passive: true });

        skill.variants.forEach((skillVariant, variantIndex) => {
          const chip = document.createElement("button");
          chip.type = "button";
          chip.className = `mobile-variant-chip${variantIndex === selectedVariantIndex ? " is-active" : ""}`;
          chip.innerHTML = `
            <span class="mobile-variant-chip-tile">${renderTierTile(pet, skillVariant)}</span>
            <span class="mobile-variant-chip-copy">
              <strong>${escapeHtml(resolvedStageLabel(skillVariant))}</strong>
              <span>${escapeHtml(stageLevelLabel(skillVariant))}</span>
            </span>
          `;
          chip.addEventListener("click", () => {
            state.mobileVariantScrollBySkillKey[key] = variantRail.scrollLeft;
            selectVariant(pet, skill, variantIndex);
          });
          variantRail.appendChild(chip);
        });

        variantRailShell.appendChild(variantRail);

        const variantRailCueNext = document.createElement("span");
        variantRailCueNext.className = "mobile-variant-rail-cue next";
        variantRailCueNext.setAttribute("aria-hidden", "true");
        variantRailShell.appendChild(variantRailCueNext);

        panel.appendChild(variantRailShell);

        const optionHtml = upgradePreviewHtml(variant);
        if (optionHtml) {
          const optionCard = document.createElement("div");
          optionCard.className = "mobile-inline-card mobile-stage-option-card";
          optionCard.innerHTML = `
            <p class="section-label">현재 단계 옵션</p>
            <div class="mobile-inline-copy">${optionHtml}</div>
          `;
          panel.appendChild(optionCard);
        }

        const descCard = document.createElement("div");
        descCard.className = "mobile-inline-card mobile-skill-desc-card";
        descCard.innerHTML = `
          <p class="section-label">스킬 설명</p>
          <div class="skill-desc mobile-skill-desc-body">${skillDescriptionHtml(variant)}</div>
        `;
        panel.appendChild(descCard);
        skillCard.appendChild(panel);
      }

      elements.mobileSkillAccordion.appendChild(skillCard);
    });

    window.requestAnimationFrame(() => {
      restoreMobileVariantRailScroll();
      syncMobileVariantRailAffordances();
    });
  }

  function renderVariantPreviewList(pet) {
    if (!elements.variantPreviewList) return;
    const selectedSkill = getSelectedSkill(pet);
    if (!selectedSkill) {
      elements.variantPreviewList.innerHTML = "";
      return;
    }
    const skillKey = getSkillKey(pet, selectedSkill);
    const selectedIndex = clamp(state.selectedVariantBySkillKey[skillKey] || 0, 0, selectedSkill.variants.length - 1);
    elements.variantPreviewList.innerHTML = "";

    selectedSkill.variants.forEach((variant, index) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `variant-preview-entry${selectedIndex === index ? " active" : ""}`;
      row.addEventListener("click", () => selectVariant(pet, selectedSkill, index));
      row.innerHTML = `
        <span class="variant-preview-tile">${renderTierTile(pet, variant)}</span>
        <span class="variant-preview-copy">
          <strong>${escapeHtml(stageDisplayLabel(variant))}</strong>
          <span class="variant-preview-upgrade">${upgradePreviewHtml(variant)}</span>
        </span>
      `;
      elements.variantPreviewList.appendChild(row);
    });
  }

  function renderSkillPanels(pet) {
    const hasSkills = Array.isArray(pet?.skills) && pet.skills.length > 0;
    if (elements.skillFocusCard) {
      elements.skillFocusCard.hidden = !hasSkills;
    }
    if (elements.detailRail) {
      elements.detailRail.hidden = !hasSkills;
    }
    if (!hasSkills) {
      renderSpotlightSummaryDisplay(pet, null, null);
      if (elements.skillDock) {
        elements.skillDock.innerHTML = "";
      }
      if (elements.mobileSkillAccordion) {
        elements.mobileSkillAccordion.hidden = true;
        elements.mobileSkillAccordion.innerHTML = "";
      }
      if (elements.variantPreviewList) {
        elements.variantPreviewList.innerHTML = "";
      }
      if (elements.selectedSkillSummary) {
        elements.selectedSkillSummary.textContent = "";
      }
      return;
    }
    renderFocusSkill(pet);
    renderSkillDock(pet);
    renderMobileSkillAccordion(pet);
    renderVariantPreviewList(pet);
  }

  function renderEquipmentSetBlock(pet) {
    if (!elements.equipmentSetBlock || !elements.equipmentSetList) {
      return;
    }

    const shouldUseMobileHost = isMobileLayout()
      && pet
      && pet.kind === "weapon"
      && elements.mobileEquipmentSetHost;
    const targetHost = shouldUseMobileHost ? elements.mobileEquipmentSetHost : elements.equipmentSetDesktopSlot;
    if (targetHost && elements.equipmentSetBlock.parentElement !== targetHost) {
      targetHost.appendChild(elements.equipmentSetBlock);
    }

    const shouldShow = pet && pet.kind === "weapon";
    elements.equipmentSetBlock.hidden = !shouldShow;
    if (!shouldShow) {
      elements.equipmentSetList.innerHTML = "";
      return;
    }

    if (elements.equipmentSetTitle) {
      elements.equipmentSetTitle.textContent = "장비 세트";
    }
    if (elements.equipmentSetNote) {
      elements.equipmentSetNote.textContent = "";
    }

    elements.equipmentSetList.innerHTML = "";
    const entityId = getEntityId(pet);
    const manifestEntry = getManifestEntry(entityId);
    const availableSets = manifestEntry && spineState.preview && spineState.currentCharacterId === entityId
      ? getAvailableWeaponEquipmentSets(spineState.preview.skeleton && spineState.preview.skeleton.data)
      : WEAPON_EQUIPMENT_SETS;
    const selectedSet = availableSets.find((set) => set.key === state.selectedWeaponEquipmentSetKeyByEntityId[entityId])
      || availableSets.find((set) => set.key === DEFAULT_WEAPON_EQUIPMENT_SET_KEY_BY_ID[entityId])
      || availableSets[0]
      || null;

    if (selectedSet) {
      state.selectedWeaponEquipmentSetKeyByEntityId[entityId] = selectedSet.key;
    }

    availableSets.forEach((set) => {
      const entry = document.createElement("button");
      entry.type = "button";
      entry.className = `equipment-set-entry${selectedSet && selectedSet.key === set.key ? " is-active" : ""}`;
      entry.innerHTML = `<span class="equipment-set-copy">${escapeHtml(set.name)}</span>`;
      entry.addEventListener("click", () => {
        if (state.selectedWeaponEquipmentSetKeyByEntityId[entityId] === set.key) return;
        state.selectedWeaponEquipmentSetKeyByEntityId[entityId] = set.key;
        if (spineState.currentCharacterId === entityId) {
          spineState.currentCharacterId = "";
        }
        render();
        if (isMobileLayout() && state.mobileView === "detail") {
          const scrollTarget = elements.spotlightMedia || elements.focusTopRow;
          scheduleViewportScrollToElement(scrollTarget, 56);
        }
      });
      elements.equipmentSetList.appendChild(entry);
    });
  }

  function stepCurrentItem(delta) {
    const category = getActiveCategory();
    const allItems = getItems(category);
    const items = getDisplayItems(category);
    if (!items.length) {
      return;
    }
    if (isMobileLayout()) {
      setMobileLoading("view-transition", true);
    }
    const currentItem = getCurrentItem(category);
    const currentVisibleIndex = Math.max(0, items.findIndex((item) => getEntityId(item) === getEntityId(currentItem)));
    const nextItem = items[(currentVisibleIndex + delta + items.length) % items.length];
    const nextIndex = allItems.findIndex((item) => getEntityId(item) === getEntityId(nextItem));
    state.selectedIndexByCategory[category.key] = nextIndex >= 0 ? nextIndex : 0;
    render();
    if (isMobileLayout()) {
      setMobileView("detail");
      finishMobileLoadingSoon("view-transition");
    }
  }

  function selectVariant(pet, skill, index) {
    state.selectedVariantBySkillKey[getSkillKey(pet, skill)] = clamp(index, 0, skill.variants.length - 1);
    renderSkillPanels(pet);
    renderOwnedEffectCard(pet);
  }

  function render() {
    syncMobileLayout();
    if (isRouletteCalculatorCategory(state.activeCategoryKey)) {
      renderCollectionTabs();
      renderRouletteCalculator();
      if (isMobileLayout()) {
        syncMobileViewerHistory("replace");
      }
      return;
    }
    hideRouletteCalculator();
    syncPetSubgroupSelection();
    syncRailVisibleSelection();
    const pet = getCurrentItem();
    if (!pet) {
      return;
    }
    ensurePetState(pet);
    renderCollectionTabs();
    renderPetList();
    renderHero(pet);
    renderEquipmentSetBlock(pet);
    renderSkillPanels(pet);
    if (isMobileLayout() && state.mobileView === "rail") {
      cancelPendingRailSelectionScroll();
      railSelectionScrollRaf = window.requestAnimationFrame(() => {
        railSelectionScrollRaf = 0;
        if (!isMobileLayout() || state.mobileView !== "rail") return;
        syncSelectedRailItemIntoView();
      });
    }
    if (isMobileLayout()) {
      syncMobileViewerHistory("replace");
    }
  }

  function refreshScheduleStatuses(force = false) {
    const nextTickKey = getTimeZoneDateTimeKey().slice(0, 16);
    if (!force && nextTickKey === lastScheduleStatusTickKey) {
      return;
    }
    lastScheduleStatusTickKey = nextTickKey;
    if (isRouletteCalculatorCategory(state.activeCategoryKey)) {
      updateRouletteCalculatorResult();
      return;
    }
    render();
  }

  function isExpectedSpineFallbackError(error) {
    const message = String(error && error.message ? error.message : error || "");
    return message.includes("Spine manifest data unavailable")
      || message.includes("Spine manifest chunk missing data")
      || message.includes("Spine skeleton data unavailable")
      || message.includes("Spine file protocol fetch unsupported");
  }

  function renderSpotlightMedia(pet) {
    const entityId = getEntityId(pet);
    const manifestEntry = getManifestEntry(entityId);
    const hasHeroScene = Boolean(
      pet.kind === "pet"
      && manifestEntry
      && (manifestEntry.assetKind === "hero" || manifestEntry.assetKind === "pickup")
    );
    const sceneDefinition = hasHeroScene ? heroInfoSceneDefinition(pet.elementKey || "") : null;
    const rideBannerBackground = rideBannerBackgroundAsset(pet);
    const weaponBannerBackground = weaponBannerBackgroundAsset(pet);
    const mediaBackground = sceneDefinition
      ? sceneDefinition.background
      : (pet.kind === "ride"
        ? (rideBannerBackground || rideDisplayImage(pet))
        : (pet.kind === "weapon"
          ? (weaponBannerBackground || pet.backdropImage || pet.bannerImage || pet.portraitImage || pet.heroIconImage)
          : (pet.hideStaticArtwork ? "" : (pet.backdropImage || pet.bannerImage || pet.portraitImage || pet.heroIconImage))));
    const mediaBanner = pet.kind === "ride"
      ? ""
      : (pet.hideStaticArtwork ? "" : (pet.bannerImage || pet.portraitImage || pet.heroIconImage));
    const useStaticVisual = !sceneDefinition && !manifestEntry;
    const hideStaticBannerOnLive = shouldHideStaticBanner(manifestEntry);

    if (!elements.bannerImage || !elements.spinePreview) {
      return;
    }

    if (elements.spotlightMedia) {
      elements.spotlightMedia.dataset.element = pet.elementKey || "";
      elements.spotlightMedia.classList.remove("has-static-visual", "has-scene-particles", "has-scene-beams", "has-scene-pillars", "has-ride-element-bg", "has-weapon-element-bg");
      elements.spotlightMedia.classList.toggle("has-pet-scene", Boolean(sceneDefinition));
      elements.spotlightMedia.classList.toggle("has-static-visual", useStaticVisual);
      elements.spotlightMedia.classList.toggle("has-ride-element-bg", Boolean(rideBannerBackground));
      elements.spotlightMedia.classList.toggle("has-weapon-element-bg", Boolean(weaponBannerBackground));
    }

    setImage(elements.sceneBackgroundImage, mediaBackground, pet.name);
    setImage(elements.sceneStageBack, sceneDefinition ? sceneDefinition.stageBack : "", "");
    setImage(elements.sceneStageZone, "", "");
    setImage(elements.sceneStageFront, "", "");
    setImage(elements.sceneFarLeft, "", "");
    setImage(elements.sceneFarRight, "", "");
    setImage(elements.sceneCloudBack, "", "");
    setImage(elements.sceneBeamLeft, "", "");
    setImage(elements.sceneBeamRight, "", "");
    setImage(elements.bannerImage, mediaBanner, pet.name);
    applySceneLayers();
    requestSceneLayout();

    if (spineState.currentCharacterId === entityId) {
      if (spineState.mode === "live") {
        elements.spinePreview.hidden = false;
        if (elements.spotlightMedia) {
          elements.spotlightMedia.classList.add("has-live-spine");
        }
        elements.bannerImage.hidden = hideStaticBannerOnLive || Boolean(sceneDefinition) || !Boolean(mediaBanner);
        requestSpineLayout();
      }
      setMobileLoading("spine-preview", false);
      return;
    }

    spineState.currentCharacterId = entityId;
    spineState.mode = "fallback";
    spineState.loadToken += 1;
    destroySpinePreview();
    elements.bannerImage.hidden = Boolean(sceneDefinition) || !Boolean(mediaBanner);
    if (elements.spotlightMedia) {
      elements.spotlightMedia.classList.remove("has-live-spine");
    }

    if (!manifestEntry) {
      setMobileLoading("spine-preview", false);
      return;
    }

    Promise.all([
      ensureManifestEntryLoaded(entityId),
      ensureSpineRuntimeLoaded(),
    ])
      .then(([loadedManifestEntry]) => {
        if (!loadedManifestEntry) {
          return false;
        }
        return mountSpinePreview(entityId, loadedManifestEntry, spineState.loadToken);
      })
      .catch((error) => {
        const hasFallbackVisual = Boolean(mediaBanner || mediaBackground);
        if (!hasFallbackVisual || !isExpectedSpineFallbackError(error)) {
          console.warn(`Spine preview failed for ${entityId}.`, error);
        }
        destroySpinePreview();
        spineState.mode = "fallback";
        elements.bannerImage.hidden = !Boolean(mediaBanner) || Boolean(sceneDefinition);
        if (elements.spotlightMedia) {
          elements.spotlightMedia.classList.remove("has-live-spine");
          elements.spotlightMedia.classList.toggle("has-static-visual", hasFallbackVisual && !sceneDefinition);
        }
      })
      .finally(() => {
        setMobileLoading("spine-preview", false);
      });
  }

  document.addEventListener("pointerdown", (event) => {
    if (!isMobileLayout() || event.pointerType === "mouse" || !(event.target instanceof Element)) {
      return;
    }
    const target = event.target.closest(MOBILE_PRESSABLE_SELECTOR);
    if (!target) return;
    clearMobilePressState(event.pointerId);
    target.classList.add("is-pressed");
    activePressTargetByPointerId.set(event.pointerId, target);
  }, { passive: true });

  document.addEventListener("pointermove", (event) => {
    const target = activePressTargetByPointerId.get(event.pointerId);
    if (!target) return;
    const hovered = document.elementFromPoint(event.clientX, event.clientY);
    const insideTarget = hovered instanceof Element && (hovered === target || target.contains(hovered));
    target.classList.toggle("is-pressed", insideTarget);
  }, { passive: true });

  document.addEventListener("pointerup", (event) => {
    clearMobilePressState(event.pointerId);
  }, { passive: true });

  document.addEventListener("pointercancel", (event) => {
    clearMobilePressState(event.pointerId);
  }, { passive: true });

  window.addEventListener("blur", clearAllMobilePressStates);

  if (elements.prevPet) {
    elements.prevPet.addEventListener("click", () => {
      stepCurrentItem(-1);
    });
  }

  if (elements.nextPet) {
    elements.nextPet.addEventListener("click", () => {
      stepCurrentItem(1);
    });
  }

  if (elements.mobileOpenDetail) {
    elements.mobileOpenDetail.addEventListener("click", () => {
      setMobileLoading("view-transition", true);
      setMobileView("detail");
      finishMobileLoadingSoon("view-transition");
    });
  }

  if (elements.mobileShowRail) {
    elements.mobileShowRail.addEventListener("click", () => {
      if (
        isMobileLayout()
        && state.mobileView === "detail"
        && isMobileViewerHistoryState(window.history.state)
        && window.history.state.mobileView === "detail"
        && window.history.length > 1
      ) {
        window.history.back();
        return;
      }
      setMobileView("rail");
    });
  }

  if (elements.mobilePrevPet) {
    elements.mobilePrevPet.addEventListener("click", () => {
      stepCurrentItem(-1);
    });
  }

  if (elements.mobileNextPet) {
    elements.mobileNextPet.addEventListener("click", () => {
      stepCurrentItem(1);
    });
  }

  if (elements.scheduleAdjustButton) {
    elements.scheduleAdjustButton.addEventListener("click", (event) => {
      if (isMobileLayout() && Date.now() < mobileScheduleTooltipSuppressClickUntil) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      openScheduleAdjustmentDialog({ preferredOptionId: preferredScheduleCalibrationOptionId() });
    });

    elements.scheduleAdjustButton.addEventListener("touchstart", () => {
      if (!isMobileLayout()) return;
      clearMobileScheduleTooltipTimers();
      mobileScheduleTooltipHoldTimer = window.setTimeout(() => {
        mobileScheduleTooltipHoldTimer = 0;
        mobileScheduleTooltipSuppressClickUntil = Date.now() + 900;
        showMobileScheduleAdjustTooltip();
      }, 420);
    }, { passive: true });

    const cancelScheduleAdjustLongPress = () => {
      if (!isMobileLayout()) return;
      if (mobileScheduleTooltipHoldTimer) {
        window.clearTimeout(mobileScheduleTooltipHoldTimer);
        mobileScheduleTooltipHoldTimer = 0;
      }
    };

    elements.scheduleAdjustButton.addEventListener("touchend", cancelScheduleAdjustLongPress, { passive: true });
    elements.scheduleAdjustButton.addEventListener("touchcancel", cancelScheduleAdjustLongPress, { passive: true });
  }

  if (elements.railPastToggle) {
    elements.railPastToggle.addEventListener("click", () => {
      state.showPastRailItems = !state.showPastRailItems;
      render();
    });
  }

  if (elements.scheduleAdjustSelect) {
    elements.scheduleAdjustSelect.addEventListener("change", updateScheduleAdjustmentPreview);
  }

  [elements.scheduleAdjustDays, elements.scheduleAdjustHours, elements.scheduleAdjustMinutes]
    .filter(Boolean)
    .forEach((input) => {
      input.addEventListener("focus", () => {
        input.select();
      });
      input.addEventListener("input", () => {
        updateScheduleAdjustmentPreview();
      });
      input.addEventListener("change", () => {
        updateScheduleAdjustmentPreview();
      });
      input.addEventListener("blur", () => {
        normalizeScheduleAdjustmentInputs();
      });
    });
  if (elements.scheduleAdjustManualDate) {
    elements.scheduleAdjustManualDate.addEventListener("input", updateScheduleAdjustmentPreview);
    elements.scheduleAdjustManualDate.addEventListener("change", updateScheduleAdjustmentPreview);
  }

  if (elements.scheduleAdjustConfirm) {
    elements.scheduleAdjustConfirm.addEventListener("click", applyScheduleAdjustment);
  }

  if (elements.scheduleAdjustReset) {
    elements.scheduleAdjustReset.addEventListener("click", resetScheduleAdjustment);
  }

  if (elements.scheduleAdjustCancel) {
    elements.scheduleAdjustCancel.addEventListener("click", () => {
      closeScheduleAdjustmentDialog(false);
    });
  }

  if (elements.scheduleAdjustClose) {
    elements.scheduleAdjustClose.addEventListener("click", () => {
      closeScheduleAdjustmentDialog(false);
    });
  }

  if (elements.scheduleAdjustBackdrop) {
    elements.scheduleAdjustBackdrop.addEventListener("click", () => {
      closeScheduleAdjustmentDialog(false);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.scheduleAdjustModal && !elements.scheduleAdjustModal.hidden) {
      closeScheduleAdjustmentDialog(false);
    }
  });

  window.addEventListener("resize", () => {
    requestSpineLayout();
    requestSceneLayout();
  });

  window.setInterval(() => {
    refreshScheduleStatuses(false);
  }, 60000);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refreshScheduleStatuses(false);
    }
  });

  if (typeof mobileViewportQuery.addEventListener === "function") {
    mobileViewportQuery.addEventListener("change", () => {
      syncMobileLayout(true);
      render();
    });
  } else if (typeof mobileViewportQuery.addListener === "function") {
    mobileViewportQuery.addListener(() => {
      syncMobileLayout(true);
      render();
    });
  }

  if (elements.sceneStageBack) {
    elements.sceneStageBack.addEventListener("load", requestSceneLayout);
  }

  window.addEventListener("popstate", (event) => {
    if (!isMobileLayout() || !isMobileViewerHistoryState(event.state)) {
      return;
    }
    if (!applyMobileViewerHistoryState(event.state)) {
      return;
    }
    syncMobileLayout(false);
    render();
  });

  injectExtraPetPlaceholders();
  applyEventRewardSchedulePatches();
  state.scheduleCalibration = loadScheduleCalibration();
  const initialSelection = findInitialSelection();
  state.activeCategoryKey = initialSelection.categoryKey;
  getCategories().forEach((category) => {
    state.selectedIndexByCategory[category.key] = findPreferredIndex(getItems(category));
  });
  state.selectedIndexByCategory[initialSelection.categoryKey] = initialSelection.index;
  if (state.activeCategoryKey === "pet") {
    const initialPet = getCurrentItem(getActiveCategory());
    if (initialPet) {
      state.activePetSubgroupKey = getPetSubgroupKeyForItem(initialPet);
    }
  }
  const restoredMobileHistory = isMobileLayout() && applyMobileViewerHistoryState(window.history.state);
  lastScheduleStatusTickKey = getTimeZoneDateTimeKey().slice(0, 16);
  syncMobileLayout(!restoredMobileHistory);
  render();
  if (shouldAutoOpenScheduleCalibration()) {
    openScheduleAdjustmentDialog({ preferredOptionId: preferredScheduleCalibrationOptionId() });
  }
})();
