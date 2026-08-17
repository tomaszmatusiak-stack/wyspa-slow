import type { Word, WordCategory } from '../types'

/**
 * Słownictwo odwzorowuje 4 tygodnie planu "Angielski na wakacje".
 * Kolejność w tablicy = kolejność wprowadzania w lekcjach.
 */

type Row = [id: string, en: string, pl: string, asset: string, kind?: 'phrase']

function make(worldId: number, category: WordCategory, rows: Row[]): Word[] {
  return rows.map(([id, en, pl, asset, kind]) => ({
    id: `${category}.${id}`,
    en,
    pl,
    asset,
    category,
    worldId,
    kind: kind ?? 'word',
  }))
}

// ——————————————————————————————— Tydzień 1 — Ja i moja rodzina

const greetings = make(1, 'greetings', [
  ['hello', 'hello', 'cześć', '👋'],
  ['hi', 'hi', 'cześć (krótko)', '🙋'],
  ['goodbye', 'goodbye', 'do widzenia', '🚪'],
  ['myname', 'my name is', 'mam na imię', '🏷️', 'phrase'],
  ['yourname', "what's your name?", 'jak masz na imię?', '❓🙂', 'phrase'],
  ['nicemeet', 'nice to meet you', 'miło cię poznać', '🤝', 'phrase'],
  ['howold', 'how old are you?', 'ile masz lat?', '🎂', 'phrase'],
  ['iamold', 'I am eight years old', 'mam osiem lat', '8️⃣🎈', 'phrase'],
  ['yes', 'yes', 'tak', '✅'],
  ['no', 'no', 'nie', '❌'],
  ['please', 'please', 'proszę', '🙏'],
  ['thankyou', 'thank you', 'dziękuję', '😊', 'phrase'],
])

const family = make(1, 'family', [
  ['mother', 'mother', 'mama', '👩'],
  ['father', 'father', 'tata', '👨'],
  ['brother', 'brother', 'brat', '👦'],
  ['sister', 'sister', 'siostra', '👧'],
  ['grandma', 'grandma', 'babcia', '👵'],
  ['grandpa', 'grandpa', 'dziadek', '👴'],
  ['family', 'family', 'rodzina', '👨‍👩‍👧‍👦'],
  ['friend', 'friend', 'kolega / przyjaciel', '🧑‍🤝‍🧑'],
  ['thisismy', 'this is my...', 'to jest mój / moja...', '👉', 'phrase'],
  ['hisname', 'his name is', 'on ma na imię', '🙋‍♂️', 'phrase'],
  ['hername', 'her name is', 'ona ma na imię', '🙋‍♀️', 'phrase'],
])

const numbers = make(1, 'numbers', [
  ['1', 'one', 'jeden', '1️⃣'],
  ['2', 'two', 'dwa', '2️⃣'],
  ['3', 'three', 'trzy', '3️⃣'],
  ['4', 'four', 'cztery', '4️⃣'],
  ['5', 'five', 'pięć', '5️⃣'],
  ['6', 'six', 'sześć', '6️⃣'],
  ['7', 'seven', 'siedem', '7️⃣'],
  ['8', 'eight', 'osiem', '8️⃣'],
  ['9', 'nine', 'dziewięć', '9️⃣'],
  ['10', 'ten', 'dziesięć', '🔟'],
  ['11', 'eleven', 'jedenaście', '11'],
  ['12', 'twelve', 'dwanaście', '12'],
  ['13', 'thirteen', 'trzynaście', '13'],
  ['14', 'fourteen', 'czternaście', '14'],
  ['15', 'fifteen', 'piętnaście', '15'],
  ['16', 'sixteen', 'szesnaście', '16'],
  ['17', 'seventeen', 'siedemnaście', '17'],
  ['18', 'eighteen', 'osiemnaście', '18'],
  ['19', 'nineteen', 'dziewiętnaście', '19'],
  ['20', 'twenty', 'dwadzieścia', '20'],
])

// ——————————————————————————————— Tydzień 2 — Dom i jedzenie

const rooms = make(2, 'rooms', [
  ['kitchen', 'kitchen', 'kuchnia', '🍳'],
  ['bathroom', 'bathroom', 'łazienka', '🛁'],
  ['bedroom', 'bedroom', 'sypialnia', '🛌'],
  ['livingroom', 'living room', 'salon', '🛋️'],
  ['garden', 'garden', 'ogród', '🌳'],
  ['garage', 'garage', 'garaż', '🚗🏠'],
])

