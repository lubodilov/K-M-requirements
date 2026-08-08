"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function WorkshopClient({ latestSubmission, participants }) {
  // Facilitator Mode Toggle
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);

  // Parse helper
  const parseJSON = (str) => {
    try {
      return str ? JSON.parse(str) : [];
    } catch (e) {
      return [];
    }
  };

  // 1. Initial State Pre-populated with User Questionnaire Data
  const [decisions, setDecisions] = useState({
    // Step 4: Baseline Confirmation
    baselineChanges: "",
    baselineStatus: "Draft", // Confirmed, Discuss, Draft

    // Step 6: Geography (Tender Scout)
    tsGeoRelease1: ["Germany", "France", "Switzerland", "Austria"],
    tsGeoNext: ["Italy", "Spain", "United Kingdom"],
    tsGeoExcluded: ["United States", "Canada", "Australia", "Brazil", "India"],
    tsAustraliaDecision: "Later Phase", // "Initial Scope" or "Later Phase"
    tsGeoStatus: "Draft",

    // Step 7: Sources (Tender Scout)
    tsPortals: [
      { id: "TED", name: "TED (Europe)", priority: "High", selection: "Release 1" },
      { id: "CanadaBuys", name: "CanadaBuys (Canada)", priority: "High", selection: "Later" },
      { id: "AusTender", name: "AusTender (Australia)", priority: "Medium", selection: "Later" },
      { id: "Compras", name: "Compras (Brazil)", priority: "Medium", selection: "Later" },
      { id: "MercadoPublico", name: "MercadoPublico (Chile)", priority: "Medium", selection: "Later" },
      { id: "CPPP", name: "CPPP (India)", priority: "Medium", selection: "Later" },
      { id: "SAM.gov", name: "SAM.gov (USA)", priority: "TBD", selection: "Release 1" }
    ],
    tsMissingSources: "",
    tsSourcesStatus: "Draft",

    // Step 8: Relevance Logic (Tender Scout)
    tsIncludes: [
      "Overhead line equipment tenders (catenary, cantilevers, contact wire)",
      "Trolleybus infrastructure projects",
      "Light rail and tram overhead system components"
    ],
    tsExcludes: [
      "General rail construction without overhead components",
      "Substation tenders without overhead systems"
    ],
    tsExampleRelevant: "",
    tsExampleIrrelevant: "",
    tsRelevanceStatus: "Draft",

    // Step 9: Keyword Logic (Tender Scout)
    tsKeywordsStrong: ["Catenary", "Overhead contact line", "Fahrdraht"],
    tsKeywordsSupporting: ["Ausleger", "Cantilever", "Rail", "Trolleybus"],
    tsKeywordsExcluded: ["Rolling stock", "Locomotive", "Signaling"],
    tsKeywordSynonyms: "",
    tsKeywordsStatus: "Draft",

    // Step 10: Contractors & Major Players (Tender Scout)
    tsTrackContractors: "Useful later", // "Yes — important for Release 1", "Useful later", "Not required"
    tsContractorWatchlist: "",
    tsContractorsStatus: "Draft",

    // Step 11: Output & Release 1 (Tender Scout)
    tsOutputExperience: "Dashboard", // Dashboard, Digest, Both
    tsAlertRecipient: "Sales Team",
    tsAlertFrequency: "Daily",
    tsMustHaves: "Daily dashboard showing matches with highlighted matching terms",
    tsNiceToHaves: "Automated daily email digests",
    tsOutputStatus: "Draft",

    // Step 14: Competitors (Innovation Radar)
    irCompetitors: [
      { name: "Elektroline", priority: "High", tier: "Tier 1" },
      { name: "Furrer + Frey", priority: "High", tier: "Tier 1" },
      { name: "Arthur Flury", priority: "High", tier: "Tier 1" },
      { name: "Alstom", priority: "High", tier: "Tier 2" },
      { name: "Siemens", priority: "High", tier: "Tier 2" },
      { name: "SPL Powerlines", priority: "High", tier: "Tier 2" }
    ],
    irCompetitorDevelopments: ["New products/technologies", "Major projects"],
    irCompetitorsStatus: "Draft",

    // Step 15: Technology Topics (Innovation Radar)
    irTechTopics: [
      { name: "De-icing systems", priority: "High", selection: "Release 1" },
      { name: "Catenary systems", priority: "High", selection: "Release 1" },
      { name: "Trolleybuses", priority: "Medium", selection: "Release 1" },
      { name: "Light rail", priority: "Medium", selection: "Later" },
      { name: "Overhead lines", priority: "Medium", selection: "Later" }
    ],
    irTechStatus: "Draft",

    // Step 16: Market Developments (Innovation Radar)
    irMarketSignals: ["Infrastructure investment trends", "Strategic expansions"],
    irMarketStatus: "Draft",

    // Step 17: Resources & Commodities (Innovation Radar)
    irResourcesCopper: ["Price", "Availability"],
    irResourcesAluminium: ["Price"],
    irResourcesStatus: "Draft",

    // Step 18: Sources (Innovation Radar)
    irSourcesApproach: "Option C", // Option A, Option B, Option C
    irMandatorySources: "",
    irSourcesStatus: "Draft",

    // Step 19: Watchlist Logic (Innovation Radar)
    irSeedWatchlist: "Copper price, Catenary de-icing systems, Overhead lines",
    irWatchlistStatus: "Draft",

    // Step 20: Output & Release 1 (Innovation Radar)
    irOutputExperience: "Both", // Dashboard, Digest, Both
    irAlertRecipient: "Dennis Darra + Franc Dugal",
    irAlertFrequency: "Weekly",
    irMustHaves: "Weekly alerts on competitor technology strategic announcements",
    irNiceToHaves: "Commodity pricing daily dashboard",
    irOutputStatus: "Draft",

    // Step 22: Ownership
    ownerTenderScout: "Fawzi Fattel",
    ownerInnovationRadar: "Dennis Darra",
    ownerITSecurity: "Stefan Müller",
    coordinatorProject: "Dario Rüede",
    userResearchRnd: "Franc Dugal",
    finalSignoffOwner: "",
    ownershipStatus: "Draft",

    // Step 23: Constraints
    additionalConstraints: "",
    constraintsStatus: "Draft",

    // Step 25: Open Items
    openItems: [
      { item: "Clarify internal IT hosting guidelines", owner: "Stefan Müller", deadline: "2026-08-15" }
    ],
    openItemsStatus: "Draft"
  });

  // Prepopulate dynamically with loaded submission data
  useEffect(() => {
    if (latestSubmission) {
      setDecisions((prev) => {
        let updated = { ...prev };
        if (latestSubmission.tsOwnerName) updated.ownerTenderScout = latestSubmission.tsOwnerName;
        if (latestSubmission.irOwnerName) updated.ownerInnovationRadar = latestSubmission.irOwnerName;
        if (latestSubmission.itContactName) updated.ownerITSecurity = latestSubmission.itContactName;

        const pList = parseJSON(latestSubmission.workshopParticipants);
        if (pList.length > 0) {
          const pm = pList.find(p => p.role?.toLowerCase().includes("projectmanager") || p.role?.toLowerCase().includes("pm"));
          if (pm) updated.coordinatorProject = pm.name;
          const rnd = pList.find(p => p.role?.toLowerCase().includes("r&d") || p.role?.toLowerCase().includes("development") || p.role?.toLowerCase().includes("rnd"));
          if (rnd) updated.userResearchRnd = rnd.name;
        }

        if (latestSubmission.tsProjectTypes) updated.tsIncludes = [latestSubmission.tsProjectTypes];
        if (latestSubmission.tsExclusions) updated.tsExcludes = [latestSubmission.tsExclusions];
        if (latestSubmission.mustHaves) updated.tsMustHaves = latestSubmission.mustHaves;
        if (latestSubmission.niceToHaves) updated.tsNiceToHaves = latestSubmission.niceToHaves;
        if (latestSubmission.constraints) updated.additionalConstraints = latestSubmission.constraints;

        const kwList = parseJSON(latestSubmission.tsKeywords);
        if (kwList.length > 0) {
          updated.tsKeywordsStrong = kwList.filter(k => k.action === "Include").map(k => k.keyword);
          updated.tsKeywordsExcluded = kwList.filter(k => k.action === "Exclude").map(k => k.keyword);
        }

        const portalList = parseJSON(latestSubmission.tsTenderPortals);
        if (portalList.length > 0) {
          updated.tsPortals = portalList.map(p => ({
            id: p.name,
            name: `${p.name} (${p.region || "Global"})`,
            priority: p.priority || "Medium",
            selection: p.priority === "High" ? "Release 1" : "Later"
          }));
        }

        const regionsList = parseJSON(latestSubmission.tsPriorityRegions);
        if (regionsList.length > 0) {
          updated.tsGeoRelease1 = regionsList.filter(r => r.priority === "High").map(r => r.region);
          updated.tsGeoNext = regionsList.filter(r => r.priority === "Medium").map(r => r.region);
          updated.tsGeoExcluded = regionsList.filter(r => r.priority === "Low").map(r => r.region);
        }

        const compList = parseJSON(latestSubmission.irCompetitors);
        if (compList.length > 0) {
          updated.irCompetitors = compList.map(c => ({
            name: c.name,
            priority: c.priority || "High",
            tier: c.priority === "High" ? "Tier 1" : "Tier 2"
          }));
        }

        const techList = parseJSON(latestSubmission.irTechThemes);
        if (techList.length > 0) {
          updated.irTechTopics = techList.map(t => ({
            name: t.theme,
            priority: t.priority || "Medium",
            selection: t.priority === "High" ? "Release 1" : "Later"
          }));
        }

        return updated;
      });
    }
  }, [latestSubmission]);

  // Handle simple decisions updates
  const updateDecision = (key, value) => {
    setDecisions(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 25) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // Keyboard navigation support for client view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  // Steps / Slides Configuration
  const steps = [
    // --- 01 OPENING ---
    {
      id: "welcome",
      chapter: "01 Opening",
      title: "K+M × nelio",
      content: (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <span className="badge">PHASE 0 WORKSHOP</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "800", letterSpacing: "-0.04em", margin: "1rem 0" }}>
            Phase 0 Workshop
          </h1>
          <p style={{ fontSize: "1.5rem", color: "var(--accent)", fontWeight: "600" }}>
            Baseline Finalization for Tender Scout & Innovation Radar
          </p>
          <div style={{ borderTop: "1px solid var(--border-color)", margin: "3rem auto", maxWidth: "400px" }}></div>
          <p className="subtitle" style={{ fontSize: "1.1rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
            "From validated requirements to a confirmed implementation baseline."
          </p>
          <div style={{ marginTop: "2.5rem", fontSize: "0.85rem", opacity: 0.6 }}>
            Attendees: {decisions.ownerTenderScout} (Tender Scout) · {decisions.ownerInnovationRadar} (Innovation Radar) · Leon Sarkis · Lubo Dilov
          </div>
        </div>
      ),
      facilitator: {
        time: "5 min",
        target: "Framing",
        notes: [
          "Confirm presence of all key participants.",
          "Keep introductions brief.",
          "Set the stage that this is a baseline lock, not discovery."
        ]
      }
    },
    {
      id: "objective",
      chapter: "01 Opening",
      title: "Today's objective",
      content: (
        <div className="animate-fade-in">
          <p className="slide-p">The workshop must leave us with an implementation-ready baseline in three core areas:</p>
          <div className="grid-2" style={{ gap: "2rem", marginTop: "2rem" }}>
            <div className="card" style={{ borderLeft: "3px solid var(--accent)" }}>
              <h4 style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "0 0 0.5rem 0" }}>Confirm Priorities</h4>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                Establish exactly what Release 1 will focus on and what can be parked for later phases.
              </p>
            </div>
            <div className="card" style={{ borderLeft: "3px solid var(--accent)" }}>
              <h4 style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "0 0 0.5rem 0" }}>Finalize Operating Logic</h4>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                Define source feeds, filtering rules, keyword relevance, and alert rules.
              </p>
            </div>
          </div>
          <div className="card" style={{ borderLeft: "3px solid var(--accent)", marginTop: "1.5rem" }}>
            <h4 style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "0 0 0.5rem 0" }}>Lock Ownership & Next Steps</h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Confirm business owners, sign-off responsibility, open items, and next milestones.
            </p>
          </div>
          <div className="highlight-box" style={{ marginTop: "2rem" }}>
            <strong>Goal:</strong> Leave the session with a confirmed baseline so implementation can proceed immediately.
          </div>
        </div>
      ),
      facilitator: {
        time: "5 min",
        target: "Objectives",
        notes: [
          "State clearly that we are focusing on Release 1.",
          "Make it clear that we've read their prep and today is about locking the gaps."
        ]
      }
    },
    {
      id: "roadmap",
      chapter: "01 Opening",
      title: "Workshop roadmap",
      content: (
        <div className="animate-fade-in">
          <p className="slide-p">To keep us on track, we will follow the 6-part structure K+M already received:</p>
          <div className="timeline-overview-grid" style={{ marginTop: "2rem" }}>
            <div className="timeline-card-brief">
              <span className="time-badge-mini">10 mins</span>
              <h5>01 Opening & Framing</h5>
              <p>Welcome, purpose, and scope check.</p>
            </div>
            <div className="timeline-card-brief">
              <span className="time-badge-mini">10 mins</span>
              <h5>02 Baseline Confirmation</h5>
              <p>Confirm focus on P0, P1, and P2 standalone setup.</p>
            </div>
            <div className="timeline-card-brief">
              <span className="time-badge-mini">25 mins</span>
              <h5>03 Tender Scout</h5>
              <p>Confirm regions, portals, relevance logic, and release baseline.</p>
            </div>
            <div className="timeline-card-brief">
              <span className="time-badge-mini">25 mins</span>
              <h5>04 Innovation Radar</h5>
              <p>Confirm competitors, tech themes, watchlists, and sources.</p>
            </div>
            <div className="timeline-card-brief">
              <span className="time-badge-mini">12 mins</span>
              <h5>05 Ownership & Alignment</h5>
              <p>Validate owners, IT contact, and sign-off responsibilities.</p>
            </div>
            <div className="timeline-card-brief">
              <span className="time-badge-mini">8 mins</span>
              <h5>06 Decisions & Next Steps</h5>
              <p>Review baseline confirmation and consolidate action items.</p>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "2 min",
        target: "Agenda",
        notes: [
          "Durations are guidelines but keep the pace decision-oriented.",
          "Acknowledge we have 90 minutes total."
        ]
      }
    },

    // --- 02 BASELINE CONFIRMATION ---
    {
      id: "baseline-lock",
      chapter: "02 Baseline",
      title: "Starting from an established baseline",
      content: (
        <div className="animate-fade-in">
          <p className="slide-p">We are building on the current project framework established in previous sessions:</p>
          <div className="submission-grid" style={{ margin: "2rem 0" }}>
            <div className="card">
              <span className="data-label">Scope focus</span>
              <p className="data-value" style={{ margin: "0.5rem 0 0 0" }}>P0 AI Blueprint &rarr; P1 Tender Scout &rarr; P2 Innovation Radar</p>
            </div>
            <div className="card">
              <span className="data-label">Implementation setup</span>
              <p className="data-value" style={{ margin: "0.5rem 0 0 0" }}>Initial implementation remains standalone from K+M internal core systems.</p>
            </div>
            <div className="card">
              <span className="data-label">Today's Focus</span>
              <p className="data-value" style={{ margin: "0.5rem 0 0 0" }}>Refine remaining gaps and lock Release 1 priorities.</p>
            </div>
          </div>

          <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
            <h4 style={{ marginBottom: "1rem" }}>Has anything materially changed since our previous alignment?</h4>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                className={`btn ${decisions.baselineStatus === "Confirmed" ? "btn-primary" : "btn-outline"}`}
                onClick={() => updateDecision("baselineStatus", "Confirmed")}
              >
                No — baseline confirmed ✓
              </button>
              <button
                className={`btn ${decisions.baselineStatus === "Discuss" ? "btn-primary" : "btn-outline"}`}
                onClick={() => updateDecision("baselineStatus", "Discuss")}
              >
                Yes — let's discuss
              </button>
            </div>
            {decisions.baselineStatus === "Discuss" && (
              <textarea
                className="form-group"
                style={{ marginTop: "1rem", width: "100%", height: "80px" }}
                value={decisions.baselineChanges}
                onChange={(e) => updateDecision("baselineChanges", e.target.value)}
                placeholder="Describe material changes to discuss..."
              />
            )}
          </div>
        </div>
      ),
      facilitator: {
        time: "8 min",
        target: "Scope alignment",
        notes: [
          "If no, click 'No' and move to Tender Scout.",
          "If yes, log details. Keep discussion focused on high-level direction, not technical execution."
        ]
      }
    },

    // --- 03 TENDER SCOUT ---
    {
      id: "ts-pre-inputs",
      chapter: "03 Tender Scout",
      title: "Tender Scout — Current input",
      content: (
        <div className="animate-fade-in">
          <p className="slide-p">What we validated from your questionnaire preparation:</p>
          <div className="submission-grid" style={{ margin: "1.5rem 0" }}>
            <div className="card">
              <span className="data-label">Priority regions</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                <strong>High:</strong> {decisions.tsGeoRelease1.join(", ") || "None"} <br />
                <strong>Medium:</strong> {decisions.tsGeoNext.join(", ") || "None"}
              </p>
            </div>
            <div className="card">
              <span className="data-label">Initial portals</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                TED, CanadaBuys (High) <br />
                AusTender, SAM.gov, Compras, MercadoPublico, CPPP (Medium/TBD)
              </p>
            </div>
            <div className="card">
              <span className="data-label">Core Terminology</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                Rail, Catenary, Trolleybus, Light rail, Tram, Cantilever/Ausleger, Fahrdraht/Contact wire
              </p>
            </div>
          </div>

          <div className="highlight-box">
            <strong>Today we need to refine:</strong> Specific release countries · Source scope · Relevance criteria · Exclusion logic · Output must-haves
          </div>
        </div>
      ),
      facilitator: {
        time: "3 min",
        target: "Inputs summary",
        notes: [
          "Confirm they see we've read their inputs.",
          "Transition directly to the first Tender Scout decision step."
        ]
      }
    },
    {
      id: "ts-geo",
      chapter: "03 Tender Scout",
      title: "Where should Tender Scout focus first?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Priority Regions: Europe, North America</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Define the exact countries that form the first implementation scope within these regions.</p>
            </div>
          </div>

          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>Release 1</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {decisions.tsGeoRelease1.map(c => (
                    <span key={c} className="participant-pill" style={{ cursor: "pointer", border: "1px solid var(--accent)", background: "rgba(45, 212, 191, 0.1)", color: "var(--text-primary)" }} onClick={() => {
                      updateDecision("tsGeoRelease1", decisions.tsGeoRelease1.filter(x => x !== c));
                      updateDecision("tsGeoNext", [...decisions.tsGeoNext, c]);
                    }}>{c} &rarr;</span>
                  ))}
                  {decisions.tsGeoRelease1.length === 0 && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>Empty. Click item below to add.</span>}
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem" }}>
                <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Next priority</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {decisions.tsGeoNext.map(c => (
                    <span key={c} className="participant-pill" style={{ cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)" }} onClick={() => {
                      updateDecision("tsGeoNext", decisions.tsGeoNext.filter(x => x !== c));
                      updateDecision("tsGeoExcluded", [...decisions.tsGeoExcluded, c]);
                    }}>{c} &rarr;</span>
                  ))}
                  {decisions.tsGeoNext.length === 0 && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>Empty.</span>}
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem", marginTop: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Excluded / later</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {decisions.tsGeoExcluded.map(c => (
                  <span key={c} className="participant-pill" style={{ cursor: "pointer", opacity: 0.6, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)", color: "var(--text-muted)" }} onClick={() => {
                    updateDecision("tsGeoExcluded", decisions.tsGeoExcluded.filter(x => x !== c));
                    updateDecision("tsGeoRelease1", [...decisions.tsGeoRelease1, c]);
                  }}>{c} &rarr;</span>
                ))}
                {decisions.tsGeoExcluded.length === 0 && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>Empty.</span>}
              </div>
            </div>

            <div className="card" style={{ borderLeft: "3px solid #f59e0b", marginTop: "1rem", padding: "1.5rem", background: "rgba(245, 158, 11, 0.05)" }}>
              <h4 style={{ color: "#fbbf24", margin: "0 0 0.5rem 0", fontSize: "1rem" }}>⚠️ Source-Scope Inconsistency</h4>
              <p style={{ margin: "0 0 1rem 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                AusTender is currently listed as a target portal, but Australia is not in your priority geographic scope.
              </p>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                Should Australia be in the initial Release 1 geographic scope, or is AusTender for later?
              </label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className={`btn ${decisions.tsAustraliaDecision === "Initial Scope" ? "btn-primary" : "btn-outline"}`} style={{ flexGrow: 1 }} onClick={() => {
                  updateDecision("tsAustraliaDecision", "Initial Scope");
                  updateDecision("tsGeoRelease1", [...decisions.tsGeoRelease1.filter(x => x !== "Australia"), "Australia"]);
                  updateDecision("tsGeoExcluded", decisions.tsGeoExcluded.filter(x => x !== "Australia"));
                }}>Include Australia in Release 1</button>
                <button className={`btn ${decisions.tsAustraliaDecision === "Later Phase" ? "btn-primary" : "btn-outline"}`} style={{ flexGrow: 1 }} onClick={() => {
                  updateDecision("tsAustraliaDecision", "Later Phase");
                  updateDecision("tsGeoRelease1", decisions.tsGeoRelease1.filter(x => x !== "Australia"));
                  updateDecision("tsGeoExcluded", [...decisions.tsGeoExcluded.filter(x => x !== "Australia"), "Australia"]);
                }}>Exclude Australia (Later)</button>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "6 min",
        target: "Geographic scope",
        notes: [
          "Refine Europe/North America into specific countries.",
          "Click countries to cycle them through columns.",
          "Must resolve Australia inconsistency (AusTender vs Geo priority)."
        ]
      }
    },
    {
      id: "ts-sources",
      chapter: "03 Tender Scout",
      title: "Which sources belong in Release 1?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Portals: TED, CanadaBuys, AusTender, Compras, MercadoPublico, CPPP, SAM.gov</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Select the exact target portals for the first release.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {decisions.tsPortals.map((p, idx) => (
                <div className="card" key={p.id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1.25rem", marginBottom: 0 }}>
                  <span className="submission-title" style={{ fontSize: "1rem", color: "var(--text-primary)" }}>{p.name}</span>
                  <span className="data-label" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Priority: {p.priority}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginTop: "0.5rem" }}>
                    {["Release 1", "Later", "Not Required"].map(sel => (
                      <button
                        key={sel}
                        className={`btn toggle-btn ${p.selection === sel ? "active" : ""}`}
                        style={{ fontSize: "0.75rem", padding: "0.3rem 0.5rem", flexGrow: 1, border: p.selection === sel ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: p.selection === sel ? "rgba(45, 212, 191, 0.1)" : "transparent", color: p.selection === sel ? "var(--text-primary)" : "var(--text-muted)" }}
                        onClick={() => {
                          const copy = [...decisions.tsPortals];
                          copy[idx].selection = sel;
                          updateDecision("tsPortals", copy);
                        }}
                      >
                        {sel}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group" style={{ marginTop: "1rem" }}>
              <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Are any must-have tender sources missing from this list?</label>
              <input
                type="text"
                value={decisions.tsMissingSources}
                onChange={(e) => updateDecision("tsMissingSources", e.target.value)}
                placeholder="e.g. Simap.ch (Switzerland), etc..."
                style={{ padding: "0.5rem", border: "1px solid var(--border-color)" }}
              />
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "5 min",
        target: "Tender portals",
        notes: [
          "Determine if SAM.gov is a must-have for Release 1.",
          "Ask only for must-have sources that would materially weaken Release 1 if excluded."
        ]
      }
    },
    {
      id: "ts-relevance",
      chapter: "03 Tender Scout",
      title: "What should Tender Scout consider relevant?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Project types: Not explicitly defined.<br />Exclusions: Not explicitly defined.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Establish the practical business definition of a useful opportunity and clear exclusion rules.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div className="card" style={{ padding: "1.5rem", marginBottom: 0 }}>
                <h3 style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>INCLUDE Opportunities</h3>
                <ul className="slide-list-none">
                  {decisions.tsIncludes.map((inc, i) => (
                    <li key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                      &bull; {inc}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <input type="text" id="add-include-input" placeholder="e.g. Catenary installations" style={{ flexGrow: 1, padding: "0.4rem 0.75rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }} />
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", borderColor: "rgba(45,212,191,0.5)", color: "var(--accent)" }} onClick={() => {
                    const el = document.getElementById("add-include-input");
                    if (el && el.value.trim()) {
                      updateDecision("tsIncludes", [...decisions.tsIncludes, el.value.trim()]);
                      el.value = "";
                    }
                  }}>+ Add</button>
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem", marginBottom: 0 }}>
                <h3 style={{ color: "var(--danger)", fontSize: "0.9rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>EXCLUDE Opportunities</h3>
                <ul className="slide-list-none">
                  {decisions.tsExcludes.map((exc, i) => (
                    <li key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                      &bull; {exc}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <input type="text" id="add-exclude-input" placeholder="e.g. Rolling stock" style={{ flexGrow: 1, padding: "0.4rem 0.75rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }} />
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", borderColor: "rgba(239,68,68,0.5)", color: "var(--danger)" }} onClick={() => {
                    const el = document.getElementById("add-exclude-input");
                    if (el && el.value.trim()) {
                      updateDecision("tsExcludes", [...decisions.tsExcludes, el.value.trim()]);
                      el.value = "";
                    }
                  }}>+ Add</button>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.8rem", color: "var(--accent)" }}>Example of RELEVANT tender:</label>
                  <textarea
                    value={decisions.tsExampleRelevant}
                    onChange={(e) => updateDecision("tsExampleRelevant", e.target.value)}
                    placeholder="e.g. 'Installation of 15km overhead contact lines between Zurich and Bern...'"
                    style={{ height: "60px", border: "1px solid rgba(45,212,191,0.2)", background: "rgba(45,212,191,0.05)", color: "var(--text-primary)" }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.8rem", color: "var(--danger)" }}>Example of IRRELEVANT tender:</label>
                  <textarea
                    value={decisions.tsExampleIrrelevant}
                    onChange={(e) => updateDecision("tsExampleIrrelevant", e.target.value)}
                    placeholder="e.g. 'Delivery of 10 new electric locomotives...'"
                    style={{ height: "60px", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "6 min",
        target: "Relevance parameters",
        notes: [
          "This is one of the most critical steps. Formulate inclusion/exclusion criteria.",
          "Use the examples section to anchor client requirements in real scenarios."
        ]
      }
    },
    {
      id: "ts-keywords",
      chapter: "03 Tender Scout",
      title: "How should Tender Scout recognize opportunities?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Core domain terms: Rail, Catenary, Trolleybus, Light rail, Tram.<br /><br />Technical terms: Cantilever / Ausleger, Fahrdraht / Contact Wire.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Categorize the draft terminology to establish the initial recognition logic.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
              <div className="card" style={{ padding: "1.25rem", marginBottom: 0 }}>
                <h4 style={{ color: "var(--accent)", fontSize: "0.85rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>Strong Signals</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {decisions.tsKeywordsStrong.map(k => (
                    <span key={k} className="participant-pill" style={{ cursor: "pointer", border: "1px solid var(--accent)", background: "rgba(45,212,191,0.1)", color: "var(--text-primary)", fontSize: "0.75rem", padding: "0.25rem 0.5rem" }} onClick={() => {
                      updateDecision("tsKeywordsStrong", decisions.tsKeywordsStrong.filter(x => x !== k));
                      updateDecision("tsKeywordsSupporting", [...decisions.tsKeywordsSupporting, k]);
                    }}>{k} &rarr;</span>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: "1.25rem", marginBottom: 0 }}>
                <h4 style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>Supporting</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {decisions.tsKeywordsSupporting.map(k => (
                    <span key={k} className="participant-pill" style={{ cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", fontSize: "0.75rem", padding: "0.25rem 0.5rem" }} onClick={() => {
                      updateDecision("tsKeywordsSupporting", decisions.tsKeywordsSupporting.filter(x => x !== k));
                      updateDecision("tsKeywordsExcluded", [...decisions.tsKeywordsExcluded, k]);
                    }}>{k} &rarr;</span>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: "1.25rem", marginBottom: 0 }}>
                <h4 style={{ color: "var(--danger)", fontSize: "0.85rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>Exclusion</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {decisions.tsKeywordsExcluded.map(k => (
                    <span key={k} className="participant-pill" style={{ cursor: "pointer", opacity: 0.6, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)", color: "var(--text-muted)", fontSize: "0.75rem", padding: "0.25rem 0.5rem" }} onClick={() => {
                      updateDecision("tsKeywordsExcluded", decisions.tsKeywordsExcluded.filter(x => x !== k));
                      updateDecision("tsKeywordsStrong", [...decisions.tsKeywordsStrong, k]);
                    }}>{k} &rarr;</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "1.25rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: "500", fontSize: "0.8rem", color: "var(--text-secondary)" }}>Are important synonyms, translations, or technical terms missing?</label>
                <input
                  type="text"
                  value={decisions.tsKeywordSynonyms}
                  onChange={(e) => updateDecision("tsKeywordSynonyms", e.target.value)}
                  placeholder="e.g. Oberleitung (German), Caténaire (French)..."
                  style={{ padding: "0.5rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", marginTop: "0.5rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "4 min",
        target: "Taxonomy",
        notes: [
          "Group keyword terms to construct search logic.",
          "We do not need an exhaustive dictionary today, just the seed taxonomy."
        ]
      }
    },
    {
      id: "ts-contractors",
      chapter: "03 Tender Scout",
      title: "Should major contractors / market players be tracked?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">No contractors were specified in the questionnaire.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Decide if tracking prime contractors for sub-contracting opportunities is required for Release 1.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                {["Yes — important for Release 1", "Useful later", "Not required"].map(opt => (
                  <button
                    key={opt}
                    className={`btn toggle-btn ${decisions.tsTrackContractors === opt ? "active" : ""}`}
                    style={{ border: decisions.tsTrackContractors === opt ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: decisions.tsTrackContractors === opt ? "rgba(45, 212, 191, 0.1)" : "transparent", color: decisions.tsTrackContractors === opt ? "var(--text-primary)" : "var(--text-muted)", padding: "0.75rem", fontSize: "0.8rem" }}
                    onClick={() => updateDecision("tsTrackContractors", opt)}
                  >
                    {decisions.tsTrackContractors === opt && <span style={{ marginRight: "0.5rem", color: "var(--accent)" }}>✓</span>}
                    {opt}
                  </button>
                ))}
              </div>

              {decisions.tsTrackContractors === "Yes — important for Release 1" && (
                <div className="form-group animate-fade-in" style={{ marginTop: "1.5rem", marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.8rem", color: "var(--text-secondary)" }}>Which contractors should form the initial watchlist?</label>
                  <textarea
                    value={decisions.tsContractorWatchlist}
                    onChange={(e) => updateDecision("tsContractorWatchlist", e.target.value)}
                    placeholder="e.g. Siemens Mobility, Alstom, Colas Rail..."
                    style={{ height: "80px", marginTop: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "3 min",
        target: "Contractor Tracking",
        notes: [
          "First decide if tracking prime contractors actually matters for Release 1.",
          "Avoid creating a feature just because it was in the questionnaire."
        ]
      }
    },
    {
      id: "ts-output",
      chapter: "03 Tender Scout",
      title: "What should the sales team receive?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Needs for reporting and tracking.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Determine the alert experience, frequency, and Release 1 deliverables.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div className="card" style={{ padding: "1.5rem", marginBottom: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span className="data-label" style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Primary Experience</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["Dashboard", "Email Digest", "Both"].map(opt => (
                    <button
                      key={opt}
                      className={`btn toggle-btn ${decisions.tsOutputExperience === opt ? "active" : ""}`}
                      onClick={() => updateDecision("tsOutputExperience", opt)}
                      style={{ fontSize: "0.8rem", padding: "0.5rem", flexGrow: 1, border: decisions.tsOutputExperience === opt ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: decisions.tsOutputExperience === opt ? "rgba(45, 212, 191, 0.1)" : "transparent", color: decisions.tsOutputExperience === opt ? "var(--text-primary)" : "var(--text-muted)" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem", marginBottom: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span className="data-label" style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Cadence / Frequency</span>
                <select
                  value={decisions.tsAlertFrequency}
                  onChange={(e) => updateDecision("tsAlertFrequency", e.target.value)}
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem", borderRadius: "6px", color: "var(--text-primary)", fontSize: "0.85rem" }}
                >
                  <option value="Real-time">Real-time</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-primary)", display: "block", marginBottom: "0.5rem" }}>Alert Recipient(s)</label>
                <input
                  type="text"
                  value={decisions.tsAlertRecipient}
                  onChange={(e) => updateDecision("tsAlertRecipient", e.target.value)}
                  placeholder="e.g. Sales Team"
                  style={{ padding: "0.6rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                />
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--accent)", display: "block", marginBottom: "0.5rem" }}>Release 1 must-haves:</label>
                  <textarea
                    value={decisions.tsMustHaves}
                    onChange={(e) => updateDecision("tsMustHaves", e.target.value)}
                    style={{ height: "60px", padding: "0.75rem", border: "1px solid rgba(45,212,191,0.2)", background: "rgba(45,212,191,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>Useful later (Nice-to-haves):</label>
                  <textarea
                    value={decisions.tsNiceToHaves}
                    onChange={(e) => updateDecision("tsNiceToHaves", e.target.value)}
                    style={{ height: "60px", padding: "0.75rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "4 min",
        target: "Alert UX",
        notes: [
          "Ask: 'What should a salesperson understand in 30 seconds?' to focus requirements.",
          "Verify the alert frequency (Daily is currently indicated)."
        ]
      }
    },
    {
      id: "ts-checkpoint",
      chapter: "03 Tender Scout",
      title: "Tender Scout Baseline Playback",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">The Tender Scout baseline has been built during the workshop.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Please review and confirm the Tender Scout implementation baseline.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", color: "var(--accent)", marginBottom: "1rem" }}>Baseline Overview</h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="data-label" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Regions (Release 1)</span>
                  <p className="data-value" style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    {decisions.tsGeoRelease1.join(", ") || "—"}
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="data-label" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Selected Sources</span>
                  <p className="data-value" style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    {decisions.tsPortals.filter(p => p.selection === "Release 1").map(p => p.id).join(", ") || "—"}
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="data-label" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Core Terminology</span>
                  <p className="data-value" style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    {decisions.tsKeywordsStrong.slice(0, 4).join(", ") || "—"} (+ others)
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <button
                className="btn toggle-btn"
                onClick={() => updateDecision("tsGeoStatus", "Confirmed")}
                style={{ width: "100%", padding: "1rem", fontSize: "1rem", border: decisions.tsGeoStatus === "Confirmed" ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.2)", background: decisions.tsGeoStatus === "Confirmed" ? "rgba(45, 212, 191, 0.1)" : "rgba(255,255,255,0.05)", color: decisions.tsGeoStatus === "Confirmed" ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {decisions.tsGeoStatus === "Confirmed" ? "✓ Tender Scout baseline confirmed" : "Confirm Tender Scout Baseline"}
              </button>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "2 min",
        target: "Checkpoint",
        notes: [
          "Do not move to Innovation Radar until Tender Scout is formally confirmed."
        ]
      }
    },

    // --- 04 INNOVATION RADAR ---
    {
      id: "ir-pre-inputs",
      chapter: "04 Innovation Radar",
      title: "Innovation Radar — Current input",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Competitors: Elektroline, Furrer + Frey, Arthur Flury, Alstom, Siemens, SPL Powerlines (All High)<br /><br />Technology themes: De-icing systems, Catenary systems (High), Trolleybuses, Light rail, Overhead lines<br /><br />Market & Resources: Infrastructure (High), Copper (High), Aluminium (Medium)</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Define competitor signals, technology scope expansion, actionable market trends, alert cadences, and source watchlists.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <div className="highlight-box" style={{ background: "rgba(45, 212, 191, 0.1)", border: "1px solid rgba(45, 212, 191, 0.2)", borderRadius: "8px", padding: "1.5rem" }}>
              <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem", fontSize: "1rem" }}>Today's Objective</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6", margin: 0 }}>
                We will now map out the Innovation Radar parameters to track industry movements beyond just tenders. We will break this down into:
              </p>
              <ul style={{ color: "var(--accent)", fontSize: "0.9rem", marginTop: "1rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
                <li>Competitor Intelligence</li>
                <li>Technology Monitoring</li>
                <li>Market & Legislation</li>
                <li>Resources & Supply Chain</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "3 min",
        target: "Inputs summary",
        notes: [
          "Verify the competitors and priority layout.",
          "Prepare to allocate technologies and market signal definitions."
        ]
      }
    },
    {
      id: "ir-competitors",
      chapter: "04 Innovation Radar",
      title: "What should we actually monitor about competitors?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Competitors: Elektroline, Furrer + Frey, Arthur Flury, Alstom, Siemens, SPL Powerlines (All High)</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Select which specific categories of development matter to K+M, and determine if there is a Tier 1 subset.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h4 style={{ fontSize: "0.9rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>Signal Categories</h4>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {["New products/technologies", "Major projects", "Partnerships", "Strategic announcements", "Market expansion"].map(dev => {
                  const isSelected = decisions.irCompetitorDevelopments.includes(dev);
                  return (
                    <button
                      key={dev}
                      className={`btn toggle-btn ${isSelected ? "active" : ""}`}
                      style={{ border: isSelected ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: isSelected ? "rgba(45, 212, 191, 0.1)" : "rgba(255,255,255,0.05)", color: isSelected ? "var(--text-primary)" : "var(--text-secondary)", padding: "0.4rem 0.75rem", fontSize: "0.8rem", borderRadius: "6px" }}
                      onClick={() => {
                        if (isSelected) {
                          updateDecision("irCompetitorDevelopments", decisions.irCompetitorDevelopments.filter(x => x !== dev));
                        } else {
                          updateDecision("irCompetitorDevelopments", [...decisions.irCompetitorDevelopments, dev]);
                        }
                      }}
                    >
                      {isSelected && <span style={{ marginRight: "0.5rem", color: "var(--accent)" }}>✓</span>}
                      {dev}
                    </button>
                  );
                })}
              </div>

              <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Priority Refinement</h4>
              <label style={{ fontSize: "0.75rem", fontWeight: "500", display: "block", marginBottom: "1rem", color: "var(--text-muted)" }}>
                Are these competitors genuinely equal priority, or should there be a smaller Tier 1 group?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {decisions.irCompetitors.map((comp, idx) => (
                  <div key={comp.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: "500", color: "var(--text-primary)" }}>{comp.name}</span>
                    <select
                      value={comp.tier}
                      onChange={(e) => {
                        const copy = [...decisions.irCompetitors];
                        copy[idx].tier = e.target.value;
                        updateDecision("irCompetitors", copy);
                      }}
                      style={{ fontSize: "0.75rem", background: "rgba(0,0,0,0.3)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.3rem", borderRadius: "4px" }}
                    >
                      <option value="Tier 1">Tier 1</option>
                      <option value="Tier 2">Tier 2</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "4 min",
        target: "Competitors",
        notes: [
          "Decide what competitor news triggers alerts.",
          "Confirm if equal priorities stand or split into Tiers."
        ]
      }
    },
    {
      id: "ir-tech",
      chapter: "04 Innovation Radar",
      title: "Which technologies should Innovation Radar watch?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Themes: De-icing systems, Catenary systems (High). Trolleybuses, Light rail (Medium).</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Review, refine priorities, and add the new missing topics you noted.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div className="data-table-wrapper" style={{ margin: "0 0 1rem 0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", overflow: "hidden", background: "var(--card-bg)" }}>
              <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <th style={{ padding: "0.75rem", textAlign: "left", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "600" }}>Technology Topic</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "600" }}>Priority</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "600" }}>Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {decisions.irTechTopics.map((tech, idx) => (
                    <tr key={tech.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ fontWeight: "500", padding: "0.75rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>{tech.name}</td>
                      <td style={{ padding: "0.75rem" }}>
                        <select
                          value={tech.priority}
                          onChange={(e) => {
                            const copy = [...decisions.irTechTopics];
                            copy[idx].priority = e.target.value;
                            updateDecision("irTechTopics", copy);
                          }}
                          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", padding: "0.4rem", borderRadius: "4px", fontSize: "0.8rem" }}
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </td>
                      <td style={{ padding: "0.75rem" }}>
                        <div style={{ display: "flex", gap: "0.25rem" }}>
                          {["Release 1", "Later"].map(sel => (
                            <button
                              key={sel}
                              className={`btn toggle-btn ${tech.selection === sel ? "active" : ""}`}
                              style={{ fontSize: "0.75rem", padding: "0.3rem 0.5rem", border: tech.selection === sel ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: tech.selection === sel ? "rgba(45,212,191,0.1)" : "transparent", color: tech.selection === sel ? "var(--text-primary)" : "var(--text-muted)", borderRadius: "4px" }}
                              onClick={() => {
                                const copy = [...decisions.irTechTopics];
                                copy[idx].selection = sel;
                                updateDecision("irTechTopics", copy);
                              }}
                            >
                              {tech.selection === sel && <span style={{ marginRight: "0.25rem" }}>✓</span>}
                              {sel}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <input type="text" id="add-tech-input" placeholder="e.g. Hydrogen fuel cells in rail, Induction charging..." style={{ flexGrow: 1, padding: "0.75rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }} />
              <button className="btn btn-outline" style={{ padding: "0.75rem 1.5rem", borderColor: "rgba(255,255,255,0.2)", color: "var(--text-primary)" }} onClick={() => {
                const el = document.getElementById("add-tech-input");
                if (el && el.value.trim()) {
                  updateDecision("irTechTopics", [...decisions.irTechTopics, {
                    name: el.value.trim(),
                    priority: "High",
                    selection: "Release 1"
                  }]);
                  el.value = "";
                }
              }}>+ Add Technology Topic</button>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "5 min",
        target: "Tech watchlist",
        notes: [
          "Capture new technical topics to actively track.",
          "Force prioritization: 'If we could only track 5 tech themes well, which 5 matter most?'"
        ]
      }
    },
    {
      id: "ir-market",
      chapter: "04 Innovation Radar",
      title: "What market developments should trigger attention?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Market signals: "Infrastructure" (High).</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">"Infrastructure" is too broad. We need to define which specific market developments are decision-relevant.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h4 style={{ fontSize: "0.95rem", color: "var(--accent)", marginBottom: "0.75rem" }}>Select or type actionable market signals</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {["Infrastructure investment trends", "Pricing pressure", "Supply chain issues", "Government subsidies", "Decarbonization mandates"].map(sig => {
                  const isSelected = decisions.irMarketSignals.includes(sig);
                  return (
                    <button
                      key={sig}
                      className={`btn toggle-btn ${isSelected ? "active" : ""}`}
                      style={{ border: isSelected ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: isSelected ? "rgba(45, 212, 191, 0.1)" : "rgba(255,255,255,0.05)", color: isSelected ? "var(--text-primary)" : "var(--text-secondary)", padding: "0.5rem 1rem", fontSize: "0.85rem", borderRadius: "6px" }}
                      onClick={() => {
                        if (isSelected) {
                          updateDecision("irMarketSignals", decisions.irMarketSignals.filter(x => x !== sig));
                        } else {
                          updateDecision("irMarketSignals", [...decisions.irMarketSignals, sig]);
                        }
                      }}
                    >
                      {isSelected && <span style={{ marginRight: "0.5rem" }}>✓</span>}
                      {sig}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input type="text" id="add-market-input" placeholder="e.g. Overhead line standardization directives..." style={{ flexGrow: 1, padding: "0.6rem 1rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }} />
                <button className="btn btn-outline" style={{ padding: "0.6rem 1.25rem", borderColor: "rgba(255,255,255,0.2)", color: "var(--text-primary)" }} onClick={() => {
                  const el = document.getElementById("add-market-input");
                  if (el && el.value.trim()) {
                    updateDecision("irMarketSignals", [...decisions.irMarketSignals, el.value.trim()]);
                    el.value = "";
                  }
                }}>+ Add</button>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "4 min",
        target: "Market signals",
        notes: [
          "Avoid using terms like 'infrastructure' abstractly.",
          "Focus on what changes in the market Franc or Dennis would want to know early."
        ]
      }
    },
    {
      id: "ir-resources",
      chapter: "04 Innovation Radar",
      title: "What should we monitor about resources?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Resources: Copper (High), Aluminium (Medium).</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Define what "monitoring copper and aluminium" means in practice.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", color: "var(--accent)", marginBottom: "1rem" }}>Copper Watch triggers</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["Price", "Availability", "Supply conditions", "Major market developments"].map(opt => {
                    const isChecked = decisions.irResourcesCopper.includes(opt);
                    return (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "var(--text-primary)", fontSize: "0.9rem" }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              updateDecision("irResourcesCopper", decisions.irResourcesCopper.filter(x => x !== opt));
                            } else {
                              updateDecision("irResourcesCopper", [...decisions.irResourcesCopper, opt]);
                            }
                          }}
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>Aluminium Watch triggers</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["Price", "Availability", "Supply conditions", "Major market developments"].map(opt => {
                    const isChecked = decisions.irResourcesAluminium.includes(opt);
                    return (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "var(--text-primary)", fontSize: "0.9rem" }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              updateDecision("irResourcesAluminium", decisions.irResourcesAluminium.filter(x => x !== opt));
                            } else {
                              updateDecision("irResourcesAluminium", [...decisions.irResourcesAluminium, opt]);
                            }
                          }}
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "3 min",
        target: "Resources scope",
        notes: [
          "Understand triggers for resources.",
          "Do not design complex pricing dashboards live unless requested."
        ]
      }
    },
    {
      id: "ir-sources",
      chapter: "04 Innovation Radar",
      title: "How should we establish the initial source universe?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">No target sources were provided in the prep.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Determine the source universe discovery strategy.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
              {[
                { id: "Option A", label: "Option A", desc: "K+M provides specific must-have sources to track." },
                { id: "Option B", label: "Option B", desc: "nelio proposes a target list based on confirmed tech themes, and K+M validates it." },
                { id: "Option C", label: "Option C", desc: "A combination: nelio provides a seed set, and K+M adds mandatory sources." }
              ].map(opt => (
                <div
                  key={opt.id}
                  className={`card ${decisions.irSourcesApproach === opt.id ? "active-card" : ""}`}
                  style={{ cursor: "pointer", border: decisions.irSourcesApproach === opt.id ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: decisions.irSourcesApproach === opt.id ? "rgba(45, 212, 191, 0.1)" : "rgba(255,255,255,0.02)", padding: "1.25rem", marginBottom: 0 }}
                  onClick={() => updateDecision("irSourcesApproach", opt.id)}
                >
                  <h4 style={{ margin: "0 0 0.5rem 0", color: decisions.irSourcesApproach === opt.id ? "var(--text-primary)" : "var(--text-secondary)", fontSize: "1rem" }}>
                    {decisions.irSourcesApproach === opt.id && <span style={{ marginRight: "0.5rem", color: "var(--accent)" }}>✓</span>}
                    {opt.label}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: decisions.irSourcesApproach === opt.id ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-primary)" }}>Are there any initial sources you consider mandatory or particularly trusted?</label>
                <input
                  type="text"
                  value={decisions.irMandatorySources}
                  onChange={(e) => updateDecision("irMandatorySources", e.target.value)}
                  placeholder="e.g. UITP publications, Railway Gazette..."
                  style={{ marginTop: "0.5rem", padding: "0.75rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "3 min",
        target: "Sources strategy",
        notes: [
          "Select the preferred path to discover sources.",
          "Avoid endless listing of domains during the workshop; recommend Option B or C."
        ]
      }
    },
    {
      id: "ir-watchlist",
      chapter: "04 Innovation Radar",
      title: "What language should trigger radar attention?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Topics and terms discussed previously.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Establish core terms for the initial watchlist. We will expand and refine these after the workshop.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontWeight: "500", fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.5rem", display: "block" }}>Specify core terms, synonyms, and relevant technology names:</label>
                <textarea
                  value={decisions.irSeedWatchlist}
                  onChange={(e) => updateDecision("irSeedWatchlist", e.target.value)}
                  style={{ height: "140px", padding: "1rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                />
              </div>
              <div className="highlight-box" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "6px", fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                We will use these confirmed topics and seed terms to compile a structured keyword catalog for K+M approval.
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "3 min",
        target: "Taxonomy",
        notes: [
          "Capture terms and vocabulary variations.",
          "Explain that nelio does the dictionary finalization afterwards."
        ]
      }
    },
    {
      id: "ir-output",
      chapter: "04 Innovation Radar",
      title: "What makes an Innovation Radar item useful?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Needs for reporting and tracking.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Refine outputs, cadence, and alert recipients for R&D/Innovation users.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div className="card" style={{ padding: "1.5rem", marginBottom: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span className="data-label" style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Experience Delivery</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["Dashboard", "Weekly Digest", "Both"].map(opt => (
                    <button
                      key={opt}
                      className={`btn toggle-btn ${decisions.irOutputExperience === opt ? "active" : ""}`}
                      onClick={() => updateDecision("irOutputExperience", opt)}
                      style={{ fontSize: "0.8rem", padding: "0.5rem", flexGrow: 1, border: decisions.irOutputExperience === opt ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", background: decisions.irOutputExperience === opt ? "rgba(45, 212, 191, 0.1)" : "transparent", color: decisions.irOutputExperience === opt ? "var(--text-primary)" : "var(--text-muted)" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem", marginBottom: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span className="data-label" style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Push Cadence</span>
                <select
                  value={decisions.irAlertFrequency}
                  onChange={(e) => updateDecision("irAlertFrequency", e.target.value)}
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem", borderRadius: "6px", color: "var(--text-primary)", fontSize: "0.85rem" }}
                >
                  <option value="Real-time">Real-time</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-primary)", display: "block", marginBottom: "0.5rem" }}>Alert Recipient(s)</label>
                <input
                  type="text"
                  value={decisions.irAlertRecipient}
                  onChange={(e) => updateDecision("irAlertRecipient", e.target.value)}
                  placeholder="e.g. Dennis Darra + Franc Dugal"
                  style={{ padding: "0.6rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                />
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--accent)", display: "block", marginBottom: "0.5rem" }}>Release 1 must-haves:</label>
                  <textarea
                    value={decisions.irMustHaves}
                    onChange={(e) => updateDecision("irMustHaves", e.target.value)}
                    style={{ height: "60px", padding: "0.75rem", border: "1px solid rgba(45,212,191,0.2)", background: "rgba(45,212,191,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>Useful later (Nice-to-haves):</label>
                  <textarea
                    value={decisions.irNiceToHaves}
                    onChange={(e) => updateDecision("irNiceToHaves", e.target.value)}
                    style={{ height: "60px", padding: "0.75rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "4 min",
        target: "Output experience",
        notes: [
          "Clarify difference between daily dashboard exploration and weekly pushed summaries."
        ]
      }
    },
    {
      id: "ir-checkpoint",
      chapter: "04 Innovation Radar",
      title: "Innovation Radar Baseline Playback",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">The Innovation Radar baseline has been built during the workshop.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Please review and confirm the Innovation Radar implementation baseline.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", color: "var(--accent)", marginBottom: "1rem" }}>Baseline Overview</h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="data-label" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Competitors (Tier 1)</span>
                  <p className="data-value" style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    {decisions.irCompetitors.filter(c => c.tier === "Tier 1").map(c => c.name).join(", ") || "—"}
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="data-label" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Release 1 Tech Topics</span>
                  <p className="data-value" style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    {decisions.irTechTopics.filter(t => t.selection === "Release 1").map(t => t.name).join(", ") || "—"}
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="data-label" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Resources Monitored</span>
                  <p className="data-value" style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    Copper ({decisions.irResourcesCopper.join("/")}) · Aluminium ({decisions.irResourcesAluminium.join("/")})
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <button
                className="btn toggle-btn"
                onClick={() => updateDecision("irTechStatus", "Confirmed")}
                style={{ width: "100%", padding: "1rem", fontSize: "1rem", border: decisions.irTechStatus === "Confirmed" ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.2)", background: decisions.irTechStatus === "Confirmed" ? "rgba(45, 212, 191, 0.1)" : "rgba(255,255,255,0.05)", color: decisions.irTechStatus === "Confirmed" ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {decisions.irTechStatus === "Confirmed" ? "✓ Innovation Radar baseline confirmed" : "Confirm Innovation Radar Baseline"}
              </button>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "2 min",
        target: "Checkpoint",
        notes: [
          "Confirm baseline before moving to Ownership."
        ]
      }
    },

    // --- 05 OWNERSHIP & ALIGNMENT ---
    {
      id: "ownership",
      chapter: "05 Ownership",
      title: "Who owns what from here?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Different stakeholders are involved across the organization.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">Verify responsibilities and assign the sign-off ownership of the Phase 0 baseline.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>Tender Scout Owner</label>
                  <input type="text" value={decisions.ownerTenderScout} onChange={(e) => updateDecision("ownerTenderScout", e.target.value)} style={{ padding: "0.6rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px", width: "100%" }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>Innovation Radar Owner</label>
                  <input type="text" value={decisions.ownerInnovationRadar} onChange={(e) => updateDecision("ownerInnovationRadar", e.target.value)} style={{ padding: "0.6rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px", width: "100%" }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>IT / Security Rep</label>
                  <input type="text" value={decisions.ownerITSecurity} onChange={(e) => updateDecision("ownerITSecurity", e.target.value)} style={{ padding: "0.6rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px", width: "100%" }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontWeight: "500", fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>Project Coordinator</label>
                  <input type="text" value={decisions.coordinatorProject} onChange={(e) => updateDecision("coordinatorProject", e.target.value)} style={{ padding: "0.6rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px", width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: "500", fontSize: "1rem", color: "var(--accent)", display: "block", marginBottom: "0.75rem" }}>Who gives final business confirmation of the Phase 0 baseline?</label>
                <input
                  type="text"
                  value={decisions.finalSignoffOwner}
                  onChange={(e) => updateDecision("finalSignoffOwner", e.target.value)}
                  placeholder="e.g. Fawzi Fattel & Dennis Darra"
                  style={{ padding: "0.75rem", border: "1px solid rgba(45,212,191,0.3)", background: "rgba(45,212,191,0.05)", color: "var(--text-primary)", borderRadius: "6px", width: "100%", fontSize: "1rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "6 min",
        target: "Ownership",
        notes: [
          "Confirm stakeholders.",
          "Must record who holds final sign-off authority."
        ]
      }
    },
    {
      id: "constraints",
      chapter: "05 Ownership",
      title: "Are there any remaining constraints?",
      content: (
        <div className="slide-dashboard-layout">
          <div className="dashboard-left">
            <div className="context-box">
              <div className="context-title">What you told us</div>
              <p className="context-content">Feasibility is always key.</p>
            </div>
            <div className="context-box" style={{ background: "rgba(45, 212, 191, 0.05)", borderColor: "rgba(45, 212, 191, 0.2)" }}>
              <div className="context-title" style={{ color: "var(--accent)" }}>What we need to lock today</div>
              <p className="context-content">A brief check for items that might impact implementation feasibility.</p>
            </div>
          </div>
          <div className="dashboard-right">
            <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Decision</h3>
            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: "500", fontSize: "0.95rem", color: "var(--text-primary)", display: "block", marginBottom: "0.75rem" }}>Are there any additional compliance, architecture, or timing constraints to track?</label>
                <textarea
                  value={decisions.additionalConstraints}
                  onChange={(e) => updateDecision("additionalConstraints", e.target.value)}
                  style={{ height: "140px", padding: "1rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-primary)", borderRadius: "6px" }}
                  placeholder="e.g. Strict data localization guidelines..."
                />
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "2 min",
        target: "Feasibility review",
        notes: [
          "Ask if there are any new constraints. Keep it to one minute."
        ]
      }
    },

    // --- 06 SUMMARY & NEXT STEPS ---
    {
      id: "playback",
      chapter: "06 Decisions & next steps",
      title: "Phase 0 Baseline — Confirmed Today",
      content: (
        <div className="slide-dashboard-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="dashboard-right" style={{ padding: "0" }}>
            <div className="card" style={{ padding: "2rem" }}>
              <p className="slide-p" style={{ marginBottom: "2rem", color: "var(--text-secondary)", fontSize: "1rem" }}>This is the consolidated implementation baseline built live from your workshop decisions.</p>

              <div className="grid-2" style={{ gap: "2rem" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h3 style={{ color: "var(--accent)", fontSize: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>Tender Scout</h3>
                  <ul className="slide-list-none" style={{ fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-primary)" }}>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Priority Geography</strong> {decisions.tsGeoRelease1.join(", ") || "—"}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Release 1 Sources</strong> {decisions.tsPortals.filter(p => p.selection === "Release 1").map(p => p.id).join(", ") || "—"}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Includes / Excludes</strong> In: {decisions.tsIncludes.join(" / ") || "—"} <br /> Ex: {decisions.tsExcludes.join(" / ") || "—"}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Keywords Grouping</strong> {decisions.tsKeywordsStrong.slice(0, 4).join(", ")} ...</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Contractor Watchlist</strong> {decisions.tsTrackContractors} {decisions.tsContractorWatchlist ? `(${decisions.tsContractorWatchlist})` : ""}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Experience cadence</strong> {decisions.tsOutputExperience} / {decisions.tsAlertFrequency}</li>
                  </ul>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h3 style={{ color: "var(--accent)", fontSize: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>Innovation Radar</h3>
                  <ul className="slide-list-none" style={{ fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-primary)" }}>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Competitors</strong> {decisions.irCompetitors.filter(c => c.tier === "Tier 1").map(c => c.name).join(", ")}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Technology Topics</strong> {decisions.irTechTopics.filter(t => t.selection === "Release 1").map(t => t.name).join(", ") || "—"}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Market Signals</strong> {decisions.irMarketSignals.join(", ") || "—"}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Resources</strong> Copper ({decisions.irResourcesCopper.join("/")}) · Aluminium ({decisions.irResourcesAluminium.join("/")})</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Sources Strategy</strong> {decisions.irSourcesApproach}</li>
                    <li style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}><strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>R&D Alert</strong> {decisions.irAlertRecipient} ({decisions.irAlertFrequency})</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "4 min",
        target: "Review summary",
        notes: [
          "Display this compiled slide deck baseline report.",
          "Highlight that today's decisions have successfully defined the product."
        ]
      }
    },
    {
      id: "open-items",
      chapter: "06 Decisions & next steps",
      title: "Remaining Actions",
      content: (
        <div className="slide-dashboard-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="dashboard-right" style={{ padding: 0 }}>
            <div className="card" style={{ padding: "2rem" }}>
              <p className="slide-p" style={{ marginBottom: "1.5rem", color: "var(--text-secondary)" }}>Actions and deliverables to complete after the baseline lock.</p>

              <div className="data-table-wrapper" style={{ margin: "0 0 1.5rem 0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", overflow: "hidden" }}>
                <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: "600" }}>Action Item</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: "600" }}>Owner</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: "600" }}>Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisions.openItems.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "0.75rem 1rem", color: "var(--text-primary)", fontSize: "0.95rem" }}>{item.item}</td>
                        <td style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>{item.owner}</td>
                        <td style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>{item.deadline}</td>
                      </tr>
                    ))}
                    {decisions.openItems.length === 0 && (
                      <tr>
                        <td colSpan="3" style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontStyle: "italic" }}>No action items recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <input type="text" id="action-item-input" placeholder="e.g. Confirm sam.gov target API availability" style={{ flexGrow: 1, padding: "0.6rem 1rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", color: "var(--text-primary)", borderRadius: "6px" }} />
                <input type="text" id="action-owner-input" placeholder="Owner (e.g. Leon)" style={{ width: "160px", padding: "0.6rem 1rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", color: "var(--text-primary)", borderRadius: "6px" }} />
                <input type="text" id="action-date-input" placeholder="Date (YYYY-MM-DD)" style={{ width: "160px", padding: "0.6rem 1rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", color: "var(--text-primary)", borderRadius: "6px" }} />
                <button className="btn btn-outline" style={{ borderColor: "rgba(45,212,191,0.5)", color: "var(--accent)" }} onClick={() => {
                  const itemEl = document.getElementById("action-item-input");
                  const ownerEl = document.getElementById("action-owner-input");
                  const dateEl = document.getElementById("action-date-input");
                  if (itemEl?.value.trim() && ownerEl?.value.trim() && dateEl?.value.trim()) {
                    updateDecision("openItems", [...decisions.openItems, {
                      item: itemEl.value.trim(),
                      owner: ownerEl.value.trim(),
                      deadline: dateEl.value.trim()
                    }]);
                    itemEl.value = "";
                    ownerEl.value = "";
                    dateEl.value = "";
                  }
                }}>+ Add</button>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "3 min",
        target: "Action plan",
        notes: [
          "Brutally short list. Every open item must have exactly one owner and one date."
        ]
      }
    },
    {
      id: "finish",
      chapter: "06 Decisions & next steps",
      title: "Ready for the next step",
      content: (
        <div className="slide-dashboard-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="dashboard-right" style={{ padding: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="animate-fade-in" style={{ margin: "auto", textAlign: "center", padding: "4rem 2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", maxWidth: "700px", width: "100%" }}>
              <div style={{ fontSize: "5rem", marginBottom: "1.5rem", filter: "drop-shadow(0 0 20px rgba(45,212,191,0.3))" }}>🚀</div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--accent)" }}>Workshop Concluded</h2>
              <p className="subtitle" style={{ maxWidth: "540px", margin: "0 auto 3rem auto", color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                Today's decisions will be consolidated into the finalized Phase 0 baseline report and used as the direct basis for implementation.
              </p>

              <div className="card" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "left", padding: "2rem", background: "rgba(0,0,0,0.2)" }}>
                <h4 style={{ fontSize: "0.9rem", color: "var(--accent)", textTransform: "uppercase", marginBottom: "1.25rem", letterSpacing: "0.05em" }}>Upcoming Milestones</h4>
                <ul className="slide-list-none" style={{ margin: 0, display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", color: "var(--text-primary)" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><span style={{ color: "var(--accent)" }}>1.</span> Consolidation & sharing of confirmed baseline</li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><span style={{ color: "var(--accent)" }}>2.</span> Closing of any remaining open action items</li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><span style={{ color: "var(--accent)" }}>3.</span> Launch implementation preparation tasks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      facilitator: {
        time: "1 min",
        target: "Conclude",
        notes: [
          "State next steps and wrap up the session. Keep it to one minute."
        ]
      }
    }
  ];


  // Keyboard Navigation Effect
  useEffect(() => {
    if (!started) return;
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;

      if (e.key === "ArrowRight") {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "F" || e.key === "f") {
        if (e.shiftKey) setFacilitatorMode(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started, steps.length]);

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(err => console.log("Fullscreen API error:", err));
    }
    setStarted(true);
  };

  if (!started) {
    return (
      <div style={{ height: "100vh", width: "100vw", display: "flex", background: "var(--bg-color)", position: "relative", overflowY: "auto", overflowX: "hidden" }}>
        {/* Ambient Background Blobs */}
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(45,212,191,0.04) 0%, transparent 60%)", borderRadius: "50%", zIndex: 0 }}></div>
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(45,212,191,0.03) 0%, transparent 60%)", borderRadius: "50%", zIndex: 0 }}></div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", width: "100%", minHeight: "100%", padding: "3rem 8%", alignItems: "center", flexWrap: "wrap" }}>

          {/* Left Column: Title & Action */}
          <div className="animate-fade-in" style={{ flex: "1 1 50%", display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: "4rem" }}>
            <div style={{ width: "60px", height: "4px", background: "var(--accent)", marginBottom: "2.5rem" }}></div>
            <h1 style={{ fontSize: "4.25rem", color: "var(--text-primary)", fontWeight: "300", lineHeight: "1.05", marginBottom: "2rem", letterSpacing: "-0.03em" }}>
              Phase 0 <br /><span style={{ fontWeight: "700" }}>Workshop.</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.25rem", marginBottom: "2.5rem", maxWidth: "480px", lineHeight: "1.6", fontWeight: "300" }}>
              Review insights, confirm the baseline, and align on the implementation roadmap.
            </p>

            <div>
              <button
                className="btn btn-primary"
                onClick={enterFullscreen}
                style={{ fontSize: "1.05rem", padding: "1.25rem 2.5rem", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "600", transition: "all 0.3s ease", boxShadow: "0 10px 25px rgba(45,212,191,0.15)", border: "none" }}
              >
                Begin Session
                <span style={{ fontSize: "1.5rem", lineHeight: "1", fontWeight: "400" }}>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Agenda */}
          <div className="animate-fade-in" style={{ flex: "1 1 50%", display: "flex", flexDirection: "column", justifyContent: "center", animationDelay: "0.2s" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "2.5rem 3.5rem", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.25rem" }}>
                Today's Agenda
              </h3>

              <ul className="slide-list-none" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { num: "01", title: "Opening", desc: "Welcome and structure" },
                  { num: "02", title: "Baseline", desc: "Project focus and scope" },
                  { num: "03", title: "Tender Scout", desc: "Sources and keywords" },
                  { num: "04", title: "Innovation Radar", desc: "Competitors and signals" },
                  { num: "05", title: "Ownership", desc: "Internal responsibilities" },
                  { num: "06", title: "Decisions & next steps", desc: "Locking the baseline" }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1.5rem", fontWeight: "300", fontFamily: "monospace", lineHeight: "1.2" }}>{item.num}</span>
                    <div>
                      <h4 style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "0 0 0.35rem 0", fontWeight: "400", letterSpacing: "-0.01em" }}>{item.title}</h4>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "300" }}>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentChapter = steps[currentStep].chapter;

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex", background: "var(--bg-color)", position: "relative" }}>

      {/* FULL BLEED SLIDE CONTAINER */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>

        {/* PROGRESS BAR (Minimalist Top) */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", zIndex: 10 }}>
          <div style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, background: "var(--accent)", height: "100%", transition: "width 0.3s ease" }}></div>
        </div>

        {/* INVISIBLE NAVIGATION ZONES */}
        <div
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          style={{ position: "absolute", left: 0, top: 0, width: "6%", height: "100%", zIndex: 20, cursor: currentStep === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          className="nav-zone"
          title="Previous Slide (or Left Arrow)"
        >
          {currentStep > 0 && <span className="nav-chevron">‹</span>}
        </div>

        <div
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
          style={{ position: "absolute", right: 0, top: 0, width: "6%", height: "100%", zIndex: 20, cursor: currentStep === steps.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          className="nav-zone"
          title="Next Slide (or Right Arrow)"
        >
          {currentStep < steps.length - 1 && <span className="nav-chevron">›</span>}
        </div>

        {/* SLIDE CONTENT */}
        <div style={{ flexGrow: 1, padding: "4rem 8%", display: "flex", flexDirection: "column", overflowY: "auto", position: "relative", zIndex: 5 }}>
          <div style={{ paddingBottom: "1.5rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", display: "block", marginBottom: "0.5rem" }}>{currentChapter}</span>
              <h2 style={{ color: "var(--text-primary)", fontSize: "2.25rem", margin: 0, fontWeight: "300" }}>{steps[currentStep].title}</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{currentStep + 1} / {steps.length}</span>
              <button
                onClick={() => setFacilitatorMode(!facilitatorMode)}
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-muted)", padding: "0.4rem 0.8rem", borderRadius: "20px", fontSize: "0.75rem", cursor: "pointer" }}
                title="Toggle Facilitator Mode (Shift+F)"
              >
                {facilitatorMode ? "Hide Notes" : "Show Notes"}
              </button>
            </div>
          </div>

          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
            {steps[currentStep].content}
          </div>
        </div>
      </div>

      {/* FACILITATOR OVERLAY DRAWER */}
      {facilitatorMode && (
        <div className="animate-fade-in" style={{ position: "fixed", right: 0, top: 0, width: "28%", minWidth: "300px", maxWidth: "400px", height: "100vh", background: "rgba(11, 15, 25, 0.98)", borderLeft: "1px solid rgba(255,255,255,0.1)", zIndex: 50, padding: "2rem", overflowY: "auto", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "-10px 0 30px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--accent)", margin: 0 }}>Facilitator Notes</h3>
            <button onClick={() => setFacilitatorMode(false)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.5rem" }}>×</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Time Target</span>
              <span style={{ color: "var(--accent)", fontSize: "0.95rem", fontWeight: "500" }}>{steps[currentStep].facilitator?.time || "—"}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Focus Area</span>
              <span style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: "500" }}>{steps[currentStep].facilitator?.target || "—"}</span>
            </div>
          </div>

          <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em", marginBottom: "1rem" }}>Guiding Notes</h4>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {steps[currentStep].facilitator?.notes.map((note, idx) => (
              <li key={idx} style={{ lineHeight: "1.5" }}>{note}</li>
            ))}
          </ul>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "2rem", paddingTop: "1.5rem" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em", display: "block", marginBottom: "0.75rem" }}>Private Scratchpad</span>
            <textarea
              placeholder="Type temporary session notes here..."
              style={{ width: "100%", height: "150px", fontSize: "0.9rem", background: "rgba(0,0,0,0.3)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem", borderRadius: "8px", resize: "vertical" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
