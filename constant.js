import julietteArmanetImg from "./assets/Solidays2023/vendredi/julietteArmanet.png";
import julietteArmanetCalendar from "./assets/Solidays2023/vendredi/julietteArmanet_calendar.png";
import sofianePamartImg from "./assets/Solidays2023/vendredi/sofianePamart.png";
import sofianePamartCalendar from "./assets/Solidays2023/vendredi/sofianePamart_calendar.png";
import luidjiImg from "./assets/Solidays2023/vendredi/luidji.png";
import luidjiCalendar from "./assets/Solidays2023/vendredi/luidji_calendar.png";
import tiakolaImg from "./assets/Solidays2023/vendredi/tiakola.png";
import tiakolaCalendar from "./assets/Solidays2023/vendredi/tiakola_calendar.png";
import jainImg from "./assets/Solidays2023/vendredi/jain.png";
import jainCalendar from "./assets/Solidays2023/vendredi/jain_calendar.png";
import schImg from "./assets/Solidays2023/vendredi/sch.png";
import schCalendar from "./assets/Solidays2023/vendredi/sch_calendar.png";
import djadjaDinazImg from "./assets/Solidays2023/vendredi/djadjaDinaz.png";
import djadjaDinazCalendar from "./assets/Solidays2023/vendredi/djadjaDinaz_calendar.png";
import naamanImg from "./assets/Solidays2023/vendredi/naaman.png";
import naamanCalendar from "./assets/Solidays2023/vendredi/naaman_calendar.png";
import adeImg from "./assets/Solidays2023/vendredi/ade.png";
import adeCalendar from "./assets/Solidays2023/vendredi/ade_calendar.png";
import ascendantViergeImg from "./assets/Solidays2023/vendredi/ascendantVierge.png";
import ascendantViergeCalendar from "./assets/Solidays2023/vendredi/ascendantVierge_calendar.png";
import salutCestCoolImg from "./assets/Solidays2023/vendredi/salutCestCool.png";
import salutCestCoolCalendar from "./assets/Solidays2023/vendredi/salutCestCool_calendar.png";
import anethaImg from "./assets/Solidays2023/vendredi/anetha.png";
import anethaCalendar from "./assets/Solidays2023/vendredi/anetha_calendar.png";
import samaAbdulhadiImg from "./assets/Solidays2023/vendredi/samaAbdulhadi.png";
import samaAbdulhadiCalendar from "./assets/Solidays2023/vendredi/samaAbdulhadi_calendar.png";
import hearthgangImg from "./assets/Solidays2023/vendredi/earthgang.png";
import hearthgangCalendar from "./assets/Solidays2023/vendredi/earthgang_calendar.png";
import julienGranelImg from "./assets/Solidays2023/vendredi/julienGranel.png";
import julienGranelCalendar from "./assets/Solidays2023/vendredi/julienGranel_calendar.png";
import kerchakImg from "./assets/Solidays2023/vendredi/kerchak.png";
import kerchakCalendar from "./assets/Solidays2023/vendredi/kerchak_calendar.png";
import kiddySmileImg from "./assets/Solidays2023/vendredi/kiddySmile.png";
import kiddySmileCalendar from "./assets/Solidays2023/vendredi/kiddySmile_calendar.png";
import kidsReturnImg from "./assets/Solidays2023/vendredi/kidsReturn.png";
import kidsReturnCalendar from "./assets/Solidays2023/vendredi/kidsReturn_calendar.png";
import lewisOfmanImg from "./assets/Solidays2023/vendredi/lewisOfman.png";
import lewisOfmanCalendar from "./assets/Solidays2023/vendredi/lewisOfman_calendar.png";
import zaouiImg from "./assets/Solidays2023/vendredi/zaoui.png";
import zaouiCalendar from "./assets/Solidays2023/vendredi/zaoui_calendar.png";
import maraboutageImg from "./assets/Solidays2023/vendredi/maraboutage.png";
import maraboutageCalendar from "./assets/Solidays2023/vendredi/maraboutage_calendar.png";

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
    { nom: "JULIETTE ARMANET", debut: {heure: 22, minute: 0}, fin: {heure: 23, minute: 0}, lieu: LIEUX.paris, genre: [GENRES.pop, GENRES.rock], image: julietteArmanetImg, imageCalendar: julietteArmanetCalendar },
    { nom: "LUIDJI", debut: {heure: 18, minute: 0}, fin: {heure: 19, minute: 0}, lieu: LIEUX.paris, genre: [GENRES.rap], image: luidjiImg, imageCalendar: luidjiCalendar }, // Vous pouvez avoir une autre image ici
    { nom: "SOFIANE PAMART", debut: {heure: 20, minute: 0}, fin: {heure: 21, minute: 0}, lieu: LIEUX.paris, genre: [GENRES.classique, GENRES.rap], image: sofianePamartImg, imageCalendar: sofianePamartCalendar },
    { nom: "TIAKOLA", debut: {heure: 0, minute: 0}, fin: {heure: 1, minute: 0}, lieu: LIEUX.paris, genre: [GENRES.rap, GENRES.drill, GENRES.pop], image: tiakolaImg, imageCalendar: tiakolaCalendar},
    { nom: "JAIN", debut: {heure: 19, minute: 0}, fin: {heure: 20, minute: 0}, lieu: LIEUX.bagatelle, genre: [GENRES.pop, GENRES.worldBeat, GENRES.reggae], image: jainImg, imageCalendar: jainCalendar },
    { nom: "SCH", debut: {heure: 21, minute: 0}, fin: {heure: 22, minute: 0}, lieu: LIEUX.bagatelle, genre: [GENRES.rap, GENRES.trap], image: schImg, imageCalendar: schCalendar },
    { nom: "DJADJA & DINAZ", debut: {heure: 23, minute: 0}, fin: {heure: 0, minute: 0}, lieu: LIEUX.bagatelle, genre: [GENRES.rap], image: djadjaDinazImg, imageCalendar: djadjaDinazCalendar },
    { nom: "NAÂMAN", debut: {heure: 19, minute: 0}, fin: {heure: 20, minute: 0}, lieu: LIEUX.dome, genre: [GENRES.reggae, GENRES.hipHop], image: naamanImg, imageCalendar: naamanCalendar },
    { nom: "ADÉ", debut: {heure: 21, minute: 0}, fin: {heure: 22, minute: 0}, lieu: LIEUX.dome, genre: [GENRES.pop, GENRES.country], image: adeImg, imageCalendar: adeCalendar },
    { nom: "ASCENDANT VIERGE", debut: {heure: 23, minute: 0}, fin: {heure: 0, minute: 0}, lieu: LIEUX.dome, genre: [GENRES.gabber, GENRES.techno, GENRES.hyperpop], image: ascendantViergeImg, imageCalendar: ascendantViergeCalendar },
    { nom: "SALUT C'EST COOL", debut: {heure: 1, minute: 0}, fin: {heure: 2, minute: 0}, lieu: LIEUX.dome, genre: [GENRES.techno, GENRES.electro, GENRES.gabber], image: salutCestCoolImg, imageCalendar: salutCestCoolCalendar },
    { nom: "ANETHA", debut: {heure: 2, minute: 15}, fin: {heure: 3, minute: 15}, lieu: LIEUX.dome, genre: [GENRES.techno], image: anethaImg, imageCalendar: anethaCalendar },
    { nom: "SAMA ABDULHADI", debut: {heure: 3, minute: 30}, fin: {heure: 4, minute: 30}, lieu: LIEUX.dome, genre: [GENRES.techno, GENRES.electro, GENRES.house], image: samaAbdulhadiImg, imageCalendar: samaAbdulhadiCalendar },
    { nom: "EARTHGANG", debut: {heure: 18, minute: 0}, fin: {heure: 19, minute: 0}, lieu: LIEUX.domino, genre: [GENRES.hipHop, GENRES.soul, GENRES.funk], image: hearthgangImg, imageCalendar: hearthgangCalendar },
    { nom: "JULIEN GRANEL", debut: {heure: 20, minute: 0}, fin: {heure: 21, minute: 0}, lieu: LIEUX.domino, genre: [GENRES.pop, GENRES.house], image: julienGranelImg, imageCalendar: julienGranelCalendar },
    { nom: "KERCHAK", debut: {heure: 22, minute: 0}, fin: {heure: 23, minute: 0}, lieu: LIEUX.domino, genre: [GENRES.rap, GENRES.drill, GENRES.trap], image: kerchakImg, imageCalendar: kerchakCalendar },
    { nom: "KIDDY SMILE", debut: {heure: 1, minute: 45}, fin: {heure: 2, minute: 45}, lieu: LIEUX.domino, genre: [GENRES.electro, GENRES.house], image: kiddySmileImg, imageCalendar: kiddySmileCalendar },
    { nom: "KIDS RETURN", debut: {heure: 19, minute: 0}, fin: {heure: 20, minute: 0}, lieu: LIEUX.cesarCircus, genre: [GENRES.indiePop, GENRES.rock, GENRES.pop], image: kidsReturnImg, imageCalendar: kidsReturnCalendar },
    { nom: "LEWIS OFMAN", debut: {heure: 21, minute: 0}, fin: {heure: 22, minute: 0}, lieu: LIEUX.cesarCircus, genre: [GENRES.synthPop], image: lewisOfmanImg, imageCalendar: lewisOfmanCalendar },
    { nom: "ZAOUI", debut: {heure: 23, minute: 0}, fin: {heure: 0, minute: 0}, lieu: LIEUX.cesarCircus, genre: [GENRES.pop, GENRES.rock, GENRES.hipHop], image: zaouiImg, imageCalendar: zaouiCalendar },
    { nom: "MARABOUTAGE", debut: {heure: 1, minute: 30}, fin: {heure: 4, minute: 0}, lieu: LIEUX.cesarCircus, genre: [GENRES.worldBeat], image: maraboutageImg, imageCalendar: maraboutageCalendar },
];