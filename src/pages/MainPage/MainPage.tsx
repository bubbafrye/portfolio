import { useCallback, useEffect, useReducer, useRef, useState, lazy, Suspense } from "react";
import { A11yCaseStudy } from "../../components/A11yCaseStudy";
import { BlastCaseStudy } from "../../components/BlastCaseStudy";
import { CaseStudyTile } from "../../components/CaseStudyTile";
import { CaseStudyTileRow } from "../../components/CaseStudyTileRow";
import { CsDragDrop } from "../../components/CsDragDrop";
import { CsKeyboardNav } from "../../components/CsKeyboardNav";
import { HomeModule, type HomeTarget, type HomeVariant } from "../../components/HomeModule";
import { ParkCaseStudy } from "../../components/ParkCaseStudy";
import { TeamCaseStudy } from "../../components/TeamCaseStudy";
import { TlDr } from "../../components/TlDr";
import { ToolsCaseStudy } from "../../components/ToolsCaseStudy";
import { PROJECT_TILES, TEAMS_TOOLS_TILES } from "../../content/caseStudyTiles";
import { TL_DR_LINKS } from "../../content/tlDrLinks";
import {
  hashForOpenState,
  parseDeepLinkHash,
  readLocationHash,
  writeLocationHash,
  type CaseStudyHashId,
  type CsHashId,
} from "../../utils/deepLinkHash";
import {
  PANEL_SCROLL_TOP_OFFSET_PX,
  scrollElementToOffset,
  scrollElementToTop,
} from "../../utils/scrollToElement";
import styles from "./MainPage.module.css";

const ResumeModule = lazy(() =>
  import("../../components/ResumeModule").then((module) => ({ default: module.ResumeModule })),
);

type CaseStudyId = CaseStudyHashId;
type CsPanelId = CsHashId;

const PROJECT_IDS = ["a11y", "park", "blast"] as const satisfies readonly CaseStudyId[];
const TEAMS_TOOLS_IDS = ["team", "tools"] as const satisfies readonly CaseStudyId[];

type AccordionState<T extends string> = {
  openId: T | null;
  collapsingId: T | null;
  pendingId: T | null;
  deferExpandId: T | null;
};

type AccordionAction<T extends string> =
  | { type: "toggle"; id: T }
  | { type: "open"; id: T }
  | { type: "collapseComplete"; id: T }
  | { type: "expandComplete" }
  | { type: "closeAll" };

function accordionReducer<T extends string>(
  state: AccordionState<T>,
  action: AccordionAction<T>,
  sameGroup: (a: T, b: T) => boolean = () => true,
): AccordionState<T> {
  switch (action.type) {
    case "toggle": {
      const { id } = action;
      if (state.openId === id) {
        return { ...state, pendingId: null, collapsingId: id, deferExpandId: null };
      }
      if (state.openId) {
        return { ...state, pendingId: id, collapsingId: state.openId, deferExpandId: null };
      }
      if (state.collapsingId) {
        return { ...state, pendingId: id };
      }
      return { openId: id, collapsingId: null, pendingId: null, deferExpandId: id };
    }
    case "open": {
      const { id } = action;
      if (state.openId === id && !state.collapsingId) {
        return state.pendingId ? { ...state, pendingId: null } : state;
      }
      if (state.openId) {
        return { ...state, pendingId: id, collapsingId: state.openId, deferExpandId: null };
      }
      if (state.collapsingId) {
        return { ...state, pendingId: id };
      }
      return { openId: id, collapsingId: null, pendingId: null, deferExpandId: id };
    }
    case "collapseComplete": {
      if (state.collapsingId !== action.id) return state;
      if (!state.pendingId) {
        return { openId: null, collapsingId: null, pendingId: null, deferExpandId: null };
      }
      const inPlaceSwap = sameGroup(state.collapsingId, state.pendingId);
      return {
        openId: state.pendingId,
        collapsingId: null,
        pendingId: null,
        deferExpandId: inPlaceSwap ? null : state.pendingId,
      };
    }
    case "expandComplete":
      return state.deferExpandId ? { ...state, deferExpandId: null } : state;
    case "closeAll":
      return { openId: null, collapsingId: null, pendingId: null, deferExpandId: null };
    default:
      return state;
  }
}

function isInGroup<T extends string>(id: T | null, group: readonly T[]) {
  return id !== null && group.includes(id);
}

function isCaseStudyInGroup(id: CaseStudyId, group: readonly CaseStudyId[]) {
  return group.includes(id);
}

