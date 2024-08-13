export const SpiritsUtil: Array<SpiritsInterface> = [
  {
    nev: "Földelementál",
    csoport: "Elementál",
    kepessegek: "Immunitás (saját elem), Mozgás (saját elem), Elnyelés (saját elem), Fizikai alak, Varázslás, Sebezhetőség (levegő)",
    FizEro: 3,
    FizGyo: 0,
    FizUgy: 0,
    FizAll: 1,
    AsztEro: 0,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  },
  {
    nev: "Tűzelementál",
    csoport: "Elementál",
    kepessegek: "Immunitás (saját elem), Mozgás (saját elem), Elnyelés (saját elem), Fizikai alak, Varázslás, Sebezhetőség (víz)",
    FizEro: 1,
    FizGyo: 1,
    FizUgy: 2,
    FizAll: 0,
    AsztEro: 0,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  },
  {
    nev: "Levegőelementál",
    csoport: "Elementál",
    kepessegek: "Immunitás (saját elem), Mozgás (saját elem), Elnyelés (saját elem), Fizikai alak, Varázslás, Sebezhetőség (föld)",
    FizEro: 0,
    FizGyo: 4,
    FizUgy: 0,
    FizAll: 0,
    AsztEro: 0,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  },
  {
    nev: "Vízelementál",
    csoport: "Elementál",
    kepessegek: "Immunitás (saját elem), Mozgás (saját elem), Elnyelés (saját elem), Fizikai alak, Varázslás, Sebezhetőség (tűz)",
    FizEro: 1,
    FizGyo: 1,
    FizUgy: 1,
    FizAll: 1,
    AsztEro: 0,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  },
  {
    nev: "Vérelementál",
    csoport: "Elementál",
    kepessegek: "Elnyelés (saját elem), Fizikai alak, Varázslás, Megszállás",
    FizEro: 1,
    FizGyo: 0,
    FizUgy: 0,
    FizAll: 1,
    AsztEro: 1,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 1,
  },
  {
    nev: "Emberek Szelleme",
    csoport: "Szellem",
    kepessegek: "Mozgás (saját terület), Fizikai alak, Varázslás, Elrejtés, Zavarás, Keresés",
    FizEro: 1,
    FizGyo: 1,
    FizUgy: 1,
    FizAll: 0,
    AsztEro: 1,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  },
  {
    nev: "Szárazföldek Szelleme",
    csoport: "Szellem",
    kepessegek: "Mozgás (saját terület), Fizikai alak, Varázslás, Elrejtés, Zavarás, Keresés",
    FizEro: 3,
    FizGyo: 0,
    FizUgy: 0,
    FizAll: 1,
    AsztEro: 0,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  },
  {
    nev: "Levegőég Szelleme",
    csoport: "Szellem",
    kepessegek: "Mozgás (saját terület), Fizikai alak, Varázslás, Elrejtés, Zavarás, Keresés",
    FizEro: 0,
    FizGyo: 4,
    FizUgy: 0,
    FizAll: 0,
    AsztEro: 0,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  },
  {
    nev: "Vizek Szelleme",
    csoport: "Szellem",
    kepessegek: "Mozgás (saját terület), Fizikai alak, Varázslás, Elrejtés, Zavarás, Keresés",
    FizEro: 1,
    FizGyo: 1,
    FizUgy: 1,
    FizAll: 1,
    AsztEro: 0,
    AsztGyo: 0,
    AsztUgy: 0,
    AsztAll: 0,
  }
];

export interface SpiritsInterface {
  nev: string;
  csoport: string;
  kepessegek: string;
  FizEro: number;
  FizGyo: number;
  FizUgy: number;
  FizAll: number;
  AsztEro: number;
  AsztGyo: number;
  AsztUgy: number;
  AsztAll: number;
}
