"use client";

import Link from "next/link";

export default function AgendaClient({ latestSubmission, participants }) {
  const parts = [
    {
      id: "part1",
      title: "Opening and workshop framing",
      time: "10 minutes",
      content: (
        <div className="part-slide-layout">
          <div className="part-badge-tag">Agenda Part 1</div>
          <div className="part-grid">
            <div>
              <h4 className="slide-sub-title">Topics</h4>
              <ul className="slide-list">
                <li>Welcome and quick introductions</li>
                <li>Confirmation of workshop purpose</li>
                <li>Confirmation of current project scope</li>
                <li>Explanation of how the session will be run</li>
              </ul>
            </div>
            <div className="part-objective-box">
              <h4 className="slide-sub-title">Objective</h4>
              <p className="slide-p">
                Create a shared understanding of the workshop goal and ensure everyone is aligned on the purpose of the session.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "part2",
      title: "Baseline confirmation",
      time: "10 minutes",
      content: (
        <div className="part-slide-layout">
          <div className="part-badge-tag">Agenda Part 2</div>
          <div className="part-grid">
            <div>
              <h4 className="slide-sub-title">Topics</h4>
              <ul className="slide-list">
                <li>Confirm current project focus:
                  <ul className="slide-list-nested">
                    <li>P0 AI Blueprint</li>
                    <li>P1 Tender Scout</li>
                    <li>P2 Innovation Radar</li>
                  </ul>
                </li>
                <li>Confirm that the current phase remains standalone from internal core systems</li>
                <li>Confirm that the workshop is focused on finalizing the Phase 0 baseline</li>
              </ul>
            </div>
            <div className="part-objective-box">
              <h4 className="slide-sub-title">Objective</h4>
              <p className="slide-p">
                Ensure that everyone starts from the same agreed project frame before moving into the detailed topics.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "part3",
      title: "Tender Scout finalization",
      time: "25 minutes",
      content: (
        <div className="part-slide-layout">
          <div className="part-badge-tag">Agenda Part 3</div>
          <div className="part-grid">
            <div>
              <h4 className="slide-sub-title">Topics</h4>
              <ul className="slide-list">
                <li>Priority countries / regions</li>
                <li>Tender portals and sources to monitor first</li>
                <li>Relevant tender / project types</li>
                <li>Exclusions and filters</li>
                <li>Important keywords / terminology</li>
                <li>Key prime contractors / major players</li>
                <li>Main user groups and expected outputs</li>
                <li>Must-have vs nice-to-have for the first release</li>
              </ul>
            </div>
            <div className="part-objective-box">
              <h4 className="slide-sub-title">Objective</h4>
              <p className="slide-p">
                Confirm the operational baseline for the first Tender Scout implementation scope.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "part4",
      title: "Innovation Radar finalization",
      time: "25 minutes",
      content: (
        <div className="part-slide-layout">
          <div className="part-badge-tag">Agenda Part 4</div>
          <div className="part-grid">
            <div>
              <h4 className="slide-sub-title">Topics</h4>
              <ul className="slide-list">
                <li>Key competitors to monitor</li>
                <li>Key technology topics to monitor</li>
                <li>Key market developments to monitor</li>
                <li>Key resource / commodity topics</li>
                <li>Preferred sources</li>
                <li>Key watchlist terms</li>
                <li>Main user groups and expected outputs</li>
                <li>Must-have vs nice-to-have for the first release</li>
              </ul>
            </div>
            <div className="part-objective-box">
              <h4 className="slide-sub-title">Objective</h4>
              <p className="slide-p">
                Confirm the operational baseline for the first Innovation Radar implementation scope.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "part5",
      title: "Ownership and alignment",
      time: "12 minutes",
      content: (
        <div className="part-slide-layout">
          <div className="part-badge-tag">Agenda Part 5</div>
          <div className="part-grid">
            <div>
              <h4 className="slide-sub-title">Topics</h4>
              <ul className="slide-list">
                <li>Confirm the main owners for Tender Scout and Innovation Radar</li>
                <li>Confirm the relevant IT / security coordination point</li>
                <li>Confirm who should receive outputs and in what format</li>
                <li>Identify any final missing inputs</li>
              </ul>
            </div>
            <div className="part-objective-box">
              <h4 className="slide-sub-title">Objective</h4>
              <p className="slide-p">
                Ensure there is clear ownership and no critical point remains without a responsible person.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "part6",
      title: "Summary and next steps",
      time: "8 minutes",
      content: (
        <div className="part-slide-layout">
          <div className="part-badge-tag">Agenda Part 6</div>
          <div className="part-grid">
            <div>
              <h4 className="slide-sub-title">Topics</h4>
              <ul className="slide-list">
                <li>Summary of confirmed decisions</li>
                <li>Summary of any open points</li>
                <li>Owners and follow-up actions</li>
                <li>Next steps after Phase 0 completion</li>
              </ul>
            </div>
            <div className="part-objective-box">
              <h4 className="slide-sub-title">Objective</h4>
              <p className="slide-p">
                Close the session with full clarity on what was decided, what remains open, and what happens next.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      {/* Top Navigation */}
      <div className="nav-bar">
        <div className="nav-logo">K+M Requirements</div>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Questionnaire
          </Link>
          <Link href="/agenda" className="nav-link active">
            Workshop Agenda
          </Link>
        </div>
      </div>

      <div className="header">
        <div className="badge">
          <span className="badge-dot"></span>
          PHASE 0 WORKSHOP
        </div>
        <h1>Workshop Agenda</h1>
        <p className="subtitle">Baseline Finalization for Tender Scout & Innovation Radar</p>
      </div>

      {/* FULL DOCUMENT VIEW MODE */}
      <div className="document-layout animate-fade-in">
        {/* 1. Workshop Purpose */}
        <div className="card">
          <h2>1. Workshop purpose</h2>
          <p>
            The purpose of this workshop is to finalize the remaining points required to complete <strong>Phase 0</strong> and lock the implementation baseline for:
          </p>
          <ul className="bullet-list">
            <li><strong>Tender Scout</strong></li>
            <li><strong>Innovation Radar</strong></li>
          </ul>
          <p>
            A substantial part of the project groundwork has already been covered in earlier discussions and preparation work. This workshop is therefore not intended to restart discovery from zero. Its purpose is to validate the remaining inputs, confirm priorities, close open decisions, and align on the first implementation scope.
          </p>
        </div>

        {/* 2. Expected Outcome */}
        <div className="card">
          <h2>2. Expected outcome</h2>
          <p>By the end of the workshop, we aim to have:</p>
          <ul className="bullet-list">
            <li>Confirmed the key inputs for Tender Scout and Innovation Radar</li>
            <li>Finalized the main priorities for the first implementation scope</li>
            <li>Confirmed the relevant owners and participants on the client side</li>
            <li>Aligned on the main outputs, recipients, and usage expectations</li>
            <li>Identified any remaining open points and assigned follow-up owners if needed</li>
          </ul>
          <p>
            The goal is to leave the session with a clear and confirmed project baseline so implementation can proceed in a focused and efficient way.
          </p>
        </div>

        {/* 3. Recommended Participants */}
        <div className="card">
          <h2>3. Recommended participants</h2>
          <p>
            To keep the workshop effective and decision-oriented, it is best to involve only the key people needed for the relevant topics.
          </p>

          <div className="grid-2" style={{ marginTop: "1.5rem" }}>
            <div>
              <h3>Recommended Client-Side Participants</h3>
              {latestSubmission ? (
                <div className="participant-summary-card">
                  <p className="participant-item">
                    <strong>Tender Scout Owner:</strong> {latestSubmission.tsOwnerName || "TBD"} <span className="role-sub text-muted">({latestSubmission.tsOwnerRole || "TBD"})</span>
                  </p>
                  <p className="participant-item">
                    <strong>Innovation Radar Owner:</strong> {latestSubmission.irOwnerName || "TBD"} <span className="role-sub text-muted">({latestSubmission.irOwnerRole || "TBD"})</span>
                  </p>
                  <p className="participant-item">
                    <strong>IT / Security Rep:</strong> {latestSubmission.itContactName || "TBD"} <span className="role-sub text-muted">({latestSubmission.itContactRole || "TBD"})</span>
                  </p>
                </div>
              ) : (
                <div className="participant-summary-card empty-state-participants">
                  <p>No questionnaire data submitted yet.</p>
                  <Link href="/" className="btn btn-outline" style={{ marginTop: "0.5rem" }}>
                    Fill Questionnaire
                  </Link>
                </div>
              )}

              {participants.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <span className="small-label">Additional Workshop Members:</span>
                  <ul className="participants-list">
                    {participants.map((p, idx) => (
                      <li key={idx}>
                        <strong>{p.name}</strong> - {p.role} <em className="text-muted">({p.topic})</em>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3>Our Side</h3>
              <div className="participant-summary-card our-side">
                <p className="participant-item"><strong>Leon Sarkis</strong></p>
                <p className="participant-item"><strong>Lubo Dilov</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 & 5. Format & Prework */}
        <div className="grid-2">
          <div className="card">
            <h2>4. Workshop format</h2>
            <ul className="bullet-list-none">
              <li><strong>Format:</strong> Working session</li>
              <li><strong>Duration:</strong> 90 minutes</li>
              <li><strong>Objective:</strong> Confirmation, prioritization, and finalization</li>
              <li><strong>Working basis:</strong> Client input template completed in advance</li>
            </ul>
          </div>

          <div className="card">
            <h2>5. Pre-work</h2>
            <p>
              Before the workshop, the client is asked to complete the Phase 0 preparation template.
            </p>
            <p>
              This allows the workshop to focus on validating the inputs already provided, clarifying the few remaining open points, and making the decisions needed to move into implementation.
            </p>
          </div>
        </div>

        {/* 6. Agenda Timeline */}
        <div className="card">
          <h2>6. Agenda</h2>
          <div className="timeline">
            {parts.map((part, index) => (
              <div className="timeline-item" key={part.id}>
                <div className="timeline-badge">Part {index + 1}</div>
                <div className="timeline-content">
                  <div className="timeline-header-row">
                    <h3>{part.title}</h3>
                    <span className="time-tag">{part.time}</span>
                  </div>
                  <div className="timeline-body">
                    {part.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Working Principles */}
        <div className="card">
          <h2>7. Working principles for the session</h2>
          <p>To keep the workshop productive, the session will follow these principles:</p>
          <ul className="bullet-list">
            <li>Focus only on the topics needed to complete Phase 0</li>
            <li>Build on the information already provided</li>
            <li>Keep the discussion decision-oriented</li>
            <li>Park non-essential future topics for later</li>
            <li>Aim for clear outcomes and ownership by the end of the meeting</li>
          </ul>
        </div>

        {/* 8. Next Steps & 9. Final Note */}
        <div className="card">
          <h2>8. What will follow after the workshop</h2>
          <p>
            After the workshop, we will consolidate the confirmed decisions into the finalized Phase 0 baseline and share:
          </p>
          <ul className="bullet-list">
            <li>A short summary of the meeting</li>
            <li>The confirmed key decisions</li>
            <li>Any remaining open items</li>
            <li>Assigned owners and next steps</li>
          </ul>
          <p>
            This will serve as the basis for moving into implementation with a clear and confirmed first scope.
          </p>
        </div>

        <div className="card final-note-card">
          <h2>9. Final note</h2>
          <p className="final-note-text">
            The purpose of this workshop is not to make the project more complex. It is to make the next phase simpler, clearer, and more efficient by confirming the few remaining points that matter most.
          </p>
          <p className="final-note-text" style={{ fontStyle: "italic", marginTop: "1rem" }}>
            The session is designed to be focused, practical, and directly tied to implementation progress.
          </p>
        </div>
      </div>
    </div>
  );
}
