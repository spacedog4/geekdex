export type Tag = "initial" | "over" | "legendary" | "shiny" | "corrupted" | "purified" | "mythic";

export type Source = "base" | "novos_horizontes" | "desafio_dos_cristais" | "aura_corrompida" | "bagdex" | "catarse";

export type Habitat = "campo" | "floresta" | "urbano" | "caverna" | "montanha" | "neve" | "praia" | "água" | "deserto";

export type Element = "água" | "fogo" | "planta" | "magnético" | "místico" | "crepuscular" | "terra" | "fera";

export type Geekmon = {
  number: string;
  name: string;
  description: string;
  ref?: string;
  tags: Tag[];
  evolutions: string[][];
  habitat: Habitat[];
  elements: Element[];
  weakness: Element;
  weight: number;
  height: number;
};

export const Gradients: Record<Element, [string, string]> = {
  água: ["#9fd7e5", "#8aa2d4"],
  fogo: ["#f7b361", "#bc3534"],
  planta: ["#b3d385", "#45aa51"],
  magnético: ["#f8ed77", "#d1ae4d"],
  místico: ["#e27684", "#bc5a9e"],
  crepuscular: ["#dac5e1", "#7c5594"],
  terra: ["#fad7be", "#b4805f"],
  fera: ["#c2c2c3", "#7c7c81"],
};

export function getSource(geekmon: Geekmon): Source {
  if (geekmon.tags.includes("purified") || geekmon.tags.includes("corrupted")) {
    return "aura_corrompida";
  }

  if (geekmon.number.startsWith("B")) {
    return "bagdex";
  }

  if (parseInt(geekmon.number) <= 77) {
    return "base";
  }

  if (parseInt(geekmon.number) <= 115) {
    return "novos_horizontes";
  }

  if (parseInt(geekmon.number) <= 151) {
    return "desafio_dos_cristais";
  }

  if (parseInt(geekmon.number) <= 156) {
    return "aura_corrompida";
  }

  return "catarse";
}

