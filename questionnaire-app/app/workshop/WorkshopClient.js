"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function WorkshopClient({ latestSubmission, participants }) {
  // Facilitator Mode Toggle
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
        <div className="animate-fade-in">
          <p className="slide-p">Your current input is "Europe" and "North America". We need a specific starting country scope for Release 1.</p>
          
          <div className="grid-3" style={{ gap: "1rem", margin: "1.5rem 0" }}>
            <div className="card">
              <h4 style={{ fontSize: "0.9rem", color: "var(--accent)", marginBottom: "0.75rem" }}>Release 1</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {decisions.tsGeoRelease1.map(c => (
                  <span key={c} className="participant-pill" style={{ cursor: "pointer", border: "1px solid var(--accent)" }} onClick={() => {
                    updateDecision("tsGeoRelease1", decisions.tsGeoRelease1.filter(x => x !== c));
                    updateDecision("tsGeoNext", [...decisions.tsGeoNext, c]);
                  }}>{c} &rarr;</span>
                ))}
                {decisions.tsGeoRelease1.length === 0 && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>Empty. Click item below to add.</span>}
              </div>
            </div>

            <div className="card">
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Next priority</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {decisions.tsGeoNext.map(c => (
                  <span key={c} className="participant-pill" style={{ cursor: "pointer" }} onClick={() => {
                    updateDecision("tsGeoNext", decisions.tsGeoNext.filter(x => x !== c));
                    updateDecision("tsGeoExcluded", [...decisions.tsGeoExcluded, c]);
                  }}>{c} &rarr;</span>
                ))}
                {decisions.tsGeoNext.length === 0 && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>Empty.</span>}
              </div>
            </div>

            <div className="card">
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Excluded / later</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {decisions.tsGeoExcluded.map(c => (
                  <span key={c} className="participant-pill" style={{ cursor: "pointer", opacity: 0.6 }} onClick={() => {
                    updateDecision("tsGeoExcluded", decisions.tsGeoExcluded.filter(x => x !== c));
                    updateDecision("tsGeoRelease1", [...decisions.tsGeoRelease1, c]);
                  }}>{c} &rarr;</span>
                ))}
                {decisions.tsGeoExcluded.length === 0 && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>Empty.</span>}
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeft: "3px solid #ff9900", marginTop: "1rem" }}>
            <h4 style={{ color: "#ff9900", margin: "0 0 0.5rem 0", fontSize: "1rem" }}>⚠️ Source-Scope Inconsistency</h4>
            <p style={{ margin: "0 0 1rem 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              AusTender is currently listed as a target portal, but Australia is not in your priority geographic scope.
            </p>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
              Should Australia be in the initial Release 1 geographic scope, or is AusTender for later?
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className={`btn ${decisions.tsAustraliaDecision === "Initial Scope" ? "btn-primary" : "btn-outline"}`} onClick={() => {
                updateDecision("tsAustraliaDecision", "Initial Scope");
                updateDecision("tsGeoRelease1", [...decisions.tsGeoRelease1.filter(x => x !== "Australia"), "Australia"]);
                updateDecision("tsGeoExcluded", decisions.tsGeoExcluded.filter(x => x !== "Australia"));
              }}>Include Australia in Release 1</button>
              <button className={`btn ${decisions.tsAustraliaDecision === "Later Phase" ? "btn-primary" : "btn-outline"}`} onClick={() => {
                updateDecision("tsAustraliaDecision", "Later Phase");
                updateDecision("tsGeoRelease1", decisions.tsGeoRelease1.filter(x => x !== "Australia"));
                updateDecision("tsGeoExcluded", [...decisions.tsGeoExcluded.filter(x => x !== "Australia"), "Australia"]);
              }}>Exclude Australia (Later Phase)</button>
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
        <div className="animate-fade-in">
          <p className="slide-p">Select the target portals for the first release. SAM.gov has no specified priority currently.</p>
          <div className="submission-grid" style={{ margin: "1.5rem 0" }}>
            {decisions.tsPortals.map((p, idx) => (
              <div className="card" key={p.id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span className="submission-title" style={{ fontSize: "1rem" }}>{p.name}</span>
                <span className="data-label">Questionnaire Priority: {p.priority}</span>
                <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.5rem" }}>
                  {["Release 1", "Later", "Not Required"].map(sel => (
                    <button 
                      key={sel}
                      className={`btn toggle-btn ${p.selection === sel ? "active" : ""}`}
                      style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
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
            <label style={{ fontWeight: "600" }}>Are any must-have tender sources missing from this list?</label>
            <input 
              type="text" 
              value={decisions.tsMissingSources}
              onChange={(e) => updateDecision("tsMissingSources", e.target.value)}
              placeholder="e.g. Simap.ch (Switzerland), etc..."
            />
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
        <div className="animate-fade-in">
          <p className="slide-p">No project types or exclusions were defined in the questionnaire. Let's establish inclusion/exclusion criteria.</p>
          
          <div className="grid-2" style={{ gap: "2rem", margin: "1.5rem 0" }}>
            <div className="card">
              <h3 style={{ color: "var(--accent)", fontSize: "1.1rem" }}>INCLUDE Opportunities</h3>
              <ul className="slide-list-none">
                {decisions.tsIncludes.map((inc, i) => (
                  <li key={i} style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
                    &bull; {inc}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <input type="text" id="add-include-input" placeholder="e.g. Catenary line installations" style={{ flexGrow: 1 }} />
                <button className="btn btn-outline" onClick={() => {
                  const el = document.getElementById("add-include-input");
                  if (el && el.value.trim()) {
                    updateDecision("tsIncludes", [...decisions.tsIncludes, el.value.trim()]);
                    el.value = "";
                  }
                }}>+ Add</button>
              </div>
            </div>

            <div className="card">
              <h3 style={{ color: "red", fontSize: "1.1rem" }}>EXCLUDE Opportunities</h3>
              <ul className="slide-list-none">
                {decisions.tsExcludes.map((exc, i) => (
                  <li key={i} style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
                    &bull; {exc}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <input type="text" id="add-exclude-input" placeholder="e.g. Rolling stock or locomotive delivery" style={{ flexGrow: 1 }} />
                <button className="btn btn-outline" onClick={() => {
                  const el = document.getElementById("add-exclude-input");
                  if (el && el.value.trim()) {
                    updateDecision("tsExcludes", [...decisions.tsExcludes, el.value.trim()]);
                    el.value = "";
                  }
                }}>+ Add</button>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: "2rem" }}>
            <div className="form-group">
              <label style={{ fontWeight: "600" }}>Example of a clearly RELEVANT tender:</label>
              <textarea 
                value={decisions.tsExampleRelevant}
                onChange={(e) => updateDecision("tsExampleRelevant", e.target.value)}
                placeholder="e.g. 'Installation of 15km overhead contact lines between Zurich and Bern...'"
                style={{ height: "60px" }}
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: "600" }}>Example of a clearly IRRELEVANT tender:</label>
              <textarea 
                value={decisions.tsExampleIrrelevant}
                onChange={(e) => updateDecision("tsExampleIrrelevant", e.target.value)}
                placeholder="e.g. 'Delivery of 10 new electric locomotives...'"
                style={{ height: "60px" }}
              />
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
        <div className="animate-fade-in">
          <p className="slide-p">Categorize the draft terminology to establish the search taxonomy.</p>
          
          <div className="grid-3" style={{ gap: "1rem", margin: "1.5rem 0" }}>
            <div className="card">
              <h4 style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Strong Signals</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {decisions.tsKeywordsStrong.map(k => (
                  <span key={k} className="participant-pill" style={{ cursor: "pointer", border: "1px solid var(--accent)" }} onClick={() => {
                    updateDecision("tsKeywordsStrong", decisions.tsKeywordsStrong.filter(x => x !== k));
                    updateDecision("tsKeywordsSupporting", [...decisions.tsKeywordsSupporting, k]);
                  }}>{k} &rarr;</span>
                ))}
              </div>
            </div>

            <div className="card">
              <h4 style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Supporting Signals</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {decisions.tsKeywordsSupporting.map(k => (
                  <span key={k} className="participant-pill" style={{ cursor: "pointer" }} onClick={() => {
                    updateDecision("tsKeywordsSupporting", decisions.tsKeywordsSupporting.filter(x => x !== k));
                    updateDecision("tsKeywordsExcluded", [...decisions.tsKeywordsExcluded, k]);
                  }}>{k} &rarr;</span>
                ))}
              </div>
            </div>

            <div className="card">
              <h4 style={{ color: "red", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Exclusion terms</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {decisions.tsKeywordsExcluded.map(k => (
                  <span key={k} className="participant-pill" style={{ cursor: "pointer", opacity: 0.6 }} onClick={() => {
                    updateDecision("tsKeywordsExcluded", decisions.tsKeywordsExcluded.filter(x => x !== k));
                    updateDecision("tsKeywordsStrong", [...decisions.tsKeywordsStrong, k]);
                  }}>{k} &rarr;</span>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: "600" }}>Are important synonyms, translations, or technical terms missing?</label>
            <input 
              type="text" 
              value={decisions.tsKeywordSynonyms}
              onChange={(e) => updateDecision("tsKeywordSynonyms", e.target.value)}
              placeholder="e.g. Oberleitung (German), Caténaire (French)..."
            />
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
        <div className="animate-fade-in">
          <p className="slide-p">No contractors were specified in the questionnaire. Do we need prime contractor tracking for sub-contracting alerts?</p>
          <div style={{ display: "flex", gap: "1rem", margin: "1.5rem 0" }}>
            {["Yes — important for Release 1", "Useful later", "Not required"].map(opt => (
              <button 
                key={opt}
                className={`btn ${decisions.tsTrackContractors === opt ? "btn-primary" : "btn-outline"}`}
                onClick={() => updateDecision("tsTrackContractors", opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {decisions.tsTrackContractors === "Yes — important for Release 1" && (
            <div className="form-group animate-fade-in">
              <label style={{ fontWeight: "600" }}>Which contractors should form the initial watchlist?</label>
              <textarea 
                value={decisions.tsContractorWatchlist}
                onChange={(e) => updateDecision("tsContractorWatchlist", e.target.value)}
                placeholder="e.g. Siemens Mobility, Alstom, Colas Rail..."
                style={{ height: "80px" }}
              />
            </div>
          )}
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
        <div className="animate-fade-in">
          <p className="slide-p">Determine the alert experience, frequency, and Release 1 deliverables.</p>
          
          <div className="submission-grid" style={{ margin: "1.5rem 0" }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span className="data-label">Primary Experience</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["Dashboard", "Email Digest", "Both"].map(opt => (
                  <button 
                    key={opt} 
                    className={`btn toggle-btn ${decisions.tsOutputExperience === opt ? "active" : ""}`}
                    onClick={() => updateDecision("tsOutputExperience", opt)}
                    style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span className="data-label">Alert Recipient</span>
              <input 
                type="text" 
                value={decisions.tsAlertRecipient}
                onChange={(e) => updateDecision("tsAlertRecipient", e.target.value)}
                placeholder="e.g. Sales Team"
                style={{ marginTop: "0.25rem" }}
              />
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span className="data-label">Cadence / Frequency</span>
              <select 
                value={decisions.tsAlertFrequency}
                onChange={(e) => updateDecision("tsAlertFrequency", e.target.value)}
                style={{ background: "#0a0a0a", border: "1px solid var(--border-color)", padding: "0.5rem", borderRadius: "6px", color: "var(--text-primary)" }}
              >
                <option value="Real-time">Real-time</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>

          <div className="grid-2" style={{ gap: "2rem" }}>
            <div className="form-group">
              <label style={{ fontWeight: "600" }}>Release 1 must-haves for Tender Scout output:</label>
              <textarea 
                value={decisions.tsMustHaves}
                onChange={(e) => updateDecision("tsMustHaves", e.target.value)}
                style={{ height: "60px" }}
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: "600" }}>Useful later (Nice-to-haves):</label>
              <textarea 
                value={decisions.tsNiceToHaves}
                onChange={(e) => updateDecision("tsNiceToHaves", e.target.value)}
                style={{ height: "60px" }}
              />
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
        <div className="animate-fade-in">
          <p className="slide-p">Please review and confirm the Tender Scout implementation baseline.</p>
          <div className="submission-grid" style={{ margin: "2rem 0" }}>
            <div className="card">
              <span className="data-label">Regions (Release 1)</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
                {decisions.tsGeoRelease1.join(", ") || "—"}
              </p>
            </div>
            <div className="card">
              <span className="data-label">Selected Sources</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
                {decisions.tsPortals.filter(p => p.selection === "Release 1").map(p => p.id).join(", ") || "—"}
              </p>
            </div>
            <div className="card">
              <span className="data-label">Core Terminology</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
                {decisions.tsKeywordsStrong.slice(0, 4).join(", ") || "—"} (+ others)
              </p>
            </div>
          </div>

          <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
            <button 
              className={`btn ${decisions.tsGeoStatus === "Confirmed" ? "btn-primary" : "btn-outline"}`}
              onClick={() => updateDecision("tsGeoStatus", "Confirmed")}
            >
              {decisions.tsGeoStatus === "Confirmed" ? "✓ Tender Scout baseline confirmed" : "Confirm Tender Scout Baseline"}
            </button>
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
        <div className="animate-fade-in">
          <p className="slide-p">What we validated from your questionnaire preparation:</p>
          <div className="submission-grid" style={{ margin: "1.5rem 0" }}>
            <div className="card">
              <span className="data-label">Competitors</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                Elektroline, Furrer + Frey, Arthur Flury, Alstom, Siemens, SPL Powerlines (All High)
              </p>
            </div>
            <div className="card">
              <span className="data-label">Initial Technology themes</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                De-icing systems, Catenary systems (High) <br />
                Trolleybuses, Light rail, Overhead lines
              </p>
            </div>
            <div className="card">
              <span className="data-label">Market & Resources</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                Infrastructure (High) <br />
                Copper (High) · Aluminium (Medium)
              </p>
            </div>
          </div>

          <div className="highlight-box">
            <strong>Today we need to define:</strong> Competitor signals · Technology scope expansion · Actionable market trends · Alert cadences · Source watchlists
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
        <div className="animate-fade-in">
          <p className="slide-p">The competitors are known. Select which specific categories of development matter to K+M.</p>
          
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
            {["New products/technologies", "Major projects", "Partnerships", "Strategic announcements", "Market expansion"].map(dev => {
              const isSelected = decisions.irCompetitorDevelopments.includes(dev);
              return (
                <button 
                  key={dev} 
                  className={`btn toggle-btn ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    if (isSelected) {
                      updateDecision("irCompetitorDevelopments", decisions.irCompetitorDevelopments.filter(x => x !== dev));
                    } else {
                      updateDecision("irCompetitorDevelopments", [...decisions.irCompetitorDevelopments, dev]);
                    }
                  }}
                >
                  {dev}
                </button>
              );
            })}
          </div>

          <div className="card" style={{ marginTop: "1rem" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Priority Refinement</h4>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
              Are these competitors genuinely equal priority, or should there be a smaller Tier 1 group?
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              {decisions.irCompetitors.map((comp, idx) => (
                <div key={comp.name} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", padding: "0.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "6px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>{comp.name}</span>
                  <select 
                    value={comp.tier}
                    onChange={(e) => {
                      const copy = [...decisions.irCompetitors];
                      copy[idx].tier = e.target.value;
                      updateDecision("irCompetitors", copy);
                    }}
                    style={{ fontSize: "0.75rem", background: "#0a0a0a", color: "var(--text-primary)", border: "1px solid var(--border-color)", padding: "0.15rem" }}
                  >
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 2">Tier 2</option>
                  </select>
                </div>
              ))}
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
        <div className="animate-fade-in">
          <p className="slide-p">K+M indicated that "lot more will come in workshop". Review, refine priorities, and add new topics.</p>
          
          <div className="data-table-wrapper" style={{ margin: "1.5rem 0" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Technology Topic</th>
                  <th>Priority</th>
                  <th>Scope Selection</th>
                </tr>
              </thead>
              <tbody>
                {decisions.irTechTopics.map((tech, idx) => (
                  <tr key={tech.name}>
                    <td style={{ fontWeight: "600" }}>{tech.name}</td>
                    <td>
                      <select 
                        value={tech.priority}
                        onChange={(e) => {
                          const copy = [...decisions.irTechTopics];
                          copy[idx].priority = e.target.value;
                          updateDecision("irTechTopics", copy);
                        }}
                        style={{ background: "#0a0a0a", border: "1px solid var(--border-color)", color: "#fff", padding: "0.2rem" }}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        {["Release 1", "Later"].map(sel => (
                          <button 
                            key={sel}
                            className={`btn toggle-btn ${tech.selection === sel ? "active" : ""}`}
                            style={{ fontSize: "0.75rem", padding: "0.15rem 0.4rem" }}
                            onClick={() => {
                              const copy = [...decisions.irTechTopics];
                              copy[idx].selection = sel;
                              updateDecision("irTechTopics", copy);
                            }}
                          >
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

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <input type="text" id="add-tech-input" placeholder="e.g. Hydrogen fuel cells in rail, Induction charging..." style={{ flexGrow: 1 }} />
            <button className="btn btn-outline" onClick={() => {
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
        <div className="animate-fade-in">
          <p className="slide-p">"Infrastructure" is too broad. We need to define which specific market developments are decision-relevant.</p>
          
          <div className="card" style={{ margin: "1.5rem 0" }}>
            <h4 style={{ fontSize: "0.95rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Select or type actionable market signals</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              {["Infrastructure investment trends", "Pricing pressure", "Supply chain issues", "Government subsidies", "Decarbonization mandates"].map(sig => {
                const isSelected = decisions.irMarketSignals.includes(sig);
                return (
                  <button 
                    key={sig}
                    className={`btn toggle-btn ${isSelected ? "active" : ""}`}
                    onClick={() => {
                      if (isSelected) {
                        updateDecision("irMarketSignals", decisions.irMarketSignals.filter(x => x !== sig));
                      } else {
                        updateDecision("irMarketSignals", [...decisions.irMarketSignals, sig]);
                      }
                    }}
                  >
                    {sig}
                  </button>
                );
              })}
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input type="text" id="add-market-input" placeholder="e.g. Overhead line standardization directives..." style={{ flexGrow: 1 }} />
              <button className="btn btn-outline" onClick={() => {
                const el = document.getElementById("add-market-input");
                if (el && el.value.trim()) {
                  updateDecision("irMarketSignals", [...decisions.irMarketSignals, el.value.trim()]);
                  el.value = "";
                }
              }}>+ Add</button>
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
        <div className="animate-fade-in">
          <p className="slide-p">Define what "monitoring copper (High) and aluminium (Medium)" means in practice.</p>
          
          <div className="grid-2" style={{ gap: "2rem", margin: "1.5rem 0" }}>
            <div className="card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--accent)" }}>Copper Watch triggers</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                {["Price", "Availability", "Supply conditions", "Major market developments"].map(opt => {
                  const isChecked = decisions.irResourcesCopper.includes(opt);
                  return (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
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

            <div className="card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Aluminium Watch triggers</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                {["Price", "Availability", "Supply conditions", "Major market developments"].map(opt => {
                  const isChecked = decisions.irResourcesAluminium.includes(opt);
                  return (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
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
        <div className="animate-fade-in">
          <p className="slide-p">No target sources were provided in the prep. Determine the source universe discovery strategy.</p>
          
          <div className="submission-grid" style={{ margin: "1.5rem 0" }}>
            {[
              { id: "Option A", label: "Option A", desc: "K+M provides specific must-have sources to track." },
              { id: "Option B", label: "Option B", desc: "nelio proposes a target list based on confirmed tech themes, and K+M validates it." },
              { id: "Option C", label: "Option C", desc: "A combination: nelio provides a seed set, and K+M adds mandatory sources." }
            ].map(opt => (
              <div 
                key={opt.id}
                className={`card ${decisions.irSourcesApproach === opt.id ? "active-card" : ""}`}
                style={{ cursor: "pointer", border: decisions.irSourcesApproach === opt.id ? "1px solid var(--accent)" : "1px solid var(--border-color)" }}
                onClick={() => updateDecision("irSourcesApproach", opt.id)}
              >
                <h4 style={{ margin: "0 0 0.5rem 0" }}>{opt.label}</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>{opt.desc}</p>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label style={{ fontWeight: "600" }}>Are there any initial sources you consider mandatory or particularly trusted?</label>
            <input 
              type="text" 
              value={decisions.irMandatorySources}
              onChange={(e) => updateDecision("irMandatorySources", e.target.value)}
              placeholder="e.g. UITP publications, Railway Gazette..."
            />
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
        <div className="animate-fade-in">
          <p className="slide-p">Establish core terms for the initial watchlist. We will expand and refine these after the workshop.</p>
          <div className="form-group" style={{ margin: "2rem 0" }}>
            <label style={{ fontWeight: "600" }}>Specify core terms, synonyms, and relevant technology names:</label>
            <textarea 
              value={decisions.irSeedWatchlist}
              onChange={(e) => updateDecision("irSeedWatchlist", e.target.value)}
              style={{ height: "120px" }}
            />
          </div>
          <div className="highlight-box">
            We will use these confirmed topics and seed terms to compile a structured keyword catalog for K+M approval.
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
        <div className="animate-fade-in">
          <p className="slide-p">Refine outputs,cadence, and alert recipients for R&D/Innovation users.</p>
          
          <div className="submission-grid" style={{ margin: "1.5rem 0" }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span className="data-label">Experience Delivery</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["Dashboard", "Weekly Digest", "Both"].map(opt => (
                  <button 
                    key={opt}
                    className={`btn toggle-btn ${decisions.irOutputExperience === opt ? "active" : ""}`}
                    onClick={() => updateDecision("irOutputExperience", opt)}
                    style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span className="data-label">Alert Recipient</span>
              <input 
                type="text" 
                value={decisions.irAlertRecipient}
                onChange={(e) => updateDecision("irAlertRecipient", e.target.value)}
                placeholder="e.g. Dennis Darra + Franc Dugal"
                style={{ marginTop: "0.25rem" }}
              />
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span className="data-label">Push Cadence</span>
              <select 
                value={decisions.irAlertFrequency}
                onChange={(e) => updateDecision("irAlertFrequency", e.target.value)}
                style={{ background: "#0a0a0a", border: "1px solid var(--border-color)", padding: "0.5rem", borderRadius: "6px", color: "var(--text-primary)" }}
              >
                <option value="Real-time">Real-time</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>

          <div className="grid-2" style={{ gap: "2rem" }}>
            <div className="form-group">
              <label style={{ fontWeight: "600" }}>Release 1 must-haves for Innovation Radar:</label>
              <textarea 
                value={decisions.irMustHaves}
                onChange={(e) => updateDecision("irMustHaves", e.target.value)}
                style={{ height: "60px" }}
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: "600" }}>Useful later (Nice-to-haves):</label>
              <textarea 
                value={decisions.irNiceToHaves}
                onChange={(e) => updateDecision("irNiceToHaves", e.target.value)}
                style={{ height: "60px" }}
              />
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
        <div className="animate-fade-in">
          <p className="slide-p">Please review and confirm the Innovation Radar implementation baseline.</p>
          <div className="submission-grid" style={{ margin: "2rem 0" }}>
            <div className="card">
              <span className="data-label">Competitors (Tier 1)</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
                {decisions.irCompetitors.filter(c => c.tier === "Tier 1").map(c => c.name).join(", ") || "—"}
              </p>
            </div>
            <div className="card">
              <span className="data-label">Release 1 Tech Topics</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
                {decisions.irTechTopics.filter(t => t.selection === "Release 1").map(t => t.name).join(", ") || "—"}
              </p>
            </div>
            <div className="card">
              <span className="data-label">Resources Monitored</span>
              <p className="data-value" style={{ margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
                Copper ({decisions.irResourcesCopper.join("/")}) · Aluminium ({decisions.irResourcesAluminium.join("/")})
              </p>
            </div>
          </div>

          <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
            <button 
              className={`btn ${decisions.irTechStatus === "Confirmed" ? "btn-primary" : "btn-outline"}`}
              onClick={() => updateDecision("irTechStatus", "Confirmed")}
            >
              {decisions.irTechStatus === "Confirmed" ? "✓ Innovation Radar baseline confirmed" : "Confirm Innovation Radar Baseline"}
            </button>
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
        <div className="animate-fade-in">
          <p className="slide-p">Verify responsibilities and assign the sign-off ownership of the Phase 0 baseline.</p>
          
          <div className="submission-grid" style={{ margin: "1.5rem 0" }}>
            <div className="card">
              <span className="data-label">Tender Scout Owner</span>
              <input type="text" value={decisions.ownerTenderScout} onChange={(e) => updateDecision("ownerTenderScout", e.target.value)} style={{ marginTop: "0.25rem" }} />
            </div>
            <div className="card">
              <span className="data-label">Innovation Radar Owner</span>
              <input type="text" value={decisions.ownerInnovationRadar} onChange={(e) => updateDecision("ownerInnovationRadar", e.target.value)} style={{ marginTop: "0.25rem" }} />
            </div>
            <div className="card">
              <span className="data-label">IT / Security Rep</span>
              <input type="text" value={decisions.ownerITSecurity} onChange={(e) => updateDecision("ownerITSecurity", e.target.value)} style={{ marginTop: "0.25rem" }} />
            </div>
            <div className="card">
              <span className="data-label">Project Coordinator</span>
              <input type="text" value={decisions.coordinatorProject} onChange={(e) => updateDecision("coordinatorProject", e.target.value)} style={{ marginTop: "0.25rem" }} />
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem" }}>Who gives final business confirmation of the Phase 0 baseline?</h4>
            <input 
              type="text" 
              value={decisions.finalSignoffOwner} 
              onChange={(e) => updateDecision("finalSignoffOwner", e.target.value)}
              placeholder="e.g. Fawzi Fattel & Dennis Darra"
              style={{ maxWidth: "360px" }}
            />
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
        <div className="animate-fade-in">
          <p className="slide-p">A brief check for items that might impact implementation feasibility.</p>
          <div className="form-group" style={{ margin: "2rem 0" }}>
            <label style={{ fontWeight: "600" }}>Are there any additional compliance, architecture, or timing constraints to track?</label>
            <textarea 
              value={decisions.additionalConstraints}
              onChange={(e) => updateDecision("additionalConstraints", e.target.value)}
              style={{ height: "100px" }}
              placeholder="e.g. Strict data localization guidelines..."
            />
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
        <div className="animate-fade-in" style={{ maxHeight: "460px", overflowY: "auto", paddingRight: "0.5rem" }}>
          <p className="slide-p" style={{ marginBottom: "1.5rem" }}>This is the consolidated implementation baseline built live from your workshop decisions.</p>
          
          <div className="grid-2" style={{ gap: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--accent)", fontSize: "1.15rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Tender Scout</h3>
              <ul className="slide-list-none" style={{ fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                <li><strong>Priority Geography:</strong> {decisions.tsGeoRelease1.join(", ") || "—"}</li>
                <li><strong>Release 1 Sources:</strong> {decisions.tsPortals.filter(p => p.selection === "Release 1").map(p => p.id).join(", ") || "—"}</li>
                <li><strong>Includes:</strong> {decisions.tsIncludes.join(" / ") || "—"}</li>
                <li><strong>Excludes:</strong> {decisions.tsExcludes.join(" / ") || "—"}</li>
                <li><strong>Keywords Grouping:</strong> {decisions.tsKeywordsStrong.slice(0, 4).join(", ")} ...</li>
                <li><strong>Contractor Watchlist:</strong> {decisions.tsTrackContractors} {decisions.tsContractorWatchlist ? `(${decisions.tsContractorWatchlist})` : ""}</li>
                <li><strong>Experience cadence:</strong> {decisions.tsOutputExperience} / {decisions.tsAlertFrequency} alerts</li>
              </ul>
            </div>

            <div>
              <h3 style={{ color: "var(--text-secondary)", fontSize: "1.15rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Innovation Radar</h3>
              <ul className="slide-list-none" style={{ fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                <li><strong>Competitors:</strong> {decisions.irCompetitors.filter(c => c.tier === "Tier 1").map(c => c.name).join(", ")}</li>
                <li><strong>Technology Topics:</strong> {decisions.irTechTopics.filter(t => t.selection === "Release 1").map(t => t.name).join(", ") || "—"}</li>
                <li><strong>Market Signals:</strong> {decisions.irMarketSignals.join(", ") || "—"}</li>
                <li><strong>Resources:</strong> Copper ({decisions.irResourcesCopper.join("/")}) · Aluminium ({decisions.irResourcesAluminium.join("/")})</li>
                <li><strong>Sources Strategy:</strong> {decisions.irSourcesApproach}</li>
                <li><strong>R&D alert recipient:</strong> {decisions.irAlertRecipient} ({decisions.irAlertFrequency})</li>
              </ul>
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
        <div className="animate-fade-in">
          <p className="slide-p">Actions and deliverables to complete after the baseline lock.</p>
          
          <div className="data-table-wrapper" style={{ margin: "1.5rem 0" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Action Item</th>
                  <th>Owner</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {decisions.openItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.item}</td>
                    <td>{item.owner}</td>
                    <td>{item.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input type="text" id="action-item-input" placeholder="e.g. Confirm sam.gov target API availability" style={{ flexGrow: 1 }} />
            <input type="text" id="action-owner-input" placeholder="Owner (e.g. Leon)" style={{ width: "160px" }} />
            <input type="text" id="action-date-input" placeholder="Date (YYYY-MM-DD)" style={{ width: "140px" }} />
            <button className="btn btn-outline" onClick={() => {
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
            }}>+ Add Item</button>
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
        <div className="animate-fade-in" style={{ textAlign: "center", padding: "3rem 0" }}>
          <div style={{ fontSize: "4.5rem", marginBottom: "1.5rem" }}>🚀</div>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Workshop Concluded</h2>
          <p className="subtitle" style={{ maxWidth: "500px", margin: "0 auto 2rem auto", color: "var(--text-secondary)" }}>
            Today's decisions will be consolidated into the finalized Phase 0 baseline report and used as the direct basis for implementation.
          </p>

          <div className="card" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "left" }}>
            <h4 style={{ fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.75rem" }}>Upcoming Milestones</h4>
            <ul className="slide-list-none" style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
              <li>1. Consolidation & sharing of confirmed baseline</li>
              <li>2. Closing of any remaining open action items</li>
              <li>3. Launch implementation preparation tasks</li>
            </ul>
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

  const currentChapter = steps[currentStep].chapter;

  return (
    <div className={`container ${facilitatorMode ? "facilitator-layout-split" : ""}`} style={{ maxWidth: facilitatorMode ? "100%" : "1000px", padding: facilitatorMode ? "2rem 4rem" : "2rem 1rem" }}>
      
      {/* HEADER SECTION */}
      <div className="nav-bar" style={{ marginBottom: "2rem" }}>
        <div className="nav-logo">K+M Workshop Dashboard</div>
        <div className="nav-links">
          <Link href="/" className="nav-link">Questionnaire</Link>
          <Link href="/agenda" className="nav-link">Agenda</Link>
          <Link href="/submissions" className="nav-link">Submissions</Link>
          <button 
            className={`btn toggle-btn ${facilitatorMode ? "active" : ""}`}
            onClick={() => setFacilitatorMode(!facilitatorMode)}
            style={{ marginLeft: "1rem" }}
          >
            {facilitatorMode ? "Hide Facilitator View 👤" : "Show Facilitator View 👤"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "3rem" }}>
        
        {/* CLIENT MAIN PRESENTATION VIEW */}
        <div className="slide-container" style={{ flexGrow: 1, width: facilitatorMode ? "68%" : "100%" }}>
          <div className="slide-frame-full" style={{ minHeight: "540px" }}>
            
            {/* PROGRESS INDICATOR */}
            <div className="slide-progress" style={{ margin: 0, height: "4px" }}>
              <div
                className="slide-progress-bar"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>

            <div className="slide-card-full" style={{ minHeight: "480px" }}>
              <div className="slide-card-header" style={{ paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span className="badge" style={{ marginBottom: "0.25rem" }}>{currentChapter}</span>
                  <h2>{steps[currentStep].title}</h2>
                </div>
                <span className="time-tag-presentation" style={{ background: "rgba(255,255,255,0.02)", color: "var(--text-muted)" }}>
                  Slide {currentStep + 1} of {steps.length}
                </span>
              </div>
              <div className="slide-card-body">
                {steps[currentStep].content}
              </div>
            </div>

            {/* CONTROLS */}
            <div className="slide-controls-bottom" style={{ marginTop: "1.5rem" }}>
              <button
                className="btn btn-outline"
                style={{ minWidth: "120px" }}
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                &larr; Previous
              </button>

              <div className="slide-dots-stepper">
                {steps.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`slide-dot-btn ${currentStep === idx ? "active" : ""}`}
                    onClick={() => setCurrentStep(idx)}
                    style={{ width: "24px", height: "24px", fontSize: "0.6rem" }}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                className="btn btn-primary"
                style={{ minWidth: "120px" }}
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next &rarr;"}
              </button>
            </div>

          </div>
        </div>

        {/* FACILITATOR NOTES PANEL VIEW */}
        {facilitatorMode && (
          <div className="facilitator-panel-sidebar card animate-fade-in" style={{ width: "30%", minWidth: "300px", padding: "1.5rem", background: "rgba(45, 212, 191, 0.02)", borderLeft: "2px solid var(--accent)", flexShrink: 0 }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--accent)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", margin: "0 0 1rem 0" }}>
              Facilitator Guidelines
            </h3>
            
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
              <div className="data-group">
                <span className="data-label">Time Target</span>
                <span className="data-value" style={{ color: "var(--accent)" }}>{steps[currentStep].facilitator?.time || "—"}</span>
              </div>
              <div className="data-group">
                <span className="data-label">Focus Area</span>
                <span className="data-value">{steps[currentStep].facilitator?.target || "—"}</span>
              </div>
            </div>

            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Guiding Notes & Gaps to Lock:
            </h4>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {steps[currentStep].facilitator?.notes.map((note, idx) => (
                <li key={idx} style={{ lineHeight: "1.4" }}>{note}</li>
              ))}
            </ul>

            <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "2rem", paddingTop: "1.25rem" }}>
              <span className="data-label">Private Notes</span>
              <textarea 
                placeholder="Type temporary session notes here..."
                style={{ width: "100%", height: "100px", marginTop: "0.5rem", fontSize: "0.8rem", background: "#0a0a0a", border: "1px solid var(--border-color)" }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