function isSamePanelGroup(a: CaseStudyId, b: CaseStudyId) {
  return (
    (isInGroup(a, PROJECT_IDS) && isInGroup(b, PROJECT_IDS)) ||
    (isInGroup(a, TEAMS_TOOLS_IDS) && isInGroup(b, TEAMS_TOOLS_IDS))
  );
}

function isTileSelected(
  id: CaseStudyId,
  openId: CaseStudyId | null,
  collapsingId: CaseStudyId | null,
  pendingId: CaseStudyId | null,
) {
  return (openId === id && collapsingId !== id) || pendingId === id;
}

function isCsLinkSelected(
  id: CsPanelId,
  openId: CsPanelId | null,
  collapsingId: CsPanelId | null,
  pendingId: CsPanelId | null,
) {
  return (openId === id && collapsingId !== id) || pendingId === id;
}

function getInitialAccordionState(): AccordionState<CaseStudyId> {
  const target = parseDeepLinkHash();
  if (target.type === "case-study") {
    return {
      openId: target.id,
      collapsingId: null,
      pendingId: null,
      deferExpandId: target.id,
    };
  }
  return {
    openId: null,
    collapsingId: null,
    pendingId: null,
    deferExpandId: null,
  };
}

function getInitialCsAccordionState(): AccordionState<CsPanelId> {
  const target = parseDeepLinkHash();
  if (target.type === "cs-panel") {
    return {
      openId: target.id,
      collapsingId: null,
      pendingId: null,
      deferExpandId: target.id,
    };
  }
  return {
    openId: null,
    collapsingId: null,
    pendingId: null,
    deferExpandId: null,
  };
}

function getInitialResumeOpen() {
  return parseDeepLinkHash().type === "resume";
}

