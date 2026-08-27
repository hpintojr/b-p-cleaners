import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface CountyGroup {
  county: string;
  cities: string[];
}

const SERVICE_AREAS: CountyGroup[] = [
  {
    county: 'Los Angeles County',
    cities: [
      'Los Angeles', 'Long Beach', 'Glendale', 'Santa Clarita', 'Pasadena',
      'Torrance', 'Pomona', 'El Monte', 'Downey', 'West Covina', 'Norwalk',
      'Burbank', 'Compton', 'Santa Monica', 'Whittier', 'Inglewood',
      'Alhambra', 'Beverly Hills', 'Culver City', 'Manhattan Beach',
      'Redondo Beach', 'Lancaster', 'Palmdale',
    ],
  },
  {
    county: 'Riverside County',
    cities: [
      'Riverside', 'Moreno Valley', 'Corona', 'Murrieta', 'Temecula',
      'Jurupa Valley', 'Menifee', 'Perris', 'Hemet', 'Indio', 'Eastvale',
      'Lake Elsinore', 'Palm Desert', 'Palm Springs', 'Cathedral City',
      'Beaumont', 'Banning', 'Wildomar',
    ],
  },
  {
    county: 'Orange County',
    cities: [
      'Anaheim', 'Anaheim Hills', 'Santa Ana', 'Irvine', 'Huntington Beach',
      'Garden Grove', 'Orange', 'Fullerton', 'Costa Mesa', 'Mission Viejo',
      'Westminster', 'Newport Beach', 'Buena Park', 'Lake Forest', 'Tustin',
      'Yorba Linda', 'San Clemente', 'Laguna Niguel', 'La Habra',
      'Fountain Valley', 'Placentia', 'Rancho Santa Margarita',
      'Aliso Viejo', 'Cypress', 'Brea', 'Laguna Beach', 'Dana Point',
    ],
  },
  {
    county: 'San Diego County',
    cities: [
      'San Diego', 'Chula Vista', 'Oceanside', 'Escondido', 'Carlsbad',
      'El Cajon', 'Vista', 'San Marcos', 'Encinitas', 'National City',
      'La Mesa', 'Santee', 'Poway', 'Coronado', 'Del Mar',
    ],
  },
];

export default function ServiceAreas() {
  return (
    <section
      className="bg-pv-surface border-t border-pv-line py-16 sm:py-20"
      id="service-areas-section"
      aria-labelledby="service-areas-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-af-blue-soft border border-af-blue-ice">
            <MapPin className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
              Where We Clean
            </span>
          </div>
          <h2 id="service-areas-heading" className="font-display text-2xl sm:text-3xl font-extrabold text-af-navy tracking-tight">
            Proudly Serving Southern California
          </h2>
          <p className="text-sm sm:text-base text-pv-muted leading-relaxed">
            B&amp;P Cleaners provides residential and commercial cleaning throughout Los Angeles,
            Riverside, Orange, and San Diego Counties, including these cities and surrounding
            communities:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {SERVICE_AREAS.map((group) => (
            <div key={group.county}>
              <h3 className="text-xs font-extrabold text-af-blue uppercase tracking-wider mb-3 pb-2 border-b border-pv-line">
                {group.county}
              </h3>
              <ul className="text-sm text-pv-muted leading-relaxed">
                {group.cities.map((city) => (
                  <li
                    key={city}
                    className="inline before:content-['•'] before:mx-1.5 before:text-af-blue-ice first:before:content-none first:before:mx-0"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-pv-muted text-center mt-10 max-w-2xl mx-auto">
          Don&apos;t see your city listed? We&apos;re still likely to serve your area —
          <Link href="/#estimator-anchor" className="text-af-blue font-semibold underline underline-offset-2 ml-1">
            get an instant quote
          </Link>{' '}
          to check availability.
        </p>
      </div>
    </section>
  );
}