const objects = make(2, 'objects', [
  ['table', 'table', 'stół', '🍽️'],
  ['chair', 'chair', 'krzesło', '🪑'],
  ['bed', 'bed', 'łóżko', '🛏️'],
  ['lamp', 'lamp', 'lampa', '💡'],
  ['door', 'door', 'drzwi', '🚪'],
  ['window', 'window', 'okno', '🪟'],
  ['tv', 'TV', 'telewizor', '📺'],
])

const food = make(2, 'food', [
  ['bread', 'bread', 'chleb', '🍞'],
  ['milk', 'milk', 'mleko', '🥛'],
  ['cheese', 'cheese', 'ser', '🧀'],
  ['apple', 'apple', 'jabłko', '🍎'],
  ['banana', 'banana', 'banan', '🍌'],
  ['chicken', 'chicken', 'kurczak', '🍗'],
  ['water', 'water', 'woda', '💧'],
  ['juice', 'juice', 'sok', '🧃'],
  ['egg', 'egg', 'jajko', '🥚'],
])

const likes = make(2, 'likes', [
  ['ilike', 'I like...', 'lubię...', '❤️', 'phrase'],
  ['idontlike', "I don't like...", 'nie lubię...', '💔', 'phrase'],
  ['doyoulike', 'do you like...?', 'lubisz...?', '❓❤️', 'phrase'],
  ['yesido', 'yes, I do', 'tak, lubię', '👍', 'phrase'],
  ['noidont', "no, I don't", 'nie, nie lubię', '👎', 'phrase'],
  ['favourite', 'favourite', 'ulubiony', '⭐'],
  ['hungry', 'hungry', 'głodny', '😋'],
  ['canihave', 'can I have...?', 'czy mogę prosić...?', '🤲❓', 'phrase'],
  ['hereyouare', 'here you are', 'proszę bardzo', '🫱', 'phrase'],
  ['goodmorning', 'good morning', 'dzień dobry', '🌅', 'phrase'],
])

// ——————————————————————————————— Tydzień 3 — Sport i czas wolny

const football = make(3, 'football', [
  ['ball', 'ball', 'piłka', '⚽'],
  ['goal', 'goal', 'gol / bramka', '🥅'],
  ['team', 'team', 'drużyna', '👥'],
  ['player', 'player', 'zawodnik', '⛹️'],
  ['match', 'match', 'mecz', '🆚'],
  ['win', 'win', 'wygrywać', '🏆'],
  ['lose', 'lose', 'przegrywać', '😞'],
  ['coach', 'coach', 'trener', '📋'],
  ['football', 'football', 'piłka nożna', '🏟️'],
  ['greatgoal', 'great goal!', 'świetny gol!', '🎉', 'phrase'],
])

const verbs = make(3, 'verbs', [
  ['run', 'run', 'biegać', '🏃'],
  ['jump', 'jump', 'skakać', '🤸'],
  ['swim', 'swim', 'pływać', '🏊'],
  ['play', 'play', 'grać', '🎮'],
  ['ridebike', 'ride a bike', 'jeździć na rowerze', '🚴', 'phrase'],
  ['dance', 'dance', 'tańczyć', '💃'],
  ['sing', 'sing', 'śpiewać', '🎤'],
  ['read', 'read', 'czytać', '📖'],
])

const ability = make(3, 'ability', [
  ['ican', 'I can...', 'umiem...', '💪', 'phrase'],
  ['icant', "I can't...", 'nie umiem...', '🚫', 'phrase'],
  ['canyou', 'can you...?', 'czy umiesz...?', '❓💪', 'phrase'],
  ['watchme', 'watch me!', 'patrz!', '👀', 'phrase'],
  ['favsport', 'my favourite sport is...', 'mój ulubiony sport to...', '⭐⚽', 'phrase'],
  ['doyouplay', 'do you play...?', 'grasz w...?', '❓🎮', 'phrase'],
  ['together', "let's play together", 'zagrajmy razem', '🤝', 'phrase'],
])

// ——————————————————————————————— Tydzień 4 — Wakacje i świat

const weather = make(4, 'weather', [
  ['sunny', 'sunny', 'słonecznie', '☀️'],
  ['rainy', 'rainy', 'deszczowo', '🌧️'],
  ['cloudy', 'cloudy', 'pochmurno', '☁️'],
  ['windy', 'windy', 'wietrznie', '💨'],
  ['hot', 'hot', 'gorąco', '🥵'],
  ['cold', 'cold', 'zimno', '🥶'],
  ['whatweather', "what's the weather like?", 'jaka jest pogoda?', '❓🌤️', 'phrase'],
])

const colors = make(4, 'colors', [
  ['red', 'red', 'czerwony', '🔴'],
  ['blue', 'blue', 'niebieski', '🔵'],
  ['green', 'green', 'zielony', '🟢'],
  ['yellow', 'yellow', 'żółty', '🟡'],
  ['black', 'black', 'czarny', '⚫'],
  ['white', 'white', 'biały', '⚪'],
])

