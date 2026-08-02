// data/extraPracticeElectrical.js
//
// NEW, ADDITIONAL question bank (electrical theory, calculations, and
// general electrical/site knowledge). This file is separate from every
// existing question file in the project (questions.js, officialEcsHse.js,
// officialEcsFess.js, officialEcsNetwork.js, officialEcsElectricalSafety.js,
// am2Data.js) — none of those files are modified. Original practice
// content, clearly marked official: false.

export const EXTRA_PRACTICE_ELECTRICAL_INFO = {
  "official": false,
  "title": "Extra Practice: Electrical Theory, Calculations & Site Knowledge",
  "officialQuestionBankPublic": false,
  "disclaimer": "These are additional, original practice questions covering electrical theory, calculations and general trade knowledge. They are supplementary study material only, not official ECS/EAL exam questions, and do not replace the existing question banks already in this app."
};

export const extraPracticeElectricalBank = [
  {
    "text": "Under the UK harmonised cable colour code, what colour identifies the line (single phase, l) conductor?",
    "options": [
      "Green and yellow",
      "Grey",
      "Brown",
      "Blue"
    ],
    "correct": "Brown",
    "explanation": "Since the 2004 harmonisation, the line (single phase, l) conductor is identified by the colour brown.",
    "topic": "Cable colours"
  },
  {
    "text": "Under the UK harmonised cable colour code, what colour identifies the neutral conductor?",
    "options": [
      "Brown",
      "Grey",
      "Blue"
    ],
    "correct": "Blue",
    "explanation": "Since the 2004 harmonisation, the neutral conductor is identified by the colour blue.",
    "topic": "Cable colours"
  },
  {
    "text": "Under the UK harmonised cable colour code, what colour identifies the protective earth (cpc) conductor?",
    "options": [
      "Brown",
      "Grey",
      "Blue",
      "Green and yellow"
    ],
    "correct": "Green and yellow",
    "explanation": "Since the 2004 harmonisation, the protective earth (cpc) conductor is identified by the colour green and yellow.",
    "topic": "Cable colours"
  },
  {
    "text": "Under the UK harmonised cable colour code, what colour identifies the line 1 (three-phase, l1) conductor?",
    "options": [
      "Grey",
      "Green and yellow",
      "Brown",
      "Blue"
    ],
    "correct": "Brown",
    "explanation": "Since the 2004 harmonisation, the line 1 (three-phase, l1) conductor is identified by the colour brown.",
    "topic": "Cable colours"
  },
  {
    "text": "Under the UK harmonised cable colour code, what colour identifies the line 2 (three-phase, l2) conductor?",
    "options": [
      "Green and yellow",
      "Blue",
      "Black",
      "Brown"
    ],
    "correct": "Black",
    "explanation": "Since the 2004 harmonisation, the line 2 (three-phase, l2) conductor is identified by the colour black.",
    "topic": "Cable colours"
  },
  {
    "text": "Under the UK harmonised cable colour code, what colour identifies the line 3 (three-phase, l3) conductor?",
    "options": [
      "Blue",
      "Black",
      "Brown",
      "Grey"
    ],
    "correct": "Grey",
    "explanation": "Since the 2004 harmonisation, the line 3 (three-phase, l3) conductor is identified by the colour grey.",
    "topic": "Cable colours"
  },
  {
    "text": "How does BS 7671 define 'Extra-low voltage (ELV)'?",
    "options": [
      "Any voltage supplied from a battery",
      "Not exceeding 12V AC between conductors",
      "Not exceeding 50V AC (or 120V ripple-free DC) between conductors",
      "Exceeding 11,000V AC between conductors"
    ],
    "correct": "Not exceeding 50V AC (or 120V ripple-free DC) between conductors",
    "explanation": "BS 7671 defines Extra-low voltage (ELV) as: not exceeding 50v ac (or 120v ripple-free dc) between conductors.",
    "topic": "Voltage bands"
  },
  {
    "text": "How does BS 7671 define 'Low voltage (LV)'?",
    "options": [
      "Exceeding 11,000V AC between conductors",
      "Any voltage supplied from a battery",
      "Not exceeding 12V AC between conductors",
      "Exceeding ELV but not exceeding 1000V AC between conductors"
    ],
    "correct": "Exceeding ELV but not exceeding 1000V AC between conductors",
    "explanation": "BS 7671 defines Low voltage (LV) as: exceeding elv but not exceeding 1000v ac between conductors.",
    "topic": "Voltage bands"
  },
  {
    "text": "How does BS 7671 define 'High voltage (HV)'?",
    "options": [
      "Exceeding 1000V AC between conductors",
      "Not exceeding 12V AC between conductors",
      "Any voltage supplied from a battery",
      "Exceeding 11,000V AC between conductors"
    ],
    "correct": "Exceeding 1000V AC between conductors",
    "explanation": "BS 7671 defines High voltage (HV) as: exceeding 1000v ac between conductors.",
    "topic": "Voltage bands"
  },
  {
    "text": "What is the standard UK domestic mains supply voltage (nominal, single phase)?",
    "options": [
      "24V",
      "230V",
      "400V",
      "110V"
    ],
    "correct": "230V",
    "explanation": "UK domestic single-phase mains is nominally 230V AC at 50Hz (with a permitted tolerance of +10%/-6%).",
    "topic": "Voltage bands"
  },
  {
    "text": "What is the nominal line-to-line voltage of a standard UK three-phase supply?",
    "options": [
      "230V",
      "110V",
      "690V",
      "400V"
    ],
    "correct": "400V",
    "explanation": "A standard UK three-phase supply is 400V line-to-line, derived from 230V line-to-neutral.",
    "topic": "Voltage bands"
  },
  {
    "text": "What voltage is commonly used for site transformers/tools to reduce shock risk (centre-tapped to earth)?",
    "options": [
      "230V",
      "12V",
      "110V",
      "400V"
    ],
    "correct": "110V",
    "explanation": "110V centre-tapped supplies (55V to earth) are widely used on construction sites to reduce the risk and severity of electric shock.",
    "topic": "Voltage bands"
  },
  {
    "text": "What is the typical extra-low voltage limit often used for tools in very restrictive/damp locations?",
    "options": [
      "50V",
      "230V",
      "110V",
      "25V or less"
    ],
    "correct": "25V or less",
    "explanation": "In particularly high-risk locations (e.g. inside metal tanks), even lower voltages such as 25V may be specified to further reduce shock risk.",
    "topic": "Voltage bands"
  },
  {
    "text": "Which earthing system is described as: 'Separate neutral and protective earth conductors throughout, earth derived from the supply cable sheath/armour'?",
    "options": [
      "TN-S",
      "TN-C-S (PME)",
      "TT",
      "TN-C"
    ],
    "correct": "TN-S",
    "explanation": "TN-S is the earthing arrangement where separate neutral and protective earth conductors throughout, earth derived from the supply cable sheath/armour.",
    "topic": "Earthing systems"
  },
  {
    "text": "Which earthing system is described as: 'Combined neutral and earth conductor (PEN) in the supply, split into separate N and E at the consumer's installation'?",
    "options": [
      "TN-C-S (PME)",
      "TT",
      "TN-C",
      "TN-S"
    ],
    "correct": "TN-C-S (PME)",
    "explanation": "TN-C-S (PME) is the earthing arrangement where combined neutral and earth conductor (pen) in the supply, split into separate n and e at the consumer's installation.",
    "topic": "Earthing systems"
  },
  {
    "text": "Which earthing system is described as: 'No earth provided by the supplier; the installation relies on its own earth electrode'?",
    "options": [
      "TT",
      "TN-C",
      "TN-C-S (PME)",
      "TN-S"
    ],
    "correct": "TT",
    "explanation": "TT is the earthing arrangement where no earth provided by the supplier; the installation relies on its own earth electrode.",
    "topic": "Earthing systems"
  },
  {
    "text": "Which earthing system is described as: 'A single combined neutral-and-earth (PEN) conductor is used throughout, including within the installation'?",
    "options": [
      "TN-S",
      "TT",
      "TN-C-S (PME)",
      "TN-C"
    ],
    "correct": "TN-C",
    "explanation": "TN-C is the earthing arrangement where a single combined neutral-and-earth (pen) conductor is used throughout, including within the installation.",
    "topic": "Earthing systems"
  },
  {
    "text": "Which earthing system is described as: 'The supply has no direct connection to earth, or is earthed through a high impedance'?",
    "options": [
      "TN-C-S (PME)",
      "TT",
      "IT",
      "TN-S"
    ],
    "correct": "IT",
    "explanation": "IT is the earthing arrangement where the supply has no direct connection to earth, or is earthed through a high impedance.",
    "topic": "Earthing systems"
  },
  {
    "text": "In a TT earthing system, what device is normally essential for automatic disconnection of supply?",
    "options": [
      "A capacitor bank",
      "An RCD",
      "A time switch",
      "A diverter switch"
    ],
    "correct": "An RCD",
    "explanation": "Because earth fault loop impedance is typically too high with an installation-only earth electrode, an RCD is normally required in a TT system to achieve disconnection times.",
    "topic": "Earthing systems"
  },
  {
    "text": "In BS 7671 bathroom zoning, what does Zone 0 refer to?",
    "options": [
      "Inside the bath or shower tub itself",
      "Above the bath/shower up to 2.25m from the floor, directly above zone 0",
      "0.6m horizontally beyond zone 1, and up to 2.25m in height"
    ],
    "correct": "Inside the bath or shower tub itself",
    "explanation": "Zone 0 is defined as: inside the bath or shower tub itself.",
    "topic": "Special locations"
  },
  {
    "text": "In BS 7671 bathroom zoning, what does Zone 1 refer to?",
    "options": [
      "Inside the bath or shower tub itself",
      "0.6m horizontally beyond zone 1, and up to 2.25m in height",
      "Above the bath/shower up to 2.25m from the floor, directly above zone 0"
    ],
    "correct": "Above the bath/shower up to 2.25m from the floor, directly above zone 0",
    "explanation": "Zone 1 is defined as: above the bath/shower up to 2.25m from the floor, directly above zone 0.",
    "topic": "Special locations"
  },
  {
    "text": "In BS 7671 bathroom zoning, what does Zone 2 refer to?",
    "options": [
      "Above the bath/shower up to 2.25m from the floor, directly above zone 0",
      "Inside the bath or shower tub itself",
      "0.6m horizontally beyond zone 1, and up to 2.25m in height"
    ],
    "correct": "0.6m horizontally beyond zone 1, and up to 2.25m in height",
    "explanation": "Zone 2 is defined as: 0.6m horizontally beyond zone 1, and up to 2.25m in height.",
    "topic": "Special locations"
  },
  {
    "text": "What is the minimum IP rating typically required for electrical equipment in bathroom Zone 1?",
    "options": [
      "IP20",
      "IPX4",
      "IPX0",
      "IPX1"
    ],
    "correct": "IPX4",
    "explanation": "Zone 1 generally requires equipment rated at least IPX4 (protected against splashing water), unless local supplementary conditions apply.",
    "topic": "Special locations"
  },
  {
    "text": "Which bathroom zone has the strictest (most protected) electrical equipment requirements?",
    "options": [
      "Zone 0",
      "Outside the zones",
      "Zone 2",
      "Zone 1"
    ],
    "correct": "Zone 0",
    "explanation": "Zone 0 (inside the bath/shower tub) has the most severe restrictions, only permitting SELV equipment at very low voltage, suitably IP-rated.",
    "topic": "Special locations"
  },
  {
    "text": "In an IP rating, what does the first digit '0' indicate about solid object protection?",
    "options": [
      "No protection",
      "Dust protected",
      "Protected against solid objects greater than 1mm",
      "Protected against solid objects greater than 12.5mm (e.g. fingers)"
    ],
    "correct": "No protection",
    "explanation": "IP first-digit '0' means: no protection.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the first digit '2' indicate about solid object protection?",
    "options": [
      "Protected against solid objects greater than 12.5mm (e.g. fingers)",
      "No protection",
      "Protected against solid objects greater than 1mm",
      "Dust protected"
    ],
    "correct": "Protected against solid objects greater than 12.5mm (e.g. fingers)",
    "explanation": "IP first-digit '2' means: protected against solid objects greater than 12.5mm (e.g. fingers).",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the first digit '4' indicate about solid object protection?",
    "options": [
      "Protected against solid objects greater than 12.5mm (e.g. fingers)",
      "Protected against solid objects greater than 1mm",
      "Dust protected",
      "No protection"
    ],
    "correct": "Protected against solid objects greater than 1mm",
    "explanation": "IP first-digit '4' means: protected against solid objects greater than 1mm.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the first digit '5' indicate about solid object protection?",
    "options": [
      "Dust protected",
      "Protected against solid objects greater than 1mm",
      "Protected against solid objects greater than 12.5mm (e.g. fingers)",
      "No protection"
    ],
    "correct": "Dust protected",
    "explanation": "IP first-digit '5' means: dust protected.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the first digit '6' indicate about solid object protection?",
    "options": [
      "Dust tight",
      "No protection",
      "Protected against solid objects greater than 12.5mm (e.g. fingers)",
      "Protected against solid objects greater than 1mm"
    ],
    "correct": "Dust tight",
    "explanation": "IP first-digit '6' means: dust tight.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the second digit '0' indicate about water protection?",
    "options": [
      "Protected against vertically falling drops of water",
      "Protected against low-pressure water jets",
      "No protection against water",
      "Protected against splashing water from any direction"
    ],
    "correct": "No protection against water",
    "explanation": "IP second-digit '0' means: no protection against water.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the second digit '1' indicate about water protection?",
    "options": [
      "No protection against water",
      "Protected against splashing water from any direction",
      "Protected against vertically falling drops of water",
      "Protected against low-pressure water jets"
    ],
    "correct": "Protected against vertically falling drops of water",
    "explanation": "IP second-digit '1' means: protected against vertically falling drops of water.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the second digit '4' indicate about water protection?",
    "options": [
      "No protection against water",
      "Protected against vertically falling drops of water",
      "Protected against low-pressure water jets",
      "Protected against splashing water from any direction"
    ],
    "correct": "Protected against splashing water from any direction",
    "explanation": "IP second-digit '4' means: protected against splashing water from any direction.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the second digit '5' indicate about water protection?",
    "options": [
      "No protection against water",
      "Protected against low-pressure water jets",
      "Protected against vertically falling drops of water",
      "Protected against splashing water from any direction"
    ],
    "correct": "Protected against low-pressure water jets",
    "explanation": "IP second-digit '5' means: protected against low-pressure water jets.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the second digit '7' indicate about water protection?",
    "options": [
      "Protected against temporary immersion in water",
      "Protected against vertically falling drops of water",
      "No protection against water",
      "Protected against splashing water from any direction"
    ],
    "correct": "Protected against temporary immersion in water",
    "explanation": "IP second-digit '7' means: protected against temporary immersion in water.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating, what does the second digit '8' indicate about water protection?",
    "options": [
      "No protection against water",
      "Protected against continuous immersion in water",
      "Protected against splashing water from any direction",
      "Protected against vertically falling drops of water"
    ],
    "correct": "Protected against continuous immersion in water",
    "explanation": "IP second-digit '8' means: protected against continuous immersion in water.",
    "topic": "IP ratings"
  },
  {
    "text": "What does the overall code 'IP' stand for on equipment enclosure ratings?",
    "options": [
      "Isolated Power",
      "Internal Protection",
      "Insulation Piercing",
      "Ingress Protection"
    ],
    "correct": "Ingress Protection",
    "explanation": "IP stands for Ingress Protection, a standard (IEC 60529) rating for how well an enclosure resists solids and liquids.",
    "topic": "IP ratings"
  },
  {
    "text": "What is the typical protective device rating for a Standard ring final circuit (sockets, 2.5mm² T&E)?",
    "options": [
      "6A",
      "32A",
      "16A",
      "40A or 45A"
    ],
    "correct": "32A",
    "explanation": "A standard ring final circuit (sockets, 2.5mm² t&e) is typically protected by a 32A device, though the exact design should always be confirmed by calculation.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the typical protective device rating for a Radial socket circuit (4mm² T&E)?",
    "options": [
      "16A",
      "32A",
      "6A",
      "40A or 45A"
    ],
    "correct": "32A",
    "explanation": "A radial socket circuit (4mm² t&e) is typically protected by a 32A device, though the exact design should always be confirmed by calculation.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the typical protective device rating for a Lighting circuit (1mm² or 1.5mm² T&E)?",
    "options": [
      "40A or 45A",
      "32A",
      "6A"
    ],
    "correct": "6A",
    "explanation": "A lighting circuit (1mm² or 1.5mm² t&e) is typically protected by a 6A device, though the exact design should always be confirmed by calculation.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the typical protective device rating for a Electric shower (typical 8-9.5kW)?",
    "options": [
      "6A",
      "32A",
      "40A or 45A"
    ],
    "correct": "40A or 45A",
    "explanation": "A electric shower (typical 8-9.5kw) is typically protected by a 40A or 45A device, though the exact design should always be confirmed by calculation.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the typical protective device rating for a Immersion heater?",
    "options": [
      "32A",
      "16A",
      "6A"
    ],
    "correct": "16A",
    "explanation": "A immersion heater is typically protected by a 16A device, though the exact design should always be confirmed by calculation.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the typical protective device rating for a Cooker circuit (typical domestic cooker)?",
    "options": [
      "40A or 45A",
      "16A",
      "32A",
      "6A"
    ],
    "correct": "32A",
    "explanation": "A cooker circuit (typical domestic cooker) is typically protected by a 32A device, though the exact design should always be confirmed by calculation.",
    "topic": "Circuit design"
  },
  {
    "text": "What does a BS 1363 plug's fuse rating of 3A typically protect?",
    "options": [
      "Low-power appliances such as lamps and small electronics",
      "Immersion heaters",
      "Electric showers",
      "Electric cookers"
    ],
    "correct": "Low-power appliances such as lamps and small electronics",
    "explanation": "A 3A fuse in a 13A plug top is used for lower-power appliances; 13A fuses are used for higher-power items like kettles and heaters.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the standard current rating of a UK domestic 13A socket outlet fuse (plug)?",
    "options": [
      "45A",
      "13A",
      "30A",
      "5A"
    ],
    "correct": "13A",
    "explanation": "BS 1363 plugs are commonly fitted with either a 3A or 13A cartridge fuse depending on the appliance's load.",
    "topic": "Circuit design"
  },
  {
    "text": "What is a Multimeter primarily used for?",
    "options": [
      "Measures voltage, current and resistance",
      "Checks the electrical safety of portable appliances",
      "Measures current flowing in a conductor without breaking the circuit",
      "Measures the impedance of the earth fault loop path to confirm disconnection times"
    ],
    "correct": "Measures voltage, current and resistance",
    "explanation": "A multimeter is used to: measures voltage, current and resistance.",
    "topic": "Test instruments"
  },
  {
    "text": "What is a Insulation resistance tester (megger) primarily used for?",
    "options": [
      "Checks that a residual current device trips within the required time and current",
      "Measures current flowing in a conductor without breaking the circuit",
      "Measures voltage, current and resistance",
      "Measures the resistance of insulation between conductors and earth"
    ],
    "correct": "Measures the resistance of insulation between conductors and earth",
    "explanation": "A insulation resistance tester (megger) is used to: measures the resistance of insulation between conductors and earth.",
    "topic": "Test instruments"
  },
  {
    "text": "What is a RCD tester primarily used for?",
    "options": [
      "Measures the resistance of insulation between conductors and earth",
      "Confirms whether a circuit is live or dead, as part of safe isolation",
      "Checks that a residual current device trips within the required time and current",
      "Confirms a continuous, low-resistance path exists in a conductor"
    ],
    "correct": "Checks that a residual current device trips within the required time and current",
    "explanation": "A rcd tester is used to: checks that a residual current device trips within the required time and current.",
    "topic": "Test instruments"
  },
  {
    "text": "What is a Earth fault loop impedance tester primarily used for?",
    "options": [
      "Measures voltage, current and resistance",
      "Confirms whether a circuit is live or dead, as part of safe isolation",
      "Measures the impedance of the earth fault loop path to confirm disconnection times",
      "Measures current flowing in a conductor without breaking the circuit"
    ],
    "correct": "Measures the impedance of the earth fault loop path to confirm disconnection times",
    "explanation": "A earth fault loop impedance tester is used to: measures the impedance of the earth fault loop path to confirm disconnection times.",
    "topic": "Test instruments"
  },
  {
    "text": "What is a PAT tester (Portable Appliance Tester) primarily used for?",
    "options": [
      "Checks the electrical safety of portable appliances",
      "Checks that a residual current device trips within the required time and current",
      "Measures voltage, current and resistance",
      "Confirms whether a circuit is live or dead, as part of safe isolation"
    ],
    "correct": "Checks the electrical safety of portable appliances",
    "explanation": "A pat tester (portable appliance tester) is used to: checks the electrical safety of portable appliances.",
    "topic": "Test instruments"
  },
  {
    "text": "What is a Continuity tester primarily used for?",
    "options": [
      "Checks the electrical safety of portable appliances",
      "Measures the resistance of insulation between conductors and earth",
      "Confirms a continuous, low-resistance path exists in a conductor",
      "Confirms whether a circuit is live or dead, as part of safe isolation"
    ],
    "correct": "Confirms a continuous, low-resistance path exists in a conductor",
    "explanation": "A continuity tester is used to: confirms a continuous, low-resistance path exists in a conductor.",
    "topic": "Test instruments"
  },
  {
    "text": "What is a Clamp meter primarily used for?",
    "options": [
      "Measures the impedance of the earth fault loop path to confirm disconnection times",
      "Confirms whether a circuit is live or dead, as part of safe isolation",
      "Measures the resistance of insulation between conductors and earth",
      "Measures current flowing in a conductor without breaking the circuit"
    ],
    "correct": "Measures current flowing in a conductor without breaking the circuit",
    "explanation": "A clamp meter is used to: measures current flowing in a conductor without breaking the circuit.",
    "topic": "Test instruments"
  },
  {
    "text": "What is a Voltage indicator (proving unit / two-pole tester) primarily used for?",
    "options": [
      "Checks that a residual current device trips within the required time and current",
      "Confirms whether a circuit is live or dead, as part of safe isolation",
      "Measures the impedance of the earth fault loop path to confirm disconnection times",
      "Confirms a continuous, low-resistance path exists in a conductor"
    ],
    "correct": "Confirms whether a circuit is live or dead, as part of safe isolation",
    "explanation": "A voltage indicator (proving unit / two-pole tester) is used to: confirms whether a circuit is live or dead, as part of safe isolation.",
    "topic": "Test instruments"
  },
  {
    "text": "What test voltage is typically applied when carrying out an insulation resistance test on a 230V/400V circuit?",
    "options": [
      "12V DC",
      "50V DC",
      "1000V AC",
      "500V DC"
    ],
    "correct": "500V DC",
    "explanation": "BS 7671 specifies a test voltage of 500V DC for insulation resistance testing on standard low-voltage circuits, with a minimum acceptable value of 1MΩ.",
    "topic": "Test instruments"
  },
  {
    "text": "What is the typical minimum acceptable insulation resistance value for a new circuit under BS 7671?",
    "options": [
      "1 ohm",
      "10 megohms",
      "1 megohm (1MΩ)",
      "1 kilohm"
    ],
    "correct": "1 megohm (1MΩ)",
    "explanation": "BS 7671 specifies a minimum insulation resistance of 1MΩ for circuits up to 500V, tested at 500V DC.",
    "topic": "Test instruments"
  },
  {
    "text": "Before using a voltage indicator to prove a circuit dead, what should always be done?",
    "options": [
      "Only test it once a year",
      "Only use it on DC circuits",
      "Prove the indicator works on a known live source (proving unit) before and after use",
      "Assume it is working correctly"
    ],
    "correct": "Prove the indicator works on a known live source (proving unit) before and after use",
    "explanation": "A voltage indicator must be proved on a known source before AND after testing a circuit dead, to confirm it is functioning correctly throughout — a core step of safe isolation.",
    "topic": "Safe isolation"
  },
  {
    "text": "What is the purpose of 'safe isolation' before working on an electrical circuit?",
    "options": [
      "To avoid using test equipment",
      "To disconnect the circuit from all sources of supply and prove it dead before starting work",
      "To reduce the size of the job",
      "To speed up the job"
    ],
    "correct": "To disconnect the circuit from all sources of supply and prove it dead before starting work",
    "explanation": "Safe isolation ensures a circuit is disconnected from every source of supply, locked off, and proved dead with a tested voltage indicator before work begins.",
    "topic": "Safe isolation"
  },
  {
    "text": "Why should a lock and warning label be applied at the point of isolation?",
    "options": [
      "To speed up fault finding",
      "To prevent the supply being reconnected accidentally or by another person while work is in progress",
      "To make the panel look tidy",
      "Because it is optional good practice with no real benefit"
    ],
    "correct": "To prevent the supply being reconnected accidentally or by another person while work is in progress",
    "explanation": "Locking off and labelling the isolation point warns others and physically prevents the supply being switched back on while work is ongoing.",
    "topic": "Safe isolation"
  },
  {
    "text": "Who should normally retain the key/control of a lock used during safe isolation?",
    "options": [
      "The client",
      "No one; it should be left in the lock",
      "Any nearby colleague",
      "The person carrying out the work"
    ],
    "correct": "The person carrying out the work",
    "explanation": "The individual carrying out the work should retain sole control of the isolation lock, so the supply cannot be restored without their knowledge.",
    "topic": "Safe isolation"
  },
  {
    "text": "What is the main advantage of a ring final circuit over a radial circuit for sockets?",
    "options": [
      "It uses less cable overall in every situation",
      "It requires no earth conductor",
      "It cannot be protected by an RCD",
      "It can supply a larger floor area/more socket outlets on a smaller cable csa, sharing the load two ways"
    ],
    "correct": "It can supply a larger floor area/more socket outlets on a smaller cable csa, sharing the load two ways",
    "explanation": "In a ring final circuit, current can flow to a load via two paths, allowing a comparatively smaller cable to serve a larger area than an equivalent radial circuit.",
    "topic": "Circuit design"
  },
  {
    "text": "What is a 'radial circuit'?",
    "options": [
      "A circuit that forms a closed loop back to the consumer unit",
      "A circuit with no protective device",
      "A three-phase circuit only",
      "A circuit that starts at the consumer unit and runs to the last point in a single, unbroken run without returning"
    ],
    "correct": "A circuit that starts at the consumer unit and runs to the last point in a single, unbroken run without returning",
    "explanation": "A radial circuit runs from the consumer unit out to its furthest point without looping back, unlike a ring final circuit.",
    "topic": "Circuit design"
  },
  {
    "text": "In a lighting circuit, what does the term 'loop-in' refer to?",
    "options": [
      "A wiring method where line, neutral and switch wires are looped at the ceiling rose",
      "An earthing method",
      "A type of fault",
      "A test procedure"
    ],
    "correct": "A wiring method where line, neutral and switch wires are looped at the ceiling rose",
    "explanation": "Loop-in wiring connects line and neutral conductors at each ceiling rose, with a switch wire looped down to the light switch, avoiding joints elsewhere.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the purpose of main protective bonding conductors?",
    "options": [
      "To provide a spare earth for future extensions",
      "To connect extraneous-conductive-parts (e.g. gas/water pipes) to the main earthing terminal, reducing shock risk during a fault",
      "To reduce the voltage of the supply",
      "To supply power to metal pipework"
    ],
    "correct": "To connect extraneous-conductive-parts (e.g. gas/water pipes) to the main earthing terminal, reducing shock risk during a fault",
    "explanation": "Main bonding connects incoming services (gas, water, oil etc.) to the main earthing terminal so all such parts are at, or close to, the same potential during a fault.",
    "topic": "Bonding & earthing"
  },
  {
    "text": "What is the purpose of supplementary bonding?",
    "options": [
      "To increase circuit current rating",
      "To further reduce touch voltage between simultaneously accessible exposed- and extraneous-conductive-parts in higher-risk locations",
      "To reduce cable size requirements",
      "To replace the need for an RCD"
    ],
    "correct": "To further reduce touch voltage between simultaneously accessible exposed- and extraneous-conductive-parts in higher-risk locations",
    "explanation": "Supplementary bonding provides an additional local connection between conductive parts to minimise touch voltage in higher-risk areas such as bathrooms.",
    "topic": "Bonding & earthing"
  },
  {
    "text": "What is a 'main earthing terminal' (MET)?",
    "options": [
      "The point where the earthing conductor, bonding conductors and circuit protective conductors are connected together",
      "The incoming supply fuse",
      "The neutral bar in the consumer unit",
      "A test point only used by the DNO"
    ],
    "correct": "The point where the earthing conductor, bonding conductors and circuit protective conductors are connected together",
    "explanation": "The main earthing terminal (MET) is the central point in an installation where the earthing conductor, main bonding conductors and circuit protective conductors all connect.",
    "topic": "Bonding & earthing"
  },
  {
    "text": "What is T&E (twin and earth) cable typically used for?",
    "options": [
      "Circuits that must keep operating during a fire, e.g. fire alarms, emergency lighting",
      "Connecting portable appliances or equipment that may move",
      "General domestic wiring for lighting and power circuits",
      "Installations needing flexibility to change or add circuits, often in commercial settings"
    ],
    "correct": "General domestic wiring for lighting and power circuits",
    "explanation": "T&E (twin and earth) is typically chosen for: general domestic wiring for lighting and power circuits.",
    "topic": "Cable types"
  },
  {
    "text": "What is SWA (steel wire armoured) cable typically used for?",
    "options": [
      "Circuits that must keep operating during a fire, e.g. fire alarms, emergency lighting",
      "Installations needing flexibility to change or add circuits, often in commercial settings",
      "Underground or exposed runs needing mechanical protection",
      "General domestic wiring for lighting and power circuits"
    ],
    "correct": "Underground or exposed runs needing mechanical protection",
    "explanation": "SWA (steel wire armoured) is typically chosen for: underground or exposed runs needing mechanical protection.",
    "topic": "Cable types"
  },
  {
    "text": "What is FP200 (fire-rated cable) cable typically used for?",
    "options": [
      "Connecting portable appliances or equipment that may move",
      "General domestic wiring for lighting and power circuits",
      "Installations needing flexibility to change or add circuits, often in commercial settings",
      "Circuits that must keep operating during a fire, e.g. fire alarms, emergency lighting"
    ],
    "correct": "Circuits that must keep operating during a fire, e.g. fire alarms, emergency lighting",
    "explanation": "FP200 (fire-rated cable) is typically chosen for: circuits that must keep operating during a fire, e.g. fire alarms, emergency lighting.",
    "topic": "Cable types"
  },
  {
    "text": "What is Singles (in conduit/trunking) cable typically used for?",
    "options": [
      "General domestic wiring for lighting and power circuits",
      "Installations needing flexibility to change or add circuits, often in commercial settings",
      "Circuits that must keep operating during a fire, e.g. fire alarms, emergency lighting",
      "Underground or exposed runs needing mechanical protection"
    ],
    "correct": "Installations needing flexibility to change or add circuits, often in commercial settings",
    "explanation": "Singles (in conduit/trunking) is typically chosen for: installations needing flexibility to change or add circuits, often in commercial settings.",
    "topic": "Cable types"
  },
  {
    "text": "What is Flex (flexible cable/cord) cable typically used for?",
    "options": [
      "General domestic wiring for lighting and power circuits",
      "Circuits that must keep operating during a fire, e.g. fire alarms, emergency lighting",
      "Underground or exposed runs needing mechanical protection",
      "Connecting portable appliances or equipment that may move"
    ],
    "correct": "Connecting portable appliances or equipment that may move",
    "explanation": "Flex (flexible cable/cord) is typically chosen for: connecting portable appliances or equipment that may move.",
    "topic": "Cable types"
  },
  {
    "text": "What is the basic function of a step-down transformer?",
    "options": [
      "To store electrical energy",
      "To increase voltage",
      "To reduce voltage from a higher level to a lower level",
      "To convert AC to DC"
    ],
    "correct": "To reduce voltage from a higher level to a lower level",
    "explanation": "A step-down transformer has more turns on the primary winding than the secondary, reducing voltage (e.g. mains to 110V site supply).",
    "topic": "Motors & transformers"
  },
  {
    "text": "What is the basic function of a step-up transformer?",
    "options": [
      "To increase voltage from a lower level to a higher level",
      "To convert DC to AC",
      "To measure current",
      "To reduce voltage"
    ],
    "correct": "To increase voltage from a lower level to a higher level",
    "explanation": "A step-up transformer has more turns on the secondary winding than the primary, increasing the voltage.",
    "topic": "Motors & transformers"
  },
  {
    "text": "What is the purpose of a rectifier in a circuit?",
    "options": [
      "To convert alternating current (AC) into direct current (DC)",
      "To measure resistance",
      "To increase frequency",
      "To convert DC into AC"
    ],
    "correct": "To convert alternating current (AC) into direct current (DC)",
    "explanation": "A rectifier (using diodes) converts AC supply into DC, commonly used in power supplies and battery chargers.",
    "topic": "Motors & transformers"
  },
  {
    "text": "What does a capacitor store in a circuit?",
    "options": [
      "Heat energy",
      "Electrical charge (energy) in an electric field",
      "Magnetic energy only",
      "Sound energy"
    ],
    "correct": "Electrical charge (energy) in an electric field",
    "explanation": "A capacitor stores electrical energy in the form of an electric field between two conductive plates separated by a dielectric.",
    "topic": "Motors & transformers"
  },
  {
    "text": "What is the main safety reason for allowing time before touching a disconnected motor run capacitor?",
    "options": [
      "Capacitors are radioactive",
      "There is no risk once the supply is off",
      "Capacitors get physically hot",
      "Capacitors can retain a stored charge after the supply is removed, which can still give a shock"
    ],
    "correct": "Capacitors can retain a stored charge after the supply is removed, which can still give a shock",
    "explanation": "Capacitors can hold a dangerous stored charge even after isolation, so they should be safely discharged before being handled.",
    "topic": "Motors & transformers"
  },
  {
    "text": "Under BS 5839-1, what does Category M refer to?",
    "options": [
      "Automatic detection in escape routes and rooms opening onto them, to protect escape routes",
      "Automatic detection throughout the building, offering the highest level of life protection",
      "Manual system only — relies on manual call points, no automatic detection",
      "Automatic detection in escape routes plus specified higher-risk rooms"
    ],
    "correct": "Manual system only — relies on manual call points, no automatic detection",
    "explanation": "Category M is defined as: manual system only — relies on manual call points, no automatic detection.",
    "topic": "Fire alarm categories"
  },
  {
    "text": "Under BS 5839-1, what does Category L1 refer to?",
    "options": [
      "A system designed to satisfy a specific fire safety objective identified by risk assessment",
      "Manual system only — relies on manual call points, no automatic detection",
      "Automatic detection throughout the building, offering the highest level of life protection",
      "Automatic detection in escape routes plus specified higher-risk rooms"
    ],
    "correct": "Automatic detection throughout the building, offering the highest level of life protection",
    "explanation": "Category L1 is defined as: automatic detection throughout the building, offering the highest level of life protection.",
    "topic": "Fire alarm categories"
  },
  {
    "text": "Under BS 5839-1, what does Category L2 refer to?",
    "options": [
      "A system designed to satisfy a specific fire safety objective identified by risk assessment",
      "Automatic detection throughout, to give the earliest possible warning for property protection",
      "Automatic detection in escape routes and rooms opening onto them, to protect escape routes",
      "Automatic detection in escape routes plus specified higher-risk rooms"
    ],
    "correct": "Automatic detection in escape routes plus specified higher-risk rooms",
    "explanation": "Category L2 is defined as: automatic detection in escape routes plus specified higher-risk rooms.",
    "topic": "Fire alarm categories"
  },
  {
    "text": "Under BS 5839-1, what does Category L3 refer to?",
    "options": [
      "Manual system only — relies on manual call points, no automatic detection",
      "Automatic detection throughout the building, offering the highest level of life protection",
      "A system designed to satisfy a specific fire safety objective identified by risk assessment",
      "Automatic detection in escape routes and rooms opening onto them, to protect escape routes"
    ],
    "correct": "Automatic detection in escape routes and rooms opening onto them, to protect escape routes",
    "explanation": "Category L3 is defined as: automatic detection in escape routes and rooms opening onto them, to protect escape routes.",
    "topic": "Fire alarm categories"
  },
  {
    "text": "Under BS 5839-1, what does Category L5 refer to?",
    "options": [
      "A system designed to satisfy a specific fire safety objective identified by risk assessment",
      "Automatic detection in escape routes and rooms opening onto them, to protect escape routes",
      "Automatic detection throughout, to give the earliest possible warning for property protection",
      "Automatic detection in escape routes plus specified higher-risk rooms"
    ],
    "correct": "A system designed to satisfy a specific fire safety objective identified by risk assessment",
    "explanation": "Category L5 is defined as: a system designed to satisfy a specific fire safety objective identified by risk assessment.",
    "topic": "Fire alarm categories"
  },
  {
    "text": "Under BS 5839-1, what does Category P1 refer to?",
    "options": [
      "Automatic detection in escape routes plus specified higher-risk rooms",
      "Automatic detection throughout, to give the earliest possible warning for property protection",
      "Automatic detection throughout the building, offering the highest level of life protection",
      "Automatic detection in escape routes and rooms opening onto them, to protect escape routes"
    ],
    "correct": "Automatic detection throughout, to give the earliest possible warning for property protection",
    "explanation": "Category P1 is defined as: automatic detection throughout, to give the earliest possible warning for property protection.",
    "topic": "Fire alarm categories"
  },
  {
    "text": "What does a solar PV inverter primarily do?",
    "options": [
      "Converts AC to DC for battery charging only",
      "Stores electricity for later use",
      "Increases the voltage of the grid supply",
      "Converts DC electricity generated by the panels into AC electricity for use/export"
    ],
    "correct": "Converts DC electricity generated by the panels into AC electricity for use/export",
    "explanation": "Solar PV panels generate DC; an inverter converts this to AC so it can be used by standard appliances or exported to the grid.",
    "topic": "Renewables"
  },
  {
    "text": "What is a common reason PV systems require additional isolation/labelling requirements?",
    "options": [
      "PV systems never need isolators",
      "PV systems cannot be isolated at all",
      "PV panels can still generate a dangerous voltage whenever exposed to light, even when the AC side is isolated",
      "PV panels only generate power at night"
    ],
    "correct": "PV panels can still generate a dangerous voltage whenever exposed to light, even when the AC side is isolated",
    "explanation": "Because PV modules generate DC voltage as soon as they are exposed to light, the DC side remains live even when the AC supply is isolated, requiring specific precautions and labelling.",
    "topic": "Renewables"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 50 Ω carrying a current of 3 A?",
    "options": [
      "150",
      "300",
      "75",
      "53"
    ],
    "correct": "150",
    "explanation": "V = I × R = 3 × 50 = 150 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 40 Ω carrying a current of 1.5 A?",
    "options": [
      "60",
      "30",
      "120",
      "41.5"
    ],
    "correct": "60",
    "explanation": "V = I × R = 1.5 × 40 = 60 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 2 Ω carrying a current of 6 A?",
    "options": [
      "6",
      "24",
      "8",
      "12"
    ],
    "correct": "12",
    "explanation": "V = I × R = 6 × 2 = 12 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 10 Ω carrying a current of 20 A?",
    "options": [
      "100",
      "200",
      "30",
      "400"
    ],
    "correct": "200",
    "explanation": "V = I × R = 20 × 10 = 200 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 0.5 A?",
    "options": [
      "8.5",
      "2",
      "4",
      "8"
    ],
    "correct": "4",
    "explanation": "V = I × R = 0.5 × 8 = 4 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 30 Ω carrying a current of 2 A?",
    "options": [
      "32",
      "60",
      "120",
      "30"
    ],
    "correct": "60",
    "explanation": "V = I × R = 2 × 30 = 60 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 100 Ω carrying a current of 6 A?",
    "options": [
      "1200",
      "600",
      "106",
      "300"
    ],
    "correct": "600",
    "explanation": "V = I × R = 6 × 100 = 600 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 60 Ω carrying a current of 2 A?",
    "options": [
      "60",
      "240",
      "120",
      "62"
    ],
    "correct": "120",
    "explanation": "V = I × R = 2 × 60 = 120 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 5 Ω carrying a current of 0.5 A?",
    "options": [
      "5.5",
      "2.5",
      "5",
      "1.25"
    ],
    "correct": "2.5",
    "explanation": "V = I × R = 0.5 × 5 = 2.5 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 5 Ω carrying a current of 2.5 A?",
    "options": [
      "7.5",
      "6.25",
      "25",
      "12.5"
    ],
    "correct": "12.5",
    "explanation": "V = I × R = 2.5 × 5 = 12.5 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 15 Ω carrying a current of 20 A?",
    "options": [
      "600",
      "35",
      "300",
      "150"
    ],
    "correct": "300",
    "explanation": "V = I × R = 20 × 15 = 300 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 3 A?",
    "options": [
      "48",
      "12",
      "24",
      "11"
    ],
    "correct": "24",
    "explanation": "V = I × R = 3 × 8 = 24 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 6 Ω carrying a current of 10 A?",
    "options": [
      "60",
      "120",
      "30",
      "16"
    ],
    "correct": "60",
    "explanation": "V = I × R = 10 × 6 = 60 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 4 Ω carrying a current of 20 A?",
    "options": [
      "80",
      "160",
      "40",
      "24"
    ],
    "correct": "80",
    "explanation": "V = I × R = 20 × 4 = 80 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 60 Ω carrying a current of 10 A?",
    "options": [
      "70",
      "300",
      "600",
      "1200"
    ],
    "correct": "600",
    "explanation": "V = I × R = 10 × 60 = 600 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 8 A?",
    "options": [
      "128",
      "32",
      "16",
      "64"
    ],
    "correct": "64",
    "explanation": "V = I × R = 8 × 8 = 64 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 40 Ω carrying a current of 3 A?",
    "options": [
      "43",
      "120",
      "60",
      "240"
    ],
    "correct": "120",
    "explanation": "V = I × R = 3 × 40 = 120 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 100 Ω carrying a current of 4 A?",
    "options": [
      "104",
      "400",
      "800",
      "200"
    ],
    "correct": "400",
    "explanation": "V = I × R = 4 × 100 = 400 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 12 Ω carrying a current of 12 A?",
    "options": [
      "24",
      "72",
      "288",
      "144"
    ],
    "correct": "144",
    "explanation": "V = I × R = 12 × 12 = 144 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 12 Ω carrying a current of 3 A?",
    "options": [
      "72",
      "18",
      "15",
      "36"
    ],
    "correct": "36",
    "explanation": "V = I × R = 3 × 12 = 36 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 10 Ω carrying a current of 8 A?",
    "options": [
      "160",
      "40",
      "18",
      "80"
    ],
    "correct": "80",
    "explanation": "V = I × R = 8 × 10 = 80 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 6 A?",
    "options": [
      "48",
      "96",
      "14",
      "24"
    ],
    "correct": "48",
    "explanation": "V = I × R = 6 × 8 = 48 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 12 A?",
    "options": [
      "48",
      "192",
      "96",
      "20"
    ],
    "correct": "96",
    "explanation": "V = I × R = 12 × 8 = 96 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 12 Ω carrying a current of 10 A?",
    "options": [
      "120",
      "240",
      "22",
      "60"
    ],
    "correct": "120",
    "explanation": "V = I × R = 10 × 12 = 120 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 20 Ω carrying a current of 4 A?",
    "options": [
      "160",
      "24",
      "40",
      "80"
    ],
    "correct": "80",
    "explanation": "V = I × R = 4 × 20 = 80 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 12 Ω carrying a current of 2 A?",
    "options": [
      "24",
      "48",
      "14",
      "12"
    ],
    "correct": "24",
    "explanation": "V = I × R = 2 × 12 = 24 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 30 Ω carrying a current of 5 A?",
    "options": [
      "150",
      "300",
      "75",
      "35"
    ],
    "correct": "150",
    "explanation": "V = I × R = 5 × 30 = 150 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 100 Ω carrying a current of 15 A?",
    "options": [
      "115",
      "1500",
      "750",
      "3000"
    ],
    "correct": "1500",
    "explanation": "V = I × R = 15 × 100 = 1500 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 20 Ω carrying a current of 2.5 A?",
    "options": [
      "22.5",
      "100",
      "50",
      "25"
    ],
    "correct": "50",
    "explanation": "V = I × R = 2.5 × 20 = 50 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 10 A?",
    "options": [
      "160",
      "18",
      "80",
      "40"
    ],
    "correct": "80",
    "explanation": "V = I × R = 10 × 8 = 80 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 2 Ω carrying a current of 0.5 A?",
    "options": [
      "2.5",
      "1",
      "0.5",
      "2"
    ],
    "correct": "1",
    "explanation": "V = I × R = 0.5 × 2 = 1 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 12 Ω carrying a current of 5 A?",
    "options": [
      "60",
      "30",
      "17",
      "120"
    ],
    "correct": "60",
    "explanation": "V = I × R = 5 × 12 = 60 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 5 Ω carrying a current of 2 A?",
    "options": [
      "7",
      "20",
      "5",
      "10"
    ],
    "correct": "10",
    "explanation": "V = I × R = 2 × 5 = 10 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 40 Ω carrying a current of 15 A?",
    "options": [
      "55",
      "1200",
      "600",
      "300"
    ],
    "correct": "600",
    "explanation": "V = I × R = 15 × 40 = 600 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 5 Ω carrying a current of 5 A?",
    "options": [
      "25",
      "50",
      "12.5",
      "10"
    ],
    "correct": "25",
    "explanation": "V = I × R = 5 × 5 = 25 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 25 Ω carrying a current of 5 A?",
    "options": [
      "125",
      "250",
      "62.5",
      "30"
    ],
    "correct": "125",
    "explanation": "V = I × R = 5 × 25 = 125 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 5 A?",
    "options": [
      "40",
      "80",
      "13",
      "20"
    ],
    "correct": "40",
    "explanation": "V = I × R = 5 × 8 = 40 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 50 Ω carrying a current of 15 A?",
    "options": [
      "65",
      "750",
      "375",
      "1500"
    ],
    "correct": "750",
    "explanation": "V = I × R = 15 × 50 = 750 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 15 Ω carrying a current of 2.5 A?",
    "options": [
      "75",
      "18.75",
      "17.5",
      "37.5"
    ],
    "correct": "37.5",
    "explanation": "V = I × R = 2.5 × 15 = 37.5 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using Ohm's Law (V = I × R), what is the voltage across a resistor of 8 Ω carrying a current of 2 A?",
    "options": [
      "32",
      "16",
      "8",
      "10"
    ],
    "correct": "16",
    "explanation": "V = I × R = 2 × 8 = 16 V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 6 V and a current of 1 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "3",
      "6",
      "11",
      "12"
    ],
    "correct": "6",
    "explanation": "R = V ÷ I = 6 ÷ 1 = 6 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 50 V and a current of 5 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "15",
      "5",
      "20",
      "10"
    ],
    "correct": "10",
    "explanation": "R = V ÷ I = 50 ÷ 5 = 10 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 60 V and a current of 2 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "15",
      "30",
      "60",
      "35"
    ],
    "correct": "30",
    "explanation": "R = V ÷ I = 60 ÷ 2 = 30 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 20 V and a current of 1 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "40",
      "20",
      "10",
      "25"
    ],
    "correct": "20",
    "explanation": "R = V ÷ I = 20 ÷ 1 = 20 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 400 V and a current of 10 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "20",
      "40",
      "80",
      "45"
    ],
    "correct": "40",
    "explanation": "R = V ÷ I = 400 ÷ 10 = 40 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 24 V and a current of 2 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "6",
      "12",
      "24",
      "17"
    ],
    "correct": "12",
    "explanation": "R = V ÷ I = 24 ÷ 2 = 12 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 25 V and a current of 2.5 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "10",
      "15",
      "20",
      "5"
    ],
    "correct": "10",
    "explanation": "R = V ÷ I = 25 ÷ 2.5 = 10 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 10 V and a current of 0.5 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "20",
      "40",
      "25",
      "10"
    ],
    "correct": "20",
    "explanation": "R = V ÷ I = 10 ÷ 0.5 = 20 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 30 V and a current of 5 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "12",
      "3",
      "6",
      "11"
    ],
    "correct": "6",
    "explanation": "R = V ÷ I = 30 ÷ 5 = 6 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 100 V and a current of 2.5 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "20",
      "80",
      "45",
      "40"
    ],
    "correct": "40",
    "explanation": "R = V ÷ I = 100 ÷ 2.5 = 40 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 25 V and a current of 1 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "12.5",
      "30",
      "25",
      "50"
    ],
    "correct": "25",
    "explanation": "R = V ÷ I = 25 ÷ 1 = 25 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 37.5 V and a current of 2.5 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "15",
      "7.5",
      "20",
      "30"
    ],
    "correct": "15",
    "explanation": "R = V ÷ I = 37.5 ÷ 2.5 = 15 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 40 V and a current of 2 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "20",
      "25",
      "40",
      "10"
    ],
    "correct": "20",
    "explanation": "R = V ÷ I = 40 ÷ 2 = 20 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 50 V and a current of 10 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "10",
      "8",
      "2.5",
      "5"
    ],
    "correct": "5",
    "explanation": "R = V ÷ I = 50 ÷ 10 = 5 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 20 V and a current of 2 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "20",
      "15",
      "5",
      "10"
    ],
    "correct": "10",
    "explanation": "R = V ÷ I = 20 ÷ 2 = 10 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 30 V and a current of 10 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "8",
      "1.5",
      "3",
      "6"
    ],
    "correct": "3",
    "explanation": "R = V ÷ I = 30 ÷ 10 = 3 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 24 V and a current of 4 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "3",
      "11",
      "6",
      "12"
    ],
    "correct": "6",
    "explanation": "R = V ÷ I = 24 ÷ 4 = 6 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 25 V and a current of 5 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "5",
      "2.5",
      "12",
      "10"
    ],
    "correct": "5",
    "explanation": "R = V ÷ I = 25 ÷ 5 = 5 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 150 V and a current of 10 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "20",
      "15",
      "7.5",
      "30"
    ],
    "correct": "15",
    "explanation": "R = V ÷ I = 150 ÷ 10 = 15 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a supply voltage of 60 V and a current of 10 A flowing. Using Ohm's Law (R = V ÷ I), what is the resistance?",
    "options": [
      "12",
      "11",
      "6",
      "3"
    ],
    "correct": "6",
    "explanation": "R = V ÷ I = 60 ÷ 10 = 6 Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 13 A from a 50 V supply?",
    "options": [
      "325",
      "650",
      "1300",
      "700"
    ],
    "correct": "650",
    "explanation": "P = V × I = 50 × 13 = 650 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 13 A from a 12 V supply?",
    "options": [
      "78",
      "168",
      "156",
      "312"
    ],
    "correct": "156",
    "explanation": "P = V × I = 12 × 13 = 156 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 13 A from a 400 V supply?",
    "options": [
      "10400",
      "5600",
      "2600",
      "5200"
    ],
    "correct": "5200",
    "explanation": "P = V × I = 400 × 13 = 5200 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 10 A from a 50 V supply?",
    "options": [
      "500",
      "1000",
      "250",
      "550"
    ],
    "correct": "500",
    "explanation": "P = V × I = 50 × 10 = 500 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 10 A from a 12 V supply?",
    "options": [
      "132",
      "240",
      "120",
      "60"
    ],
    "correct": "120",
    "explanation": "P = V × I = 12 × 10 = 120 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 1 A from a 110 V supply?",
    "options": [
      "110",
      "220",
      "210",
      "55"
    ],
    "correct": "110",
    "explanation": "P = V × I = 110 × 1 = 110 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 2 A from a 400 V supply?",
    "options": [
      "400",
      "1600",
      "800",
      "1200"
    ],
    "correct": "800",
    "explanation": "P = V × I = 400 × 2 = 800 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 10 A from a 230 V supply?",
    "options": [
      "2300",
      "1150",
      "4600",
      "2530"
    ],
    "correct": "2300",
    "explanation": "P = V × I = 230 × 10 = 2300 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 5 A from a 50 V supply?",
    "options": [
      "125",
      "300",
      "250",
      "500"
    ],
    "correct": "250",
    "explanation": "P = V × I = 50 × 5 = 250 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 3 A from a 110 V supply?",
    "options": [
      "330",
      "660",
      "165",
      "440"
    ],
    "correct": "330",
    "explanation": "P = V × I = 110 × 3 = 330 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 0.5 A from a 50 V supply?",
    "options": [
      "12.5",
      "25",
      "50",
      "75"
    ],
    "correct": "25",
    "explanation": "P = V × I = 50 × 0.5 = 25 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 4 A from a 50 V supply?",
    "options": [
      "200",
      "250",
      "400",
      "100"
    ],
    "correct": "200",
    "explanation": "P = V × I = 50 × 4 = 200 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 0.5 A from a 230 V supply?",
    "options": [
      "345",
      "57.5",
      "115",
      "230"
    ],
    "correct": "115",
    "explanation": "P = V × I = 230 × 0.5 = 115 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 6 A from a 400 V supply?",
    "options": [
      "4800",
      "2400",
      "1200",
      "2800"
    ],
    "correct": "2400",
    "explanation": "P = V × I = 400 × 6 = 2400 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 8 A from a 400 V supply?",
    "options": [
      "1600",
      "3200",
      "6400",
      "3600"
    ],
    "correct": "3200",
    "explanation": "P = V × I = 400 × 8 = 3200 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 4 A from a 12 V supply?",
    "options": [
      "24",
      "48",
      "60",
      "96"
    ],
    "correct": "48",
    "explanation": "P = V × I = 12 × 4 = 48 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 8 A from a 50 V supply?",
    "options": [
      "400",
      "450",
      "800",
      "200"
    ],
    "correct": "400",
    "explanation": "P = V × I = 50 × 8 = 400 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 3 A from a 50 V supply?",
    "options": [
      "300",
      "200",
      "75",
      "150"
    ],
    "correct": "150",
    "explanation": "P = V × I = 50 × 3 = 150 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 1 A from a 50 V supply?",
    "options": [
      "25",
      "75",
      "50",
      "100"
    ],
    "correct": "50",
    "explanation": "P = V × I = 50 × 1 = 50 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 13 A from a 230 V supply?",
    "options": [
      "5980",
      "3220",
      "2990",
      "1495"
    ],
    "correct": "2990",
    "explanation": "P = V × I = 230 × 13 = 2990 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 2 A from a 50 V supply?",
    "options": [
      "200",
      "150",
      "100",
      "50"
    ],
    "correct": "100",
    "explanation": "P = V × I = 50 × 2 = 100 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 0.5 A from a 12 V supply?",
    "options": [
      "6",
      "18",
      "12",
      "3"
    ],
    "correct": "6",
    "explanation": "P = V × I = 12 × 0.5 = 6 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 5 A from a 110 V supply?",
    "options": [
      "275",
      "660",
      "550",
      "1100"
    ],
    "correct": "550",
    "explanation": "P = V × I = 110 × 5 = 550 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 6 A from a 12 V supply?",
    "options": [
      "144",
      "36",
      "72",
      "84"
    ],
    "correct": "72",
    "explanation": "P = V × I = 12 × 6 = 72 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 2 A from a 24 V supply?",
    "options": [
      "96",
      "72",
      "48",
      "24"
    ],
    "correct": "48",
    "explanation": "P = V × I = 24 × 2 = 48 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 13 A from a 110 V supply?",
    "options": [
      "1430",
      "1540",
      "715",
      "2860"
    ],
    "correct": "1430",
    "explanation": "P = V × I = 110 × 13 = 1430 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 8 A from a 110 V supply?",
    "options": [
      "880",
      "1760",
      "990",
      "440"
    ],
    "correct": "880",
    "explanation": "P = V × I = 110 × 8 = 880 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 1 A from a 230 V supply?",
    "options": [
      "115",
      "230",
      "255",
      "460"
    ],
    "correct": "230",
    "explanation": "P = V × I = 230 × 1 = 230 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 3 A from a 24 V supply?",
    "options": [
      "96",
      "72",
      "36",
      "144"
    ],
    "correct": "72",
    "explanation": "P = V × I = 24 × 3 = 72 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 0.5 A from a 24 V supply?",
    "options": [
      "12",
      "6",
      "24",
      "36"
    ],
    "correct": "12",
    "explanation": "P = V × I = 24 × 0.5 = 12 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 4 A from a 24 V supply?",
    "options": [
      "96",
      "192",
      "120",
      "48"
    ],
    "correct": "96",
    "explanation": "P = V × I = 24 × 4 = 96 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 3 A from a 12 V supply?",
    "options": [
      "72",
      "36",
      "48",
      "18"
    ],
    "correct": "36",
    "explanation": "P = V × I = 12 × 3 = 36 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 3 A from a 230 V supply?",
    "options": [
      "345",
      "690",
      "920",
      "1380"
    ],
    "correct": "690",
    "explanation": "P = V × I = 230 × 3 = 690 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 8 A from a 12 V supply?",
    "options": [
      "96",
      "192",
      "108",
      "48"
    ],
    "correct": "96",
    "explanation": "P = V × I = 12 × 8 = 96 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 8 A from a 230 V supply?",
    "options": [
      "3680",
      "920",
      "1840",
      "2070"
    ],
    "correct": "1840",
    "explanation": "P = V × I = 230 × 8 = 1840 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 4 A from a 230 V supply?",
    "options": [
      "1840",
      "460",
      "1150",
      "920"
    ],
    "correct": "920",
    "explanation": "P = V × I = 230 × 4 = 920 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 4 A from a 400 V supply?",
    "options": [
      "800",
      "3200",
      "2000",
      "1600"
    ],
    "correct": "1600",
    "explanation": "P = V × I = 400 × 4 = 1600 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 6 A from a 230 V supply?",
    "options": [
      "690",
      "2760",
      "1380",
      "1610"
    ],
    "correct": "1380",
    "explanation": "P = V × I = 230 × 6 = 1380 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 6 A from a 50 V supply?",
    "options": [
      "350",
      "300",
      "600",
      "150"
    ],
    "correct": "300",
    "explanation": "P = V × I = 50 × 6 = 300 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = V × I, what is the power consumed by a load drawing 5 A from a 24 V supply?",
    "options": [
      "120",
      "240",
      "60",
      "144"
    ],
    "correct": "120",
    "explanation": "P = V × I = 24 × 5 = 120 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 12 Ω resistor carrying 5 A?",
    "options": [
      "150",
      "305",
      "600",
      "300"
    ],
    "correct": "300",
    "explanation": "P = I² × R = 5² × 12 = 25 × 12 = 300 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 8 Ω resistor carrying 6 A?",
    "options": [
      "294",
      "576",
      "288",
      "144"
    ],
    "correct": "288",
    "explanation": "P = I² × R = 6² × 8 = 36 × 8 = 288 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 20 Ω resistor carrying 1 A?",
    "options": [
      "10",
      "20",
      "40",
      "21"
    ],
    "correct": "20",
    "explanation": "P = I² × R = 1² × 20 = 1 × 20 = 20 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 20 Ω resistor carrying 4 A?",
    "options": [
      "320",
      "640",
      "324",
      "160"
    ],
    "correct": "320",
    "explanation": "P = I² × R = 4² × 20 = 16 × 20 = 320 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 2 Ω resistor carrying 10 A?",
    "options": [
      "100",
      "200",
      "210",
      "400"
    ],
    "correct": "200",
    "explanation": "P = I² × R = 10² × 2 = 100 × 2 = 200 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 15 Ω resistor carrying 5 A?",
    "options": [
      "750",
      "187.5",
      "375",
      "380"
    ],
    "correct": "375",
    "explanation": "P = I² × R = 5² × 15 = 25 × 15 = 375 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 5 Ω resistor carrying 4 A?",
    "options": [
      "160",
      "80",
      "84",
      "40"
    ],
    "correct": "80",
    "explanation": "P = I² × R = 4² × 5 = 16 × 5 = 80 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 4 Ω resistor carrying 8 A?",
    "options": [
      "128",
      "264",
      "256",
      "512"
    ],
    "correct": "256",
    "explanation": "P = I² × R = 8² × 4 = 64 × 4 = 256 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 5 Ω resistor carrying 2 A?",
    "options": [
      "20",
      "40",
      "10",
      "22"
    ],
    "correct": "20",
    "explanation": "P = I² × R = 2² × 5 = 4 × 5 = 20 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 15 Ω resistor carrying 10 A?",
    "options": [
      "750",
      "1500",
      "1510",
      "3000"
    ],
    "correct": "1500",
    "explanation": "P = I² × R = 10² × 15 = 100 × 15 = 1500 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 6 Ω resistor carrying 8 A?",
    "options": [
      "192",
      "392",
      "384",
      "768"
    ],
    "correct": "384",
    "explanation": "P = I² × R = 8² × 6 = 64 × 6 = 384 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 10 Ω resistor carrying 8 A?",
    "options": [
      "648",
      "1280",
      "640",
      "320"
    ],
    "correct": "640",
    "explanation": "P = I² × R = 8² × 10 = 64 × 10 = 640 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 15 Ω resistor carrying 3 A?",
    "options": [
      "135",
      "67.5",
      "270",
      "138"
    ],
    "correct": "135",
    "explanation": "P = I² × R = 3² × 15 = 9 × 15 = 135 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 15 Ω resistor carrying 8 A?",
    "options": [
      "1920",
      "968",
      "960",
      "480"
    ],
    "correct": "960",
    "explanation": "P = I² × R = 8² × 15 = 64 × 15 = 960 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 2 Ω resistor carrying 8 A?",
    "options": [
      "128",
      "256",
      "136",
      "64"
    ],
    "correct": "128",
    "explanation": "P = I² × R = 8² × 2 = 64 × 2 = 128 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 12 Ω resistor carrying 8 A?",
    "options": [
      "384",
      "768",
      "776",
      "1536"
    ],
    "correct": "768",
    "explanation": "P = I² × R = 8² × 12 = 64 × 12 = 768 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 20 Ω resistor carrying 3 A?",
    "options": [
      "183",
      "360",
      "180",
      "90"
    ],
    "correct": "180",
    "explanation": "P = I² × R = 3² × 20 = 9 × 20 = 180 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 20 Ω resistor carrying 2 A?",
    "options": [
      "160",
      "40",
      "80",
      "82"
    ],
    "correct": "80",
    "explanation": "P = I² × R = 2² × 20 = 4 × 20 = 80 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 5 Ω resistor carrying 8 A?",
    "options": [
      "328",
      "160",
      "640",
      "320"
    ],
    "correct": "320",
    "explanation": "P = I² × R = 8² × 5 = 64 × 5 = 320 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 12 Ω resistor carrying 6 A?",
    "options": [
      "438",
      "216",
      "864",
      "432"
    ],
    "correct": "432",
    "explanation": "P = I² × R = 6² × 12 = 36 × 12 = 432 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 15 Ω resistor carrying 6 A?",
    "options": [
      "1080",
      "546",
      "270",
      "540"
    ],
    "correct": "540",
    "explanation": "P = I² × R = 6² × 15 = 36 × 15 = 540 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 8 Ω resistor carrying 4 A?",
    "options": [
      "132",
      "128",
      "64",
      "256"
    ],
    "correct": "128",
    "explanation": "P = I² × R = 4² × 8 = 16 × 8 = 128 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 15 Ω resistor carrying 2 A?",
    "options": [
      "60",
      "62",
      "30",
      "120"
    ],
    "correct": "60",
    "explanation": "P = I² × R = 2² × 15 = 4 × 15 = 60 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 2 Ω resistor carrying 1 A?",
    "options": [
      "3",
      "4",
      "2",
      "1"
    ],
    "correct": "2",
    "explanation": "P = I² × R = 1² × 2 = 1 × 2 = 2 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 10 Ω resistor carrying 6 A?",
    "options": [
      "720",
      "180",
      "360",
      "366"
    ],
    "correct": "360",
    "explanation": "P = I² × R = 6² × 10 = 36 × 10 = 360 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 5 Ω resistor carrying 3 A?",
    "options": [
      "48",
      "90",
      "22.5",
      "45"
    ],
    "correct": "45",
    "explanation": "P = I² × R = 3² × 5 = 9 × 5 = 45 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 15 Ω resistor carrying 4 A?",
    "options": [
      "120",
      "244",
      "240",
      "480"
    ],
    "correct": "240",
    "explanation": "P = I² × R = 4² × 15 = 16 × 15 = 240 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 2 Ω resistor carrying 5 A?",
    "options": [
      "25",
      "50",
      "100",
      "55"
    ],
    "correct": "50",
    "explanation": "P = I² × R = 5² × 2 = 25 × 2 = 50 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 8 Ω resistor carrying 8 A?",
    "options": [
      "256",
      "512",
      "1024",
      "520"
    ],
    "correct": "512",
    "explanation": "P = I² × R = 8² × 8 = 64 × 8 = 512 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using P = I² × R, what is the power dissipated by a 6 Ω resistor carrying 2 A?",
    "options": [
      "24",
      "48",
      "12",
      "26"
    ],
    "correct": "24",
    "explanation": "P = I² × R = 2² × 6 = 4 × 6 = 24 W.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 2500 W appliance connected to a 110 V supply?",
    "options": [
      "24.73",
      "45.46",
      "11.37",
      "22.73"
    ],
    "correct": "22.73",
    "explanation": "I = P ÷ V = 2500 ÷ 110 = 22.73 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 500 W appliance connected to a 110 V supply?",
    "options": [
      "6.55",
      "9.1",
      "2.27",
      "4.55"
    ],
    "correct": "4.55",
    "explanation": "I = P ÷ V = 500 ÷ 110 = 4.55 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 2000 W appliance connected to a 110 V supply?",
    "options": [
      "36.36",
      "20.18",
      "18.18",
      "9.09"
    ],
    "correct": "18.18",
    "explanation": "I = P ÷ V = 2000 ÷ 110 = 18.18 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 1500 W appliance connected to a 110 V supply?",
    "options": [
      "27.28",
      "15.64",
      "6.82",
      "13.64"
    ],
    "correct": "13.64",
    "explanation": "I = P ÷ V = 1500 ÷ 110 = 13.64 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 4000 W appliance connected to a 110 V supply?",
    "options": [
      "38.36",
      "72.72",
      "18.18",
      "36.36"
    ],
    "correct": "36.36",
    "explanation": "I = P ÷ V = 4000 ÷ 110 = 36.36 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 1000 W appliance connected to a 400 V supply?",
    "options": [
      "2.5",
      "4.5",
      "5",
      "1.25"
    ],
    "correct": "2.5",
    "explanation": "I = P ÷ V = 1000 ÷ 400 = 2.5 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 2000 W appliance connected to a 400 V supply?",
    "options": [
      "5",
      "7",
      "2.5",
      "10"
    ],
    "correct": "5",
    "explanation": "I = P ÷ V = 2000 ÷ 400 = 5 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 3000 W appliance connected to a 110 V supply?",
    "options": [
      "13.63",
      "29.27",
      "54.54",
      "27.27"
    ],
    "correct": "27.27",
    "explanation": "I = P ÷ V = 3000 ÷ 110 = 27.27 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 7000 W appliance connected to a 24 V supply?",
    "options": [
      "293.67",
      "583.34",
      "291.67",
      "145.84"
    ],
    "correct": "291.67",
    "explanation": "I = P ÷ V = 7000 ÷ 24 = 291.67 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 2500 W appliance connected to a 230 V supply?",
    "options": [
      "12.87",
      "5.43",
      "21.74",
      "10.87"
    ],
    "correct": "10.87",
    "explanation": "I = P ÷ V = 2500 ÷ 230 = 10.87 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 9000 W appliance connected to a 110 V supply?",
    "options": [
      "81.82",
      "163.64",
      "40.91",
      "83.82"
    ],
    "correct": "81.82",
    "explanation": "I = P ÷ V = 9000 ÷ 110 = 81.82 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 2000 W appliance connected to a 230 V supply?",
    "options": [
      "4.35",
      "17.4",
      "8.7",
      "10.7"
    ],
    "correct": "8.7",
    "explanation": "I = P ÷ V = 2000 ÷ 230 = 8.7 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 2500 W appliance connected to a 24 V supply?",
    "options": [
      "208.34",
      "52.09",
      "104.17",
      "106.17"
    ],
    "correct": "104.17",
    "explanation": "I = P ÷ V = 2500 ÷ 24 = 104.17 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 500 W appliance connected to a 230 V supply?",
    "options": [
      "4.17",
      "2.17",
      "4.34",
      "1.08"
    ],
    "correct": "2.17",
    "explanation": "I = P ÷ V = 500 ÷ 230 = 2.17 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 3500 W appliance connected to a 400 V supply?",
    "options": [
      "8.75",
      "4.38",
      "17.5",
      "10.75"
    ],
    "correct": "8.75",
    "explanation": "I = P ÷ V = 3500 ÷ 400 = 8.75 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 4000 W appliance connected to a 230 V supply?",
    "options": [
      "8.7",
      "17.39",
      "34.78",
      "19.39"
    ],
    "correct": "17.39",
    "explanation": "I = P ÷ V = 4000 ÷ 230 = 17.39 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 4000 W appliance connected to a 24 V supply?",
    "options": [
      "83.33",
      "166.67",
      "168.67",
      "333.34"
    ],
    "correct": "166.67",
    "explanation": "I = P ÷ V = 4000 ÷ 24 = 166.67 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 7000 W appliance connected to a 110 V supply?",
    "options": [
      "65.64",
      "127.28",
      "63.64",
      "31.82"
    ],
    "correct": "63.64",
    "explanation": "I = P ÷ V = 7000 ÷ 110 = 63.64 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 9000 W appliance connected to a 400 V supply?",
    "options": [
      "24.5",
      "11.25",
      "22.5",
      "45"
    ],
    "correct": "22.5",
    "explanation": "I = P ÷ V = 9000 ÷ 400 = 22.5 A.",
    "topic": "Power calculations"
  },
  {
    "text": "Using I = P ÷ V, what current is drawn by a 1500 W appliance connected to a 400 V supply?",
    "options": [
      "7.5",
      "5.75",
      "3.75",
      "1.88"
    ],
    "correct": "3.75",
    "explanation": "I = P ÷ V = 1500 ÷ 400 = 3.75 A.",
    "topic": "Power calculations"
  },
  {
    "text": "A resistor has colour bands Brown, Black, Black, Gold. What is its resistance value?",
    "options": [
      "50 Ω",
      "1 Ω",
      "100 Ω",
      "10 Ω"
    ],
    "correct": "10 Ω",
    "explanation": "Brown = 1, Black = 0, giving 10, multiplied by the black band (×1) = 10 Ω. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Red, Red, Black, Gold. What is its resistance value?",
    "options": [
      "110 Ω",
      "22 Ω",
      "220 Ω",
      "2.2 Ω"
    ],
    "correct": "22 Ω",
    "explanation": "Red = 2, Red = 2, giving 22, multiplied by the black band (×1) = 22 Ω. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Yellow, Violet, Orange, Gold. What is its resistance value?",
    "options": [
      "4.7 kΩ",
      "470 kΩ",
      "47 kΩ",
      "235 kΩ"
    ],
    "correct": "47 kΩ",
    "explanation": "Yellow = 4, Violet = 7, giving 47, multiplied by the orange band (×1,000) = 47 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Black, Green, Gold. What is its resistance value?",
    "options": [
      "100 kΩ",
      "5 MΩ",
      "1 MΩ",
      "10 MΩ"
    ],
    "correct": "1 MΩ",
    "explanation": "Brown = 1, Black = 0, giving 10, multiplied by the green band (×100,000) = 1 MΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Grey, Red, Yellow, Gold. What is its resistance value?",
    "options": [
      "82 kΩ",
      "820 kΩ",
      "4.1 MΩ",
      "8.2 MΩ"
    ],
    "correct": "820 kΩ",
    "explanation": "Grey = 8, Red = 2, giving 82, multiplied by the yellow band (×10,000) = 820 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Red, Green, Gold. What is its resistance value?",
    "options": [
      "1.2 MΩ",
      "120 kΩ",
      "12 MΩ",
      "6 MΩ"
    ],
    "correct": "1.2 MΩ",
    "explanation": "Brown = 1, Red = 2, giving 12, multiplied by the green band (×100,000) = 1.2 MΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Grey, Red, Red, Gold. What is its resistance value?",
    "options": [
      "82 kΩ",
      "41 kΩ",
      "8.2 kΩ",
      "820 Ω"
    ],
    "correct": "8.2 kΩ",
    "explanation": "Grey = 8, Red = 2, giving 82, multiplied by the red band (×100) = 8.2 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Yellow, Violet, Yellow, Gold. What is its resistance value?",
    "options": [
      "2.35 MΩ",
      "47 kΩ",
      "470 kΩ",
      "4.7 MΩ"
    ],
    "correct": "470 kΩ",
    "explanation": "Yellow = 4, Violet = 7, giving 47, multiplied by the yellow band (×10,000) = 470 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Green, Brown, Gold. What is its resistance value?",
    "options": [
      "1.5 kΩ",
      "150 Ω",
      "750 Ω",
      "15 Ω"
    ],
    "correct": "150 Ω",
    "explanation": "Brown = 1, Green = 5, giving 15, multiplied by the brown band (×10) = 150 Ω. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Grey, Orange, Gold. What is its resistance value?",
    "options": [
      "1.8 kΩ",
      "90 kΩ",
      "18 kΩ",
      "180 kΩ"
    ],
    "correct": "18 kΩ",
    "explanation": "Brown = 1, Grey = 8, giving 18, multiplied by the orange band (×1,000) = 18 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Orange, Orange, Red, Gold. What is its resistance value?",
    "options": [
      "3.3 kΩ",
      "16.5 kΩ",
      "330 Ω",
      "33 kΩ"
    ],
    "correct": "3.3 kΩ",
    "explanation": "Orange = 3, Orange = 3, giving 33, multiplied by the red band (×100) = 3.3 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Grey, Red, Black, Gold. What is its resistance value?",
    "options": [
      "820 Ω",
      "410 Ω",
      "8.2 Ω",
      "82 Ω"
    ],
    "correct": "82 Ω",
    "explanation": "Grey = 8, Red = 2, giving 82, multiplied by the black band (×1) = 82 Ω. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Green, Orange, Gold. What is its resistance value?",
    "options": [
      "15 kΩ",
      "150 kΩ",
      "75 kΩ",
      "1.5 kΩ"
    ],
    "correct": "15 kΩ",
    "explanation": "Brown = 1, Green = 5, giving 15, multiplied by the orange band (×1,000) = 15 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Blue, Grey, Yellow, Gold. What is its resistance value?",
    "options": [
      "68 kΩ",
      "680 kΩ",
      "3.4 MΩ",
      "6.8 MΩ"
    ],
    "correct": "680 kΩ",
    "explanation": "Blue = 6, Grey = 8, giving 68, multiplied by the yellow band (×10,000) = 680 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Green, Blue, Orange, Gold. What is its resistance value?",
    "options": [
      "5.6 kΩ",
      "280 kΩ",
      "560 kΩ",
      "56 kΩ"
    ],
    "correct": "56 kΩ",
    "explanation": "Green = 5, Blue = 6, giving 56, multiplied by the orange band (×1,000) = 56 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Red, Orange, Gold. What is its resistance value?",
    "options": [
      "12 kΩ",
      "120 kΩ",
      "1.2 kΩ",
      "60 kΩ"
    ],
    "correct": "12 kΩ",
    "explanation": "Brown = 1, Red = 2, giving 12, multiplied by the orange band (×1,000) = 12 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Green, Black, Gold. What is its resistance value?",
    "options": [
      "75 Ω",
      "1.5 Ω",
      "150 Ω",
      "15 Ω"
    ],
    "correct": "15 Ω",
    "explanation": "Brown = 1, Green = 5, giving 15, multiplied by the black band (×1) = 15 Ω. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Red, Violet, Yellow, Gold. What is its resistance value?",
    "options": [
      "270 kΩ",
      "27 kΩ",
      "2.7 MΩ",
      "1.35 MΩ"
    ],
    "correct": "270 kΩ",
    "explanation": "Red = 2, Violet = 7, giving 27, multiplied by the yellow band (×10,000) = 270 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Green, Green, Gold. What is its resistance value?",
    "options": [
      "150 kΩ",
      "15 MΩ",
      "7.5 MΩ",
      "1.5 MΩ"
    ],
    "correct": "1.5 MΩ",
    "explanation": "Brown = 1, Green = 5, giving 15, multiplied by the green band (×100,000) = 1.5 MΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Grey, Black, Gold. What is its resistance value?",
    "options": [
      "180 Ω",
      "1.8 Ω",
      "18 Ω",
      "90 Ω"
    ],
    "correct": "18 Ω",
    "explanation": "Brown = 1, Grey = 8, giving 18, multiplied by the black band (×1) = 18 Ω. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Brown, Grey, Red, Gold. What is its resistance value?",
    "options": [
      "1.8 kΩ",
      "9 kΩ",
      "18 kΩ",
      "180 Ω"
    ],
    "correct": "1.8 kΩ",
    "explanation": "Brown = 1, Grey = 8, giving 18, multiplied by the red band (×100) = 1.8 kΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Green, Blue, Green, Gold. What is its resistance value?",
    "options": [
      "56 MΩ",
      "28 MΩ",
      "560 kΩ",
      "5.6 MΩ"
    ],
    "correct": "5.6 MΩ",
    "explanation": "Green = 5, Blue = 6, giving 56, multiplied by the green band (×100,000) = 5.6 MΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Blue, Grey, Brown, Gold. What is its resistance value?",
    "options": [
      "680 Ω",
      "68 Ω",
      "6.8 kΩ",
      "3.4 kΩ"
    ],
    "correct": "680 Ω",
    "explanation": "Blue = 6, Grey = 8, giving 68, multiplied by the brown band (×10) = 680 Ω. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has colour bands Red, Violet, Green, Gold. What is its resistance value?",
    "options": [
      "13.5 MΩ",
      "270 kΩ",
      "2.7 MΩ",
      "27 MΩ"
    ],
    "correct": "2.7 MΩ",
    "explanation": "Red = 2, Violet = 7, giving 27, multiplied by the green band (×100,000) = 2.7 MΩ. Gold indicates a ±5% tolerance.",
    "topic": "Resistor colour code"
  },
  {
    "text": "Approximately what current-carrying capacity does a 1.0mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "34A",
      "19.5A",
      "11A",
      "46A"
    ],
    "correct": "11A",
    "explanation": "A 1.0mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 11A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Approximately what current-carrying capacity does a 1.5mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "14.5A",
      "80A",
      "11A",
      "19.5A"
    ],
    "correct": "14.5A",
    "explanation": "A 1.5mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 14.5A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Approximately what current-carrying capacity does a 2.5mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "19.5A",
      "46A",
      "34A",
      "11A"
    ],
    "correct": "19.5A",
    "explanation": "A 2.5mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 19.5A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Approximately what current-carrying capacity does a 4mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "14.5A",
      "80A",
      "19.5A",
      "26A"
    ],
    "correct": "26A",
    "explanation": "A 4mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 26A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Approximately what current-carrying capacity does a 6mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "14.5A",
      "34A",
      "46A",
      "80A"
    ],
    "correct": "34A",
    "explanation": "A 6mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 34A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Approximately what current-carrying capacity does a 10mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "14.5A",
      "80A",
      "46A",
      "11A"
    ],
    "correct": "46A",
    "explanation": "A 10mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 46A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Approximately what current-carrying capacity does a 16mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "61A",
      "11A",
      "14.5A",
      "34A"
    ],
    "correct": "61A",
    "explanation": "A 16mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 61A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Approximately what current-carrying capacity does a 25mm² twin-and-earth cable (clipped direct, method C) have, per BS 7671 tables?",
    "options": [
      "80A",
      "26A",
      "34A",
      "46A"
    ],
    "correct": "80A",
    "explanation": "A 25mm² T&E cable clipped direct has an approximate tabulated current-carrying capacity of 80A (always confirm against the current edition of BS 7671 for the exact installation method and correction factors).",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 11A, per BS 7671 tables?",
    "options": [
      "16mm²",
      "1.0mm²",
      "4mm²",
      "25mm²"
    ],
    "correct": "1.0mm²",
    "explanation": "A tabulated rating of about 11A corresponds approximately to a 1.0mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 14.5A, per BS 7671 tables?",
    "options": [
      "6mm²",
      "1.5mm²",
      "4mm²",
      "25mm²"
    ],
    "correct": "1.5mm²",
    "explanation": "A tabulated rating of about 14.5A corresponds approximately to a 1.5mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 19.5A, per BS 7671 tables?",
    "options": [
      "2.5mm²",
      "1.0mm²",
      "4mm²",
      "10mm²"
    ],
    "correct": "2.5mm²",
    "explanation": "A tabulated rating of about 19.5A corresponds approximately to a 2.5mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 26A, per BS 7671 tables?",
    "options": [
      "1.0mm²",
      "2.5mm²",
      "4mm²",
      "25mm²"
    ],
    "correct": "4mm²",
    "explanation": "A tabulated rating of about 26A corresponds approximately to a 4mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 34A, per BS 7671 tables?",
    "options": [
      "25mm²",
      "6mm²",
      "10mm²",
      "16mm²"
    ],
    "correct": "6mm²",
    "explanation": "A tabulated rating of about 34A corresponds approximately to a 6mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 46A, per BS 7671 tables?",
    "options": [
      "10mm²",
      "4mm²",
      "1.5mm²",
      "6mm²"
    ],
    "correct": "10mm²",
    "explanation": "A tabulated rating of about 46A corresponds approximately to a 10mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 61A, per BS 7671 tables?",
    "options": [
      "1.5mm²",
      "6mm²",
      "16mm²",
      "1.0mm²"
    ],
    "correct": "16mm²",
    "explanation": "A tabulated rating of about 61A corresponds approximately to a 16mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which approximate T&E cable size (clipped direct, method C) would be selected to carry a design current close to 80A, per BS 7671 tables?",
    "options": [
      "6mm²",
      "1.0mm²",
      "25mm²",
      "10mm²"
    ],
    "correct": "25mm²",
    "explanation": "A tabulated rating of about 80A corresponds approximately to a 25mm² T&E cable clipped direct — always verify with the current edition of BS 7671 and apply any relevant correction factors.",
    "topic": "Cable sizing"
  },
  {
    "text": "Two resistors of 15 Ω and 15 Ω are connected in series. What is the total resistance?",
    "options": [
      "30",
      "15",
      "0",
      "60"
    ],
    "correct": "30",
    "explanation": "In series, resistances simply add: 15 + 15 = 30 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 8 Ω and 12 Ω are connected in series. What is the total resistance?",
    "options": [
      "10",
      "20",
      "40",
      "4"
    ],
    "correct": "20",
    "explanation": "In series, resistances simply add: 8 + 12 = 20 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 10 Ω and 4 Ω are connected in series. What is the total resistance?",
    "options": [
      "6",
      "28",
      "14",
      "7"
    ],
    "correct": "14",
    "explanation": "In series, resistances simply add: 10 + 4 = 14 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 8 Ω and 8 Ω are connected in series. What is the total resistance?",
    "options": [
      "8",
      "16",
      "0",
      "32"
    ],
    "correct": "16",
    "explanation": "In series, resistances simply add: 8 + 8 = 16 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 22 Ω and 5 Ω are connected in series. What is the total resistance?",
    "options": [
      "27",
      "17",
      "54",
      "13.5"
    ],
    "correct": "27",
    "explanation": "In series, resistances simply add: 22 + 5 = 27 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 5 Ω and 22 Ω are connected in series. What is the total resistance?",
    "options": [
      "17",
      "13.5",
      "54",
      "27"
    ],
    "correct": "27",
    "explanation": "In series, resistances simply add: 5 + 22 = 27 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 10 Ω and 5 Ω are connected in series. What is the total resistance?",
    "options": [
      "5",
      "30",
      "7.5",
      "15"
    ],
    "correct": "15",
    "explanation": "In series, resistances simply add: 10 + 5 = 15 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 20 Ω and 10 Ω are connected in series. What is the total resistance?",
    "options": [
      "10",
      "15",
      "60",
      "30"
    ],
    "correct": "30",
    "explanation": "In series, resistances simply add: 20 + 10 = 30 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 5 Ω and 6 Ω are connected in series. What is the total resistance?",
    "options": [
      "1",
      "11",
      "22",
      "5.5"
    ],
    "correct": "11",
    "explanation": "In series, resistances simply add: 5 + 6 = 11 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 6 Ω and 5 Ω are connected in series. What is the total resistance?",
    "options": [
      "5.5",
      "1",
      "11",
      "22"
    ],
    "correct": "11",
    "explanation": "In series, resistances simply add: 6 + 5 = 11 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 4 Ω and 20 Ω are connected in series. What is the total resistance?",
    "options": [
      "16",
      "48",
      "12",
      "24"
    ],
    "correct": "24",
    "explanation": "In series, resistances simply add: 4 + 20 = 24 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 22 Ω and 12 Ω are connected in series. What is the total resistance?",
    "options": [
      "10",
      "17",
      "34",
      "68"
    ],
    "correct": "34",
    "explanation": "In series, resistances simply add: 22 + 12 = 34 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 15 Ω and 2 Ω are connected in series. What is the total resistance?",
    "options": [
      "8.5",
      "17",
      "34",
      "13"
    ],
    "correct": "17",
    "explanation": "In series, resistances simply add: 15 + 2 = 17 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 15 Ω and 22 Ω are connected in series. What is the total resistance?",
    "options": [
      "37",
      "74",
      "7",
      "18.5"
    ],
    "correct": "37",
    "explanation": "In series, resistances simply add: 15 + 22 = 37 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 6 Ω and 20 Ω are connected in series. What is the total resistance?",
    "options": [
      "26",
      "13",
      "14",
      "52"
    ],
    "correct": "26",
    "explanation": "In series, resistances simply add: 6 + 20 = 26 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 6 Ω and 10 Ω are connected in series. What is the total resistance?",
    "options": [
      "16",
      "8",
      "32",
      "4"
    ],
    "correct": "16",
    "explanation": "In series, resistances simply add: 6 + 10 = 16 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 12 Ω and 20 Ω are connected in series. What is the total resistance?",
    "options": [
      "64",
      "16",
      "32",
      "8"
    ],
    "correct": "32",
    "explanation": "In series, resistances simply add: 12 + 20 = 32 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 8 Ω and 2 Ω are connected in series. What is the total resistance?",
    "options": [
      "5",
      "10",
      "20",
      "6"
    ],
    "correct": "10",
    "explanation": "In series, resistances simply add: 8 + 2 = 10 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 20 Ω and 4 Ω are connected in series. What is the total resistance?",
    "options": [
      "48",
      "16",
      "24",
      "12"
    ],
    "correct": "24",
    "explanation": "In series, resistances simply add: 20 + 4 = 24 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 8 Ω and 15 Ω are connected in series. What is the total resistance?",
    "options": [
      "11.5",
      "23",
      "7",
      "46"
    ],
    "correct": "23",
    "explanation": "In series, resistances simply add: 8 + 15 = 23 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 8 Ω and 8 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "8",
      "4.5",
      "4",
      "16"
    ],
    "correct": "4",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (8 × 8) ÷ (8 + 8) = 4 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 5 Ω and 20 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "25",
      "4",
      "8",
      "20"
    ],
    "correct": "4",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (5 × 20) ÷ (5 + 20) = 4 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 2 Ω and 4 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "2.66",
      "1.33",
      "6",
      "4"
    ],
    "correct": "1.33",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (2 × 4) ÷ (2 + 4) = 1.33 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 12 Ω and 4 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "6",
      "16",
      "12",
      "3"
    ],
    "correct": "3",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (12 × 4) ÷ (12 + 4) = 3 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 6 Ω and 6 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "3",
      "3.5",
      "6",
      "12"
    ],
    "correct": "3",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (6 × 6) ÷ (6 + 6) = 3 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 8 Ω and 24 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "12",
      "24",
      "32",
      "6"
    ],
    "correct": "6",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (8 × 24) ÷ (8 + 24) = 6 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 20 Ω and 20 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "40",
      "20",
      "11",
      "10"
    ],
    "correct": "10",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (20 × 20) ÷ (20 + 20) = 10 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 20 Ω and 5 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "4",
      "25",
      "8",
      "20"
    ],
    "correct": "4",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (20 × 5) ÷ (20 + 5) = 4 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 4 Ω and 4 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "4",
      "2.5",
      "8",
      "2"
    ],
    "correct": "2",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (4 × 4) ÷ (4 + 4) = 2 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 15 Ω and 15 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "9",
      "7.5",
      "15",
      "30"
    ],
    "correct": "7.5",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (15 × 15) ÷ (15 + 15) = 7.5 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 10 Ω and 10 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "10",
      "20",
      "5",
      "6"
    ],
    "correct": "5",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (10 × 10) ÷ (10 + 10) = 5 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 4 Ω and 6 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "2.4",
      "6",
      "4.8",
      "10"
    ],
    "correct": "2.4",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (4 × 6) ÷ (4 + 6) = 2.4 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 3 Ω and 6 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "6",
      "2",
      "4",
      "9"
    ],
    "correct": "2",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (3 × 6) ÷ (3 + 6) = 2 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 6 Ω and 12 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "18",
      "12",
      "4",
      "8"
    ],
    "correct": "4",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (6 × 12) ÷ (6 + 12) = 4 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 6 Ω and 3 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "4",
      "2",
      "9",
      "6"
    ],
    "correct": "2",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (6 × 3) ÷ (6 + 3) = 2 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 3 Ω and 3 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "2.5",
      "1.5",
      "6",
      "3"
    ],
    "correct": "1.5",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (3 × 3) ÷ (3 + 3) = 1.5 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 2 Ω and 2 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "4",
      "1.5",
      "1",
      "2"
    ],
    "correct": "1",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (2 × 2) ÷ (2 + 2) = 1 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 12 Ω and 12 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "24",
      "7.5",
      "6",
      "12"
    ],
    "correct": "6",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (12 × 12) ÷ (12 + 12) = 6 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 9 Ω and 9 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "18",
      "4.5",
      "5.5",
      "9"
    ],
    "correct": "4.5",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (9 × 9) ÷ (9 + 9) = 4.5 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 10 Ω and 15 Ω are connected in parallel. What is the total resistance (to 2 d.p. where needed)?",
    "options": [
      "6",
      "25",
      "12",
      "15"
    ],
    "correct": "6",
    "explanation": "For two resistors in parallel: Rtotal = (R1 × R2) ÷ (R1 + R2) = (10 × 15) ÷ (10 + 15) = 6 Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 1500W appliance for 3 hours?",
    "options": [
      "£2.26",
      "£2.52",
      "£0.63",
      "£1.26"
    ],
    "correct": "£1.26",
    "explanation": "Energy used = (1500 ÷ 1000) × 3 = 4.5 kWh. Cost = 4.5 × £0.28 ≈ £1.26.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 500W appliance for 5 hours?",
    "options": [
      "£1.70",
      "£0.35",
      "£0.70",
      "£1.40"
    ],
    "correct": "£0.70",
    "explanation": "Energy used = (500 ÷ 1000) × 5 = 2.5 kWh. Cost = 2.5 × £0.28 ≈ £0.70.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 500W appliance for 6 hours?",
    "options": [
      "£0.84",
      "£1.68",
      "£1.84",
      "£0.42"
    ],
    "correct": "£0.84",
    "explanation": "Energy used = (500 ÷ 1000) × 6 = 3.0 kWh. Cost = 3.0 × £0.28 ≈ £0.84.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 60W appliance for 10 hours?",
    "options": [
      "£0.34",
      "£1.17",
      "£0.17",
      "£0.09"
    ],
    "correct": "£0.17",
    "explanation": "Energy used = (60 ÷ 1000) × 10 = 0.6 kWh. Cost = 0.6 × £0.28 ≈ £0.17.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 2500W appliance for 6 hours?",
    "options": [
      "£5.20",
      "£8.40",
      "£2.10",
      "£4.20"
    ],
    "correct": "£4.20",
    "explanation": "Energy used = (2500 ÷ 1000) × 6 = 15.0 kWh. Cost = 15.0 × £0.28 ≈ £4.20.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 2500W appliance for 2 hours?",
    "options": [
      "£1.40",
      "£2.40",
      "£2.80",
      "£0.70"
    ],
    "correct": "£1.40",
    "explanation": "Energy used = (2500 ÷ 1000) × 2 = 5.0 kWh. Cost = 5.0 × £0.28 ≈ £1.40.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 2000W appliance for 8 hours?",
    "options": [
      "£5.48",
      "£8.96",
      "£4.48",
      "£2.24"
    ],
    "correct": "£4.48",
    "explanation": "Energy used = (2000 ÷ 1000) × 8 = 16.0 kWh. Cost = 16.0 × £0.28 ≈ £4.48.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 2000W appliance for 6 hours?",
    "options": [
      "£4.36",
      "£6.72",
      "£3.36",
      "£1.68"
    ],
    "correct": "£3.36",
    "explanation": "Energy used = (2000 ÷ 1000) × 6 = 12.0 kWh. Cost = 12.0 × £0.28 ≈ £3.36.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 1000W appliance for 8 hours?",
    "options": [
      "£2.24",
      "£3.24",
      "£1.12",
      "£4.48"
    ],
    "correct": "£2.24",
    "explanation": "Energy used = (1000 ÷ 1000) × 8 = 8.0 kWh. Cost = 8.0 × £0.28 ≈ £2.24.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 3000W appliance for 2 hours?",
    "options": [
      "£2.68",
      "£0.84",
      "£3.36",
      "£1.68"
    ],
    "correct": "£1.68",
    "explanation": "Energy used = (3000 ÷ 1000) × 2 = 6.0 kWh. Cost = 6.0 × £0.28 ≈ £1.68.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 2500W appliance for 10 hours?",
    "options": [
      "£3.50",
      "£14.00",
      "£7.00",
      "£8.00"
    ],
    "correct": "£7.00",
    "explanation": "Energy used = (2500 ÷ 1000) × 10 = 25.0 kWh. Cost = 25.0 × £0.28 ≈ £7.00.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 3000W appliance for 10 hours?",
    "options": [
      "£9.40",
      "£16.80",
      "£4.20",
      "£8.40"
    ],
    "correct": "£8.40",
    "explanation": "Energy used = (3000 ÷ 1000) × 10 = 30.0 kWh. Cost = 30.0 × £0.28 ≈ £8.40.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 150W appliance for 8 hours?",
    "options": [
      "£0.68",
      "£0.34",
      "£1.34",
      "£0.17"
    ],
    "correct": "£0.34",
    "explanation": "Energy used = (150 ÷ 1000) × 8 = 1.2 kWh. Cost = 1.2 × £0.28 ≈ £0.34.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 3000W appliance for 0.5 hours?",
    "options": [
      "£1.42",
      "£0.21",
      "£0.42",
      "£0.84"
    ],
    "correct": "£0.42",
    "explanation": "Energy used = (3000 ÷ 1000) × 0.5 = 1.5 kWh. Cost = 1.5 × £0.28 ≈ £0.42.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 150W appliance for 10 hours?",
    "options": [
      "£0.84",
      "£0.21",
      "£1.42",
      "£0.42"
    ],
    "correct": "£0.42",
    "explanation": "Energy used = (150 ÷ 1000) × 10 = 1.5 kWh. Cost = 1.5 × £0.28 ≈ £0.42.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 3000W appliance for 8 hours?",
    "options": [
      "£13.44",
      "£7.72",
      "£3.36",
      "£6.72"
    ],
    "correct": "£6.72",
    "explanation": "Energy used = (3000 ÷ 1000) × 8 = 24.0 kWh. Cost = 24.0 × £0.28 ≈ £6.72.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 1000W appliance for 1.5 hours?",
    "options": [
      "£0.42",
      "£1.42",
      "£0.21",
      "£0.84"
    ],
    "correct": "£0.42",
    "explanation": "Energy used = (1000 ÷ 1000) × 1.5 = 1.5 kWh. Cost = 1.5 × £0.28 ≈ £0.42.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 100W appliance for 6 hours?",
    "options": [
      "£0.34",
      "£1.17",
      "£0.17",
      "£0.09"
    ],
    "correct": "£0.17",
    "explanation": "Energy used = (100 ÷ 1000) × 6 = 0.6 kWh. Cost = 0.6 × £0.28 ≈ £0.17.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 500W appliance for 3 hours?",
    "options": [
      "£0.42",
      "£0.84",
      "£0.21",
      "£1.42"
    ],
    "correct": "£0.42",
    "explanation": "Energy used = (500 ÷ 1000) × 3 = 1.5 kWh. Cost = 1.5 × £0.28 ≈ £0.42.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "At an illustrative rate of £0.28 per kWh, approximately what does it cost to run a 60W appliance for 2 hours?",
    "options": [
      "£0.03",
      "£1.03",
      "£0.06",
      "£0.01"
    ],
    "correct": "£0.03",
    "explanation": "Energy used = (60 ÷ 1000) × 2 = 0.12 kWh. Cost = 0.12 × £0.28 ≈ £0.03.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "A transformer has 200 turns on the primary and 10 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "400",
      "40",
      "20",
      "10"
    ],
    "correct": "20",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (10 ÷ 200) ≈ 20 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 200 turns on the primary and 100 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "100",
      "400",
      "200",
      "205"
    ],
    "correct": "200",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (100 ÷ 200) ≈ 200 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 2000 turns on the primary and 400 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "23",
      "46",
      "230",
      "92"
    ],
    "correct": "46",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (400 ÷ 2000) ≈ 46 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 2000 turns on the primary and 500 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "50",
      "200",
      "100",
      "400"
    ],
    "correct": "100",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (500 ÷ 2000) ≈ 100 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 200 turns on the primary and 50 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "50",
      "200",
      "400",
      "100"
    ],
    "correct": "100",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (50 ÷ 200) ≈ 100 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 500 turns on the primary and 25 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "23",
      "230",
      "5.75",
      "11.5"
    ],
    "correct": "11.5",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (25 ÷ 500) ≈ 11.5 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 500 turns on the primary and 50 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "400",
      "40",
      "80",
      "20"
    ],
    "correct": "40",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (50 ÷ 500) ≈ 40 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 200 turns on the primary and 40 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "46",
      "92",
      "230",
      "23"
    ],
    "correct": "46",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (40 ÷ 200) ≈ 46 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 200 turns on the primary and 10 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "23",
      "11.5",
      "5.75",
      "230"
    ],
    "correct": "11.5",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (10 ÷ 200) ≈ 11.5 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 100 turns on the primary and 5 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "230",
      "5.75",
      "11.5",
      "23"
    ],
    "correct": "11.5",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (5 ÷ 100) ≈ 11.5 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 400 turns on the primary and 100 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "50",
      "400",
      "100",
      "200"
    ],
    "correct": "100",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (100 ÷ 400) ≈ 100 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 1000 turns on the primary and 250 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "57.5",
      "28.75",
      "115",
      "230"
    ],
    "correct": "57.5",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (250 ÷ 1000) ≈ 57.5 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 1000 turns on the primary and 500 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "120",
      "230",
      "57.5",
      "115"
    ],
    "correct": "115",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (500 ÷ 1000) ≈ 115 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 1000 turns on the primary and 500 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "200",
      "400",
      "220",
      "100"
    ],
    "correct": "200",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (500 ÷ 1000) ≈ 200 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 500 turns on the primary and 125 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "50",
      "100",
      "400",
      "200"
    ],
    "correct": "100",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (125 ÷ 500) ≈ 100 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 2000 turns on the primary and 1000 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "115",
      "57.5",
      "230",
      "125"
    ],
    "correct": "115",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (1000 ÷ 2000) ≈ 115 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 400 turns on the primary and 80 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "160",
      "400",
      "80",
      "40"
    ],
    "correct": "80",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (80 ÷ 400) ≈ 80 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 1000 turns on the primary and 50 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "5.75",
      "230",
      "11.5",
      "23"
    ],
    "correct": "11.5",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (50 ÷ 1000) ≈ 11.5 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 100 turns on the primary and 20 turns on the secondary, with 400V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "40",
      "160",
      "80",
      "400"
    ],
    "correct": "80",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 400 × (20 ÷ 100) ≈ 80 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 1000 turns on the primary and 100 turns on the secondary, with 230V applied to the primary. Using Vp/Vs = Np/Ns, what is the secondary voltage (approx)?",
    "options": [
      "23",
      "46",
      "11.5",
      "230"
    ],
    "correct": "23",
    "explanation": "Vs = Vp × (Ns ÷ Np) = 230 × (100 ÷ 1000) ≈ 23 V.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A balanced three-phase 400V load draws 10A per line at a power factor of 0.9. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "6.24 kW",
      "12.48 kW",
      "3.12 kW",
      "11.24 kW"
    ],
    "correct": "6.24 kW",
    "explanation": "P = √3 × 400 × 10 × 0.9 ≈ 6.24 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 20A per line at a power factor of 0.85. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "23.56 kW",
      "5.89 kW",
      "11.78 kW",
      "16.78 kW"
    ],
    "correct": "11.78 kW",
    "explanation": "P = √3 × 400 × 20 × 0.85 ≈ 11.78 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 20A per line at a power factor of 0.8. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "5.54 kW",
      "16.09 kW",
      "11.09 kW",
      "22.18 kW"
    ],
    "correct": "11.09 kW",
    "explanation": "P = √3 × 400 × 20 × 0.8 ≈ 11.09 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 5A per line at a power factor of 1.0. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "3.46 kW",
      "8.46 kW",
      "6.92 kW",
      "1.73 kW"
    ],
    "correct": "3.46 kW",
    "explanation": "P = √3 × 400 × 5 × 1.0 ≈ 3.46 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 15A per line at a power factor of 1.0. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "5.2 kW",
      "15.39 kW",
      "20.78 kW",
      "10.39 kW"
    ],
    "correct": "10.39 kW",
    "explanation": "P = √3 × 400 × 15 × 1.0 ≈ 10.39 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 15A per line at a power factor of 0.85. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "4.42 kW",
      "8.83 kW",
      "17.66 kW",
      "13.83 kW"
    ],
    "correct": "8.83 kW",
    "explanation": "P = √3 × 400 × 15 × 0.85 ≈ 8.83 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 20A per line at a power factor of 1.0. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "13.86 kW",
      "6.93 kW",
      "18.86 kW",
      "27.72 kW"
    ],
    "correct": "13.86 kW",
    "explanation": "P = √3 × 400 × 20 × 1.0 ≈ 13.86 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 5A per line at a power factor of 0.8. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "2.77 kW",
      "5.54 kW",
      "1.39 kW",
      "7.77 kW"
    ],
    "correct": "2.77 kW",
    "explanation": "P = √3 × 400 × 5 × 0.8 ≈ 2.77 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 32A per line at a power factor of 1.0. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "11.09 kW",
      "27.17 kW",
      "22.17 kW",
      "44.34 kW"
    ],
    "correct": "22.17 kW",
    "explanation": "P = √3 × 400 × 32 × 1.0 ≈ 22.17 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 25A per line at a power factor of 0.85. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "7.36 kW",
      "19.72 kW",
      "14.72 kW",
      "29.44 kW"
    ],
    "correct": "14.72 kW",
    "explanation": "P = √3 × 400 × 25 × 0.85 ≈ 14.72 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 25A per line at a power factor of 1.0. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "34.64 kW",
      "8.66 kW",
      "22.32 kW",
      "17.32 kW"
    ],
    "correct": "17.32 kW",
    "explanation": "P = √3 × 400 × 25 × 1.0 ≈ 17.32 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 30A per line at a power factor of 0.85. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "17.67 kW",
      "35.34 kW",
      "8.84 kW",
      "22.67 kW"
    ],
    "correct": "17.67 kW",
    "explanation": "P = √3 × 400 × 30 × 0.85 ≈ 17.67 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 10A per line at a power factor of 0.8. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "5.54 kW",
      "11.08 kW",
      "10.54 kW",
      "2.77 kW"
    ],
    "correct": "5.54 kW",
    "explanation": "P = √3 × 400 × 10 × 0.8 ≈ 5.54 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 25A per line at a power factor of 0.8. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "18.86 kW",
      "13.86 kW",
      "27.72 kW",
      "6.93 kW"
    ],
    "correct": "13.86 kW",
    "explanation": "P = √3 × 400 × 25 × 0.8 ≈ 13.86 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 30A per line at a power factor of 1.0. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "20.78 kW",
      "41.56 kW",
      "10.39 kW",
      "25.78 kW"
    ],
    "correct": "20.78 kW",
    "explanation": "P = √3 × 400 × 30 × 1.0 ≈ 20.78 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 15A per line at a power factor of 0.9. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "14.35 kW",
      "18.7 kW",
      "4.67 kW",
      "9.35 kW"
    ],
    "correct": "9.35 kW",
    "explanation": "P = √3 × 400 × 15 × 0.9 ≈ 9.35 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 10A per line at a power factor of 1.0. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "6.93 kW",
      "3.46 kW",
      "13.86 kW",
      "11.93 kW"
    ],
    "correct": "6.93 kW",
    "explanation": "P = √3 × 400 × 10 × 1.0 ≈ 6.93 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 30A per line at a power factor of 0.9. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "18.71 kW",
      "37.42 kW",
      "9.36 kW",
      "23.71 kW"
    ],
    "correct": "18.71 kW",
    "explanation": "P = √3 × 400 × 30 × 0.9 ≈ 18.71 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 25A per line at a power factor of 0.9. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "15.59 kW",
      "31.18 kW",
      "20.59 kW",
      "7.79 kW"
    ],
    "correct": "15.59 kW",
    "explanation": "P = √3 × 400 × 25 × 0.9 ≈ 15.59 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase 400V load draws 10A per line at a power factor of 0.85. Using P = √3 × V × I × cos φ, what is the approximate power (kW)?",
    "options": [
      "11.78 kW",
      "5.89 kW",
      "10.89 kW",
      "2.94 kW"
    ],
    "correct": "5.89 kW",
    "explanation": "P = √3 × 400 × 10 × 0.85 ≈ 5.89 kW.",
    "topic": "Three-phase power"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 50Hz?",
    "options": [
      "0.02 s",
      "0.01 s",
      "0.04 s",
      "0.03 s"
    ],
    "correct": "0.02 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 50 = 0.02 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 60Hz?",
    "options": [
      "0.0167 s",
      "0.0334 s",
      "0.0267 s",
      "0.0083 s"
    ],
    "correct": "0.0167 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 60 = 0.0167 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 25Hz?",
    "options": [
      "0.05 s",
      "0.08 s",
      "0.04 s",
      "0.02 s"
    ],
    "correct": "0.04 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 25 = 0.04 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 100Hz?",
    "options": [
      "0.005 s",
      "0.01 s",
      "0.02 s",
      "0.0549 s"
    ],
    "correct": "0.01 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 100 = 0.01 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 10Hz?",
    "options": [
      "0.11 s",
      "0.2 s",
      "0.1 s",
      "0.05 s"
    ],
    "correct": "0.1 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 10 = 0.1 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 20Hz?",
    "options": [
      "0.06 s",
      "0.025 s",
      "0.1 s",
      "0.05 s"
    ],
    "correct": "0.05 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 20 = 0.05 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 5Hz?",
    "options": [
      "0.2 s",
      "0.4 s",
      "0.21 s",
      "0.1 s"
    ],
    "correct": "0.2 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 5 = 0.2 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 2Hz?",
    "options": [
      "0.25 s",
      "0.51 s",
      "0.5 s",
      "1.0 s"
    ],
    "correct": "0.5 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 2 = 0.5 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 1Hz?",
    "options": [
      "2.0 s",
      "1.01 s",
      "1.0 s",
      "0.5 s"
    ],
    "correct": "1.0 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 1 = 1.0 s.",
    "topic": "AC theory"
  },
  {
    "text": "Using T = 1 ÷ f, what is the period of a supply with a frequency of 400Hz?",
    "options": [
      "0.0125 s",
      "0.0013 s",
      "0.0025 s",
      "0.005 s"
    ],
    "correct": "0.0025 s",
    "explanation": "T = 1 ÷ f = 1 ÷ 400 = 0.0025 s.",
    "topic": "AC theory"
  },
  {
    "text": "What is the standard mains supply frequency in the UK?",
    "options": [
      "25Hz",
      "50Hz",
      "100Hz",
      "60Hz"
    ],
    "correct": "50Hz",
    "explanation": "The UK mains supply operates at a nominal frequency of 50Hz (compared to 60Hz used in North America).",
    "topic": "AC theory"
  },
  {
    "text": "In an AC sine wave, what does 'RMS' (root mean square) voltage represent?",
    "options": [
      "The average voltage over one full cycle (which is zero)",
      "The peak voltage of the wave",
      "The lowest voltage reached in the cycle",
      "The equivalent DC voltage that would produce the same heating effect"
    ],
    "correct": "The equivalent DC voltage that would produce the same heating effect",
    "explanation": "RMS value represents the equivalent steady DC value that would deliver the same power/heating effect as the alternating waveform.",
    "topic": "AC theory"
  },
  {
    "text": "For a UK 230V RMS mains supply, what is the approximate peak voltage?",
    "options": [
      "≈325V",
      "≈230V",
      "≈400V",
      "≈115V"
    ],
    "correct": "≈325V",
    "explanation": "Peak voltage ≈ RMS × √2 ≈ 230 × 1.414 ≈ 325V.",
    "topic": "AC theory"
  },
  {
    "text": "A circuit has a resistance of 3Ω and a current of 4A flowing through it. Using Ohm's Law, what is the supply voltage?",
    "options": [
      "9.32V",
      "8.05V",
      "12V",
      "16.07V"
    ],
    "correct": "12V",
    "explanation": "Using V = I × R: V = 4 × 3 = 12V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A resistor of 4Ω is connected across a 24V supply. Using Ohm's Law, what current flows through it?",
    "options": [
      "7.4A",
      "1.93A",
      "4.44A",
      "6A"
    ],
    "correct": "6A",
    "explanation": "Using I = V ÷ R: I = 24 ÷ 4 = 6A.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A load draws 3A from a 9V supply. Using Ohm's Law, what is the resistance of the load?",
    "options": [
      "1.41Ω",
      "2.38Ω",
      "3Ω",
      "1.96Ω"
    ],
    "correct": "3Ω",
    "explanation": "Using R = V ÷ I: R = 9 ÷ 3 = 3Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a resistance of 6Ω and a current of 8A flowing through it. Using Ohm's Law, what is the supply voltage?",
    "options": [
      "48V",
      "24.07V",
      "64.27V",
      "22.76V"
    ],
    "correct": "48V",
    "explanation": "Using V = I × R: V = 8 × 6 = 48V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A resistor of 5Ω is connected across a 110V supply. Using Ohm's Law, what current flows through it?",
    "options": [
      "22A",
      "10.35A",
      "26.89A",
      "15.62A"
    ],
    "correct": "22A",
    "explanation": "Using I = V ÷ R: I = 110 ÷ 5 = 22A.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A load draws 46A from a 230V supply. Using Ohm's Law, what is the resistance of the load?",
    "options": [
      "3.74Ω",
      "5.9Ω",
      "5Ω",
      "6.36Ω"
    ],
    "correct": "5Ω",
    "explanation": "Using R = V ÷ I: R = 230 ÷ 46 = 5Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a resistance of 3Ω and a current of 2A flowing through it. Using Ohm's Law, what is the supply voltage?",
    "options": [
      "7.6V",
      "6V",
      "4.09V",
      "7.31V"
    ],
    "correct": "6V",
    "explanation": "Using V = I × R: V = 2 × 3 = 6V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A resistor of 2Ω is connected across a 18V supply. Using Ohm's Law, what current flows through it?",
    "options": [
      "10.86A",
      "6.33A",
      "9A",
      "10.39A"
    ],
    "correct": "9A",
    "explanation": "Using I = V ÷ R: I = 18 ÷ 2 = 9A.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A load draws 12A from a 36V supply. Using Ohm's Law, what is the resistance of the load?",
    "options": [
      "3.49Ω",
      "2.11Ω",
      "4Ω",
      "3Ω"
    ],
    "correct": "3Ω",
    "explanation": "Using R = V ÷ I: R = 36 ÷ 12 = 3Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a resistance of 4Ω and a current of 15A flowing through it. Using Ohm's Law, what is the supply voltage?",
    "options": [
      "75.59V",
      "101.68V",
      "60V",
      "79.37V"
    ],
    "correct": "60V",
    "explanation": "Using V = I × R: V = 15 × 4 = 60V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A resistor of 4Ω is connected across a 100V supply. Using Ohm's Law, what current flows through it?",
    "options": [
      "25A",
      "19.94A",
      "20.37A",
      "17.38A"
    ],
    "correct": "25A",
    "explanation": "Using I = V ÷ R: I = 100 ÷ 4 = 25A.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A load draws 1A from a 5V supply. Using Ohm's Law, what is the resistance of the load?",
    "options": [
      "6.15Ω",
      "2.59Ω",
      "8.41Ω",
      "5Ω"
    ],
    "correct": "5Ω",
    "explanation": "Using R = V ÷ I: R = 5 ÷ 1 = 5Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a resistance of 3Ω and a current of 5A flowing through it. Using Ohm's Law, what is the supply voltage?",
    "options": [
      "9.89V",
      "15V",
      "12.18V",
      "17.74V"
    ],
    "correct": "15V",
    "explanation": "Using V = I × R: V = 5 × 3 = 15V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A resistor of 4Ω is connected across a 44V supply. Using Ohm's Law, what current flows through it?",
    "options": [
      "14A",
      "11A",
      "8A",
      "18.5A"
    ],
    "correct": "11A",
    "explanation": "Using I = V ÷ R: I = 44 ÷ 4 = 11A.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A load draws 8A from a 72V supply. Using Ohm's Law, what is the resistance of the load?",
    "options": [
      "7.47Ω",
      "9Ω",
      "11.22Ω",
      "6.12Ω"
    ],
    "correct": "9Ω",
    "explanation": "Using R = V ÷ I: R = 72 ÷ 8 = 9Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a resistance of 9Ω and a current of 6A flowing through it. Using Ohm's Law, what is the supply voltage?",
    "options": [
      "37.71V",
      "73.37V",
      "33.37V",
      "54V"
    ],
    "correct": "54V",
    "explanation": "Using V = I × R: V = 6 × 9 = 54V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A resistor of 5Ω is connected across a 20V supply. Using Ohm's Law, what current flows through it?",
    "options": [
      "5.33A",
      "6.22A",
      "4A",
      "1.95A"
    ],
    "correct": "4A",
    "explanation": "Using I = V ÷ R: I = 20 ÷ 5 = 4A.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A load draws 11A from a 33V supply. Using Ohm's Law, what is the resistance of the load?",
    "options": [
      "3Ω",
      "3.89Ω",
      "3.73Ω",
      "2.43Ω"
    ],
    "correct": "3Ω",
    "explanation": "Using R = V ÷ I: R = 33 ÷ 11 = 3Ω.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A circuit has a resistance of 2Ω and a current of 8A flowing through it. Using Ohm's Law, what is the supply voltage?",
    "options": [
      "12.1V",
      "18.66V",
      "8.11V",
      "16V"
    ],
    "correct": "16V",
    "explanation": "Using V = I × R: V = 8 × 2 = 16V.",
    "topic": "Ohm's Law"
  },
  {
    "text": "A resistor of 9Ω is connected across a 81V supply. Using Ohm's Law, what current flows through it?",
    "options": [
      "6.15A",
      "11.95A",
      "9A",
      "11.76A"
    ],
    "correct": "9A",
    "explanation": "Using I = V ÷ R: I = 81 ÷ 9 = 9A.",
    "topic": "Ohm's Law"
  },
  {
    "text": "An appliance operates at 230V and draws 2A. What power does it consume (P = V × I)?",
    "options": [
      "460W",
      "375.36W",
      "565.93W",
      "377.09W"
    ],
    "correct": "460W",
    "explanation": "P = V × I = 230 × 2 = 460W.",
    "topic": "Power calculations"
  },
  {
    "text": "An appliance operates at 230V and draws 5A. What power does it consume (P = V × I)?",
    "options": [
      "856.39W",
      "795.16W",
      "1150W",
      "1566.72W"
    ],
    "correct": "1150W",
    "explanation": "P = V × I = 230 × 5 = 1150W.",
    "topic": "Power calculations"
  },
  {
    "text": "An appliance operates at 230V and draws 10A. What power does it consume (P = V × I)?",
    "options": [
      "1839.16W",
      "1603.71W",
      "2895.4W",
      "2300W"
    ],
    "correct": "2300W",
    "explanation": "P = V × I = 230 × 10 = 2300W.",
    "topic": "Power calculations"
  },
  {
    "text": "An appliance operates at 110V and draws 4A. What power does it consume (P = V × I)?",
    "options": [
      "717.58W",
      "214.4W",
      "688.6W",
      "440W"
    ],
    "correct": "440W",
    "explanation": "P = V × I = 110 × 4 = 440W.",
    "topic": "Power calculations"
  },
  {
    "text": "An appliance operates at 400V and draws 3A. What power does it consume (P = V × I)?",
    "options": [
      "833.75W",
      "772.05W",
      "1200W",
      "886.45W"
    ],
    "correct": "1200W",
    "explanation": "P = V × I = 400 × 3 = 1200W.",
    "topic": "Power calculations"
  },
  {
    "text": "An appliance operates at 12V and draws 5A. What power does it consume (P = V × I)?",
    "options": [
      "41.88W",
      "60W",
      "48.7W",
      "29.81W"
    ],
    "correct": "60W",
    "explanation": "P = V × I = 12 × 5 = 60W.",
    "topic": "Power calculations"
  },
  {
    "text": "An appliance operates at 24V and draws 2A. What power does it consume (P = V × I)?",
    "options": [
      "60.07W",
      "64.06W",
      "48W",
      "71.09W"
    ],
    "correct": "48W",
    "explanation": "P = V × I = 24 × 2 = 48W.",
    "topic": "Power calculations"
  },
  {
    "text": "An appliance operates at 230V and draws 8.7A. What power does it consume (P = V × I)?",
    "options": [
      "1615.73W",
      "1432.25W",
      "1543.83W",
      "2001W"
    ],
    "correct": "2001W",
    "explanation": "P = V × I = 230 × 8.7 = 2001W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 2A flows through a 10Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "47.76W",
      "31.98W",
      "40W",
      "53.08W"
    ],
    "correct": "40W",
    "explanation": "P = I² × R = 2² × 10 = 4 × 10 = 40W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 5A flows through a 8Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "243.56W",
      "200W",
      "261.56W",
      "285.48W"
    ],
    "correct": "200W",
    "explanation": "P = I² × R = 5² × 8 = 25 × 8 = 200W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 3A flows through a 15Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "193.4W",
      "88.15W",
      "169.08W",
      "135W"
    ],
    "correct": "135W",
    "explanation": "P = I² × R = 3² × 15 = 9 × 15 = 135W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 1.5A flows through a 20Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "45W",
      "65.81W",
      "58.55W",
      "52.11W"
    ],
    "correct": "45W",
    "explanation": "P = I² × R = 1.5² × 20 = 2.25 × 20 = 45W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 4A flows through a 6Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "73.43W",
      "160.83W",
      "56.48W",
      "96W"
    ],
    "correct": "96W",
    "explanation": "P = I² × R = 4² × 6 = 16 × 6 = 96W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 0.5A flows through a 40Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "13.05W",
      "13.35W",
      "10W",
      "8.37W"
    ],
    "correct": "10W",
    "explanation": "P = I² × R = 0.5² × 40 = 0.25 × 40 = 10W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 10A flows through a 2Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "251.24W",
      "200W",
      "162.75W",
      "131.23W"
    ],
    "correct": "200W",
    "explanation": "P = I² × R = 10² × 2 = 100 × 2 = 200W.",
    "topic": "Power calculations"
  },
  {
    "text": "A current of 6A flows through a 12Ω resistor. What power is dissipated (P = I² × R)?",
    "options": [
      "499.99W",
      "322.77W",
      "432W",
      "526.78W"
    ],
    "correct": "432W",
    "explanation": "P = I² × R = 6² × 12 = 36 × 12 = 432W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 529Ω heating element is connected to a 230V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "100W",
      "137.94W",
      "125.92W",
      "128.75W"
    ],
    "correct": "100W",
    "explanation": "P = V² ÷ R = 230² ÷ 529 = 52900 ÷ 529 = 100W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 4Ω heating element is connected to a 12V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "36W",
      "24.57W",
      "26.1W",
      "42.58W"
    ],
    "correct": "36W",
    "explanation": "P = V² ÷ R = 12² ÷ 4 = 144 ÷ 4 = 36W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 12Ω heating element is connected to a 24V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "48W",
      "56.98W",
      "55.23W",
      "34.15W"
    ],
    "correct": "48W",
    "explanation": "P = V² ÷ R = 24² ÷ 12 = 576 ÷ 12 = 48W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 55Ω heating element is connected to a 110V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "185.48W",
      "220W",
      "269.79W",
      "171.31W"
    ],
    "correct": "220W",
    "explanation": "P = V² ÷ R = 110² ÷ 55 = 12100 ÷ 55 = 220W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 115Ω heating element is connected to a 230V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "354.24W",
      "344.56W",
      "460W",
      "366.7W"
    ],
    "correct": "460W",
    "explanation": "P = V² ÷ R = 230² ÷ 115 = 52900 ÷ 115 = 460W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 24Ω heating element is connected to a 48V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "122.49W",
      "41.95W",
      "96W",
      "154.15W"
    ],
    "correct": "96W",
    "explanation": "P = V² ÷ R = 48² ÷ 24 = 2304 ÷ 24 = 96W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 3Ω heating element is connected to a 6V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "8.19W",
      "4.03W",
      "19.12W",
      "12W"
    ],
    "correct": "12W",
    "explanation": "P = V² ÷ R = 6² ÷ 3 = 36 ÷ 3 = 12W.",
    "topic": "Power calculations"
  },
  {
    "text": "A 200Ω heating element is connected to a 400V supply. What power does it dissipate (P = V² ÷ R)?",
    "options": [
      "1073.52W",
      "675.01W",
      "1218.73W",
      "800W"
    ],
    "correct": "800W",
    "explanation": "P = V² ÷ R = 400² ÷ 200 = 160000 ÷ 200 = 800W.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 2300W and connected to a 230V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "4.01A",
      "10A",
      "12.03A",
      "7.18A"
    ],
    "correct": "10A",
    "explanation": "I = P ÷ V = 2300 ÷ 230 = 10A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 1000W and connected to a 230V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "4.35A",
      "5.74A",
      "3.05A",
      "5.2A"
    ],
    "correct": "4.35A",
    "explanation": "I = P ÷ V = 1000 ÷ 230 = 4.35A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 3000W and connected to a 230V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "10.88A",
      "13.04A",
      "5.91A",
      "18.28A"
    ],
    "correct": "13.04A",
    "explanation": "I = P ÷ V = 3000 ÷ 230 = 13.04A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 500W and connected to a 110V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "4.55A",
      "6.11A",
      "3.25A",
      "3.43A"
    ],
    "correct": "4.55A",
    "explanation": "I = P ÷ V = 500 ÷ 110 = 4.55A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 2400W and connected to a 400V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "6.92A",
      "9.64A",
      "4.73A",
      "6A"
    ],
    "correct": "6A",
    "explanation": "I = P ÷ V = 2400 ÷ 400 = 6A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 60W and connected to a 12V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "6.7A",
      "3.67A",
      "5A",
      "6.14A"
    ],
    "correct": "5A",
    "explanation": "I = P ÷ V = 60 ÷ 12 = 5A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 100W and connected to a 24V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "3.13A",
      "4.17A",
      "5.36A",
      "4.81A"
    ],
    "correct": "4.17A",
    "explanation": "I = P ÷ V = 100 ÷ 24 = 4.17A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 750W and connected to a 230V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "2.22A",
      "3.97A",
      "4.24A",
      "3.26A"
    ],
    "correct": "3.26A",
    "explanation": "I = P ÷ V = 750 ÷ 230 = 3.26A.",
    "topic": "Power calculations"
  },
  {
    "text": "An electric heater is rated at 2000W and connected to a 230V supply. What current does it draw (I = P ÷ V)?",
    "options": [
      "6.76A",
      "10.44A",
      "8.7A",
      "12.66A"
    ],
    "correct": "8.7A",
    "explanation": "I = P ÷ V = 2000 ÷ 230 = 8.7A.",
    "topic": "Power calculations"
  },
  {
    "text": "Three resistors of 10Ω + 20Ω + 30Ω are connected in series. What is the total circuit resistance?",
    "options": [
      "39.35Ω",
      "40.76Ω",
      "60Ω",
      "76.62Ω"
    ],
    "correct": "60Ω",
    "explanation": "In series, resistances simply add: RT = 10Ω + 20Ω + 30Ω = 60Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Three resistors of 5Ω + 15Ω + 25Ω are connected in series. What is the total circuit resistance?",
    "options": [
      "74.94Ω",
      "45Ω",
      "74.42Ω",
      "31.77Ω"
    ],
    "correct": "45Ω",
    "explanation": "In series, resistances simply add: RT = 5Ω + 15Ω + 25Ω = 45Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Three resistors of 100Ω + 220Ω + 330Ω are connected in series. What is the total circuit resistance?",
    "options": [
      "971.25Ω",
      "650Ω",
      "784.13Ω",
      "530.3Ω"
    ],
    "correct": "650Ω",
    "explanation": "In series, resistances simply add: RT = 100Ω + 220Ω + 330Ω = 650Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Three resistors of 2Ω + 4Ω + 6Ω are connected in series. What is the total circuit resistance?",
    "options": [
      "16.17Ω",
      "12Ω",
      "17.92Ω",
      "8.04Ω"
    ],
    "correct": "12Ω",
    "explanation": "In series, resistances simply add: RT = 2Ω + 4Ω + 6Ω = 12Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Three resistors of 47Ω + 68Ω + 100Ω are connected in series. What is the total circuit resistance?",
    "options": [
      "253.25Ω",
      "286.22Ω",
      "178.85Ω",
      "215Ω"
    ],
    "correct": "215Ω",
    "explanation": "In series, resistances simply add: RT = 47Ω + 68Ω + 100Ω = 215Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Three resistors of 12Ω + 18Ω + 24Ω are connected in series. What is the total circuit resistance?",
    "options": [
      "54Ω",
      "75.78Ω",
      "78.47Ω",
      "18.64Ω"
    ],
    "correct": "54Ω",
    "explanation": "In series, resistances simply add: RT = 12Ω + 18Ω + 24Ω = 54Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 10Ω and 10Ω are connected in parallel. What is the total resistance?",
    "options": [
      "6.5Ω",
      "6.32Ω",
      "5Ω",
      "2.13Ω"
    ],
    "correct": "5Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (10×10)÷(10+10) = 5Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 20Ω and 20Ω are connected in parallel. What is the total resistance?",
    "options": [
      "10Ω",
      "8.25Ω",
      "12.36Ω",
      "5.46Ω"
    ],
    "correct": "10Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (20×20)÷(20+20) = 10Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 6Ω and 3Ω are connected in parallel. What is the total resistance?",
    "options": [
      "1.61Ω",
      "1.34Ω",
      "2.69Ω",
      "2Ω"
    ],
    "correct": "2Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (6×3)÷(6+3) = 2Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 12Ω and 4Ω are connected in parallel. What is the total resistance?",
    "options": [
      "3Ω",
      "2.08Ω",
      "2.22Ω",
      "2.16Ω"
    ],
    "correct": "3Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (12×4)÷(12+4) = 3Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 100Ω and 100Ω are connected in parallel. What is the total resistance?",
    "options": [
      "33.59Ω",
      "64.49Ω",
      "38.62Ω",
      "50Ω"
    ],
    "correct": "50Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (100×100)÷(100+100) = 50Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 60Ω and 30Ω are connected in parallel. What is the total resistance?",
    "options": [
      "24.11Ω",
      "15.1Ω",
      "20Ω",
      "16.88Ω"
    ],
    "correct": "20Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (60×30)÷(60+30) = 20Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 15Ω and 10Ω are connected in parallel. What is the total resistance?",
    "options": [
      "3Ω",
      "8.01Ω",
      "6Ω",
      "7Ω"
    ],
    "correct": "6Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (15×10)÷(15+10) = 6Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 8Ω and 8Ω are connected in parallel. What is the total resistance?",
    "options": [
      "3.24Ω",
      "4.89Ω",
      "4Ω",
      "3.39Ω"
    ],
    "correct": "4Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (8×8)÷(8+8) = 4Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "Two resistors of 30Ω and 60Ω are connected in parallel. What is the total resistance?",
    "options": [
      "13.41Ω",
      "20Ω",
      "13.19Ω",
      "23.89Ω"
    ],
    "correct": "20Ω",
    "explanation": "For two resistors in parallel: RT = (R1×R2)÷(R1+R2) = (30×60)÷(30+60) = 20Ω.",
    "topic": "Series & parallel circuits"
  },
  {
    "text": "A resistor has the colour bands brown, black, red (no tolerance band shown). What is its resistance value?",
    "options": [
      "500Ω",
      "10kΩ",
      "1kΩ",
      "5kΩ"
    ],
    "correct": "1kΩ",
    "explanation": "Brown = 1, black = 0, giving the digits 10; red is the multiplier (×100), so the value is 10 × 100 = 1kΩ.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands red, red, orange (no tolerance band shown). What is its resistance value?",
    "options": [
      "110kΩ",
      "220kΩ",
      "22kΩ",
      "11kΩ"
    ],
    "correct": "22kΩ",
    "explanation": "Red = 2, red = 2, giving the digits 22; orange is the multiplier (×1000), so the value is 22 × 1000 = 22kΩ.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands yellow, violet, red (no tolerance band shown). What is its resistance value?",
    "options": [
      "4.7kΩ",
      "2.35kΩ",
      "47kΩ",
      "9.4kΩ"
    ],
    "correct": "4.7kΩ",
    "explanation": "Yellow = 4, violet = 7, giving the digits 47; red is the multiplier (×100), so the value is 47 × 100 = 4.7kΩ.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands green, blue, yellow (no tolerance band shown). What is its resistance value?",
    "options": [
      "1.12MΩ",
      "5.6MΩ",
      "2.8MΩ",
      "560kΩ"
    ],
    "correct": "560kΩ",
    "explanation": "Green = 5, blue = 6, giving the digits 56; yellow is the multiplier (×10000), so the value is 56 × 10000 = 560kΩ.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands orange, orange, brown (no tolerance band shown). What is its resistance value?",
    "options": [
      "3.3kΩ",
      "330Ω",
      "660Ω",
      "165Ω"
    ],
    "correct": "330Ω",
    "explanation": "Orange = 3, orange = 3, giving the digits 33; brown is the multiplier (×10), so the value is 33 × 10 = 330Ω.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands brown, grey, brown (no tolerance band shown). What is its resistance value?",
    "options": [
      "90Ω",
      "18Ω",
      "360Ω",
      "180Ω"
    ],
    "correct": "180Ω",
    "explanation": "Brown = 1, grey = 8, giving the digits 18; brown is the multiplier (×10), so the value is 18 × 10 = 180Ω.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands red, black, brown (no tolerance band shown). What is its resistance value?",
    "options": [
      "400Ω",
      "100Ω",
      "20Ω",
      "200Ω"
    ],
    "correct": "200Ω",
    "explanation": "Red = 2, black = 0, giving the digits 20; brown is the multiplier (×10), so the value is 20 × 10 = 200Ω.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands blue, grey, black (no tolerance band shown). What is its resistance value?",
    "options": [
      "68Ω",
      "340Ω",
      "680Ω",
      "136Ω"
    ],
    "correct": "68Ω",
    "explanation": "Blue = 6, grey = 8, giving the digits 68; black is the multiplier (×1), so the value is 68 × 1 = 68Ω.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands yellow, black, black (no tolerance band shown). What is its resistance value?",
    "options": [
      "20Ω",
      "40Ω",
      "4Ω",
      "80Ω"
    ],
    "correct": "40Ω",
    "explanation": "Yellow = 4, black = 0, giving the digits 40; black is the multiplier (×1), so the value is 40 × 1 = 40Ω.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands white, brown, red (no tolerance band shown). What is its resistance value?",
    "options": [
      "9.1kΩ",
      "910Ω",
      "4.55kΩ",
      "18.2kΩ"
    ],
    "correct": "9.1kΩ",
    "explanation": "White = 9, brown = 1, giving the digits 91; red is the multiplier (×100), so the value is 91 × 100 = 9.1kΩ.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands grey, red, orange (no tolerance band shown). What is its resistance value?",
    "options": [
      "8.2kΩ",
      "164kΩ",
      "82kΩ",
      "410kΩ"
    ],
    "correct": "82kΩ",
    "explanation": "Grey = 8, red = 2, giving the digits 82; orange is the multiplier (×1000), so the value is 82 × 1000 = 82kΩ.",
    "topic": "Resistor colour code"
  },
  {
    "text": "A resistor has the colour bands violet, green, gold (no tolerance band shown). What is its resistance value?",
    "options": [
      "0.75Ω",
      "15Ω",
      "37.5Ω",
      "7.5Ω"
    ],
    "correct": "7.5Ω",
    "explanation": "Violet = 7, green = 5, giving the digits 75; gold is the multiplier (×0.1), so the value is 75 × 0.1 = 7.5Ω.",
    "topic": "Resistor colour code"
  },
  {
    "text": "On a resistor's colour code, what tolerance does a gold tolerance band represent?",
    "options": [
      "±5%",
      "±10%",
      "±20%",
      "±1%"
    ],
    "correct": "±5%",
    "explanation": "A gold tolerance band indicates a tolerance of ±5% from the marked resistance value.",
    "topic": "Resistor colour code"
  },
  {
    "text": "On a resistor's colour code, what tolerance does a silver tolerance band represent?",
    "options": [
      "±10%",
      "±2%",
      "±5%",
      "±20%"
    ],
    "correct": "±10%",
    "explanation": "A silver tolerance band indicates a tolerance of ±10% from the marked resistance value.",
    "topic": "Resistor colour code"
  },
  {
    "text": "On a resistor's colour code, what tolerance does a brown tolerance band represent?",
    "options": [
      "±10%",
      "±1%",
      "±20%",
      "±5%"
    ],
    "correct": "±1%",
    "explanation": "A brown tolerance band indicates a tolerance of ±1% from the marked resistance value.",
    "topic": "Resistor colour code"
  },
  {
    "text": "On a resistor's colour code, what tolerance does a red tolerance band represent?",
    "options": [
      "±20%",
      "±5%",
      "±10%",
      "±2%"
    ],
    "correct": "±2%",
    "explanation": "A red tolerance band indicates a tolerance of ±2% from the marked resistance value.",
    "topic": "Resistor colour code"
  },
  {
    "text": "An appliance rated at 2000W is used for 3 hours. At an electricity price of 30p per kWh, what is the cost of running it?",
    "options": [
      "£1.13",
      "£1.8",
      "£2.38",
      "£2.71"
    ],
    "correct": "£1.8",
    "explanation": "Energy = (W ÷ 1000) × hours = (2000 ÷ 1000) × 3 = 6kWh. Cost = 6 × 30p = 180p = £1.8.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 1000W is used for 5 hours. At an electricity price of 28p per kWh, what is the cost of running it?",
    "options": [
      "£0.68",
      "£1.4",
      "£1.06",
      "£1.02"
    ],
    "correct": "£1.4",
    "explanation": "Energy = (W ÷ 1000) × hours = (1000 ÷ 1000) × 5 = 5kWh. Cost = 5 × 28p = 140p = £1.4.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 3000W is used for 2 hours. At an electricity price of 32p per kWh, what is the cost of running it?",
    "options": [
      "£1.31",
      "£1.92",
      "£1.33",
      "£1.62"
    ],
    "correct": "£1.92",
    "explanation": "Energy = (W ÷ 1000) × hours = (3000 ÷ 1000) × 2 = 6kWh. Cost = 6 × 32p = 192p = £1.92.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 500W is used for 10 hours. At an electricity price of 25p per kWh, what is the cost of running it?",
    "options": [
      "£1.25",
      "£0.89",
      "£1.83",
      "£0.9"
    ],
    "correct": "£1.25",
    "explanation": "Energy = (W ÷ 1000) × hours = (500 ÷ 1000) × 10 = 5kWh. Cost = 5 × 25p = 125p = £1.25.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 2500W is used for 4 hours. At an electricity price of 30p per kWh, what is the cost of running it?",
    "options": [
      "£3.49",
      "£2.51",
      "£3.51",
      "£3"
    ],
    "correct": "£3",
    "explanation": "Energy = (W ÷ 1000) × hours = (2500 ÷ 1000) × 4 = 10kWh. Cost = 10 × 30p = 300p = £3.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 1500W is used for 6 hours. At an electricity price of 27p per kWh, what is the cost of running it?",
    "options": [
      "£1.69",
      "£1.24",
      "£2.43",
      "£3.57"
    ],
    "correct": "£2.43",
    "explanation": "Energy = (W ÷ 1000) × hours = (1500 ÷ 1000) × 6 = 9kWh. Cost = 9 × 27p = 243p = £2.43.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 100W is used for 24 hours. At an electricity price of 22p per kWh, what is the cost of running it?",
    "options": [
      "£0.61",
      "£0.45",
      "£0.53",
      "£0.34"
    ],
    "correct": "£0.53",
    "explanation": "Energy = (W ÷ 1000) × hours = (100 ÷ 1000) × 24 = 2.4kWh. Cost = 2.4 × 22p = 52.8p = £0.53.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 4000W is used for 1.5 hours. At an electricity price of 29p per kWh, what is the cost of running it?",
    "options": [
      "£1.34",
      "£2.62",
      "£1.33",
      "£1.74"
    ],
    "correct": "£1.74",
    "explanation": "Energy = (W ÷ 1000) × hours = (4000 ÷ 1000) × 1.5 = 6kWh. Cost = 6 × 29p = 174p = £1.74.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 750W is used for 8 hours. At an electricity price of 26p per kWh, what is the cost of running it?",
    "options": [
      "£1.56",
      "£1.31",
      "£1.26",
      "£1.19"
    ],
    "correct": "£1.56",
    "explanation": "Energy = (W ÷ 1000) × hours = (750 ÷ 1000) × 8 = 6kWh. Cost = 6 × 26p = 156p = £1.56.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 1200W is used for 3.5 hours. At an electricity price of 31p per kWh, what is the cost of running it?",
    "options": [
      "£1.09",
      "£1.3",
      "£1.66",
      "£1.1"
    ],
    "correct": "£1.3",
    "explanation": "Energy = (W ÷ 1000) × hours = (1200 ÷ 1000) × 3.5 = 4.2kWh. Cost = 4.2 × 31p = 130.2p = £1.3.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 2200W is used for 2.5 hours. At an electricity price of 28p per kWh, what is the cost of running it?",
    "options": [
      "£1.54",
      "£1.09",
      "£2.56",
      "£1.83"
    ],
    "correct": "£1.54",
    "explanation": "Energy = (W ÷ 1000) × hours = (2200 ÷ 1000) × 2.5 = 5.5kWh. Cost = 5.5 × 28p = 154p = £1.54.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "An appliance rated at 60W is used for 10 hours. At an electricity price of 25p per kWh, what is the cost of running it?",
    "options": [
      "£0.15",
      "£0.12",
      "£0.19",
      "£0.21"
    ],
    "correct": "£0.15",
    "explanation": "Energy = (W ÷ 1000) × hours = (60 ÷ 1000) × 10 = 0.6kWh. Cost = 0.6 × 25p = 15p = £0.15.",
    "topic": "Energy & cost calculations"
  },
  {
    "text": "In a balanced three-phase star (wye) connected system, if the phase voltage is 230V, what is the approximate line voltage?",
    "options": [
      "230V",
      "400V",
      "115V",
      "690V"
    ],
    "correct": "400V",
    "explanation": "In a star connection, VL = √3 × Vphase = 1.732 × 230 ≈ 400V.",
    "topic": "Three-phase power"
  },
  {
    "text": "In a balanced three-phase star (wye) connected system, if the line voltage is 400V, what is the approximate phase voltage?",
    "options": [
      "400V",
      "230V",
      "690V",
      "115V"
    ],
    "correct": "230V",
    "explanation": "In a star connection, Vphase = VL ÷ √3 = 400 ÷ 1.732 ≈ 230V.",
    "topic": "Three-phase power"
  },
  {
    "text": "In a delta-connected three-phase system, how does the line voltage compare to the phase voltage?",
    "options": [
      "Line voltage equals phase voltage",
      "Line voltage is √3 times phase voltage",
      "Line voltage is half the phase voltage",
      "Line voltage is 3 times phase voltage"
    ],
    "correct": "Line voltage equals phase voltage",
    "explanation": "In a delta connection, each phase winding is connected directly between two lines, so VL = Vphase.",
    "topic": "Three-phase power"
  },
  {
    "text": "In a delta-connected three-phase system, how does the line current compare to the phase current?",
    "options": [
      "Line current equals phase current",
      "Line current is √3 times phase current",
      "Line current is half the phase current",
      "Line current is 3 times phase current"
    ],
    "correct": "Line current is √3 times phase current",
    "explanation": "In a delta connection, IL = √3 × Iphase because each line current is the vector sum of two phase currents.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase load draws 20A per line from a 400V line voltage supply at a power factor of 0.8. What is the total three-phase power (P = √3 × VL × IL × cosφ)?",
    "options": [
      "9141.86W",
      "8800.84W",
      "13398.05W",
      "11084.8W"
    ],
    "correct": "11084.8W",
    "explanation": "P = √3 × VL × IL × cosφ = 1.732 × 400 × 20 × 0.8 ≈ 11084.8W.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase load draws 15A per line from a 400V line voltage supply at a power factor of 1. What is the total three-phase power (P = √3 × VL × IL × cosφ)?",
    "options": [
      "8466.87W",
      "10392W",
      "8641.59W",
      "12877.15W"
    ],
    "correct": "10392W",
    "explanation": "P = √3 × VL × IL × cosφ = 1.732 × 400 × 15 × 1 ≈ 10392W.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase load draws 10A per line from a 400V line voltage supply at a power factor of 0.9. What is the total three-phase power (P = √3 × VL × IL × cosφ)?",
    "options": [
      "4553.73W",
      "8044.62W",
      "6235.2W",
      "4148.17W"
    ],
    "correct": "6235.2W",
    "explanation": "P = √3 × VL × IL × cosφ = 1.732 × 400 × 10 × 0.9 ≈ 6235.2W.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase load draws 30A per line from a 400V line voltage supply at a power factor of 0.85. What is the total three-phase power (P = √3 × VL × IL × cosφ)?",
    "options": [
      "17666.4W",
      "6005.19W",
      "20799.03W",
      "13415.54W"
    ],
    "correct": "17666.4W",
    "explanation": "P = √3 × VL × IL × cosφ = 1.732 × 400 × 30 × 0.85 ≈ 17666.4W.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase load draws 25A per line from a 400V line voltage supply at a power factor of 0.95. What is the total three-phase power (P = √3 × VL × IL × cosφ)?",
    "options": [
      "11731.22W",
      "16454W",
      "25160.19W",
      "22029.4W"
    ],
    "correct": "16454W",
    "explanation": "P = √3 × VL × IL × cosφ = 1.732 × 400 × 25 × 0.95 ≈ 16454W.",
    "topic": "Three-phase power"
  },
  {
    "text": "A balanced three-phase load draws 40A per line from a 400V line voltage supply at a power factor of 0.75. What is the total three-phase power (P = √3 × VL × IL × cosφ)?",
    "options": [
      "20784W",
      "13537.36W",
      "30248.5W",
      "13882.03W"
    ],
    "correct": "20784W",
    "explanation": "P = √3 × VL × IL × cosφ = 1.732 × 400 × 40 × 0.75 ≈ 20784W.",
    "topic": "Three-phase power"
  },
  {
    "text": "What is the phase angle between adjacent phases in a standard balanced three-phase supply?",
    "options": [
      "90°",
      "120°",
      "180°",
      "60°"
    ],
    "correct": "120°",
    "explanation": "A balanced three-phase supply has three phases equally spaced at 120° apart (360° ÷ 3).",
    "topic": "Three-phase power"
  },
  {
    "text": "What is the main advantage of three-phase power supplies over single-phase for industrial motor loads?",
    "options": [
      "They are cheaper to install",
      "They provide a more constant power delivery and higher power for a given conductor size",
      "They do not require earthing",
      "They operate at a lower frequency"
    ],
    "correct": "They provide a more constant power delivery and higher power for a given conductor size",
    "explanation": "Three-phase supplies deliver constant instantaneous power (unlike the pulsating power of single-phase) and can transmit more power efficiently, making them ideal for motors.",
    "topic": "Three-phase power"
  },
  {
    "text": "When sizing a cable, what does the term 'volt drop' refer to?",
    "options": [
      "The rated voltage of the cable insulation",
      "The reduction in voltage between the origin of the circuit and the load due to cable resistance",
      "The voltage at which the cable insulation breaks down",
      "The voltage used to test the cable before installation"
    ],
    "correct": "The reduction in voltage between the origin of the circuit and the load due to cable resistance",
    "explanation": "Volt drop is the voltage lost along the length of a cable due to its resistance/impedance as current flows, reducing the voltage available at the load.",
    "topic": "Cable sizing"
  },
  {
    "text": "According to BS 7671, what is the maximum permitted voltage drop for a lighting circuit supplied from a low voltage public supply?",
    "options": [
      "1%",
      "3%",
      "5%",
      "10%"
    ],
    "correct": "3%",
    "explanation": "BS 7671 recommends a maximum voltage drop of 3% for lighting circuits supplied from a public low voltage supply.",
    "topic": "Cable sizing"
  },
  {
    "text": "According to BS 7671, what is the maximum permitted voltage drop for other uses (e.g. power circuits) supplied from a low voltage public supply?",
    "options": [
      "1%",
      "3%",
      "5%",
      "8%"
    ],
    "correct": "5%",
    "explanation": "BS 7671 recommends a maximum voltage drop of 5% for circuits other than lighting when supplied from a public low voltage supply.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which factor does NOT directly affect the current-carrying capacity of a cable?",
    "options": [
      "Ambient temperature",
      "Method of installation (e.g. clipped direct, in conduit)",
      "Grouping with other cables",
      "The colour of the cable insulation"
    ],
    "correct": "The colour of the cable insulation",
    "explanation": "Current-carrying capacity is affected by ambient temperature, installation method, and grouping/proximity to other cables — but insulation colour has no effect on rating.",
    "topic": "Cable sizing"
  },
  {
    "text": "What correction factor name is applied to cable ratings to account for several circuits grouped together?",
    "options": [
      "Ambient temperature factor (Ca)",
      "Grouping factor (Cg)",
      "Thermal insulation factor (Ci)",
      "Diversity factor"
    ],
    "correct": "Grouping factor (Cg)",
    "explanation": "The grouping factor (Cg) derates a cable's tabulated current-carrying capacity when it is installed in close proximity to other loaded circuits.",
    "topic": "Cable sizing"
  },
  {
    "text": "What does the term 'current-carrying capacity' (Iz) of a cable mean?",
    "options": [
      "The maximum current a cable can carry continuously without exceeding its rated temperature",
      "The current at which the cable insulation instantly melts",
      "The rated voltage of the cable",
      "The short-circuit current rating of the cable only"
    ],
    "correct": "The maximum current a cable can carry continuously without exceeding its rated temperature",
    "explanation": "Iz is the maximum current that a cable can carry continuously under stated conditions without its temperature exceeding a specified value, based on its size, insulation and installation method.",
    "topic": "Cable sizing"
  },
  {
    "text": "A cable's tabulated rating must be adjusted (derated) when installed in thermal insulation. Why?",
    "options": [
      "Thermal insulation increases the cable's rated voltage",
      "Thermal insulation prevents heat generated by the cable from dissipating, so the cable overheats at a lower current",
      "Thermal insulation makes the cable stronger mechanically",
      "Thermal insulation has no effect on cable rating"
    ],
    "correct": "Thermal insulation prevents heat generated by the cable from dissipating, so the cable overheats at a lower current",
    "explanation": "Cables surrounded by thermal insulation cannot dissipate heat as effectively, so their current-carrying capacity must be reduced (derated) to avoid overheating.",
    "topic": "Cable sizing"
  },
  {
    "text": "What is the purpose of applying a diversity factor when calculating the design current of an installation?",
    "options": [
      "To account for the fact that not all connected loads are used at their full rating simultaneously",
      "To increase the safety margin of the main switch only",
      "To calculate the resistance of the earthing conductor",
      "To determine the colour of cable to be used"
    ],
    "correct": "To account for the fact that not all connected loads are used at their full rating simultaneously",
    "explanation": "Diversity allows for the realistic assumption that not every circuit/appliance in an installation will be drawing its maximum current at the same time, giving a more realistic design current.",
    "topic": "Cable sizing"
  },
  {
    "text": "Which cable rating symbol represents the tabulated current-carrying capacity taken directly from BS 7671 tables before any correction factors are applied?",
    "options": [
      "It",
      "Iz",
      "Ib",
      "In"
    ],
    "correct": "It",
    "explanation": "It is the tabulated current-carrying capacity from the reference method tables, before applying correction factors (Ca, Cg, Ci) to derive the actual Iz.",
    "topic": "Cable sizing"
  },
  {
    "text": "What symbol represents the design current of a circuit (the current the circuit is intended to carry in normal service)?",
    "options": [
      "Ib",
      "Iz",
      "It",
      "In"
    ],
    "correct": "Ib",
    "explanation": "Ib is the design current — the current intended to flow in the circuit under normal conditions, used as the starting point for cable and protective device selection.",
    "topic": "Cable sizing"
  },
  {
    "text": "What is the main function of a transformer?",
    "options": [
      "To convert AC to DC",
      "To change the voltage level of an AC supply using electromagnetic induction",
      "To store electrical energy",
      "To convert electrical energy directly into mechanical energy"
    ],
    "correct": "To change the voltage level of an AC supply using electromagnetic induction",
    "explanation": "A transformer transfers electrical energy between two circuits through electromagnetic induction, typically to step voltage up or down while keeping frequency the same.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 100 turns on its primary winding. The primary voltage is 230V and the required secondary voltage is 12V. How many turns are needed on the secondary winding (assume an ideal transformer)?",
    "options": [
      "6.54 turns",
      "3.94 turns",
      "2.46 turns",
      "5 turns"
    ],
    "correct": "5 turns",
    "explanation": "Ns = Np × (Vs ÷ Vp) = 100 × (12 ÷ 230) ≈ 5 turns.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 50 turns on its primary winding. The primary voltage is 400V and the required secondary voltage is 24V. How many turns are needed on the secondary winding (assume an ideal transformer)?",
    "options": [
      "3.99 turns",
      "3 turns",
      "2.24 turns",
      "4.07 turns"
    ],
    "correct": "3 turns",
    "explanation": "Ns = Np × (Vs ÷ Vp) = 50 × (24 ÷ 400) ≈ 3 turns.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 20 turns on its primary winding. The primary voltage is 230V and the required secondary voltage is 6V. How many turns are needed on the secondary winding (assume an ideal transformer)?",
    "options": [
      "0.72 turns",
      "0.55 turns",
      "1 turns",
      "1.23 turns"
    ],
    "correct": "1 turns",
    "explanation": "Ns = Np × (Vs ÷ Vp) = 20 × (6 ÷ 230) ≈ 1 turns.",
    "topic": "Motors & transformers"
  },
  {
    "text": "A transformer has 80 turns on its primary winding. The primary voltage is 110V and the required secondary voltage is 12V. How many turns are needed on the secondary winding (assume an ideal transformer)?",
    "options": [
      "7.45 turns",
      "5.94 turns",
      "9 turns",
      "6.76 turns"
    ],
    "correct": "9 turns",
    "explanation": "Ns = Np × (Vs ÷ Vp) = 80 × (12 ÷ 110) ≈ 9 turns.",
    "topic": "Motors & transformers"
  },
  {
    "text": "In an ideal step-down transformer, if the voltage is reduced, what happens to the current?",
    "options": [
      "Current increases proportionally",
      "Current decreases proportionally",
      "Current stays the same",
      "Current becomes zero"
    ],
    "correct": "Current increases proportionally",
    "explanation": "For an ideal transformer, power in equals power out (Vp×Ip = Vs×Is), so if voltage steps down, current must step up proportionally.",
    "topic": "Motors & transformers"
  },
  {
    "text": "What is the typical starting current of a direct-on-line (DOL) started induction motor compared to its full load current?",
    "options": [
      "Roughly equal to full load current",
      "Around 6-8 times full load current",
      "About half of full load current",
      "Around 20-30 times full load current"
    ],
    "correct": "Around 6-8 times full load current",
    "explanation": "DOL starting connects the motor directly to full supply voltage, producing an inrush (starting) current typically 6-8 times the motor's full load running current.",
    "topic": "Motors & transformers"
  },
  {
    "text": "Which method of starting is commonly used to reduce the high starting current of large induction motors?",
    "options": [
      "Direct-on-line (DOL) starting only",
      "Star-delta starting",
      "Simply increasing the supply voltage",
      "Disconnecting the earth conductor during starting"
    ],
    "correct": "Star-delta starting",
    "explanation": "Star-delta starting initially connects motor windings in star (reducing voltage per winding) before switching to delta for full running voltage, reducing starting current and torque.",
    "topic": "Motors & transformers"
  },
  {
    "text": "What does the 'slip' of an induction motor refer to?",
    "options": [
      "The difference between synchronous speed and actual rotor speed, expressed as a percentage",
      "The mechanical vibration of the motor casing",
      "The voltage drop across the motor terminals",
      "The angle between line and phase voltage"
    ],
    "correct": "The difference between synchronous speed and actual rotor speed, expressed as a percentage",
    "explanation": "Slip is the difference between the synchronous (rotating field) speed and the actual rotor speed, expressed as a percentage of synchronous speed; it is what allows torque to be produced.",
    "topic": "Motors & transformers"
  },
  {
    "text": "Which type of motor is most commonly used in industrial and commercial applications due to its simplicity and reliability?",
    "options": [
      "Three-phase induction motor",
      "Universal motor",
      "Stepper motor",
      "Series wound DC motor"
    ],
    "correct": "Three-phase induction motor",
    "explanation": "The three-phase induction motor is the workhorse of industry thanks to its rugged, brushless construction, reliability and relatively low maintenance requirements.",
    "topic": "Motors & transformers"
  },
  {
    "text": "What is the purpose of overload protection fitted to a motor circuit?",
    "options": [
      "To protect the motor from sustained overcurrent that could cause overheating and damage",
      "To provide short-circuit protection only",
      "To reduce the motor's starting current",
      "To change the motor's direction of rotation"
    ],
    "correct": "To protect the motor from sustained overcurrent that could cause overheating and damage",
    "explanation": "Motor overload protection (e.g. thermal overload relay) disconnects the motor if it draws sustained excess current, preventing winding damage from overheating.",
    "topic": "Motors & transformers"
  },
  {
    "text": "What does 'transformer efficiency' primarily depend on minimising?",
    "options": [
      "Copper losses (I²R in windings) and iron (core) losses",
      "The colour of the transformer casing",
      "The frequency of the supply only",
      "The number of terminals on the transformer"
    ],
    "correct": "Copper losses (I²R in windings) and iron (core) losses",
    "explanation": "Transformer efficiency is reduced mainly by copper losses (resistive heating in the windings) and iron losses (hysteresis and eddy currents in the core).",
    "topic": "Motors & transformers"
  },
  {
    "text": "An AC supply has a frequency of 50Hz. What is the periodic time of one complete cycle (T = 1 ÷ f)?",
    "options": [
      "0.02s",
      "0.03s",
      "0.01s",
      "0s"
    ],
    "correct": "0.02s",
    "explanation": "T = 1 ÷ f = 1 ÷ 50 = 0.02s.",
    "topic": "AC theory"
  },
  {
    "text": "An AC supply has a frequency of 60Hz. What is the periodic time of one complete cycle (T = 1 ÷ f)?",
    "options": [
      "0.01667s",
      "0s",
      "0.01s",
      "0.03s"
    ],
    "correct": "0.01667s",
    "explanation": "T = 1 ÷ f = 1 ÷ 60 = 0.01667s.",
    "topic": "AC theory"
  },
  {
    "text": "An AC supply has a frequency of 100Hz. What is the periodic time of one complete cycle (T = 1 ÷ f)?",
    "options": [
      "0.01s",
      "0.02s",
      "0s"
    ],
    "correct": "0.01s",
    "explanation": "T = 1 ÷ f = 1 ÷ 100 = 0.01s.",
    "topic": "AC theory"
  },
  {
    "text": "An AC supply has a frequency of 25Hz. What is the periodic time of one complete cycle (T = 1 ÷ f)?",
    "options": [
      "0.02s",
      "0.03s",
      "0.05s",
      "0.04s"
    ],
    "correct": "0.04s",
    "explanation": "T = 1 ÷ f = 1 ÷ 25 = 0.04s.",
    "topic": "AC theory"
  },
  {
    "text": "An AC supply has a frequency of 400Hz. What is the periodic time of one complete cycle (T = 1 ÷ f)?",
    "options": [
      "0.0025s"
    ],
    "correct": "0.0025s",
    "explanation": "T = 1 ÷ f = 1 ÷ 400 = 0.0025s.",
    "topic": "AC theory"
  },
  {
    "text": "What is meant by the 'power factor' of an AC circuit?",
    "options": [
      "The ratio of true power (kW) to apparent power (kVA)",
      "The ratio of voltage to current in the circuit",
      "The total resistance of the circuit",
      "The number of phases supplying the circuit"
    ],
    "correct": "The ratio of true power (kW) to apparent power (kVA)",
    "explanation": "Power factor = true power (kW) ÷ apparent power (kVA); it indicates how effectively the current drawn is converted into useful work.",
    "topic": "AC theory"
  },
  {
    "text": "A purely resistive AC circuit has a power factor of what value?",
    "options": [
      "1 (unity)",
      "0",
      "0.5",
      "It cannot be determined"
    ],
    "correct": "1 (unity)",
    "explanation": "In a purely resistive circuit, voltage and current are in phase, giving a power factor of 1 (unity) — all apparent power is true power.",
    "topic": "AC theory"
  },
  {
    "text": "What effect does inductive reactance have on the current in an AC circuit compared to a purely resistive circuit?",
    "options": [
      "Current lags behind voltage",
      "Current leads voltage",
      "Current and voltage remain exactly in phase",
      "Current becomes DC"
    ],
    "correct": "Current lags behind voltage",
    "explanation": "In a purely inductive circuit, the current lags the applied voltage by 90° because the inductor opposes changes in current.",
    "topic": "AC theory"
  },
  {
    "text": "What effect does capacitive reactance have on the current in an AC circuit compared to a purely resistive circuit?",
    "options": [
      "Current leads voltage",
      "Current lags behind voltage",
      "Current and voltage remain exactly in phase",
      "Current becomes zero"
    ],
    "correct": "Current leads voltage",
    "explanation": "In a purely capacitive circuit, the current leads the applied voltage by 90° because the capacitor opposes changes in voltage.",
    "topic": "AC theory"
  },
  {
    "text": "What is 'apparent power' in an AC circuit measured in?",
    "options": [
      "kVA (kilovolt-amperes)",
      "kW (kilowatts)",
      "kWh (kilowatt-hours)",
      "kVAr (kilovolt-amperes reactive)"
    ],
    "correct": "kVA (kilovolt-amperes)",
    "explanation": "Apparent power is the product of RMS voltage and RMS current (S = V × I) and is measured in volt-amperes (VA) or kilovolt-amperes (kVA).",
    "topic": "AC theory"
  },
  {
    "text": "Which instrument is used to measure insulation resistance during electrical testing?",
    "options": [
      "Insulation resistance tester (megger)",
      "Multimeter set to AC voltage",
      "Clamp meter",
      "Earth loop impedance tester"
    ],
    "correct": "Insulation resistance tester (megger)",
    "explanation": "An insulation resistance tester (often called a 'megger') applies a DC test voltage to measure the resistance of insulation between conductors and earth.",
    "topic": "Test instruments"
  },
  {
    "text": "What is the typical test voltage used for insulation resistance testing on a standard 230V/400V low voltage circuit?",
    "options": [
      "500V DC",
      "50V DC",
      "1000V AC",
      "12V DC"
    ],
    "correct": "500V DC",
    "explanation": "For low voltage circuits up to 500V, BS 7671 specifies a test voltage of 500V DC for insulation resistance testing, with a minimum acceptable reading of 1MΩ.",
    "topic": "Test instruments"
  },
  {
    "text": "Which instrument is used to verify the earth fault loop impedance (Zs) of a circuit?",
    "options": [
      "Earth loop impedance tester",
      "Insulation resistance tester",
      "Continuity tester (low ohmmeter) only",
      "Voltage indicator"
    ],
    "correct": "Earth loop impedance tester",
    "explanation": "An earth fault loop impedance tester measures Zs, confirming the total impedance of the earth fault loop is low enough for protective devices to operate within required disconnection times.",
    "topic": "Test instruments"
  },
  {
    "text": "What is the purpose of an RCD test instrument (RCD tester)?",
    "options": [
      "To verify that a residual current device trips within its rated time at rated and multiples of rated tripping current",
      "To measure the voltage of the supply only",
      "To measure insulation resistance",
      "To identify cable colours"
    ],
    "correct": "To verify that a residual current device trips within its rated time at rated and multiples of rated tripping current",
    "explanation": "An RCD tester injects test currents (e.g. 1× and 5× rated residual current) and measures the RCD's tripping time to confirm it operates correctly.",
    "topic": "Test instruments"
  },
  {
    "text": "What must always be done to a voltage indicator before and after use, as part of safe isolation procedure?",
    "options": [
      "Prove it on a known live supply or proving unit",
      "Recalibrate it using a multimeter",
      "Charge its battery fully",
      "Replace its test leads"
    ],
    "correct": "Prove it on a known live supply or proving unit",
    "explanation": "GS38 guidance requires proving a voltage indicator works correctly (on a proving unit or known live source) both before and after testing for the absence of voltage, to confirm the device hasn't failed.",
    "topic": "Test instruments"
  },
  {
    "text": "Which test instrument would be used to check for continuity of the circuit protective conductor (cpc)?",
    "options": [
      "Low resistance ohmmeter (continuity tester)",
      "Insulation resistance tester",
      "RCD tester",
      "Voltage indicator"
    ],
    "correct": "Low resistance ohmmeter (continuity tester)",
    "explanation": "A low resistance ohmmeter is used to measure the continuity and resistance of protective conductors, ring final circuit conductors and bonding conductors.",
    "topic": "Test instruments"
  },
  {
    "text": "What does a clamp meter measure without the need to break the circuit?",
    "options": [
      "Current, by sensing the magnetic field around a conductor",
      "Insulation resistance",
      "Earth electrode resistance only",
      "Frequency of rotation of a motor"
    ],
    "correct": "Current, by sensing the magnetic field around a conductor",
    "explanation": "A clamp meter measures current non-invasively by clamping around a single conductor and sensing the magnetic field produced by the current flowing through it.",
    "topic": "Test instruments"
  },
  {
    "text": "According to GS38, what should the exposed metal tips of test probes generally be limited to?",
    "options": [
      "A maximum of 4mm exposed metal (or spring-loaded shrouded 2mm for certain tests)",
      "20mm exposed metal",
      "There is no limit specified",
      "10mm exposed metal"
    ],
    "correct": "A maximum of 4mm exposed metal (or spring-loaded shrouded 2mm for certain tests)",
    "explanation": "HSE guidance note GS38 recommends test probe tips are shrouded/finger-guarded with a maximum of 4mm of exposed metal to reduce the risk of accidental short circuit or shock.",
    "topic": "Test instruments"
  },
  {
    "text": "In an IP (Ingress Protection) rating, what does the code IP44 indicate?",
    "options": [
      "Protection against explosive atmospheres only",
      "Fully waterproof with no dust protection at all",
      "Protected against solid objects greater than 1mm and splashing water from any direction",
      "No ingress protection of any kind"
    ],
    "correct": "Protected against solid objects greater than 1mm and splashing water from any direction",
    "explanation": "IP44: the first digit indicates the level of protection against solid objects/dust, and the second digit indicates protection against liquid ingress. Protected against solid objects greater than 1mm and splashing water from any direction.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP (Ingress Protection) rating, what does the code IP65 indicate?",
    "options": [
      "Totally protected against dust ingress and protected against low pressure water jets from any direction",
      "No ingress protection of any kind",
      "Fully waterproof with no dust protection at all",
      "Protection against explosive atmospheres only"
    ],
    "correct": "Totally protected against dust ingress and protected against low pressure water jets from any direction",
    "explanation": "IP65: the first digit indicates the level of protection against solid objects/dust, and the second digit indicates protection against liquid ingress. Totally protected against dust ingress and protected against low pressure water jets from any direction.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP (Ingress Protection) rating, what does the code IP67 indicate?",
    "options": [
      "Fully waterproof with no dust protection at all",
      "No ingress protection of any kind",
      "Protection against explosive atmospheres only",
      "Totally protected against dust ingress and protected against temporary immersion in water"
    ],
    "correct": "Totally protected against dust ingress and protected against temporary immersion in water",
    "explanation": "IP67: the first digit indicates the level of protection against solid objects/dust, and the second digit indicates protection against liquid ingress. Totally protected against dust ingress and protected against temporary immersion in water.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP (Ingress Protection) rating, what does the code IP20 indicate?",
    "options": [
      "No ingress protection of any kind",
      "Protection against explosive atmospheres only",
      "Fully waterproof with no dust protection at all",
      "Protected against solid objects greater than 12mm (e.g. fingers) but with no water protection"
    ],
    "correct": "Protected against solid objects greater than 12mm (e.g. fingers) but with no water protection",
    "explanation": "IP20: the first digit indicates the level of protection against solid objects/dust, and the second digit indicates protection against liquid ingress. Protected against solid objects greater than 12mm (e.g. fingers) but with no water protection.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP (Ingress Protection) rating, what does the code IP54 indicate?",
    "options": [
      "No ingress protection of any kind",
      "Protection against explosive atmospheres only",
      "Protected against dust ingress sufficient to not interfere with equipment operation, and protected against splashing water",
      "Fully waterproof with no dust protection at all"
    ],
    "correct": "Protected against dust ingress sufficient to not interfere with equipment operation, and protected against splashing water",
    "explanation": "IP54: the first digit indicates the level of protection against solid objects/dust, and the second digit indicates protection against liquid ingress. Protected against dust ingress sufficient to not interfere with equipment operation, and protected against splashing water.",
    "topic": "IP ratings"
  },
  {
    "text": "In an IP rating such as IP65, what does the first digit represent?",
    "options": [
      "Protection against solid objects and dust ingress",
      "Protection against liquid ingress",
      "The IK impact resistance rating",
      "The voltage rating of the enclosure"
    ],
    "correct": "Protection against solid objects and dust ingress",
    "explanation": "The first digit of an IP code (0-6) indicates the degree of protection against solid foreign objects and dust ingress.",
    "topic": "IP ratings"
  },
  {
    "text": "In a TN-S earthing system, where does the installation's earth connection come from?",
    "options": [
      "A separate metallic earth conductor (usually the cable sheath) provided by the supply cable back to the source",
      "A local earth electrode (earth rod) at the installation only",
      "The neutral conductor combined with earth throughout",
      "There is no earth connection in TN-S"
    ],
    "correct": "A separate metallic earth conductor (usually the cable sheath) provided by the supply cable back to the source",
    "explanation": "In TN-S, the supply provides a separate protective earth conductor (typically the metallic sheath of the supply cable) running back to the source, kept entirely separate from the neutral.",
    "topic": "Earthing systems"
  },
  {
    "text": "In a TN-C-S (PME) earthing system, what does 'PME' stand for?",
    "options": [
      "Protective Multiple Earthing",
      "Portable Mains Equipment",
      "Primary Meter Enclosure",
      "Protective Metallic Enclosure"
    ],
    "correct": "Protective Multiple Earthing",
    "explanation": "PME stands for Protective Multiple Earthing — in TN-C-S systems the combined neutral/earth (PEN) conductor is earthed at multiple points along the network for safety.",
    "topic": "Earthing systems"
  },
  {
    "text": "In a TT earthing system, where does the installation obtain its means of earthing?",
    "options": [
      "A local earth electrode installed at the consumer's premises",
      "The supply company's combined neutral/earth conductor",
      "The metallic sheath of the incoming supply cable",
      "There is no requirement for earthing in TT systems"
    ],
    "correct": "A local earth electrode installed at the consumer's premises",
    "explanation": "In a TT system, the installation is earthed via its own local earth electrode (e.g. earth rod), independent of the supply company's earthing arrangement, so RCD protection is essential.",
    "topic": "Earthing systems"
  },
  {
    "text": "Why is RCD protection considered essential on a TT earthing system?",
    "options": [
      "Because earth fault loop impedance via a local electrode is often too high for overcurrent devices alone to disconnect quickly enough",
      "Because TT systems do not use circuit breakers",
      "Because TT systems always operate at higher voltages",
      "RCDs are not actually required on TT systems"
    ],
    "correct": "Because earth fault loop impedance via a local electrode is often too high for overcurrent devices alone to disconnect quickly enough",
    "explanation": "Local earth electrodes usually have relatively high resistance, so the fault current may not be enough to operate an overcurrent device fast enough — an RCD provides fast disconnection at much lower fault currents.",
    "topic": "Earthing systems"
  },
  {
    "text": "What is the purpose of main protective bonding conductors in an installation?",
    "options": [
      "To connect extraneous-conductive-parts (e.g. gas and water pipes) to the main earthing terminal to minimise touch voltage during a fault",
      "To carry the full load current of the installation",
      "To connect the neutral conductor to line conductors",
      "To provide the primary path for lightning protection"
    ],
    "correct": "To connect extraneous-conductive-parts (e.g. gas and water pipes) to the main earthing terminal to minimise touch voltage during a fault",
    "explanation": "Main bonding connects incoming services and other extraneous-conductive-parts to the main earthing terminal, keeping them at (or close to) the same potential during a fault to reduce shock risk.",
    "topic": "Earthing systems"
  },
  {
    "text": "According to BS 7671, into which voltage band does a nominal 230V single-phase supply fall?",
    "options": [
      "Band II (Low Voltage)",
      "Band I (Extra-Low Voltage)",
      "High Voltage",
      "Band III"
    ],
    "correct": "Band II (Low Voltage)",
    "explanation": "Standard 230V/400V mains supplies fall within Band II (Low Voltage), defined in BS 7671 as normally exceeding extra-low voltage but not exceeding 1000V AC.",
    "topic": "Voltage bands"
  },
  {
    "text": "What is the definition of 'Extra-Low Voltage' (ELV) under BS 7671?",
    "options": [
      "A voltage not exceeding 50V AC (or 120V ripple-free DC) between conductors or to earth",
      "Any voltage below 400V",
      "A voltage exceeding 1000V",
      "A voltage of exactly 230V"
    ],
    "correct": "A voltage not exceeding 50V AC (or 120V ripple-free DC) between conductors or to earth",
    "explanation": "BS 7671 defines Extra-Low Voltage as not exceeding 50V AC or 120V ripple-free DC, whether between conductors or between a conductor and earth.",
    "topic": "Voltage bands"
  },
  {
    "text": "Which system uses SELV (Separated Extra-Low Voltage) to reduce the risk of electric shock?",
    "options": [
      "A circuit electrically separated from earth and other circuits, supplied from a safety source such as a safety isolating transformer",
      "Any circuit operating below 400V",
      "Standard 230V circuits with an RCD fitted",
      "A circuit that shares a neutral with the main supply"
    ],
    "correct": "A circuit electrically separated from earth and other circuits, supplied from a safety source such as a safety isolating transformer",
    "explanation": "SELV systems are electrically separated from earth and from other circuits (including PELV/protective earth), typically fed via a safety isolating transformer, providing protection against both electric shock from direct and indirect contact.",
    "topic": "Voltage bands"
  },
  {
    "text": "What key feature distinguishes PELV from SELV?",
    "options": [
      "PELV circuits may be connected to earth at one point, whereas SELV circuits must remain fully isolated from earth",
      "PELV operates at a higher voltage than SELV",
      "PELV requires no safety source at all",
      "There is no difference between PELV and SELV"
    ],
    "correct": "PELV circuits may be connected to earth at one point, whereas SELV circuits must remain fully isolated from earth",
    "explanation": "PELV (Protective Extra-Low Voltage) is similar to SELV but permits an earth connection at one point in the circuit, unlike SELV which must be kept fully isolated from earth.",
    "topic": "Voltage bands"
  },
  {
    "text": "What is the correct sequence when carrying out safe isolation of a circuit?",
    "options": [
      "Identify the circuit, prove the voltage indicator, test the circuit is dead, prove the voltage indicator again, then lock off and label",
      "Switch off, immediately start work, then check with a voltage indicator afterwards",
      "Lock off the isolator only, without any voltage testing",
      "Ask a colleague to confirm verbally that the circuit is dead"
    ],
    "correct": "Identify the circuit, prove the voltage indicator, test the circuit is dead, prove the voltage indicator again, then lock off and label",
    "explanation": "Safe isolation follows a defined sequence: correctly identify the circuit, prove the tester works, test that the circuit is dead, re-prove the tester, and then secure isolation with a lock and warning label.",
    "topic": "Safe isolation"
  },
  {
    "text": "Why is it important to secure isolation with a unique lock and warning notice after isolating a circuit?",
    "options": [
      "To prevent the circuit being unknowingly re-energised by someone else while work is in progress",
      "To comply with insurance requirements only",
      "To improve the appearance of the distribution board",
      "It is not actually necessary if the work will only take a few minutes"
    ],
    "correct": "To prevent the circuit being unknowingly re-energised by someone else while work is in progress",
    "explanation": "Locking off (with a unique key retained by the person working on the circuit) and labelling prevents anyone else from re-energising the circuit while work is being carried out, protecting the person working on it.",
    "topic": "Safe isolation"
  },
  {
    "text": "Under the Electricity at Work Regulations 1989, what is generally the safest approach when working on electrical systems?",
    "options": [
      "Ensure the system is made dead and safely isolated before work begins, wherever reasonably practicable",
      "Always work live to save time",
      "Rely solely on insulated tools without isolating the supply",
      "Work live only if wearing rubber gloves"
    ],
    "correct": "Ensure the system is made dead and safely isolated before work begins, wherever reasonably practicable",
    "explanation": "Regulation 14 of the Electricity at Work Regulations 1989 requires that, so far as is reasonably practicable, work is not carried out on or near live conductors — the system should be made dead first.",
    "topic": "Safe isolation"
  },
  {
    "text": "What device is commonly used to physically lock off an isolator or MCB during safe isolation?",
    "options": [
      "A multi-lock hasp and unique padlock",
      "A cable tie",
      "Electrical tape wrapped around the switch",
      "A warning sign alone, with no physical lock"
    ],
    "correct": "A multi-lock hasp and unique padlock",
    "explanation": "A lockable hasp fitted over the isolator or MCB toggle, secured with a uniquely keyed padlock retained by the person carrying out the work, physically prevents the device being switched back on.",
    "topic": "Safe isolation"
  },
  {
    "text": "What does the term 'design current' (Ib) represent when selecting protective devices and cables for a circuit?",
    "options": [
      "The current the circuit is intended to carry in normal service",
      "The rated current of the protective device only",
      "The maximum fault current available at the origin",
      "The current-carrying capacity of the cable after correction factors"
    ],
    "correct": "The current the circuit is intended to carry in normal service",
    "explanation": "Design current (Ib) is the starting point of circuit design — the current the circuit is expected to carry under normal operating conditions, from which protective device rating and cable size are derived.",
    "topic": "Circuit design"
  },
  {
    "text": "For correct circuit design, which relationship between design current (Ib), protective device rating (In), and cable current-carrying capacity (Iz) must be satisfied?",
    "options": [
      "Ib ≤ In ≤ Iz",
      "Iz ≤ In ≤ Ib",
      "In ≤ Ib ≤ Iz",
      "Ib ≥ Iz ≥ In"
    ],
    "correct": "Ib ≤ In ≤ Iz",
    "explanation": "BS 7671 requires Ib ≤ In ≤ Iz: the design current must not exceed the protective device rating, and the protective device rating must not exceed the cable's current-carrying capacity.",
    "topic": "Circuit design"
  },
  {
    "text": "What is the purpose of selecting an appropriate protective device rating (In) close to, but not less than, the design current (Ib)?",
    "options": [
      "To ensure the circuit is adequately protected without being needlessly oversized",
      "To make the circuit cheaper regardless of safety",
      "To increase the circuit's voltage drop deliberately",
      "To reduce the cable size required, regardless of current rating"
    ],
    "correct": "To ensure the circuit is adequately protected without being needlessly oversized",
    "explanation": "Choosing In just above Ib ensures the protective device will operate correctly under fault or overload conditions while avoiding unnecessary oversizing of cables and equipment.",
    "topic": "Circuit design"
  },
  {
    "text": "Why must the cable's current-carrying capacity (Iz) after all correction factors be applied always be equal to or greater than the protective device's rating (In)?",
    "options": [
      "So that the cable can safely carry the maximum current the protective device will allow to flow before operating",
      "So that the cable is always more expensive than necessary",
      "Because BS 7671 does not actually require this relationship",
      "So that the protective device will never operate at all"
    ],
    "correct": "So that the cable can safely carry the maximum current the protective device will allow to flow before operating",
    "explanation": "If Iz were less than In, the cable could be forced to carry more current than it can safely handle before the protective device operates, risking overheating and fire.",
    "topic": "Circuit design"
  },
  {
    "text": "What does the abbreviation 'SWA' stand for when referring to a type of armoured cable?",
    "options": [
      "Steel Wire Armoured",
      "Single Wire Assembly",
      "Standard Wiring Application",
      "Surface Wall Armour"
    ],
    "correct": "Steel Wire Armoured",
    "explanation": "SWA stands for Steel Wire Armoured — a cable construction with a layer of galvanised steel wires providing mechanical protection, commonly used for underground and external installations.",
    "topic": "Cable types"
  },
  {
    "text": "Which cable type is most commonly used for domestic fixed wiring installed within stud walls and under floors?",
    "options": [
      "Twin and earth (flat PVC/LSF sheathed) cable",
      "Steel wire armoured (SWA) cable",
      "Mineral insulated copper clad (MICC) cable",
      "Bare conductor overhead cable"
    ],
    "correct": "Twin and earth (flat PVC/LSF sheathed) cable",
    "explanation": "Twin and earth cable, with its flat PVC or low smoke sheath, is the standard choice for most domestic fixed wiring run within walls, floors and ceilings.",
    "topic": "Cable types"
  },
  {
    "text": "What is a key advantage of mineral insulated copper clad (MICC) cable over standard PVC cables?",
    "options": [
      "High resistance to fire, allowing circuits to remain operational for longer during a fire",
      "It is significantly cheaper than PVC cable",
      "It does not require any earthing",
      "It is lighter and more flexible than twin and earth cable"
    ],
    "correct": "High resistance to fire, allowing circuits to remain operational for longer during a fire",
    "explanation": "MICC cable uses inorganic magnesium oxide insulation and a copper sheath, giving it excellent fire resistance so circuits such as fire alarms and emergency lighting can continue to operate during a fire.",
    "topic": "Cable types"
  },
  {
    "text": "Why must steel wire armoured (SWA) cable glands be correctly terminated with the armour bonded to earth?",
    "options": [
      "Because the armour itself can act as, or contribute to, the circuit protective conductor and must be earthed for safety",
      "Because the armour carries the line conductor current",
      "Because the gland is purely decorative and has no electrical function",
      "Because SWA cable does not require any earthing at all"
    ],
    "correct": "Because the armour itself can act as, or contribute to, the circuit protective conductor and must be earthed for safety",
    "explanation": "The steel wire armour of SWA cable can form part of the earth fault path, so glands must correctly bond the armour to earth at terminations to maintain protection against electric shock.",
    "topic": "Cable types"
  },
];
