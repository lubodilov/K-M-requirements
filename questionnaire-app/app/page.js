"use client";

import { useState } from "react";

function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <div className="tooltip-container" 
         onMouseEnter={() => setShow(true)} 
         onMouseLeave={() => setShow(false)}
         onClick={() => setShow(!show)}
    >
      <span className="tooltip-icon">?</span>
      {show && <div className="tooltip-popup">{text}</div>}
    </div>
  );
}

function DynamicList({ title, tooltip, fields, value, onChange }) {
  const addItem = () => {
    const newItem = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
    onChange([...value, newItem]);
  };

  const removeItem = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (index, fieldName, val) => {
    const newValue = [...value];
    newValue[index][fieldName] = val;
    onChange(newValue);
  };

  return (
    <div className="dynamic-list">
      <div className="list-header">
        <h3>
          {title}
          {tooltip && <Tooltip text={tooltip} />}
        </h3>
        <button type="button" className="btn btn-outline" onClick={addItem}>
          + Add Row
        </button>
      </div>
      {value.map((item, index) => (
        <div key={index} className="dynamic-list-item">
          <div className="dynamic-list-row">
            {fields.map((field) => (
              <div className="form-group" key={field.name} style={{ marginBottom: 0 }}>
                <label>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    value={item[field.name]}
                    onChange={(e) => handleChange(index, field.name, e.target.value)}
                  >
                    <option value="">Select...</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={item[field.name]}
                    onChange={(e) => handleChange(index, field.name, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="remove-btn-wrapper">
            <button type="button" className="btn btn-danger" onClick={() => removeItem(index)}>
              Remove Row
            </button>
          </div>
        </div>
      ))}
      {value.length === 0 && <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>No items added yet. Click "+ Add Row" to begin.</p>}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [formData, setFormData] = useState({
    tsOwnerName: "", tsOwnerRole: "", tsOwnerEmail: "",
    irOwnerName: "", irOwnerRole: "", irOwnerEmail: "",
    itContactName: "", itContactRole: "", itContactEmail: "",
    workshopParticipants: [],
    tsPriorityRegions: [], tsTenderPortals: [], tsProjectTypes: "", tsExclusions: "", tsKeywords: [], tsContractors: [],
    irCompetitors: [], irTechThemes: [], irMarketTopics: [], irResourceTopics: [], irSources: [], irKeywords: [],
    usersTenderScout: [], usersInnovation: [], alertsTenderScout: [], alertsInnovation: [],
    mustHaves: "", niceToHaves: "", constraints: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleListChange = (fieldName, val) => {
    setFormData({ ...formData, [fieldName]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus({ type: "success", message: "Questionnaire submitted successfully! Thank you." });
      } else {
        setStatus({ type: "error", message: "Failed to submit. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "An unexpected error occurred." });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="badge">
          <span className="badge-dot"></span>
          PHASE 0 WORKSHOP
        </div>
        <h1>Requirements</h1>
        <p className="subtitle">Please fill out this form to prepare for the Tender Scout & Innovation Radar workshop.</p>
      </div>

      {status && (
        <div className={`notification ${status.type}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h2>1. Key contacts and workshop participants</h2>
          
          <h3>
            Main person for Tender Scout
            <Tooltip text="Please add the main person who will help us make decisions for the Tender Scout part of the project." />
          </h3>
          <div className="grid-2">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="tsOwnerName" value={formData.tsOwnerName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" name="tsOwnerRole" value={formData.tsOwnerRole} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="tsOwnerEmail" value={formData.tsOwnerEmail} onChange={handleChange} />
            </div>
          </div>

          <h3>
            Main person for Innovation Radar
            <Tooltip text="Please add the main person who will help us make decisions for the Innovation Radar part of the project." />
          </h3>
          <div className="grid-2">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="irOwnerName" value={formData.irOwnerName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" name="irOwnerRole" value={formData.irOwnerRole} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="irOwnerEmail" value={formData.irOwnerEmail} onChange={handleChange} />
            </div>
          </div>

          <h3>
            Main IT / security contact
            <Tooltip text="Please add the person we should coordinate with for IT, access, hosting, or security-related questions." />
          </h3>
          <div className="grid-2">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="itContactName" value={formData.itContactName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" name="itContactRole" value={formData.itContactRole} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="itContactEmail" value={formData.itContactEmail} onChange={handleChange} />
            </div>
          </div>

          <DynamicList
            title="Who should join the workshop?"
            tooltip="Please list the people who should take part in the Phase 0 workshop. Include only the people who are needed for decisions or key input."
            value={formData.workshopParticipants}
            onChange={(v) => handleListChange("workshopParticipants", v)}
            fields={[
              { name: "name", label: "Name", type: "text" },
              { name: "role", label: "Role", type: "text" },
              { name: "topic", label: "Topic / reason", type: "text" }
            ]}
          />
        </div>

        <div className="card">
          <h2>2. Tender Scout</h2>
          
          <DynamicList
            title="Which countries or regions matter most?"
            tooltip="Please list the countries or regions that should be the main focus for the first version of Tender Scout."
            value={formData.tsPriorityRegions}
            onChange={(v) => handleListChange("tsPriorityRegions", v)}
            fields={[
              { name: "region", label: "Region / Country", type: "text" },
              { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Which tender portals should we monitor first?"
            tooltip="Please list the portals or websites where relevant tenders usually appear. Add the link if possible."
            value={formData.tsTenderPortals}
            onChange={(v) => handleListChange("tsTenderPortals", v)}
            fields={[
              { name: "name", label: "Portal Name", type: "text" },
              { name: "url", label: "URL", type: "text" },
              { name: "region", label: "Region", type: "text" },
              { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <div className="form-group">
            <label>
              What types of tenders are relevant for you?
              <Tooltip text="Please list the main types of tenders or projects the system should prioritize." />
            </label>
            <textarea name="tsProjectTypes" value={formData.tsProjectTypes} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>
              What should usually be ignored?
              <Tooltip text="Please list the types of tenders or projects that are usually not relevant and should be filtered out where possible." />
            </label>
            <textarea name="tsExclusions" value={formData.tsExclusions} onChange={handleChange} />
          </div>

          <DynamicList
            title="Which keywords should the system look for?"
            tooltip="Please list the important words or terms that help identify relevant tenders. These can be technical, commercial, or market-specific terms."
            value={formData.tsKeywords}
            onChange={(v) => handleListChange("tsKeywords", v)}
            fields={[
              { name: "keyword", label: "Keyword / Term", type: "text" },
              { name: "action", label: "Include / Exclude", type: "select", options: ["Include", "Exclude"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Which key contractors or major players should we track?"
            tooltip="Please list important general contractors, prime contractors, or major companies that matter for subcontracting opportunities."
            value={formData.tsContractors}
            onChange={(v) => handleListChange("tsContractors", v)}
            fields={[
              { name: "name", label: "Company Name", type: "text" },
              { name: "region", label: "Region / Market", type: "text" },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />
        </div>

        <div className="card">
          <h2>3. Innovation Radar</h2>
          
          <DynamicList
            title="Which competitors should we monitor?"
            tooltip="Please list the competitors or companies that should be tracked closely in the first version."
            value={formData.irCompetitors}
            onChange={(v) => handleListChange("irCompetitors", v)}
            fields={[
              { name: "name", label: "Company Name", type: "text" },
              { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Which technology topics should we monitor?"
            tooltip="Please list the important technology areas the system should watch. Examples: hydrogen, battery systems, catenary-free systems, induction, lightweight construction."
            value={formData.irTechThemes}
            onChange={(v) => handleListChange("irTechThemes", v)}
            fields={[
              { name: "theme", label: "Theme", type: "text" },
              { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Which market developments should we monitor?"
            tooltip="Please list the business or market developments that matter most for your decisions. Examples: infrastructure investment trends, market expansion, pricing pressure, supply chain issues."
            value={formData.irMarketTopics}
            onChange={(v) => handleListChange("irMarketTopics", v)}
            fields={[
              { name: "theme", label: "Theme", type: "text" },
              { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Which resource or commodity topics matter most?"
            tooltip="Please list the materials or resource topics that should be tracked. Examples: copper, steel, aluminum, energy prices, supply availability."
            value={formData.irResourceTopics}
            onChange={(v) => handleListChange("irResourceTopics", v)}
            fields={[
              { name: "theme", label: "Theme", type: "text" },
              { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Which sources should we use first?"
            tooltip="Please list any websites, media sources, competitor pages, databases, or other sources you already trust or want included in the first version."
            value={formData.irSources}
            onChange={(v) => handleListChange("irSources", v)}
            fields={[
              { name: "name", label: "Source Name", type: "text" },
              { name: "url", label: "URL", type: "text" },
              { name: "category", label: "Category", type: "text" },
              { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Which keywords should be on the watchlist?"
            tooltip="Please list the key words or phrases the system should track in articles, publications, and external signals."
            value={formData.irKeywords}
            onChange={(v) => handleListChange("irKeywords", v)}
            fields={[
              { name: "keyword", label: "Keyword / Term", type: "text" },
              { name: "category", label: "Category", type: "text" },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />
        </div>

        <div className="card">
          <h2>4. Outputs and users</h2>
          
          <DynamicList
            title="Who will use Tender Scout?"
            tooltip="Please tell us which teams or people will actually use Tender Scout and Innovation Radar."
            value={formData.usersTenderScout}
            onChange={(v) => handleListChange("usersTenderScout", v)}
            fields={[
              { name: "user", label: "User / Team", type: "text" },
              { name: "purpose", label: "Purpose", type: "text" },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Who will use Innovation Radar?"
            tooltip="Please tell us which teams or people will actually use Tender Scout and Innovation Radar."
            value={formData.usersInnovation}
            onChange={(v) => handleListChange("usersInnovation", v)}
            fields={[
              { name: "user", label: "User / Team", type: "text" },
              { name: "purpose", label: "Purpose", type: "text" },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Who should receive alerts or summaries? (Tender Scout)"
            tooltip="Please tell us who should receive outputs from the system, such as alerts, digests, or summaries, and how often if known."
            value={formData.alertsTenderScout}
            onChange={(v) => handleListChange("alertsTenderScout", v)}
            fields={[
              { name: "recipient", label: "Recipient(s)", type: "text" },
              { name: "type", label: "Type of output", type: "text" },
              { name: "frequency", label: "Frequency", type: "text" },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <DynamicList
            title="Who should receive alerts or summaries? (Innovation Radar)"
            tooltip="Please tell us who should receive outputs from the system, such as alerts, digests, or summaries, and how often if known."
            value={formData.alertsInnovation}
            onChange={(v) => handleListChange("alertsInnovation", v)}
            fields={[
              { name: "recipient", label: "Recipient(s)", type: "text" },
              { name: "type", label: "Type of output", type: "text" },
              { name: "frequency", label: "Frequency", type: "text" },
              { name: "notes", label: "Notes", type: "text" }
            ]}
          />

          <div className="form-group">
            <label>
              What is a must-have for the first release?
              <Tooltip text="Please list the things that are essential for the first version to be useful." />
            </label>
            <textarea name="mustHaves" value={formData.mustHaves} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>
              What is nice-to-have later?
              <Tooltip text="Please list features or ideas that would be useful, but are not necessary for the first release." />
            </label>
            <textarea name="niceToHaves" value={formData.niceToHaves} onChange={handleChange} />
          </div>
        </div>

        <div className="card">
          <h2>5. Constraints and notes</h2>
          <div className="form-group">
            <label>
              Are there any important constraints or special notes?
              <Tooltip text="Please mention anything that may affect the first implementation. Examples: source access limitations, review dependencies, internal preferences, or timing constraints." />
            </label>
            <textarea name="constraints" value={formData.constraints} onChange={handleChange} />
          </div>
        </div>

        <div className="submit-section">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <><span className="loading-spinner"></span> Submitting...</> : "Submit Requirements"}
          </button>
        </div>
      </form>
    </div>
  );
}
