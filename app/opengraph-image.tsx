import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DBMind AI — AI-Powered Database Consulting & Migration';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B1B34 0%, #122A4E 100%)',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '40px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3A55D9, #8A7CF0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Z" stroke="white" strokeWidth="1.6" />
              <path d="M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6" stroke="white" strokeWidth="1.6" />
              <path d="M4 12c0 1.1 3.6 2 8 2s8-.9 8-2" stroke="white" strokeWidth="1.6" />
            </svg>
          </div>
          <span style={{ fontSize: '44px', fontWeight: 800, color: 'white' }}>DBMind AI</span>
        </div>
        <div
          style={{
            fontSize: '38px',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.25,
            maxWidth: '820px',
          }}
        >
          Database consulting, migration &amp; optimization — powered by AI.
        </div>
        <div style={{ fontSize: '22px', color: '#A9B2CC', marginTop: '28px', textAlign: 'center' }}>
          Migration · Performance · Reliability · AI-Assisted Optimization
        </div>
      </div>
    ),
    { ...size },
  );
}
