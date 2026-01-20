export async function fetchCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.slice(0, 30).map((c, idx) => ({
    id: String(c.cca3 || idx),
    name: c.name?.common || "Unknown",
    region: c.region || "—",
  }));
}
