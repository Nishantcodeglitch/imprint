import { useEffect } from 'react';

export default function useCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-num, .stat-num-big');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            let count = 0;
            const step = Math.ceil(target / 60);

            const timer = setInterval(() => {
              count = Math.min(count + step, target);
              el.textContent = count;
              if (count >= target) clearInterval(timer);
            }, 30);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, []);
}