const clothes = make(4, 'clothes', [
  ['tshirt', 'T-shirt', 'koszulka', '👕'],
  ['shorts', 'shorts', 'spodenki', '🩳'],
  ['shoes', 'shoes', 'buty', '👟'],
  ['cap', 'cap', 'czapka z daszkiem', '🧢'],
])

const places = make(4, 'places', [
  ['beach', 'beach', 'plaża', '🏖️'],
  ['mountains', 'mountains', 'góry', '⛰️'],
  ['lake', 'lake', 'jezioro', '🏞️'],
  ['city', 'city', 'miasto', '🏙️'],
  ['forest', 'forest', 'las', '🌲'],
  ['shop', 'shop', 'sklep', '🏪'],
])

const shopping = make(4, 'shopping', [
  ['howmuch', 'how much is it?', 'ile to kosztuje?', '💰❓', 'phrase'],
  ['fivezloty', "it's five zloty", 'to pięć złotych', '💵', 'phrase'],
  ['anythingelse', 'anything else?', 'coś jeszcze?', '🛒❓', 'phrase'],
  ['igoto', 'I go to the beach', 'jadę na plażę', '🚶🏖️', 'phrase'],
  ['wheredoyougo', 'where do you go?', 'dokąd jedziesz?', '🗺️❓', 'phrase'],
])

// ——————————————————————————————— Tydzień 5 — Szkoła

const school = make(5, 'school', [
  ['school', 'school', 'szkoła', '🏫'],
  ['classroom', 'classroom', 'klasa (sala)', '🧑‍🏫'],
  ['teacher', 'teacher', 'nauczyciel', '👩‍🏫'],
  ['pupil', 'pupil', 'uczeń', '🧑‍🎓'],
  ['desk', 'desk', 'biurko / ławka', '🗄️'],
  ['book', 'book', 'książka', '📕'],
  ['notebook', 'notebook', 'zeszyt', '📒'],
  ['pen', 'pen', 'pióro', '🖊️'],
  ['pencil', 'pencil', 'ołówek', '✏️'],
  ['pencilcase', 'pencil case', 'piórnik', '🥡'],
  ['rubber', 'rubber', 'gumka', '🧽'],
  ['ruler', 'ruler', 'linijka', '📏'],
  ['scissors', 'scissors', 'nożyczki', '✂️'],
  ['glue', 'glue', 'klej', '🧴'],
  ['bag', 'bag', 'plecak / torba', '🎒'],
  ['board', 'board', 'tablica', '📋'],
  ['computer', 'computer', 'komputer', '💻'],
  ['clock', 'clock', 'zegar', '🕰️'],
  ['map', 'map', 'mapa', '🗺️'],
  ['picture', 'picture', 'obrazek', '🖼️'],
  ['homework', 'homework', 'zadanie domowe', '📝'],
  ['lesson', 'lesson', 'lekcja', '🔔'],
  ['playground', 'playground', 'plac zabaw', '🛝'],
  ['library', 'library', 'biblioteka', '📚'],
  ['thereis', 'there is...', 'jest / znajduje się...', '👉1️⃣', 'phrase'],
  ['thereare', 'there are...', 'są / znajdują się...', '👉🔢', 'phrase'],
  ['howmany', 'how many...?', 'ile (sztuk)...?', '❓🔢', 'phrase'],
])

const subjects = make(5, 'subjects', [
  ['english', 'English', 'angielski', '🇬🇧'],
  ['maths', 'maths', 'matematyka', '➗'],
  ['art', 'art', 'plastyka', '🖌️'],
  ['music', 'music', 'muzyka', '🎵'],
  ['pe', 'PE', 'wf', '🤾'],
  ['easy', 'easy', 'łatwy', '😃'],
  ['difficult', 'difficult', 'trudny', '😖'],
])

// ——————————————————————————————— Tydzień 6 — Mój dzień

const time = make(6, 'time', [
  ['morning', 'morning', 'rano', '🌄'],
  ['afternoon', 'afternoon', 'popołudnie', '🏞️☀️'],
  ['evening', 'evening', 'wieczór', '🌆'],
  ['night', 'night', 'noc', '🌙'],
  ['day', 'day', 'dzień', '📅'],
  ['week', 'week', 'tydzień', '🗓️'],
  ['monday', 'Monday', 'poniedziałek', 'Mon'],
  ['tuesday', 'Tuesday', 'wtorek', 'Tue'],
  ['wednesday', 'Wednesday', 'środa', 'Wed'],
  ['thursday', 'Thursday', 'czwartek', 'Thu'],
  ['friday', 'Friday', 'piątek', 'Fri'],
  ['saturday', 'Saturday', 'sobota', 'Sat'],
  ['sunday', 'Sunday', 'Sunday → niedziela', 'Sun'],
  ['today', 'today', 'dziś', '📍'],
  ['tomorrow', 'tomorrow', 'jutro', '➡️📅'],
  ['yesterday', 'yesterday', 'wczoraj', '⬅️📅'],
  ['oclock', "o'clock", 'godzina (równa)', '🕐'],
  ['halfpast', 'half past', 'wpół do', '🕜'],
  ['whattime', 'what time is it?', 'która godzina?', '❓🕐', 'phrase'],
])

