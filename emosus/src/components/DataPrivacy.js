import React from "react"

function DataPrivacy({ onProceed }) {
  return (
    <div className="screen">
      <h2>Data Privacy and Confidentiality</h2>
      <p>
        We value your privacy and are committed to protecting your personal
        information. The data collected in this experiment will be used solely
        for research purposes and will be kept confidential. Your participation
        is voluntary, and you may withdraw at any time without any consequences.
        If you have any questions or concerns about the study, please contact
        the research team.
      </p>
      <button onClick={onProceed}>Proceed to Instructions</button>
    </div>
  )
}

export default DataPrivacy
