"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubmissionsClient({ submissions }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const parseJSON = (str) => {
    try {
      return str ? JSON.parse(str) : [];
    } catch (e) {
      return [];
    }
  };

  const downloadMarkdown = (sub, idx) => {
    const participants = parseJSON(sub.workshopParticipants);
    const tsRegions = parseJSON(sub.tsPriorityRegions);
    const tsPortals = parseJSON(sub.tsTenderPortals);
    const tsKeywords = parseJSON(sub.tsKeywords);
    const tsContractors = parseJSON(sub.tsContractors);
    const irCompetitors = parseJSON(sub.irCompetitors);
    const irTechThemes = parseJSON(sub.irTechThemes);
    const irMarketTopics = parseJSON(sub.irMarketTopics);
    const irResourceTopics = parseJSON(sub.irResourceTopics);
    const irSources = parseJSON(sub.irSources);
    const irKeywords = parseJSON(sub.irKeywords);
    const tsUsers = parseJSON(sub.usersTenderScout);
    const irUsers = parseJSON(sub.usersInnovation);
    const tsAlerts = parseJSON(sub.alertsTenderScout);
    const irAlerts = parseJSON(sub.alertsInnovation);

    let md = `# K+M Project: Requirements Questionnaire Submission\n\n`;
    md += `**Submission Date:** ${new Date(sub.createdAt).toLocaleString()}\n`;
    md += `**Submission ID:** ${sub.id}\n`;
    md += `**Tender Scout Owner:** ${sub.tsOwnerName || "TBD"}\n\n`;
    md += `---\n\n`;

    md += `## 1. Key Contacts & Workshop Participants\n\n`;
    md += `### Key Contacts\n`;
    md += `* **Tender Scout Owner:** ${sub.tsOwnerName || "—"} (${sub.tsOwnerRole || "No Role"}) - ${sub.tsOwnerEmail || "No Email"}\n`;
    md += `* **Innovation Radar Owner:** ${sub.irOwnerName || "—"} (${sub.irOwnerRole || "No Role"}) - ${sub.irOwnerEmail || "No Email"}\n`;
    md += `* **IT / Security Contact:** ${sub.itContactName || "—"} (${sub.itContactRole || "No Role"}) - ${sub.itContactEmail || "No Email"}\n\n`;

    md += `### Workshop Participants\n`;
    if (participants.length === 0) {
      md += `*No participants listed.*\n\n`;
    } else {
      md += `| Name | Role | Topic / Reason |\n`;
      md += `| --- | --- | --- |\n`;
      participants.forEach(p => {
        md += `| ${p.name || "—"} | ${p.role || "—"} | ${p.topic || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `## 2. Tender Scout Settings\n\n`;
    md += `### Key Inputs\n`;
    md += `* **Project Types:** ${sub.tsProjectTypes || "—"}\n`;
    md += `* **Exclusions:** ${sub.tsExclusions || "—"}\n\n`;

    md += `### Priority Regions / Countries\n`;
    if (tsRegions.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Region / Country | Priority | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      tsRegions.forEach(r => {
        md += `| ${r.region || "—"} | ${r.priority || "—"} | ${r.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Tender Portals\n`;
    if (tsPortals.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Portal Name | URL | Priority |\n`;
      md += `| --- | --- | --- |\n`;
      tsPortals.forEach(p => {
        md += `| ${p.name || "—"} | ${p.url || "—"} | ${p.priority || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Keywords Watchlist\n`;
    if (tsKeywords.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Keyword | Action | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      tsKeywords.forEach(k => {
        md += `| ${k.keyword || "—"} | ${k.action || "—"} | ${k.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Key Contractors Tracked\n`;
    if (tsContractors.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Contractor Name | Region | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      tsContractors.forEach(c => {
        md += `| ${c.name || "—"} | ${c.region || "—"} | ${c.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `## 3. Innovation Radar Settings\n\n`;
    md += `### Competitors\n`;
    if (irCompetitors.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Competitor Name | Priority | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      irCompetitors.forEach(c => {
        md += `| ${c.name || "—"} | ${c.priority || "—"} | ${c.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Technology Themes\n`;
    if (irTechThemes.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Theme | Priority | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      irTechThemes.forEach(t => {
        md += `| ${t.theme || "—"} | ${t.priority || "—"} | ${t.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Market Developments\n`;
    if (irMarketTopics.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Topic | Priority | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      irMarketTopics.forEach(m => {
        md += `| ${m.theme || "—"} | ${m.priority || "—"} | ${m.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Resource & Commodity Topics\n`;
    if (irResourceTopics.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Topic | Priority | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      irResourceTopics.forEach(r => {
        md += `| ${r.theme || "—"} | ${r.priority || "—"} | ${r.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Sources Watchlist\n`;
    if (irSources.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Source Name | URL | Priority |\n`;
      md += `| --- | --- | --- |\n`;
      irSources.forEach(s => {
        md += `| ${s.name || "—"} | ${s.url || "—"} | ${s.priority || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `### Keywords Watchlist\n`;
    if (irKeywords.length === 0) {
      md += `*None listed.*\n\n`;
    } else {
      md += `| Keyword | Category | Notes |\n`;
      md += `| --- | --- | --- |\n`;
      irKeywords.forEach(k => {
        md += `| ${k.keyword || "—"} | ${k.category || "—"} | ${k.notes || "—"} |\n`;
      });
      md += `\n`;
    }

    md += `## 4. Outputs & Users\n\n`;
    md += `### User Groups\n`;
    md += `* **Tender Scout Users:**\n`;
    if (tsUsers.length === 0) {
      md += `  *None listed.*\n`;
    } else {
      tsUsers.forEach(u => {
        md += `  * **${u.user || "—"}:** ${u.purpose || "—"}\n`;
      });
    }
    md += `* **Innovation Radar Users:**\n`;
    if (irUsers.length === 0) {
      md += `  *None listed.*\n`;
    } else {
      irUsers.forEach(u => {
        md += `  * **${u.user || "—"}:** ${u.purpose || "—"}\n`;
      });
    }
    md += `\n`;

    md += `### Alert Recipients\n`;
    md += `* **Tender Scout Alerts:**\n`;
    if (tsAlerts.length === 0) {
      md += `  *None listed.*\n`;
    } else {
      tsAlerts.forEach(a => {
        md += `  * **${a.recipient || "—"}** (${a.type || "—"}) - Frequency: ${a.frequency || "—"}\n`;
      });
    }
    md += `* **Innovation Radar Alerts:**\n`;
    if (irAlerts.length === 0) {
      md += `  *None listed.*\n`;
    } else {
      irAlerts.forEach(a => {
        md += `  * **${a.recipient || "—"}** (${a.type || "—"}) - Frequency: ${a.frequency || "—"}\n`;
      });
    }
    md += `\n`;

    md += `### First Release Focus\n`;
    md += `* **Must-Haves for Release 1:** ${sub.mustHaves || "—"}\n`;
    md += `* **Nice-to-Haves for Future:** ${sub.niceToHaves || "—"}\n\n`;

    md += `## 5. Constraints & Additional Notes\n\n`;
    md += `* **Constraints:** ${sub.constraints || "—"}\n`;

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `km_requirements_submission_${submissions.length - idx}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      {/* Top Navigation */}
      <div className="nav-bar">
        <div className="nav-logo">K+M Requirements</div>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Questionnaire
          </Link>
          <Link href="/agenda" className="nav-link">
            Workshop Agenda
          </Link>
          <Link href="/submissions" className="nav-link active">
            Submissions
          </Link>
        </div>
      </div>

      <div className="header">
        <div className="badge">
          <span className="badge-dot"></span>
          DATABASE RECORDS
        </div>
        <h1>Filled Submissions</h1>
        <p className="subtitle">Overview of all filled requirements questionnaires</p>
      </div>

      {submissions.length === 0 ? (
        <div className="card empty-state-box">
          <p>No questionnaire data submitted yet.</p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Fill Questionnaire
          </Link>
        </div>
      ) : (
        <div className="submission-list">
          {submissions.map((sub, idx) => {
            const isExpanded = expandedId === sub.id;
            const submissionDate = new Date(sub.createdAt).toLocaleString();
            
            // Parsed JSON fields
            const participants = parseJSON(sub.workshopParticipants);
            const tsRegions = parseJSON(sub.tsPriorityRegions);
            const tsPortals = parseJSON(sub.tsTenderPortals);
            const tsKeywords = parseJSON(sub.tsKeywords);
            const tsContractors = parseJSON(sub.tsContractors);
            const irCompetitors = parseJSON(sub.irCompetitors);
            const irTechThemes = parseJSON(sub.irTechThemes);
            const irMarketTopics = parseJSON(sub.irMarketTopics);
            const irResourceTopics = parseJSON(sub.irResourceTopics);
            const irSources = parseJSON(sub.irSources);
            const irKeywords = parseJSON(sub.irKeywords);
            const tsUsers = parseJSON(sub.usersTenderScout);
            const irUsers = parseJSON(sub.usersInnovation);
            const tsAlerts = parseJSON(sub.alertsTenderScout);
            const irAlerts = parseJSON(sub.alertsInnovation);

            return (
              <div className="submission-card" key={sub.id}>
                <div className="submission-header" onClick={() => toggleExpand(sub.id)}>
                  <div className="submission-header-info">
                    <h2 className="submission-title">
                      Submission #{submissions.length - idx} - {sub.tsOwnerName || "Unknown Owner"}
                    </h2>
                    <span className="submission-meta">
                      Submitted on: {submissionDate} | ID: {sub.id}
                    </span>
                  </div>
                  <div className="submission-actions">
                    <button 
                      className="btn btn-outline" 
                      style={{ marginRight: "0.75rem" }} 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadMarkdown(sub, idx);
                      }}
                    >
                      📥 Download Doc
                    </button>
                    <button className="btn btn-outline" style={{ minWidth: "120px" }} onClick={() => toggleExpand(sub.id)}>
                      {isExpanded ? "Collapse ▲" : "View Details ▼"}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="submission-details">
                    
                    {/* Section 1: Contacts */}
                    <div className="submission-sec">
                      <h3>1. Key Contacts & Workshop Participants</h3>
                      <div className="submission-grid">
                        <div className="data-group">
                          <span className="data-label">Tender Scout Owner</span>
                          <span className="data-value">
                            {sub.tsOwnerName || "—"} ({sub.tsOwnerRole || "No Role"})
                            {sub.tsOwnerEmail && <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{sub.tsOwnerEmail}</div>}
                          </span>
                        </div>
                        <div className="data-group">
                          <span className="data-label">Innovation Radar Owner</span>
                          <span className="data-value">
                            {sub.irOwnerName || "—"} ({sub.irOwnerRole || "No Role"})
                            {sub.irOwnerEmail && <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{sub.irOwnerEmail}</div>}
                          </span>
                        </div>
                        <div className="data-group">
                          <span className="data-label">IT / Security Contact</span>
                          <span className="data-value">
                            {sub.itContactName || "—"} ({sub.itContactRole || "No Role"})
                            {sub.itContactEmail && <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{sub.itContactEmail}</div>}
                          </span>
                        </div>
                      </div>

                      <div style={{ marginTop: "1.25rem" }}>
                        <span className="data-label">Workshop Participants</span>
                        {participants.length === 0 ? (
                          <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>No participants listed.</div>
                        ) : (
                          <div className="data-table-wrapper">
                            <table className="data-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Role</th>
                                  <th>Topic / Reason</th>
                                </tr>
                              </thead>
                              <tbody>
                                {participants.map((p, pIdx) => (
                                  <tr key={pIdx}>
                                    <td>{p.name || "—"}</td>
                                    <td>{p.role || "—"}</td>
                                    <td>{p.topic || "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 2: Tender Scout */}
                    <div className="submission-sec">
                      <h3>2. Tender Scout</h3>
                      <div className="submission-grid" style={{ marginBottom: "1rem" }}>
                        <div className="data-group">
                          <span className="data-label">Project Types</span>
                          <span className="data-value" style={{ whiteSpace: "pre-wrap" }}>{sub.tsProjectTypes || "—"}</span>
                        </div>
                        <div className="data-group">
                          <span className="data-label">Exclusions</span>
                          <span className="data-value" style={{ whiteSpace: "pre-wrap" }}>{sub.tsExclusions || "—"}</span>
                        </div>
                      </div>

                      <div className="submission-grid" style={{ gap: "1.5rem", marginTop: "1rem" }}>
                        <div>
                          <span className="data-label">Priority Regions</span>
                          {tsRegions.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Region / Country</th>
                                    <th>Priority</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tsRegions.map((r, rIdx) => (
                                    <tr key={rIdx}>
                                      <td>{r.region || "—"}</td>
                                      <td>{r.priority || "—"}</td>
                                      <td>{r.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="data-label">Tender Portals</span>
                          {tsPortals.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Portal Name</th>
                                    <th>URL</th>
                                    <th>Priority</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tsPortals.map((p, pIdx) => (
                                    <tr key={pIdx}>
                                      <td>{p.name || "—"}</td>
                                      <td>{p.url ? <a href={p.url} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{p.url}</a> : "—"}</td>
                                      <td>{p.priority || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="submission-grid" style={{ gap: "1.5rem", marginTop: "1.25rem" }}>
                        <div>
                          <span className="data-label">Keywords Watchlist</span>
                          {tsKeywords.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Keyword</th>
                                    <th>Action</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tsKeywords.map((k, kIdx) => (
                                    <tr key={kIdx}>
                                      <td>{k.keyword || "—"}</td>
                                      <td>{k.action || "—"}</td>
                                      <td>{k.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="data-label">Tracked Contractors</span>
                          {tsContractors.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Contractor Name</th>
                                    <th>Region</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tsContractors.map((c, cIdx) => (
                                    <tr key={cIdx}>
                                      <td>{c.name || "—"}</td>
                                      <td>{c.region || "—"}</td>
                                      <td>{c.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Innovation Radar */}
                    <div className="submission-sec">
                      <h3>3. Innovation Radar</h3>
                      <div className="submission-grid" style={{ gap: "1.5rem" }}>
                        <div>
                          <span className="data-label">Competitors Monitored</span>
                          {irCompetitors.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Company Name</th>
                                    <th>Priority</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irCompetitors.map((c, cIdx) => (
                                    <tr key={cIdx}>
                                      <td>{c.name || "—"}</td>
                                      <td>{c.priority || "—"}</td>
                                      <td>{c.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="data-label">Technology Themes</span>
                          {irTechThemes.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Theme</th>
                                    <th>Priority</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irTechThemes.map((t, tIdx) => (
                                    <tr key={tIdx}>
                                      <td>{t.theme || "—"}</td>
                                      <td>{t.priority || "—"}</td>
                                      <td>{t.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="submission-grid" style={{ gap: "1.5rem", marginTop: "1.25rem" }}>
                        <div>
                          <span className="data-label">Market Topics</span>
                          {irMarketTopics.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Topic</th>
                                    <th>Priority</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irMarketTopics.map((m, mIdx) => (
                                    <tr key={mIdx}>
                                      <td>{m.theme || "—"}</td>
                                      <td>{m.priority || "—"}</td>
                                      <td>{m.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="data-label">Resource / Commodity Topics</span>
                          {irResourceTopics.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Theme</th>
                                    <th>Priority</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irResourceTopics.map((r, rIdx) => (
                                    <tr key={rIdx}>
                                      <td>{r.theme || "—"}</td>
                                      <td>{r.priority || "—"}</td>
                                      <td>{r.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="submission-grid" style={{ gap: "1.5rem", marginTop: "1.25rem" }}>
                        <div>
                          <span className="data-label">Sources Watchlist</span>
                          {irSources.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Source Name</th>
                                    <th>URL</th>
                                    <th>Priority</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irSources.map((s, sIdx) => (
                                    <tr key={sIdx}>
                                      <td>{s.name || "—"}</td>
                                      <td>{s.url ? <a href={s.url} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{s.url}</a> : "—"}</td>
                                      <td>{s.priority || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="data-label">Innovation Keywords</span>
                          {irKeywords.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Keyword</th>
                                    <th>Category</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irKeywords.map((k, kIdx) => (
                                    <tr key={kIdx}>
                                      <td>{k.keyword || "—"}</td>
                                      <td>{k.category || "—"}</td>
                                      <td>{k.notes || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Outputs and Users */}
                    <div className="submission-sec">
                      <h3>4. Outputs & Users</h3>
                      <div className="submission-grid" style={{ gap: "1.5rem" }}>
                        <div>
                          <span className="data-label">Tender Scout Users</span>
                          {tsUsers.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>User / Team</th>
                                    <th>Purpose</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tsUsers.map((u, uIdx) => (
                                    <tr key={uIdx}>
                                      <td>{u.user || "—"}</td>
                                      <td>{u.purpose || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="data-label">Innovation Radar Users</span>
                          {irUsers.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None listed.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>User / Team</th>
                                    <th>Purpose</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irUsers.map((u, uIdx) => (
                                    <tr key={uIdx}>
                                      <td>{u.user || "—"}</td>
                                      <td>{u.purpose || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="submission-grid" style={{ gap: "1.5rem", marginTop: "1.25rem" }}>
                        <div>
                          <span className="data-label">Tender Scout Alerts</span>
                          {tsAlerts.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Recipient</th>
                                    <th>Type</th>
                                    <th>Frequency</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tsAlerts.map((a, aIdx) => (
                                    <tr key={aIdx}>
                                      <td>{a.recipient || "—"}</td>
                                      <td>{a.type || "—"}</td>
                                      <td>{a.frequency || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="data-label">Innovation Radar Alerts</span>
                          {irAlerts.length === 0 ? (
                            <div className="data-value" style={{ fontStyle: "italic", opacity: 0.6 }}>None.</div>
                          ) : (
                            <div className="data-table-wrapper">
                              <table className="data-table">
                                <thead>
                                  <tr>
                                    <th>Recipient</th>
                                    <th>Type</th>
                                    <th>Frequency</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {irAlerts.map((a, aIdx) => (
                                    <tr key={aIdx}>
                                      <td>{a.recipient || "—"}</td>
                                      <td>{a.type || "—"}</td>
                                      <td>{a.frequency || "—"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="submission-grid" style={{ marginTop: "1.25rem" }}>
                        <div className="data-group">
                          <span className="data-label">Must-Haves for Release 1</span>
                          <span className="data-value" style={{ whiteSpace: "pre-wrap" }}>{sub.mustHaves || "—"}</span>
                        </div>
                        <div className="data-group">
                          <span className="data-label">Nice-to-Haves</span>
                          <span className="data-value" style={{ whiteSpace: "pre-wrap" }}>{sub.niceToHaves || "—"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: Constraints & Additional Notes */}
                    <div className="submission-sec">
                      <h3>5. Constraints & Additional Notes</h3>
                      <div className="data-group">
                        <span className="data-label">Constraints</span>
                        <span className="data-value" style={{ whiteSpace: "pre-wrap" }}>{sub.constraints || "—"}</span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
