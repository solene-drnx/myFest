import julietteArmanetImg from "./assets/Solidays2023/vendredi/julietteArmanet.png";
import sofianePamartImg from "./assets/Solidays2023/vendredi/sofianePamart.png";
import luidjiImg from "./assets/Solidays2023/vendredi/luidji.png";
import tiakolaImg from "./assets/Solidays2023/vendredi/tiakola.png";
import jainImg from "./assets/Solidays2023/vendredi/jain.png";
import schImg from "./assets/Solidays2023/vendredi/sch.png";
import djadjaDinazImg from "./assets/Solidays2023/vendredi/djadjaDinaz.png";
import naamanImg from "./assets/Solidays2023/vendredi/naaman.png";
import adeImg from "./assets/Solidays2023/vendredi/ade.png";
import ascendantViergeImg from "./assets/Solidays2023/vendredi/ascendantVierge.png";
import salutCestCoolImg from "./assets/Solidays2023/vendredi/salutCestCool.png";
import anethaImg from "./assets/Solidays2023/vendredi/anetha.png";
import samaAbdulhadiImg from "./assets/Solidays2023/vendredi/samaAbdulhadi.png";
import hearthgangImg from "./assets/Solidays2023/vendredi/earthgang.png";
import julienGranelImg from "./assets/Solidays2023/vendredi/julienGranel.png";
import kerchakImg from "./assets/Solidays2023/vendredi/kerchak.png";
import kiddySmileImg from "./assets/Solidays2023/vendredi/kiddySmile.png";
import kidsReturnImg from "./assets/Solidays2023/vendredi/kidsReturn.png";
import lewisOfmanImg from "./assets/Solidays2023/vendredi/lewisOfman.png";
import zaouiImg from "./assets/Solidays2023/vendredi/zaoui.png";
import maraboutageImg from "./assets/Solidays2023/vendredi/maraboutage.png";

export const LIEUX = {
    bagatelle: "Bagatelle",
    paris: "Paris",
    dome: "Dome",
    domino: "Domino",
    cesarCircus: "Cesar Circus"
};

export const GENRES = {
    pop: "Pop",
    rock: "Rock",
    rap: "Rap",
    classique: "Classique",
    drill: "Drill",
    worldBeat: "Worldbeat",
    reggae: "Reggae",
    trap: "Trap",
    hipHop: "Hip-Hop",
    country: "Country",
    gabber: "Gabber",
    techno: "Techno",
    hyperpop: "Hyperpop",
    electro: "Électro",
    house: "House",
    soul: "Soul",
    funk: "Funk",
    indiePop: "Indie-Pop",
    synthPop: "Synth-Pop"
}

export const ARTISTS = [
    { nom: "JULIETTE ARMANET", debut: 22, fin: 23, lieu: LIEUX.paris, genre: [GENRES.pop, GENRES.rock], image: julietteArmanetImg },
    { nom: "LUIDJI", debut: 18, fin: 19, lieu: LIEUX.paris, genre: [GENRES.rap], image: luidjiImg }, // Vous pouvez avoir une autre image ici
    { nom: "SOFIANE PAMART", debut: 20, fin: 21, lieu: LIEUX.paris, genre: [GENRES.classique, GENRES.rap], image: sofianePamartImg },
    { nom: "TIAKOLA", debut: 0, fin: 1, lieu: LIEUX.paris, genre: [GENRES.rap, GENRES.drill, GENRES.pop], image: tiakolaImg },
    { nom: "JAIN", debut: 19, fin: 20, lieu: LIEUX.bagatelle, genre: [GENRES.pop, GENRES.worldBeat, GENRES.reggae], image: jainImg },
    { nom: "SCH", debut: 21, fin: 22, lieu: LIEUX.bagatelle, genre: [GENRES.rap, GENRES.trap], image: schImg },
    { nom: "DJADJA & DINAZ", debut: 23, fin: 0, lieu: LIEUX.bagatelle, genre: [GENRES.rap], image: djadjaDinazImg },
    { nom: "NAÂMAN", debut: 19, fin: 20, lieu: LIEUX.dome, genre: [GENRES.reggae, GENRES.hipHop], image: naamanImg },
    { nom: "ADÉ", debut: 21, fin: 22, lieu: LIEUX.dome, genre: [GENRES.pop, GENRES.country], image: adeImg },
    { nom: "ASCENDANT VIERGE", debut: 23, fin: 0, lieu: LIEUX.dome, genre: [GENRES.gabber, GENRES.techno, GENRES.hyperpop], image: ascendantViergeImg },
    { nom: "SALUT C'EST COOL", debut: 1, fin: 2, lieu: LIEUX.dome, genre: [GENRES.techno, GENRES.electro, GENRES.gabber], image: salutCestCoolImg },
    { nom: "ANETHA", debut: 2.15, fin: 3.14, lieu: LIEUX.dome, genre: [GENRES.techno], image: anethaImg },
    { nom: "SAMA ABDULHADI", debut: 3.30, fin: 4.30, lieu: LIEUX.dome, genre: [GENRES.techno, GENRES.electro, GENRES.house], image: samaAbdulhadiImg },
    { nom: "EARTHGANG", debut: 18, fin: 19, lieu: LIEUX.domino, genre: [GENRES.hipHop, GENRES.soul, GENRES.funk], image: hearthgangImg },
    { nom: "JULIEN GRANEL", debut: 20, fin: 21, lieu: LIEUX.domino, genre: [GENRES.pop, GENRES.house], image: julienGranelImg },
    { nom: "KERCHAK", debut: 22, fin: 23, lieu: LIEUX.domino, genre: [GENRES.rap, GENRES.drill, GENRES.trap], image: kerchakImg },
    { nom: "KIDDY SMILE", debut: 1.45, fin: 2.45, lieu: LIEUX.domino, genre: [GENRES.electro, GENRES.house], image: kiddySmileImg },
    { nom: "KIDS RETURN", debut: 19, fin: 20, lieu: LIEUX.cesarCircus, genre: [GENRES.indiePop, GENRES.rock, GENRES.pop], image: kidsReturnImg },
    { nom: "LEWIS OFMAN", debut: 21, fin: 22, lieu: LIEUX.cesarCircus, genre: [GENRES.synthPop], image: lewisOfmanImg },
    { nom: "ZAOUI", debut: 23, fin: 0, lieu: LIEUX.cesarCircus, genre: [GENRES.pop, GENRES.rock, GENRES.hipHop], image: zaouiImg },
    { nom: "MARABOUTAGE", debut: 1.30, fin: 4, lieu: LIEUX.cesarCircus, genre: [GENRES.worldBeat], image: maraboutageImg },
];