export const geekmons: Geekmon[] = [
  {
    number: "001",
    name: "Kidcoot",
    description:
      "Kidcoot é um pequeno Geekmon malandro e esperto. Carrega consigo uma máscara que o faz se sentir mais confiante. Fiel ao seus companheiros, usa sua astúcia para protegêlos, desviando a atenção e se esquivando dos ataques com sua malandragem natural. Apesar de adorar pregar peças, Kidcoot é um parceiro confiável, nunca abandonando aqueles que o acolhem.",
    ref: "Um marsupial malandro, conhecido por suas travessuras e sua habilidade em derrotar inimigos girando freneticamente.",
    tags: ["initial"],
    evolutions: [["001", "002", "003"]],
    habitat: ["floresta", "campo"],
    elements: ["planta"],
    weakness: "fogo",
    weight: 9,
    height: 0.7,
  },
  {
    number: "002",
    name: "Teencoot",
    description:
      "Teencoot é um Geekmon ousado e cheio de energia, que está sempre em busca de um bom desafio. Sua máscara é capaz de criar leves ilusões, utilizadas para confundir seus adversários. Teencoot é um grande amigo e excelente parceiro de equipe, e nunca se afastará daqueles de quem confia.",
    ref: "Um marsupial malandro, conhecido por suas travessuras e sua habilidade em derrotar inimigos girando freneticamente.",
    tags: [],
    evolutions: [["001", "002", "003"]],
    habitat: ["floresta", "campo"],
    elements: ["planta"],
    weakness: "fogo",
    weight: 30,
    height: 1.2,
  },
  {
    number: "003",
    name: "Maskcoot",
    description:
      "Maskcoot é um mestre do disfarce e da manipulação. Sua máscara lhe dá poderes místicos que o permitem criar ilusões complexas, capazes de enganar até os adversários mais inteligentes. Embora seja astuto e um pouco enganador, Maskcoot é um amigo leal e protetor para aqueles que conhecem seu verdadeiro caráter, usando suas habilidades para protegê-los a todo custo. Ele é conhecido por ser um protetor disfarçado, sempre um passo à frente dos inimigos.",
    ref: "Um marsupial malandro, conhecido por suas travessuras e sua habilidade em derrotar inimigos girando freneticamente.",
    tags: [],
    evolutions: [["001", "002", "003"]],
    habitat: ["floresta", "campo"],
    elements: ["planta", "místico"],
    weakness: "magnético",
    weight: 70,
    height: 1.8,
  },
  {
    number: "004",
    name: "Broscoon",
    description:
      "Broscoon é um Geekmon pequeno, calmo e amigável, conhecido por sua habilidade de fazer amigos com facilidade. Seu pelo é resistente ao fogo, o que lhe proporciona uma proteção natural durante as batalhas. Ele prefere evitar confrontos diretos, mas, quando necessário, é capaz de lançar pequenas bolas de fogo para se defender. Broscoon é o parceiro ideal para quem busca um companheiro tranquilo e leal.",
    ref: "Um encanador bigodudo, famoso por saltar sobre inimigos, coletar moedas e salvar uma princesa em apuros.",
    tags: ["initial"],
    evolutions: [["004", "005", "006"]],
    habitat: ["floresta", "montanha"],
    elements: ["fogo"],
    weakness: "água",
    weight: 8,
    height: 0.6,
  },
  {
    number: "005",
    name: "Brostache",
    description:
      "Com sua confiança recém-descoberta, Brostache desenvolveu um bigode flamejante, cuja intensidade aumenta conforme ele acumula calor. As membranas em seus braços permitem que ele plane por curtas distâncias, utilizando essa habilidade tanto para se esquivar quanto para desferir ataques surpresas. Sempre leal, Brostache protege seus amigos com determinação e está sempre disposto a entrar em combate quando necessário.",
    ref: "Um encanador bigodudo, famoso por saltar sobre inimigos, coletar moedas e salvar uma princesa em apuros.",
    tags: [],
    evolutions: [["004", "005", "006"]],
    habitat: ["floresta", "montanha"],
    elements: ["fogo"],
    weakness: "água",
    weight: 40,
    height: 1.1,
  },
  {
    number: "006",
    name: "Brostar",
    description:
      "Brostar é o ápice de confiança e serenidade. Suas membranas lhe permitem voar a grandes altitudes, e seu bigode flamejante se tornou uma verdadeira arma de intimidação. Com sua habilidade de lançar poderosas bolas de fogo, Brostar pode atacar de longe, controlando o campo de batalha com sua força devastadora. Um veterano no combate, Brostar está sempre pronto para qualquer desafio.",
    ref: "Um encanador bigodudo, famoso por saltar sobre inimigos, coletar moedas e salvar uma princesa em apuros.",
    tags: [],
    evolutions: [["004", "005", "006"]],
    habitat: ["floresta", "montanha"],
    elements: ["fogo", "fera"],
    weakness: "místico",
    weight: 100,
    height: 1.6,
  },
  {
    number: "007",
    name: "Hogbuo",
    description:
      "Hogbuo é um Geekmon brincalhão e cheio de energia, conhecido por trazer alegria a qualquer situação. As boias em seus braços ajudam-no a manter o equilíbrio e agilidade na água, o que o torna incrivelmente rápido. Hogbuo adora nadar em correntes rápidas e participar de competições aquáticas, sempre em busca de diversão. Este companheiro fiel é ideal para treinadores que buscam aventura e diversão.",
    ref: "Um ouriço azul ultrarrápido, conhecido por coletar anéis dourados enquanto corre por diversos mundos.",
    tags: ["initial"],
    evolutions: [["007", "008", "009"]],
    habitat: ["praia", "água"],
    elements: ["água"],
    weakness: "magnético",
    weight: 8,
    height: 0.7,
  },
  {
    number: "008",
    name: "Hogpume",
    description:
      "Hogpume possui um cinto de pedra-pomes e uma cauda em formato de barbatana que o tornam incrivelmente leve e veloz na água. Ele é capaz de cortar as águas com facilidade e o bater de sua cauda pode criar ondas mesmo nas águas mais tranquilas. Hogpume é enérgico e confiante, e está sempre pronto para uma boa competição de nado. Ele é o parceiro perfeito para treinadores que desejam explorar oceanos com velocidade.",
    ref: "Um ouriço azul ultrarrápido, conhecido por coletar anéis dourados enquanto corre por diversos mundos.",
    tags: [],
    evolutions: [["007", "008", "009"]],
    habitat: ["praia", "água"],
    elements: ["água"],
    weakness: "magnético",
    weight: 25,
    height: 1.1,
  },
  {
    number: "009",
    name: "Hogbro",
    description:
      "Hogbro é conhecido como o mestre do surf, com um corpo coberto por pedras-pomes e uma cauda poderosa capaz de criar ondas gigantes, das quais ele adora surfar. Seu chifre afiado é utilizado para desferir seu golpe assinatura, o Surfing Drill, com uma força devastadora. Hogbro é incansável e combina velocidade com força bruta, tornando-o um adversário perigoso tanto em batalhas aquáticas e terrestres.",
    ref: "Um ouriço azul ultrarrápido, conhecido por coletar anéis dourados enquanto corre por diversos mundos.",
    tags: [],
    evolutions: [["007", "008", "009"]],
    habitat: ["praia", "água"],
    elements: ["água", "terra"],
    weakness: "fera",
    weight: 85,
    height: 1.8,
  },
  {
    number: "010",
    name: "Rayfox",
    description:
      "Rayfox é um Geekmon curioso e ingênuo que sempre explora seu entorno com um olhar atento. Sua pequena cauda em forma de raio emite descargas elétricas suaves usadas tanto para defesa quanto para comunicação. Rayfox é um companheiro leal e carinhoso, ideal para quem busca aventura e descobertas com um amigo energizante.",
    tags: ["initial"],
    evolutions: [["010", "011", "012"]],
    habitat: ["floresta", "urbano"],
    elements: ["magnético"],
    weakness: "planta",
    weight: 7,
    height: 0.6,
  },
  {
    number: "011",
    name: "Glowfox",
    description:
      "Glowfox evolui de Rayfox, transformando sua inocência em confiança. Sua cauda armazena uma grande quantidade de energia elétrica que pode ser canalizada para criar esferas de energia luminosa com suas mãos. Quanto mais energia acumula, maiores e mais devastadoras se tornam suas esferas. Glowfox é um guerreiro enérgico, e está sempre pronto para enfrentar qualquer oponente.",
    ref: "Um herói destemido com membros flutuantes, que explora terras mágicas e enfrenta inimigos em aventuras surreais.",
    tags: [],
    evolutions: [["010", "011", "012"]],
    habitat: ["floresta", "urbano"],
    elements: ["magnético"],
    weakness: "planta",
    weight: 25,
    height: 1.2,
  },
  {
    number: "012",
    name: "Stormfox",
    description:
      "Stormfox é a encarnação de uma tempestade elétrica. Seus chifres são capazes de absorver a eletricidade ao seu redor para energizar sua crista e criar tempestades elétricas imensas. Quanto maior a energia acumulada, maior se torna sua crista e mais poderosos seus ataques elétricos. Stormfox pode transformar o dia em noite com sua tempestade sombria, sendo um imponente mestre do poder elétrico.",
    ref: "Um herói destemido com membros flutuantes, que explora terras mágicas e enfrenta inimigos em aventuras surreais.",
    tags: [],
    evolutions: [["010", "011", "012"]],
    habitat: ["floresta", "urbano"],
    elements: ["magnético", "crepuscular"],
    weakness: "terra",
    weight: 70,
    height: 1.8,
  },
  {
    number: "013",
    name: "Geobrat",
    description:
      "Geobrat é um Geekmon valente e determ que sonha em se tornar um verdadeiro herói. A lanterna de magma em sua cabeça o ajuda a explorar cavernas escuras e passagens subterrâneas, iluminando seu caminho. Seu proto canhão dispara pequenos projéteis de rocha fundida, tornando-o eficaz na defesa contra inimigos menores. Geobrat é o parceiro ideal para quem busca um companheiro de aventuras.",
    ref: "Um jovem robô armado com um canhão, que enfrenta ameaças tecnológicas enquanto luta para proteger o mundo.",
    tags: ["initial"],
    evolutions: [["013", "014", "015"]],
    habitat: ["caverna", "montanha"],
    elements: ["terra"],
    weakness: "fera",
    weight: 12,
    height: 0.7,
  },
  {
    number: "014",
    name: "Geoforge",
    description:
      "Geoforge é um Geekmon destemido, equipado com um canhão de braço que dispara jatos de lava. Sua mão oposta se transformou em uma lâmina afiada, perfeita para combates corpo a corpo. Geoforge está sempre pronto para enfrentar qualquer inimigo e é conhecido por sua coragem em qualquer situação.",
    ref: "Um jovem robô armado com um canhão, que enfrenta ameaças tecnológicas enquanto luta para proteger o mundo.",
    tags: [],
    evolutions: [["013", "014", "015"]],
    habitat: ["caverna", "montanha"],
    elements: ["terra"],
    weakness: "fera",
    weight: 55,
    height: 1.3,
  },
  {
    number: "015",
    name: "Magmageo",
    description:
      "Magmageo é reconhecido por sua carapaça de magma endurecido, que serve como uma armadura quase impenetrável. Seu canhão aprimorado dispara potentes rajadas de lava a longas distâncias, enquanto sua outra mão se transformou em uma espada flamejante, tornando-o um mestre tanto no combate à distância quanto corpo a corpo. Magmageo é conhecido por ser um gigante protetor, sempre de prontidão para defender seus aliados.",
    ref: "Um jovem robô armado com um canhão, que enfrenta ameaças tecnológicas enquanto luta para proteger o mundo.",
    tags: [],
    evolutions: [["013", "014", "015"]],
    habitat: ["caverna", "montanha"],
    elements: ["terra", "fogo"],
    weakness: "água",
    weight: 120,
    height: 2,
  },
  {
    number: "016",
    name: "Jawchan",
    description:
      "Jawchan é um Geekmon alegre e habilidoso que está sempre pronto para enfrentar qualquer desafio. Apesar de seu tamanho pequeno, ele é ágil e destemido, o que o torna uma verdadeira força nos combates. Sua natureza otimista e descontraída esconde um coração valente, que nunca hesita em proteger seus amigos. Jawchan é o parceiro perfeito para quem busca aventura e ação com um toque de diversão.",
    ref: "Um guerreiro mutante que adora pizza, famoso por suas incríveis habilidades marciais.",
    tags: ["initial"],
    evolutions: [["016", "017", "018"]],
    habitat: ["urbano", "campo"],
    elements: ["fera"],
    weakness: "místico",
    weight: 8,
    height: 0.6,
  },
  {
    number: "017",
    name: "Turchan",
    description:
      "Turchan se destaca por sua força no combate corpo a corpo, possuindo uma resistência física muito desenvolvida. Ele começa a manifestar sinais de habilidade elétrica, com pequenos para-raios em seu corpo que captam energia estática. Embora ainda não seja completamente habilidoso, é capaz de canalizar essa energia para fortalecer seus golpes. Com uma confiança crescente, Turchan é um combatente incansável, sempre em busca de batalhas para testar sua força.",
    ref: "Um guerreiro mutante que adora pizza, famoso por suas incríveis habilidades marciais.",
    tags: [],
    evolutions: [["016", "017", "018"]],
    habitat: ["urbano", "campo"],
    elements: ["fera"],
    weakness: "místico",
    weight: 30,
    height: 1.2,
  },
  {
    number: "018",
    name: "Shellchan",
    description:
      "Shellchan é um Geekmon imponente e disciplinado, conhecido por sua força descomunal e habilidades de combate avançadas. Sua capacidade de absorver eletricidade permite que ele dispare poderosos socos elétricos, capazes de paralisar o adversário com um único golpe. Sua carapaça, dura como pedra, lhe confere uma excelente defesa, tornando-o quase invulnerável em combates físicos.",
    ref: "Um guerreiro mutante que adora pizza, famoso por suas incríveis habilidades marciais.",
    tags: [],
    evolutions: [["016", "017", "018"]],
    habitat: ["urbano", "campo"],
    elements: ["fera", "magnético"],
    weakness: "planta",
    weight: 110,
    height: 1.9,
  },
  {
    number: "019",
    name: "Sadworm",
    description:
      "Sadworm é um Geekmon introvertido que raramente emerge da terra, preferindo viver em profundos túneis cavados sob as dunas ou florestas densas. Possui uma pequena raiz em desenvolvimento na ponta de sua cauda, indicando sua conexão com a terra. Embora sua expressão triste seja constante, ele é bastante resiliente. Porém, Sadworm prefere evitar confrontos, utilizando sua camuflagem natural para se misturar ao ambiente.",
    ref: "Um colossal verme de areia, conhecido por mover-se por debaixo da terra e inspirar terror nas dunas do deserto.",
    tags: [],
    evolutions: [["019", "020"]],
    habitat: ["deserto", "floresta"],
    elements: ["terra", "planta"],
    weakness: "fera",
    weight: 10,
    height: 1,
  },
  {
    number: "020",
    name: "Rootworm",
    description:
      "Mesmo com um corpo imenso, Rootworm é capaz de atravessar com agilidade tanto as dunas do deserto quanto os solos das florestas. A raiz na ponta de sua cauda está totalmente desenvolvida e permite que ele se ancore no solo para desferir ataques precisos ou escapar de ameaças. Agressivo e territorial, Rootworm defende seu território com força e vigor. Sua capacidade de se camuflar tanto em terrenos arenosos quanto entre as árvores o torna um caçador mortal.",
    ref: "Um colossal verme de areia, conhecido por mover-se por debaixo da terra e inspirar terror nas dunas do deserto.",
    tags: [],
    evolutions: [["019", "020"]],
    habitat: ["deserto", "floresta"],
    elements: ["terra", "planta"],
    weakness: "místico",
    weight: 180,
    height: 6,
  },
  {
    number: "021",
    name: "Malepillar",
    description:
      "Com chifres pequenos e uma pelagem delicada ao redor de seu pescoço, Malepillar passa seus dias mastigando folhas e se preparando para uma grandiosa metamorfose. Sua aparência curiosa e peculiar esconde um temperamento volátil, reagindo rapidamente a qualquer ameaça. Treinadores que cuidam de Malepillar devem ter paciência, pois esse estágio é crucial para o desenvolvimento de seu verdadeiro poder.",
    ref: "Uma poderosa feiticeira, conhecida por sua transformação dramática e uma presença intimidadora.",
    tags: [],
    evolutions: [["021", "022", "023"]],
    habitat: ["floresta", "campo"],
    elements: ["fera"],
    weakness: "místico",
    weight: 3,
    height: 0.3,
  },
  {
    number: "022",
    name: "Malecoon",
    description:
      "Envolta em um resistente casulo, Malecoon mergulha em um estado de hibernação profunda enquanto se prepara para sua metamorfose final. Seus chifres, agora maiores, são uma poderosa defesa natural, contra predadores. Porém, se perturbada, é capaz de desferir ataques inesperados mesmo em seu estado adormecido. Sua evolução depende de sua capacidade de se proteger até estar pronto para sua verdadeira forma.",
    ref: "Uma poderosa feiticeira, conhecida por sua transformação dramática e uma presença intimidadora.",
    tags: [],
    evolutions: [["021", "022", "023"]],
    habitat: ["floresta", "campo"],
    elements: ["fera"],
    weakness: "místico",
    weight: 10,
    height: 0.7,
  },
  {
    number: "023",
    name: "Malemoth",
    description:
      "Com suas majestosas asas e chifres negros que irradiam poder, Malemoth é o estágio final de um grande processo de metamorfose. Seu voo gracioso pelos céus das florestas esconde um perigo mortal: suas asas liberam um pó paralisante quando sente-se ameaçada. Embora sua aparência seja exuberante, os treinadores devem ser cautelosos: Malemoth é tanto bela quanto perigosa, reagindo com força quando provocada.",
    ref: "Uma poderosa feiticeira, conhecida por sua transformação dramática e uma presença intimidadora.",
    tags: [],
    evolutions: [["021", "022", "023"]],
    habitat: ["floresta", "campo"],
    elements: ["fera", "planta"],
    weakness: "fogo",
    weight: 32,
    height: 1.3,
  },
  {
    number: "024",
    name: "Misticken",
    description:
      "Misticken é reverenciada em lendas antigas por suas habilidades de acelerar o crescimento das plantas, protegendo campos férteis com poderes místicos. Seus dons psíquicos confundem quem tenta se aproximar com más intenções, apagando da memória qualquer visão de sua presença. Encontrá-la é extremamente raro, e os treinadores que conquistam sua confiança são agraciados com seus poderes de cultivo e proteção da terra.",
    ref: "Uma criatura que vive em fazendas pacíficas, ajudando a terra a florescer e acelerando o crescimento das colheitas.",
    tags: [],
    evolutions: [["024"]],
    habitat: ["campo", "floresta"],
    elements: ["místico", "planta"],
    weakness: "crepuscular",
    weight: 30,
    height: 0.9,
  },
  {
    number: "025",
    name: "Sisgems",
    description:
      "Sisgems é um trio inseparável de irmãs, conectadas por três pedras preciosas que brilham intensamente quando estão próximas. Cada irmã possui uma habilidade única e um temperamento distinto, mas é na cooperação que encontram sua verdadeira força. Juntas, combinam o poder do fogo e da terra para realizar ataques devastadores e coordenados. Leais entre si, sua força vem de sua união inabalável.",
    ref: "Um trio poderoso de irmãs, conhecidas por sua união e habilidade de proteger sua cidade contra as forças do mal.",
    tags: [],
    evolutions: [["025"]],
    habitat: ["montanha", "urbano"],
    elements: ["fogo", "terra"],
    weakness: "fera",
    weight: 38,
    height: 0.8,
  },
  {
    number: "026",
    name: "Botuci",
    description:
      "Botuci é um Geekmon brincalhão, conhecido por seus truques astutos e sua habilidade de desaparecer quando bem entender. Apesar de adorar pregar peças nos que passam pelo seu território, Botuci tem um coração generoso e não hesita em agir quando percebe que alguém precisa de ajuda. Sua habilidade de se esconder rapidamente intriga os treinadores, mas é aconselhável manter a atenção ao explorar áreas onde este Geekmon vive.",
    ref: "Uma figura folclórica famosa por sua natureza travessa e por desaparecer em redemoinhos enquanto prega peças.",
    tags: [],
    evolutions: [["026", "027"]],
    habitat: ["floresta", "montanha"],
    elements: ["terra", "crepuscular"],
    weakness: "água",
    weight: 15,
    height: 0.9,
  },
  {
    number: "027",
    name: "Sacicatu",
    description:
      "Quando Botuci encontra uma garrafa vazia, ele se esconde dentro dela e evolui para Sacicatu. Este Geekmon, agora forte e imponente, torna-se eternamente ligado à garrafa, que amplifica seus poderes. Sacicatu combina força física com habilidades ilusórias, formando um lutador temível que pode manipular o campo de batalha a seu favor. Seu espírito selvagem e natureza indomável o torna difícil de treinar, mas, sob a tutela de um treinador habilidoso, ele se torna um aliado inestimável.",
    ref: "Uma figura folclórica famosa por sua natureza travessa e por desaparecer em redemoinhos enquanto prega peças.",
    tags: [],
    evolutions: [["026", "027"]],
    habitat: ["floresta", "montanha"],
    elements: ["terra", "crepuscular"],
    weakness: "fera",
    weight: 100,
    height: 1.8,
  },
  {
    number: "028",
    name: "Magihat",
    description:
      "Magihat está profundamente sintonizado com as energias místicas do universo, representando as maravilhas e encantos naturais. Seu chapéu serve como catalisador para seus truques e ilusões mágicas, criando faíscas elétricas e feitiços encantadores. A aura de mistério que emana de Magihat fascina e encanta todos ao seu redor. Embora seja um mago iniciante, Magihat possui um imenso potencial mágico que aguarda ser revelado.",
    ref: "O poderoso mago ao lado do maior duelista de todos os tempos, desde a era dos faraós.",
    tags: [],
    evolutions: [["028", "029"]],
    habitat: ["floresta", "urbano"],
    elements: ["místico", "magnético"],
    weakness: "crepuscular",
    weight: 12,
    height: 0.6,
  },
  {
    number: "029",
    name: "Flygician",
    description:
      "Flygician é um mestre das artes místicas. Empunhando um cajado que crepita com energia elétrica, Flygician conjura feitiços impressionantes e sua aura ressoa com poder arcano. Como guardião dos segredos antigos, Flygician protege o conhecimento oculto e usa sua sabedoria para manter o equilíbrio entre as forças místicas. Sua maestria sobre as artes arcanas e seu domínio da eletricidade fazem dele um aliado temível e altamente respeitado.",
    ref: "O poderoso mago ao lado do maior duelista de todos os tempos, desde a era dos faraós.",
    tags: [],
    evolutions: [["028", "029"]],
    habitat: ["floresta", "urbano"],
    elements: ["místico", "magnético"],
    weakness: "planta",
    weight: 75,
    height: 1.8,
  },
  {
    number: "030",
    name: "Mouselet",
    description:
      "Mouselet é um adorável bebê com grandes olhos brilhantes e uma aparência inocente. Sua carinha fofa consegue derreter até os corações mais duros, mas por trás desse exterior encantador, ele carrega um imenso potencial oculto. Dependendo de seu gênero, Mouselet evolui em dois caminhos distintos: os machos tornam-se Sorcerat, um aprendiz de feiticeiro que controla águas e sombras, enquanto as fêmeas evoluem para Faecharm, uma fada camundonga capaz de dominar o fogo.",
    ref: "Um camundongo carismático, conhecido por encantar gerações em histórias mágicas e inesquecíveis.",
    tags: [],
    evolutions: [
      ["030", "031", "032"],
      ["030", "033", "034"],
    ],
    habitat: ["campo", "floresta"],
    elements: ["fera"],
    weakness: "magnético",
    weight: 5,
    height: 0.4,
  },
  {
    number: "031",
    name: "Sorcerat",
    description:
      "Ao evoluir, um Mouselet macho se transforma em Sorcerat, um aprendiz de feiticeiro com domínio sobre a água e as sombras. Ele carrega uma esfera mágica em sua cauda que serve como fonte de seu poder. Sorcerat é hábil na criação de ilusões e no controle de fluxos aquáticos, sempre buscando aprimorar suas técnicas. Mesmo como aprendiz, ele já exibe uma impressionante capacidade de usar seus feitiços para confundir e controlar seus adversários.",
    ref: "Um camundongo carismático, conhecido por encantar gerações em histórias mágicas e inesquecíveis.",
    tags: [],
    evolutions: [["030", "031", "032"]],
    habitat: ["campo", "floresta"],
    elements: ["crepuscular", "água"],
    weakness: "terra",
    weight: 15,
    height: 1,
  },
  {
    number: "032",
    name: "Enchantail",
    description:
      "Enchantail é um mestre feiticeiro que controla as forças da água e da escuridão com extrema destreza. A esfera em sua cauda carrega um imenso poder, sendo a chave de seu controle sobre as energias elementais. Enchantail é capaz de convocar tempestades e envolverse em sombras, tornando-se invisível para atacar seus inimigos. Sua sabedoria e seu domínio das artes mágicas o tornam um combatente implacável e um líder natural entre os Geekmons.",
    ref: "Um camundongo carismático, conhecido por encantar gerações em histórias mágicas e inesquecíveis.",
    tags: [],
    evolutions: [["030", "031", "032"]],
    habitat: ["campo", "floresta"],
    elements: ["crepuscular", "água"],
    weakness: "planta",
    weight: 45,
    height: 1.5,
  },
  {
    number: "033",
    name: "Faecharm",
    description:
      "Faecharm, a evolução de um Mouselet fêmea, se torna uma jovem fada com domínio sobre o elemento fogo. A esfera em sua cauda é a fonte de sua magia, amplificando suas habilidades encantatórias e permitindo-lhe controlar as chamas com precisão. Faecharm emite uma luz calorosa que conforta seus aliados e intimida seus inimigos. Embora possua uma aparência delicada, Faecharm é uma das manipuladoras mais promissoras de seu tipo, combinando graciosidade e poder destrutivo.",
    ref: "Um camundongo carismático, conhecido por encantar gerações em histórias mágicas e inesquecíveis.",
    tags: [],
    evolutions: [["030", "033", "034"]],
    habitat: ["campo", "floresta"],
    elements: ["místico", "fogo"],
    weakness: "crepuscular",
    weight: 12,
    height: 0.9,
  },
  {
    number: "034",
    name: "Blazesprite",
    description:
      "Blazesprite é uma poderosa fada que domina as artes do fogo com maestria. A esfera em sua cauda concentra uma quantidade imensa de energia elemental, capaz de gerar chamas intensas e encantos poderosos. Blazesprite é temida por sua habilidade de incinerar oponentes com uma única explosão de fogo, enquanto mantém uma aparência graciosa e encantadora. Seu equilíbrio entre delicadeza e poder avassalador a torna uma força inigualável no campo de batalha.",
    ref: "Um camundongo carismático, conhecido por encantar gerações em histórias mágicas e inesquecíveis.",
    tags: [],
    evolutions: [["030", "033", "034"]],
    habitat: ["campo", "floresta"],
    elements: ["místico", "fogo"],
    weakness: "crepuscular",
    weight: 40,
    height: 1.3,
  },

  {
    number: "074",
    name: "Murpia",
    description:
      "Murpia vive no coração das florestas, onde atua como guardiã sagrada da fauna e da flora. Seu corpo emana uma energia vital que fortalece a vida ao seu redor, permitindo que as plantas floresçam e os seres prosperem. Quando Murpia chega ao fim de sua vida, uma flor de rara beleza desabrocha no local de sua queda e de seu interior nasce uma nova Murpia, reiniciando o ciclo de equilíbrio e prosperidade. Esse fenômeno faz de Murpia o coração pulsante da floresta, simbolizando o eterno ciclo da vida.",
    ref: "Uma criatura com a majestade de um leão e a sabedoria de uma águia. Mascote da editora por trás do universo Geekmon.",
    tags: ["legendary"],
    evolutions: [["074"]],
    habitat: ["floresta"],
    elements: ["planta", "fera"],
    weakness: "fogo",
    weight: 150,
    height: 2,
  },

  {
    number: "112",
    name: "Overwings",
    description:
      "Overwings é o Crescimento Desenfreado de Murpia, onde sua forma pacífica se transforma em uma criatura feroz. Revestida por uma aura ardente, Overwings deixa de ser apenas uma guardiã e assume o papel de um símbolo de destruição e purificação. O bater de suas asas é capaz de provocar tempestades de fogo, enquanto seu rugido ressoa pelo horizonte. Diz-se que a aparição de Overwings marca o momento em que a natureza decide limpar os excessos e reiniciar o ciclo da vida.",
    ref: "Uma criatura com a majestade de um leão e a sabedoria de uma águia. Mascote da editora por trás do universo Geekmon.",
    tags: ["over"],
    evolutions: [["074", "112"]],
    habitat: ["floresta"],
    elements: ["místico", "fogo"],
    weakness: "terra",
    weight: 250,
    height: 3.5,
  },
];

export const GeekmonMap = Object.fromEntries(geekmons.map((x) => [x.number, x]));
