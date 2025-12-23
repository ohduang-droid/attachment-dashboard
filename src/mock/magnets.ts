// Using mockData; dev team will replace with real API hook useFetchMagnets()

export interface MagnetOption {
  id: string; // from API
  name: string; // from API
}

export const mockMagnets: MagnetOption[] = [
  { id: "all", name: "All magnets" },
  { id: "coffee-with-lenny", name: "CoffeeWith Lenny" },
  { id: "sip-with-lenny", name: "SipWithLenny" },
  { id: "drink-with-lenny", name: "DrinkWithLenny" },
];


