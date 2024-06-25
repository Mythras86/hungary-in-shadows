export const skillsUtil: Array<SkillInterface> = [
  {multi: false, nev: 'Atlétika', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul:'fizUgy'},
  {multi: false, nev: 'Rejtőzés', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul:'fizUgy'},
  {multi: false, nev: 'Közelharc', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul:'fizUgy'},
  {multi: false, nev: 'Tűzfegyverek', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul:'fizUgy'},
  {multi: false, nev: 'Vadonjárás', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztGyo'},
  {multi: false, nev: 'Érzékelés', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztGyo'},
  {multi: false, nev: 'Járművezetés', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'reakcio'},
  {multi: false, nev: 'Idézés', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'magia'},
  {multi: false, nev: 'Asztrálvilág', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztGyo'},
  {multi: false, nev: 'Varázslás', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'magia'},
  {multi: false, nev: 'Kiberháború', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztUgy'},
  {multi: false, nev: 'Megbűvölés', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'magia'},
  {multi: false, nev: 'Színészet', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztEro'},
  {multi: false, nev: 'Befolyásolás', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztEro'},
  {multi: false, nev: 'Biotech', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztUgy'},
  {multi: false, nev: 'Elektronika', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztUgy'},
  {multi: false, nev: 'Műszaki', csoport: 'Aktív szakértelmek', karmaKtsg: 3, kapTul: 'asztUgy'},
  // ismeret
  {multi: true, nev: 'Érdeklődés', csoport: 'Ismeret szakértelmek', karmaKtsg: 2, kapTul: 'asztUgy'},
  {multi: true, nev: '6. világbeli', csoport: 'Ismeret szakértelmek', karmaKtsg: 2, kapTul: 'asztUgy'},
  {multi: true, nev: 'Háttér ism.', csoport: 'Ismeret szakértelmek', karmaKtsg: 2, kapTul: 'asztUgy'},
  {multi: true, nev: 'Iskolai ism.', csoport: 'Ismeret szakértelmek', karmaKtsg: 2, kapTul: 'asztUgy'},
  {multi: true, nev: 'Utcai ism.', csoport: 'Ismeret szakértelmek', karmaKtsg: 2, kapTul: 'asztUgy'},
  // nyelvi
  {multi: true, nev: 'Nyelv', csoport: 'Nyelvi szakértelmek', karmaKtsg: 2, kapTul: 'asztUgy'},
  {multi: true, nev: 'Írás/olvasás', csoport: 'Nyelvi szakértelmek', karmaKtsg: 2, kapTul: 'asztUgy'},
];

export const skillsSpecUtil: Array<SkillSpecInterface> = [
  {nev: 'Futás', spec: 'Atlétika', karmaKtsg: 2},
  {nev: 'Úszás', spec: 'Atlétika', karmaKtsg: 2},
  {nev: 'Ugrás', spec: 'Atlétika', karmaKtsg: 2},
  {nev: 'Akrobatika', spec: 'Atlétika', karmaKtsg: 2},
  {nev: 'Mászás', spec: 'Atlétika', karmaKtsg: 2},
  {nev: 'Búvárkodás', spec: 'Atlétika', karmaKtsg: 2},
  {nev: 'Dobófegyverek', spec: 'Atlétika', karmaKtsg: 2},
  {nev: 'Lőfegyverek', spec: 'Atlétika', karmaKtsg: 2},

  {nev: 'Lopózás', spec: 'Rejtőzés', karmaKtsg: 2},
  {nev: 'Rejtőzködés', spec: 'Rejtőzés', karmaKtsg: 2},
  {nev: 'Zsebmetész', spec: 'Rejtőzés', karmaKtsg: 2},
  {nev: 'Elrejtés', spec: 'Rejtőzés', karmaKtsg: 2},
  {nev: 'Szabadulás', spec: 'Rejtőzés', karmaKtsg: 2},
  {nev: 'Zárfeltörés', spec: 'Rejtőzés', karmaKtsg: 2},

  {nev: 'Fegyvertelen harc', spec: 'Közelharc', karmaKtsg: 2},
  {nev: 'Éles fegyverek', spec: 'Közelharc', karmaKtsg: 2},
  {nev: 'Tompa fegyverek', spec: 'Közelharc', karmaKtsg: 2},
  {nev: 'Szálfegyverek', spec: 'Közelharc', karmaKtsg: 2},
  {nev: 'Víz alatti harc', spec: 'Közelharc', karmaKtsg: 2},
  {nev: 'Kábítófegyverek', spec: 'Közelharc', karmaKtsg: 2},
  {nev: 'Kiberfegyverek', spec: 'Közelharc', karmaKtsg: 2},
  {nev: 'Egzotikus közelh. f.', spec: 'Közelharc', karmaKtsg: 2},

  {nev: 'Pisztolyok', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Sörétes puskák', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Géppisztolyok', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Puskák', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Rohampuskák', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Ágyúk', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Lézerfegyverek', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Rakétavetők', spec: 'Tűzfegyverek', karmaKtsg: 2},
  {nev: 'Egzotikus tűzf.', spec: 'Tűzfegyverek', karmaKtsg: 2},

  {nev: 'Tájékozódás', spec: 'Vadonjárás', karmaKtsg: 2},
  {nev: 'Túlélőtechnikák', spec: 'Vadonjárás', karmaKtsg: 2},
  {nev: 'Nyomolvasás', spec: 'Vadonjárás', karmaKtsg: 2},
  {nev: 'Idomítás', spec: 'Vadonjárás', karmaKtsg: 2},

  {nev: 'Vizuális érzékelés', spec: 'Érzékelés', karmaKtsg: 2},
  {nev: 'Auraérzékelés', spec: 'Érzékelés', karmaKtsg: 2},
  {nev: 'Tapintás', spec: 'Érzékelés', karmaKtsg: 2},
  {nev: 'Szaglás', spec: 'Érzékelés', karmaKtsg: 2},
  {nev: 'Hallás', spec: 'Érzékelés', karmaKtsg: 2},

  {nev: 'Szárazföldi jármű', spec: 'Járművezetés', karmaKtsg: 2},
  {nev: 'Vizi jármű', spec: 'Járművezetés', karmaKtsg: 2},
  {nev: 'Légi jármű', spec: 'Járművezetés', karmaKtsg: 2},
  {nev: 'Speciális', spec: 'Járművezetés', karmaKtsg: 2},

  {nev: 'Szellem hívás', spec: 'Idézés', karmaKtsg: 2},
  {nev: 'Szellem irányítás', spec: 'Idézés', karmaKtsg: 2},
  {nev: 'Szellem elűzés', spec: 'Idézés', karmaKtsg: 2},

  {nev: 'Asztrális harc', spec: 'Asztrálvilág', karmaKtsg: 2},
  {nev: 'Asztrális lenyomatok', spec: 'Asztrálvilág', karmaKtsg: 2},
  {nev: 'Auraolvasás', spec: 'Asztrálvilág', karmaKtsg: 2},

  {nev: 'Varázsmondás', spec: 'Varázslás', karmaKtsg: 2},
  {nev: 'Varázsvédelem', spec: 'Varázslás', karmaKtsg: 2},
  {nev: 'Rituális varázslás', spec: 'Varázslás', karmaKtsg: 2},

  {nev: 'Kiberharc', spec: 'Kiberháború', karmaKtsg: 2},
  {nev: 'Elektro-hadviselés', spec: 'Kyberháború', karmaKtsg: 2},
  {nev: 'Rendszerfeltörés', spec: 'Kyberháború', karmaKtsg: 2},

  {nev: 'Alkímia', spec: 'Megbűvölés', karmaKtsg: 2},
  {nev: 'Varázstárgy készítés', spec: 'Megbűvölés', karmaKtsg: 2},
  {nev: 'Varázstárgy megtörés', spec: 'Megbűvölés', karmaKtsg: 2},

  {nev: 'Megszemélyesítés', spec: 'Színészet', karmaKtsg: 2},
  {nev: 'Előadás', spec: 'Színészet', karmaKtsg: 2},
  {nev: 'Álcázás', spec: 'Színészet', karmaKtsg: 2},
  {nev: 'Csapatvezetés', spec: 'Színészet', karmaKtsg: 2},

  {nev: 'Etikett', spec: 'Befolyásolás', karmaKtsg: 2},
  {nev: 'Tanítás', spec: 'Befolyásolás', karmaKtsg: 2},
  {nev: 'Megfélelmítés', spec: 'Befolyásolás', karmaKtsg: 2},
  {nev: 'Csapatvezetés', spec: 'Befolyásolás', karmaKtsg: 2},
  {nev: 'Tárgyalás', spec: 'Befolyásolás', karmaKtsg: 2},

  {nev: 'Biotechnológia', spec: 'Biotech', karmaKtsg: 2},
  {nev: 'Kibertechnológia', spec: 'Biotech', karmaKtsg: 2},
  {nev: 'Elsősegély', spec: 'Biotech', karmaKtsg: 2},
  {nev: 'Gyógyszerészet', spec: 'Biotech', karmaKtsg: 2},
  {nev: 'Kémia', spec: 'Biotech', karmaKtsg: 2},

  {nev: 'Számítógép', spec: 'Elektronika', karmaKtsg: 2},
  {nev: 'Szoftver', spec: 'Elektronika', karmaKtsg: 2},
  {nev: 'Hardver', spec: 'Elektronika', karmaKtsg: 2},
  {nev: 'Programozás', spec: 'Elektronika', karmaKtsg: 2},

  {nev: 'Robbantás', spec: 'Műszaki', karmaKtsg: 2},
  {nev: 'Ipari mechanika', spec: 'Műszaki', karmaKtsg: 2},
  {nev: 'Jármű mechanika', spec: 'Műszaki', karmaKtsg: 2},
  {nev: 'Repüléstechnika', spec: 'Műszaki', karmaKtsg: 2},
  {nev: 'Hidromechanika', spec: 'Műszaki', karmaKtsg: 2},
  {nev: 'Fegyverkovács', spec: 'Műszaki', karmaKtsg: 2},
  {nev: 'Páncélkovács', spec: 'Műszaki', karmaKtsg: 2},
];

export interface SkillInterface {
  nev: string,
  csoport: string,
  karmaKtsg: number,
  kapTul: string,
  multi: boolean
}

export interface SkillSpecInterface {
  nev: string,
  spec: string,
  karmaKtsg: number,
}