/** Figma main-page — node 1367:1526 */
export function MainPage() {
  const [homeVariant, setHomeVariant] = useState<HomeVariant>("full");
  const [resumeOpen, setResumeOpen] = useState(getInitialResumeOpen);
  const [{ openId, collapsingId, pendingId, deferExpandId }, dispatch] = useReducer(
    (state: AccordionState<CaseStudyId>, action: AccordionAction<CaseStudyId>) =>
      accordionReducer(state, action, isSamePanelGroup),
    undefined,
    getInitialAccordionState,
  );
  const [
    {
      openId: csOpenId,
      collapsingId: csCollapsingId,
      pendingId: csPendingId,
      deferExpandId: csDeferExpandId,
    },
    csDispatch,
  ] = useReducer(
    (state: AccordionState<CsPanelId>, action: AccordionAction<CsPanelId>) =>
      accordionReducer(state, action),
    undefined,
    getInitialCsAccordionState,
  );
  const projectsRowRef = useRef<HTMLDivElement>(null);
  const projectsPanelRef = useRef<HTMLDivElement>(null);
  const csPanelRef = useRef<HTMLDivElement>(null);
  const tlDrRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const teamsToolsRowRef = useRef<HTMLDivElement>(null);
  const teamsToolsPanelRef = useRef<HTMLDivElement>(null);
  /** Skip the next state→hash write (initial load or URL-driven apply). */
  const skipNextHashWriteRef = useRef(Boolean(readLocationHash()));

  const handleCsCollapseComplete = useCallback((id: CsPanelId) => {
    csDispatch({ type: "collapseComplete", id });
  }, []);

  const handleCsToggle = useCallback((id: CsPanelId) => {
    csDispatch({ type: "toggle", id });
  }, []);

  const scrollCsPanelIntoView = useCallback(() => {
    const panel = csPanelRef.current ?? tlDrRef.current;
    if (!panel) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollElementToOffset(panel, PANEL_SCROLL_TOP_OFFSET_PX);
      });
    });
  }, []);

  const scrollTlDrIntoView = useCallback(() => {
    if (tlDrRef.current) scrollElementToTop(tlDrRef.current);
  }, []);

  const handleCollapseComplete = useCallback((id: CaseStudyId) => {
    dispatch({ type: "collapseComplete", id });
  }, []);

  const scrollPanelIntoView = useCallback((id: CaseStudyId) => {
    const panel = isCaseStudyInGroup(id, PROJECT_IDS)
      ? projectsPanelRef.current
      : isCaseStudyInGroup(id, TEAMS_TOOLS_IDS)
        ? teamsToolsPanelRef.current
        : null;
    if (!panel) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollElementToOffset(panel, PANEL_SCROLL_TOP_OFFSET_PX);
      });
    });
  }, []);

  const scrollTilesIntoView = useCallback((id: CaseStudyId) => {
    const row = isCaseStudyInGroup(id, PROJECT_IDS)
      ? projectsRowRef.current
      : isCaseStudyInGroup(id, TEAMS_TOOLS_IDS)
        ? teamsToolsRowRef.current
        : null;
    if (row) scrollElementToTop(row);
  }, []);

  const scrollSection = useCallback((section: "projects" | "teams-tools") => {
    const element = section === "projects" ? projectsRowRef.current : teamsToolsRowRef.current;
    if (element) scrollElementToTop(element);
  }, []);

  const handleToggle = useCallback((id: CaseStudyId) => {
    dispatch({ type: "toggle", id });
  }, []);

  const applyDeepLink = useCallback(() => {
    const target = parseDeepLinkHash();
    skipNextHashWriteRef.current = true;

    if (target.type === "case-study") {
      setResumeOpen(false);
      dispatch({ type: "open", id: target.id });
    } else if (target.type === "cs-panel") {
      setResumeOpen(false);
      csDispatch({ type: "open", id: target.id });
    } else if (target.type === "resume") {
      dispatch({ type: "closeAll" });
      setResumeOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (resumeRef.current) scrollElementToTop(resumeRef.current);
        });
      });
    } else if (target.type === "section") {
      dispatch({ type: "closeAll" });
      setResumeOpen(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollSection(target.id));
      });
    }
  }, [scrollSection]);

  useEffect(() => {
    const target = parseDeepLinkHash();
    if (target.type === "section") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollSection(target.id));
      });
    } else if (target.type === "resume") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (resumeRef.current) scrollElementToTop(resumeRef.current);
        });
      });
    }

    const onUrlChange = () => applyDeepLink();
    window.addEventListener("hashchange", onUrlChange);
    window.addEventListener("popstate", onUrlChange);
    return () => {
      window.removeEventListener("hashchange", onUrlChange);
      window.removeEventListener("popstate", onUrlChange);
    };
  }, [applyDeepLink, scrollSection]);

  useEffect(() => {
    if (!openId || collapsingId === openId || deferExpandId === openId) return;
    scrollPanelIntoView(openId);
  }, [collapsingId, deferExpandId, openId, scrollPanelIntoView]);

  useEffect(() => {
    if (!deferExpandId) return;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        dispatch({ type: "expandComplete" });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [deferExpandId]);

  useEffect(() => {
    if (!csOpenId || csCollapsingId === csOpenId || csDeferExpandId === csOpenId) return;
    scrollCsPanelIntoView();
  }, [csCollapsingId, csDeferExpandId, csOpenId, scrollCsPanelIntoView]);

  useEffect(() => {
    if (!csDeferExpandId) return;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        csDispatch({ type: "expandComplete" });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [csDeferExpandId]);

  // Keep the URL hash aligned with the open cs panel / case study / resume.
  useEffect(() => {
    if (collapsingId || csCollapsingId) return;

    if (skipNextHashWriteRef.current) {
      skipNextHashWriteRef.current = false;
      return;
    }

    const desired = hashForOpenState(csOpenId, openId, resumeOpen);
    const current = readLocationHash();

    if (desired) {
      if (current !== desired) writeLocationHash(desired, "push");
      return;
    }

    if (current === "resume") {
      writeLocationHash("", "replace");
      return;
    }

    const parsed = parseDeepLinkHash(current);
    if (parsed.type === "case-study") {
      writeLocationHash(
        isCaseStudyInGroup(parsed.id, TEAMS_TOOLS_IDS) ? "teams-tools" : "projects",
        "replace",
      );
      return;
    }

    if (parsed.type === "cs-panel") {
      writeLocationHash("projects", "replace");
    }
  }, [collapsingId, csCollapsingId, csOpenId, openId, resumeOpen]);

  const scrollToTarget = useCallback(
    (target: HomeTarget) => {
      const section = target === "projects" ? "projects" : "teams-tools";
      skipNextHashWriteRef.current = true;
      writeLocationHash(section, "push");
      dispatch({ type: "closeAll" });
      setResumeOpen(false);
      scrollSection(section);
    },
    [scrollSection],
  );

  const openResume = useCallback(() => {
    skipNextHashWriteRef.current = true;
    dispatch({ type: "closeAll" });
    setResumeOpen(true);
    writeLocationHash("resume", "push");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (resumeRef.current) scrollElementToTop(resumeRef.current);
      });
    });
  }, []);

  const closeResume = useCallback(() => {
    setResumeOpen(false);
  }, []);

  const projectsPanelActive = isInGroup(openId, PROJECT_IDS) || isInGroup(collapsingId, PROJECT_IDS);
  const teamsToolsPanelActive = isInGroup(openId, TEAMS_TOOLS_IDS) || isInGroup(collapsingId, TEAMS_TOOLS_IDS);

  const csPanelActive = Boolean(csOpenId || csCollapsingId);

  const csSwapping = Boolean(csPendingId);

  const csPanelRendered = (id: CsPanelId) =>
    csOpenId === id || csCollapsingId === id || csPendingId === id;

  const sharedCsPanelProps = (id: CsPanelId) => ({
    expanded: csOpenId === id && csDeferExpandId !== id,
    collapsing: csCollapsingId === id,
    skipSwapTransition: csSwapping && (csCollapsingId === id || csPendingId === id),
    onClose: () => handleCsToggle(id),
    onCollapseComplete: () => handleCsCollapseComplete(id),
    onBackToTop: scrollTlDrIntoView,
  });

  const sharedCaseStudyProps = (id: CaseStudyId) => ({
    expanded: openId === id && deferExpandId !== id,
    collapsing: collapsingId === id,
    onToggle: () => handleToggle(id),
    onCollapseComplete: () => handleCollapseComplete(id),
    hideSummary: true,
    onBackToTop: () => scrollTilesIntoView(id),
  });

  const activeCsLinkId =
    TL_DR_LINKS.find((link) =>
      isCsLinkSelected(link.id, csOpenId, csCollapsingId, csPendingId),
    )?.id ?? null;

  return (
    <div className={styles.page} data-figma-name="main-page">
      <HomeModule
        variant={homeVariant}
        onVariantChange={setHomeVariant}
        onNavigate={scrollToTarget}
        onOpenResume={openResume}
      />
      {resumeOpen && (
        <div ref={resumeRef} className={styles.section} data-section-anchor="resume">
          <Suspense fallback={null}>
            <ResumeModule onClose={closeResume} />
          </Suspense>
        </div>
      )}
      <div
        ref={tlDrRef}
        className={`${styles.section} ${styles.tlDrSection}`}
        data-section-anchor="tl-dr"
        data-theme="tl-dr"
      >
        <TlDr
          variant="wide"
          links={TL_DR_LINKS}
          activeLinkId={activeCsLinkId}
          onLinkClick={handleCsToggle}
        />
        {csPanelActive && (
          <div ref={csPanelRef} className={styles.expandedPanel}>
            {csPanelRendered("cs-drag-drop") && (
              <CsDragDrop {...sharedCsPanelProps("cs-drag-drop")} />
            )}
            {csPanelRendered("cs-keyboard-nav") && (
              <CsKeyboardNav {...sharedCsPanelProps("cs-keyboard-nav")} />
            )}
          </div>
        )}
        <TlDr variant="wide-footer" />
      </div>
      <div className={styles.section} data-section-anchor="projects">
        <CaseStudyTileRow ref={projectsRowRef} name="projects">
          {PROJECT_TILES.map((config) => (
            <CaseStudyTile
              key={config.id}
              config={config}
              selected={isTileSelected(config.id, openId, collapsingId, pendingId)}
              onClick={() => handleToggle(config.id)}
            />
          ))}
        </CaseStudyTileRow>
        {projectsPanelActive && (
          <div ref={projectsPanelRef} className={styles.expandedPanel}>
            {(openId === "a11y" || collapsingId === "a11y") && <A11yCaseStudy {...sharedCaseStudyProps("a11y")} />}
            {(openId === "park" || collapsingId === "park") && <ParkCaseStudy {...sharedCaseStudyProps("park")} />}
            {(openId === "blast" || collapsingId === "blast") && <BlastCaseStudy {...sharedCaseStudyProps("blast")} />}
          </div>
        )}
      </div>
      <div className={styles.section} data-section-anchor="teams-tools">
        <CaseStudyTileRow ref={teamsToolsRowRef} name="teams-tools">
          {TEAMS_TOOLS_TILES.map((config) => (
            <CaseStudyTile
              key={config.id}
              config={config}
              selected={isTileSelected(config.id, openId, collapsingId, pendingId)}
              onClick={() => handleToggle(config.id)}
            />
          ))}
        </CaseStudyTileRow>
        {teamsToolsPanelActive && (
          <div ref={teamsToolsPanelRef} className={styles.expandedPanel}>
            {(openId === "team" || collapsingId === "team") && <TeamCaseStudy {...sharedCaseStudyProps("team")} />}
            {(openId === "tools" || collapsingId === "tools") && <ToolsCaseStudy {...sharedCaseStudyProps("tools")} />}
          </div>
        )}
      </div>
    </div>
  );
}
