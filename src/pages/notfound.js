/* 404 Not Found */
import { icon } from '../icons.js';

export function renderNotFound() {
  return {
    html: `
    <section class="section">
      <div class="container">
        <div class="notfound reveal">
          <div class="notfound__code">४०४</div>
          <h2>पृष्ठ भेटिएन</h2>
          <p class="lead">तपाईंले खोज्नुभएको पृष्ठ फेला परेन। सम्भवतः यो हटाइएको वा सारिएको हुन सक्छ।</p>
          <div class="flex gap-3 wrap aic" style="justify-content:center;margin-top:1rem">
            <a href="/" class="btn btn--primary" data-link>${icon.home} गृहपृष्ठ फर्कनुहोस्</a>
            <a href="/contact" class="btn btn--ghost" data-link>${icon.mail} सम्पर्क गर्नुहोस्</a>
          </div>
        </div>
      </div>
    </section>`,
  };
}
