export const detailsUtil: Array<any> = [
  {meret: "50", nev: 'Teljes név', fcName:'teljesnev', tipus: 'text', megjegyzes: 'Amit a sírodra vésnek, ha kisimultak az intenzív vonalaid...'},
  {meret: "50", nev: 'DNS', fcName:'dns', tipus: 'select', megjegyzes:'Nem faj! Legfeljebb fajta te rasszista állat!'},
  {meret: "50", nev: 'Becenév', fcName:'becenev', tipus: 'text', megjegyzes: 'Ahogy a haverok ismernek, már ha még élnek...'},
  {meret: "50", nev: 'Nem', fcName:'nem', tipus: 'inpselect', megjegyzes:'Nem? De! Vagy mit tudom én!?'},
  {meret: "50", nev: 'Álnév', fcName:'alnev', tipus: 'text', megjegyzes: 'Az alvilágban jobb, ha csak ezt ismerik...'},
  {meret: "50", nev: 'Anyanyelv', fcName:'anyanyelv', tipus: 'inpselect', megjegyzes:'Kezdj el csicseregni, de ha kitolod, levágjuk...'},
  {meret: "50", nev: 'Életkor', fcName:'eletkor', tipus: 'number', megjegyzes: 'Ezért a vénségért mennyit kapni a rabszolgapiacon?', egyseg: ' év', lepes: 10},
  {meret: "50", nev: 'Testsúly', fcName:'testsuly', tipus: 'number', megjegyzes: 'Szerinted lecsontozva mennyit ér a húsod?', egyseg: ' kg', lepes: 10},
  {meret: "50", nev: 'Magasság', fcName:'magassag', tipus: 'number', megjegyzes: 'Ettől függ, hogy hokedlinek, vagy toronynak becéznek.', egyseg: ' cm', lepes: 10},
  {meret: "50", nev: 'Kedv. szín', fcName:'kedvencszin', tipus: 'color', megjegyzes: 'Mi a kedvenc színed? Barna? Nem, a kékááá...'},
  {meret: "100", nev: 'Testalkat', fcName:'testalkat', tipus: 'text', megjegyzes: 'Ki a mellet, be a hasat, hadd mártom meg benned a vasat!'},
  {meret: "50", nev: 'Bőrszín', fcName:'borszin', tipus: 'color', megjegyzes: 'Hidd el, lassan már senkit nem érdekel, kivéve ha ember vagy.'},
  {meret: "50", nev: 'Szemszín', fcName:'szemszin', tipus: 'color', megjegyzes: 'Kék a szeme, arca csupa derű...'},
  {meret: "50", nev: 'Hajszín', fcName:'hajszin', tipus: 'color', megjegyzes: 'Milyet szeretnél? Van egyáltalán saját hajad?'},
  {meret: "50", nev: 'Szőrzet', fcName:'szorszin', tipus: 'color', megjegyzes: 'A hajat szokták festeni, de milyen színű a fa... famentes papír?'},
  {meret: "100", nev: 'Hajstílus', fcName:'hajstilus', tipus: 'text', megjegyzes: 'Az Árnyak között is fontos a jó megjelenés!'},
  {meret: "100", nev: 'Félelem', fcName:'felelem', tipus: 'text', megjegyzes: 'Mindenki fél valamitől...'},
  {meret: "100", nev: 'Ösztönző', fcName:'osztonzo', tipus: 'text', megjegyzes: 'De van, ami képes bátorítani!'},
  {meret: "100", nev: 'Gyűlölet', fcName:'gyulolet', tipus: 'text', megjegyzes: 'Ne a gyűlölet vezéreljen...'},
  {meret: "100", nev: 'Kedvenc', fcName:'kedvenc', tipus: 'text', megjegyzes: 'Hanem az, ami boldoggá tesz!'},
  {meret: "100", nev: 'Írtózat', fcName:'irtozat', tipus: 'text', megjegyzes: 'Lehet, hogy valamitől kifordul a beled...'},
  {meret: "100", nev: 'Vonzalom', fcName:'vonzalom', tipus: 'text', megjegyzes: 'De ennek te sem tudsz ellenállni!'},
  {meret: "100", nev: 'Egyéb jellemzők, megjelenés', fcName:'megjelenes', tipus: 'text', megjegyzes: 'Szakáll, smink, tetkó, meg ami a többi helyre nem fér el :)'},
  {meret: "100", nev: 'Különleges képességek', fcName:'kepessegek', tipus: 'kepessegek'},
];

export const dnsUtil: Array<any> = [
  {
    dns: 'Ember',
    kockatartalekMod: 3,
    defHeight: "Férfi: 180 cm, Átlag: 173 cm, Nő: 166 cm",
    defWieght: "Férfi: 86 kg, Átlag: 78 kg, Nő: 70 kg",
    defAge: "Javasolt: 25 év, Várható: 65(F) / 75(N) év, Maximális: 110 év",
    defKepessegek: [
      '+3 Kockatartalék'
    ],
    szorzoRuhazat: 1,
    szorzoEletvitel: 1,
  },
  {
    dns: 'Tünde',
    fizGyoMod: 1,
    asztEroMod: 2,
    asztGyoMod: 1,
    defHeight: "Férfi: 186 cm, Átlag: 180 cm, Nő: 174 cm",
    defWieght: "Férfi: 80 kg, Átlag: 73 kg, Nő: 66 kg",
    defAge: "Javasolt: 35 év, Várható: 75(F) / 85(N) év, Maximális: 150 év",
    defKepessegek: [
      'Éjszakai látás'
    ],
    szorzoRuhazat: 1,
    szorzoEletvitel: 1,
  },
  {
    dns: 'Törpe',
    fizEroMod: 2,
    fizKitMod: 1,
    asztKitMod: 1,
    defHeight: "Férfi: 137 cm, Átlag: 130 cm, Nő: 123 cm",
    defWieght: "Férfi: 60 kg, Átlag: 54 kg, Nő: 48 kg",
    defAge: "Javasolt: 35 év, Várható: 70(F) / 80(N) év, Maximális: kb. 130 év",
    defKepessegek: [
      'Hőlátás'
    ],
    szorzoRuhazat: 1,
    szorzoEletvitel: 1,
  },
  {
    dns: 'Ork',
    fizEroMod: 2,
    fizKitMod: 2,
    defHeight: "Férfi: 200 cm, Átlag: 190 cm, Nő: 180 cm",
    defWieght: "Férfi: 135 kg, Átlag: 123 kg, Nő: 111 kg",
    defAge: "Javasolt: 20 év, Várható: 55(F) / 65(N) év, Maximális: kb. 90 év",
    defKepessegek: [
      'Éjszakai látás'
    ],
    szorzoRuhazat: 1,
    szorzoEletvitel: 1,
  },
  {
    dns: 'Troll',
    fizEroMod: 3,
    fizKitMod: 3,
    defHeight: "Férfi: 262 cm, Átlag: 250 cm, Nő: 238 cm",
    defWieght: "Férfi: 300 kg, Átlag: 270 kg, Nő: 240 kg",
    defAge: "Javasolt: 30 év, Várható: 55(F) / 65(N) év, Maximális: kb. 100 év",
    defKepessegek: [
      'Hőlátás'
    ],
    szorzoRuhazat: 1.2,
    szorzoEletvitel: 1.2,
  },
];

export const nemekUtil: Array<any> = [
  'Nő',
  'Férfi',
  'Mindkettő',
  'Egyiksem',
];

export const nyelvekUtil: Array<any> = [
  'magyar',
  'angol',
  'francia',
  'orosz',
  'japán',
  'kínai',
  'indiai',
];
