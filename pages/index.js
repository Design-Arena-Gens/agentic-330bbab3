import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

const baseTimestamp = new Date('2024-07-22T19:37:18');

const eventLog = [
  { seconds: 0, label: 'Motion detected near front door.' },
  { seconds: 3, label: 'Door camera started recording.' },
  { seconds: 7, label: 'Object identified: Grilled burger.' },
  { seconds: 12, label: 'Canine detected — friendly match with neighborhood dog.' },
  { seconds: 18, label: 'Dog begins eating burger on the welcome mat.' },
  { seconds: 26, label: 'Clip flagged for review by smart alerts.' }
];

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

export default function Home() {
  const [liveTimestamp, setLiveTimestamp] = useState(formatTime(baseTimestamp));

  useEffect(() => {
    const start = Date.now();
    const origin = baseTimestamp.getTime();
    const interval = setInterval(() => {
      const simulated = new Date(origin + (Date.now() - start));
      setLiveTimestamp(formatTime(simulated));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedEvents = useMemo(
    () =>
      eventLog.map((item) => {
        const eventTime = new Date(baseTimestamp.getTime() + item.seconds * 1000);
        return { ...item, timecode: formatTime(eventTime) };
      }),
    []
  );

  return (
    <>
      <Head>
        <title>Door Cam Feed — Dog vs Burger</title>
        <meta
          name="description"
          content="Front door camera footage capturing a hungry dog sneaking a burger outside the door."
        />
      </Head>
      <div className="page-shell">
        <header className="page-header">
          <h1>Front Door Camera</h1>
          <p>Smart capture of a late-afternoon snack heist on the doorstep.</p>
        </header>

        <main className="content">
          <section className="camera-module">
            <div className="camera-frame">
              <div className="camera-header">
                <span className="camera-id">UNIT 02 &bull; FRONT DOOR CAM</span>
                <span className="camera-timestamp">{liveTimestamp}</span>
              </div>

              <div className="camera-feed">
                <img
                  src="https://images.unsplash.com/photo-1601758125946-6ec2e5e2cf19?auto=format&fit=crop&w=1600&q=80"
                  alt="Door camera view of a dog eating a burger outside the door"
                />

                <div className="feed-overlay gradient"></div>
                <div className="feed-overlay grain"></div>

                <div className="bounding-box dog">
                  <span>Dog &bull; 98%</span>
                </div>
                <div className="bounding-box burger">
                  <span>Burger &bull; 94%</span>
                </div>

                <div className="status-banner">AUTO TRACKING</div>
                <div className="rec-indicator">
                  <span className="rec-dot" />
                  REC
                </div>
              </div>

              <div className="camera-footer">
                <span className="tag live">LIVE</span>
                <span className="tag battery">Battery 92%</span>
                <span className="tag temp">Outdoor 68°F</span>
              </div>
            </div>
          </section>

          <aside className="details-panel">
            <section>
              <h2>Clip Summary</h2>
              <p>
                At 19:37, motion detection activated the smart door camera. A neighborhood dog slipped
                into frame, discovered an abandoned burger, and enjoyed an impromptu meal right on the
                welcome mat.
              </p>
            </section>

            <section className="stats-grid">
              <article className="stat-card">
                <h3>Clip Length</h3>
                <p>00:38</p>
              </article>
              <article className="stat-card">
                <h3>Detection Confidence</h3>
                <p>96%</p>
              </article>
              <article className="stat-card">
                <h3>Camera Model</h3>
                <p>CedarView DoorCam X4</p>
              </article>
            </section>

            <section className="event-log">
              <h2>Event Timeline</h2>
              <ul>
                {formattedEvents.map((entry) => (
                  <li key={entry.timecode}>
                    <span className="event-time">{entry.timecode}</span>
                    <span className="event-msg">{entry.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="share-controls">
              <button type="button" className="cta">
                Download Clip
              </button>
              <button type="button" className="ghost">
                Share with Neighbors
              </button>
            </section>
          </aside>
        </main>

        <footer className="page-footer">
          <span>SecureDoor Cloud</span>
          <span>Clip ID: SD-4C29-A</span>
          <span>Auto cleanup in 23 days</span>
        </footer>
      </div>
    </>
  );
}
