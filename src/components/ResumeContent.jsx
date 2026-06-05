export default function ResumeContent() {
  return (
    <div className="resume-paper">
      {/* Header Section */}
      <header style={{ borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '-0.05em', margin: '0 0 0.5rem 0', color: '#111' }}>
          JOSAPTON
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p style={{ margin: 0, fontSize: '1rem', color: '#333', fontWeight: '500' }}>
            Cybersecurity & DevSecOps Engineer
          </p>
          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-mono)' }}>
            <p style={{ margin: 0 }}>josapton.github.io</p>
            <p style={{ margin: 0 }}>github.com/josapton</p>
          </div>
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#222', margin: 0 }}>
          Building secure, scalable systems at the intersection of technology, data, and agriculture. 
          Experienced in integrating security into CI/CD pipelines (DevSecOps), conducting vulnerability assessments, 
          and building resilient architectures.
        </p>
      </section>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Left Column */}
        <div>
          {/* Experience */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#111' }}>
              Experience
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#111' }}>DevSecOps Engineer</h3>
                <span style={{ fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-mono)' }}>2023 - Present</span>
              </div>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#444', fontWeight: '500' }}>[Company Name] | Jakarta, ID</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#333', lineHeight: 1.5 }}>
                <li>Integrated SAST, DAST, and SCA tools into the CI/CD pipeline, reducing security vulnerabilities by 40% before deployment.</li>
                <li>Managed Kubernetes clusters and container security using Docker and Terraform.</li>
                <li>Automated security compliance reporting and continuous monitoring systems.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#111' }}>Security Researcher</h3>
                <span style={{ fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-mono)' }}>2021 - 2023</span>
              </div>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#444', fontWeight: '500' }}>[Company Name] | Remote</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#333', lineHeight: 1.5 }}>
                <li>Conducted penetration testing on enterprise web applications and APIs.</li>
                <li>Developed automated threat intelligence gathering tools using Python and Go.</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#111' }}>
              Key Projects
            </h2>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#333', lineHeight: 1.5 }}>
              <li style={{ marginBottom: '0.25rem' }}><strong>SecPipeline:</strong> Comprehensive DevSecOps CI/CD framework for automated vulnerability scanning.</li>
              <li style={{ marginBottom: '0.25rem' }}><strong>ThreatMap:</strong> Real-time threat intelligence visualization platform.</li>
              <li style={{ marginBottom: '0.25rem' }}><strong>AgriSense AI:</strong> Machine learning models (TensorFlow/PyTorch) for precision agriculture.</li>
              <li style={{ marginBottom: '0.25rem' }}><strong>VaultGuard:</strong> Enterprise-grade secrets management and rotation tool.</li>
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#111' }}>
              Skills
            </h2>
            <div style={{ marginBottom: '0.75rem' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: '#111' }}>Languages</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#444', lineHeight: 1.4 }}>Python, JavaScript, Go, Bash</p>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: '#111' }}>Security</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#444', lineHeight: 1.4 }}>SAST, DAST, SCA, PenTest</p>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: '#111' }}>DevOps & Infra</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#444', lineHeight: 1.4 }}>Docker, K8s, Terraform, CI/CD</p>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: '#111' }}>AI / ML</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#444', lineHeight: 1.4 }}>TensorFlow, PyTorch, CV</p>
            </div>
          </section>

          {/* Education */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#111' }}>
              Education
            </h2>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', color: '#111' }}>B.S. Computer Science</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>[University Name]</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-mono)' }}>2018 - 2022</p>
            </div>
          </section>
          
          {/* Certifications */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#111' }}>
              Certs
            </h2>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#333', lineHeight: 1.5 }}>
              <li>OSCP (OffSec)</li>
              <li>AWS Certified Security</li>
              <li>CKS (Kubernetes Security)</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  )
}