const routine = make(6, 'routine', [
  ['brushteeth', 'brush my teeth', 'myję zęby', '🦷', 'phrase'],
  ['havebreakfast', 'have breakfast', 'jem śniadanie', '🥣', 'phrase'],
  ['gotoschool', 'go to school', 'idę do szkoły', '🎒', 'phrase'],
  ['comehome', 'come home', 'wracam do domu', '🏡', 'phrase'],
  ['dohomework', 'do my homework', 'robię zadanie', '📝', 'phrase'],
  ['havelunch', 'have lunch', 'jem obiad', '🍽️', 'phrase'],
  ['havedinner', 'have dinner', 'jem kolację', '🍲', 'phrase'],
  ['gotobed', 'go to bed', 'idę spać', '😴', 'phrase'],
])

const frequency = make(6, 'frequency', [
  ['always', 'always', 'zawsze', '💯'],
  ['usually', 'usually', 'zwykle', '🔁'],
  ['sometimes', 'sometimes', 'czasami', '🔀'],
  ['never', 'never', 'nigdy', '🚷'],
  ['early', 'early', 'wcześnie', '🐓'],
  ['late', 'late', 'późno', '🐌'],
])

// ——————————————————————————————— Tydzień 7 — Ciało i zdrowie

const body = make(7, 'body', [
  ['head', 'head', 'głowa', '🗣️'],
  ['hair', 'hair', 'włosy', '💇'],
  ['face', 'face', 'twarz', '🙂'],
  ['eye', 'eye', 'oko', '👁️'],
  ['ear', 'ear', 'ucho', '👂'],
  ['nose', 'nose', 'nos', '👃'],
  ['mouth', 'mouth', 'usta', '👄'],
  ['tooth', 'tooth', 'ząb', '🦷'],
  ['neck', 'neck', 'szyja', '🧣'],
  ['arm', 'arm', 'ramię', '💪'],
  ['hand', 'hand', 'dłoń', '✋'],
  ['finger', 'finger', 'palec', '👆'],
  ['leg', 'leg', 'noga', '🦵'],
  ['knee', 'knee', 'kolano', '🦿'],
  ['foot', 'foot', 'stopa', '🦶'],
  ['back', 'back', 'plecy', '🔙'],
  ['tummy', 'tummy', 'brzuch', '🤰'],
  ['heart', 'heart', 'serce', '🫀'],
])

const health = make(7, 'health', [
  ['doctor', 'doctor', 'lekarz', '🧑‍⚕️'],
  ['nurse', 'nurse', 'pielęgniarka', '👩‍⚕️'],
  ['medicine', 'medicine', 'lekarstwo', '💊'],
  ['hospital', 'hospital', 'szpital', '🏥'],
  ['ill', 'ill', 'chory', '🤒'],
  ['well', 'well', 'zdrowy', '😊'],
  ['tired', 'tired', 'zmęczony', '🥱'],
  ['headache', 'headache', 'ból głowy', '🤕'],
  ['toothache', 'toothache', 'ból zęba', '🦷😖'],
  ['plaster', 'plaster', 'plaster', '🩹'],
  ['whatsmatter', "what's the matter?", 'co się stało?', '❓🤒', 'phrase'],
  ['ifeel', 'I feel...', 'czuję się...', '🫂', 'phrase'],
])

// ——————————————————————————————— Tydzień 8 — Zwierzęta

