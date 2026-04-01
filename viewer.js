(function () {
  const data = window.GACHA_PET_VIEWER_DATA;
  const spineManifest = Object.assign(
    {},
    window.GACHA_PET_SPINE_MANIFEST_INDEX || {},
    window.GACHA_PET_SPINE_MANIFEST || {},
    window.GACHA_PET_WEAPON_SPINE_MANIFEST || {},
  );
  const pageParams = new URLSearchParams(window.location.search);

  const elements = {
    appShell: document.getElementById("appShell"),
    petRail: document.getElementById("petRail"),
    stage: document.getElementById("stagePanel"),
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
    mobileView: "detail",
    mobileVariantScrollBySkillKey: {},
    mobileViewportScrollByView: { rail: 0, detail: 0 },
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
  const legacyManifestLoadPromises = new Map();
  const activeMobileLoadingTasks = new Set();
  const activePressTargetByPointerId = new Map();
  const MOBILE_PRESSABLE_SELECTOR = [
    ".collection-tab",
    ".pet-subfilter",
    ".pet-item",
    ".mobile-menu-toggle",
    ".mobile-inline-arrow",
    ".equipment-set-entry",
    ".mobile-skill-button",
    ".mobile-variant-chip",
    ".skill-button",
    ".variant-preview-entry",
  ].join(", ");
  const PLACEHOLDER_PET_ICON = "assets/pets/ss-pet-placeholder.svg";
  const PLACEHOLDER_PET_BANNER = "assets/banners/ss-pet-placeholder-banner.svg";
  const EXTRA_PET_DETAIL_META_LABEL = "기본 정보만 우선 수록";

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

  function dateKeyDayOfWeek(dateKey) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    if (!normalizedDateKey) return Number.NaN;
    const [year, month, day] = normalizedDateKey.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  }

  function alignDateKeyOnOrAfter(dateKey, targetDayOfWeek) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    if (!normalizedDateKey) return "";
    const currentDayOfWeek = dateKeyDayOfWeek(normalizedDateKey);
    if (!Number.isFinite(currentDayOfWeek)) return "";
    const dayOffset = (targetDayOfWeek - currentDayOfWeek + 7) % 7;
    return addDaysToDateKey(normalizedDateKey, dayOffset);
  }

  function alignDateKeyOnOrBefore(dateKey, targetDayOfWeek) {
    const normalizedDateKey = normalizeScheduleDateKey(dateKey);
    if (!normalizedDateKey) return "";
    const currentDayOfWeek = dateKeyDayOfWeek(normalizedDateKey);
    if (!Number.isFinite(currentDayOfWeek)) return "";
    const dayOffset = (currentDayOfWeek - targetDayOfWeek + 7) % 7;
    return addDaysToDateKey(normalizedDateKey, -dayOffset);
  }

  function syncCohortStartDateKey(serverOpenDateKey) {
    return alignDateKeyOnOrBefore(serverOpenDateKey, 2);
  }

  function syncCohortEndDateKey(serverOpenDateKey) {
    const cohortStartDateKey = syncCohortStartDateKey(serverOpenDateKey);
    return cohortStartDateKey ? addDaysToDateKey(cohortStartDateKey, 6) : "";
  }

  function normalizeScheduleRule(scheduleRule) {
    if (!scheduleRule || typeof scheduleRule !== "object") return null;
    const parsedTimeType = Number.parseInt(scheduleRule.timeType, 10);
    if (!Number.isFinite(parsedTimeType)) return null;

    const normalizedRule = { timeType: parsedTimeType };
    const parsedOpenDay = Number.parseInt(scheduleRule.openDay, 10);
    const parsedPeriod = Number.parseInt(scheduleRule.period, 10);
    const normalizedStart = normalizeScheduleDateKey(scheduleRule.start);
    const normalizedEnd = normalizeScheduleDateKey(scheduleRule.end);

    if (Number.isFinite(parsedOpenDay)) {
      normalizedRule.openDay = parsedOpenDay;
    }
    if (Number.isFinite(parsedPeriod)) {
      normalizedRule.period = Math.max(1, parsedPeriod);
    }
    if (normalizedStart) {
      normalizedRule.start = normalizedStart;
    }
    if (normalizedEnd) {
      normalizedRule.end = normalizedEnd;
    }
    return normalizedRule;
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
    const normalizedScheduleRule = normalizeScheduleRule(schedule?.scheduleRule);
    const normalizedServerOpenDateKey = dateTimeKeyToDateKey(normalizedServerOpenKey);

    let resolvedStartDateKey = "";
    let resolvedEndExclusiveDateKey = "";

    if (normalizedScheduleRule && normalizedServerOpenDateKey) {
      if (
        [2, 4, 8].includes(normalizedScheduleRule.timeType)
        && Number.isFinite(normalizedScheduleRule.openDay)
      ) {
        const dynamicBaselineDateKey = [4, 8].includes(normalizedScheduleRule.timeType)
          ? (syncCohortEndDateKey(normalizedServerOpenDateKey) || normalizedServerOpenDateKey)
          : normalizedServerOpenDateKey;
        const thresholdDateKey = addDaysToDateKey(dynamicBaselineDateKey, normalizedScheduleRule.openDay);
        if (normalizedScheduleRule.timeType === 2) {
          resolvedStartDateKey = thresholdDateKey;
        } else if (normalizedScheduleRule.timeType === 4) {
          resolvedStartDateKey = alignDateKeyOnOrAfter(thresholdDateKey, 2);
        } else if (normalizedScheduleRule.timeType === 8) {
          resolvedStartDateKey = alignDateKeyOnOrAfter(thresholdDateKey, 6);
        }
        if (resolvedStartDateKey) {
          resolvedEndExclusiveDateKey = addDaysToDateKey(
            resolvedStartDateKey,
            Math.max(1, normalizedScheduleRule.period || 1),
          );
        }
      } else if (
        [5, 9].includes(normalizedScheduleRule.timeType)
        && normalizedScheduleRule.start
        && normalizedScheduleRule.end
      ) {
        resolvedStartDateKey = normalizedScheduleRule.start;
        resolvedEndExclusiveDateKey = addDaysToDateKey(normalizedScheduleRule.end, 1);
      }
    }

    const resolvedStartDateTimeKey = resolvedStartDateKey
      ? dateKeyToDateTimeKey(resolvedStartDateKey, normalizedServerOpenKey)
      : (Number.isFinite(offsetInfo.startOffsetDays)
        ? addDaysToDateTimeKey(normalizedServerOpenKey, offsetInfo.startOffsetDays)
        : "");
    const fallbackEndExclusiveDateTimeKey = Number.isFinite(offsetInfo.endExclusiveOffsetDays)
      ? addDaysToDateTimeKey(normalizedServerOpenKey, offsetInfo.endExclusiveOffsetDays)
      : "";
    const resolvedEndExclusiveDateTimeKey = resolvedEndExclusiveDateKey
      ? dateKeyToDateTimeKey(resolvedEndExclusiveDateKey, normalizedServerOpenKey)
      : fallbackEndExclusiveDateTimeKey;

    resolvedStartDateKey = dateTimeKeyToDateKey(resolvedStartDateTimeKey);
    resolvedEndExclusiveDateKey = dateTimeKeyToDateKey(resolvedEndExclusiveDateTimeKey);
    const resolvedEndDateKey = resolvedEndExclusiveDateKey ? addDaysToDateKey(resolvedEndExclusiveDateKey, -1) : "";

    return {
      ...offsetInfo,
      scheduleRule: normalizedScheduleRule,
      fallbackStatus,
      resolvedStartDateTimeKey,
      resolvedEndExclusiveDateTimeKey,
      resolvedStartDateKey,
      resolvedEndDateKey,
      visible: resolvedEndExclusiveDateTimeKey
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
      }));
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
    if (![4, 8].includes(ruleTimeType) || !Number.isFinite(openDay) || !resolvedStartDateKey) {
      return null;
    }

    const targetDayOfWeek = ruleTimeType === 4 ? 2 : 6;
    const thresholdDayOfWeek = (1 + ((openDay % 7) + 7)) % 7;
    const alignmentDelta = (targetDayOfWeek - thresholdDayOfWeek + 7) % 7;
    const cohortEndDateKey = addDaysToDateKey(resolvedStartDateKey, -(openDay + alignmentDelta));
    const cohortStartDateKey = addDaysToDateKey(cohortEndDateKey, -6);
    if (!cohortStartDateKey || !cohortEndDateKey) {
      return null;
    }
    return {
      startDateKey: cohortStartDateKey,
      endDateKey: cohortEndDateKey,
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
    if (![4, 8].includes(ruleTimeType) || !Number.isFinite(durationDays) || durationDays <= 0) {
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
      serverOpenDateTimeKey: dateKeyToDateTimeKey(syncCohortRange.startDateKey, KR1_SERVER_OPEN_DATE_TIME_KEY),
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
        ? `동기화 일정이라 정확한 서버 오픈일은 확정하기 어렵지만, 남은 시간으로 같은 주차의 첫 오픈일 ${formatDisplayDateKey(syncCohortRange.startDateKey)} 부터 계산할 수 있습니다.`
        : "동기화 일정은 남은 시간 기준으로 같은 주차 첫 오픈일만 계산할 수 있습니다.");
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
          <strong>추정 첫 오픈일:</strong> ${escapeHtml(formatDisplayDateKey(syncCohortRange.startDateKey))}<br>
          <strong>추정 오픈 주차:</strong> ${escapeHtml(`${formatDisplayDateKey(syncCohortRange.startDateKey)} - ${formatDisplayDateKey(syncCohortRange.endDateKey)}`)}<br>
          <strong>안내:</strong> 남은 시간을 입력하면 같은 주차의 첫 오픈일을 기준으로 적용합니다.
        `;
      } else {
        elements.scheduleAdjustPreviewCopy.textContent = option && option.autoInferenceSupported === false
          ? "선택한 일정은 동기화 규칙입니다. 남은 시간을 입력하면 같은 주차의 첫 오픈일을 계산합니다."
          : "진행중 이벤트를 고르고 남은 시간을 입력하면 서버 오픈일을 계산합니다.";
      }
      if (elements.scheduleAdjustConfirm) {
        elements.scheduleAdjustConfirm.disabled = true;
      }
      return;
    }

    if (result.mode === "sync-first-open") {
      elements.scheduleAdjustPreviewCopy.innerHTML = `
        <strong>계산된 첫 오픈일:</strong> ${escapeHtml(formatDisplayDateTimeKey(result.serverOpenDateTimeKey))}<br>
        <strong>추정 오픈 주차:</strong> ${escapeHtml(`${formatDisplayDateKey(result.syncCohortRange.startDateKey)} - ${formatDisplayDateKey(result.syncCohortRange.endDateKey)}`)}<br>
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
        state.mobileView = "rail";
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
  });
  const RIDE_OWNED_EFFECT_STATE_META = Object.freeze({
    "1101": Object.freeze({ badge: "HP", label: "\uCCB4\uB825(%)" }),
    "1103": Object.freeze({ badge: "DEF", label: "\uBC29\uC5B4\uB825(%)" }),
    "1107": Object.freeze({ badge: "EVA", label: "\uD68C\uD53C(%)" }),
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
  });
  const WEAPON_OWNED_EFFECT_WEIGHTS_BY_TIER = Object.freeze({
    "4": Object.freeze({
      "0": Object.freeze({ "1101": 0.2, "1102": 0.1, "1103": 0.2, "1106": 0.1, "1107": 0.1, "1109": 0 }),
      "1": Object.freeze({ "1101": 0.3, "1102": 0.15, "1103": 0.3, "1106": 0.15, "1107": 0.15, "1109": 0.025 }),
      "2": Object.freeze({ "1101": 0.4, "1102": 0.2, "1103": 0.4, "1106": 0.2, "1107": 0.2, "1109": 0.05 }),
      "3": Object.freeze({ "1101": 0.5, "1102": 0.25, "1103": 0.5, "1106": 0.25, "1107": 0.25, "1109": 0.075 }),
      "4": Object.freeze({ "1101": 0.6, "1102": 0.3, "1103": 0.6, "1106": 0.3, "1107": 0.3, "1109": 0.1 }),
      "5": Object.freeze({ "1101": 0.8, "1102": 0.4, "1103": 0.8, "1106": 0.4, "1107": 0.4, "1109": 0.125 }),
      "6": Object.freeze({ "1101": 0.9, "1102": 0.45, "1103": 0.9, "1106": 0.45, "1107": 0.45, "1109": 0.15 }),
      "7": Object.freeze({ "1101": 1, "1102": 0.5, "1103": 1, "1106": 0.5, "1107": 0.5, "1109": 0.175 }),
      "8": Object.freeze({ "1101": 1.1, "1102": 0.55, "1103": 1.1, "1106": 0.55, "1107": 0.55, "1109": 0.2 }),
      "9": Object.freeze({ "1101": 1.2, "1102": 0.6, "1103": 1.2, "1106": 0.6, "1107": 0.6, "1109": 0.225 }),
      "10": Object.freeze({ "1101": 1.4, "1102": 0.7, "1103": 1.4, "1106": 0.7, "1107": 0.7, "1109": 0.25 }),
    }),
    "5": Object.freeze({
      "0": Object.freeze({ "1101": 1.2, "1102": 0.6, "1103": 1.2, "1106": 0.6, "1107": 0.6, "1109": 0.08 }),
      "1": Object.freeze({ "1101": 2, "1102": 1, "1103": 2, "1106": 1, "1107": 1, "1109": 0.085 }),
      "2": Object.freeze({ "1101": 2.6, "1102": 1.3, "1103": 2.6, "1106": 1.3, "1107": 1.3, "1109": 0.09 }),
      "3": Object.freeze({ "1101": 3.2, "1102": 1.6, "1103": 3.2, "1106": 1.6, "1107": 1.6, "1109": 0.095 }),
      "4": Object.freeze({ "1101": 3.6, "1102": 1.8, "1103": 3.6, "1106": 1.8, "1107": 1.8, "1109": 0.1 }),
      "5": Object.freeze({ "1101": 4.6, "1102": 2.3, "1103": 4.6, "1106": 2.3, "1107": 2.3, "1109": 0.105 }),
      "6": Object.freeze({ "1101": 5.4, "1102": 2.7, "1103": 5.4, "1106": 2.7, "1107": 2.7, "1109": 0.11 }),
      "7": Object.freeze({ "1101": 6, "1102": 3, "1103": 6, "1106": 3, "1107": 3, "1109": 0.115 }),
      "8": Object.freeze({ "1101": 6.6, "1102": 3.3, "1103": 6.6, "1106": 3.3, "1107": 3.3, "1109": 0.12 }),
      "9": Object.freeze({ "1101": 7, "1102": 3.5, "1103": 7, "1106": 3.5, "1107": 3.5, "1109": 0.125 }),
      "10": Object.freeze({ "1101": 8, "1102": 4, "1103": 8, "1106": 4, "1107": 4, "1109": 0.13 }),
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
  });
  const RIDE_OWNED_EFFECT_WEIGHTS_BY_TIER = Object.freeze({
    "5": Object.freeze({
      "0": Object.freeze({ "1101": 1.2, "1102": 0.6, "1103": 1.2, "1106": 0.6, "1107": 0.6, "1109": 0.005 }),
      "1": Object.freeze({ "1101": 2, "1102": 1, "1103": 2, "1106": 1, "1107": 1, "1109": 0.013 }),
      "2": Object.freeze({ "1101": 2.6, "1102": 1.3, "1103": 2.6, "1106": 1.3, "1107": 1.3, "1109": 0.026 }),
      "3": Object.freeze({ "1101": 3.2, "1102": 1.6, "1103": 3.2, "1106": 1.6, "1107": 1.6, "1109": 0.039 }),
      "4": Object.freeze({ "1101": 3.6, "1102": 1.8, "1103": 3.6, "1106": 1.8, "1107": 1.8, "1109": 0.052 }),
      "5": Object.freeze({ "1101": 4.6, "1102": 2.3, "1103": 4.6, "1106": 2.3, "1107": 2.3, "1109": 0.065 }),
      "6": Object.freeze({ "1101": 5.4, "1102": 2.7, "1103": 5.4, "1106": 2.7, "1107": 2.7, "1109": 0.078 }),
      "7": Object.freeze({ "1101": 6, "1102": 3, "1103": 6, "1106": 3, "1107": 3, "1109": 0.091 }),
      "8": Object.freeze({ "1101": 6.6, "1102": 3.3, "1103": 6.6, "1106": 3.3, "1107": 3.3, "1109": 0.104 }),
      "9": Object.freeze({ "1101": 7, "1102": 3.5, "1103": 7, "1106": 3.5, "1107": 3.5, "1109": 0.117 }),
      "10": Object.freeze({ "1101": 8, "1102": 4, "1103": 8, "1106": 4, "1107": 4, "1109": 0.13 }),
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
  });
  const DEFAULT_WEAPON_EQUIPMENT_SET_KEY_BY_ID = Object.freeze({
    "220000007": "woodland-warrior",
    "220000008": "quiet-lotus",
    "220000009": "woodland-warrior",
    "220000010": "quiet-lotus",
    "220000011": "woodland-warrior",
    "220000012": "quiet-lotus",
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

  const assetVersion = encodeURIComponent(String(window.GACHA_VIEWER_ASSET_VERSION || "20260318-app-01"));
  const ELEMENT_ICON_BY_KEY = {
    leaf: "assets/ui/HeroType04.png",
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
    "\uB290\uB9BC": "assets/ui/SpeedType01.png",
    "\uBCF4\uD1B5": "assets/ui/SpeedType03.png",
  };
  const SKILL_TEXT_PLACEHOLDER_OVERRIDES = new Map([
    ["1107901:\uC21C\uD48D \uAC00\uB974\uAE30:2", "\uBC14\uB78C \uC18D\uC131"],
    ["1103901:\uBC29\uC6B8\uAC10\uC625:2", "\uBB3C \uC18D\uC131"],
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
        variant.rawDesc = replaceLucySeaSpearCopy(variant.rawDesc);
        variant.formattedDesc = replaceLucySeaSpearCopy(variant.formattedDesc);
        if (seaSpearFamily) {
          variant.upgradeDescFormatted = replaceLucySeaSpearUpgradeCopy(variant.upgradeDescFormatted);
        }
      });
    });
  }

  function attachEntitySkillContext(entity) {
    if (!entity || !Array.isArray(entity.skills)) return;
    const baseContext = {
      characterId: String(entity.characterId || entity.viewerId || entity.id || ""),
      entityName: String(entity.name || entity.title || ""),
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
        patchEntitySkillTexts(item);
        attachEntitySkillContext(item);
      });
    });
    (Array.isArray(window.GACHA_VIEWER_EXTRA_PETS) ? window.GACHA_VIEWER_EXTRA_PETS : []).forEach((item) => {
      patchEntitySkillTexts(item);
      attachEntitySkillContext(item);
    });
  }

  applyRuntimeSkillTextPatches();

  function buildExtraPetPlaceholder(config) {
    const enrichment = EXTRA_PET_ENRICHMENTS.get(String(config.characterId || "")) || {};
    const detailMetaLabel = String(
      enrichment.detailMetaLabel
      || config.detailMetaLabel
      || config.description
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
    const resolvedGachaIconImage = isExtraPetPlaceholderAsset(enrichment.gachaIconImage)
      ? (resolvedHeroIconImage || derivedHeroIconImage)
      : enrichment.gachaIconImage;
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
      elementKey: config.elementKey || "",
      attackTypeKey: config.attackTypeKey || "",
      order: config.order,
      skills: Array.isArray(enrichment.skills) ? enrichment.skills : [],
      schedules: [],
      scheduleTitleOverride: "획득 정보",
      statusLabel: config.statusLabel,
      statusSummary: config.statusSummary,
      statusTone: config.statusTone || "upcoming",
      acquisitionEntries: Array.isArray(config.acquisitionEntries)
        ? config.acquisitionEntries
        : [],
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
      elementKey: "leaf",
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
      elementKey: "leaf",
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
    // buildExtraPetPlaceholder({
    //   order: 24,
    //   characterId: "1100201",
    //   name: "극호",
    //   title: "산군의 위엄",
    //   description: "미확인/숨김 SS 펫",
    //   attackTypeKey: "melee",
    //   statusLabel: "미확인",
    //   statusSummary: "미확인 또는 숨김 처리된 SS 펫입니다.",
    //   statusTone: "past",
    // }),
    // buildExtraPetPlaceholder({
    //   order: 25,
    //   characterId: "1112401",
    //   name: "킹우리",
    //   title: "꼬마 돼지들의 왕",
    //   description: "미확인/숨김 SS 펫",
    //   attackTypeKey: "support",
    //   statusLabel: "미확인",
    //   statusSummary: "미확인 또는 숨김 처리된 SS 펫입니다.",
    //   statusTone: "past",
    // }),
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

  function getActiveCategory() {
    const categories = getCategories();
    return categories.find((category) => category.key === state.activeCategoryKey) || categories[0];
  }

  function getItems(category = getActiveCategory()) {
    const items = Array.isArray(category?.items) ? category.items : [];
    if (category?.key !== "weapon") {
      return items;
    }
    return [...items].sort((left, right) => {
      const leftRank = WEAPON_DISPLAY_ORDER_BY_ID[getEntityId(left)] || Number.MAX_SAFE_INTEGER;
      const rightRank = WEAPON_DISPLAY_ORDER_BY_ID[getEntityId(right)] || Number.MAX_SAFE_INTEGER;
      if (leftRank !== rightRank) return leftRank - rightRank;
      return String(left?.name || "").localeCompare(String(right?.name || ""), "ko");
    });
  }

  function displayOrderValue(category, pet) {
    if (category?.key === "weapon") {
      return WEAPON_DISPLAY_ORDER_BY_ID[getEntityId(pet)] || pet.order || 0;
    }
    return pet.order || 0;
  }

  function getEntityId(pet) {
    return String(pet?.viewerId || pet?.characterId || pet?.weaponId || pet?.id || pet?.name || "");
  }

  function getPetSubgroupKeyForItem(pet) {
    return CONTENT_SHOP_PET_IDS.has(getEntityId(pet)) ? "content" : "gacha";
  }

  function getDisplayItems(category = getActiveCategory(), petSubgroupKey = state.activePetSubgroupKey) {
    const items = getItems(category);
    if (category?.key !== "pet") {
      return items;
    }
    const filteredItems = items.filter((item) => getPetSubgroupKeyForItem(item) === petSubgroupKey);
    return filteredItems.length ? filteredItems : items;
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
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
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
    if (/^assets\/pets\/[^/]+-portrait\.png$/i.test(normalizedPath)) {
      return normalizedPath.replace(/\.png$/i, ".webp");
    }
    if (/^assets\/backgrounds\/weapons\/[^/]+\.png$/i.test(normalizedPath)) {
      return normalizedPath.replace(/\.png$/i, ".webp");
    }
    if (/^assets\/backgrounds\/hero_info_full\/HeroInfo_Background_Type_[^/]+\.png$/i.test(normalizedPath)) {
      return normalizedPath.replace(/\.png$/i, ".webp");
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
      window.GACHA_PET_PICKUP_SPINE_MANIFEST,
      window.GACHA_PET_WEAPON_SPINE_MANIFEST,
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
    if (baseEntry && baseEntry.atlasText && baseEntry.skeletonBase64) {
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

  function legacyManifestSrcForEntry(manifestMeta) {
    if (!manifestMeta) return "";
    if (manifestMeta.assetKind === "weapon") {
      return "spine_manifest_weapon.js";
    }
    if (manifestMeta.assetKind === "pickup") {
      return "pet_pickup_spine_manifest.js";
    }
    return "spine_manifest.js";
  }

  function ensureLegacyManifestLoaded(entityId, manifestMeta) {
    const entryId = String(entityId || "");
    if (!entryId || !manifestMeta) {
      return Promise.resolve(getLoadedManifestEntry(entryId));
    }

    const src = legacyManifestSrcForEntry(manifestMeta);
    if (!src) {
      return Promise.resolve(getLoadedManifestEntry(entryId));
    }

    const promiseKey = `${manifestMeta.assetKind || "unknown"}:${src}`;
    const pendingLoad = legacyManifestLoadPromises.get(promiseKey);
    if (pendingLoad) {
      return pendingLoad.then(() => getLoadedManifestEntry(entryId));
    }

    const loadPromise = loadRuntimeScript(assetUrl(src))
      .catch((error) => {
        legacyManifestLoadPromises.delete(promiseKey);
        throw error;
      });

    legacyManifestLoadPromises.set(promiseKey, loadPromise);
    return loadPromise.then(() => getLoadedManifestEntry(entryId));
  }

  function ensureManifestEntryLoaded(entityId) {
    const entryId = String(entityId || "");
    if (!entryId) {
      return Promise.resolve(null);
    }

    const loadedEntry = getLoadedManifestEntry(entryId);
    if (loadedEntry && loadedEntry.atlasText && loadedEntry.skeletonBase64) {
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
        if (!nextEntry || !nextEntry.atlasText || !nextEntry.skeletonBase64) {
          throw new Error(`Spine manifest chunk missing data: ${entryId}`);
        }
        return nextEntry;
      })
      .catch(() => ensureLegacyManifestLoaded(entryId, manifestMeta))
      .then((nextEntry) => {
        if (!nextEntry || !nextEntry.atlasText || !nextEntry.skeletonBase64) {
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
          /idle[_ -]?big/i,
          /^idle$/i,
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

  function isFileProtocol() {
    return window.location.protocol === "file:";
  }

  function normalizeAtlasPageName(pageName) {
    return String(pageName || "").replace(/\\/g, "/").replace(/^.*\//, "");
  }

  function resolveManifestTextureSource(manifestEntry, pageName) {
    const normalizedPageName = normalizeAtlasPageName(pageName);
    const preferEmbedded = isFileProtocol();
    const textureDataUris = manifestEntry && manifestEntry.textureDataUris;
    const textureFiles = manifestEntry && manifestEntry.textureFiles;

    const lookupValue = (valueSet) => {
      if (!valueSet) return "";
      if (typeof valueSet === "string") {
        return valueSet;
      }
      if (Array.isArray(valueSet)) {
        if (Array.isArray(textureFiles) && textureFiles.length === valueSet.length) {
          const matchedIndex = textureFiles.findIndex((filePath) => normalizeAtlasPageName(filePath) === normalizedPageName);
          if (matchedIndex >= 0) {
            return valueSet[matchedIndex] || "";
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

    if (preferEmbedded) {
      const embedded = lookupValue(textureDataUris) || manifestEntry.textureDataUri || "";
      if (embedded) {
        return embedded;
      }
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
    const rect = elements.spinePreview.getBoundingClientRect();
    const width = Math.max(2, Math.floor(rect.width || elements.spinePreview.clientWidth || 0));
    const height = Math.max(2, Math.floor(rect.height || elements.spinePreview.clientHeight || 0));
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

    return new Promise((resolve, reject) => {
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
        manifestEntry.atlasText,
        (pageName, callback) => {
          const resolvedTextureUrl = resolveManifestTextureSource(manifestEntry, pageName) || textureUrl;
          const baseTexture = window.PIXI.BaseTexture.from(resolvedTextureUrl);
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
            callback(null);
            finishReject(error instanceof Error ? error : new Error(`Texture load failed: ${resolvedTextureUrl}`));
          };

          baseTexture.once("loaded", onLoaded);
          baseTexture.once("error", onError);
        },
        (atlas) => {
          if (!atlas) {
            finishReject(new Error(`Atlas parse failed: ${manifestEntry.assetName || textureUrl || "unknown atlas"}`));
            return;
          }
          finishResolve(atlas);
        },
      );
    });
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

    const previewWidth = Math.max(480, elements.spinePreview.clientWidth || 0);
    const previewHeight = Math.max(240, elements.spinePreview.clientHeight || 0);
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
    const binary = new spineApi.SkeletonBinary(attachmentLoader);
    const skeletonData = binary.readSkeletonData(decodeBase64ToBytes(manifestEntry.skeletonBase64));
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
    const preferredTemplate = rawTemplate && !hasBrokenGeneratedText(rawTemplate)
      ? rawTemplate
      : formattedTemplate;
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

  function normalizedSkillKind(skill) {
    const raw = String(skill?.slotLabel || "").trim();
    const firstSkillType = String(skill?.variants?.[0]?.skillType || "");
    if (/오오라\s*스킬|오라\s*스킬/i.test(raw)) {
      return "aura";
    }
    if (skill?.slotType === "Basic" || skill?.tone === "basic" || Number(skill?.slotIndex) === 0) {
      return "basic";
    }
    if (firstSkillType === "7") {
      return "aura";
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
    const raw = String(variant?.stageLabel || "").trim();
    if (raw && !hasBrokenGeneratedText(raw)) {
      return raw;
    }
    const tier = Number(variant?.frameTier || variant?.groupTier || 0);
    const grade = Number(variant?.groupGrade || 0);
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
    const resolvedStartDateKey = dateTimeKeyToDateKey(startDateTimeKey);
    const resolvedEndExclusiveDateKey = dateTimeKeyToDateKey(endExclusiveDateTimeKey);
    const startKey = resolvedStartDateKey || normalizeScheduleDateKey(start);
    const endKey = resolvedEndExclusiveDateKey || addDaysToDateKey(normalizeScheduleDateKey(end), 1);
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

  function inferSkillRangeValue(pet, skill, variant) {
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
    const currentIndex = items.findIndex((item) => getResolvedSchedules(item, currentDateTimeKey).some((schedule) => schedule.resolvedStatus === "current"));
    if (currentIndex >= 0) return currentIndex;
    const upcomingIndex = items.findIndex((item) => getResolvedSchedules(item, currentDateTimeKey).some((schedule) => schedule.resolvedStatus === "upcoming"));
    return upcomingIndex >= 0 ? upcomingIndex : 0;
  }

  function findInitialSelection() {
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

  function selectedWeaponOwnedEffectVariant(pet) {
    const selectedSkill = getSelectedSkill(pet);
    return selectedSkill ? getSelectedVariant(pet, selectedSkill).data : null;
  }

  function weaponOwnedEffectStats(pet) {
    const variant = selectedWeaponOwnedEffectVariant(pet);
    const tier = Number((variant && (variant.frameTier || variant.groupTier)) || 0);
    const grade = Number((variant && variant.groupGrade) || 0);
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
        value: formatOwnedEffectPercent(value * weight * 100),
      };
    }).filter(Boolean);
  }

  function selectedRideOwnedEffectVariant(pet) {
    const selectedSkill = getSelectedSkill(pet);
    return selectedSkill ? getSelectedVariant(pet, selectedSkill).data : null;
  }

  function rideOwnedEffectStats(pet) {
    const variant = selectedRideOwnedEffectVariant(pet);
    const tier = Number((variant && (variant.frameTier || variant.groupTier)) || 0);
    const grade = Number((variant && variant.groupGrade) || 0);
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
        value: formatOwnedEffectPercent(value * weight * 100),
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
    const byAttackType = {
      melee: "느림",
      defence: "느림",
      ranged: "보통",
      support: "보통",
    };
    return byAttackType[pet.attackTypeKey] || "";
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

  function displayElementLabel(key) {
    switch (key) {
      case "fire":
        return "\uBD88";
      case "water":
        return "\uBB3C";
      case "wind":
        return "\uBC14\uB78C";
      case "leaf":
        return "\uB545";
      default:
        return "";
    }
  }

  function displayAttackSpeedLabel(pet) {
    if (pet.attackSpeedLabel) {
      return pet.attackSpeedLabel;
    }
    const byAttackType = {
      melee: "\uB290\uB9BC",
      defence: "\uB290\uB9BC",
      ranged: "\uBCF4\uD1B5",
      support: "\uBCF4\uD1B5",
    };
    return byAttackType[pet.attackTypeKey] || "";
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
    if (Number(variant.frameTier || variant.groupTier || 0) >= 5) {
      return "assets/ui/stage_frame_sss.png";
    }
    return "assets/ui/stage_frame_ss.png";
  }

  function spotlightGradeBadgeAsset(variant) {
    return Number(variant.frameTier || variant.groupTier || 0) >= 5
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
    return pet.portraitImage || pet.bannerImage || pet.heroIconImage || "";
  }

  function stageStarsMarkup(variant) {
    const grade = Number(variant.groupGrade || 0);
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
      const resolvedElementLabel = displayElementLabel(pet.elementKey);
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
        <span class="portrait-owned-effect-badge">${escapeHtml(entry.badge || "")}</span>
        <strong class="portrait-owned-effect-label">${escapeHtml(entry.label || "-")}</strong>
        <span class="portrait-owned-effect-value">${escapeHtml(entry.value || "-")}</span>
      `;
      elements.portraitOwnedEffectList.appendChild(row);
    });
  }

  function renderCollectionTabs() {
    if (!elements.collectionTabs) return;
    const activeCategory = getActiveCategory();
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
      button.textContent = subgroup.label;
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

  function renderPetList() {
    const category = getActiveCategory();
    const allItems = getItems(category);
    const items = getDisplayItems(category);
    const currentIndex = getCurrentIndex(category);
    renderRailHeader(category);
    renderPetSubfilters(category);
    elements.petList.innerHTML = "";

    items.forEach((pet) => {
      const actualIndex = allItems.findIndex((item) => getEntityId(item) === getEntityId(pet));
      const status = getPetStatus(pet);
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
        <span class="pet-item-order ${escapeHtml(status.tone || "past")}">${escapeHtml(status.label)}</span>
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

    if (!schedules.length) {
      if (acquisitionEntries.length) {
        acquisitionEntries.slice(0, 6).forEach((entry) => {
          const block = document.createElement("div");
          const toneClass = String(entry.tone || "").trim();
          block.className = `schedule-item acquisition-item${toneClass ? ` acquisition-${toneClass}` : ""}`;
          block.innerHTML = `<strong>${escapeHtml(String(entry.title || "").trim())}</strong><span>${escapeHtml(String(entry.summary || "").trim())}</span>`;
          elements.scheduleList.appendChild(block);
        });
        return;
      }
      const summary = pet.statusSummary || "등록된 일정이 없습니다.";
      elements.scheduleList.innerHTML = `<div class='schedule-item'><span>${escapeHtml(summary)}</span></div>`;
      return;
    }

    const currentDateTimeKey = getTimeZoneDateTimeKey();
    schedules.slice(0, 6).forEach((item) => {
      const statusMeta = resolveScheduleToneMeta(item, currentDateTimeKey);
      const block = document.createElement("div");
      block.className = `schedule-item ${statusMeta.tone}`;
      block.innerHTML = `<strong>${escapeHtml(formatScheduleDisplayRange(item.start, item.end, item.resolvedStartDateTimeKey, item.resolvedEndExclusiveDateTimeKey))}</strong><span>${escapeHtml(statusMeta.scheduleLabel)}</span>`;
      elements.scheduleList.appendChild(block);
    });
  }

  function renderHero(pet) {
    const category = getActiveCategory();
    const status = getPetStatus(pet);
    const backdropImage = pet.kind === "ride"
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
    elements.petDesc.textContent = pet.description || "";
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
    elements.focusSkillDesc.innerHTML = richTextToHtml(buildSkillDescription(variant));
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
          <div class="skill-desc mobile-skill-desc-body">${richTextToHtml(buildSkillDescription(variant))}</div>
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
  }

  function render() {
    syncMobileLayout();
    syncPetSubgroupSelection();
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
  }

  function refreshScheduleStatuses(force = false) {
    const nextTickKey = getTimeZoneDateTimeKey().slice(0, 16);
    if (!force && nextTickKey === lastScheduleStatusTickKey) {
      return;
    }
    lastScheduleStatusTickKey = nextTickKey;
    render();
  }

  function renderSpotlightMedia(pet) {
    const entityId = getEntityId(pet);
    const manifestEntry = getManifestEntry(entityId);
    const hasHeroScene = Boolean(
      pet.kind === "pet"
      && manifestEntry
      && (manifestEntry.assetKind === "hero" || manifestEntry.assetKind === "pickup")
    );
    const sceneDefinition = hasHeroScene ? heroInfoSceneDefinition(pet.elementKey || "water") : null;
    const rideBannerBackground = rideBannerBackgroundAsset(pet);
    const weaponBannerBackground = weaponBannerBackgroundAsset(pet);
    const mediaBackground = sceneDefinition
      ? sceneDefinition.background
      : (pet.kind === "ride"
        ? (rideBannerBackground || rideDisplayImage(pet))
        : (pet.kind === "weapon"
          ? (weaponBannerBackground || pet.backdropImage || pet.bannerImage || pet.portraitImage || pet.heroIconImage)
          : (pet.backdropImage || pet.bannerImage || pet.portraitImage || pet.heroIconImage)));
    const mediaBanner = pet.kind === "ride"
      ? ""
      : (pet.bannerImage || pet.portraitImage || pet.heroIconImage);
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

    setMobileLoading("spine-preview", true);
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
        console.warn(`Spine preview failed for ${entityId}.`, error);
        destroySpinePreview();
        spineState.mode = "fallback";
        elements.bannerImage.hidden = !Boolean(mediaBanner) || Boolean(sceneDefinition);
        if (elements.spotlightMedia) {
          elements.spotlightMedia.classList.remove("has-live-spine");
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

  injectExtraPetPlaceholders();
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
  lastScheduleStatusTickKey = getTimeZoneDateTimeKey().slice(0, 16);
  syncMobileLayout(true);
  render();
  if (shouldAutoOpenScheduleCalibration()) {
    openScheduleAdjustmentDialog({ preferredOptionId: preferredScheduleCalibrationOptionId() });
  }
})();