const animals = make(8, 'animals', [
  ['cat', 'cat', 'kot', '🐱'],
  ['dog', 'dog', 'pies', '🐶'],
  ['bird', 'bird', 'ptak', '🐦'],
  ['fish', 'fish', 'ryba', '🐠'],
  ['rabbit', 'rabbit', 'królik', '🐰'],
  ['hamster', 'hamster', 'chomik', '🐹'],
  ['horse', 'horse', 'koń', '🐴'],
  ['cow', 'cow', 'krowa', '🐮'],
  ['pig', 'pig', 'świnia', '🐷'],
  ['sheep', 'sheep', 'owca', '🐑'],
  ['duck', 'duck', 'kaczka', '🦆'],
  ['hen', 'hen', 'kura', '🐔'],
  ['goat', 'goat', 'koza', '🐐'],
  ['mouse', 'mouse', 'mysz', '🐭'],
  ['lion', 'lion', 'lew', '🦁'],
  ['tiger', 'tiger', 'tygrys', '🐯'],
  ['elephant', 'elephant', 'słoń', '🐘'],
  ['monkey', 'monkey', 'małpa', '🐵'],
  ['bear', 'bear', 'niedźwiedź', '🐻'],
  ['giraffe', 'giraffe', 'żyrafa', '🦒'],
  ['zebra', 'zebra', 'zebra', '🦓'],
  ['snake', 'snake', 'wąż', '🐍'],
  ['crocodile', 'crocodile', 'krokodyl', '🐊'],
  ['frog', 'frog', 'żaba', '🐸'],
  ['spider', 'spider', 'pająk', '🕷️'],
  ['bee', 'bee', 'pszczoła', '🐝'],
  ['butterfly', 'butterfly', 'motyl', '🦋'],
  ['shark', 'shark', 'rekin', '🦈'],
  ['whale', 'whale', 'wieloryb', '🐳'],
  ['dolphin', 'dolphin', 'delfin', '🐬'],
  ['turtle', 'turtle', 'żółw', '🐢'],
  ['penguin', 'penguin', 'pingwin', '🐧'],
  ['wing', 'wing', 'skrzydło', '🪽'],
  ['tail', 'tail', 'ogon', '🐈'],
  ['farm', 'farm', 'gospodarstwo', '🚜'],
  ['zoo', 'zoo', 'zoo', '🎪'],
])

// ——————————————————————————————— Tydzień 9 — Jedzenie 2 i restauracja

const food2 = make(9, 'food2', [
  ['breakfast', 'breakfast', 'śniadanie', '🥣'],
  ['lunch', 'lunch', 'obiad', '🍛'],
  ['dinner', 'dinner', 'kolacja', '🍲'],
  ['rice', 'rice', 'ryż', '🍚'],
  ['pasta', 'pasta', 'makaron', '🍝'],
  ['soup', 'soup', 'zupa', '🥣🥕'],
  ['salad', 'salad', 'sałatka', '🥗'],
  ['sandwich', 'sandwich', 'kanapka', '🥪'],
  ['pizza', 'pizza', 'pizza', '🍕'],
  ['burger', 'burger', 'burger', '🍔'],
  ['chips', 'chips', 'frytki', '🍟'],
  ['potato', 'potato', 'ziemniak', '🥔'],
  ['tomato', 'tomato', 'pomidor', '🍅'],
  ['carrot', 'carrot', 'marchewka', '🥕'],
  ['onion', 'onion', 'cebula', '🧅'],
  ['orange', 'orange', 'pomarańcza', '🍊'],
  ['lemon', 'lemon', 'cytryna', '🍋'],
  ['grapes', 'grapes', 'winogrona', '🍇'],
  ['strawberry', 'strawberry', 'truskawka', '🍓'],
  ['watermelon', 'watermelon', 'arbuz', '🍉'],
  ['pear', 'pear', 'gruszka', '🍐'],
  ['cake', 'cake', 'ciasto', '🍰'],
  ['biscuit', 'biscuit', 'ciastko', '🍪'],
  ['sweets', 'sweets', 'cukierki', '🍬'],
  ['chocolate', 'chocolate', 'czekolada', '🍫'],
  ['icecream', 'ice cream', 'lody', '🍨'],
  ['tea', 'tea', 'herbata', '🍵'],
  ['lemonade', 'lemonade', 'lemoniada', '🥤'],
])

const table = make(9, 'table', [
  ['plate', 'plate', 'talerz', '🍽️'],
  ['cup', 'cup', 'kubek', '☕'],
  ['glass', 'glass', 'szklanka', '🥛'],
  ['fork', 'fork', 'widelec', '🍴'],
  ['spoon', 'spoon', 'łyżka', '🥄'],
  ['menu', 'menu', 'menu', '📜'],
  ['some', 'some', 'trochę / kilka', '➕'],
  ['any', 'any', 'jakikolwiek (w pytaniu)', '❔'],
  ['idlike', "I'd like...", 'chciałbym...', '🙋🍽️', 'phrase'],
  ['howmuch2', 'how much...?', 'ile (nieliczalne)...?', '❓⚖️', 'phrase'],
])

// ——————————————————————————————— Tydzień 10 — Dom 2 i gdzie co jest

const house = make(10, 'house', [
  ['flat', 'flat', 'mieszkanie', '🏢'],
  ['room', 'room', 'pokój', '🖼️🪟'],
  ['floor', 'floor', 'podłoga', '⬜'],
  ['wall', 'wall', 'ściana', '🧱'],
  ['roof', 'roof', 'dach', '🏠'],
  ['stairs', 'stairs', 'schody', '🪜'],
  ['cupboard', 'cupboard', 'szafka', '🚪🍽️'],
  ['shelf', 'shelf', 'półka', '🗄️'],
  ['mirror', 'mirror', 'lustro', '🪞'],
  ['sofa', 'sofa', 'kanapa', '🛋️'],
  ['carpet', 'carpet', 'dywan', '🟫'],
  ['curtain', 'curtain', 'zasłona', '🪟'],
  ['fridge', 'fridge', 'lodówka', '🧊'],
  ['cooker', 'cooker', 'kuchenka', '🍳'],
  ['bath', 'bath', 'wanna', '🛁'],
  ['shower', 'shower', 'prysznic', '🚿'],
  ['towel', 'towel', 'ręcznik', '🧺'],
  ['soap', 'soap', 'mydło', '🧼'],
  ['pillow', 'pillow', 'poduszka', '🛏️💤'],
  ['toy', 'toy', 'zabawka', '🧸'],
  ['box', 'box', 'pudełko', '📦'],
  ['key', 'key', 'klucz', '🔑'],
])

const prepositions = make(10, 'prepositions', [
  ['in', 'in', 'w / wewnątrz', '📥'],
  ['on', 'on', 'na', '⬆️⬜'],
  ['under', 'under', 'pod', '⬇️⬜'],
  ['behind', 'behind', 'za', '🔙⬜'],
  ['infront', 'in front of', 'przed', '⏩⬜'],
  ['nextto', 'next to', 'obok', '↔️⬜'],
  ['between', 'between', 'między', '⬜↔️⬜'],
  ['near', 'near', 'blisko', '📍'],
  ['above', 'above', 'nad', '🔝'],
  ['opposite', 'opposite', 'naprzeciwko', '↕️'],
])

// ——————————————————————————————— Tydzień 11 — Wygląd i ubrania 2

const looks = make(11, 'looks', [
  ['tall', 'tall', 'wysoki', '📏⬆️'],
  ['shortperson', 'short', 'niski', '📏⬇️'],
  ['big', 'big', 'duży', '⬛'],
  ['small', 'small', 'mały', '▪️'],
  ['thin', 'thin', 'chudy', '📎'],
  ['young', 'young', 'młody', '🧒'],
  ['old', 'old', 'stary', '👴'],
  ['pretty', 'pretty', 'ładny', '🌸'],
  ['longhair', 'long hair', 'długie włosy', '👩‍🦰', 'phrase'],
  ['shorthair', 'short hair', 'krótkie włosy', '👨‍🦰', 'phrase'],
  ['blond', 'blond', 'blond', '👱'],
  ['dark', 'dark', 'ciemny', '🌑'],
  ['curly', 'curly', 'kręcony', '🌀'],
  ['straight', 'straight', 'prosty', '➖'],
  ['glasses', 'glasses', 'okulary', '👓'],
  ['hasgot', 'he has got...', 'on ma...', '🙋‍♂️➕', 'phrase'],
  ['iswearing', 'she is wearing...', 'ona ma na sobie...', '🙋‍♀️👗', 'phrase'],
])

const clothes2 = make(11, 'clothes2', [
  ['jacket', 'jacket', 'kurtka', '🧥'],
  ['coat', 'coat', 'płaszcz', '🥼'],
  ['jumper', 'jumper', 'sweter', '🧶'],
  ['shirt', 'shirt', 'koszula', '👔'],
  ['dress', 'dress', 'sukienka', '👗'],
  ['skirt', 'skirt', 'spódnica', '🩱'],
  ['trousers', 'trousers', 'spodnie', '👖'],
  ['socks', 'socks', 'skarpetki', '🧦'],
  ['boots', 'boots', 'kozaki', '🥾'],
  ['trainers', 'trainers', 'adidasy', '👟'],
  ['hat', 'hat', 'kapelusz', '👒'],
  ['scarf', 'scarf', 'szalik', '🧣'],
  ['gloves', 'gloves', 'rękawiczki', '🧤'],
  ['pocket', 'pocket', 'kieszeń', '👝'],
])

// ——————————————————————————————— Tydzień 12 — Pory roku i pogoda 2

const seasons = make(12, 'seasons', [
  ['spring', 'spring', 'wiosna', '🌷'],
  ['summer', 'summer', 'lato', '🌻'],
  ['autumn', 'autumn', 'jesień', '🍂'],
  ['winter', 'winter', 'zima', '❄️'],
  ['season', 'season', 'pora roku', '🔄'],
  ['january', 'January', 'styczeń', 'I'],
  ['february', 'February', 'luty', 'II'],
  ['march', 'March', 'marzec', 'III'],
  ['april', 'April', 'kwiecień', 'IV'],
  ['may', 'May', 'maj', 'V'],
  ['june', 'June', 'czerwiec', 'VI'],
  ['july', 'July', 'lipiec', 'VII'],
  ['august', 'August', 'sierpień', 'VIII'],
  ['september', 'September', 'wrzesień', 'IX'],
  ['october', 'October', 'październik', 'X'],
  ['november', 'November', 'listopad', 'XI'],
  ['december', 'December', 'grudzień', 'XII'],
])

const weather2 = make(12, 'weather2', [
  ['snow', 'snow', 'śnieg', '🌨️'],
  ['rain', 'rain', 'deszcz', '☔'],
  ['wind', 'wind', 'wiatr', '🍃'],
  ['cloud', 'cloud', 'chmura', '☁️'],
  ['sun', 'sun', 'słońce', '🌞'],
  ['storm', 'storm', 'burza', '⛈️'],
  ['fog', 'fog', 'mgła', '🌫️'],
  ['ice', 'ice', 'lód', '🧊'],
  ['warm', 'warm', 'ciepło', '🌡️'],
  ['wet', 'wet', 'mokro', '💦'],
  ['dry', 'dry', 'sucho', '🏜️'],
  ['umbrella', 'umbrella', 'parasol', '☂️'],
  ['sunglasses', 'sunglasses', 'okulary słoneczne', '🕶️'],
  ['itssnowing', 'it is snowing', 'pada śnieg', '🌨️👇', 'phrase'],
  ['itsraining', 'it is raining', 'pada deszcz', '☔👇', 'phrase'],
])

// ——————————————————————————————— Czasowniki, tygodnie 5–12
// Same odmiany siedzą w verbs.ts — tu jest tylko słownictwo.

const actions = [
  ...make(5, 'actions', [
    ['learn', 'learn', 'uczyć się', '📚'],
    ['teach', 'teach', 'uczyć (kogoś)', '🧑‍🏫'],
    ['ask', 'ask', 'pytać', '🙋❓'],
    ['answer', 'answer', 'odpowiadać', '🙋✅'],
    ['listen', 'listen', 'słuchać', '👂'],
    ['look', 'look', 'patrzeć', '👀'],
    ['help', 'help', 'pomagać', '🆘'],
  ]),
  ...make(6, 'actions', [
    ['getup', 'get up', 'wstawać', '⏰'],
    ['wash', 'wash', 'myć', '🧼'],
    ['go', 'go', 'iść / jechać', '🚶'],
    ['come', 'come', 'przychodzić', '🚪'],
    ['do', 'do', 'robić', '🛠️'],
    ['start', 'start', 'zaczynać', '🚦'],
    ['finish', 'finish', 'kończyć', '🏁'],
  ]),
  ...make(7, 'actions', [
    ['sleep', 'sleep', 'spać', '💤'],
    ['wakeup', 'wake up', 'budzić się', '🌅😀'],
    ['feel', 'feel', 'czuć się', '🫂'],
    ['hurt', 'hurt', 'boleć', '🤕'],
    ['cry', 'cry', 'płakać', '😢'],
    ['laugh', 'laugh', 'śmiać się', '😂'],
    ['stand', 'stand', 'stać', '🧍'],
  ]),
  ...make(8, 'actions', [
    ['fly', 'fly', 'latać', '🕊️'],
    ['see', 'see', 'widzieć', '👁️‍🗨️'],
    ['find', 'find', 'znajdować', '🔍'],
    ['live', 'live', 'mieszkać', '🏠❤️'],
    ['walk', 'walk', 'chodzić', '🚶‍♀️'],
    ['sit', 'sit', 'siedzieć', '🪑'],
    ['catch', 'catch', 'łapać', '🥎'],
  ]),
  ...make(9, 'actions', [
    ['eat', 'eat', 'jeść', '😋'],
    ['drink', 'drink', 'pić', '🧊🥤'],
    ['cook', 'cook', 'gotować', '👨‍🍳'],
    ['buy', 'buy', 'kupować', '🛒'],
    ['want', 'want', 'chcieć', '🤩'],
    ['need', 'need', 'potrzebować', '🙏❗'],
    ['taste', 'taste', 'smakować', '👅'],
  ]),
  ...make(10, 'actions', [
    ['open', 'open', 'otwierać', '📂'],
    ['close', 'close', 'zamykać', '🔒'],
    ['clean', 'clean', 'sprzątać', '🧹'],
    ['put', 'put', 'kłaść', '📥⬇️'],
    ['carry', 'carry', 'nieść', '🎒💪'],
    ['make', 'make', 'robić / tworzyć', '🔨'],
    ['take', 'take', 'brać', '🫴'],
  ]),
  ...make(11, 'actions', [
    ['wear', 'wear', 'nosić (ubranie)', '👕'],
    ['give', 'give', 'dawać', '🎁'],
    ['choose', 'choose', 'wybierać', '☝️'],
    ['brush', 'brush', 'czesać / szczotkować', '🪮'],
    ['smile', 'smile', 'uśmiechać się', '😄'],
    ['show', 'show', 'pokazywać', '👉👀'],
    ['wait', 'wait', 'czekać', '⏳'],
  ]),
  ...make(12, 'actions', [
    ['speak', 'speak', 'mówić (językiem)', '🗣️'],
    ['say', 'say', 'powiedzieć', '💬'],
    ['think', 'think', 'myśleć', '🤔'],
    ['know', 'know', 'wiedzieć', '💡'],
    ['write', 'write', 'pisać', '✍️'],
    ['draw', 'draw', 'rysować', '🖍️'],
    ['travel', 'travel', 'podróżować', '🧳'],
  ]),
]

export const WORDS: Word[] = [
  ...greetings,
  ...family,
  ...numbers,
  ...rooms,
  ...objects,
  ...food,
  ...likes,
  ...football,
  ...verbs,
  ...ability,
  ...weather,
  ...colors,
  ...clothes,
  ...places,
  ...shopping,
  ...school,
  ...subjects,
  ...time,
  ...routine,
  ...frequency,
  ...body,
  ...health,
  ...animals,
  ...food2,
  ...table,
  ...house,
  ...prepositions,
  ...looks,
  ...clothes2,
  ...seasons,
  ...weather2,
  ...actions,
]

/** Etykiety kategorii po polsku — używane w sortowaniu, „co nie pasuje" i łapaniu słów. */
export const CATEGORY_LABEL: Record<WordCategory, { pl: string; icon: string }> = {
  greetings: { pl: 'Zwroty', icon: '👋' },
  family: { pl: 'Rodzina', icon: '👪' },
  numbers: { pl: 'Liczby', icon: '🔢' },
  rooms: { pl: 'Pokoje', icon: '🚪' },
  objects: { pl: 'Przedmioty', icon: '🛋️' },
  food: { pl: 'Jedzenie', icon: '🍎' },
  likes: { pl: 'Lubię i proszę', icon: '❤️' },
  football: { pl: 'Piłka nożna', icon: '⚽' },
  verbs: { pl: 'Czynności', icon: '🏃' },
  ability: { pl: 'Umiem', icon: '💪' },
  weather: { pl: 'Pogoda', icon: '🌤️' },
  colors: { pl: 'Kolory', icon: '🎨' },
  clothes: { pl: 'Ubrania', icon: '👕' },
  places: { pl: 'Miejsca', icon: '🗺️' },
  shopping: { pl: 'Zakupy', icon: '🛒' },
  school: { pl: 'Szkoła', icon: '🏫' },
  subjects: { pl: 'Przedmioty szkolne', icon: '📚' },
  time: { pl: 'Czas i dni', icon: '🕐' },
  routine: { pl: 'Mój dzień', icon: '📆' },
  frequency: { pl: 'Jak często', icon: '🔁' },
  body: { pl: 'Ciało', icon: '🧍' },
  health: { pl: 'Zdrowie', icon: '🩹' },
  animals: { pl: 'Zwierzęta', icon: '🐾' },
  food2: { pl: 'Jedzenie', icon: '🍕' },
  table: { pl: 'Przy stole', icon: '🍴' },
  house: { pl: 'W domu', icon: '🏠' },
  prepositions: { pl: 'Gdzie co jest', icon: '📍' },
  looks: { pl: 'Wygląd', icon: '🙂' },
  clothes2: { pl: 'Ubrania', icon: '🧥' },
  seasons: { pl: 'Pory roku', icon: '🍂' },
  weather2: { pl: 'Pogoda', icon: '🌦️' },
  actions: { pl: 'Czynności', icon: '🏃' },
}

/** Angielskie nazwy liczb 1–20, do działań matematycznych. */
export const NUMBER_WORDS = numbers.map((w) => w.en)

export const WORD_BY_ID = new Map(WORDS.map((w) => [w.id, w]))

export function getWord(id: string): Word {
  const w = WORD_BY_ID.get(id)
  if (!w) throw new Error(`Brak słowa o id "${id}" — sprawdź lessons.ts`)
  return w
}
